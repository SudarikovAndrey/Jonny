import * as T from 'three';
import {applyInkToon} from '../shaders/ink-toon.mjs?v=20261027am';
import {constrainCourtyard} from './engine/courtyard.js?v=20261027am';
// Only the detachable pipe remains; smoke rings were removed after visual review.
export class GiantPipeFX{
 constructor(scene,fighters,settings){this.scene=scene;this.settings=settings;this.time=0;this.entries=[];
  for(const f of fighters){if(f.kind!==6)continue;const pipe=f.root.getObjectByName('giant_boxer_pipe');if(pipe)this.entries.push({f,pipe,lost:false,prop:null});}
 }
 clear(){for(const e of this.entries){e.lost=false;e.pipe.visible=true;this.disposeProp(e);}}
 disposeProp(e){if(!e.prop)return;this.scene.remove(e.prop.group);e.prop.mesh.geometry.dispose();e.prop.look.mats.forEach(m=>m.dispose());e.prop.look.outlines.forEach(o=>o.material.dispose());e.prop=null;}
 drop(e){if(e.lost)return;e.lost=true;e.pipe.visible=false;
  const src=e.pipe,geometry=src.geometry.clone(),positions=geometry.attributes.position,center=new T.Vector3();src.updateWorldMatrix(true,false);src.skeleton.update();
  const points=[];for(let i=0;i<positions.count;i++){const p=src.getVertexPosition(i,new T.Vector3()).applyMatrix4(src.matrixWorld);points.push(p);center.add(p);}center.divideScalar(points.length);
  for(let i=0;i<points.length;i++)positions.setXYZ(i,...points[i].sub(center).toArray());positions.needsUpdate=true;geometry.deleteAttribute('skinIndex');geometry.deleteAttribute('skinWeight');geometry.computeVertexNormals();geometry.computeBoundingSphere();
  const material=new T.MeshBasicMaterial({map:src.material.uniforms?.map?.value||src.material.map}),mesh=new T.Mesh(geometry,material),group=new T.Group();group.add(mesh);group.position.copy(center);mesh.castShadow=true;this.scene.add(group);
  const side=new T.Vector3(Math.cos(e.f.yaw),0,-Math.sin(e.f.yaw)).multiplyScalar(e.f.id%2?1:-1);
  const look=applyInkToon(group,this.settings);material.dispose();
  e.prop={group,mesh,look,velocity:side.multiplyScalar(2.1).add(new T.Vector3(0,2.2,0)),age:0,bounces:0,radius:geometry.boundingSphere.radius};
 }
 update(dt,camera,w,h){this.time+=dt;
  for(const e of this.entries){
   if(!e.lost&&(e.f.down||e.f.knockdown||e.f.launch||e.f.state==='fall'))this.drop(e);
   // Ink shells are siblings; update visibility after the general shader update.
   e.pipe.visible=!e.lost;for(const o of e.pipe.parent.children)if(o.name==='ink_outline'&&o.geometry===e.pipe.geometry)o.visible=!e.lost&&this.settings.width>0;
   const p=e.prop;if(p){p.age+=dt;if(p.bounces<3&&dt>0){p.velocity.y-=7.5*dt;p.group.position.addScaledVector(p.velocity,dt);p.group.rotation.x+=dt*6;p.group.rotation.z+=dt*4;
     const safe=constrainCourtyard(p.group.position,.15);p.group.position.x=safe.x;p.group.position.z=safe.z;
     let low=Infinity;const points=p.mesh.geometry.attributes.position;for(let i=0;i<points.count;i++)low=Math.min(low,new T.Vector3().fromBufferAttribute(points,i).applyQuaternion(p.group.quaternion).y+p.group.position.y);if(low<.015){p.group.position.y+=.015-low;p.velocity.y=Math.abs(p.velocity.y)*.30;p.velocity.x*=.55;p.velocity.z*=.55;p.bounces++;}
    }p.look.update(this.time,camera,w,h);}
  }

 }
}
