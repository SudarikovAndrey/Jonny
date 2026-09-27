/* Turn the actual card at purchase. There is only one live face and one handler.
   Commit at the edge, then reveal the freshly rendered owned state. */
window.PropertyPurchase = (() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let busy=false,animation=null;
 async function run(tile,commit){
  const card=document.getElementById('card'),modal=document.getElementById('modal');
  if(busy||tile.owner||S.cash<tile.price||modal.hidden)return;
  // Points open their owned state immediately; business purchases keep their turn.
  if(tile.type==='kiosk'){commit();return;}
  busy=true;card.inert=true;
  const stillHere=()=>!modal.hidden&&!modal.classList.contains('closing')&&card.dataset.propertyId===String(tile.i);
  try{
   if(typeof PaperMotion!=='undefined')PaperMotion.stop(card);
   if(!reduced.matches&&CFG.SPEED<100){
    card.dataset.purchaseMotion='out';
    animation=card.animate([
     {transform:'perspective(1000px) rotateY(0deg) rotateZ(0deg)'},
     {transform:'perspective(1000px) rotateY(-10deg) rotateZ(-1deg)',offset:.25},
     {transform:'perspective(1000px) rotateY(-90deg) rotateZ(-1deg)'}
    ],{duration:135,easing:'cubic-bezier(.45,0,.8,.4)',fill:'forwards'});
    await animation.finished;
   }
   if(!stillHere())return;
   commit();
   // Allow the existing upgrade/layout decorators to move their live controls.
   await new Promise(resolve=>requestAnimationFrame(resolve));
   animation?.cancel();animation=null;
   if(!stillHere())return;
   if(!reduced.matches&&CFG.SPEED<100){
    card.dataset.purchaseMotion='in';
    animation=card.animate([
     {transform:'perspective(1000px) rotateY(90deg) rotateZ(1deg)'},
     {transform:'perspective(1000px) rotateY(-3deg) rotateZ(-.3deg)',offset:.8},
     {transform:'perspective(1000px) rotateY(0deg) rotateZ(0deg)'}
    ],{duration:205,easing:'cubic-bezier(.15,.8,.25,1)'});
    await animation.finished;
   }
   card.dataset.purchaseMotion='complete';
  }catch(error){if(error.name!=='AbortError')console.error(error);}
  finally{animation?.cancel();animation=null;card.inert=false;busy=false;}
 }
 new MutationObserver(()=>{
  const modal=document.getElementById('modal');
  if(modal.hidden||modal.classList.contains('closing'))animation?.cancel();
 }).observe(document.getElementById('modal'),{attributes:true,attributeFilter:['hidden','class']});
 reduced.addEventListener('change',()=>{if(reduced.matches)animation?.finish();});
 return {run};
})();
