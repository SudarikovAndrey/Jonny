// ===== Инспектор: клетка 5 рассылает проверки на точки и бизнесы игрока =====
// Правила: черновики/америкэн-бой-инспектор.md. Решение продюсера 27.09.2026:
// из клетки вылетают 1–3 проверки, садятся на клетки; пока проверка висит —
// точка не работает на игрока (нет продаж за круг, нет сбора за проход).
// Остановился на клетке — попап как в ментовке: заплатить или ловить дубль.
// На поле не больше трёх проверок за раз. Карта 1 клетки инспектора не имеет.
CFG.INSP={min:1,max:3,limit:3,attempts:3,fineShare:0.5}; // штраф = доля полицейского штрафа

function inspActive(){return S.tiles.filter(t=>t.insp);}
function inspFine(){return Math.max(10,Math.round(policeFine()*CFG.INSP.fineShare/10)*10);}
function inspWorks(t){return !t.insp;} // точка работает на игрока
function inspLabel(t){return t.type==='biz'?'бизнес не платит':'точка не торгует';}

// Клетка 🌪 стала инспектором: вместо неприятностей — проверки.
hazard=async function(){
  const free=CFG.INSP.limit-inspActive().length;
  if(free<=0){toast('📋 Инспектор: все три проверки уже идут');log('📋 Инспектор приходил, но проверок и так три — ушёл.');return;}
  const fit=t=>(t.type==='kiosk'||t.type==='biz')&&unlocked(t)&&!t.insp&&t.i!==S.pos;
  let spots=S.tiles.filter(t=>fit(t)&&t.owner);
  if(!spots.length)spots=S.tiles.filter(t=>fit(t)&&!t.owner&&!t.drop);
  if(!spots.length){toast('📋 Инспектору некого проверять');return;}
  spots.sort(()=>Math.random()-0.5);
  const n=Math.min(free,spots.length,CFG.INSP.min+Math.floor(Math.random()*(CFG.INSP.max-CFG.INSP.min+1)));
  const plan=spots.slice(0,n).map(t=>({t,drop:{insp:1},icon:'📋'}));
  toast(`📋 Инспектор разослал ${n} ${n===1?'проверку':'проверки'}`);
  track('inspector',{n,tiles:plan.map(p=>p.t.i)});
  await flyDrops(plan);
  // Полёт отыгран через drop; сама проверка живёт во флаге клетки, чтобы её не «подобрали» как находку.
  plan.forEach(p=>{if(p.t.drop&&p.t.drop.insp){delete p.t.drop.insp;if(!Object.keys(p.t.drop).length)p.t.drop=null;}p.t.insp=true;});
  log(`📋 Инспектор: проверки на ${plan.map(p=>name(p.t)).join(', ')}. Пока не снял — ${n===1?'точка не работает':'точки не работают'}.`);
  save();render();
};

function inspClear(t,how){
  t.insp=false;if(S.insp&&S.insp.i===t.i)S.insp=null;
  if(typeof inspCardUnlock==='function')inspCardUnlock(); // карточка возвращается в обычный вид, откуда бы ни сняли проверку
  float(t.i,'✅ проверка снята','#8bc34a',1.2);
  log(`📋 ${name(t)}: ${how}, проверка снята — ${t.type==='biz'?'бизнес снова платит':'точка снова торгует'}.`);
}

