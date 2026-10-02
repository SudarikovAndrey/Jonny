// ===== Мультиплеер «Сан-Франциско» на 2–4 игрока (?map=sf&mp) =====
// Спек: черновики/америкэн-бой-мультиплеер.md. Правила стола — web/mp-core.js (MPCore).
// Поле и экономика — обычный движок Сан-Франциско: в свой ход клиент играет как в соло,
// после каждого save() шлёт хозяину стола свой срез S и общее поле. Не свой ход — только смотрит.
// Связь — через публичные MQTT-брокеры (по умолчанию), напрямую — &net=p2p (PeerJS), в одном браузере — &net=local.
(function(){
const Q=new URLSearchParams(location.search);
if(!Q.has('mp'))return;
if(Q.get('map')!=='sf'){Q.set('map','sf');location.replace(location.pathname+'?'+Q.toString());return;}
const C=window.MPCore;if(!C){console.error('MPCore не загружен');return;}

// ---- параметры режима ----
const prosp=()=>(window.SFBuilder&&+SFBuilder.prosp)||.06;   // надбавка города за категорию — SF.prosp; .06 — запас, пока SFBuilder.prosp не выставлен
const RENT_LAPS=1.5;      // рента: полторы круговой прибыли хозяина с точки (Передел §9: 75% × 2)
// Покупка чужой клетки — предложение хозяину (решение продюсера 01.10, вместо принудительного перекупа ×1,5):
// множитель от вложенного хозяином, хозяин принимает или отказывает в начале своего хода.
const OFFER_MULTS=[1,1.5,2,3,5,10];
const STEP_MS=170;        // шаг чужой фишки по клетке
// Дубль и награды ходами привязаны к обороту игрока (формулы «Американ Геймплей», 01.10): lapPotential —
// прибыль всех своих точек за круг при полном запасе плюс сборы бизнесов.
const lapCash=()=>{try{return lapPotential()||0;}catch(e){return 0;}};
const r5=x=>Math.round(x/5)*5;
const dblCash=sum=>Math.round(Math.max(20,r5(lapCash()*.10))*(sum===12?1.5:1));   // 10% круга, не меньше $20; 6+6 — ×1,5
const rollCash=()=>Math.max(10,r5(lapCash()/6));                                     // ход ≈ шестая часть круга
const PEER_SRC=['https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.4/peerjs.min.js','https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js'];
const QR_SRC='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
// Связь: по умолчанию — ретранслятор (публичные MQTT-брокеры по WebSocket, проходит через любую сеть);
// &net=p2p — напрямую WebRTC (PeerJS, без TURN не проходит строгий NAT); &net=local — вкладки одного браузера.
const NET=Q.get('net')==='local'?'local':Q.get('net')==='p2p'?'p2p':'relay';
const NET_LOCAL=NET==='local';
const MQTT_SRC=['https://cdnjs.cloudflare.com/ajax/libs/mqtt/5.10.1/mqtt.min.js','https://cdn.jsdelivr.net/npm/mqtt@5.10.1/dist/mqtt.min.js'];
const BROKERS=['wss://broker.emqx.io:8084/mqtt','wss://broker.hivemq.com:8884/mqtt'];   // шлём через оба, повторы отбрасываем
const ss=(k,v)=>{try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v);}catch(e){return null;}};
const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v);}catch(e){return null;}};
const clone=o=>o==null?o:JSON.parse(JSON.stringify(o));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>'$'+Math.round(n||0).toLocaleString('en-US');
const plural=(n,a,b,c)=>{const m=n%10,h=n%100;return m===1&&h!==11?a:m>=2&&m<=4&&(h<12||h>14)?b:c;};
const mmss=ms=>{const s=Math.max(0,Math.ceil(ms/1000));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};

// Идентификатор игрока живёт во вкладке: перезагрузка возвращает на то же место, две вкладки — два игрока.
let PID=ss('abmp_pid');if(!PID){PID='p'+Math.random().toString(36).slice(2,10);ss('abmp_pid',PID);}
let ROOM=C.normCode(Q.get('mp'));if(ROOM.length!==4)ROOM='';
let myName=ls('abmp_name')||'';

document.body.classList.add('mp-mode');
{const l=document.createElement('link');l.rel='stylesheet';l.href='mp.css?v='+Date.now().toString(36).slice(-5);document.head.append(l);}

// ---- движок: соло-обвязка выключается ----
CFG.ROLLS_PER_DAY=999;
askName=async()=>{};intro=async()=>{};
load=function(){return false;};                 // партия живёт у хозяина стола, не в сохранении браузера
let BASE=null;                                  // чистый срез после newGame — стартовое состояние каждого игрока
function patchSolo(s){
  s.firstRoute={variant:0,index:0,done:true};s.starter=Object.assign(s.starter||{},{closed:true});
  s.training={shipped:true,explained:true,skipped:true};
  s.sf={done:{lvl:true,city:true,build:true},ended:true,covered:0,lic:(s.sf&&s.sf.lic)||{}};  // задачи соло не дают ходов и не кончают карту
  s.rolls=999;s.tips=Object.assign(s.tips||{},{shipHot:true});
}
// sfPrice считает свои точки (S.tiles), а newGame строит поле до того, как S создан, — подставляем пустой S.
(function(){const base=newGame;newGame=function(){if(!S)S={tiles:[]};const r=base.apply(this,arguments);patchSolo(S);if(!BASE){BASE=clone(S);delete BASE.tiles;}return r;};})();
function makeSlice(name){const s=clone(BASE);s.player=name;s.cash=CFG.START_CASH;s.pos=0;s.laps=0;s.log=[];s.stat={earned:0,sold:0,parcels:0,bought:0};patchSolo(s);return s;}

// ---- клетки: общее поле ⇄ своё ----
// В общем поле owner — pid. У себя: свои — 'you', чужие — owner:null и rival:pid,
// поэтому весь код соло (myKiosks, надбавка города, продажи) видит только своё.
function toLocal(tiles){return tiles.map(t=>{const o=clone(t);if(o.owner===PID)o.owner='you';else if(o.owner){o.rival=o.owner;o.owner=null;}return o;});}
function toShared(tiles){return tiles.map(t=>{const o=Object.assign({},t);if(o.owner)o.owner=PID;else if(o.rival)o.owner=o.rival;else o.owner=null;delete o.rival;return o;});}
function sliceOf(s){const o=clone(s);delete o.tiles;if(o.log&&o.log.length>30)o.log=o.log.slice(-30);return o;}
const isRival=t=>!!t&&!!t.rival&&(t.type==='kiosk'||t.type==='biz');

// ---- сила: вложено и товар ----
function baseInv(t){
  if(t.type==='biz')return assetValue(t);
  if(!t.base)return 0;
  let v=t.price||(window.SFBuilder&&SFBuilder.basePrice?SFBuilder.basePrice(t.base):0);
  for(let l=1;l<(t.salesLvl||1);l++)v+=salesCost({base:t.base,good:t.good,salesLvl:l});
  return v;
}
const invested=t=>baseInv(t)+(t.mpPrem||0);
// Цена продажи в Сан-Франциско своя (SFBuilder.sell), общая таблица товаров занижает маржу (замечание «Геймплея» 01.10).
const sellOf=id=>(window.SFBuilder&&SFBuilder.sell&&+SFBuilder.sell[id])||good(id).sell;
const marginOf=id=>Math.max(1,sellOf(id)-good(id).buy);
function coveredIn(tiles,pid){return new Set(tiles.filter(t=>t.type==='kiosk'&&t.owner===pid&&t.base&&!t.lot).map(t=>t.base)).size;}
function makeValuer(tiles){
  const cov={};
  const v=(t,pid)=>{
    if(!(pid in cov))cov[pid]=coveredIn(tiles,pid);
    const goods=t.type==='kiosk'&&t.base?(t.goods||0)*sellOf(t.good)*(1+prosp()*cov[pid]):0;
    return {inv:invested(t),goods};
  };
  // Лицензии — тоже вложение: кто купил «Технику», не должен выглядеть слабее того, кто копит.
  v.extra=p=>{const lic=p.s&&p.s.sf&&p.s.sf.lic||{};return ((window.SFBuilder&&SFBuilder.licenses)||[]).reduce((a,l)=>a+(lic[l.id]?l.price:0),0);};
  // Кредит банка — пассив (плейтест 01.10: игрок с кредитом вышел «сильнейшим»).
  v.debt=p=>((p.s&&p.s.loans)||[]).reduce((a,l)=>a+(+l.principal||0),0);
  return v;
}
function rentOf(t){
  if(t.type==='biz')return Math.round(fee(t)*CFG.BIZ.landMult);
  const g=good(t.good),cov=coveredIn(toShared(S.tiles),t.rival);
  return Math.max(1,Math.round(RENT_LAPS*sales(t)*marginOf(t.good)*(1+prosp()*cov)));
}

// =====================================================================
// Сеть. Хозяин стола (hub) держит состояние T и часы; каждый клиент, включая
// самого хозяина, говорит с ним одними и теми же сообщениями.
// =====================================================================
function loadScript(src){return new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=()=>{s.remove();rej(new Error(src));};document.head.append(s);});}
async function loadPeer(){if(window.Peer)return;for(const src of PEER_SRC){try{await loadScript(src);if(window.Peer)return;}catch(e){}}throw new Error('Не удалось загрузить PeerJS');}
const peerId=room=>'abmp-'+room.toLowerCase();
async function loadMqtt(){if(window.mqtt)return;for(const src of MQTT_SRC){try{await loadScript(src);if(window.mqtt)return;}catch(e){}}throw new Error('Не удалось загрузить MQTT');}
// Шина через публичные брокеры: тема стола rynok-abmp-v1/<КОД>/hub (к хозяину) и …/c/<pid> (игроку).
// Каждое сообщение уходит через все брокеры, у получателя повторы отсекаются по id; порядок сообщений
// одного отправителя сохраняется (каждый брокер доставляет по порядку). Темы публичные — это тест.
function Bus(room){
  const base='rynok-abmp-v1/'+room,subs=new Map(),seen=new Set(),order=[],tag=Math.random().toString(36).slice(2,9);let seq=0,ready;
  const readyP=new Promise(r=>ready=r);
  const clients=BROKERS.map((url,i)=>{
    const c=mqtt.connect(url,{clientId:'abmp-'+tag+'-'+i,connectTimeout:8000,reconnectPeriod:2000,keepalive:20,clean:true});
    c.on('connect',()=>{for(const t of subs.keys())c.subscribe(base+'/'+t,{qos:1});ready();});
    c.on('message',(topic,buf)=>{
      let d;try{d=JSON.parse(buf.toString());}catch(e){return;}
      if(!d||!d.id||seen.has(d.id))return;seen.add(d.id);order.push(d.id);if(order.length>1500)seen.delete(order.shift());
      const cb=subs.get(topic.slice(base.length+1));if(cb)cb(d.m);
    });
    c.on('error',e=>console.warn('MQTT',url,e&&e.message));
    return c;
  });
  return {ready:readyP,
    sub(t,cb){if(subs.has(t)){subs.set(t,cb);return;}subs.set(t,cb);clients.forEach(c=>{if(c.connected)c.subscribe(base+'/'+t,{qos:1});});},
    pub(t,m){const s=JSON.stringify({id:tag+':'+(++seq),m});clients.forEach(c=>{try{c.publish(base+'/'+t,s,{qos:1});}catch(e){}});},
    get online(){return clients.some(c=>c.connected);}};
}
async function openBus(room){
  await loadMqtt();
  const bus=Bus(room);
  const ok=await Promise.race([bus.ready.then(()=>true),new Promise(r=>setTimeout(()=>r(false),12000))]);
  if(!ok)throw new Error('нет связи с сервером-ретранслятором');
  return bus;
}

