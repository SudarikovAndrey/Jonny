import * as T from 'three';
const up=new T.Vector3(0,1,0);
export const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z);
export const Q=()=>new T.Quaternion();
export const clamp=T.MathUtils.clamp;
export function wp(b){return b.getWorldPosition(V())}
export function wq(b){return b.getWorldQuaternion(Q())}
export function setWorldQ(b,q){b.quaternion.copy(wq(b.parent).invert().multiply(q));b.updateWorldMatrix(false,true)}
export function aim(b,end,target,weight=1){const origin=wp(b),a=wp(end).sub(origin).normalize(),d=target.clone().sub(origin).normalize();const q=Q().setFromUnitVectors(a,d).multiply(wq(b));if(weight<1)q.copy(wq(b).slerp(q,weight));setWorldQ(b,q)}
// Analytic two-bone IK, preserving limb lengths and a stable anatomical pole.
export function twoBone(a,b,c,target,pole,weight=1,fraction=1){
 const p=wp(a),m=wp(b),e=wp(b).lerp(wp(c),fraction),l1=p.distanceTo(m),l2=m.distanceTo(e),dir=target.clone().sub(p),raw=dir.length();if(raw<.0001)return;
 const d=clamp(raw,Math.abs(l1-l2)+.008,l1+l2-.007);dir.normalize();
 const isLeg=a.name.includes('UpLeg'),yaw=a.userData.poseYaw||0;
 // Anatomical bend plane is rebuilt from facing, never from yesterday's world-space knee.
 const bend=isLeg?V(Math.sin(yaw)+(a.name.startsWith('Left')?.10:-.10)*Math.cos(yaw),0,Math.cos(yaw)-(a.name.startsWith('Left')?.10:-.10)*Math.sin(yaw)):pole.clone().sub(p);
 bend.addScaledVector(dir,-bend.dot(dir));
 if(bend.lengthSq()<1e-7){bend.copy(V(Math.cos(yaw),0,-Math.sin(yaw)));bend.addScaledVector(dir,-bend.dot(dir));}
 bend.normalize();
 if(isLeg){const facing=Q().setFromAxisAngle(up,yaw);setWorldQ(a,facing.clone().multiply(a.userData.restQ));setWorldQ(b,facing.clone().multiply(b.userData.restQ));}
 const x=(l1*l1-l2*l2+d*d)/(2*d),h=Math.sqrt(Math.max(0,l1*l1-x*x));const knee=p.clone().addScaledVector(dir,x).addScaledVector(bend,h);
 aim(a,b,knee,weight);aim(b,c,p.clone().addScaledVector(dir,d),weight);
}
function sample(clip,time,loop){
 const n=clip.frames.length-1;let frame=time*clip.fps;
 frame=loop?((frame%n)+n)%n:clamp(frame,0,n);
 const i=Math.floor(frame),j=Math.min(i+1,n);return {a:clip.frames[i],b:clip.frames[j],t:frame-i,phase:frame/n};
}
export class Rig{
 constructor(root,motions){
  this.root=root;this.motions=motions;this.bones={};this.ordered=[];root.updateMatrixWorld(true);
  root.traverse(b=>{if(b.isBone){this.bones[b.name]=b;this.ordered.push(b);b.userData.restQ=wq(b);b.userData.restLocalQ=b.quaternion.clone();b.userData.restWorldPos=wp(b);b.userData.restPos=b.position.clone();b.userData.delta=Q();}});
  this.hipHeight=wp(this.bones.Hips).y;this.bodyScale=this.hipHeight/.985;this.groundFootY=wp(this.bones.Left_Foot).y;this.feet={};this.hipDelta=V();this.currentClip=null;this.maxIKCorrection=0;
  for(const side of ['Left','Right'])this.feet[side]={pos:wp(this.bones[side+'_Foot']),phase:1,anchor:null,contact:null};
 }
 applyPose(deltas,hip,yawQ){
  const desired=new Map();
  for(let i=0;i<this.ordered.length;i++){
   const b=this.ordered[i],world=yawQ.clone().multiply(deltas[i]).multiply(b.userData.restQ),parent=desired.get(b.parent)||wq(b.parent);
   if(b.userData.secondary){b.quaternion.copy(b.userData.restLocalQ);world.copy(parent).multiply(b.quaternion);}else b.quaternion.copy(parent.clone().invert().multiply(world));b.position.copy(b.userData.restPos);desired.set(b,world);
  }
  this.root.updateMatrixWorld(true);const b=this.bones.Hips,p=wp(b).add(hip.clone().applyQuaternion(yawQ));b.position.copy(b.parent.worldToLocal(p));this.root.updateMatrixWorld(true);
 }
 animate(name,time,dt,yaw,loop=true,upper=null,stride=1,fadeDuration=null){
  for(const b of this.ordered)b.userData.poseYaw=yaw;
  const clip=this.motions[name]||this.motions.idle,s=sample(clip,time,loop);
  if(name!==this.currentClip){
   const gaitChange=this.currentClip&&(name.startsWith('walk')||this.currentClip.startsWith('walk')||name==='idle');
   this.stepTransition=gaitChange?Object.fromEntries(['Left','Right'].map(side=>[side,{start:wp(this.bones[side+'_Foot']),q:wq(this.bones[side+'_Foot'])}])):null;
   this.transitionDuration=fadeDuration??(gaitChange?.26:loop?.18:.12);
   this.transition=0;this.previousPose=this.ordered.map(b=>Q().setFromAxisAngle(up,-yaw).multiply(wq(b)).multiply(b.userData.restQ.clone().invert()));this.previousHip=this.hipDelta.clone();this.currentClip=name;this.resetContacts();
  }
  this.transition=Math.min(1,(this.transition||0)+dt/this.transitionDuration);const blend=this.transition*this.transition*(3-2*this.transition);
  const map=clip.index||(clip.index=Object.fromEntries(clip.names.map((n,i)=>[n,i])));
  // Fade the upper-body layer even when the locomotion clip does not change.
  const walking=name.startsWith('walk');
  if(upper)this.upperName=upper;
  this.upperWeight=walking?clamp((this.upperWeight||0)+(upper?1:-1)*dt/.38,0,1):0;
  const upperBlend=this.upperWeight*this.upperWeight*(3-2*this.upperWeight);
  const upperClip=walking&&this.upperWeight>0?this.motions[this.upperName]:null,us=upperClip?sample(upperClip,time,true):null;
  if(upperClip&&!upperClip.index)upperClip.index=Object.fromEntries(upperClip.names.map((n,i)=>[n,i]));
  const yawQ=Q().setFromAxisAngle(up,yaw);
  const deltas=this.ordered.map(b=>{
   const k=map[b.name],delta=k===undefined?Q():Q().fromArray(s.a.q,k*4).slerp(Q().fromArray(s.b.q,k*4),s.t);
   // Mixamo uses a T bind; Meshy uses an A bind. Align limb rest directions
   // before applying recorded world deltas, without changing the animation path.
   if(clip.bindDirections?.[b.name]&&/_(Arm|ForeArm|Hand|UpLeg|Leg|Foot)$/.test(b.name)){
    const child=b.name.endsWith('_Hand')?this.bones[b.name+'_C_0']:b.children.find(o=>o.isBone&&!o.userData.secondary);
    if(child){const rest=child.userData.restWorldPos.clone().sub(b.userData.restWorldPos).normalize();delta.multiply(Q().setFromUnitVectors(rest,V().fromArray(clip.bindDirections[b.name])));}
   }
   const useUpper=upperClip&&b.name!=='Hips'&&!/(UpLeg|_Leg|_Foot|_Toe)/.test(b.name),uk=useUpper?upperClip.index[b.name]:undefined;
   if(uk!==undefined)delta.slerp(Q().fromArray(us.a.q,uk*4).slerp(Q().fromArray(us.b.q,uk*4),us.t),upperBlend);
   return delta;
  });
  let hip=V().fromArray(s.a.hip).lerp(V().fromArray(s.b.hip),s.t).multiplyScalar(this.hipHeight);
  if(name.startsWith('walk')){
   const first=clip.frames[0].hip,last=clip.frames.at(-1).hip;
   hip.x-=(last[0]-first[0])*s.phase*this.hipHeight;hip.z-=(last[2]-first[2])*s.phase*this.hipHeight;
  }
  if(this.stepTransition&&blend<1){
   this.applyPose(deltas,hip,yawQ);if(name.startsWith('walk'))this.shortenStride(yaw,stride);this.ground();
   for(const side of ['Left','Right']){const st=this.stepTransition[side];st.end=wp(this.bones[side+'_Foot']);st.endQ=wq(this.bones[side+'_Foot']);}
   if(!this.stepTransition.first){
    this.stepTransition.first=this.stepTransition.Left.end.y>this.stepTransition.Right.end.y?'Left':'Right';
   }
  }
  if(blend<1){for(let i=0;i<deltas.length;i++)deltas[i].copy(this.previousPose[i].clone().slerp(deltas[i],blend));hip.lerpVectors(this.previousHip,hip,blend);}
  for(let i=0;i<deltas.length;i++)this.ordered[i].userData.delta.copy(deltas[i]);
  this.hipDelta.copy(hip);this.applyPose(deltas,hip,yawQ);if(name.startsWith('walk'))this.shortenStride(yaw,stride);
 }
 overlay(name,time,yaw,weight,maxAngle=.28){
  const clip=this.motions[name],s=sample(clip,time,false),yawQ=Q().setFromAxisAngle(up,yaw);
  const map=clip.index||(clip.index=Object.fromEntries(clip.names.map((n,i)=>[n,i])));
  // Keep the animated support legs. Apply only the difference from the reaction's guard frame.
  for(const boneName of ['Spine_0','Spine_1','Spine_2','Neck','Head']){
   const b=this.bones[boneName],k=map[boneName];if(k===undefined)continue;
   const delta=Q().fromArray(s.a.q,k*4).slerp(Q().fromArray(s.b.q,k*4),s.t).multiply(Q().fromArray(clip.frames[0].q,k*4).invert());
   const angle=2*Math.acos(clamp(Math.abs(delta.w),0,1));
   delta.slerp(Q(),1-Math.min(weight,maxAngle/Math.max(angle,.0001)));
   const world=yawQ.clone().multiply(delta).multiply(b.userData.delta).multiply(b.userData.restQ);
   setWorldQ(b,world);
  }
 }
 resetContacts(){for(const f of Object.values(this.feet)){f.anchor=null;f.contact=null;f.phase=.5;f.correction=V();}}
 resetFeet(){for(const b of this.ordered)delete b.userData.ikBend;this.currentClip=null;this.hipDelta.set(0,0,0);this.resetContacts();}
 sole(side,kind){
  const foot=this.bones[side+'_Foot'],outline=foot.userData.soleOutline?.[kind];
  if(outline?.length){let lowest=null;foot.updateWorldMatrix(true,false);for(const xyz of outline){const p=V().fromArray(xyz).applyMatrix4(foot.matrixWorld);if(!lowest||p.y<lowest.y)lowest=p;}return lowest;}
  const bone=this.bones[side+(kind==='toe'?'_Toe_Base':'_Foot')];const clearance=bone.userData.restWorldPos.y;
  const offset=V(0,-clearance,0).applyQuaternion(bone.userData.restQ.clone().invert()).applyQuaternion(wq(bone));return wp(bone).add(offset);
 }
 ground(elevation=0){
  let bottom=Infinity;for(const side of ['Left','Right'])for(const kind of ['toe','heel'])bottom=Math.min(bottom,this.sole(side,kind).y);
  const dy=this.bones.Left_Foot.userData.soleOutline?elevation-bottom:clamp(elevation-bottom,-.12,.12),hip=this.bones.Hips,p=wp(hip);p.y+=dy;hip.position.copy(hip.parent.worldToLocal(p));hip.updateWorldMatrix(false,true);
 }
 stabilizeFeet(dt,enabled=true,limit=.022){
  this.maxIKCorrection=0;
  for(const side of ['Left','Right']){
   const f=this.feet[side],foot=this.bones[side+'_Foot'];
   if(enabled&&this.stepTransition&&this.transition<1){
    const st=this.stepTransition[side],phase=clamp(this.transition*2-(this.stepTransition.first===side?0:1),0,1),u=phase*phase*(3-2*phase);
    const target=st.start.clone().lerp(st.end,u);target.y+=Math.sin(Math.PI*phase)*Math.min(.075,st.start.distanceTo(st.end)*.3);
    twoBone(this.bones[side+'_UpLeg'],this.bones[side+'_Leg'],foot,target,wp(this.bones[side+'_Leg']));
    setWorldQ(foot,st.q.clone().slerp(st.endQ,u));f.anchor=null;f.contact=null;f.phase=phase>0&&phase<1?.5:1;f.pos.copy(wp(foot));f.correction=V();continue;
   }
   const heel=this.sole(side,'heel'),toe=this.sole(side,'toe');
   const kind=toe.y<heel.y?'toe':'heel',contact=kind==='toe'?toe:heel,wanted=V();
   if(!enabled||contact.y>.027){f.anchor=null;f.contact=null;f.phase=.5;}
   else{
    if(!f.anchor||f.contact!==kind||f.anchor.distanceTo(contact)>limit+.033){f.anchor=contact.clone();f.contact=kind;}
    wanted.copy(f.anchor).sub(contact);wanted.y=0;wanted.clampLength(0,limit);f.phase=1;
   }
   f.correction??=V();
   if(!enabled)f.correction.set(0,0,0);
   else if(dt===0)f.correction.copy(wanted);
   else f.correction.add(wanted.sub(f.correction).clampLength(0,dt*.55));
   if(f.correction.lengthSq()>1e-8){
    const target=wp(foot).add(f.correction),orientation=wq(foot),pole=wp(this.bones[side+'_Leg']);
    twoBone(this.bones[side+'_UpLeg'],this.bones[side+'_Leg'],foot,target,pole);setWorldQ(foot,orientation);this.maxIKCorrection=Math.max(this.maxIKCorrection,f.correction.length());
   }
   f.pos.copy(wp(foot));
  }
 }
 closeFists(){
  // Meshy has grouped grip joints, not the source skeleton's individual fingers.
  // Use the grouped-fist bind offsets authored with this mesh, while retaining the FBX wrist.
  for(const [side,sign] of [['Left',1],['Right',-1]])for(const [suffix,angle,axis] of [['_Hand_C_0',1.15,V(0,0,-1)],['_Hand_C_1',1.35,V(0,0,-1)],['_Hand_A_0',.75,V(0,1,0)]]){
   const b=this.bones[side+suffix];if(!b)continue;
   const local=axis.applyQuaternion(b.userData.restQ.clone().invert()).normalize();
   b.quaternion.copy(b.userData.restLocalQ).multiply(Q().setFromAxisAngle(local,angle*sign));b.updateWorldMatrix(false,true);
  }
 }
 strikePoint(side,kick=false){
  if(kick)return wp(this.bones[side+'_Foot']).lerp(wp(this.bones[side+'_Toe_Base']),.6);
  const names=['B','C','D','E'].map(n=>side+'_Hand_'+n+'_0');
  return names.reduce((sum,n)=>sum.add(wp(this.bones[n])),V()).multiplyScalar(.25);
 }
 strikeContact(side,point,kick=false){
  const end=this.bones[side+(kick?'_Foot':'_Hand')],offset=this.strikePoint(side,kick).sub(wp(end));
  this.limbContact(side,point.clone().sub(offset),kick);
 }
 plantFeet(plants){
  const targets={};let lower=0;
  for(const [side,plant] of Object.entries(plants)){
   const foot=this.bones[side+'_Foot'],raw=wq(foot);plant.rotation??=raw.clone();
   const max=side==='Right'?.48:.25,angle=plant.rotation.angleTo(raw);let weight=Math.min(1,max/Math.max(angle,.001)),lo=0,hi=weight;
   // A pivot is valid only while the opposite end of the sole stays above the ground.
   for(let i=0;i<6;i++){
    setWorldQ(foot,plant.rotation.clone().slerp(raw,weight));
    const bottom=Math.min(this.sole(side,'heel').y,this.sole(side,'toe').y)+plant.point.y-this.sole(side,plant.kind).y;
    if(bottom<-.001){hi=weight;weight=(lo+hi)*.5;}else{lo=weight;if(i===0)break;weight=(lo+hi)*.5;}
   }
   const orientation=plant.rotation.clone().slerp(raw,lo);setWorldQ(foot,orientation);
   const target=wp(foot).add(plant.point.clone().sub(this.sole(side,plant.kind)));
   targets[side]={target,orientation};const hip=wp(this.bones[side+'_UpLeg']),knee=wp(this.bones[side+'_Leg']),length=hip.distanceTo(knee)+knee.distanceTo(wp(foot))-.012,dx=hip.x-target.x,dz=hip.z-target.z;
   lower=Math.max(lower,hip.y-target.y-Math.sqrt(Math.max(.1,length*length-dx*dx-dz*dz)));
  }
  if(lower>0){const h=this.bones.Hips,p=wp(h);p.y-=Math.min(.16,lower);h.position.copy(h.parent.worldToLocal(p));h.updateWorldMatrix(false,true);}
  for(const [side,{target,orientation}] of Object.entries(targets)){
   const foot=this.bones[side+'_Foot'];twoBone(this.bones[side+'_UpLeg'],this.bones[side+'_Leg'],foot,target,wp(this.bones[side+'_Leg']));setWorldQ(foot,orientation);
   this.feet[side].pos.copy(wp(foot));this.feet[side].phase=1;
  }
 }
 lockFeet(feet){
  for(const [side,plant] of Object.entries(feet)){
   const foot=this.bones[side+'_Foot'];twoBone(this.bones[side+'_UpLeg'],this.bones[side+'_Leg'],foot,plant.position,wp(this.bones[side+'_Leg']));setWorldQ(foot,plant.rotation);
   this.feet[side].pos.copy(wp(foot));this.feet[side].phase=1;
  }
 }
 shortenStride(yaw,scale){
  if(scale>=.999)return;const forward=V(Math.sin(yaw),0,Math.cos(yaw));
  for(const side of ['Left','Right']){
   const foot=this.bones[side+'_Foot'],p=wp(foot),q=wq(foot),travel=p.clone().sub(this.root.position).dot(forward);
   const target=p.clone().addScaledVector(forward,-travel*(1-scale));target.y=this.groundFootY+(p.y-this.groundFootY)*Math.sqrt(scale);
   twoBone(this.bones[side+'_UpLeg'],this.bones[side+'_Leg'],foot,target,wp(this.bones[side+'_Leg']));setWorldQ(foot,q);
  }
 }
 limbContact(side,target,kick=false,fraction=1){
  const start=this.bones[side+(kick?'_UpLeg':'_Arm')],middle=this.bones[side+(kick?'_Leg':'_ForeArm')],end=this.bones[side+(kick?'_Foot':'_Hand')],orientation=wq(end);
  twoBone(start,middle,end,target,wp(middle),1,fraction);setWorldQ(end,orientation);
 }
 impact(direction,amount,zone){
  const axis=V(0,1,0).cross(direction).normalize();
  const spine=this.bones.Spine_1;setWorldQ(spine,Q().setFromAxisAngle(axis,zone==='body'?-amount*.6:amount).multiply(wq(spine)));
  if(zone==='head'){const head=this.bones.Head;setWorldQ(head,Q().setFromAxisAngle(axis,amount*.35).multiply(wq(head)));}
 }
 handIK(side,target,weight,limit=.035){
  const hand=this.bones[side+'_Hand'],current=wp(hand),correction=target.clone().sub(current).clampLength(0,limit).multiplyScalar(weight);
  const pole=wp(this.bones[side+'_ForeArm']),orientation=wq(hand);
  twoBone(this.bones[side+'_Arm'],this.bones[side+'_ForeArm'],hand,current.add(correction),pole);setWorldQ(hand,orientation);
 }
}
