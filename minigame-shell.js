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
  const fit=()=>{const r=app.getBoundingClientRect();Object.assign(layer.style,{left:Math.round(r.left)+'px',right:'auto',width:Math.round(r.width)+'px'});const root=frame.contentDocument?.documentElement;if(root)root.style.setProperty('--room-height',(layer.getBoundingClientRect().height||innerHeight)+'px');};
  let loaded=false,requested=false,revealed=false,closing=false,disposed=false,subject=null,exitPromise;
  const animations=new Set(),reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
  const play=(node,keys,options)=>{
   const animation=node.animate(keys,options);animations.add(animation);
   animation.finished.catch(()=>{}).finally(()=>animations.delete(animation));return animation;
  };
  const reveal=()=>{
   if(!loaded||!requested||revealed||closing||disposed)return;
   revealed=true;fit();
   // Animate the fitted artwork, not its painted room or the shared resource bar.
   subject=frame.contentDocument?.querySelector('.stage, #viewport');
   if(subject){
    subject.style.willChange='transform, opacity';
    const keys=reduced()?[{opacity:0},{opacity:1}]:[
     {opacity:0,transform:'translateY(30px) scale(.965)',offset:0},
     {opacity:1,transform:'translateY(-3px) scale(1.004)',offset:.76},
     {opacity:1,transform:'none',offset:1}
    ];
    play(subject,keys,{duration:reduced()?80:240,easing:'cubic-bezier(.2,.8,.2,1)'}).finished.catch(()=>{}).finally(()=>{subject.style.willChange='';});
   }
   layer.classList.add('minigame-ready');
   layer.querySelector('.sl-loading')?.remove();layer.querySelector('.sl-loading-close')?.remove();
  };
  const onLoad=()=>{loaded=true;fit();reveal();};
  fit();frame.addEventListener('load',onLoad);addEventListener('resize',fit);sync();
  const dispose=()=>{disposed=true;animations.forEach(a=>a.cancel());animations.clear();frame.removeEventListener('load',onLoad);observer.disconnect();removeEventListener('resize',fit);};
  dispose.ready=()=>{requested=true;reveal();};
  dispose.close=()=>{
   if(exitPromise)return exitPromise;
   closing=true;frame.inert=true;layer.classList.add('minigame-closing');
   const pose=subject?getComputedStyle(subject):null;
   const from=pose?{opacity:pose.opacity,transform:pose.transform}:null;
   animations.forEach(a=>a.cancel());animations.clear();
   const duration=reduced()?80:160;
   if(subject&&from)play(subject,[from,reduced()?{opacity:0}:{opacity:0,transform:'translateY(24px) scale(.975)'}],{duration,easing:'cubic-bezier(.4,0,.8,.2)',fill:'forwards'});
   exitPromise=play(layer,[{opacity:getComputedStyle(layer).opacity},{opacity:0}],{duration:reduced()?80:110,delay:reduced()?0:50,easing:'ease-in',fill:'forwards'}).finished.catch(()=>{});
   return exitPromise;
  };
  return dispose;
 }
};

// События мини-игр для внешних режимов (мультиплеер ставит на них часы хода на паузу).
// window 'minigame:open'  detail {id:'bandit'|'dice21', game, tile, landing, at}
// window 'minigame:close' detail {…то же, cash (+/− итог в $), delta:{cash,hard,rolls,goods}, durationMs, summary}
// delta — изменение ресурсов игрока за весь визит: призы, ставки, покупки спинов.
window.MinigameEvents={
 wallet(){const goods=(S.tiles||[]).reduce((a,t)=>a+(t.owner==='you'?(t.goods||0):0),0);return {cash:Math.round(S.cash||0),hard:S.hard||0,rolls:S.rolls||0,goods};},
 begin(game,{landing=false}={}){
  const start=this.wallet(),detail={id:game==='slot'?'bandit':game,game,tile:S.pos,landing:!!landing,at:Date.now()},log=[];let done=false;
  dispatchEvent(new CustomEvent('minigame:open',{detail:{...detail}}));
  return {
   note(entry){log.push(entry);},
   end(){
    if(done)return;done=true;const w=MinigameEvents.wallet();
    const delta={cash:w.cash-start.cash,hard:w.hard-start.hard,rolls:w.rolls-start.rolls,goods:w.goods-start.goods};
    dispatchEvent(new CustomEvent('minigame:close',{detail:{...detail,cash:delta.cash,durationMs:Date.now()-detail.at,delta,summary:log.slice()}}));
   },
  };
 },
};
