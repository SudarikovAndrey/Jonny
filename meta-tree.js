// ===== Конец карты и дерево прогресса (прототип) =====
// Спек: черновики/америкэн-бой-карты-и-дерево.md, баланс: …-баланс-карты-1.md.
// Между картами игрок получает очки прогресса ровно на узлы перехода и обязан
// открыть их все: дерево решает, что доступно на следующей карте (форматы
// точек, категории и товары, стадии бизнеса). Остаток денег карты — в ходы.
// Прототип: вызывается кнопкой в настройках или ?tree=1; карты 2–4 пока нет.
const META={
  cashPerRoll:20, rollsCap:20,
  maps:['Мейн-стрит','Атлантик-Сити','Детройт','Карта 4','Бруклин'],
  steps:[
    {after:1,nodes:[
      {id:'fmt2',br:'Точки',icon:'assets/icons/shop.png',title:'Второй формат',text:'Точки растут до ур. 8: тележка → ларёк, лоток → прилавок'},
      {id:'cat_clothes',br:'Товары',icon:'assets/goods/jeans.png',title:'Одежда',text:'Новая категория: спортивная одежда'},
      {id:'biz_self3',br:'Бизнес',icon:'assets/icons/coins.png',title:'Самозанятый до ур. 3',text:'Бизнесы начинают прокачиваться'},
    ]},
    {after:2,nodes:[
      {id:'fmt3',br:'Точки',icon:'assets/icons/shop.png',title:'Третий формат',text:'Точки до ур. 12: киоск и павильон'},
      {id:'cat_shoes',br:'Товары',icon:'assets/goods/sneak.png',title:'Обувь',text:'Новая категория: кеды'},
      {id:'cat_audio',br:'Товары',icon:'assets/goods/tape.png',title:'Аудио',text:'Новая категория: кассетники'},
      {id:'biz_small',br:'Бизнес',icon:'assets/icons/money.png',title:'Малый бизнес',text:'Бизнесы до ур. 6: прачечная на углу, пиццерия на шесть столиков'},
    ]},
    {after:3,nodes:[
      {id:'fmt4',br:'Точки',icon:'assets/icons/shop.png',title:'Четвёртый формат',text:'Точки до ур. 16: магазинчик и бутик'},
      {id:'g2_drinks',br:'Товары',icon:'assets/goods/bud.png',title:'Пиво',text:'Напитки: второй товар после колы'},
      {id:'g2_sweets',br:'Товары',icon:'assets/goods/gum.png',title:'Конфеты',text:'Сладости: второй товар после жвачки'},
      {id:'g2_clothes',br:'Товары',icon:'assets/goods/levis.png',title:'Джинса',text:'Одежда: второй товар'},
    ]},
    {after:4,nodes:[
      {id:'cat_video',br:'Товары',icon:'assets/goods/vcr.png',title:'Видео',text:'Новая категория: телеки'},
      {id:'g2_rest',br:'Товары',icon:'assets/goods/jordan.png',title:'Вторые товары',text:'Кроссовки, плееры, видаки'},
      {id:'g3_all',br:'Товары',icon:'assets/goods/champ.png',title:'Третьи товары',text:'Алкоголь, кондитерская, кожа, сапоги, CD, видеокамеры'},
      {id:'biz_mid',br:'Бизнес',icon:'assets/icons/crown.png',title:'Средний бизнес',text:'Бизнесы до ур. 9: дайнер 24/7, таксопарк, ночной клуб'},
    ]},
  ],
};
function metaState(){if(!S.meta)S.meta={map:1,pp:0,owned:[]};return S.meta;}
// Жетон очка прогресса: золотая печатная монета со звездой, как знаки поля.
const ppIcon='<svg class="tree-pp" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13.5" fill="#e0ad3a" stroke="#1d1a15" stroke-width="2.4"/><circle cx="16" cy="16" r="9.5" fill="none" stroke="#a8761c" stroke-width="1.4"/><path d="M16 8.6l2.2 4.6 5 .6-3.7 3.4 1 5-4.5-2.5-4.5 2.5 1-5-3.7-3.4 5-.6Z" fill="#c43a2d" stroke="#1d1a15" stroke-width="1.3" stroke-linejoin="round"/></svg>';

