import {Vector3} from 'three';
import {splitSpecialRootMotion} from './character-specials.js';
import {MultiContact} from './multi-contact.js';
const V=()=>new Vector3();
export function installSpecialMotions(motions,raw,manifest){const profiles={};for(const spec of manifest.characters){const split=splitSpecialRootMotion(raw[spec.clip]);motions[spec.clip]=split.clip;profiles[spec.kind]={...spec,rootMotion:split.rootMotion};}return profiles;}
export function beginAuthoredSpecial(c,f,a){const spec=c.specialProfiles?.[f.kind];if(!spec)return;
 a.authored=spec;a.clip=spec.clip;a.playback=spec.suggestedPlayback*Math.min(1.18,Math.max(.9,c.intensity.playback));a.duration=spec.durationSeconds/a.playback;a.motionAge=0;a.time=0;a.specialYaw=f.yaw;a.rootSample=V().fromArray(spec.rootMotion[0]);a.victims=new Set();a.contact=null;a.done=false;a.lowSweep=false;
 a.signature={...a.signature,name:spec.title};a.specialDamage=f.kind===6?44:36;a.specialSwings=[...new Set(spec.contacts.map(w=>w.swing))].sort((x,y)=>x-y);a.swingCount=a.specialSwings.length;a.specialDealt=new Map();
 a.multi=new MultiContact(spec.contacts.map(w=>({start:w.seconds[0]/spec.durationSeconds,end:w.seconds[1]/spec.durationSeconds,limbs:[w.bone],radius:w.radiusMeters,swing:w.swing})),spec.maxDistinctVictims);
}
export function advanceAuthoredSpecial(c,f,dt){const a=f.attack;a.motionAge+=dt;a.time=a.motionAge;f.velocity.set(0,0,0);f.walking=false;f.shuffle=false;f.turnRate=0;f.yaw=a.specialYaw;
 if(a.motionAge>=a.duration){a.contact=a.lastContact||null;f.attack=null;c.finishExchange(f,a,a.lastContactTarget||a.target);return;}
 const track=a.authored.rootMotion,frame=Math.min(track.length-1,a.motionAge*a.playback*c.motions[a.clip].fps),i=Math.floor(frame),p=V().fromArray(track[i]).lerp(V().fromArray(track[Math.min(i+1,track.length-1)]),frame-i),delta=p.clone().sub(a.rootSample).multiplyScalar(f.rig.hipHeight).applyAxisAngle(new Vector3(0,1,0),a.specialYaw);a.rootSample.copy(p);
 if(delta.lengthSq()>1e-10)c.move(f,delta);f.root.rotation.y=f.yaw;
}
export function poseAuthoredSpecial(c,f,dt){const a=f.attack,clip=c.motions[a.clip];f.poseWasAttack=true;f.poseWasKick=a.authored.contacts.some(w=>w.limb==='foot');f.poseAttackPhase=a.motionAge/a.duration;f.attackRecovery=null;f.walkStop=null;f.casualIdle=false;f.celebrating=false;
 f.rig.animate(a.clip,a.motionAge*a.playback,dt,a.specialYaw,false);const index=Math.min(clip.feet.length-1,Math.floor(a.motionAge*a.playback*clip.fps));clip.floor??=Math.min(...clip.feet.flatMap(v=>[v.Left[1],v.Right[1]]));const feet=clip.feet[index];f.rig.ground(.003+Math.max(0,Math.min(feet.Left[1],feet.Right[1])-clip.floor)*f.rig.hipHeight);f.root.updateMatrixWorld(true);
}
export function contactAuthoredSpecial(c,f,dt){const a=f.attack,spec=a.authored,points={};for(const w of spec.contacts)points[w.bone]=f.rig.bones[w.bone].getWorldPosition(V());
 const hits=a.multi.sample({phase:a.motionAge/a.duration,points,attacker:f,targets:c.fighters.filter(t=>!t.knockdown&&!t.knockback),clear:(from,to)=>c.navigation.segment(from,to,[],.015)});
 for(const hit of hits){const w=spec.contacts[hit.window],t=hit.target,signature=a.signature;const remaining=a.specialDamage-(a.specialDealt.get(t.id)||0);if(remaining<=0)continue;const healthBefore=t.health;const old={target:a.target,damage:a.damage,kick:a.kick,side:a.side,type:a.type};const final=w.swing===Math.max(...spec.contacts.map(x=>x.swing));
  a.target=t;a.side=w.side;a.kick=w.limb==='foot';a.type=a.kick?'roundKick':w.limb==='elbow'?'hook':'cross';a.damage=Math.min(remaining,specialSwingDamage(a.specialDamage,a.specialSwings,w.swing));a.signature=final?signature:null;a.authoredSignature=signature;a.victims.add(t.id);hit.index=0;hit.radius=w.radiusMeters;
  const speed=hit.to.distanceTo(hit.from)/Math.max(.001,dt),fist=points[w.bone],previous=[hit.from];
  c.resolveContact(f,t,a,hit,dt,{kick:a.kick,b:f.rig.bones,limb:f.rig.bones[w.bone],fist,previous,speed:Math.max(.7,speed)});
  a.specialDealt.set(t.id,(a.specialDealt.get(t.id)||0)+Math.max(0,healthBefore-t.health));
  if(a.contact){a.lastContact={...a.contact};a.lastContactTarget=t;}a.signature=signature;Object.assign(a,old);a.contact=null;a.done=false;
 }
}

// Preserve the finisher budget: long specials land most damage at entry and finish.
export function specialSwingDamage(total,swings,swing){
 const i=swings.indexOf(swing),n=swings.length;
 if(i<0||n===0)return 0;
 return total*(n<=2?1/n:i===0||i===n-1?.4:.2/(n-2));
}
