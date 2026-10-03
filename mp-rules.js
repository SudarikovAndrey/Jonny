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
// Корона печатным штрихом: растровая иконка 79×69 при увеличении рвалась (замечание Андрея).
const CROWN='<svg class="mpr-crown" viewBox="0 0 120 92" aria-hidden="true"><path d="M8 30 L30 54 L60 12 L90 54 L112 30 L102 80 L18 80 Z" fill="#e9b33b" stroke="#25221c" stroke-width="6" stroke-linejoin="round"/><path d="M18 80 L102 80 L100 88 L20 88 Z" fill="#c99a32" stroke="#25221c" stroke-width="6" stroke-linejoin="round"/><circle cx="60" cy="12" r="7" fill="#a92720" stroke="#25221c" stroke-width="4"/><circle cx="8" cy="30" r="6" fill="#a92720" stroke="#25221c" stroke-width="4"/><circle cx="112" cy="30" r="6" fill="#a92720" stroke="#25221c" stroke-width="4"/><path d="M34 66 H86" stroke="#fbf0d4" stroke-width="5" stroke-linecap="round" opacity=".7"/></svg>';
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
    {t:'Касса на старте',x:'Закупай товар на складе Costco: точка вмещает 8 штук и продаёт по 3 за круг — заезжай почаще. Прошёл старт — товар продаётся, и сверху бонус: $50 в партии на время, $100 в партии на круги; сильно отстающему — ещё пособие. На склад можно доехать на такси за 💎 1 — до броска.',
      a:art('assets/icons/coins.webp',[sym('warehouse'),sym('home')])},
    {t:'Предложи цену',x:'В свой ход — на любую чужую клетку: тапни по ней на карте. Вложенное хозяином ×1…×10 или своя сумма. Ответит в свой ход; откажет — деньги вернутся. Одно предложение за ход.',
      a:`<div class="mpr-art mpr-mults">${['×1','×1,5','×2','×3'].map(m=>`<b>${m}</b>`).join('')}</div>`},
    {t:'Выкуп ×10',x:'Не хочет продавать — забери сразу за ×10 вложенного. Не чаще раза в два своих круга.',
      a:`<div class="mpr-art mpr-big"><b>×10</b><small>без согласия</small></div>`},
    {t:'Обмен',x:'Меняй клетки, чтобы собрать цепочку соседей: до 2 своих на до 2 чужих, с доплатой. «Подобрать обмен» найдёт выгодный обоим. Соперник может принять, отказать или прислать встречное. Одно предложение за ход.',
      a:`<div class="mpr-art mpr-big"><b>🔁</b><small>2 ↔ 2 · встречное</small></div>`},
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
    {t:'Шанс с пакостями',x:'Три клетки «Шанса» — 7, 22 и 36. Суммы карт растут вместе с доходами стола. Пакости ложатся в руку (до 2 карт): сыграй в свой ход против выбранного соперника — объезд на чужую клетку с рентой, пропуск хода, свет, инспектор, демпинг, просрочка. Против лидера — налоговая, проверка, забастовка.',
      a:`<div class="mpr-art mpr-row"><img src="${sym('chance')}" alt=""><b>🎂 🚔 ❄️ 🛡</b></div>`},
    {t:'В минусе',x:'В минусе играешь дальше, но покупок нет. Прошёл старт в минусе — предупреждение: можно взять микрозайм или продать товар за полцены. Второй раз на старте в минусе — клетки на торги на сумму долга, без ставок их берёт банк.',
      a:art('assets/icons/money.webp',[sym('bank')])},
    {t:'Время партии',x:`Партия — ${min} минут. Время вышло — доигрываем круг стола, потом итог.`,
      a:`<div class="mpr-art mpr-big"><b>⏱ ${min}:00</b><small>потом — последний круг</small></div>`},
    {t:win?`Победа: ${win.name}`:'Как победить',x:win?win.text:'Условие победы выбирает хозяин стола в лобби — оно видно в полосе игроков.',
      a:`<div class="mpr-art mpr-big">${CROWN}<small>${chip('A','#A92720')}${chip('B','#243F4B')}${chip('C','#C99A32')}</small></div>`},
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
      <div class="ob-track">${list.map((s,i)=>`<section class="ob-slide" data-i="${i}" aria-hidden="${i?'true':'false'}">
        <div class="ob-step">${i+1} из ${list.length}</div><div class="ob-art">${s.a}</div>
        <h2 class="ob-title">${esc(s.t)}</h2><p class="ob-text">${esc(s.x)}</p></section>`).join('')}</div>
      <div class="ob-dots">${list.map((_,i)=>`<i data-i="${i}"></i>`).join('')}</div>
      <div class="mpr-nav"><button class="ob-prev sec" type="button">Назад</button><button class="ob-next" type="button">Дальше</button></div>
      ${share?`<button class="mpr-share" type="button">🔗 Стол <b>${esc(share)}</b> — поделиться ссылкой</button>`:''}
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
