// Inserted into the prototype script before boot so the original rules retain their scope.
let mobileLastState='', mobileFitScheduled=false, mobileLastLayout='';
// Цепь держится, пока идёт сцена с полицией и выбор, и пока игрок сидит в участке.
// Заплатил, выкинул дубль или отсидел — цепь снимается сразу, не дожидаясь хода.
// Объявление функции поднимается, а let ниже ещё может быть в «мёртвой зоне» — отсюда try.
function mobilePoliceBusy(){try{return !!mobilePolicePromise;}catch(e){return false;}}
function mobileSync(){
  if(!S||!MobileHost.ready)return;
  mobileCheckCash();
  if(S.policePoseTile!==S.pos)delete S.policePoseTile;
  const snapshot={action:'state',pos:S.pos,moving,police_bound:(S.policePoseTile===S.pos&&mobilePoliceBusy())||(S.jail>0&&S.tiles[S.pos]?.type==='police'),day:S.day,tiles:S.tiles.map(t=>({
    i:t.i,type:t.type,lvl:(t.owner||t.rival)?(t.type==='kiosk'?((typeof kioskLvl==='function'?kioskLvl(t):t.salesLvl)||1):t.type==='biz'?(t.level||1):0):0,   // уровень и у чужих клеток в партии (башенки соперников, плейтест 02.10)pot:t.type==='pot'?S.pot:0,game:t.type==='slot'&&window.MinigameRotation?MinigameRotation.current(S.minigames):undefined,good:t.good,owner:!!t.owner,unlocked:unlocked(t),drop:t.drop||(t.insp?{insp:1}:null),
    boost:t.boost?.day===S.day?t.boost.m:1,trend:t.good===S.trend?CFG.TREND_MULT:1,
    label:!unlocked(t)?'':t.type==='kiosk'?(t.owner?t.goods+'/'+cap(t):'$'+t.price):
      t.type==='biz'?(t.owner?'$'+fee(t)+' · ур.'+t.level:'$'+t.price):t.type==='wh'?'Costco':t.type==='home'?'':t.type==='bank'?'Банк':t.type==='pot'?'$'+S.pot:t.type==='slot'?(window.MinigameRotation&&MinigameRotation.current(S.minigames)==='dice21'?'':'$'+((S.slot&&S.slot.pot)||0)):t.type==='scatter'?'Инкассатор':t.type==='police'?'Участок':t.type==='hazard'?'Инспектор':''
  }))};
  const json=JSON.stringify(snapshot);
  if(json!==mobileLastState){mobileLastState=json;MobileHost.send(snapshot);}
  if(!mobileFitScheduled){mobileFitScheduled=true;requestAnimationFrame(()=>{mobileFitScheduled=false;mobileLayout();});}
}
function draw(){mobileSync();}
function mobileLayout(){
  const top=$('top').getBoundingClientRect().bottom;
  const panel=$('panel').getBoundingClientRect();
  const app=$('app').getBoundingClientRect(),height=app.height;
  document.documentElement.style.setProperty('--world-top',Math.round(top)+'px');
  document.documentElement.style.setProperty('--world-bottom',Math.max(0,Math.round(height-panel.top-12))+'px');
  const layout=JSON.stringify({action:'layout',top:(top-app.top)/height,bottom:(app.bottom-panel.top)/height});
  if(MobileHost.ready&&mobileLastLayout!==layout){mobileLastLayout=layout;MobileHost.send(JSON.parse(layout));}
  $('bRoll').disabled=$('bRoll').disabled||!MobileHost.ready;
  if(!$('diceResult').hidden)placeDiceResult($('diceResult'));
}
function screenOfTile(i){
  const r=$('board-frame').getBoundingClientRect(),p=MobileHost.points[i];
  return p?{x:r.left+p[0]*r.width,y:r.top+p[1]*r.height}:{x:r.left+r.width/2,y:r.top+r.height/2};
}
async function mobileDice(planned){
  document.body.classList.add('dice-rolling');
  GameFeedback.sound('throw');
  $('diceResult').hidden=true;
  try{
    const result=await MobileHost.request('roll',planned.lesson?{lesson:true,a:planned.a,b:planned.b}:{});
    if(planned.lesson&&(result.a!==planned.a||result.b!==planned.b))throw new Error('Учебный бросок не совпал с маршрутом');
    return {...result,lesson:!!planned.lesson};
  }finally{document.body.classList.remove('dice-rolling');}
}
async function roll(){
  if(!MobileHost.ready){toast('Поле ещё загружается');return;}
  const before=JSON.stringify(S);
  try{await prototypeRoll();}
  catch(error){MobileHost.send({action:'cancel'});S=JSON.parse(before);moving=false;save();render();toast('Бросок прервался. Ход возвращён.');console.error(error);}
}
function step(from,to,ms,kind){
  if(CFG.SPEED>=100){MobileHost.send({action:'state',pos:to,tiles:[]});return Promise.resolve();}
  const learning=firstLapActive();
  const duration=(kind==='one'?460:kind==='in'||kind==='out'?(learning?380:340):(learning?190:170))/Math.max(1,CFG.SPEED);
  return MobileHost.request('step',{from,to,ms:duration,kind},10000);
}
function float(i,text,color,size){
  if(!S.tiles[i]?.drop)return;
  const at=screenOfTile(i),el=document.createElement('span');
  el.className='map-float';el.textContent=text;el.style.left=at.x+'px';el.style.top=at.y+'px';el.style.color=color||'#fff1ce';if(typeof cashGlyph==='function')cashGlyph(el);
  document.body.append(el);setTimeout(()=>el.remove(),1400);
}
// Штраф в копилку летит по полю, как находки инкассатора: 3D-монеты по параболе
// из окна интерфейса (последнего закрытого) в стопку на клетке копилки и «тонут» в ней.
let lastModalAt=null;
(function(){const base=closeModal;closeModal=function(...a){try{const c=screenOfCard();if(c)lastModalAt={x:c.x,y:c.y,t:Date.now()};}catch(e){}return base.apply(this,a);};})();
AT.pot=()=>Object.assign(screenOfTile(25),{pot:25});
function flyCashToPot(from,n,o){
  const r=$('board-frame').getBoundingClientRect();
  const src=lastModalAt&&Date.now()-lastModalAt.t<2500?lastModalAt:from;
  const fx=Math.min(1,Math.max(0,(src.x-r.left)/r.width)),fy=Math.min(1,Math.max(0,(src.y-r.top)/r.height));
  MobileHost.request('scatter',{from:S.pos,fromScreen:[fx,fy],drops:[{to:25,drop:{cash:1},count:Math.min(4,Math.max(1,n||1)),sink:true}]},8000)
    .catch(e=>console.warn('Штраф в копилку не отыгран:',e.message))
    .then(()=>{if(o.pulse)pulse(o.pulse);o.onDone?.();});
}
function fly(icon,from,to,n,o={}){
  if(!from||!to){o.onDone?.();return;}
  if(icon==='💵'&&to.pot!==undefined&&MobileHost.ready&&MobileHost.sceneState?.engine==='web')return flyCashToPot(from,n,o);
  const count=Math.min(3,Math.max(1,n||1));
  for(let i=0;i<count;i++){
    const el=document.createElement('span');el.className='mobile-fly';
    // Деньги летят монетами из кита — той же иконкой, что в шапке и на поле.
    if(icon==='💵'){el.classList.add('fly-coin');el.innerHTML='<img src="assets/icons/soft.webp" alt="">';}else el.textContent=icon;el.style.left=from.x+'px';el.style.top=from.y+'px';document.body.append(el);
    const animation=el.animate([{translate:'0 0',scale:1},{translate:`${to.x-from.x}px ${to.y-from.y}px`,scale:.65}],{duration:600,delay:(o.delay||0)+i*80,easing:'ease-in-out',fill:'forwards'});
    animation.finished.then(()=>{el.remove();if(i===count-1){if(o.pulse)pulse(o.pulse);o.onDone?.();}}).catch(()=>el.remove());
  }
}
async function flyDrops(plan){
  // Веб-поле само разбрасывает награды дугами по клеткам; ждём, пока всё ляжет.
  if(MobileHost.ready&&MobileHost.sceneState?.engine==='web'&&plan.length){
    try{await MobileHost.request('scatter',{from:S.pos,drops:plan.map(pl=>({to:pl.t.i,drop:pl.drop}))},15000);}
    catch(e){console.warn('Разлёт не отыгран:',e.message);}
    plan.forEach(pl=>{pl.t.drop=mergeDrop(pl.t.drop,pl.drop);});
    mobileSync();
    return;
  }
  const from=screenOfTile(S.pos);
  await Promise.all(plan.map((pl,index)=>new Promise(resolve=>{
    fly(pl.icon,from,screenOfTile(pl.t.i),1,{delay:index*90/CFG.SPEED,onDone:()=>{
      pl.t.drop=mergeDrop(pl.t.drop,pl.drop);mobileSync();resolve();
    }});
  })));
}
window.MobileGame={
  ready(){mobileLastState='';mobileLastLayout='';fit();render();mobileLayout();},
  sync:mobileSync,
  snapshot(){return JSON.parse(JSON.stringify(S));},
  async requestRoll(){await roll();},
  debugColliders(on){MobileHost.send({action:'debug',on});},
  showDiceResult(a,b,lesson,x,y){
    const el=$('diceResult'),total=a+b,word=total<5?'клетки':'клеток';
    el.setAttribute('aria-label',`${lesson?'Учебный бросок. ':''}Выпало ${a} и ${b}. ${total} ${word}.`);
    el.innerHTML=`<b aria-hidden="true">${total}</b>`;
    el.hidden=false;
    placeDiceResult(el);
    el.getAnimations().forEach(animation=>animation.cancel());
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches)
      el.animate([{opacity:0,translate:'0 6px',scale:'.92'},{opacity:1,translate:'0 0',scale:'1'}],{duration:180,easing:'ease-out'});
  }
};
let mobileDebug=false, mobileWindMap=false;
const originalSettings=settings;
settings=function(){
  originalSettings();
  // Звук и музыка — переключатели-иконки: состояние читается значком,
  // перечёркнутым при выключении. Подпись остаётся для скринридера.
  const audioRow=document.createElement('div');audioRow.className='mbtns audio-toggles';
  const SLASH='<path d="M9 41 41 9" stroke="#b12f26" stroke-width="5.5" stroke-linecap="round"/>';
  const SPEAKER='<path d="M10 19h8l11-9v30l-11-9h-8z" fill="#f2e4c2" stroke="#2a2118" stroke-width="3" stroke-linejoin="round"/>'
    +'<path class="wv" d="M34 18c4 4 4 14 0 18M39 13c7 7 7 24 0 31" fill="none" stroke="#2a2118" stroke-width="3" stroke-linecap="round"/>';
  const NOTE='<path d="M20 34V12l18-4v22" fill="none" stroke="#2a2118" stroke-width="3.4" stroke-linejoin="round"/>'
    +'<ellipse cx="15" cy="35" rx="6.5" ry="5.4" fill="#f2e4c2" stroke="#2a2118" stroke-width="3"/>'
    +'<ellipse cx="33" cy="30" rx="6.5" ry="5.4" fill="#f2e4c2" stroke="#2a2118" stroke-width="3"/>';
  const makeToggle=(art,onName,offName,isOff,toggle)=>{
    const b=document.createElement('button'); b.className='sec audio-toggle';
    const paint=()=>{
      const off=isOff();
      b.innerHTML='<svg viewBox="0 0 50 50" aria-hidden="true">'+art+(off?SLASH:'')+'</svg>';
      b.classList.toggle('is-off',off);
      b.setAttribute('aria-pressed',String(!off));
      b.setAttribute('aria-label',off?offName:onName);
      b.title=off?offName:onName;
    };
    paint(); b.onclick=()=>{toggle();paint();}; return b;
  };
  audioRow.append(makeToggle(SPEAKER,'Звук включён','Звук выключен',
    ()=>GameFeedback.muted, ()=>GameFeedback.toggle()));
  audioRow.append(makeToggle(NOTE,'Музыка включена','Музыка выключена',
    ()=>GameFeedback.musicMuted, ()=>GameFeedback.toggleMusic()));
  if(FullScreen.supported()){
    const EXPAND='<path d="M8 19V8h11M42 31v11H31M42 19V8H31M8 31v11h11" fill="none" stroke="#2a2118" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
    const SHRINK='<path d="M19 8v11H8M31 42V31h11M31 8v11h11M19 42V31H8" fill="none" stroke="#2a2118" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
    const fs=document.createElement('button'); fs.className='sec audio-toggle';
    const paint=()=>{
      const on=document.body.classList.contains('wide-mode');
      fs.innerHTML='<svg viewBox="0 0 50 50" aria-hidden="true">'+(on?SHRINK:EXPAND)+'</svg>';
      fs.setAttribute('aria-pressed',String(on));
      fs.setAttribute('aria-label',on?'Выйти из полного экрана':'Во весь экран');
      fs.title=fs.getAttribute('aria-label');
    };
    paint();
    fs.onclick=async()=>{
      if(document.body.classList.contains('wide-mode')){ window.setWideMode?.(false); if(FullScreen.active()) await FullScreen.toggle(); }
      else{ window.setWideMode?.(true); if(!FullScreen.active()) await FullScreen.toggle(); }
      setTimeout(paint,150);
    };
    document.addEventListener('fullscreenchange',paint);
    audioRow.append(fs);
  }
  $('card').append(audioRow);
  const row=document.createElement('div');row.className='mbtns';
  const debug=document.createElement('button');debug.className='sec';debug.textContent=mobileDebug?'Скрыть коллайдеры':'Показать коллайдеры';
  debug.onclick=()=>{mobileDebug=!mobileDebug;MobileGame.debugColliders(mobileDebug);closeModal();};
  row.append(debug);
  const windBtn=document.createElement('button');windBtn.className='sec';windBtn.textContent=mobileWindMap?'Скрыть карту ветров':'Карта ветров';
  windBtn.onclick=()=>{mobileWindMap=!mobileWindMap;MobileHost.send({action:'windmap',on:mobileWindMap});closeModal();};
  row.append(windBtn);
  // Отладка: переключить карту поля для просмотра; выбор помнится в этом браузере.
  const mapSel=document.createElement('select');mapSel.className='sec map-select';mapSel.setAttribute('aria-label','Карта поля');
  mapSel.innerHTML=BOARD_MAPS.map(([id,name])=>`<option value="${id}"${id===boardMap()?' selected':''}>Карта: ${name}</option>`).join('');
  mapSel.onchange=()=>{setBoardMap(mapSel.value);closeModal();};
  $('card').append(row);
  // Выбор карты — первым пунктом, сразу под заголовком: внизу длинного меню его не находили.
  const mapRow=document.createElement('div');mapRow.className='row map-row';
  mapRow.innerHTML='<span class="n">Карта<small>для проверки</small></span>';
  mapRow.append(mapSel);
  const first=$('card').querySelector(':scope > .row');
  if(first)first.before(mapRow);else $('card').append(mapRow);
  const cameras=document.createElement('div');cameras.className='mbtns';
  for(const [label,action] of [['Обзор поля','overview'],['К Джонни','home']]){
    const button=document.createElement('button');button.className='sec';button.textContent=label;
    button.onclick=()=>{MobileHost.send({action});closeModal();};cameras.append(button);
  }
  $('card').append(cameras);
};
$('bSettings').onclick=settings;
$('mapOverview').onclick=()=>MobileHost.send({action:'overview'});
$('mapFollow').onclick=()=>MobileHost.send({action:'home'});
let gesture=null, pinchDistance=0, tapMoved=false;
function panMap(dx,dy){
  MobileHost.send({action:'pan',dx,dy,input_width:$('board-frame').getBoundingClientRect().width});
}
cv.addEventListener('pointerdown',e=>{gesture={x:e.clientX,y:e.clientY};tapMoved=false;cv.setPointerCapture(e.pointerId);});
// Мышь: кнопку отпустили, а pointerup не дошёл (захват потерян, курсор ушёл в окно поля) — карта больше не тянется за курсором
// (плейтест 02.10, «камера залипает после перетаскивания»).
cv.addEventListener('pointermove',e=>{if(gesture&&e.pointerType==='mouse'&&!e.buttons){gesture=null;return;}if(!gesture||pinchDistance)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;if(Math.hypot(dx,dy)>2)tapMoved=true;panMap(dx,dy);gesture={x:e.clientX,y:e.clientY};});
cv.addEventListener('pointerup',e=>{
  gesture=null;if(tapMoved||moving||trainingPending()||!$('modal').hidden)return;
  const r=$('board-frame').getBoundingClientRect();
  if(e.clientY<r.top||e.clientY>r.bottom)return;
  let nearest=-1,best=Infinity;
  MobileHost.points.forEach((_,i)=>{const p=screenOfTile(i),d=Math.hypot(e.clientX-p.x,e.clientY-p.y);if(d<best){best=d;nearest=i;}});
  if(best>45||nearest!==S.pos)return;
  const t=S.tiles[nearest];if(!canUseTile(t))return;
  if(t.type==='kiosk'&&(t.owner||S.cash>=t.price))kioskWindow(t);
  else if(t.type==='biz'&&(t.owner||S.cash>=t.price))bizWindow(t);
  else if(t.type==='slot'&&window.Slot)Slot.openTile();
  else if(t.type==='wh')shop();
  else if(t.type==='bank'&&S.day>=CFG.BANK_DAY)bank();
});
cv.addEventListener('pointercancel',()=>{gesture=null;});
cv.addEventListener('lostpointercapture',()=>{gesture=null;});
addEventListener('blur',()=>{gesture=null;});
cv.addEventListener('wheel',e=>{
  e.preventDefault();
  const unit=e.deltaMode===1?16:e.deltaMode===2?cv.getBoundingClientRect().height:1;
  const dx=e.deltaX*unit,dy=e.deltaY*unit;
  if(e.ctrlKey||e.metaKey){
    // Trackpad pinch arrives as Ctrl+wheel; magnitude matters, not just its sign.
    MobileHost.send({action:'zoom',factor:Math.exp(Math.max(-120,Math.min(120,dy))*.008)});
  }else{
    // Native momentum is already in the wheel stream: do not add another inertia layer.
    panMap(e.shiftKey&&!dx?-dy:-dx,e.shiftKey&&!dx?0:-dy);
  }
},{passive:false});
cv.addEventListener('touchstart',e=>{if(e.touches.length===2){pinchDistance=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);tapMoved=true;}},{passive:true});
cv.addEventListener('touchmove',e=>{if(e.touches.length!==2||!pinchDistance)return;e.preventDefault();const distance=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);MobileHost.send({action:'zoom',factor:pinchDistance/distance});pinchDistance=distance;},{passive:false});
cv.addEventListener('touchend',()=>{pinchDistance=0;gesture=null;});
window.addEventListener('resize',mobileLayout);
new ResizeObserver(mobileLayout).observe($('panel'));
new ResizeObserver(mobileLayout).observe($('top'));
function mobileModalState(){
  document.body.classList.toggle('mobile-modal',!$('modal').hidden||$('helpDialog').open);
  // closeModal finishes after its exit animation; restore coaching at that point,
  // not while the closing modal still counts as open.
  if(S&&$('modal').hidden){renderGuide();mobileLayout();}
}
new MutationObserver(mobileModalState).observe($('modal'),{attributes:true,attributeFilter:['hidden']});
new MutationObserver(mobileModalState).observe($('helpDialog'),{attributes:true,attributeFilter:['open']});
mobileModalState();

