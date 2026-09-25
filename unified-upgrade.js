// ===== Единый апгрейд точки (бэклог §4) =====
// Дизайн: черновики/америкэн-бой-единый-апгрейд.md.
// Уровень точки 1–4 внутри тира: одна кнопка поднимает вместимость и продажи
// на следующую ступень их лесенок. Цена шага — сумма двух прежних, так что
// полная прокачка тира стоит столько же и даёт те же значения; меньше только
// нажатий. Хранение прежнее (capLvl = salesLvl), поэтому сбор за проход,
// расширение и сохранения работают без изменений.
function kioskLvl(t){return Math.min(t.capLvl,t.salesLvl);}
function kioskMaxLvl(t){return Math.min(capTab(t).length,salTab(t).length);}
// unifiedCostMult < 1 — скидка на единый шаг (проверяется ботами, см. дизайн).
CFG.KIOSK.unifiedCostMult=CFG.KIOSK.unifiedCostMult??1;
function kioskUpCost(t){return Math.round((capCost(t)+salesCost(t))*CFG.KIOSK.unifiedCostMult);}
// Старые сохранения и «грант» (он поднимает только вместимость) выравниваются
// до большего из двух: грант становится бесплатным уровнем точки.
function kioskLevelsEqualize(){
  if(!S||!S.tiles)return;
  for(const t of S.tiles)if(t.type==='kiosk'&&t.owner&&t.capLvl!==t.salesLvl){
    const L=Math.min(kioskMaxLvl(t),Math.max(t.capLvl,t.salesLvl));t.capLvl=L;t.salesLvl=L;
  }
}
(function(){
  const base=render;
  render=function(){kioskLevelsEqualize();return base.apply(this,arguments);};
})();

let uuTile=null;
const uuBaseKiosk=kioskWindow;
kioskWindow=async function(t){uuTile=t;kioskLevelsEqualize();try{return await uuBaseKiosk.apply(this,arguments);}finally{uuTile=null;}};

function uuDots(L,max){return Array.from({length:max},(_,i)=>`<i class="${i<L?'on':''}"></i>`).join('');}
function decorateUnifiedUpgrade(){
  const card=$('card'),t=uuTile,capBtn=$('kCap'),two=card.querySelector('.shop .two');
  if(!t||!capBtn||!two||card.querySelector('.uup'))return;
  const L=kioskLvl(t),max=kioskMaxLvl(t),atMax=L>=max,cost=kioskUpCost(t);
  const tierName=CFG.TIER_NAMES.kiosk[(t.tier||1)-1]||'Точка';
  const row=(label,now,next)=>`<span class="uup-stat"><small>${label}</small><b>${now}</b>${atMax?'':`<i>→</i><b class="up">${next}</b>`}</span>`;
  const block=document.createElement('div');block.className='uup';
  block.innerHTML=`<div class="uup-head"><span class="uup-lvl">${tierName} · ур. <b>${L}</b> из ${max}</span><span class="uup-dots" aria-hidden="true">${uuDots(L,max)}</span></div>
    <div class="uup-stats">${row('Запас',cap(t),atMax?'':capTab(t)[L])}${row('Продажи за круг',sales(t),atMax?'':salesBoost(salTab(t)[L]))}</div>
    ${atMax?`<p class="uup-max">Прокачка на максимуме.${evolveState(t)==='max'?'':' Дальше — улучшение ниже.'}</p>`:`<button class="ok uup-btn" id="kUp" ${S.cash<cost?'disabled':''}><span>Улучшить</span><b>$${cost}</b></button>`}`;
  two.replaceWith(block);
  // Номер уровня в шапке карточки — единый уровень, а не сумма двух статов.
  const lvl=card.querySelector('.shop .srow .lvl');if(lvl)lvl.textContent=L;
  const up=$('kUp');
  if(up)up.onclick=()=>{
    const c=kioskUpCost(t);if(S.cash<c||kioskLvl(t)>=kioskMaxLvl(t))return;
    track('upgrade',{tile:t.i,stat:'level',lvl:L+1,cost:c});
    // Продажная часть — здесь, вместимость и перерисовка — прежним обработчиком
    // (он списывает свою цену, засчитывает задание «прокачай» и обновляет окно).
    S.cash-=c-capCost(t);t.salesLvl++;
    capBtn.onclick();
  };
  if(typeof enamelButton==='function'&&up)enamelButton(up);
  if(typeof cashGlyph==='function')cashGlyph(block);
}
new MutationObserver(()=>decorateUnifiedUpgrade()).observe($('card'),{childList:true,subtree:true});
