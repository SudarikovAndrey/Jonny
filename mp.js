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
const BUYOUT=1.5;         // перекуп: вложенное × 1,5, хозяин получает всё (Передел §8: +15%, здесь нет драки — дороже)
const STEP_MS=170;        // шаг чужой фишки по клетке
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
(function(){const base=newGame;newGame=function(){const r=base.apply(this,arguments);patchSolo(S);if(!BASE){BASE=clone(S);delete BASE.tiles;}return r;};})();
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
  let v=window.SFBuilder?SFBuilder.price(t.base):t.price||0;
  for(let l=1;l<(t.salesLvl||1);l++)v+=salesCost({base:t.base,good:t.good,salesLvl:l});
  return v;
}
const invested=t=>baseInv(t)+(t.mpPrem||0);
function coveredIn(tiles,pid){return new Set(tiles.filter(t=>t.type==='kiosk'&&t.owner===pid&&t.base&&!t.lot).map(t=>t.base)).size;}
function makeValuer(tiles){
  const cov={};
  const v=(t,pid)=>{
    if(!(pid in cov))cov[pid]=coveredIn(tiles,pid);
    const goods=t.type==='kiosk'&&t.base?(t.goods||0)*good(t.good).sell*(1+prosp()*cov[pid]):0;
    return {inv:invested(t),goods};
  };
  // Лицензии — тоже вложение: кто купил «Технику», не должен выглядеть слабее того, кто копит.
  v.extra=p=>{const lic=p.s&&p.s.sf&&p.s.sf.lic||{};return ((window.SFBuilder&&SFBuilder.licenses)||[]).reduce((a,l)=>a+(lic[l.id]?l.price:0),0);};
  return v;
}
function rentOf(t){
  if(t.type==='biz')return Math.round(fee(t)*CFG.BIZ.landMult);
  const g=good(t.good),cov=coveredIn(toShared(S.tiles),t.rival);
  return Math.max(1,Math.round(RENT_LAPS*sales(t)*Math.max(1,g.sell-g.buy)*(1+prosp()*cov)));
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
  function handle(pid,msg,send){
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
      case 'settings':if(pid!==PID||T.phase!=='lobby')return;
        if(C.ROUND_OPTIONS.includes(+msg.rounds))T.settings.rounds=+msg.rounds;
        if(C.TURN_OPTIONS.includes(+msg.turnSec))T.settings.turnSec=+msg.turnSec;soon();return;
      case 'start':if(pid!==PID)return;
        if(C.start(T,buildTiles().map(t=>Object.assign(t,{owner:null})),pl=>makeSlice(pl.name),Date.now()))soon();return;
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
    if(r==='timeout'){const send=links.get(T.turn.pid);send&&send({t:'timeout',n:T.turn.n});}
    if(r){C.checkEarly(T);soon();}
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
    const wasMine=mine;curTurn=v.turn.n;mine=isMine;rolled=false;landed=false;ending=false;autoEnding=false;credits=[];
    if(wasMine&&!isMine)closeAll();
    adopt(v);
    if(isMine)yourTurn();
  } else if(v.phase==='play'&&!isMine){adopt(v);}
  if(v.phase==='over'){mine=false;if(shownOver!==v.match){shownOver=v.match;closeAll();adopt(v);showOver(v);}}
  syncTokens(v);syncFlags();updateUi();
}
function adopt(v){
  if(!v.mine||!v.tiles)return;
  const s=clone(v.mine);s.tiles=toLocal(v.tiles);S=s;
  try{render();}catch(e){console.error(e);}
}
function yourTurn(){
  toast('🎲 Твой ход!',1800);
  try{navigator.vibrate&&navigator.vibrate(60);}catch(e){}
  try{GameFeedback&&GameFeedback.sound&&GameFeedback.sound('coin');}catch(e){}
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
  net.send({t:'state',pack:{n:view.turn.n,s:sliceOf(S),tiles:toShared(S.tiles),credits,rolled,landed}});
}
function pushSoon(){if(myTurn()&&!pushT)pushT=setTimeout(push,150);}
save=function(){pushSoon();};       // сохранение партии — у хозяина стола
(function(){const base=render;render=function(){const r=base.apply(this,arguments);try{mpRender();}catch(e){console.error(e);}if(myTurn()&&rolled)pushSoon();return r;};})();