// Celebrate actual positive outcomes, never every income tick or toast string.
// One pending reaction coalesces rewards from the same action. UI and movement
// get priority so the player sees the reaction instead of a hidden modal backdrop.
let mobilePoliceActive=false, mobilePolicePromise=null;
let mobileJoyPending=false, mobileJoyTimer=0, mobileJoyUntil=0, mobileJoyKind='joy', mobileDanceUntil=0;
let mobileNegativePending=false, mobileNegativeTimer=0, mobileNegativeUntil=0, mobilePreviousCash=null;
function mobileCheckCash(){
  // Observe a transition, not an empty wallet restored from a save or repeated renders.
  const empty=mobilePreviousCash!==null&&mobilePreviousCash>0&&S.cash<=0;
  mobilePreviousCash=S.cash;
  if(empty)queueMobileNegative();
}
function queueMobileNegative(){
  if(mobilePoliceActive)return;
  mobileJoyPending=false;
  if(Date.now()<mobileNegativeUntil)return;
  mobileNegativePending=true;
  if(!mobileNegativeTimer)mobileNegativeTimer=setTimeout(flushMobileNegative,100);
}
function mobileReactionBlocked(){
  return mobilePoliceActive||!MobileHost.ready||document.hidden||moving||!$('modal').hidden||!$('tip').hidden||$('helpDialog').open||document.body.classList.contains('dice-rolling');
}
function flushMobileNegative(){
  mobileNegativeTimer=0;
  if(!mobileNegativePending)return;
  if(mobileReactionBlocked()){mobileNegativeTimer=setTimeout(flushMobileNegative,150);return;}
  mobileNegativePending=false;mobileNegativeUntil=Date.now()+2600;
  MobileHost.send({action:'react_negative'});
}
function queueMobileJoy(kind='joy'){
  if(mobilePoliceActive)return;
  if(mobileNegativePending||Date.now()<mobileNegativeUntil)return;
  if(kind==='dance'){
    if(Date.now()<mobileDanceUntil)return;
    mobileJoyKind='dance'; // A major reward upgrades a queued/playing small reaction.
  }else{
    if(Date.now()<mobileJoyUntil)return;
    if(!mobileJoyPending)mobileJoyKind='joy';
  }
  mobileJoyPending=true;
  if(!mobileJoyTimer)mobileJoyTimer=setTimeout(flushMobileJoy,100);
}
function flushMobileJoy(){
  mobileJoyTimer=0;
  if(!mobileJoyPending)return;
  const blocked=mobileReactionBlocked();
  if(blocked){mobileJoyTimer=setTimeout(flushMobileJoy,150);return;}
  const special=mobileJoyKind==='dance';
  mobileJoyPending=false;mobileJoyKind='joy';mobileJoyUntil=Date.now()+(special?4200:2000);
  if(special)mobileDanceUntil=mobileJoyUntil;
  MobileHost.send({action:special?'celebrate_big':'celebrate'});
}
const mobileOriginalTrack=track;
track=function(type,data={}){
  const result=mobileOriginalTrack(type,data);
  if(type==='new_game'){
    mobileJoyPending=false;mobileJoyUntil=0;mobileDanceUntil=0;mobileJoyKind='joy';clearTimeout(mobileJoyTimer);mobileJoyTimer=0;
    mobileNegativePending=false;mobileNegativeUntil=0;clearTimeout(mobileNegativeTimer);mobileNegativeTimer=0;mobilePreviousCash=null;
  }
  const negative=(type==='boost'&&data.good===false)||type==='loan_default'
    ||(type==='short'&&data.needCash>0);
  if(negative)queueMobileNegative();
  const positive=(['quest_claim','milestone','starter_refill'].includes(type))
    ||(['parcel','training_shipment'].includes(type)&&data.pts>0&&!data.auto)
    ||(type==='bp_claim'&&(data.rolls>0||data.hard>0))
    ||(type==='pot'&&data.m>0)||(type==='boost'&&data.good);
  const exceptional=(type==='milestone'&&CFG.MILESTONES.some(m=>m.pts===data.pts))
    ||(type==='parcel'&&!data.auto&&data.extra>0&&data.max>0&&data.pts>data.max&&data.slots>0&&data.slotsUsed>=data.slots);
  if(exceptional)queueMobileJoy('dance');
  else if(positive)queueMobileJoy();
  return result;
};
const mobileOriginalStreet=street;
function mobileGoodSnapshot(){
  const kiosks=myKiosks();
  return [S.cash,S.hard,S.rolls,kiosks.reduce((n,t)=>n+t.goods,0),kiosks.reduce((n,t)=>n+cap(t),0),S.trend];
}
street=async function(...args){
  const before=mobileGoodSnapshot(),result=await mobileOriginalStreet(...args),after=mobileGoodSnapshot();
  if(after[0]<before[0]||after[1]<before[1]||after[2]<before[2]||(after[3]<before[3]&&after[0]<=before[0]))queueMobileNegative();
  else if(after.slice(0,5).some((n,i)=>n>before[i])||after[5]!==before[5])queueMobileJoy();
  return result;
};

