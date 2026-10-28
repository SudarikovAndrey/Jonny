// Short, interruptible exchanges. These schedule real attacks, never scripted damage.
export class Exchanges {
 constructor(combat){this.combat=combat;this.plans=new Map();this.ready=new Map();}
 clear(){this.plans.clear();this.ready.clear();}
 cancel(id){const p=this.plans.get(id),f=this.combat.fighters.find(f=>f.id===id);if(p?.committed&&f?.nextAttack===p.attack)f.nextAttack=null;this.plans.delete(id);}
 queue(f,target,attack,kind){const c=this.combat;if(c.forcedAttack||!f||!target||f.down||target.down||f.knockdown||target.knockdown||f.health<=0||target.health<=0||c.time<(this.ready.get(f.id)||0))return;
  this.cancel(f.id);this.plans.set(f.id,{target:target.id,attack,kind,expires:c.time+2.1,committed:false});this.ready.set(f.id,c.time+2.8);
 }
 event(e){const c=this.combat,f=c.fighters.find(f=>f.id===e.fighter),t=c.fighters.find(f=>f.id===e.target);
  if(e.type==='hits'){
   for(const [id,p] of this.plans)if((id===e.target&&p.target!==e.fighter)||(p.target===e.target&&id!==e.fighter))this.cancel(id);
   if(!e.groundImpact&&e.zone!=='arm'&&e.attack==='jab'&&!f?.styleQueue?.length&&!f?.martialQueue?.length&&!f?.boxingQueue?.length)this.queue(f,t,'body','jab-body');
  }
  if(e.type==='blocks'){const attacker=c.fighters.find(o=>o.id===e.attacker);this.queue(f,attacker,f.kind===4?'body':'cross','block-counter');if(f.defense)f.defense.duration=Math.min(f.defense.duration,f.defense.time+.23);}
  if(e.type==='dodges')this.queue(f,c.fighters.find(o=>o.id===e.attacker),'hook','dodge-hook');
  if(e.type==='attacks'){const p=this.plans.get(e.fighter);if(p?.committed&&e.attack===p.attack&&e.target===p.target){this.plans.delete(e.fighter);c.emit('exchanges',f,{target:p.target,exchange:p.kind});}}
  if(['knockouts','knockdowns','knockbacks'].includes(e.type)){this.cancel(e.fighter);for(const [id,p] of this.plans)if(p.target===e.fighter)this.cancel(id);}
 }
 update(f){const c=this.combat,p=this.plans.get(f.id);if(!p)return;const target=c.fighters.find(o=>o.id===p.target);
  if(c.forcedAttack||c.time>p.expires||(p.windowUntil&&c.time>p.windowUntil)||f.down||f.knockdown||f.knockback||!target||target.down||target.knockdown||target.knockback||f.root.position.distanceTo(target.root.position)>2.5){this.cancel(f.id);return;}
  if(f.attack||f.defense||f.state==='hit')return;
  if(!p.committed){f.target=target;f.nextAttack=p.attack;f.cooldown=Math.min(f.cooldown,.10);f.retreat=0;f.reposition=0;f.navGoal=null;f.navPath=null;p.committed=true;}
 }
}
