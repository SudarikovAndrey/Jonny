// Same BP rewards, price, and save fields as the prototype; live painted presentation.
function passArt(x,y,w,h,cls=''){return atlasArt(x,y,w,h,cls,'battlepass-reference.png',1024,1536);}
function passIcon(kind){
 if(kind==='check')return atlasArt(1006,541,64,62,'round-art','battlepass-atlas.png');
 const art={crown:'<path d="m6 17 10 8L23 5l9 20 11-9-4 28H10Z" fill="#edb43a" stroke="#302719" stroke-width="3"/><path d="M12 37h25" stroke="#fff0ae" stroke-width="3"/>',dice:'<path d="m25 3 21 12v24L25 51 4 39V15Z" fill="#eee0bc" stroke="#302719" stroke-width="2.5"/><path d="m4 15 21 12 21-12M25 27v24" fill="none" stroke="#302719" stroke-width="2"/><g fill="#302719"><ellipse cx="25" cy="14" rx="4" ry="2.4"/><ellipse cx="13" cy="26" rx="2.8" ry="3.5"/><ellipse cx="17" cy="38" rx="2.8" ry="3.5"/><ellipse cx="34" cy="28" rx="2.6" ry="3.3"/><ellipse cx="39" cy="35" rx="2.6" ry="3.3"/></g>',gem:'<path d="M11 9h29l10 14-25 28L1 23Z" fill="#45bbdf" stroke="#302719" stroke-width="2.5"/><path d="m11 9 5 14 9 28 9-28 6-14M1 23h49M16 23 25 9l9 14" fill="none" stroke="#e0f8ff" stroke-width="2"/>',skin:'<path d="M7 32C5 6 41 4 43 30l7 8H23L7 32Z" fill="#3479a4" stroke="#302719" stroke-width="3"/><path d="M25 10v20M8 31l15 7 20-8" fill="none" stroke="#142f47" stroke-width="2"/><circle cx="30" cy="25" r="4" fill="#efc453"/>',lock:'<path d="M15 23V14c0-15 22-15 22 0v9" fill="none" stroke="currentColor" stroke-width="5"/><rect x="8" y="22" width="36" height="28" rx="6" fill="currentColor"/><path d="M26 31v9" stroke="#ebd09a" stroke-width="4"/>',check:'<circle cx="26" cy="26" r="22" fill="#347147" stroke="#2b3521" stroke-width="3"/><path d="m14 27 8 8 16-19" fill="none" stroke="#fff0cb" stroke-width="5" stroke-linecap="round"/>'};
 return `<svg viewBox="0 0 52 54" aria-hidden="true">${art[kind]||art.dice}</svg>`;
}
function passReward(w){return `${w.rolls?`<span>${passIcon('dice')}<b>+${w.rolls}</b></span>`:''}${w.hard?`<span>${passIcon('gem')}<b>+${w.hard}</b></span>`:''}${w.skin?`<span>${passIcon('skin')}<b>Скин</b></span>`:''}`;}
function passRewardText(w){return [w.rolls?`${w.rolls} ходов`:'',w.hard?`${w.hard} кристаллов`:'',w.skin?'скин Джонни':''].filter(Boolean).join(', ');}
let passClaimBusy=false;
function renderBattlePass(redraw,tabs){
 const card=$('card'),L=bpLevel(),available=bpClaimable(),progress=L>=BP.max?1:(S.pts-bpNeed(L))/(bpNeed(L+1)-bpNeed(L));
 card.className='card battlepass-card';
 const row=(k)=>{
  const lane=t=>{const premium=t==='paid',reward=premium?BP.paid(k):BP.free(k),claimed=k<=(premium?S.bp.claimedPaid:S.bp.claimedFree),locked=premium&&!S.bp.paid,ready=k<=L&&!locked&&!claimed;
   return `<button class="pass-reward ${premium?'premium':'free'} ${claimed?'claimed':ready?'available':'locked'}" data-level="${k}" data-lane="${t}" ${claimed||(!ready&&!locked)?'disabled':''} aria-label="Уровень ${k}, ${premium?'премиум':'бесплатно'}: ${passRewardText(reward)}. ${claimed?'Получено':ready?'Забрать доступные награды':locked?'Открыть премиум':'Нужно '+bpNeed(k)+' очков'}"><span class="pass-loot">${passReward(reward)}</span><span class="pass-state">${claimed?passIcon('check'):ready?'Забрать':locked?passIcon('lock'):bpNeed(k)+' очк.'}</span></button>`;};
  return `<div class="pass-rung ${k<=L?'reached':''}" data-level="${k}">${lane('free')}<span class="pass-level ${k===L+1?'next':''}">${k}</span>${lane('paid')}</div>`;
 };
 card.innerHTML=`<header class="pass-header"><span class="pass-stamp">NY<br><b>01</b></span><div><h2>Баттлпасс</h2><small>Джонни идёт к успеху</small></div><button id="hNo" class="xhead" aria-label="Закрыть"></button><div class="pass-progress"><b>Ур. ${L}</b><div><span>${L>=BP.max?'Все уровни открыты':`${S.pts-bpNeed(L)} / ${bpNeed(L+1)-bpNeed(L)} очков`}</span><div class="pass-meter"><i style="--progress:${progress}"></i></div></div><small>До конца<br><b>${lbTimeLeft()}</b></small></div></header>
 <div class="pass-scene">${passArt(0,240,420,145)}<span>Каждая поставка —<br>ступень к наградам</span><div class="pass-hero">${passArt(452,234,172,160)}</div></div><div class="pass-scroll">
 <div class="pass-lanes"><b>Бесплатно</b><span></span><b>${passIcon('crown')}Премиум</b></div><div class="pass-stairs"><div class="pass-side left">${passArt(0,280,175,350).replace('xMidYMid meet','xMidYMid slice')}</div><div class="pass-side right">${passArt(900,430,120,280).replace('xMidYMid meet','xMidYMid slice')}</div>${Array.from({length:BP.max},(_,i)=>row(BP.max-i)).join('')}</div>
 <details class="pass-tasks"><summary>Как продвигаться?</summary><p>Отправляй товары пацанам. Первые уровни открываются почти сразу, дальше каждый требует чуть больше очков ивента.</p><button class="sec" id="passShip">К поставке</button></details></div>
 <footer class="pass-footer"><div class="pass-feedback" aria-live="polite">${available?`Доступно наград: ${available}`:L>=BP.max?'Все ступени пройдены!':`Следующая награда: ${passRewardText(BP.free(L+1))}`}</div>${available?`<button id="bpClaim" class="ok">Забрать всё · ${available}</button>`:''}${S.bp.paid?`<div class="pass-owned">${passIcon('crown')}Премиум открыт · +1 место в фуре</div>`:`<button id="bpBuy" class="bad">${passIcon('crown')}Открыть премиум <b>${BP.price} ₽</b></button>`}${tabs}</footer>`;
 paintedClose($('hNo'));card.querySelectorAll('.pass-footer button:not([data-tab]),#passShip').forEach(enamelButton);
 const claim=async()=>{
  if(passClaimBusy||!bpClaimable())return;passClaimBusy=true;
  const scroll=card.querySelector('.pass-scroll').scrollTop;
  try{
   const won=bpClaim();save();render();
   card.querySelectorAll('.pass-reward.available').forEach(el=>{el.disabled=true;el.classList.add('collecting');});
   card.querySelector('.pass-feedback').textContent=`Получено: +${won.r} ходов${won.h?' и '+won.h+' кристаллов':''}`;
   window.GameFeedback?.sound?.('joy');queueMobileJoy();
   await new Promise(r=>setTimeout(r,matchMedia('(prefers-reduced-motion: reduce)').matches?0:480));
   if(!card.classList.contains('battlepass-card')||$('modal').hidden)return;
   renderBattlePass(redraw,tabs);card.querySelector('.pass-scroll').scrollTop=scroll;
   card.querySelector('.pass-feedback').textContent=`Получено: +${won.r} ходов${won.h?' · +'+won.h+' кристаллов':''}`;
   bindPassTabs(redraw);
  }finally{passClaimBusy=false;}
 };
 $('bpClaim')?.addEventListener('click',claim);
 card.querySelectorAll('.pass-reward.available').forEach(el=>el.onclick=claim);
 const offer=()=>passPremiumOffer(redraw,tabs);
 $('bpBuy')?.addEventListener('click',offer);card.querySelectorAll('.pass-reward.premium.locked').forEach(el=>el.onclick=offer);
 $('passShip').onclick=()=>{closeModal();setTimeout(()=>parcel(),180);};
 $('hNo').onclick=()=>closeModal();
 // Start at the current step at the bottom; the ladder climbs upward.
 requestAnimationFrame(()=>{if(!card.classList.contains('battlepass-card'))return;const pane=card.querySelector('.pass-scroll'),target=card.querySelector(`.pass-rung[data-level="${Math.max(1,Math.min(BP.max,L))}"]`);if(target)pane.scrollTop=target.getBoundingClientRect().top-pane.getBoundingClientRect().top+pane.scrollTop-pane.clientHeight*.55;});
}
function bindPassTabs(redraw){$('card').querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{hubTab=b.dataset.tab;redraw();});}
function passPremiumOffer(redraw,tabs){
 if(S.bp.paid)return;
 const previous=$('card').querySelector('.pass-offer');
 if(previous){if(!previous.inert)return;PaperMotion.stop(previous.querySelector('.pass-offer-paper'));previous.remove();}
 const L=bpLevel(),waiting=L; // уже пройденные уровни сразу отдадут премиум-награды
 let rolls=0,hard=0;for(let k=1;k<=BP.max;k++){const r=BP.paid(k);rolls+=r.rolls||0;hard+=r.hard||0;}
 const layer=document.createElement('div');layer.className='pass-offer';layer.setAttribute('role','dialog');layer.setAttribute('aria-label','Премиум пропуска');
 // Окно по навыку game-ui-designer: одно решение — купить или нет. Шапка-шильда,
 // корона на лучах, три выгоды плашками, цена на главной кнопке.
 layer.innerHTML=`<div class="pass-offer-paper">
   <div class="po-hero"><span class="po-sun"></span><span class="po-crown">${passIcon('crown')}</span></div>
   <h2 class="po-title">Премиум</h2><p class="po-sub">награды на каждой ступени</p>
   <div class="po-list">
     <div class="po-row"><span class="po-ic">${passIcon('dice')}</span><span class="po-t"><b>+${rolls} ходов</b><small>за все ${BP.max} уровней</small></span></div>
     <div class="po-row"><span class="po-ic">${passIcon('gem')}</span><span class="po-t"><b>+${hard} кристаллов</b><small>и скин Джонни на ${BP.max}-м</small></span></div>
     <div class="po-row"><span class="po-ic"><img src="assets/icons/crate.png" alt=""></span><span class="po-t"><b>+1 место в фуре</b><small>до конца недели</small></span></div>
   </div>
   ${waiting?`<p class="po-now">Сразу заберёшь награды за ${waiting} ${waiting===1?'уровень':waiting<5?'уровня':'уровней'}</p>`:''}
   <button class="ok" id="passConfirm">Открыть · ${BP.price} ₽</button>
   <button class="po-later" id="passCancel">Пока не надо</button>
   <small class="po-note">тестовая покупка — деньги не списываются</small>
 </div>`;
 $('card').append(layer);enamelButton($('passConfirm'));PaperMotion.enter(layer.querySelector('.pass-offer-paper'));
 $('passCancel').onclick=()=>dismissPaperOffer(layer);layer.onclick=e=>{if(e.target===layer)dismissPaperOffer(layer);};
 $('passConfirm').onclick=()=>{
  if(S.bp.paid||layer.inert)return;
  bpBuy();save();render();
  premiumCelebration(layer,()=>{renderBattlePass(redraw,tabs);bindPassTabs(redraw);revealPremiumLane();},waiting);
 };
 $('passConfirm').focus();
}

