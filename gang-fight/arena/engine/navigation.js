import {flankCost} from './positioning.js';
import {Vector3} from 'three';
import {boundary,inside,constrainCourtyard} from './courtyard.js?v=20261027am';
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
function edgeDistance(p,a,b){const x=b.x-a.x,z=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*x+(p.z-a.z)*z)/(x*x+z*z)));return Math.hypot(p.x-a.x-x*t,p.z-a.z-z*t);}
function contains(p,poly){let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++) {const a=poly[i],b=poly[j];if((a.z>p.z)!==(b.z>p.z)&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)yes=!yes;}return yes;}
// Conservative convex-cell navmesh on the same ground plane as the courtyard.
// Polygon obstacles are holes. Actor radius is baked into clearance, not visual art.
export class Navigation {
 constructor(obstacles=[]){this.cell=.4;this.radius=.57;this.revision=0;this.setObstacles(obstacles);}
 setObstacles(polygons){this.obstacles=polygons.map(poly=>poly.map(p=>p.clone()));this.revision++;this.build();}
 walkable(p,r=this.radius){if(!inside(p))return false;for(const poly of [boundary,...this.obstacles]){if(poly!==boundary&&contains(p,poly))return false;for(let i=0;i<poly.length;i++)if(edgeDistance(p,poly[i],poly[(i+1)%poly.length])<r)return false;}return true;}
 segment(a,b,blockers=[],r=this.radius){const n=Math.max(1,Math.ceil(distance(a,b)/.18));for(let i=0;i<=n;i++){const t=i/n,p={x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t};if(!this.walkable(p,r))return false;for(const o of blockers)if(distance(p,o)<o.radius)return false;}return true;}
 build(){this.nodes=[];this.grid=new Map();const xs=boundary.map(p=>p.x),zs=boundary.map(p=>p.z);this.minX=Math.floor(Math.min(...xs)/this.cell)*this.cell;this.minZ=Math.floor(Math.min(...zs)/this.cell)*this.cell;const nx=Math.ceil((Math.max(...xs)-this.minX)/this.cell),nz=Math.ceil((Math.max(...zs)-this.minZ)/this.cell);
  for(let x=0;x<nx;x++)for(let z=0;z<nz;z++){const p=new Vector3(this.minX+(x+.5)*this.cell,0,this.minZ+(z+.5)*this.cell);if(![-1,1].every(dx=>[-1,1].every(dz=>this.walkable({x:p.x+dx*this.cell/2,z:p.z+dz*this.cell/2}))))continue;const n={id:this.nodes.length,x,z,p,links:[]};this.nodes.push(n);this.grid.set(`${x},${z}`,n);}
  for(const n of this.nodes)for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const m=this.grid.get(`${n.x+dx},${n.z+dz}`);if(m&&(!dx||!dz||(this.grid.has(`${n.x+dx},${n.z}`)&&this.grid.has(`${n.x},${n.z+dz}`)))){if(this.segment(n.p,m.p,[]))n.links.push(m);}}
 }
 nearest(p){let best=null,d=Infinity;for(const n of this.nodes){const q=distance(p,n.p);if(q<d){d=q;best=n;}}return best;}
 anchor(p,blockers,radius){if(!this.walkable(p,radius)||blockers.some(o=>distance(p,o)<o.radius))return null;const nearby=this.nodes.map(n=>({n,d:distance(p,n.p)})).filter(q=>q.d<1.2).sort((a,b)=>a.d-b.d);return nearby.find(({n})=>this.segment(p,n.p,blockers,radius))?.n||null;}
 path(start,goal,blockers=[],radius=this.radius){if(this.segment(start,goal,blockers,radius))return [goal.clone()];const a=this.anchor(start,blockers,radius),b=this.anchor(goal,blockers,radius);if(!a||!b)return [];const open=[a],cost=new Map([[a.id,0]]),parent=new Map(),closed=new Set();
  while(open.length){let at=0;for(let i=1;i<open.length;i++)if(cost.get(open[i].id)+distance(open[i].p,b.p)<cost.get(open[at].id)+distance(open[at].p,b.p))at=i;const n=open.splice(at,1)[0];if(n===b){const route=[goal.clone()];let p=b;route.unshift(p.p.clone());while(parent.has(p.id)){p=parent.get(p.id);route.unshift(p.p.clone());}route.unshift(start.clone());const clean=[];let i=0;while(i<route.length-1){let j=route.length-1;while(j>i+1&&!this.segment(route[i],route[j],blockers,radius))j--;if(!this.segment(route[i],route[j],blockers,radius))return [];clean.push(route[j]);i=j;}return clean;}
   closed.add(n.id);for(const m of n.links){if(closed.has(m.id))continue;if(radius>this.radius&&!this.segment(n.p,m.p,[],radius))continue;// Static clearance is baked into links when obstacles change.
   if(blockers.some(o=>edgeDistance(o,n.p,m.p)<o.radius))continue;const c=cost.get(n.id)+distance(n.p,m.p);if(c<(cost.get(m.id)??Infinity)){parent.set(m.id,n);cost.set(m.id,c);if(!open.includes(m))open.push(m);}}
  }return [];
 }
 constrain(p,r=.44){let q=constrainCourtyard(p,r);if(this.walkable(q,r))return q;const n=this.nearest(q);return n?n.p.clone().setY(p.y):q;}
 beginFrame(){this.bodyFrameCache??=new Map();this.bodyFrameCache.clear();}
 bodyBlockers(f,actors){
  const out=[];
  for(const o of actors){
   if(o===f||(!o.down&&!o.knockdown))continue;
   // Use the body's actual projected pose, not its former standing root.
   let points=this.bodyFrameCache?.get(o);
   if(!points){points=['Head','Hips','Left_Foot','Right_Foot','Left_Leg','Right_Leg','Left_ForeArm','Right_ForeArm','Left_Hand','Right_Hand'].map(name=>o.rig?.bones[name]?.getWorldPosition(new Vector3())).filter(Boolean);
   if(!points.length)points.push(o.root.position.clone());this.bodyFrameCache?.set(o,points);}
   for(const p of points)out.push({x:p.x,z:p.z,radius:.56+(f.kind===6?.12:0),body:true,owner:o.id});
   const head=points[0],hips=points[1];if(head&&hips)out.push({x:(head.x+hips.x)/2,z:(head.z+hips.z)/2,radius:.60,body:true,owner:o.id});
  }
  return out;
 }
 blockers(f,actors){
  const pursuing=(f.kind===4||f.kind===5)&&f.target?.knockdown;
  const bodies=this.bodyBlockers(f,actors).filter(o=>!pursuing||o.owner!==f.target.id);
  // Reach the victim's side without treating every outstretched hand/foot as a wall.
  // Keep the torso/head solid and keep all other fighters as obstacles.
  if(pursuing)for(const name of ['Head','Hips','Spine_2']){const p=f.target.rig.bones[name].getWorldPosition(new Vector3());bodies.push({x:p.x,z:p.z,radius:f.target.kind===6?.52:.43,body:true,owner:f.target.id});}
  return actors.filter(o=>o!==f&&!o.down&&!o.knockdown).map(o=>({x:o.root.position.x,z:o.root.position.z,radius:.86+(f.kind===6?.16:0)+(o.kind===6?.16:0)})).concat(bodies);
 }

 groundGoal(f,actors,point){
  const t=f.target,head=t.rig.bones.Head.getWorldPosition(new Vector3()),hips=t.rig.bones.Hips.getWorldPosition(new Vector3());
  const axis=head.sub(hips).setY(0).normalize();if(axis.lengthSq()<.1)axis.set(Math.sin(t.yaw),0,Math.cos(t.yaw));
  const side=new Vector3(axis.z,0,-axis.x),blockers=this.blockers(f,actors);let best=null,score=Infinity;
  for(const sign of [-1,1])for(const radius of (f.kind===4||f.kind===5?[.90,1.02,1.10]:[.90,1.02]))for(const along of [0,-.18,.18]){
   const p=point.clone().addScaledVector(side,sign*radius).addScaledVector(axis,along);
   if(!this.walkable(p,f.kind===6?.65:f.kind===3?.55:.44)||blockers.some(o=>distance(p,o)<o.radius+.04))continue;
   const value=distance(f.root.position,p)+(f.groundSide&&f.groundSide!==sign?.45:0);
   if(value<score){score=value;best=p;best.side=sign;}
  }
  if(best)f.groundSide=best.side;
  return best;
 }
 goal(f,actors,range,time,retry=false){const t=f.target;if(!t)return f.root.position.clone();const current=f.root.position,target=t.root.position;
  const bodies=time<(f.bodyEscapeUntil||0)?[]:this.bodyBlockers(f,actors);
  if(f.navGoal&&!bodies.some(o=>distance(f.navGoal,o)<o.radius+.10)&&f.navTarget===t.id&&time<f.navGoalTime&&distance(target,f.navTargetPosition)<.35)return f.navGoal;
  let best=null,bestScore=Infinity;const base=Math.atan2(current.x-target.x,current.z-target.z);
  for(let ring=0;ring<2;ring++)for(let i=0;i<16;i++){const angle=base+i*Math.PI/8,r=range+(ring?1.05:0),p=new Vector3(target.x+Math.sin(angle)*r,0,target.z+Math.cos(angle)*r);if(!this.walkable(p)||bodies.some(o=>distance(p,o)<o.radius+.10))continue;
   let score=distance(current,p)+ring*1.8+flankCost(f,p,actors);
   // Prefer elbow room around each complete body, not just a free point for the feet.
   const clearance=new Map();for(const o of bodies){const gap=Math.min(distance(p,o),edgeDistance(o,p,target))-o.radius;clearance.set(o.owner,Math.min(clearance.get(o.owner)??Infinity,gap));}
   for(const gap of clearance.values())score+=Math.max(0,.55-gap)*2.2;
   if(f.reposition>0){const flank=new Vector3(target.x+Math.sin(base+f.repositionSign*.65)*r,0,target.z+Math.cos(base+f.repositionSign*.65)*r);score+=distance(p,flank)*2;}
   if(f.navFailedGoal&&time<f.navFailedUntil)score+=Math.max(0,1.1-distance(p,f.navFailedGoal))*8;
   for(const o of actors){if(o===f||o===t||o.down)continue;const d=distance(p,o.root.position);if(d<.95)score+=(.95-d)*12; if(o.team===f.team&&o.target===t&&o.navGoal&&distance(p,o.navGoal)<.95)score+=(.95-distance(p,o.navGoal))*10;}
   if(f.navGoal)score+=Math.min(1.5,distance(p,f.navGoal))*.65;
   if(score<bestScore){best=p;bestScore=score;}
  }
  if((!best||(distance(best,target)>range+.5&&distance(current,best)<.35))&&bodies.length&&!retry){f.bodyEscapeUntil=time+3;f.navGoal=null;f.navPath=null;return this.goal(f,actors,range,time,true);}
  f.navGoal=best||this.nearest(current)?.p.clone()||current.clone();f.navTarget=t.id;f.navTargetPosition=target.clone();f.navGoalTime=time+.65+(f.id%5)*.04;return f.navGoal;
 }
 velocity(f,actors,goal,time,speed){const p=f.root.position;let blockers=this.blockers(f,actors);
  // Bodies are preferred detours, not permanent walls. Detect actual lack of
  // progress as well as path failure; keep live actors and map geometry solid.
  if(!f.navProgress||time<f.navProgress.time)f.navProgress={time,p:p.clone()};
  if(time-f.navProgress.time>.7){
   if(distance(p,f.navProgress.p)<.12&&distance(p,goal)>.2&&blockers.some(o=>o.body)){f.bodyEscapeUntil=time+3;f.navPath=null;f.navGoalTime=0;}
   f.navProgress={time,p:p.clone()};
  }
  if(time<(f.bodyEscapeUntil||0))blockers=blockers.filter(o=>!o.body);
  // Keep the attack target as a blocker: paths to rear slots must go around it.
  // Relax only an initial overlap, so spawned crowds can separate without deadlock.
  const routeBlockers=blockers.filter(o=>distance(p,o)>o.radius+.04);
  const blockedNext=f.navPath?.length&&routeBlockers.some(o=>o.body&&edgeDistance(o,p,f.navPath[0])<o.radius);
  if(f.navRevision!==this.revision||((f.target?.knockdown||time>=(f.navRepathAfter||0))&&(!f.navPath||blockedNext||time>f.navPathTime||!f.navPathGoal||distance(goal,f.navPathGoal)>.25))){f.navRepathAfter=time+.16;f.navPath=this.path(p,goal,routeBlockers,f.kind===6?.65:f.kind===3?.55:.44);if(!f.navPath.length&&routeBlockers.some(o=>o.body)){
    const relaxed=blockers.filter(o=>!o.body),route=this.path(p,goal,relaxed.filter(o=>distance(p,o)>o.radius+.04),f.kind===6?.65:f.kind===3?.55:.44);
    if(route.length){f.bodyEscapeUntil=time+3;f.navPath=route;blockers=relaxed;}
   }f.navPathGoal=goal.clone();f.navPathTime=time+.5+(f.id%5)*.04;f.navRevision=this.revision;if(!f.navPath.length){f.navFailedGoal=goal.clone();f.navFailedUntil=time+1.4;f.navGoalTime=time;}}
  if(!f.navPath)return new Vector3();
  while(f.navPath.length>1&&distance(p,f.navPath[0])<.22)f.navPath.shift();
  // Final approach must be more precise than the strike distance window.
  const next=f.navPath[0];if(!next)return new Vector3();const delta=next.clone().sub(p).setY(0),length=delta.length();if(length<(f.navPath.length===1?.008:.09))return new Vector3();delta.normalize();
  const maxSpeed=Math.min(speed,distance(p,goal)*4),heading=Math.atan2(delta.x,delta.z);let best=new Vector3(),score=-Infinity;
  for(const offset of [0,.35,-.35,.7,-.7,1.1,-1.1,1.55,-1.55,2,-2]){const dir=new Vector3(Math.sin(heading+offset),0,Math.cos(heading+offset)),end=p.clone().addScaledVector(dir,Math.min(length,Math.max(.22,maxSpeed*.38)));if(!this.segment(p,end,[],f.kind===6?.65:f.kind===3?.55:.44))continue;let clearance=1;
   for(const o of blockers){const before=distance(p,o),after=distance(end,o);if((before>=o.radius-.02&&edgeDistance(o,p,end)<o.radius-.02)||(before<o.radius-.02&&after<before+.01)){clearance=0;break;}clearance=Math.min(clearance,Math.max(0,(after-(o.radius-.06))/.4));}
   if(!clearance)continue;const value=dir.dot(delta)*2+clearance*.35-Math.abs(offset)*.08;if(value>score){score=value;best.copy(dir).multiplyScalar(maxSpeed*Math.max(.35,clearance));}}
  return best;
 }
}
