// ===== Мультиплеер «Сан-Франциско» — правила стола без интерфейса (MPCore) =====
// Спек: черновики/америкэн-бой-мультиплеер.md. Чистые функции над состоянием стола T;
// их зовёт хозяин стола (web/mp.js) и тесты (tests/mp-core.test.cjs). Сети и DOM здесь нет.
(function(root){
'use strict';
const COLORS=['#A92720','#243F4B','#C99A32','#5E7A4A'];     // красный · синий · золото · зелёный (Style Bible)
const COLOR_NAMES=['красные','синие','золотые','зелёные'];
const MAX_PLAYERS=4, MIN_PLAYERS=2;
// rounds — длина партии в проходах через старт (решение продюсера 01.10: «проходы через старт = круги»).
// Плейтест 01.10 (второй): длина партии — по времени, 15…30 минут (решение продюсера): кругов 25…500 было слишком много.
// rounds остаётся страховочным потолком раундов стола. win — условие победы, показывается в лобби и в партии.
const DEFAULTS={rounds:25,turnSec:60,autoRounds:true,minutes:20,win:'capital'};
const MINUTE_OPTIONS=[15,20,25,30];
// Условия победы (решение продюсера 01.10: выбираются на старте, видны всем). Параметры — в goal.
const WIN_OPTIONS=[
  {id:'capital',name:'Богатейший',text:'Когда время выйдет, побеждает самый большой капитал: нал, вложения и товар минус долги.'},
  {id:'cash',name:'Первый миллионер',text:'Первый, у кого на руках $10 000 наличными, побеждает сразу.',goal:10000},
  {id:'chain',name:'Король техники',text:'Первый, кто купил обе лицензии и построил 3 точки техники, побеждает сразу.',goal:3},
  {id:'city',name:'Весь город',text:'Первый, кто обеспечил город всеми 6 категориями товара и держит 2 бизнеса, побеждает сразу.',goal:6},
  {id:'empire',name:'Империя',text:'Первый, у кого 10 владений (точки и бизнесы вместе), побеждает сразу.',goal:10},
  {id:'rent',name:'Рантье',text:'Первый, кто собрал $3 000 рентой с соперников, побеждает сразу.',goal:3000},
];
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
function setMinutes(T,m){if(!MINUTE_OPTIONS.includes(+m))return false;T.settings.minutes=+m;return true;}
function setWin(T,id){if(!WIN_OPTIONS.some(w=>w.id===id))return false;T.settings.win=id;return true;}
const winOf=T=>WIN_OPTIONS.find(w=>w.id===(T.settings&&T.settings.win))||WIN_OPTIONS[0];
function newTable(room,settings){
  return {room,phase:'lobby',settings:Object.assign({},DEFAULTS,settings||{}),players:[],tiles:null,
          turn:null,applied:{},result:null,match:0,log:[],pot:0,rent:{},lots:[],events:[],evSeq:0};
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
  T.pot=0;T.rent={};T.lots=[];T.events=[];T.evSeq=0;T.deadline=now+(T.settings.minutes||DEFAULTS.minutes)*60000;   // часы партии — у хозяина стола
  T.players.forEach(p=>{p.s=slice(p);p.skip=0;});
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
  if(pack.tiles)T.tiles=mergeTiles(T.tiles,pack.tiles,pid,pack.credits||[]);
  for(const c of pack.credits||[]){
    if(!c||!c.id||T.applied[c.id])continue;
    // Общая копилка стола (решение продюсера 01.10): штрафы всех — в одну; забирает тот, кто встал (нал уже в его срезе).
    if(+c.pot){T.pot=Math.max(0,(T.pot||0)+Math.round(+c.pot));T.applied[c.id]=true;continue;}   // минус — карта «Шанса» забрала часть копилки
    if(c.potTake){T.pot=0;T.applied[c.id]=true;continue;}
    const to=T.players.find(x=>x.pid===c.to);if(!to||!to.s)continue;
    to.s.cash=(to.s.cash||0)+(+c.cash||0);T.applied[c.id]=true;
    if(c.rent&&+c.cash>0)T.rent[c.to]=(T.rent[c.to]||0)+(+c.cash);           // сколько ренты собрал — для условия «Рантье»
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
// Поле от активного игрока принимается только в его зоне: свои клетки, свободные (стройка) и drop/insp на чужих.
// Иначе игрок с устаревшим полем (ушёл в фон, пропустил виды) стирал чужие покупки — «у Макса пропали точки».
// Исключения на чужой клетке («Интерфейс», 01.10): своё предложение о покупке (поставил или забрал резерв) и выкуп ×10 —
// клетка переходит, только если в этом же пакете есть проводка старому хозяину с пометкой force за эту клетку.
function mergeTiles(cur,next,pid,credits){
  if(!cur||!Array.isArray(next))return next;
  return cur.map((t,i)=>{const n=next[i];if(!n)return t;
    if(!t.owner||t.owner===pid)return n;                         // свободная или своя — верим целиком
    if(n.owner===pid&&(credits||[]).some(c=>c&&c.force&&c.tile===i&&c.to===t.owner&&+c.cash>0))return n;   // выкуп ×10 оплачен
    const o=Object.assign({},t);if('drop' in n)o.drop=n.drop;if('insp' in n)o.insp=n.insp;   // чужая: только находки и проверки
    if(n.mpOffer&&n.mpOffer.from===pid)o.mpOffer=n.mpOffer;                                    // своё предложение хозяину
    else if(t.mpOffer&&t.mpOffer.from===pid&&!n.mpOffer)delete o.mpOffer;                     // забрал резерв / отозвал
    return o;});
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
  if(on){if(T.paused)return false;T.paused={by:pid,name:name||'',at:now,left:T.turn&&T.turn.endsAt!=null?Math.max(0,T.turn.endsAt-now):null};return true;}
  if(!T.paused)return false;
  if(T.turn&&T.paused.left!=null)T.turn.endsAt=now+Math.max(RESUME_MIN_MS,T.paused.left);
  if(T.deadline&&T.paused.at!=null)T.deadline+=Math.max(0,now-T.paused.at);   // часы партии на паузе стоят
  T.paused=null;return true;
}
function nextIdx(T,idx){return (idx+1)%T.players.length;}
function advance(T,now){
  if(T.phase!=='play')return;
  let guard=0;
  while(guard++<T.players.length*2){
    let idx=T.turn.idx,round=T.turn.round;
    idx=nextIdx(T,idx);if(idx===0)round++;
    if(round>T.turn.round&&(T.finalRound||round>T.settings.rounds*ROUND_CAP)){finish(T,'rounds');return;}
    T.turn={idx,pid:T.players[idx].pid,n:T.turn.n+1,round,rolled:false,landed:false,timedOut:false,endsAt:deadline(T,now,T.settings.turnSec*1000)};
    resolveLots(T);
    const p=active(T);
    // Карта «Шанса» соперника: пропуск хода. Отвалившегося не считаем — его и так пропустят.
    if(p.skip>0&&p.online){p.skip--;event(T,{from:p.pid,kind:'skip',text:'пропускает ход',amount:null,tile:null,to:p.pid});continue;}
    break;
  }
  skipOffline(T,now);
}
// Отвалившегося пропускаем сразу, остальные его не ждут. Все офлайн — стол стоит.
function skipOffline(T,now){
  let guard=0;
  while(T.phase==='play'&&!active(T).online&&T.players.some(p=>p.online)&&guard++<T.players.length*2){
    let idx=nextIdx(T,T.turn.idx),round=T.turn.round;if(idx===0)round++;
    if(round>T.turn.round&&(T.finalRound||round>T.settings.rounds*ROUND_CAP)){finish(T,'rounds');return;}
    T.turn={idx,pid:T.players[idx].pid,n:T.turn.n+1,round,rolled:false,landed:false,timedOut:false,endsAt:deadline(T,now,T.settings.turnSec*1000)};
    resolveLots(T);
  }
}

// ---- События стола для всех клиентов (торги, удары, пропуски): клиент показывает те, чей id больше виденного ----
function event(T,e){T.evSeq=(T.evSeq||0)+1;(T.events=T.events||[]).push(Object.assign({id:T.evSeq,n:T.turn?T.turn.n:0},e));if(T.events.length>24)T.events=T.events.slice(-24);return e;}
const pnameOf=(T,pid)=>(T.players.find(p=>p.pid===pid)||{}).name||'соперник';

// ---- Торги (решение продюсера 01.10, второй плейтест): свою клетку можно выставить соперникам; банкрот обязан ----
// Лот живёт до следующего хода продавца (все остальные успевают сделать ставку в свой ход или между ходами).
// Ставка — только выше текущей и не больше, чем нал минус уже лидирующие ставки игрока. Деньги не резервируются:
// победитель платит при закрытии, даже в минус (тогда действует правило банкротства).
// lotApi.baseInv(t) — вложено по ценам движка, lotApi.toLot(t) — клетка снова пустырь; задаёт хозяин стола (mp.js).
const lotApi={baseInv:null,toLot:null};
function listLot(T,pid,tile,min,kind){
  if(T.phase!=='play'||!T.turn||T.turn.pid!==pid)return null;
  const t=T.tiles&&T.tiles[tile];if(!t||t.owner!==pid||!(t.type==='kiosk'||t.type==='biz'))return null;
  if((T.lots||[]).some(l=>l.tile===tile))return null;
  min=Math.max(1,Math.round(+min||0));
  const lot={id:`lot:${T.match}:${T.turn.n}:${tile}`,tile,seller:pid,kind:kind==='bankrupt'?'bankrupt':'sale',min,best:0,bestBy:null,bids:{},startN:T.turn.n,endsN:T.turn.n+T.players.length};
  (T.lots=T.lots||[]).push(lot);
  event(T,{from:pid,kind:'lot',text:lot.kind==='bankrupt'?`выставил клетку на торги за долги, от $${min}`:`выставил клетку на торги, от $${min}`,amount:null,tile,to:null,lot:lot.id});
  return lot;
}
function bid(T,pid,lotId,amount){
  const lot=(T.lots||[]).find(l=>l.id===lotId);if(!lot||lot.seller===pid||T.phase!=='play')return false;
  const p=T.players.find(x=>x.pid===pid);if(!p||!p.s)return false;
  amount=Math.round(+amount||0);
  if(amount<lot.min||amount<=lot.best)return false;
  const committed=(T.lots||[]).filter(l=>l!==lot&&l.bestBy===pid).reduce((a,l)=>a+l.best,0);
  if((p.s.cash||0)-committed<amount)return false;
  lot.best=amount;lot.bestBy=pid;lot.bids[pid]=amount;
  event(T,{from:pid,kind:'bid',text:`ставка $${amount} на торгах`,amount:null,tile:lot.tile,to:lot.seller,lot:lot.id});
  return true;
}
// Закрытие торгов — при смене хода, когда снова очередь продавца. Ставка есть — клетка покупателю (вложено = уплачено);
// нет — лот банкрота уходит банку по стартовой цене, обычный лот снимается. Клетку уже выкупили — лот пропадает.
function resolveLots(T){
  const out=[];if(!T.lots||!T.lots.length||!T.turn)return out;
  const n=T.turn.n,keep=[];
  for(const lot of T.lots){
    const t=T.tiles[lot.tile],seller=T.players.find(p=>p.pid===lot.seller);
    if(!t||t.owner!==lot.seller){out.push({lot,result:'void'});continue;}
    if(n<lot.endsN){keep.push(lot);continue;}
    const buyer=lot.bestBy?T.players.find(p=>p.pid===lot.bestBy):null;
    if(buyer&&buyer.s){
      buyer.s.cash=(buyer.s.cash||0)-lot.best;if(seller&&seller.s)seller.s.cash=(seller.s.cash||0)+lot.best;
      const base=lotApi.baseInv?lotApi.baseInv(t):0;t.owner=lot.bestBy;t.mpPrem=lot.best-base;delete t.mpOffer;
      event(T,{from:lot.bestBy,kind:'won',text:`купил клетку на торгах у ${pnameOf(T,lot.seller)} за $${lot.best}`,amount:-lot.best,tile:lot.tile,to:lot.seller,lot:lot.id,paid:lot.best});
      out.push({lot,result:'sold',to:lot.bestBy,amount:lot.best});continue;
    }
    if(lot.kind==='bankrupt'){
      if(seller&&seller.s)seller.s.cash=(seller.s.cash||0)+lot.min;
      if(lotApi.toLot)lotApi.toLot(t);else{t.owner=null;delete t.mpPrem;}
      event(T,{from:lot.seller,kind:'bank',text:`никто не взял — банк забрал клетку за $${lot.min}`,amount:lot.min,tile:lot.tile,to:lot.seller,lot:lot.id});
      out.push({lot,result:'bank',amount:lot.min});continue;
    }
    event(T,{from:lot.seller,kind:'unsold',text:'торги прошли без ставок — клетка осталась у хозяина',amount:null,tile:lot.tile,to:lot.seller,lot:lot.id});
    out.push({lot,result:'unsold'});
  }
  T.lots=keep;return out;
}

// ---- Удары из колоды «Шанса» партии: только по соперникам и только в свой ход ----
// move — сдвинуть фишку на d клеток (без события клетки), jail — в участок (3 попытки на дубль, выход бесплатно),
// skip — пропуск следующего хода, freeze — чужая клетка не берёт ренту один круг стола, insp — чужая точка под проверку.
function applyHit(T,pid,h){
  if(T.phase!=='play'||!T.turn||T.turn.pid!==pid||!h||!h.k)return false;
  const to=h.to?T.players.find(p=>p.pid===h.to):null,n=T.players.length;
  const rival=to&&to.s&&to.pid!==pid;
  switch(h.k){
    case 'move':{if(!rival)return false;const d=Math.round(+h.d||0);if(!d)return false;to.s.pos=(((to.s.pos||0)+d)%40+40)%40;
      event(T,{from:pid,kind:'hit',text:`${d>0?'подвинул':'откатил'} ${to.name} на ${Math.abs(d)} ${Math.abs(d)===1?'клетку':Math.abs(d)<5?'клетки':'клеток'}`,amount:null,tile:to.s.pos,to:to.pid});return true;}
    case 'jail':{if(!rival)return false;const i=(T.tiles||[]).findIndex(t=>t.type==='police');if(i<0)return false;
      to.s.pos=i;to.s.jail=3;to.s.jailFine=0;event(T,{from:pid,kind:'hit',text:`сдал ${to.name} в участок`,amount:null,tile:i,to:to.pid});return true;}
    case 'skip':{if(!rival)return false;to.skip=(to.skip||0)+1;event(T,{from:pid,kind:'hit',text:`${to.name} пропустит ход`,amount:null,tile:null,to:to.pid});return true;}
    case 'freeze':{const t=T.tiles&&T.tiles[h.tile];if(!t||!t.owner||t.owner===pid)return false;t.frozen=T.turn.n+n;
      event(T,{from:pid,kind:'hit',text:`заморозил клетку ${pnameOf(T,t.owner)} на круг`,amount:null,tile:t.i,to:t.owner});return true;}
    case 'insp':{const t=T.tiles&&T.tiles[h.tile];if(!t||!t.owner||t.owner===pid||t.type!=='kiosk'||t.insp)return false;t.insp=true;
      event(T,{from:pid,kind:'hit',text:`натравил инспектора на точку ${pnameOf(T,t.owner)}`,amount:null,tile:t.i,to:t.owner});return true;}
  }
  return false;
}
function endTurn(T,pid,n,now){
  if(T.phase!=='play'||T.turn.pid!==pid||(n!=null&&n!==T.turn.n))return false;
  advance(T,now);return true;
}
// Часы хозяина стола. Возвращает, что сделать: 'timeout' — сказать игроку, что время вышло;
// 'advanced' — ход перешёл сам (игрок молчит или офлайн).
function tick(T,now){
  if(T.phase!=='play'||!T.turn||T.paused)return null;
  if(!T.finalRound&&T.deadline&&now>=T.deadline){T.finalRound=T.turn.round;T.finalBy='time';}   // «🏁 Последний раунд»: круг стола доигрывается
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
// Прогресс игрока по выбранному условию: {value, goal, done, text}. valuer нужен для «Богатейшего» (капитал).
function winProgress(T,pid,valuer){
  const w=winOf(T),p=T.players.find(x=>x.pid===pid),own=(T.tiles||[]).filter(t=>t.owner===pid&&(t.type==='kiosk'||t.type==='biz'));
  switch(w.id){
    case 'cash':{const v=Math.round(p&&p.s?(p.s.cash||0):0);return {value:v,goal:w.goal,done:v>=w.goal,text:`$${v} из $${w.goal} наличными`};}
    case 'chain':{const c=sfChain(T,pid,w.goal);const v=(c.clothes?1:0)+(c.tech?1:0)+c.techPoints;return {value:v,goal:2+w.goal,done:c.done,text:`лицензий ${(c.clothes?1:0)+(c.tech?1:0)}/2 · техники ${c.techPoints}/${w.goal}`};}
    case 'city':{const cats=new Set(own.filter(t=>t.type==='kiosk'&&t.base&&!t.lot).map(t=>t.base)).size,biz=own.filter(t=>t.type==='biz').length;
      return {value:cats+Math.min(2,biz),goal:w.goal+2,done:cats>=w.goal&&biz>=2,text:`категорий ${cats}/${w.goal} · бизнесов ${Math.min(2,biz)}/2`};}
    case 'empire':{const v=own.length;return {value:v,goal:w.goal,done:v>=w.goal,text:`владений ${v}/${w.goal}`};}
    case 'rent':{const v=Math.round((T.rent||{})[pid]||0);return {value:v,goal:w.goal,done:v>=w.goal,text:`ренты собрано $${v} из $${w.goal}`};}
    default:{const cap=T.tiles&&valuer?capital(T,pid,valuer).total:0;return {value:cap,goal:null,done:false,text:`капитал $${cap}`};}
  }
}
function checkEarly(T,valuer){
  if(T.phase!=='play')return null;
  const w=T.players.find(p=>winProgress(T,p.pid,valuer).done);
  if(w){finish(T,'early',w.pid);return w.pid;}
  return null;
}
function finish(T,why,winner){
  T.phase='over';T.paused=null;
  const laps=Math.max(0,...T.players.map(lapsOf));
  T.result={why,winner:winner||null,round:T.turn?T.turn.round:0,laps,finalBy:T.finalBy||null,win:winOf(T).id};
}
function backToLobby(T){
  T.phase='lobby';T.paused=null;T.tiles=null;T.turn=null;T.result=null;T.applied={};T.pot=0;T.rent={};T.deadline=null;T.lots=[];T.events=[];
  T.players=T.players.filter(p=>p.online);T.players.forEach(p=>{p.s=null;});autoRounds(T);
}
// Что уходит конкретному игроку: общее поле, публичные сводки всех и полный срез его самого.
function viewFor(T,pid,valuer){
  const me=T.players.find(p=>p.pid===pid);
  return {room:T.room,host:T.hostPid||null,paused:T.paused||null,finalRound:T.finalRound||null,finalBy:T.finalBy||null,phase:T.phase,settings:T.settings,match:T.match,startedAt:T.startedAt||null,turn:T.turn,result:T.result,
    tiles:T.tiles,log:T.log.slice(-6),pot:Math.round(T.pot||0),deadline:T.deadline||null,win:winOf(T),lots:T.lots||[],events:(T.events||[]).slice(-12),
    players:T.players.map(p=>({pid:p.pid,name:p.name,seat:p.seat,color:p.color,online:p.online,
      pos:p.s?p.s.pos:0,laps:p.s?p.s.laps||0:0,jail:p.s?p.s.jail||0:0,cash:p.s?Math.round(p.s.cash||0):0,skip:p.skip||0,
      cap:T.tiles&&valuer?capital(T,p.pid,valuer):null,chain:T.tiles?sfChain(T,p.pid):null,win:T.tiles?winProgress(T,p.pid,valuer):null})),
    mine:me&&me.s?me.s:null};
}

const api={COLORS,COLOR_NAMES,MAX_PLAYERS,MIN_PLAYERS,DEFAULTS,ROUND_OPTIONS,TURN_OPTIONS,MINUTE_OPTIONS,WIN_OPTIONS,TIMEOUT_GRACE_MS,
  PAUSE_MAX_MS,RESUME_MIN_MS,autoRounds,setRounds,setMinutes,setWin,winOf,winProgress,mergeTiles,makeCode,normCode,newTable,join,leave,canStart,start,active,applyState,pause,tablePause,advance,endTurn,tick,
  capital,ranking,sfChain,checkEarly,finish,backToLobby,viewFor,lotApi,listLot,bid,resolveLots,applyHit,event};
root.MPCore=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