// ===== Сцена покупки премиума (навык cartoon-animation) =====
// 1) кнопка «вдавливается» — упреждение; 2) окно «выстреливает» короной вверх и
// схлопывается; 3) корона по дуге вылетает в центр, раздувается с перелётом,
// за ней крутятся лучи, из-под неё — конфетти и звёзды «на двойках»;
// 4) шильда «ПРЕМИУМ ОТКРЫТ!» падает сверху штампом со сжатием;
// 5) всё улетает в шапку пропуска, премиум-дорожка переворачивается плашками.
function premiumCelebration(layer,after,waiting){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 layer.inert=true;
 const paper=layer.querySelector('.pass-offer-paper'),btn=$('passConfirm'),crownEl=layer.querySelector('.po-crown');
 const from=crownEl.getBoundingClientRect();
 const stage=document.createElement('div');stage.className='prem-stage';
 stage.innerHTML=`<canvas class="prem-confetti"></canvas><span class="prem-rays"></span><span class="prem-crown">${passIcon('crown')}</span>
  <div class="prem-plate"><b>Премиум открыт!</b>${waiting?`<small>+${waiting} ${waiting===1?'награда ждёт':waiting<5?'награды ждут':'наград ждут'}</small>`:''}</div>`;
 document.body.append(stage);
 GameFeedback?.sound?.('dance');
 if(reduced){stage.classList.add('reduced');setTimeout(()=>{stage.remove();layer.remove();after();},900);return;}
 const crown=stage.querySelector('.prem-crown'),rays=stage.querySelector('.prem-rays'),plate=stage.querySelector('.prem-plate');
 const W=innerWidth,H=innerHeight,cx=W/2,cy=H*0.42,size=Math.min(W*0.46,220);
 crown.style.width=crown.style.height=size+'px';rays.style.width=rays.style.height=size*2.4+'px';
 // 1. упреждение кнопки и окна
 btn.animate([{scale:1},{scale:.9,translate:'0 3px'},{scale:1.04},{scale:1}],{duration:260,easing:'ease-out'});
 paper.animate([{scale:1,rotate:'0deg'},{scale:.97,rotate:'-1deg',offset:.3},{scale:1.03,offset:.55},{scale:0,rotate:'8deg',opacity:0}],{duration:520,delay:160,easing:'cubic-bezier(.5,0,.6,1)',fill:'forwards'});
 crownEl.style.visibility='hidden';
 // 2. корона по дуге в центр: старт у маленькой короны окна
 const sx=from.left+from.width/2,sy=from.top+from.height/2,s0=from.width/size;
 crown.animate([
   {transform:`translate(${sx-cx}px,${sy-cy}px) scale(${s0}) rotate(-8deg)`},
   {transform:`translate(${(sx-cx)*.4}px,${(sy-cy)*.4-H*.16}px) scale(${s0*1.6}) rotate(14deg)`,offset:.45},
   {transform:'translate(0,0) scale(1.18,.82) rotate(0deg)',offset:.8},
   {transform:'translate(0,0) scale(.94,1.08)',offset:.9},
   {transform:'translate(0,0) scale(1)'}],{duration:760,delay:260,easing:'cubic-bezier(.3,.7,.3,1)',fill:'forwards'});
 rays.animate([{opacity:0,transform:'scale(.2) rotate(0deg)'},{opacity:1,transform:'scale(1.08) rotate(40deg)',offset:.35},{opacity:1,transform:'scale(1) rotate(160deg)'}],{duration:2400,delay:760,easing:'ease-out',fill:'forwards'});
 // 4. шильда штампом
 plate.animate([{opacity:0,transform:'translate(-50%,-160px) rotate(-10deg) scale(1.3)'},{opacity:1,transform:'translate(-50%,6px) rotate(-3deg) scale(1.12,.84)',offset:.55},{transform:'translate(-50%,-4px) rotate(-3deg) scale(.96,1.05)',offset:.78},{opacity:1,transform:'translate(-50%,0) rotate(-3deg) scale(1)'}],{duration:520,delay:1080,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
 setTimeout(()=>GameFeedback?.sound?.('joy'),1100);
 // 3. конфетти и звёзды на холсте, время квантуется по 1/12 с — «на двойках»
 const cv=stage.querySelector('.prem-confetti'),dpr=Math.min(devicePixelRatio||1,2);cv.width=W*dpr;cv.height=H*dpr;
 const ctx=cv.getContext('2d');ctx.scale(dpr,dpr);
 const cols=['#c43a2d','#f0c44e','#243f4b','#e9d8ae','#5c8f47'],bits=[];
 const burst=(n,spd)=>{for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=spd*(0.5+Math.random());bits.push({x:cx,y:cy,vx:Math.cos(a)*v,vy:Math.sin(a)*v-spd*0.6,r:5+Math.random()*6,rot:Math.random()*6,vr:(Math.random()-.5)*14,c:cols[i%cols.length],star:i%5===0,life:1.6+Math.random()*.8});}};
 setTimeout(()=>burst(70,560),980);setTimeout(()=>burst(40,420),1250);
 let last=performance.now(),acc=0,alive=true;
 const tick=now=>{if(!alive)return;const dt=Math.min(.05,(now-last)/1000);last=now;acc+=dt;
  if(acc>=1/12){const step=acc;acc=0;ctx.clearRect(0,0,W,H);
   for(const b of bits){b.vy+=900*step;b.vx*=.985;b.x+=b.vx*step;b.y+=b.vy*step;b.rot+=b.vr*step;b.life-=step;if(b.life<=0)continue;
    ctx.save();ctx.translate(b.x,b.y);ctx.rotate(b.rot);ctx.globalAlpha=Math.min(1,b.life*2);ctx.fillStyle=b.c;ctx.strokeStyle='#2a2118';ctx.lineWidth=2;
    if(b.star){ctx.beginPath();for(let k=0;k<10;k++){const rr=k%2?b.r*.45:b.r*1.2,aa=k*Math.PI/5;ctx.lineTo(Math.cos(aa)*rr,Math.sin(aa)*rr);}ctx.closePath();ctx.fill();ctx.stroke();}
    else{const w=b.r*2,h=b.r*1.1*Math.abs(Math.cos(b.rot*1.7))+1;ctx.fillRect(-w/2,-h/2,w,h);ctx.strokeRect(-w/2,-h/2,w,h);}
    ctx.restore();}}
  requestAnimationFrame(tick);};
 requestAnimationFrame(tick);
 // 5. уход: корона улетает в шапку пропуска, сцена гаснет, дорожка переворачивается
 setTimeout(()=>{
  layer.remove();after();
  const head=$('card').querySelector('.pass-header')?.getBoundingClientRect();
  const tx=head?head.left+head.width*0.5-cx:0,ty=head?head.top+30-cy:-H*.4;
  crown.animate([{transform:'translate(0,0) scale(1)'},{transform:`translate(${tx*.3}px,${ty*.3+40}px) scale(1.1,.9)`,offset:.25},{transform:`translate(${tx}px,${ty}px) scale(.18)`,opacity:.9}],{duration:520,easing:'cubic-bezier(.5,0,.3,1)',fill:'forwards'});
  plate.animate([{opacity:1},{opacity:0,transform:'translate(-50%,-20px) rotate(-3deg) scale(.9)'}],{duration:260,fill:'forwards'});
  rays.animate([{opacity:1},{opacity:0}],{duration:420,fill:'forwards'});
  stage.animate([{background:'rgba(24,18,12,.62)'},{background:'rgba(24,18,12,0)'}],{duration:520,fill:'forwards'});
  setTimeout(()=>{alive=false;stage.remove();queueMobileJoy('dance');},600);
 },2900);
}
// Премиум-плашки переворачиваются по очереди снизу вверх — видно, что открылось.
function revealPremiumLane(){
 const lane=[...$('card').querySelectorAll('.pass-reward.premium')].reverse();
 lane.forEach((el,i)=>{el.animate([{transform:'rotateY(90deg) scale(.9)',filter:'brightness(1.6)'},{transform:'rotateY(-12deg) scale(1.05)',filter:'brightness(1.25)',offset:.65},{transform:'none',filter:'none'}],{duration:420,delay:140+i*70,easing:'cubic-bezier(.3,1.4,.5,1)',fill:'backwards'});});
}

// ===== «Билет» и «Топ» в стиле баттлпасса =====
// Та же рамка, что у пропуска: клеймо NY 01, заголовок-шильда, строка
// прогресса, небо с городом, плашки-ступени, вкладки в подвале. Лишние тексты
// убраны: справка, колонки таблицы, дубль прогресса билета в рейтинге,
// кнопки «Джонни» и «Как играть» (обе есть на главном экране).
function hubHead(title,badge,note,progress,right){
 return `<header class="pass-header hub-head"><span class="pass-stamp">NY<br><b>01</b></span><div><h2 class="hub-title">${title}</h2></div><button id="hNo" class="xhead" aria-label="Закрыть"></button>
  <div class="pass-progress"><b>${badge}</b><div><span>${note}</span><div class="pass-meter"><i style="--progress:${Math.max(0,Math.min(1,progress))}"></i></div></div><small>${right}</small></div></header>`;
}
function hubLoot(r){
 return `${r.rolls?`<span>${passIcon('dice')}<b>+${r.rolls}</b></span>`:''}${r.hard?`<span>${passIcon('gem')}<b>+${r.hard}</b></span>`:''}${r.cash?`<span><b>+$${r.cash}</b></span>`:''}`;
}
function hubTicket(tabs){
 const nm=nextMilestone(), prev=reachedMilestones().slice(-1)[0], from=prev?prev.pts:0, to=nm?nm.pts:from, nz=nextZone();
 const goals=CFG.MILESTONES.map((m,i)=>{const done=S.pts>=m.pts,next=nm&&nm.pts===m.pts;
  return `<div class="hub-plate hub-goal ${done?'claimed':next?'available':'locked'}"><span class="pass-level hub-pts">${m.pts}</span><span class="hub-text"><b>${m.name}</b><small>${m.reward}</small></span><span class="pass-state"></span></div>`;}).reverse().join('');
 const quests=S.q.map((q,i)=>`<div class="hub-plate hub-quest ${q.claimed?'claimed':q.done?'available':'locked'}"><span class="hub-text"><b>${q.text}</b></span><span class="pass-loot">${hubLoot(q.reward)}</span>${q.claimed?'<span class="pass-state"></span>':q.done?`<button class="ok hub-claim" data-claim="${i}">Забрать</button>`:`<span class="hub-prog">${Math.min(q.prog,q.goal)}/${q.goal}</span>`}</div>`).join('');
 const zone=nz>0?`<div class="hub-plate hub-zone"><span class="hub-text"><b>${CFG.ZONES[nz].name}</b><small>откроется в день ${CFG.ZONES[nz].day}</small></span>${zonePrice(nz)>0?`<button class="hard" id="hZone" ${S.hard<zonePrice(nz)?'disabled':''}>${passIcon('gem')}<b>${zonePrice(nz)}</b></button>`:`<button class="ok" id="hZone">Открыть</button>`}</div>`:'';
 return hubHead('Билет Джонни',S.pts,nm?`до ${nm.pts} ещё ${nm.pts-S.pts}`:'Все рубежи взяты',nm?(S.pts-from)/(to-from):1,`До конца<br><b>${lbTimeLeft()}</b>`)
  +`<div class="pass-scroll hub-scroll"><div class="hub-list">${goals}<h3 class="hub-sub">Задания дня</h3>${quests}${zone}</div></div><footer class="pass-footer">${tabs}</footer>`;
}
function hubTop(tabs){
 const rows=lbRows(), me=rows.findIndex(r=>r.you), above=me>0?rows[me-1]:null;
 const row=(r,i)=>`<div class="hub-plate hub-rank ${r.you?'me':''} ${i<3?'top'+(i+1):''}"><span class="pass-level">${i+1}</span><span class="hub-ava">${r.you?'🧢':LB_AVA[LB_NAMES.indexOf(r.n)]||'🙂'}</span><span class="hub-text"><b>${r.you?'Ты':r.n}</b><small>${r.pts} очк.</small></span><span class="pass-loot"><span>${passIcon('gem')}<b>${LB_REWARD[i]||0}</b></span></span></div>`;
 return hubHead('Бруклин',`#${me+1}`,above?`до #${me} ещё ${Math.max(1,above.pts-S.pts)}`:'Ты первый!',above?S.pts/Math.max(1,above.pts):1,`До конца<br><b>${lbTimeLeft()}</b>`)
  +`<div class="pass-scroll hub-scroll"><div class="hub-list">${rows.slice(0,10).map(row).join('')}${me>=10?row(rows[me],me):''}</div></div><footer class="pass-footer">${tabs}</footer>`;
}
eventHub=async function(tab){
 if(tab)hubTab=tab; else if(bpClaimable()>0)hubTab='pass';
 if(hubTab==='pass'&&!(S.bp&&S.bp.paid))offerShow('pass',{level:bpLevel(),pts:S.pts,day:S.day});
 const draw=()=>{
  const bc=bpClaimable(),place=lbPlace(),card=$('card');
  const tabs=`<div class="segbar"><button class="${hubTab==='ticket'?'on':''}" data-tab="ticket">Билет</button><button class="${hubTab==='pass'?'on':''}" data-tab="pass">Пропуск${bc?' <i class="dot"></i>':''}</button><button class="${hubTab==='lb'?'on':''}" data-tab="lb">Топ #${place}</button></div>`;
  if(hubTab==='pass'){card.classList.remove('hub-card');renderBattlePass(draw,tabs);}
  else{
   card.className='card battlepass-card hub-card';
   card.innerHTML=hubTab==='lb'?hubTop(tabs):hubTicket(tabs);
   paintedClose($('hNo'));card.querySelectorAll('.hub-claim,#hZone').forEach(enamelButton);
   if(hubTab==='lb')setTimeout(()=>card.querySelector('.hub-rank.me')?.scrollIntoView({block:'nearest'}),30);
  }
  card.querySelectorAll('button[data-tab]').forEach(b=>b.onclick=()=>{hubTab=b.dataset.tab;track('hub_tab',{tab:hubTab});draw();});
  card.querySelectorAll('button[data-claim]').forEach(b=>b.onclick=()=>{const q=S.q[+b.dataset.claim],r=q.reward;track('quest_claim',{id:q.id,goal:q.goal,reward:r});if(r.rolls){fly('🎲',AT.card(),AT.dice(),3);S.rolls+=r.rolls;}if(r.cash){fly('💵',AT.card(),AT.cash(),flyN(r.cash),{pulse:'sCash'});S.cash+=r.cash;}q.claimed=true;log(`🎯 Награда за «${q.text}»: ${rwText(r)}.`);toast('Награда получена');save();render();draw();});
  const hz=$('hZone');if(hz)hz.onclick=async()=>{closeModal();await offerOpen(nextZone());};
  $('hNo').onclick=()=>closeModal();
 };
 draw();await openCustom();save();render();
};

// ===== Окно «Сегодня» в стиле хаба =====
// Сверху — только то, что действует сегодня (тренд, догон, кредиты, участок),
// ниже — неделя лентой из 7 дней: жетон дня и короткие метки открытий.
// Районы называются «Улица 1…N»: у названий будет свой нарратив.
// Прокручивается только лента, шапка и кнопка закреплены.
const streetName=zi=>'Улица '+(zi+1);
function weekUnlocks(d){const out=[];
 CFG.ZONES.forEach((z,zi)=>{if(z.day===d&&zi>0)out.push({ic:'🗺',t:`${streetName(zi)} открыта`});
  (CFG.TIER_DAY[zi]||[]).forEach((td,ti)=>{if(td===d&&ti>0)out.push({ic:'⭐',t:`${streetName(zi)}: точки ур. ${ti+1}`});});});
 const bl=CFG.BIZ_LEVEL_DAY.map((bd,li)=>bd===d&&li>0?li+1:0).filter(Boolean);
 if(bl.length)out.push({ic:'🏢',t:`Бизнесы до ур. ${Math.max(...bl)}`});
 if(d===CFG.BANK_DAY)out.push({ic:'🏦',t:'Кредиты в банке'});
 if(d===CFG.TREND_FROM_DAY)out.push({ic:'🔥',t:'Тренды дня'});
 if(d===CFG.BLACK_FRIDAY_DAY)out.push({ic:'🛍',t:`Чёрная пятница ×${String(CFG.BF_MULT).replace('.',',')}`});
 if(d===CFG.DAYS)out.push({ic:'🏁',t:'Итоги недели'});
 return out;}
eventInfo=async function(){
 const now=new Date(),mid=new Date(now);mid.setHours(24,0,0,0);
 const left=CFG.REAL_DAYS?`${Math.floor((mid-now)/36e5)}ч ${String(Math.floor(((mid-now)%36e5)/6e4)).padStart(2,'0')}м`:'—';
 const today=[];
 if(S.trend){const g=good(S.trend);today.push({cls:'hot',ic:`<img src="assets/goods/${g.id}.png" alt="">`,b:`${g.name} ×${CFG.TREND_MULT}`,s:`продаётся по $${sellPrice(S.trend)} вместо $${g.sell}`});}
 if(S.day===CFG.BLACK_FRIDAY_DAY)today.push({cls:'hot',ic:'🛍',b:`Чёрная пятница ×${String(CFG.BF_MULT).replace('.',',')}`,s:'все продажи дороже'});
 const behind=parcelsBehind()-(S.parcelSent?0:1);
 if(behind>0)today.push({ic:`<img src="assets/icons/crate.png" alt="">`,b:`Догони ${behind} ${behind===1?'поставку':'поставки'}`,s:(S.catchups||0)<CFG.LATE.catchupFree?'первая — бесплатно':'бандл «Догон»'});
 if((S.loans||[]).length)today.push({cls:'bad',ic:'🏦',b:`Кредит: −$${loanInterest()} за круг`,s:'при проходе банка'});
 if(S.jail>0)today.push({cls:'bad',ic:`<img src="board/assets/symbols/police.svg" alt="">`,b:'Ты в участке',s:`попыток на дубль: ${S.jail}`});
 if(!today.length)today.push({ic:`<img src="assets/icons/clock.png" alt="">`,b:'Спокойный день',s:S.parcelSent?'поставка уже ушла':'не забудь поставку'});
 const plates=today.map(r=>`<div class="hub-plate td-now ${r.cls||''}"><span class="td-ic">${r.ic}</span><span class="hub-text"><b>${r.b}</b><small>${r.s}</small></span></div>`).join('');
 const week=Array.from({length:CFG.DAYS},(_,k)=>k+1).map(d=>{const u=weekUnlocks(d),st=d<S.day?'past':d===S.day?'today':'';
   return `<div class="td-day ${st}"><span class="pass-level td-num">${d}</span><div class="td-tags">${u.length?u.map(x=>`<span class="td-tag"><i>${x.ic}</i>${x.t}</span>`).join(''):'<span class="td-tag none">обычный день</span>'}</div>${st==='today'?'<span class="td-now-mark">сегодня</span>':st==='past'?'<span class="td-check"></span>':''}</div>`;}).join('');
 const card=$('card');card.className='card battlepass-card hub-card today-card';
 card.innerHTML=`<header class="pass-header hub-head"><span class="pass-stamp td-stamp"></span><div><h2 class="hub-title">Сегодня</h2></div><button id="hNo" class="xhead" aria-label="Закрыть"></button>
   <div class="pass-progress"><b>День ${S.day}</b><div><span>до полуночи</span><div class="pass-meter"><i style="--progress:${Math.max(0,Math.min(1,1-(mid-now)/864e5))}"></i></div></div><small>осталось<br><b>${left}</b></small></div></header>
   <div class="pass-scroll hub-scroll td-scroll"><div class="hub-list td-list">${plates}<h3 class="hub-sub">Неделя</h3><div class="td-week">${week}</div></div></div>
   <footer class="pass-footer td-foot"><button class="ok" id="tdOk">Понял</button></footer>`;
 paintedClose($('hNo'));enamelButton($('tdOk'));
 $('hNo').onclick=()=>closeModal();$('tdOk').onclick=()=>closeModal();
 await openCustom();
};
