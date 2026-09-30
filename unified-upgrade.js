// ===== Единый апгрейд точки (бэклог §4) =====
// Дизайн: черновики/америкэн-бой-единый-апгрейд.md. Решение 24.09: одна кнопка;
// решение 30.09: один шаг поднимает оба стата сразу (см. ниже). Уровень точки — прежний
// capLvl + salesLvl − 1 (1–7 в тире), шаги и цены те же, что у двух кнопок,
// поэтому сбор за проход, расширение и баланс не меняются. Игрок решает не
// «какой стат», а «какую точку».
// Решение продюсера 30.09.2026: один шаг поднимает оба стата сразу. Цена шага — сумма прежних
// цен запаса и продаж на этом уровне (0,5 + 0,7 = 1,2 × цена × ур.), поэтому деньги до максимума
// те же 7,2 цены точки: шагов вдвое меньше, но каждый вдвое дороже — по деньгам темп не ускорился.
// Уровень точки на карточке — 1…4; сбор за проход по-прежнему через klevel = capLvl + salesLvl − 1.
function kioskLvl(t){return Math.max(t.capLvl,t.salesLvl);}
function kioskMaxLvl(t){return Math.min(capTab(t).length,salTab(t).length);}
function kioskNextStat(t){return t.capLvl<capTab(t).length||t.salesLvl<salTab(t).length?'both':null;}
function kioskUpCost(t){return (t.capLvl<capTab(t).length?capCost(t):0)+(t.salesLvl<salTab(t).length?salesCost(t):0);}
// Значения после следующей прокачки. Карты с другой лестницей (map1.js, sf-builder.js) подменяют.
function kioskAfter(t){if(!kioskNextStat(t))return null;
  return {cap:capTab(t)[Math.min(capTab(t).length-1,t.capLvl)],sales:salesBoost(salTab(t)[Math.min(salTab(t).length-1,t.salesLvl)])};}
// Старые сохранения (чередование статов) и «грант» приводятся к равным статам:
// отстающий подтягивается к большему — разовый подарок, чтобы никто ничего не потерял.
function kioskLevelsNormalize(){
  if(!S||!S.tiles)return;
  for(const t of S.tiles){
    if(t.type!=='kiosk'||!t.owner)continue;
    const n=Math.max(t.capLvl,t.salesLvl);
    const c=Math.min(capTab(t).length,n),s=Math.min(salTab(t).length,n);
    if(t.salesLvl!==s||t.capLvl!==c){t.salesLvl=s;t.capLvl=c;}
  }
}
// Прокачка обоих статов одним шагом: списывает сумму, засчитывает задание, пишет лог.
function kioskUpgradeBoth(t){
  const cost=kioskUpCost(t);if(!kioskNextStat(t)||S.cash<cost)return false;
  track('upgrade',{tile:t.i,stat:'both',lvl:kioskLvl(t)+1,cost});
  fly('💵',AT.cash(),AT.card(),flyN(cost));S.cash-=cost;
  if(t.capLvl<capTab(t).length)t.capLvl++;if(t.salesLvl<salTab(t).length)t.salesLvl++;
  qProg('upg',1);log(`${name(t)}: точка ур. ${kioskLvl(t)} — запас ${cap(t)} шт, продажи ${sales(t)}/круг.`);
  render();draw();return true;
}
(function(){
  const base=render;
  render=function(){kioskLevelsNormalize();return base.apply(this,arguments);};
})();

let uuTile=null;
const uuBaseKiosk=kioskWindow;
kioskWindow=async function(t){uuTile=t;kioskLevelsNormalize();try{return await uuBaseKiosk.apply(this,arguments);}finally{uuTile=null;}};

function uuDots(L,max){return Array.from({length:max},(_,i)=>`<i class="${i<L?'on':''}"></i>`).join('');}
function decorateUnifiedUpgrade(){
  const card=$('card'),t=uuTile,capBtn=$('kCap'),salBtn=$('kSal'),two=card.querySelector('.shop .two');
  if(!t||!capBtn||!salBtn||!two||card.querySelector('.uup'))return;
  const L=kioskLvl(t),max=kioskMaxLvl(t),next=kioskNextStat(t),cost=kioskUpCost(t);
  const after=kioskAfter(t),profitMode=!!CFG.KIOSK.showProfit,margin=Math.max(0,sellPrice(t.good)-buyPrice(t.good));
  // Visual emphasis only: newer ladders raise both values, but the card
  // alternates one preview per step. Prices and upgrade handlers stay unchanged.
  // Один шаг поднимает оба стата — на карточке обе стрелки.
  const capChanges=!!after&&after.cap!==cap(t),salesChanges=!!after&&after.sales!==sales(t);
  const capNext=capChanges?after.cap:null,salNext=salesChanges?after.sales:null;
  const row=(label,now,nx)=>`<span class="uup-stat${nx!==null?' grows':''}"><small>${label}</small><b>${now}</b>${nx!==null?`<i>→</i><b class="up">${nx}</b>`:''}</span>`;
  const dS=salNext!==null?salNext-sales(t):0,dC=capNext!==null?capNext-cap(t):0;
  const gain=[dC?`+${dC} мест`:'',dS?(profitMode?`+$${dS*margin} за круг`:`+${dS} ${dS===1?'продажа':'продажи'} за круг`):''].filter(Boolean).join(' · ');
  const salesRow=profitMode?row('Прибыль за круг','$'+sales(t)*margin,salNext!==null?'$'+salNext*margin:null):row('Продажи за круг',sales(t),salNext);
  const block=document.createElement('div');block.className='uup';
  block.innerHTML=`${next?`<div class="uup-stats">${row('Запас',cap(t),capNext)}${salesRow}</div>`:''}
    ${next?`<button class="ok uup-btn" id="kUp" ${S.cash<cost?'disabled':''}><span>Улучшить<small>${gain}</small></span><b>$${cost}</b></button>`:`<p class="uup-max">Прокачка на максимуме.${evolveState(t)==='max'?'':' Дальше — улучшение ниже.'}</p>`}`;
  two.replaceWith(block);
  // Один индикатор уровня в шапке; повтор в блоке улучшений не нужен.
  const lvl=card.querySelector('.shop .srow .lvl');if(lvl){lvl.textContent=`${L}/${max}`;lvl.setAttribute('aria-label',`Уровень ${L} из ${max}`);}
  const up=$('kUp');
  // Кнопка вызывает прежний обработчик нужного стата: он списывает цену,
  // засчитывает задание «прокачай», пишет лог и перерисовывает окно.
  if(up)up.onclick=()=>{if(kioskNextStat(t)==='both')kioskUpgradeBoth(t);else{const n=kioskNextStat(t);if(!n||S.cash<kioskUpCost(t))return;(n==='sales'?salBtn:capBtn).onclick();}};
  if(typeof enamelButton==='function'&&up)enamelButton(up);
  if(typeof cashGlyph==='function')cashGlyph(block);
}
new MutationObserver(()=>decorateUnifiedUpgrade()).observe($('card'),{childList:true,subtree:true});