// ---------- хозяин стола ----------
let hub=null;
function Hub(room,restored){
  const T=restored||C.newTable(room);
  T.hostPid=PID;
  const links=new Map();          // pid → send(msg)
  let dirty=false,saveT=0;
  // После перезагрузки хозяина остальные офлайн, пока не отзовутся пульсом (вернётся сам) или не войдут
  // заново по имени. Из лобби молчащих убираем через 15 с.
  if(restored)T.players.forEach(p=>{if(p.pid!==PID){p.online=false;p.offAt=Date.now();}});
  function persist(){clearTimeout(saveT);saveT=setTimeout(()=>ls('abmp_host_'+room,JSON.stringify(T)),300);}
  function broadcast(){
    const now=Date.now(),val=T.tiles?makeValuer(T.tiles):null;
    for(const p of T.players){const send=links.get(p.pid);if(send)send({t:'view',v:C.viewFor(T,p.pid,val),now});}
    persist();dirty=false;
  }
  const soon=()=>{if(!dirty){dirty=true;setTimeout(()=>{if(dirty)broadcast();},60);}};
  // ---- журнал стола (хозяин): очередь ходов, броски, рента и кому, предложения, итог ----
  // Отдельная «партия» в таблице: runId mp-<КОД>-m<матч>-table. Время — часы хозяина: at (с поясом), t, sec от старта.
  const TL=window.ABTelemetry,tlog=[];let tlast=null,tRollN=null;
  const pname=id=>(T.players.find(p=>p.pid===id)||{}).name||id;
  function tev(type,d){if(!TL)return;const now=Date.now();
    tlog.push(Object.assign({type,t:now,at:TL.isoLocal(now),sec:T.startedAt?Math.round((now-T.startedAt)/100)/10:null,room,match:T.match,
      turnN:T.turn?T.turn.n:null,round:T.turn?T.turn.round:null},d||{}));
    if(tlog.length>=10)tsend();}
  function tsum(){const s={kind:'mp_table',runId:`mp-${room}-m${T.match}-table`,player:`стол ${room} · хозяин ${pname(PID)}`,
      version:typeof VERSION!=='undefined'?VERSION:'',build:TL.build,mpBuild:window.AB_MP_BUILD||null,
      startedAt:T.startedAt||null,startedAtISO:T.startedAt?TL.isoLocal(T.startedAt):null,updatedAtISO:TL.isoLocal(Date.now()),
      tz:(()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone;}catch(e){return '';}})(),
      phase:T.phase,settings:T.settings,finalRound:T.finalRound||null,result:T.result||null,
      players:T.players.map(p=>({pid:p.pid,name:p.name,seat:p.seat,color:p.color,online:p.online,laps:p.s?p.s.laps||0:0,cash:p.s?Math.round(p.s.cash||0):0})),
      mp:{room,match:T.match,host:true,players:T.players.length},finished:T.phase==='over'};
    try{if(T.tiles)s.ranking=C.ranking(T,makeValuer(T.tiles)).map(r=>({pid:r.pid,name:r.name,seat:r.seat,total:Math.round(r.total||0),cash:Math.round(r.cash||0)}));}catch(e){}
    return s;}
  function tsend(force){if(!TL||!T.match||(!tlog.length&&!force))return;TL.enqueue(tsum(),tlog.splice(0,tlog.length));TL.pump();}
  addEventListener('abtm:flush',e=>tsend(e.detail&&e.detail.final&&T.phase!=='lobby'));
  function observe(){
    const tr=T.turn,snap={phase:T.phase,n:tr?tr.n:null,paused:!!T.paused,final:T.finalRound||null,
      online:T.players.map(p=>p.pid+(p.online?'+':'-')).join(',')};
    if(!tlast){tlast=snap;return;}
    if(snap.phase!==tlast.phase){
      if(snap.phase==='play')tev('match_start',{players:T.players.map(p=>({pid:p.pid,name:p.name,seat:p.seat,color:p.color})),rounds:T.settings.rounds,turnSec:T.settings.turnSec});
      if(snap.phase==='over'){tev('match_over',{result:T.result,durationSec:T.startedAt?Math.round((Date.now()-T.startedAt)/1000):null});tsend(true);}
    }
    if(snap.phase==='play'&&snap.n!==tlast.n&&tr)tev('turn',{pid:tr.pid,name:pname(tr.pid),seat:(T.players.find(p=>p.pid===tr.pid)||{}).seat,timedOutPrev:!!(tlast.n&&tr.timedOut)});
    if(snap.paused!==tlast.paused)tev('pause',snap.paused?{on:true,by:T.paused.by,name:T.paused.name||pname(T.paused.by)}:{on:false});
    if(snap.final!==tlast.final&&snap.final)tev('final_round',{round:snap.final,by:T.finalBy,name:pname(T.finalBy)});
    if(snap.online!==tlast.online)tev('presence',{players:T.players.map(p=>({pid:p.pid,name:p.name,online:p.online}))});
    tlast=snap;
  }
  function handle(pid,msg,send){
    // Что пришло от игрока — в журнал стола до и после применения правил.
    const known=T.applied?new Set(Object.keys(T.applied)):new Set();
    const r=handle0(pid,msg,send);
    try{
      if(msg&&msg.t==='state'&&msg.pack&&T.phase==='play'){
        const pk=msg.pack;
        if(pk.dice&&tRollN!==T.turn.n&&T.turn.pid===pid){tRollN=T.turn.n;tev('roll',{pid,name:pname(pid),a:pk.dice.a,b:pk.dice.b,sum:pk.dice.a+pk.dice.b,double:pk.dice.a===pk.dice.b,pos:pk.s?pk.s.pos:null});}
        for(const c of pk.credits||[])if(c&&c.id&&T.applied&&T.applied[c.id]&&!known.has(c.id))
          tev(c.escrow?'offer':'credit',{from:pid,fromName:pname(pid),to:c.to,toName:pname(c.to),cash:c.cash,escrow:c.escrow||0,note:c.note||''});
      }
      if(msg&&msg.t==='evt'&&msg.e&&T.turn&&T.turn.pid===pid)tev('evt',Object.assign({from:pid,name:pname(pid)},msg.e));
      if(msg&&msg.t==='settings'&&pid===PID)tev('settings',{settings:T.settings});
      observe();
    }catch(e){console.warn('mp table log',e);}
    return r;
  }
  function handle0(pid,msg,send){
    if(!msg||typeof msg!=='object')return;
    const p=T.players.find(x=>x.pid===pid);if(p)p.seenAt=Date.now();
    switch(msg.t){
      case 'hello':{
        const r=C.join(T,pid,msg.name);
        if(!r.ok){send({t:'deny',error:r.error});return;}
        // Вернулся по имени из новой вкладки — получает прежний pid: на нём его клетки и срез.
        const eff=r.player.pid;
        r.player.seenAt=Date.now();links.set(eff,send);send({t:'welcome',room,host:eff===PID,seat:r.player.seat,pid:eff});soon();return eff;}
      case 'bye':C.leave(T,pid);links.delete(pid);soon();return;
      case 'ping':
        if(!p){send&&send({t:'rehello'});return;}            // хозяин нас не знает (перезагрузился, выкинул) — представиться заново
        if(!links.has(pid)||!p.online){p.online=true;links.set(pid,send);soon();}
        send&&send({t:'pong'});return;
      case 'state':if(C.applyState(T,pid,msg.pack,Date.now())){C.checkEarly(T);soon();}return;
      case 'end':if(C.endTurn(T,pid,msg.n,Date.now())){C.checkEarly(T);soon();}return;
      case 'pause':if(C.pause(T,pid,!!msg.on,Date.now()))soon();return;
      case 'tpause':if(p&&C.tablePause(T,pid,!!msg.on,Date.now(),p.name))soon();return;   // ручная пауза — любой игрок
      // Действие игрока (стройка, рента, мини-игра…) — остальным, для журнала и всплытий над клеткой.
      case 'evt':if(T.phase!=='play'||!T.turn||T.turn.pid!==pid||!msg.e)return;
        for(const q of T.players){if(q.pid===pid)continue;const s2=links.get(q.pid);if(s2)s2({t:'evt',from:pid,e:msg.e});}return;
      case 'settings':if(pid!==PID||T.phase!=='lobby')return;
        if('rounds' in msg)C.setRounds(T,msg.rounds);
        if('turnSec' in msg&&C.TURN_OPTIONS.includes(+msg.turnSec))T.settings.turnSec=+msg.turnSec;soon();return;
      case 'start':if(pid!==PID)return;
        {// поле стола — с чистого листа: цена стройки не должна зависеть от точек хозяина в прошлой партии
         const keep=S;S=Object.assign({},keep||{},{tiles:[]});let tiles;try{tiles=buildTiles().map(t=>Object.assign(t,{owner:null}));}finally{S=keep;}
         if(C.start(T,tiles,pl=>makeSlice(pl.name),Date.now()))soon();}return;
      case 'again':if(pid!==PID||T.phase!=='over')return;C.backToLobby(T);soon();return;
      case 'kick':if(pid!==PID||T.phase!=='lobby'||msg.pid===PID)return;{const s=links.get(msg.pid);s&&s({t:'deny',error:'kicked'});}links.delete(msg.pid);C.leave(T,msg.pid);soon();return;
    }
  }
  function drop(pid,send){if(links.get(pid)!==send)return;links.delete(pid);C.leave(T,pid);soon();}
  setInterval(()=>{
    const now=Date.now();
    // Молчит дольше 9 с — считаем отвалившимся (закрытие соединения приходит не всегда).
    for(const p of T.players)if(p.pid!==PID&&p.online&&p.seenAt&&now-p.seenAt>9000){C.leave(T,p.pid);links.delete(p.pid);p.offAt=now;dirty=false;soon();}
    if(T.phase==='lobby')for(const p of T.players.slice())if(p.pid!==PID&&!p.online&&now-(p.offAt||0)>15000){T.players=T.players.filter(x=>x!==p);soon();}
    const r=C.tick(T,now);
    if(r==='timeout'){const send=links.get(T.turn.pid);send&&send({t:'timeout',n:T.turn.n});try{tev('timeout',{pid:T.turn.pid,name:pname(T.turn.pid)});}catch(e){}}
    if(r){C.checkEarly(T);soon();}
    try{observe();}catch(e){}
  },250);
  setInterval(broadcast,3000);      // заодно пульс: клиенты по нему видят, что связь жива
  return {T,handle,drop,room};
}
async function hostTable(room){
  const saved=ls('abmp_host_'+room);let restored=null;
  if(ss('abmp_hosting')===room&&saved){try{restored=JSON.parse(saved);}catch(e){}}
  ss('abmp_hosting',room);
  hub=Hub(room,restored);
  window.MPHub=hub;
  if(NET_LOCAL){
    const ch=new BroadcastChannel(peerId(room));const sends=new Map();
    ch.onmessage=e=>{const d=e.data;if(!d||d.to!=='hub'||!d.from)return;
      let send=sends.get(d.from);if(!send){send=m=>ch.postMessage({to:d.from,msg:m});sends.set(d.from,send);}
      hub.handle(d.from,d.msg,send);};
  } else if(NET==='relay'){
    status('Подключаемся к ретранслятору…');
    const bus=await openBus(room);status('');
    const sends=new Map();
    bus.sub('hub',d=>{if(!d||!d.from)return;
      let send=sends.get(d.from);if(!send){const to=d.from;send=m=>bus.pub('c/'+to,m);sends.set(to,send);}
      hub.handle(d.from,d.msg,send);});
  } else {
    await loadPeer();
    await new Promise((resolve,reject)=>{
      let tries=0;
      const open=()=>{
        const peer=new Peer(peerId(room),{debug:1});
        peer.on('open',()=>{status('');resolve();});
        peer.on('connection',conn=>{
          let pid=null;const send=m=>{try{conn.open&&conn.send(JSON.stringify(m));}catch(e){}};
          conn.on('data',d=>{let m=d;try{if(typeof d==='string')m=JSON.parse(d);}catch(e){return;}
            if(m&&m.t==='hello'){pid=hub.handle(m.pid,m,send)||m.pid;return;}
            if(pid)hub.handle(pid,m,send);});
          conn.on('close',()=>{if(pid)hub.drop(pid,send);});
          conn.on('error',()=>{if(pid)hub.drop(pid,send);});
        });
        peer.on('disconnected',()=>{try{peer.reconnect();}catch(e){}});
        peer.on('error',e=>{
          // После перезагрузки брокер ещё держит старый адрес стола — ждём и пробуем снова.
          if(e.type==='unavailable-id'&&tries++<12){status('Занимаем стол '+room+'…');peer.destroy();setTimeout(open,2500);return;}
          if(e.type==='peer-unavailable')return;   // клиент ушёл — не беда
          console.warn('PeerJS',e.type,e);if(tries>=12)reject(e);
          status('Связь: '+(e.type||e.message));
        });
      };
      open();
    });
  }
  // Сам хозяин — такой же клиент, только без сети.
  connectAsClient(room,true);
}

