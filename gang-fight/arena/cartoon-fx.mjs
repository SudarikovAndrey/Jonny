import * as T from 'three';
const ink='#25221c',paper='#f2e3bd',gold='#e8b641',red='#b54a30';
// Six authored drawing phases: squash, impact, stretch, breakup. Textures are cached.
function stamp(kind,frame=0){
 const c=document.createElement('canvas');c.width=c.height=192;const g=c.getContext('2d');g.translate(96,96);g.lineJoin='round';g.lineCap='round';g.strokeStyle=ink;g.lineWidth=7;
 if(kind==='burst'||kind==='star'){
  const n=kind==='star'?5:9;g.beginPath();for(let i=0;i<n*2;i++){const a=i*Math.PI/n-Math.PI/2,r=i%2?(kind==='star'?30:28-frame*2):(kind==='star'?75:63+Math.sin(i*1.7+frame*.6)*10+frame*3);const x=Math.cos(a)*r,y=Math.sin(a)*r;i?g.lineTo(x,y):g.moveTo(x,y);}g.closePath();g.fillStyle=kind==='star'?gold:paper;g.fill();g.stroke();
  if(kind==='burst'){g.beginPath();for(let i=0;i<14;i++){const a=i*Math.PI/7,r=i%2?12:29+Math.sin(i+frame*.7)*5;const x=Math.cos(a)*r+6,y=Math.sin(a)*r-3;i?g.lineTo(x,y):g.moveTo(x,y);}g.closePath();g.fillStyle=red;g.fill();g.lineWidth=4;g.stroke();}
 }else if(kind==='ring'||kind==='arc'){
  g.strokeStyle=paper;g.lineWidth=20;g.beginPath();
  g.arc(0,0,48+frame*3,kind==='arc'?.25+frame*.13:frame*.14,kind==='arc'?Math.PI*(1.75-frame*.10):Math.PI*(2-frame*.09));
  g.stroke();g.strokeStyle=ink;g.lineWidth=4;g.stroke();
 }else if(kind==='puff'){
  g.scale(1+frame*.035,1-frame*.035);g.rotate(Math.sin(frame)*.04);
  if(frame>=4){g.lineWidth=9;g.strokeStyle=paper;for(let i=0;i<3;i++){g.beginPath();g.arc((i-1)*42,(i%2)*18,24+frame,Math.PI*(.15+i*.3),Math.PI*(1.3+i*.25));g.stroke();}g.strokeStyle=ink;g.lineWidth=3;g.beginPath();g.arc(0,18,29,.4,2.4);g.stroke();}else{
  g.beginPath();g.moveTo(-65,25);g.bezierCurveTo(-95,-5,-63,-42,-36,-33);g.bezierCurveTo(-31,-79,25,-76,36,-39);g.bezierCurveTo(76,-61,101,-3,65,16);g.bezierCurveTo(75,52,22,71,5,49);g.bezierCurveTo(-18,72,-64,64,-65,25);g.closePath();g.fillStyle=paper;g.fill();g.stroke();g.lineWidth=4;g.beginPath();g.moveTo(-41,20);g.quadraticCurveTo(-55,-7,-26,-12);g.moveTo(18,33);g.quadraticCurveTo(39,40,47,20);g.stroke();}
 }else{
  g.beginPath();g.moveTo(-12,66);g.bezierCurveTo(-42,28,-9,-37,17,-77);g.bezierCurveTo(5,-18,44,56,-12,66);g.closePath();g.fillStyle=kind==='drop'?paper:gold;g.fill();g.stroke();
 }
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;
}
export class CartoonFX{
 constructor(scene){this.scene=scene;this.clock=0;this.items=[];this.enabled=true;this.reduced=matchMedia('(prefers-reduced-motion: reduce)');this.frames=Object.fromEntries(['burst','star','puff','drop','ring','arc'].map(k=>[k,Array.from({length:6},(_,i)=>stamp(k,i))]));this.textures=Object.fromEntries(Object.entries(this.frames).map(([k,v])=>[k,v[0]]));this.shake=0;this.sequence=0;}
 add(kind,position,velocity,size,life,rotation=0){
  if(this.items.length>=96)this.remove(0);
  const material=new T.SpriteMaterial({map:this.textures[kind],transparent:true,depthWrite:false,depthTest:true,alphaTest:.025,rotation});
  const sprite=new T.Sprite(material);sprite.position.copy(position);sprite.scale.setScalar(size);sprite.renderOrder=0;this.scene.add(sprite);
  this.items.push({sprite,position:position.clone(),velocity,kind,size,life,born:this.clock,rotation});
 }
 remove(i){const [p]=this.items.splice(i,1);this.scene.remove(p.sprite);p.sprite.material.dispose();}
 clear(){while(this.items.length)this.remove(0);this.shake=0;}
 hit(e,camera){
  if(!this.enabled||!e.point)return;
  const p=new T.Vector3().fromArray(e.point),block=e.type==='blocks',ground=!!e.groundImpact,strong=!block&&(ground||(e.reactionTier?e.reactionTier==='heavy':e.damage>=19||e.impulseMagnitude>=26)),reduced=this.reduced.matches;
  // A little toward camera keeps the contact drawing on the skin, not inside it.
  p.addScaledVector(camera.position.clone().sub(p).normalize(),.16);
  const right=new T.Vector3(1,0,0).applyQuaternion(camera.quaternion),up=new T.Vector3(0,1,0).applyQuaternion(camera.quaternion),direction=new T.Vector3().fromArray(e.impulse||e.direction||[1,0,0]);const angle=Math.atan2(direction.dot(up),direction.dot(right));
  if(e.signature===undefined)this.add(block?'puff':'burst',p,new T.Vector3(),ground?1.05:strong?1:e.reactionTier==='light'?.58:.74,reduced?.18:.32,angle);
  if(e.signature!==undefined)this.signature(e,p,camera,reduced);
  if(reduced)return;
  if(ground){for(let i=0;i<3;i++){const angle=i*Math.PI*2/3,origin=p.clone();origin.y=Math.max(.12,p.y-.12);this.add('puff',origin,new T.Vector3(Math.cos(angle)*.7,.12,Math.sin(angle)*.7),.25,.32,angle);}}
  const seed=++this.sequence;
  for(let i=0;i<(strong?5:e.reactionTier==='light'?2:3);i++){
   const spread=angle+(i-((strong?5:3)-1)/2)*.45,vel=right.clone().multiplyScalar(Math.cos(spread)*(strong?1.7:1.2)).addScaledVector(up,Math.sin(spread)*1.1+.25);
   this.add(i%3===0?'star':'drop',p,vel,i%3===0?.16:.105,.38+(i%3)*.07,angle);
  }
  if(strong){for(let i=0;i<2;i++)this.add('puff',p,right.clone().multiplyScalar(i?-.6:.6).addScaledVector(up,-.2),.24,.34,i);}
 }
 signature(e,p,camera,reduced){
  const id=e.signature,shape=['burst','arc','burst','puff','ring','arc','star'][id];
  this.add(shape,p,new T.Vector3(),id===0?.95:id===2?1.55:1.30,reduced?.20:id===0?.22:.36,id===1?-.6:id===5?.7:0);
  if(reduced)return;
  const right=new T.Vector3(1,0,0).applyQuaternion(camera.quaternion),up=new T.Vector3(0,1,0).applyQuaternion(camera.quaternion);
  for(let i=0;i<6;i++){
   const a=(i/6)*Math.PI*2,offset=right.clone().multiplyScalar(Math.cos(a)).addScaledVector(up,Math.sin(a));
   const velocity=id===6?up.clone().multiplyScalar(1.5+i*.25).addScaledVector(right,(i-2.5)*.22):offset.clone().multiplyScalar(1.8);
   this.add(id===2||id===3?'puff':id===4?'drop':'star',p.clone().addScaledVector(offset,.12),velocity,.17+(id===3?.12:0),.40+i*.025,a);
  }
 }
 landing(e,camera){
  if(!this.enabled||!e.point)return;
  const p=new T.Vector3().fromArray(e.point),reduced=this.reduced.matches,bulk=e.heavy?1.15:1;
  // World-space landing, no overlay or camera-depth override: bodies occlude it.
  p.y=.16;this.add('burst',p,new T.Vector3(0,.12,0),1.35*bulk,reduced?.22:.42);
  if(reduced)return;
  const seed=++this.sequence;
  for(let i=0;i<8;i++){
   const angle=i*Math.PI/4+seed*.37,radial=new T.Vector3(Math.cos(angle),0,Math.sin(angle));
   const origin=p.clone().addScaledVector(radial,.25*bulk);origin.y=.14+(i%3)*.06;
   const velocity=radial.multiplyScalar(1.4+(i%3)*.35);velocity.y=.15+(i%2)*.2;
   this.add('puff',origin,velocity,.52*bulk,.62+(i%3)*.08,0);
  }
  
 }
 update(dt,camera){
  this.clock+=dt;this.shake=Math.max(0,this.shake-dt);
  for(let i=this.items.length-1;i>=0;i--){
   const p=this.items[i],age=this.clock-p.born;if(age>=p.life){this.remove(i);continue;}
   const reduced=this.reduced.matches,t=reduced?0:Math.floor(age*(p.kind==='burst'?24:12))/(p.kind==='burst'?24:12),u=age/p.life;
   p.sprite.position.copy(p.position).addScaledVector(p.velocity,t);if(p.kind==='star'||p.kind==='drop')p.sprite.position.y-=2*t*t;
   const pulse=p.kind==='burst'?(t<.04?.65:t<.12?1.12:.85):(p.kind==='puff'?.6+t*2.8:1);
   const phase=reduced?1:Math.min(5,Math.floor(u*6));p.sprite.material.map=this.frames[p.kind][phase];
   const stretch=reduced?1:p.kind==='burst'?1+u*.65:p.kind==='drop'?1+u*.8:1;
   p.sprite.scale.set(p.size*pulse*stretch,p.size*pulse/(p.kind==='burst'?Math.sqrt(stretch):1),1);p.sprite.material.opacity=Math.min(1,(1-u)*4);p.sprite.material.rotation=p.rotation+(reduced?0:t*(p.kind==='star'?3:p.kind==='burst'?0:.4));
  }
  return {x:0,y:0};
 }
}
