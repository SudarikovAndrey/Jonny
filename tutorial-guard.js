// ===== Страховка учебного круга: деньги на обязательные шаги нельзя потратить =====
// Правила: черновики/америкэн-бой-тутор-правила.md. Проверка: node tests/tutorial-guard.cjs.
// Учебный круг (FIRST_LAP_ROUTES) требует три покупки: точка на первой клетке,
// хотя бы один товар на Costco, бизнес на третьей. Всё, что не требуется, пока
// шаги не пройдены, либо заперто (прокачки), либо ограничено резервом (закупка).
// Резерв — сумма цен ещё не сделанных обязательных покупок; касса ниже резерва
// опуститься не может. Баланс первого круга может меняться — правило остаётся.

// Сколько денег нельзя тратить прямо сейчас.
function tutorialReserve(){
  if(typeof firstLapActive!=='function'||!S||!firstLapActive())return 0;
  const p=firstLapPlan(),i=S.firstRoute.index||0;let r=0;
  const k=S.tiles[p[0]];if(i<=0&&k&&k.type==='kiosk'&&!k.owner)r+=k.price;
  if(i<=1&&!myKiosks().some(x=>x.goods>0)){const gs=CFG.GOODS.filter(g=>g.zone===0);if(gs.length)r+=Math.min(...gs.map(g=>buyPrice(g.id)));}
  const b=S.tiles[p[2]];if(i<=2&&b&&b.type==='biz'&&!b.owner)r+=b.price;
  return r;
}
// Обязательные шаги ещё идут — необязательные траты заперты.
function tutorialLocked(){return tutorialReserve()>0;}
// Что ещё осталось купить по маршруту — для подписи на замке.
function tutorialLeft(){
  if(!tutorialLocked())return [];const p=firstLapPlan(),i=S.firstRoute.index||0,out=[];
  const k=S.tiles[p[0]];if(i<=0&&k&&!k.owner)out.push('точку');
  if(i<=1&&!myKiosks().some(x=>x.goods>0))out.push('товар на Costco');
  const b=S.tiles[p[2]];if(i<=2&&b&&!b.owner)out.push('бизнес');
  return out;
}
// Можно ли потратить сумму, не тронув резерв.
function tutorialCanSpend(cost){return S.cash-cost>=tutorialReserve();}

// Закупка: все пути покупки товара идут через addGoods — здесь и держим резерв.
(function(){
  const base=addGoods;
  addGoods=function(g,n){
    const r=tutorialReserve();if(r>0){const p=buyPrice(g);n=Math.max(0,Math.min(n,Math.floor((S.cash-r)/p)));if(n<=0)return 0;}
    return base.call(this,g,n);
  };
})();

// Прокачки точки и бизнеса на учебном круге заперты с пояснением.
function tutorialLockButtons(){
  if(!tutorialLocked())return;
  const card=$('card');if(!card)return;
  for(const id of ['kUp','kCap','kSal','bUp','kEvo','bEvo']){
    const b=card.querySelector('#'+id);if(!b||b.dataset.tutLocked)continue;
    b.dataset.tutLocked='1';b.disabled=true;b.setAttribute('aria-disabled','true');
    const left=tutorialLeft();
    const label=b.querySelector('span:not(.enamel-skin)')||b;label.textContent='Сначала — '+(left[left.length-1]||'маршрут');
    const bEl=b.querySelector('b');if(bEl)bEl.remove();
  }
  if(!card.querySelector('.tut-lock-note')&&card.querySelector('[data-tut-locked]')){
    const left=tutorialLeft();
    const n=document.createElement('p');n.className='tut-lock-note';n.textContent=`Прокачка откроется, когда купишь ${left.join(' и ')} по маршруту — деньги отложены на это.`;
    card.querySelector('[data-tut-locked]').after(n);
  }
  // Costco: «на всё» не должно опускать кассу ниже резерва — кнопка остаётся, но addGoods режет.
  const all=card.querySelector('#wAll');
  if(all&&!all.dataset.tutNote){all.dataset.tutNote='1';const r=tutorialReserve();const note=document.createElement('small');note.className='tut-lock-note';note.textContent=`$${r} отложено на бизнес по маршруту`;all.after(note);}
}
new MutationObserver(()=>tutorialLockButtons()).observe($('card'),{childList:true,subtree:true});
window.TutorialGuard={reserve:tutorialReserve,locked:tutorialLocked,canSpend:tutorialCanSpend,left:tutorialLeft};