// ---------- клиент ----------
let net=null,lastMsgAt=0;
function connectAsClient(room,isHost){
  let welcomed=false,helloT=0;
  const hello=()=>net.send({t:'hello',pid:PID,name:myName});
  if(isHost){
    const send=m=>queueMicrotask(()=>onMessage(clone(m)));
    net={send:m=>hub.handle(PID,clone(m),send),host:true};
    hello();return;
  }
  if(NET_LOCAL){
    const ch=new BroadcastChannel(peerId(room));
    ch.onmessage=e=>{const d=e.data;if(d&&d.to===PID)onMessage(d.msg);};
    net={send:m=>ch.postMessage({to:'hub',from:PID,msg:m}),host:false};
    const again=()=>{if(!welcomed){hello();helloT=setTimeout(again,1500);}};again();
    net.onWelcome=()=>{welcomed=true;clearTimeout(helloT);};
  } else if(NET==='relay'){
    net={send:()=>{},host:false};
    const t0=Date.now();
    openBus(room).then(bus=>{
      const inbox=m=>onMessage(m);
      bus.sub('c/'+PID,inbox);
      net.send=m=>bus.pub('hub',{from:PID,msg:m});
      net.onPid=pid=>bus.sub('c/'+pid,inbox);         // вернулся по имени — хозяин отдал прежний pid
      // Хозяин может появиться позже — представляемся, пока не ответит.
      const again=()=>{if(welcomed||net.stopped)return;hello();
        if(Date.now()-t0>12000)status(`Стол ${room} не отвечает. Проверь код и что у хозяина открыт стол и не погас экран.`);
        helloT=setTimeout(again,2000);};
      again();
    }).catch(e=>{status('Нет связи с ретранслятором: '+e.message+'. Проверь интернет и обнови страницу.');console.error(e);});
    net.onWelcome=()=>{welcomed=true;clearTimeout(helloT);};
  } else {
    let conn=null,peer=null,retry=0;
    net={send:m=>{try{conn&&conn.open&&conn.send(JSON.stringify(m));}catch(e){}},host:false};
    const reconnect=()=>{clearTimeout(retry);retry=setTimeout(dial,2500);};
    const dial=()=>{
      if(!peer||peer.destroyed||peer.disconnected){try{peer&&peer.destroy();}catch(e){}peer=null;boot();return;}
      conn=peer.connect(peerId(room),{reliable:true});
      const c0=conn;setTimeout(()=>{if(c0===conn&&!c0.open){status('Прямое соединение не проходит через твою сеть. Открой ссылку без &net=p2p.');try{c0.close();}catch(e){}reconnect();}},15000);
      conn.on('open',()=>{hello();});
      conn.on('data',d=>{let m=d;try{if(typeof d==='string')m=JSON.parse(d);}catch(e){return;}onMessage(m);});
      conn.on('close',()=>{status('Нет связи со столом — переподключаемся…');reconnect();});
    };
    const boot=()=>{
      loadPeer().then(()=>{
        peer=new Peer({debug:1});
        peer.on('open',dial);
        peer.on('disconnected',()=>{try{peer.reconnect();}catch(e){}});
        peer.on('error',e=>{
          if(e.type==='peer-unavailable'){status(welcomed?'Хозяин стола пропал — ждём его…':'Стол '+room+' не найден — ждём хозяина…');reconnect();return;}
          console.warn('PeerJS',e.type,e);status('Связь: '+(e.type||e.message));reconnect();
        });
      }).catch(e=>{status('Не загрузилась связь (PeerJS). Проверь интернет.');console.error(e);});
    };
    boot();
    net.onWelcome=()=>{welcomed=true;};
  }
  // Пульс: хозяин узнаёт, что мы живы; мы — что жив он.
  setInterval(()=>{if(net.stopped)return;net.send({t:'ping'});
    if(lastMsgAt&&Date.now()-lastMsgAt>8000)status(net.host?'':'Нет связи со столом — переподключаемся…');},2500);
  addEventListener('pagehide',()=>{if(!net.host)net.send({t:'bye'});});
}

// =====================================================================
// Клиент: вид стола, ход, окна
// =====================================================================
let view=null,clockOff=0,curMatch=null,curTurn=null,mine=false,rolled=false,landed=false,ending=false,autoEnding=false,credits=[],creditSeq=0,shownOver=null;
const hostNow=()=>Date.now()+clockOff;
const myTurn=()=>!!view&&view.phase==='play'&&view.turn&&view.turn.pid===PID;
const playerOf=pid=>view&&view.players.find(p=>p.pid===pid);
const nameOf=pid=>(playerOf(pid)||{}).name||'соперник';
const colorOf=pid=>(playerOf(pid)||{}).color||'#6b5f52';
// Для логов (web/telemetry.js): код стола, место, имя, число игроков, время хозяина — в каждой записи игрока.
window.MPTele={hostNow,info(){const me=view&&playerOf(PID);return {room:ROOM,match:view?view.match:null,pid:PID,seat:me?me.seat:null,
  name:(me&&me.name)||myName,host:!!(net&&net.host),players:view?view.players.length:0,names:view?view.players.map(p=>p.name):[],
  rounds:view?view.settings.rounds:null,turnSec:view?view.settings.turnSec:null,startedAt:view?view.startedAt:null,phase:view?view.phase:null,
  turnN:view&&view.turn?view.turn.n:null,round:view&&view.turn?view.turn.round:null,clockOff,hostNow,mpBuild:window.AB_MP_BUILD||null};}};

