// ===== Одно правило для всех кнопок покупки (решение продюсера 30.09.2026) =====
// Хватает — зелёная эмаль, не хватает — тёмно-серая. Никаких красных и синих «Купить».
// Цена на кнопке всегда полная; «не хватает» — подпись рядом, а не сумма нехватки.
// Модуль только красит: какая кнопка чем является, решают окна; здесь — общий список.
(function(){
  const BUY=[
    '#kBuy','#bBuy','.shop button.buy','.shop button.uup-btn',       // точка и бизнес: купить, улучшить
    '#wAll','.warehouse-bulk','.warehouse-row button','.wrow button', // Costco
    '.shop-buy','#bpBuy',                                             // магазин, премиум
    '#hZone',                                                         // раннее открытие улицы
    '.insp-btn[data-v="1"]','.insp-btn[data-v="3"]',                  // инспектор в карточке: заплатить, откупиться
  ].join(',');
  // Кнопки попапов modal(): покупка/оплата узнаётся по глаголу в начале подписи.
  const VERB=/^(Купить|Заплатить|В минус|Откупиться|Улучшить|Прокачать|Закупить|Пополнить|Открыть премиум|Открыть за|Взять)/;
  // «В минус $N» — доступное действие (платить в долг правилами разрешено): кнопка зелёная.
  const short=b=>b.disabled||/^Не хватает/.test(b.textContent.trim())||b.classList.contains('poor');
  function paint(root){
    root.querySelectorAll('button').forEach(b=>{
      const text=b.textContent.replace(/\s+/g,' ').trim();
      if(!(b.matches(BUY)||VERB.test(text)))return;
      const no=short(b);
      b.classList.add('buy-btn');b.classList.toggle('buy-ok',!no);b.classList.toggle('buy-no',no);
      if(b.dataset.enamel&&b.dataset.enamel!==(no?'dark':'green'))b.dataset.enamel=no?'dark':'green';
    });
  }
  let queued=false;
  const run=()=>{queued=false;paint($('card'));const po=document.querySelector('.pass-offer');if(po)paint(po);};
  const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(run);}};
  new MutationObserver(schedule).observe($('card'),{childList:true,subtree:true,attributes:true,attributeFilter:['disabled','class']});
  new MutationObserver(schedule).observe(document.body,{childList:true});
})();
