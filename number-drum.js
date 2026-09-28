/* A quiet suitcase-style number wheel. Presentation only; values commit first. */
window.NumberDrum=(()=>{
 const active=new WeakMap();
 function parts(value){const m=String(value).trim().match(/^(\d+)(\s*\/\s*\d+)?$/);return m?{number:m[1],suffix:m[2]||''}:null;}
 function plan(before,after){
  const a=parts(before),b=parts(after);
  if(!a||!b||a.suffix!==b.suffix||Number(b.number)<=Number(a.number))return null;
  const width=Math.max(a.number.length,b.number.length),from=a.number.padStart(width,' '),to=b.number.padStart(width,' ');
  return {digits:[...to].map((digit,i)=>({from:from[i],to:digit,changed:from[i]!==digit})),suffix:b.suffix};
 }
 function read(el){return el?.dataset.drumValue||el?.textContent?.trim()||'';}
 function update(el,before){
  if(!el)return;
  const after=read(el),p=plan(before,after);
  active.get(el)?.();
  if(!p||matchMedia('(prefers-reduced-motion: reduce)').matches||CFG.SPEED>=100||(typeof UI_REVIEW!=='undefined'&&UI_REVIEW&&new URLSearchParams(location.search).has('reduced')))return;
  const animations=[];let done=false;
  const finish=()=>{if(done)return;done=true;animations.forEach(a=>a.cancel());el.textContent=after;el.classList.remove('number-drum');active.delete(el);};
  el.dataset.drumValue=after;el.classList.add('number-drum');
  const visual=document.createElement('span');visual.className='number-drum-face';visual.setAttribute('aria-hidden','true');
  p.digits.forEach(d=>{
   const cell=document.createElement('span');cell.className='number-drum-cell';
   if(d.changed){const strip=document.createElement('span');strip.className='number-drum-strip';
    for(const digit of [d.from,d.to]){const face=document.createElement('span');face.textContent=digit;strip.append(face);}cell.append(strip);
   }else cell.textContent=d.to;
   visual.append(cell);
  });
  const suffix=document.createElement('span');suffix.textContent=p.suffix;visual.append(suffix);
  const accessible=document.createElement('span');accessible.className='number-drum-readable';accessible.textContent=after;
  el.replaceChildren(visual,accessible);active.set(el,finish);
  visual.querySelectorAll('.number-drum-strip').forEach(strip=>animations.push(strip.animate([
   {transform:'translateY(0)'},{transform:'translateY(-50%)'}
  ],{duration:320,easing:'cubic-bezier(.22,.7,.25,1)',fill:'forwards'})));
  Promise.all(animations.map(a=>a.finished.catch(()=>{}))).then(finish);
 }
 return {read,update,plan};
})();
