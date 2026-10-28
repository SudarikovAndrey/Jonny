// Fit in the original courtyard camera space; scene and painted plate share projection.
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const CAMERA_MAX_ZOOM=1.65;
export const isStandingForCamera=f=>!f.down&&!f.knockdown&&!f.launch&&!['fall','down','grounded','gettingUp','settling'].includes(f.state);
export class BattleFraming {
 constructor(){this.reset();}
 reset(){this.x=0;this.y=0;this.zoom=null;this.key=null;this.closeAge=0;this.solo=null;this.size=null;}
 // Compatibility for older callers: combat events never change framing.
 highlight(){return false;}
 update(samples,{dt=0,width,height,maxZoom=1.6,mode='follow',reduced=false,key=0}){
  if(key!==this.key){this.reset();this.key=key;}
  const resized=this.size!==width+':'+height;this.size=width+':'+height;
  dt=clamp(dt,0,.05);
  const aspect=Math.max(.1,width/Math.max(1,height)),baseHalf=5.7/Math.max(1,aspect);
  const active=samples.filter(s=>s.standing??!s.down),following=mode==='follow';
  let limit=Math.min(CAMERA_MAX_ZOOM,maxZoom);
  if(active.length<=1){limit=Math.min(limit,1.15);this.solo??={x:this.x,y:this.y};}else this.solo=null;
  if(!active.length){
   if(this.zoom===null)this.zoom=limit;
   else this.zoom+=(Math.min(this.zoom,limit)-this.zoom)*(1-Math.exp(-dt/.8));
   return {x:this.x,y:this.y,zoom:Math.min(this.zoom,maxZoom)};
  }
  // Broad padding absorbs steps/turns and avoids chasing each animation frame.
  const minX=Math.min(...active.map(s=>s.x))-.72,maxX=Math.max(...active.map(s=>s.x))+.72;
  const minY=Math.min(...active.map(s=>s.bottom))-.28,maxY=Math.max(...active.map(s=>s.top))+.42;
  let tx=following?(minX+maxX)/2:0,ty=following?(minY+maxY)/2:0;
  if(this.solo){tx=this.solo.x;ty=this.solo.y;}
  const fitHalf=Math.max((maxX-minX)/2/aspect,(maxY-minY)/2)/.82;
  const aperture=baseHalf/Math.min(limit,baseHalf/Math.max(.1,fitHalf));
  tx=clamp(tx,-Math.max(0,5.7-aperture*aspect),Math.max(0,5.7-aperture*aspect));
  ty=clamp(ty,-.399-Math.max(0,5.7-aperture),-.399+Math.max(0,5.7-aperture));
  if(this.zoom===null){this.x=tx;this.y=ty;}
  else for(const [axis,target] of [['x',tx],['y',ty]]){
   const d=target-this[axis];if(Math.abs(d)>.22)this[axis]+=clamp((d-Math.sign(d)*.22)*(1-Math.exp(-dt/(reduced?2:1.3))),-dt*.8,dt*.8);
  }
  const extent=Math.max((maxX-this.x)/aspect,(this.x-minX)/aspect,maxY-this.y,this.y-minY);
  const desired=Math.min(limit,baseHalf*.82/Math.max(.1,extent));
  if(this.zoom===null||resized)this.zoom=desired;
  else if(desired<this.zoom*.98){this.closeAge=0;this.zoom+=(desired-this.zoom)*(1-Math.exp(-dt/.65));}
  else if(desired>this.zoom*1.1){this.closeAge+=dt;if(this.closeAge>1.4)this.zoom+=(desired-this.zoom)*(1-Math.exp(-dt/2.4));}
  else this.closeAge=0;
  this.zoom=Math.min(this.zoom,maxZoom,CAMERA_MAX_ZOOM);
  return {x:this.x,y:this.y,zoom:this.zoom};
 }
}