const mobileOriginalCollectDrop=collectDrop;
collectDrop=async function(...args){
  const before=mobileGoodSnapshot(),result=await mobileOriginalCollectDrop(...args),after=mobileGoodSnapshot();
  if(after.slice(0,4).some((n,i)=>n<before[i]))queueMobileNegative();
  return result;
};

// Landing reaction belongs before the police choice, rather than hidden behind it.
const mobileOriginalPolice=police;
police=function(...args){
  if(mobilePolicePromise)return mobilePolicePromise;
  mobilePolicePromise=(async()=>{
    const wasMoving=moving;
    mobilePoliceActive=true;S.policePoseTile=S.pos;moving=true;hideTip();
    mobileJoyPending=false;mobileNegativePending=false;
    clearTimeout(mobileJoyTimer);mobileJoyTimer=0;
    clearTimeout(mobileNegativeTimer);mobileNegativeTimer=0;
    $('diceResult').hidden=true;render();
    try{
      if(MobileHost.ready){
        try{await MobileHost.request('react_police',{reduced:matchMedia('(prefers-reduced-motion: reduce)').matches},6000);}
        catch(error){MobileHost.send({action:'cancel_reaction'});console.warn('Police reaction unavailable:',error.message);}
      }
      return await mobileOriginalPolice(...args);
    }finally{
      mobilePoliceActive=false;mobilePolicePromise=null;moving=wasMoving;
      mobilePreviousCash=S.cash;save();render();
    }
  })();
  return mobilePolicePromise;
};

