// The table uses the same cash wallet and persists each decision atomically.
(function(){
'use strict';
let current=null;
function makeService(){return Dice21Engine.createService({read:()=>S.dice21,wallet:()=>S.cash,commit(state,delta,action){
 S.dice21=state;S.cash+=delta;
 if(state.phase==='result'&&(action.type==='stand'||action.type==='hit')){
  const net=state.result.net;if(net>0){S.stat.earned+=net;S.dstat.earned+=net;qProg('earn',net);}
  track('dice21',{outcome:state.result.outcome,stake:state.stake,net});
  current?.events?.note({outcome:state.result.outcome,stake:state.stake,net});
  log(`🎲 21 в кости: ${net>0?'+':''}$${net}.`);
 }
 // Вторая партия остановки сыграна — стол закрывается сам.
 if(action.type==='next'&&state.visitLimit>0&&state.visitGames>=state.visitLimit){setTimeout(()=>{if(current)current.exit();},350);}
 save();render();
}});}
// Ставка заведения привязана к доходу: половина чистой прибыли за круг, от $25 до $1000, кратно фишке.
function houseStake(){const net=typeof lapNet==='function'?lapNet():0;return Math.max(25,Math.min(1000,Math.round(net*0.5/25)*25));}
function open({landing=false}={}){
 if(current)return current.promise;
 if(!S||S.finished||document.querySelector('.minigame-layer'))return Promise.resolve();
 if(landing){const svc=makeService();if(svc.snapshot().phase==='result')svc.dispatch({type:'next'}); // прошлая партия дочитана — стол чистый
  if(svc.snapshot().phase==='betting'){const r=svc.dispatch({type:'visit',stake:houseStake()});if(r.ok)log(`🎲 21 в кости: заведение ставит $${r.snapshot.freeBet} — первая партия бесплатно, вторая на свои.`);}}
 let resolve;const promise=new Promise(r=>resolve=r);
 const app=$('app'),prior=document.activeElement,wasInert=app.inert,token=crypto.randomUUID();
 const layer=document.createElement('div');layer.className='sl-layer sl-integrated';layer.setAttribute('role','dialog');layer.setAttribute('aria-modal','true');layer.setAttribute('aria-label','21 в кости');

 const frame=document.createElement('iframe');frame.id='dice21-frame';frame.title='21 в кости';frame.allow='autoplay';frame.src='dice21/index.html?embedded=1&v=__DICE21_VERSION__#'+token;

 const cancel=document.createElement('button');paintedClose(cancel);cancel.classList.add('sl-loading-close');Object.assign(cancel.style,{position:'absolute',right:'20px',top:'20px',width:'44px',height:'44px'});cancel.setAttribute('aria-label','Закрыть загрузку игры');
 layer.append(frame,cancel);const dispose=MinigameShell.attach(layer,frame);app.inert=true;document.body.append(layer);
 const exit=()=>{if(!current||current.closing)return;current.closing=true;dispose.close().then(()=>{dispose();layer.remove();const events=current?.events;current=null;app.inert=wasInert;render();events?.end();if(prior?.isConnected)prior.focus({preventScroll:true});resolve();});};
 cancel.onclick=exit;current={frame,token,service:makeService(),exit,cancel,promise,dispose,closing:false,events:window.MinigameEvents?.begin('dice21',{landing})};
 return promise;
}
window.Dice21={open,connect(child,token){const c=current;if(!c||c.token!==token||c.frame.contentWindow!==child)return null;return{resources:()=>({cash:S.cash,hard:S.hard}),snapshot:()=>c.service.snapshot(),dispatch:a=>c.closing?{ok:false,error:'Игра закрывается',snapshot:c.service.snapshot()}:c.service.dispatch(a),soundEnabled:()=>!c.closing&&!GameFeedback.muted,ready:()=>c.dispose.ready(),exit:c.exit};}};
new MutationObserver(()=>{
 const card=$('card');if(!card.querySelector('#iRolls')||card.querySelector('#dice21Test'))return;
 const button=document.createElement('button');button.id='dice21Test';button.className='sec';button.textContent='🎲 21 в кости';
 (card.querySelector('.mbtns')||card).before(button);enamelButton(button);
 button.onclick=()=>{closeModal();setTimeout(open,160);};
}).observe($('card'),{childList:true,subtree:true});
})();
