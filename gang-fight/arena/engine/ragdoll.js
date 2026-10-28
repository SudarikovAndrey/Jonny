import {GroundRest} from './ground-rest.js?v=20261027all-updates';
import {walls} from './courtyard.js?v=20261027am';
import * as C from 'cannon-es';
import {Matrix4} from 'three';
import {V,Q,wp,wq,setWorldQ} from './rig.js?v=20261027am';
const cv=v=>new C.Vec3(v.x,v.y,v.z);
const tq=q=>Q().set(q.x,q.y,q.z,q.w);
export class Physics{
 constructor(){
  this.world=new C.World({gravity:new C.Vec3(0,-9.81,0),allowSleep:true});
  this.world.solver.iterations=28;this.world.solver.tolerance=.0001;
  this.world.defaultContactMaterial.friction=.58;this.world.defaultContactMaterial.restitution=.015;
  const floor=new C.Body({mass:0,shape:new C.Plane(),collisionFilterGroup:1,collisionFilterMask:-1});floor.quaternion.setFromEuler(-Math.PI/2,0,0);this.world.addBody(floor);this.ragdolls=[];
  for(const w of walls){const midpoint=w.a.clone().add(w.b).multiplyScalar(.5).addScaledVector(w.normal,-.12);
   const body=new C.Body({mass:0,shape:new C.Box(new C.Vec3(w.length/2+.03,1.5,.12)),position:new C.Vec3(midpoint.x,1.5,midpoint.z),collisionFilterGroup:1,collisionFilterMask:2});
   body.quaternion.setFromEuler(0,-Math.atan2(w.b.z-w.a.z,w.b.x-w.a.x),0);this.world.addBody(body);
  }
 }
 step(dt){for(const r of this.ragdolls)r.resistTwist(dt);if(this.ragdolls.some(r=>r.parts.length&&!r.frozen))this.world.step(1/120,dt,8);for(const r of [...this.ragdolls]){r.sync();if(r.temporary){const k=r.fighter.knockdown;if(k){const bones=r.fighter.rig.ordered;if(!k.pose||k.pose.length!==bones.length)k.pose=bones.map(b=>({p:b.position.clone(),q:b.quaternion.clone()}));else bones.forEach((b,i)=>{k.pose[i].p.copy(b.position);k.pose[i].q.copy(b.quaternion);});}if(!k||(r.age>=.48&&(r instanceof GroundRest||r.limbsResting()))||r.age>=1.25){this.remove(r.fighter);if(k)k.ragdoll=null;}}else r.settle();}}
 clear(){for(const r of this.ragdolls){for(const c of r.constraints)this.world.removeConstraint(c);for(const p of r.parts)this.world.removeBody(p.body);}this.ragdolls=[];}
 remove(fighter){for(const r of this.ragdolls.filter(r=>r.fighter===fighter)){for(const c of r.constraints)this.world.removeConstraint(c);for(const p of r.parts)this.world.removeBody(p.body);}this.ragdolls=this.ragdolls.filter(r=>r.fighter!==fighter);}
 add(fighter,impulse,part='Spine_2',temporary=false){this.remove(fighter);const r=(fighter.down||temporary||fighter.kind===6)?new GroundRest(this.world,fighter):new Ragdoll(this.world,fighter,impulse,part);r.temporary=temporary;this.ragdolls.push(r);return r;}
}
class Ragdoll{
 constructor(world,fighter,impulse,hitPart){
  this.fighter=fighter;this.parts=[];this.constraints=[];this.bindings=[];this.age=0;this.frozen=false;this.stillTime=0;
  const bones=fighter.rig.bones,scale=fighter.rig.bodyScale,bulk=fighter.kind===6?1.48:fighter.kind===3?1.5:fighter.kind===2?1.32:1;
  // Two broad rigid trunk segments preserve a human silhouette; the lumbar joint bends only 14 degrees.
  const specs=[
   {name:'pelvis',bone:'Hips',end:'Spine_1',mass:20,r:.15,width:.18,depth:.125},
   {name:'chest',bone:'Spine_1',end:'Neck',mass:24,r:.17,width:.235,depth:.135,parent:'pelvis',cone:.24,twist:.20},
   {name:'head',bone:'Head',mass:5,r:.105,parent:'chest',cone:.45,twist:.35},
  ];
  for(const side of ['Left','Right'])specs.push(
   {name:side+'arm',bone:side+'_Arm',end:side+'_ForeArm',mass:3,r:.064,parent:'chest',cone:1.1,twist:.5},
   {name:side+'forearm',bone:side+'_ForeArm',end:side+'_Hand',mass:2,r:.056,parent:side+'arm',cone:.65,twist:.10},
   {name:side+'thigh',bone:side+'_UpLeg',end:side+'_Leg',mass:8,r:.095,parent:'pelvis',cone:1.0,twist:.20},
   {name:side+'shin',bone:side+'_Leg',end:side+'_Foot',mass:4,r:.066,parent:side+'thigh',cone:.90,twist:.055},
   {name:side+'foot',bone:side+'_Foot',end:side+'_Toe_Base',mass:1,r:.055,parent:side+'shin',cone:.32,twist:.15}
  );
  const byName={};
  for(const spec of specs){
   const bone=bones[spec.bone],a=wp(bone),headAxis=V(0,.18*scale,0).applyQuaternion(bone.userData.restQ.clone().invert()).applyQuaternion(wq(bone)),b=spec.end?wp(bones[spec.end]):a.clone().add(headAxis);
   const length=a.distanceTo(b),center=a.clone().add(b).multiplyScalar(.5),q=Q().setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());
   if(spec.width){
    const y=b.clone().sub(a).normalize(),x=wp(bones.Left_Arm).sub(wp(bones.Right_Arm));x.addScaledVector(y,-x.dot(y)).normalize();
    q.setFromRotationMatrix(new Matrix4().makeBasis(x,y,x.clone().cross(y).normalize()));
   }
   const body=new C.Body({mass:spec.mass*fighter.mass/85,position:cv(center),quaternion:new C.Quaternion(q.x,q.y,q.z,q.w),linearDamping:.48,angularDamping:.78,allowSleep:true,sleepTimeLimit:1.2,sleepSpeedLimit:.12,collisionFilterGroup:2,collisionFilterMask:3});
   if(spec.width)body.addShape(new C.Box(new C.Vec3(spec.width*scale*bulk,length*.5,spec.depth*scale*bulk)));
   else{
    const r=spec.r*scale,h=Math.max(.01,length-2*r),s=h*.5;
    body.addShape(new C.Cylinder(r,r,h,8));body.addShape(new C.Sphere(r),new C.Vec3(0,s,0));body.addShape(new C.Sphere(r),new C.Vec3(0,-s,0));
   }
   body.velocity.set(impulse.x,impulse.y,impulse.z);
   world.addBody(body);const p={...spec,body,center,joint:a,q};this.parts.push(p);byName[spec.name]=p;
  }
  for(const p of this.parts){
   const pa=byName[p.parent];if(!pa)continue;
   const point=cv(p.joint),pivotA=pa.body.pointToLocalFrame(point),pivotB=p.body.pointToLocalFrame(point);
   const axis=cv(p.joint.clone().sub(pa.center).normalize()),axisA=pa.body.vectorToLocalFrame(axis),axisB=p.body.vectorToLocalFrame(axis);
   if(fighter.kind===6&&p.name.endsWith('shin')){
    // Knees flex around the thigh's anatomical right axis, never as ball joints.
    const upper=bones[pa.bone],orientation=wq(upper).multiply(upper.userData.restQ.clone().invert());
    const kneeAxis=V(1,0,0).applyQuaternion(orientation).normalize();
    const hinge=new C.HingeConstraint(pa.body,p.body,{pivotA,pivotB,axisA:pa.body.vectorToLocalFrame(cv(kneeAxis)),axisB:p.body.vectorToLocalFrame(cv(kneeAxis)),maxForce:8000,collideConnected:false});
    hinge.knee=true;world.addConstraint(hinge);this.constraints.push(hinge);continue;
   }
   const c=new C.ConeTwistConstraint(pa.body,p.body,{pivotA,pivotB,axisA,axisB,angle:p.cone,twistAngle:p.twist,maxForce:8000,collideConnected:false});
   c.twistEquation.enabled=false;c.restRelative=pa.body.quaternion.inverse().mult(p.body.quaternion);c.softness=p.name==='chest'?65:24;world.addConstraint(c);this.constraints.push(c);
  }
  // Bind every torso bone to its actual rigid segment; do not accumulate rotations along the spine.
  const owners={Hips:'pelvis',Spine_0:'pelvis',Spine_1:'chest',Spine_2:'chest',Neck:'chest',Head:'head'};
  for(const p of this.parts)owners[p.bone]=p.name;
  for(const bone of fighter.rig.ordered){
   const owner=byName[owners[bone.name]];if(!owner)continue;
   const inv=owner.q.clone().invert();this.bindings.push({bone,body:owner.body,position:wp(bone).sub(owner.center).applyQuaternion(inv),rotation:inv.clone().multiply(wq(bone))});
  }
  // The authored knockdown carries the strike momentum; no second impulse is added on landing.

 }
 resistTwist(dt){
  if(this.frozen)return;this.age+=dt;
  const maxSpeed=Math.max(...this.parts.map(p=>p.body.velocity.length()+p.body.angularVelocity.length()*.2));
  this.stillTime=maxSpeed<.25?this.stillTime+dt:0;
  for(const c of this.constraints){
   if(c.knee){
    const axis=c.bodyA.vectorToWorldFrame(c.axisA),a=c.bodyA.vectorToWorldFrame(new C.Vec3(0,1,0)),b=c.bodyB.vectorToWorldFrame(new C.Vec3(0,1,0));
    const angle=Math.atan2(axis.dot(a.cross(b)),a.dot(b)),excess=angle-Math.max(.15,Math.min(2.20,angle));
    if(excess){const omega=c.bodyB.angularVelocity.vsub(c.bodyA.angularVelocity).dot(axis),amount=Math.max(-160,Math.min(160,excess*350+omega*12)),torque=axis.scale(amount);c.bodyA.torque.vadd(torque,c.bodyA.torque);c.bodyB.torque.vsub(torque,c.bodyB.torque);}continue;
   }
   const rel=c.bodyA.quaternion.inverse().mult(c.bodyB.quaternion),delta=rel.mult(c.restRelative.inverse());
   const projection=delta.x*c.axisA.x+delta.y*c.axisA.y+delta.z*c.axisA.z;
   let twist=2*Math.atan2(projection,delta.w);twist=Math.atan2(Math.sin(twist),Math.cos(twist));
   const excess=Math.max(0,Math.abs(twist)-c.twistAngle)*Math.sign(twist);if(!excess)continue;
   const axis=c.bodyA.vectorToWorldFrame(c.axisA),omega=c.bodyB.angularVelocity.vsub(c.bodyA.angularVelocity).dot(axis);
   const amount=Math.max(-22,Math.min(22,excess*c.softness+omega*.8)),torque=axis.scale(amount);
   c.bodyA.torque.vadd(torque,c.bodyA.torque);c.bodyB.torque.vsub(torque,c.bodyB.torque);
  }
 }
 limbsResting(){
  const scale=this.fighter.rig.bodyScale;
  return this.parts.filter(p=>p.name.endsWith('foot')).every(p=>p.body.position.y<.24*scale)&&this.parts.filter(p=>p.name.endsWith('shin')).every(p=>p.body.position.y<.42*scale);
 }
 settle(){
  if(this.frozen)return;
  const pelvis=this.parts[0].body;
  if(this.limbsResting()&&((this.age>.4&&this.stillTime>.35)||(this.age>1.4&&pelvis.position.y<.3))){
   this.frozen=true;this.fighter.state='down';
   for(const c of this.constraints)c.disable();
   for(const {body} of this.parts){body.velocity.setZero();body.angularVelocity.setZero();body.force.setZero();body.torque.setZero();body.mass=0;body.type=C.Body.STATIC;body.updateMassProperties();body.sleep();}
  }
 }
 sync(){
  if(this.frozen)return;
  for(const b of this.bindings){
   const q=tq(b.body.quaternion),point=V(b.body.position.x,b.body.position.y,b.body.position.z).add(b.position.clone().applyQuaternion(q));
   if(b.bone.name==='Hips')b.bone.position.copy(b.bone.parent.worldToLocal(point));else b.bone.position.copy(b.bone.userData.restPos);setWorldQ(b.bone,q.multiply(b.rotation));
  }
 }
}
