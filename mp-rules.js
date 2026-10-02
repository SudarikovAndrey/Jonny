// ===== Мультиплеер: правила листалкой (второй плейтест 01.10, карточка m2-tutorial) =====
// Открывается в лобби («Как играть», сама — один раз на телефоне) и в партии (☰ → «Правила»).
// Вёрстка — листалка онбординга соло (#onboard, onboarding-print.css), картинки — из ассетов игры.
// Тексты — по спеке черновики/америкэн-бой-мультиплеер.md и текущему коду; цифры, которые
// выбирает хозяин стола (минуты, условие победы), берутся из стола.
(function(){
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sym=n=>`board/assets/symbols/${n}.svg`;
// Картинка слайда: главная иллюстрация и до двух значков клеток поля.
const art=(img,badges=[],cls='')=>`<div class="mpr-art ${cls}"><img class="mpr-main" src="${img}" alt="">${badges.map(b=>`<span class="mpr-badge"><img src="${b}" alt=""></span>`).join('')}</div>`;
const chip=(t,c)=>`<span class="mpr-chip" style="--c:${c}">${esc(t)}</span>`;

function slides(){
  const v=window.MP&&MP.view,min=(v&&v.settings&&v.settings.minutes)||20,win=v&&v.win;
  return [
    {t:'Ходим по очереди',x:'Бросок — фишка идёт — дела на клетке — «Передать ход». Дубль даёт бонус налом, а не лишний бросок. Время хода видно над кубиком.',
      a:art('assets/start/johnny-v2.webp',[sym('die')])},
    {t:'Строй и бери ренту',x:'Встал на пустырь — построй точку. Встал на чужую — платишь хозяину полторы его прибыли за круг.',
      a:art('assets/points/pt_gum_1.webp',[sym('lot')])},
    {t:'Соседи дороже',x:'Соседние клетки одного хозяина: +25% ренты за каждого соседа.',
      a:`<div class="mpr-art mpr-row"><img src="assets/points/pt_cola_1.webp" alt=""><img src="assets/points/pt_gum_1.webp" alt=""><b>+25%</b></div>`},
    {t:'Касса на старте',x:'Закупай товар на складе Costco. Прошёл старт — товар продаётся, монеты твои.',
      a:art('assets/icons/coins.webp',[sym('warehouse'),sym('home')])},
    {t:'Предложи цену',x:'Стоя на чужой клетке, предложи хозяину вложенное ×1…×10. Он ответит в свой ход; откажет — деньги вернутся.',
      a:`<div class="mpr-art mpr-mults">${['×1','×2','×5','×10'].map(m=>`<b>${m}</b>`).join('')}</div>`},
    {t:'Выкуп ×10',x:'Не хочет продавать — забери сразу за ×10 вложенного. Не чаще раза в два своих круга.',
      a:`<div class="mpr-art mpr-big"><b>×10</b><small>без согласия</small></div>`},
    {t:'Торги',x:'Свою клетку можно выставить на торги. Ставят все до твоего следующего хода — кто дал больше, тот и хозяин. Без ставок клетка остаётся у тебя.',
      a:`<div class="mpr-art mpr-big"><b>🔨</b><small>ставка — ставка — продано</small></div>`},
    {t:'Инспектор',x:'С трёх владений приходит инспектор. Точка под проверкой не торгует и не берёт ренту. Лидера проверяют чаще и штрафуют больнее.',
      a:art('assets/authority/inspector-character.webp',[sym('inspector')],'mpr-char')},
    {t:'Участок',x:'Встал на участок — плати штраф (если хватает денег), откупись кристаллом или садись. Сидишь — в начале хода откупись и бросай, или бросай на дубль: два промаха — выходишь бесплатно.',
      a:art('assets/authority/police-character.webp',[sym('police')],'mpr-char')},
    {t:'Общие деньги',x:'Штрафы всех падают в одну копилку — её берёт тот, кто на неё встал. Касса автомата общая, её срывает джекпот. Монеты инкассатора лежат для всех: кто первым встал, тот и взял.',
      a:`<div class="mpr-art mpr-row"><img src="${sym('piggy')}" alt=""><img src="${sym('slot')}" alt=""><img src="${sym('scatter')}" alt=""></div>`},
    {t:'Мини-игры',x:'Автомат и «21 в кости» работают только в тот ход, когда ты на них встал. Часы хода в это время стоят.',
      a:`<div class="mpr-art mpr-row"><img src="${sym('slot')}" alt=""><img src="${sym('dice21')}" alt=""></div>`},
    {t:'Шанс с пакостями',x:'Три клетки «Шанса» — 7, 22 и 36. Карты бьют по соперникам: донос, ремонт дороги, отключили свет, очередь в ЖЭК. Бывает и тебе прилетит — спасает «крыша».',
      a:`<div class="mpr-art mpr-row"><img src="${sym('chance')}" alt=""><b>🎂 🚔 ❄️ 🛡</b></div>`},
    {t:'Минус — на торги',x:'Ушёл в минус — ход не передать, пока не выставишь клетки на торги на сумму долга. Без ставок клетку забирает банк.',
      a:art('assets/icons/money.webp',[sym('bank')])},
    {t:'Время партии',x:`Партия — ${min} минут. Время вышло — доигрываем круг стола, потом итог.`,
      a:`<div class="mpr-art mpr-big"><b>⏱ ${min}:00</b><small>потом — последний круг</small></div>`},
    {t:win?`Победа: ${win.name}`:'Как победить',x:win?win.text:'Условие победы выбирает хозяин стола в лобби — оно видно в полосе игроков.',
      a:`<div class="mpr-art mpr-big"><img src="assets/icons/crown.webp" alt=""><small>${chip('A','#A92720')}${chip('B','#243F4B')}${chip('C','#C99A32')}</small></div>`},
  ];
}

function open(){
  return new Promise(resolve=>{
    document.getElementById('onboard')?.remove();
    // В лобби стол должен оставаться под рукой: код и «поделиться» — прямо в листалке (плейтест 02.10).
    const list=slides(),root=document.createElement('div'),share=window.MP&&MP.view&&MP.view.phase==='lobby'&&MP.share?MP.view.room:'';
    root.id='onboard';root.className='mp-rules';root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-label','Правила партии');
    root.innerHTML=`<div class="ob-card">
      <button class="ob-skip" type="button">Закрыть</button>
      ${share?`<button class="mpr-share" type="button">🔗 Стол <b>${esc(share)}</b> — поделиться ссылкой</button>`:''}
      <div class="ob-track">${list.map((s,i)=>`<section class="ob-slide" data-i="${i}" aria-hidden="${i?'true':'false'}">
        <div class="ob-step">${i+1} из ${list.length}</div><div class="ob-art">${s.a}</div>
        <h2 class="ob-title">${esc(s.t)}</h2><p class="ob-text">${esc(s.x)}</p></section>`).join('')}</div>
      <div class="ob-dots">${list.map((_,i)=>`<i data-i="${i}"></i>`).join('')}</div>
      <div class="mpr-nav"><button class="ob-prev sec" type="button">Назад</button><button class="ob-next" type="button">Дальше</button></div>
    </div>`;
    document.body.append(root);
    const slidesEl=[...root.querySelectorAll('.ob-slide')],dots=[...root.querySelectorAll('.ob-dots i')],next=root.querySelector('.ob-next'),prev=root.querySelector('.ob-prev');
    let at=0;
    const show=i=>{at=Math.max(0,Math.min(slidesEl.length-1,i));
      slidesEl.forEach((s,k)=>{s.classList.toggle('on',k===at);s.setAttribute('aria-hidden',String(k!==at));});
      dots.forEach((d,k)=>d.classList.toggle('on',k===at));
      // Первый слайд: вместо «Назад» — «Пропустить» (плейтест 02.10: обучение «нельзя закрыть до конца»).
      next.textContent=at===slidesEl.length-1?'Понятно':'Дальше';prev.textContent=at===0?'Пропустить':'Назад';};
    const finish=()=>{root.classList.add('out');setTimeout(()=>{root.remove();resolve();},220);};
    next.onclick=()=>at===slidesEl.length-1?finish():show(at+1);
    prev.onclick=()=>at===0?finish():show(at-1);
    {const sh=root.querySelector('.mpr-share');if(sh)sh.onclick=()=>MP.share();}
    root.querySelector('.ob-skip').onclick=finish;
    dots.forEach(d=>d.onclick=()=>show(+d.dataset.i));
    let x0=null;
    root.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;},{passive:true});
    root.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>40)show(at+(dx<0?1:-1));});
    if(typeof enamelButton==='function'){enamelButton(next);enamelButton(prev);}
    show(0);requestAnimationFrame(()=>root.classList.add('in'));
  });
}
// Один раз на телефоне — сам, когда игрок впервые сел за стол.
function once(){let seen=false;try{seen=localStorage.getItem('abmp_rules_seen')==='1';localStorage.setItem('abmp_rules_seen','1');}catch(e){}
  if(!seen)return open();return Promise.resolve();}
window.MPRules={open,once,slides};
})();
