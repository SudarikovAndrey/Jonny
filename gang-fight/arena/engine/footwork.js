import {Q,V,wp,wq,twoBone,setWorldQ,clamp} from './rig.js?v=20261027am';
const smooth=t=>t*t*t*(t*(t*6-15)+10);
// World-space stance: one foot supports the body while the other takes a short step.
export class Footwork{
 constructor(rig,profile={}){this.profile=profile;this.lastStep=null;this.rig=rig;this.active=false;this.swing=null;this.feet={};this.lower=0;}
 prepare(enabled){
  if(enabled&&!this.active){
   this.feet=Object.fromEntries(['Left','Right'].map(side=>[side,{position:wp(this.rig.bones[side+'_Foot']),rotation:Q().setFromAxisAngle(V(0,1,0),this.rig.root.rotation.y).multiply(this.rig.bones[side+'_Foot'].userData.restQ)}]));this.swing=null;this.lower=0;for(const side of ['Left','Right'])this.feet[side].position.y=this.rig.bones[side+'_Foot'].userData.restWorldPos.y+.003;
  }
  this.active=enabled;
 }
 update(dt,yaw,velocity){
  const rig=this.rig,speed=velocity.length(),ideal={},heavy=!!this.profile.heavy;
  this.restTime=Math.max(0,(this.restTime||0)-dt);
  const moving=speed>.14;
  const stepDuration=clamp((heavy?.25:.23)-speed*.065,.14,heavy?.25:.23);
  const forward=V(Math.sin(yaw),0,Math.cos(yaw)),right=V(Math.cos(yaw),0,-Math.sin(yaw));
  for(const side of ['Left','Right']){
   const sign=side==='Left'?1:-1,foot=rig.bones[side+'_Foot'],position=rig.root.position.clone().addScaledVector(right,sign*(heavy?.235:.17)*rig.bodyScale).addScaledVector(forward,(sign*(heavy?.13:.20))*rig.bodyScale);
   position.y=foot.userData.restWorldPos.y+.003;
   ideal[side]={position,rotation:Q().setFromAxisAngle(V(0,1,0),yaw).multiply(foot.userData.restQ)};
  }
  if(!this.swing){
   // Do not inherit a displaced support foot's fore/aft offset after a run or kick.
   // That recursively dragged both targets away from the pelvis.
   const candidates=['Left','Right'].map(side=>{
    const target=ideal[side].position.clone().addScaledVector(velocity,stepDuration*.7),across=V(Math.cos(yaw),0,-Math.sin(yaw)),sign=side==='Left'?1:-1,other=this.feet[side==='Left'?'Right':'Left'].position;
    const supportNear=other.distanceTo(ideal[side==='Left'?'Right':'Left'].position)<.32;
    const width=target.clone().sub(other).dot(across)*sign;if(supportNear&&width<.26)target.addScaledVector(across,sign*(.26-width));
    const stagger=target.clone().sub(other).dot(forward)*sign;const minStagger=heavy?.18:.28;const otherSide=side==='Left'?'Right':'Left';if(other.distanceTo(ideal[otherSide].position)<.32&&stagger<minStagger)target.addScaledVector(forward,sign*(minStagger-stagger));
    const error=target.distanceTo(this.feet[side].position);
    const turn=this.feet[side].rotation.angleTo(ideal[side].rotation);
    return {side,target,error,turn,score:error+(turn>.25?.12:0)+(speed>.15?Math.max(0,this.feet[side].position.clone().sub(other).dot(velocity.clone().normalize()))*.12:0)};
   }).sort((a,b)=>b.score-a.score);
   let best=candidates[0];
   if(speed>.14&&this.lastStep&&best.side===this.lastStep){const alternate=candidates.find(c=>c.side!==this.lastStep);if(alternate.error>.065&&best.error<.9)best=alternate;}
   if((moving||best.error>.5||this.restTime===0)&&(best.error>(moving?(heavy?.09:.135):.24)||(best.turn>.65&&best.error>.09))){
    const from=this.feet[best.side],delta=best.target.clone().sub(from.position).clampLength(0,best.error>.5?best.error:moving?Math.max(.42,speed*stepDuration*2.5):.32),to=from.position.clone().add(delta);
    to.y=ideal[best.side].position.y;
    this.swing={side:best.side,age:0,duration:best.error>.5?.16:stepDuration,from:from.position.clone(),to,fromQ:from.rotation.clone(),toQ:ideal[best.side].rotation.clone(),height:clamp(delta.length()*.24,heavy?.085:.065,.15)};
   }
  }
  if(this.swing){
   const s=this.swing;s.age+=dt;const u=clamp(s.age/s.duration,0,1),foot=this.feet[s.side];
   foot.position.copy(s.from).lerp(s.to,smooth(u));foot.position.y+=Math.sin(Math.PI*u)**2*s.height;foot.rotation.copy(s.fromQ).slerp(s.toQ,smooth(u));
   if(u===1){this.lastStep=s.side;this.swing=null;this.restTime=moving?0:.28;}
  }
  // Lower the pelvis only when an anchored foot would otherwise overextend the leg.
  let lower=0;
  for(const side of ['Left','Right']){
   const a=wp(rig.bones[side+'_UpLeg']),b=wp(rig.bones[side+'_Leg']),c=wp(rig.bones[side+'_Foot']),target=this.feet[side].position;
   const length=(a.distanceTo(b)+b.distanceTo(c))*.95,dx=a.x-target.x,dz=a.z-target.z;
   lower=Math.max(lower,a.y-target.y-Math.sqrt(Math.max(.01,length*length-dx*dx-dz*dz)));
  }
  // Respect reach immediately when lowering; ease the return upward.
  const required=Math.min(.09*rig.bodyScale,Math.max(0,lower));
  this.lower=required>this.lower?required:this.lower+(required-this.lower)*(1-Math.exp(-dt*12));
  if(this.lower>0){const h=rig.bones.Hips,p=wp(h);p.y-=this.lower;h.position.copy(h.parent.worldToLocal(p));h.updateWorldMatrix(false,true);}
  for(const side of ['Left','Right']){
   const plant=this.feet[side],turn=plant.rotation.angleTo(ideal[side].rotation);
   // Let the supporting shoe pivot slightly instead of storing an ever-growing
   // ankle twist while the pelvis follows a circling opponent.
   if(turn>.4)plant.rotation.slerp(ideal[side].rotation,1-.4/turn);
   const foot=rig.bones[side+'_Foot'],pole=wp(rig.bones[side+'_UpLeg']).add(V((side==='Left'?.12:-.12),-.25,.45).applyAxisAngle(V(0,1,0),yaw));
   twoBone(rig.bones[side+'_UpLeg'],rig.bones[side+'_Leg'],foot,plant.position,pole);setWorldQ(foot,plant.rotation);
   rig.feet[side].pos.copy(wp(foot));rig.feet[side].phase=this.swing?.side===side?.5:1;
  }
 }
}
