// ===== Магазин карточками и плашка цели недели =====
// Правила покупок — из прототипа (spendHard, buyPack, softPackAmount, CFG):
// здесь только раскладка. Карточки по две в ряд, у каждой — картинка, объём,
// короткая подпись и цена снизу во всю ширину.

var SHOP_ART={
  rolls:['assets/icons/die.png','assets/icons/die.png'],
  soft:[['assets/icons/soft.png'],['assets/icons/coins.png'],['assets/icons/coins.png','assets/icons/money.png']],
  hard:[['gem'],['gem','gem'],['gem','gem','gem'],['gem','gem','gem','gem']],
};
function shopPile(srcs){
  const list=srcs.map(s=>s==='gem'?'assets/icons/gem-clean.png':s);
  return `<span class="shop-pile n${list.length}" aria-hidden="true">${list.map((s,i)=>`<img src="${s}" alt="" style="--i:${i}">`).join('')}</span>`;
}
const shopGem='<img class="shop-gem" src="assets/icons/gem-clean.png" alt="">';
// Выгода крупного пакета против самого малого в той же линейке.
function shopBonus(amount,cost,baseAmount,baseCost){
  const pc=Math.round((amount/cost)/(baseAmount/baseCost)*100-100);
  return pc>=5?`<span class="shop-ribbon">+${pc}% выгоды</span>`:'';
}
function shopCard({art,amount,unit,note,button,ribbon='',off=false,kind=''}){
  return `<article class="shop-item ${kind}${off?' off':''}">${ribbon}
    <div class="shop-art">${art}</div>
    <b class="shop-amount">${amount}</b><span class="shop-unit">${unit}</span>
    ${note?`<small class="shop-note">${note}</small>`:''}
    ${button}</article>`;
}
shopHard=async function(){ track('window',{w:'hard_shop',hard:S.hard,day:S.day});
  const draw=()=>{
    const card=$('card');
    const price=CFG.HARD.overtime*Math.pow(2,S.overtime);
    const soft=CFG.SHOP_SOFT, hard=CFG.SHOP_HARD;
    const rolls=shopCard({kind:'rolls',art:shopPile(SHOP_ART.rolls),amount:'+'+CFG.OVERTIME_ROLLS,unit:'ходов',
      note:S.overtime?`потом ${shopGem}${price*2}`:'дорожает с каждой покупкой',
      off:S.hard<price,button:`<button class="hard shop-buy" id="shRolls" ${S.hard<price?'disabled':''}>${shopGem}${price}</button>`});
    const cash=soft.map((pk,i)=>{const amt=softPackAmount(pk.mult);
      return shopCard({kind:'cash',art:shopPile(SHOP_ART.soft[i]||SHOP_ART.soft[2]),amount:amt.toLocaleString('ru-RU'),unit:'денег',
        ribbon:i?shopBonus(amt,pk.hard,softPackAmount(soft[0].mult),soft[0].hard):'',off:S.hard<pk.hard,
        button:`<button class="hard shop-buy" data-soft="${i}" ${S.hard<pk.hard?'disabled':''}>${shopGem}${pk.hard}</button>`});}).join('');
    const gems=hard.map((pk,i)=>shopCard({kind:'gems',art:shopPile(SHOP_ART.hard[i]||SHOP_ART.hard[3]),amount:pk.hard,unit:'кристаллов',
      ribbon:i?shopBonus(pk.hard,pk.rub,hard[0].hard,hard[0].rub):'',
      button:`<button class="shop-buy rub" data-pk="${i}">${pk.price}</button>`})).join('');
    card.className='card event-card shop-card';
    card.innerHTML=`<header class="ev-head"><span class="ev-badge"><img src="assets/icons/shop.png" alt=""></span>
        <div class="ev-titles"><h2 class="ev-title">Магазин</h2><span class="ev-sub shop-wallet">у тебя ${shopGem}<b>${S.hard}</b></span></div>
        ${helpBtn('Кристаллы покупают ходы и наличные. Каждая покупка ходов за день удваивает цену следующей; в полночь цена сбрасывается.')}</header>
      <div class="ev-body shop-body">
        <h3 class="shop-sec">За кристаллы</h3>
        <div class="shop-grid">${rolls}${cash}</div>
        <h3 class="shop-sec">Кристаллы</h3>
        <div class="shop-grid">${gems}</div>
        <p class="shop-proto">В прототипе пакеты выдаются сразу, без оплаты.</p>
      </div>
      <footer class="ev-foot"><div class="mbtns"><button class="sec" id="shNo">Закрыть</button></div></footer>`;
    const help=card.querySelector('.ev-head>.qm');if(help)help.classList.add('ev-help');
    $('shRolls').onclick=()=>{if(spendHard(price,AT.dice())){track('buy_rolls',{cost:price});fly('🎲',AT.card(),AT.dice(),3,{delay:150});S.overtime++;S.rolls+=CFG.OVERTIME_ROLLS;log(`Купил +${CFG.OVERTIME_ROLLS} ходов за 💎 ${price}.`);save();render();draw();}};
    card.querySelectorAll('button[data-soft]').forEach(b=>b.onclick=()=>{const pk=soft[+b.dataset.soft],amt=softPackAmount(pk.mult);if(spendHard(pk.hard)){track('buy_soft',{amt,cost:pk.hard});S.cash+=amt;fly('💵',AT.card(),AT.cash(),flyN(amt),{pulse:'sCash'});log(`Купил $${amt} за 💎 ${pk.hard}.`);save();render();draw();}});
    card.querySelectorAll('button[data-pk]').forEach(b=>b.onclick=()=>{buyPack(hard[+b.dataset.pk],'shop');draw();});
    $('shNo').onclick=()=>closeModal();
  };
  draw(); await openCustom(); save(); render();
};

