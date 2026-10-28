import {V,Q,wp,wq,setWorldQ,clamp} from './rig.js?v=20261027am';
// Driven angular degrees of freedom: impulses set velocity, springs restore the animated pose.
// Torques use the world-space contact lever arm; no instantaneous pose assignment on a hit.
export class ImpactResponse{
 constructor(rig,mass){this.rig=rig;this.mass=mass;this.reset();}
 reset(){this.joints=new Map();this.last=null;this.offset=V();this.velocity=V();}
 impulse(boneName,point,impulse){
  const zone=boneName==='Head'?'head':/Leg|Foot/.test(boneName)?'leg':/Arm|Hand/.test(boneName)?'arm':'body';
  this.velocity.addScaledVector(impulse,2.4/this.mass);
  const side=boneName.startsWith('Left')?'Left':'Right';
  const chains=zone==='head'?[['Spine_1',.55,3.2,.30],['Neck',.28,.32,.26],['Head',.65,.20,.58]]:
   zone==='leg'?[[side+'_UpLeg',.7,.85,.30],['Spine_1',.22,3.2,.20]]:
   zone==='arm'?[[side+'_Arm',.8,.38,.42],['Spine_1',.32,3.2,.24]]:[['Spine_1',1,2.3,.42],['Neck',.08,.32,.15]];
  for(const [name,weight,inertia,limit] of chains){
   const bone=this.rig.bones[name],pivot=wp(bone);
   // A head strike rotates about the neck, a torso strike about the lower spine.
   if(name==='Head')pivot.copy(wp(this.rig.bones.Neck));
   if(name==='Spine_1')pivot.copy(wp(this.rig.bones.Spine_0));
   const lever=point.clone().sub(pivot),torque=lever.cross(impulse).multiplyScalar(1.8*weight/(inertia*this.mass/85));
   let j=this.joints.get(name);if(!j){j={bone,angle:V(),velocity:V(),limit};this.joints.set(name,j);}
   j.velocity.add(torque).clampLength(0,zone==='head'?14:11);
  }
  this.last={bone:boneName,point:point.toArray(),impulse:impulse.toArray(),magnitude:impulse.length(),zone};
 }
 step(dt){
  const n=Math.max(1,Math.ceil(dt/(1/120))),h=dt/n;
  for(let i=0;i<n;i++){this.velocity.addScaledVector(this.offset,-65*h).multiplyScalar(Math.exp(-12*h));this.offset.addScaledVector(this.velocity,h).clampLength(0,.12);}
  for(const j of this.joints.values())for(let i=0;i<n;i++){
   const stiffness=j.bone.name==='Head'?125:85,damping=j.bone.name==='Head'?14:12;
   j.velocity.addScaledVector(j.angle,-stiffness*h).multiplyScalar(Math.exp(-damping*h));j.angle.addScaledVector(j.velocity,h);
   if(j.angle.length()>j.limit){j.angle.clampLength(0,j.limit);const normal=j.angle.clone().normalize(),out=j.velocity.dot(normal);if(out>0)j.velocity.addScaledVector(normal,-out);}
  }
 }
 apply(){
  const hips=this.rig.bones.Hips,p=wp(hips).add(this.offset);hips.position.copy(hips.parent.worldToLocal(p));hips.updateWorldMatrix(false,true);
  // Parent first: a hit to the head propagates into the neck and chest without stretching bones.
  for(const bone of this.rig.ordered){const j=this.joints.get(bone.name);if(!j)continue;const angle=j.angle.length();if(angle>1e-6)setWorldQ(bone,Q().setFromAxisAngle(j.angle.clone().normalize(),angle).multiply(wq(bone)));}

 }
}
