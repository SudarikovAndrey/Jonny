/* Slot-machine timing and printed confetti, applied only after a real upgrade.
   Observe the existing click/commit path; never change money, levels or goods. */
(() => {
 const card=document.getElementById('card'),modal=document.getElementById('modal');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let generation=0,cleanup=()=>{};
 function stop(){generation++;cleanup();cleanup=()=>{};delete card.dataset.upgradeFx;}
 const sound=key=>{try{GameFeedback.sound(key);}catch{}};
 const current=()=>S.tiles.find(t=>String(t.i)===card.dataset.propertyId);
 card.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(!button||button.disabled||!['kUp','kCap','kSal','kEvo'].includes(button.id))return;
  const tile=current(),oldImage=card.querySelector('.property-illustration');
  if(!tile||!oldImage||tile.type!=='kiosk')return;
  stop();
  const token=generation,old={id:tile.i,good:tile.good,cap:tile.capLvl,sales:tile.salesLvl,src:oldImage.src};
  // The game commits synchronously; decorators settle before this frame.
  requestAnimationFrame(async()=>{
   const next=current(),picture=card.querySelector('.property-picture'),image=picture?.querySelector('.property-illustration');
   if(token!==generation||modal.hidden||!next||next.i!==old.id||!image)return;
   if(next.good===old.good&&next.capLvl===old.cap&&next.salesLvl===old.sales)return;
   const evolution=next.good!==old.good,changed=image.src!==old.src;
   const duration=evolution?1600:changed?850:520;
   const animations=[],nodes=[];let timer;
   cleanup=()=>{clearTimeout(timer);animations.forEach(a=>a.cancel());nodes.forEach(n=>n.remove());};
   const animate=(element,frames,options)=>{const a=element.animate(frames,options);animations.push(a);return a;};
   const add=(className,parent=picture)=>{const e=document.createElement('span');e.className=className;e.setAttribute('aria-hidden','true');parent.append(e);nodes.push(e);return e;};
   card.dataset.upgradeFx=evolution?'evolution':changed?'format':'level';
   if(reduced.matches){
    animate(image,[{opacity:.6},{opacity:1}],{duration:140});
    timer=setTimeout(stop,160);return;
   }
   // Keep the previous illustration visible until the next one has decoded.
   let ghost;
   if(changed){ghost=document.createElement('img');ghost.src=old.src;ghost.alt='';ghost.className='property-fx-old';picture.append(ghost);nodes.push(ghost);}
   const held=animate(image,[{opacity:0},{opacity:0}],{duration:1,fill:'forwards'});
   if(changed)await Promise.race([image.decode().catch(()=>{}),new Promise(resolve=>setTimeout(resolve,600))]);
   if(token!==generation||!image.isConnected||modal.hidden)return;
   held.cancel();
   sound(evolution?'dance':changed?'joy':'dice_hit');
   const rays=add('property-fx-rays'+(evolution?' major':''));
   animate(rays,[{opacity:0,transform:'scale(.25) rotate(-15deg)'},{opacity:evolution?.85:.5,transform:'scale(1.05) rotate(0deg)',offset:.25},{opacity:0,transform:'scale(1.2) rotate(20deg)'}],{duration,easing:'ease-out'});
   if(ghost)animate(ghost,[{opacity:1,transform:'none'},{opacity:.7,transform:'translateY(-16px) scale(1.08) rotate(-3deg)',offset:.35},{opacity:0,transform:'translateY(-42px) scale(.65) rotate(-12deg)'}],{duration:evolution?260:170,fill:'forwards',easing:'steps(7,end)'});
   animate(image,[
    {opacity:0,transform:`translateY(${evolution?40:18}px) scale(${evolution?.35:.78}) rotate(-7deg)`},
    {opacity:1,transform:`translateY(-8px) scale(${evolution?1.16:1.07}) rotate(2deg)`,offset:.55},
    {opacity:1,transform:'translateY(2px) scale(.97) rotate(-1deg)',offset:.8},
    {opacity:1,transform:'none'}
   ],{duration:evolution?680:changed?480:330,delay:changed?90:0,fill:'backwards',easing:'steps(12,end)'});
   const bits=add('property-fx-bits');
   const count=evolution?54:changed?26:10;
   for(let i=0;i<count;i++){
    const bit=document.createElement('i'),coin=i%4===0,bill=evolution&&i%7===0;
    bit.className='property-fx-bit'+(bill?' bill':coin?' coin':'');
    if(!coin&&!bill)bit.style.backgroundColor=['#c43a2d','#f0c44e','#3f6f98'][i%3];
    bits.append(bit);
    const angle=(i/count)*Math.PI*2+(Math.random()-.5)*.4;
    const radius=(evolution?85:changed?62:38)+Math.random()*(evolution?95:45);
    const x=Math.cos(angle)*radius,y=Math.sin(angle)*radius-35;
    const turn=(Math.random()-.5)*540,delay=changed?90:0;
    animate(bit,[{opacity:0,transform:'translate(0,0) scale(.3) rotate(0deg)'},{opacity:1,transform:`translate(${x*.7}px,${y}px) scale(1) rotate(${turn*.5}deg)`,offset:.38},{opacity:0,transform:`translate(${x}px,${y+(evolution?170:70)}px) scale(.7) rotate(${turn}deg)`}],{duration:duration-100+Math.random()*150,delay,fill:'both',easing:'steps(16,end)'});
   }
   if(evolution){
    const ring=add('property-fx-ring');
    animate(ring,[{opacity:.9,transform:'scale(.2)'},{opacity:.7,offset:.35},{opacity:0,transform:'scale(1.8)'}],{duration:640,easing:'ease-out'});
    animate(picture,[{transform:'translateX(0)'},{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'translateX(-3px)'},{transform:'none'}],{duration:260,delay:180});
   }
   const badge=card.querySelector('.srow .lvl');
   if(badge)animate(badge,[{transform:'scale(1)'},{transform:'scale(1.16)',offset:.4},{transform:'scale(1)'}],{duration:360,delay:150});
   timer=setTimeout(()=>{if(token===generation)stop();},duration+250);
  });
 },true);
 new MutationObserver(()=>{if(modal.hidden||modal.classList.contains('closing'))stop();}).observe(modal,{attributes:true,attributeFilter:['hidden','class']});
 reduced.addEventListener('change',stop);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
})();
