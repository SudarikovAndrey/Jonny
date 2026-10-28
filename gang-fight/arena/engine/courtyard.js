import * as T from 'three';
// Footprints traced on the isometric courtyard-calm.png (2026-10-28), top-left normalized coordinates.
// The upper boundary follows the bases of walls, crates, bins and fence props.
export const CAMERA_POSITION=[12,12.5,12],CAMERA_TARGET=[0,.7,0],PLATE_SIZE=11.4,PLATE_OFFSET=.035;
const camera=new T.PerspectiveCamera();camera.position.fromArray(CAMERA_POSITION);camera.lookAt(...CAMERA_TARGET);camera.updateMatrixWorld(true);
const direction=camera.getWorldDirection(new T.Vector3());
export function plateToGround(u,v){
 const p=new T.Vector3((u-.5)*PLATE_SIZE,(.5-v-PLATE_OFFSET)*PLATE_SIZE,-35).applyQuaternion(camera.quaternion).add(camera.position);
 return p.addScaledVector(direction,-p.y/direction.y).setY(0);
}
export const footprintUV=[[.015,.49],[.09,.465],[.16,.433],[.22,.418],[.29,.397],[.30,.365],[.36,.362],[.365,.333],[.43,.325],[.48,.305],[.59,.27],[.64,.287],[.68,.30],[.735,.33],[.79,.36],[.84,.39],[.90,.43],[.965,.455],[.985,.46],[.985,.98],[.015,.98]];
export const boundary=footprintUV.map(([u,v])=>plateToGround(u,v));
const area=boundary.reduce((sum,a,i)=>{const b=boundary[(i+1)%boundary.length];return sum+a.x*b.z-b.x*a.z;},0),sign=Math.sign(area);
export const walls=boundary.map((a,i)=>{const b=boundary[(i+1)%boundary.length],d=b.clone().sub(a);return {a,b,length:d.length(),normal:new T.Vector3(-d.z*sign,0,d.x*sign).normalize()};});
export function inside(p){let result=false;for(const {a,b} of walls)if((a.z>p.z)!==(b.z>p.z)&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)result=!result;return result;}
function nearest(p,w){const d=w.b.clone().sub(w.a),t=T.MathUtils.clamp(p.clone().sub(w.a).dot(d)/d.lengthSq(),0,1);return w.a.clone().addScaledVector(d,t);}
export function constrainCourtyard(point,radius=.4){
 const p=point.clone();
 for(let iteration=0;iteration<24;iteration++){
  if(!inside(p)){let best=null;for(const w of walls){const q=nearest(p,w),distance=q.distanceToSquared(p);if(!best||distance<best.distance)best={w,q,distance};}p.x=best.q.x+best.w.normal.x*(radius+.002);p.z=best.q.z+best.w.normal.z*(radius+.002);continue;}
  let moved=false;
  for(const w of walls){const q=nearest(p,w),d=p.clone().sub(q).setY(0),length=d.length();if(length<radius){d.copy(length>.00001?d.divideScalar(length):w.normal);p.addScaledVector(d,radius-length+.001);moved=true;}}
  if(!moved)break;
 }
 p.y=point.y;return p;
}