// Под кубиком остаётся только счётчик бросков и обратный отсчёт до следующего.
// Формулировки «+1 через» и правило «+4 при остатке ≤ 3» убраны: правило живёт
// в справке, а на главном экране оно занимало две строки мелким кеглем.
renderRolls = function(){
  const e = $('sRolls');
  if (e) e.textContent = S.rolls + '/' + CFG.ROLLS_PER_DAY;
  const c = $('sRollsCap');
  if (c) {
    const full = S.rolls >= CFG.ROLLS_PER_DAY;
    c.textContent = full ? '' : fmtMs(nextRollIn());
    c.hidden = full;
  }
  const info = $('starterInfo');
  if (info) { info.hidden = true; info.textContent = ''; }
};

// Строка точки под картой обновляется игровым кодом напрямую, поэтому знак
// валюты в ней заменяется наблюдателем. Повторного срабатывания нет: после
// замены символа $ в тексте не остаётся.
(function(){
  const bar = document.getElementById('tilebar');
  if (!bar || typeof cashGlyph !== 'function') return;
  const apply = () => { if (bar.textContent.includes('$')) cashGlyph(bar); };
  new MutationObserver(apply).observe(bar, {childList:true, subtree:true, characterData:true});
  apply();
})();

// Иконки товаров. Сопоставление идёт по названию, а не по эмодзи: у Плотная джинса
// и Косухи в данных один и тот же 🧥, а у сигар вместо предмета стоит флаг 🇨🇺.
// Подставлять разметку прямо в g.icon нельзя — toast экранирует '<', а showTip
// пишет в textContent, и HTML вылез бы текстом. Поэтому меняем готовый DOM.
const GOODS_ICON = {
  'Жвачка':'gum', 'Сигареты':'marl', 'Кубинские сигары':'cigar',
  'Кола':'cola', 'Пиво':'bud', 'Шампанское':'champ',
  'Кассеты':'tape', 'Плеер':'walk', 'CD-плеер':'disc',
  'Джинсы':'jeans', 'Плотная джинса':'levis', "Плотная джинса":'levis', 'Косуха':'jacket',
  'Кроссы':'sneak', 'Баскетбольные кеды':'jordan', 'BMX':'bmx',
  'Видик':'vcr', 'Видеокамера':'cam', 'Компьютер':'comp',
  'Конфеты':'candy','Кондитерская':'cake','Спорт':'sport','Джинса':'jeans','Кожаная одежда':'jacket',
  'Кеды':'keds','Кроссовки':'sneak','Сапоги':'boots','Кассетники':'tape','Плееры':'walk','CD':'disc',
  'Телеки':'tv','Видаки':'vcr','Видеокамеры':'cam','Алкоголь':'champ'
};
function goodsIcons(root){
  if(!root) return;
  root.querySelectorAll('.srow, .row, .warehouse-row').forEach(row => {
    const name = row.querySelector('.nm, .n');
    const slot = row.querySelector('.ico');
    if(!name || !slot || slot.querySelector('.gi')) return;
    const key = (name.textContent || '').trim().split('\n')[0].trim();
    const id = GOODS_ICON[key];
    if(!id) return;
    slot.innerHTML = '<i class="gi" style="background-image:url(assets/goods/' + id + '.webp)"></i>';
  });
}


// Число броска гаснет, когда Джонни добежал и остановился: land() зовётся сразу
// после последнего шага. Оборачиваем последним, поверх всех хуков land.
function hideDiceResult(){
  const el=$('diceResult');if(!el||el.hidden)return;
  el.getAnimations().forEach(a=>a.cancel());
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.hidden=true;return;}
  el.animate([{opacity:1,scale:'1'},{opacity:0,scale:'.85'}],{duration:160,easing:'ease-in'}).finished.then(()=>{el.hidden=true;},()=>{});
}
addEventListener('DOMContentLoaded',()=>{
  if(typeof land!=='function')return;
  const base=land;land=function(){hideDiceResult();return base.apply(this,arguments);};
});
// A stable caption above the controls, independent of the dice/camera position.
function placeDiceResult(el){
  const app=$('app').getBoundingClientRect(),panel=$('panel').getBoundingClientRect();
  el.style.left='50%';
  el.style.top='auto';
  el.style.bottom=Math.max(8,Math.round(app.bottom-panel.top+10))+'px';
  el.style.transform='translateX(-50%)';
}

