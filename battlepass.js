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
 const card=$('card'),L=bpLevel(),available=bpClaimable(),progress=L>=BP.max?1:(S.pts%BP.step)/BP.step;
 card.className='card battlepass-card';
 const row=(k)=>{
  const lane=t=>{const premium=t==='paid',reward=premium?BP.paid(k):BP.free(k),claimed=k<=(premium?S.bp.claimedPaid:S.bp.claimedFree),locked=premium&&!S.bp.paid,ready=k<=L&&!locked&&!claimed;
   return `<button class="pass-reward ${premium?'premium':'free'} ${claimed?'claimed':ready?'available':'locked'}" data-level="${k}" data-lane="${t}" ${claimed||(!ready&&!locked)?'disabled':''} aria-label="Уровень ${k}, ${premium?'премиум':'бесплатно'}: ${passRewardText(reward)}. ${claimed?'Получено':ready?'Забрать доступные награды':locked?'Открыть премиум':'Нужно '+k*BP.step+' очков'}"><span class="pass-loot">${passReward(reward)}</span><span class="pass-state">${claimed?passIcon('check'):ready?'Забрать':locked?passIcon('lock'):k*BP.step+' очк.'}</span></button>`;};
  return `<div class="pass-rung ${k<=L?'reached':''}" data-level="${k}">${lane('free')}<span class="pass-level ${k===L+1?'next':''}">${k}</span>${lane('paid')}</div>`;
 };
 card.innerHTML=`<header class="pass-header"><span class="pass-stamp">NY<br><b>01</b></span><div><h2>Баттлпасс</h2><small>Джонни идёт к успеху</small></div><button id="hNo" class="xhead" aria-label="Закрыть"></button><div class="pass-progress"><b>Ур. ${L}</b><div><span>${L>=BP.max?'Все уровни открыты':`${S.pts%BP.step} / ${BP.step} очков`}</span><div class="pass-meter"><i style="--progress:${progress}"></i></div></div><small>До конца<br><b>${lbTimeLeft()}</b></small></div></header>
 <div class="pass-scene">${passArt(0,240,420,145)}<span>Каждая поставка —<br>ступень к наградам</span><div class="pass-hero">${passArt(452,234,172,160)}</div></div><div class="pass-scroll">
 <div class="pass-lanes"><b>Бесплатно</b><span></span><b>${passIcon('crown')}Премиум</b></div><div class="pass-stairs"><div class="pass-side left">${passArt(0,280,175,350).replace('xMidYMid meet','xMidYMid slice')}</div><div class="pass-side right">${passArt(900,430,120,280).replace('xMidYMid meet','xMidYMid slice')}</div>${Array.from({length:BP.max},(_,i)=>row(BP.max-i)).join('')}</div>
 <details class="pass-tasks"><summary>Как продвигаться?</summary><p>Отправляй товары пацанам. Каждые ${BP.step} очков ивента открывают новый уровень.</p><button class="sec" id="passShip">К поставке</button></details></div>
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
