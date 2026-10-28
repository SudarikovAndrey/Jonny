import {gainSpecial,specialReady} from './special-meter.js';
import {facingDot} from './positioning.js';
import {fightingStyles} from './fighting-styles.js';
const standing=f=>f&&!f.down&&!f.knockdown&&!f.launch&&f.health>0;
export const punishable=a=>a.kick||['hook','hookLeft','uppercut','giantUppercut'].includes(a.type)||!!a.signature;
export function reactionProfile(a,zone,magnitude){
 const heavy=zone!=='arm'&&(a.signature||a.comboFinisher||a.launch||(a.type!=='jab'&&magnitude>=48));
 if(heavy)return {tier:'heavy',angular:1,root:1,overlay:1,duration:.45};
 // A fast recorded martial strike gives a short, firm recoil, including an intercepted forearm.
 if(a.snapImpact&&magnitude>=20)return {tier:'medium',angular:.8,root:.35,overlay:.8,duration:.24};
 if(zone==='arm'||a.type==='jab'||magnitude<20)return {tier:'light',angular:.55,root:.2,overlay:.4,duration:.24};
 return {tier:'medium',angular:.8,root:.55,overlay:.7,duration:.34};
}
export class BattleDecisions{
 constructor(combat){this.c=combat;}
 event(e){const c=this.c,f=c.fighters[e.fighter],t=c.fighters[e.target];
  if(e.type==='hits'&&!e.groundImpact&&f&&t){
   if(e.signature===undefined)gainSpecial(f,(e.damage||0)*1.2);gainSpecial(t,(e.damage||0)*.7);
   t.cleanSeries=null;
   if(e.signature!==undefined)f.cleanSeries=null;
   else{const old=f.cleanSeries,chain=old?.target===t.id&&c.time-old.time<2.4,clean=e.zone!=='arm';f.cleanSeries={target:t.id,count:(chain?old.count:0)+(clean?1:.5),clean:(chain?old.clean:0)+(clean?1:0),time:c.time};}
  }
  if(e.type==='blocks')gainSpecial(f,8);
  if(e.type==='blocks'&&c.fighters[e.attacker])c.fighters[e.attacker].cleanSeries=null;
  if(e.type==='misses'&&f)f.cleanSeries=null;
 }
 signatureAvailable(f){const c=this.c,t=f.target;
  if(c.forcedAttack||!specialReady(f)||!standing(f)||!standing(t)||f.defense||f.state==='hit')return false;
  const profile=fightingStyles[f.kind].super,range=c.attackRange(f,profile.attack),distance=f.root.position.distanceTo(t.root.position);
  if(distance<range.min-.12||distance>range.max+.18)return true;
  return c.positioning.swingClear(f,profile.attack,{kick:/Kick|kick/.test(profile.attack),side:'Right'});
 }
 afterExchange(f,a,target){const c=this.c;if(c.forcedAttack||!punishable(a)||a.ground||a.contact&&!a.contact.blocked||!standing(f))return;
  const blocked=!!a.contact?.blocked,window=blocked?.42:.75;
  f.exposedUntil=c.time+window;f.cooldown=Math.max(f.cooldown,window);f.retreat=0;f.reposition=0;
  c.emit('openings',f,{reason:blocked?'heavy-blocked':'heavy-missed',until:f.exposedUntil});
  if(!standing(target)||target.attack||target.state==='hit'||target.knockback||facingDot(target,f)<.35)return;
  const type='jab',range=c.attackRange({...target,target:f},type),distance=target.root.position.distanceTo(f.root.position);
  if(distance<range.min-.12||distance>range.max+.20)return;
  c.exchanges.queue(target,f,type,'mistake-counter');const plan=c.exchanges.plans.get(target.id);
  if(plan?.target===f.id){plan.expires=Math.min(plan.expires,f.exposedUntil);plan.windowUntil=f.exposedUntil;}
 }
 helpAlly(f){const c=this.c;
  if(c.forcedAttack||f.attack||f.defense||f.state==='hit'||f.signatureQueued||!f.target?.knockdown||c.time<(f.assistReady||0)||c.time<(f.assistScan||0)||c.time-f.lastHitTime<.7)return false;
  f.assistScan=c.time+.4;let best=null;
  for(const ally of c.fighters){if(ally===f||ally.team!==f.team||ally.down||ally.health<=0)continue;
   const threats=c.fighters.filter(o=>standing(o)&&o.team!==f.team&&o.target===ally&&o.root.position.distanceTo(ally.root.position)<1.9);
   if(threats.length<2&&!(ally.health/ally.maxHealth<.4&&threats.some(o=>o.attack)))continue;
   for(const enemy of threats){const distance=f.root.position.distanceTo(enemy.root.position);if(distance>3.2)continue;
    const dir=f.root.position.clone().sub(enemy.root.position).setY(0).normalize(),goal=enemy.root.position.clone().addScaledVector(dir,c.attackRange({...f,target:enemy},'jab').ideal);
    const radius=f.kind===6?.65:f.kind===3?.55:.44;
    if(!c.navigation.walkable(goal,radius)||!c.navigation.path(f.root.position,goal,c.navigation.blockers(f,c.fighters).filter(o=>Math.hypot(o.x-f.root.position.x,o.z-f.root.position.z)>o.radius+.04),radius).length)continue;
    if(!best||distance<best.distance)best={ally,enemy,distance};
   }
  }
  if(!best)return false;
  c.exchanges.cancel(f.id);f.target=best.enemy;f.nextAttack=null;f.styleQueue=[];f.boxingQueue=[];f.martialQueue=[];f.positionIntent=null;f.positionFit=null;f.navPath=null;f.navGoal=null;f.retreat=0;f.reposition=0;f.assistReady=c.time+3;f.engagementUntil=c.time+1.5;
  c.emit('assists',f,{target:best.enemy.id,ally:best.ally.id,reason:'leave-ground-target'});return true;
 }
}
