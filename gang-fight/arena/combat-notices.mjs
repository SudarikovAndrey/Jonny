// Status words and actual hit damage. HUD bars never move to accommodate them.
export class CombatNotices {
 constructor(parent,create=()=>document.createElement('span')){this.parent=parent;this.create=create;this.clock=0;this.items=new Map();this.cooldowns=new Map();this.numbers=[];this.serial=0;this.lastBattleTime=0;}
 clear(){for(const item of [...this.items.values(),...this.numbers])item.node.remove();this.items.clear();this.cooldowns.clear();this.numbers=[];}
 node(className,text){const node=this.create();node.className=className;node.textContent=text;node.setAttribute('aria-hidden','true');node.style.visibility='hidden';this.parent.append(node);return node;}
 event(e){
  if(e.type==='lootCollected'&&e.amount>0){
   if(this.numbers.length>=32)this.numbers.shift().node.remove();
   this.numbers.push({id:e.fighter,node:this.node('damage-number loot-number '+e.kind,'+'+e.amount+(e.kind==='health'?' HP':' $')),born:this.clock,side:1});
  }
  if(e.type==='hits'&&e.target!=null&&Number.isFinite(e.damage)&&e.damage>0){
   if(this.numbers.length>=32)this.numbers.shift().node.remove();
   this.numbers.push({id:e.target,node:this.node('damage-number'+(e.critical?' critical':''),'−'+Math.max(1,Math.round(e.damage))),born:this.clock,point:e.point,side:(this.serial++%2?1:-1)});
  }
  const kind=e.type==='blocks'?'block':e.type==='dodges'?'dodge':e.type==='hits'&&e.critical?'crit':null;
  if(!kind)return;const id=kind==='crit'?e.target:e.fighter;if(id==null)return;
  const previous=this.items.get(id);if(this.clock<(this.cooldowns.get(id)||0)&&!(kind==='crit'&&previous&&previous.kind!=='crit'))return;
  if(previous)previous.node.remove();else if(this.items.size>=12)return;
  const node=this.node('combat-notice '+kind,{block:'блок',crit:'крит',dodge:'уворот'}[kind]);
  this.items.set(id,{node,kind,born:this.clock});this.cooldowns.set(id,this.clock+.7);
 }
 update(dt,positions,battleTime,reduced=false,project=null){
  if(battleTime<this.lastBattleTime)this.clear();this.lastBattleTime=battleTime;this.clock+=dt;
  for(const [id,item] of this.items){const age=this.clock-item.born,p=positions.find(p=>p.id===id);
   if(age>=.5||!p||p.visible===false){item.node.remove();this.items.delete(id);continue;}
   const fade=Math.min(1,(.5-age)/.16);
   Object.assign(item.node.style,{visibility:'visible',left:p.x+'px',top:Math.max(22,p.y-8-(reduced?0:4*Math.min(1,age/.3)))+'px',opacity:String(fade)});
  }
  for(let i=this.numbers.length-1;i>=0;i--){const item=this.numbers[i],age=this.clock-item.born,p=positions.find(p=>p.id===item.id);
   if(age>=.9||!p||p.visible===false){item.node.remove();this.numbers.splice(i,1);continue;}
   const anchor=item.point&&project?project(item.point):p,travel=reduced?0:Math.min(1,age/.9),x=anchor.x+item.side*(7+travel*10),y=anchor.y-6-travel*27;
   Object.assign(item.node.style,{visibility:'visible',left:x+'px',top:Math.max(14,y)+'px',opacity:String(Math.min(1,(.9-age)/.25))});
  }
 }
}
