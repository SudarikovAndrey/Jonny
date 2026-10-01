// ===== Мультиплеер «Сан-Франциско» — правила стола без интерфейса (MPCore) =====
// Спек: черновики/америкэн-бой-мультиплеер.md. Чистые функции над состоянием стола T;
// их зовёт хозяин стола (web/mp.js) и тесты (tests/mp-core.test.cjs). Сети и DOM здесь нет.
(function(root){
'use strict';
const COLORS=['#A92720','#243F4B','#C99A32','#5E7A4A'];     // красный · синий · золото · зелёный (Style Bible)
const COLOR_NAMES=['красные','синие','золотые','зелёные'];
const MAX_PLAYERS=4, MIN_PLAYERS=2;
const DEFAULTS={rounds:25,turnSec:30};
const ROUND_OPTIONS=[15,25,40], TURN_OPTIONS=[20,30,45];
const TIMEOUT_GRACE_MS=10000;   // сколько ждём клиента после «время вышло», потом ход переходит сам
const CODE_ABC='ABCDEFGHJKLMNPQRSTUVWXYZ';                   // без I и O — не путаются с 1 и 0

function makeCode(rnd=Math.random){let s='';for(let i=0;i<4;i++)s+=CODE_ABC[Math.floor(rnd()*CODE_ABC.length)];return s;}
function normCode(s){return String(s||'').toUpperCase().replace(/[^A-Z]/g,'').slice(0,4);}
function clone(o){return o==null?o:JSON.parse(JSON.stringify(o));}

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
  T.players.push(p);T.players.sort((a,b)=>a.seat-b.seat);
  return {ok:true,player:p,rejoin:false};
}
function leave(T,pid){
  const p=T.players.find(x=>x.pid===pid);if(!p)return;
  if(T.phase==='lobby'){T.players=T.players.filter(x=>x.pid!==pid);return;}
  p.online=false;
}
function canStart(T){return T.phase==='lobby'&&T.players.length>=MIN_PLAYERS;}
// tiles — общее поле (владелец = pid), slice(p) — стартовый срез состояния игрока.
function start(T,tiles,slice,now){
  if(!canStart(T))return false;
  T.phase='play';T.match++;T.tiles=clone(tiles);T.applied={};T.result=null;T.log=[];
  T.players.forEach(p=>{p.s=slice(p);});
  T.turn={idx:0,pid:T.players[0].pid,n:1,round:1,rolled:false,landed:false,timedOut:false,endsAt:now+T.settings.turnSec*1000};
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
  if(pack.tiles)T.tiles=pack.tiles;
  for(const c of pack.credits||[]){
    if(!c||!c.id||T.applied[c.id])continue;
    const to=T.players.find(x=>x.pid===c.to);if(!to||!to.s)continue;
    to.s.cash=(to.s.cash||0)+(+c.cash||0);T.applied[c.id]=true;
    if(c.note)T.log.push(c.note);
  }
  if(pack.rolled&&!T.turn.rolled)T.turn.rolled=true;
  if(pack.landed&&!T.turn.landed){
    T.turn.landed=true;
    // Фишка встала — на окна остаётся не меньше половины хода (бросок с анимацией его не съедает).
    if(!T.turn.timedOut)T.turn.endsAt=Math.max(T.turn.endsAt,now+T.settings.turnSec*500);
  }
  if(T.log.length>40)T.log=T.log.slice(-40);
  return true;
}
function nextIdx(T,idx){return (idx+1)%T.players.length;}
function advance(T,now){
  if(T.phase!=='play')return;
  let idx=T.turn.idx,round=T.turn.round;
  idx=nextIdx(T,idx);if(idx===0)round++;
  if(round>T.settings.rounds){finish(T,'rounds');return;}
  T.turn={idx,pid:T.players[idx].pid,n:T.turn.n+1,round,rolled:false,landed:false,timedOut:false,endsAt:now+T.settings.turnSec*1000};
  skipOffline(T,now);
}
// Отвалившегося пропускаем сразу, остальные его не ждут. Все офлайн — стол стоит.
function skipOffline(T,now){
  let guard=0;
  while(T.phase==='play'&&!active(T).online&&T.players.some(p=>p.online)&&guard++<T.players.length*2){
    let idx=nextIdx(T,T.turn.idx),round=T.turn.round;if(idx===0)round++;
    if(round>T.settings.rounds){finish(T,'rounds');return;}
    T.turn={idx,pid:T.players[idx].pid,n:T.turn.n+1,round,rolled:false,landed:false,timedOut:false,endsAt:now+T.settings.turnSec*1000};
  }
}
function endTurn(T,pid,n,now){
  if(T.phase!=='play'||T.turn.pid!==pid||(n!=null&&n!==T.turn.n))return false;
  advance(T,now);return true;
}
// Часы хозяина стола. Возвращает, что сделать: 'timeout' — сказать игроку, что время вышло;
// 'advanced' — ход перешёл сам (игрок молчит или офлайн).
function tick(T,now){
  if(T.phase!=='play'||!T.turn)return null;
  const p=active(T);
  if(!p.online){advance(T,now);return 'advanced';}
  if(now<T.turn.endsAt)return null;
  if(!T.turn.timedOut){T.turn.timedOut=true;T.turn.endsAt=now+TIMEOUT_GRACE_MS;return 'timeout';}
  advance(T,now);return 'advanced';
}

// ---- Сила игрока ----
// valuer(tile) → {inv, goods}: вложено в клетку и товар в ней по цене продажи. Считает mp.js
// формулами движка; здесь только сумма.
function capital(T,pid,valuer){
  const p=T.players.find(x=>x.pid===pid);const cash=Math.round(p&&p.s?p.s.cash||0:0);
  let inv=0,goods=0,points=0;
  for(const t of T.tiles||[]){if(t.owner!==pid)continue;const v=valuer(t,pid)||{};inv+=v.inv||0;goods+=v.goods||0;if(t.type==='kiosk')points++;}
  if(valuer.extra&&p)inv+=valuer.extra(p)||0;              // вложенное вне клеток (лицензии)
  inv=Math.round(inv);goods=Math.round(goods);
  return {cash,inv,goods,points,total:cash+inv+goods};
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
  T.phase='over';T.result={why,winner:winner||null,round:T.turn?Math.min(T.turn.round,T.settings.rounds):0};
}
function backToLobby(T){
  T.phase='lobby';T.tiles=null;T.turn=null;T.result=null;T.applied={};
  T.players=T.players.filter(p=>p.online);T.players.forEach(p=>{p.s=null;});
}
// Что уходит конкретному игроку: общее поле, публичные сводки всех и полный срез его самого.
function viewFor(T,pid,valuer){
  const me=T.players.find(p=>p.pid===pid);
  return {room:T.room,host:T.hostPid||null,phase:T.phase,settings:T.settings,match:T.match,turn:T.turn,result:T.result,
    tiles:T.tiles,log:T.log.slice(-6),
    players:T.players.map(p=>({pid:p.pid,name:p.name,seat:p.seat,color:p.color,online:p.online,
      pos:p.s?p.s.pos:0,jail:p.s?p.s.jail||0:0,cash:p.s?Math.round(p.s.cash||0):0,
      cap:T.tiles&&valuer?capital(T,p.pid,valuer):null,chain:T.tiles?sfChain(T,p.pid):null})),
    mine:me&&me.s?me.s:null};
}

const api={COLORS,COLOR_NAMES,MAX_PLAYERS,MIN_PLAYERS,DEFAULTS,ROUND_OPTIONS,TURN_OPTIONS,TIMEOUT_GRACE_MS,
  makeCode,normCode,newTable,join,leave,canStart,start,active,applyState,advance,endTurn,tick,
  capital,ranking,sfChain,checkEarly,finish,backToLobby,viewFor};
root.MPCore=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
