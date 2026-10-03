// Presentation only: use the table's published victory progress, never calculate money.
(()=>{
 const previous=new Map();
 function sync(){
  const bar=document.getElementById('mpBar'),players=window.MP?.view?.players;
  if(!bar||!players)return;
  const ranked=players.slice().sort((a,b)=>(b.win?.value??0)-(a.win?.value??0)||a.seat-b.seat);
  bar.querySelectorAll('.mp-chip').forEach(chip=>{
   const pid=chip.dataset.pid,p=players.find(p=>p.pid===pid);if(!p)return;
   const place=ranked.findIndex(p=>p.pid===pid)+1;
   chip.style.order=String(place);chip.dataset.place=String(place);
   chip.setAttribute('role','button');chip.tabIndex=0;
   chip.setAttribute('aria-label',`${place} место: ${p.name}. ${p.win?.text||''}. Показать подробности игроков`);
   chip.title=chip.getAttribute('aria-label');
   const old=previous.get(pid),r=chip.getBoundingClientRect();
   if(old&&old.place!==place&&matchMedia('(max-width:600px)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
    chip.animate([{transform:`translateY(${old.y-r.y}px)`},{transform:'translateY(0)'}],{duration:280,easing:'cubic-bezier(.2,.7,.2,1)'});
   }
   previous.set(pid,{place,y:r.y});
  });
 }
 function open(e){const chip=e.target.closest?.('.mp-chip');if(!chip)return;if(e.type==='keydown'&&!['Enter',' '].includes(e.key))return;e.preventDefault();document.getElementById('bJohnny')?.click();}
 function mount(){
  document.addEventListener('click',open);document.addEventListener('keydown',open);
  let scheduled=false;
  new MutationObserver(records=>{
   if(!records.some(r=>r.target.id==='mpBar'||r.target.classList?.contains('mp-chips')))return;
   if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;sync();});
  }).observe(document.body,{childList:true,subtree:true});
  addEventListener('resize',sync);sync();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