function finishTurn(){
  if(!myTurn()||ending)return;
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
  rolled=true;S.rolls=999;push();
  try{await base.apply(this,arguments);}finally{landed=true;push();updateUi();}
};})();

// ---- чужая клетка: рента при остановке, перекуп в окне ----
(function(){const base=land;land=async function(t){
  if(!isRival(t))return base.apply(this,arguments);
  S.landN=(S.landN||0)+1;
  if(t.drop)await collectDrop(t);
  payRent(t);render();
  const tb=$('tilebar');if(tb&&!tb.hidden){tb.classList.add('pulse');setTimeout(()=>tb.classList.remove('pulse'),2400);}
};})();
function credit(to,cash,note){credits.push({id:`${PID}:${view.turn.n}:${++creditSeq}`,to,cash:Math.round(cash),note});}
function payRent(t){
  const r=rentOf(t),who=nameOf(t.rival),what=t.type==='biz'?bizName(t):pointName(t);
  S.cash-=r;credit(t.rival,r,`${esc(S.player)} → ${esc(who)}: рента ${money(r)}`);
  track('mp_rent',{tile:t.i,to:t.rival,amt:r});
  log(`🏠 ${what}, хозяин ${who}. Заплатил ренту ${money(r)}.`);
  toast(`🏠 ${what}, хозяин ${who}. Рента ${money(r)}`+(S.cash<0?' · ты в минусе':''),3000);
  const tok=tokens.get(t.rival);
  try{fly('💵',AT.cash(),tok&&tok.at?tok.at:AT.tile(t.i),flyN(r));}catch(e){}
  push();
}
async function rivalWindow(t){
  const biz=t.type==='biz',who=nameOf(t.rival),col=colorOf(t.rival),price=Math.round(invested(t)*BUYOUT),can=myTurn()&&S.cash>=price&&S.pos===t.i&&!ending;
  const g=biz?null:good(t.good),title=biz?bizName(t):pointName(t);
  const rows=[
    biz?['Уровень',t.level]:['Уровень',t.salesLvl],
    biz?['За остановку',money(fee(t)*CFG.BIZ.landMult)]:['Прибыль хозяина за круг',money(sales(t)*Math.max(1,g.sell-g.buy))],
    ['Рента с тебя',money(rentOf(t))],
    biz?null:['Товар в точке',`${t.goods||0} шт`],
    ['Вложено хозяином',money(invested(t))],
  ].filter(Boolean);
  const v=await modal(`<h2>${biz?bizIcon(t):g.icon} ${esc(title)}</h2>
    <p class="t mp-owner"><i style="background:${col}">${esc(who.slice(0,1).toUpperCase())}</i> Хозяин — <b style="color:${col}">${esc(who)}</b></p>
    ${rows.map(r=>`<div class="row"><span class="n">${r[0]}</span><span class="v">${r[1]}</span></div>`).join('')}
    <p class="t mp-buyout-note">Перекуп — вложенное × ${String(BUYOUT).replace('.',',')}. ${esc(who)} получит всю сумму${biz?'':', товар остаётся в точке'}.</p>
    ${S.cash<price?`<div class="need mp-need">Не хватает · ${money(price)}</div>`:''}`,
    [{t:`Купить · ${money(price)}`,v:1,cls:'ok',dis:!can},{t:'Уйти',v:0,cls:'sec'}]);
  if(v!==1||!isRival(t)||S.cash<price||!myTurn())return;
  const owner=t.rival;
  S.cash-=price;credit(owner,price,`${esc(S.player)} перекупил «${esc(title)}» (хозяин ${esc(who)}) за ${money(price)}`);
  t.mpPrem=price-baseInv(t);t.owner='you';delete t.rival;
  S.stat.bought=(S.stat.bought||0)+1;
  track('mp_buyout',{tile:t.i,from:owner,price});
  log(`🤝 Перекупил «${title}» за ${money(price)}, хозяин был ${who}.`);
  toast(`🤝 «${title}» теперь твоя. ${who} получает ${money(price)}`,3200);
  try{fly('💵',AT.cash(),AT.tile(t.i),flyN(price));}catch(e){}
  save();render();push();
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
  bar.hidden=!play;
  if(!play){tag.hidden=true;endBtn.hidden=true;return;}
  const val=view.turn,act=playerOf(val.pid);
  bar.innerHTML=`<span class="mp-round">Круг <b>${Math.min(val.round,view.settings.rounds)}</b>/${view.settings.rounds}</span>`+
    view.players.map(p=>`<span class="mp-chip${p.pid===val.pid?' on':''}${p.online?'':' off'}${p.pid===PID?' me':''}" style="--c:${p.color}">
      <i>${esc(p.name.slice(0,1).toUpperCase())}</i><span class="mp-nm">${esc(p.pid===PID?'Ты':p.name)}</span>
      <span class="mp-cap"><i class="cash-glyph"></i>${Math.round((p.cap?p.cap.total:p.cash)).toLocaleString('en-US')}</span>
      ${p.online?'':'<em>офлайн</em>'}<u></u></span>`).join('');
  tick();
}
function tick(){
  if(!view||view.phase!=='play'||!view.turn){return;}
  const left=view.turn.endsAt-hostNow(),total=(view.turn.rolled?view.settings.turnSec*500:view.settings.turnSec*1000)||1;
  const u=bar.querySelector('.mp-chip.on u');if(u)u.style.width=Math.max(0,Math.min(100,left/Math.max(total,left)*100))+'%';
  const me=myTurn();
  // Окно открыто: кнопка и плашка уходят под него, время хода — часами на углу карточки.
  const card=!$('modal').hidden&&$('card').getBoundingClientRect();
  if(card&&card.width&&me&&!ending){
    const t='⏱ '+mmss(left);if(clock.textContent!==t)clock.textContent=t;clock.classList.toggle('late',left<8000);
    clock.style.left=(card.right-8)+'px';clock.style.top=(card.top-6)+'px';clock.hidden=false;
  } else clock.hidden=true;
  if(me&&rolled&&!ending){tag.hidden=true;endBtn.hidden=moving;{const t=mmss(left),sm=endBtn.querySelector('small');if(sm.textContent!==t)sm.textContent=t;}endBtn.classList.toggle('late',left<8000);}
  else{
    endBtn.hidden=true;tag.hidden=false;
    tag.classList.toggle('mine',me&&!ending);tag.classList.toggle('late',left<8000);
    tag.style.setProperty('--c',colorOf(view.turn.pid));
    const html=me&&!ending?`<b>Твой ход</b><small>${mmss(left)}</small>`:`<span>Ходит</span><b>${esc(nameOf(view.turn.pid))}</b><small>${mmss(left)}</small>`;
    if(tag._h!==html){tag._h=html;tag.innerHTML=html;}
  }
  // Над кубиком, а если над доком горит строка клетки — над ней, чтобы не закрывать «открыть».
  const r=$('bRoll')&&$('bRoll').getBoundingClientRect(),tb=$('tilebar'),tr=tb&&!tb.hidden&&tb.getBoundingClientRect();
  if(r&&r.width){const x=r.left+r.width/2,y=Math.min(r.top,tr&&tr.height?tr.top:Infinity)-8,px=x+'px',py=y+'px';
    if(tag.style.left!==px||tag.style.top!==py){tag.style.left=endBtn.style.left=px;tag.style.top=endBtn.style.top=py;}}
  const top=$('top')&&$('top').getBoundingClientRect();bar.style.top=((top&&top.bottom)||60)+6+'px';
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
  const n=T.players.length,est=Math.round(n*T.settings.rounds*T.settings.turnSec*0.6/60);
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
    <div class="mp-set"><span>Длина партии</span>${opt('rounds',C.ROUND_OPTIONS,T.settings.rounds,v=>v+' кругов')}</div>
    <div class="mp-set"><span>Время на ход</span>${opt('turnSec',C.TURN_OPTIONS,T.settings.turnSec,v=>v+' с')}</div>
    <p class="mp-est">${n>=2?`Примерно ${est} мин на ${n} игроков · досрочно — кто первым возьмёт обе лицензии и 3 точки техники`:'Нужно минимум двое'}</p>
    ${host?`<button class="mp-big" id="mpStart" ${C.canStart(T)?'':'disabled'}>Начать</button>`:'<p class="mp-lead mp-waithost">Ждём, когда хозяин стола начнёт…</p>'}
    <a class="mp-solo" href="?map=sf&mp${Q.has('mute')?'&mute':''}">Выйти</a>`);
  lobby.querySelectorAll('.mp-seg button').forEach(b=>b.onclick=()=>{const k=b.parentNode.dataset.k;net.send({t:'settings',[k]:+b.dataset.v,...(k==='rounds'?{turnSec:T.settings.turnSec}:{rounds:T.settings.rounds})});});
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
function hideOver(){over.hidden=true;}
function showOver(v){
  const rank=v.players.filter(p=>p.cap).map(p=>Object.assign({},p,p.cap)).sort((a,b)=>b.total-a.total||b.cash-a.cash||a.seat-b.seat);
  const r=v.result||{},win=r.winner?playerOf(r.winner):rank[0];
  const head=r.why==='early'?`${esc(win.pid===PID?'Ты':win.name)} — хозяин Сан-Франциско!`:`Круги вышли. Сильнейший — ${esc(win.pid===PID?'ты':win.name)}`;
  const sub=r.why==='early'?'Обе лицензии и три точки техники — город признал хозяина досрочно.':`За ${r.round||v.settings.rounds} ${plural(r.round||v.settings.rounds,'круг','круга','кругов')} больше всех капитала: нал, вложенное и товар в точках.`;
  if(r.why==='early'&&r.winner){const i=rank.findIndex(p=>p.pid===r.winner);if(i>0)rank.unshift(rank.splice(i,1)[0]);}
  over.innerHTML=`<div class="mp-sheet"><h2>🏆 ${head}</h2><p class="mp-lead">${sub}</p>
    <div class="mp-rank">${rank.map((p,i)=>`<div class="mp-place${i===0?' first':''}" style="--c:${p.color}"><span class="mp-n">${i+1}</span><i>${esc(p.name.slice(0,1).toUpperCase())}</i>
      <span class="mp-who"><b>${esc(p.name)}${p.pid===PID?' · ты':''}</b><small>нал ${money(p.cash)} · вложено ${money(p.inv)} · товар ${money(p.goods)} · точек ${p.points}</small></span>
      <b class="mp-tot">${money(p.total)}</b></div>`).join('')}</div>
    ${net&&net.host?'<button class="mp-big" id="mpAgain">Ещё партию</button>':'<p class="mp-lead mp-waithost">Хозяин стола может начать ещё партию.</p>'}
    <a class="mp-solo" href="index.html?map=sf${Q.has('mute')?'&mute':''}">Играть одному</a></div>`;
  over.hidden=false;
  const a=$('mpAgain');if(a)a.onclick=()=>net.send({t:'again'});
  try{GameFeedback&&GameFeedback.sound&&GameFeedback.sound(win.pid===PID?'reward':'coin');}catch(e){}
}

// ---- вход ----
async function enter(){
  try{if(window.GameStart&&GameStart.whenEntered)await GameStart.whenEntered;}catch(e){}
  if(ROOM&&ss('abmp_hosting')===ROOM&&ls('abmp_host_'+ROOM)&&myName){renderWait('Возвращаем стол…');hostTable(ROOM).catch(e=>lobbyError('Стол не открылся: '+(e.type||e.message)));return;}
  // Уже сидел за этим столом в этой вкладке — возвращаем сразу; пришёл по ссылке — сначала имя.
  if(ROOM&&myName&&ss('abmp_joined_'+ROOM)){renderWait(`Садимся за стол ${ROOM}…`);connectAsClient(ROOM,false);return;}
  renderEntry();
}
window.MP={get view(){return view;},get pid(){return PID;},finishTurn,rentOf:t=>rentOf(t),invested};
setTimeout(enter,0);
})();
