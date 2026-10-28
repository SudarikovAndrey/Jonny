// ===== Банда бойцов в мультиплеере — правила без интерфейса (MPGang) =====
// Концепция: черновики/америкэн-бой-банда.md (репо ГДД), решения Андрея 27.10.2026. Чистые функции: их зовёт хозяин
// стола (web/mp.js) и тесты (tests/mp-gang.test.cjs). Исход любой драки считается здесь по общему seed — одинаково у
// хозяина и у всех игроков; боевая сцена Codex (арена) только показывает бой к этому исходу.
(function(root){
'use strict';
// Семь бойцов общей арены Codex (outputs/brawl-camera-hud-2026-10-27/arena, actorNames). kind — индекс модели в арене.
// hp/atk — сила 1-го уровня для расчёта исхода; характер боя (скорость, приёмы) — в самой арене. [?] баланс прогоном.
const KINDS=[
  {kind:0,id:'zhilet',name:'Жилет',hp:100,atk:21},
  {kind:1,id:'shlyapa',name:'Шляпа',hp:92,atk:23},
  {kind:2,id:'tyazheloves',name:'Тяжеловес',hp:128,atk:17},
  {kind:3,id:'myasnitsa',name:'Мясница',hp:116,atk:19},
  {kind:4,id:'ded',name:'Дед',hp:88,atk:24},
  {kind:5,id:'vnuk',name:'Внук',hp:96,atk:22},
  {kind:6,id:'gigant',name:'Гигант',hp:140,atk:20},
];
const MAX_GANG=5,MAX_LVL=5;
// Опыт всего для уровня 1…5 (Андрей 27.10: «хотя бы 20, 50, 100 — чтобы проще масштабировать»).
const XP_LEVELS=[0,100,250,500,1000];
const LVL_STEP=.2;            // +20% здоровья и удара за уровень: 5-й уровень — ×1,8 к каждому (≈×3,2 силы)
const XP_WIN=50,XP_LOSE=20,XP_RING_WIN=60,XP_RING_LOSE=20;
const LOOT_PER_LVL=.10;       // унесёт товара: 1-й уровень — 10% запаса точки … 5-й — 50%; вместе не больше 100%
const GUARD_PER_LVL=.10;      // боец на точке: +10% продаж за уровень [?] ориентир, решение за Андреем
const DEFENSE_OVER=1.1;       // автозащита: наименьший состав, который сильнее нападения хотя бы на 10%

// Детерминированный генератор (mulberry32): один seed — одна драка у всех.
function rng(seed){let a=(seed>>>0)||0x9e3779b9;return ()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}
const kindOf=f=>KINDS[(f&&f.kind)|0]||KINDS[0];
const levelOf=xp=>{let l=1;for(let i=1;i<XP_LEVELS.length;i++)if((xp||0)>=XP_LEVELS[i])l=i+1;return Math.min(MAX_LVL,l);};
// Сколько осталось до следующего уровня: {have, need, frac} — полоска опыта на карточке.
function xpToNext(f){const l=f.lvl||levelOf(f.xp);if(l>=MAX_LVL)return {have:0,need:0,frac:1};
  const lo=XP_LEVELS[l-1],hi=XP_LEVELS[l];return {have:(f.xp||0)-lo,need:hi-lo,frac:Math.max(0,Math.min(1,((f.xp||0)-lo)/(hi-lo)))};}
function newFighter(kind,id){return {id:String(id),kind:kind|0,xp:0,lvl:1,used:false,post:null,sick:0,l3:false};}
const mult=f=>1+LVL_STEP*(((f&&f.lvl)||1)-1);
const hpOf=f=>kindOf(f).hp*mult(f),atkOf=f=>kindOf(f).atk*mult(f);
const power=f=>hpOf(f)*atkOf(f)/100;
const sidePower=list=>list.reduce((s,f)=>s+power(f),0);

// Драка сторон A (нападение) и D (защита): по очереди в случайном порядке каждый живой бьёт живого противника
// (чаще — самого побитого), урон atk×0,7…1,3. Итог: winner 0|1, выжившие победителей, порядок нокаутов, остаток здоровья.
function battle(A,D,seed){
  const r=rng(seed);
  const units=[...A.map(f=>({f,side:0})),...D.map(f=>({f,side:1}))].map(u=>Object.assign(u,{hp:hpOf(u.f),max:hpOf(u.f),atk:atkOf(u.f)}));
  const ko=[];let ticks=0;
  const alive=s=>units.filter(u=>u.side===s&&u.hp>0);
  while(alive(0).length&&alive(1).length&&ticks++<400){
    const order=units.filter(u=>u.hp>0).map(u=>({u,k:r()})).sort((a,b)=>a.k-b.k).map(x=>x.u);
    for(const u of order){if(u.hp<=0)continue;const foes=alive(1-u.side);if(!foes.length)break;
      const t=r()<.6?foes.reduce((a,b)=>a.hp/a.max<=b.hp/b.max?a:b):foes[Math.floor(r()*foes.length)];
      t.hp-=u.atk*(.7+.6*r());if(t.hp<=0){t.hp=0;ko.push(t.f.id);}}}
  let winner=alive(0).length?(alive(1).length?null:0):1;
  if(winner===null){const share=s=>units.filter(u=>u.side===s).reduce((x,u)=>x+u.hp/u.max,0)/Math.max(1,units.filter(u=>u.side===s).length);winner=share(0)>share(1)?0:1;}
  const left={};for(const u of units)left[u.f.id]=+(u.hp/u.max).toFixed(3);
  return {winner,survivors:units.filter(u=>u.side===winner&&u.hp>0).map(u=>u.f.id),ko,left};}
// Опыт участнику: победа 50, поражение 20; чем сильнее противник относительно своей стороны — тем больше (×0,5…×2).
function xpFor(win,ownSide,enemySide,base){const b=base!=null?base:(win?XP_WIN:XP_LOSE);
  const ratio=Math.max(.5,Math.min(2,sidePower(enemySide)/Math.max(1,sidePower(ownSide))));return Math.round(b*ratio);}
// Начислить опыт. recruit — боец впервые дошёл до 3-го уровня: банда получает нового бойца 1-го уровня.
function addXp(f,x){const from=f.lvl||1;f.xp=(f.xp||0)+Math.max(0,x|0);f.lvl=levelOf(f.xp);let recruit=false;
  if(f.lvl>=3&&!f.l3){f.l3=true;recruit=true;}return {from,to:f.lvl,recruit};}
// Карта «Подкачался»: +1 уровень, опыт — до порога нового уровня.
function levelUp(f){if((f.lvl||1)>=MAX_LVL)return {from:f.lvl,to:f.lvl,recruit:false};const need=XP_LEVELS[f.lvl||1]-(f.xp||0);return addXp(f,need);}
// Доля товара, которую унесут выжившие нападающие: 10% за уровень каждого, вместе не больше 100%.
const lootShare=survivors=>Math.min(1,survivors.reduce((s,f)=>s+LOOT_PER_LVL*((f&&f.lvl)||1),0));
const guardBonus=lvl=>Math.round(GUARD_PER_LVL*(lvl||1)*100)/100;   // доля: 0.3 = «+30%»
// Автозащита (защитник не выбрал за отведённое время): из свободных — состав с наименьшей силой, которая всё же
// ≥ нападение ×1,1; таких нет — все свободные.
function autoDefense(attackers,free){
  const need=sidePower(attackers)*DEFENSE_OVER;let best=null,bestP=Infinity;const n=Math.min(free.length,MAX_GANG);
  for(let m=1;m<(1<<n);m++){const set=free.filter((_,i)=>m&(1<<i)),p=sidePower(set);if(p>=need&&(p<bestP||(p===bestP&&set.length<best.length))){best=set;bestP=p;}}
  return best||free.slice(0,MAX_GANG);}
// Время на выбор защиты — от времени хода стола: не меньше 5 с (30 с → 5, 60 → 10, 90 → 15), без лимита — 20 с.
const defenseSec=turnSec=>(+turnSec>0)?Math.max(5,Math.round(+turnSec/6)):20;

// ---- Ринг: один чемпион на стол, между заходами не лечится ----
// stage 0,1,2… — номер чемпиона; каждый следующий сильнее (уровень растёт раз в два чемпиона, здоровье ×1,25).
function ringChampion(stage){const s=stage|0,f={id:'ring'+s,kind:(s*3)%KINDS.length,lvl:Math.min(MAX_LVL,1+Math.floor(s/2))};
  const max=Math.round(hpOf(f)*1.25);return {stage:s,kind:f.kind,lvl:f.lvl,hpMax:max,hp:max};}
// Один боец против чемпиона. Урон чемпиону остаётся; победа — следующий чемпион и награда; опыт и за поражение (меньше).
function ringFight0(fighter,champ,seed){
  const r=rng(seed),c={id:'ring',kind:champ.kind,lvl:champ.lvl};let me=hpOf(fighter),ch=champ.hp,ticks=0;const myAtk=atkOf(fighter),chAtk=atkOf(c);
  let myTurn=r()<.5;
  while(me>0&&ch>0&&ticks++<400){if(myTurn)ch-=myAtk*(.7+.6*r());else me-=chAtk*(.7+.6*r());myTurn=!myTurn;}
  const win=ch<=0,dealt=Math.round(champ.hp-Math.max(0,ch));
  const ratio=Math.max(.5,Math.min(2,power(c)/Math.max(1,power(fighter))));
  const xp=Math.round((win?XP_RING_WIN:XP_RING_LOSE)*ratio);
  const next=win?ringChampion(champ.stage+1):Object.assign({},champ,{hp:Math.max(1,Math.round(ch))});
  return {win,dealt,xp,champ:next,left:+(Math.max(0,me)/hpOf(fighter)).toFixed(3)};}

// =====================================================================
// Банда за столом: состояние — у хозяина стола в T (T.gang, T.ring, T.raid), чистые функции над ним.
// Включается настройкой стола T.settings.gang (решение Андрея 27.10: «с бойцами или без» перед стартом).
// =====================================================================
const RING_TILES=[28,12,32,17,26];   // клетка ринга — первый подходящий пустырь (не 1/39 у старта, не 0/20/25 — «Интерфейс»)
const isBot=pid=>/^bot\d/.test(pid||'');
const on=T=>!!(T&&T.settings&&T.settings.gang);
const gangOf=(T,pid)=>(T.gang&&T.gang[pid])||[];
const find=(T,pid,id)=>gangOf(T,pid).find(f=>f.id===id);
// Свободен — в строю: не дрался в этом круге, не «Диарея», не стоит на точке.
const freeOf=(T,pid)=>gangOf(T,pid).filter(f=>!f.used&&!f.sick&&f.post==null);
// Кто может защищать точку: свободные бойцы и охранник этой точки — он дерётся сколько угодно, без кулдауна (Андрей 28.10);
// «Диарея» выводит и его.
const defendersOf=(T,pid,tile)=>freeOf(T,pid).concat(gangOf(T,pid).filter(f=>f.post===tile&&!f.sick));
function addFighter(T,pid,kind,source,out){const g=T.gang[pid]=T.gang[pid]||[];if(g.length>=MAX_GANG)return null;
  T.gangSeq=(T.gangSeq||0)+1;const f=newFighter(kind,`${pid}-${T.gangSeq}`);g.push(f);if(out)out.push({type:'fighter-new',pid,id:f.id,kind:f.kind,source});return f;}
// Опыт с последствиями: новый уровень — событие; первый 3-й уровень — новый боец в банду.
function giveXp(T,pid,f,x,out,seed){const r=addXp(f,x);if(r.to>r.from&&out)out.push({type:'fighter-level',pid,id:f.id,from:r.from,to:r.to});
  if(r.recruit)addFighter(T,pid,Math.floor(rng(seed^0x51ed)()*KINDS.length),'level3',out);return r;}
// Старт партии: каждому игроку — один боец (его персонаж), ринг с первым чемпионом.
function init(T,tiles,seed){
  T.gang={};T.gangSeq=0;T.raid=null;T.guardHit={};const r=rng(seed||1);
  for(const p of T.players)addFighter(T,p.pid,Math.floor(r()*KINDS.length),'start');
  const tile=(tiles||T.tiles||[]).find(t=>t&&t.type==='ring');
  T.ring={tile:tile?tile.i:null,champ:ringChampion(0)};}
// Поле стола с рингом: первый подходящий пустырь из RING_TILES становится клеткой ринга.
function boardRing(tiles){for(const i of RING_TILES){const t=tiles[i];if(t&&t.type==='kiosk'&&!t.owner){Object.assign(t,{type:'ring',zone:-1,owner:null,lot:false,base:null,goods:0});for(const k of ['good','price','price0','capLvl','salesLvl','tier','level'])delete t[k];return i;}}return null;}
// Проход старта: бойцы снова в строю, «Диарея» проходит.
function lap(T,pid){for(const f of gangOf(T,pid)){f.used=false;f.sick=false;}}
const guardOn=(T,tile)=>{for(const pid in (T.gang||{}))for(const f of T.gang[pid])if(f.post===tile)return Object.assign({pid},f);return null;};

// ---- набег ----
// Нападающий стоит на чужой точке (не бизнес) и посылает 1–5 свободных бойцов вместо ренты. Охранник на точке прогоняет
// первый набег за круг стола без драки (бойцы не тратятся, платится обычная рента); второй — обычная драка.
// Вернёт {error} | {repelled:true} | {raid} (ждём защиту) | {result} (решено сразу: бот, нет свободных, защитник не в сети).
function raidStart(T,pid,tileIdx,ids,now,o){
  o=o||{};if(!on(T))return {error:'off'};if(T.raid)return {error:'busy'};
  const t=(T.tiles||[])[tileIdx];if(!t||t.type!=='kiosk'||!t.owner||t.owner===pid)return {error:'tile'};
  const free=freeOf(T,pid),att=[...new Set(ids||[])].map(id=>free.find(f=>f.id===id)).filter(Boolean);
  if(!att.length||att.length>MAX_GANG)return {error:'fighters'};
  const to=t.owner,round=T.turn?T.turn.round:0;
  if(guardOn(T,tileIdx)&&(T.guardHit=T.guardHit||{})[tileIdx]!==round){T.guardHit[tileIdx]=round;return {repelled:true,to,tile:tileIdx};}
  const sec=defenseSec(T.settings&&T.settings.turnSec);
  T.raidSeq=(T.raidSeq||0)+1;
  T.raid={id:`raid:${T.match||0}:${T.raidSeq}`,from:pid,to,tile:tileIdx,attackers:att.map(f=>f.id),sec,deadline:now+sec*1000};
  const owner=T.players.find(p=>p.pid===to);
  if(isBot(to)||!owner||!owner.online||!defendersOf(T,to,tileIdx).length)return {result:raidResolve(T,null,o.seed)};
  return {raid:T.raid};}
// Защита: ids — выбранные защитники (свободные бойцы жертвы), [] — «Слить», null — не выбрал (автозащита).
// Защита кулдауна не тратит. Победа нападающих: выжившие уносят долю товара; поражение — рента ×1,5 (платит клиент).
function raidResolve(T,ids,seed){
  const R=T.raid;if(!R)return null;T.raid=null;
  const att=R.attackers.map(id=>find(T,R.from,id)).filter(Boolean),freeD=defendersOf(T,R.to,R.tile);
  const def=ids==null?autoDefense(att,freeD):[...new Set(ids)].map(id=>freeD.find(f=>f.id===id)).filter(Boolean);
  const out=[];let res;
  if(!def.length)res={winner:0,survivors:att.map(f=>f.id),ko:[],left:{}};
  else res=battle(att,def,(seed>>>0)||1);
  const win=res.winner===0;
  for(const f of att){f.used=true;giveXp(T,R.from,f,xpFor(win,att,def.length?def:att),out,seed);}
  for(const f of def)giveXp(T,R.to,f,xpFor(!win,def,att),out,seed+1);
  const surv=win?att.filter(f=>res.survivors.includes(f.id)):[];
  const share=win?lootShare(surv):0;
  return {id:R.id,from:R.from,to:R.to,tile:R.tile,win,conceded:ids!=null&&!def.length,auto:ids==null,
    attackers:att.map(f=>f.id),defenders:def.map(f=>f.id),survivors:res.survivors,ko:res.ko,left:res.left,share,events:out};}

// ---- ринг ----
// Один свободный боец против чемпиона стола. Победа: следующий чемпион и награда — новый боец 1-го уровня, а при полной
// банде — прокачка (+1 уровень этому бойцу; он уже 5-й — самому слабому) (Андрей 27.10). Боец тратит круг.
function ringFight(T,pid,id,seed){
  if(!on(T)||!T.ring)return {error:'off'};const f=freeOf(T,pid).find(x=>x.id===id);if(!f)return {error:'fighter'};
  const before=T.ring.champ,r=ringFightCore(f,before,seed),out=[];
  f.used=true;giveXp(T,pid,f,r.xp,out,seed);T.ring.champ=r.champ;
  let reward=null;
  if(r.win){if(gangOf(T,pid).length<MAX_GANG){addFighter(T,pid,before.kind,'ring',out);reward='fighter';}
    else{const tgt=f.lvl<MAX_LVL?f:gangOf(T,pid).slice().sort((a,b)=>a.lvl-b.lvl)[0];const lv=levelUp(tgt);if(lv.to>lv.from)out.push({type:'fighter-level',pid,id:tgt.id,from:lv.from,to:lv.to});reward='level';}}
  return {pid,id,win:r.win,dealt:r.dealt,xp:r.xp,champ:T.ring.champ,beat:r.win?before.stage:null,reward,events:out};}

// ---- охранник ----
// Поставить на свою точку (или снять: tile=null). Один боец на точку. Снятый с точки в этом круге не дерётся.
function post(T,pid,id,tile){if(!on(T))return false;const f=find(T,pid,id);if(!f)return false;
  if(tile==null){if(f.post==null)return false;f.post=null;f.used=true;return true;}
  const t=(T.tiles||[])[tile];if(!t||t.type!=='kiosk'||t.owner!==pid||f.used||f.sick)return false;
  const busy=guardOn(T,tile);if(busy&&busy.id!==id)return false;f.post=tile;return true;}

// ---- карты «Шанса» банды ----
// diarrhea — все бойцы выбранного игрока круг не дерутся (Андрей 27.10); pumped — +1 уровень выбранному;
// recover — перевёрнутая карточка снова в строю; countryman — новый боец 1-го уровня.
function card(T,pid,kind,arg,seed){if(!on(T))return null;const out=[];
  if(kind==='diarrhea'){const g=gangOf(T,arg);if(!g.length||arg===pid)return null;for(const f of g)f.sick=true;return {kind,target:arg,events:out};}
  if(kind==='pumped'){const f=find(T,pid,arg)||gangOf(T,pid).filter(x=>x.lvl<MAX_LVL).sort((a,b)=>a.lvl-b.lvl)[0];if(!f)return null;
    const lv=levelUp(f);if(lv.to>lv.from)out.push({type:'fighter-level',pid,id:f.id,from:lv.from,to:lv.to});if(lv.recruit)addFighter(T,pid,Math.floor(rng(seed)()*KINDS.length),'level3',out);return {kind,id:f.id,events:out};}
  if(kind==='recover'){const f=find(T,pid,arg)||gangOf(T,pid).find(x=>x.used&&x.post==null);if(!f||!f.used)return null;f.used=false;return {kind,id:f.id,events:out};}
  if(kind==='countryman'){const f=addFighter(T,pid,Math.floor(rng(seed)()*KINDS.length),'chance',out);return f?{kind,id:f.id,events:out}:null;}
  return null;}

// Миссии банды: «Самая крутая банда» — бойцов 5-го уровня; «Хозяин района» — выигранных набегов (T.gangWins).
const topCount=(T,pid,lvl)=>gangOf(T,pid).filter(f=>f.lvl>=(lvl||MAX_LVL)).length;
// Публичная часть для вида стола: банды всех (карточки соперников видны — защитник видит, кем наехали), ринг, набег.
function publicView(T){if(!on(T))return null;
  return {gang:T.gang||{},ring:T.ring||null,raid:T.raid?Object.assign({},T.raid):null,wins:T.gangWins||{}};}

const ringFightCore=ringFight0;
const api={KINDS,MAX_GANG,MAX_LVL,XP_LEVELS,XP_WIN,XP_LOSE,LOOT_PER_LVL,GUARD_PER_LVL,DEFENSE_OVER,RING_TILES,
  rng,kindOf,levelOf,xpToNext,newFighter,power,sidePower,hpOf,atkOf,battle,xpFor,addXp,levelUp,lootShare,guardBonus,autoDefense,defenseSec,ringChampion,
  ringFight:ringFight0,
  table:{on,gangOf,freeOf,defendersOf,init,boardRing,lap,guardOn,raidStart,raidResolve,ringFight,post,card,topCount,publicView,addFighter}};
root.MPGang=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
