// One resource header for all board minigames, using the core's own currency art.
window.MinigameShell={
 attach(layer,frame){
  const app=$('app'),bar=document.createElement('div');bar.className='sl-res';
  bar.setAttribute('aria-label','Ресурсы игрока');
  const sources=[];
  for(const id of ['sCash','sHard']){
   const source=$(id)?.closest('.cur');if(!source)continue;
   const copy=source.cloneNode(true);copy.removeAttribute('id');copy.removeAttribute('style');
   copy.querySelectorAll('[id]').forEach(n=>{n.dataset.mirror=n.id;n.removeAttribute('id');});
   bar.append(copy);sources.push(source);
  }
  const sync=()=>bar.querySelectorAll('[data-mirror]').forEach(n=>{const source=$(n.dataset.mirror);if(source&&n.innerHTML!==source.innerHTML)n.innerHTML=source.innerHTML;});
  const observer=new MutationObserver(sync);sources.forEach(s=>observer.observe(s,{subtree:true,childList:true,characterData:true}));
  layer.classList.add('minigame-layer');frame.classList.add('minigame-frame');layer.prepend(bar);
  const fit=()=>{const r=app.getBoundingClientRect();Object.assign(layer.style,{left:Math.round(r.left)+'px',right:'auto',width:Math.round(r.width)+'px'});};
  fit();addEventListener('resize',fit);sync();
  return ()=>{observer.disconnect();removeEventListener('resize',fit);};
 }
};
