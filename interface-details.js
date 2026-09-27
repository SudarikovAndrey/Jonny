/* Presentation only: existing game controls retain their handlers and state. */
(()=>{
 const button=document.getElementById('bRoll'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const space=document.createElement('span');space.className='roll-cube-space';space.setAttribute('aria-hidden','true');
 space.innerHTML='<img class="roll-cube-fallback" src="assets/icons/die.webp" alt="">';
 const label=document.createElement('span');label.className='roll-label';label.textContent='Бросить';button.append(space,label);button.setAttribute('aria-label','Бросить кубики');
 const originalRoll=button.onclick;let dismissing=false;
 button.onclick=async function(event){
  if(dismissing)return;
  const modal=document.getElementById('modal'),card=document.getElementById('card');
  if(!modal.hidden&&card.classList.contains('print-property')){
   if(card.inert)return;
   dismissing=true;closeModal();
   await new Promise(resolve=>setTimeout(resolve,160));dismissing=false;
   if(!modal.hidden)return;
  }
  return originalRoll.call(this,event);
 };
 button.addEventListener('pointerdown',()=>{if(!button.disabled&&!reduced.matches)space.classList.add('pressed');});
 const release=()=>space.classList.remove('pressed');
 document.addEventListener('pointerup',release,{passive:true});document.addEventListener('pointercancel',release,{passive:true});button.addEventListener('blur',release);
 let rolling=document.body.classList.contains('dice-rolling');
 new MutationObserver(()=>{
  const next=document.body.classList.contains('dice-rolling');if(next===rolling)return;
  rolling=next;release();space.classList.remove('landed');
  if(!rolling&&!reduced.matches)space.classList.add('landed');
 }).observe(document.body,{attributes:true,attributeFilter:['class']});
 space.addEventListener('animationend',()=>space.classList.remove('landed'));
 document.addEventListener('visibilitychange',()=>document.body.classList.toggle('page-hidden',document.hidden));
 function stockBars(){
  document.querySelectorAll('.warehouse-list .wr').forEach(row=>{
   if(row.querySelector('.wh-stock-track'))return;
   const meter=row.querySelector('[role=meter]');if(!meter)return;
   const bar=document.createElement('span');bar.className='wh-stock-track';bar.setAttribute('aria-hidden','true');
   const max=Number(meter.getAttribute('aria-valuemax')),now=Number(meter.getAttribute('aria-valuenow'));
   bar.style.setProperty('--stock',`${max?Math.min(100,now/max*100):0}%`);row.append(bar);
  });
 }
 new MutationObserver(stockBars).observe(document.getElementById('card'),{childList:true,subtree:true});stockBars();
})();
