// Pixel-sized, real-time impulses; never queued, accumulated, rotated or zoomed.
export class CameraImpulse {
 constructor(){this.enabled=true;this.started=-Infinity;this.last=-Infinity;this.history=[];this.duration=0;this.amplitude=0;}
 trigger(event,now,reduced=false){
  const landing=event.type==='landings',critical=event.type==='hits'&&event.critical===true;
  if(!this.enabled||reduced||(!landing&&!critical))return false;
  this.history=this.history.filter(t=>now-t<10);
  if(now-this.last<3||this.history.length>=2)return false;
  this.last=this.started=now;this.history.push(now);this.duration=landing?.28:.22;this.amplitude=landing?(event.heavy?3:2.4):2;return true;
 }
 sample(now,suppressed=false){
  if(suppressed||!this.enabled){this.started=-Infinity;return {x:0,y:0};}
  const age=now-this.started;if(age<0||age>=this.duration)return {x:0,y:0};
  const u=age/this.duration,envelope=Math.sin(Math.PI*u)*(1-u)**2;
  return {x:this.amplitude*.5*Math.sin(u*Math.PI*4)*envelope,y:this.amplitude*Math.sin(u*Math.PI*3)*envelope};
 }
 reset(){this.started=this.last=-Infinity;this.history=[];}
}
