import {Vector3} from 'three';
import {walls,plateToGround} from './courtyard.js?v=20261027am';
export const binPosition=plateToGround(.80,.405),binRadius=.28;
export function constrainBin(point,radius){const offset=point.clone().sub(binPosition).setY(0),clearance=binRadius+radius+.01;if(offset.length()>=clearance)return point;if(offset.lengthSq()<1e-8)offset.set(1,0,0);const q=binPosition.clone().addScaledVector(offset.normalize(),clearance);q.y=point.y;return q;}
function closest(p,a,b){const d=b.clone().sub(a).setY(0),t=Math.max(0,Math.min(1,p.clone().sub(a).dot(d)/Math.max(1e-9,d.lengthSq())));return a.clone().addScaledVector(d,t);}
export class ImpactWorld{
 constructor(combat){this.combat=combat;}
 move(f,delta){
  const c=this.combat,k=f.knockback;if(!k||k.age>.8||f.velocity.length()<1.2||delta.lengthSq()<1e-9)return;
  const start=f.root.position,end=start.clone().add(delta),radius=f.kind===6?.65:f.kind===3?.55:.44;
  if(!k.bodyHit)for(const o of c.fighters){
   if(o===f||o.team!==f.team||o.down||o.knockdown||o.knockback||o.health<=0)continue;
   const q=closest(o.root.position,start,end),toward=o.root.position.clone().sub(start).setY(0);
   if(q.distanceTo(o.root.position)>.83||delta.dot(toward)<=0)continue;
   k.bodyHit=true;k.speed*=.55;o.attack=null;o.defense=null;o.state='hit';o.timer=0;o.cooldown=Math.max(o.cooldown,.4);o.knockVelocity.addScaledVector(k.direction,.75);
   c.exchanges.cancel(o.id);const point=o.root.position.clone().setY(.95);o.response.impulse('Spine_1',point,k.direction.clone().multiplyScalar(16));
   c.emit('bodyCollisions',f,{target:o.id,point:point.toArray()});break;
  }
  if(c.binActive!==false&&!k.propHit&&closest(binPosition,start,end).distanceTo(binPosition)<radius+binRadius+.05&&delta.dot(binPosition.clone().sub(start))>0){k.propHit=true;k.speed*=.35;c.emit('propImpacts',f,{point:binPosition.clone().setY(.65).toArray(),direction:k.direction.toArray()});}
  if(!k.wallHit)for(const w of walls.slice(0,18)){
   const q=closest(end,w.a,w.b);if(q.distanceTo(end)>radius+.025||delta.dot(w.normal)>=-.00001)continue;
   k.wallHit=true;k.speed=0;k.age=Math.max(k.age,.8);f.velocity.set(0,0,0);f.knockVelocity.set(0,0,0);
   const point=q.clone().setY(1);f.response.impulse('Spine_1',point,w.normal.clone().multiplyScalar(24));c.emit('wallImpacts',f,{point:point.toArray()});break;
  }
 }
}
