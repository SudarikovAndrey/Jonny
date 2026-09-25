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
 const layer=document.createElement('div');layer.className='pass-offer';layer.setAttribute('role','dialog');layer.setAttribute('aria-label','Премиум баттлпасса');
 layer.innerHTML=`<div class="pass-offer-paper"><div class="offer-crown">${passIcon('crown')}</div><h2>Больше наград<br>на каждой ступени</h2><p>Премиальная дорожка на все ${BP.max} уровней и ещё одно место в фуре до конца недели.</p><p><b>Уже пройденные уровни тоже дадут награды.</b></p><button class="ok" id="passConfirm">Открыть за ${BP.price} ₽</button><small>Тестовая покупка · деньги не списываются</small><button class="sec" id="passCancel">Пока не надо</button></div>`;
 $('card').append(layer);layer.querySelectorAll('button').forEach(enamelButton);PaperMotion.enter(layer.querySelector('.pass-offer-paper'));$('passCancel').onclick=()=>dismissPaperOffer(layer);layer.onclick=e=>{if(e.target===layer)dismissPaperOffer(layer);};
 $('passConfirm').onclick=()=>{if(S.bp.paid)return;bpBuy();save();render();dismissPaperOffer(layer,()=>{renderBattlePass(redraw,tabs);bindPassTabs(redraw);});queueMobileJoy('dance');};$('passConfirm').focus();
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
