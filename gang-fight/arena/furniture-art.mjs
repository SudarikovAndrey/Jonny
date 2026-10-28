import * as T from 'three';
import {woodMaterials,metalMaterial} from './painted-prop-materials.mjs';
// Visual parts only. Caller owns placement, colliders, fracture, rewards and lifetime.
export function createFurnitureArt(kind){
 const root=new T.Group();root.name=kind;root.userData.visualOnly=true;
 const wood=woodMaterials(),metal=metalMaterial(),ink=new T.LineBasicMaterial({color:0x30251b});
 let serial=0;
 const board=(size,pos,material=wood[serial%3])=>{const mesh=new T.Mesh(new T.BoxGeometry(...size),material);mesh.name=`${kind}_part_${serial++}`;mesh.position.set(...pos);mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.fracturePart=true;mesh.add(new T.LineSegments(new T.EdgesGeometry(mesh.geometry),ink));root.add(mesh);return mesh;};
 if(kind==='pallets')for(let level=0;level<2;level++){
  const y=level*.19;for(const z of [-.3,0,.3])board([.92,.075,.09],[0,y+.06,z]);
  for(let i=0;i<5;i++)board([.155,.055,.78],[(i-2)*.18,y+.125,0]);
 }else if(kind==='table'){
  for(let i=0;i<5;i++)board([.16,.06,.78],[(i-2)*.17,.72,0]);
  for(const x of [-.31,.31])for(const z of [-.29,.29])board([.065,.68,.065],[x,.35,z]);
  for(const z of [-.28,.28])board([.68,.08,.045],[0,.62,z]);
 }else if(kind==='chair'){
  for(let i=0;i<3;i++)board([.12,.05,.40],[(i-1)*.13,.40,0]);
  for(const x of [-.16,.16])for(const z of [-.16,.16])board([.045,z<0?.80:.38,.045],[x,z<0?.42:.20,z]);
  for(const y of [.61,.77])board([.36,.065,.045],[0,y,-.16]);
 }else if(kind==='bin'){
  const body=new T.Mesh(new T.CylinderGeometry(.26,.23,.64,20,1,true),metal);body.name='bin_body';body.position.y=.32;metal.side=T.DoubleSide;const bottom=new T.Mesh(new T.CircleGeometry(.23,20),metal);bottom.rotation.x=-Math.PI/2;bottom.position.y=-.32;body.add(bottom);root.add(body);
  const lid=new T.Mesh(new T.CylinderGeometry(.285,.285,.045,20),metal);lid.name='bin_lid';lid.position.y=.66;root.add(lid);
  for(let i=0;i<12;i++){const a=i*Math.PI/6;board([.012,.54,.012],[Math.cos(a)*.248,.32,Math.sin(a)*.248],metal);}
  for(const y of [.04,.62,.675]){const ring=new T.Mesh(new T.TorusGeometry(y>.64?.28:.25,.01,4,24),new T.MeshBasicMaterial({color:0x514a39}));ring.rotation.x=Math.PI/2;ring.position.y=y;root.add(ring);}
  const handle=new T.Mesh(new T.TorusGeometry(.055,.012,5,12,Math.PI),metal);handle.position.y=.69;root.add(handle);
 }else throw new Error(`Unknown furniture: ${kind}`);
 return root;
}
