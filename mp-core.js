// ===== Мультиплеер «Сан-Франциско» — правила стола без интерфейса (MPCore) =====
// Спек: черновики/америкэн-бой-мультиплеер.md. Чистые функции над состоянием стола T;
// их зовёт хозяин стола (web/mp.js) и тесты (tests/mp-core.test.cjs). Сети и DOM здесь нет.
(function(root){
'use strict';
const COLORS=['#A92720','#243F4B','#C99A32','#5E7A4A'];     // красный · синий · золото · зелёный (Style Bible)
const COLOR_NAMES=['красные','синие','золотые','зелёные'];
const MAX_PLAYERS=4, MIN_PLAYERS=2;
// rounds — длина партии в проходах через старт (решение продюсера 01.10: «проходы через старт = круги»).
const DEFAULTS={rounds:25,turnSec:60,autoRounds:true};
// Плейтест 01.10: 25 кругов показались очень короткой партией, на ход в 30 с не хватало времени.
// 0 — «∞ без лимита» (плейтест 01.10): ход передаётся только кнопкой, таймера нет.
const ROUND_OPTIONS=[25,50,100,200,500], TURN_OPTIONS=[30,45,60,90,0];
const PAUSE_MAX_MS=180000;      // мини-игра останавливает часы хода, но не дольше 3 минут
const RESUME_MIN_MS=10000;      // после мини-игры на окна остаётся хотя бы 10 с
const TIMEOUT_GRACE_MS=10000;   // сколько ждём клиента после «время вышло», потом ход переходит сам
const CODE_ABC='ABCDEFGHJKLMNPQRSTUVWXYZ';                   // без I и O — не путаются с 1 и 0

function makeCode(rnd=Math.random){let s='';for(let i=0;i<4;i++)s+=CODE_ABC[Math.floor(rnd()*CODE_ABC.length)];return s;}
function normCode(s){return String(s||'').toUpperCase().replace(/[^A-Z]/g,'').slice(0,4);}
function clone(o){return o==null?o:JSON.parse(JSON.stringify(o));}
const limitless=T=>!(T.settings.turnSec>0);
const deadline=(T,now,ms)=>limitless(T)?null:now+ms;

// Длина по умолчанию — 25 проходов старта (≈150 бросков на игрока; прогон «Геймплея»: 100 раундов ≈ 17 кругов
// на двоих — уже полная партия). Пока хозяин сам не выбрал длину — подстраивается под число игроков.
function autoRounds(T){if(T.settings.autoRounds!==false)T.settings.rounds=25;}
const lapsOf=p=>(p&&p.s&&p.s.laps)||0;
const ROUND_CAP=40;             // страховка: стол не идёт дольше 40 раундов на каждый требуемый круг
function setRounds(T,rounds){if(!ROUND_OPTIONS.includes(+rounds))return false;T.settings.rounds=+rounds;T.settings.autoRounds=false;return true;}
function newTable(room,settings){
  return {room,phase:'lobby',settings:Object.assign({},DEFAULTS,settings||{}),players:[],tiles:null,
          turn:null,applied:{},result:null,match:0,log:[]};
}
// Садится за стол или возвращается на своё место. Вернувшегося узнаём по pid, а если вкладку
// закрыли и pid потерян — по имени среди отвалившихся.
function join(T,pid,name){
  name=String(name||'').trim().slice(0,16)||'Игрок';
  let p=T.players.find(x=>x.pid===pid);
  if(!p&&T.phase!=='lobby')p=T.players.find(x=>!x.online&&x.name===name);
  if(p){p.online=true;p.seenAt=0;if(T.phase==='lobby')p.name=name;return {ok:true,player:p,rejoin:true};}
  if(T.phase!=='lobby')return {ok:false,error:'started'};
  if(T.players.length>=MAX_PLAYERS)return {ok:false,error:'full'};
  const used=new Set(T.players.map(x=>x.seat));let seat=0;while(used.has(seat))seat++;
  p={pid,name,seat,color:COLORS[seat],online:true,s:null};
  T.players.push(p);T.players.sort((a,b)=>a.seat-b.seat);autoRounds(T);
  return {ok:true,player:p,rejoin:false};
}
function leave(T,pid){
  const p=T.players.find(x=>x.pid===pid);if(!p)return;
  if(T.phase==='lobby'){T.players=T.players.filter(x=>x.pid!==pid);autoRounds(T);return;}
  p.online=false;
}
function canStart(T){return T.phase==='lobby'&&T.players.length>=MIN_PLAYERS;}
// tiles — общее поле (владелец = pid), slice(p) — стартовый срез состояния игрока.
function start(T,tiles,slice,now){
  if(!canStart(T))return false;
  T.phase='play';T.match++;T.startedAt=now;T.finalRound=null;T.finalBy=null;T.tiles=clone(tiles);T.applied={};T.result=null;T.log=[];
  T.players.forEach(p=>{p.s=slice(p);});
  T.paused=null;
  T.turn={idx:0,pid:T.players[0].pid,n:1,round:1,rolled:false,landed:false,timedOut:false,endsAt:deadline(T,now,T.settings.turnSec*1000)};
  skipOffline(T,now);
  return true;
}
function active(T){return T.turn?T.players.find(p=>p.pid===T.turn.pid):null;}
// Только игрок, чей ход, пишет состояние: свой срез, общее поле и проводки соперникам.
function applyState(T,pid,pack,now){
  if(T.phase!=='play'||!T.turn||T.turn.pid!==pid||!pack)return false;
  if(pack.n!=null&&pack.n!==T.turn.n)return false;           // запоздалый пакет прошлого хода
  const p=active(T);
  if(pack.s)p.s=pack.s;
  // Кто-то первым прошёл старт в N-й раз — доигрываем текущий раунд стола (у всех поровну ходов) и считаем итог.
  if(!T.finalRound&&lapsOf(p)>=T.settings.rounds){T.finalRound=T.turn.round;T.finalBy=p.pid;}
  if(pack.tiles)T.tiles=pack.tiles;
  for(const c of pack.credits||[]){
    if(!c||!c.id||T.applied[c.id])continue;
    const to=T.players.find(x=>x.pid===c.to);if(!to||!to.s)continue;
    to.s.cash=(to.s.cash||0)+(+c.cash||0);T.applied[c.id]=true;
    // Резерв под предложение о покупке: при отказе деньги возвращаются в нал, при согласии резерв просто снимается.
    if(+c.escrow)to.s.mpEscrow=Math.max(0,(to.s.mpEscrow||0)+(+c.escrow));
    if(c.note)T.log.push(c.note);
  }
  if(pack.rolled&&!T.turn.rolled)T.turn.rolled=true;
  if(pack.landed&&!T.turn.landed&&!T.turn.paused){
    T.turn.landed=true;
    // Фишка встала — на окна остаётся не меньше половины хода (бросок с анимацией его не съедает).
    if(!T.turn.timedOut&&T.turn.endsAt!=null){const add=now+T.settings.turnSec*500;if(T.paused)T.paused.left=Math.max(T.paused.left||0,add-now);else T.turn.endsAt=Math.max(T.turn.endsAt,add);}
  }
  if(T.log.length>40)T.log=T.log.slice(-40);
  return true;
}
// Мини-игра (бандит, 21…) останавливает часы хода: «за 30 секунд я должен быстро тыкать — фатально».
function pause(T,pid,on,now){
  if(T.phase!=='play'||!T.turn||T.turn.pid!==pid)return false;
  const t=T.turn;
  if(on===!!t.paused)return false;
  if(t.endsAt==null&&!T.paused){t.paused=on;return true;}               // без лимита: только отметка «в мини-игре»
  // Стол на ручной паузе — часы и так стоят; двигаем отложенный остаток, а не дедлайн.
  if(T.paused){
    if(on){t.paused=true;t.left=T.paused.left;T.paused.left=T.paused.left==null?null:PAUSE_MAX_MS;}
    else{t.paused=false;if(T.paused.left!=null)T.paused.left=Math.max(RESUME_MIN_MS,t.left||0);delete t.left;}
    return true;
  }
  if(on){t.paused=true;t.left=Math.max(0,t.endsAt-now);t.endsAt=now+PAUSE_MAX_MS;return true;}
  t.paused=false;t.endsAt=now+Math.max(RESUME_MIN_MS,t.left||0);delete t.left;return true;
}
// Ручная пауза (плейтест 01.10): ставит и снимает любой игрок в любой момент; часы стоят у всех,
// отвалившихся на паузе не пропускают. Живёт в T, поэтому переживает перезагрузку хозяина.
function tablePause(T,pid,on,now,name){
  if(T.phase!=='play')return false;
  if(on){if(T.paused)return false;T.paused={by:pid,name:name||'',left:T.turn&&T.turn.endsAt!=null?Math.max(0,T.turn.endsAt-now):null};return true;}
  if(!T.paused)return false;
  if(T.turn&&T.paused.left!=null)T.turn.endsAt=now+Math.max(RESUME_MIN_MS,T.paused.left);
  T.paused=null;return true;
}
function nextIdx(T,idx){return (idx+1)%T.players.length;}
function advance(T,now){
  if(T.phase!=='play')return;
  let idx=T.turn.idx,round=T.turn.round;
  idx=nextIdx(T,idx);if(idx===0)round++;
  if(round>T.turn.round&&(T.finalRound||round>T.settings.rounds*ROUND_CAP)){finish(T,'rounds');return;}
  T.turn={idx,pid:T.players[idx].pid,n:T.turn.n+1,round,rolled:false,landed:false,timedOut:false,endsAt:deadline(T,now,T.settings.turnSec*1000)};
  skipOffline(T,now);
}
// Отвалившегося пропускаем сразу, остальные его не ждут. Все офлайн — стол стоит.
function skipOffline(T,now){
  let guard=0;
  while(T.phase==='play'&&!active(T).online&&T.players.some(p=>p.online)&&guard++<T.players.length*2){
    let idx=nextIdx(T,T.turn.idx),round=T.turn.round;if(idx===0)round++;
    if(round>T.turn.round&&(T.finalRound||round>T.settings.rounds*ROUND_CAP)){finish(T,'rounds');return;}
    T.turn={idx,pid:T.players[idx].pid,n:T.turn.n+1,round,rolled:false,landed:false,timedOut:false,endsAt:deadline(T,now,T.settings.turnSec*1000)};
  }
}
function endTurn(T,pid,n,now){
  if(T.phase!=='play'||T.turn.pid!==pid||(n!=null&&n!==T.turn.n))return false;
  advance(T,now);return true;
}
// Часы хозяина стола. Возвращает, что сделать: 'timeout' — сказать игроку, что время вышло;
// 'advanced' — ход перешёл сам (игрок молчит или офлайн).
function tick(T,now){
  if(T.phase!=='play'||!T.turn||T.paused)return null;
  const p=active(T);
  if(!p.online){advance(T,now);return 'advanced';}
  if(T.turn.endsAt==null||now<T.turn.endsAt)return null;
  if(!T.turn.timedOut){T.turn.timedOut=true;T.turn.endsAt=now+TIMEOUT_GRACE_MS;return 'timeout';}
  advance(T,now);return 'advanced';
}

// ---- Сила игрока ----
// valuer(tile) → {inv, goods}: вложено в клетку и товар в ней по цене продажи. Считает mp.js
// формулами движка; здесь только сумма.
// Раскладка для полосы игроков и итогового шоу: точки и бизнесы (вложено, уровни), лицензии,
// товар, нал и долг. Кредит — пассив: на плейтесте игрок с кредитом вышел «сильнейшим».
function capital(T,pid,valuer){
  const p=T.players.find(x=>x.pid===pid);const cash=Math.round(p&&p.s?(p.s.cash||0)+(p.s.mpEscrow||0):0);   // резерв под предложение — те же деньги
  let ptsInv=0,bizInv=0,goods=0,points=0,biz=0,levels=0;
  for(const t of T.tiles||[]){if(t.owner!==pid)continue;const v=valuer(t,pid)||{};goods+=v.goods||0;
    if(t.type==='biz'){biz++;bizInv+=v.inv||0;levels+=t.level||1;}else{points++;ptsInv+=v.inv||0;levels+=t.salesLvl||1;}}
  const lic=Math.round(valuer.extra&&p?valuer.extra(p)||0:0);              // вложенное вне клеток (лицензии)
  const debt=Math.round(valuer.debt&&p?valuer.debt(p)||0:0);               // кредиты банка, остаток долга
  ptsInv=Math.round(ptsInv);bizInv=Math.round(bizInv);goods=Math.round(goods);
  const inv=ptsInv+bizInv+lic;
  return {cash,inv,ptsInv,bizInv,lic,goods,debt,points,biz,levels,total:cash+inv+goods-debt};
}
function ranking(T,valuer){
  return T.players.map(p=>Object.assign({pid:p.pid,name:p.name,seat:p.seat,color:p.color},capital(T,p.pid,valuer)))
    .sort((a,b)=>b.total-a.total||b.cash-a.cash||a.seat-b.seat);
}
// Досрочная победа: цепочка Сан-Франциско — обе лицензии и 3 точки техники.
const TECH=['tape','vcr'];
function sfChain(T,pid,techPoints=3){
  const p=T.players.find(x=>x.pid===pid);const lic=(p&&p.s&&p.s.sf&&p.s.sf.lic)||{};
  const tech=(T.tiles||[]).filter(t=>t.owner===pid&&t.type==='kiosk'&&TECH.includes(t.base)).length;
  return {clothes:!!lic.clothes,tech:!!lic.tech,techPoints:Math.min(tech,techPoints),goal:techPoints,
          done:!!lic.clothes&&!!lic.tech&&tech>=techPoints};
}
function checkEarly(T){
  if(T.phase!=='play')return null;
  const w=T.players.find(p=>sfChain(T,p.pid).done);
  if(w){finish(T,'early',w.pid);return w.pid;}
  return null;
}
function finish(T,why,winner){
  T.phase='over';T.paused=null;
  const laps=Math.max(0,...T.players.map(lapsOf));
  T.result={why,winner:winner||null,round:T.turn?T.turn.round:0,laps,finalBy:T.finalBy||null};
}
function backToLobby(T){
  T.phase='lobby';T.paused=null;T.tiles=null;T.turn=null;T.result=null;T.applied={};
  T.players=T.players.filter(p=>p.online);T.players.forEach(p=>{p.s=null;});autoRounds(T);
}
// Что уходит конкретному игроку: общее поле, публичные сводки всех и полный срез его самого.
function viewFor(T,pid,valuer){
  const me=T.players.find(p=>p.pid===pid);
  return {room:T.room,host:T.hostPid||null,paused:T.paused||null,finalRound:T.finalRound||null,finalBy:T.finalBy||null,phase:T.phase,settings:T.settings,match:T.match,startedAt:T.startedAt||null,turn:T.turn,result:T.result,
    tiles:T.tiles,log:T.log.slice(-6),
    players:T.players.map(p=>({pid:p.pid,name:p.name,seat:p.seat,color:p.color,online:p.online,
      pos:p.s?p.s.pos:0,laps:p.s?p.s.laps||0:0,jail:p.s?p.s.jail||0:0,cash:p.s?Math.round(p.s.cash||0):0,
      cap:T.tiles&&valuer?capital(T,p.pid,valuer):null,chain:T.tiles?sfChain(T,p.pid):null})),
    mine:me&&me.s?me.s:null};
}

const api={COLORS,COLOR_NAMES,MAX_PLAYERS,MIN_PLAYERS,DEFAULTS,ROUND_OPTIONS,TURN_OPTIONS,TIMEOUT_GRACE_MS,
  PAUSE_MAX_MS,RESUME_MIN_MS,autoRounds,setRounds,makeCode,normCode,newTable,join,leave,canStart,start,active,applyState,pause,tablePause,advance,endTurn,tick,
  capital,ranking,sfChain,checkEarly,finish,backToLobby,viewFor};
root.MPCore=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
