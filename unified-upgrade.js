// ===== Единый апгрейд точки (бэклог §4) =====
// Дизайн: черновики/америкэн-бой-единый-апгрейд.md. Решение 24.09: одна кнопка,
// уровни по очереди поднимают продажи и запас. Уровень точки — прежний
// capLvl + salesLvl − 1 (1–7 в тире), шаги и цены те же, что у двух кнопок,
// поэтому сбор за проход, расширение и баланс не меняются. Игрок решает не
// «какой стат», а «какую точку».
// Порядок шагов: продажи → запас → продажи → … (прибыль растёт с первого шага).
function kioskLvl(t){return t.capLvl+t.salesLvl-1;}
function kioskMaxLvl(t){return capTab(t).length+salTab(t).length-1;}
function kioskNextStat(t){
  if(t.salesLvl<=t.capLvl&&t.salesLvl<salTab(t).length)return 'sales';
  if(t.capLvl<capTab(t).length)return 'cap';
  return t.salesLvl<salTab(t).length?'sales':null;
}
function kioskUpCost(t){const n=kioskNextStat(t);return n==='sales'?salesCost(t):n==='cap'?capCost(t):0;}
// Значения после следующей прокачки. Карты с другой лестницей (map1.js) подменяют.
function kioskAfter(t){const n=kioskNextStat(t);
  return n==='sales'?{cap:cap(t),sales:salesBoost(salTab(t)[t.salesLvl])}:n==='cap'?{cap:capTab(t)[t.capLvl],sales:sales(t)}:null;}
// Старые сохранения и «грант» (он поднимает только запас) приводятся к порядку
// шагов с тем же уровнем точки — сбор за проход не меняется.
function kioskLevelsNormalize(){
  if(!S||!S.tiles)return;
  for(const t of S.tiles){
    if(t.type!=='kiosk'||!t.owner)continue;
    const k=Math.min(kioskMaxLvl(t),kioskLvl(t));
    const s=Math.min(salTab(t).length,Math.floor(k/2)+1),c=Math.min(capTab(t).length,k-s+1);
    if(t.salesLvl!==s||t.capLvl!==c){t.salesLvl=s;t.capLvl=c;}
  }
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
  const tierName=CFG.TIER_NAMES.kiosk[(t.tier||1)-1]||'Точка';
  const after=kioskAfter(t),profitMode=!!CFG.KIOSK.showProfit,margin=Math.max(0,sellPrice(t.good)-buyPrice(t.good));
  const capNext=after&&after.cap!==cap(t)?after.cap:null,salNext=after&&after.sales!==sales(t)?after.sales:null;
  const row=(label,now,nx)=>`<span class="uup-stat${nx!==null?' grows':''}"><small>${label}</small><b>${now}</b>${nx!==null?`<i>→</i><b class="up">${nx}</b>`:''}</span>`;
  const dS=salNext!==null?salNext-sales(t):0,dC=capNext!==null?capNext-cap(t):0;
  const gain=[dC?`+${dC} мест`:'',dS?(profitMode?`+$${dS*margin} за круг`:`+${dS} ${dS===1?'продажа':'продажи'} за круг`):''].filter(Boolean).join(' · ');
  const salesRow=profitMode?row('Прибыль за круг','$'+sales(t)*margin,salNext!==null?'$'+salNext*margin:null):row('Продажи за круг',sales(t),salNext);
  const stageName=typeof kioskStageName==='function'?kioskStageName(t):tierName;
  const block=document.createElement('div');block.className='uup';
  block.innerHTML=`<div class="uup-head"><span class="uup-lvl">${stageName} · ур. <b>${L}</b> из ${max}</span><span class="uup-dots" aria-hidden="true">${uuDots(L,max)}</span></div>
    <div class="uup-stats">${row('Запас',cap(t),capNext)}${salesRow}</div>
    ${next?`<button class="ok uup-btn" id="kUp" ${S.cash<cost?'disabled':''}><span>Улучшить<small>${gain}</small></span><b>$${cost}</b></button>`:`<p class="uup-max">Прокачка на максимуме.${evolveState(t)==='max'?'':' Дальше — улучшение ниже.'}</p>`}`;
  two.replaceWith(block);
  // Номер уровня в шапке карточки совпадает с уровнем в блоке.
  const lvl=card.querySelector('.shop .srow .lvl');if(lvl)lvl.textContent=L;
  const up=$('kUp');
  // Кнопка вызывает прежний обработчик нужного стата: он списывает цену,
  // засчитывает задание «прокачай», пишет лог и перерисовывает окно.
  if(up)up.onclick=()=>{const n=kioskNextStat(t);if(!n||S.cash<kioskUpCost(t))return;(n==='sales'?salBtn:capBtn).onclick();};
  if(typeof enamelButton==='function'&&up)enamelButton(up);
  if(typeof cashGlyph==='function')cashGlyph(block);
}
new MutationObserver(()=>decorateUnifiedUpgrade()).observe($('card'),{childList:true,subtree:true});
