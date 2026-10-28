import {V,Q,wp,wq,setWorldQ,clamp} from './rig.js?v=20261027am';
const Y=V(0,1,0),smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t)};
function path(keys,u){for(let i=1;i<keys.length;i++)if(u<=keys[i][0])return keys[i-1][1].clone().lerp(keys[i][1],smooth((u-keys[i-1][0])/(keys[i][0]-keys[i-1][0])));return keys.at(-1)[1].clone()}
export function techniquePose(f){
 const a=f.attack;if(!a?.authored)return;const r=f.rig,b=r.bones,u=clamp(a.motionAge/a.duration,0,1);
 const local=(x,y,z)=>f.root.localToWorld(V(x,y,z));const h=r.hipHeight,head=wp(b.Head).y-f.root.position.y;
 if(!a.goal){const target=wp(a.target.rig.bones[a.zone==='head'?'Head':a.zone==='leg'?'Left_Leg':'Spine_1']);target.addScaledVector(f.root.position.clone().sub(a.target.root.position).setY(0).normalize(),a.zone==='head'?.18:.26);a.goal=f.root.worldToLocal(target);}
 if(a.kick){
  a.footStart??=f.root.worldToLocal(wp(b.Right_Foot));
  const chamber=V(-.22,h*.62,.20),goal=a.goal.clone();goal.y=clamp(goal.y,.30,h*.88);
  const outward=a.type==='lowKick'?V(-.50,.35,.34):chamber;
  const target=path([[0,a.footStart],[.27,chamber],[.36,outward],[.52,goal],[.66,chamber],[1,a.footStart]],u);
  r.limbContact('Right',f.root.localToWorld(target),true);
  setWorldQ(b.Right_Foot,Q().setFromAxisAngle(Y,f.yaw).multiply(b.Right_Foot.userData.restQ));return;
 }
 const sides=a.type==='hammer'?['Left','Right']:[a.side];
 for(const side of sides){const sign=side==='Left'?1:-1;
  a.handStarts??={};a.handStarts[side]??=f.root.worldToLocal(wp(b[side+'_Hand']));const guard=a.handStarts[side];
  let wind=V(sign*.30,head-.18,.15),mid=a.goal.clone(),end=a.goal.clone();
  if(a.type==='hook'){wind=V(sign*.65,head-.12,.12);mid=V(sign*.64,head-.10,.52);}
  if(a.type==='uppercut'){wind=V(sign*.28,h+.03,.18);mid=V(sign*.22,h+.15,.48);end.y+=.08;}
  if(a.type==='body'){wind=V(sign*.34,h+.17,.12);mid=V(sign*.25,h+.16,.40);}
  if(a.type==='hammer'){wind=V(sign*.18,head+.27,.03);mid=V(sign*.15,head+.24,.40);end.x+=sign*.10;end.y-=.10;}
  const target=path([[0,guard],[.25,wind],[.37,mid],[.52,end],[.62,end],[.78,wind],[1,guard]],u);
  r.limbContact(side,f.root.localToWorld(target));
 }
 const twist=(a.type==='hook'?.30:a.type==='uppercut'?.16:0)*Math.sin(Math.PI*u*2);
 if(twist)setWorldQ(b.Spine_0,Q().setFromAxisAngle(Y,twist).multiply(wq(b.Spine_0)));
}
