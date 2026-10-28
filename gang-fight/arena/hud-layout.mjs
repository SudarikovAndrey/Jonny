const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const overlaps=(a,b)=>Math.abs(a.x-b.x)<(a.w+b.w)/2+4&&a.y>b.y-b.h-4&&a.y-a.h<b.y+4;
// Pack health and active notices together; keep prior positions when space permits.
export class HudLayout {
 constructor(){this.previous=new Map();}
 clear(){this.previous.clear();}
 place(anchors,width,height,dt=1/60){
  const boxes=[],out=[];const w=width<500&&anchors.length>12?44:56;
  for(const a of [...anchors].sort((a,b)=>a.id-b.id)){
   const h=a.notice?28:8;
   const prev=this.previous.get(a.id);const t=1-Math.exp(-Math.min(.05,dt)/.075);
   const ax=prev?prev.ax+(a.x-prev.ax)*t:a.x,ay=prev?prev.ay+(a.y-prev.ay)*t:a.y;
   const candidates=[];
   if(prev)candidates.push({dx:prev.dx,dy:prev.dy});
   for(let row=0;row<22;row++)for(const step of [0,-1,1,-2,2,-3,3])candidates.push({dx:step*(w+8),dy:-row*12});
   let best=null;
   for(const c of candidates){
    const b={x:clamp(ax+c.dx,w/2+6,width-w/2-6),y:clamp(ay+c.dy,h+6,height-10),w,h};
    const collision=boxes.some(o=>overlaps(b,o));
    const faces=anchors.some(o=>o.id!==a.id&&Math.abs(b.x-o.x)<w/2+15&&b.y>o.y+4&&b.y-h<o.y+38);
    const distance=Math.abs(b.x-ax)*1.1+Math.abs(b.y-ay);
    const change=prev?Math.abs(b.x-ax-prev.dx)+Math.abs(b.y-ay-prev.dy):0;
    const score=distance+change*.65+(collision?10000:0)+(faces?65:0);
    if(!best||score<best.score)best={...b,score};
   }
   boxes.push(best);this.previous.set(a.id,{ax,ay,dx:best.x-ax,dy:best.y-ay});
   out.push({...a,x:best.x,y:best.y,anchorX:a.x,anchorY:a.y,boxWidth:w,boxHeight:h});
  }
  const ids=new Set(anchors.map(a=>a.id));for(const id of this.previous.keys())if(!ids.has(id))this.previous.delete(id);
  return out;
 }
}
