import {V,Q,wp,wq,setWorldQ,clamp} from './rig.js?v=20261027am';
function zone(name){if(/Apron/.test(name))return 'apron';if(/SashBack/.test(name))return 'sash';for(const side of ['Left','Right']){if(name.includes(side)&&/Shoulder|Arm|Hand|Finger|Thumb/.test(name))return side+'Arm';if(name.includes(side)&&/Leg|Foot|Toe/.test(name))return side+'Leg';}return /Head|Neck/.test(name)?'head':'torso';}
// Shared immutable geometry metadata, prepared before combat and reused by clones.
const supportCache=new WeakMap();
function supportData(mesh){
 const g=mesh.geometry;if(supportCache.has(g))return supportCache.get(g);
 const indices=g.attributes.skinIndex,weights=g.attributes.skinWeight,positions=g.attributes.position;
 if(!indices||!weights)return null;
 const groups=new Map(),extremes=new Map();
 for(let i=0;i<positions.count;i++){
  let max=-1,bone;for(let k=0;k<4;k++){const w=weights.getComponent(i,k);if(w>max){max=w;bone=mesh.skeleton.bones[indices.getComponent(i,k)];}}
  const name=bone?.name||'',key=zone(name),entry={index:i,bone:name};
  if(!groups.has(key))groups.set(key,[]);groups.get(key).push(entry);
  if(!extremes.has(name))extremes.set(name,Array(6).fill(null));const limits=extremes.get(name);
  for(let axis=0;axis<3;axis++){const v=positions.getComponent(i,axis);for(let sign=0;sign<2;sign++){const j=axis*2+sign,score=sign?v:-v;if(!limits[j]||score>limits[j].score)limits[j]={score,key,entry};}}
 }
 const selected=new Set();for(const limits of extremes.values())for(const e of limits)if(e)selected.add(e.entry.index);
 const result=new Map();for(const [key,all] of groups){const stride=Math.max(1,Math.ceil(all.length/128));result.set(key,{all,sample:all.filter((e,i)=>i%stride===0||selected.has(e.index))});}
 supportCache.set(g,result);return result;
}
export function prepareGroundSupport(root){root.traverse(mesh=>{if(mesh.isSkinnedMesh&&mesh.name!=='ink_outline'&&mesh.name!=='giant_boxer_pipe')supportData(mesh);});}
// Permanent KO keeps authored joint bends; a short skin-aware settling pass
// corrects floor contact without independent rigid bodies wrenching the joints.
export class GroundRest {
 constructor(world,fighter){
  const started=performance.now();this.fighter=fighter;this.parts=[];this.constraints=[];this.age=0;this.frozen=false;
  const rig=fighter.rig,b=rig.bones;this.start=rig.ordered.map(bone=>({bone,p:bone.position.clone(),q:bone.quaternion.clone()}));
  fighter.root.updateMatrixWorld(true);const groups=new Map(),fullGroups=new Map();
  fighter.root.traverse(mesh=>{if(!mesh.isSkinnedMesh||mesh.name==='ink_outline'||mesh.name==='giant_boxer_pipe')return;
   const data=supportData(mesh);if(!data)return;
   for(const [key,entries] of data){for(const [map,list] of [[groups,entries.sample],[fullGroups,entries.all]]){if(!map.has(key))map.set(key,[]);map.get(key).push({mesh,list});}}
  });
  const point=V();this.vertexSamples=0;
  const lowest=(key,full=fighter.kind===6)=>{let min=Infinity,result=null;const batches=(full?fullGroups:groups).get(key)||[];
   for(const {mesh,list} of batches){mesh.updateWorldMatrix(true,false);mesh.skeleton.update();
    for(const e of list){this.vertexSamples++;mesh.getVertexPosition(e.index,point).applyMatrix4(mesh.matrixWorld);if(point.y<min){min=point.y;result=point.clone();result.supportBone=e.bone;}}
   }return result;
  };
  if(groups.size){
   const rotations=new Map();let best=null;
   // Shoulder weights can also move chest vertices. Re-anchor the actual torso
   // after resolving limbs, without increasing the anatomical rotation budget.
   for(let pass=0;pass<(fighter.kind===6?4:1);pass++){
   const torso=lowest('torso');if(torso){const hip=wp(b.Hips);hip.y+=.004-torso.y;b.Hips.position.copy(b.Hips.parent.worldToLocal(hip));fighter.root.updateMatrixWorld(true);}
   for(const [key,name] of [['LeftLeg','Left_UpLeg'],['RightLeg','Right_UpLeg'],['LeftArm',fighter.kind===6?'Left_Shoulder':'Left_Arm'],['RightArm',fighter.kind===6?'Right_Shoulder':'Right_Arm'],['head','Neck'],['apron','Apron1'],['sash','SashBack1']]){
    const joint=b[name];if(!joint)continue;let total=rotations.get(name)||0;
    for(let iteration=0;iteration<16;iteration++){
     const p=lowest(key);if(!p||p.y>=.002)break;
     const lever=p.clone().sub(wp(joint)),horizontal=Math.hypot(lever.x,lever.z);if(horizontal<.025)break;
     const angle=Math.min(.10,(.005-p.y)/horizontal),axis=lever.clone().cross(V(0,1,0)).normalize();total+=angle;if(total>(key==='apron'||key==='sash'?1.4:fighter.kind===6&&key.endsWith('Leg')?.65:.52))break;
     setWorldQ(joint,Q().setFromAxisAngle(axis,angle).multiply(wq(joint)));rotations.set(name,total);
    }
   }
   // If an authored forearm/hand crosses the floor, correct that short chain
   // instead of lifting the entire chest to make room for it.
   for(const side of ['Left','Right']){
    const joint=b[side+'_ForeArm'];let total=rotations.get(joint.name)||0;
    for(let i=0;i<5;i++){
     const p=lowest(side+'Arm');if(!p||p.y>=.002||!/(ForeArm|Hand|Finger|Thumb)/.test(p.supportBone))break;
     const lever=p.clone().sub(wp(joint)),horizontal=Math.hypot(lever.x,lever.z);if(horizontal<.025)break;
     const angle=Math.min(.08,(.005-p.y)/horizontal);if(total+angle>.36)break;total+=angle;
     setWorldQ(joint,Q().setFromAxisAngle(lever.clone().cross(V(0,1,0)).normalize(),angle).multiply(wq(joint)));rotations.set(joint.name,total);
    }
   }
   if(fighter.kind===6){
    const floor=Math.min(...[...groups.keys()].map(key=>lowest(key,true)?.y??Infinity));
    const score=(lowest('torso',true)?.y??Infinity)+(floor<.001?.003-floor:0);
    if(!best||score<best.score)best={score,pose:this.start.map(({bone})=>({p:bone.position.clone(),q:bone.quaternion.clone()}))};
   }
   }
   if(best){this.start.forEach(({bone},i)=>{bone.position.copy(best.pose[i].p);bone.quaternion.copy(best.pose[i].q);});fighter.root.updateMatrixWorld(true);}
   // Relax raised distal limbs toward support before freezing the authored pose.
   // Rotate connected chains only; never translate joints or bend the spine.
   for(const side of ['Left','Right'])for(const [key,name,pattern,limit] of [
    [side+'Leg',side+'_Leg',/Foot|Toe/,1.35],
    [side+'Arm',side+'_ForeArm',/Hand|Finger|Thumb/,.85]
   ]){
    const joint=b[name];if(!joint)continue;
    const batches=groups.get(key)||[];
    const distal=()=>{let min=Infinity,result=null;for(const {mesh,list} of batches){mesh.updateWorldMatrix(true,false);mesh.skeleton.update();for(const e of list){if(!pattern.test(e.bone)||/UpLeg/.test(e.bone))continue;mesh.getVertexPosition(e.index,point).applyMatrix4(mesh.matrixWorld);if(point.y<min){min=point.y;result=point.clone();}}}return result;};
    let total=0;
    for(let i=0;i<20;i++){const p=distal();if(!p||p.y<.012)break;const lever=p.clone().sub(wp(joint)),horizontal=Math.hypot(lever.x,lever.z);if(horizontal<.025)break;
     const angle=Math.min(.065,(p.y-.008)/horizontal,limit-total);if(angle<=0)break;total+=angle;
     setWorldQ(joint,Q().setFromAxisAngle(lever.clone().cross(V(0,-1,0)).normalize(),angle).multiply(wq(joint)));
    }
   }
   // Full-mesh refinement: sparse samples can miss a fingertip or clothing hem.
   // Resolve the offending local chain instead of raising the whole body.
   for(let pass=0;pass<3;pass++)for(const [key,name] of [['LeftLeg','Left_UpLeg'],['RightLeg','Right_UpLeg'],['LeftArm','Left_Arm'],['RightArm','Right_Arm'],['head','Neck'],['apron','Apron1'],['sash','SashBack1']]){
    for(let i=0;i<10;i++){const p=lowest(key,true);if(!p||p.y>=.001)break;
     const local=/ForeArm|Hand|Finger|Thumb/.test(p.supportBone)?b[key.startsWith('Left')?'Left_ForeArm':'Right_ForeArm']:null;
     const joint=local||b[name];if(!joint)break;const lever=p.clone().sub(wp(joint)),horizontal=Math.hypot(lever.x,lever.z);if(horizontal<.02)break;
     setWorldQ(joint,Q().setFromAxisAngle(lever.clone().cross(V(0,1,0)).normalize(),Math.min(.045,(.003-p.y)/horizontal)).multiply(wq(joint)));
    }
   }
   fighter.skinGrounded=true;
   this.supportReport=[...groups.keys()].map(key=>{const p=lowest(key,true);return {key,y:p?.y,bone:p?.supportBone};});
   const min=Math.min(...this.supportReport.map(p=>p.y));
   if(min<.001){const hip=wp(b.Hips);hip.y+=.003-min;b.Hips.position.copy(b.Hips.parent.worldToLocal(hip));fighter.root.updateMatrixWorld(true);}
  }
  this.target=this.start.map(({bone})=>({p:bone.position.clone(),q:bone.quaternion.clone()}));
  for(const s of this.start){s.bone.position.copy(s.p);s.bone.quaternion.copy(s.q);}fighter.root.updateMatrixWorld(true);
  fighter.restArmsChecked=true;this.solveMs=performance.now()-started;
 }
 resistTwist(dt){if(!this.frozen)this.age+=dt;}
 sync(){if(this.frozen)return;const t=clamp(this.age/.48,0,1),blend=t*t*(3-2*t);this.start.forEach((s,i)=>{s.bone.position.lerpVectors(s.p,this.target[i].p,blend);s.bone.quaternion.copy(s.q).slerp(this.target[i].q,blend);});this.fighter.root.updateMatrixWorld(true);}
 settle(){if(this.age>=.48){this.frozen=true;this.fighter.state='down';}}
}
