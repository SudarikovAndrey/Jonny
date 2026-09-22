/* Fast physical paper motion. Game promises never wait for decorative motion. */
const PaperMotion=(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const running=new Map();
 const time={enter:220,small:180,exit:130};
 function stop(el){const a=running.get(el);if(a){a.cancel();running.delete(el);}el?.removeAttribute('data-paper-moving');}
 function play(el,kind='card',exit=false){
  if(!el)return null;
  const previous=running.has(el)?getComputedStyle(el):null;
  const previousTransform=previous?.transform,previousOpacity=previous?.opacity;
  stop(el);
  if(reduced.matches||CFG.SPEED>=100)return null;
  const cs=getComputedStyle(el),base=cs.transform==='none'?'':cs.transform;
  const small=kind==='small',duration=exit?time.exit:small?time.small:time.enter;
  const pose=(y,x,z,s)=>`${base} perspective(1000px) translate3d(0,${y}px,0) rotateX(${x}deg) rotateZ(${z}deg) scale(${s})`;
  const frames=exit?[
   {transform:previousTransform||pose(0,0,0,1),opacity:previousOpacity||1,offset:0},
   {transform:pose(-3,-2,.45,1.012),opacity:1,offset:.2},
   {transform:pose(small?-22:42,small?5:-9,small?-1.4:1.8,.95),opacity:0,offset:1}
  ]:[
   {transform:pose(small?-22:48,small?-9:13,small?1.5:-2.2,.93),opacity:0,offset:0},
   {transform:pose(-3,-1.4,.4,1.012),opacity:1,offset:.7},
   {transform:pose(0,0,0,1),opacity:1,offset:1}
  ];
  const a=el.animate(frames,{duration,easing:exit?'cubic-bezier(.4,0,.8,.4)':'cubic-bezier(.16,.78,.24,1)',fill:exit?'forwards':'none'});
  a.id=exit?'paper-exit':'paper-enter';running.set(el,a);el.dataset.paperMoving=exit?'out':'in';
  a.finished.then(()=>{if(running.get(el)!==a)return;if(!exit)stop(el);},()=>{});
  return a;
 }
 function enter(el,kind){return play(el,kind);}
 function leave(el,done,kind,hold=false){
  const a=play(el,kind,true);
  if(!a){done();return;}
  a.finished.then(()=>{if(running.get(el)===a){done();if(!hold)stop(el);}},()=>{});
 }
 reduced.addEventListener('change',()=>{if(reduced.matches)for(const a of running.values())a.finish();});
 return {enter,leave,stop,time};
})();

const paperOriginalModal=modal,paperOriginalCustom=openCustom,paperOriginalClose=closeModal;
modal=function(...args){const p=paperOriginalModal(...args);PaperMotion.enter($('card'));return p;};
openCustom=function(...args){const p=paperOriginalCustom(...args);PaperMotion.enter($('card'));return p;};
closeModal=function(value){
 const visible=!$('modal').hidden&&!$('modal').classList.contains('closing');
 if(!visible)return;
 paperOriginalClose(value);
 if(!$('modal').hidden)PaperMotion.leave($('card'),()=>{},'card',true);
};
// Stop a retained exit when the original 150 ms modal cleanup hides the shell.
new MutationObserver(()=>{if($('modal').hidden)PaperMotion.stop($('card'));}).observe($('modal'),{attributes:true,attributeFilter:['hidden']});

const paperOriginalHelp=openHelp;
let paperHelpClosing=false;
openHelp=function(...args){
 const dlg=$('helpDialog');
 if(paperHelpClosing){PaperMotion.stop(dlg);dlg.close();paperHelpClosing=false;dlg.inert=false;}
 const wasOpen=dlg.open,p=paperOriginalHelp(...args);
 if(!wasOpen&&dlg.open)PaperMotion.enter(dlg);
 return p;
};
closeHelp=function(){
 const dlg=$('helpDialog');if(!dlg.open||paperHelpClosing)return;
 const resolve=helpResolve;helpResolve=null;const focus=helpFocus;
 paperHelpClosing=true;dlg.inert=true;
 PaperMotion.leave(dlg,()=>{dlg.close();dlg.inert=false;paperHelpClosing=false;if(focus?.isConnected)focus.focus();});
 if(resolve)resolve();
};
$('helpClose').onclick=closeHelp;

const paperOriginalTip=showTip,paperOriginalHideTip=hideTip;
let paperTipClosing=false;
showTip=function(...args){
 if($('helpDialog').open)return;
 PaperMotion.stop($('tip'));paperTipClosing=false;$('tip').style.pointerEvents='';
 paperOriginalTip(...args);PaperMotion.enter($('tip'),'small');
};
hideTip=function(){
 const el=$('tip');if(el.hidden||paperTipClosing)return;
 clearTimeout(tipT);paperTipClosing=true;el.style.pointerEvents='none';
 // Free the world immediately; only the departing paper remains for 130 ms.
 document.body.classList.remove('coach-tip-open');
 PaperMotion.leave(el,()=>{paperOriginalHideTip();paperTipClosing=false;el.style.pointerEvents='';},'small');
};
$('tip').onclick=hideTip;

// Notifications are reused by the game; observe visibility, not every text mutation.
const paperToast=$('toast');let paperToastVisible=false;
new MutationObserver(()=>{
 const shown=paperToast.style.opacity==='1';if(shown===paperToastVisible)return;paperToastVisible=shown;
 if(shown)PaperMotion.enter(paperToast,'small');else PaperMotion.leave(paperToast,()=>{},'small');
}).observe(paperToast,{attributes:true,attributeFilter:['style']});

// Tabs exchange one sheet. Stock, price and reward redraws leave the sheet still.
$('card').addEventListener('click',e=>{
 if(e.target.closest('[data-tab]'))PaperMotion.enter($('card'));
});
function dismissPaperOffer(layer,after){
 if(layer.inert)return;layer.inert=true;
 PaperMotion.leave(layer.querySelector('.pass-offer-paper'),()=>{
  const current=layer.isConnected&&!$('modal').classList.contains('closing');layer.remove();
  if(current){if(after)after();else $('bpBuy')?.focus();}
 });
}
