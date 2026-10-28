import {V,Q,wp,wq,setWorldQ,aim,clamp} from './rig.js?v=20261027am';
import {bodyCapsules,nearestOnCapsule} from './contact.js?v=20261027giant';
const Y=V(0,1,0),ease=x=>{x=clamp(x,0,1);return x*x*(3-2*x)};
export function specialPose(f){
 const a=f.attack;if(!a?.special)return;
 const u=clamp(a.motionAge/a.duration,0,1),flight=clamp((u-.18)/.65,0,1);
 const height=Math.sin(Math.PI*flight)*(a.type==='leapUpper'?.58:.40);
 const spin=a.type==='spinFist'?Math.PI*2*ease((u-.12)/.43):a.type==='leapUpper'?-Math.PI*.20*Math.sin(Math.PI*u):Math.PI*.16*Math.sin(Math.PI*u);
 f.root.position.y=height;f.root.rotation.y=f.yaw+spin;f.root.updateMatrixWorld(true);
 const tuck=Math.sin(Math.PI*flight);
 if(tuck>0)for(const side of ['Left','Right']){
  f.rig.bones[side+'_UpLeg'].userData.poseYaw=f.yaw+spin;
  const ankle=wp(f.rig.bones[side+'_Foot']),back=V(-Math.sin(f.yaw+spin),0,-Math.cos(f.yaw+spin));
  ankle.y+=(side==='Left'?.22:.13)*tuck;ankle.addScaledVector(back,(a.type==='superman'&&side==='Right'?.32:.12)*tuck);
  f.rig.limbContact(side,ankle,true);
 }
 // The visible strike ends at the opponent; flight and recovery continue after contact.
 if(u>.40&&u<.72&&!a.target.down){const goal=wp(a.target.rig.bones.Head).add(V(0,.04,0));const hand=wp(f.rig.bones[a.side+'_Hand']);f.rig.limbContact(a.side,hand.lerp(goal,Math.sin(Math.PI*(u-.40)/.32)*.8));}
}
export function clearArms(f,others,includeDown=false){
 if(f.down&&!includeDown)return;
 const b=f.rig.bones;
 // Arm corrections do not move torso/head capsules: build them once per solve.
 const obstacles=[f,...others.filter(o=>o!==f&&!o.down&&o.root.position.distanceToSquared(f.root.position)<4.41)].map(other=>({other,caps:bodyCapsules(other,true)}));
 for(const side of ['Left','Right']){
  const upper=b[side+'_Arm'],elbow=b[side+'_ForeArm'],hand=b[side+'_Hand'];
  for(let it=0;it<(includeDown?16:6);it++){
   let correction=V(),deep=0,elbowWorld=wp(elbow),handWorld=wp(hand);
   for(const {other,caps} of obstacles){
    for(const c of caps){
     for(const t of [.15,.45,.75,1]){const p=elbowWorld.clone().lerp(handWorld,t),near=nearestOnCapsule(p,c),d=p.clone().sub(near),pen=c.radius+(f.kind===6?.095:.045)-d.length();
      if(pen<=.002)continue;
      if(d.length()<.001)d.set(Math.sin(f.yaw),0,Math.cos(f.yaw));d.normalize();
      if(other===f&&t<.3){aim(upper,elbow,elbowWorld.clone().addScaledVector(d,Math.min(.08,pen+.005)));elbowWorld=wp(elbow);handWorld=wp(hand);}
      const amount=Math.min(.15,(pen+.006)/Math.max(.4,t));if(amount>deep){deep=amount;correction.copy(d).multiplyScalar(amount);}
     }
    }
   }
   if(deep===0)break;f.rig.limbContact(side,wp(hand).add(correction));
  }
 }
 // Neighbour separation must not leave a hand pushed into its own torso.
 if(obstacles.length>1)clearArms(f,[],includeDown);
}
