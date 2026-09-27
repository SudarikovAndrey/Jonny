// The approved physical machine, embedded in the main game's resource economy.
(function(){
'use strict';
const Engine=window.SlotEngine, Session=window.BanditHostState;
let current=null;
const st=()=>{S.slot=S.slot||{pot:0,visits:0};return S.slot;};
const clone=x=>JSON.parse(JSON.stringify(x));
function context(){return {
 P:Math.max(0,Math.round(lapNet())),day:S.day,cash:S.cash,gem:S.hard,move:S.rolls,pot:st().pot||0,
 sound:!GameFeedback.muted,
 points:myKiosks().map(t=>({id:t.i,n:pointName(t),cap:cap(t),q:t.goods,buy:buyPrice(t.good),profit:sales(t)*(sellPrice(t.good)-buyPrice(t.good))})),
};}
function makeSession(){return Session.createSession(Engine,{
 saved:()=>st().bandit||{...Engine.initial(),freeSpin:false,paidSpins:0,pot:st().pot||0,visits:st().visits||0,pending:null,lastPrize:null,totalSpins:0},
 context,
 forced:()=>{const id=window.Slot.debugNext;window.Slot.debugNext=null;return id;},
 commit(next,before,kind,result){
  const dc=next.cash-before.cash,dg=next.gem-before.gem,dm=next.move-before.move;
  S.cash+=dc;S.hard+=dg;S.rolls+=dm;
  for(const p of next.points){const old=before.points.find(x=>x.id===p.id),t=S.tiles[p.id];if(old&&t&&p.q!==old.q)t.goods=Math.min(cap(t),Math.max(0,t.goods+p.q-old.q));}
  const store=st();store.pot=next.pot;store.visits=next.visits;store.bandit=clone(next);
  if(kind==='settle'&&result){
   if(dc>0){S.stat.earned+=dc;S.dstat.earned+=dc;qProg('earn',dc);}
   track('slot',{id:result.id,cash:dc,hard:dg,rolls:dm,restock:result.restock});
   log(`🎰 Автомат: ${Engine.describe({...result,restock:result.refund?null:result.restock})}.`);
  }
  if(kind==='buyPack'){
   track('hard_spend',{n:1,source:'slot'});
   log('🎰 Куплено 5 спинов за 1 кристалл.');
  }
  save();if(kind!=='save')render();
 },
});}
function open(opts={}){
 if(current)return current.promise;
 if(S.finished||document.querySelector('.minigame-layer'))return Promise.resolve();
 const session=makeSession();
 if(session.snapshot().pending)session.settle();
 session.open(opts.free!==false);
 const priorFocus=document.activeElement,app=$('app'),wasInert=app.inert;
 let resolve;const promise=new Promise(r=>resolve=r);
 const token=crypto.randomUUID();
 const layer=document.createElement('div');layer.className='sl-layer sl-integrated';layer.setAttribute('role','dialog');layer.setAttribute('aria-modal','true');layer.setAttribute('aria-label','Однорукий бандит');
 const loading=document.createElement('div');loading.className='sl-loading';loading.textContent='Открываем автомат…';
 const cancel=document.createElement('button');paintedClose(cancel);cancel.classList.add('sl-loading-close');cancel.setAttribute('aria-label','Вернуться на игровое поле');
 const frame=document.createElement('iframe');frame.id='bandit-frame';frame.title='Однорукий бандит';frame.setAttribute('allow','autoplay');frame.setAttribute('allowtransparency','true');frame.src='bandit/index.html?embedded=1&v=__BANDIT_VERSION__#'+encodeURIComponent(token);
 layer.append(frame,loading,cancel);
 current={promise,session,frame,token,layer,closing:false,resolve};
 const finish=()=>{
  if(!current||current.token!==token||current.closing||session.busy)return;
  current.closing=true;session.close();
  const end=()=>{current?.unfit?.();layer.remove();app.inert=wasInert;current=null;render();if(priorFocus?.isConnected)priorFocus.focus({preventScroll:true});resolve();};
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)end();
  else{layer.animate([{opacity:1},{opacity:0}],{duration:180,fill:'forwards'}).finished.then(end,end);}
 };
 current.finish=finish;cancel.onclick=finish;
 current.unfit=MinigameShell.attach(layer,frame);
 app.inert=true;document.body.append(layer);
 return promise;
}
function connect(child,token){
 const entry=current;
 if(!entry||entry.token!==token||entry.frame.contentWindow!==child)return null;
 const session=entry.session;
 return {
  snapshot:()=>session.snapshot(),get busy(){return session.busy;},
  begin:()=>session.begin(),buyPack:()=>session.buyPack(),settle:()=>session.settle(),close:()=>session.close(),save:()=>session.save(),
  soundEnabled:()=>!GameFeedback.muted,
  paintClose(button){paintedClose(button);button.querySelector('image').setAttribute('href',new URL('assets/modal-atlas.webp',location.href).href);},
  ready(){entry.layer.querySelector('.sl-loading')?.remove();entry.layer.querySelector('.sl-loading-close')?.remove();},
  exit:()=>entry.finish(),
 };
}
// Keep the chosen game until the next actual landing, including after reload.
function openTile({landing=false}={}){
 if(S.finished||document.querySelector('.minigame-layer'))return Promise.resolve();
 if(landing){S.minigames=MinigameRotation.advance(S.minigames);save();}
 return MinigameRotation.current(S.minigames)==='dice21'?Dice21.open():open({free:landing});
}
// Every completed lap contributes to the same persistent jackpot.
if(typeof lapDone==='function'){const base=lapDone;lapDone=async function(){const result=await base.apply(this,arguments);st().pot=(st().pot||0)+10*S.day;save();return result;};}
// Real landing grants one free attempt; reopening the tile does not grant another.
if(typeof land==='function'){const base=land;land=async function(t){
 if(t?.type==='slot'){S.landN=(S.landN||0)+1;track('land',{tile:t.i,ttype:'slot'});if(t.drop)await collectDrop(t);await openTile({landing:true});return;}
 return base.apply(this,arguments);
};}
(function(){const bar=$('tilebar');if(!bar)return;
 const base=render;render=function(){const result=base.apply(this,arguments);const tile=S.tiles[S.pos];
  if(tile?.type==='slot'&&!moving&&!S.finished){bar.hidden=false;bar.disabled=false;bar.classList.remove('poor','off');$('tbText').textContent=MinigameRotation.current(S.minigames)==='dice21'?'🎲 21 в кости · сделай ставку':`🎰 Однорукий бандит · касса $${st().pot||0}`;bar.querySelector('b').textContent='открыть';}
  return result;
 };
 bar.addEventListener('click',e=>{if(S.tiles[S.pos]?.type==='slot'&&!moving&&$('modal').hidden){e.stopImmediatePropagation();openTile();}},true);
})();
window.Slot={open,openTile,connect,pot:()=>st().pot||0,OUT:Engine.OUTCOMES,debugNext:null,recover(){if(S?.slot?.bandit?.pending)makeSession().settle();}};
// Recover after boot has assigned S; never read prototype state during hook installation.
queueMicrotask(()=>Slot.recover());

new MutationObserver(()=>{
 const card=$('card');if(!card.querySelector('#iRolls')||card.querySelector('#slTest'))return;
 const section=document.createElement('div');section.className='sl-test-controls';
 const select=document.createElement('select');select.id='slTestOutcome';select.setAttribute('aria-label','Следующий результат автомата');
 for(const [value,text] of [['','Автомат: случайный результат'],...Engine.OUTCOMES.map(o=>[o.id,o.label])]){const option=document.createElement('option');option.value=value;option.textContent=text;select.append(option);}
 const button=document.createElement('button');button.id='slTest';button.className='sec';button.textContent='🎰 Однорукий бандит';
 section.append(select,button);(card.querySelector('.mbtns')||card).before(section);enamelButton(button);
 button.onclick=()=>{Slot.debugNext=select.value||null;closeModal();setTimeout(()=>open(),160);};
}).observe($('card'),{childList:true,subtree:true});
})();
