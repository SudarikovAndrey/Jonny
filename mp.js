// ===== Мультиплеер «Сан-Франциско» на 2–4 игрока (?map=sf&mp) =====
// Спек: черновики/америкэн-бой-мультиплеер.md. Правила стола — web/mp-core.js (MPCore).
// Поле и экономика — обычный движок Сан-Франциско: в свой ход клиент играет как в соло,
// после каждого save() шлёт хозяину стола свой срез S и общее поле. Не свой ход — только смотрит.
// Связь — через публичные MQTT-брокеры (по умолчанию), напрямую — &net=p2p (PeerJS), в одном браузере — &net=local.
(function(){
const Q=new URLSearchParams(location.search);
const TEST=Q.get('test')==='1';   // тестовый стол (решение продюсера 02.10): панель механик — web/mp-test.js; боты оттуда же, но на любом столе (backlog 02.10)
if(!Q.has('mp'))return;
if(Q.get('map')!=='sf'){Q.set('map','sf');location.replace(location.pathname+'?'+Q.toString());return;}
const C=window.MPCore;if(!C){console.error('MPCore не загружен');return;}

// ---- параметры режима ----
const prosp=()=>(window.SFBuilder&&+SFBuilder.prosp)||.06;   // надбавка города за категорию — SF.prosp; .06 — запас, пока SFBuilder.prosp не выставлен
const RENT_LAPS=1.5;      // рента: полторы круговой прибыли хозяина с точки (Передел §9: 75% × 2)
// Покупка чужой клетки — предложение хозяину (решение продюсера 01.10, вместо принудительного перекупа ×1,5):
// множитель от вложенного хозяином, хозяин принимает или отказывает в начале своего хода.
const OFFER_MULTS=[1,1.5,2,3,5,10];
const FORCE_MULT=10;        // принудительный выкуп чужой клетки без согласия хозяина (решение продюсера 01.10)
const GROUP_BONUS=0.25;     // соседняя клетка того же хозяина: +25% к ренте за каждую (рамку рисует Графика)
const BANK_SELL=0.5;        // банкротство: стартовая цена торгов и цена банка — половина вложенного
const FORCE_LAPS=2;         // выкуп ×10 — не чаще раза в два своих круга (решение продюсера 01.10)
// ---- поле партии: клетки «Шанса» (плейтест 4: в поле SF их не было — колода партии не выпадала ни разу) ----
// Три клетки, как в «Монополии», вместо пустырей 7, 22, 36. Соло-поле Сан-Франциско не меняется.
const MP_CHANCE_TILES=[7,22,36];
function mpBoard(tiles){for(const i of MP_CHANCE_TILES){const t=tiles[i];if(!t)continue;
  Object.assign(t,{type:'chance',zone:-1,owner:null,lot:false,base:null,goods:0});delete t.good;delete t.price;delete t.price0;}
  return tiles;}
// ---- вид локации: подложка поля по выбору хозяина стола (view.settings.boardMap); соло-настройку не трогаем ----
const mapName=id=>((C.BOARD_OPTIONS.find(b=>b[0]===id)||[])[1])||id;
const tableMap=()=>(view&&view.settings&&view.settings.boardMap)||'sanfrancisco';
boardMap=()=>tableMap();
let mapPending=null;
function frameMap(){try{return new URL($('board-frame').src,location.href).searchParams.get('map');}catch(e){return null;}}
// Перезагрузка поля — когда фишка и кубики стоят: иначе обрывается шаг хода. После sceneReady поле само попросит
// снимок (клетки, монеты, уровни), а мы заново шлём хозяев клеток и фишки соперников.
function applyBoardMap(){
  const id=tableMap();if(!id||frameMap()===id){mapPending=null;return;}
  if(mapPending===id)return;mapPending=id;
  (async()=>{for(let i=0;i<120&&(moving||document.body.classList.contains('dice-rolling'));i++)await wait(250);
    if(tableMap()!==id||frameMap()===id){mapPending=null;return;}
    const f=$('board-frame'),u=new URL(f.src,location.href);u.searchParams.set('map',id);
    MobileHost.ready=false;document.body.classList.remove('engine-ready');lastOwners='';rivalsSent='';
    f.src=u.pathname.split('/').pop()+u.search;mapPending=null;})();
}
(function(){const g=window.MobileGame;if(!g||!g.ready)return;const base=g.ready;g.ready=function(){const r=base.apply(this,arguments);lastOwners='';rivalsSent='';try{syncFlags();}catch(e){}return r;};})();
async function mapPicker(){
  if(!view)return;const host=!!(net&&net.host),cur=tableMap();
  if(!host){toast(`Карта: ${mapName(cur)} · меняет хозяин стола`,2400);return;}
  const btns=C.BOARD_OPTIONS.map(([id,name])=>`<button type="button" class="mp-map-pick buy-btn ${id===cur?'buy-no':'buy-ok'}" data-id="${id}" ${id===cur?'disabled':''}>${esc(name)}</button>`).join('');
  const pending=modal(`<h2>🗺 Карта стола</h2><p class="t">Меняется только вид поля у всех — клетки, деньги и владения остаются.</p><div class="mp-mults mp-maps">${btns}</div>`,[{t:'Закрыть',v:0,cls:'sec'}]);
  $('card').querySelectorAll('.mp-map-pick').forEach(b=>b.onclick=()=>{if(!b.disabled)closeModal('map:'+b.dataset.id);});
  const v=await pending;if(typeof v==='string'&&v.startsWith('map:'))net.send({t:'map',id:v.slice(4)});
}
// Автомат в партии: кубики платят по среднему доходу стола, как и остальные призы — одна таблица для всех игроков
// (продюсер 02.10: «у одного огромные выигрыши, у другого мелочь»: курс шёл от своего дохода).
window.MP_ROLL_CASH=()=>Math.max(10,r5((window.MP_LAP_P?window.MP_LAP_P():lapCash())/6));   // автомат: кубики платят налом по этому курсу (src/bandit/engine.js)
// Призы автомата в партии — от стадии игры: средний по игрокам доход за круг (решение продюсера 02.10), а не от своего.
// База призов автомата — средний доход стола, но не ниже MP_SLOT_BASE_MIN.
window.MP_SLOT_BASE=()=>Math.max(MP_SLOT_BASE_MIN,window.MP_LAP_P?window.MP_LAP_P():0);
window.MP_LAP_P=()=>{if(!view||!view.tiles||!view.players||!view.players.length)return 0;let sum=0;
  for(const t of view.tiles){if(!t.owner||!(t.type==='kiosk'||t.type==='biz'))continue;try{sum+=t.type==='biz'?fee(t):(t.base&&!t.lot?sales(t)*marginOf(t.good):0);}catch(e){}}
  return Math.round(sum/view.players.length);};
// Инспектор в партии: не по кругам, а с трёх владений (решение продюсера 01.10).
CFG.INSP.fromLap=0;CFG.INSP.minOwn=3;
CFG.HARD.bail=1;            // выход из участка — 1 кристалл вместо 3 (плейтест 02.10)
CFG.POLICE.attempts=2;      // плейтест 4: бросать на дубль — 2 попытки, после двух промахов выход без штрафа
CFG.BIZ.landMult=1.5;       // плейтест 4: остановка на чужом бизнесе — ×1,5 сбора вместо ×3 (Макс платил $162–221 при $70–100 на руках)
const MP_SLOT_BASE_MIN=100; // плейтест 4: база призов автомата не ниже $100 — в начале партии призы были «ерунда»
const MICRO_RATE=0.25,MICRO_MIN=100,MICRO_MAX=500,STOCK_SELL=0.5,DEBT_LAPS=2;   // микрозайм и продажа товара в минусе; торги принудительно — со второго круга в минусе
const STEP_MS=170;        // шаг чужой фишки по клетке
// Ручная пауза (плейтест 01.10: её спамили): две на игрока за партию, дальше — одна раз в 5 минут.
const PAUSE_FREE=2,PAUSE_CD_MS=5*60000;
const pauseWait=(u,now)=>!u||u.n<PAUSE_FREE?0:Math.max(0,u.at+PAUSE_CD_MS-now);   // лимит списывается с того, кто поставил паузу
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
// ---- версия сборки: защита от стола, открытого до выкладки (плейтест 5, 02.10) ----
// mp.html при загрузке записал подпись каждого файла (ETag) и id версии; здесь раз в 90 с и перед стартом партии
// спрашиваем сервер HEAD-запросом. Подпись поменялась — вышла новая версия: плашка у всех, хозяин не стартует.
let verStale=false,verAt=0;
const verLine=()=>{const id=(window.AB_VER||{}).id||'—';return verStale?`⚠ Вышла новая версия — <button type="button" class="mp-ver-reload">перезагрузи</button> · у тебя ${esc(id)}`:`версия ${esc(id)}`;};
async function verCheck(){
  const V=window.AB_VER;if(!V||!V.sig||Date.now()-verAt<4000)return verStale;verAt=Date.now();
  for(const [u,sg] of Object.entries(V.sig)){
    try{const r=await fetch(u+'?v='+Date.now(),{method:'HEAD',cache:'no-store'});if(!r.ok)continue;
      const now=r.headers.get('etag')||((r.headers.get('last-modified')||'')+'/'+(r.headers.get('content-length')||''));
      if(sg&&now&&now!==sg){if(!verStale){verStale=true;verBanner();}return true;}}catch(e){}
  }
  return verStale;
}
function verBanner(){
  const b=el('div','mp-ver-banner');b.innerHTML=`<b>Вышла новая версия игры</b><span>${view&&view.phase==='play'?'доиграйте партию и перезагрузите страницу':'перезагрузи страницу, чтобы играть в свежую'}</span><button type="button">Перезагрузить</button>`;
  b.querySelector('button').onclick=()=>location.reload();
  if(view&&view.phase==='lobby')renderLobby(true);
}
setInterval(()=>{verCheck();},90000);setTimeout(()=>{verCheck();},5000);
const mmss=ms=>{const s=Math.max(0,Math.ceil(ms/1000));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};

// Идентификатор игрока живёт во вкладке: перезагрузка возвращает на то же место, две вкладки — два игрока.
let PID=ss('abmp_pid');if(!PID){PID='p'+Math.random().toString(36).slice(2,10);ss('abmp_pid',PID);}
let ROOM=C.normCode(Q.get('mp'));if(ROOM.length!==4)ROOM='';
let myName=ls('abmp_name')||'';

document.body.classList.add('mp-mode');
for(const css of ['mp.css','mp-ui.css']){const l=document.createElement('link');l.rel='stylesheet';l.href=css+'?v='+Date.now().toString(36).slice(-5);document.head.append(l);}

// ---- движок: соло-обвязка выключается ----
CFG.ROLLS_PER_DAY=999;
// Ходов в партии нет: инкассатор не роняет «+2 🎲» (плейтест 01.10: «что значит плюс два кубика?») — только монеты и кристаллы.
if(CFG.SCATTER)CFG.SCATTER.rollsChance=0;
askName=async()=>{};intro=async()=>{};
// Подсказки обучения соло («Ты попал на точку, которую можно купить…») в мультиплеере не показываем (плейтест 01.10).
hint=function(){};hintHtml=function(){return '';};
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
// Группа: соседние клетки (i±1) того же хозяина поднимают ренту на 25% каждая.
// Сеть бизнесов (решение продюсера 02.10, только мультиплеер): бизнесы одного хозяина бустят друг друга, где бы ни стояли.
// Множитель к «за проход» и «за остановку» (и к ренте с соперников): 1 — ×1, 2 — ×1,33, 3 — ×1,67, 4 и больше — ×2.
const bizSetMult=n=>Math.min(2,1+(Math.max(1,n)-1)/3);
const fmtMult=m=>'×'+(Math.round(m*100)/100).toString().replace('.',',');
function bizCountOf(t){
  if(!S||!S.tiles||!t)return 1;
  if(t.owner&&t.owner!=='you'&&view&&view.tiles)return view.tiles.filter(x=>x.type==='biz'&&x.owner===t.owner).length||1;   // общее поле (owner = pid)
  if(t.owner)return S.tiles.filter(x=>x.type==='biz'&&x.owner).length||1;
  if(t.rival)return S.tiles.filter(x=>x.type==='biz'&&x.rival===t.rival).length||1;
  return 1;
}
let noBizSet=0;
(function(){const base=fee;fee=function(t){const f=base.apply(this,arguments);
  if(noBizSet||!t||t.type!=='biz'||!view||view.phase!=='play')return f;const m=bizSetMult(bizCountOf(t));return m>1?Math.max(1,Math.round(f*m)):f;};})();
// Цена прокачки бизнеса — от сбора без сети, иначе прирост считался бы от завышенной базы.
(function(){const base=bizUpCost;bizUpCost=function(){noBizSet++;try{return base.apply(this,arguments);}finally{noBizSet--;}};})();
function groupMult(sh,t,owner){const nb=[sh[(t.i+39)%40],sh[(t.i+1)%40]].filter(x=>x&&x.owner===owner&&(x.type==='kiosk'||x.type==='biz')).length;return 1+GROUP_BONUS*nb;}
function rentOf(t){
  if(t.frozen&&view&&view.turn&&t.frozen>view.turn.n)return 0;                      // карта «Шанса»: клетка заморожена на круг
  const boost=t.boostN&&view&&view.turn&&view.turn.n<=t.boostN?2:1;                 // карта «Шанса»: сюжет на MTV — рента ×2
  const sh=toShared(S.tiles),gm=groupMult(sh,t,t.rival)*boost;
  if(t.type==='biz')return Math.round(fee(t)*CFG.BIZ.landMult*gm);
  const cov=coveredIn(sh,t.rival);
  return Math.max(1,Math.round(RENT_LAPS*sales(t)*marginOf(t.good)*(1+prosp()*cov)*gm));
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
  // Торги закрывает ядро при смене хода: вложено считаем по ценам движка, клетку банкрота возвращаем в пустырь.
  C.lotApi.baseInv=t=>{try{return baseInv(t);}catch(e){return 0;}};
  C.lotApi.valuer=()=>makeValuer(T.tiles);   // победитель и раскладка в итоге — у ядра
  C.lotApi.toLot=t=>{if(t.type==='biz'){t.owner=null;t.level=0;delete t.mpPrem;return;}
    Object.assign(t,{owner:null,good:'lot',base:null,lot:true,goods:0,capLvl:1,salesLvl:1,tier:1,insp:false});delete t.mpPrem;delete t.boostN;delete t.frozen;
    t.price=window.SFBuilder&&SFBuilder.basePrice?SFBuilder.basePrice('gum'):50;};
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
  function tsum(){const s={kind:'mp_table',test:TEST||undefined,bots:T.players.filter(p=>/^bot\d/.test(p.pid)).length||undefined,runId:`mp-${room}-m${T.match}-table`,player:`стол ${room} · хозяин ${pname(PID)}`,
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
    // Хозяин перезагрузился посреди партии — журнал начинается заново: текущий ход пишем сразу (плейтест 4: «нет TURN #72»).
    if(!tlast){tlast=snap;if(snap.phase==='play'&&tr)tev('turn',{pid:tr.pid,name:pname(tr.pid),seat:(T.players.find(p=>p.pid===tr.pid)||{}).seat,resumed:true});return;}
    if(snap.phase!==tlast.phase){
      if(snap.phase==='play')tev('match_start',{players:T.players.map(p=>({pid:p.pid,name:p.name,seat:p.seat,color:p.color})),rounds:T.settings.rounds,turnSec:T.settings.turnSec,ver:(window.AB_VER||{}).id||null,stale:verStale});
      if(snap.phase==='over'){tev('match_over',{result:T.result,durationSec:T.startedAt?Math.round((Date.now()-T.startedAt)/1000):null});tsend(true);}
    }
    if(snap.phase==='play'&&snap.n!==tlast.n&&tr){for(let k=(tlast.n||0)+1;k<tr.n;k++){const sk=(T.events||[]).find(e=>e.kind==='skip'&&e.n===k);tev('turn_skipped',{n:k,pid:sk?sk.from:null,name:sk?pname(sk.from):null,why:sk?'карта «Очередь в ЖЭК»':'игрок офлайн'});}   // пропуски (карта «Шанса», офлайн) — чтобы номера в журнале не терялись
      tev('turn',{pid:tr.pid,name:pname(tr.pid),seat:(T.players.find(p=>p.pid===tr.pid)||{}).seat,timedOutPrev:!!(tlast.n&&tr.timedOut)});}
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
        for(const c of pk.credits||[])if(c&&c.id&&T.applied&&T.applied[c.id]&&!known.has(c.id)){
          if(c.potTake)tev('pot_take',{from:pid,fromName:pname(pid),note:c.note||''});
          else if(+c.pot)tev('pot',{from:pid,fromName:pname(pid),amount:+c.pot,pot:Math.round(T.pot||0)});
          else if(+c.slot)tev('slot_pot',{from:pid,fromName:pname(pid),amount:+c.slot,slotPot:Math.round(T.slotPot||0)});
          else tev(c.escrow?'offer':'credit',{from:pid,fromName:pname(pid),to:c.to,toName:pname(c.to),cash:c.cash,escrow:c.escrow||0,note:c.note||'',rent:!!c.rent,force:!!c.force});}
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
      case 'end':if(C.endTurn(T,pid,msg.n,Date.now(),msg.pack||null)){C.checkEarly(T);soon();}return;
      case 'extend':if(pid!==PID)return;if(C.extend(T,Date.now()))soon();return;   // «Ещё время» на итоге — хозяин стола
      case 'map':if(pid!==PID)return;if(C.setBoardMap(T,String(msg.id||'')))soon();return;   // вид локации — только хозяин, в лобби и в партии
      case 'debug':if(!TEST||pid!==PID||T.phase!=='play')return;   // тестовый стол: промотать к последнему раунду или итогу
        if(msg.op==='final'){T.finalRound=T.turn.round;T.finalBy='time';}
        else if(msg.op==='over'){C.finish(T,'rounds');}
        soon();return;
      case 'pause':if(C.pause(T,pid,!!msg.on,Date.now()))soon();return;
      case 'hit':if(C.applyHit(T,pid,msg.h))soon();return;                        // карта «Шанса» против соперника
      case 'lot':if(C.listLot(T,pid,+msg.tile,msg.min,msg.kind))soon();return;     // выставить клетку на торги
      case 'bid':if(C.bid(T,pid,String(msg.id||''),msg.amount))soon();return;
      case 'tpause':{if(!p)return;const now=Date.now();   // ручная пауза — любой игрок, но не чаще PAUSE_FREE/PAUSE_CD_MS
        if(msg.on){const use=T.pauseUse=T.pauseUse||{},u=use[pid];const w=pauseWait(u,now);if(w>0){send&&send({t:'pausedeny',wait:w});return;}
          if(C.tablePause(T,pid,true,now,p.name)){use[pid]={n:(u?u.n:0)+1,at:now};soon();}return;}
        if(C.tablePause(T,pid,false,now,p.name))soon();return;}
      // Действие игрока (стройка, рента, мини-игра…) — остальным, для журнала и всплытий над клеткой.
      case 'evt':if(T.phase!=='play'||!T.turn||T.turn.pid!==pid||!msg.e)return;
        for(const q of T.players){if(q.pid===pid)continue;const s2=links.get(q.pid);if(s2)s2({t:'evt',from:pid,e:msg.e});}return;
      case 'settings':if(pid!==PID||T.phase!=='lobby')return;
        if('rounds' in msg)C.setRounds(T,msg.rounds);
        if('minutes' in msg)C.setMinutes(T,msg.minutes);
        if('mode' in msg)C.setMode(T,String(msg.mode));
        if('win' in msg)C.setWin(T,String(msg.win));
        if('boardMap' in msg)C.setBoardMap(T,String(msg.boardMap));
        if('turnSec' in msg&&C.TURN_OPTIONS.includes(+msg.turnSec))T.settings.turnSec=+msg.turnSec;soon();return;
      case 'start':if(pid!==PID)return;
        {// поле стола — с чистого листа: цена стройки не должна зависеть от точек хозяина в прошлой партии
         const keep=S;S=Object.assign({},keep||{},{tiles:[]});let tiles;try{tiles=buildTiles().map(t=>Object.assign(t,{owner:null}));}finally{S=keep;}
         tiles=mpBoard(tiles);
         if(C.start(T,tiles,pl=>makeSlice(pl.name),Date.now())){T.pauseUse={};soon();}}return;
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
window.MPTele={hostNow,info(){const me=view&&playerOf(PID);return {test:TEST||undefined,bots:view?view.players.filter(p=>/^bot\d/.test(p.pid)).length||undefined:undefined,room:ROOM,match:view?view.match:null,pid:PID,seat:me?me.seat:null,
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
    case 'pausedeny':toast(`⏸ Паузы кончились — следующая через ${mmss(m.wait||0)}`,2600);return;
    case 'view':onView(m.v,m.now);return;
    case 'evt':onEvt(m.from,m.e);return;
  }
}
let lastMode=null;
function onView(v,now){
  if(v&&v.settings&&v.settings.mode)lastMode=v.settings.mode;   // для бонуса старта вне хода
  if(window.MPBots&&MPBots.acting()){MPBots.holdHostView(v,now);return;}   // пока ходит бот, свой вид откладываем
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
    if(isMine){reclaimOffers();yourTurn();}else rivalTurn(v.turn.pid);   // в чужой ход камера ведёт фишку того, кто ходит (followRival)
    mgReset();
  } else if(v.phase==='play'&&!isMine){adopt(v);}
  else if(v.phase==='play'&&isMine&&v.mine&&S){const h=v.mine.mpHold||0,sh=S.mpHold||0;if(h!==sh){S.cash-=(h-sh);S.mpHold=h;render();}}   // резерв ставок ведёт стол: перебили — вернулся, поставил — снят
  if(v.phase==='play'&&prev&&prev.phase==='over'){shownOver=null;hideOver();curTurn=null;toast('⏱ Партия продлена — играем дальше',2600);}   // «Ещё время»
  if(v.phase==='over'){mine=false;if(shownOver!==v.match){shownOver=v.match;closeAll();adopt(v);showOver(v);try{flush(true);}catch(e){}}}
  for(const e of v.events||[])if(e.id>lastEvId){lastEvId=e.id;try{onEvt(e.from,e);}catch(x){console.error(x);}}
  // Копилка общая: цифра на клетке у всех — со стола, и в свой ход тоже (плейтест 5: «у вас 236, у меня пустая»).
  if(S&&v.phase==='play'){const vp=Math.round(v.pot||0);if(vp!==lastViewPot){lastViewPot=vp;S.pot=vp;try{mobileSync();}catch(e){}}}
  syncTokens(v);syncFlags();updateUi();
  if(v.phase!=='lobby')applyBoardMap();
  // плакат хода гаснет, когда кубики брошены (или ход сменился, партия кончилась)
  if(poster){const P=poster;
    if(v.phase!=='play')posterAway(true);
    else if(P.kind==='rival'&&(v.turn.rolled||v.turn.pid!==P.pid))posterAway(v.turn.pid!==P.pid);
    else if(P.kind==='mine'&&(v.turn.pid!==PID||v.turn.n!==P.n||v.turn.rolled))posterAway(v.turn.pid!==PID);}
}
let lastEvId=0,wasLead=false,lastViewPot=null;const cardPlateAt={};
// Инспектор бьёт лидера сильнее (решение продюсера 01.10): заметный отрыв по владениям или капиталу —
// на карте до 4 проверок вместо 3 и штраф 75% полицейского вместо 50%. Порог: в полтора раза больше лучшего из соперников.
function mpLeader(){
  if(!view||view.phase!=='play')return false;const me=playerOf(PID);if(!me||!me.cap)return false;
  const own=p=>p.cap?p.cap.points+p.cap.biz:0,others=view.players.filter(p=>p.pid!==PID);if(!others.length)return false;
  const mo=Math.max(0,...others.map(own)),mt=Math.max(0,...others.map(p=>p.cap?p.cap.total:0));
  return (own(me)>=4&&own(me)>=mo*1.5)||(own(me)>=3&&me.cap.total>=mt*1.5);
}
function adopt(v){
  if(!v.mine||!v.tiles)return;
  const s=clone(v.mine);s.tiles=toLocal(v.tiles);S=s;
  S.pot=Math.round(v.pot||0);   // копилка общая на стол: своя цифра в срезе — только для отрисовки
  syncSlotPot();
  const lead=mpLeader();CFG.INSP.limit=lead?4:3;CFG.INSP.fineShare=lead?.75:.5;
  if(lead!==wasLead){wasLead=lead;if(lead)toast('📋 Ты в отрыве — инспекторов больше и штрафы выше',3000);}
  try{render();}catch(e){console.error(e);}
}
// Начало своего хода — «бах»: плакат «Твой ход!» выпрыгивает и улетает в кубик, кубик хлопается на место.
function yourTurn(){
  try{MobileHost.send({action:'home'});}catch(e){}                 // камера обратно к своему Джонни
  try{navigator.vibrate&&navigator.vibrate([40,40,80]);}catch(e){}
  try{GameFeedback&&GameFeedback.sound&&GameFeedback.sound('coin');}catch(e){}
  setTimeout(answerOffers,matchMedia('(prefers-reduced-motion: reduce)').matches?1600:2500);
  posterShow('mine',null);
}
// Плакаты «Твой ход!» и «Ходит Вася» висят до броска кубиков (плейтест 4, 02.10: гасли раньше, чем на них посмотрели).
// Выпрыгивают, покачиваются, а как только кубики брошены — улетают в кубик или в плашку «Ходит».
let poster=null;
function posterShow(kind,pid){
  posterAway(true);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,p=pid&&playerOf(pid);
  const b=el('div','mp-bang mp-poster'+(kind==='rival'?' mp-bang-rival':''));
  if(p)b.style.setProperty('--c',p.color);
  b.innerHTML=kind==='rival'?`<small>Ходит</small><b>${esc(p?p.name:'')}</b>`:'<b>Твой ход!</b><small>бросай кубики</small>';
  poster={el:b,kind,pid,n:view&&view.turn?view.turn.n:null};
  if(!reduced)b.animate([
    {transform:'translate(-50%,-50%) scale(.3) rotate(-8deg)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1.15) rotate(3deg)',opacity:1,offset:.55,easing:'cubic-bezier(.34,1.56,.64,1)'},
    {transform:'translate(-50%,-50%) scale(.96) rotate(-1deg)',offset:.8},
    {transform:'translate(-50%,-50%) scale(1) rotate(0)'}],{duration:420}).finished.then(()=>{if(b.isConnected)b.classList.add('hold');},()=>{});
  else b.classList.add('hold');
}
function posterAway(now){
  const P=poster;poster=null;if(!P||!P.el.isConnected)return;const b=P.el;b.classList.remove('hold');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(now||reduced){b.animate([{opacity:1},{opacity:0}],{duration:now?120:300}).finished.then(()=>b.remove(),()=>b.remove());return;}
  const to=P.kind==='mine'?$('bRoll'):tag,r=to&&to.getBoundingClientRect(),q=b.getBoundingClientRect();
  const dx=r&&r.width?r.left+r.width/2-(q.left+q.width/2):0,dy=r&&r.width?r.top+r.height/2-(q.top+q.height/2):200;
  b.animate([{transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.2)`,opacity:.2}],
    {duration:420,easing:'cubic-bezier(.5,0,.8,.4)',fill:'forwards'}).finished.then(()=>{b.remove();
      const d=$('bRoll');if(P.kind==='mine'&&d&&myTurn())d.animate([{transform:'scale(1)'},{transform:'scale(1.3,.78)'},{transform:'scale(.9,1.14)'},{transform:'scale(1.05,.96)'},{transform:'scale(1)'}],{duration:420,easing:'ease-out'});},()=>b.remove());
}
// Чужой ход — плакат «Ходит Вася» в цвет игрока до его броска.
function rivalTurn(pid){if(playerOf(pid))posterShow('rival',pid);}
function closeAll(){
  for(let i=0;i<3&&!$('modal').hidden;i++)closeModal();
  closeMinigame();
}
function closeMinigame(){
  const l=document.querySelector('.minigame-layer');if(!l)return;
  const b=l.querySelector('.sl-close,.mg-close,.sl-loading-close,[data-close],button[aria-label*="Закры"],.xclose');
  if(b)b.click();
}

// ---- торги (решение продюсера 01.10, второй плейтест): одна система для продажи своей клетки и для банкротства ----
// Лот открывает хозяин клетки в свой ход, стартовая цена — его; живёт до его следующего хода. Соперники ставят в любой
// момент (окно чужой клетки или MPSale.bidWindow). Закрывает хозяин стола: ставка есть — клетка покупателю, нет —
// лот банкрота уходит банку по стартовой (половина вложенного), обычный лот снимается.
const lotOn=i=>(view&&view.lots||[]).find(l=>l.tile===i)||null;
const myLots=()=>(view&&view.lots||[]).filter(l=>l.seller===PID);
function lotHtml(lot){
  const t=S.tiles[lot.tile],mineLot=lot.seller===PID,lead=lot.bestBy===PID;
  const next=lot.best?Math.ceil(lot.best*1.1/10)*10:lot.min,steps=[next,Math.ceil(next*1.25/10)*10,Math.ceil(next*1.5/10)*10];
  const btns=mineLot?'':steps.map(a=>{const ok=!lead&&S.cash>=a;return `<button type="button" class="mp-bid buy-btn ${ok?'buy-ok':'buy-no'}" data-a="${a}" ${ok?'':'disabled'}>Ставка · ${money(a)}</button>`;}).join('');
  return `<div class="mp-choice mp-lot"><b>🔨 Торги${lot.kind==='bankrupt'?' за долги':''}: от ${money(lot.min)}</b>
    <p>${lot.best?`Лучшая ставка — ${money(lot.best)} (${lead?'твоя':esc(nameOf(lot.bestBy))}).`:'Ставок пока нет.'} Закроются к следующему ходу ${mineLot?'твоему':esc(nameOf(lot.seller))}: кто дал больше — тот и хозяин${t&&t.type==='kiosk'?' вместе с товаром':''}.${lot.kind==='bankrupt'?' Без ставок клетку заберёт банк.':''}</p>
    ${btns?`<div class="mp-mults mp-bids">${btns}</div>`:''}</div>`;
}
function wireBids(){$('card').querySelectorAll('.mp-bid').forEach(b=>b.onclick=()=>{if(!b.disabled)closeModal('bid:'+b.dataset.a);});}
function placeBid(lotId,amount){
  const lot=(view.lots||[]).find(l=>l.id===lotId);if(!lot||!(amount>0)||lot.seller===PID)return;
  if(S.cash<amount){toast('На такую ставку нет денег');return;}
  net.send({t:'bid',id:lotId,amount:Math.round(amount)});track('mp_bid',{tile:lot.tile,amount});
  toast(`🔨 Ставка ${money(amount)} на «${titleOf(S.tiles[lot.tile])}»`,2200);
}
async function bidWindow(lotId){
  const lot=(view.lots||[]).find(l=>l.id===lotId);if(!lot)return;const t=S.tiles[lot.tile];
  const pending=modal(`<h2>${esc(titleOf(t))}</h2><p class="t">Хозяин — ${esc(nameOf(lot.seller))}, вложено ${money(invested(t))}.</p>${lotHtml(lot)}`,[{t:'Закрыть',v:0,cls:'sec'}]);
  wireBids();const m=await pending;if(typeof m==='string'&&m.startsWith('bid:'))placeBid(lotId,+m.slice(4));
}
function startLot(i,min,kind,bank){
  const t=S.tiles[i];if(!t||!t.owner||!myTurn()||ending||lotOn(i))return false;
  if(t.mpOffer)declineOffer(t,true);
  net.send({t:'lot',tile:i,min:Math.max(1,Math.round(min)),kind:kind||'sale',bank:bank?Math.round(bank):undefined});track('mp_lot',{tile:i,min,kind:kind||'sale'});
  log(`🔨 Выставил «${titleOf(t)}» на торги от ${money(min)}${kind==='bankrupt'?' — за долги':''}.`);return true;
}
async function lotWindow(i){
  const t=S.tiles[i];if(!t||!t.owner||!myTurn()||ending)return;if(lotOn(i)){toast('Торги уже идут');return;}
  const inv=marketValue(t),opts=[0.5,1,1.5,2].map(m=>`<button type="button" class="mp-mult buy-btn buy-ok" data-m="${m}"><b>×${String(m).replace('.',',')}</b><span>${money(inv*m)}</span></button>`).join('');
  const pending=modal(`<h2>🔨 «${esc(titleOf(t))}» на торги</h2><p class="t">Вложено ${money(inv)}. Выбери стартовую цену — соперники будут ставить до твоего следующего хода. Без ставок клетка останется у тебя.</p><div class="mp-mults">${opts}</div>`,[{t:'Передумал',v:0,cls:'sec'}]);
  $('card').querySelectorAll('.mp-mult').forEach(b=>b.onclick=()=>closeModal(+b.dataset.m));
  const m=await pending;if(typeof m==='number'&&m>0)startLot(i,Math.round(inv*m),'sale');
}
// Своя клетка в свой ход: кнопка «на торги» в окне точки или бизнеса (функциональная; вёрстка — «Интерфейс»).
(function(){const base=kioskWindow;kioskWindow=function(t){const r=base.apply(this,arguments);lotButton(t);return r;};})();
(function(){const base=bizWindow;bizWindow=function(t){const r=base.apply(this,arguments);lotButton(t);bizSetLine(t);return r;};})();
function bizSetLine(t){
  if(!t||!t.owner||!view||view.phase!=='play')return;
  setTimeout(()=>{const c=$('card');if(!c||$('modal').hidden||c.querySelector('.mp-biz-set'))return;
    const n=bizCountOf(t),m=bizSetMult(n),next=n<4?fmtMult(bizSetMult(n+1)):null;
    const d=document.createElement('p');d.className='t mp-biz-set';d.style.cssText='margin:8px 0 0;font-weight:700;color:#2f6b35';
    d.textContent=`🏢 Сеть бизнесов: ${n} — сбор ${fmtMult(m)} у каждого, где бы ни стояли${next?` · следующий бизнес — ${next}`:' · максимум'}`;
    const body=c.querySelector('.property-body')||c.querySelector('.ev-body');if(body){body.append(d);return;}
    const anchor=c.querySelector('.mbtns');(anchor&&anchor.parentNode?anchor.parentNode.insertBefore(d,anchor):c.append(d));},90);   // внутрь карточки, не под неё
}
// Своя точка в партии: строка «Прибыль за круг» повторяла блок прокачки — на её месте «Гость платит»
// (плейтест 02.10: «нигде нет, сколько платит гость»). Нет блока прокачки (максимум) — строка добавляется.
// Андрей 03.10: после прокачки строка пропадала (карточка перерисовывается на месте, без kioskWindow) — а это главный параметр.
// Теперь строку держит наблюдатель за карточкой и показывает, какой рента станет после следующего улучшения.
let guestRentTile=null;
// Рента после следующего улучшения — те же шаги, что у кнопки (unified-upgrade.js kioskUpgradeBoth, бизнес — level+1).
function rentNextOf(t){
  try{
    if(t.type==='biz'){if(!(t.level<CFG.BIZ.maxLevel))return null;const k=t.level;t.level++;try{return rentOfMine(t);}finally{t.level=k;}}
    if(typeof kioskNextStat==='function'&&!kioskNextStat(t))return null;
    const c=t.capLvl,sl=t.salesLvl;
    try{if(typeof capTab==='function'&&t.capLvl<capTab(t).length)t.capLvl++;if(typeof salTab==='function'&&t.salesLvl<salTab(t).length)t.salesLvl++;
      if(c===t.capLvl&&sl===t.salesLvl)return null;return rentOfMine(t);}finally{t.capLvl=c;t.salesLvl=sl;}
  }catch(e){return null;}
}
function guestRentPaint(){
  const t=guestRentTile,c=$('card');if(!t||!c||$('modal').hidden){if($('modal').hidden)guestRentTile=null;return;}
  if(!t.owner||!view||view.phase!=='play'||sfIsLot(t))return;
  const body=c.querySelector('.property-body');if(!body)return;
  let r=0;try{r=rentOfMine(t);}catch(e){return;}
  const nx=rentNextOf(t),fmt=v=>`<i class="cash-glyph"></i>${Math.round(v).toLocaleString('en-US')}`;
  const html=`<span>🏠 Рента за остановку</span><b>${fmt(r)}</b>${nx!=null&&Math.round(nx)!==Math.round(r)?`<i class="mp-gr-arrow">→</i><b class="mp-gr-next">${fmt(nx)}</b>`:''}`;
  const have=body.querySelector('.mp-guest-rent');if(have){if(have.dataset.h!==html){have.dataset.h=html;have.innerHTML=html;}return;}
  const dup=[...body.querySelectorAll(':scope>.box')].find(b=>/Прибыль за круг/.test(b.textContent)&&b.nextElementSibling&&b.nextElementSibling.classList.contains('uup'));
  const row=dup||document.createElement('div');row.className='box mp-guest-rent';row.dataset.h=html;row.innerHTML=html;
  if(!dup)(body.querySelector('.uup')||body.lastElementChild||body).before(row);
}
function guestRentRow(t){if(!t||!t.owner||sfIsLot(t))return;guestRentTile=t;setTimeout(guestRentPaint,60);}
new MutationObserver(()=>{if(guestRentTile)guestRentPaint();}).observe($('card'),{childList:true,subtree:true});
(function(){const base=kioskWindow;kioskWindow=function(t){const r=base.apply(this,arguments);if(!isRival(t))guestRentRow(t);return r;};})();
(function(){const base=bizWindow;bizWindow=function(t){const r=base.apply(this,arguments);if(!isRival(t))guestRentRow(t);return r;};})();
function lotButton(t){
  if(!t||!t.owner||!view||view.phase!=='play'||!myTurn()||ending||sfIsLot(t))return;
  setTimeout(()=>{const c=$('card');if(!c||$('modal').hidden||c.querySelector('.mp-lot-btn'))return;
    const lot=lotOn(t.i),b=document.createElement('button');b.type='button';b.className='sm sec mp-lot-btn';
    b.textContent=lot?`🔨 Торги идут · ${lot.best?'ставка '+money(lot.best):'от '+money(lot.min)}`:'🔨 Выставить на торги';b.disabled=!!lot;
    // В карточке точки — строкой под прокачкой, в простом окне — под кнопками (вёрстка «Интерфейса»).
    b.onclick=()=>{closeModal();lotWindow(t.i);};(c.querySelector('.property-body')||c.querySelector('.mbtns')||c).append(b);},80);
}

// ---- банкротство: в минусе ход не передать, пока не выставил клетки на торги на сумму долга ----
// Стартовая цена торгов за долги — рыночная (вложенное с прокачками), банк без ставок берёт за половину (плейтест 02.10).
function mpBankList(){
  const busy=new Set((view&&view.lots||[]).map(l=>l.tile));
  return S.tiles.filter(t=>t.owner&&(t.type==='kiosk'||t.type==='biz')&&!sfIsLot(t)&&!busy.has(t.i))
    .map(t=>({i:t.i,title:titleOf(t),price:marketValue(t),bank:Math.round(marketValue(t)*BANK_SELL),group:groupOf(t.i)})).sort((a,b)=>a.i-b.i);
}
// Группа клетки: подряд стоящие по кругу свои точки и бизнесы (как надбавка к ренте). Окно торгов за долги
// показывает клетки по порядку на поле, сгруппированными (продюсер 02.10: видно, какую группу ломаешь).
function groupOf(i){
  const own=j=>{const t=S.tiles[(j+40)%40];return !!t&&!!t.owner&&(t.type==='kiosk'||t.type==='biz')&&!sfIsLot(t);};
  let a=i,b=i;while(own(a-1)&&a-1>i-40)a--;while(own(b+1)&&b+1<a+40)b++;
  return {from:(a+40)%40,to:(b+40)%40,size:b-a+1};
}
function bankRowsHtml(list){
  let out='',key='';
  for(const x of list){
    const g=x.group,k=g.from+'-'+g.to;
    if(k!==key){key=k;out+=g.size>1?`<p class="t mp-bank-group" style="margin:14px 0 2px;font-weight:700;color:#7a5a2a">Группа · клетки ${g.from}–${g.to} · рента +${Math.round(GROUP_BONUS*100)}% за каждого соседа</p>`:`<p class="t mp-bank-group" style="margin:14px 0 2px;font-weight:700;color:#7a5a2a">Отдельно · клетка ${g.from}</p>`;}
    out+=`<div class="row mp-bank-row${g.size>1?' grp':''}"><span class="n">${esc(x.title)} <small>клетка ${x.i} · банк без ставок даст ${money(x.bank)}</small></span><button type="button" class="sm mp-bank-pick buy-btn buy-ok" data-i="${x.i}">Выставить · ${money(x.price)}</button></div>`;
  }
  return out;
}
// Принудительно — только со второго прохода старта в минусе (S.mpDebtLaps); до этого в минусе играешь дальше.
const bankruptNeed=()=>S.cash>=0||(S.mpDebtLaps||0)<DEBT_LAPS?0:Math.max(0,-S.cash-myLots().filter(l=>l.kind==='bankrupt').reduce((a,l)=>a+l.bank,0));

// ---- в минусе сразу доступны: микрозайм и продажа товара за полцены (решение продюсера 02.10) ----
function microAmount(){return Math.min(MICRO_MAX,Math.max(MICRO_MIN,Math.ceil((-Math.min(0,S.cash)+50)/50)*50));}
const canMicro=()=>!(S.loans||[]).some(l=>l.micro);
function microLoan(){
  if(!myTurn()||!canMicro())return false;const amt=microAmount();S.loans=S.loans||[];
  S.loans.push({tier:0,micro:true,name:'Микрозайм',principal:amt,rate:MICRO_RATE,strikes:0,maxStrikes:99});
  S.cash+=amt;track('mp_micro_loan',{amt});log(`💸 Взял микрозайм ${money(amt)} под ${Math.round(MICRO_RATE*100)}% за проход банка.`);
  plate('💸 Микрозайм',amt,`${Math.round(MICRO_RATE*100)}% за каждый проход банка · гасится в банке`);
  emit({kind:'loan',text:`взял микрозайм ${money(amt)}`,amount:amt,tile:S.pos});save();render();push();return true;
}
function stockValue(){return Math.round(myKiosks().reduce((a,t)=>a+(t.goods||0)*buyPrice(t.good)*STOCK_SELL,0));}
function sellStock(){
  if(!myTurn())return 0;const v=stockValue();if(v<=0)return 0;let units=0;
  for(const t of myKiosks()){units+=t.goods||0;t.goods=0;}
  S.cash+=v;track('mp_sell_stock',{v,units});log(`📦 Продал весь товар с точек за полцены: ${units} шт за ${money(v)}.`);
  plate('📦 Товар продан',v,`${units} шт за полцены`);emit({kind:'sale',text:`продал товар с точек за ${money(v)}`,amount:v,tile:S.pos});
  save();render();push();return v;
}
async function debtWindow(fromEnd){
  if(!myTurn()||S.cash>=0)return;
  const laps=S.mpDebtLaps||0,lotsN=mpBankList().length,sv=stockValue(),micro=canMicro()?microAmount():0;
  const warn=laps>=DEBT_LAPS?'Второй круг в минусе — клетки идут на торги.':laps===1?'Ты прошёл старт в минусе. Ещё один проход — и клетки уйдут на торги.':'Играть можно и в минусе, но покупок нет. Пройдёшь старт в минусе дважды — клетки уйдут на торги.';
  // Без await: кнопки строк вешаются, пока окно открыто (иначе «Взять» и «Продать» не нажимались — плейтест 02.10).
  const v=modal(`<h2>💸 Ты в минусе: ${money(S.cash)}</h2><p class="t">${warn}</p>
    ${micro?`<div class="row"><span class="n">Микрозайм<small>${Math.round(MICRO_RATE*100)}% за каждый проход банка, гасится в банке</small></span><button type="button" class="sm mp-debt-micro buy-btn buy-ok">Взять · ${money(micro)}</button></div>`:''}
    ${sv>0?`<div class="row"><span class="n">Продать весь товар с точек<small>за полцены закупки</small></span><button type="button" class="sm mp-debt-stock buy-btn buy-ok">Продать · ${money(sv)}</button></div>`:''}
    ${lotsN?`<div class="row"><span class="n">Выставить клетку на торги<small>стартовая цена — рыночная</small></span><button type="button" class="sm mp-debt-lots buy-btn buy-ok">Выбрать</button></div>`:''}`,
    [{t:fromEnd?'Играть дальше в минусе':'Закрыть',v:0,cls:'sec'}],{sticky:true});
  const c=$('card');
  if(c){const m=c.querySelector('.mp-debt-micro'),st=c.querySelector('.mp-debt-stock'),lo=c.querySelector('.mp-debt-lots');
    if(m)m.onclick=()=>closeModal('micro');if(st)st.onclick=()=>closeModal('stock');if(lo)lo.onclick=()=>closeModal('lots');}
  const r=await v;
  if(r==='micro')microLoan();else if(r==='stock')sellStock();else if(r==='lots'){await mpBankWindow(false);return;}
  // Взял займ или продал товар, а минус остался и есть чем ещё закрыть — окно снова, с оставшимися вариантами.
  if((r==='micro'||r==='stock')&&S.cash<0&&(canMicro()||stockValue()>0||mpBankList().length)){await wait(250);return debtWindow(fromEnd);}
  if(fromEnd&&S.cash>=0){toast('Минус закрыт',1800);}
  if(fromEnd)finishTurn();
}
window.MPDebt={open:()=>debtWindow(false),micro:microLoan,microAmount,canMicro,stockValue,sellStock,laps:()=>S?S.mpDebtLaps||0:0};
// forced=false — добровольно из окна долга: выбрать клетки на торги за долги без требования суммы.
async function mpBankWindow(forced=true){
  while(myTurn()&&(forced?bankruptNeed()>0:S.cash<0)){
    const list=mpBankList(),need=forced?bankruptNeed():-S.cash;if(!list.length)return;
    const picked=new Set();
    const rows=bankRowsHtml(list);
    const pending=modal(`<h2>🏦 Ты в минусе: ${money(S.cash)}</h2><button type="button" class="sec mp-bank-map">🗺 Выбрать на карте</button><p class="t">${forced?`Второй круг в минусе: ход не передать, пока банковская цена выставленных клеток не покроет ${money(need)}.`:`Выбери, что выставить на торги за долги.`} Соперники ставят до твоего следующего хода; что не продалось — уходит банку за половину.</p>${rows}<p class="t mp-bank-sum">Банк даст: <b>$0</b> из ${money(need)}</p>`,
      forced?[{t:'Выставить и передать ход',v:1,cls:'ok'}]:[{t:'Выставить',v:1,cls:'ok'},{t:'Назад',v:0,cls:'sec'}],{sticky:forced});
    const sumEl=$('card').querySelector('.mp-bank-sum b');
    $('card').querySelectorAll('.mp-bank-pick').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(picked.has(i))picked.delete(i);else picked.add(i);b.classList.toggle('on',picked.has(i));b.textContent=(picked.has(i)?'✓ ':'Выставить · ')+money(list.find(x=>x.i===i).price);
      if(sumEl)sumEl.textContent=money(list.filter(x=>picked.has(x.i)).reduce((a,x)=>a+x.bank,0));});
    {const mb=$('card').querySelector('.mp-bank-map');if(mb)mb.onclick=()=>closeModal('map');}
    let v=await pending;
    // Выбор на карте (плейтест 02.10: «я не знаю, какую точку выставляю») — вёрстка «Интерфейса», mapPick.
    if(v==='map'){const r=await mapPick(list,{title:'🔨 Выбери клетки на торги',preset:picked,
        sum:sel=>`банк даст ${money(list.filter(x=>sel.has(x.i)).reduce((a,x)=>a+x.bank,0))}${forced?` из ${money(need)}`:''}`});
      if(!r)continue;picked.clear();r.forEach(i=>picked.add(i));if(!picked.size)continue;v=1;}
    if(v!==1)return;
    const sum=list.filter(x=>picked.has(x.i)).reduce((a,x)=>a+x.bank,0);
    if(forced&&sum<need&&picked.size<list.length){toast(`Банк должен покрыть ${money(need)} — выбрано на ${money(sum)}`,2600);continue;}
    for(const x of list)if(picked.has(x.i))startLot(x.i,x.price,'bankrupt',x.bank);
    if(!forced)return;
    for(let i=0;i<30&&bankruptNeed()>0&&mpBankList().length;i++)await wait(100);   // ждём, пока хозяин стола примет лоты
    finishTurn();return;
  }
}
window.MPBank={list:mpBankList,need:bankruptNeed,needs:()=>!!S&&bankruptNeed()>0,open:mpBankWindow,debtLaps:()=>S?S.mpDebtLaps||0:0};
window.MPTrade={open:t=>{t=typeof t==='number'?S.tiles[t]:t;return isRival(t)?rivalWindow(t):null;},offer:(...a)=>placeOfferAmount(...a),swap:(...a)=>placeSwap(...a),proposed:()=>proposedThisTurn()};   // окно чужой клетки откуда угодно в свой ход
window.MPSale={list:()=>(view&&view.lots||[]).slice(),on:lotOn,start:startLot,open:lotWindow,bid:placeBid,bidWindow,html:lotHtml};

// ---- проход старта в партии (плейтест 5): +$100 всем сверх продаж; карта соперника урезала продажи ----
// Бонус старта (баланс «Дебага», решение продюсера 02.10): по кругам — $100, по времени (и в миссиях) — $50.
const MP_START_BONUS_BY_MODE={laps:100,time:50},MP_WH_CONSOLATION=20;
// Режим запоминается с последнего вида стола: без вида (лобби, итог, вне хода) бонус не скатывается в $50 «по времени» (Дебаг 03.10).
const startBonus=()=>{const m=view&&view.settings&&view.settings.mode;if(m)lastMode=m;return MP_START_BONUS_BY_MODE[(m||lastMode)==='laps'?'laps':'time'];};
window.MP_START_BONUS_NOW=()=>startBonus();
// Склад быстрее (то же решение): точка ур. 1 вмещает 8 вместо 12 при тех же 3 продажах за круг; выше — пропорционально (×2/3).
const MP_CAP_SHARE=2/3;
(function(){const base=cap;cap=function(t){return Math.max(1,Math.round(base.apply(this,arguments)*MP_CAP_SHARE));};
  if(typeof kioskAfter==='function'){const ka=kioskAfter;kioskAfter=function(t){const r=ka.apply(this,arguments);if(r&&r.cap)r.cap=Math.max(1,Math.round(r.cap*MP_CAP_SHARE));return r;};}})();
// Пособие отстающему (решение продюсера 02.10, вариант 1 из догоняющих). Параметры — под автотесты:
// gap — отстающий: последний по капиталу и капитал не больше gap × средний по столу; share — доля бонуса старта.
const MP_UNDERDOG={gap:0.75,share:0.5};
function isUnderdog(){if(!view||!view.players||view.players.length<2)return false;
  const v=view.players.map(p=>({pid:p.pid,c:p.cap?p.cap.total:p.cash})).sort((a,b)=>a.c-b.c),avg=v.reduce((a,x)=>a+x.c,0)/v.length;
  return v[0].pid===PID&&v[1].c>v[0].c&&v[0].c<=avg*MP_UNDERDOG.gap;}
const underdogBonus=()=>Math.round(startBonus()*MP_UNDERDOG.share);
window.MP_IS_UNDERDOG=()=>isUnderdog();window.MP_UNDERDOG_BONUS=underdogBonus;window.MP_UNDERDOG=MP_UNDERDOG;
function lapExtras(earned0){
  if(S.mpLapCut!=null){const inc=Math.max(0,Math.round((S.stat.earned||0)-earned0)),loss=Math.round(inc*(1-S.mpLapCut));
    if(loss>0){S.cash-=loss;S.stat.earned-=loss;plate(S.mpLapCut===0?'✊ Забастовка':'📉 Демпинг конкурента',-loss,S.mpLapCut===0?'продаж на этом проходе нет':'продажи на этом проходе вдвое меньше');log(`📉 Карта соперника: продажи на старте −${money(loss)}.`);}
    delete S.mpLapCut;}
  if(S.mpLapBoost){const inc=Math.max(0,Math.round((S.stat.earned||0)-earned0)),add=Math.round(inc*(S.mpLapBoost-1));if(add>0){S.cash+=add;S.stat.earned+=add;plate('🏷 Акция',add,'продажи ×1,5');}delete S.mpLapBoost;}
  // Пособие отстающему (продюсер 02.10): последний по капиталу получает на старте +50% бонуса.
  const extra=isUnderdog()?underdogBonus():0;if(extra)emit({kind:'underdog',text:`пособие отстающему ${money(extra)}`,amount:extra,tile:0});
  const sb=startBonus();S.cash+=sb+extra;S.stat.earned=(S.stat.earned||0)+sb+extra;
  plate('🏁 Старт',sb+extra,extra?'+50% — пособие отстающему':'каждый проход старта');log(`🏁 Проход старта: +${money(sb)}${extra?` и пособие отстающему +${money(extra)}`:''}.`);
}
// ---- такси до склада за 💎 (плейтест 5): в свой ход до броска, едет на ближайший склад впереди — это и есть ход ----
async function mpTaxi(){
  if(!view||view.phase!=='play'||!myTurn()){toast('Такси — в свой ход');return;}
  if(rolled||ending||moving){toast('Такси — до броска');return;}
  if(S.jail>0){toast('Из участка такси не ездит');return;}
  const price=1;let to=-1;for(let k=1;k<40;k++){const t=S.tiles[(S.pos+k)%40];if(t.type==='wh'){to=t.i;break;}}
  if(to<0)return;if((S.hard||0)<price){toast(`Нужен ${price} 💎`);return;}
  if(!spendHard(price))return;
  rolled=true;S.rolls=999;track('mp_taxi',{from:S.pos,to});log(`🚕 Такси до склада за 💎 ${price}.`);emit({kind:'taxi',text:'поехал на такси до склада',amount:null,tile:to});push();
  moving=true;render();
  try{try{await step(S.pos,to,CFG.MOVE_MS*3,'one');}catch(e){console.warn('taxi step',e);}   // сцена не ответила — фишку всё равно переносим
    S.pos=to;render();await land(S.tiles[to]);}
  finally{moving=false;landed=true;S.rolls=999;save();render();push();updateUi();}
}
window.MPTaxi={go:mpTaxi,can:()=>!!(view&&view.phase==='play'&&myTurn()&&!rolled&&!ending&&!S.jail&&(S.hard||0)>=1)};

// ---- общая копилка стола: штрафы всех — в одну; забирает вставший ----
function potDelta(fn){return function(){const before=S.pot||0;const r=fn.apply(this,arguments);const d=Math.round((S.pot||0)-before);
  if(d>0&&myTurn()){credit(null,0,null,0,{pot:d});S.pot=Math.round((view&&view.pot)||0)+d;pushSoon();}return r;};}   // S.pot — как будет у стола, чтобы табличка на клетке не отставала
pay=potDelta(pay);payFine=potDelta(payFine);
(function(){const base=lapDone;lapDone=async function(){const before=S.pot||0,slot0=slotPotNow(),earned0=S.stat?S.stat.earned||0:0;const r=await base.apply(this,arguments);const d=Math.round((S.pot||0)-before);
  if(myTurn())lapExtras(earned0);
  if(d>0&&myTurn()){credit(null,0,null,0,{pot:d});S.pot=Math.round((view&&view.pot)||0)+d;}
  slotPotFlush(slot0);
  // Круги в минусе (плейтест 02.10): первый — предупреждение, второй — клетки на торги. Вышел в плюс — счёт сброшен.
  if(myTurn()){if(S.cash<0){S.mpDebtLaps=(S.mpDebtLaps||0)+1;
      if(S.mpDebtLaps>=DEBT_LAPS){plate('🏦 Второй круг в минусе',0,'клетки пойдут на торги в конце хода');log('🏦 Второй проход старта в минусе — клетки на торги.');}
      else{plate('⚠️ Прошёл старт в минусе',0,'ещё круг в минусе — клетки на торги');log('⚠️ Прошёл старт в минусе: предупреждение.');}}
    else{S.mpDebtLaps=0;S.mpDebtSeen=0;}}
  return r;};})();

// ---- касса «Однорукого бандита» — общая на стол (решение продюсера 01.10): цифра у всех одна ----
// Правила роста прежние (+$10 за круг, 10% денежных призов, джекпот обнуляет) плюс +$10 за каждый визит любого игрока.
// Своя копия в срезе (S.slot.pot и снимок автомата) — только для отрисовки и работы движка; разницу шлём проводкой slot.
const slotPotNow=()=>S&&S.slot?Math.round(S.slot.pot||0):0;
function syncSlotPot(){if(!view||view.phase!=='play'||!S)return;const v=Math.round(view.slotPot||0);S.slot=S.slot||{pot:0,visits:0};S.slot.pot=v;if(S.slot.bandit)S.slot.bandit.pot=v;}
function slotPotFlush(before){const d=slotPotNow()-before;if(d&&myTurn()){credit(null,0,null,0,{slot:d});pushSoon();}}
(function(){const base=potTile;potTile=async function(){
  S.pot=(view&&view.pot)||0;
  if(view&&view.phase==='play'&&S.pot<=0){toast('🐷 Копилка пустая — в следующий раз повезёт',2400);log('🐷 Копилка пустая.');return;}   // не «сорвал копилку $0» (плейтест 4)
  const r=await base.apply(this,arguments);
  if(myTurn())credit(null,0,null,0,{potTake:true});push();return r;};})();

// ---- функциональные клетки — только в ход, когда на них встал (плейтест: 15 прокруток автомата за два хода) ----
// Плейтест 02.10: игрок открывал автомат до броска в следующий ход — строка клетки и land зовут локальную openTile
// внутри slot.js, обёртка над window.Slot.openTile её не ловила. Теперь slot.js сам спрашивает эти хуки.
window.MPSlotHooks={
  active:()=>!!(view&&view.phase==='play'),
  canPlay:()=>myTurn()&&!ending&&landedHere(),
  landKey:()=>`${view.match}:${view.turn.n}:${S.pos}`,
  deny:()=>toast(myTurn()?'Мини-игра — только в тот ход, когда на неё встал':`Сейчас ходит ${nameOf(view.turn.pid)}`,2400),
  async wrap(run,landing){syncSlotPot();if(landing&&S.tiles[S.pos]&&S.tiles[S.pos].type==='slot'){S.slot.pot+=10;if(S.slot.bandit)S.slot.bandit.pot=S.slot.pot;}   // визит любого игрока — +$10 в общую кассу
    const before=Math.round((view.slotPot||0));const r=await run();slotPotFlush(before);return r;},
};
(function(){const base=bank;bank=async function(remote){
  if(view&&view.phase==='play'&&!landedHere()&&!remote){toast('Банк — только в тот ход, когда на него встал',2400);return;}
  return base.apply(this,arguments);};})();

// ---- полиция в партии ----
// Встал на участок: заплатил штраф — ход на этом кончается (лишнего броска нет, продюсер 02.10: «откупился — сразу ещё ход — неверно»);
// сел — CFG.POLICE.attempts попыток на дубль (в партии 2), промахи — выход бесплатно. Сидишь в участке и откупился в начале своего хода — бросаешь
// обычным броском в этот же ход, ход не пропадает.
// Плейтест 4: без денег окно соло предлагало «Заплатить $0» — штраф срезался до нала, и игрок выходил бесплатно.
// В партии своё окно: платить можно, только если штраф по карману; иначе — кристаллы или участок (бросать на дубль).
(function(){const base=police;police=async function(){
  if(!(view&&view.phase==='play'&&myTurn()))return base.apply(this,arguments);
  const fine=policeFine(),bail=CFG.HARD.bail||1,canPay=fine>0&&S.cash>=fine;
  track('police',{fine,cash:S.cash});
  const v=await modal(`<h2>🚔 Участок</h2><p class="t">«А лицензия есть, приятель?» ${canPay?`Заплати штраф ${money(fine)} — и свободен.`:`На штраф ${money(fine)} денег нет.`} Можно откупиться кристаллом или сесть: в начале каждого хода — бросок на дубль, ${CFG.POLICE.attempts===2?'два промаха':CFG.POLICE.attempts+' промаха'} — выпустят бесплатно.</p>`,
    [canPay?{t:`Заплатить · ${money(fine)}`,v:1,cls:'ok'}:null,{t:`Откупиться · 💎 ${bail}`,v:3,cls:'hard',dis:(S.hard||0)<bail},{t:'Сесть: бросать на дубль',v:0,cls:canPay?'sec':'bad'}].filter(Boolean),{sticky:true});
  if(v===1&&canPay){payFine(fine);log(`🚔 Заплатил полиции ${money(fine)}.`);emit({kind:'fine',text:'заплатил полиции',amount:-fine,tile:S.pos});}
  else if(v===3&&spendHard(bail,AT.tile(S.pos))){log(`🚔 Откупился от полиции за 💎 ${bail}.`);emit({kind:'fine',text:'откупился от полиции кристаллом',amount:null,tile:S.pos});}
  else{S.jail=CFG.POLICE.attempts;S.jailFine=0;log(`🚔 Сел в участок: ${CFG.POLICE.attempts} попытки на дубль, ${CFG.POLICE.attempts===2?'два промаха':CFG.POLICE.attempts+' промаха'} — выпустят бесплатно.`);emit({kind:'jail',text:'сел в участок',amount:null,tile:S.pos});}
  save();render();};})();
async function jailChoice(){
  const fine=policeFine(),bail=CFG.HARD.bail||1;
  const canPay=fine>0&&S.cash>=fine;
  const v=await modal(`<h2>🚔 Ты в участке</h2><p class="t">${canPay?'Откупись — и бросай обычным броском прямо сейчас. Или':'На штраф денег нет. Можно откупиться кристаллом или'} бросай на дубль: дубль выпускает бесплатно, осталось попыток — ${S.jail}; после ${CFG.POLICE.attempts===2?'второго':'последнего'} промаха выпустят без штрафа.</p>`,
    [canPay?{t:`Откупиться · ${money(fine)}`,v:1,cls:'ok'}:null,{t:`Откупиться · 💎 ${bail}`,v:3,cls:'hard',dis:(S.hard||0)<bail},{t:'Бросать на дубль',v:0,cls:'sec'}]);
  if(v===1&&canPay){payFine(fine);S.jail=0;log(`🚔 Откупился из участка за ${money(fine)} — бросаю.`);emit({kind:'fine',text:'откупился из участка',amount:-fine,tile:S.pos});}
  else if(v===3&&spendHard(bail)){S.jail=0;log(`🚔 Откупился из участка за 💎 ${bail} — бросаю.`);emit({kind:'fine',text:'откупился из участка',amount:null,tile:S.pos});}
  render();
}

// ---- кристаллы в партии не продаются (решение продюсера 01.10) ----
shopHard=function(){toast('В партии кристаллы не продаются: 5 на старте плюс выигранные',2600);};

// ---- «Шанс» в партии: своя колода про соперников (решение продюсера 01.10: взаимодействие игроков — главное) ----
// Карта разыгрывается у того, кто встал; деньги соперникам — проводками, удары (сдвиг, участок, пропуск, заморозка,
// проверка) — сообщением hit хозяину стола (ядро applyHit). Колода общая для всех карт, без коллекции и редкостей.
const rivalsOf=()=>view?view.players.filter(p=>p.pid!==PID):[];
const richestRival=()=>rivalsOf().slice().sort((a,b)=>(b.cap?b.cap.total:b.cash)-(a.cap?a.cap.total:a.cash))[0];
const bestRivalTile=()=>S.tiles.filter(t=>isRival(t)&&t.type==='kiosk'&&!t.insp&&!(t.frozen>view.turn.n)).sort((a,b)=>invested(b)-invested(a))[0];
// Удар уходит хозяину стола, а клетку меняем и у себя: иначе следующий пакет хода вернул бы её старое состояние
// (mergeTiles принимает от активного игрока drop/insp на чужих клетках — «Жалоба соседей» тут же снималась).
function hit(h){if(!(myTurn()&&net))return;const t=h.tile!=null&&S.tiles[h.tile];
  if(t){if(h.k==='insp')t.insp=true;else if(h.k==='freeze')t.frozen=view.turn.n+view.players.length;else if(h.k==='spoil'&&t.goods>0)t.goods-=Math.ceil(t.goods/2);}
  net.send({t:'hit',h});}
// Суммы карт — от среднего дохода стола за круг (продюсер 02.10: «привязывать к усреднённому обороту, а не к фиксу»).
const chanceU=()=>Math.max(50,r5(window.MP_LAP_P?window.MP_LAP_P():lapCash()));
const pct=k=>Math.max(10,r5(chanceU()*k));
const MP_CHANCE=[
  // Вместо «дня рождения», «проставился» и «кроссовок» (банальные) — три карты с решением или последствием.
  {id:'wholesale',ok:()=>myKiosks().some(t=>t.goods<cap(t)),f:()=>{let n=0;for(const t of myKiosks()){const add=Math.ceil((cap(t)-t.goods)/2);if(add>0){t.goods+=add;n+=add;}}
    return {text:`🚚 Оптовый завоз: склад отдал в долг и забыл — твои точки заполнились наполовину бесплатно (+${n} шт).`,amount:null};}},
  {id:'promo',ok:()=>myKiosks().length>0,f:()=>{S.mpLapBoost=1.5;return {text:'🏷 Акция «Два по цене одного»: на следующем проходе старта продажи ×1,5.',amount:null};}},
  {id:'gathering',ok:()=>rivalsOf().length>0,f:()=>{const rs=rivalsOf(),a=pct(.3);for(const r of rs)credit(r.pid,-a,`сходка: ${esc(r.name)} → ${esc(S.player)} ${money(a)}`);S.cash+=a*rs.length;hit({k:'rest'});
    return {text:`🤝 Сходка: каждый соперник заносит тебе ${money(a)}, но ты пропускаешь следующий ход.`,amount:a*rs.length};}},
  {id:'raid',f:()=>{const rs=rivalsOf(),a=pct(.25);for(const r of rs)credit(r.pid,-a,`облава: ${esc(r.name)} −${money(a)} в копилку`);S.cash-=a;credit(null,0,null,0,{pot:a*(rs.length+1)});return {text:`🚔 Облава на районе: все платят в копилку по ${money(a)}.`,amount:-a};}},
  {id:'mtv',f:()=>{const mine=S.tiles.filter(t=>t.owner&&(t.type==='kiosk'||t.type==='biz')&&!sfIsLot(t));if(!mine.length){const a=pct(.4);S.cash+=a;return {text:`📺 Про тебя сняли сюжет на MTV. Точек нет — зато ${money(a)} за интервью.`,amount:a};}
    for(const t of mine)t.boostN=view.turn.n+view.players.length;return {text:'📺 Сюжет на MTV про твои точки: рента с них ×2 до твоего следующего хода.',amount:null};}},
  {id:'complaint',ok:()=>!!bestRivalTile(),f:()=>{const t=bestRivalTile();hit({k:'insp',tile:t.i});return {text:`📋 Жалоба соседей: инспектор идёт в «${titleOf(t)}» (${nameOf(t.rival)}).`,amount:null,tile:t.i};}},
  {id:'stash',ok:()=>(view.pot||0)>=20,f:()=>{const h=Math.floor((view.pot||0)/2);S.cash+=h;credit(null,0,null,0,{pot:-h});return {text:`💰 Нашёл заначку общака: половина копилки, ${money(h)}, твоя.`,amount:h};}},
  {id:'parking',f:()=>{const a=pct(.4);S.cash-=a;credit(null,0,null,0,{pot:a});return {text:`🚗 Штраф за парковку ${money(a)} — в общую копилку.`,amount:-a};}},
  {id:'robin',f:()=>{const ps=view.players.slice().sort((a,b)=>b.cash-a.cash),rich=ps[0],poor=ps[ps.length-1],a=pct(.5);
    if(ps.length<2||rich.cash-poor.cash<a)return {text:'🤑 Робин Гуд посмотрел на ваши кошельки и ушёл: отнимать нечего.',amount:null};
    if(rich.pid===PID)S.cash-=a;else credit(rich.pid,-a,`Робин Гуд: ${esc(rich.name)} −${money(a)}`);
    if(poor.pid===PID)S.cash+=a;else credit(poor.pid,a,`Робин Гуд: ${esc(poor.name)} +${money(a)}`);
    return {text:`🤑 Робин Гуд: ${rich.pid===PID?'ты отдаёшь':rich.name+' отдаёт'} ${money(a)} ${poor.pid===PID?'тебе':poor.name}.`,amount:rich.pid===PID?-a:poor.pid===PID?a:null};}},
  {id:'roof',f:()=>{S.mpShieldN=view.turn.n+view.players.length;return {text:'🛡 Крыша: тебя прикрыли. Следующий ход — без ренты: встанешь на чужую точку или бизнес, хозяину не платишь.',amount:null};}},
  {id:'roadwork',ok:()=>rivalsOf().some(p=>HAND.roadwork.ok(p.pid)),f:()=>{const r=rivalsOf().find(p=>HAND.roadwork.ok(p.pid));return {text:HAND.roadwork.play(r.pid),amount:null};}},
  {id:'snitch',ok:()=>rivalsOf().some(p=>!p.jail),f:()=>{const r=rivalsOf().filter(p=>!p.jail).sort((a,b)=>b.cash-a.cash)[0];hit({k:'jail',to:r.pid});return {text:`🚔 Донос: ${r.name} едет в участок — две попытки на дубль.`,amount:null};}},
  {id:'queue',ok:()=>rivalsOf().length>0,f:()=>{const rs=rivalsOf(),r=rs[Math.floor(Math.random()*rs.length)];hit({k:'skip',to:r.pid});return {text:`⏳ Очередь в ЖЭК: ${r.name} пропускает следующий ход.`,amount:null};}},
  {id:'blackout',ok:()=>rivalsOf().some(p=>HAND.blackout.ok(p.pid)),f:()=>{const r=richestRival();const pid=HAND.blackout.ok(r.pid)?r.pid:rivalsOf().find(p=>HAND.blackout.ok(p.pid)).pid;return {text:HAND.blackout.play(pid),amount:null};}},
];
MP_CHANCE.push(
  {id:'dumping',ok:()=>rivalsOf().length>0,f:()=>{const r=richestRival();return {text:HAND.dumping.play(r.pid),amount:null};}},
  {id:'spoiled',ok:()=>rivalsOf().some(p=>HAND.spoiled.ok(p.pid)),f:()=>{const p=rivalsOf().find(x=>HAND.spoiled.ok(x.pid));return {text:HAND.spoiled.play(p.pid),amount:null};}},
  {id:'levy',ok:()=>!!leaderPid()&&leaderPid()!==PID,f:()=>({text:HAND.levy.play(leaderPid()),amount:null})},
  {id:'audit',ok:()=>!!leaderPid()&&leaderPid()!==PID&&HAND.audit.ok(leaderPid()),f:()=>({text:HAND.audit.play(leaderPid()),amount:null})},
  {id:'strike',ok:()=>!!leaderPid()&&leaderPid()!==PID,f:()=>({text:HAND.strike.play(leaderPid()),amount:null})});
window.MP_CHANCE=MP_CHANCE;
// ---- карты в руку (плейтест 5: «дать карточки шансов, которые можно использовать против кого-то») ----
// Пакости из колоды не срабатывают сразу, а ложатся в руку (до MP_HAND_MAX). Сыграть — в свой ход, до или после броска,
// одну за ход, против выбранного соперника; карты против лидера бьют лидера по капиталу. Соперники видят число карт, не какие.
const MP_HAND_MAX=2;
const leaderPid=()=>{const ps=view.players.slice().sort((a,b)=>(b.cap?b.cap.total:b.cash)-(a.cap?a.cap.total:a.cash));return ps[0]&&ps[0].pid;};
const topTileOf=(pid,f)=>S.tiles.filter(t=>t.rival===pid&&(f?f(t):true)).sort((a,b)=>invested(b)-invested(a))[0];
const HAND={
  // Объезд: соперник едет вперёд до первой клетки, хозяин которой не он, и платит там ренту (продюсер 02.10).
  roadwork:{name:'🚧 Ремонт дороги',text:'объезд: соперник едет вперёд до первой чужой клетки и платит там ренту',ok:pid=>!!pushTarget(pid),
    play:pid=>{const i=pushTarget(pid),t=S.tiles[i],rent=pushRent(t);if(t.owner&&rent>0){S.cash+=rent;S.stat.earned=(S.stat.earned||0)+rent;}
      hit({k:'push',to:pid,tile:i,rent});return `🚧 Ремонт дороги: ${nameOf(pid)} в объезд — до «${titleOf(t)}»${rent?`, рента ${money(rent)} хозяину`:''}.`;}},
  queue:{name:'⏳ Очередь в ЖЭК',text:'соперник пропускает следующий ход',play:pid=>{hit({k:'skip',to:pid});return `⏳ Очередь в ЖЭК: ${nameOf(pid)} пропускает ход.`;}},
  blackout:{name:'❄️ Отключили свет',text:'20% точек соперника (самые дорогие) круг не берут ренту',ok:pid=>!!topTileOf(pid,t=>(t.type==='kiosk'||t.type==='biz')&&!(t.frozen>view.turn.n)),
    play:pid=>{const all=S.tiles.filter(t=>t.rival===pid&&(t.type==='kiosk'||t.type==='biz')),n=Math.max(1,Math.ceil(all.length*0.2));
      const ts=all.filter(t=>!(t.frozen>view.turn.n)).sort((a,b)=>invested(b)-invested(a)).slice(0,n);ts.forEach(t=>hit({k:'freeze',tile:t.i}));
      return `❄️ Отключили свет: ${ts.map(t=>'«'+titleOf(t)+'»').join(', ')} (${nameOf(pid)}) круг не берут ренту.`;}},
  complaint:{name:'📋 Жалоба соседей',text:'инспектор в самую дорогую точку соперника',ok:pid=>!!topTileOf(pid,t=>t.type==='kiosk'&&!t.insp),
    play:pid=>{const t=topTileOf(pid,t=>t.type==='kiosk'&&!t.insp);hit({k:'insp',tile:t.i});return `📋 Жалоба соседей: инспектор идёт в «${titleOf(t)}» (${nameOf(pid)}).`;}},
  dumping:{name:'📉 Демпинг',text:'следующий проход старта соперника — продажи вдвое меньше',play:pid=>{hit({k:'cut',to:pid,cut:0.5});return `📉 Демпинг: у ${nameOf(pid)} следующий проход старта — продажи вдвое меньше.`;}},
  spoiled:{name:'🦠 Просрочка',text:'портится и пропадает половина всего запаса соперника',ok:pid=>!!topTileOf(pid,t=>t.type==='kiosk'&&t.goods>0),
    play:pid=>{let n=0;for(const t of S.tiles)if(t.rival===pid&&t.type==='kiosk'&&t.goods>0){const k=Math.ceil(t.goods/2);t.goods-=k;n+=k;}hit({k:'spoilAll',to:pid});return `🦠 Просрочка: у ${nameOf(pid)} пропала половина запаса — ${n} шт.`;}},
  // Против лидера (идея Сани): цель — лидер по капиталу, сыграть можно, только если лидер не ты.
  levy:{name:'🧾 Налоговая',text:'лидер платит 30% наличных в копилку',leader:true,play:pid=>{hit({k:'levy',to:pid});return `🧾 Налоговая к лидеру: ${nameOf(pid)} платит 30% наличных в копилку.`;}},
  audit:{name:'🔎 Проверка лидера',text:'инспектор в две самые дорогие точки лидера',leader:true,ok:pid=>!!topTileOf(pid,t=>t.type==='kiosk'&&!t.insp),
    play:pid=>{const ts=S.tiles.filter(t=>t.rival===pid&&t.type==='kiosk'&&!t.insp).sort((a,b)=>invested(b)-invested(a)).slice(0,2);ts.forEach(t=>hit({k:'insp',tile:t.i}));return `🔎 Проверка лидера: инспектор в ${ts.map(t=>'«'+titleOf(t)+'»').join(' и ')} (${nameOf(pid)}).`;}},
  strike:{name:'✊ Забастовка',text:'следующий проход старта лидера — без продаж',leader:true,play:pid=>{hit({k:'cut',to:pid,cut:0});return `✊ Забастовка: у ${nameOf(pid)} следующий проход старта без продаж.`;}},
};
// Первая клетка впереди соперника, хозяин которой — не он (в т.ч. твоя); и рента, которую он там заплатит.
function pushTarget(pid){const p=playerOf(pid);if(!p||!view.tiles)return null;for(let k=1;k<40;k++){const i=(p.pos+k)%40,t=view.tiles[i];if(t&&t.owner&&t.owner!==pid&&(t.type==='kiosk'||t.type==='biz'))return i;}return null;}
function pushRent(t){if(!t||t.insp||(t.frozen&&t.frozen>view.turn.n))return 0;try{return t.owner?rentOfMine(t):rentOf(t);}catch(e){return 0;}}
const handTargets=id=>{const c=HAND[id];if(!c||!view)return [];if(c.leader){const l=leaderPid();return l&&l!==PID&&(!c.ok||c.ok(l))?[l]:[];}return rivalsOf().map(p=>p.pid).filter(pid=>!c.ok||c.ok(pid));};
function handPlay(idx,pid){
  const id=(S.mpHand||[])[idx],c=HAND[id];if(!c||!myTurn()||ending)return false;
  if(S.mpHandN===view.turn.n){toast('Одна карта за ход');return false;}
  if(!handTargets(id).includes(pid)){toast(c.leader?'Карта против лидера — а лидер сейчас ты или цели нет':'Против этого игрока карта не сработает');return false;}
  const text=c.play(pid);S.mpHand.splice(idx,1);S.mpHandN=view.turn.n;
  track('mp_hand_play',{card:id,to:pid});log(`🃏 ${text}`);emit({kind:'chance',text,amount:null,tile:S.pos,to:pid});plate('🃏 Карта сыграна',0,text.replace(/^\S+\s/,''));
  save();render();push();return true;
}
async function handWindow(){
  if(!view||view.phase!=='play')return;const hand=S.mpHand||[];
  if(!hand.length){toast('В руке нет карт — их дают клетки «Шанса»');return;}
  const can=myTurn()&&!ending&&S.mpHandN!==view.turn.n;
  const rows=hand.map((id,i)=>{const c=HAND[id];const ts=handTargets(id);
    return `<div class="row mp-hand-row"><span class="n">${esc(c.name)}<small>${esc(c.text)}</small></span>${can&&ts.length?ts.map(pid=>`<button type="button" class="sm mp-hand-go buy-btn buy-ok" data-i="${i}" data-pid="${esc(pid)}">${c.leader?'Против лидера · ':''}${esc(nameOf(pid))}</button>`).join(''):`<small>${!myTurn()?'в свой ход':S.mpHandN===view.turn.n?'одна карта за ход':'цели нет'}</small>`}</div>`;}).join('');
  const pending=modal(`<h2>🃏 Карты в руке · ${hand.length}/${MP_HAND_MAX}</h2><p class="t">Сыграй в свой ход, до или после броска, — одну за ход. Соперники видят только число карт.</p>${rows}`,[{t:'Закрыть',v:0,cls:'sec'}]);
  $('card').querySelectorAll('.mp-hand-go').forEach(b=>b.onclick=()=>closeModal('h:'+b.dataset.i+':'+b.dataset.pid));
  const v=await pending;if(typeof v==='string'&&v.startsWith('h:')){const [,i,pid]=v.split(':');handPlay(+i,pid);}
}
window.MPHand={list:()=>(S&&S.mpHand||[]).map(id=>({id,name:HAND[id].name,text:HAND[id].text,leader:!!HAND[id].leader,targets:handTargets(id)})),play:handPlay,open:handWindow,max:MP_HAND_MAX,cards:HAND};
async function mpChance(forceId){
  const deck=MP_CHANCE.filter(c=>!c.ok||c.ok()),c=(forceId&&MP_CHANCE.find(x=>x.id===forceId))||deck[Math.floor(Math.random()*deck.length)];
  // Пакость — в руку, если есть место; рука полна — срабатывает сразу по автоматической цели, как раньше.
  if(HAND[c.id]&&(S.mpHand||[]).length<MP_HAND_MAX){S.mpHand=(S.mpHand||[]).concat(c.id);
    track('mp_hand_draw',{card:c.id});log(`🃏 В руку: ${HAND[c.id].name}.`);emit({kind:'hand',text:'взял карту в руку',amount:null,tile:S.pos});save();render();push();
    await mpCardShow(mpCardHTML({id:c.id,cap:HAND[c.id].text,stamp:'В руку'}),`<p class="t mp-cu-note">Карта легла в руку. Сыграй её в свой ход ${HAND[c.id].leader?'против лидера':'против любого соперника'}. Соперники видят, что карта есть, но не какая.</p>`,[{t:'Понял',v:1}]);return;}
  const r=c.f();if(r.amount>0)S.stat.earned=(S.stat.earned||0)+r.amount;
  track('mp_chance',{card:c.id,amount:r.amount||0});log(`🎴 ${r.text}`);
  emit({kind:'chance',text:r.text,amount:r.amount,tile:r.tile!=null?r.tile:S.pos});
  if(r.amount)plate('🎴 Шанс',r.amount,r.text.replace(/^\S+\s/,''));
  save();render();push();
  await mpCardShow(mpCardHTML({id:c.id,cap:mpcCap(c.id,r.text),stamp:'Шанс',tone:r.amount<0?'grey':undefined}),r.amount?`<p class="t mp-cu-sum ${r.amount>0?'plus':'minus'}">${r.amount>0?'+':'−'}${money(Math.abs(r.amount))}</p>`:'',[{t:'Ок',v:1}]);
}
if(typeof chancePlay==='function'){const base=chancePlay;chancePlay=function(){if(view&&view.phase==='play'&&myTurn())return mpChance();return base.apply(this,arguments);};}

// ---- отправка своего хода ----
let pushT=0;
function push(){
  if(!myTurn())return;
  clearTimeout(pushT);pushT=0;
  S.rolls=999;   // ход = один бросок; награды ходами платят налом в явных местах (автомат, находки), общей конвертации нет
  net.send({t:'state',pack:makePack()});
}
function makePack(){return {n:view.turn.n,s:sliceOf(S),tiles:toShared(S.tiles),credits,rolled,landed,dice:lastDice&&!lastDice.lesson?{a:lastDice.a,b:lastDice.b}:null};}
function pushSoon(){if(myTurn()&&!pushT)pushT=setTimeout(push,150);}
save=function(){pushSoon();};       // сохранение партии — у хозяина стола
// Ход = один бросок, запас ходов не нужен. Общей конвертации «лишних ходов» больше нет (плейтест 01.10:
// «+$10 вместо ходов» каждый ход без причины). Ходы платят налом только там, где их дают:
// находка инкассатора — здесь, автомат — в движке по курсу MP_ROLL_CASH.
(function(){const base=collectDrop;collectDrop=async function(t){
  const d=t&&t.drop;
  if(d&&d.rolls>0&&myTurn()){const n=d.rolls,cash=n*rollCash();d.cash=(d.cash||0)+cash;d.rolls=0;
    toast(`🎲→💵 Вместо ${n} ${plural(n,'хода','ходов','ходов')} — +${money(cash)}: в партии ходы не копятся`,2600);}
  return base.apply(this,arguments);};})();
(function(){const base=render;render=function(){const r=base.apply(this,arguments);try{mpRender();}catch(e){console.error(e);}if(myTurn()&&rolled)pushSoon();return r;};})();

function finishTurn(){
  if(!myTurn()||ending)return;
  if(bankruptNeed()>0&&mpBankList().length){mpBankWindow();return;}   // второй круг в минусе — ход не передать, пока клетки не на торгах
  // Окно долга само — только когда прошёл старт в минусе (новый круг в минусе) — плейтест 5: «каждый ход подбешивает».
  // В остальное время в минусе играешь молча; окно открывается по тапу (MPDebt.open) из метки «минус» в полосе.
  if(S.cash<0&&(S.mpDebtLaps||0)>(S.mpDebtSeen||0)&&S.mpDebtAskN!==view.turn.n&&(mpBankList().length||stockValue()>0||canMicro())){S.mpDebtAskN=view.turn.n;S.mpDebtSeen=S.mpDebtLaps||0;debtWindow(true);return;}
  // Не ответил на предложение до конца хода — отказ, деньги покупателю возвращаются.
  for(const t of S.tiles)if(t.owner&&t.mpOffer)declineOffer(t,true);
  for(const o of swapIncoming())swapDecline(o.id,true);   // не ответил на обмен до конца хода — отказ
  for(const t of S.tiles)if(t.rival&&t.mpSale&&t.mpSale.to===PID)declineSale(t,true);
  ending=true;closeAll();clearTimeout(pushT);pushT=0;S.rolls=999;
  net.send({t:'end',n:view.turn.n,pack:makePack()});updateUi();   // последний срез — внутри «конца хода», чтобы его не обогнать
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
  // Время вышло на втором круге в минусе — клетки выставляются на торги сами, с самого дешёвого.
  S.mpDebtAskN=view.turn.n;
  if(bankruptNeed()>0){let acc=0;for(const x of mpBankList().sort((a,b)=>a.price-b.price)){if(acc>=bankruptNeed())break;startLot(x.i,x.price,'bankrupt',x.bank);acc+=x.price;}
    for(let i=0;i<30&&bankruptNeed()>0&&mpBankList().length;i++)await wait(100);}
  finishTurn();
}

// ---- бросок только в свой ход, один раз ----
(function(){const base=prototypeRoll;prototypeRoll=async function(){
  if(!view||view.phase!=='play'){toast('Партия ещё не началась');return;}
  if(!myTurn()){toast(`Сейчас ходит ${nameOf(view.turn.pid)}`);return;}
  if(rolled||ending){toast('Бросок уже был — жми «Передать ход»');return;}
  if(S.jail>0&&!autoEnding&&S.mpJailAskN!==view.turn.n){S.mpJailAskN=view.turn.n;await jailChoice();if(!myTurn()||rolled||ending)return;}   // в участке: откупиться и бросить, или бросать на дубль
  rolled=true;S.rolls=999;lastDice=null;push();posterAway();
  try{await base.apply(this,arguments);}finally{
    landed=true;S.rolls=999;
    push();updateUi();}
};})();
let lastDice=null;
// Бонус за дубль — сразу, как кубики легли (до движения фишки), а не после передачи хода.
(function(){const base=mobileDice;mobileDice=async function(){const r=await base.apply(this,arguments);lastDice=r;
  if(r&&r.a===r.b&&!r.lesson&&myTurn()&&rolled&&!S.jail)doubleBonus(r.a+r.b);return r;};})();
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
// Построил точку на пустыре — карточка не закрывается, а открывается её сторона прокачки, как в основной игре (плейтест 01.10).
function reopenAfterBuild(type,d){
  if((type!=='sf_build'&&type!=='sf_rebuild')||d.tile==null)return;
  setTimeout(()=>{const t=S.tiles[d.tile];if(!myTurn()||ending||moving||!t||!t.owner||!$('modal').hidden)return;
    try{(t.type==='biz'?bizWindow:kioskWindow)(t);}catch(e){}},650);
}
function trackToEvt(type,d){
  reopenAfterBuild(type,d);
  const t=d.tile!=null?S.tiles[d.tile]:null,nm=t?(t.type==='biz'?bizName(t):pointName(t)):'';
  if(type==='sf_build')emit({kind:'build',text:`построил ${nm}`,amount:-(d.price||0),tile:d.tile});
  else if(type==='sf_rebuild')emit({kind:'build',text:`перестроил точку: теперь ${nm}`,amount:-(d.price||0)+(d.refund||0),tile:d.tile});
  else if(type==='buy_biz'||type==='buy_point')emit({kind:'build',text:`купил ${nm}`,amount:-(d.price||0),tile:d.tile});
  else if(type==='upgrade')emit({kind:'upgrade',text:`прокачал ${nm}`,amount:-(d.cost||0),tile:d.tile});
  else if(type==='sf_license'){const l=((window.SFBuilder&&SFBuilder.licenses)||[]).find(x=>x.id===d.id);emit({kind:'license',text:`купил лицензию «${l?l.name:d.id}»`,amount:-(d.price||0)});}
}
function emit(e){if(myTurn()&&net)net.send({t:'evt',e});}

// Разлёт наград (инкассатор): куда легли монеты — соперникам, они видят тот же разлёт у себя.
(function(){const base=flyDrops;flyDrops=async function(plan){
  try{if(myTurn()&&plan&&plan.length){
    const drops=plan.map(pl=>({to:pl.t.i,drop:pl.drop}));
    // Инспектор тоже раздаёт «находки» (drop {insp:1}) — это своё событие, не мешок инкассатора (плейтест 4, 02.10).
    if(plan.every(pl=>pl.drop&&pl.drop.insp))emit({kind:'insp',text:`инспектор пришёл с проверкой: ${plan.map(pl=>titleOf(pl.t)).join(', ')}`,amount:null,tile:S.pos,drops});
    else emit({kind:'scatter',text:'растерял мешок инкассатора',amount:null,tile:S.pos,cash:plan.reduce((a,pl)=>a+((pl.drop&&pl.drop.cash)||0),0),drops});}}catch(e){}
  return base.apply(this,arguments);};})();

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
const landedHere=()=>!!(view&&view.turn&&S&&S.mpLanded&&S.mpLanded.n===view.turn.n&&S.mpLanded.i===S.pos);
(function(){const base=land;land=async function(t){
  if(t&&view&&view.turn)S.mpLanded={n:view.turn.n,i:t.i};
  if(!isRival(t)){
    if(t&&t.type==='wh'&&myTurn()&&view&&view.phase==='play'&&!S.tiles.some(x=>x.owner&&x.type==='kiosk')){S.cash+=MP_WH_CONSOLATION;plate('🏬 Склад',MP_WH_CONSOLATION,'точек нет — утешительный приз');log(`🏬 Своих точек нет: утешительный приз ${money(MP_WH_CONSOLATION)}.`);}
    // Копилка-джекпот («вдвоём угарно») — у неё нет окна мини-игры, выигрыш показываем соперникам сами.
    const before=S.cash,r=await base.apply(this,arguments),d=Math.round(S.cash-before);
    if(t&&t.type==='pot'&&d>0)emit({kind:'minigame',text:'сорвал копилку',amount:d,tile:t.i});
    return r;}
  S.landN=(S.landN||0)+1;
  if(t.drop)await collectDrop(t);
  // Рента — один раз за остановку (плейтест: списывалась повторно в начале следующего хода на той же клетке)
  // и не за клетку под проверкой инспектора (она не торгует — хозяину нечего брать).
  const paid=S.mpRent&&view&&view.turn&&S.mpRent.n===view.turn.n&&S.mpRent.i===t.i;
  if(paid){}
  else if(t.insp){toast(`📋 ${titleOf(t)} под проверкой — ренты нет`,2200);log(`📋 ${titleOf(t)}, хозяин ${nameOf(t.rival)}: под проверкой, рента не берётся.`);}
  else if(S.mpShieldN&&view.turn.n<=S.mpShieldN){toast('🛡 Крыша прикрыла — ренты нет',2200);log(`🛡 ${titleOf(t)}: крыша, рента не берётся.`);}
  else if(t.frozen&&t.frozen>view.turn.n){toast(`❄️ ${titleOf(t)} заморожена — ренты нет`,2200);log(`❄️ ${titleOf(t)}: заморожена картой «Шанса», рента не берётся.`);}
  else{S.mpRent={n:view.turn.n,i:t.i};payRent(t);}
  render();
  const tb=$('tilebar');if(tb&&!tb.hidden){tb.classList.add('pulse');setTimeout(()=>tb.classList.remove('pulse'),2400);}
};})();
// id уникален и после перезагрузки посреди хода: хозяин стола отбрасывает повторы по id.
const creditTag=Date.now().toString(36);
function payRent(t){
  const r=rentOf(t),who=nameOf(t.rival),what=t.type==='biz'?bizName(t):pointName(t);
  S.cash-=r;credit(t.rival,r,`${esc(S.player)} → ${esc(who)}: рента ${money(r)}`,0,{rent:true});
  track('mp_rent',{tile:t.i,to:t.rival,amt:r});
  log(`🏠 ${what}, хозяин ${who}. Заплатил ренту ${money(r)}.`);
  plate(`🏠 Рента · ${who}`,-r,S.cash<0?'ты в минусе':what);
  emit({kind:'rent',text:`заплатил ренту за «${what}»`,amount:-r,tile:t.i,to:t.rival});
  const tok=tokens.get(t.rival);
  try{fly('💵',AT.cash(),tok&&tok.at?tok.at:AT.tile(t.i),flyN(r));}catch(e){}
  push();
}
function credit(to,cash,note,escrow,extra){if(!note&&extra){note=extra.potTake?'забрал копилку стола':+extra.pot>0?`в копилку +${money(extra.pot)}`:+extra.pot<0?`из копилки ${money(-extra.pot)}`:+extra.slot?`касса автомата ${extra.slot>0?'+':'−'}${money(Math.abs(extra.slot))}`:'';}   // журнал стола: без пустых проводок
  const c={id:`${PID}:${view.turn.n}:${creditTag}:${++creditSeq}`,to,cash:Math.round(cash),note};if(escrow)c.escrow=Math.round(escrow);if(extra)Object.assign(c,extra);credits.push(c);}
const titleOf=t=>t.type==='biz'?bizName(t):pointName(t);

// ---- предложение о покупке: покупатель ----
// Встал на чужую клетку (рента уплачена) — можно предложить хозяину вложенное × 1…10. Деньги уходят в резерв,
// чтобы их не потратить; одно предложение на клетку. Ответ хозяина — в начале его хода; молчание до конца хода — отказ.
async function rivalWindow(t){
  const biz=t.type==='biz',owner=t.rival,who=nameOf(owner),col=colorOf(owner),inv=invested(t),mv=marketValue(t,PID),title=titleOf(t);
  const g=biz?null:good(t.good),here=S.pos===t.i,offer=t.mpOffer;
  // Плейтест 5: предлагать цену и обмен можно на любую чужую клетку в свой ход (из «Моих владений» и с карты), не только стоя;
  // одно новое предложение (цена или обмен) за ход. Выкуп ×10 — по-прежнему только стоя на клетке.
  const mine=offer&&offer.from===PID,busy=offer&&!mine,canOffer=myTurn()&&!ending&&!offer&&!t.mpSwap&&!lotOn(t.i)&&!proposedThisTurn();
  const rows=[
    biz?['Уровень',t.level]:['Уровень',t.salesLvl],
    biz?['За остановку',money(fee(t)*CFG.BIZ.landMult)]:['Прибыль хозяина за круг',money(sales(t)*marginOf(t.good))],
    biz?['Сеть бизнесов хозяина',`${bizCountOf(t)} · сбор ${fmtMult(bizSetMult(bizCountOf(t)))}`]:null,
    ['Рента с тебя',money(rentOf(t))],
    biz?null:['Товар в точке',`${t.goods||0} шт`],
    ['Вложено хозяином',money(inv)],
    ['Рыночная цена для тебя',money(mv)],
  ].filter(Boolean);
  const opts=OFFER_MULTS.map(m=>{const a=Math.round(mv*m),ok=canOffer&&S.cash>=a;
    return `<button type="button" class="mp-mult buy-btn ${ok?'buy-ok':'buy-no'}" data-m="${m}" ${ok?'':'disabled'}><b>×${String(m).replace('.',',')}</b><span>${money(a)}</span></button>`;}).join('');
  const lot=lotOn(t.i),forceAmt=forcePrice(t),canForce=myTurn()&&here&&!ending&&!lot&&forceReady()&&S.cash>=forceAmt;
  const swapHtml=!ending&&!lot&&myTurn()&&(!proposedThisTurn()||(t.mpSwap&&t.mpSwap.from===PID))?swapBlock(t):'';
  if(t.frozen&&view.turn&&t.frozen>view.turn.n)rows.push(['Заморожена','ренты нет до следующего хода хозяина']);
  const pending=modal(`<h2>${biz?bizIcon(t):g.icon} ${esc(title)}</h2>
    <p class="t mp-owner"><i style="background:${col}">${esc(who.slice(0,1).toUpperCase())}</i> Хозяин — <b style="color:${col}">${esc(who)}</b></p>
    ${rows.map(r=>`<div class="row"><span class="n">${r[0]}</span><span class="v">${r[1]}</span></div>`).join('')}
    ${mine?`<div class="mp-choice"><b>Твоё предложение — ${money(offer.amount)}</b><p>${esc(who)} ответит в начале своего хода. Деньги в резерве; откажет — вернутся.</p></div>`
     :busy?`<div class="mp-choice"><b>${esc(nameOf(offer.from))} уже предложил цену</b><p>Одно предложение на клетку — жди ответа ${esc(who)}.</p></div>`
     :`<div class="mp-choice"><b>${!myTurn()?'Предложить цену можно в свой ход.':proposedThisTurn()?'В этот ход ты уже сделал предложение — следующее в следующий ход.':'Предложи хозяину цену:'}</b>
       <p>Сумма — от рыночной цены: доход клетки с группой, растёт к концу партии. ${esc(who)} решит в начале своего хода: согласится — ${biz?'бизнес':'точка'} твоя${biz?'':' вместе с товаром'}, откажет — деньги вернутся.</p>
       <div class="mp-mults">${opts}</div>
       ${canOffer?`<div class="mp-offer-own"><span>Своя сумма, от ${money(mv)}:</span><input type="number" class="mp-offer-amount" min="${Math.ceil(mv/10)*10}" step="10" value="${Math.ceil(mv*1.2/10)*10}"><button type="button" class="mp-offer-go buy-btn buy-ok">Предложить</button></div>`:''}</div>`}
    ${lot?lotHtml(lot):''}
    ${swapHtml}
    ${here&&!ending&&!lot?`<div class="mp-choice mp-force-box"><b>Или выкупить сразу, без согласия ${esc(who)}:</b><button type="button" class="mp-force buy-btn ${canForce?'buy-ok':'buy-no'}" ${canForce?'':'disabled'}>${forceReady()?`Выкупить ×${FORCE_MULT} · ${money(forceAmt)}`:`Выкуп ×${FORCE_MULT} — через ${forceWait()} ${plural(forceWait(),'круг','круга','кругов')}`}</button></div>`:''}`,
    [{t:'Уйти',v:0,cls:'sec'}]);
  $('card').querySelectorAll('.mp-mult').forEach(b=>b.onclick=()=>{if(!b.disabled)closeModal(+b.dataset.m);});
  {const go=$('card').querySelector('.mp-offer-go');if(go)go.onclick=()=>{const a=Math.round(+$('card').querySelector('.mp-offer-amount').value||0);if(a<mv){toast(`Не меньше рыночной цены — ${money(mv)}`);return;}if(a>S.cash){toast('Столько денег нет');return;}closeModal('amt:'+a);};}
  {const f=$('card').querySelector('.mp-force');if(f)f.onclick=()=>{if(!f.disabled)closeModal('force');};}
  wireBids();
  {const sb=$('card').querySelector('.mp-swap-go');if(sb)sb.onclick=()=>{if(sb.disabled)return;const g=+$('card').querySelector('.mp-swap-give').value,pay=+$('card').querySelector('.mp-swap-pay').value;closeModal('swap:'+g+':'+pay);};}
  const m=await pending;
  if(m==='force'){forceBuy(t);return;}
  if(typeof m==='string'&&m.startsWith('swap:')){const [,g,pay]=m.split(':');placeSwap(t,+g,+pay);return;}
  if(typeof m==='string'&&m.startsWith('bid:')){placeBid(lot&&lot.id,+m.slice(4));return;}
  if(typeof m==='string'&&m.startsWith('amt:')){placeOfferAmount(t,+m.slice(4));return;}
  if(!m||!OFFER_MULTS.includes(m))return;
  placeOffer(t,m);
}
const proposedThisTurn=()=>!!(view&&view.turn&&S&&S.mpProposeN===view.turn.n);
// ---- предложить продажу своей клетки конкретному сопернику (продюсер 02.10, зеркально предложению цены) ----
// Хозяин в свой ход выбирает соперника и цену; соперник отвечает в начале своего хода «Купить / Отказать», платит при согласии.
// Ограничения те же: одно предложение (цена, обмен или продажа) за ход, одно висящее на клетку, не на торгах.
function placeSale(i,pid,amount){
  const t=S.tiles[i];amount=Math.round(+amount||0);
  if(!t||!t.owner||!(t.type==='kiosk'||t.type==='biz')||sfIsLot(t)||t.mpSale||t.mpOffer||lotOn(i)||!myTurn()||ending||proposedThisTurn()||amount<10||!playerOf(pid)||pid===PID)return false;
  t.mpSale={from:PID,to:pid,amount,n:view.turn.n};S.mpProposeN=view.turn.n;
  track('mp_sale_offer',{tile:i,to:pid,amount});log(`🏷 Предложил ${nameOf(pid)} купить «${titleOf(t)}» за ${money(amount)}.`);
  emit({kind:'saleoffer',text:`предлагает купить «${titleOf(t)}» за ${money(amount)}`,amount:null,tile:i,to:pid});
  plate(`🏷 Продажа · ${nameOf(pid)}`,0,'ответ — в начале его хода');save();render();push();return true;
}
async function saleWindow(i){
  const t=S.tiles[i];if(!t||!t.owner||!myTurn()||ending)return;if(proposedThisTurn()){toast('В этот ход предложение уже было');return;}
  const inv=Math.round(invested(t)),rs=rivalsOf();
  const pending=modal(`<h2>🏷 Продать «${esc(titleOf(t))}»</h2><p class="t">Вложено ${money(inv)}. Выбери соперника и цену — он ответит в начале своего хода.</p>
    <select class="mp-sale-to">${rs.map(p=>`<option value="${esc(p.pid)}">${esc(p.name)} · нал ${money(p.cash)}</option>`).join('')}</select>
    <input type="number" class="mp-sale-amount" min="10" step="10" value="${Math.ceil(inv*1.5/10)*10}"><button type="button" class="mp-sale-go buy-btn buy-ok">Предложить продажу</button>`,[{t:'Передумал',v:0,cls:'sec'}]);
  $('card').querySelector('.mp-sale-go').onclick=()=>closeModal('sale:'+$('card').querySelector('.mp-sale-to').value+':'+(+$('card').querySelector('.mp-sale-amount').value||0));
  const v=await pending;if(typeof v==='string'&&v.startsWith('sale:')){const [,pid,a]=v.split(':');placeSale(i,pid,+a);}
}
async function answerSale(t){
  const o=t.mpSale;if(!o||o.to!==PID||!myTurn()||ending)return;
  const v=await modal(`<h2>🏷 ${esc(nameOf(o.from))} продаёт «${esc(titleOf(t))}»</h2>
    <div class="mp-offer-big"><strong>${money(o.amount)}</strong><small>вложено ${money(invested(t))}${t.type==='kiosk'?` · товар ${t.goods||0} шт`:''}</small></div>
    <p class="t">Купишь — клетка твоя${t.type==='kiosk'?' вместе с товаром':''}. Не ответишь до конца хода — отказ.</p>${S.cash<o.amount?`<p class="t mp-hand-why">Не хватает ${money(o.amount-S.cash)} — купить нельзя. Можно отказать.</p>`:''}`,
    [{t:`Купить · ${money(o.amount)}`,v:1,cls:'ok',dis:S.cash<o.amount},{t:'Отказать',v:0,cls:'sec'}]);
  if(!t.mpSale||t.mpSale!==o||!myTurn())return;
  if(v===1&&S.cash>=o.amount)acceptSale(t);else if(v===0)declineSale(t,false);updateUi();
}
function acceptSale(t){
  const o=t.mpSale,seller=o.from;S.cash-=o.amount;credit(seller,o.amount,`${esc(S.player)} купил «${esc(titleOf(t))}» за ${money(o.amount)}`,0,{sale:true,tile:t.i});
  const base=baseInv(t);delete t.mpSale;t.mpPrem=o.amount-base;t.owner='you';delete t.rival;delete t.mpOffer;
  track('mp_sale',{tile:t.i,from:seller,amount:o.amount});log(`🏷 Купил «${titleOf(t)}» у ${nameOf(seller)} за ${money(o.amount)}.`);
  plate(`🏷 Куплено · ${nameOf(seller)}`,-o.amount,`«${titleOf(t)}» теперь твоя`);emit({kind:'salebought',text:`купил «${titleOf(t)}» за ${money(o.amount)}`,amount:null,tile:t.i,to:seller});
  save();render();push();
}
function declineSale(t,silent){const o=t.mpSale;if(!o)return;delete t.mpSale;emit({kind:'decline',text:`отказался купить «${titleOf(t)}»`,amount:null,tile:t.i,to:o.from});if(!silent){save();render();}push();}
function saleAnswer(i,yes){const t=S.tiles[i];if(!t||!t.mpSale||t.mpSale.to!==PID||!myTurn()||ending)return false;
  if(yes){if(S.cash<t.mpSale.amount)return false;acceptSale(t);return true;}declineSale(t,false);return true;}
function saleCancel(i){const t=S.tiles[i];if(!t||!t.owner||!t.mpSale||!myTurn())return false;const to=t.mpSale.to;delete t.mpSale;emit({kind:'decline',text:`отозвал продажу «${titleOf(t)}»`,amount:null,tile:i,to});save();render();push();return true;}
// API для «Интерфейса»: open — моё окно; answer(i,yes) — покупатель в свой ход (false — нет денег); pending — входящие; mine — мои висящие.
window.MPSell={open:saleWindow,offer:placeSale,answer:saleAnswer,answerWindow:i=>answerSale(S.tiles[i]),cancel:saleCancel,
  pending:()=>S?S.tiles.filter(t=>t.rival&&t.mpSale&&t.mpSale.to===PID).map(t=>({i:t.i,title:titleOf(t),price:t.mpSale.amount,from:t.mpSale.from})):[],
  mine:()=>S?S.tiles.filter(t=>t.owner&&t.mpSale).map(t=>({i:t.i,title:titleOf(t),price:t.mpSale.amount,to:t.mpSale.to})):[]};
// ---- обмен клетками на карте (m5-swapmap, решения продюсера 02.10) ----
// До 2 клеток с каждой стороны плюс доплата −$500…+$500; встречное предложение; «Подобрать обмен»; без лимита пары.
// Система координат API — того, кто вызывает: give — мои клетки, get — соперника, pay>0 — доплачиваю я.
// Хранение: o={id,from,to,give,get,pay,n} в системе автора — на всех клетках обмена (give — автора, get — получателя).
// Деньги: доплату автора (pay>0) держим в резерве до ответа; принято — клетки и деньги разом (mergeTiles атомарно).
const SWAP_PAYS=[-500,-300,-200,-100,-50,0,50,100,200,300,500],SWAP_MAX=2;
const pairKey=(a,b)=>[a,b].sort().join('|');                        // совместимость со старыми метками mpSwapPair
const swappedWith=()=>false;                                           // лимит «один обмен на пару» снят (02.10)
let swapErr='';
const tradeable=t=>!!t&&(t.type==='kiosk'||t.type==='biz')&&!sfIsLot(t);
function swapFreeReason(i,ignoreId){const t=S.tiles[i];if(!tradeable(t))return 'это не точка и не бизнес';if(!t.owner&&!t.rival)return 'клетка ничья';
  if(lotOn(i))return 'клетка на торгах';if(t.mpOffer)return 'на клетку висит предложение цены';if(t.mpSale)return 'клетка выставлена на продажу';if(t.mpSwap&&t.mpSwap.id!==ignoreId)return 'клетка уже в другом обмене';return '';}   // ignoreId — свой разбираемый обмен (ответ, встречное)
function myTradeTiles(){return S.tiles.filter(x=>x.owner&&tradeable(x)&&!swapFreeReason(x.i));}
// Рента клетки на общем поле (owner = pid) — та же формула, что rentOf, но для любого хозяина и гипотетических владельцев.
function rentShared(sh,t){
  if(!t||!t.owner||!tradeable(t))return 0;const own=t.owner,gm=groupMult(sh,t,own);
  if(t.type==='biz'){noBizSet++;let f;try{f=fee(t);}finally{noBizSet--;}const n=sh.filter(x=>x.type==='biz'&&x.owner===own).length;return Math.round(f*CFG.BIZ.landMult*bizSetMult(n)*gm);}
  if(!t.base||t.lot)return 0;return Math.max(1,Math.round(RENT_LAPS*sales(t)*marginOf(t.good)*(1+prosp()*coveredIn(sh,own))*gm));}
// ---- рыночная цена клетки (продюсер 03.10: «выкуп за дёшево в конце игры — считать по эффективной цене») ----
// Цена = max(вложено, MARKET_LAPS кругов дохода клетки с цепочкой). Для покупателя — по его цепочке и его сети бизнесов:
// если клетка достраивает его группу, она для него дороже. Берём большее из «для хозяина» и «для покупателя».
const MARKET_LAPS=6,FORCE_MARKET=3,MARKET_STAGE=0.15;
// Стадия партии: цены сделок растут на 15% за каждый средний пройденный круг игроков (круг 0 — ×1, круг 10 — ×2,5).
// Продюсер 02.10: «точки постоянно дорожают»; доход одной точки за 6 кругов в конце игры меньше вложенного, без стадии цена упиралась во вложенное.
function marketStage(){const ps=(view&&view.players)||[];if(!ps.length)return 1;const avg=ps.reduce((a,p)=>a+(+p.laps||0),0)/ps.length;return 1+MARKET_STAGE*avg;}
function lapIncomeShared(sh,t,own){if(!t||!own)return 0;
  if(t.type==='biz'){noBizSet++;let f;try{f=fee(t);}finally{noBizSet--;}return f*bizSetMult(sh.filter(x=>x.type==='biz'&&x.owner===own).length);}
  if(!t.base||t.lot)return 0;return sales(t)*marginOf(t.good)*(1+prosp()*coveredIn(sh,own));}
function marketValue(t,buyer){
  if(!t||!tradeable(t))return 0;const inv=invested(t),sh=sharedWith(),own=ownerOf(t.i);
  // Ценность = max(вложенное, 6 кругов дохода) × группа (соседи и сеть бизнесов) × стадия партии.
  const val=(s2,x,who)=>Math.max(inv,MARKET_LAPS*lapIncomeShared(s2,x,who))*groupMult(s2,x,who);
  const vOwn=own?val(sh,t,own):inv;
  let vBuy=0;if(buyer&&buyer!==own){const sb=sharedWith({[t.i]:buyer});vBuy=val(sb,sb[t.i],buyer);}
  return Math.max(Math.round(inv),Math.round(Math.max(vOwn,vBuy)*marketStage()/10)*10);}
function sharedWith(over){const sh=toShared(S.tiles);if(over)for(const k in over){const t=sh[+k];if(t)t.owner=over[k];}return sh;}
function rentTotals(over){const sh=sharedWith(over),out={};for(const p of (view&&view.players)||[])out[p.pid]=0;
  for(const t of sh)if(t.owner&&out[t.owner]!=null)out[t.owner]+=rentShared(sh,t);return out;}
const ownerOf=i=>{const t=S.tiles[i];return t?(t.owner?PID:t.rival||null):null;};
function swapOver(me,to,give,get){const o={};for(const i of give)o[i]=to;for(const i of get)o[i]=me;return o;}
function chainsOf(pid,give,get,to){const sh=give||get?sharedWith(swapOver(PID,to,give||[],get||[])):sharedWith();
  const own=i=>{const t=sh[(i+40)%40];return t&&t.owner===pid&&tradeable(t);};const out=[],seen=new Set();
  for(let i=0;i<40;i++){if(!own(i)||seen.has(i)||own(i-1))continue;const tiles=[];let j=i;while(own(j)&&tiles.length<40){tiles.push((j+40)%40);seen.add((j+40)%40);j++;}if(tiles.length>1)out.push({from:tiles[0],to:tiles[tiles.length-1],size:tiles.length,tiles});}
  return out;}
function lonersOf(pid){pid=pid||PID;const sh=sharedWith();return sh.filter(t=>t.owner===pid&&tradeable(t)&&!(sh[(t.i+39)%40].owner===pid&&tradeable(sh[(t.i+39)%40]))&&!(sh[(t.i+1)%40].owner===pid&&tradeable(sh[(t.i+1)%40]))).map(t=>t.i);}
function swapCheck(d){
  const {to,give=[],get=[]}=d,pay=+d.pay||0,ign=typeof d.counter==='string'?d.counter:undefined;
  if(!view||view.phase!=='play')return 'партия не идёт';if(!playerOf(to)||to===PID)return 'нет такого соперника';
  if(!give.length||!get.length||give.length>SWAP_MAX||get.length>SWAP_MAX)return `от 1 до ${SWAP_MAX} клеток с каждой стороны`;
  if(new Set(give.concat(get)).size!==give.length+get.length)return 'клетка выбрана дважды';
  if(!SWAP_PAYS.includes(pay))return 'доплата не из ряда';
  for(const i of give){if(ownerOf(i)!==PID)return 'отдать можно только свою клетку';const r=swapFreeReason(i,ign);if(r)return r;}
  for(const i of get){if(ownerOf(i)!==to)return 'клетка не у этого соперника';const r=swapFreeReason(i,ign);if(r)return r;}
  return '';}
function swapPreview(d){const give=d.give||[],get=d.get||[],to=d.to,b=rentTotals(),a=rentTotals(swapOver(PID,to,give,get));
  const r=swapCheck(d),turn=!myTurn()?'не твой ход':ending?'ход заканчивается':proposedThisTurn()&&!d.accept?'одно предложение за ход':'';
  const pay=+d.pay||0,money_=pay>0&&S.cash<pay?'на доплату не хватает':'';
  return {ok:!r&&!turn&&!money_,reason:r||turn||money_,mine:{before:b[PID]||0,after:a[PID]||0},theirs:{before:b[to]||0,after:a[to]||0},
    invGive:Math.round(give.reduce((x,i)=>x+invested(S.tiles[i]),0)),invGet:Math.round(get.reduce((x,i)=>x+invested(S.tiles[i]),0))};}
const combos=arr=>{const out=[];for(let a=0;a<arr.length;a++){out.push([arr[a]]);for(let b=a+1;b<arr.length;b++)out.push([arr[a],arr[b]]);}return out;};
function swapSuggest(to,k=0){
  const mine=S.tiles.filter(t=>t.owner&&tradeable(t)&&!swapFreeReason(t.i)).map(t=>t.i),theirs=S.tiles.filter(t=>t.rival===to&&tradeable(t)&&!swapFreeReason(t.i)).map(t=>t.i);
  if(!mine.length||!theirs.length)return null;const b=rentTotals(),res=[];
  for(const give of combos(mine))for(const get of combos(theirs)){const a=rentTotals(swapOver(PID,to,give,get)),dm=(a[PID]||0)-(b[PID]||0),dt=(a[to]||0)-(b[to]||0);
    if(dm>0&&dt>=0)res.push({give,get,dm,dt});}
  res.sort((x,y)=>y.dm-x.dm||y.dt-x.dt);const v=res[k];if(!v)return null;
  const diff=Math.round(v.get.reduce((x,i)=>x+marketValue(S.tiles[i],PID),0)-v.give.reduce((x,i)=>x+marketValue(S.tiles[i],to),0));
  const pay=SWAP_PAYS.reduce((best,x)=>Math.abs(x-diff)<Math.abs(best-diff)?x:best,0);
  const d={to,give:v.give,get:v.get,pay};return Object.assign(d,{preview:swapPreview(d)});}
// Изменения состояния — без отправки: нужны и игроку, и боту в фоне (у бота свои проводки).
function swapPlaceLocal(d,emitFn){
  const o={id:`sw:${view.match}:${view.turn.n}:${PID}:${d.give.join('.')}-${d.get.join('.')}`,from:PID,to:d.to,give:d.give.slice(),get:d.get.slice(),pay:+d.pay||0,n:view.turn.n};
  if(o.pay>0){S.cash-=o.pay;S.mpEscrow=(S.mpEscrow||0)+o.pay;}
  for(const i of o.give.concat(o.get))S.tiles[i].mpSwap=o;S.mpProposeN=view.turn.n;
  const names=a=>a.map(i=>'«'+titleOf(S.tiles[i])+'»').join(' и ');
  emitFn({kind:d.counter?'swapcounter':'swap',text:`${d.counter?'встречное: ':'предлагает обмен: '}${names(o.give)} на ${names(o.get)}${o.pay?` · доплата ${o.pay>0?'его':'твоя'} ${money(Math.abs(o.pay))}`:''}`,amount:null,tile:o.get[0],to:o.to,from:o.from,give:o.give,get:o.get,pay:o.pay,swap:o});
  return o;}
function swapClear(o){for(const i of o.give.concat(o.get)){const t=S.tiles[i];if(t&&t.mpSwap&&t.mpSwap.id===o.id)delete t.mpSwap;}}
function swapStillValid(o){return o.give.every(i=>ownerOf(i)===o.from&&!lotOn(i))&&o.get.every(i=>ownerOf(i)===o.to&&!lotOn(i));}
function swapAcceptLocal(o,creditFn,emitFn){
  if(!swapStillValid(o)){swapDeclineLocal(o,creditFn,emitFn,true);return false;}
  if(o.pay<0&&S.cash<-o.pay)return false;
  if(o.pay>0){S.cash+=o.pay;creditFn(o.from,0,{escrow:-o.pay,note:'обмен принят'});}
  else if(o.pay<0){S.cash+=o.pay;creditFn(o.from,-o.pay,{note:'обмен принят, доплата'});}
  swapClear(o);
  const adj=(t,d)=>{t.mpPrem=Math.max(-baseInv(t),(t.mpPrem||0)+d);};
  for(const i of o.get){const t=S.tiles[i];t.owner=null;t.rival=o.from;delete t.mpOffer;}            // мои клетки — автору
  for(const i of o.give){const t=S.tiles[i];t.owner='you';delete t.rival;delete t.mpOffer;}         // его клетки — мне
  if(o.pay){adj(S.tiles[o.get[0]],o.pay);adj(S.tiles[o.give[0]],-o.pay);}   // вложено ± доплата: платившему — плюс, получившему — минус
  emitFn({kind:'swapped',text:`обмен: ${o.get.map(i=>'«'+titleOf(S.tiles[i])+'»').join(' и ')} на ${o.give.map(i=>'«'+titleOf(S.tiles[i])+'»').join(' и ')}`,amount:null,tile:o.give[0],to:o.from,from:o.from,give:o.give,get:o.get,pay:o.pay,swap:o});
  return true;}
function swapDeclineLocal(o,creditFn,emitFn,voided){
  swapClear(o);if(o.pay>0)creditFn(o.from,o.pay,{escrow:-o.pay,note:voided?'обмен снят':'отказ в обмене'});
  emitFn({kind:voided?'swapvoid':'swapdecline',text:voided?'обмен снят: клетки сменили хозяина или ушли на торги':'отказал в обмене',amount:null,tile:o.get[0],to:o.from,from:o.from,give:o.give,get:o.get,pay:o.pay,swap:o});}
const myCredit=(to,cash,x)=>credit(to,cash,x&&x.note||'',x&&x.escrow||0,x&&x.extra);
// Входящие в моей системе координат: give — отдаю я (его get), get — получаю (его give), pay>0 — плачу я.
function swapIncoming(){const seen=new Map();for(const t of S.tiles){const o=t.mpSwap;if(o&&o.to===PID&&!seen.has(o.id))seen.set(o.id,o);}
  return [...seen.values()].map(o=>({id:o.id,from:o.from,give:o.get.slice(),get:o.give.slice(),pay:-o.pay,n:o.n}));}
function swapOutgoing(){const seen=new Map();for(const t of S.tiles){const o=t.mpSwap;if(o&&o.from===PID&&!seen.has(o.id))seen.set(o.id,o);}
  return [...seen.values()].map(o=>({id:o.id,to:o.to,give:o.give.slice(),get:o.get.slice(),pay:o.pay,n:o.n}));}
const swapById=id=>{for(const t of S.tiles)if(t.mpSwap&&t.mpSwap.id===id)return t.mpSwap;return null;};
function swapPropose(d){
  swapErr='';const pv=swapPreview(d);if(!pv.ok){swapErr=pv.reason;return false;}
  const o=swapPlaceLocal(d,emit);track('mp_swap_offer',{to:o.to,give:o.give,get:o.get,pay:o.pay,counter:!!d.counter});
  log(`🔁 ${d.counter?'Встречное':'Предложил обмен'} ${nameOf(o.to)}: отдаю ${o.give.map(i=>titleOf(S.tiles[i])).join(', ')}, получаю ${o.get.map(i=>titleOf(S.tiles[i])).join(', ')}${o.pay?`, доплата ${o.pay>0?'моя':'его'} ${money(Math.abs(o.pay))}`:''}.`);
  if(!MPSwap._ui)plate(`🔁 Обмен · ${nameOf(o.to)}`,o.pay>0?-o.pay:0,'ответ — в начале его хода');save();render();push();return true;}
function swapAccept(id){const o=swapById(id);if(!o||o.to!==PID||!myTurn()||ending)return false;const ok=swapAcceptLocal(o,myCredit,emit);
  if(ok){track('mp_swap',{with:o.from,give:o.give,get:o.get,pay:o.pay});log(`🔁 Обмен с ${nameOf(o.from)} состоялся.`);if(!MPSwap._ui)plate(`🔁 Обмен · ${nameOf(o.from)}`,o.pay,'клетки поменялись');}
  else toast(swapStillValid(o)?'На доплату не хватает':'Обмен снят: клетки уже не те');save();render();push();return ok;}
function swapDecline(id,silent){const o=swapById(id);if(!o||o.to!==PID)return false;swapDeclineLocal(o,myCredit,emit,false);if(!silent){log(`✋ Отказал ${nameOf(o.from)} в обмене.`);save();render();}push();return true;}
function swapCounter(id,d){const o=swapById(id);if(!o||o.to!==PID||!myTurn()||ending)return false;
  if(proposedThisTurn()){swapErr='одно предложение за ход';return false;}
  // Старое снимаем (резерв автору — обратно) и сразу проверяем встречное; не прошло — исходное возвращаем как было.
  const snap=JSON.stringify(S.tiles.map(t=>t.mpSwap||null));swapClear(o);
  const d2=Object.assign({},d,{to:o.from,counter:true}),pv=swapPreview(d2);
  if(!pv.ok){swapErr=pv.reason;JSON.parse(snap).forEach((m,i)=>{if(m)S.tiles[i].mpSwap=m;});return false;}
  if(o.pay>0)credit(o.from,o.pay,'встречное: резерв вернулся',-o.pay);
  return swapPropose(d2);}
async function answerSwapWindow(id){
  const o=swapById(id);if(!o||o.to!==PID||!myTurn()||ending)return;const inc=swapIncoming().find(x=>x.id===id),pv=swapPreview({to:o.from,give:inc.give,get:inc.get,pay:inc.pay,counter:id,accept:true});
  const ls=a=>a.map(i=>`«${esc(titleOf(S.tiles[i]))}» <small>клетка ${i}</small>`).join(', ');
  const v=await modal(`<h2>🔁 ${esc(nameOf(o.from))} предлагает обмен</h2>
    <div class="row"><span class="n">Отдаёшь<small>${ls(inc.give)}</small></span><span class="v">${money(pv.invGive)}</span></div>
    <div class="row"><span class="n">Получаешь<small>${ls(inc.get)}</small></span><span class="v">${money(pv.invGet)}</span></div>
    <div class="row"><span class="n">Доплата</span><span class="v">${inc.pay>0?`ты платишь ${money(inc.pay)}`:inc.pay<0?`тебе платят ${money(-inc.pay)}`:'без доплаты'}</span></div>
    <div class="row"><span class="n">Твоя рента</span><span class="v">${money(pv.mine.before)} → ${money(pv.mine.after)}</span></div>
    <div class="row"><span class="n">Рента ${esc(nameOf(o.from))}</span><span class="v">${money(pv.theirs.before)} → ${money(pv.theirs.after)}</span></div>
    <p class="t">Не ответишь до конца хода — отказ.</p>`,[{t:'Принять',v:1,cls:'ok',dis:inc.pay>0&&S.cash<inc.pay},{t:'Отказать',v:0,cls:'sec'}]);
  if(!swapById(id)||!myTurn())return;if(v===1)swapAccept(id);else if(v===0)swapDecline(id,false);updateUi();}
// Совместимость со старым входом «Интерфейса» (1↔1): placeSwap(чужая клетка, моя клетка, доплата).
function placeSwap(t,give,pay){return swapPropose({to:t.rival,give:[give],get:[t.i],pay:+pay||0});}
function swapBlock(t){const o=t.mpSwap;if(!o)return '';return o.from===PID?`<div class="mp-choice mp-swap"><b>Твоё предложение обмена ждёт ответа ${esc(nameOf(o.to))}</b></div>`:'';}
// preview/propose: d.counter = id разбираемого входящего — его метки не считаются «другим обменом»; d.accept=true — смотрим принятие (без лимита хода).
window.MPSwap={max:SWAP_MAX,pays:SWAP_PAYS,get lastError(){return swapErr;},
  free:(i,ignoreId)=>!swapFreeReason(i,ignoreId),freeReason:swapFreeReason,loners:lonersOf,chains:chainsOf,rentTotals,
  preview:swapPreview,suggest:swapSuggest,propose:swapPropose,incoming:swapIncoming,outgoing:swapOutgoing,
  accept:swapAccept,decline:id=>swapDecline(id,false),counter:swapCounter,
  answer:(id,a)=>a==='accept'?swapAccept(id):swapDecline(id,false),answerWindow:answerSwapWindow,
  _local:{place:swapPlaceLocal,accept:swapAcceptLocal,decline:swapDeclineLocal,byId:swapById}};
// Выкуп без согласия: ×10 вложенного, но не меньше ×3 рыночной цены для покупателя — в конце игры точка дорожает.
function forcePrice(t){return Math.round(Math.max(invested(t)*FORCE_MULT,marketValue(t,PID)*FORCE_MARKET)/10)*10;}
function placeOffer(t,m){return placeOfferAmount(t,Math.round(marketValue(t,PID)*m),m);}
// Своя сумма — не меньше вложенного хозяином (×1); множитель для окна хозяина — amount / вложенное.
function placeOfferAmount(t,amount,m){
  if(!isRival(t)||t.mpOffer||t.mpSwap||!myTurn()||ending||lotOn(t.i)||proposedThisTurn())return false;
  const owner=t.rival,who=nameOf(owner),title=titleOf(t),inv=marketValue(t,PID);amount=Math.round(amount);if(amount<Math.round(inv)||S.cash<amount)return false;   // не меньше рыночной цены
  m=m||Math.round(amount/Math.max(1,inv)*100)/100;
  S.cash-=amount;S.mpEscrow=(S.mpEscrow||0)+amount;S.mpProposeN=view.turn.n;
  t.mpOffer={from:PID,amount,mult:m,n:view.turn.n};
  track('mp_offer',{tile:t.i,to:owner,amount,mult:m});
  log(`💼 Предложил ${who} ${money(amount)} за «${title}» (×${m}).`);
  plate(`💼 Предложение · ${who}`,-amount,'деньги в резерве до ответа');
  emit({kind:'offer',text:`предлагает ${money(amount)} за «${title}»`,amount:null,tile:t.i,to:owner});
  save();render();push();return true;
}

// Принудительный выкуп ×10 (решение продюсера 01.10): хозяин получает деньги сразу, клетка переходит с товаром.
// Не чаще раза в два своих круга (второй плейтест): S.mpForceLap — круг последнего выкупа.
const forceWait=()=>Math.max(0,(S.mpForceLap==null?-FORCE_LAPS:S.mpForceLap)+FORCE_LAPS-(S.laps||0));
const forceReady=()=>forceWait()<=0;
function forceBuy(t){
  if(!isRival(t)||!myTurn()||S.pos!==t.i||ending)return;
  const owner=t.rival,who=nameOf(owner),title=titleOf(t),amount=forcePrice(t);
  if(lotOn(t.i)){toast('Клетка на торгах — делай ставку');return;}
  if(!forceReady()){toast(`Выкуп — не чаще раза в ${FORCE_LAPS} круга`);return;}
  if(S.cash<amount){toast(`Выкуп стоит ${money(amount)} — не хватает`);return;}
  S.mpForceLap=S.laps||0;
  if(t.mpOffer)declineOffer(t,true);
  S.cash-=amount;credit(owner,amount,`${esc(S.player)} выкупил «${esc(title)}» у ${esc(who)} за ${money(amount)}`,0,{force:true,tile:t.i});   // force+tile — ядро пропустит смену хозяина
  t.mpPrem=amount-baseInv(t);t.owner='you';delete t.rival;delete t.mpOffer;
  track('mp_force_buy',{tile:t.i,from:owner,amount});
  log(`💰 Выкупил «${title}» у ${who} за ${money(amount)}.`);
  plate(`💰 Выкуп · ${who}`,-amount,`«${title}» теперь твоя`);
  emit({kind:'sale',text:`выкупил «${title}» у ${who} за ×${FORCE_MULT}`,amount:-amount,tile:t.i,to:owner});
  save();render();push();
}

// ---- предложение о покупке: хозяин ----
// Окно ответа открывается само в начале хода, а потом — из плашки «💼 Предложение» под полосой игроков,
// пока хозяин не ответит (плейтест 01.10: окно «висело 3 секунды» — его перекрывало окно клетки,
// а тап мимо окна считался отказом). Отказ — только кнопкой «Отказать».
async function answerOne(t){
  if(!myTurn()||ending||!t||!t.mpOffer||!t.owner)return;
  const o=t.mpOffer,who=nameOf(o.from),title=titleOf(t),inv=invested(t),mult=String(o.mult).replace('.',',');
  const v=await modal(`<h2>💼 ${esc(who)} хочет купить «${esc(title)}»</h2>
    <div class="mp-offer-big"><strong>${money(o.amount)}</strong><span><b>×${mult}</b> к рыночной цене</span><small>ты вложил ${money(inv)} · рыночная для покупателя ${money(marketValue(t,o.from))}</small></div>
    <div class="row"><span class="n">Рента с соперников за остановку</span><span class="v">${money(rentOfMine(t))}</span></div>
    <p class="t mp-buyout-note">Согласишься — деньги твои, ${t.type==='biz'?'бизнес уходит':'точка уходит вместе с товаром'}. Откажешь — ${esc(who)} получит деньги обратно. Не ответишь до конца хода — отказ.</p>`,
    [{t:`Продать · ${money(o.amount)}`,v:1,cls:'ok'},{t:'Отказать',v:0,cls:'sec'}]);
  if(!t.mpOffer||t.mpOffer!==o||!myTurn())return;
  if(v===1)acceptOffer(t);else if(v===0)declineOffer(t,false);
  updateUi();
}
async function answerOffers(){
  if(!myTurn()||ending||!S||!S.tiles)return;
  for(const t of S.tiles.filter(x=>x.rival&&x.mpSale&&x.mpSale.to===PID)){if(!myTurn()||ending)return;while((!$('modal').hidden||moving)&&myTurn()&&!ending)await wait(300);await answerSale(t);}
  for(const t of S.tiles.filter(x=>x.owner&&x.mpOffer)){
    if(!myTurn()||ending)return;
    while((!$('modal').hidden||moving)&&myTurn()&&!ending)await wait(300);
    await answerOne(t);
  }
  for(const o of swapIncoming()){if(!myTurn()||ending)return;while((!$('modal').hidden||moving)&&myTurn()&&!ending)await wait(300);await MPSwap.answerWindow(o.id);}
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
  for(const o of swapOutgoing())if(o.n<view.turn.n){if(o.pay>0)back+=o.pay;swapClear(swapById(o.id));}   // получатель так и не ответил
  for(const t of S.tiles)if(t.owner&&t.mpSale&&t.mpSale.n<view.turn.n)delete t.mpSale;   // покупатель так и не ответил — предложение продажи снято
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
const roundEl=el('span','mp-round',bar);roundEl.title='Сколько осталось до конца партии. Время вышло — доигрываем круг стола, потом итог';
roundEl.innerHTML='<i>⏱</i><b class="mp-rn"></b>';
const chipsEl=el('span','mp-chips',bar);
// Условие победы — строкой под фишками: ты и лидер; тап — правило и прогресс всех (плейтест 01.10).
const winEl=el('button','mp-win',bar);winEl.type='button';
winEl.onclick=()=>{if(!view||!view.win||!$('modal').hidden)return;
  const rows=view.players.map(p=>`<div class="row"><span class="n"><i class="mp-dot" style="background:${p.color}"></i>${esc(p.pid===PID?'Ты':p.name)}</span><span class="v">${esc(p.win?p.win.text:'')}</span></div>`).join('');
  modal(`<h2>🏆 ${esc(view.win.name)}</h2><p class="t">${esc(view.win.text)}</p>${rows}`,[{t:'Понятно',v:0,cls:'ok'}]);};
const pauseBtn=el('button','mp-pausebtn',bar);pauseBtn.type='button';pauseBtn.title='Пауза для всех';pauseBtn.setAttribute('aria-label','Пауза');pauseBtn.textContent='⏸';
let myPause={match:null,n:0,at:0,seen:null};
function pauseSync(){
  if(!view||view.phase!=='play')return;
  if(myPause.match!==view.match)myPause={match:view.match,n:0,at:0,seen:null};
  const pz=view.paused;if(pz&&pz.by===PID&&pz.at!==myPause.seen){myPause.seen=pz.at;myPause.n++;myPause.at=pz.at;}
  const w=pauseWait(myPause,hostNow()),left=Math.max(0,PAUSE_FREE-myPause.n);
  const html=`⏸<sup>${left?left:w>0?mmss(w):1}</sup>`;if(pauseBtn._h!==html){pauseBtn._h=html;pauseBtn.innerHTML=html;}
  pauseBtn.classList.toggle('spent',!left&&w>0);
}
pauseBtn.onclick=()=>{if(!view||view.phase!=='play'||view.paused)return;
  const w=pauseWait(myPause,hostNow());if(w>0){toast(`⏸ Паузы кончились — следующая через ${mmss(w)}`,2400);return;}
  net.send({t:'tpause',on:true});};
// ☰ Меню партии (плейтест 01.10): продолжить, правила, выйти из-за стола, сыграть одному.
const menuBtn=el('button','mp-pausebtn mp-menubtn',bar);menuBtn.type='button';menuBtn.title='Меню партии';menuBtn.setAttribute('aria-label','Меню партии');menuBtn.textContent='☰';
menuBtn.onclick=async()=>{
  if(!view||!$('modal').hidden||moving)return;const host=!!(net&&net.host);
  await verCheck();
  const v=await modal(`<h2>☰ Партия · стол ${esc(ROOM)}</h2><p class="mp-ver ${verStale?'stale':''}">${verLine()}</p>
    ${host?'<p class="t mp-warn">Ты хозяин стола: если выйдешь, партия остановится у всех.</p>':'<p class="t">Выйдешь — твоё место останется, вернуться можно по коду стола.</p>'}`,
    [{t:'Продолжить',v:0,cls:'ok'},{t:'🏠 Мои владения',v:6,cls:'sec'},{t:`🃏 Карты в руке · ${(S&&S.mpHand||[]).length}`,v:7,cls:'sec'},window.MPTaxi&&MPTaxi.can()?{t:'🚕 На склад · 💎 1',v:8,cls:'sec'}:null,{t:`🗺 Карта: ${mapName(tableMap())}${host?'':' · меняет хозяин'}`,v:5,cls:'sec',dis:!host},window.MPRules?{t:'Правила',v:4,cls:'sec'}:null,view.win?{t:'Как победить',v:3,cls:'sec'}:null,{t:'Выйти из-за стола',v:1,cls:'sec'},{t:'Играть одному',v:2,cls:'sec'}].filter(Boolean));
  if(v===3)winEl.click();
  if(v===4&&window.MPRules)MPRules.open();
  if(v===5)mapPicker();
  if(v===7)handWindow();
  if(v===8)mpTaxi();
  if(v===6)setTimeout(()=>holdingsWindow(),200);
  if(v===1||v===2){try{if(!net.host)net.send({t:'bye'});}catch(e){}
    location.href=v===1?`mp.html?map=sf&mp${Q.has('mute')?'&mute':''}`:`index.html?map=sf${Q.has('mute')?'&mute':''}`;}
};
const pauseEl=el('div','mp-pause');pauseEl.hidden=true;
pauseEl.innerHTML='<div class="mp-pause-card"><b>Пауза</b><small></small><button type="button" class="mp-big">Продолжить</button></div>';
pauseEl.querySelector('button').onclick=()=>net.send({t:'tpause',on:false});
let finalShown=null;
const tag=el('div','mp-tag');tag.id='mpTag';tag.hidden=true;
const endBtn=el('button','mp-end');endBtn.id='mpEnd';endBtn.hidden=true;endBtn.type='button';
endBtn.innerHTML='<b>Передать ход</b><small></small>';
endBtn.onclick=()=>{if(myTurn()&&!moving)finishTurn();};   // кнопка видна только после броска; сорвавшийся бросок не держит ход (замечание «Геймплея» 02.10)
const clock=el('div','mp-clock');clock.id='mpClock';clock.hidden=true;
// Предложение о покупке твоей клетки — висит, пока не ответишь (в свой ход тап открывает ответ).
const offerBadge=el('button','mp-offer-badge');offerBadge.id='mpOffer';offerBadge.type='button';offerBadge.hidden=true;
offerBadge.onclick=()=>{
  if(offerBadge._swap!=null){if(moving)return;if(!$('modal').hidden)closeModal();const id=offerBadge._swap;setTimeout(()=>swapAnswerMode(id),$('modal').hidden?0:180);return;}
  if(offerBadge._sale!=null){if(!myTurn()||ending){toast('Ответишь в свой ход — предложение ждёт',2400);return;}if(moving)return;if(!$('modal').hidden)closeModal();
    const si=offerBadge._sale;setTimeout(()=>MPSell.answerWindow(si),$('modal').hidden?0:180);return;}
  const t=S&&S.tiles&&S.tiles.find(x=>x.owner&&x.mpOffer);
  if(!t){const sw=swapIncoming()[0];if(!sw)return;if(!myTurn()||ending){toast('Ответишь на обмен в свой ход',2400);return;}if(moving)return;if(!$('modal').hidden)closeModal();setTimeout(()=>MPSwap.answerWindow(sw.id),$('modal').hidden?0:180);return;}
  if(!myTurn()||ending){toast(`Ответишь в свой ход — предложение ${nameOf(t.mpOffer.from)} ждёт`,2400);return;}
  if(moving){toast('Дождись, пока Джонни дойдёт');return;}
  if(!$('modal').hidden)closeModal();
  setTimeout(()=>answerOne(t),$('modal').hidden?0:180);
};
// Торги за столом — плашкой под полосой у всех: ставить можно в любой момент (решение продюсера 01.10).
const lotBadge=el('button','mp-offer-badge mp-lot-badge');lotBadge.id='mpLots';lotBadge.type='button';lotBadge.hidden=true;
lotBadge.onclick=()=>{
  const lots=(view&&view.lots)||[];if(!lots.length||!$('modal').hidden||moving)return;
  if(lots.length===1){bidWindow(lots[0].id);return;}
  const rows=lots.map(l=>{const t=S.tiles[l.tile];return `<div class="row mp-lot-row"><span class="n"><b>${esc(t?titleOf(t):'клетка')}</b><small>${esc(nameOf(l.seller))}${l.kind==='bankrupt'?' · за долги':''} · ${l.best?'ставка '+money(l.best)+(l.bestBy===PID?' (твоя)':''):'от '+money(l.min)}</small></span><button type="button" class="sm sec mp-lot-open" data-id="${esc(l.id)}">${l.seller===PID?'смотреть':'ставка'}</button></div>`;}).join('');
  const pending=modal(`<h2>🔨 Торги</h2><p class="t">Ставки — до следующего хода продавца. Кто дал больше, тот и хозяин.</p>${rows}`,[{t:'Закрыть',v:0,cls:'sec'}]);
  $('card').querySelectorAll('.mp-lot-open').forEach(b=>b.onclick=()=>closeModal('lot:'+b.dataset.id));
  pending.then(v=>{if(typeof v==='string'&&v.startsWith('lot:'))setTimeout(()=>bidWindow(v.slice(4)),180);});
};
// Новый лот — окно ставок само открывается у всех, кроме продавца (плейтест 02.10: лот Сани никто не заметил,
// точка ушла банку). Занят окном или фишка идёт — покажем, как освободится; закрыл — дальше только плашка.
let lotQueue=[];const lotShown=new Set();
function lotAlert(tile){lotQueue.push(tile);lotPump();}
function lotPump(){
  if(!lotQueue.length||!view||view.phase!=='play')return;
  if(!$('modal').hidden||moving||document.querySelector('.minigame-layer')||document.getElementById('onboard')){setTimeout(lotPump,600);return;}
  const tile=lotQueue.shift(),lot=(view.lots||[]).find(l=>l.tile===tile);
  if(!lot||lot.seller===PID||lotShown.has(lot.id)){lotPump();return;}
  lotShown.add(lot.id);bidWindow(lot.id);
}
// Микрозайм в окне долга — чем грозит (плейтест 4, 02.10: «где-то пояснение должно быть»): сколько, сколько платить
// за каждый проход банка, как вернуть. Окно и логика — «Геймплея» (debtWindow), здесь только памятка под строкой.
new MutationObserver(()=>{
  const c=$('card');if(!c||$('modal').hidden)return;const b=c.querySelector('.mp-debt-micro');if(!b||c.querySelector('.mp-micro-memo'))return;
  const amt=+String(b.textContent).replace(/[^\d]/g,'')||0,fee=Math.round(amt*MICRO_RATE),row=b.closest('.row');if(!row||!amt)return;
  const m=document.createElement('div');m.className='mp-micro-memo';
  m.innerHTML=`<b>Микрозайм ${money(amt)} — что дальше</b>
    <div><span>Сразу</span><span>+${money(amt)} в кассу</span></div>
    <div><span>Каждый проход банка</span><span>−${money(fee)} (${Math.round(MICRO_RATE*100)}%), пока не вернёшь</span></div>
    <div><span>Как вернуть</span><span>встань на банк → «Погасить» ${money(amt)}</span></div>
    <div><span>Второй займ</span><span>не дадут, пока этот не вернёшь</span></div>`;
  row.after(m);
}).observe($('card'),{childList:true,subtree:true});
// «Перебить» вместо «Ставка», когда ставка уже есть: так понятно, что торги идут и кто-то лидирует.
new MutationObserver(()=>{
  const c=$('card');if(!c||$('modal').hidden)return;
  c.querySelectorAll('.mp-lot').forEach(box=>{const head=box.querySelector('p');if(!head||!/Лучшая ставка/.test(head.textContent))return;
    box.querySelectorAll('.mp-bid').forEach(b=>{if(b.dataset.relabel)return;b.dataset.relabel='1';const sk=b.querySelector('.enamel-label')||b;sk.innerHTML=sk.innerHTML.replace('Ставка','Перебить');});});
}).observe($('card'),{childList:true,subtree:true});
function lotBadgeSync(){
  const lots=view&&view.phase==='play'&&view.lots||[];lotBadge.hidden=!lots.length;if(!lots.length)return;
  const l=lots[0],t=S&&S.tiles&&S.tiles[l.tile],mine=l.seller===PID,lead=l.bestBy===PID;
  const what=`«${esc(t?titleOf(t):'клетка')}»`+(lots.length>1?` <em>+${lots.length-1}</em>`:'');
  const state=l.best?`${money(l.best)} · ${lead?'лидируешь ты':'лидирует '+esc(nameOf(l.bestBy))}`:`от ${money(l.min)} · ставок нет`;
  const html=`<i>🔨</i><span><b>Торги</b> ${what} · ${state}</span><u>${mine?'смотреть':lead?'смотреть':l.best?'перебить':'ставить'}</u>`;
  if(lotBadge._h!==html){lotBadge._h=html;lotBadge.innerHTML=html;lotBadge.style.setProperty('--c',colorOf(l.seller));}
}
// ---- рука карт «Шанса» на экране (плейтест 5): 1–2 карты значками у кубика; тап — карта крупно; «Сыграть» —
// фишки подходящих соперников в полосе подсвечиваются (лидер — для карт «против лидера»), тап по фишке — розыгрыш.
// ---- карты «Шанса» в партии — матовой картой соло (chance-depth.css): картон, штамп, иллюстрация, наклон за пальцем ----
// Андрей 03.10: «карточки случая крупнее, красивее, как разрабатывали ранее». Тон рамки: синяя — тебе в плюс, серая — в минус,
// фиолетовая — пакость против соперника, золотая — против лидера.
// «i:» — значки карт 512 px (web/assets/icons/card, design/иконки-карт-шанса), а не мелкие значки интерфейса.
const MPC_ART={wholesale:'v:cargo',promo:'i:percent',gathering:'i:coins',raid:'s:police',mtv:'s:tv',complaint:'s:inspector',stash:'v:cash',
  parking:'i:money',robin:'i:cap',roof:'i:roof',roadwork:'s:lot',snitch:'s:police',queue:'i:clock',blackout:'e:❄️',dumping:'i:percent',
  spoiled:'i:box',levy:'v:cash',audit:'s:inspector',strike:'e:✊'};
const MPC_TITLE={wholesale:'Оптовый завоз',promo:'Акция',gathering:'Сходка',raid:'Облава',mtv:'Сюжет на MTV',complaint:'Жалоба соседей',
  stash:'Заначка общака',parking:'Штраф за парковку',robin:'Робин Гуд',roof:'Крыша',roadwork:'Ремонт дороги',snitch:'Донос',queue:'Очередь в ЖЭК',
  blackout:'Отключили свет',dumping:'Демпинг',spoiled:'Просрочка',levy:'Налоговая',audit:'Проверка лидера',strike:'Забастовка'};
const MPC_TONE={raid:'grey',parking:'grey'};
function mpcArt(id){const a=MPC_ART[id]||'s:chance',[k,v]=[a.slice(0,1),a.slice(2)];
  if(k==='v')return {cls:'cu-vignette art-'+v,html:''};
  if(k==='e')return {cls:'mp-cu-emoji',html:`<b>${v}</b>`};
  return {cls:'',html:`<img src="${k==='i'?'assets/icons/card/'+v+'.webp':'board/assets/symbols/'+v+'.svg'}" alt="">`};}
// o: {id, title?, cap, stamp, tone?, cls?} → html карты; tone — grey|blue|purple|gold.
function mpCardHTML(o){
  const h=HAND[o.id],tone=o.tone||(h?(h.leader?'gold':'purple'):MPC_TONE[o.id]||'blue'),art=mpcArt(o.id),cap=String(o.cap||'');
  const title=o.title||MPC_TITLE[o.id]||(h?h.name.replace(/^\S+\s/,''):'Шанс');
  const back=`<div class="cu-face cu-back mp-cu-back"><img src="board/assets/symbols/chance.svg" alt=""><b>Шанс</b><span class="cu-diffuse" aria-hidden="true"></span></div>`;
  return `<div class="cu-card cu-matte mp-cu r-${tone} ${o.cls||''}" data-id="${esc(o.id)}"><div class="cu-tilt"><div class="cu-spin">${[-.5,0,.5].map(z=>`<i class="cu-core" style="--z:${z}px" aria-hidden="true"></i>`).join('')}<i class="cu-edge edge-l" aria-hidden="true"></i><i class="cu-edge edge-r" aria-hidden="true"></i>`+
    `<div class="cu-face cu-front"><span class="cu-stamp">${esc(o.stamp||'Шанс')}</span><b class="cu-title">${esc(title)}</b><span class="cu-art ${art.cls}">${art.html}</span><span class="cu-cap${tone==='grey'?' bad':''}${cap.length>80?' long':''}"><span>${esc(cap)}</span></span><span class="cu-diffuse" aria-hidden="true"></span></div>${back}</div></div></div>`;
}
// Подпись карты из текста события: «🚚 Оптовый завоз: склад отдал…» → «склад отдал…».
const mpcCap=(id,text)=>{const t=String(text||'').replace(/^\S+\s+/,''),T=MPC_TITLE[id];return T&&t.startsWith(T)?t.slice(T.length).replace(/^[\s:—.-]+/,''):t;};
// Карта крупно в окне: выезжает рубашкой и переворачивается лицом (на «двойках» не надо — это камера карты, плавно).
function mpCardShow(html,head,btns){
  return modal(`<div class="mp-cu-stage">${html}</div>${head||''}`,btns||[{t:'Ок',v:1}],null,()=>setTimeout(()=>{
    const c=$('card')&&$('card').querySelector('.mp-cu-stage .cu-spin');if(!c)return;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    c.animate([{transform:'rotateY(180deg) scale(.82)'},{transform:'rotateY(-12deg) scale(1.04)',offset:.7},{transform:'rotateY(4deg) scale(.99)',offset:.86},{transform:'rotateY(0) scale(1)'}],{duration:620,easing:'cubic-bezier(.2,.8,.2,1)'});},0));
}
const handEl=el('div','mp-hand');handEl.id='mpHand';handEl.hidden=true;
let handPick=null;
function handSync(){
  const list=window.MPHand?MPHand.list():[];const on=!!(view&&view.phase==='play'&&list.length);handEl.hidden=!on;if(!on)return;
  const used=S&&view.turn&&S.mpHandN===view.turn.n;
  const html=list.map((c,i)=>`<button type="button" class="mp-hand-card${c.leader?' lead':''}" data-i="${i}" title="${esc(c.name)}">${mpCardHTML({id:c.id,cap:'',stamp:'',cls:'cu-mini mp-cu-hand'})}</button>`).join('')+(used?'<i class="mp-hand-used">сыграна в этот ход</i>':'');
  if(handEl._h!==html){handEl._h=html;handEl.innerHTML=html;handEl.querySelectorAll('.mp-hand-card').forEach(b=>b.onclick=()=>handCard(+b.dataset.i));}
}
async function handCard(i){
  if(!$('modal').hidden||moving)return;const c=MPHand.list()[i];if(!c)return;
  const can=myTurn()&&!ending&&!(S.mpHandN===view.turn.n)&&c.targets.length;
  const why=!myTurn()?'Сыграть можно в свой ход.':S.mpHandN===view.turn.n?'В этот ход карта уже сыграна.':!c.targets.length?(c.leader?'Лидер сейчас ты — карту против лидера не сыграть.':'Сейчас её не на кого сыграть.'):'';
  const v=await mpCardShow(mpCardHTML({id:c.id,cap:c.text+(c.leader?' — бьёт лидера по капиталу':''),stamp:c.leader?'Против лидера':'Пакость'}),`${why?`<p class="t mp-hand-why">${why}</p>`:''}`,
    can?[{t:'Сыграть — выбрать соперника',v:1,cls:'ok'},{t:'Оставить',v:0,cls:'sec'}]:[{t:'Закрыть',v:0,cls:'sec'}]);
  if(v!==1)return;
  if(c.targets.length===1&&c.leader){MPHand.play(i,c.targets[0]);return;}
  chipPick(c.targets,`Кого бьём «${c.name.replace(/^\S+\s/,'')}»?`).then(pid=>{if(pid)MPHand.play(i,pid);});
}
// Выбор соперника тапом по его фишке в полосе (карты из руки, продажа игроку): подходящие фишки мигают.
function chipPick(targets,title){
  handPickEnd();
  return new Promise(res=>{
    handPick={targets:new Set(targets),res};document.body.classList.add('mp-hand-picking');
    const banner=el('div','mp-hand-pick');banner.innerHTML=`<b>${esc(title)}</b><span>тапни по фишке соперника справа</span><button type="button">Отмена</button>`;
    banner.querySelector('button').onclick=()=>handPickEnd();handPick.banner=banner;updateUi();
  });
}
function handPickEnd(pid){if(!handPick)return;const P=handPick;P.banner&&P.banner.remove();handPick=null;document.body.classList.remove('mp-hand-picking');P.res&&P.res(pid||null);updateUi();}
chipsEl.addEventListener('click',e=>{if(!handPick)return;const ch=e.target.closest('.mp-chip');if(!ch)return;e.stopImmediatePropagation();e.preventDefault();
  const pid=ch.dataset.pid;if(!handPick.targets.has(pid)){toast('Этого игрока выбрать нельзя');return;}handPickEnd(pid);},true);
// Такси до склада — кнопкой у кубика в свой ход до броска (было только в ☰).
const taxiBtn=el('button','mp-taxi');taxiBtn.type='button';taxiBtn.hidden=true;taxiBtn.innerHTML='🚕<small>на склад · 💎1</small>';
taxiBtn.onclick=()=>{if(window.MPTaxi)MPTaxi.go();};
function offerBadgeSync(){
  // входящая продажа (m5-sellto) — первой: «🏷 Вася продаёт «X» за $N», висит до ответа
  const sales=view&&view.phase==='play'&&window.MPSell?MPSell.pending():[];
  if(sales.length){const o=sales[0];offerBadge.hidden=false;offerBadge._sale=o.i;
    const html=`<i>🏷</i><span><b>${esc(nameOf(o.from))}</b> продаёт «${esc(o.title)}» за <b>${money(o.price)}</b>${sales.length>1?` <em>+${sales.length-1}</em>`:''}</span><u>${myTurn()&&!ending?(S.cash>=o.price?'купить?':'не хватает'):'ответ в свой ход'}</u>`;
    if(offerBadge._h!==html){offerBadge._h=html;offerBadge.innerHTML=html;offerBadge.style.setProperty('--c',colorOf(o.from));}return;}
  offerBadge._sale=null;offerBadge._swap=null;
  // входящий обмен на карте (m5-swapmap) — тап открывает режим обмена с ответом
  const sws=view&&view.phase==='play'&&SW()?(SW().incoming()||[]):[];
  if(sws.length&&!swapUI){const o=sws[0];offerBadge.hidden=false;offerBadge._swap=o.id;
    const html=`<i>🔁</i><span><b>${esc(nameOf(o.from))}</b> меняет ${esc(o.get.map(cellNo).join('+'))} на твою ${esc(o.give.map(cellNo).join('+'))}${o.pay?` · ${o.pay<0?'доплатит':'просит'} ${money(Math.abs(o.pay))}`:''}${sws.length>1?` <em>+${sws.length-1}</em>`:''}</span><u>${myTurn()&&!ending?'посмотреть':'ответ в свой ход'}</u>`;
    if(offerBadge._h!==html){offerBadge._h=html;offerBadge.innerHTML=html;offerBadge.style.setProperty('--c',colorOf(o.from));}return;}
  const list=view&&view.phase==='play'&&S&&S.tiles?S.tiles.filter(x=>x.owner&&(x.mpOffer||(x.mpSwap&&x.mpSwap.to===PID&&!SW()))):[];   // обмены с MPSwap — плашкой выше
  offerBadge.hidden=!list.length;if(!list.length)return;
  const sw=!list[0].mpOffer,o=list[0].mpOffer||list[0].mpSwap,more=list.length>1?` <em>+${list.length-1}</em>`:'';
  const html=sw?`<i>🔁</i><span><b>${esc(nameOf(o.from))}</b> предлагает обмен${o.pay?` · доплата ${money(Math.abs(o.pay))}`:''}${more}</span><u>${myTurn()&&!ending?'ответить':'ответ в свой ход'}</u>`
    :`<i>💼</i><span><b>${esc(nameOf(o.from))}</b> предлагает <b>${money(o.amount)}</b> · ×${String(o.mult).replace('.',',')}${more}</span><u>${myTurn()&&!ending?'ответить':'ответ в свой ход'}</u>`;
  if(offerBadge._h!==html){offerBadge._h=html;offerBadge.innerHTML=html;offerBadge.style.setProperty('--c',colorOf(o.from));}
}
const statusEl=el('div','mp-status');statusEl.id='mpStatus';statusEl.hidden=true;
function status(text){statusEl.textContent=text||'';statusEl.hidden=!text;}

function mpRender(){
  // Чужая клетка под ногами: строка над доком ведёт в окно хозяина.
  const t=S&&S.tiles&&S.tiles[S.pos],tb=$('tilebar');
  if(tb&&isRival(t)&&!moving){
    tb.hidden=false;tb.disabled=false;tb.classList.remove('poor','off');
    // «хозяин X» — плашкой в цвет хозяина (плейтест 01.10: серую подпись не замечали).
    $('tbText').innerHTML=`${t.type==='biz'?bizIcon(t):good(t.good).icon} ${esc(t.type==='biz'?bizName(t):pointName(t))} <span class="mp-tb-owner" style="--c:${colorOf(t.rival)}">${esc(nameOf(t.rival))}</span>`;
    const b=tb.querySelector('b');if(b)b.textContent='открыть';
  }
  // Копилка: что она копит (плейтест 01.10: «копилка +0» никто не понял).
  if(tb&&t&&t.type==='pot'&&!moving&&!tb.hidden)$('tbText').textContent=`🐷 Копилка ${money((view&&view.pot)||0)} — штрафы всех; встал — забрал`;
  hubLabel();
  try{debtSync();playersDock();handSync();}catch(e){}   // док «Игроки» соло перерисовывает при каждой отрисовке — возвращаем фишки
}
// «Сан-Франциско 0/6» в шапке — это свои категории товара (каждая +6% к ценам). Шапку перерисовывает top-hud.js — подпись ставим заново.
// Верхняя центральная панель в партии — условие победы и бар прогресса к нему (плейтест 4, 02.10: «Твои категории»
// никто не понимал, маленькую плашку условия справа не нашли). «Богатейший» — время партии; миссии — своё значение / цель.
// Шапку перерисовывает top-hud.js — подпись и бар ставим заново после каждой отрисовки.
function winHub(){
  const h=$('bHub');if(!h||!view||view.phase!=='play'||!view.win)return;
  const st=h.querySelector('.hud-map-heading strong'),b=h.querySelector('.hud-map-heading b'),bar=h.querySelector('.hud-map-track i');
  const me=playerOf(PID),w=me&&me.win,id=view.win.id;let val='',pct=0,aria='';
  if(id==='capital'){
    if(view.deadline){const at=view.paused&&view.paused.at?view.paused.at:hostNow(),left=Math.max(0,view.deadline-at),total=Math.max(1,view.deadline-(view.startedAt||view.deadline));
      val=view.finalRound?'финал':mmss(left);pct=view.finalRound?100:Math.round(100-left/total*100);aria=`осталось ${val}`;}
    else{const lead=Math.max(0,...view.players.map(p=>p.laps||0)),M=view.settings.rounds||1;val=`${Math.min(lead+1,M)}<small>/${M}</small>`;pct=Math.round(Math.min(lead,M)/M*100);aria=`круг ${Math.min(lead+1,M)} из ${M}`;}
  }else if(w){
    const money$=id==='cash'||id==='rent',fmt=v=>money$?money(v):String(v);
    val=`${fmt(w.value||0)}<small>/${fmt(w.goal||0)}</small>`;pct=w.goal?Math.round(Math.min(1,(w.value||0)/w.goal)*100):0;aria=w.text;
  }
  const label=view.win.name;   // «Рантье», «Империя», «Богатейший»…: название условия, значение и бар — рядом
  if(st&&st.textContent!==label)st.textContent=label;
  if(b&&b.innerHTML!==val)b.innerHTML=val;
  if(bar&&bar.style.width!==pct+'%')bar.style.width=pct+'%';
  const al=`${view.win.name}: ${aria}. Нажми — правила и прогресс всех`;if(h.getAttribute('aria-label')!==al){h.setAttribute('aria-label',al);h.title=al;}
  h.classList.add('mp-win-hub');
}
function hubLabel(){winHub();}
// Тап по панели — правило победы и прогресс всех (а не окно категорий соло).
{const h=$('bHub');if(h)h.addEventListener('click',e=>{if(!view||view.phase!=='play'||!view.win)return;e.stopImmediatePropagation();e.preventDefault();winEl.click();},true);}
{const h=$('bHub');if(h)new MutationObserver(()=>hubLabel()).observe(h,{childList:true,subtree:true});}
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
  offerBadgeSync();lotBadgeSync();playersDock();pauseSync();winHub();debtSync();handSync();swapSync();
  if(!play){tag.hidden=true;endBtn.hidden=true;return;}
  const val=view.turn;
  // Часы партии (15–30 мин, решение продюсера 01.10) — остаток до конца; время вышло — «🏁 последний круг».
  // Старые столы без часов — круг лидера, как раньше. Цифры идут в tick().
  roundEl.classList.toggle('final',!!view.finalRound);
  if(view.finalRound&&finalShown!==view.match){finalShown=view.match;
    plate('🏁 Последний круг',0,view.finalBy==='time'?'Время партии вышло — доигрываем круг стола, потом итог'
      :`${view.finalBy===PID?'Ты прошёл':(nameOf(view.finalBy)+' прошёл')} старт в ${view.settings.rounds}-й раз — доигрываем круг, потом итог`);}
  if(view.win){
    const me=playerOf(PID),goal=view.players.filter(p=>p.win),lead=goal.slice().sort((a,b)=>(b.win.value||0)-(a.win.value||0))[0];
    const meTxt=me&&me.win?me.win.text:'',leadTxt=lead&&lead.pid!==PID&&lead.win&&(lead.win.value||0)>((me&&me.win&&me.win.value)||0)?` · лидер ${lead.name}: ${lead.win.text}`:'';
    // Компактно (плейтест 02.10: «верх перегружен»): название условия; прогресс — в подсказке и по тапу.
    const html=`<b>🏆 ${esc(view.win.name)}</b>`;winEl.title=`ты: ${meTxt}${leadTxt}`;
    if(winEl._h!==html){winEl._h=html;winEl.innerHTML=html;}
  }
  winEl.hidden=!view.win;
  // На плейтесте число капитала (538, 899) никто не опознал — в полосе нал и число точек.
  const own=p=>p.cap?p.cap.points+p.cap.biz:0;   // точки и бизнесы вместе — «владения» (плейтест 01.10: «точек» путало)
  bar.classList.toggle('tight',view.players.length>2);   // трое-четверо: компактные фишки, круг и пауза — второй строкой
  chipsEl.innerHTML=view.players.map(p=>`<span data-pid="${esc(p.pid)}" class="mp-chip${p.pid===val.pid?' on':''}${p.online?'':' off'}${p.pid===PID?' me':''}" style="--c:${p.color}">
      <i>${esc(p.name.slice(0,1).toUpperCase())}</i><span class="mp-nm">${esc(p.pid===PID?'Ты':p.name)}</span>
      <span class="mp-cap"><i class="cash-glyph"></i>${Math.round(p.cash).toLocaleString('en-US')}<span class="mp-pts">· ${own(p)} вл.</span></span>${p.pid!==PID&&p.hand?`<span class="mp-chip-hand" title="карт в руке: ${p.hand}">🃏${p.hand}</span>`:''}
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
  if(view.win&&view.win.id==='capital')winHub();   // часы партии в верхней панели
  {const rn=roundEl.querySelector('.mp-rn');let t;
    if(view.finalRound)t='последний круг';
    else if(view.deadline){const at=tablePaused&&view.paused.at?view.paused.at:hostNow();t=mmss(view.deadline-at);}
    else t='круг '+Math.min(Math.max(0,...view.players.map(p=>p.laps||0))+1,view.settings.rounds);
    if(rn.textContent!==t)rn.textContent=t;
    roundEl.classList.toggle('late',!view.finalRound&&!!view.deadline&&view.deadline-hostNow()<60000);}
  const me=myTurn();
  // Окно открыто: кнопка и плашка уходят под него, время хода — часами на углу карточки.
  const card=!$('modal').hidden&&$('card').getBoundingClientRect();
  if(card&&card.width&&me&&!ending&&!noLimit){
    const t=paused?'⏸ '+(isFinite(left)?mmss(left):''):'⏱ '+mmss(left);if(clock.textContent!==t)clock.textContent=t;clock.classList.toggle('late',late);
    // На левом верхнем углу карточки: справа — крестик окна, сверху — кошелёк.
    clock.style.left=(card.left+12)+'px';clock.style.top=card.top+'px';clock.hidden=false;
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
  chipsEl.querySelectorAll('.mp-chip').forEach(ch=>{const on=!!handPick&&handPick.targets.has(ch.dataset.pid);if(ch.classList.contains('mp-target')!==on)ch.classList.toggle('mp-target',on);});   // цели карты из руки
  const r=$('bRoll')&&$('bRoll').getBoundingClientRect();
  if(r&&r.width){
    const hx=Math.round(r.right+10)+'px',hy=Math.round(r.top+r.height/2)+'px';if(handEl.style.left!==hx||handEl.style.top!==hy){handEl.style.left=hx;handEl.style.top=hy;}
    const tOn=!!(window.MPTaxi&&MPTaxi.can()&&!moving&&$('modal').hidden);taxiBtn.hidden=!tOn;
    if(tOn){const tx=Math.round(r.left-10)+'px';if(taxiBtn.style.left!==tx||taxiBtn.style.top!==hy){taxiBtn.style.left=tx;taxiBtn.style.top=hy;}}
  }
  if(r&&r.width){const x=r.left+r.width/2,cy=r.top+r.height/2,above=r.top-8;
    const key=x+':'+cy;if(tag._k!==key){tag._k=key;
      tag.style.left=endBtn.style.left=x+'px';endBtn.style.top=cy+'px';endBtn.style.minWidth=Math.max(r.width,96)+'px';}
    // Свой ход до броска: плашка над кубиком, а если горит строка клетки — над ней, чтобы не закрывать «открыть».
    const tb=$('tilebar'),tr=tb&&!tb.hidden&&tb.getBoundingClientRect(),over=tr&&tr.height?Math.min(above,tr.top-8):above;
    const ty=(tag.classList.contains('center')?cy:over)+'px';if(tag.style.top!==ty)tag.style.top=ty;}
  // Полоса игроков — сразу под шапкой (если там строка задач — под ней). Журнал денег и плашка
  // предложения — под полосой: раскрытый журнал больше не сталкивает полосу на поле (плейтест 01.10).
  let y=(($('top')&&$('top').getBoundingClientRect().bottom)||60)+6;
  {const n=$('mapTasks');if(n&&n.offsetParent){const q=n.getBoundingClientRect();if(q.height&&q.top<y+30)y=Math.max(y,q.bottom+6);}}
  const by=y+'px';if(bar.style.top!==by)bar.style.top=by;
  // Полоса игроков — колонкой у правого края; плашки предложения и торгов, события и журнал — слева под шапкой.
  let under=Math.round(y);
  const ob=offerBadge.hidden?'':under+'px';if(offerBadge.style.top!==ob)offerBadge.style.top=ob;
  if(!offerBadge.hidden)under=Math.round(offerBadge.getBoundingClientRect().bottom+6);
  const lb=lotBadge.hidden?'':under+'px';if(lotBadge.style.top!==lb)lotBadge.style.top=lb;
  if(!lotBadge.hidden)under=Math.round(lotBadge.getBoundingClientRect().bottom+6);
  setVar('--mp-under',under+'px');
  // события — под журналом (они слева в одной колонке)
  {const j=$('moneyJournal'),jr=j&&j.offsetParent&&j.getBoundingClientRect();const tt=(jr&&jr.height?Math.max(under,Math.round(jr.bottom+6)):under)+'px';if(ticker.style.top!==tt)ticker.style.top=tt;}
  // Окно открыто — карточка начинается под строкой денег: кошелёк виден (плейтест 01.10, все окна).
  const wr=!$('modal').hidden&&document.querySelector('#top .bar1');
  document.body.classList.toggle('mp-modal',!!wr);
  if(wr){const b=wr.getBoundingClientRect().bottom;if(b>10)setVar('--mp-wallet',Math.round(b+8)+'px');}
}
const vars={};
function setVar(k,v){if(vars[k]===v)return;vars[k]=v;document.documentElement.style.setProperty(k,v);}

// ---- «Игроки» вместо билета Джонни (плейтест 01.10): у кого сколько денег, владений, что за клетки ----
{const b=$('bJohnny');if(b){
  b.classList.add('mp-players');b.setAttribute('aria-label','Игроки');b.title='Игроки';
  b.addEventListener('click',e=>{if(!view||view.phase!=='play')return;e.stopImmediatePropagation();e.preventDefault();playersWindow();},true);}}
{const b=$('bJohnny');if(b)new MutationObserver(()=>{if(!b.querySelector('.mp-dk-pl'))playersDock();}).observe(b,{childList:true});}   // кто бы ни переписал док — фишки возвращаются
function playersDock(){
  const b=$('bJohnny');if(!b||!view||!view.players)return;
  // Разметку дока соло один раз переписывают при запуске — ставим свою, когда её нет (подписи в доке скрыты: значок — фишки игроков).
  let box=b.querySelector('.mp-dk-pl');if(!box){b.innerHTML='<em class="mp-dk-pl"></em>';box=b.firstChild;}
  const html=view.players.slice().sort((a,b)=>a.seat-b.seat).map(p=>`<i style="--c:${p.color}">${esc(p.name.slice(0,1).toUpperCase())}</i>`).join('');
  if(box._h!==html){box._h=html;box.innerHTML=html;}
}
// ---- «Продать игроку» (m5-sellto, логика «Геймплея» MPSell): выбор покупателя тапом по фишке, цена с шагами ----
async function sellFlow(i){
  const t=S.tiles[i];if(!t||!t.owner||!window.MPSell)return;
  const pid=await chipPick(rivalsOf().map(p=>p.pid),`Кому продаёшь «${titleOf(t)}»?`);if(!pid)return;await wait(150);
  const inv=Math.round(invested(t)),mv=marketValue(t,pid),buyer=playerOf(pid),biz=t.type==='biz';let rent=0;try{rent=rentOfMine(t);}catch(e){}
  const pending=modal(`<h2>🏷 Продать · ${esc(buyer?buyer.name:'')}</h2>
    <div class="mp-swap-cmp"><div class="mp-swap-card"><em>${biz?bizIcon(t):(good(t.good)||{}).icon||'🏪'}</em><b>${esc(titleOf(t))}</b><small>ур. ${(biz?t.level:t.salesLvl)||1} · вложено ${money(inv)} · 🏠 ${money(rent)}</small></div>
      <span>→</span><div class="mp-swap-card"><em><i class="mp-dot" style="background:${buyer?buyer.color:'#888'};width:28px;height:28px;margin:0"></i></em><b>${esc(buyer?buyer.name:'')}</b><small>нал ${money(buyer?buyer.cash:0)}</small></div></div>
    <div class="mp-offer-own"><span>Цена — твоя, от $10. Ответит в начале своего хода; молчание — отказ.</span><span class="mp-offer-steps"><button type="button" class="mp-offer-step" data-d="-50">−50</button><button type="button" class="mp-offer-step" data-d="-10">−10</button><input type="number" class="mp-sell-amount" min="10" step="10" value="${Math.ceil(inv*1.5/10)*10}"><button type="button" class="mp-offer-step" data-d="10">+10</button><button type="button" class="mp-offer-step" data-d="50">+50</button></span><small class="mp-offer-x"></small></div>`,
    [{t:'Предложить продажу',v:1,cls:'ok'},{t:'Передумал',v:0,cls:'sec'}]);
  const inp=$('card').querySelector('.mp-sell-amount'),hint=$('card').querySelector('.mp-offer-x');
  const upd=()=>{const a=+inp.value||0;hint.textContent=`рыночная для ${buyer?buyer.name:'покупателя'} ${money(mv)} · ×${mv?(a/mv).toFixed(1).replace('.',','):'—'}${buyer&&a>buyer.cash?` · у ${buyer.name} сейчас ${money(buyer.cash)} — может не хватить`:''}`;};
  $('card').querySelectorAll('.mp-offer-step').forEach(b=>b.onclick=()=>{inp.value=Math.max(10,(+inp.value||0)+(+b.dataset.d));upd();});inp.oninput=upd;upd();
  const v=await pending;if(v!==1)return;
  const a=Math.max(10,Math.round(+inp.value||0));if(!MPSell.offer(i,pid,a))toast('Продажу сейчас не предложить: одно предложение за ход, клетка не на торгах');
}
// ===== Обмен на карте (m5-swapmap, design/ЗАДАЧА-обмен-на-карте.md): до 2↔2, цепочки, «сейчас / после» =====
// Слой поверх поля, как mapPick: свои клетки и клетки соперника подсвечены, тап кладёт в «Отдаёшь»/«Получаешь».
// Правила, рента «до/после», подбор и отправка — window.MPSwap «Геймплея». Система координат — моя:
// give — мои клетки, get — клетки соперника, pay>0 — доплачиваю я.
let swapUI=null;
const SW=()=>window.MPSwap||null;
// С кем меняться: один соперник — сразу он, иначе тап по его фишке в полосе игроков.
function swapRivalPick(){const rs=rivalsOf().map(p=>p.pid);return rs.length===1?Promise.resolve(rs[0]):chipPick(rs,'С кем меняешься?');}
function swOwnersAfter(U){const o={};toShared(S.tiles).forEach(t=>{if(t.owner)o[t.i]=t.owner;});
  U.give.forEach(i=>o[i]=U.rival);U.get.forEach(i=>o[i]=PID);return o;}
function swapMode(o){
  const A=SW();if(!A||!view||view.phase!=='play'||!MobileHost.ready)return;
  if(swapUI)swapClose();if(!$('modal').hidden)closeModal();
  const rival=o.rival;if(!rival||!playerOf(rival))return;
  swapUI={rival,give:new Set(o.give||[]),get:new Set(o.get||[]),pay:o.pay||0,after:false,incoming:o.incoming||null,rings:new Map(),chains:[],sugK:0};
  document.body.classList.add('mp-swapping');
  swapUI.veil=el('div','mp-sw-veil',layer);
  const tray=el('div','mp-sw-tray');swapUI.tray=tray;
  swapUI.banner=el('div','mp-sw-banner');   // заголовок режима над полем: что за кольца и с кем обмен (Андрей 03.10: «что это за кружок?»)
  tray.addEventListener('click',e=>{const b=e.target.closest('[data-sw]');if(!b||b.disabled)return;swapAct(b.dataset.sw,b.dataset.v);});
  const cv=$('board');let down=null;
  swapUI.pd=e=>{down={x:e.clientX,y:e.clientY};};
  swapUI.pu=e=>{const d=down;down=null;if(!d||!swapUI||Math.hypot(e.clientX-d.x,e.clientY-d.y)>8)return;
    let best=-1,bd=44;for(const [i] of swapUI.rings){const q=screenOfTile(i),dd=Math.hypot(e.clientX-q.x,e.clientY-q.y);if(dd<bd){bd=dd;best=i;}}
    if(best<0)return;e.stopImmediatePropagation();if(!swapUI.incoming)swapTap(best);};
  if(cv){cv.addEventListener('pointerdown',swapUI.pd,true);cv.addEventListener('pointerup',swapUI.pu,true);}
  swapPaint();
  // Всё поле в кадре, низ кадра — над лотком (как mapPick: обзор на входе, «к Джонни» на выходе).
  try{MobileHost.send({action:'overview'});swapFrame();}catch(e){}
}
function swapFrame(){const U=swapUI;if(!U)return;const app=$('app').getBoundingClientRect(),h=app.height||innerHeight,top=Math.max($('top').getBoundingClientRect().bottom,U.banner?U.banner.getBoundingClientRect().bottom:0);
  const bottom=(app.bottom-U.tray.getBoundingClientRect().top+8)/h;try{MobileHost.send({action:'layout',top:(top-app.top)/h,bottom});}catch(e){}}
function swapTap(i){
  const U=swapUI,A=SW(),own=toShared(S.tiles)[i].owner,side=own===PID?'give':own===U.rival?'get':null;if(!side||!A)return;
  const set=U[side];if(set.has(i)){set.delete(i);swapPaint();return;}
  if(!A.free(i,U.counter)){toast(A.freeReason?`Не обменять: ${A.freeReason(i)}`:'Эту клетку сейчас не обменять');return;}
  if(set.size>=(A.max||2)){toast(`Не больше ${A.max||2} клеток с каждой стороны`);return;}
  set.add(i);try{navigator.vibrate&&navigator.vibrate(15);}catch(e){}swapPaint();
}
function swapClose(){
  if(!swapUI)return;const U=swapUI;swapUI=null;const cv=$('board');
  if(cv){cv.removeEventListener('pointerdown',U.pd,true);cv.removeEventListener('pointerup',U.pu,true);}
  U.veil.remove();U.tray.remove();if(U.banner)U.banner.remove();for(const [,r] of U.rings)r.remove();U.chains.forEach(c=>c.el.remove());
  document.body.classList.remove('mp-swapping');try{syncFlags();}catch(e){}
  try{MobileHost.send({action:'home'});mobileLastLayout='';mobileLayout();}catch(e){}
  try{offerBadgeSync();}catch(e){}if(U.done)U.done();
}
function swapRow(i){const t=S.tiles[i],biz=t.type==='biz';let r=0;try{r=t.owner==='you'?rentOfMine(t):rentOf(t);}catch(e){}
  return `<div class="mp-sw-item"><em>${biz?bizIcon(t):(good(t.good)||{}).icon||'🏪'}</em><span><b>${esc(titleOf(t))}</b><small>${cellNo(t.i)} · ур. ${(biz?t.level:t.salesLvl)||1} · вложено ${money(invested(t))} · 🏠 ${money(r)}</small></span></div>`;}
function swapPaint(){
  const U=swapUI,A=SW();if(!U||!A)return;
  const sh=toShared(S.tiles),now={};sh.forEach(t=>{if(t.owner)now[t.i]=t.owner;});
  const own=U.after?swOwnersAfter(U):now,give=[...U.give],get=[...U.get];
  const loners=new Set(A.loners(PID));
  // кольца: мои клетки и клетки соперника, которые можно положить в обмен (и уже лежащие)
  const sid=U.counter||(U.incoming&&U.incoming.id)||undefined;
  const want=new Set(sh.filter(t=>(t.owner===PID||t.owner===U.rival)&&(A.free(t.i,sid)||U.give.has(t.i)||U.get.has(t.i))).map(t=>t.i));
  for(const [i,r] of U.rings)if(!want.has(i)){r.remove();U.rings.delete(i);}
  for(const i of want){let r=U.rings.get(i);if(!r){r=el('div','mp-sw-ring',layer);U.rings.set(i,r);}
    const inGive=U.give.has(i),inGet=U.get.has(i),single=now[i]===PID&&loners.has(i)&&!inGive;
    r.className='mp-sw-ring'+(inGive?' give':inGet?' get':'')+(single?' single':'')+(own[i]===PID?' mine':'');
    r.style.setProperty('--c',colorOf(own[i]));
    r.innerHTML=inGive?'<b>отдаёшь</b>':inGet?'<b>получаешь</b>':single?'<b>одна</b>':'';}
  // скобки цепочек «+25%» — для меня и соперника, сейчас или после
  U.chains.forEach(c=>c.el.remove());U.chains=[];
  for(const pid of [PID,U.rival]){
    const ch=U.after?A.chains(pid,give,get,U.rival):A.chains(pid);
    for(const c of ch||[]){const ts=c.tiles||[];for(let k=0;k+1<ts.length;k++){
      const e=el('div','mp-sw-chain'+(pid===PID?' mine':''),layer);e.style.setProperty('--c',colorOf(pid));e.textContent=`+${Math.round(GROUP_BONUS*100)}%`;U.chains.push({el:e,a:ts[k],b:ts[k+1]});}}}
  try{syncFlags();}catch(e){}
  // лоток
  const who=nameOf(U.rival),ready=give.length&&get.length;
  const pv=ready?A.preview({to:U.rival,give,get,pay:U.pay,counter:sid,accept:!!U.incoming}):null;
  const d=(x)=>{if(!x)return '—';const df=Math.round(x.after-x.before);return `<em>${money(x.before)} → <b>${money(x.after)}</b> <i class="${df>=0?'up':'down'}">${df>=0?'+':'−'}${money(Math.abs(df))}</i></em>`;};
  // Доплата в моей системе: pay>0 — плачу я (−), pay<0 — платит соперник мне (+).
  const pays=(A.pays||SWAP_PAYS).map(v=>`<button type="button" data-sw="pay" data-v="${v}" class="${v<0?'in':v>0?'out':''}${v===U.pay?' on':''}">${v===0?'0':v<0?'+'+money(-v):'−'+money(v)}</button>`).join('');
  const payNote=U.pay<0?`${esc(who)} доплатит тебе <b>${money(-U.pay)}</b>`:U.pay>0?`Ты доплатишь <b>${money(U.pay)}</b> — уйдёт в резерв до ответа`:'Без доплаты';
  const inc=U.incoming,canSend=ready&&pv&&pv.ok;
  const cnt=(n)=>`${n}/${A.max||2}`;
  U.banner.style.top=Math.round($('top').getBoundingClientRect().bottom+6)+'px';
  U.banner.innerHTML=inc?`<b>🔁 ${esc(who)} предлагает обмен</b><small>Кольца на поле — клетки из предложения. «После» покажет, что станет.</small>`
    :`<b>🔁 Обмен с ${esc(who)}: выбери клетки</b><small>Кольцо над клеткой — её можно обменять. Тапни, чтобы выбрать.</small>`;
  U.tray.innerHTML=`<div class="mp-sw-head"><b>🔁 ${inc?`${esc(who)} предлагает`:`Обмен · ${esc(who)}`}</b><span class="mp-sw-tabs"><button type="button" data-sw="now" class="${U.after?'':'on'}">Сейчас</button><button type="button" data-sw="after" class="${U.after?'on':''}">После</button></span></div>
    <p class="mp-sw-legend"><b>Отдаёшь</b> — твои клетки уйдут ${esc(who)}. <b>Получаешь</b> — клетки ${esc(who)} станут твоими. <b>«одна»</b> — твоя клетка без соседей твоего цвета, её выгоднее отдать.</p>
    <div class="mp-sw-cols"><div><p>Отдаёшь <small>${cnt(give.length)}</small></p>${give.map(swapRow).join('')||'<small class="mp-sw-hint">тапни свою клетку</small>'}</div>
      <div><p>Получаешь <small>${cnt(get.length)}</small></p>${get.map(swapRow).join('')||`<small class="mp-sw-hint">тапни клетку ${esc(who)}</small>`}</div></div>
    ${pv?`<div class="mp-sw-rent"><p><span>Твоя рента</span>${d(pv.mine)}</p><p><span>Рента ${esc(who)}</span>${d(pv.theirs)}</p><p class="inv"><span>Вложено</span><em>отдаёшь ${money(pv.invGive)} · получаешь ${money(pv.invGet)}</em></p>${pv.ok||inc?'':`<p class="why">${esc(pv.reason||'Обмен сейчас невозможен')}</p>`}</div>`:''}
    ${inc?(U.pay?`<p class="mp-sw-paynote">${U.pay>0?`Ты доплатишь <b>${money(U.pay)}</b>`:`${esc(who)} доплатит тебе <b>${money(-U.pay)}</b>`}</p>`:''):`<p class="mp-sw-paynote">Доплата: ${payNote}</p><div class="mp-sw-pays">${pays}</div>`}
    <div class="mp-sw-btns">${inc&&!(myTurn()&&!ending)?`<button type="button" data-sw="close" style="grid-column:1/-1">Ответишь в свой ход · Закрыть</button>`:inc?`<button type="button" data-sw="accept" class="ok">Принять</button><button type="button" data-sw="edit">Изменить</button><button type="button" data-sw="decline" class="no">Отказать</button>`
      :`<button type="button" data-sw="suggest">Подобрать обмен</button><button type="button" data-sw="propose" class="ok" ${canSend?'':'disabled'}>${U.counter?'Встречное':'Предложить'}</button><button type="button" data-sw="close">Назад</button>`}</div>`;
}
function swapAct(a,v){
  requestAnimationFrame(swapFrame);
  const U=swapUI,A=SW();if(!U||!A)return;
  if(a==='close'){swapClose();return;}
  if(a==='now'||a==='after'){U.after=a==='after';swapPaint();return;}
  if(a==='pay'){U.pay=+v;swapPaint();return;}
  if(a==='suggest'){const r=A.suggest(U.rival,U.sugK%3);U.sugK++;
    if(!r){if(U.sugK>1){U.sugK=0;const r0=A.suggest(U.rival,0);if(r0){swapApply(r0);return;}}toast('Выгодного обоим обмена нет — выбери клетки сам');return;}
    swapApply(r);return;}
  if(a==='propose'){const draft={give:[...U.give],get:[...U.get],pay:U.pay};
    const ok=U.counter?A.counter(U.counter,draft):A.propose(Object.assign({to:U.rival},draft));
    if(ok){toast(`🔁 ${U.counter?'Встречное':'Обмен'} ушёл ${nameOf(U.rival)} — ответит в свой ход`,2200);swapClose();}
    else toast(`Не отправить: ${A.lastError||'проверь клетки'}`,2400);return;}
  if(a==='accept'){if(A.accept(U.incoming.id)){swapClose();}else{toast(`Не вышло: ${A.lastError||'клетки сменили хозяина'}`,2400);swapClose();}return;}
  if(a==='decline'){A.decline(U.incoming.id);toast('Отказал');swapClose();return;}
  if(a==='edit'){U.counter=U.incoming.id;U.incoming=null;U.sugK=0;swapPaint();return;}
}
// Стол поменялся под открытым режимом (ход, хозяева, ответ соперника) — перерисовать; партия кончилась — закрыть.
function swapSync(){const U=swapUI;if(!U)return;
  if(!view||view.phase!=='play'||!playerOf(U.rival)){swapClose();return;}
  if(U.incoming&&!(SW().incoming()||[]).some(x=>x.id===U.incoming.id)){swapClose();return;}
  const key=[view.turn&&view.turn.n,myTurn(),ending,S.cash,proposedThisTurn(),(view.tiles||[]).map(t=>t.owner||'').join(',')].join('|');
  if(key!==U.key){U.key=key;swapPaint();}}
function swapApply(r){const U=swapUI;U.give=new Set(r.give);U.get=new Set(r.get);U.pay=r.pay||0;U.after=true;swapPaint();}
// Входящее: окно получателя — этот же режим (MPSwap.answerWindow).
function swapAnswerMode(id){const A=SW();if(!A)return Promise.resolve();const o=(A.incoming()||[]).find(x=>x.id===id)||(A.incoming()||[])[0];if(!o)return Promise.resolve();
  swapMode({rival:o.from,give:o.give,get:o.get,pay:o.pay,incoming:o});
  return new Promise(res=>{if(swapUI)swapUI.done=res;else res();});}
{const hook=()=>{const A=SW();if(A&&!A._ui){A._ui=1;A.answerWindow=id=>swapAnswerMode(id);A.mapMode=swapMode;}};hook();setTimeout(hook,0);addEventListener('load',hook);}
// ---- «Мои владения»: все свои клетки по группам соседей, в порядке поля (плейтест 4, 02.10: «я много раз говорил — по группам») ----
// Строка: значок товара, название, уровень, вложено, рента за остановку. Действия: на торги (в свой ход), выбрать для обмена.
function myGroups(){
  const own=i=>{const t=S.tiles[(i+40)%40];return !!t&&!!t.owner&&(t.type==='kiosk'||t.type==='biz')&&!sfIsLot(t);};
  const list=S.tiles.filter(t=>own(t.i)).map(t=>t.i).sort((a,b)=>a-b),seen=new Set(),groups=[];
  for(const i of list){if(seen.has(i))continue;let a=i;while(own(a-1)&&!seen.has((a-1+40)%40)&&(a-1+40)%40!==i)a=(a-1+40)%40;
    const g=[];let j=a;while(own(j)&&!seen.has(j)){g.push(j);seen.add(j);j=(j+1)%40;}groups.push(g);}
  return groups.sort((x,y)=>x[0]-y[0]);
}
function holdRow(i,opts){
  const t=S.tiles[i],biz=t.type==='biz',icon=biz?bizIcon(t):(good(t.good)||{}).icon||'🏪',lvl=biz?t.level:t.salesLvl;
  const lot=lotOn(i),busy=lot?'🔨 на торгах':t.mpSale?`🏷 продаётся → ${esc(nameOf(t.mpSale.to))} · ждёт ответа`:t.mpOffer?'💼 предложение':t.mpSwap?'🔁 обмен':'';
  let rent=0;try{rent=rentOfMine(t);}catch(e){}
  const act=opts.pick?`<button type="button" class="sm mp-hold-pick buy-btn ${busy?'buy-no':'buy-ok'}" data-i="${i}" ${busy?'disabled':''}>${esc(opts.pickLabel||'Выбрать')}</button>`
    :myTurn()&&!ending&&!busy?`<span class="mp-hold-acts"><button type="button" class="sm sec mp-hold-lot" data-i="${i}">🔨 На торги</button>${proposedThisTurn()?'':`<button type="button" class="sm sec mp-hold-swap" data-i="${i}">🔁 Обменять</button><button type="button" class="sm sec mp-hold-sell" data-i="${i}">🏷 Продать игроку</button>`}</span>`:'';
  return `<div class="mp-hold-row"><em>${icon}</em><div><b>${esc(titleOf(t))}</b><small>клетка ${i} · ур. ${lvl||1} · вложено ${money(invested(t))} · 🏠 ${money(rent)}${busy?` · ${busy}`:''}</small></div>${act}</div>`;
}
async function holdingsWindow(opts={}){
  if(!view||view.phase!=='play'||!$('modal').hidden||moving)return null;
  const gs=myGroups();
  if(!gs.length){toast('Своих клеток пока нет');return null;}
  const body=gs.map(g=>`<div class="mp-hold-group"><p class="mp-hold-head">${g.length>1?`🔗 Группа · клетки ${g[0]}–${g[g.length-1]} · рента +25% за каждого соседа`:`Отдельно · клетка ${g[0]}`}</p>${g.map(i=>holdRow(i,opts)).join('')}</div>`).join('');
  const pending=modal(`<h2>🏠 ${esc(opts.title||'Мои владения')}</h2>${!opts.pick&&SW()&&myTurn()&&!ending&&!proposedThisTurn()?'<button type="button" class="sec mp-hold-swapnew">🔁 Обмен на карте — выбрать соперника</button>':''}${opts.lead?`<p class="t">${opts.lead}</p>`:'<p class="t">По порядку на поле, соседи — группой: продашь или отдашь клетку из группы — у соседей рента ниже.</p>'}${body}`,[{t:opts.pick?'Назад':'Закрыть',v:0,cls:'sec'}]);
  $('card').querySelectorAll('.mp-hold-pick').forEach(b=>b.onclick=()=>{if(!b.disabled)closeModal('pick:'+b.dataset.i);});
  $('card').querySelectorAll('.mp-hold-lot').forEach(b=>b.onclick=()=>closeModal('lot:'+b.dataset.i));
  $('card').querySelectorAll('.mp-hold-swap').forEach(b=>b.onclick=()=>closeModal('swap:'+b.dataset.i));
  $('card').querySelectorAll('.mp-hold-sell').forEach(b=>b.onclick=()=>closeModal('sell:'+b.dataset.i));
  {const b=$('card').querySelector('.mp-hold-swapnew');if(b)b.onclick=()=>closeModal('swapnew');}
  const v=await pending;
  if(typeof v==='string'&&v.startsWith('lot:')){setTimeout(()=>lotWindow(+v.slice(4)),180);return null;}
  if(typeof v==='string'&&v.startsWith('pick:'))return +v.slice(5);
  if(typeof v==='string'&&v.startsWith('sell:')){await wait(180);sellFlow(+v.slice(5));return null;}
  // Обменять свою клетку: выбрать чужую на карте (кольца над клетками соперников), дальше — доплата.
  if(typeof v==='string'&&v==='swapnew'){await wait(180);const pid=await swapRivalPick();if(pid)swapMode({rival:pid});return null;}
  if(typeof v==='string'&&v.startsWith('swap:')&&SW()){const give=+v.slice(5);await wait(180);const pid=await swapRivalPick();if(pid)swapMode({rival:pid,give:[give]});return null;}
  if(typeof v==='string'&&v.startsWith('swap:')){const give=+v.slice(5);
    const cands=S.tiles.filter(x=>isRival(x)&&!x.mpOffer&&!x.mpSwap&&!lotOn(x.i)&&!swappedWith(x.rival)).map(x=>({i:x.i,title:`${titleOf(x)} · ${nameOf(x.rival)}`,price:invested(x),bank:0}));
    if(!cands.length){toast('Меняться не на что: у соперников нет свободных клеток');return null;}
    await wait(180);const r=await mapPick(cands,{title:`🔁 На что меняешь «${titleOf(S.tiles[give])}»`,sum:sel=>sel.size>1?'выбери одну клетку':sel.size?'дальше — доплата':'тап по клетке соперника'});
    if(r&&r.size===1){await wait(150);swapPay(S.tiles[[...r][0]],give);}else if(r&&r.size>1)toast('Выбери одну клетку соперника');
    return null;}
  return null;
}
let lastRival=null;
rivalWindow=(function(base){return function(t){lastRival=t;return base.apply(this,arguments);};})(rivalWindow);
// Обмен: вместо двух голых списков — выбрать свою клетку в «Моих владениях», затем доплату с карточкой «отдаёшь → получаешь».
async function swapFlow(t){
  if(!isRival(t)||!myTurn())return;const who=nameOf(t.rival);
  const give=await holdingsWindow({pick:true,pickLabel:'Отдать',title:'Что отдаёшь в обмен',lead:`На «${esc(titleOf(t))}» хозяина ${esc(who)}. Выбери свою клетку — дальше доплата.`});
  if(give==null)return;await wait(200);return swapPay(t,give);
}
async function swapPay(t,give){
  const who=nameOf(t.rival),g=S.tiles[give];if(!g||!isRival(t))return;
  const card=(x,mine)=>{let r=0;try{r=mine?rentOfMine(x):rentOf(x);}catch(e){}const biz=x.type==='biz';
    return `<div class="mp-swap-card"><em>${biz?bizIcon(x):(good(x.good)||{}).icon||'🏪'}</em><b>${esc(titleOf(x))}</b><small>ур. ${(biz?x.level:x.salesLvl)||1} · вложено ${money(invested(x))} · 🏠 ${money(r)}</small></div>`;};
  const pays=SWAP_PAYS.map(v=>`<button type="button" class="mp-swap-p ${v===0?'on':''}" data-v="${v}">${v>0?'ты +'+money(v):v<0?esc(who)+' +'+money(-v):'без доплаты'}</button>`).join('');
  const pending=modal(`<h2>🔁 Обмен · ${esc(who)}</h2><div class="mp-swap-cmp">${card(g,true)}<span>→</span>${card(t,false)}</div>
    <p class="t">Доплата — кто кому добавляет деньгами. Твою доплату держим в резерве до ответа.</p><div class="mp-swap-pays">${pays}</div>`,
    [{t:'Предложить обмен',v:1,cls:'ok'},{t:'Назад',v:0,cls:'sec'}]);
  let pay=0;$('card').querySelectorAll('.mp-swap-p').forEach(b=>b.onclick=()=>{pay=+b.dataset.v;$('card').querySelectorAll('.mp-swap-p').forEach(x=>x.classList.toggle('on',x===b));});
  const v=await pending;if(v===1)placeSwap(t,give,pay);
}
// В окне чужой клетки — «🔁 Обменять на карте»: клетка сразу ложится в «Получаешь» (m5-swapmap).
new MutationObserver(()=>{
  const c=$('card');if(!c||$('modal').hidden||!lastRival||c.querySelector('.mp-swap-open'))return;
  if(![...c.querySelectorAll('.row')].some(r=>/Вложено хозяином/.test(r.textContent)))return;
  const t=lastRival,A=SW();if(!A||!isRival(t)||!myTurn()||ending||proposedThisTurn()||!A.free(t.i))return;
  const b=document.createElement('button');b.type='button';b.className='mp-swap-open sec';b.textContent='🔁 Обменять на свои клетки';
  b.onclick=()=>{closeModal(0);setTimeout(()=>swapMode({rival:t.rival,get:[t.i]}),200);};
  const at=c.querySelector('.mbtns');if(at)at.before(b);else c.append(b);
}).observe($('card'),{childList:true,subtree:true});
// ---- тап по чужой клетке на карте — её окно: рента, предложить цену или обмен (плейтест 5) ----
{const cv=$('board');let down=null;
  if(cv){cv.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY};},true);
    cv.addEventListener('pointerup',e=>{const d=down;down=null;if(!d||pick||swapUI||!view||view.phase!=='play'||!$('modal').hidden||moving)return;
      if(Math.hypot(e.clientX-d.x,e.clientY-d.y)>8||!MobileHost.ready)return;
      let best=-1,bd=40;for(let i=0;i<40;i++){const q=screenOfTile(i),dd=Math.hypot(e.clientX-q.x,e.clientY-q.y);if(dd<bd){bd=dd;best=i;}}
      const t=best>=0&&S.tiles[best];if(!t||!isRival(t))return;
      e.stopImmediatePropagation();window.MPTrade?MPTrade.open(t):rivalWindow(t);},true);}}
// ---- минус: красная метка в полосе, тап — окно долга (само оно открывается только при проходе старта, «Геймплей» be12a25) ----
const debtChip=el('button','mp-debt-chip',bar);debtChip.type='button';debtChip.hidden=true;
debtChip.onclick=()=>{if(window.MPDebt&&$('modal').hidden&&!moving)MPDebt.open();};
function debtSync(){
  const on=!!(view&&view.phase==='play'&&S&&S.cash<0);debtChip.hidden=!on;if(!on)return;
  const laps=window.MPDebt?MPDebt.laps():0,html=`<b>−${money(-S.cash)}</b><small>${laps>=1?'прошёл старт в минусе':'в минусе'}</small>`;
  if(debtChip._h!==html){debtChip._h=html;debtChip.innerHTML=html;}debtChip.classList.toggle('warn',laps>=1);
}
// ---- окно чужой клетки: из чего «вложено» (плейтест 5: «почему за 100? откуда это предложение») и своя сумма с ± ----
function investedParts(t){
  if(t.type==='biz')return [['бизнес с прокачками',invested(t)-(t.mpPrem||0)]].concat(t.mpPrem?[['сверху за прошлую сделку',t.mpPrem]]:[]);
  const base=t.price||(window.SFBuilder&&SFBuilder.basePrice?SFBuilder.basePrice(t.base):0),parts=[['стройка',base]];let up=0;
  for(let l=1;l<(t.salesLvl||1);l++)up+=salesCost({base:t.base,good:t.good,salesLvl:l});
  if(up)parts.push([`прокачки до ур. ${t.salesLvl}`,up]);if(t.mpPrem)parts.push(['сверху за прошлую сделку',t.mpPrem]);return parts;
}
new MutationObserver(()=>{
  const c=$('card');if(!c||$('modal').hidden||!lastRival)return;
  const row=[...c.querySelectorAll('.row')].find(r=>/Вложено хозяином/.test(r.textContent));
  if(row&&!c.querySelector('.mp-inv-parts')){let parts=[];try{parts=investedParts(lastRival);}catch(e){}
    if(parts.length){const d=document.createElement('p');d.className='mp-inv-parts';d.textContent='= '+parts.map(([n,v])=>`${n} ${money(v)}`).join(' + ')+'. Цены сделок — от рыночной: доход клетки за '+MARKET_LAPS+' кругов с группой, не меньше вложенного.';row.after(d);}}
  const own=c.querySelector('.mp-offer-own');
  if(own&&!own.dataset.ui){own.dataset.ui='1';const inp=own.querySelector('.mp-offer-amount');if(inp){
    const mk=(txt,dv)=>{const b=document.createElement('button');b.type='button';b.className='mp-offer-step';b.textContent=txt;b.onclick=()=>{const min=+inp.min||0;inp.value=Math.max(min,Math.round((+inp.value||0)+dv));inp.dispatchEvent(new Event('input'));};return b;};
    const wrap=document.createElement('span');wrap.className='mp-offer-steps';wrap.append(mk('−50',-50),mk('−10',-10),inp,mk('+10',10),mk('+50',50));own.insertBefore(wrap,own.querySelector('.mp-offer-go'));
    const inv=marketValue(lastRival,PID),hint=document.createElement('small');hint.className='mp-offer-x';own.append(hint);
    const upd=()=>{hint.textContent=inv?`×${((+inp.value||0)/inv).toFixed(1).replace('.',',')} к рыночной`:'';};inp.addEventListener('input',upd);upd();}}
}).observe($('card'),{childList:true,subtree:true});
function playersWindow(){
  if(!view||view.phase!=='play'||!$('modal').hidden||moving)return;
  const tiles=view.tiles||[];
  const rows=view.players.slice().sort((a,b)=>a.seat-b.seat).map(p=>{
    const own=tiles.filter(t=>t.owner===p.pid&&(t.type==='kiosk'||t.type==='biz'));
    const names=own.map(t=>{try{return esc(t.type==='biz'?bizName(t):pointName(t));}catch(e){return '';}}).filter(Boolean).join(' · ');
    return `<div class="mp-pl" style="--c:${p.color}"><i>${esc(p.name.slice(0,1).toUpperCase())}</i>
      <div><b>${esc(p.name)}${p.pid===PID?' · ты':''}${p.online?'':' <em>офлайн</em>'}</b>
        <small>${own.length} ${plural(own.length,'владение','владения','владений')}${p.cap?' · капитал '+money(p.cap.total):''}</small>
        ${names?`<p>${names}</p>`:''}${p.win&&view.win&&view.win.id!=='capital'?`<p class="mp-pl-win">🏆 ${esc(p.win.text)}</p>`:''}</div>
      <strong>${money(p.cash)}</strong></div>`;}).join('');
  const pot=`<p class="t mp-pl-pot">🐷 Копилка стола: <b>${money(view.pot||0)}</b> — сюда падают штрафы всех; заберёт тот, кто встанет на копилку.</p>`;
  const pending=modal(`<h2>👥 Игроки</h2><button type="button" class="sec mp-hold-open">🏠 Мои владения — по группам</button>${view.win?`<p class="t">Как победить — <b>${esc(view.win.name)}</b>: ${esc(view.win.text)}</p>`:''}${rows}${pot}`,[{t:'Закрыть',v:0,cls:'sec'}]);
  {const b=$('card').querySelector('.mp-hold-open');if(b)b.onclick=()=>{closeModal(0);setTimeout(()=>holdingsWindow(),200);};}
  return pending;
}

// ---- выбор своих клеток на карте: подсветка, группы, тап — выбрать/снять (плейтест 02.10) ----
// cands: [{i,title,price,bank}]; opts: {title, preset:Set, sum:sel=>текст}. Возвращает Set выбранных или null («Назад»).
let pick=null;
function mapPick(cands,opts){
  return new Promise(res=>{
    const sel=new Set(opts.preset||[]),byI=new Map(cands.map(c=>[c.i,c]));
    const own=i=>{const t=S.tiles[(i+40)%40];return !!t&&!!t.owner&&(t.type==='kiosk'||t.type==='biz')&&!sfIsLot(t);};
    const ui=el('div','mp-pick');
    ui.innerHTML=`<b>${esc(opts.title||'Выбери клетки')}</b><small>Тап по своей клетке — выбрать или снять. 🔗 — группа: без соседа рента ниже.</small><p class="mp-pick-sum"></p><div><button type="button" class="sec" data-v="0">Назад</button><button type="button" class="ok" data-v="1">Готово</button></div>`;
    const rings=new Map();
    for(const c of cands){const r=el('div','mp-pick-ring',layer);r.innerHTML=`<span>${esc(c.title)}<b>${money(c.price)}</b></span>${own(c.i-1)||own(c.i+1)?'<i>🔗</i>':''}`;rings.set(c.i,r);}
    const paint=()=>{for(const [i,r] of rings)r.classList.toggle('on',sel.has(i));const sm=ui.querySelector('.mp-pick-sum');if(sm)sm.textContent=`Выбрано: ${sel.size}${opts.sum?' · '+opts.sum(sel):''}`;};
    const cv=$('board');let down=null;
    const pd=e=>{down={x:e.clientX,y:e.clientY};};
    const pu=e=>{if(!down)return;const moved=Math.hypot(e.clientX-down.x,e.clientY-down.y);down=null;if(moved>8)return;
      let best=null,bd=56;for(const c of cands){const p=screenOfTile(c.i),d=Math.hypot(e.clientX-p.x,e.clientY-p.y);if(d<bd){bd=d;best=c;}}
      if(!best)return;e.stopImmediatePropagation();if(sel.has(best.i))sel.delete(best.i);else sel.add(best.i);paint();
      try{navigator.vibrate&&navigator.vibrate(20);}catch(x){}};
    cv.addEventListener('pointerdown',pd,true);cv.addEventListener('pointerup',pu,true);
    document.body.classList.add('mp-picking');
    try{MobileHost.send({action:'overview'});}catch(e){}
    const done=v=>{cv.removeEventListener('pointerdown',pd,true);cv.removeEventListener('pointerup',pu,true);
      for(const [,r] of rings)r.remove();ui.remove();pick=null;document.body.classList.remove('mp-picking');
      try{MobileHost.send({action:'home'});}catch(e){}res(v?new Set(sel):null);};
    ui.querySelectorAll('button').forEach(b=>b.onclick=()=>done(b.dataset.v==='1'));
    if(typeof enamelButton==='function')ui.querySelectorAll('button').forEach(b=>enamelButton(b));
    pick={rings};paint();
  });
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
    if(!k){const e=el('div','mp-token',layer);k={el:e,pos:null,cur:0,queue:[],t0:0,at:null,seg:null};tokens.set(p.pid,k);}
    k.el.style.setProperty('--c',p.color);k.el.textContent=p.name.slice(0,1).toUpperCase();k.el.title=p.name;k.seat=p.seat;
    k.el.classList.toggle('off',!p.online);k.el.classList.toggle('on',v.turn&&v.turn.pid===p.pid);
    // Новые клетки встают в очередь за теми, что фишка ещё не прошла: шаги идут подряд, без скачка.
    if(k.pos==null){k.pos=k.cur=p.pos;k.queue=[];}
    else if(p.pos!==k.pos){
      const d=(p.pos-k.pos+40)%40;
      if(d>0&&d<=12){if(!k.queue.length)k.t0=performance.now();for(let i=1;i<=d;i++)k.queue.push((k.pos+i)%40);}
      else{k.queue=[];k.cur=p.pos;}   // назад или далеко (участок, такси) — переносим сразу
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
function owners(){const o={};if(view&&view.tiles&&view.phase!=='lobby')for(const t of view.tiles)if(t.owner&&(t.type==='kiosk'||t.type==='biz')){const p=playerOf(t.owner);o[t.i]={pid:t.owner,color:p?p.color:'#6b5f52',name:p?p.name:'',mine:t.owner===PID};}
  // Режим обмена, вкладка «После»: поле перекрашено в будущих хозяев (m5-swapmap).
  if(swapUI&&swapUI.after){const a=swOwnersAfter(swapUI);for(const i of [...swapUI.give,...swapUI.get]){const p=playerOf(a[i]);if(p&&o[i])o[i]={pid:p.pid,color:p.color,name:p.name,mine:p.pid===PID};}}
  return o;}

// ---- события соперников: журнал, всплытие над клеткой, плашка «тебе заплатили» ----
function onEvt(from,e){
  if(!e||!view)return;const p=playerOf(from);if(!p)return;
  const mine=e.to===PID,amount=e.amount==null?null:Math.round(e.amount);
  try{dispatchEvent(new CustomEvent('mp:event',{detail:{kind:e.kind,who:p.name,color:p.color,text:e.text,amount,tile:e.tile==null?null:e.tile,mine}}));}catch(x){}
  if(e.kind==='lot'&&from!==PID&&e.tile!=null)lotAlert(e.tile);
  if(from!==PID){
    if(e.to&&amount&&(e.kind==='rent'||e.kind==='sale'))flyBetween(amount<0?from:e.to,amount<0?e.to:from,amount);
    // Событие соперника — в ленту слева (Андрей 03.10), на клетке — короткий пульс с иконкой.
    const big=mine&&['offer','sale','decline','hit','bid','won','bank','unsold','swap','swapcounter','swapped','swapdecline','swapvoid'].includes(e.kind);
    // Всё о сопернике — в ленту, и то, что задело тебя (плашка в центре гаснет через 2 с, в ленте можно дочитать).
    if(e.kind!=='scatter'&&!(e.kind==='insp'&&Array.isArray(e.drops)&&e.drops.length)&&e.text){
      const n=noteOf(p,e,mine,amount);
      feedAdd(p,/копилк/.test(e.text||'')?'bonus':e.kind,n.text,n.amount,mine||n.big,e.tile!=null?e.tile:null,n);
    }
  } else if(e.tile!=null&&amount)floatAt(e.tile,(amount>0?'+':'−')+money(Math.abs(amount)),amount>0?'#2f6b35':'#a92720');
  if(mine&&e.kind==='offer')plate(`💼 Предложение · ${p.name}`,0,e.text.replace(/^предлагает /,'')+' · ответ — в начале твоего хода');
  if(mine&&e.kind==='sale')plate(`🤝 ${p.name} согласился`,-amount,e.text.replace(/^продал /,'')+' теперь твоя');
  if(mine&&e.kind==='decline')plate(`✋ ${p.name} отказал`,0,'деньги вернулись из резерва');
  // Обмен на карте (m5-swapmap): «Геймплей» при MPSwap._ui своих плашек не ставит. Клетки в e.give/e.get — в системе автора (e.from).
  if(mine&&(e.kind==='swap'||e.kind==='swapcounter')&&Array.isArray(e.give)){const pay=e.pay||0;
    const ch=chainText(swapChains(e.from,PID,e.give,e.get));
    plate(`🔁 ${e.kind==='swap'?'Обмен':'Встречное'} · ${p.name}`,0,`твою ${cellsText(e.get)} на ${cellsText(e.give)}${pay?` · ${pay>0?`доплатит ${money(pay)}`:`просит ${money(-pay)}`}`:''}${ch} · ответ — в начале твоего хода`);}
  if(mine&&e.kind==='swapped'&&from!==PID)plate(`🔁 ${p.name} согласился на обмен`,0,`ты отдал ${cellsText(e.give)}, взял ${cellsText(e.get)}${chainText(swapChains(e.from,from,e.give,e.get))}`);
  if(mine&&e.kind==='swapdecline'&&from!==PID)plate(`✋ ${p.name} отказал в обмене`,0,e.pay>0?'доплата вернулась из резерва':'клетки остались у вас');
  if(mine&&e.kind==='swapvoid')plate('🔁 Обмен снят',0,'клетки сменили хозяина или ушли на торги'+(e.pay>0?' · доплата вернулась':''));
  // События стола (торги, удары из «Шанса», пропуски) — приходят всем, включая автора.
  const tileName=e.tile!=null&&S&&S.tiles&&S.tiles[e.tile]?titleOf(S.tiles[e.tile]):'клетка';
  if(e.kind==='hit'&&mine&&!(cardPlateAt[from]&&Date.now()-cardPlateAt[from]<5000))plate(`🎴 ${p.name}`,0,e.text);   // карта из руки уже показана своей плашкой
  if(e.kind==='skip'&&from===PID)plate('⏳ Пропуск хода',0,'карта соперника — ждёшь следующего круга');
  if(e.kind==='lot'&&from!==PID)plate(`🔨 Торги · ${p.name}`,0,`«${tileName}» от ${e.text.replace(/^.*от /,'')}`);
  if(e.kind==='bid'&&mine)plate(`🔨 Ставка · ${p.name}`,0,`${e.text.replace(/ на торгах$/,'')} за «${tileName}»`);
  if(e.kind==='won'&&from===PID)plate('🔨 Торги выиграны',amount,`«${tileName}» теперь твоя`);
  if(e.kind==='won'&&mine)plate(`🔨 Продано · ${p.name}`,e.paid||0,`«${tileName}»`);
  if(e.kind==='bank'&&mine)plate('🏦 Банк забрал',amount,`«${tileName}» — ставок не было`);
  if(e.kind==='unsold'&&mine)plate('🔨 Торги без ставок',0,`«${tileName}» осталась у тебя`);
  if(e.kind==='saleoffer'&&mine)plate(`🏷 ${p.name} продаёт`,0,e.text.replace(/^предлагает купить /,'')+' · ответ — в начале твоего хода');
  if(e.kind==='salebought'&&mine)plate(`🏷 ${p.name} купил`,0,e.text.replace(/^купил /,''));
  if(e.kind==='underdog'&&from!==PID)plate(`🤝 Пособие ${money(e.amount||0)} — ${p.name}`,0,'отстающему на старте');
  if(e.kind==='map')plate(`🗺 Карта · ${p.name}`,0,`хозяин стола ${e.text}`);
  if(e.kind==='chance'&&mine&&from!==PID){cardPlateAt[from]=Date.now();const m=String(e.text||'').match(/^(\S+)\s+([^:]+):/);plate(`🃏 ${p.name} сыграл «${m?m[2].trim():'карту'}» против тебя`,e.amount?-Math.abs(e.amount):0,String(e.text||'').replace(/^[^:]*:\s*/,''));}
  // Инкассатор соперника: монеты разлетаются по полю и у остальных — видно, куда легли (плейтест 01.10).
  if((e.kind==='scatter'||e.kind==='insp')&&from!==PID&&Array.isArray(e.drops)&&e.drops.length){
    // Разлёт и плашку показываем, когда фишка соперника ДОШЛА до клетки: не только цель (k.pos), но и анимация шагов
    // (очередь пуста, k.cur на клетке). Плейтест 4: k.pos ставился сразу по приходу вида — разлёт обгонял фишку на 2–3 с.
    (async()=>{for(let i=0;i<100;i++){const tk=tokens.get(from);if(!tk||tk.pos==null||(tk.pos===e.tile&&!tk.queue.length&&tk.cur===e.tile))break;await wait(100);}
      if(e.kind==='insp')feedAdd(p,'insp',e.text.replace(/^инспектор пришёл с проверкой: /,'инспектор проверяет: '),null,mine,e.tile);
      else{const n=noteOf(p,e,false,null);feedAdd(p,'scatter',n.text,null,true,e.tile);}   // «Вася попал на инкассатора — разлетелось $40» (плейтест 4)
      if(MobileHost.ready)MobileHost.request('scatter',{from:e.tile==null?0:e.tile,drops:e.drops},15000).catch(()=>{});})();
  }
}
// Деньги между игроками — монеты летят от фишки плательщика к фишке получателя в полосе (плейтест 01.10).
function chipAt(pid){const c=chipsEl.querySelector(`.mp-chip[data-pid="${CSS.escape(pid)}"]`);if(!c)return null;const r=c.getBoundingClientRect();return r.width?{x:r.left+r.width/2,y:r.top+r.height/2}:null;}
function flyBetween(from,to,amount){
  const a=chipAt(from),b=chipAt(to);if(!a||!b||!amount)return;
  try{fly('💵',a,b,flyN(Math.abs(amount)),{onDone:()=>{const c=chipsEl.querySelector(`.mp-chip[data-pid="${CSS.escape(to)}"]`);if(c&&c.animate)c.animate([{transform:'scale(1)'},{transform:'scale(.9,1.1)'},{transform:'scale(1.08,.94)'},{transform:'scale(1)'}],{duration:320,easing:'ease-out'});}});}catch(e){}
}
// Текст события по-человечески: «Андрей попал на твою клетку +$30», «Вася попал на инкассатора — разлетелось $40».
// ---- подпись обмена (backlog 03.10: «Лоток сладостей ↔ Лоток сладостей» читалось как бессмыслица) ----
// Клетка — номером (как «Шанс» 7, 22, 36 в правилах); одинаковые названия — один раз; итог цепочки у того, кто её собирает.
// В событии клетки в системе автора: give — его клетки (уходят второму), get — клетки второго (уходят автору).
const cellNo=i=>`№${i}`;
const cellsText=ids=>cellsTextFull(ids);
// Бот строит точку и в тот же ход предлагает её — у хозяина стола клетка ещё пустырь: пишем «новая точка».
const swapTitle=t=>sfIsLot(t)?'новая точка':titleOf(t);
function cellsTextFull(ids){ids=ids||[];if(!ids.length)return '';const ts=ids.map(i=>S.tiles[i]).filter(Boolean),names=[...new Set(ts.map(swapTitle))];
  return names.length===1?`${ids.map(cellNo).join(' и ')} «${names[0]}»`:ts.map(t=>`${cellNo(t.i)} «${swapTitle(t)}»`).join(' и ');}
function swapChains(author,other,give,get){
  const own={};toShared(S.tiles).forEach(t=>{if(t.owner&&(t.type==='kiosk'||t.type==='biz'))own[t.i]=t.owner;});
  (give||[]).forEach(i=>own[i]=other);(get||[]).forEach(i=>own[i]=author);
  const len=i=>{const o=own[i];if(!o)return 0;let n=1;for(let k=1;k<40&&own[(i-k+40)%40]===o;k++)n++;for(let k=1;k<40&&own[(i+k)%40]===o;k++)n++;return Math.min(n,40);};
  const best=(ids)=>Math.max(0,...(ids||[]).map(len));return {[other]:best(give),[author]:best(get)};}
function chainText(ch){const parts=Object.entries(ch).filter(([,n])=>n>=2).map(([pid,n])=>pid===PID?`у тебя цепочка из ${n}`:`цепочка из ${n} · ${nameOf(pid)}`);return parts.length?' → '+parts.join(', '):'';}
// Имена игроков не склоняются — имя ставим отдельно: «обмен · Саня-бот: …», «Макс-бот доплатит $50».
// Три части (backlog 03.10: 2↔2 обрезался троеточием): short — номера клеток, влезает в ленту; full — с названиями, по тапу;
// chain — итог цепочки, в ленте отдельной строкой и не обрезается никогда.
function swapText(e,emitter){
  const author=e.from,other=(e.kind==='swap'||e.kind==='swapcounter')?e.to:emitter,pay=e.pay||0;
  const chain=chainText(swapChains(author,other,e.give,e.get)).replace(/^ → /,'');
  // Все клетки обмена с одним названием — номера и название один раз: «№4 на №12, все «Лоток сладостей»».
  const all=[...(e.give||[]),...(e.get||[])].map(i=>S.tiles[i]).filter(Boolean),one=new Set(all.map(swapTitle)).size===1&&all.length>1;
  const full=ids=>one?ids.map(cellNo).join(' и '):cellsTextFull(ids),tail=one?`, ${all.length===2?'обе':'все'} «${swapTitle(all[0])}»`:'';
  const nums=ids=>(ids||[]).map(cellNo).join(', ');
  const payer=pay>0?author:other,payT=pay?` · ${payer===PID?'ты доплатишь':nameOf(payer)+' доплатит'} ${money(Math.abs(pay))}`:'';
  const with_=pid=>pid===PID?'с тобой':`· ${nameOf(pid)}`;
  const both=(f,c,sh)=>({full:f(full,tail),short:sh?sh(nums):f(nums,''),chain:c?chain:''});
  if(e.kind==='swapped')return both((C,t)=>`обменялся ${with_(author)}: отдал ${C(e.get)}, взял ${C(e.give)}${t}`,1,N=>`обменялся ${with_(author)}: ${N(e.get)} ⇄ ${N(e.give)}`);
  if(e.kind==='swapdecline')return both((C,t)=>`${author===PID?'отказал тебе в обмене':`отказал в обмене · ${nameOf(author)}`}: ${C(e.get)} на ${C(e.give)}${t}`,0,N=>`${author===PID?'отказал тебе':`отказал · ${nameOf(author)}`}: ${N(e.get)} ⇄ ${N(e.give)}`);
  if(e.kind==='swapvoid')return both((C,t)=>`обмен ${C(e.give)} на ${C(e.get)}${t} снят — клетки сменили хозяина`,0);
  const what=e.kind==='swapcounter'?'встречное':'обмен';
  return both((C,t)=>`${other===PID?`предлагает тебе ${what}`:`предлагает ${what} · ${nameOf(other)}`}: ${C(e.give)} на ${other===PID?'твою ':''}${C(e.get)}${t}${payT}`,1,
    N=>`${what} · ${other===PID?'тебе':nameOf(other)}: ${N(e.give)} ⇄ ${N(e.get)}${payT}`);
}
function noteOf(p,e,mine,amount){
  if(/^swap/.test(e.kind||'')&&Array.isArray(e.give)){const w=swapText(e,p.pid);return {text:w.short,full:w.full,chain:w.chain,amount:null};}
  const tile=e.tile!=null&&S&&S.tiles&&S.tiles[e.tile],where=tile?`«${titleOf(tile)}»`:'';
  if(e.kind==='rent')return mine?{text:`попал на твою клетку ${where}`,amount:Math.abs(amount||0)}:{text:`попал на клетку ${nameOf(e.to)} ${where}`,amount:-Math.abs(amount||0)};
  if(e.kind==='scatter')return {text:`попал на инкассатора — разлетелось ${e.cash?money(e.cash):'по клеткам'}`,amount:null};
  if(/копилк/.test(e.text||''))return {text:'забрал копилку стола',amount:Math.abs(amount||0),big:true};
  return {text:e.text,amount};
}
// Заметка у клетки: бумажный ярлык над клеткой, едет вместе с полем, гаснет через 3,5 с; про тебя — крупнее.
const notes=[];
// ---- лента событий соперников (Андрей 03.10: заметки над клетками «невозможно прочитать, плохо видно, быстро исчезают —
// пусть появляются в одном месте, с иконками типа события и цветом игрока»). Одна колонка слева под журналом, новое сверху,
// до трёх карточек; живут 7 с (про тебя — 9 с), пока открыто окно — время стоит. На клетке — только короткий пульс с той же иконкой.
const FEED_ICON={rent:'🏠',build:'🏗',upgrade:'⬆️',license:'📜',lot:'🔨',bid:'🔨',won:'🔨',unsold:'🔨',bank:'🏦',bankrupt:'🏦',loan:'🏦',
  offer:'💼',sale:'🤝',saleoffer:'🏷',salebought:'🏷',decline:'✋',chance:'🎴',hand:'🃏',hit:'🎴',skip:'⏳',jail:'🚔',fine:'👮',insp:'📋',
  scatter:'💰',minigame:'🎰',double:'🎲',pass:'🏁',bonus:'💵',underdog:'🤝',taxi:'🚕',swap:'🔁',swapcounter:'🔁',swapped:'🔁',
  swapdecline:'🔁',swapvoid:'🔁',map:'🗺'};
const FEED_MAX=3,FEED_LIFE=7000,FEED_LIFE_MINE=9000;
const ticker=el('div','mp-ticker mp-feed');ticker.id='mpTicker';
const feed=[];
function feedAdd(p,kind,text,amount,mine,tile,x){
  text=String(text||'').replace(/^[^\p{L}\p{N}«"]+/u,'');
  // Одна карта против тебя приходит двумя событиями (chance и hit) — в ленту одно.
  const key=p.pid+'|'+(kind==='hit'?'chance':kind),now=Date.now();if(feedAdd.last&&feedAdd.last.key===key&&now-feedAdd.last.t<4000&&(kind==='hit'||kind==='chance'))return;feedAdd.last={key,t:now};
  const icon=FEED_ICON[kind]||'•',n=el('div','mp-tick'+(mine?' mine':'')+(text.length>70?' long':''));n.style.setProperty('--c',p.color);
  const full=x&&x.full&&x.full!==text?x.full:'',chain=x&&x.chain||'';
  n.innerHTML=`<i>${esc(p.name.slice(0,1).toUpperCase())}</i><em>${icon}</em><span class="tx"><b>${esc(p.name)}</b> <span class="t">${esc(text)}</span>${full?'<u> ▾</u>':''}</span>${amount?`<strong class="${amount>0?'plus':'minus'}">${amount>0?'+':'−'}${money(Math.abs(amount))}</strong>`:''}${chain?`<small class="ch">→ ${esc(chain)}</small>`:''}`;
  if(chain)n.classList.add('has-ch');if(/^swap/.test(kind))n.classList.add('long');
  ticker.prepend(n);const it={el:n,age:0,life:mine?FEED_LIFE_MINE:FEED_LIFE};feed.unshift(it);
  while(feed.length>FEED_MAX){const o=feed.pop();o.el.remove();}
  // Тап: есть полный текст — раскрыть (и не гасить, пока раскрыто); второй тап — убрать прочитанное.
  n.onclick=()=>{if(full&&!n.classList.contains('open')){n.classList.add('open');n.querySelector('.t').textContent=full;const u=n.querySelector('u');u&&u.remove();it.age=0;it.hold=Date.now();return;}
    n.remove();const k=feed.indexOf(it);if(k>=0)feed.splice(k,1);};
  if(tile!=null&&MobileHost.ready)fieldPing(tile,p,icon);
  if(mine)try{navigator.vibrate&&navigator.vibrate(50);}catch(x){}
}
// Возраст считаем сами: под окном (лента скрыта) карточки не стареют, после закрытия окна их видно.
{let last=performance.now();setInterval(()=>{const now=performance.now(),dt=now-last;last=now;
  if(document.body.classList.contains('mp-modal')||document.hidden)return;
  for(const it of feed.slice()){if(it.hold&&now-it.hold<30000)continue;it.age+=dt;   // раскрытая держится до 30 сif(it.age>it.life-500&&!it.el.classList.contains('out'))it.el.classList.add('out');
    if(it.age>=it.life){it.el.remove();feed.splice(feed.indexOf(it),1);}}},200);}
// Пульс на клетке: где это случилось — без текста, его читают в ленте.
function fieldPing(tile,p,icon){
  const n=el('div','mp-ping',layer);n.style.setProperty('--c',p.color);n.innerHTML=`<b>${icon}</b>`;
  const it={el:n,tile,stack:0};notes.push(it);
  n.animate([{opacity:0,scale:.5},{opacity:1,scale:1.15,offset:.12},{opacity:1,scale:1,offset:.2},{opacity:1,offset:.8},{opacity:0,scale:.9}],{duration:2200,easing:'ease-out',fill:'forwards'})
    .finished.then(()=>{n.remove();notes.splice(notes.indexOf(it),1);},()=>{});
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
// Камера в чужой ход ведёт фишку того, кто ходит: поле само плавно держит в кадре точку между клетками
// ('focus' — src/board/main.js). Раньше — сдвигом 'pan' каждый кадр: камера дёргалась и уезжала по инерции.
let focusSent='',focusAt=0,rivalsSent='';
function followRival(now){
  let key='';
  const k=view&&view.phase==='play'&&!myTurn()&&MobileHost.ready&&tokens.get(view.turn.pid);
  if(k&&k.seg)key=k.seg.a+':'+k.seg.b+':'+k.seg.k.toFixed(2);
  if(key===focusSent||(key&&now-focusAt<40))return;
  focusSent=key;focusAt=now;
  try{MobileHost.send(key?{action:'focus',a:k.seg.a,b:k.seg.b,k:k.seg.k}:{action:'focus'});}catch(e){}
}
function frame(now){
  requestAnimationFrame(frame);
  const show=!!view&&view.phase!=='lobby'&&MobileHost.ready;
  layer.hidden=!show;
  if(!show)return;
  for(const [,k] of tokens){
    let p;
    // Отстала больше чем на 4 клетки — шагает быстрее, чтобы не копить отставание.
    const ms=k.queue.length>4?STEP_MS*.55:STEP_MS;
    if(k.queue.length&&now-k.t0>=ms){k.cur=k.queue.shift();k.t0=now;}
    if(k.queue.length){
      const q=Math.min(1,(now-k.t0)/ms),a=screenOfTile(k.cur),b=screenOfTile(k.queue[0]);
      p={x:a.x+(b.x-a.x)*q,y:a.y+(b.y-a.y)*q-Math.sin(Math.PI*q)*14};k.seg={a:k.cur,b:k.queue[0],k:q};
    } else {p=screenOfTile(k.cur||0);k.seg={a:k.cur||0,b:k.cur||0,k:0};}
    const x=p.x+(SEAT_DX[k.seat]||0),y=p.y+(SEAT_DY[k.seat]||0);k.at={x,y};
    k.el.style.transform=`translate(${x}px,${y}px)`;
  }
  for(const [,f] of flags){const p=screenOfTile(f.i);f.el.style.transform=`translate(${p.x}px,${p.y-26}px)`;}
  if(pick)for(const [i,r] of pick.rings){const p=screenOfTile(i);r.style.transform=`translate(${p.x}px,${p.y}px)`;}
  if(swapUI){for(const [i,r] of swapUI.rings){const q=screenOfTile(i);r.style.transform=`translate(${q.x}px,${q.y}px)`;}
    for(const c of swapUI.chains){const a=screenOfTile(c.a),b=screenOfTile(c.b);c.el.style.transform=`translate(${(a.x+b.x)/2}px,${(a.y+b.y)/2-18}px)`;}}
  for(const it of notes){const p=screenOfTile(it.tile);it.el.style.transform=`translate(${p.x}px,${p.y-30}px)`;}
  // Поле умеет рисовать фишки само (src/board/rivals.js) — отдаём ему, HTML-жетоны прячем: так буквы не лезут
  // поверх карточек и не дрожат при прокрутке (плейтест 02.10). Старое поле без этого — HTML, как раньше.
  const inScene=!!(MobileHost.sceneState&&MobileHost.sceneState.rivals);layer.classList.toggle('mp-in-scene',inScene);
  if(inScene){const list=[];for(const [pid,k] of tokens){const pl=playerOf(pid);if(!pl||!k.seg)continue;
      list.push({pid,color:pl.color,letter:pl.name.slice(0,1),a:k.seg.a,b:k.seg.b,k:Math.round(k.seg.k*100)/100,seat:k.seat||0,on:!!(view.turn&&view.turn.pid===pid),off:!pl.online});}
    const key=JSON.stringify(list);if(key!==rivalsSent){rivalsSent=key;try{MobileHost.send({action:'rivals',list});}catch(e){}}}
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
let lobbyKey='',rulesAuto=false;
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
      :`<div class="mp-seat empty" style="--c:${C.COLORS[i]}"><i></i><b>свободно</b><small>${C.COLOR_NAMES[i]}</small>${host&&window.MPBots?'<button type="button" class="mp-seat-bot">🤖 + Бот</button>':''}</div>`).join('')}</div>
    ${host?'':'<p class="mp-guest-note">🔒 Настраивает хозяин стола — ты видишь, что он выбрал</p>'}
    <div class="mp-set mp-set-map"><span>Карта<small>вид поля; клетки те же — хозяин может сменить и в партии</small></span><select class="mp-map-sel" ${host?'':'disabled'}>${C.BOARD_OPTIONS.map(([id,name])=>`<option value="${id}" ${id===(T.settings.boardMap||'sanfrancisco')?'selected':''}>${esc(name)}</option>`).join('')}</select></div>
    <div class="mp-set mp-set-win"><span>Как победить<small>${esc(C.winOf(T).text)}</small></span>${opt('win',C.WIN_OPTIONS.map(w=>w.id),T.settings.win,v=>esc((C.WIN_OPTIONS.find(w=>w.id===v)||{}).name||v))}</div>
    ${C.timed(T)?`<div class="mp-set mp-set-mode"><span>Длина партии<small>${C.modeOf(T)==='laps'?'кругов лидера; потом — последний раунд':'минут на всех; потом — последний раунд'}</small></span>${opt('mode',C.MODE_OPTIONS,C.modeOf(T),v=>v==='laps'?'По кругам':'По времени')}
      ${C.modeOf(T)==='laps'?opt('rounds',C.ROUND_OPTIONS,T.settings.rounds,v=>v+' кр.'):opt('minutes',C.MINUTE_OPTIONS,T.settings.minutes,v=>v+' мин')}</div>`
    :`<div class="mp-set mp-set-mode"><span>Темп миссии<small>лимита нет — от длины зависит порог: ${esc(C.winOf(T).text)}</small></span>${opt('mode',C.MODE_OPTIONS,T.settings.mode==='laps'?'laps':'time',v=>v==='laps'?'По кругам':'По времени')}
      ${T.settings.mode==='laps'?opt('rounds',C.ROUND_OPTIONS,T.settings.rounds,v=>v+' кр.'):opt('minutes',C.MINUTE_OPTIONS,T.settings.minutes,v=>v+' мин')}</div>`}
    <div class="mp-set"><span>Время на ход<small>${T.settings.turnSec?'мини-игра часы не тратит':'без лимита — ход передаётся кнопкой'}</small></span>${opt('turnSec',C.TURN_OPTIONS,T.settings.turnSec,v=>v?v+' с':'∞')}</div>
    <p class="mp-est">${n>=2?`${C.modeOf(T)==='time'?T.settings.minutes+' мин':C.modeOf(T)==='laps'?T.settings.rounds+' '+plural(T.settings.rounds,'круг','круга','кругов'):'без лимита'} на ${n} ${plural(n,'игрока','игроков','игроков')} · ${esc(C.winOf(T).name)}: ${esc(C.winOf(T).text)} · очерёдность разыграется случайно`:'Нужно минимум двое'}</p>
    ${window.MPRules?'<button class="sec mp-rules-btn" id="mpRulesBtn" type="button">📖 Как играть</button>':''}
    ${host?`<button class="mp-big" id="mpStart" ${C.canStart(T)?'':'disabled'}>Начать</button>`:'<p class="mp-lead mp-waithost">Ждём, когда хозяин стола начнёт…</p>'}
    <a class="mp-solo" href="?map=sf&mp${Q.has('mute')?'&mute':''}">Выйти</a>
    <p class="mp-ver ${verStale?'stale':''}">${verLine()}</p>`);
  lobby.querySelectorAll('.mp-seg button').forEach(b=>b.onclick=()=>{const k=b.parentNode.dataset.k,v=b.dataset.v;net.send({t:'settings',[k]:isNaN(+v)?v:+v});});
  lobby.querySelectorAll('.mp-kick').forEach(b=>b.onclick=()=>net.send({t:'kick',pid:b.dataset.pid}));
  {const ms=lobby.querySelector('.mp-map-sel');if(ms)ms.onchange=()=>net.send({t:'settings',boardMap:ms.value});}
  // «+ Бот» — прямо в пустом месте за столом, у хозяина любого стола (замечание Андрея 02.10); бота сажает mp-test.js.
  lobby.querySelectorAll('.mp-seat-bot').forEach(b=>b.onclick=()=>{if(window.MPBots)MPBots.add();});
  const st=$('mpStart');if(st){if(verStale)st.disabled=true;
    // Хозяин не начинает партию на старой версии (плейтест 5: стол открыли до выкладки и играли в исправленные баги).
    st.onclick=async()=>{st.disabled=true;await verCheck();if(verStale){toast('Вышла новая версия — перезагрузи страницу, потом начинай',3200);renderLobby(true);return;}net.send({t:'start'});};}
  {const rb=lobby.querySelector('.mp-ver-reload');if(rb)rb.onclick=()=>location.reload();}
  {const rb=$('mpRulesBtn');if(rb)rb.onclick=()=>MPRules.open();}
  // Правила — сами один раз на телефоне, когда впервые сел за стол (плейтест 01.10: «обучение перед партией»).
  // Хозяину сначала нужно позвать друзей — ему сама не открывается (плейтест 02.10); гостю — один раз.
  if(window.MPRules&&!rulesAuto&&!host){rulesAuto=true;setTimeout(()=>MPRules.once(),400);}
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
  const sub=r.why==='early'?`Досрочно — условие «${esc((v.win||{}).name||'')}» выполнено.`:r.finalBy==='time'||r.mode==='time'?`Время вышло${r.extended?' (после продления)':''}. Считаем, кто сильнейший.`:`${r.finalBy?esc(nameOf(r.finalBy))+' первым прошёл':'Пройдено'} ${laps} ${plural(laps,'круг','круга','кругов')}. Считаем, кто сильнейший.`;
  const canExtend=net&&net.host&&r.why!=='early'&&r.mode&&r.mode!=='none';
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
    <div class="mp-after" hidden>${net&&net.host?`${canExtend?`<button class="mp-big sec" id="mpExtend">⏱ Ещё время · +${r.mode==='laps'?C.EXTEND_LAPS+' '+plural(C.EXTEND_LAPS,'круг','круга','кругов'):C.EXTEND_MINUTES+' мин'}</button>`:''}<button class="mp-big" id="mpAgain">Ещё партию</button>`:'<p class="mp-lead mp-waithost">Хозяин стола может продлить партию или начать новую.</p>'}
    <a class="mp-solo" href="index.html?map=sf${Q.has('mute')?'&mute':''}">Играть одному</a></div>
    <button class="mp-skip" id="mpSkip">Пропустить ▸</button></div>`;
  over.hidden=false;
  const a=$('mpAgain');if(a)a.onclick=()=>net.send({t:'again'});
  {const x=$('mpExtend');if(x)x.onclick=()=>{x.disabled=true;net.send({t:'extend'});};}
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
async function shareLink(){const url=link();try{if(navigator.share){await navigator.share({title:'Америкэн бой — Сан-Франциско',text:`Садись за стол ${ROOM}`,url});return;}}catch(e){if(e&&e.name==='AbortError')return;}copy(url);}
window.MP_MARKET=(i,buyer)=>marketValue(S.tiles[i],buyer);
window.MP={marketValue:(i,buyer)=>marketValue(S.tiles[i],buyer),forcePrice:i=>forcePrice(S.tiles[i]),get view(){return view;},get pid(){return PID;},verCheck,get verStale(){return verStale;},finishTurn,rentOf:t=>rentOf(t),invested,owners,share:shareLink,extend:()=>net&&net.host&&net.send({t:'extend'})};
// ---- внутренности для ботов (на любом столе) и панели механик (только ?test=1) — web/mp-test.js ----
{
  window.__MP={test:TEST,
    get PID(){return PID;},set PID(v){PID=v;},get view(){return view;},set view(v){view=v;},get hub(){return hub;},get net(){return net;},get S(){return S;},
    adopt,onView,finishTurn,placeOffer,forceBuy,placeBid,startLot,mpChance,landedHere,isRival,invested,rentOf,forceReady,lotOn,myLots,
    roll:()=>prototypeRoll(),closeAll,closeMinigame,push,emit,dblCash,rollCash,titleOf,sellOf,baseInv,pairKey,
    setTurn(o){mine=!!o.mine;rolled=!!o.rolled;landed=!!o.landed;ending=false;autoEnding=false;credits=[];},
    get flags(){return {mine,rolled,landed,ending,curTurn};},set curTurn(n){curTurn=n;},
    C,MP_CHANCE,
  };
  // Заданный бросок из панели: window.MP_FORCE_DICE={a,b} — на один следующий бросок. Кубики кидает 3D-сцена,
  // поэтому просим её «учебный» бросок с нужными гранями, а результат отдаём как обычный.
  (function(){const base=mobileDice;mobileDice=async function(planned){const f=window.MP_FORCE_DICE;
    if(TEST&&f&&f.a>=1&&f.b>=1){window.MP_FORCE_DICE=null;const r=await base.call(this,{a:f.a|0,b:f.b|0,lesson:true});return Object.assign({},r,{a:f.a|0,b:f.b|0,lesson:false});}
    if(window.MPBots&&MPBots.instant()){const a=1+Math.floor(Math.random()*6),b=1+Math.floor(Math.random()*6);return {a,b,lesson:false};}   // мгновенный бот: без физики кубиков
    return base.apply(this,arguments);};})();
}
setTimeout(enter,0);
})();
