import * as C from 'cannon-es';
import {walls} from './engine/courtyard.js?v=20261027am';

// Separate sleeping debris world: no character solver or per-vertex contacts.
export class PlankPhysics {
 constructor(){
  this.world=new C.World({gravity:new C.Vec3(0,-9.81,0),allowSleep:true});
  this.world.broadphase=new C.SAPBroadphase(this.world);
  this.world.solver.iterations=16;
  this.world.defaultContactMaterial.friction=.65;
  this.world.defaultContactMaterial.restitution=.12;
  this.bodies=[];
  const floor=new C.Body({mass:0,shape:new C.Plane()});floor.quaternion.setFromEuler(-Math.PI/2,0,0);this.world.addBody(floor);
  for(const w of walls){const p=w.a.clone().lerp(w.b,.5).addScaledVector(w.normal,-.12);const body=new C.Body({mass:0,shape:new C.Box(new C.Vec3(w.length/2,1.5,.12)),position:new C.Vec3(p.x,1.5,p.z)});body.quaternion.setFromEuler(0,-Math.atan2(w.b.z-w.a.z,w.b.x-w.a.x),0);this.world.addBody(body);}
 }
 add(mesh,origin,velocity,index){
  const shape=mesh.geometry.parameters,width=shape.width*Math.abs(mesh.scale.x),height=shape.height*Math.abs(mesh.scale.y),depth=shape.depth*Math.abs(mesh.scale.z);
  return this.addRigid(mesh,[width,height,depth],origin,velocity,index);
 }
 addRigid(mesh,[width,height,depth],origin,velocity,index=0,mass=width*height*depth*450,shape=null){
  const body=new C.Body({mass,shape:shape||new C.Box(new C.Vec3(width/2,height/2,depth/2)),position:new C.Vec3(mesh.position.x,mesh.position.y,mesh.position.z),linearDamping:.16,angularDamping:.75,sleepSpeedLimit:.65,sleepTimeLimit:.65});
  body.quaternion.copy(mesh.quaternion);
  this.world.addBody(body);this.bodies.push(body);
  const speed=Math.min(7,Math.hypot(velocity.x,velocity.y,velocity.z)),length=Math.hypot(velocity.x,velocity.z)||1;
  const dx=mesh.position.x-origin.x,dz=mesh.position.z-origin.z;
  // Same incoming impulse, different lever arms: each plank tumbles differently.
  const impulse=new C.Vec3(mass*(velocity.x/length*speed*.45+dx*2.4),mass*(1.1+speed*.16+(index%4)*.14),mass*(velocity.z/length*speed*.45+dz*2.4));
  const lever=body.quaternion.vmult(new C.Vec3(width*.18*(index%2?1:-1),height*.22,depth*.18));
  body.applyImpulse(impulse,lever);return body;
 }
 addCylinder(mesh,top,bottom,height,origin,velocity,index,mass){return this.addRigid(mesh,[top*2,height,top*2],origin,velocity,index,mass,new C.Cylinder(top,bottom,height,16));}
 step(dt){if(dt<=0)return;if(this.bodies.some(b=>b.sleepState!==C.Body.SLEEPING))this.world.step(1/120,Math.min(dt,.05),6);
  // Small resting stacks otherwise wake each other on numerical contact jitter.
  for(const b of this.bodies){b.quietTime=b.position.y<.30&&b.velocity.length()<.06&&b.angularVelocity.length()<.5?(b.quietTime||0)+dt:0;if(b.quietTime>1.2)b.sleep();}
 }
 remove(body){this.world.removeBody(body);this.bodies=this.bodies.filter(b=>b!==body);}
 clear(){for(const b of this.bodies)this.world.removeBody(b);this.bodies=[];}
}
