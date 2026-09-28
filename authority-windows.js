/* Illustrated encounter windows. Transactions and sticky modal ownership stay in the game. */
window.AuthorityWindows={
 html(kind,{fine,take=fineTake(fine),label=''}){
  const inspector=kind==='inspector',attempts=inspector?CFG.INSP.attempts:CFG.POLICE.attempts;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const debt=Math.max(0,take-Math.max(0,S.cash));
  return `<section data-authority="${kind}" class="authority-content">
   <header class="authority-head"><span class="authority-emblem" aria-hidden="true"><img src="${inspector?'board/assets/markers/inspect.svg?v=2':'board/assets/symbols/police.svg'}" alt=""></span><div><h2>${inspector?'Инспектор':'Участок'}</h2><p>${inspector?esc(label):'NYPD'}</p></div>
    <details class="authority-help"><summary aria-label="Правила проверки">?</summary><div>Можно заплатить монетами, откупиться кристаллами или выбить дубль. Каждый бросок тратит ход. После ${attempts} промахов штраф спишется автоматически и ${inspector?'проверка закончится':'Джонни выйдет на свободу'}. Штраф попадает в копилку. Если денег мало, списание ограничено допустимым долгом.</div></details></header>
   <div class="authority-scroll"><div class="authority-scene ${kind}" aria-hidden="true"><img class="authority-person" src="assets/authority/${kind}-character.webp" alt=""><span class="authority-bubble">${inspector?'Бумажки где?':'Попался,<br>приятель!'}</span></div>
   <div class="authority-copy"><p class="authority-lead">${inspector?'Пока идёт проверка, '+esc(label==='Бизнес'?'бизнес не платит.':'точка не торгует.'):'Выбей дубль, чтобы выйти без штрафа.'}</p>
    <div class="authority-fine"><span>Штраф</span><img src="assets/icons/coins.webp" alt="монет"><strong>${fine}</strong></div>
    ${take<fine||debt?`<p class="authority-debt">Спишется ${take} монет${debt?' · долг '+debt+' монет':''}.</p>`:''}
    <p class="authority-rules">${attempts} попытки · каждый бросок тратит ход.<br>Три промаха — штраф.</p></div></div>
  </section>`;
 },
 mount(card){
  const content=card.querySelector('[data-authority]');if(!content)return false;
  card.className='card authority-card';card.dataset.authority=content.dataset.authority;
  const actions=card.querySelector(':scope>.mbtns'),foot=document.createElement('footer');foot.className='authority-foot';
  if(actions){foot.append(actions);actions.querySelectorAll('button').forEach(enamelButton);}
  card.append(foot);return true;
 }
};
