import * as T from 'three';
export function prepareMeshyRig(root){
 const rename={Spine02:'Spine_0',Spine01:'Spine_1',Spine:'Spine_2',neck:'Neck',head_end:'Head_Top'};
 for(const side of ['Left','Right'])Object.assign(rename,{[side+'Shoulder']:side+'_Shoulder',[side+'Arm']:side+'_Arm',[side+'ForeArm']:side+'_ForeArm',[side+'Hand']:side+'_Hand',[side+'UpLeg']:side+'_UpLeg',[side+'Leg']:side+'_Leg',[side+'Foot']:side+'_Foot',[side+'ToeBase']:side+'_Toe_Base',[side+'Grip01']:side+'_Hand_C_0',[side+'Grip02']:side+'_Hand_C_1',[side+'Thumb']:side+'_Hand_A_0'});
 const bones={};root.traverse(o=>{if(o.isBone){o.name=rename[o.name]||o.name;bones[o.name]=o;o.userData.secondary=/Twist$|^(Apron|SashBack|Beard|Headband)/.test(o.name)}});root.updateMatrixWorld(true);
 for(const side of ['Left','Right']){
  const hand=bones[side+'_Hand'];const grip=bones[side+'_Hand_C_0'];
  for(const [letter,offset] of [['B',-.025],['D',.018],['E',.033]]){const b=new T.Bone();b.name=side+'_Hand_'+letter+'_0';hand.add(b);const p=grip?grip.getWorldPosition(new T.Vector3()):hand.getWorldPosition(new T.Vector3());p.z+=offset;b.position.copy(hand.worldToLocal(p));}
 }
 root.updateMatrixWorld(true);
 // Actual sole outline for the giant's broad rigid boots.
 let giant=false;root.traverse(o=>{if(o.name==='giant_boxer_body')giant=true;});
 if(giant)for(const side of ['Left','Right']){
  const foot=bones[side+'_Foot'],origin=foot.getWorldPosition(new T.Vector3()),parts={heel:[],toe:[]};
  root.traverse(o=>{if(!o.isSkinnedMesh)return;const pos=o.geometry.attributes.position;o.skeleton.update();
   for(let i=0;i<pos.count;i++){const p=o.getVertexPosition(i,new T.Vector3()).applyMatrix4(o.matrixWorld);
    if(p.y>.055||(side==='Left'?p.x<0:p.x>0))continue;
    parts[p.z>origin.z?'toe':'heel'].push(p);
   }
  });
  foot.userData.soleOutline={};
  for(const part of ['heel','toe']){
   const points=parts[part],chosen=new Set();
   for(let a=0;a<16;a++)for(const slope of [.2,1,4]){
    const dir=new T.Vector3(Math.cos(a*Math.PI/8)*slope,-1,Math.sin(a*Math.PI/8)*slope);
    let best=null,value=-Infinity;for(const p of points){const d=p.dot(dir);if(d>value){best=p;value=d;}}if(best)chosen.add(best);
   }
   foot.userData.soleOutline[part]=[...chosen].map(p=>foot.worldToLocal(p.clone()).toArray());
  }
 }
 return root;
}
// Remove pitch/roll relative to the shoe's actual flat bind sole, keeping its yaw.
// Works on anatomical world-space deltas, independently of the FBX bone's arbitrary local axes.
export function flattenSupportFeet(f){
 if(f.down)return;
 const Y=new T.Vector3(0,1,0),r=f.rig;
 for(const side of ['Left','Right']){
  if(f.attack?.kick&&side==='Right')continue;
  const foot=r.bones[side+'_Foot'];
  // Match shoe yaw to the current anatomical facing too, not just its up vector.
  // The source clip's ankle twist is not transferable to Meshy's bind axes.
  const q=f.footwork?.active&&f.footwork.feet[side]?f.footwork.feet[side].rotation.clone():new T.Quaternion().setFromAxisAngle(Y,f.yaw).multiply(foot.userData.restQ);
  const parent=foot.parent.getWorldQuaternion(new T.Quaternion());foot.quaternion.copy(parent.invert().multiply(q));foot.updateWorldMatrix(false,true);
  const toe=r.bones[side+'_Toe_Base'];if(toe){toe.quaternion.copy(toe.userData.restLocalQ);toe.updateWorldMatrix(false,true);}
  if(f.footwork?.feet[side])f.footwork.feet[side].rotation.copy(q);
 }
 r.ground(.003);
}

// Rebuild supplementary bones from rest each frame; never accumulate rotations.
export function updateChinatownRig(f,time){
 if(f.down&&f.state!=='fall'||f.skinGrounded&&f.knockdown?.phase==='ground')return;
 const bones=f.rig.bones;if(!bones.LeftArmTwist)return;
 for(const b of f.rig.ordered)if(b.userData.secondary)b.quaternion.copy(b.userData.restLocalQ);
 for(const side of ['Left','Right'])for(const [part,end] of [['Arm','ForeArm'],['ForeArm','Hand'],['UpLeg','Leg']]){
  const b=bones[side+part+'Twist'],target=bones[side+'_'+end];if(!b||!target)continue;
  const delta=target.userData.restLocalQ.clone().invert().multiply(target.quaternion);
  const twist=new T.Quaternion(0,delta.y,0,delta.w).normalize();
  b.quaternion.multiply(new T.Quaternion().slerp(twist,.5));
 }
 if(!bones.Apron1){f.root.updateMatrixWorld(true);return;}
 let lift=0;
 for(const side of ['Left','Right']){
  const leg=bones[side+'_UpLeg'],knee=bones[side+'_Leg'];
  const direction=knee.getWorldPosition(new T.Vector3()).sub(leg.getWorldPosition(new T.Vector3())).normalize();
  // Knee lift is relative to the pelvis, including rolls and inverted kip-ups.
  direction.applyQuaternion(bones.Hips.getWorldQuaternion(new T.Quaternion()).invert()).applyQuaternion(bones.Hips.userData.restQ);
  lift=Math.max(lift,Math.asin(T.MathUtils.clamp(direction.y,-1,1))+Math.PI/2);
 }
 // Raise the front panel with the thigh; use restrained motion for hanging ties.
 const speed=Math.min(1,f.velocity.length()),sway=Math.sin(time*5+f.id)*.035*speed;
 for(const prefix of ['Apron','SashBack'])for(let i=1;i<=3;i++){
  const b=bones[prefix+i];if(!b)continue;
  const recovering=!!f.knockdown||f.attack?.clip==='martialKipUp';
  const angle=prefix==='Apron'?-Math.min(recovering?.55:1.35,Math.max(0,lift-.55)*.8)*(i===1?.75:.2):sway;
  b.quaternion.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),angle));
 }
 f.root.updateMatrixWorld(true);
}