// Карта поля (board.html?map=…): Канзас — игровая арена по умолчанию (01.10), остальные — по выбору.
// Список синхронен с src/board/sites.js.
const BOARD_MAPS=[['kansas','Канзас'],['brooklyn','Бруклин'],['mainstreet','Мейн-стрит'],['vegas','Лас-Вегас'],['paloalto','Пало-Альто'],['sanfrancisco','Сан-Франциско'],['losangeles','Лос-Анджелес'],['manhattan','Манхэттен'],['liberty','Остров Свободы']];
function boardMap(){try{return localStorage.getItem('americanboy_board_map')||'kansas';}catch(e){return 'kansas';}}
function setBoardMap(id){
  try{localStorage.setItem('americanboy_board_map',id);}catch(e){}
  const f=$('board-frame'),u=new URL(f.src,location.href);
  u.searchParams.set('map',id);
  // поле перезагрузится и заново попросит состояние через sceneReady
  MobileHost.ready=false;document.body.classList.remove('engine-ready');
  f.src=u.pathname.split('/').pop()+u.search;
}

// Полноэкранный режим. На iOS Safari Element.requestFullscreen отсутствует —
// там кнопка прячется, вместо неё работает «На экран Домой».
// Полный экран включает широкий вид (wide-mode): поле на всю ширину экрана,
// интерфейс остаётся вертикальной колонкой по центру. Ориентацию не держим.
const FullScreen = {
  supported(){
    const el = document.documentElement;
    return !!(el.requestFullscreen || el.webkitRequestFullscreen);
  },
  active(){ return !!(document.fullscreenElement || document.webkitFullscreenElement); },
  async toggle(){
    const el = document.documentElement;
    try{
      if(this.active()){
        await (document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen());
      }else{
        await (el.requestFullscreen ? el.requestFullscreen({navigationUI:'hide'}) : el.webkitRequestFullscreen());
      }
    }catch(e){ /* отказ браузера не должен ломать игру */ }
  }
};
// Кнопка на загрузочном экране: касание по ней — жест пользователя,
// без которого браузер полноэкранный режим не включает.
// Хуки выполняются до того, как разметка загрузочного экрана попадает
// в документ, поэтому привязка откладывается до готовности DOM.
function bindBootFullscreen(){
  const b = document.getElementById('bootFull');
  if(!b || !FullScreen.supported()) return;
  b.hidden = false;
  b.onclick = () => { window.setWideMode?.(true); if(!FullScreen.active()) FullScreen.toggle(); };
}
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', bindBootFullscreen);
}else{
  bindBootFullscreen();
}
const syncFullScreenWide = () => { if(FullScreen.active()) window.setWideMode?.(true); };
document.addEventListener('fullscreenchange', syncFullScreenWide);
document.addEventListener('webkitfullscreenchange', syncFullScreenWide);

// Строка точки сереет, когда денег не хватает ни на одно действие внутри.
// Кнопка остаётся нажимаемой: заглянуть в окно можно всегда, серый цвет
// лишь говорит, что купить там сейчас нечего.
function tilebarAffordable(){
  try{
    const t = S.tiles[S.pos];
    if(!t) return true;
    if(t.type === 'wh'){
      const min = Math.min(...CFG.GOODS.map(g => buyPrice(g.id)));
      return S.cash >= min;
    }
    if(t.type === 'kiosk' || t.type === 'biz'){
      if(!t.owner) return S.cash >= t.price;
      // Считаем только то, что делается в окне этой клетки: прокачку и улучшение.
      // Товар на точку покупается на Costco, поэтому здесь он не в счёт.
      const canEvolve = evolveState(t) === 'ok' && S.cash >= evolveCost(t);
      if(t.type === 'biz'){
        const canLevel = t.level < CFG.BIZ.maxLevel && !bizLevelLocked(t) && S.cash >= bizUpCost(t);
        return canLevel || canEvolve;
      }
      // Единый апгрейд (§4): одна прокачка, цена — сумма двух прежних.
      const canUp = kioskLvl(t) < kioskMaxLvl(t) && S.cash >= kioskUpCost(t);
      return canUp || canEvolve;
    }
    return true;
  }catch(e){ return true; }                        // при любой неожиданности не сереем
}
(function(){
  const bar = document.getElementById('tilebar');
  if(!bar) return;
  const apply = () => bar.classList.toggle('poor', !bar.disabled && !tilebarAffordable());
  new MutationObserver(apply).observe(bar, {childList:true, subtree:true, characterData:true, attributes:true});
  apply();
})();

// ===== Онбординг: пять экранов с картинками вместо одиночного приветствия =====
// Порядок повторяет главный цикл игры: точка → товар → касса на старте →
// прокачка → больше продаж. Картинки собраны из ассетов игры: точка на трёх
// уровнях сама рассказывает прокачку (Candy Stand → Smoke Shop → Cigar Club).
// Demonstration reads a copy; no purchase, quest or save is touched.
function onboardUpgradeModel(){
  const original=S.tiles.find(t=>t.type==='kiosk'&&t.good==='gum')||S.tiles.find(t=>t.type==='kiosk');
  const t={...original,owner:'you',salesLvl:1,capLvl:1,goods:0};
  const after=kioskAfter(t),margin=Math.max(0,sellPrice(t.good)-buyPrice(t.good));
  const capNow=cap(t),profitNow=sales(t)*margin;
  const capChanges=after&&after.cap!==capNow,salesChanges=after&&after.sales!==sales(t);
  const focus=capChanges&&salesChanges?'sales':capChanges?'cap':'sales';
  return {name:good(t.good).name,good:t.good,art:PropertyArt.tile(t,MAP1?'mainstreet':'brooklyn',!!CFG.L5_LADDER),level:kioskLvl(t),max:kioskMaxLvl(t),cost:kioskUpCost(t),cap:capNow,nextCap:focus==='cap'?after.cap:capNow,profit:profitNow,nextProfit:focus==='sales'?after.sales*margin:profitNow};
}
function onboardUpgradeArt(m){
 const row=(key,label,value,next)=>`<div class="ob-property-stat${value!==next?' changes':''}" data-stat="${key}"><span>${label}</span><b data-before="${value}" data-after="${next}">${value}</b>${value!==next?`<i>→</i><strong>${next}</strong>`:''}</div>`;
 return `<div class="ob-property" aria-label="Пример улучшения точки"><div class="ob-property-head"><img src="assets/goods/${m.good}.webp" alt=""><b>${m.name}</b><span><i class="ob-demo-level" data-before="${m.level}" data-after="${m.level+1}">${m.level}</i>/${m.max}</span></div><div class="ob-property-picture"><img src="${m.art}" alt="Торговая точка"><span class="ob-upgrade-burst" aria-hidden="true">✦</span></div><div class="ob-property-stats">${row('cap','Запас',m.cap,m.nextCap)}${row('profit','Прибыль за круг',m.profit,m.nextProfit)}</div><button class="ob-demo-upgrade" type="button" aria-label="Показать пример улучшения"><span>Улучшить</span><span><i class="cash-glyph"></i>${m.cost}</span></button></div>`;
}
function onboardingSlides(){
 const m=onboardUpgradeModel();
 const goal=MAP1?3:CFG.TICKET_PTS;
 return [
  {title:'Покупай точку',text:'Встал на свободную клетку — открой карточку и купи точку.',art:`<div class="ob-banner"><img src="assets/points/pt_gum_1.webp" alt="Лоток жвачки"></div><div class="ob-chip">Купить · <i class="cash-glyph"></i>60</div>`},
  {title:'Покупай товар',text:'Закупай на складе. Товар сам разложится по твоим точкам.',art:`<div class="ob-supply"><div class="ob-supply-warehouse"><div class="costco-sign" role="img" aria-label="Склад Costco">${costcoArt(19,10,781,267)}</div><b>Склад</b></div><span class="ob-route-arrow" aria-hidden="true">➜</span><div class="ob-supply-goods"><img src="assets/goods/gum.webp" alt="Жвачка"><img src="assets/goods/cola.webp" alt="Кола"><b>Товары</b></div><span class="ob-route-arrow" aria-hidden="true">➜</span><div class="ob-supply-points"><img src="assets/points/pt_gum_1.webp" alt="Лоток жвачки"><img src="assets/points/pt_cola_1.webp" alt="Тележка колы"><b>Твои точки</b></div></div>`},
  {title:'Прошёл старт — касса!',text:'Проходишь клетку с флажком — товар продаётся. Монеты твои!',art:`<div class="ob-field-fragment" role="img" aria-label="Фрагмент настоящей карты: Джонни рядом с красной стартовой клеткой и клетчатым флажком"><i class="ob-start-ring"></i><img class="ob-start-coin" src="assets/icons/soft.webp" alt=""></div><div class="ob-sale"><img src="assets/goods/gum.webp" alt="Товар"><span aria-hidden="true">➜</span><img src="assets/icons/soft.webp" alt="Монеты"><b>Продажи за круг</b></div>`},
  {title:'Прокачивай точку',text:'Нажми «Улучшить». Следующий уровень увеличит выделенный параметр.',art:onboardUpgradeArt(m),upgrade:true},
  MAP1?{title:'Открой следующую карту',text:'Купи точки, прокачай их и продавай товар. Выполни все три задания карты.',art:`<div class="ob-goal-journey ob-map-goal"><img src="assets/icons/hud-johnny.webp" alt="Джонни"><div class="ob-goal-score"><b>3 из 3</b><span>задания карты</span><div class="ob-goal-meter"><i></i></div></div><span class="ob-route-arrow">➜</span><div class="ob-next-map"><img src="assets/start/city-landscape.webp" alt="Новый район"><b>Следующий район</b></div></div>`}:
  {title:'Заработай билет Джонни',text:'Отправляй товар в поставках — получай очки. Набери нужную сумму за неделю.',art:`<div class="ob-goal-journey"><div class="ob-parcel-goal"><img src="assets/icons/crate.webp" alt="Поставка"><b>Поставки</b></div><span class="ob-route-arrow" aria-hidden="true">➜</span><div class="ob-goal-score"><b>${goal}</b><span>очков за ${CFG.DAYS} дней</span><div class="ob-goal-meter"><i></i></div></div><span class="ob-route-arrow" aria-hidden="true">➜</span><div class="ob-ticket-goal"><img src="assets/icons/nav-ticket-v2.webp" alt="Билет Джонни"><b>Джонни<br>в твоей банде</b></div></div>`}
 ];
}

