/* First-page loading cover. Never reopened by a board or minigame reload. */
(()=>{
 const boot=document.getElementById('boot'),play=document.getElementById('startPlay');
 if(!boot||!play)return;
 let releaseEntry;
 window.GameStart={whenEntered:new Promise(resolve=>{releaseEntry=resolve;})};
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const params=new URLSearchParams(location.search);
 const review=params.get('playtest')==='1'&&params.get('review')==='1'&&!params.has('start');
 const layers=new Map();
 let entered=false,closing=false;
 function hold(){
  for(const id of ['app','modal','helpDialog','tip']){
   const el=document.getElementById(id);
   if(el&&!layers.has(el)){layers.set(el,el.inert);el.inert=true;}
  }
 }
 function enter(){
  if(!window.MobileHost?.ready||entered||closing)return;
  closing=true;boot.classList.add('start-closing');
  setTimeout(()=>{
   entered=true;closing=false;boot.hidden=true;
   boot.classList.remove('start-closing');
   observer.disconnect();
   layers.forEach((wasInert,el)=>{el.inert=wasInert;});
   releaseEntry();
  },reduced.matches?0:220);
 }
 function sync(){
  if(entered)return;
  hold();
  const ready=!!window.MobileHost?.ready;
  boot.classList.toggle('start-ready',ready);play.disabled=!ready;
  if(review&&ready)enter();
 }
 play.addEventListener('click',enter);
 const observer=new MutationObserver(sync);
 observer.observe(document.body,{attributes:true,attributeFilter:['class']});
 document.addEventListener('DOMContentLoaded',sync,{once:true});
 document.addEventListener('visibilitychange',()=>boot.classList.toggle('start-paused',document.hidden));
 sync();
})();
