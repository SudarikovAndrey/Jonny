/* Actionable Johnny advice points to the real control, without copying or moving it. */
(()=>{
 const tip=document.getElementById('tip');
 const byHint={tapRow:'tilebar',jail:'bRoll',insp:'bRoll',shipHot:'bShip',twoSessions:'bShip'};
 let target=null,layer=null,pending=null,raf=0;
 function visible(el){if(!el||el.disabled)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none';}
 function choose(text,id){
  const explicit=id&&document.getElementById(id);if(visible(explicit))return explicit;
  let ids=[];
  if(/(Нажми|жми|Жми).*строк|жми мигающую строку/.test(text))ids=['tilebar'];
  else if(/Сначала отправь пробную посылку/.test(text))ids=['bShip'];
  else if(/Купи этот бизнес/.test(text))ids=['bBuy','tilebar'];
  else if(/Закупи хотя бы один товар/.test(text))ids=['wAll','tilebar'];
  return ids.map(id=>document.getElementById(id)).find(visible)||null;
 }
 function clear(){
  cancelAnimationFrame(raf);target?.classList.remove('advice-action');target=null;
  layer?.remove();layer=null;document.body.classList.remove('advice-targeting');
 }
 function rect(el,x,y,w,h){Object.assign(el.style,{left:x+'px',top:y+'px',width:Math.max(0,w)+'px',height:Math.max(0,h)+'px'});}
 function place(){
  if(!layer||!target)return;
  if(tip.hidden||!visible(target)||!document.body.classList.contains('coach-tip-open')){clear();return;}
  const b=target.getBoundingClientRect(),w=innerWidth,h=innerHeight;
  if(b.bottom<0||b.top>h){clear();return;}
  let tr=tip.getBoundingClientRect();
  // Leave a visible arrow corridor; the card's composition itself stays unchanged.
  if(tip.classList.contains('tip-standalone')&&b.top>h/2&&tr.bottom>b.top-70){
   tip.style.top=Math.max(16,b.top-70-tip.offsetHeight)+'px';tr=tip.getBoundingClientRect();
  }
  const left=Math.max(0,b.left-5),right=Math.min(w,b.right+5),top=Math.max(0,b.top-5),bottom=Math.min(h,b.bottom+7);
  const panes=layer.querySelectorAll('.advice-shade');
  rect(panes[0],0,0,w,top);rect(panes[1],0,bottom,w,h-bottom);
  rect(panes[2],0,top,left,bottom-top);rect(panes[3],right,top,w-right,bottom-top);
  rect(layer.querySelector('.advice-ring'),left-1,top-1,right-left+2,bottom-top+2);
  const down=b.top+b.height/2>tr.top+tr.height/2;
  const buttonPart=target.id==='tilebar'?target.querySelector('b')?.getBoundingClientRect():null;
  const ex=buttonPart?buttonPart.left+buttonPart.width/2:b.left+b.width/2;
  const sy=down?tr.bottom+10:tr.top-12,ey=down?top-12:bottom+12;
  const sx=Math.min(tr.right-28,Math.max(tr.left+28,ex-32)),mid=(sy+ey)/2;
  const d=`M ${sx} ${sy} C ${sx-12} ${mid}, ${ex+10} ${mid}, ${ex} ${ey}`;
  layer.querySelectorAll('.advice-line').forEach(p=>p.setAttribute('d',d));
  const dir=down?1:-1;
  layer.querySelector('.advice-head').setAttribute('d',`M ${ex-10} ${ey-dir*11} L ${ex} ${ey+dir*3} L ${ex+10} ${ey-dir*11} Z`);
 }
 function attach(el){
  target=el;target.classList.add('advice-action');document.body.classList.add('advice-targeting');
  layer=document.createElement('div');layer.className='advice-pointer';layer.setAttribute('aria-hidden','true');
  layer.innerHTML='<div class="advice-shade"></div>'.repeat(4)+'<div class="advice-ring"></div><svg><path class="advice-line advice-edge"/><path class="advice-line advice-ink"/><path class="advice-line advice-red"/><path class="advice-head"/></svg>';
  document.body.append(layer);place();
  const until=performance.now()+350;const settle=()=>{place();if(layer&&performance.now()<until)raf=requestAnimationFrame(settle);};raf=requestAnimationFrame(settle);
 }
 const originalShow=showTip,originalHide=hideTip,originalPosition=positionTip,originalHint=hint;
 hint=function(id,text){const before=pending;pending=byHint[id]||null;try{return originalHint.apply(this,arguments);}finally{pending=before;}};
 showTip=function(text,targetId){clear();const result=originalShow.apply(this,arguments);if(!tip.hidden){const el=choose(text,targetId||pending);if(el)attach(el);}return result;};
 hideTip=function(){clear();return originalHide.apply(this,arguments);};
 positionTip=function(){const result=originalPosition.apply(this,arguments);place();return result;};
 new MutationObserver(()=>{if(tip.hidden)clear();}).observe(tip,{attributes:true,attributeFilter:['hidden']});
 addEventListener('resize',place);visualViewport?.addEventListener('resize',place);
 document.addEventListener('scroll',place,true);
})();