function showOnboarding(){
  return new Promise(resolve => {
    document.getElementById('onboard')?.remove();
    const root = document.createElement('div');
    root.id = 'onboard'; root.setAttribute('role','dialog'); root.setAttribute('aria-modal','true');
    root.setAttribute('aria-label','Как играть');
    const lesson=onboardingSlides();
    root.innerHTML = `<div class="ob-card">
      <button class="ob-skip" type="button">Пропустить</button>
      <div class="ob-track">${lesson.map((s,i)=>`
        <section class="ob-slide" data-i="${i}" aria-hidden="${i?'true':'false'}">
          <div class="ob-step">Шаг ${i+1} из ${lesson.length}</div>
          <div class="ob-art">${s.art}</div>
          <h2 class="ob-title">${s.title}</h2>
          <p class="ob-text">${s.text}</p>

        </section>`).join('')}</div>
      <div class="ob-dots">${lesson.map((_,i)=>`<i data-i="${i}"></i>`).join('')}</div>
      <button class="ob-next bad" type="button">Дальше</button>
    </div>`;
    document.body.append(root);
    const slides=[...root.querySelectorAll('.ob-slide')], dots=[...root.querySelectorAll('.ob-dots i')];
    const next=root.querySelector('.ob-next');
    let at=0,upgradeTimers=[];
    const stopDemo=()=>{upgradeTimers.forEach(clearTimeout);upgradeTimers=[];};
    const runUpgrade=section=>{
      stopDemo();const card=section.querySelector('.ob-property');if(!card)return;
      card.classList.remove('upgrading','upgraded');
      card.querySelectorAll('[data-before]').forEach(el=>el.textContent=el.dataset.before);
      const button=card.querySelector('button');button.disabled=true;
      const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
      card.classList.add('upgrading');
      upgradeTimers.push(setTimeout(()=>{
        card.querySelectorAll('[data-after]').forEach(el=>el.textContent=el.dataset.after);
        card.classList.add('upgraded');card.classList.remove('upgrading');button.disabled=false;
      },reduced?0:280));
    };
    const show=i=>{
      at=Math.max(0,Math.min(slides.length-1,i));
      slides.forEach((s,k)=>{s.classList.toggle('on',k===at);s.setAttribute('aria-hidden',String(k!==at));});
      dots.forEach((d,k)=>d.classList.toggle('on',k===at));
      next.textContent = at===slides.length-1 ? 'Поехали!' : 'Дальше';
      stopDemo();
      const demo=slides[at].querySelector('.ob-property');
      if(demo){demo.classList.remove('upgrading','upgraded');demo.querySelectorAll('[data-before]').forEach(el=>el.textContent=el.dataset.before);const button=demo.querySelector('button');button.disabled=false;button.onclick=()=>runUpgrade(slides[at]);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)upgradeTimers.push(setTimeout(()=>runUpgrade(slides[at]),1300));}

    };
    const finish=()=>{ stopDemo();root.classList.add('out'); setTimeout(()=>{root.remove();resolve();},220); };
    next.onclick=()=> at===slides.length-1 ? finish() : show(at+1);
    root.querySelector('.ob-skip').onclick=finish;
    dots.forEach(d=>d.onclick=()=>show(+d.dataset.i));
    // свайп влево/вправо
    let x0=null;
    root.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;},{passive:true});
    root.addEventListener('touchend',e=>{
      if(x0===null) return; const dx=e.changedTouches[0].clientX-x0; x0=null;
      if(Math.abs(dx)>40) show(at+(dx<0?1:-1));
    });
    if(typeof enamelButton==='function') enamelButton(next);
    show(0);
    requestAnimationFrame(()=>root.classList.add('in'));
  });
}
window.showOnboarding = showOnboarding;

// Первый запуск: онбординг вместо одиночного окна приветствия, дальше —
// прежнее пошаговое обучение первого круга.
const originalIntro = intro;
intro = async function(again){
  if(again) return originalIntro(again);
  await showOnboarding();
  S.tips.intro=true; S.tips.guideActive=true; save(); render();
};
// «Показать приветствие снова» в справке тоже открывает онбординг.
const originalOpenHelp = openHelp;
openHelp = function(topic,welcome,context){
  const r = originalOpenHelp(topic,welcome,context);
  const rp = document.getElementById('helpReplay');
  if(rp) rp.onclick = () => { closeHelp(); showOnboarding(); };
  return r;
};

// Подсказка «Совет Джонни» — реплика персонажа, а не тёмная системная плашка:
// Джонни с поднятым пальцем из кита и бумажный пузырь с чернильным контуром.
// Вместо строки «Тапни здесь…» — нарисованный крестик; тап вне окна закрывает
// подсказку как и раньше (обработчик pointerdown в прототипе).
// card-motion.js оборачивает showTip уже после этого файла, поэтому анимация
// появления сохраняется: её обёртка вызывает эту версию.
const tipOriginalShow = showTip;
showTip = function(text){
  tipOriginalShow(text);
  const el = $('tip');
  if(!el || el.hidden) return;                 // окно справки открыто — подсказки нет
  el.innerHTML = '<span class="tip-johnny" aria-hidden="true"></span>'
    + '<div class="tip-bubble"><b class="tip-label">Совет Джонни</b><p class="tip-text"></p></div>'
    + '<button class="tip-x" type="button" aria-label="Закрыть"></button>';
  el.querySelector('.tip-text').textContent = text;
  el.setAttribute('role','dialog');
  el.setAttribute('aria-label','Совет Джонни');
  const x = el.querySelector('.tip-x');
  if(typeof paintedClose === 'function') paintedClose(x);
  x.onclick = e => { e.stopPropagation(); hideTip(); };
  positionTip();
  fitCard();
};