function onMessage(m){
  lastMsgAt=Date.now();
  if(!m)return;
  switch(m.t){
    case 'welcome':net.onWelcome&&net.onWelcome();status('');
      if(m.pid&&m.pid!==PID){PID=m.pid;ss('abmp_pid',PID);net.onPid&&net.onPid(PID);}
      if(ROOM!==m.room){ROOM=m.room;}
      ss('abmp_joined_'+ROOM,'1');
      {const q=new URLSearchParams(location.search);q.set('map','sf');q.set('mp',ROOM);history.replaceState(null,'','?'+q.toString());}
      return;
    case 'deny':
      status('');net.stopped=true;      // не пустили — пульс больше не шлём, иначе хозяин посадит обратно
      lobbyError(m.error==='full'?'За столом уже четверо.':m.error==='started'?'Партия за этим столом уже идёт.':m.error==='kicked'?'Хозяин стола убрал тебя из лобби.':'Не пускают: '+m.error);
      return;
    case 'rehello':if(net.stopped)return;net.send({t:'hello',pid:PID,name:myName});return;
    case 'pong':if(!net.host&&document.querySelector('#mpStatus')?.textContent.startsWith('Нет связи'))status('');return;
    case 'timeout':if(myTurn()&&m.n===view.turn.n)autoFinish();return;
    case 'view':onView(m.v,m.now);return;
    case 'evt':onEvt(m.from,m.e);return;
  }
}
function onView(v,now){
  if(now)clockOff=now-Date.now();
  const prev=view;view=v;
  if(document.querySelector('#mpStatus')?.textContent.startsWith('Нет связи'))status('');
  if(v.phase==='lobby'){curMatch=null;curTurn=null;shownOver=null;hideOver();renderLobby();updateUi();return;}
  hideLobby();
  if(v.match!==curMatch){curMatch=v.match;curTurn=null;tokens.forEach(k=>k.pos=null);}
  const isMine=v.turn.pid===PID;
  if(v.phase==='play'&&v.turn.n!==curTurn){
    // rolled/landed — у хозяина стола: перезагрузка посреди своего хода не даёт бросить второй раз.
    const wasMine=mine;curTurn=v.turn.n;mine=isMine;rolled=!!(isMine&&v.turn.rolled);landed=!!(isMine&&v.turn.landed);ending=false;autoEnding=false;credits=[];
    if(wasMine&&!isMine)closeAll();
    adopt(v);
    if(isMine){reclaimOffers();yourTurn();}else followUntil=performance.now()+1600;   // камера — к фишке того, кто ходит
    mgReset();
  } else if(v.phase==='play'&&!isMine){adopt(v);}
  if(v.phase==='over'){mine=false;if(shownOver!==v.match){shownOver=v.match;closeAll();adopt(v);showOver(v);try{flush(true);}catch(e){}}}
  syncTokens(v);syncFlags();updateUi();
}
function adopt(v){
  if(!v.mine||!v.tiles)return;
  const s=clone(v.mine);s.tiles=toLocal(v.tiles);S=s;
  try{render();}catch(e){console.error(e);}
}
// Начало своего хода — «бах»: плакат «Твой ход!» выпрыгивает и улетает в кубик, кубик хлопается на место.
function yourTurn(){
  try{MobileHost.send({action:'home'});}catch(e){}                 // камера обратно к своему Джонни
  try{navigator.vibrate&&navigator.vibrate([40,40,80]);}catch(e){}
  try{GameFeedback&&GameFeedback.sound&&GameFeedback.sound('coin');}catch(e){}
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const b=el('div','mp-bang');b.innerHTML='<b>Твой ход!</b>';
  const dice=$('bRoll'),r=dice&&dice.getBoundingClientRect();
  setTimeout(answerOffers,reduced?1300:1700);
  if(reduced){b.animate([{opacity:0},{opacity:1,offset:.2},{opacity:1,offset:.8},{opacity:0}],{duration:1200}).finished.then(()=>b.remove());return;}
  const dx=r?r.left+r.width/2-innerWidth/2:0,dy=r?r.top+r.height/2-innerHeight*.42:200;
  b.animate([
    {transform:'translate(-50%,-50%) scale(.3) rotate(-8deg)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1.18) rotate(3deg)',opacity:1,offset:.16,easing:'cubic-bezier(.34,1.56,.64,1)'},
    {transform:'translate(-50%,-50%) scale(.96) rotate(-1deg)',offset:.24},
    {transform:'translate(-50%,-50%) scale(1) rotate(0)',offset:.30},
    {transform:'translate(-50%,-50%) scale(1) rotate(0)',offset:.72,easing:'cubic-bezier(.5,0,.8,.4)'},
    {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.2)`,opacity:.2},
  ],{duration:1500,fill:'forwards'}).finished.then(()=>{b.remove();
    // кубик «хлопается» на место: сжатие на контакте и отскок формы
    if(dice&&myTurn())dice.animate([{transform:'scale(1)'},{transform:'scale(1.3,.78)'},{transform:'scale(.9,1.14)'},{transform:'scale(1.05,.96)'},{transform:'scale(1)'}],
      {duration:420,easing:'ease-out'});
  });
}
function closeAll(){
  for(let i=0;i<3&&!$('modal').hidden;i++)closeModal();
  closeMinigame();
}
function closeMinigame(){
  const l=document.querySelector('.minigame-layer');if(!l)return;
  const b=l.querySelector('.sl-close,.mg-close,.sl-loading-close,[data-close],button[aria-label*="Закры"],.xclose');
  if(b)b.click();
}

// ---- отправка своего хода ----
let pushT=0;
function push(){
  if(!myTurn())return;
  clearTimeout(pushT);pushT=0;
  rollsToCash(landed||!rolled?999:998);
  net.send({t:'state',pack:{n:view.turn.n,s:sliceOf(S),tiles:toShared(S.tiles),credits,rolled,landed,dice:lastDice&&!lastDice.lesson?{a:lastDice.a,b:lastDice.b}:null}});
}
function pushSoon(){if(myTurn()&&!pushT)pushT=setTimeout(push,150);}
save=function(){pushSoon();};       // сохранение партии — у хозяина стола
// Ход = один бросок, запас ходов не нужен: любая награда ходами (задания, шанс, автомат…) становится налом.
function rollsToCash(base){
  const extra=(S.rolls|0)-base;if(extra<=0||!myTurn())return;
  const cash=extra*rollCash();S.rolls=base;S.cash+=cash;S.stat.earned=(S.stat.earned||0)+cash;
  toast(`🎲→💵 Ходы в партии не копятся — вместо ${extra} ${plural(extra,'хода','ходов','ходов')} +${money(cash)}`,2600);
  emit({kind:'bonus',text:`получил ${money(cash)} вместо ходов`,amount:cash,tile:S.pos});
}
(function(){const base=render;render=function(){const r=base.apply(this,arguments);try{mpRender();}catch(e){console.error(e);}if(myTurn()&&rolled)pushSoon();return r;};})();

function finishTurn(){
  if(!myTurn()||ending)return;
  // Не ответил на предложение до конца хода — отказ, деньги покупателю возвращаются.
  for(const t of S.tiles)if(t.owner&&t.mpOffer)declineOffer(t,true);
  ending=true;closeAll();push();net.send({t:'end',n:view.turn.n});updateUi();
}
async function autoFinish(){
  if(autoEnding)return;autoEnding=true;
  toast('⏱ Время хода вышло',2200);
  if(!rolled&&!moving){try{roll();}catch(e){}}
  // Бросок и событие клетки доигрываются; окна закрываются сами.
  for(let i=0;i<120;i++){
    if(!$('modal').hidden)closeModal();closeMinigame();
    if(!moving&&rolled&&$('modal').hidden&&!document.querySelector('.minigame-layer'))break;
    await wait(150);
  }
  finishTurn();
}

// ---- бросок только в свой ход, один раз ----
(function(){const base=prototypeRoll;prototypeRoll=async function(){
  if(!view||view.phase!=='play'){toast('Партия ещё не началась');return;}
  if(!myTurn()){toast(`Сейчас ходит ${nameOf(view.turn.pid)}`);return;}
  if(rolled||ending){toast('Бросок уже был — жми «Передать ход»');return;}
  rolled=true;S.rolls=999;lastDice=null;push();
  try{await base.apply(this,arguments);}finally{
    landed=true;rollsToCash(998);S.rolls=999;
    if(lastDice&&lastDice.a===lastDice.b&&!lastDice.lesson)doubleBonus(lastDice.a+lastDice.b);
    push();updateUi();}
};})();
let lastDice=null;
(function(){const base=mobileDice;mobileDice=async function(){const r=await base.apply(this,arguments);lastDice=r;return r;};})();
function doubleBonus(sum){
  const cash=dblCash(sum);S.cash+=cash;S.stat.earned=(S.stat.earned||0)+cash;
  plate('🎲🎲 Дубль!',cash);
  try{fly('💵',screenOfTile(S.pos),AT.cash(),flyN(cash),{pulse:'sCash'});}catch(e){}
  log(`🎲 Дубль ${sum/2}+${sum/2} — бонус ${money(cash)}.`);
  emit({kind:'double',text:`выбросил дубль`,amount:cash,tile:S.pos});
}
// Проход старта: продажи — соперникам в журнал.
(function(){const base=lapDone;lapDone=async function(){const before=S.cash;const r=await base.apply(this,arguments);
  const inc=Math.round(S.cash-before);if(inc>0)emit({kind:'pass',text:'прошёл старт — продажи',amount:inc,tile:0});return r;};})();
// Покупки и прокачки — соперникам в журнал (по телеметрии движка, она есть у каждого действия).
// Телеметрия уходит до того, как клетка поменялась (стройка: ещё «Пустырь»), — имя читаем на следующем такте.
// Стройка и перестройка на клетке: вложенное считается заново (наценка от прошлой покупки по предложению
// больше не прибавляется), висящее предложение соперника на старую точку — отказ с возвратом денег.
function onRebuild(t){if(!t)return;delete t.mpPrem;if(t.owner&&t.mpOffer)declineOffer(t,true);}
(function(){const base=track;track=function(type,d){if(myTurn()&&d&&d.tile!=null&&(type==='sf_rebuild'||type==='sf_build'))onRebuild(S.tiles[d.tile]);
  const r=base.apply(this,arguments);
  if(myTurn())setTimeout(()=>{try{trackToEvt(type,d||{});}catch(e){}},0);return r;};})();
function trackToEvt(type,d){
  const t=d.tile!=null?S.tiles[d.tile]:null,nm=t?(t.type==='biz'?bizName(t):pointName(t)):'';
  if(type==='sf_build')emit({kind:'build',text:`построил ${nm}`,amount:-(d.price||0),tile:d.tile});
  else if(type==='sf_rebuild')emit({kind:'build',text:`перестроил точку: теперь ${nm}`,amount:-(d.price||0)+(d.refund||0),tile:d.tile});
  else if(type==='buy_biz'||type==='buy_point')emit({kind:'build',text:`купил ${nm}`,amount:-(d.price||0),tile:d.tile});
  else if(type==='upgrade')emit({kind:'upgrade',text:`прокачал ${nm}`,amount:-(d.cost||0),tile:d.tile});
  else if(type==='sf_license'){const l=((window.SFBuilder&&SFBuilder.licenses)||[]).find(x=>x.id===d.id);emit({kind:'license',text:`купил лицензию «${l?l.name:d.id}»`,amount:-(d.price||0)});}
}
function emit(e){if(myTurn()&&net)net.send({t:'evt',e});}

// ---- мини-игра: часы хода стоят, итог — соперникам ----
// Источник — события 'minigame:open'/'minigame:close' (договорённость с «Американ Однорукий»),
// запасной — класс .minigame-layer в документе.
let mg=null;
const MG_NAMES={bandit:'однорукого бандита',slot:'однорукого бандита',dice21:'21 в кости'};
function mgOpen(id){if(mg){if(id&&mg.id==='minigame')mg.id=id;return;}mg={cash:S.cash,id:id||'minigame'};if(myTurn()){net.send({t:'pause',on:true});updateUi();}}
function mgClose(cash){if(!mg)return;const m=mg;mg=null;if(!myTurn())return;
  net.send({t:'pause',on:false});
  const d=Math.round(cash!=null&&isFinite(+cash)?+cash:S.cash-m.cash);
  if(d)emit({kind:'minigame',text:`${d>0?'выиграл':'проиграл'} в ${MG_NAMES[m.id]||'мини-игре'}`,amount:d,tile:S.pos});
  push();updateUi();}
function mgReset(){mg=null;}
addEventListener('minigame:open',e=>mgOpen(e.detail&&e.detail.id));
addEventListener('minigame:close',e=>mgClose(e.detail&&e.detail.cash));
setInterval(()=>{const on=!!document.querySelector('.minigame-layer');if(on&&!mg)mgOpen('minigame');else if(!on&&mg&&mg.id==='minigame')mgClose();},300);

// ---- чужая клетка: рента при остановке, перекуп в окне ----
(function(){const base=land;land=async function(t){
  if(!isRival(t)){
    // Копилка-джекпот («вдвоём угарно») — у неё нет окна мини-игры, выигрыш показываем соперникам сами.
    const before=S.cash,r=await base.apply(this,arguments),d=Math.round(S.cash-before);
    if(t&&t.type==='pot'&&d>0)emit({kind:'minigame',text:'сорвал копилку',amount:d,tile:t.i});
    return r;}
  S.landN=(S.landN||0)+1;
  if(t.drop)await collectDrop(t);
  payRent(t);render();
  const tb=$('tilebar');if(tb&&!tb.hidden){tb.classList.add('pulse');setTimeout(()=>tb.classList.remove('pulse'),2400);}
};})();
// id уникален и после перезагрузки посреди хода: хозяин стола отбрасывает повторы по id.
const creditTag=Date.now().toString(36);
function payRent(t){
  const r=rentOf(t),who=nameOf(t.rival),what=t.type==='biz'?bizName(t):pointName(t);
  S.cash-=r;credit(t.rival,r,`${esc(S.player)} → ${esc(who)}: рента ${money(r)}`);
  track('mp_rent',{tile:t.i,to:t.rival,amt:r});
  log(`🏠 ${what}, хозяин ${who}. Заплатил ренту ${money(r)}.`);
  plate(`🏠 Рента · ${who}`,-r,S.cash<0?'ты в минусе':what);
  emit({kind:'rent',text:`заплатил ренту за «${what}»`,amount:-r,tile:t.i,to:t.rival});
  const tok=tokens.get(t.rival);
  try{fly('💵',AT.cash(),tok&&tok.at?tok.at:AT.tile(t.i),flyN(r));}catch(e){}
  push();
}
function credit(to,cash,note,escrow){const c={id:`${PID}:${view.turn.n}:${creditTag}:${++creditSeq}`,to,cash:Math.round(cash),note};if(escrow)c.escrow=Math.round(escrow);credits.push(c);}
const titleOf=t=>t.type==='biz'?bizName(t):pointName(t);

// ---- предложение о покупке: покупатель ----
// Встал на чужую клетку (рента уплачена) — можно предложить хозяину вложенное × 1…10. Деньги уходят в резерв,
// чтобы их не потратить; одно предложение на клетку. Ответ хозяина — в начале его хода; молчание до конца хода — отказ.
async function rivalWindow(t){
  const biz=t.type==='biz',owner=t.rival,who=nameOf(owner),col=colorOf(owner),inv=invested(t),title=titleOf(t);
  const g=biz?null:good(t.good),here=S.pos===t.i,offer=t.mpOffer;
  const mine=offer&&offer.from===PID,busy=offer&&!mine,canOffer=myTurn()&&here&&!ending&&!offer;
  const rows=[
    biz?['Уровень',t.level]:['Уровень',t.salesLvl],
    biz?['За остановку',money(fee(t)*CFG.BIZ.landMult)]:['Прибыль хозяина за круг',money(sales(t)*marginOf(t.good))],
    ['Рента с тебя',money(rentOf(t))],
    biz?null:['Товар в точке',`${t.goods||0} шт`],
    ['Вложено хозяином',money(inv)],
  ].filter(Boolean);
  const opts=OFFER_MULTS.map(m=>{const a=Math.round(inv*m),ok=canOffer&&S.cash>=a;
    return `<button type="button" class="mp-mult buy-btn ${ok?'buy-ok':'buy-no'}" data-m="${m}" ${ok?'':'disabled'}><b>×${String(m).replace('.',',')}</b><span>${money(a)}</span></button>`;}).join('');
  const pending=modal(`<h2>${biz?bizIcon(t):g.icon} ${esc(title)}</h2>
    <p class="t mp-owner"><i style="background:${col}">${esc(who.slice(0,1).toUpperCase())}</i> Хозяин — <b style="color:${col}">${esc(who)}</b></p>
    ${rows.map(r=>`<div class="row"><span class="n">${r[0]}</span><span class="v">${r[1]}</span></div>`).join('')}
    ${mine?`<div class="mp-choice"><b>Твоё предложение — ${money(offer.amount)}</b><p>${esc(who)} ответит в начале своего хода. Деньги в резерве; откажет — вернутся.</p></div>`
     :busy?`<div class="mp-choice"><b>${esc(nameOf(offer.from))} уже предложил цену</b><p>Одно предложение на клетку — жди ответа ${esc(who)}.</p></div>`
     :`<div class="mp-choice"><b>${here?'Рента уплачена. Предложи хозяину цену:':'Встань на клетку — сможешь предложить цену.'}</b>
       <p>Сумма — от того, что ${esc(who)} вложил. ${esc(who)} решит в начале своего хода: согласится — ${biz?'бизнес':'точка'} твоя${biz?'':' вместе с товаром'}, откажет — деньги вернутся.</p>
       <div class="mp-mults">${opts}</div></div>`}`,
    [{t:'Уйти',v:0,cls:'sec'}]);
  $('card').querySelectorAll('.mp-mult').forEach(b=>b.onclick=()=>{if(!b.disabled)closeModal(+b.dataset.m);});
  const m=await pending;
  if(!m||!OFFER_MULTS.includes(m)||!isRival(t)||t.mpOffer||!myTurn()||S.pos!==t.i)return;
  const amount=Math.round(inv*m);if(S.cash<amount)return;
  S.cash-=amount;S.mpEscrow=(S.mpEscrow||0)+amount;
  t.mpOffer={from:PID,amount,mult:m,n:view.turn.n};
  track('mp_offer',{tile:t.i,to:owner,amount,mult:m});
  log(`💼 Предложил ${who} ${money(amount)} за «${title}» (×${m}).`);
  plate(`💼 Предложение · ${who}`,-amount,'деньги в резерве до ответа');
  emit({kind:'offer',text:`предлагает ${money(amount)} за «${title}»`,amount:null,tile:t.i,to:owner});
  save();render();push();
}

// ---- предложение о покупке: хозяин ----
async function answerOffers(){
  if(!myTurn()||ending||!S||!S.tiles)return;
  for(const t of S.tiles.filter(x=>x.owner&&x.mpOffer)){
    if(!myTurn()||ending)return;
    while((!$('modal').hidden||moving)&&myTurn()&&!ending)await wait(300);
    if(!t.mpOffer||!t.owner)continue;
    const o=t.mpOffer,who=nameOf(o.from),title=titleOf(t),inv=invested(t);
    const v=await modal(`<h2>💼 ${esc(who)} хочет купить «${esc(title)}»</h2>
      <p class="t">Предлагает <b>${money(o.amount)}</b> — это вложенное × ${String(o.mult).replace('.',',')} (ты вложил ${money(inv)}).</p>
      <div class="row"><span class="n">Рента с соперников за остановку</span><span class="v">${money(rentOfMine(t))}</span></div>
      <p class="t mp-buyout-note">Согласишься — деньги твои, ${t.type==='biz'?'бизнес уходит':'точка уходит вместе с товаром'}. Откажешь — ${esc(who)} получит деньги обратно. Не ответишь до конца хода — отказ.</p>`,
      [{t:`Продать · ${money(o.amount)}`,v:1,cls:'ok'},{t:'Отказать',v:0,cls:'sec'}]);
    if(!t.mpOffer||t.mpOffer!==o||!myTurn())continue;
    if(v===1)acceptOffer(t);else declineOffer(t,false);
  }
}
function rentOfMine(t){const keep=t.rival;t.rival=PID;t.owner=null;const r=rentOf(t);t.owner='you';if(keep)t.rival=keep;else delete t.rival;return r;}
function acceptOffer(t){
  const o=t.mpOffer,who=nameOf(o.from),title=titleOf(t);
  S.cash+=o.amount;S.stat.earned=(S.stat.earned||0)+o.amount;
  credit(o.from,0,`${esc(S.player)} продал «${esc(title)}» за ${money(o.amount)}`,-o.amount);   // резерв покупателя снят
  t.mpPrem=o.amount-baseInv(t);t.owner=null;t.rival=o.from;delete t.mpOffer;   // клетка — покупателю (вложено = уплачено)
  log(`🤝 Продал «${title}» за ${money(o.amount)}.`);
  plate(`🤝 Продано · ${who}`,o.amount,`«${title}»`);
  emit({kind:'sale',text:`продал «${title}»`,amount:o.amount,tile:t.i,to:o.from});
  save();render();push();
}
function declineOffer(t,silent){
  const o=t.mpOffer,title=titleOf(t);delete t.mpOffer;
  credit(o.from,o.amount,`${esc(S.player)} отказал в продаже «${esc(title)}»`,-o.amount);      // деньги из резерва — обратно
  if(!silent)log(`✋ Отказал ${nameOf(o.from)} в продаже «${title}».`);
  emit({kind:'decline',text:`отказал в продаже «${title}»`,amount:null,tile:t.i,to:o.from});
  if(!silent){save();render();}push();
}
// Хозяин так и не походил (отвалился, пропущен) — к своему следующему ходу покупатель забирает резерв обратно.
function reclaimOffers(){
  if(!myTurn())return;let back=0;
  for(const t of S.tiles)if(t.rival&&t.mpOffer&&t.mpOffer.from===PID&&t.mpOffer.n<view.turn.n){back+=t.mpOffer.amount;delete t.mpOffer;}
  if(back>0){S.cash+=back;S.mpEscrow=Math.max(0,(S.mpEscrow||0)-back);toast(`💼 Ответа не было — ${money(back)} вернулись из резерва`,2600);push();}
}
(function(){const base=kioskWindow;kioskWindow=function(t){return isRival(t)?rivalWindow(t):base.apply(this,arguments);};})();
(function(){const base=bizWindow;bizWindow=function(t){return isRival(t)?rivalWindow(t):base.apply(this,arguments);};})();
// Строка клетки: не свой ход — ничего не открываем; чужая клетка — окно хозяина.
{const tb=$('tilebar');if(tb)tb.addEventListener('click',e=>{
  if(!view||view.phase!=='play')return;
  if(!myTurn()||ending){e.stopImmediatePropagation();e.preventDefault();toast(`Сейчас ходит ${nameOf(view.turn.pid)}`);return;}
  const t=S.tiles[S.pos];
  if(isRival(t)&&!moving&&$('modal').hidden){e.stopImmediatePropagation();e.preventDefault();rivalWindow(t);}
},true);}
// Кубик: не свой ход — нажатие только подсказывает, чей ход.
{const b=$('bRoll');if(b)b.addEventListener('click',e=>{
  if(!view||view.phase!=='play'||myTurn()&&!rolled&&!ending)return;
  e.stopImmediatePropagation();e.preventDefault();
  if(view.phase==='play')toast(myTurn()?'Бросок уже был — жми «Передать ход»':`Сейчас ходит ${nameOf(view.turn.pid)}`);
},true);}

// =====================================================================
// Интерфейс поверх поля
// =====================================================================
const el=(tag,cls,parent=document.body)=>{const e=document.createElement(tag);if(cls)e.className=cls;parent.append(e);return e;};
const bar=el('div','mp-bar');bar.id='mpBar';bar.hidden=true;
const roundEl=el('span','mp-round',bar);roundEl.title='Круг — проход через старт. Партия кончается, когда кто-то первым пройдёт последний круг';
roundEl.innerHTML='Круг <b class="mp-rn"></b>';
const chipsEl=el('span','mp-chips',bar);
const pauseBtn=el('button','mp-pausebtn',bar);pauseBtn.type='button';pauseBtn.title='Пауза для всех';pauseBtn.setAttribute('aria-label','Пауза');pauseBtn.textContent='⏸';
pauseBtn.onclick=()=>{if(view&&view.phase==='play'&&!view.paused)net.send({t:'tpause',on:true});};
const pauseEl=el('div','mp-pause');pauseEl.hidden=true;
pauseEl.innerHTML='<div class="mp-pause-card"><b>Пауза</b><small></small><button type="button" class="mp-big">Продолжить</button></div>';
pauseEl.querySelector('button').onclick=()=>net.send({t:'tpause',on:false});
let lastRound=0,finalShown=null;
const tag=el('div','mp-tag');tag.id='mpTag';tag.hidden=true;
const endBtn=el('button','mp-end');endBtn.id='mpEnd';endBtn.hidden=true;endBtn.type='button';
endBtn.innerHTML='<b>Передать ход</b><small></small>';
endBtn.onclick=()=>{if(myTurn()&&rolled&&!moving)finishTurn();};
const clock=el('div','mp-clock');clock.id='mpClock';clock.hidden=true;
const statusEl=el('div','mp-status');statusEl.id='mpStatus';statusEl.hidden=true;
function status(text){statusEl.textContent=text||'';statusEl.hidden=!text;}

function mpRender(){
  // Чужая клетка под ногами: строка над доком ведёт в окно хозяина.
  const t=S&&S.tiles&&S.tiles[S.pos],tb=$('tilebar');
  if(tb&&isRival(t)&&!moving){
    tb.hidden=false;tb.disabled=false;tb.classList.remove('poor','off');
    $('tbText').textContent=`${t.type==='biz'?bizIcon(t):good(t.good).icon} ${t.type==='biz'?bizName(t):pointName(t)} · хозяин ${nameOf(t.rival)}`;
    const b=tb.querySelector('b');if(b)b.textContent='открыть';
  }
}
// Экран не гаснет, пока идёт партия: у хозяина стола погасший экран останавливает часы всего стола.
let wake=null;
function keepAwake(on){
  if(!('wakeLock' in navigator))return;
  if(on&&!wake&&document.visibilityState==='visible'){wake='pending';navigator.wakeLock.request('screen').then(l=>{wake=l;l.addEventListener('release',()=>{wake=null;});}).catch(()=>{wake=null;});}
  else if(!on&&wake&&wake!=='pending'){wake.release().catch(()=>{});wake=null;}
}
document.addEventListener('visibilitychange',()=>keepAwake(!!view&&(view.phase==='play'||net&&net.host)));
function updateUi(){
  const play=!!view&&view.phase==='play';
  keepAwake(play||!!(net&&net.host&&view));
  document.body.classList.toggle('mp-play',play);
  document.body.classList.toggle('mp-wait',play&&!myTurn());
  document.body.classList.toggle('mp-mine',play&&myTurn());
  document.body.classList.toggle('mp-rolled',play&&myTurn()&&rolled&&!ending);
  bar.hidden=!play;
  // Ручная пауза: плашка поверх поля у всех, «Продолжить» может нажать любой.
  const pz=play&&view.paused;pauseEl.hidden=!pz;document.body.classList.toggle('mp-paused',!!pz);
  if(pz)pauseEl.querySelector('small').textContent=`поставил${view.paused.by===PID?' ты':' '+(view.paused.name||nameOf(view.paused.by))}`;
  if(!play){tag.hidden=true;endBtn.hidden=true;return;}
  const val=view.turn;
  // Круг стола: цифра меняется тем же барабаном, что уровень точки при прокачке (NumberDrum).
  // Круг — проход через старт (решение продюсера 01.10). В полосе — круг лидера: по нему кончается партия.
  const M=view.settings.rounds,lead=Math.max(0,...view.players.map(p=>p.laps||0));
  const rn=roundEl.querySelector('.mp-rn'),round=Math.min(lead+1,M),txt=`${round}/${M}`;
  roundEl.classList.toggle('final',!!view.finalRound);
  if(view.finalRound&&finalShown!==view.match){finalShown=view.match;
    plate('🏁 Последний раунд',0,`${view.finalBy===PID?'Ты прошёл':(nameOf(view.finalBy)+' прошёл')} старт в ${M}-й раз — доигрываем раунд, потом итог`);}
  if(round!==lastRound){const before=lastRound?`${lastRound}/${view.settings.rounds}`:'';rn.textContent=txt;delete rn.dataset.drumValue;
    if(before&&round>lastRound){try{window.NumberDrum&&NumberDrum.update(rn,before);}catch(e){}
      roundEl.classList.remove('bump');void roundEl.offsetWidth;roundEl.classList.add('bump');}
    lastRound=round;}
  // На плейтесте число капитала (538, 899) никто не опознал — в полосе нал и число точек.
  bar.classList.toggle('tight',view.players.length>2);   // трое-четверо: компактные фишки, круг и пауза — второй строкой
  chipsEl.innerHTML=view.players.map(p=>`<span class="mp-chip${p.pid===val.pid?' on':''}${p.online?'':' off'}${p.pid===PID?' me':''}" style="--c:${p.color}">
      <i>${esc(p.name.slice(0,1).toUpperCase())}</i><span class="mp-nm">${esc(p.pid===PID?'Ты':p.name)}</span>
      <span class="mp-cap"><i class="cash-glyph"></i>${Math.round(p.cash).toLocaleString('en-US')}<span class="mp-pts">· ${p.cap?p.cap.points+p.cap.biz:0}${view.players.length>2?' т.':' точ.'}</span></span>
      ${p.online?'':'<em>офлайн</em>'}<u></u></span>`).join('');
  tick();
}
function tick(){
  if(!view||view.phase!=='play'||!view.turn){return;}
  const noLimit=!(view.settings.turnSec>0),tablePaused=!!view.paused;
  const paused=tablePaused||!!view.turn.paused;
  const left=noLimit?Infinity:tablePaused?(view.paused.left==null?Infinity:view.paused.left):view.turn.paused?(view.turn.left||0):view.turn.endsAt-hostNow();
  const total=(view.turn.landed?view.settings.turnSec*500:view.settings.turnSec*1000)||1;
  const late=!paused&&!noLimit&&left<10000;document.body.classList.toggle('mp-late',late&&myTurn()&&!ending);
  const u=bar.querySelector('.mp-chip.on u');if(u)u.style.width=noLimit?'100%':Math.max(0,Math.min(100,left/Math.max(total,left)*100))+'%';
  const me=myTurn();
  // Окно открыто: кнопка и плашка уходят под него, время хода — часами на углу карточки.
  const card=!$('modal').hidden&&$('card').getBoundingClientRect();
  if(card&&card.width&&me&&!ending&&!noLimit){
    const t=paused?'⏸ '+(isFinite(left)?mmss(left):''):'⏱ '+mmss(left);if(clock.textContent!==t)clock.textContent=t;clock.classList.toggle('late',late);
    clock.style.left=(card.right-8)+'px';clock.style.top=(card.top-6)+'px';clock.hidden=false;
  } else clock.hidden=true;
  const tm=tablePaused?'⏸ пауза':view.turn.paused?'⏸ мини-игра':noLimit?'':mmss(left);
  // После броска кубик превращается в «Передать ход» на том же месте.
  if(me&&rolled&&!ending){tag.hidden=true;endBtn.hidden=moving;{const sm=endBtn.querySelector('small');if(sm.textContent!==tm)sm.textContent=tm;}endBtn.classList.toggle('late',late);}
  else{
    endBtn.hidden=true;tag.hidden=false;
    // Свой ход до броска — плашка над кубиком; чужой — вместо кубика, кубик не висит заблокированным.
    tag.classList.toggle('mine',me&&!ending);tag.classList.toggle('center',!me||ending);tag.classList.toggle('late',late);
    tag.style.setProperty('--c',colorOf(view.turn.pid));
    const html=me&&!ending?`<b>Твой ход</b><small>${tm}</small>`:`<span>Ходит</span><b>${esc(nameOf(view.turn.pid))}</b><small>${tm}</small>`;
    if(tag._h!==html){tag._h=html;tag.innerHTML=html;}
  }
  const r=$('bRoll')&&$('bRoll').getBoundingClientRect();
  if(r&&r.width){const x=r.left+r.width/2,cy=r.top+r.height/2,above=r.top-8;
    const key=x+':'+cy;if(tag._k!==key){tag._k=key;
      tag.style.left=endBtn.style.left=x+'px';endBtn.style.top=cy+'px';endBtn.style.minWidth=Math.max(r.width,96)+'px';}
    // Свой ход до броска: плашка над кубиком, а если горит строка клетки — над ней, чтобы не закрывать «открыть».
    const tb=$('tilebar'),tr=tb&&!tb.hidden&&tb.getBoundingClientRect(),over=tr&&tr.height?Math.min(above,tr.top-8):above;
    const ty=(tag.classList.contains('center')?cy:over)+'px';if(tag.style.top!==ty)tag.style.top=ty;}
  // Под шапкой; если там же строка журнала денег («Американ Дебаг») или задач — ниже неё, чтобы не наезжать.
  let y=(($('top')&&$('top').getBoundingClientRect().bottom)||60)+6;
  for(const id of ['moneyJournal','mapTasks']){const n=$(id);if(n&&n.offsetParent){const q=n.getBoundingClientRect();if(q.height&&q.top<y+30)y=Math.max(y,q.bottom+6);}}
  const by=y+'px';if(bar.style.top!==by)bar.style.top=by;
}

// ---- фишки соперников и флажки их клеток поверх поля ----
const layer=el('div','mp-layer');layer.id='mpLayer';
const tokens=new Map(),flags=new Map();
const SEAT_DX=[-18,18,-10,10],SEAT_DY=[-4,-4,10,10];
function syncTokens(v){
  const live=new Set();
  for(const p of v.players){
    if(p.pid===PID)continue;live.add(p.pid);
    let k=tokens.get(p.pid);
    if(!k){const e=el('div','mp-token',layer);k={el:e,pos:null,path:[],t0:0,at:null};tokens.set(p.pid,k);}
    k.el.style.setProperty('--c',p.color);k.el.textContent=p.name.slice(0,1).toUpperCase();k.el.title=p.name;k.seat=p.seat;
    k.el.classList.toggle('off',!p.online);k.el.classList.toggle('on',v.turn&&v.turn.pid===p.pid);
    if(k.pos==null){k.pos=p.pos;k.path=[];}
    else if(p.pos!==k.pos){
      const d=(p.pos-k.pos+40)%40;
      if(d>0&&d<=12){const from=k.path.length?k.path[k.path.length-1]:k.pos;k.path=[];for(let i=1;i<=d;i++)k.path.push((k.pos+i)%40);k.from=k.pos;k.t0=performance.now();}
      else k.path=[];
      k.pos=p.pos;
    }
  }
  for(const [pid,k] of tokens)if(!live.has(pid)){k.el.remove();tokens.delete(pid);}
}
function syncFlags(){
  const want=new Map();
  if(view&&view.tiles&&view.phase!=='lobby')for(const t of view.tiles)if(t.owner&&t.owner!==PID&&(t.type==='kiosk'||t.type==='biz'))want.set(t.i,t.owner);
  for(const [i,f] of flags)if(!want.has(i)){f.el.remove();flags.delete(i);}
  for(const [i,pid] of want){let f=flags.get(i);if(!f){f={el:el('div','mp-flag',layer)};flags.set(i,f);}f.el.style.setProperty('--c',colorOf(pid));f.el.textContent=nameOf(pid).slice(0,1).toUpperCase();f.i=i;}
  const o=JSON.stringify(owners());if(o!==lastOwners){lastOwners=o;const d=owners();dispatchEvent(new CustomEvent('mp:owners',{detail:d}));try{MobileHost.send({action:'owners',owners:d});}catch(e){}}
}
// Кто чем владеет: {клетка: {pid, color, name, mine}} — для заливки клеток в цвет хозяина.
let lastOwners='';
function owners(){const o={};if(view&&view.tiles&&view.phase!=='lobby')for(const t of view.tiles)if(t.owner&&(t.type==='kiosk'||t.type==='biz')){const p=playerOf(t.owner);o[t.i]={pid:t.owner,color:p?p.color:'#6b5f52',name:p?p.name:'',mine:t.owner===PID};}return o;}

// ---- события соперников: журнал, всплытие над клеткой, плашка «тебе заплатили» ----
function onEvt(from,e){
  if(!e||!view)return;const p=playerOf(from);if(!p)return;
  const mine=e.to===PID,amount=e.amount==null?null:Math.round(e.amount);
  try{dispatchEvent(new CustomEvent('mp:event',{detail:{kind:e.kind,who:p.name,color:p.color,text:e.text,amount,tile:e.tile==null?null:e.tile,mine}}));}catch(x){}
  if(e.tile!=null&&amount)floatAt(e.tile,(amount>0?'+':'−')+money(Math.abs(amount)),amount>0?'#2f6b35':'#a92720');
  if(mine&&e.kind==='rent')plate(`🏠 Рента · ${p.name}`,-amount,'заплатил за '+e.text.replace(/^заплатил ренту за /,''));
  if(mine&&e.kind==='offer')plate(`💼 Предложение · ${p.name}`,0,e.text.replace(/^предлагает /,'')+' · ответ — в начале твоего хода');
  if(mine&&e.kind==='sale')plate(`🤝 ${p.name} согласился`,-amount,e.text.replace(/^продал /,'')+' теперь твоя');
  if(mine&&e.kind==='decline')plate(`✋ ${p.name} отказал`,0,'деньги вернулись из резерва');
}
function floatAt(i,text,color){
  if(!MobileHost.ready)return;const at=screenOfTile(i),f=el('div','mp-float');f.textContent=text;f.style.color=color;f.style.left=at.x+'px';f.style.top=(at.y-34)+'px';
  f.animate([{transform:'translate(-50%,0) scale(.6)',opacity:0},{transform:'translate(-50%,-14px) scale(1.15)',opacity:1,offset:.18,easing:'cubic-bezier(.34,1.56,.64,1)'},
    {transform:'translate(-50%,-26px) scale(1)',opacity:1,offset:.75},{transform:'translate(-50%,-40px) scale(.95)',opacity:0}],{duration:1900,easing:'ease-out'}).finished.then(()=>f.remove());
}
// Заметная плашка денег (рента, перекуп, дубль): «−5 монет» в тосте на плейтесте прошли мимо.
function plate(title,amount,sub){
  const p=el('div','mp-plate'+(amount<0?' minus':' plus'));
  p.innerHTML=`<b>${esc(title)}</b>${amount?`<strong>${amount<0?'−':'+'}${money(Math.abs(amount))}</strong>`:''}${sub?`<small>${esc(sub)}</small>`:''}`;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  p.animate(reduced?[{opacity:0},{opacity:1,offset:.1},{opacity:1,offset:.85},{opacity:0}]:[
    {transform:'translate(-50%,-50%) scale(.4) rotate(-6deg)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1.12) rotate(2deg)',opacity:1,offset:.1,easing:'cubic-bezier(.34,1.56,.64,1)'},
    {transform:'translate(-50%,-50%) scale(1) rotate(-1deg)',offset:.16},
    {transform:'translate(-50%,-50%) scale(1) rotate(-1deg)',opacity:1,offset:.82},
    {transform:'translate(-50%,-60%) scale(.9) rotate(-1deg)',opacity:0}],{duration:2400,fill:'forwards'}).finished.then(()=>p.remove());
  try{navigator.vibrate&&navigator.vibrate(amount<0?[30,40,30]:50);}catch(e){}
}
let followUntil=0;
// Камера в чужой ход следит за фишкой того, кто ходит: поле умеет только «следить за Джонни», поэтому
// мягко сдвигаем вид той же командой, что палец ('pan'). В свой ход — 'home', обратно к Джонни.
function followRival(now){
  if(!view||view.phase!=='play'||myTurn()||!MobileHost.ready)return;
  const k=tokens.get(view.turn.pid);if(!k||!k.at)return;
  if(k.path.length)followUntil=Math.max(followUntil,now+1200);
  if(now>followUntil)return;
  const fr=$('board-frame').getBoundingClientRect(),cx=fr.left+fr.width/2,cy=fr.top+fr.height*.55,dx=cx-k.at.x,dy=cy-k.at.y;
  if(Math.hypot(dx,dy)<18)return;
  MobileHost.send({action:'pan',dx:dx*.12,dy:dy*.12,input_width:fr.width});
}
function frame(now){
  requestAnimationFrame(frame);
  const show=!!view&&view.phase!=='lobby'&&MobileHost.ready;
  layer.hidden=!show;
  if(!show)return;
  for(const [,k] of tokens){
    let p;
    if(k.path.length){
      const f=(now-k.t0)/STEP_MS,idx=Math.floor(f);
      if(idx>=k.path.length){k.path=[];p=screenOfTile(k.pos);}
      else{const a=screenOfTile(idx===0?k.from:k.path[idx-1]),b=screenOfTile(k.path[idx]),q=f-idx;p={x:a.x+(b.x-a.x)*q,y:a.y+(b.y-a.y)*q-Math.sin(Math.PI*q)*14};}
    } else p=screenOfTile(k.pos||0);
    const x=p.x+(SEAT_DX[k.seat]||0),y=p.y+(SEAT_DY[k.seat]||0);k.at={x,y};
    k.el.style.transform=`translate(${x}px,${y}px)`;
  }
  for(const [,f] of flags){const p=screenOfTile(f.i);f.el.style.transform=`translate(${p.x}px,${p.y-26}px)`;}
  followRival(now);
  tick();
}
requestAnimationFrame(frame);

// =====================================================================
// Лобби и итог
// =====================================================================
const lobby=el('div','mp-lobby');lobby.id='mpLobby';lobby.hidden=true;
let lobbyErr='';
function lobbyError(t){lobbyErr=t;if(view&&view.phase!=='lobby'){view=null;}renderEntry();}
function link(){const q=new URLSearchParams();q.set('map','sf');q.set('mp',ROOM);if(NET!=='relay')q.set('net',NET);if(Q.has('mute'))q.set('mute','');return location.origin+location.pathname+'?'+q.toString().replace('mute=','mute');}
function showLobby(html){lobby.innerHTML=`<div class="mp-sheet">${html}</div>`;lobby.hidden=false;document.body.classList.add('mp-lobby-open');}
function hideLobby(){lobbyKey='';lobby.hidden=true;document.body.classList.remove('mp-lobby-open');}
function nameField(){return `<label class="mp-field"><span>Твоё имя</span><input id="mpName" maxlength="16" autocomplete="off" placeholder="Имя или ник" value="${esc(myName)}"></label>`;}
function readName(){const v=($('mpName')&&$('mpName').value||'').trim().slice(0,16);if(!v){$('mpName')&&$('mpName').focus();toast('Напиши имя — его увидят соперники');return null;}myName=v;ls('abmp_name',v);return v;}
function renderEntry(){
  if(ROOM&&!lobbyErr){
    showLobby(`<h2>🌉 Стол <span class="mp-code">${esc(ROOM)}</span></h2>
      <p class="mp-lead">Тебя зовут в Сан-Франциско: одно поле, ходы по очереди. Встал на чужую точку — плати ренту или перекупи её.</p>
      ${nameField()}<button class="mp-big" id="mpJoin">Сесть за стол</button>
      <a class="mp-solo" href="?map=sf&mp${Q.has('mute')?'&mute':''}">Открыть свой стол</a>`);
    const go=()=>{if(!readName())return;renderWait(`Садимся за стол ${ROOM}…`);connectAsClient(ROOM,false);};
    $('mpJoin').onclick=go;$('mpName').onkeydown=e=>{if(e.key==='Enter')go();};setTimeout(()=>{try{$('mpName').focus();}catch(e){}},60);
    return;
  }
  showLobby(`<h2>🌉 Сан-Франциско на двоих, троих, четверых</h2>
    <p class="mp-lead">Одно поле, ходы по очереди, на ход — полминуты. Встал на чужую точку — плати ренту или перекупи её. Кто сильнее к концу партии, тот и хозяин города.</p>
    ${lobbyErr?`<p class="mp-err">${esc(lobbyErr)}</p>`:''}
    ${nameField()}
    <button class="mp-big" id="mpHost">Открыть стол</button>
    <div class="mp-or"><span>или сесть к друзьям</span></div>
    <div class="mp-join"><input id="mpCode" maxlength="4" autocomplete="off" autocapitalize="characters" placeholder="КОД" value="${esc(ROOM)}"><button id="mpJoin">Сесть за стол</button></div>
    <a class="mp-solo" href="index.html?map=sf${Q.has('mute')?'&mute':''}">Играть одному</a>`);
  $('mpHost').onclick=()=>{if(!readName())return;lobbyErr='';const code=C.makeCode();ROOM=code;ls('abmp_host_'+code,null);ss('abmp_hosting','');renderWait('Открываем стол…');hostTable(code).catch(e=>{lobbyError('Стол не открылся: '+(e.type||e.message));});};
  const join=()=>{if(!readName())return;const code=C.normCode($('mpCode').value);if(code.length!==4){toast('Код — четыре буквы');$('mpCode').focus();return;}lobbyErr='';ROOM=code;renderWait(`Ищем стол ${code}…`);connectAsClient(code,false);};
  $('mpJoin').onclick=join;$('mpCode').onkeydown=e=>{if(e.key==='Enter')join();};
  $('mpCode').oninput=()=>{const c=C.normCode($('mpCode').value);if($('mpCode').value!==c)$('mpCode').value=c;};
}
function renderWait(text){showLobby(`<h2>🌉 Стол ${esc(ROOM)}</h2><p class="mp-lead">${esc(text)}</p><div class="mp-spin"></div><a class="mp-solo" href="?map=sf&mp${Q.has('mute')?'&mute':''}">Отмена</a>`);}
let qrFor='';
let lobbyKey='';
function renderLobby(force){
  const key=JSON.stringify([view.players.map(p=>[p.pid,p.name,p.seat,p.online]),view.settings,!!net&&net.host]);
  if(!force&&key===lobbyKey&&!lobby.hidden)return;lobbyKey=key;
  const host=!!net&&net.host,T=view,seats=[0,1,2,3].map(i=>T.players.find(p=>p.seat===i));
  const opt=(k,vals,cur,fmt)=>`<div class="mp-seg" data-k="${k}">${vals.map(v=>`<button class="${v===cur?'on':''}" data-v="${v}" ${host?'':'disabled'}>${fmt(v)}</button>`).join('')}</div>`;
  const n=T.players.length,est=Math.round(n*T.settings.rounds*6*(T.settings.turnSec||60)*0.45/60),estTxt=est>=90?`≈ ${Math.round(est/60)} ч`:`≈ ${est} мин`;
  showLobby(`<h2>🌉 Стол <span class="mp-code">${esc(T.room)}</span></h2>
    <div class="mp-share">
      <div class="mp-qr" id="mpQr"></div>
      <div class="mp-share-t"><p>Друзья сканируют QR или открывают ссылку — и сразу за столом. Можно ввести код на стартовом экране.</p>
        <button id="mpShare">Поделиться ссылкой</button><button class="sec" id="mpCopy">Скопировать</button>
        ${host?'<p class="mp-warn mp-host-note">Ты хозяин стола: игра идёт через твой телефон. Не закрывай вкладку и не гаси экран.</p>':''}
        ${/^(localhost|127\.|\[::1\])/.test(location.hostname)?'<p class="mp-warn">Игра открыта по localhost — телефонам ссылка не подойдёт. Открой по адресу Mac в сети.</p>':''}</div>
    </div>
    <div class="mp-seats">${seats.map((p,i)=>p?`<div class="mp-seat" style="--c:${p.color}"><i>${esc(p.name.slice(0,1).toUpperCase())}</i><b>${esc(p.name)}${p.pid===PID?' · ты':''}</b><small>${p.pid===T.host?'хозяин стола':C.COLOR_NAMES[i]}</small>${host&&p.pid!==PID?`<button class="mp-kick" data-pid="${esc(p.pid)}" aria-label="Убрать">✕</button>`:''}</div>`
      :`<div class="mp-seat empty" style="--c:${C.COLORS[i]}"><i></i><b>свободно</b><small>${C.COLOR_NAMES[i]}</small></div>`).join('')}</div>
    <div class="mp-set"><span>Кругов<small>проходов через старт</small></span>${opt('rounds',C.ROUND_OPTIONS,T.settings.rounds,v=>String(v))}</div>
    <div class="mp-set"><span>Время на ход<small>${T.settings.turnSec?'мини-игра часы не тратит':'без лимита — ход передаётся кнопкой'}</small></span>${opt('turnSec',C.TURN_OPTIONS,T.settings.turnSec,v=>v?v+' с':'∞')}</div>
    <p class="mp-est">${n>=2?`${estTxt} на ${n} ${plural(n,'игрока','игроков','игроков')} · досрочно выигрывает тот, кто первым возьмёт обе лицензии и 3 точки техники`:'Нужно минимум двое'}</p>
    ${host?`<button class="mp-big" id="mpStart" ${C.canStart(T)?'':'disabled'}>Начать</button>`:'<p class="mp-lead mp-waithost">Ждём, когда хозяин стола начнёт…</p>'}
    <a class="mp-solo" href="?map=sf&mp${Q.has('mute')?'&mute':''}">Выйти</a>`);
  lobby.querySelectorAll('.mp-seg button').forEach(b=>b.onclick=()=>{const k=b.parentNode.dataset.k;net.send({t:'settings',[k]:+b.dataset.v});});
  lobby.querySelectorAll('.mp-kick').forEach(b=>b.onclick=()=>net.send({t:'kick',pid:b.dataset.pid}));
  const st=$('mpStart');if(st)st.onclick=()=>net.send({t:'start'});
  $('mpShare').onclick=async()=>{const url=link();try{if(navigator.share){await navigator.share({title:'Америкэн бой — Сан-Франциско',text:`Садись за стол ${T.room}`,url});return;}}catch(e){if(e&&e.name==='AbortError')return;}copy(url);};
  $('mpCopy').onclick=()=>copy(link());
  drawQr();
}
function copy(text){(navigator.clipboard?navigator.clipboard.writeText(text):Promise.reject()).then(()=>toast('Ссылка скопирована')).catch(()=>{prompt('Ссылка на стол',text);});}
function drawQr(){
  const box=$('mpQr');if(!box)return;const url=link();
  const paint=()=>{box.innerHTML='';try{new QRCode(box,{text:url,width:132,height:132,colorDark:'#25221C',colorLight:'#F2E3BD',correctLevel:QRCode.CorrectLevel.M});qrFor=url;}catch(e){box.textContent=ROOM;}};
  if(window.QRCode)paint();else loadScript(QR_SRC).then(paint).catch(()=>{box.innerHTML=`<b class="mp-qr-code">${esc(ROOM)}</b>`;});
}

const over=el('div','mp-lobby mp-over');over.id='mpOver';over.hidden=true;
let showSeq=0;
function hideOver(){over.hidden=true;showSeq++;}
// Итог как шоу (плейтест 01.10): игроки по очереди, у каждого набегают очки по строкам — точки и их уровни,
// бизнесы, лицензии, товар, нал, минус кредиты, — в конце выскакивает победитель. Тап — пропустить.
function showOver(v){
  const ps=v.players.filter(p=>p.cap).map(p=>Object.assign({},p,p.cap));
  const rank=ps.slice().sort((a,b)=>b.total-a.total||b.cash-a.cash||a.seat-b.seat);
  const r=v.result||{},win=r.winner?ps.find(p=>p.pid===r.winner)||rank[0]:rank[0];
  const laps=r.laps||v.settings.rounds;
  const sub=r.why==='early'?'Досрочно: кто-то взял обе лицензии и 3 точки техники.':`${r.finalBy?esc(nameOf(r.finalBy))+' первым прошёл':'Пройдено'} ${laps} ${plural(laps,'круг','круга','кругов')}. Считаем, кто сильнейший.`;
  const lines=p=>[
    p.points?{k:'pts',t:`Точки ×${p.points}`,s:`сумма уровней ${p.levels}`,v:p.ptsInv}:null,
    p.biz?{k:'biz',t:`Бизнесы ×${p.biz}`,v:p.bizInv}:null,
    p.lic?{k:'lic',t:'Лицензии',v:p.lic}:null,
    p.goods?{k:'goods',t:'Товар в точках',v:p.goods}:null,
    {k:'cash',t:'Нал',v:p.cash},
    p.debt?{k:'debt',t:'Кредиты',v:-p.debt}:null,
  ].filter(Boolean);
  const order=ps.slice().sort((a,b)=>a.seat-b.seat);
  over.innerHTML=`<div class="mp-sheet mp-show"><h2>🏆 Итоги партии</h2><p class="mp-lead">${sub}</p>
    <div class="mp-cards">${order.map(p=>`<div class="mp-card" data-pid="${esc(p.pid)}" style="--c:${p.color}">
      <div class="mp-card-h"><i>${esc(p.name.slice(0,1).toUpperCase())}</i><b>${esc(p.name)}${p.pid===PID?' · ты':''}</b><strong class="mp-sum">$0</strong></div>
      <div class="mp-lines">${lines(p).map(l=>`<div class="mp-line${l.v<0?' neg':''}" data-v="${l.v}"><span>${l.t}${l.s?` <small>${l.s}</small>`:''}</span><b>${l.v<0?'−':''}$0</b></div>`).join('')}</div>
      <div class="mp-crown">👑 Хозяин Сан-Франциско</div></div>`).join('')}</div>
    <div class="mp-after" hidden>${net&&net.host?'<button class="mp-big" id="mpAgain">Ещё партию</button>':'<p class="mp-lead mp-waithost">Хозяин стола может начать ещё партию.</p>'}
    <a class="mp-solo" href="index.html?map=sf${Q.has('mute')?'&mute':''}">Играть одному</a></div>
    <button class="mp-skip" id="mpSkip">Пропустить ▸</button></div>`;
  over.hidden=false;
  const a=$('mpAgain');if(a)a.onclick=()=>net.send({t:'again'});
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let skip=reduced;const seq=++showSeq,cancelledNow=()=>seq!==showSeq||over.hidden;
  $('mpSkip').onclick=()=>{skip=true;};
  const sleep=ms=>new Promise(res=>setTimeout(res,skip?0:ms));
  const countTo=(node,from,to,ms,neg)=>new Promise(res=>{
    if(skip||ms<=0){node.textContent=(neg?'−':'')+money(Math.abs(to));res();return;}
    const t0=performance.now();const step=now=>{if(cancelledNow())return res();const k=Math.min(1,(now-t0)/ms),e=1-Math.pow(1-k,3),val=from+(to-from)*e;
      node.textContent=(neg?'−':'')+money(Math.abs(val));if(k<1&&!skip)requestAnimationFrame(step);else{node.textContent=(neg?'−':'')+money(Math.abs(to));res();}};
    requestAnimationFrame(step);});
  (async()=>{
    for(const p of order){
      if(cancelledNow())return;
      const card=over.querySelector(`.mp-card[data-pid="${CSS.escape(p.pid)}"]`);if(!card)continue;
      card.classList.add('live');card.scrollIntoView({block:'nearest',behavior:skip?'auto':'smooth'});
      const sum=card.querySelector('.mp-sum');let total=0;
      for(const line of card.querySelectorAll('.mp-line')){
        line.classList.add('on');const val=+line.dataset.v,b=line.querySelector('b');
        await Promise.all([countTo(b,0,val,420,val<0),countTo(sum,total,total+val,420,total+val<0)]);
        total+=val;try{GameFeedback&&GameFeedback.sound&&GameFeedback.sound('coin');}catch(e){}
        await sleep(160);
      }
      card.classList.remove('live');card.classList.add('done');await sleep(350);
    }
    const wc=over.querySelector(`.mp-card[data-pid="${CSS.escape(win.pid)}"]`);
    over.querySelectorAll('.mp-card').forEach(c=>c.classList.toggle('lose',c!==wc));
    if(wc){wc.classList.add('win');wc.scrollIntoView({block:'nearest'});}
    try{GameFeedback&&GameFeedback.sound&&GameFeedback.sound(win.pid===PID?'reward':'coin');}catch(e){}
    try{navigator.vibrate&&navigator.vibrate([60,60,120]);}catch(e){}
    const after=over.querySelector('.mp-after');if(after)after.hidden=false;const sk=$('mpSkip');if(sk)sk.remove();
  })();
}

// ---- вход ----
async function enter(){
  try{if(window.GameStart&&GameStart.whenEntered)await GameStart.whenEntered;}catch(e){}
  if(ROOM&&ss('abmp_hosting')===ROOM&&ls('abmp_host_'+ROOM)&&myName){renderWait('Возвращаем стол…');hostTable(ROOM).catch(e=>lobbyError('Стол не открылся: '+(e.type||e.message)));return;}
  // Уже сидел за этим столом в этой вкладке — возвращаем сразу; пришёл по ссылке — сначала имя.
  if(ROOM&&myName&&ss('abmp_joined_'+ROOM)){renderWait(`Садимся за стол ${ROOM}…`);connectAsClient(ROOM,false);return;}
  renderEntry();
}
window.MP={get view(){return view;},get pid(){return PID;},finishTurn,rentOf:t=>rentOf(t),invested,owners};
setTimeout(enter,0);
})();
