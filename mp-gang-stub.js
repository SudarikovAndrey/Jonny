// ===== Банда — ЗАГЛУШКА клиентского контракта для вёрстки («Американ Интерфейс») =====
// Не подключать в сборку. Настоящую реализацию тех же функций добавит web/mp.js поверх правил web/mp-gang.js
// (тот же объект window.MPGang). Включить для вёрстки: подключить этот файл после mp-gang.js; демо-события —
// из консоли: MPGang._demo.raid(), MPGang._demo.raidResult(), MPGang._demo.ring(), MPGang._demo.levelUp(), MPGang._demo.newFighter().
//
// КОНТРАКТ (данные — только чтение; всё меняет хозяин стола, клиент получает через вид стола):
//   MPGang.list(pid?)  → [{id, kind, name, img, lvl, xp, xpNext:{have,need,frac}, used, post:i|null, sick:bool}]
//                         pid по умолчанию — свой. used — дрался в этом круге (карточка перевёрнута). sick — «Диарея».
//   MPGang.guards()    → [{tile, pid, id, img, lvl, bonus}]   охранники на клетках стола; bonus — доля, 0.3 = «+30%»
//   MPGang.ring()      → {tile, stage, champion:{img, name, lvl, hp, hpMax}}   чемпион ринга (здоровье — недобитость)
//   MPGang.raidFor()   → активный набег на МЕНЯ или null: {id, from, fromName, tile, attackers:[fighter], deadline,
//                         defenseSec, free:[мои свободные бойцы]}; deadline — время хозяина стола (MP.hostNow-совместимо)
//   MPGang.img(kind)   → путь к портрету вида
//   MPGang.on(type, cb) / MPGang.off(type, cb) — события стола:
//     'raid'          {id, from, to, tile, attackers:[ids], deadline}          — на кого-то наехали (to — жертва)
//     'raid-result'   {id, from, to, tile, win, survivors:[ids], ko:[ids], loot:{share, goods, cash}, rent, xp:{id:n}}
//     'ring-result'   {pid, fighter, win, dealt, xp, champion:{stage, hp, hpMax}}
//     'fighter-new'   {pid, fighter, source:'ring'|'slot'|'chance'|'level3'}
//     'fighter-level' {pid, fighter, from, to}
//   Действия (шлют хозяину стола; результат придёт событиями и видом):
//     MPGang.raid(tile, ids)        — наехать своими бойцами вместо ренты (только в свой ход, стоя на чужой точке)
//     MPGang.defend(raidId, ids)    — защититься выбранными;  MPGang.concede(raidId) — «Слить»
//     MPGang.ringFight(id)          — послать одного бойца на ринг
//     MPGang.post(id, tile|null)    — поставить бойца на свою точку / снять
(function(){
'use strict';
const G=window.MPGang;if(!G){console.error('mp-gang-stub: сначала web/mp-gang.js');return;}
const IMG=k=>`assets/gang/portrait-${G.KINDS[k].id}.webp`;   // финальные портреты — задание Codex 9e7f984d
const subs={};const fire=(t,d)=>{(subs[t]||[]).forEach(cb=>{try{cb(d);}catch(e){console.error(e);}});};
const me='me',rival='rival',mk=(id,kind,lvl,extra)=>Object.assign(G.newFighter(kind,id),{lvl,xp:G.XP_LEVELS[lvl-1]+Math.round((G.XP_LEVELS[lvl]-G.XP_LEVELS[lvl-1]||0)*.4)},extra||{});
const gangs={[me]:[mk('m1',0,2),mk('m2',3,1,{used:true}),mk('m3',5,3,{post:12})],[rival]:[mk('r1',2,2),mk('r2',6,1)]};
let champ=Object.assign(G.ringChampion(2),{hp:Math.round(G.ringChampion(2).hpMax*.55)}),raid=null;
const view=f=>({id:f.id,kind:f.kind,name:G.KINDS[f.kind].name,img:IMG(f.kind),lvl:f.lvl,xp:f.xp,xpNext:G.xpToNext(f),used:!!f.used,post:f.post,sick:!!f.sick});
Object.assign(G,{
  stub:true,img:IMG,
  list:(pid)=>(gangs[pid||me]||[]).map(view),
  guards:()=>Object.entries(gangs).flatMap(([pid,g])=>g.filter(f=>f.post!=null).map(f=>({tile:f.post,pid,id:f.id,img:IMG(f.kind),lvl:f.lvl,bonus:G.guardBonus(f.lvl)}))),
  ring:()=>({tile:28,stage:champ.stage,champion:{img:IMG(champ.kind),name:G.KINDS[champ.kind].name,lvl:champ.lvl,hp:champ.hp,hpMax:champ.hpMax}}),
  raidFor:()=>raid,
  on:(t,cb)=>{(subs[t]=subs[t]||[]).push(cb);},off:(t,cb)=>{subs[t]=(subs[t]||[]).filter(x=>x!==cb);},
  raid:(tile,ids)=>console.log('[stub] raid',tile,ids),
  defend:(id,ids)=>{console.log('[stub] defend',id,ids);raid=null;},
  concede:(id)=>{console.log('[stub] concede',id);raid=null;},
  ringFight:(id)=>console.log('[stub] ringFight',id),
  post:(id,tile)=>{const f=gangs[me].find(x=>x.id===id);if(f)f.post=tile;},
  _demo:{
    raid(){const att=gangs[rival].map(view);raid={id:'raid1',from:rival,fromName:'Саня',tile:12,attackers:att,defenseSec:10,deadline:Date.now()+10000,free:gangs[me].filter(f=>f.post==null).map(view)};
      fire('raid',{id:raid.id,from:rival,to:me,tile:12,attackers:att.map(f=>f.id),deadline:raid.deadline});},
    raidResult(win=true){fire('raid-result',{id:'raid1',from:me,to:rival,tile:7,win,survivors:win?['m1']:[],ko:win?['r1']:['m1'],loot:win?{share:.2,goods:6,cash:0}:null,rent:win?0:90,xp:{m1:50}});},
    ring(win=false){fire('ring-result',{pid:me,fighter:view(gangs[me][0]),win,dealt:40,xp:win?60:20,champion:{stage:champ.stage+(win?1:0),hp:win?champ.hpMax:champ.hp-40,hpMax:champ.hpMax}});},
    levelUp(){const f=gangs[me][0];const from=f.lvl;G.levelUp(f);fire('fighter-level',{pid:me,fighter:view(f),from,to:f.lvl});},
    newFighter(){const f=mk('m'+(gangs[me].length+1),6,1);gangs[me].push(f);fire('fighter-new',{pid:me,fighter:view(f),source:'ring'});},
  },
});
console.info('MPGang: заглушка для вёрстки (mp-gang-stub.js) — демо: MPGang._demo.*');
})();