// Окно «Больше груза — больше очков» объясняет поставку, но сама кнопка
// поставки внизу под затемнением. Рисуем стрелку от окна к ящику и кольцо
// вокруг кнопки — в слое над затемнением (#modal лежит на z-index:30).
(function(){
  const modal = document.getElementById('modal');
  if(!modal) return;
  let layer = null;
  const target = () => document.getElementById('bShip');
  const wanted = () => {
    if(modal.hidden) return false;
    const h = document.querySelector('#card h2');
    return !!h && /Больше груза/.test(h.textContent);
  };
  const place = () => {
    if(!layer) return;
    const b = target(), card = document.getElementById('card');
    if(!b || !card) return;
    const br = b.getBoundingClientRect(), cr = card.getBoundingClientRect();
    const cx = br.left + br.width/2, top = br.top;
    const ring = layer.querySelector('.ship-ring');
    ring.style.left = (br.left-6)+'px'; ring.style.top = (br.top-6)+'px';
    ring.style.width = (br.width+12)+'px'; ring.style.height = (br.height+12)+'px';
    const arrow = layer.querySelector('.ship-arrow');
    const y0 = Math.min(cr.bottom + 4, top - 40), h = Math.max(36, top - y0 - 8);
    arrow.style.left = (cx-22)+'px'; arrow.style.top = y0+'px'; arrow.style.height = h+'px';
  };
  const sync = () => {
    const on = wanted();
    if(on && !layer){
      layer = document.createElement('div'); layer.className='ship-hint'; layer.setAttribute('aria-hidden','true');
      layer.innerHTML = '<div class="ship-ring"></div><svg class="ship-arrow" viewBox="0 0 44 100" preserveAspectRatio="none">'
        + '<path d="M22 4 C 16 30, 28 56, 22 82" fill="none" stroke="#2a2118" stroke-width="9" stroke-linecap="round"/>'
        + '<path d="M22 4 C 16 30, 28 56, 22 82" fill="none" stroke="#b12f26" stroke-width="5" stroke-linecap="round"/>'
        + '<path d="M8 74 L22 96 L36 74 Z" fill="#b12f26" stroke="#2a2118" stroke-width="3.5" stroke-linejoin="round"/></svg>';
      document.body.append(layer); requestAnimationFrame(place);
    }else if(!on && layer){ layer.remove(); layer = null; }
    else if(on) place();
  };
  new MutationObserver(sync).observe(modal, {attributes:true, childList:true, subtree:true});
  addEventListener('resize', () => layer && place());
})();

// ===== Онбординговый круг: на экране только кубик и строка клетки =====
// Класс на body, CSS прячет остальные кнопки (visibility, чтобы кубик не
// съезжал). Круг заканчивается на старте — дальше всё возвращается.
(function(){
  const sync = () => { try{
    document.body.classList.toggle('first-lap', !!firstLapActive());
    // Иконка плашки задания — по его типу (earn, sell, buy, upg, parcel).
    (S.q||[]).forEach((q,i)=>{ const el=document.getElementById('q'+i); if(el) el.dataset.kind=q.id; });
    // Поставка дня уже ушла: вместо ящика мелкая надпись «Отправка завтра».
    // «Догнать» (пропущенные дни) и «Итоги» остаются обычной кнопкой.
    const ship = document.getElementById('bShip');
    if(ship) ship.classList.toggle('ship-done', !!S.parcelSent && !canFinish() && !(parcelsBehind() > 0));
  }catch(e){} };
  const base = render;
  render = function(){ const r = base.apply(this, arguments); sync(); return r; };
  sync();
})();

// Серые клетки — стройка: за проход мимо неё капает мелочь. Один раз
// объясняем, откуда деньги. Флаг ставится, только если совет реально показан.
function streetPassTip(){
  try{
    if(S.tips.streetPass || !document.getElementById('tip').hidden) return;
    S.tips.streetPass = true; save();
    showTip('Серые клетки — стройка. Пробегая мимо, ты подрабатываешь и получаешь немного денег. Когда улица откроется, здесь появятся новые точки.');
  }catch(e){}
}

// Тосты и советы тоже показывают деньги монетой, а не «$» или купюрой.
(function(){
  // #card — любое окно: не все окна прототипа проходят через fitCard().
  for(const id of ['toast','tip','card']){
    const el=document.getElementById(id); if(!el) continue;
    const apply=()=>{ if(typeof cashGlyph==='function' && /[$💵]/u.test(el.textContent)) cashGlyph(el); };
    new MutationObserver(apply).observe(el,{childList:true,subtree:true,characterData:true});
  }
})();

// One advice component, two compositions: a complete centered card on the
// board and a compact companion above an existing popup.
(function(){
  const base = positionTip;
  positionTip = function(){
    const tip=$('tip'),modal=$('modal'),card=$('card');
    if(tip.hidden){modal.style.paddingTop='';return;}
    const standalone=modal.hidden;
    tip.classList.toggle('tip-standalone',standalone);
    tip.classList.toggle('tip-attached',!standalone);
    if(standalone){
      modal.classList.remove('has-tip');modal.style.paddingTop='';
      document.documentElement.style.setProperty('--tip-space','0px');
      const view=window.visualViewport,height=view?.height||innerHeight,offset=view?.offsetTop||0;
      tip.style.maxHeight=Math.max(120,height-40)+'px';
      tip.style.bottom='auto';
      // offsetHeight excludes the entrance animation's scale and rotation.
      tip.style.top=Math.round(offset+Math.max(20,(height-tip.offsetHeight)/2))+'px';
      return;
    }
    // Advice floats outside the card and never changes its centre or height.
    if(card?.classList.contains('illustrated-property')){
      modal.classList.remove('has-tip');modal.style.paddingTop='';
      document.documentElement.style.setProperty('--tip-space','0px');
      if(window.PropertyUpgradeFx?.busy){tip.hidden=true;return;}
      const box=card.getBoundingClientRect(),h=tip.offsetHeight;
      if(box.top<h+16){tip.hidden=true;return;}
      tip.style.top=Math.max(8,box.top-h-8)+'px';tip.style.bottom='auto';
      return;
    }
    base.apply(this,arguments);
    if(!card)return;
    const h=tip.offsetHeight;
    const head=$('top').getBoundingClientRect().bottom+8;
    modal.style.paddingTop=Math.round(head+h+8)+'px';
    const cardTop=modal.getBoundingClientRect().top+card.offsetTop;
    tip.style.top=Math.max(head,Math.round(cardTop-h-4))+'px';
  };
  const card=$('card');
  if(card&&'ResizeObserver' in window)new ResizeObserver(()=>positionTip()).observe(card);
  const reset=()=>{
    const tip=$('tip'),modal=$('modal');
    if(tip.hidden){modal.style.paddingTop='';return;}
    positionTip();
  };
  for(const id of ['tip','modal'])new MutationObserver(reset).observe($(id),{attributes:true,attributeFilter:['hidden']});
  window.visualViewport?.addEventListener('resize',()=>positionTip());
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&!$('tip').hidden){event.preventDefault();hideTip();}
  });
})();

// Таймер дня: часы на плашке уже говорят о времени — крупно остаток, мелко «до полуночи».
(function(){
  const span=document.querySelector('#sTimer span'); if(!span) return;
  const fmt=()=>{ const t=span.textContent, m=t.match(/^До полуночи\s+(.+)$/);
    if(m && !span.querySelector('b')){ span.innerHTML=`<b>${m[1]}</b><small>до полуночи</small>`; } };
  new MutationObserver(fmt).observe(span,{childList:true,characterData:true,subtree:true}); fmt();
})();

