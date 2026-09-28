/* Opt-in material study. Varnish is cut to the artwork alpha; paper stays matte. */
window.SpotVarnish=(()=>{
 const enabled=new URLSearchParams(location.search).get('varnish')==='1';
 if(!enabled)return {attach(){},spin(){}};
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),items=new Map();let on=true,rotating=false;
 const paused=()=>!on||document.hidden||reduced.matches;
 function attach(root=document){
  for(const img of root.querySelectorAll('.property-illustration,.evolution-face>img')){
   if(items.has(img))continue;
   const layer=document.createElement('span');layer.className='spot-varnish spot-varnish-art';layer.setAttribute('aria-hidden','true');
   const band=document.createElement('i');layer.append(band);img.after(layer);
   const fit=()=>{if(!img.isConnected)return;layer.style.left=img.offsetLeft+'px';layer.style.top=img.offsetTop+'px';layer.style.width=img.offsetWidth+'px';layer.style.height=img.offsetHeight+'px';layer.style.maskImage=`url("${img.currentSrc||img.src}")`;layer.style.webkitMaskImage=layer.style.maskImage;};
   const observer=new ResizeObserver(fit);observer.observe(img);img.addEventListener('load',fit);fit();
   items.set(img,{layer,band,dispose:()=>{observer.disconnect();img.removeEventListener('load',fit);layer.remove();}});
  }
  for(const button of root.querySelectorAll('#card.print-property .property-actions button:not(.qm),.evolution-done')){
   if(items.has(button))continue;
   const layer=document.createElement('span');layer.className='spot-varnish spot-varnish-button';layer.setAttribute('aria-hidden','true');const band=document.createElement('i');layer.append(band);button.append(layer);button.classList.add('varnish-button');
   items.set(button,{layer,band,dispose:()=>layer.remove()});
  }
 }
 function sweep(root=document){
  if(paused()||rotating)return;
  attach(root);let i=0;
  for(const [target,item]of items){
   if(!target.isConnected){item.dispose();items.delete(target);continue;}
   if(!root.contains(target)||!target.getClientRects().length||target.closest('[hidden]')||target.disabled)continue;
   if(target.closest('#card')&&document.querySelector('dialog[open]'))continue;
   if(target.closest('.evolution-before'))continue;
   item.layer.getAnimations().forEach(a=>a.cancel());item.band.getAnimations().forEach(a=>a.cancel());
   const delay=(i++%2)*220;
   item.layer.animate([{opacity:0},{opacity:target.tagName==='IMG'?.44:.28,offset:.24},{opacity:target.tagName==='IMG'?.44:.28,offset:.72},{opacity:0}],{duration:1350,delay,easing:'ease-in-out'});
   item.band.animate([{transform:'translateX(-65%)'},{transform:'translateX(65%)'}],{duration:1350,delay,easing:'cubic-bezier(.3,.1,.45,1)'});
  }
 }
 function spin(root,animation){
  if(paused())return;
  attach(root);rotating=true;
  const surfaces=[...items].filter(([target])=>root.contains(target)).map(([,item])=>item);
  surfaces.forEach(({layer,band})=>{layer.getAnimations().forEach(a=>a.cancel());band.getAnimations().forEach(a=>a.cancel());});
  let frame;
  const clear=()=>{cancelAnimationFrame(frame);rotating=false;surfaces.forEach(({layer,band})=>{layer.style.opacity='';band.style.transform='';});};
  const tick=()=>{
   if(paused()||!root.isConnected||animation.playState!=='running'){clear();return;}
   // Derive the highlight from the real card angle, including its easing.
   const m=new DOMMatrixReadOnly(getComputedStyle(root).transform),sine=m.m13;
   for(const {layer,band}of surfaces){
    const side=layer.closest('.evolution-after')?-1:1;
    layer.style.opacity=String(.12+Math.abs(sine)*.48);
    band.style.transform=`translateX(${sine*side*52}%)`;
   }
   frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);animation.finished.then(clear,clear);
 }
 function tidy(){for(const [target,item]of items)if(!target.isConnected){item.dispose();items.delete(target);}attach();}
 let queued=false;
 new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;tidy();});}).observe(document.body,{childList:true,subtree:true});
 document.documentElement.classList.add('varnish-study-on');
 if(typeof UI_REVIEW!=='undefined'&&UI_REVIEW){
  const toolbar=document.createElement('div');toolbar.className='varnish-review-controls';
  toolbar.innerHTML='<button type="button" aria-pressed="true">Лак: вкл</button><button type="button">Показать блик</button><button type="button">Наклонить</button>';
  const toggle=toolbar.firstElementChild;toggle.onclick=()=>{on=!on;toggle.textContent=on?'Лак: вкл':'Лак: выкл';toggle.setAttribute('aria-pressed',String(on));document.documentElement.classList.toggle('varnish-study-on',on);if(on)sweep();};
  toolbar.children[1].onclick=()=>sweep();
  let previewTurn;
  toolbar.lastElementChild.onclick=()=>{
   const card=document.querySelector('#card.print-property');
   if(!card||card.closest('[hidden]')||reduced.matches||previewTurn?.playState==='running')return;
   previewTurn=card.animate([{transform:'perspective(1000px) rotateY(0deg)'},{transform:'perspective(1000px) rotateY(-24deg)',offset:.25},{transform:'perspective(1000px) rotateY(24deg)',offset:.7},{transform:'perspective(1000px) rotateY(0deg)'}],{duration:2200,easing:'ease-in-out'});
   spin(card,previewTurn);
  };
  document.body.append(toolbar);
 }
 attach();setTimeout(()=>sweep(),900);setInterval(()=>sweep(),11000);
 return {attach,spin,sweep};
})();
