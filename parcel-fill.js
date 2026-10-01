/* Animate the draft cargo only. Stock and points are committed by mSend. */
const ParcelFill=(()=>{
 const active=new WeakMap(),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 async function run({card,current,target,render}){
  const previous=active.get(card);
  if(previous?.body.isConnected)return;
  const draft={...current},steps=[];
  // Remove goods displaced by the optimal cargo before adding its new goods.
  // Места бывают неполными (tools/parcel_partial.py): последний шаг — дробный остаток.
  const E=1e-9;
  for(const id of Object.keys(target))for(let n=draft[id]||0;n>target[id]+E;){const d=Math.min(1,n-target[id]);steps.push([id,-d]);n-=d;}
  for(const id of Object.keys(target))for(let n=draft[id]||0;n<target[id]-E;){const d=Math.min(1,target[id]-n);steps.push([id,d]);n+=d;}
  if(!steps.length)return;
  if(reduced.matches||CFG.SPEED>=100){render({...target});return;}
  const state={body:card.querySelector('.pc-body')};active.set(card,state);
  const modal=card.closest('#modal');
  const alive=()=>active.get(card)===state&&state.body.isConnected&&!modal.hidden&&!modal.classList.contains('closing');
  const paint=()=>{
   const scroll=state.body.scrollTop;
   render({...draft});state.body=card.querySelector('.pc-body');state.body.scrollTop=scroll;
   card.setAttribute('aria-busy','true');
   card.querySelectorAll('.pc-step,#mAuto,#mSend,#mSlotH').forEach(button=>button.disabled=true);
   card.querySelector('#mAuto').textContent='Загружаем…';
  };
  const interval=Math.max(80,Math.min(200,1800/steps.length));
  try{
   paint();await pause(80);
   for(const [id,delta] of steps){
    if(!alive())return;
    draft[id]+=delta;paint();
    if(delta>0){
     let index=-1;for(const key of Object.keys(draft)){index+=Math.ceil(draft[key]-1e-9);if(key===id)break;}
     const icon=card.querySelectorAll('.pc-slot')[index]?.querySelector('img');
     icon?.animate([
      {opacity:0,transform:'translateY(-14px) rotate(-8deg) scale(.8)'},
      {opacity:1,transform:'translateY(2px) rotate(2deg) scale(1.04)',offset:.7},
      {opacity:1,transform:'translateY(0) rotate(0) scale(1)'}
     ],{duration:interval,easing:'cubic-bezier(.2,.7,.25,1)'});
    }
    await pause(interval);
   }
   if(alive()){
    const scroll=state.body.scrollTop;render({...target});
    card.querySelector('.pc-body').scrollTop=scroll;
   }
  }finally{
   if(active.get(card)===state){active.delete(card);card.removeAttribute('aria-busy');}
  }
 }
 return {run};
})();