// Попап на клетке с проверкой — ровно как в участке: заплатить, откупиться или дубль.
async function inspectorPopup(t){
  const fine=inspFine(),take=fineTake(fine);
  const v=await modal(AuthorityWindows.html('inspector',{fine,take,label:t.type==='biz'?'Бизнес':'Проверка торговой точки'}),
    [{t:`<span>${S.cash>=take?'Заплатить':'В минус'}</span><span class="action-price">$${take}</span>`,v:1,cls:'ok'},{t:`<span>Откупиться</span><span class="action-price">💎 ${CFG.HARD.bail}</span>`,v:3,cls:'hard',dis:S.hard<CFG.HARD.bail},{t:'Ловить дубль',v:0,cls:'bad'}],{sticky:true});
  inspectorResolve(t,v,fine);
}
// Выбор игрока — один и тот же из попапа и из карточки точки: 1 — заплатить, 3 — 💎, 0 — дубль.
function inspectorResolve(t,v,fine){
  fine=fine||inspFine();
  track('inspection',{tile:t.i,choice:v===3?'bail':v===1?'pay':'roll',fine});
  if(v===3){if(!spendHard(CFG.HARD.bail,AT.tile(t.i)))return;inspClear(t,`откупился за 💎 ${CFG.HARD.bail}`);}
  else if(v===1){payFine(fine);inspClear(t,`заплатил $${fine}`);}
  else if(!S.insp){S.insp={i:t.i,left:CFG.INSP.attempts,fine};log(`📋 ${name(t)}: споришь с инспектором — ${CFG.INSP.attempts} попытки на дубль.`);hint('insp','Кнопка «Бросить» ловит дубль. Три промаха — штраф спишется сам.');}
  inspCardUnlock();save();render();
}

// Остановка на клетке с проверкой: сначала инспектор, потом обычная остановка.
(function(){const base=land;land=async function(t){
  if(t&&t.insp&&unlocked(t)&&!S.insp){await inspectorPopup(t);}
  return base.apply(this,arguments);
};})();

// Спор с инспектором: бросок ловит дубль, фишка стоит на месте.
(function(){const base=roll;roll=async function(){
  if(!S.insp)return base.apply(this,arguments);
  const t=S.tiles[S.insp.i];
  if(!t||!t.insp){S.insp=null;return base.apply(this,arguments);}
  if(moving||S.finished)return;
  refillStarter();if(S.rolls<=0)return overtimeOffer();
  S.rolls--;moving=true;render();
  const {a,b}=openingDice(),dbl=a===b;
  if(dbl){toast(`🎲 ${a} + ${b} — дубль! Инспектор ушёл ни с чем.`);inspClear(t,'выбросил дубль');}
  else{S.insp.left--;
    if(S.insp.left>0){toast(`🎲 ${a} + ${b} — не дубль. Осталось попыток: ${S.insp.left}`);log(`📋 Спор с инспектором: не дубль, ход потерян. Попыток: ${S.insp.left}.`);}
    else{const before=S.cash;payFine(S.insp.fine);const m=before-S.cash;toast(`🎲 ${a} + ${b} — инспектор выписал штраф $${m}`+(S.cash<0?', ты в минусе':''));inspClear(t,`штраф $${m} после трёх промахов`);}}
  await wait(400);moving=false;refillStarter();save();render();
  if(S.rolls<=0&&!S.finished)setTimeout(()=>{if(!moving)overtimeOffer();},400);
};})();