// ===== Плашка цели недели в шапке =====
// Отвечает на три вопроса: к чему иду (ближайший рубеж), сколько осталось
// (число и полоса) и как я иду относительно других (место в топе).
// Отдельно — метка «Забрать», если в хабе ждёт награда: раньше вместо неё
// менялся значок билета на подарок, и плашка переставала читаться как цель.
const HUB_TICKET=`<svg class="hub-ticket" viewBox="0 0 44 32" aria-hidden="true"><path d="M4 5.5 40 3.5l.8 7.2a4.6 4.6 0 0 0 0 9.4l.4 7.4-36.8 1.2-.3-7.6a4.6 4.6 0 0 0 .2-9.2Z" fill="#c43a2d" stroke="#1d1a15" stroke-width="2.4" stroke-linejoin="round"/><path d="M29 6.5v19.3" stroke="#f2e3bd" stroke-width="1.8" stroke-dasharray="2.6 2.4"/><path d="M11.5 11.2h12M11.5 16h10M11.5 20.8h12" stroke="#f2e3bd" stroke-width="2.2" stroke-linecap="round"/></svg>`;
function renderHubGoal(){
  const el=$('bHub');if(!el||!S)return;
  const nm=nextMilestone(),last=CFG.MILESTONES[CFG.MILESTONES.length-1];
  const goal=nm?nm.pts:last.pts;
  const pc=Math.min(100,Math.round(S.pts/goal*100));
  const ready=(S.q?S.q.some(x=>x.done&&!x.claimed):false)||bpClaimable()>0;
  const label=nm?nm.name:'Все рубежи';
  const left=nm?`ещё ${goal-S.pts}`:'взяты';
  const place=lbPlace();
  el.innerHTML=`${HUB_TICKET}<span class="hub-goal">
      <span class="hub-row"><b>${S.pts}<small>/${goal}</small></b><span class="hub-place">${place}-й в топе</span></span>
      <span class="hub-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${goal}" aria-valuenow="${S.pts}"><i style="width:${pc}%"></i></span>
      <span class="hub-row hub-meta"><em>${label}</em><span>${left}</span></span>
    </span>${ready?'<span class="hub-claim-tag">Забрать</span>':''}`;
  el.setAttribute('aria-label',`${label}: ${S.pts} из ${goal} очков, ${place} место в топе${ready?', есть награда':''}`);
  el.classList.toggle('okc',ready);el.classList.add('hub-goal-chip');
}
(function(){
  const base=render;
  render=function(){const r=base.apply(this,arguments);try{renderHubGoal();}catch(e){}return r;};
})();
