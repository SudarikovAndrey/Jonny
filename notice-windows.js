/* Plain modal messages must not inherit the previous custom window's layout. */
(()=>{
 const original=modal;
 modal=function(html,buttons,opt,onShow){
  const card=$('card');card.className='card';card.style.removeProperty('--cs');
  const result=original.call(this,html,buttons,opt,onShow);
  if(window.AuthorityWindows?.mount(card))return result;
  decorateEvent(card);
  // Bespoke police, chance, banking and daily-summary screens retain their art.
  const title=card.querySelector('.ev-title')||card.querySelector('h2');
  const text=title?.textContent.trim()||'';
  if(/NYPD|Инспектор|Копилка|Шанс|Chase|коллектор|Итоги дня|Сегодня/.test(text))return result;
  card.classList.add('notice-card');
  if(!card.querySelector('.ev-head')){
   const content=document.createElement('div');content.className='notice-content';
   const actions=card.querySelector('.mbtns');
   for(const node of [...card.childNodes])if(node!==actions)content.append(node);
   const footer=document.createElement('footer');footer.className='ev-foot';if(actions)footer.append(actions);
   card.replaceChildren(content,footer);
  }
  const level=text.match(/Джонни\s*[—–-]\s*уровень\s*(\d+)/i);
  if(level){
   card.classList.add('notice-level');
   const head=card.querySelector('.ev-head');
   head.replaceChildren();
   head.innerHTML=`<div class="notice-portrait"><img src="assets/icons/hud-johnny.webp" alt="Джонни"><b>ур. ${level[1]}</b></div><div class="notice-heading"><span>Новый уровень</span><h2>Джонни</h2><p>Уровень ${level[1]}</p></div>`;
   const body=card.querySelector('.ev-body'),perk=body.textContent.trim().replace(/^Новое улучшение:\s*/,'');
   const discount=perk.match(/Товар на Costco на (\d+)% дешевле/i);
   body.replaceChildren();
   const benefit=document.createElement('div');benefit.className='notice-benefit';
   if(discount){
    benefit.innerHTML=`<img src="assets/icons/crate.webp" alt=""><div><strong>−${discount[1]}%</strong><b>на закупку товаров</b></div>`;
    const note=document.createElement('p');note.className='notice-explanation';note.textContent='Скидка уже действует на складе.';body.append(benefit,note);
   }else{
    const label=document.createElement('small');label.textContent='Новое преимущество';
    const detail=document.createElement('b');detail.textContent=perk;
    benefit.append(label,detail);body.append(benefit);
   }
   const confirm=card.querySelector('.mbtns button');if(confirm)confirm.textContent='Продолжить';
  }else{
   const badge=card.querySelector('.ev-badge');
   if(badge&&!badge.querySelector('img'))badge.remove();
   const cap=badge?.querySelector('img[src="assets/icons/cap.webp"]');
   if(cap)cap.src='assets/icons/hud-johnny.webp';
   const image=badge?.querySelector('img');
   if(image&&/Билет/.test(text))image.src='assets/icons/nav-ticket-v2.webp';
   // Future milestone amounts are requirements, never a gold reward already won.
   card.querySelectorAll('.ms3 .msc').forEach(row=>{
    const amount=row.querySelector(':scope>b');if(amount)amount.textContent='При '+amount.textContent+' очках';
   });
  }
  card.querySelectorAll('.mbtns button').forEach(enamelButton);
  return result;
 };
})();
