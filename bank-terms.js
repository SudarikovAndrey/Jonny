// ===== Банк: условия возврата видны заранее =====
// Плейтест 01.10: игрок испугался, что «банк всё отнимет — конец сессии». В окне банка
// до кнопки «Взять» и при открытых кредитах — короткий блок «Как вернуть»: когда платить,
// сколько, что будет при неуплате и что именно заберут (а остальное останется).
(function(){
  const plural=(k,a,b,c)=>k%10===1&&k%100!==11?a:k%10>=2&&k%10<=4&&(k%100<10||k%100>=20)?b:c;
  function terms(card){
    const take=card.querySelector('#lTake'),loans=S.loans||[];
    if(!take&&!loans.length)return null;
    const n=loans.length,next=take?CFG.LOANS[n]:null;
    const amt=next?(+String(take.textContent).replace(/\D+/g,' ').trim().split(' ')[0]||loanAmount(n)):0;
    const owe=loans.reduce((a,l)=>a+l.principal,0)+amt;
    const rate=next?next.rate:Math.max(...loans.map(l=>l.rate),0);
    const interest=loanInterest()+(next?Math.round(amt*next.rate):0);
    const strikes=next?next.strikes:Math.min(...loans.map(l=>l.maxStrikes-l.strikes));
    const grace=S.loanGrace===undefined?CFG.LOAN_GRACE:S.loanGrace;
    const seized=seizePlan(owe),k=seized.length,mine=S.tiles.filter(t=>(t.type==='kiosk'||t.type==='biz')&&t.owner&&unlocked(t)).length;
    const what=k?`${k} ${plural(k,'лучшую точку','лучшие точки','лучших точек')}`:'ничего';
    const left=Math.max(0,mine-k);
    // Сан-Франциско (и мультиплеер на нём): дней нет — просрочки не бывает, точки не отнимут.
    if(typeof SFMAP!=='undefined'&&SFMAP){
      const rowsSF=[
        ['Вернуть',`$${owe} — когда захочешь: встань на банк и нажми «Погасить»`],
        ['Процент',interest?`$${interest} при каждом проходе банка`:'нет'],
        ['Срок','нет — точки не отнимут'],
        ['Пока не вернёшь','новый кредит не дадут'],
      ];
      const b=document.createElement('div');b.className='bank-terms';
      b.innerHTML=`<p class="bank-terms-title">Как вернуть</p>`+rowsSF.map(([n,v])=>`<div class="bank-term"><b>${n}</b><span>${v}</span></div>`).join('');
      return b;
    }
    const rows=[
      ['Вернуть',`$${owe} — когда захочешь: встань на банк и нажми «Погасить»`],
      ['Процент',interest?`$${interest} при каждом проходе банка`:'нет'],
      ['Опасно','закончить день в минусе'+(grace>0?' — первый раз банк простит':'')],
      ['Если не выбрался',`просрочка; после ${strikes}-й заберут ${what}`+(k?(left?` — остальные ${left} ${plural(left,'точка','точки','точек')} твои`:''):'')+'. Игра продолжается'],
    ];
    const box=document.createElement('div');box.className='bank-terms';
    box.innerHTML=`<p class="bank-terms-title">Как вернуть</p>`+rows.map(([n,v])=>`<div class="bank-term"><b>${n}</b><span>${v}</span></div>`).join('');
    return box;
  }
  function apply(){
    const card=$('card');if(!card||$('modal').hidden)return;
    const h=card.querySelector('h2');if(!h||!/Chase/i.test(h.textContent))return;
    if(card.querySelector('.bank-terms'))return;
    const box=terms(card);if(!box)return;
    const anchor=card.querySelector('.mbtns');(anchor||card).before(box);
  }
  new MutationObserver(()=>apply()).observe($('card'),{childList:true});
})();
