import * as T from 'three';
import {applyInkToon} from '../shaders/ink-toon.mjs?v=20261027am';
import {constrainCourtyard} from './engine/courtyard.js?v=20261027am';
const up=new T.Vector3(0,1,0);
export class FallingHatFX{
 constructor(scene,fighters,settings){this.scene=scene;this.settings=settings;this.time=0;this.entries=fighters.filter(f=>f.kind===1).map(f=>({f,hat:f.root.getObjectByName('fighter_hat'),lost:false,prop:null})).filter(e=>e.hat);this.reduced=matchMedia('(prefers-reduced-motion: reduce)');}
 visibility(e){e.hat.visible=!e.lost;for(const o of e.hat.parent.children)if(o.name==='ink_outline'&&o.geometry===e.hat.geometry)o.visible=!e.lost&&this.settings.width>0;}
 clear(){for(const e of this.entries){if(e.prop){this.scene.remove(e.prop.group);e.prop.mesh.geometry.dispose();e.prop.look.mats.forEach(m=>m.dispose());e.prop.look.outlines.forEach(o=>o.material.dispose());}e.prop=null;e.lost=false;this.visibility(e);}}
 drop(e){if(e.lost)return;e.lost=true;const src=e.hat,g=src.geometry.clone(),positions=g.attributes.position,points=[],center=new T.Vector3();src.updateWorldMatrix(true,false);src.skeleton.update();
  for(let i=0;i<positions.count;i++){const p=src.getVertexPosition(i,new T.Vector3()).applyMatrix4(src.matrixWorld);points.push(p);center.add(p);}center.divideScalar(points.length);
  for(let i=0;i<points.length;i++)positions.setXYZ(i,...points[i].sub(center).toArray());g.deleteAttribute('skinIndex');g.deleteAttribute('skinWeight');g.computeVertexNormals();g.computeBoundingSphere();
  const mat=new T.MeshBasicMaterial({map:src.material.uniforms?.map?.value||src.material.map,side:T.DoubleSide}),mesh=new T.Mesh(g,mat),group=new T.Group();group.add(mesh);group.position.copy(center);mesh.castShadow=true;this.scene.add(group);const look=applyInkToon(group,this.settings);mat.dispose();
  const direction=new T.Vector3(Math.cos(e.f.yaw),0,-Math.sin(e.f.yaw)).multiplyScalar(e.f.id%2?1:-1),axis=up.clone().cross(direction).normalize();
  e.prop={group,mesh,look,velocity:direction.clone().multiplyScalar(1.8).addScaledVector(up,2),direction,axis,age:0,rollAge:0,phase:'air',bounces:0,spin:0,radius:Math.max(.12,g.boundingSphere.radius),step:0};this.visibility(e);
 }
 floor(p){let low=Infinity;const v=new T.Vector3(),a=p.mesh.geometry.attributes.position;for(let i=0;i<a.count;i++)low=Math.min(low,v.fromBufferAttribute(a,i).applyQuaternion(p.group.quaternion).y);return .012-low;}
 step(p,dt){p.age+=dt;
  if(p.phase==='air'){p.velocity.y-=8*dt;p.group.position.addScaledVector(p.velocity,dt);p.group.rotateOnWorldAxis(p.axis,dt*7);const floor=this.floor(p);if(p.group.position.y<floor){p.group.position.y=floor;p.bounces++;p.velocity.y=Math.abs(p.velocity.y)*.33;p.velocity.x*=.82;p.velocity.z*=.82;if(p.bounces>=2||this.reduced.matches){p.phase='roll';p.rollAge=0;}}}
  else if(p.phase==='roll'){p.rollAge+=dt;const t=p.rollAge,duration=this.reduced.matches?.15:2.8,speed=1.45*Math.pow(Math.max(0,1-t/duration),1.5);p.group.position.addScaledVector(p.direction,speed*dt);p.spin+=speed*dt/p.radius;const settle=T.MathUtils.smoothstep(t,duration*.5,duration);p.group.quaternion.setFromUnitVectors(up,p.axis).slerp(new T.Quaternion(),settle);p.group.quaternion.premultiply(new T.Quaternion().setFromAxisAngle(p.axis,p.spin*(1-settle)));p.group.position.y=this.floor(p);if(t>=duration)p.phase='rest';}
  const safe=constrainCourtyard(p.group.position,.22);p.group.position.x=safe.x;p.group.position.z=safe.z;
 }
 update(dt,camera,w,h){this.time+=dt;for(const e of this.entries){if(!e.lost&&(e.f.down||e.f.knockdown||e.f.launch||e.f.state==='fall'))this.drop(e);this.visibility(e);const p=e.prop;if(!p)continue;p.step+=dt;const tick=1/24;while(p.step>=tick){if(p.phase!=='rest')this.step(p,tick);p.step-=tick;}p.look.update(this.time,camera,w,h);}}
}
