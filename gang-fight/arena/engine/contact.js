import {V,wp,wq} from './rig.js?v=20261027am';
export function bodyCapsules(f,torsoOnly=false){
 const b=f.rig.bones,s=f.rig.bodyScale,parts=[];
 const add=(bone,end,r,zone)=>parts.push({bone:b[bone],a:wp(b[bone]),b:typeof end==='string'?wp(b[end]):wp(b[bone]).add(end),radius:r*s*(zone==='body'?(f.kind===6?1.48:f.kind===3?1.50:f.kind===2?1.32:1):1),zone});
 add('Head',V(0,.12*s,0).applyQuaternion(wq(b.Head).multiply(b.Head.userData.restQ.clone().invert())),.115,'head');
 add('Hips','Spine_1',.17,'body');add('Spine_1','Spine_2',.19,'body');add('Spine_2','Neck',.135,'body');
 if(torsoOnly)return parts;
 for(const side of ['Left','Right']){
  add(side+'_Arm',side+'_ForeArm',.065,'arm');add(side+'_ForeArm',side+'_Hand',.065,'arm');
  add(side+'_UpLeg',side+'_Leg',.095,'leg');add(side+'_Leg',side+'_Foot',.065,'leg');
 }
 return parts;
}
export function nearestOnCapsule(p,c){const x=c.b.x-c.a.x,y=c.b.y-c.a.y,z=c.b.z-c.a.z,length=x*x+y*y+z*z;const t=length?Math.max(0,Math.min(1,((p.x-c.a.x)*x+(p.y-c.a.y)*y+(p.z-c.a.z)*z)/length)):0;return V(c.a.x+x*t,c.a.y+y*t,c.a.z+z*t);}
// Conservative advancement finds the first surface crossing, even across a fast 30 fps keyframe.
export function sweepCapsule(from,to,c,radius){
 const radiusSum=c.radius+radius,delta=to.clone().sub(from),length=delta.length();let t=0;
 for(let i=0;i<32&&t<=1;i++){
  const p=from.clone().addScaledVector(delta,t),near=nearestOnCapsule(p,c),d=p.distanceTo(near)-radiusSum;
  if(d<=.0005){let normal=p.clone().sub(near);if(normal.lengthSq()<1e-9)normal.copy(delta).negate();normal.normalize();return {t,point:near.addScaledVector(normal,radiusSum+.004),normal,capsule:c};}
  if(length<1e-8)return null;t+=Math.max(d/length,.0001);
 }
 return null;
}