// Шаг 1 — итоги карты и перевод остатка денег в ходы.
async function mapEndFlow(mapNo=1){
  const m=metaState(),cash=Math.max(0,Math.round(S.cash));
  const rolls=Math.min(META.rollsCap,Math.floor(cash/META.cashPerRoll));
  const step=META.steps.find(s=>s.after===mapNo);
  track('map_end',{map:mapNo,cash,rolls});
  const card=$('card');
  card.className='card event-card tree-card';
  card.innerHTML=`<header class="ev-head"><span class="ev-badge"><img src="assets/icons/crown.png" alt=""></span>
      <div class="ev-titles"><h2 class="ev-title">Карта пройдена</h2><span class="ev-sub">${META.maps[mapNo-1]} · карта ${mapNo}</span></div></header>
    <div class="ev-body">
      <div class="tree-sum">
        <div><small>Заработано</small><b>$${(S.stat.earned||0).toLocaleString('ru-RU')}</b></div>
        <div><small>Продано</small><b>${S.stat.sold||0} шт.</b></div>
        <div><small>Точек</small><b>${myKiosks().length}</b></div>
      </div>
      <div class="tree-convert">
        <span class="tree-cv-from"><small>Осталось денег</small><b>$${cash.toLocaleString('ru-RU')}</b></span>
        <span class="tree-cv-arrow">→</span>
        <span class="tree-cv-to"><small>Уходит в ходы</small><b>🎲 +${rolls}</b></span>
      </div>
      <p class="tree-note">Деньги и точки остаются на этой карте. С собой — Джонни, ходы и кристаллы.
        Курс: 1 ход за $${META.cashPerRoll}, не больше ${META.rollsCap}.</p>
      <div class="tree-pp-gain">${ppIcon}<b>+${step?step.nodes.length:0}</b><span>очка прогресса — на дерево развития</span></div>
    </div>
    <footer class="ev-foot"><div class="mbtns"><button class="ok" id="treeNext">К дереву развития</button></div></footer>`;
  $('treeNext').onclick=()=>{
    S.rolls+=rolls;S.cash-=rolls*META.cashPerRoll;if(step)m.pp+=step.nodes.filter(n=>!m.owned.includes(n.id)).length;
    m.map=mapNo;save();render();treeScreen(mapNo);
  };
  await openCustom();save();render();
}

// Шаг 2 — дерево: узлы текущего перехода обязательны, дальние затемнены.
function treeScreen(mapNo){
  const m=metaState(),card=$('card');
  const cur=META.steps.find(s=>s.after===mapNo);
  const left=cur?cur.nodes.filter(n=>!m.owned.includes(n.id)).length:0;
  const chain=META.maps.map((nm,i)=>{const k=i+1,st=k<=mapNo?'done':k===mapNo+1?'next':'';
    return `<span class="tree-map ${st}"><i>${k<=mapNo?'✓':k===5?'★':k}</i><small>${nm}</small></span>`;}).join('<span class="tree-link"></span>');
  const stepHtml=s=>{
    const state=s.after<mapNo?'past':s.after===mapNo?'now':'future';
    const nodes=s.nodes.map(n=>{const own=m.owned.includes(n.id);
      return `<article class="tree-node ${own?'own':''} ${state}" data-just="${n.id}">
        <span class="tree-ic"><img src="${n.icon}" alt=""></span>
        <span class="tree-br">${n.br}</span><b>${n.title}</b><small>${n.text}</small>
        ${own?'<span class="tree-stamp">Открыто</span>':state==='now'?`<button class="ok tree-buy" data-node="${n.id}" ${m.pp<1?'disabled':''}>Открыть · ${ppIcon}1</button>`:`<span class="tree-lock"><img src="assets/bp/bp-lock.png" alt="">после карты ${s.after}</span>`}
      </article>`;}).join('');
    return `<section class="tree-step ${state}"><h3>После карты ${s.after}<small>${state==='now'?`осталось открыть: ${left}`:state==="past"?"открыто":"откроется после карты "+s.after}</small></h3><div class="tree-grid">${nodes}</div></section>`;
  };
  card.className='card event-card tree-card';
  card.innerHTML=`<header class="ev-head"><span class="ev-badge"><img src="assets/icons/shop.png" alt=""></span>
      <div class="ev-titles"><h2 class="ev-title">Развитие</h2><span class="ev-sub tree-wallet">${ppIcon}<b>${m.pp}</b> очков прогресса</span></div>
      ${helpBtn('Дерево решает, что тебе доступно на следующих картах: форматы точек, новые товары, стадии бизнеса. Очки прогресса дают за пройденную карту — ровно на узлы этого шага.')}</header>
    <div class="ev-body">
      <div class="tree-chain">${chain}</div>
      ${META.steps.map(stepHtml).join('')}
    </div>
    <footer class="ev-foot"><div class="mbtns"><button class="ok" id="treeGo" ${left?'disabled':''}>${left?`Открой все узлы · ещё ${left}`:`Дальше: ${META.maps[mapNo]||'—'}`}</button></div></footer>`;
  const help=card.querySelector('.ev-head>.qm');if(help)help.classList.add('ev-help');
  card.querySelectorAll('[data-node]').forEach(b=>b.onclick=()=>{
    if(m.pp<1)return;m.pp--;m.owned.push(b.dataset.node);track('tree_node',{node:b.dataset.node,map:mapNo});save();treeScreen(mapNo);
    card.querySelector(`[data-just="${b.dataset.node}"]`)?.classList.add('just');
  });
  $('treeGo').onclick=()=>{if(left)return;track('tree_done',{map:mapNo});closeModal();toast(`Карта ${mapNo+1} «${META.maps[mapNo]}» — следующая в разработке. Дерево сохранено.`,3600);};
  card.querySelector('.tree-step.now')?.scrollIntoView({block:'nearest'});
}

// Вход для теста: кнопка в настройках и ?tree=1.
new MutationObserver(()=>{const c=$('card');if(!c.querySelector('#iRolls')||c.querySelector('#treeTest'))return;
  const b=document.createElement('button');b.id='treeTest';b.className='sec';b.textContent='Тест: конец карты 1 и дерево';
  b.onclick=()=>{closeModal();setTimeout(()=>mapEndFlow(1),120);};
  (c.querySelector('.mbtns')||c).before(b);
}).observe($('card'),{childList:true,subtree:true});
if(new URLSearchParams(location.search).get('tree')==='1')setTimeout(()=>{if($('modal').hidden)mapEndFlow(1);},2500);
