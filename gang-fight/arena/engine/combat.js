import {fighterBalance,martialCombos} from './fighter-balance.js';
import {beginAuthoredSpecial,advanceAuthoredSpecial,poseAuthoredSpecial,contactAuthoredSpecial} from './authored-specials.js';
import {specialReady,spendSpecial} from './special-meter.js';
import {BattleDecisions,reactionProfile} from './battle-decisions.js';
import {Positioning,guardCovers,facingDot} from './positioning.js';
import {ImpactWorld,binPosition,binRadius} from './impact-world.js';
import {FightRhythm,profile} from './fight-rhythm.js';
import {Exchanges} from './exchanges.js';
import {massTransfer} from './mass-transfer.js';
import {isMartial,martialSpec,recordedBow,recordedRise} from './martial-ready.js';
import {intensityProfile} from './intensity.js?v=20261027berserk';
import {fightingStyles} from './fighting-styles.js?v=20261027signatures';
import {Navigation} from './navigation.js?v=20261028body-escape';
import {constrainCourtyard,walls} from './courtyard.js?v=20261027am';
import {clearArms} from './flair.js?v=20261027giant';
import {flattenSupportFeet} from '../retarget.mjs?v=20261027giant-sole';
import * as T from 'three';
import {Rig,V,Q,wp,wq,setWorldQ,clamp,aim,twoBone} from './rig.js?v=20261027giant-sole';
import {Physics} from './ragdoll.js?v=20261027all-updates';
import {ImpactResponse} from './impact.js?v=20261027am';
import {Footwork} from './footwork.js?v=20261027clean-blend';
import {bodyCapsules,sweepCapsule,nearestOnCapsule} from './contact.js?v=20261027giant';
const victoryClips=['victoryVest','victoryHat','victoryHeavy','victoryButcher'];
const Y=V(0,1,0),smooth=t=>t*t*(3-2*t),angleDelta=(a,b)=>Math.atan2(Math.sin(b-a),Math.cos(b-a));
const attacks={
 palmStrike:{side:'Right',zone:'body',clip:'headPunch',impact:.55,damage:15,palm:true},
 jab:{side:'Left',zone:'head',clip:'jab',impact:.55,damage:12},
 cross:{side:'Right',zone:'head',clip:'headPunch',impact:.55,damage:19},
 hook:{side:'Right',zone:'head',clip:'hook',impact:.6,damage:20},
 giantUppercut:{side:'Right',zone:'head',clip:'uppercut',impact:.6,damage:32,launch:true},
 uppercut:{side:'Right',zone:'head',clip:'uppercut',impact:.6,damage:22},
 body:{side:'Right',zone:'body',clip:'body',impact:.6,damage:16},
 hookLeft:{side:'Left',zone:'head',clip:'hookLeft',impact:.65,damage:25},
 kick:{side:'Right',zone:'body',clip:'kick',impact:.65,damage:22,kick:true},
 lowKick:{side:'Right',zone:'leg',clip:'lowKick',impact:.65,damage:16,kick:true},
 highKick:{side:'Left',zone:'head',clip:'highKick',impact:.65,damage:25,kick:true},
 axeKick:{side:'Left',zone:'head',clip:'axeKick',impact:.65,damage:27,kick:true},
 spinKick:{side:'Right',zone:'head',clip:'specialKick',impact:.7,damage:26,kick:true,trip:.28},
 sweepKick:{side:'Left',zone:'leg',clip:'sweepKick',impact:.65,damage:17,kick:true,trip:.38},
 roundKick:{side:'Right',zone:'head',clip:'roundKick',impact:.65,damage:23,kick:true,trip:.15},
 specialKick:{side:'Right',zone:'head',clip:'specialKick',impact:.7,damage:28,kick:true}
};
export class Combat{
 constructor(scene,models,motions,onEvent){this.flightCollisions=false;this.intensity=intensityProfile();this.scene=scene;this.navigation=new Navigation([Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return V(binPosition.x+Math.sin(a)*binRadius,0,binPosition.z+Math.cos(a)*binRadius);})]);this.impactWorld=new ImpactWorld(this);this.positioning=new Positioning(this);this.decisions=new BattleDecisions(this);this.rhythm=new FightRhythm(this);this.exchanges=new Exchanges(this);this.motions=motions;this.onEvent=onEvent;this.physics=new Physics();this.time=0;this.round=1;this.stats={hits:0,blocks:0,dodges:0,misses:0,knockouts:0,attacks:0,knockbacks:0,recoveries:0};this.events=[];this.fighters=models.map((root,i)=>new Fighter(root,i,motions,scene));this.seed=74193;this.reset();}
 setIntensity(value){this.intensity=intensityProfile(value);return this.intensity;}
 attackRange(f,type){
  const kick=attacks[type]?.kick;const bulk=f.target?.kind===6?.18:f.target?.kind===3?.10:f.target?.kind===2?.05:0;
  // The guarded torso leans away from an attacker approaching from behind.
  // Close the actual approach distance instead of enlarging hit capsules.
  const t=f.target,delta=t?t.root.position.clone().sub(f.root.position).setY(0).normalize():V();
  const rear=t?Math.max(0,delta.dot(V(Math.sin(t.yaw),0,Math.cos(t.yaw)))):0;
  const ideal=Math.max(.96,(type==='spinKick'?1.46:type==='axeKick'?1.26:type==='highKick'?1.50:type==='sweepKick'?(isMartial(f)?1.30:1.64):type==='roundKick'?1.45:kick?1.64:1.08)*f.rig.bodyScale+bulk-rear*(kick?.18:type==='jab'?.34:.22));

  // Recorded short punches/palm have less reach than the original boxing clips.
  const shortReach=isMartial(f)&&f.target?.kind!==6&&['jab','cross','palmStrike'].includes(type)?.08:0;
  const fitted=Math.max(.84,ideal-shortReach)*this.intensity.rangeScale;return {ideal:fitted,min:fitted-(kick?.15:.19),max:fitted+.05-rear*.04};
 }
 respondToAggressor(f,attacker){
  if(f.down||f.knockdown||f.health<=0||attacker.down||attacker.team===f.team)return false;
  f.lastAggressor=attacker;f.lastHitTime=this.time;
  if(f.target===attacker)return false;
  const currentValid=f.target&&!f.target.down&&!f.target.knockdown;
  if(currentValid&&this.time<f.engagementUntil)return false;
  const offset=attacker.root.position.clone().sub(f.root.position).setY(0);
  const behind=offset.dot(V(Math.sin(f.yaw),0,Math.cos(f.yaw)))<0;
  // An actual hit from behind, or an attacker challenging a distracted fighter,
  // takes precedence over continuing to gang up on the old target.
  if(currentValid&&!behind&&f.target.target===f&&!f.target.knockdown)return false;
  f.target=attacker;f.engagementUntil=this.time+1.4;
  f.attack=null;f.nextAttack=null;f.defense=null;f.retreat=0;f.reposition=0;
  f.state='hit';f.timer=0;f.spacingAge=0;f.rush=1.6;
  f.navGoal=null;f.navPath=null;f.navFailedGoal=null;f.navGoalTime=0;
  this.emit('retargets',f,{target:attacker.id,reason:'incoming-hit'});
  return true;
 }
 queueSignature(f,automatic=false){if(!specialReady(f))return null;f.signatureAutomatic=automatic;f.signatureRequested=!automatic;const profile=fightingStyles[f.kind].super;f.signatureQueued=profile;f.styleQueue=[];f.martialQueue=[];f.boxingQueue=[];f.nextAttack=profile.attack;return profile.attack;}
 applySignature(f,a){const profile=f.signatureQueued;if(!profile||a.type!==profile.attack)return;if(!spendSpecial(f)){f.signatureQueued=null;f.signatureRequested=false;return;}f.signatureQueued=null;f.signatureRequested=false;f.signatureAutomatic=false;f.cleanSeries=null;f.signatureReady=this.time+(11+f.kind*.45)/Math.sqrt(this.intensity.frequency);f.styleQueue=[];f.martialQueue=[];f.boxingQueue=[];a.signature=profile;a.damage=Math.max(a.damage,26)+(f.kind===6?6:2);beginAuthoredSpecial(this,f,a);this.emit('signatureWindups',f,{attack:a.type,name:a.signature.name});}
 chooseAttack(f){if(!this.forcedAttack&&(f.signatureRequested||this.decisions.signatureAvailable(f)))return this.queueSignature(f,!f.signatureRequested);f.signatureQueued=null;const r=this.random();if(f.kind<4){const choices=fightingStyles[f.kind].combos;f.styleQueue=choices[f.styleSeries++%choices.length].slice();f.styleTarget=f.target;return f.styleQueue.shift();}if(f?.kind===4||f?.kind===5){const options=martialCombos[f.kind];f.martialQueue=options[(f.martialSeries++||0)%options.length].slice();f.martialTarget=f.target;return f.martialQueue.shift();}if(f?.kind===6){const series=[['jab','cross','hookLeft'],['jab','cross','hookLeft','uppercut'],['jab','jab','cross','hook']][(f.boxingSeries++||0)%3].slice();f.boxingQueue=series;f.boxingTarget=f.target;return f.boxingQueue.shift();}return r<.25?'jab':r<.44?'cross':r<.55?'hook':r<.65?'body':r<.73?'uppercut':r<.79?'hookLeft':r<.86?'kick':r<.92?'lowKick':r<.96?'highKick':'axeKick';}
 random(){this.seed=(this.seed*1664525+1013904223)>>>0;return this.seed/4294967296}
 emit(type,f,extra={}){this.stats[type]=(this.stats[type]||0)+1;const event={time:+this.time.toFixed(3),type,fighter:f.id,...extra};this.events.push(event);if(this.events.length>200)this.events.shift();this.decisions.event(event);this.exchanges.event(event);this.onEvent?.(event)}
 reset(){this.navigation.beginFrame();this.rhythm.clear();this.exchanges.clear();this.environment?.reset();this.physics.clear();this.time=0;this.endTime=0;this.events=[];for(const k in this.stats)this.stats[k]=0;const placed=[],slots=[0,0],counts=[0,1].map(team=>this.fighters.filter(f=>f.team===team).length);this.fighters.forEach((f,i)=>{const slot=slots[f.team]++,rows=Math.min(5,counts[f.team]),row=slot%5,column=Math.floor(slot/5);f.reset([(f.team?1:-1)*(2.35+column*1.8),(row-(rows-1)/2)*1.55,f.team?-Math.PI/2:Math.PI/2]);f.root.position.copy(this.navigation.constrain(f.root.position,f.kind===6?.65:f.kind===3?.55:.44));const spawn=f.root.position.clone();
  if(placed.some(p=>p.distanceTo(spawn)<1.4)){
   let found=null;for(let ring=1;ring<=40&&!found;ring++)for(let j=0;j<24;j++){
    const candidate=this.navigation.constrain(spawn.clone().add(V(Math.cos(j*Math.PI/12)*ring*.18,0,Math.sin(j*Math.PI/12)*ring*.18)),f.kind===6?.65:f.kind===3?.55:.44);
    if(candidate.x*(f.team?1:-1)>=.9&&placed.every(p=>p.distanceTo(candidate)>=1.4)){found=candidate;break;}
   }if(found)f.root.position.copy(found);
  }placed.push(f.root.position.clone());f.reset([f.root.position.x,f.root.position.z,f.yaw]);f.openingDelay=.10+((i*7+f.team*3+this.round*5)%23)/23*.72;f.openingAge=0;f.idleClock=i*.37;f.cooldown=.45+(slot%5)*.13;});for(const f of this.fighters){const allies=this.fighters.filter(t=>t.team===f.team),foes=this.fighters.filter(t=>t.team!==f.team);f.target=foes[allies.indexOf(f)%foes.length];}}

 update(dt){
  // Two contact steps per 60 Hz render frame keep fast strikes from changing contact
  // limbs with frame rate. The same 120 Hz step is used for joint and ragdoll dynamics.
  const steps=Math.max(1,Math.ceil(dt*120-1e-8));for(let i=0;i<steps;i++)this.step(dt/steps);
 }
 step(dt){this.time+=dt;this.environment?.step(dt);this.navigation.beginFrame();
  for(const f of this.fighters){if(f.down||f.knockdown||f.launch)continue;if(f.attack?.authored){this.think(f,dt);continue;}if(!f.target||f.target.down||(f.target.knockdown&&f.target.knockdown.attacker!==f.id&&!isMartial(f)&&this.fighters.some(t=>t.team!==f.team&&!t.down&&!t.knockdown))){const priority=t=>t.root.position.distanceTo(f.root.position)-(t.target?.team===f.team&&!t.target.down?1.4:0)-(t.attack? .65:0)-(f.lastAggressor===t&&this.time-f.lastHitTime<4?1.5:0);f.target=this.fighters.filter(t=>t.team!==f.team&&!t.down&&(!t.knockdown||t.knockdown.attacker===f.id||isMartial(f))).sort((a,b)=>priority(a)-priority(b))[0]||this.fighters.find(t=>t.team!==f.team&&!t.down);f.attack=null;f.defense=null;f.nextAttack=null;f.retreat=0;f.state='idle';f.timer=0;f.rush=1.6;f.navGoal=null;f.navPath=null;}this.think(f,dt)}
  // Pose all actors before contact queries: hits are evaluated against the same simulation instant.
  for(const f of this.fighters){if(f.launch)this.uppercutFlight(f,dt);else if(f.knockdown)this.knockdownPose(f,dt);else if(!f.down)this.pose(f,dt);else if(f.state==='fall')this.fallPose(f,dt);}
  for(const f of this.fighters)if(!f.down&&f.attack)this.contact(f,dt);
  for(const f of this.fighters)if(!f.down&&f.attack?.contact)this.constrainContact(f);
  this.environment?.fallContacts();
  // Contacts may interrupt a kick after pose(): re-establish the surviving support soles.
  for(const f of this.fighters)if(!f.down&&!f.knockdown&&!f.settled){if(!f.attack){if(!f.celebrating&&!f.walking&&!f.walkStop&&!f.attackRecovery&&!f.poseWasAttack)flattenSupportFeet(f);clearArms(f,this.fighters);}else clearArms(f,[]);if(!f.casualIdle&&!f.attack?.openPalm)f.rig.closeFists();}
  this.physics.step(dt);
  for(const f of this.fighters)if(f.knockdown?.phase==='ground'){if(f.knockdown.ragdoll)this.groundHitPose(f,f.knockdown);this.floorBody(f);}
  // Falling/settled bones are written by a different path; resolve arms after that final write.
  for(const f of this.fighters)if((f.down||f.knockdown)&&!f.restArmsChecked){clearArms(f,[],true);if(f.state==='down')f.restArmsChecked=true;}
  const aliveTeams=new Set(this.fighters.filter(f=>!f.down).map(f=>f.team));if(aliveTeams.size<2){this.endTime+=dt;if(this.endTime>Math.max(12,...this.fighters.filter(f=>!f.down&&f.victoryPlan).map(f=>f.victoryPlan.delay+f.victoryPlan.duration+2))){this.round++;this.reset()}}
 }
 floorBody(f){if(f.skinGrounded&&f.knockdown?.phase==='ground')return;let low=.003;for(const side of ['Left','Right'])for(const part of ['heel','toe'])low=Math.min(low,f.rig.sole(side,part).y);if(low<.003){const h=f.rig.bones.Hips,p=wp(h);p.y+=.003-low;h.position.copy(h.parent.worldToLocal(p));h.updateWorldMatrix(false,true);}}
 capturePose(f){return f.rig.ordered.map(b=>({p:b.position.clone(),q:b.quaternion.clone()}));}
 gaitEntryTime(f,clip){
  // Match authored leg pose at entry; never reset a new gait to an unrelated frame zero.
  const dirs={};for(const side of ['Left','Right'])for(const [part,a,b] of [['upper','_UpLeg','_Leg'],['lower','_Leg','_Foot']])dirs[side+part]=wp(f.rig.bones[side+b]).sub(wp(f.rig.bones[side+a])).normalize().applyAxisAngle(Y,-f.yaw);
  let best=0,score=Infinity;
  for(let i=0;i<clip.frames.length-1;i++){
   let cost=0;for(const side of ['Left','Right'])for(const part of ['upper','lower'])cost+=1-dirs[side+part].dot(V().fromArray(clip.legDirections[i][side][part]));
   if(cost<score){score=cost;best=i;}
  }
  return best/clip.fps;
 }
 finishExchange(f,a,t){
  const clean=a.contact&&!a.contact.blocked&&t&&!t.down&&!t.knockdown;
  const styleFollow=f.kind<4&&clean&&!this.forcedAttack&&!a.signature&&f.styleTarget===t&&f.styleQueue?.length>0;
  if(styleFollow)f.nextAttack=f.styleQueue.shift();else if(f.kind<4)f.styleQueue=[];
  const martialFollow=(f.kind===4||f.kind===5)&&clean&&!this.forcedAttack&&f.martialTarget===t&&f.martialQueue?.length>0;
  if(martialFollow)f.nextAttack=f.martialQueue.shift();else if(f.kind===4||f.kind===5)f.martialQueue=[];
  const boxingFollow=f.kind===6&&clean&&f.boxingTarget===t&&f.boxingQueue?.length>0;
  const follow=styleFollow||martialFollow||boxingFollow||(f.kind!==6&&!f.styleTarget&&!a.signature&&clean&&!this.forcedAttack&&(f.exchangeCount||0)<1&&['jab','cross','body'].includes(a.type));
  if(boxingFollow)f.nextAttack=f.boxingQueue.shift();
  else if(f.kind===6)f.boxingQueue=[];
  if(follow){f.exchangeCount=(f.exchangeCount||0)+1;if(!styleFollow&&!boxingFollow&&!martialFollow)f.nextAttack=a.type==='body'?'uppercut':a.type==='jab'?'hook':'body';f.cooldown=boxingFollow?.30*this.intensity.frequency:martialFollow?(f.kind===4?.22:.12):.15;f.retreat=0;}
  else{f.exchangeCount=0;f.nextAttack=null;f.cooldown=(.55+this.random()*.35)*(f.kind===6?this.intensity.frequency*1.15:1);f.cooldown+=(fighterBalance[f.kind].recovery||0)*this.intensity.frequency;f.retreat=(clean&&a.powerHit?.30:(this.random()<.25?.3:0))*(1-this.intensity.urgency*.85);if(!a.contact||a.contact.blocked){f.reposition=.5*(1-this.intensity.urgency*.8);f.repositionSign=this.random()<.5?-1:1;}}
  f.navGoalTime=0;f.navPath=null;f.state='idle';f.timer=0;this.decisions.afterExchange(f,a,t);if(clean&&!follow&&!f.signatureRequested&&this.decisions.signatureAvailable(f))this.queueSignature(f,true);
 }
 selectFall(f,attacker,direction,hit={}){
  const type=hit.type||attacker.attack?.type,zone=hit.zone||attacker.attack?.zone;
  const forward=V(Math.sin(f.yaw),0,Math.cos(f.yaw));
  const push=direction.clone().setY(0).normalize();
  if(push.lengthSq()<.01)push.copy(forward).negate();
  const fromBehind=push.dot(forward)>.25;
  // KO_02 (legacy name fallSide) folds forward; KO_01 falls onto the back.
  // Swept support and downward/body blows fold the torso; rear hits send it forward.
  const folds=(type==='sweepKick'&&zone==='leg')||type==='axeKick'||(type==='body'&&zone==='body');
  const swept=type==='sweepKick'&&zone==='leg'&&isMartial(attacker);
  const clip=swept?'martialSweptFall':fromBehind||folds?'fallSide':'fallBack';
  const lateral=['hook','hookLeft','roundKick','spinKick'].includes(type);
  const impact=hit.direction?.clone().setY(0).normalize();
  if(lateral&&impact?.lengthSq()>.01&&impact.dot(push)>-.25)push.lerp(impact,.45).normalize();
  const facing=clip==='fallBack'||swept?push.clone().negate():push;
  const yawOffset=folds?0:clamp(angleDelta(f.yaw,Math.atan2(facing.x,facing.z)),-.65,.65);
  return {clip,time:0,startYaw:f.yaw,yawOffset,attackType:type||null,zone:zone||null,pushScale:folds?.55:1};
 }
 beginUppercutLaunch(f,attacker,direction,hook=false,profile=null,contact=null){
  if(f.launch)return;
  const carry=f.velocity.clone().setY(0).clampLength(0,1.5),entryPose=this.capturePose(f);
  direction=direction.clone().setY(0).normalize();
  if(contact?.incoming){const incoming=contact.incoming.clone().setY(0);if(incoming.lengthSq()>.01){incoming.normalize();if(incoming.dot(direction)>-.25)direction.lerp(incoming,hook?.5:.25).normalize();}}
  this.beginKnockdown(f,attacker,direction,contact?.magnitude??42);
  const force=contact?clamp(Math.sqrt(contact.magnitude/60),.75,1.25):1;
  const weight=massTransfer(attacker.mass,f.mass),requestedDistance=(profile?.distance??(hook?2.5:3))*weight*force;
  const gravity=9.81,height=(profile?.height??(hook?.5:1.25))*Math.sqrt(weight)*force;
  const verticalSpeed=Math.sqrt(2*gravity*height),flightTime=2*verticalSpeed/gravity;
  const velocity=direction.clone().multiplyScalar(requestedDistance/flightTime).addScaledVector(carry,.35);velocity.y=verticalSpeed;
  const start=f.root.position.clone().setY(0),end=start.clone().addScaledVector(velocity.clone().setY(0),flightTime);
  direction.copy(velocity).setY(0).normalize();
  // Shorten at courtyard boundaries; never teleport through a wall to hit a distance quota.
  let wallHit=null;
  for(const wall of walls.slice(0,18)){
   if(direction.dot(wall.normal)>=-.05)continue;
   const hit=sweepCapsule(start,end,{a:wall.a,b:wall.b,radius:0},.65);
   if(hit&&(!wallHit||hit.t<wallHit.t))wallHit={...hit,normal:wall.normal.clone()};
  }
  let wallFraction=wallHit?Math.max(.001,wallHit.t):1;
  if(wallHit)end.lerpVectors(start,end,wallFraction);else if(constrainCourtyard(end,.75).setY(0).distanceTo(end)>.001){
   const destination=end.clone();let lo=0,hi=1;for(let i=0;i<18;i++){const mid=(lo+hi)/2,p=start.clone().lerp(destination,mid);if(constrainCourtyard(p,.75).setY(0).distanceTo(p)<.001)lo=mid;else hi=mid;}wallFraction=lo;end.lerpVectors(start,destination,lo);
  }
  // Root translation is driven by impact velocity and gravity, not an eased move to a marker.
  wallFraction=Math.min(wallFraction,start.distanceTo(end)/Math.max(.001,velocity.clone().setY(0).length()*flightTime));
  f.launch={start,end,velocity,gravity,flightTime,entryPose,currentVelocity:velocity.clone(),attacker:attacker.id,collided:new Set(),wall:wallHit,wallFraction,age:0,duration:wallHit?flightTime*wallFraction:flightTime,height};f.fall.velocity.set(0,0,0);f.knockVelocity.set(0,0,0);
  attacker.uppercutReady=this.time+8;
  this.emit('uppercutLaunches',attacker,{target:f.id,distance:start.distanceTo(end),requestedDistance,massFactor:weight,attackerMass:attacker.mass,targetMass:f.mass,point:start.toArray()});
 }
 finishFlight(f){
  const flight=f.launch;f.root.position.y=0;f.launch=null;f.fall.time=.7;f.fall.velocity.copy((flight?.wall||flight?.wallFraction<.999)?V():flight?.velocity?.clone().setY(0).multiplyScalar(.32).clampLength(0,3)||V());this.floorBody(f);
  this.emit('landings',f,{point:f.root.position.toArray(),heavy:true});f.fall.landed=true;
  if(f.health<=0){f.knockdown=null;f.down=true;f.state='fall';this.emit('knockouts',f,{attacker:f.lastAggressor?.id,zone:'head'});}
 }
 uppercutFlight(f,dt){
  const a=f.launch;
  if(a.slide){
   const previous=['Hips','Spine_2','Head'].map(n=>wp(f.rig.bones[n]));
   a.slide.age+=dt;f.yaw=a.slide.yaw+angleDelta(a.slide.yaw,a.slide.targetYaw)*smooth(clamp(a.slide.age/.18,0,1));f.root.rotation.y=f.yaw;const elapsed=Math.max(0,a.slide.age-.055),vy=a.slide.verticalSpeed??0,dropTime=(vy+Math.sqrt(vy*vy+2*a.gravity*a.slide.height))/a.gravity,t=clamp(elapsed/Math.max(.001,dropTime),0,1);
   f.root.position.y=Math.max(0,a.slide.height+vy*elapsed-.5*a.gravity*elapsed*elapsed);
   f.rig.animate(f.fall.clip,.36+t*.34,dt,f.yaw,false);f.root.updateMatrixWorld(true);this.floorBody(f);this.environment?.flight(f,previous);
   if(t===1)this.finishFlight(f);return;
  }
  const previous=['Hips','Spine_2','Head'].map(n=>wp(f.rig.bones[n]));a.age+=dt;const u=clamp(a.age/a.duration,0,1),elapsed=Math.min(a.age,a.duration);
  f.root.position.copy(a.start).addScaledVector(a.velocity,Math.min(elapsed,a.flightTime*(a.wallFraction??1)));f.root.position.y=Math.max(0,a.start.y+a.velocity.y*elapsed-.5*a.gravity*elapsed*elapsed);
  a.currentVelocity.copy(a.velocity);a.currentVelocity.y-=a.gravity*elapsed;
  f.rig.animate(f.fall.clip,Math.min(.7,elapsed*.85),dt,f.yaw,false,null,1,.1);
  if(a.age<.1){const blend=smooth(a.age/.1);f.rig.ordered.forEach((b,i)=>{b.quaternion.copy(a.entryPose[i].q.clone().slerp(b.quaternion,blend));b.position.lerpVectors(a.entryPose[i].p,b.position,blend);});}
  f.root.updateMatrixWorld(true);
  this.environment?.flight(f,previous);
  if(this.flightCollisions)this.flightContacts(f,a,previous);
  if(u===1){
   if(a.wall){a.slide={age:0,height:f.root.position.y,verticalSpeed:Math.min(0,a.currentVelocity.y),yaw:f.yaw,targetYaw:Math.atan2(a.wall.normal.x,a.wall.normal.z)};this.emit('wallHits',f,{point:wp(f.rig.bones.Spine_2).toArray(),heavy:true});}
   else this.finishFlight(f);
  }
 }
 flightContacts(f,flight,previous){
  const direction=flight.end.clone().sub(flight.start).setY(0),speed=direction.length()/flight.duration;
  if(speed<1)return;direction.normalize();
  const current=['Hips','Spine_2','Head'].map(n=>wp(f.rig.bones[n]));
  // Sweep the airborne body in 3D, rather than testing only its ground shadow.
  // Each standing bystander can be hit once; collateral falls do not launch chains.
  for(const t of this.fighters){
   if(t===f||t.id===flight.attacker||t.down||t.knockdown||t.launch||flight.collided.has(t.id))continue;
   let hit=null;
   for(const capsule of bodyCapsules(t))for(let i=0;i<current.length;i++){
    const candidate=sweepCapsule(previous[i],current[i],capsule,(i===2?.12:.23)*f.rig.bodyScale);
    if(candidate&&(!hit||candidate.t<hit.t))hit=candidate;
   }
   if(!hit)continue;flight.collided.add(t.id);
   const damage=Math.round(clamp(speed*Math.sqrt(f.mass/t.mass)*3,8,18));
   t.health=Math.max(0,t.health-damage);t.lastAggressor=f;t.lastHitTime=this.time;
   this.beginKnockdown(t,f,direction,30,{type:'bodyCollision',zone:'body',collateral:true});
   this.emit('hits',f,{target:t.id,zone:'body',attack:'bodyCollision',point:hit.point.toArray(),damage,impulseMagnitude:32,collateral:true});
   if(t.health<=0){t.knockdown=null;t.down=true;t.state='fall';this.emit('knockouts',t,{attacker:f.id,zone:'body'});}
  }
 }
 beginKnockdown(f,attacker,direction,magnitude=42,hit={}){
  if(f.down||f.knockdown)return;
  f.knockdown={phase:'fall',age:0,attacker:attacker.id,hitAge:10};f.knockback=null;f.attack=null;f.defense=null;f.walking=false;f.walkStop=null;f.attackRecovery=null;f.poseWasAttack=false;f.footwork.prepare(false);f.state='fall';f.velocity.set(0,0,0);f.knockVelocity.set(0,0,0);f.knockbackCooldown=9;f.response.reset();
  f.fall=this.selectFall(f,attacker,direction,hit);f.fall.velocity=direction.clone().multiplyScalar(clamp(magnitude/12,2.2,4.2)*massTransfer(attacker.mass,f.mass)*f.fall.pushScale);
  if(!hit.collateral){attacker.target=f;attacker.nextAttack=null;attacker.navGoal=null;attacker.navPath=null;attacker.cooldown=.3;}
  this.emit('knockdowns',f,{attacker:attacker.id,point:f.root.position.toArray()});
 }
 guardGetup(f,k){
  const attacker=this.fighters.find(o=>o.id===k.attacker&&!o.down);
  const rising=k.phase==='rise',weight=rising?1:smooth(clamp((k.age-1.5)/.6,0,1));
  if(!weight)return;
  const threat=attacker?.attack?.target===f?attacker.attack:null;
  // Use the existing dodge reaction over the authored get-up, keeping its legs.
  if(threat)f.rig.overlay('dodge',threat.motionAge,f.yaw,.65*weight,.22);
  if(k.hitAge<.25&&(!k.hitBone||k.hitBone==='Head'))f.rig.overlay('hitHead',k.hitAge*1.3,f.yaw,.55*Math.sin(Math.PI*k.hitAge/.25),.18);
  const head=wp(f.rig.bones.Head),forward=attacker?attacker.root.position.clone().sub(head).setY(0).normalize():V(Math.sin(f.yaw),0,Math.cos(f.yaw));
  const right=V(forward.z,0,-forward.x);
  for(const [side,sign] of [['Right',-1],['Left',1]]){
   // Both hands cover during the protected rise; anticipation starts while grounded.
   const armWeight=weight*(side==='Right'?1:rising?1:.15);
   const target=head.clone().addScaledVector(forward,.18*f.rig.bodyScale).addScaledVector(right,sign*.14*f.rig.bodyScale);target.y-=.06*f.rig.bodyScale;
   f.rig.handIK(side,target,armWeight,.24);
  }
  f.rig.closeFists();
 }
 groundHitPose(f,k){
  if(k.hitAge>=.34)return;
  const u=k.hitAge/.34,pulse=u<.15?smooth(u/.15):Math.exp(-4*(u-.15))*Math.pow((1-u)/.85,2);
  const name=k.hitBone||'Spine_1',side=name.startsWith('Left')?'Left':'Right';
  const chain=name==='Head'?[['Neck',.16],['Head',.42]]:/Leg|Foot/.test(name)?[[side+'_UpLeg',.20],[side+'_Leg',.48]]:/Arm|Hand/.test(name)?[[side+'_Arm',.22],[side+'_ForeArm',.48]]:[[name==='Hips'?'Spine_0':name,.42],['Neck',.12]];
  const direction=k.hitDirection||V(0,-1,0);
  for(const [joint,amount] of chain){
   const bone=f.rig.bones[joint];if(!bone)continue;const pivot=wp(bone);
   const contact=k.hitLocal&&f.rig.bones[name]?f.rig.bones[name].localToWorld(k.hitLocal.clone()):pivot.clone().add(V(0,0,.2));
   let lever=contact.sub(pivot);if(lever.lengthSq()<.002)lever=wp(bone.children.find(b=>b.isBone)||bone).sub(pivot);
   let axis=lever.clone().cross(direction);if(axis.lengthSq()<.001)axis=V(Math.cos(f.yaw),0,-Math.sin(f.yaw));axis.normalize();
   // Recoil away from the floor. Do not translate the complete body for a limb hit.
   const child=bone.children.find(b=>b.isBone),tip=child?wp(child).sub(pivot):lever;
   if(tip.clone().applyAxisAngle(axis,.1).y<tip.y)axis.negate();
   setWorldQ(bone,Q().setFromAxisAngle(axis,amount*pulse).multiply(wq(bone)));
  }
 }
 groundedLife(f,k){
  if(f.kind===6||k.ragdoll||k.phase!=='ground'||k.hitAge<.34)return;
  const elapsed=Math.max(0,k.age+.4),pulse=Math.sin(Math.PI*clamp(elapsed/1.8,0,1));
  if(pulse<=0)return;
  // A small protective curl, restored from the cached pose every frame.
  const head=wp(f.rig.bones.Head),side=f.id%2?'Left':'Right';
  f.rig.handIK(side,head.clone().add(V(0,.10,.04)),pulse*.65,.12);
  for(const [name,amount] of [[side+'_Leg',.16],['Neck',.045]]){
   const b=f.rig.bones[name],axis=V(Math.cos(f.yaw),0,-Math.sin(f.yaw));
   const child=b.children.find(o=>o.isBone);if(child&&wp(child).sub(wp(b)).applyAxisAngle(axis,.1).y<wp(child).sub(wp(b)).y)axis.negate();
   setWorldQ(b,Q().setFromAxisAngle(axis,amount*pulse).multiply(wq(b)));
  }
 }
 knockdownPose(f,dt){
  const k=f.knockdown;k.age+=dt;k.hitAge+=dt;
  if(k.phase==='fall'){this.fallPose(f,dt);this.floorBody(f);return;}
  if(k.phase==='ground'){
   f.rig.ordered.forEach((b,i)=>{b.position.copy(k.pose[i].p);b.quaternion.copy(k.pose[i].q);});f.root.updateMatrixWorld(true);
   this.groundedLife(f,k);this.groundHitPose(f,k);
   this.guardGetup(f,k);clearArms(f,[],true);this.floorBody(f);
   if(k.age>2.1){if(k.ragdoll){this.physics.remove(f);k.ragdoll=null;}k.phase='rise';k.age=0;k.pose=this.capturePose(f);k.startHip=wp(f.rig.bones.Hips);f.state='gettingUp';}
   return;
  }
  let finished=false;
  if(isMartial(f)){finished=recordedRise(this,f,k,dt);}else{
  const clip=this.motions.getUp,duration=(clip.frames.length-1)/clip.fps;
  f.rig.animate('getUp',Math.max(0,k.age-.55)*1.2,dt,f.yaw,false,null,1,.55);
  if(k.age<.55){const blend=smooth(k.age/.55);f.rig.ordered.forEach((b,i)=>{b.quaternion.copy(k.pose[i].q.clone().slerp(b.quaternion,blend));b.position.lerpVectors(k.pose[i].p,b.position,blend);});f.root.updateMatrixWorld(true);}
  let low=Infinity;for(const [name,r] of [['Hips',.13],['Spine_1',.15],['Head',.1],['Left_Foot',.04],['Right_Foot',.04]])low=Math.min(low,wp(f.rig.bones[name]).y-r*f.rig.bodyScale);
  if(low<0){const h=f.rig.bones.Hips,p=wp(h);p.y-=low;h.position.copy(h.parent.worldToLocal(p));h.updateWorldMatrix(false,true);}
  this.guardGetup(f,k);clearArms(f,[],true);this.floorBody(f);
  finished=k.age>.55+duration/1.2;
  }
  if(finished){
   const pose=this.capturePose(f);f.knockdown=null;f.state='idle';f.timer=0;f.cooldown=.3;f.rush=1.6;f.target=this.fighters.find(o=>o.id===k.attacker&&!o.down);f.knockbackCooldown=7;f.knockVelocity.set(0,0,0);f.response.reset();f.navGoal=null;f.navPath=null;f.rig.resetContacts();f.footwork.prepare(false);f.walkStop={age:0,duration:.3,pose};this.emit('getups',f);
  }
 }
 groundThink(f,dt){
  if(f.kind===6){f.attack=null;f.boxingQueue=[];f.nextAttack=null;f.state='idle';f.cooldown=Math.max(.2,f.cooldown-dt);f.velocity.set(0,0,0);f.travelDistance=0;f.turnRate=0;const standing=this.fighters.find(t=>t.team!==f.team&&!t.down&&!t.knockdown&&!t.launch);if(standing)f.target=standing;return;}
  const martial=isMartial(f),hurry=martial?Math.max(.8,this.intensity.urgency):this.intensity.urgency;
  const t=f.target,k=t.knockdown;f.cooldown-=dt*this.intensity.frequency;f.timer+=dt;f.turnRate=0;
  const point=this.targetPoint(t,'body').setY(0),delta=point.clone().sub(f.root.position),distance=delta.length(),facing=Math.atan2(delta.x,delta.z),turn=clamp(angleDelta(f.yaw,facing),-dt*(3.8+hurry*4),dt*(3.8+hurry*4));f.yaw+=turn;f.turnRate=turn/dt;
  let desired=V();
  if(f.attack){f.attack.motionAge+=dt;f.attack.time+=dt;if(f.attack.contact)f.attack.contact.age+=dt;if(f.attack.motionAge>=f.attack.duration){f.attack=null;f.cooldown=martial?.12:.4;f.state='idle';}}
  if(!f.attack){
   const safe=this.navigation.groundGoal(f,this.fighters,point);
   const inSidePosition=safe&&safe.distanceTo(f.root.position)<(martial?.24:.16)&&(!martial||(distance<=1.12&&distance>=.72));
   if(inSidePosition&&hurry>.5){f.velocity.multiplyScalar(Math.exp(-dt*35));f.cooldown=Math.min(f.cooldown,.12);}
   if(safe&&!inSidePosition)desired.copy(this.navigation.velocity(f,this.fighters,safe,this.time,martial?(f.kind===5?4.5:3.9):2.2+hurry*1.1));
   if((k.phase==='ground'||(k.phase==='rise'&&k.age<.7))&&inSidePosition&&(k.attacker===f.id||martial)&&distance<=1.16&&distance>=.72&&f.cooldown<=0&&f.velocity.length()<(.12+hurry*.18)&&!f.walkStop&&!f.attackRecovery&&Math.abs(angleDelta(f.yaw,facing))<.35){
    const duration=(this.motions.axeKick.frames.length-1)/30/this.intensity.playback;
    f.attack={...attacks.axeKick,type:'groundKick',ground:true,playback:this.intensity.playback,motionAge:0,time:0,done:false,duration,target:t,previous:null,guard:f.root.worldToLocal(wp(f.rig.bones.Left_Foot))};f.state='attack';f.timer=0;this.emit('attacks',f,{attack:'groundKick',target:t.id});
   }
  }
  f.velocity.lerp(desired,1-Math.exp(-dt*15));this.move(f,f.velocity.clone().multiplyScalar(dt));
 }
 beginKnockback(f,attacker,direction,magnitude,trip=0,hit={}){
  if(magnitude>=(trip?26:38)&&f.health>14&&this.random()<clamp(.42+(magnitude-38)*.012+trip,.42,.88)){this.beginKnockdown(f,attacker,direction,magnitude,hit);return;}
  const speed=clamp(3.1*(magnitude/36),2.2,4.8)*massTransfer(attacker.mass,f.mass);
  f.knockback={age:0,phase:'contact',direction:direction.clone(),speed};
  f.walkStop=null;f.attackRecovery=null;f.poseWasAttack=false;f.poseHipY=null;f.footwork.prepare(false);f.rig.resetContacts();
  f.attack=null;f.defense=null;f.state='knockback';f.timer=0;f.velocity.set(0,0,0);f.knockVelocity.set(0,0,0);f.retreat=0;f.rush=0;f.knockbackCooldown=3.2;
  attacker.nextAttack=attacker.kind===6?'jab':attacker.kind===4?'kick':attacker.kind===5?'spinKick':this.random()<.5?'kick':'lowKick';attacker.spacingAge=0;attacker.retreat=0;
  this.emit('knockbacks',f,{attacker:attacker.id,speed,point:f.root.position.toArray()});
 }

 move(f,delta){
  this.impactWorld.move(f,delta);
  const proposed=f.root.position.clone().add(delta);
  for(const o of this.fighters){if(o===f||o.down||o.knockdown)continue;const sep=proposed.clone().sub(o.root.position);sep.y=0;const len=sep.length();if(len<.82&&len>.001)proposed.addScaledVector(sep,(.82-len)/len*.5);}
  proposed.copy(this.navigation.constrain(proposed,f.kind===6?.65:f.kind===3?.55:.44));f.travelDelta=proposed.clone().sub(f.root.position);f.travelDistance=f.travelDelta.length();f.root.position.copy(proposed);f.root.rotation.y=f.yaw;
 }
 knockbackThink(f,dt){
  const k=f.knockback;k.age+=dt;f.turnRate=0;
  if(k.age<=.055)return;
  const since=k.age-.055;
  if(since<.75){k.phase='stumble';f.state='stagger';f.velocity.copy(k.direction).multiplyScalar(k.speed*Math.exp(-since*2.4));}
  else{k.phase='recover';f.state='recover';f.velocity.set(0,0,0);}
  if(since>1.15&&!f.footwork.swing){
   f.knockback=null;f.state='idle';f.timer=0;f.rush=2;f.cooldown=.16;f.reaction=.12;f.velocity.set(0,0,0);f.walking=false;
   this.emit('recoveries',f);return;
  }
  this.move(f,f.velocity.clone().multiplyScalar(dt));
 }

 think(f,dt){
  if(f.positionIntent&&(f.knockback||f.defense||f.state==='hit'))this.positioning.finish(f,'interrupted');
  f.root.position.y=0;
  if(f.openingDelay>0){
   if(f.state==='hit'||f.lastAggressor){f.openingDelay=0;f.openingAge=.65;}
   else{f.openingDelay=Math.max(0,f.openingDelay-dt);f.velocity.set(0,0,0);f.travelDistance=0;f.turnRate=0;return;}
  }
  f.openingAge=Math.min(.65,(f.openingAge??.65)+dt);
  f.knockbackCooldown=Math.max(0,f.knockbackCooldown-dt);f.rush=Math.max(0,f.rush-dt);f.reposition=Math.max(0,f.reposition-dt);
  if(f.knockback){this.knockbackThink(f,dt);return;}
  if(f.state==='hit')f.exchangeCount=0;
  if(f.kind===6&&f.state==='hit'){f.boxingQueue=[];f.nextAttack=null;}
  if(f.attack?.authored){advanceAuthoredSpecial(this,f,dt);return;}
  this.decisions.helpAlly(f);
  if(isMartial(f)&&!f.attack&&f.state!=='hit'&&!f.defense){
   const fallen=this.fighters.filter(t=>t.team!==f.team&&!t.down&&t.knockdown&&!t.launch&&t.knockdown.phase!=='rise'&&t.root.position.distanceTo(f.root.position)<5).sort((a,b)=>a.root.position.distanceTo(f.root.position)-b.root.position.distanceTo(f.root.position))[0];
   if(fallen&&f.target!==fallen){f.target=fallen;f.navPath=null;f.navGoal=null;f.groundSide=null;f.cooldown=Math.min(f.cooldown,.12);}
  }
  if(f.target?.knockdown){f.retreat=0;f.reposition=0;this.groundThink(f,dt);return;}
  f.timer+=dt;f.cooldown-=dt*this.intensity.frequency;f.retreat=Math.max(0,f.retreat-dt);f.reaction=Math.max(0,f.reaction-dt);f.recoil.multiplyScalar(Math.exp(-dt*9));f.recoilVelocity+=(-100*f.recoilAngle-15*f.recoilVelocity)*dt;f.recoilAngle+=f.recoilVelocity*dt;f.knockVelocity.multiplyScalar(Math.exp(-dt*5));
  if(!f.attack&&!f.defense&&f.state==='idle'&&f.spacingAge>3.2&&this.time>=f.engagementUntil&&f.target&&!f.target.knockdown){
   const load=t=>this.fighters.filter(o=>o!==f&&!o.down&&!o.knockdown&&o.team===f.team&&o.target===t).length;
   const score=t=>f.root.position.distanceTo(t.root.position)+load(t)*.75;
   const alternative=this.fighters.filter(t=>t.team!==f.team&&!t.down&&!t.knockdown).sort((a,b)=>score(a)-score(b))[0];
   if(alternative&&alternative!==f.target&&score(alternative)+.4<score(f.target)){f.target=alternative;f.navGoal=null;f.navPath=null;f.spacingAge=0;}
  }
  this.exchanges.update(f);
  const t=f.target;let desired=V();if(!t){f.velocity.set(0,0,0);f.knockVelocity.set(0,0,0);f.restTime=(f.restTime||0)+dt;f.attack=null;f.defense=null;f.state='idle';f.turnRate=0;f.travelDistance=0;return;}if(t){f.restTime=0;f.settled=false;const d=t.root.position.clone().sub(f.root.position);d.y=0;const dist=d.length();const threatFacing=f.defense?.attacker&&!f.defense.attacker.down?f.defense.attacker.root.position.clone().sub(f.root.position):d;const facing=Math.atan2(threatFacing.x,threatFacing.z)+(f.attack?.aimError||0);const turnSpeed=f.attack?(f.attack.motionAge/f.attack.duration<.30&&!f.attack.contact?this.intensity.tracking:.55):f.kind===6?3.1:6.2;const facingError=angleDelta(f.yaw,facing);let turn=!f.attack&&Math.abs(facingError)<.12?0:clamp(facingError,-dt*turnSpeed,dt*turnSpeed);
   f.turnRate=turn/dt;f.yaw+=turn;
   if(f.attack){const a=f.attack;a.motionAge+=dt;if(a.contact)a.contact.age+=dt;else a.time+=dt;if(a.motionAge>a.duration){f.attack=null;this.finishExchange(f,a,t);}}
   if(f.defense){f.defense.time+=dt;if(f.defense.time>f.defense.duration){f.defense=null;f.state='idle';f.timer=0}}
   if(f.state==='hit'&&f.timer>(f.hitDuration||.45)){f.state='idle';f.timer=0}
   if(!f.attack&&f.state!=='hit'&&!f.defense){
    if(f.signatureQueued&&f.signatureAutomatic&&!this.decisions.signatureAvailable(f)){f.signatureQueued=null;f.signatureAutomatic=false;f.nextAttack=null;}
    if(!this.forcedAttack&&!f.signatureQueued&&this.decisions.signatureAvailable(f))this.queueSignature(f,true);
    if(!f.nextAttack)f.nextAttack=(this.forcedAttack==='giantUppercut'&&f.kind!==6?'uppercut':this.forcedAttack)||this.chooseAttack(f);
    f.nextAttack=this.positioning.fitAttack(f,f.nextAttack,attacks);
    f.spacingAge=(f.spacingAge||0)+dt;
    // A corner or a pursuer can deny the long strike: switch to close combat.
    if(f.spacingAge>2.2&&attacks[f.nextAttack]?.kick&&dist<this.attackRange(f,f.nextAttack).min){f.nextAttack='jab';f.spacingAge=0;}
    const rearRun=d.clone().normalize().dot(V(Math.sin(t.yaw),0,Math.cos(t.yaw)))>.55&&f.velocity.length()>.5&&dist>1.35&&this.time>=f.runningEntryAfter;
    if(rearRun&&!this.forcedAttack&&f.nextAttack!=='cross'){f.nextAttack='cross';f.navGoal=null;f.navPath=null;}
    const requested=this.forcedAttack||f.nextAttack,planned=f.kind===6&&requested==='palmStrike'?'cross':f.kind===6&&attacks[requested]?.kick?'jab':requested==='giantUppercut'&&f.kind!==6?'uppercut':requested,range=this.attackRange(f,planned);
    const preferred=f.retreat>0?Math.max(range.ideal,1.85):range.ideal;
    const escapeGoal=this.positioning.goal(f);
    const goal=escapeGoal||this.navigation.goal(f,this.fighters,preferred,this.time);
    const slotDistance=goal.distanceTo(f.root.position);
    // A reserved slot guides the approach, but must not veto a clear strike
    // already available from the current position.
    const lane=d.clone().normalize();const clearLane=!this.fighters.some(o=>{if(o===f||o===t||o.down||o.knockdown)return false;const offset=o.root.position.clone().sub(f.root.position).setY(0),along=offset.dot(lane);return along>.15&&along<dist-.18&&offset.addScaledVector(lane,-along).length()<(o.kind===6?.67:o.kind===3?.58:.46);});
    const entryRange=this.attackRange(f,'cross');
    const rearApproach=lane.dot(V(Math.sin(t.yaw),0,Math.cos(t.yaw)))>.55;
    const runningEntry=!this.forcedAttack&&rearApproach&&clearLane&&!t.knockback&&this.time>=f.runningEntryAfter&&f.velocity.dot(lane)>.95&&dist>entryRange.ideal+.25&&dist<entryRange.ideal+.65&&!f.attackRecovery&&!f.walkStop&&this.navigation.segment(f.root.position,t.root.position,[],f.kind===6?.65:f.kind===3?.55:.44);
    const bodySpace=this.time<(f.bodyEscapeUntil||0)||!this.navigation.bodyBlockers(f,this.fighters).some(o=>Math.hypot(f.root.position.x-o.x,f.root.position.z-o.z)<o.radius+.10);
    const inPosition=dist>=range.min&&dist<=range.max&&clearLane&&bodySpace;
    const urgent=dist>2.15;const pace=f.kind===6?(urgent?1.85:f.retreat>0?1.3:1.1):urgent?(f.kind===3?2.65:f.kind===2?2.95:3.5):(f.retreat>0?2.5:1.65);
    const holdGuard=clearLane&&bodySpace&&f.cooldown>.12&&dist>=range.min-.18&&dist<=range.max+.18;
    if(escapeGoal||f.swingBlocked||((!inPosition||f.retreat>0)&&!holdGuard))desired.copy(this.navigation.velocity(f,this.fighters,goal,this.time,pace));
    // Face the route while travelling; close orbiting uses the combat guard.
    if(dist>2.1&&desired.lengthSq()>.01){const routeFacing=Math.atan2(desired.x,desired.z);f.yaw-=turn;turn=clamp(angleDelta(f.yaw,routeFacing),-dt*5.2,dt*5.2);f.yaw+=turn;f.turnRate=turn/dt;}
    if(!escapeGoal&&!f.swingBlocked&&!this.positioning.settling(f)&&f.cooldown<=0&&this.rhythm.canStart(f,planned)&&Math.abs(angleDelta(f.yaw,facing))<.2&&(runningEntry||(inPosition&&!t.knockback&&dist>=range.min&&dist<=range.max&&f.velocity.length()<.10&&!f.walkStop&&!f.attackRecovery&&f.rig.currentClip?.startsWith('idle')&&f.rig.transition>=1-this.intensity.urgency*.65&&(!f.footwork.swing||(this.intensity.urgency>.75&&f.footwork.swing.age/f.footwork.swing.duration>.75))))&&(this.forcedAttack||f.signatureQueued||this.positioning.swingClear(f,planned,attacks[planned]))){const type=runningEntry?'cross':planned;f.nextAttack=null;f.spacingAge=0;const spec=martialSpec(f,type,attacks[type]),playback=f.kind===6?Math.min(spec.playbackCap??1.05,this.intensity.playback*.72):Math.min(spec.playbackCap??Infinity,this.intensity.playback);f.attack={...spec,type,heavyweight:f.kind===6,playback,aimError:this.intensity.aimError?(this.random()-.5)*2*this.intensity.aimError:0,motionAge:0,time:0,done:false,footStart:f.root.worldToLocal(wp(f.rig.bones.Right_Foot)),handStarts:Object.fromEntries(['Left','Right'].map(side=>[side,f.root.worldToLocal(wp(f.rig.bones[side+'_Hand']))])),duration:spec.seconds||(this.motions[spec.clip].frames.length-1)/30/playback,previous:null,target:t,aim:null,guard:f.root.worldToLocal(wp(f.rig.bones[spec.side+(spec.kick?'_Foot':'_Hand')]))};if(f.kind===6)f.attack.damage*=1.2;this.applySignature(f,f.attack);f.attack.comboFinisher=f.kind===6&&f.boxingTarget===t&&f.boxingQueue?.length===0&&['hook','hookLeft','uppercut'].includes(type);if(f.attack.comboFinisher)this.emit('boxingFinishers',f,{attack:type,target:t.id});if(runningEntry){f.attack.runningEntry={direction:lane.clone(),speed:clamp(f.velocity.dot(lane),1.4,2.8),stop:entryRange.ideal};f.runningEntryAfter=this.time+5;}f.state='attack';f.timer=0;this.rhythm.started(f,type);this.emit('attacks',f,{attack:type,target:t.id,distance:dist,range,runningEntry});
     if(facingDot(t,f)>-.45&&(!t.attack||t.attack.time/t.attack.duration>.6)&&!t.defense&&t.state!=='hit'&&!t.knockback&&t.reaction<=0){const r=this.random();if(r<profile(t).block&&guardCovers(t,f)){t.attack=null;t.defense={type:'block',time:-(.10+this.random()*.06),duration:f.attack.duration*.8,attacker:f};t.state='block'}else if(r<profile(t).dodge){t.attack=null;t.defense={type:'dodge',time:-(.09+this.random()*.05),duration:f.attack.duration*.95,attacker:f,sign:this.random()<.5?-1:1};t.state='dodge'}}
    }
   }
   if(f.defense?.type==='dodge'&&f.defense.time>0){const u=f.defense.time/f.defense.duration;const pulse=Math.sin(Math.PI*Math.min(1,u*1.3));desired.set(-Math.sin(f.yaw),0,-Math.cos(f.yaw)).multiplyScalar(.90*pulse).addScaledVector(V(Math.cos(f.yaw),0,-Math.sin(f.yaw)),f.defense.sign*.35*pulse)}
  }
  if(f.attack||f.state==='hit'||f.defense?.type==='block'||this.positioning.settling(f))desired.set(0,0,0);
  // Complete a planted strike recovery before translating its cached pose.
  if(f.attackRecovery||f.walkStop||(f.poseWasAttack&&!f.attack)){desired.set(0,0,0);f.velocity.set(0,0,0);}
  const entry=f.attack?.runningEntry;
  if(entry){
   // Carry the approach into the authored punch, then brake before the body.
   // No tracking dash: direction is fixed at takeoff and every step checks clearance.
   const remaining=f.attack.target.root.position.clone().sub(f.root.position).setY(0).dot(entry.direction)-entry.stop;
   const speed=f.attack.contact?0:Math.min(entry.speed*Math.exp(-f.attack.motionAge*2),Math.max(0,remaining)*8);
   f.velocity.copy(entry.direction).multiplyScalar(speed);
   const end=f.root.position.clone().addScaledVector(f.velocity,dt);
   if(!this.navigation.segment(f.root.position,end,this.navigation.blockers(f,this.fighters),f.kind===6?.65:f.kind===3?.55:.44))f.velocity.set(0,0,0);
  }else if(f.openingAge<.65){
   // Accelerate through the first planted step instead of reaching running speed in one beat.
   const change=desired.clone().sub(f.velocity),limit=(f.kind===3||f.kind===6?4.5:5.5)*dt;
   if(change.length()>limit)change.setLength(limit);f.velocity.add(change);
  }else f.velocity.lerp(desired,1-Math.exp(-dt*(desired.length()>2?17:13)));
  this.move(f,f.velocity.clone().add(f.knockVelocity).multiplyScalar(dt));
 }
 pose(f,dt){
  f.settled=false;
  const a=f.attack,b=f.rig.bones;
  if(a?.authored){poseAuthoredSpecial(this,f,dt);return;}
  f.celebrating=!a&&!f.target&&!f.knockdown&&!f.knockback&&!f.walkStop&&!f.attackRecovery&&!this.idleShow&&f.restTime>.2;
  if(f.celebrating){this.victoryPose(f,f.restTime-.2,dt);return;}

  // Urgency speeds decisions, but must leave enough time to return an extended limb.
  if(f.poseWasAttack&&!a&&f.state!=='hit'&&!f.knockback)f.attackRecovery={age:0,duration:Math.max(f.poseWasKick?(f.poseAttackPhase<.85?.52:.28):f.kind===6?.24:.20,(f.poseWasKick?.48:(f.kind===3?.32:.26))*(1-this.intensity.urgency*.75)),floor:Math.min(...['Left','Right'].flatMap(side=>['heel','toe'].map(kind=>f.rig.sole(side,kind).y))),pose:f.rig.ordered.map(b=>({q:b.quaternion.clone(),p:b.position.clone()}))};
  if(a||f.state==='hit'||f.knockback){f.attackRecovery=null;f.walkStop=null;}
  f.poseWasAttack=!!a;f.poseWasKick=!!(a?.kick);if(a)f.poseAttackPhase=a.motionAge/(a.duration||((this.motions[a.clip].frames.length-1)/this.motions[a.clip].fps/(a.playback||1)));
  let name='idle',time=this.time+f.id*.67,loop=true,upper=null;
  if(a&&!a.plants)a.plants=Object.fromEntries((a.ground?['Right']:a.kick?['Left']:['Left','Right']).map(side=>{const kind=side==='Right'?'toe':'heel';return [side,{kind,point:f.rig.sole(side,kind),rotation:wq(f.rig.bones[side+'_Foot'])}]}));
  const speed=(f.travelDistance??f.velocity.length()*dt)/Math.max(dt,.00001);
  const motionVelocity=speed<.001?V():f.travelDelta?f.travelDelta.clone().setLength(speed):f.velocity;
  const wasWalking=f.walking;let gaitYaw=f.yaw;
  // Close combat uses short steps in any direction. Switching forward/back
  // nudges to a full walk cycle made the rear leg repeatedly stretch and snap back.
  const closeDistance=f.target?f.root.position.distanceTo(f.target.root.position):Infinity;
  f.shuffle=!a&&!f.knockback&&!!f.target&&speed>.10&&speed<(f.shuffle?2.0:1.8)&&closeDistance<(f.shuffle?2.65:2.4);
  f.walking=!a&&!f.shuffle&&f.velocity.length()>(f.walking?.04:.12)&&speed>(f.walking?.06:.16)&&f.defense?.type!=='block';
  if(wasWalking&&!f.walking&&!f.shuffle&&!a&&!f.knockback&&f.state!=='hit'){
   f.walkStop={age:0,duration:Math.max(.18,(f.kind===3?.42:.36)*(1-this.intensity.urgency*.72)),pose:f.rig.ordered.map(b=>({q:b.quaternion.clone(),p:b.position.clone()}))};
  }
  if(a||f.walking||f.shuffle)f.walkStop=null;
  const footwork=!a&&!f.walking;
  f.footwork.prepare(footwork);
  f.casualIdle=false;
  if(!a&&f.state==='idle'&&!f.defense&&!f.knockback&&f.velocity.length()<.14){
   const relaxed=this.idleShow;
   const sequences=[['idleRelax','idleShoulder','idleWeight'],['idleWeight','idleNeck','idleRelax'],['idleRelax','idleNeck','idleStretch'],['idleWeight','idleShoulder','idleRelax']];
   f.idleClock=(f.idleClock||0)+dt;
   if(relaxed){
    const seq=sequences[f.kind%sequences.length];f.idleSlot??=f.id;name=seq[f.idleSlot%seq.length];
    const duration=(this.motions[name].frames.length-1)/this.motions[name].fps;
    if(f.idleClock>duration){f.idleClock=0;f.idleSlot++;name=seq[f.idleSlot%seq.length];}
    f.casualIdle=true;loop=false;
   }else name='idle';
   time=f.idleClock;
  }
  if(f.walking){
   const close=f.target&&f.root.position.distanceTo(f.target.root.position)<2.4;
   // A pushed fighter backpedals while facing the impact; never rotate a run
   // cycle backwards independently of the torso.
   const forwardMotion=motionVelocity.clone().normalize().dot(V(Math.sin(f.yaw),0,Math.cos(f.yaw)));
   const running=!f.knockback&&forwardMotion>.35&&speed>(f.gaitName==='walkRun'?1.45:1.95);
   name=running?'walkRun':close?'walkFight':'walk1';
   if(!this.motions[name])name='walk1';
   if(f.gaitName!==name||!wasWalking){f.walkClock=this.gaitEntryTime(f,this.motions[name]);f.gaitName=name;}
   const clip=this.motions[name];
   if(running&&motionVelocity.length()>.2){f.locomotionYaw??=f.yaw;f.locomotionYaw+=clamp(angleDelta(f.locomotionYaw,Math.atan2(motionVelocity.x,motionVelocity.z)),-dt*9,dt*9);gaitYaw=f.yaw+clamp(angleDelta(f.yaw,f.locomotionYaw),-.65,.65);}else f.locomotionYaw=f.yaw;
   const direction=motionVelocity.dot(V(Math.sin(gaitYaw),0,Math.cos(gaitYaw)))<-.05?-1:1;
   f.walkClock+=direction*speed*dt/(clip.nativeSpeed*f.rig.hipHeight);
   time=f.walkClock;loop=true;
   const distance=f.target?f.root.position.distanceTo(f.target.root.position):Infinity;
   f.approachGuard=distance<(f.approachGuard?2.35:2.05);
   if(f.approachGuard&&name!=='walkRun')upper='idle';
  }
  if(a){name=a.clip;time=this.attackTime(a);loop=false;}
  let gaitLift=0;
  if(f.walking&&name==='walkRun'){const clip=this.motions[name],n=clip.frames.length-1,phase=((time*clip.fps%n)+n)%n,i=Math.floor(phase),j=Math.min(i+1,n),u=phase-i;const floor=clip.floor;gaitLift=Math.max(0,Math.min(...['Left','Right'].map(side=>T.MathUtils.lerp(clip.feet[i][side][1],clip.feet[j][side][1],u)))-floor)*f.rig.hipHeight;}
  f.gaitLift=gaitLift;
  f.rig.animate(name,time,dt,gaitYaw,loop,upper,f.strideScale);
  if(f.walking){
   const clip=this.motions[name],n=clip.frames.length-1,frame=((time*clip.fps%n)+n)%n,i=Math.floor(frame),j=Math.min(i+1,n),u=frame-i;
   const weight=f.rig.transition*f.rig.transition*(3-2*f.rig.transition);
   for(const side of ['Left','Right']){
    const ankle=b[side+'_Foot'],rotation=wq(ankle);
    for(const [part,start,end] of [['upper','_UpLeg','_Leg'],['lower','_Leg','_Foot']]){
     const dir=V().fromArray(clip.legDirections[i][side][part]).lerp(V().fromArray(clip.legDirections[j][side][part]),u).normalize().applyAxisAngle(Y,gaitYaw);
     aim(b[side+start],b[side+end],wp(b[side+start]).add(dir),weight);
    }
    setWorldQ(ankle,rotation);
   }
  }

  // ADD reactions are offsets on a guard, never replacement full-body poses.
  // Integrate existing impulse velocity on the new pose before testing this frame’s contacts.
  if(f.defense?.type==='dodge'&&f.defense.time>=0){f.rig.overlay('dodge',f.defense.time,f.yaw,.9,.4);const u=f.defense.time/f.defense.duration;const lateral=V(-Math.sin(f.yaw),0,-Math.cos(f.yaw));f.rig.impact(lateral,.40*Math.sin(Math.PI*Math.min(1,u*1.35)),'head');}

  if(f.state==='hit'&&f.timer<(f.hitDuration||.45)){
   const duration=f.hitDuration||.45;const pulse=f.martialImpact?smooth(clamp(f.timer/.04,0,1))*(1-smooth(clamp((f.timer-duration*.15)/(duration*.85),0,1))):Math.sin(Math.PI*clamp(f.timer/duration,0,1));
   if(f.martialImpact)f.rig.impact(f.martialImpact.direction,f.martialImpact.amount*pulse,f.hitZone);
   f.rig.overlay(f.hitZone==='head'?'hitHead':'hitBody',f.timer*1.3,f.yaw,(f.hitStrength||.7)*pulse,.38);
  }
  if(f.knockback){
   const k=f.knockback,u=clamp((k.age-.055)/.65,0,1);
   const lean=k.phase==='stumble'?.28*Math.sin(Math.PI*u):0;
   if(lean>0)f.rig.impact(k.direction,lean,'head');
  }
  // Keep the FBX full-body pose, including its hip motion and support-foot pivot.
  // Only translate the complete skeleton vertically; never solve the attack's knees with IK.
  if(a){
   const clip=this.motions[a.clip],idx=Math.min(clip.frames.length-1,Math.floor(this.attackTime(a)*clip.fps));
   clip.floor??=Math.min(...clip.feet.flatMap(f=>[f.Left[1],f.Right[1]]));
   const sourceFeet=clip.feet[idx];
   const lift=Math.max(0,Math.min(sourceFeet.Left[1],sourceFeet.Right[1])-clip.floor)*f.rig.hipHeight;
   f.rig.ground(.003+lift);
  }else if(f.walking){
   // Preserve native hip, knee flexion and heel/toe roll. No procedural leg IK here.
   f.rig.ground(.003+gaitLift);f.poseHipY=null;
  }else{
   f.rig.ground();
   const hips=b.Hips,hip=wp(hips),wanted=name!=='idle'&&name.startsWith('idle')?hip.y:f.rig.hipHeight*.92;
   f.poseHipY??=hip.y;f.poseHipY+=(wanted-f.poseHipY)*(1-Math.exp(-dt*22));hip.y=f.poseHipY;
   hips.position.copy(hips.parent.worldToLocal(hip));hips.updateWorldMatrix(false,true);
   f.footwork.update(dt,f.yaw,motionVelocity);
  }
  f.response.step(dt);if(!a){f.response.apply();f.rig.ground(.003+gaitLift);}
  if(f.defense?.type==='block'&&f.defense.time>0){
   for(const [side,x] of [['Left',.1],['Right',-.1]]){
    const point=wp(b.Head).add(V(x,-.035,.14).applyAxisAngle(Y,f.yaw));f.rig.handIK(side,point,Math.min(1,f.defense.time/.10),.26);
   }
  }
  if(!a&&!f.walking)flattenSupportFeet(f);
  if(f.casualIdle)clearArms(f,[]);
  if(f.walkStop){
   // Blend the final solved pose, after foot placement and ankle flattening.
   // Blending just animation tracks is insufficient: IK used to overwrite it in one frame.
   const stop=f.walkStop;stop.age+=dt;const t=clamp(stop.age/stop.duration,0,1),weight=t*t*(3-2*t);
   f.rig.ordered.forEach((bone,i)=>{bone.quaternion.copy(stop.pose[i].q.clone().slerp(bone.quaternion,weight));bone.position.lerpVectors(stop.pose[i].p,bone.position,weight);});
   f.root.updateMatrixWorld(true);f.rig.ground(.003);
   if(t===1)f.walkStop=null;
  }
  if(f.attackRecovery){
   // Blend after IK too: an authored strike must not snap into planted-foot stance.
   const recovery=f.attackRecovery;recovery.age+=dt;
   const t=clamp(recovery.age/recovery.duration,0,1),weight=smooth(t);
   f.rig.ordered.forEach((bone,i)=>{bone.quaternion.copy(recovery.pose[i].q.clone().slerp(bone.quaternion,weight));bone.position.lerpVectors(recovery.pose[i].p,bone.position,weight);});
   f.root.updateMatrixWorld(true);f.rig.ground(Math.max(.003,recovery.floor*(1-weight)));
   if(t===1)f.attackRecovery=null;
  }
  // A reversed walk/reaction blend can briefly put a knee behind its leg plane.
  // Preserve the authored ankle position and only correct that invalid bend.
  if(f.walking&&!f.attackRecovery&&!f.walkStop)for(const side of ['Left','Right']){
   const thigh=b[side+'_UpLeg'],knee=b[side+'_Leg'],foot=b[side+'_Foot'],hip=wp(thigh),ankle=wp(foot),axis=ankle.clone().sub(hip).normalize(),bend=wp(knee).sub(hip),forward=V(Math.sin(gaitYaw),0,Math.cos(gaitYaw));bend.addScaledVector(axis,-bend.dot(axis));
   if(bend.dot(forward)<-.01){const rotation=wq(foot);twoBone(thigh,knee,foot,ankle,hip.clone().addScaledVector(forward,.5).add(V(0,-.25,0)));setWorldQ(foot,rotation);}
  }
  if(a&&f.kind===6&&!a.kick&&a.target){
   // Translate the authored punch arc; never replace it with a hand chasing a head.
   // Local glove positions at extension, calibrated on this heavyweight's rig.
   const anchors={jab:[-.13,1.58,1.52],cross:[-.06,1.57,1.54],hookLeft:[-.15,1.68,1.52],hook:[-.18,1.68,1.49],uppercut:[-.61,1.18,1.26],giantUppercut:[-.61,1.18,1.26],body:[-.06,1.20,1.35]};
   const u=this.attackTime(a)/(a.duration*a.playback),anchor=a.nativeAnchor||anchors[a.type];
   if(anchor){
    if(!a.boxingOffset){const reference=f.root.localToWorld(V(...anchor));a.boxingOffset=this.targetPoint(a.target,a.zone).add(V(0,a.zone==='head'?.06:0,0)).sub(reference).clampLength(0,.55);}
    const weight=smooth(clamp((u-.10)/.24,0,1))*(1-smooth(clamp((u-.53)/.30,0,1)));
    const current=f.rig.strikePoint(a.side,false);
    current.addScaledVector(a.boxingOffset,weight);
    if(a.boxingContactOffset)current.addScaledVector(a.boxingContactOffset,1-smooth(clamp(a.contact.age/.12,0,1)));
    f.rig.strikeContact(a.side,current,false);
   }
  }
  if(a?.palm&&a.target&&!a.contact){const u=a.motionAge/a.duration,w=smooth(clamp((u-.15)/.2,0,1))*(1-smooth(clamp((u-.65)/.2,0,1)));f.rig.strikeContact('Right',f.rig.strikePoint('Right',false).lerp(this.targetPoint(a.target,'body'),w),false);for(const bone of f.rig.ordered)if(/^Right_Hand_[A-E]_/.test(bone.name))bone.quaternion.copy(bone.userData.restLocalQ);}
  if(a?.type==='spinKick'&&a.target){
   // Keep the authored knee/ankle articulation; fit the high arc to the target's head.
   const u=a.motionAge/a.duration,weight=smooth(clamp((u-.22)/.16,0,1))*(1-smooth(clamp((u-.62)/.16,0,1)));
   const foot=b.Right_Foot,p=wp(foot),head=wp(a.target.rig.bones.Head),drop=clamp(p.y-head.y-.08,0,.14)*weight;
   if(drop>0){const rotation=wq(foot);aim(b.Right_UpLeg,foot,p.clone().add(V(0,-drop,0)));setWorldQ(foot,rotation);}
  }
  if(f.target?.knockdown){
   const head=b.Head,point=this.targetPoint(f.target,'body'),delta=point.clone().sub(wp(head)),pitch=clamp(Math.atan2(-delta.y,Math.hypot(delta.x,delta.z)),0,.65);
   setWorldQ(head,Q().setFromAxisAngle(V(Math.cos(f.yaw),0,-Math.sin(f.yaw)),pitch).multiply(wq(head)));
   if(a?.ground){const u=a.motionAge/a.duration,weight=smooth(clamp((u-.28)/.24,0,1))*(1-smooth(clamp((u-.72)/.2,0,1)));
    const foot=b.Left_Foot,target=this.targetPoint(a.target,'body');target.y+=.08;
    f.rig.strikeContact('Left',f.rig.strikePoint('Left',true).lerp(target,weight),true);
   }
  }
  f.root.updateMatrixWorld(true);
 }
 victoryPose(f,time,dt){
  if(isMartial(f))return recordedBow(this,f,time,dt);
  // Never freeze an arbitrary idle/strike/recovery pelvis as the victory base.
  // Build a neutral two-foot stance, then ease the final combat pose into it.
  if(!f.victoryStance){
   const before=this.capturePose(f);f.footwork.prepare(false);
   f.rig.animate('idle',0,1,f.yaw,true);
   // Combat idle is a crouched fighting pose, not a standing victory base.
   // Restore an upright pelvis and place both feet underneath it explicitly.
   const hips=f.rig.bones.Hips;
   setWorldQ(hips,Q().setFromAxisAngle(Y,f.yaw).multiply(hips.userData.restQ));
   const hipPoint=f.root.position.clone();hipPoint.y=.97*f.rig.hipHeight;
   hips.position.copy(hips.parent.worldToLocal(hipPoint));hips.updateWorldMatrix(false,true);
   for(const side of ['Left','Right']){
    const foot=f.rig.bones[side+'_Foot'],sign=side==='Left'?1:-1;
    const target=f.root.position.clone().add(V(sign*(f.kind===3?.23:.17)*f.rig.bodyScale,0,.035*f.rig.bodyScale).applyAxisAngle(Y,f.yaw));
    target.y=foot.userData.restWorldPos.y+.003;f.rig.limbContact(side,target,true);
   }
   flattenSupportFeet(f);
   f.victoryStance=f.rig.ordered.map((bone,i)=>({bone,i,p:bone.position.clone(),q:bone.quaternion.clone()})).filter(({bone})=>!bone.parent?.isBone||bone.name==='Hips'||/(UpLeg|_Leg|_Foot|_Toe)/.test(bone.name));
   f.victoryEntry={age:0,pose:before};
   f.rig.ordered.forEach((bone,i)=>{bone.position.copy(before[i].p);bone.quaternion.copy(before[i].q);});f.root.updateMatrixWorld(true);f.rig.currentClip=null;
  }
  if(!f.victoryPlan&&(f.kind===4||f.kind===5))f.victoryPlan={name:'idleRelax',speed:1,delay:(f.id%4)*.18,duration:4,bow:true};
  if(!f.victoryPlan){
   const calm=['idleWeight','idleShoulder','idleNeck','idleStretch','idleRelax','idleBounce'];
   const planned=this.fighters.filter(o=>!o.down&&o.victoryPlan),rank=planned.length,wave=Math.floor(rank/10);
   const used=new Set(planned.filter(o=>o.victoryPlan.wave===wave).map(o=>o.victoryPlan.name));
   const quiet=calm[(f.kind+this.round)%4];
   const choices=rank%2===0?[quiet,victoryClips[f.kind%victoryClips.length],...calm,...victoryClips]:[victoryClips[f.kind%victoryClips.length],quiet,...calm,...victoryClips];
   const name=choices.find(n=>!used.has(n)),clip=this.motions[name],speed=.82+(f.id%4)*.035;
   f.victoryPlan={name,speed,wave,delay:wave*15+(rank%10)*.24,duration:(clip.frames.length-1)/clip.fps/speed};
  }
  const plan=f.victoryPlan,clip=this.motions[plan.name],local=time-plan.delay-.45,playing=local>=0&&local<plan.duration;
  const gathering=!!f.victoryEntry&&f.victoryEntry.age<.45;
  const name=gathering?'idle':playing?plan.name:'idleRelax',sampleTime=gathering?0:playing?local*plan.speed:time*.85+f.id*.73;
  f.casualIdle=true;f.walking=false;f.walkStop=null;f.attackRecovery=null;f.poseWasAttack=false;f.footwork.prepare(false);
  f.rig.animate(name,sampleTime,dt,f.yaw,!playing,null,1,.5);
  const entry=f.victoryEntry;if(entry)entry.age+=dt;const weight=entry?smooth(clamp(entry.age/.45,0,1)):1;
  for(const stance of f.victoryStance){const from=entry?.pose[stance.i];stance.bone.position.copy(from?from.p:stance.p).lerp(stance.p,weight);stance.bone.quaternion.copy(from?from.q:stance.q).slerp(stance.q,weight);}
  f.root.updateMatrixWorld(true);if(entry){this.floorBody(f);if(weight===1)f.victoryEntry=null;}clearArms(f,[]);

 }
 fallPose(f,dt){
  const fall=f.fall;
  // On temporary KO, finish the authored landing promptly instead of handing
  // a mid-air curled pose to independent pelvis/chest rigid bodies.
  const fallDuration=(this.motions[fall.clip].frames.length-1)/30;
  if(f.knockdown&&fall.landed&&f.kind!==6){
   fall.settleSpeed??=Math.max(1,(fallDuration-fall.time)/.18);
   fall.time=Math.min(fallDuration,fall.time+dt*fall.settleSpeed);
  }else fall.time+=dt;f.root.position.copy(constrainCourtyard(f.root.position.clone().addScaledVector(fall.velocity,dt),.7));fall.velocity.multiplyScalar(Math.exp(-dt*1.8));
  if(fall.startYaw!==undefined){f.yaw=fall.startYaw+fall.yawOffset*smooth(clamp(fall.time/.32,0,1));f.root.rotation.y=f.yaw;}
  f.rig.animate(fall.clip,fall.time,dt,f.yaw,false);
  // Preserve the authored landing silhouette before allowing small physical settling.
  let low=Infinity;
  for(const [name,r] of [['Hips',.13],['Spine_1',.15],['Head',.1],['Left_Foot',.05],['Right_Foot',.05]])low=Math.min(low,wp(f.rig.bones[name]).y-r*f.rig.bodyScale);
  if(low<0){const h=f.rig.bones.Hips,p=wp(h);p.y-=low;h.position.copy(h.parent.worldToLocal(p));h.updateWorldMatrix(false,true);}
  // Keep the whole authored fall silhouette on the walkable side before ragdoll handoff.
  for(let pass=0;pass<3;pass++)for(const name of ['Head','Hips','Left_Hand','Right_Hand','Left_Foot','Right_Foot']){
   const point=wp(f.rig.bones[name]),safe=constrainCourtyard(point,.17),delta=safe.sub(point);delta.y=0;
   f.root.position.add(delta);f.root.updateMatrixWorld(true);
  }
  clearArms(f,[],true);
  const torsoLow=Math.min(wp(f.rig.bones.Hips).y-.14*f.rig.bodyScale,wp(f.rig.bones.Spine_1).y-.18*f.rig.bodyScale);
  const finished=fall.time>=(this.motions[fall.clip].frames.length-1)/30;
  if(!fall.landed&&fall.time>.18&&(torsoLow<.09||finished)){
   fall.landed=true;fall.contactTime=fall.time;const point=wp(f.rig.bones.Hips).lerp(wp(f.rig.bones.Spine_1),.5);point.y=.16;
   this.emit('landings',f,{point:point.toArray(),heavy:f.kind===2||f.kind===3||f.kind===6});
  }
  // Temporary knockouts go limp on contact, without waiting for the authored hold.
  if(f.knockdown&&fall.landed&&finished){f.knockdown.phase='ground';f.knockdown.age=f.kind===6?0:Math.min(0,(fall.contactTime??fall.time)-fallDuration);f.state='grounded';f.knockdown.pose=this.capturePose(f);f.knockdown.ragdoll=this.physics.add(f,fall.velocity.clone().multiplyScalar(.25),'Spine_2',true);return;}
  if(fall.time>=(this.motions[fall.clip].frames.length-1)/30){
   f.state='settling';f.velocity.copy(fall.velocity);this.physics.add(f,fall.velocity.clone(),'Spine_2');
  }
 }
 targetPoint(f,zone){const b=f.rig.bones;if(zone==='head')return wp(b.Head).add(V(0,.07,0));if(zone==='leg')return wp(b.Left_UpLeg).lerp(wp(b.Left_Leg),.65);return wp(b.Spine_1).lerp(wp(b.Spine_2),.25)}
 attackTime(a){
  if(!a.heavyweight||a.recordedBoxing)return a.motionAge*a.playback;
  // Give the recorded acceleration/extension more screen time, without slowing the whole recovery.
  const u=clamp(a.motionAge/a.duration,0,1),phase=u<.3?u:u<.6?.3+(u-.3)*.6:.48+(u-.6)*1.3;
  return phase*a.duration*a.playback;
 }
 constrainContact(f){
  // A contact must not replace the authored recovery with a hand-to-target IK animation.
  const a=f.attack,c=a.contact;if(a.authored)return;if(f.kind===6||c.age>.18||a.target.down||a.lowSweep)return;
  const point=c.bone.localToWorld(c.local.clone()),current=f.rig.strikePoint(a.side,a.kick);
  // Keep the striking endpoint on the incoming side of the contact surface.
  const depth=point.sub(current).dot(c.normal);
  if(depth<=0)return;
  f.rig.strikeContact(a.side,current.addScaledVector(c.normal,Math.min(.28,depth)),a.kick);
 }
 contact(f,dt){
  if(f.attack?.authored){contactAuthoredSpecial(this,f,dt);return;}
  const a=f.attack,t=a.target;if(a.done||t.down||t.launch||t.knockback||(t.knockdown&&(t.knockdown.phase==='fall'||(t.knockdown.phase==='ground'&&!a.ground))))return;
  const u=a.motionAge/a.duration,kick=a.kick,b=f.rig.bones,limb=b[a.side+(kick?'_Foot':'_Hand')],middle=b[a.side+(kick?'_Leg':'_ForeArm')];
  const wrist=wp(limb),fist=f.rig.strikePoint(a.side,kick),elbow=wp(middle);if(!a.guard)a.guard=f.root.worldToLocal(wrist.clone());const samples=[fist,elbow.clone().lerp(wrist,.68),elbow.clone().lerp(wrist,.35)],previous=a.samples||samples;
  a.samples=samples.map(p=>p.clone());const speed=fist.distanceTo(previous[0])/dt;
  if(u<.08)return;
  if(u>.92){a.done=true;this.emit(t.defense?.type==='dodge'?'dodges':'misses',t.defense?.type==='dodge'?t:f,{target:t.id,attacker:f.id});return;}
  if(speed<.65||a.lowSweep&&(u<.32||u>.76))return;
  let hit=null;
  for(const capsule of bodyCapsules(t).filter(c=>!a.lowSweep||c.zone==='leg'))for(let i=0;i<(a.lowSweep?3:1);i++){
   const radius=(i===0?(kick?.065:a.openPalm?.065:.043):(kick?.06:.05))*(f.kind===6&&!kick?2.1:1);const h=sweepCapsule(previous[i],samples[i],capsule,radius);
   if(h&&(!hit||h.t<hit.t)){hit={...h,index:i,radius};}
  }
  if(!hit)return;
  this.resolveContact(f,t,a,hit,dt,{kick,b,limb,fist,previous,speed});
 }
 resolveContact(f,t,a,hit,dt,{kick,b,limb,fist,previous,speed}){
  // Move the actual striking limb back to its first point of contact this frame.
  const endpoint=hit.point.clone();
  const zone=hit.capsule.zone,blocked=t.knockdown?.phase==='rise'||(zone==='arm'&&t.defense?.type==='block'&&t.defense.time>0&&guardCovers(t,f));
  a.done=true;a.contact={age:0,normal:hit.normal.clone(),index:hit.index,radius:hit.radius,fraction:[1,.68,.35][hit.index],clipTime:Math.max(0,a.time-dt*(1-hit.t))*a.playback,bone:hit.capsule.bone,local:hit.capsule.bone.worldToLocal(endpoint.clone()),zone,blocked,guard:a.guard||f.root.worldToLocal(wp(limb)),feet:Object.fromEntries((kick?['Left']:['Left','Right']).map(side=>[side,{position:wp(b[side+'_Foot']),rotation:wq(b[side+'_Foot'])}]))};
  if(f.kind===6&&!a.authored){a.boxingContactOffset=endpoint.clone().sub(fist);f.rig.strikeContact(a.side,endpoint,false);}
  this.constrainContact(f);
  const direction=t.root.position.clone().sub(f.root.position).setY(0).normalize();
  const incoming=fist.clone().sub(previous[0]).normalize();
  const impulseDirection=hit.normal.clone().negate().lerp(incoming,.4).normalize();
  const martialHit=isMartial(f)&&!blocked&&!t.knockdown;
  const cleanPower=!blocked&&!t.knockdown&&zone!=='arm'&&a.type!=='jab'&&(speed>=3||martialHit);
  a.powerHit=cleanPower;
  const measured=clamp(speed,2,10)*(kick?5.5:a.type==='jab'?1.7:3.6)*(blocked?.25:cleanPower?1.4:1);
  // Short recorded strikes can contact just before peak extension. Give a real,
  // unblocked contact its authored weight; misses and guards never get this boost.
  const heavyweight=f.kind===6&&!blocked&&!t.knockdown;
  const magnitude=heavyweight?Math.min(96,Math.max(measured*1.35,a.type==='jab'?24:42)):martialHit?clamp(Math.max(measured*1.15,zone==='arm'?12:a.type==='jab'?18:kick?48:34),0,zone==='arm'?40:88):Math.min(72,measured);
  const reaction=reactionProfile(a,zone,magnitude);
  const impulse=impulseDirection.multiplyScalar(magnitude);
  const surfacePoint=hit.point.clone().addScaledVector(hit.normal,-hit.radius);if(!t.knockdown)t.response.impulse(hit.capsule.bone.name,surfacePoint,impulse.clone().multiplyScalar(reaction.angular));
  const rootImpulse=impulse.clone().setY(0).multiplyScalar(reaction.root/t.mass);if(!t.knockdown)t.knockVelocity.add(rootImpulse);
  if(blocked){t.exchangeCount=0;t.cooldown=.18;t.nextAttack='cross';if(!t.knockdown)t.knockVelocity.addScaledVector(direction,.14);this.emit('blocks',t,{attacker:f.id,zone,point:hit.point.toArray()});return;}
  if(t.knockdown){
   const damage=7;t.health=Math.max(0,t.health-damage);t.knockdown.hitAge=0;t.knockdown.hitDirection=incoming.clone();t.knockdown.hitBone=hit.capsule.bone.name;t.knockdown.hitLocal=hit.capsule.bone.worldToLocal(surfacePoint.clone());
   this.emit('hits',f,{target:t.id,zone:hit.capsule.zone,surface:hit.capsule.bone.name,attack:'groundKick',groundImpact:true,point:hit.point.toArray(),damage,speed:+speed.toFixed(2),impulseMagnitude:18});
   if(t.health<=0){t.knockdown=null;t.down=true;t.state='settling';t.attack=null;this.physics.add(t,V(),'Spine_2');this.emit('knockouts',t,{attacker:f.id,zone:'body'});}return;
  }
  t.lastAggressor=f;t.lastHitTime=this.time;const damage=a.damage*(zone==='arm'?.55:1)*((a.signature||a.authoredSignature)?1:fighterBalance[f.kind].damage);t.health-=damage;t.hitDuration=reaction.duration;t.hitStrength=clamp(magnitude/28,.5,cleanPower?1.3:1)*reaction.overlay;t.hitZone=zone==='head'?'head':'body';const interrupt=martialHit||cleanPower||!t.attack||t.attack.time/t.attack.duration<.24||(a.type!=='jab'&&zone==='head');if(interrupt){t.state='hit';t.timer=0;t.attack=null;t.nextAttack=null;}t.reaction=.20;t.defense=null;t.cooldown=.35;

  t.martialImpact=martialHit&&reaction.tier!=='light'?{direction:direction.clone(),amount:(zone==='arm'?.09:a.type==='jab'?.13:kick?.30:.23)*(reaction.tier==='heavy'?.65:.45)*clamp(85/t.mass,.6,1.2)}:null;
  this.respondToAggressor(t,f);
  this.emit('hits',f,{target:t.id,zone,attack:a.type,reactionTier:reaction.tier,hitStop:reaction.tier==='heavy'?.045:martialHit&&reaction.tier==='medium'?.012:0,signature:(a.signature||a.authoredSignature)?.fx,signatureName:(a.signature||a.authoredSignature)?.name,point:hit.point.toArray(),damage,critical:!!a.signature||cleanPower&&reaction.tier==='heavy',speed:+speed.toFixed(2),surface:hit.capsule.bone.name,impulse:impulse.toArray(),impulseMagnitude:+magnitude.toFixed(2)});
  if(a.signature&&a.type==='sweepKick'&&t.health>0){this.beginKnockdown(t,f,direction,42,{type:'sweepKick',zone:'leg',direction:incoming});this.emit('sweepTrips',f,{target:t.id});return;}
  if(a.signature){this.beginUppercutLaunch(t,f,direction,false,a.signature,{incoming,magnitude});return;}
  if(this.forcedAttack&&(f.kind===4||f.kind===5)&&a.type==='sweepKick'&&zone==='leg'&&t.health>0){this.beginKnockdown(t,f,direction,42,{type:'sweepKick',zone:'leg',direction:incoming});this.emit('sweepTrips',f,{target:t.id});return;}
  if(this.forcedAttack&&f.kind===6&&(a.launch||a.comboFinisher)){this.beginUppercutLaunch(t,f,direction,a.type==='hook'||a.type==='hookLeft',null,{incoming,magnitude});return;}
  if(this.forcedAttack&&f.kind!==6&&!f.styleQueue?.length&&!((f.kind===4||f.kind===5)&&f.martialQueue?.length)&&t.health>0&&a.type!=='jab'&&zone!=='arm'&&reaction.tier==='heavy'&&magnitude>=26&&t.knockbackCooldown<=0)this.beginKnockback(t,f,direction,magnitude,(f.kind===4||f.kind===5)&&(a.type!=='sweepKick'||zone==='leg')?(a.trip||0):0,{type:a.type,zone,direction:incoming});
  if(t.health<=0){t.knockback=null;t.root.position.y=0;t.down=true;t.state='fall';t.fall=this.selectFall(t,f,direction,{type:a.type,zone,direction:incoming});t.fall.velocity=direction.clone().multiplyScalar(1.6*massTransfer(f.mass,t.mass)*t.fall.pushScale);t.attack=null;t.defense=null;this.emit('knockouts',t,{attacker:f.id,zone});}
 }
 preview(type,id,phase){
  if(type==='martialBow'||type==='martialKipUp'){
   const f=this.fighters[id],clip=this.motions[type],duration=(clip.frames.length-1)/clip.fps;
   f.settled=false;f.down=false;f.yaw=0;f.root.position.set(0,0,0);f.root.rotation.y=0;f.casualIdle=true;
   f.attack={clip:type,type,playback:1,duration,motionAge:phase*duration,time:phase*duration};
   f.rig.animate(type,phase*duration,1,0,false);if(type==='martialBow')f.rig.ground(.003);else this.floorBody(f);return;
  }

  const f=this.fighters[id];if(f.kind===6&&attacks[type]?.kick)type='jab';if(f.kind===6&&type==='palmStrike')type='cross';const isIdle=type.startsWith('idle')&&!!this.motions[type],spec=isIdle?{clip:type}:martialSpec(f,type,attacks[type]||attacks.jab);
  f.settled=false;f.down=false;f.state='attack';f.yaw=0;f.root.position.set(0,0,0);f.root.rotation.y=0;
  const duration=(this.motions[spec.clip].frames.length-1)/30;
  f.attack={...spec,type,heavyweight:f.kind===6,playback:1,duration,motionAge:phase*duration,time:phase*duration};
  this.pose(f,1);clearArms(f,[]);if(!isIdle&&!f.attack?.openPalm)f.rig.closeFists();
 }
 snapshot(){return {time:this.time,round:this.round,stats:{...this.stats},physicsBodies:this.physics.world.bodies.length,physicsConstraints:this.physics.world.constraints.length,fighters:this.fighters.map(f=>({id:f.id,state:f.state,health:f.health,position:f.root.position.toArray(),feet:Object.fromEntries(Object.entries(f.rig.feet).map(([s,v])=>[s,{target:v.pos.toArray(),actual:wp(f.rig.bones[s+'_Foot']).toArray(),phase:v.phase}]))})),events:this.events}}
}
class Fighter{
 constructor(root,id,motions,scene){this.id=id;this.kind=root.userData.kind??id;this.mass=[98,78,74,104,68,73,155][this.kind];this.team=root.userData.team??id%2;this.root=root;this.velocity=V();this.knockVelocity=V();this.recoil=V();scene.add(root);root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.frustumCulled=false;if(o.material){o.material.roughness=.86;o.material.envMapIntensity=.4}}});this.rig=new Rig(root,motions);this.response=new ImpactResponse(this.rig,this.mass);this.footwork=new Footwork(this.rig,{heavy:this.kind===3||this.kind===6});this.helper=new T.SkeletonHelper(root);this.helper.visible=false;this.helper.material.depthTest=false;this.helper.renderOrder=10;scene.add(this.helper)}
 reset(start){this.skinGrounded=false;this.specialCharge=0;this.specialUses=0;this.navRepathAfter=0;this.exposedUntil=0;this.assistReady=0;this.assistScan=0;this.cleanSeries=null;this.signatureAutomatic=false;this.hitDuration=.45;this.positionFit=null;this.swingBlocked=false;this.positionSettleUntil=0;this.positionIntent=null;this.positionReady=0;this.bodyEscapeUntil=0;this.navProgress=null;this.footwork.restTime=0;this.martialImpact=null;this.travelDelta=null;this.locomotionYaw=null;this.styleSeries=0;this.styleQueue=[];this.styleTarget=null;this.signatureQueued=null;this.signatureRequested=false;this.signatureReady=6+this.id*.8;this.martialSeries=0;this.martialQueue=[];this.martialTarget=null;this.boxingSeries=0;this.boxingQueue=[];this.boxingTarget=null;this.openingDelay=0;this.openingAge=.65;this.launch=null;this.uppercutReady=0;this.groundSide=null;this.runningEntryAfter=0;this.engagementUntil=0;this.lastAggressor=null;this.lastHitTime=-Infinity;this.knockdown=null;this.gaitName=null;this.gaitLift=0;this.shuffle=false;this.navFailedGoal=null;this.navGoal=null;this.navPath=null;this.navTarget=null;this.settled=false;this.restTime=0;this.celebrating=false;this.victoryPlan=null;this.victoryStance=null;this.victoryEntry=null;this.idleClock=0;this.idleSlot=this.id;this.casualIdle=false;this.maxHealth=fighterBalance[this.kind].health;this.health=this.maxHealth;this.down=false;this.restArmsChecked=false;this.state='idle';this.timer=0;this.cooldown=0;this.attack=null;this.defense=null;this.retreat=0;this.reaction=0;this.recoilAngle=0;this.recoilVelocity=0;this.knockVelocity.set(0,0,0);this.walkClock=0;this.approachGuard=false;this.rig.upperWeight=0;this.walkStop=null;this.attackRecovery=null;this.poseWasAttack=false;this.travelDistance=null;this.turnRate=0;this.fall=null;this.knockback=null;this.knockbackCooldown=0;this.rush=0;this.poseHipY=null;this.nextAttack=null;this.spacingAge=0;this.reposition=0;this.repositionSign=1;this.footwork.active=false;this.footwork.swing=null;this.footwork.lastStep=null;this.response.reset();this.walking=false;this.strideScale=1;this.velocity.set(0,0,0);this.root.position.set(start[0],0,start[1]);this.yaw=start[2];this.stepYaw=this.yaw;this.root.rotation.y=this.yaw;for(const b of this.rig.ordered)b.userData.delta.identity();this.rig.resetFeet();this.rig.animate('idle',this.id*.67,1,this.yaw);this.rig.ground();this.rig.stabilizeFeet(0);flattenSupportFeet(this);clearArms(this,[])}
}
