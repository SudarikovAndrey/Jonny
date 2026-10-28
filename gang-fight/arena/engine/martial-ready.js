import {boxingSpec} from './boxing-ready.js';
import {V,wp} from './rig.js';
export const isMartial=f=>f.kind===4||f.kind===5;
// Cuts from recorded Mixamo strikes; no procedural hand path replaces the source.
export function martialSpec(f,type,spec){
 if(!isMartial(f))return boxingSpec(f,type,spec);
 const clips={jab:['martialDriveLeft','Left'],cross:['martialDriveRight','Right'],palmStrike:['martialDriveRight','Right'],sweepKick:['martialSweepLow','Right'],kick:['martialSideKick','Right'],highKick:['martialRoundKick','Left'],roundKick:['martialRoundKick','Left']};
 const c=clips[type];return c?{...spec,clip:c[0],side:c[1],palm:false,openPalm:type==='palmStrike',recorded:true,snapImpact:type!=='sweepKick',impact:type==='sweepKick'?spec.impact:.42,lowSweep:type==='sweepKick',playbackCap:type==='sweepKick'?1.55:1.65}:spec;
}
export function recordedBow(c,f,time,dt){
 const clip=c.motions.martialBow,speed=.8,delay=.35+(f.id%2)*.16;
 f.victoryPlan??={name:'martialBow',speed,delay,duration:(clip.frames.length-1)/clip.fps/speed,bow:true};
 f.casualIdle=true;f.walking=false;f.walkStop=null;f.attackRecovery=null;f.poseWasAttack=false;f.footwork.prepare(false);
 // Keep the entire authored pose, including shoulders and wrists. Hands remain at the sides.
 f.rig.animate('martialBow',Math.max(0,time-delay)*speed,dt,f.yaw,false,null,1,.35);
 f.rig.ground(.003);
}
export function recordedRise(c,f,k,dt){
 if(!k.readyRise){
  const prone=f.fall?.clip==='fallSide';
  k.readyRise={stage:prone?'roll':'kip',age:0,yaw:f.yaw,offset:null};
 }
 const r=k.readyRise;r.age+=dt;
 const name=r.stage==='roll'?'martialRoll':'martialKipUp',clip=c.motions[name],speed=r.stage==='roll'?1.6:1.35,duration=(clip.frames.length-1)/clip.fps/speed;
 f.rig.animate(name,Math.max(0,r.age-.18)*speed,dt,r.yaw,false,null,1,.18);
 // Align each clip to the grounded pelvis, keeping its vertical launch and tuck intact.
 if(!r.offset){const now=wp(f.rig.bones.Hips);r.offset=V(k.startHip.x-now.x,0,k.startHip.z-now.z);}
 const hip=f.rig.bones.Hips,p=wp(hip).add(r.offset);hip.position.copy(hip.parent.worldToLocal(p));hip.updateWorldMatrix(false,true);
 c.floorBody(f);
 if(r.age<duration+.18)return false;
 if(r.stage==='roll'){
  r.stage='kip';r.age=0;r.yaw+=Math.PI;f.yaw=r.yaw;k.startHip=wp(hip);r.offset=null;return false;
 }
 f.yaw=r.yaw;const landed=wp(hip);c.move(f,landed.clone().sub(f.root.position).setY(0));f.root.updateMatrixWorld(true);hip.position.copy(hip.parent.worldToLocal(landed));hip.updateWorldMatrix(false,true);return true;
}