// ===== Широкий экран на компьютере =====
// На телефоне игра — вертикальная колонка. С мышью и на широком мониторе есть
// кнопка «Во весь экран»: браузер уходит в полноэкранный режим, карта
// растягивается на весь экран, а панели остаются колонкой по центру.
(function(){
  const desktop=()=>matchMedia('(pointer:fine)').matches&&innerWidth>=760;
  const btn=document.createElement('button');
  btn.id='wideBtn';btn.type='button';
  const ICON_ON='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_OFF='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  // Кнопка управляет настоящим полным экраном браузера (без адресной строки и вкладок).
  // Широкий вид на компьютере включается сам; раньше кнопка сначала его выключала,
  // и до полного экрана нужно было нажать дважды.
  const paint=()=>{const full=FullScreen.active();
    btn.innerHTML=(full?ICON_OFF:ICON_ON)+`<span>${full?'Выйти из полного экрана':'Во весь экран'}</span>`;
    btn.hidden=!desktop()||!FullScreen.supported();};
  const setWide=on=>{document.body.classList.toggle('wide-mode',on);paint();
    // поле и HUD пересчитывают раскладку под новую ширину
    requestAnimationFrame(()=>{dispatchEvent(new Event('resize'));mobileLayout();});};
  window.setWideMode=setWide;
  // Выбор игрока запоминается: «Обычный вид» на компьютере не перекрывается автовключением.
  const WIDE_KEY='americanboy_wide';
  const remember=on=>{try{localStorage.setItem(WIDE_KEY,on?'1':'0');}catch(e){}};
  btn.onclick=async()=>{
    if(!FullScreen.active()&&!document.body.classList.contains('wide-mode')){setWide(true);remember(true);}
    await FullScreen.toggle();paint();
  };
  document.addEventListener('fullscreenchange',paint);document.addEventListener('webkitfullscreenchange',paint);
  // С компьютера — сразу во всю ширину браузера (решение продюсера 28.09.2026).
  // Настоящий полноэкранный режим браузер даёт только по жесту, его включит кнопка.
  const autoWide=()=>{let pref=null;try{pref=localStorage.getItem(WIDE_KEY);}catch(e){}
    if(desktop()&&pref!=='0'&&!document.body.classList.contains('wide-mode'))setWide(true);};
  // Вышли из полноэкранного клавишей Esc — остаёмся в широком виде, кнопка вернёт колонку.
  addEventListener('resize',paint);
  const mount=()=>{document.body.append(btn);paint();autoWide();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();

// Income amount is still credited by the rules; this is one visual coin per passed cell.
function streetPassCoin(tile){
  if(MobileHost.ready)MobileHost.send({action:'street_coin',tile});
}

// Выбор карты поля — в «Настройках аккаунта» (окно — web/top-hud.js), над «Сохранить»:
// для просмотра всех подложек без меню тестирования.
(function(){
  const add=card=>{
    if(card.querySelector('#hudMap')||typeof BOARD_MAPS==='undefined')return;
    const save=card.querySelector('#hudSave');if(!save)return;
    const wrap=document.createElement('label');wrap.id='hudMap';wrap.className='hud-name hud-map';wrap.textContent='Карта';
    const sel=document.createElement('select');sel.setAttribute('aria-label','Карта поля');
    sel.innerHTML=BOARD_MAPS.map(([id,name])=>`<option value="${id}"${id===boardMap()?' selected':''}>${name}</option>`).join('');
    sel.onchange=()=>{setBoardMap(sel.value);closeModal();};
    wrap.append(sel);save.before(wrap);
  };
  new MutationObserver(()=>{const card=$('card');if(card.classList.contains('hud-account'))add(card);})
    .observe($('card'),{childList:true});
})();

// Меню тестирования без ?playtest=1: 5 быстрых тапов по заголовку «Настройки аккаунта»
// (окно — web/top-hud.js). Сохранение и телеметрия не меняются, в отличие от PLAYTEST:
// тот переключает партию на отдельный ключ. Флаг помнится в этом браузере; ещё 5 тапов — выключить.
(function(){
  const KEY='americanboy_testing_menu';
  const on=()=>{try{return localStorage.getItem(KEY)==='1';}catch(e){return false;}};
  const set=v=>{try{v?localStorage.setItem(KEY,'1'):localStorage.removeItem(KEY);}catch(e){}};
  const addBtn=card=>{
    if(card.querySelector('#hudTesting'))return;
    const save=card.querySelector('#hudSave');if(!save)return;
    const b=document.createElement('button');b.id='hudTesting';b.className='sec';b.textContent='Меню тестирования';
    b.onclick=()=>{card.className='card';settings();};
    save.before(b);if(typeof enamelButton==='function'&&save.classList.contains('enamel-button'))enamelButton(b);
  };
  new MutationObserver(()=>{const card=$('card');if(card.classList.contains('hud-account')&&on())addBtn(card);})
    .observe($('card'),{childList:true});
  let taps=0,last=0;
  document.addEventListener('click',e=>{
    if(!e.target.closest('#card.hud-account h2'))return;
    const now=Date.now();taps=now-last<1500?taps+1:1;last=now;
    if(taps<5)return;taps=0;
    const card=$('card'),next=!on();set(next);
    if(next){addBtn(card);toast('Меню тестирования включено');}
    else{if(!PLAYTEST)card.querySelector('#hudTesting')?.remove();toast('Меню тестирования выключено');}
  });
})();

// Отладка: «Шаг на 1 клетку» в меню тестирования (окно «Настройки» с #iRolls).
// Идёт обычный бросок с кубиками 1 + 0: срабатывает вся логика хода — старт, сборы
// с точек, остановка на клетке, участок и инспектор. Ход не списывается.
(function(){
  async function debugStep(){
    if(moving||S.finished)return;
    // Бросок списывает ход до кубиков — возвращаем ровно его. Ходы, выданные на клетке, остаются.
    const md=mobileDice,bump=S.rolls<=0;let used=false;
    mobileDice=async()=>{used=true;return {a:1,b:0,lesson:false};};
    if(bump)S.rolls=1;
    try{await roll();}finally{mobileDice=md;}
    if(used)S.rolls++;if(bump)S.rolls=Math.max(0,S.rolls-1);save();render();
  }
  new MutationObserver(()=>{const c=$('card');
    // Проверка по всей странице: кнопка встаёт перед .mbtns, а не внутрь наблюдаемого блока.
    if(!c.querySelector('#iRolls')||document.getElementById('dbgStep'))return;
    const b=document.createElement('button');b.id='dbgStep';b.className='sec';b.textContent='👣 Шаг на 1 клетку';b.style.cssText='width:100%;margin:6px 0';
    (c.querySelector('.mbtns')||c).before(b);if(typeof enamelButton==='function')enamelButton(b);
    b.onclick=()=>{closeModal();setTimeout(debugStep,160);};
  }).observe($('card'),{childList:true,subtree:true});
})();

// Полный экран — и в «Настройках аккаунта» (окно из web/top-hud.js), чтобы включать с телефона.
// На iPhone Safari полноэкранного режима для страниц нет — там кнопки не будет.
(function(){
  const label=()=>FullScreen.active()?'Выйти из полного экрана':'Во весь экран';
  new MutationObserver(()=>{
    const card=$('card');if(!card.classList.contains('hud-account')||card.querySelector('#hudFull')||!FullScreen.supported())return;
    const save=card.querySelector('#hudSave');if(!save)return;
    const b=document.createElement('button');b.id='hudFull';b.className='sec';b.textContent=label();
    b.onclick=async()=>{if(!FullScreen.active())window.setWideMode?.(true);await FullScreen.toggle();b.textContent=label();};
    (card.querySelector('#hudTesting')||save).before(b);
    if(typeof enamelButton==='function'&&save.classList.contains('enamel-button'))enamelButton(b);
  }).observe($('card'),{childList:true});
})();
