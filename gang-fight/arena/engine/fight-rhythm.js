export const profile=f=>f.kind===6?{pace:.80,playback:.90,recovery:.62,variance:.3,retreat:.12,block:.48,dodge:.54}:f.kind===5?{pace:1.18,playback:1.10,recovery:.22,variance:.35,retreat:.64,block:.26,dodge:.73}:f.kind===4?{pace:.92,playback:1,recovery:.34,variance:.4,retreat:.30,block:.53,dodge:.74}:f.kind===3?{pace:.90,playback:.95,recovery:.48,variance:.5,retreat:.23,block:.42,dodge:.60}:{pace:1,playback:1,recovery:.35,variance:.65,retreat:.35,block:.36,dodge:.66};
export const heavy=type=>['hook','hookLeft','uppercut','giantUppercut','highKick','axeKick','spinKick','roundKick'].includes(type);
export class FightRhythm {
 constructor(combat){this.combat=combat;this.recent=[];this.waiting=new Map();}
 clear(){this.recent=[];this.waiting.clear();}
 canStart(f,type){const c=this.combat;if(c.forcedAttack||!heavy(type))return true;
  this.recent=this.recent.filter(e=>c.time-e.time<.18);
  const busy=this.recent.some(e=>e.id!==f.id&&e.position.distanceTo(f.root.position)<2.5);
  if(!busy){this.waiting.delete(f.id);return true;}
  if(!this.waiting.has(f.id))this.waiting.set(f.id,c.time);
  return c.time-this.waiting.get(f.id)>=.22;
 }
 started(f,type){this.waiting.delete(f.id);if(heavy(type))this.recent.push({id:f.id,time:this.combat.time,position:f.root.position.clone()});}
}
