import {createFurnitureArt} from './furniture-art.mjs';
import {binPosition} from './engine/impact-world.js';
import {woodMaterials} from './painted-prop-materials.mjs';
import * as T from 'three';
import {magnetTarget} from './loot-magnet.mjs';
import {PlankPhysics} from './plank-physics.mjs';
import {walls,constrainCourtyard,plateToGround} from './engine/courtyard.js?v=20261027am';
import {sweepCapsule,bodyCapsules} from './engine/contact.js?v=20261027giant';
const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z);
export const CRATE_SCALE=.66;
// Actual scene geometry: planks, splinters and loot share depth and lighting with actors.
export class BreakableProps{
 constructor(scene){this.scene=scene;this.debris=new PlankPhysics();this.root=new T.Group();scene.add(this.root);this.crates=[];this.particles=[];this.loot=[];this.pickups=[];this.materials=woodMaterials();this.ink=new T.LineBasicMaterial({color:0x30251b});this.gold=new T.MeshToonMaterial({color:0xffdc45,emissive:0xffbc24,emissiveIntensity:1.0});this.paper=new T.MeshToonMaterial({color:0xfff8df,emissive:0xfff3c4,emissiveIntensity:.85});this.red=new T.MeshToonMaterial({color:0xf04432,emissive:0xdc261b,emissiveIntensity:.9});}
 box(size,position,material){const geo=new T.BoxGeometry(...size),m=new T.Mesh(geo,material);m.position.copy(position);m.castShadow=true;m.receiveShadow=true;m.add(new T.LineSegments(new T.EdgesGeometry(geo),this.ink));return m;}
 remove(object){object.removeFromParent();object.traverse(o=>{o.geometry?.dispose();if(o.name==='loot_halo')o.material.dispose();});}
 attach(combat){this.combat=combat;combat.environment=this;this.baseObstacles=combat.navigation.obstacles.map(poly=>poly.map(p=>p.clone()));this.reset();}
 reset(){for(const m of this.decorMaterials||[]){m.map?.dispose();m.dispose();}this.decorMaterials=new Set();this.bin?.clear();if(this.combat)this.combat.binActive=true;this.debris.clear();for(const p of this.pickups)p.material.dispose();this.pickups=[];for(const child of [...this.root.children])this.remove(child);this.crates=[];this.particles=[];this.loot=[];this.coins=[0,0];this.fallSamples=new Map();this.bodySamples=new Map();
  for(const [id,[u,v]] of [[.12,.49],[.32,.405],[.67,.35],[.90,.47]].entries()){
   const p=constrainCourtyard(plateToGround(u,v),.46);p.y=0;
   const group=new T.Group();group.scale.setScalar(CRATE_SCALE);group.position.copy(p);group.rotation.y=id<2?Math.PI/2:0;this.root.add(group);
   for(let face=0;face<4;face++)for(let i=0;i<4;i++){const plank=this.box([.2,.78,.055],V((i-1.5)*.205,.42,.415),this.materials[(i+face)%3]);const turn=new T.Group();turn.rotation.y=face*Math.PI/2;turn.add(plank);group.add(turn);}
   for(let i=0;i<4;i++)group.add(this.box([.2,.055,.85],V((i-1.5)*.205,.83,0),this.materials[i%3]));
   for(const z of [-.45,.45]){const brace=this.box([.09,.9,.065],V(0,.42,z),this.materials[2]);brace.rotation.z=.72;group.add(brace);}
   // Broad frame boards match the painted wall crates and fracture as real planks.
   for(let face=0;face<4;face++){const turn=new T.Group();turn.rotation.y=face*Math.PI/2;
    for(const y of [.10,.75])turn.add(this.box([.88,.10,.07],V(0,y,.453),this.materials[1]));group.add(turn);}
   for(const x of [-.405,.405])for(const z of [-.405,.405])group.add(this.box([.085,.78,.085],V(x,.42,z),this.materials[2]));
   this.crates.push({id,p,group,broken:false,kind:id%2?'health':'coin'});
  }
  // Perimeter prop zones keep the centre and diagonal approaches open.
  this.decor=[];
  for(const [kind,u,v,yaw] of [['pallets',.07,.61,0],['table',.93,.63,0]]){
   const p=constrainCourtyard(plateToGround(u,v),.65),group=createFurnitureArt(kind);group.traverse(o=>{if(o.material)this.decorMaterials.add(o.material);});group.position.copy(p);group.rotation.y=yaw;this.root.add(group);
   const bounds=new T.Box3().setFromObject(group),size=bounds.getSize(V());this.decor.push({id:kind+'_'+this.decor.length,p,group,broken:false,kind:null,half:[size.x/2,size.z/2],height:size.y});
  }for(const prop of [...this.crates,...this.decor])prop.bounds=new T.Box3().setFromObject(prop.group);this.syncNavigation();
 }
 syncNavigation(){const obstacles=this.baseObstacles.filter(poly=>!(this.bin?.broken&&poly.every(p=>p.distanceTo(binPosition)<.35)));for(const c of [...this.crates,...(this.decor||[])])if(!c.broken){const half=c.half||[.48*CRATE_SCALE,.48*CRATE_SCALE];obstacles.push([[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,z])=>c.p.clone().add(V(x*half[0],0,z*half[1]))));}this.combat.navigation.setObstacles(obstacles);}

 fallContacts(){for(const f of this.combat.fighters){
  if(f.launch)continue;
  const displaced=f.state==='fall'||f.knockdown||f.state==='knockback'||f.knockVelocity?.lengthSq()>.75*.75;
  if(!displaced){this.fallSamples.delete(f.id);this.bodySamples.delete(f.id);continue;}
  const current=['Hips','Spine_2','Head'].map(n=>f.rig.bones[n].getWorldPosition(V()));this.flight(f,this.fallSamples.get(f.id)||current);this.fallSamples.set(f.id,current);
 }}
 flight(f,previous){
  const now=['Hips','Spine_2','Head'].map(n=>f.rig.bones[n].getWorldPosition(V())),parts=bodyCapsules(f),old=this.bodySamples.get(f.id);
  // Test both the volume of each limb and its travel. Three torso points miss
  // bodies draped over low crates, especially at the end of a knockdown.
  for(const prop of [...this.crates,...this.decor]){
   if(prop.broken)continue;
   const bounds=prop.bounds;
   const hits=parts.some((part,i)=>segmentBox(part.a,part.b,bounds,part.radius)||old&&[0,1].some(k=>segmentBox(old[i][k],k?part.b:part.a,bounds,part.radius)))||now.some((p,i)=>segmentBox(previous[i],p,bounds,.17*f.rig.bodyScale));
   if(hits)this.break(prop,f);
  }
  this.bodySamples.set(f.id,parts.map(p=>[p.a.clone(),p.b.clone()]));
  if(this.bin&&!this.bin.broken&&now.some((p,i)=>sweepCapsule(previous[i],p,{a:binPosition.clone().add(V(0,.1,0)),b:binPosition.clone().add(V(0,.65,0)),radius:.28},.22*f.rig.bodyScale))){this.combat.emit('propImpacts',f,{point:binPosition.clone().setY(.5).toArray(),direction:(f.launch?.velocity||f.velocity||V(1,0,0)).toArray()});}
 }

 break(crate,f){if(crate.broken)return;crate.broken=true;
  // Detach the actual boards without changing their world pose or ink/grain.
  crate.group.updateWorldMatrix(true,true);const boards=[];crate.group.traverse(o=>{if(o.isMesh&&o.geometry.type==='BoxGeometry')boards.push(o);});
  const incoming=f.launch?.velocity||f.knockVelocity||f.velocity;
  const push=incoming?.lengthSq()>.01?incoming.clone():f.launch?f.launch.end.clone().sub(f.launch.start).multiplyScalar(4):V(1,0,0);
  boards.forEach((object,i)=>{this.root.attach(object);const body=this.debris.add(object,crate.p,push,i);this.particles.push({object,body,age:0});});
  this.remove(crate.group);this.syncNavigation();
  const count=!crate.kind?0:crate.kind==='coin'?5:1;
  for(let i=0;i<count;i++){const object=new T.Group();if(crate.kind==='coin'){const coin=new T.Mesh(new T.CylinderGeometry(.16,.16,.055,16),this.gold);coin.rotation.x=Math.PI/2;coin.add(new T.LineSegments(new T.EdgesGeometry(coin.geometry),this.ink));object.add(coin);}else{object.add(this.box([.43,.32,.18],V(),this.paper));for(const side of [-1,1]){const cross=new T.Group();cross.name=side>0?'health_cross_front':'health_cross_back';cross.add(this.box([.075,.23,.02],V(0,0,side*.101),this.red));cross.add(this.box([.23,.075,.02],V(0,0,side*.101),this.red));object.add(cross);}}const halo=new T.Mesh(new T.RingGeometry(crate.kind==='coin'?.18:.26,crate.kind==='coin'?.22:.30,24),new T.MeshBasicMaterial({color:crate.kind==='coin'?0xffd447:0xfff4bd,transparent:true,opacity:.55,depthWrite:false,side:T.DoubleSide}));halo.name='loot_halo';halo.rotation.x=-Math.PI/2;halo.position.y=-.08;object.add(halo);object.position.copy(crate.p).add(V(0,.6,0));this.root.add(object);const angle=i*2.4;this.loot.push({object,kind:crate.kind,age:0,velocity:V(Math.cos(angle)*(.8+i*.1),3.2,Math.sin(angle)*(.8+i*.1)),settled:false});}
  this.combat.emit('crateBreaks',f,{point:crate.p.clone().add(V(0,.5,0)).toArray(),loot:crate.kind});
 }
 collectEffect(loot,fighter){
  if(this.effectsEnabled===false)return;
  const object=new T.Group();object.name='pickup_'+loot.kind;object.position.copy(loot.object.position);this.root.add(object);
  const material=new T.MeshBasicMaterial({color:loot.kind==='coin'?0xffdc45:0x88e5a1,transparent:true,opacity:1,depthTest:true,depthWrite:false,side:T.DoubleSide});
  const ring=new T.Mesh(new T.RingGeometry(.15,.20,24),material);ring.rotation.x=-Math.PI/2;object.add(ring);
  const rays=[];for(let i=0;i<10;i++){const ray=new T.Mesh(new T.OctahedronGeometry(.045,0),material);object.add(ray);rays.push(ray);}
  const symbol=new T.Group();symbol.position.y=.15;
  if(loot.kind==='health'){symbol.add(new T.Mesh(new T.BoxGeometry(.08,.29,.06),material),new T.Mesh(new T.BoxGeometry(.29,.08,.06),material));}
  else {const coin=new T.Mesh(new T.CylinderGeometry(.16,.16,.045,16),material);coin.rotation.x=Math.PI/2;symbol.add(coin);}
  object.add(symbol);this.pickups.push({object,ring,rays,symbol,material,age:0});
 }
 step(dt){for(const fx of this.pickups){fx.age+=dt;const u=Math.min(1,fx.age/.65);fx.material.opacity=1-u*u;fx.ring.scale.setScalar(1+u*3.8);fx.symbol.position.y=.15+u*.95;fx.symbol.rotation.y=u*2;fx.symbol.scale.setScalar(1+.3*Math.sin(u*Math.PI));fx.rays.forEach((r,i)=>{const a=i*Math.PI/5;r.position.set(Math.cos(a)*u*.55,u*.7+.08,Math.sin(a)*u*.55);r.scale.setScalar(1-u*.7);});}
  for(const fx of this.pickups.filter(f=>f.age>=.65)){this.remove(fx.object);fx.material.dispose();}this.pickups=this.pickups.filter(f=>f.age<.65);
  this.debris.step(dt);
  for(const p of this.particles){p.age+=dt;const sleeping=p.body.sleepState===2;if(!sleeping||!p.sleepSynced){p.object.position.copy(p.body.position);p.object.quaternion.copy(p.body.quaternion);p.object.updateMatrix();p.object.matrixAutoUpdate=!sleeping;}p.sleepSynced=sleeping;}
  // Sleeping bodies and visible fragments persist until the round reset.
  for(const l of [...this.loot]){l.age+=dt;if(!l.settled){l.velocity.y-=8*dt;l.object.position.addScaledVector(l.velocity,dt);if(l.object.position.y<.2){l.object.position.y=.2;l.settled=true;}}else if(!l.magnetTarget)l.object.position.y=.23+Math.sin(l.age*3)*.04;l.object.rotation.y+=dt*2;
   if(l.age<=.7||l.collected)continue;
   const fighter=magnetTarget(l,this.combat.fighters,(a,b)=>!this.combat.navigation.segment||this.combat.navigation.segment(a,b,[],.06));
   l.magnetTarget=fighter;
   if(fighter){
    const delta=fighter.root.position.clone().add(V(0,.65,0)).sub(l.object.position),flat=Math.hypot(delta.x,delta.z);
    if(flat>.30){l.settled=true;l.magnetSpeed=Math.min(4.5,(l.magnetSpeed||1.2)+dt*7);l.object.position.addScaledVector(delta,Math.min(1,l.magnetSpeed*dt/Math.max(.001,delta.length())));continue;}
    // Claim before emitting: callbacks and adjacent fighters cannot collect twice.
    l.collected=true;const amount=l.kind==='health'?Math.min(24,Math.max(0,fighter.maxHealth-fighter.health)):1;
    if(!amount){l.collected=false;l.magnetTarget=null;continue;}
    if(l.kind==='health')fighter.health+=amount;else this.coins[fighter.team]+=amount;
    this.collectEffect(l,fighter);this.combat.emit('lootCollected',fighter,{kind:l.kind,amount,point:l.object.position.toArray()});this.remove(l.object);this.loot.splice(this.loot.indexOf(l),1);
   }

  }
 }
}

// Swept segment against the actual prop bounds, expanded by body thickness.
function segmentBox(a,b,bounds,radius){let lo=0,hi=1;for(const axis of ['x','y','z']){const d=b[axis]-a[axis],min=bounds.min[axis]-radius,max=bounds.max[axis]+radius;if(Math.abs(d)<1e-9){if(a[axis]<min||a[axis]>max)return false;}else{let x=(min-a[axis])/d,y=(max-a[axis])/d;if(x>y)[x,y]=[y,x];lo=Math.max(lo,x);hi=Math.min(hi,y);if(lo>hi)return false;}}return true;}
