import * as T from 'three';
import {binPosition} from './engine/impact-world.js';
import {createFurnitureArt} from './furniture-art.mjs';
import {PlankPhysics} from './plank-physics.mjs';
export class CourtyardProp{
 constructor(scene){this.root=new T.Group();scene.add(this.root);this.physics=new PlankPhysics();this.clear();}
 clear(){this.physics.clear();const materials=new Set();this.root.traverse(o=>{if(o.material)materials.add(o.material);});for(const m of materials){m.map?.dispose();m.dispose();}for(const o of [...this.root.children]){o.removeFromParent();o.traverse(m=>m.geometry?.dispose());}this.parts=[];this.broken=false;this.art=createFurnitureArt('bin');this.art.position.copy(binPosition);this.root.add(this.art);}
 event(e){if(e.type!=='propImpacts'||this.broken)return;this.broken=true;
  const body=new T.Group(),lid=new T.Group();body.position.copy(binPosition).y=.32;lid.position.copy(binPosition).y=.66;this.root.add(body,lid);this.art.updateWorldMatrix(true,true);
  for(const o of [...this.art.children]){const top=o.name==='bin_lid'||o.position.y>.64;(top?lid:body).attach(o);}this.art.removeFromParent();
  const direction=new T.Vector3().fromArray(e.direction||[1,0,.2]).setY(0).normalize().multiplyScalar(3.8);
  this.parts=[{object:body,body:this.physics.addCylinder(body,.26,.23,.64,binPosition,direction,0,8)},{object:lid,body:this.physics.addCylinder(lid,.285,.285,.045,binPosition,direction,1,1.2)}];
  this.parts[0].body.angularVelocity.set(direction.z*2,0,-direction.x*2);this.onBreak?.();
 }
 update(dt){if(dt<=0||!this.broken)return;this.physics.step(dt);for(const p of this.parts){p.object.position.copy(p.body.position);p.object.quaternion.copy(p.body.quaternion);}}
}
