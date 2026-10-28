import {Vector3} from 'three';
import {walls} from './courtyard.js?v=20261027am';
const alive=f=>!f.down&&!f.knockdown&&!f.launch&&f.health>0;
export function wallClearance(p){return Math.min(...walls.slice(0,18).map(w=>{const d=w.b.clone().sub(w.a),u=Math.max(0,Math.min(1,p.clone().sub(w.a).dot(d)/d.lengthSq()));return p.distanceTo(w.a.clone().addScaledVector(d,u));}));}
export function flankCost(f,p,actors){
 const t=f.target;if(!t)return 0;const axis=p.clone().sub(t.root.position).setY(0).normalize();let cost=0;
 for(const a of actors){if(a===f||!alive(a)||a.team!==f.team||a.target!==t||a.root.position.distanceTo(t.root.position)>2.2)continue;
  const other=a.root.position.clone().sub(t.root.position).setY(0).normalize();cost+=Math.max(0,axis.dot(other)-.25)*1.5;
 }return cost;
}
export function facingDot(defender,attacker){const d=attacker.root.position.clone().sub(defender.root.position).setY(0).normalize();return d.x*Math.sin(defender.yaw||0)+d.z*Math.cos(defender.yaw||0);}
export function guardCovers(defender,attacker){return facingDot(defender,attacker)>=Math.cos(Math.PI/3);}
// Sample the space used by the limb, not a circle around the whole fighter.
export function swingPoints(f,type,spec){
 const yaw=f.target?Math.atan2(f.target.root.position.x-f.root.position.x,f.target.root.position.z-f.root.position.z):f.yaw||0,scale=f.rig?.bodyScale||1;
 const wide=['hook','hookLeft','spinKick','specialKick','roundKick','sweepKick'].includes(type),side=spec?.side==='Left'?-1:1,out=[];
 for(let i=0;i<=8;i++){const u=i/8,angle=wide?side*(-1.45+u*2.7):side*.12,r=(wide?(spec?.kick?.95:.65):.25+u*(spec?.kick?.8:.5))*scale;out.push(f.root.position.clone().add(new Vector3(Math.sin(yaw+angle)*r,0,Math.cos(yaw+angle)*r)));}return out;
}
export class Positioning{
 constructor(combat){this.c=combat;}
 fitAttack(f,type,specs){
  const c=this.c,t=f.target,last=f.positionFit;
  if(!c.forcedAttack&&t&&last&&last.type===type&&last.target===t&&last.revision===c.navigation.revision&&c.time<last.until&&last.origin.distanceTo(f.root.position)<.12&&last.destination.distanceTo(t.root.position)<.12)return last.result;
  const result=this.chooseFit(f,type,specs);if(t)f.positionFit={type,target:t,result,until:c.time+.18,revision:c.navigation.revision,origin:f.root.position.clone(),destination:t.root.position.clone()};return result;
 }
 chooseFit(f,type,specs){
  const c=this.c,t=f.target;const wasBlocked=f.swingBlocked;f.swingBlocked=false;if(c.forcedAttack||!t||f.signatureQueued)return type;
  const distance=f.root.position.distanceTo(t.root.position),range=c.attackRange(f,type);
  if(!specs[type]||distance>range.max+.3)return type;
  const tooClose=specs[type]?.kick&&distance<range.min-.12;
  if(!tooClose&&this.swingClear(f,type,specs[type]))return type;
  const replacement=['body','jab','cross'].filter(a=>this.swingClear(f,a,specs[a])).sort((a,b)=>Math.abs(distance-c.attackRange(f,a).ideal)-Math.abs(distance-c.attackRange(f,b).ideal))[0];
  if(replacement)return replacement;
  f.swingBlocked=true;if(!wasBlocked){f.reposition=.6;f.repositionSign=f.id%2?1:-1;f.navGoal=null;f.navPath=null;}return type;
 }
 swingClear(f,type,spec){const c=this.c;return swingPoints(f,type,spec).every(p=>c.navigation.walkable(p,.09)&&!c.fighters.some(o=>o!==f&&o!==f.target&&alive(o)&&p.distanceTo(o.root.position)<(o.kind===6?.45:.30)));}
 threats(f){return this.c.fighters.filter(o=>o.team!==f.team&&alive(o)&&o.root.position.distanceTo(f.root.position)<2.05);}
 danger(f){const foes=this.threats(f),dirs=foes.map(o=>o.root.position.clone().sub(f.root.position).setY(0).normalize());return {foes,wall:foes.length>0&&wallClearance(f.root.position)<.95,surrounded:dirs.some((a,i)=>dirs.slice(i+1).some(b=>a.dot(b)<-.2))};}
 finish(f,outcome){const c=this.c,old=f.positionIntent;if(!old)return;f.positionIntent=null;f.navPath=null;f.navGoal=null;f.positionSettleUntil=c.time+.28;f.positionReady=c.time+(outcome==='blocked'||outcome==='timeout'?.8:2);
  const threat=this.threats(f).sort((a,b)=>f.root.position.distanceTo(a.root.position)-f.root.position.distanceTo(b.root.position))[0];
  if(threat&&threat!==f.target&&!f.attack&&!f.signatureQueued){f.target=threat;f.nextAttack=null;f.styleQueue=[];f.martialQueue=[];f.boxingQueue=[];c.exchanges?.cancel(f.id);f.engagementUntil=c.time+1;}
  c.emit('positioningEnds',f,{outcome,reason:old.reason});
 }
 settling(f){return this.c.time<(f.positionSettleUntil||0);}

