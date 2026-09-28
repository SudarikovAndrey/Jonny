/* Presentation only. Observe a committed upgrade; never charge or evolve a tile here. */
window.PropertyUpgradeFx=(()=>{
 const card=document.getElementById('card'),modal=document.getElementById('modal');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let generation=0,cleanup=()=>{},revealing=false;
 const simple=()=>reduced.matches||CFG.SPEED>=100||(typeof UI_REVIEW!=='undefined'&&UI_REVIEW&&new URLSearchParams(location.search).has('reduced'));
 function stop(){generation++;cleanup();cleanup=()=>{};revealing=false;delete card.dataset.upgradeFx;}
 const current=()=>S.tiles.find(t=>String(t.i)===card.dataset.propertyId);
 const snapshot=(tile,image)=>({id:tile.i,good:tile.good,cap:tile.capLvl,sales:tile.salesLvl,capacity:cap(tile),volume:sales(tile),src:image.src,name:good(tile.good)?.name||tile.good});
 const changeKind=(a,b)=>a.good!==b.good?'evolution':a.cap!==b.cap||a.sales!==b.sales?'level':'none';
 function ordinary(old,next,picture,image){
  const animations=[],nodes=[];let timer;
  cleanup=()=>{clearTimeout(timer);animations.forEach(a=>a.cancel());nodes.forEach(n=>n.remove());};
  const animate=(el,frames,options)=>{if(el)animations.push(el.animate(frames,options));};
  // An unchanged illustration stays absolutely still, even during rapid upgrades.
  // A new shop format fades in place; its silhouette never bounces or rotates.
  if(old.src!==next.src){
   const ghost=document.createElement('img');ghost.src=old.src;ghost.alt='';ghost.className='property-fx-old';picture.append(ghost);nodes.push(ghost);
   animate(ghost,[{opacity:1},{opacity:0}],{duration:simple()?100:260,fill:'forwards',easing:'ease-out'});
  }
  // The level badge uses the shared clipped number drum in shopFrame.
  card.querySelectorAll('.uup-stat').forEach((stat,i)=>{
   const changed=i===0?next.capacity!==old.capacity:next.volume!==old.volume;
   if(changed)animate(stat,[{backgroundColor:'#eac36599'},{backgroundColor:'#eac36500'}],{duration:simple()?120:650,easing:'ease-out'});
  });
  timer=setTimeout(stop,simple()?160:700);
 }
 // Freeze the actual printed sheet, including its computed layout. No second UI design.
 function freezeSheet(){
  const rect=card.getBoundingClientRect(),copy=card.cloneNode(true);
  const originals=[card,...card.querySelectorAll('*')],copies=[copy,...copy.querySelectorAll('*')];
  originals.forEach((source,i)=>{
   const target=copies[i],style=getComputedStyle(source);
   for(const key of style)target.style.setProperty(key,style.getPropertyValue(key));
   target.removeAttribute('id');target.removeAttribute('autofocus');
   target.style.animation='none';target.style.transition='none';
   if(target.tagName==='BUTTON')target.disabled=true;
   // Printed surfaces sometimes live on pseudo-elements; retain those ink layers.
   for(const pseudo of ['::before','::after']){
    const ps=getComputedStyle(source,pseudo);
    if(!ps.content||ps.content==='none'||ps.content==='normal'||ps.display==='none')continue;
    const layer=document.createElement('span');for(const key of ps)layer.style.setProperty(key,ps.getPropertyValue(key));
    layer.textContent=ps.content==='""'?'':ps.content.replace(/^"|"$/g,'');layer.style.pointerEvents='none';
    pseudo==='::before'?target.prepend(layer):target.append(layer);
   }
  });
  copy.className='evolution-sheet-copy';copy.inert=true;copy.setAttribute('aria-hidden','true');
  Object.assign(copy.style,{position:'absolute',inset:'0',margin:'0',width:rect.width+'px',height:rect.height+'px',maxHeight:'none',maxWidth:'none',transform:'none',opacity:'1',visibility:'visible',pointerEvents:'none',boxSizing:'border-box'});
  return {node:copy,rect};
 }
 function evolution(old,next){
  revealing=true;
  hideTip();
  if(typeof PaperMotion!=='undefined')PaperMotion.stop(card);
  const before=old.sheet||freezeSheet(),after=freezeSheet();
  const dialog=document.createElement('dialog');dialog.className='property-evolution';dialog.setAttribute('aria-label','Новый товар: '+next.name);
  dialog.innerHTML='<div class="evolution-flight"><div class="evolution-turner"><div class="evolution-face evolution-before"></div><div class="evolution-face evolution-after"></div></div></div><p class="evolution-announcement" role="status"></p>';
  dialog.querySelector('.evolution-announcement').textContent='Новый товар: '+next.name;
  const flight=dialog.querySelector('.evolution-flight'),turner=dialog.querySelector('.evolution-turner');
  dialog.querySelector('.evolution-before').append(before.node);dialog.querySelector('.evolution-after').append(after.node);
  Object.assign(flight.style,{left:after.rect.left+'px',top:after.rect.top+'px',width:after.rect.width+'px',height:after.rect.height+'px'});
  before.node.style.transformOrigin='0 0';before.node.style.transform=`scale(${after.rect.width/before.rect.width},${after.rect.height/before.rect.height})`;
  const animations=[];let disposed=false,started=false,frame;
  const wasInert=card.inert;
  const animate=(el,frames,options)=>{const a=el.animate(frames,options);animations.push(a);return a;};
  function complete(){if(disposed)return;stop();if(!modal.hidden)card.querySelector('#kUp,#kEvo,#xNo')?.focus({preventScroll:true});}
  const onReduced=()=>{if(reduced.matches)complete();},onVisibility=()=>{if(document.hidden)complete();},onResize=()=>complete();
  cleanup=()=>{disposed=true;cancelAnimationFrame(frame);animations.forEach(a=>a.cancel());card.style.visibility='';card.inert=wasInert;reduced.removeEventListener('change',onReduced);document.removeEventListener('visibilitychange',onVisibility);window.removeEventListener('resize',onResize);if(dialog.open)dialog.close();dialog.remove();};
  dialog.addEventListener('cancel',e=>{e.preventDefault();complete();});
  reduced.addEventListener('change',onReduced);document.addEventListener('visibilitychange',onVisibility);window.addEventListener('resize',onResize);
  document.body.append(dialog);dialog.showModal();card.style.visibility='hidden';card.inert=true;
  const begin=()=>{
   if(disposed||started)return;started=true;
   if(simple()){complete();return;}
   // One physical sheet: lift slightly, turn, settle exactly onto the live next state.
   const turn=animate(turner,[
    {transform:'rotateY(0deg)'},
    {transform:'rotateY(-9deg)',offset:.10},
    {transform:'rotateY(900deg)',offset:.86},
    {transform:'rotateY(900deg)'}
   ],{duration:1520,easing:'cubic-bezier(.35,0,.2,1)',fill:'forwards'});
   const dx=before.rect.left-after.rect.left,dy=before.rect.top-after.rect.top;
   animate(flight,[
    {transform:`translate(${dx}px,${dy}px) scale(${before.rect.width/after.rect.width},${before.rect.height/after.rect.height}) rotateZ(0deg)`},
    {transform:'translate(0,-5px) scale(.985) rotateZ(-.65deg)',offset:.14},
    {transform:'translate(0,-9px) scale(.97) rotateZ(.55deg)',offset:.50},
    {transform:'translate(0,-3px) scale(1.008) rotateZ(-.18deg)',offset:.86},
    {transform:'translate(0,0) scale(1) rotateZ(0deg)'}
   ],{duration:1520,easing:'cubic-bezier(.25,.65,.3,1)',fill:'forwards'});
   window.SpotVarnish?.spin(turner,turn);
   try{GameFeedback.sound('dance');}catch{}
   turn.finished.then(complete).catch(()=>{});
  };
  // Keep the old face visible while the incoming art decodes; never flash the new sheet early.
  const incoming=after.node.querySelector('.property-illustration');
  // A decoded image is nice to have, but it is not allowed to hold the sheet
  // turn forever when a browser keeps an image decode promise pending.
  const decode=Promise.resolve(incoming?.decode?.()).catch(()=>{});
  Promise.race([decode,new Promise(resolve=>setTimeout(resolve,420))]).then(()=>{frame=requestAnimationFrame(begin);});
 }
 card.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(!button||button.disabled||!['kUp','kCap','kSal','kEvo'].includes(button.id))return;
  if(revealing){event.preventDefault();event.stopImmediatePropagation();return;}
  const tile=current(),oldImage=card.querySelector('.property-illustration');if(!tile||!oldImage||tile.type!=='kiosk')return;
  stop();const token=generation,old=snapshot(tile,oldImage);
  if(button.id==='kEvo')old.sheet=freezeSheet();
  requestAnimationFrame(()=>{
   const tile=current(),picture=card.querySelector('.property-picture'),image=picture?.querySelector('.property-illustration');
   if(token!==generation||modal.hidden||!tile||tile.i!==old.id||!image)return;
   const next=snapshot(tile,image),kind=changeKind(old,next);if(kind==='none')return;
   card.dataset.upgradeFx=kind;
   if(kind==='evolution')evolution(old,next);else ordinary(old,next,picture,image);
  });
 },true);
 new MutationObserver(()=>{if(modal.hidden||modal.classList.contains('closing'))stop();}).observe(modal,{attributes:true,attributeFilter:['hidden','class']});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&!revealing)stop();});
 return {changeKind,stop,get busy(){return revealing;}};
})();