// Кнопка броска в режиме спора выглядит как в участке; карточка точки говорит, что она стоит.
(function(){const base=render;render=function(){
  const r=base.apply(this,arguments);
  try{
    const b=$('bRoll');if(b)b.classList.toggle('jail',S.jail>0||!!S.insp);
  }catch(e){}
  inspCardNote();
  return r;
};})();
// Подпись в карточке точки: встаёт после строки с названием (.srow) или заголовка.
function inspCardNote(){
  const card=$('card'),t=S&&S.tiles[S.pos];
  if(!card||card.hidden||!t||!t.insp||card.querySelector('.insp-quote,[data-authority]'))return; // в самом попапе плашка не нужна
  inspCardLock(card,t);
  if(card.querySelector('.insp-note'))return;
  const body=card.querySelector('.property-body')||card.querySelector('.shop');if(!body)return;
  const fine=inspFine(),arguing=S.insp&&S.insp.i===t.i;
  const n=document.createElement('div');n.className='insp-note';
  n.innerHTML=`<p class="insp-head"><i class="insp-ic" aria-hidden="true"></i><span><b>Идёт проверка</b> — ${inspLabel(t)}.<small>${arguing?`Споришь: осталось попыток на дубль — ${S.insp.left}`:'Откупись или лови дубль — как в участке'}</small></span></p>
    <div class="insp-actions">
      <button class="ok insp-btn" data-v="1">${S.cash>=fine?'Заплатить':'В минус'} $${fine}</button>
      <button class="hard insp-btn" data-v="3" ${S.hard<CFG.HARD.bail?'disabled':''}>Откупиться 💎 ${CFG.HARD.bail}</button>
      ${arguing?'':'<button class="bad insp-btn" data-v="0">Ловить дубль</button>'}
    </div>`;
  n.querySelectorAll('.insp-btn').forEach(b=>{b.onclick=()=>{if(!t.insp)return;inspectorResolve(t,+b.dataset.v,fine);};});
  if(typeof enamelButton==='function')n.querySelectorAll('.insp-btn').forEach(b=>enamelButton(b)); // печатные кнопки игры
  if(typeof cashGlyph==='function')cashGlyph(n);
  body.append(n);
}
// Пока идёт проверка: инспектор перекрывает половину картинки, все кнопки карточки заперты,
// кроме крестика и действий инспектора — как в участке.
let inspArtMissing=false;
function inspCardLock(card,t){
  const pic=card.querySelector('.property-picture');
  // Картинка в карточке тянется на свободное место (flex: 1 1 180px; height: 0). Без блоков
  // товара она бы выросла или схлопнулась — фиксируем высоту обычного вида до скрытия блоков.
  const h=pic&&!pic.dataset.inspH?pic.offsetHeight:0;
  if(h>0){pic.style.setProperty('--insp-pic-h',h+'px');pic.dataset.inspH=h;}
  if(pic&&!inspArtMissing&&!pic.querySelector('.insp-overlay')){
    const o=document.createElement('div');o.className='insp-overlay';o.setAttribute('aria-hidden','true');
    // Обработчик в JS: атрибут onerror в этой разметке не срабатывал — оставался значок битой картинки.
    // Нет картинки — запоминаем: иначе удаление оверлея будит наблюдатель карточки и запрос идёт по кругу.
    const img=new Image();img.alt='';img.onerror=()=>{inspArtMissing=true;o.remove();};img.src='assets/ui/inspector-angry.webp';o.append(img);
    pic.append(o);
  }
  card.querySelectorAll('.property-body > .box, .property-body > .uup, .property-body > .rows, .property-actions').forEach(e=>{if(e.classList.contains('insp-note'))return;e.classList.add('insp-hidden');});
  card.querySelectorAll('button:not(.xclose):not(#xNo):not(.insp-btn)').forEach(b=>{if(b.dataset.inspLocked)return;b.dataset.inspLocked=b.disabled?'was':'1';b.disabled=true;b.setAttribute('aria-disabled','true');});
}
function inspCardUnlock(){
  const card=$('card');if(!card)return;
  card.querySelectorAll('[data-insp-locked]').forEach(b=>{if(b.dataset.inspLocked==='1'){b.disabled=false;b.removeAttribute('aria-disabled');}delete b.dataset.inspLocked;});
  card.querySelectorAll('.insp-hidden').forEach(e=>e.classList.remove('insp-hidden'));
  card.querySelectorAll('.insp-overlay,.insp-note').forEach(e=>e.remove());
  card.querySelectorAll('.property-picture[data-insp-h]').forEach(p=>{delete p.dataset.inspH;p.style.removeProperty('--insp-pic-h');});
}
new MutationObserver(()=>inspCardNote()).observe($('card'),{childList:true,subtree:true});
window.Inspector={active:inspActive,fine:inspFine,works:inspWorks,resolve:inspectorResolve};