 goal(f){
  const c=this.c,now=c.time;
  if(c.forcedAttack||!f.target||!alive(f.target)||f.attack||f.defense||f.state==='hit'){if(f.positionIntent)this.finish(f,'interrupted');return null;}
  const old=f.positionIntent;
  if(old){
   const distance=f.root.position.distanceTo(old.goal),danger=this.danger(f);
   if(!danger.wall&&!danger.surrounded&&old.start.distanceTo(f.root.position)>.35){this.finish(f,'safe');return null;}
   if(distance<=.16){this.finish(f,danger.wall||danger.surrounded?'still-threatened':'safe');if(danger.wall||danger.surrounded)f.positionReady=now+.8;return null;}
   if(now>=old.until||old.target!==f.target.id){this.finish(f,'timeout');return null;}
   if(now-old.checked>.3){const moved=old.previous.distanceTo(f.root.position);old.checked=now;old.previous.copy(f.root.position);if(moved<.05){this.finish(f,'blocked');return null;}}
   return old.goal;
  }
  if(this.settling(f)||now<(f.positionReady||0)||f.attackRecovery||f.walkStop)return null;
  const {foes,surrounded,wall}=this.danger(f);if(!foes.length||(!surrounded&&!wall))return null;
  const nav=c.navigation,radius=f.kind===6?.65:f.kind===3?.55:.44,blockers=nav.blockers(f,c.fighters);
  const score=p=>Math.min(1.5,wallClearance(p))*(wall?1.4:.3)+foes.reduce((s,o)=>s+Math.min(1.8,p.distanceTo(o.root.position)),0)/foes.length;
  let best=null,bestScore=score(f.root.position)+.22;
  for(let i=0;i<16;i++){const a=i*Math.PI/8,p=f.root.position.clone().add(new Vector3(Math.sin(a)*1.05,0,Math.cos(a)*1.05));
   if(!nav.walkable(p,radius)||!nav.segment(f.root.position,p,blockers,radius))continue;
   const value=score(p);if(value>bestScore){best=p;bestScore=value;}
  }
  f.positionReady=now+1;
  if(!best)return null;
  f.positionIntent={start:f.root.position.clone(),previous:f.root.position.clone(),checked:now,goal:best,until:now+1.2,target:f.target.id,reason:wall?'wall-exit':'escape-surround'};f.navPath=null;
  c.emit('positioning',f,{reason:f.positionIntent.reason,goal:best.toArray()});return best;
 }
}
