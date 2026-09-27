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
      {id:'fmt2',br:'Точки',icon:'assets/icons/shop.webp',title:'Второй формат',text:'Точки растут до ур. 8: тележка → ларёк, лоток → прилавок'},
      {id:'cat_clothes',br:'Товары',icon:'assets/goods/jeans.webp',title:'Одежда',text:'Новая категория: спортивная одежда'},
      {id:'biz_self3',br:'Бизнес',icon:'assets/icons/coins.webp',title:'Самозанятый до ур. 3',text:'Бизнесы начинают прокачиваться'},
    ]},
    {after:2,nodes:[
      {id:'fmt3',br:'Точки',icon:'assets/icons/shop.webp',title:'Третий формат',text:'Точки до ур. 12: киоск и павильон'},
      {id:'cat_shoes',br:'Товары',icon:'assets/goods/sneak.webp',title:'Обувь',text:'Новая категория: кеды'},
      {id:'cat_audio',br:'Товары',icon:'assets/goods/tape.webp',title:'Аудио',text:'Новая категория: кассетники'},
      {id:'biz_small',br:'Бизнес',icon:'assets/icons/money.webp',title:'Малый бизнес',text:'Бизнесы до ур. 6: прачечная на углу, пиццерия на шесть столиков'},
    ]},
    {after:3,nodes:[
      {id:'fmt4',br:'Точки',icon:'assets/icons/shop.webp',title:'Четвёртый формат',text:'Точки до ур. 16: магазинчик и бутик'},
      {id:'g2_drinks',br:'Товары',icon:'assets/goods/bud.webp',title:'Пиво',text:'Напитки: второй товар после колы'},
      {id:'g2_sweets',br:'Товары',icon:'assets/goods/gum.webp',title:'Конфеты',text:'Сладости: второй товар после жвачки'},
      {id:'g2_clothes',br:'Товары',icon:'assets/goods/levis.webp',title:'Джинса',text:'Одежда: второй товар'},
    ]},
    {after:4,nodes:[
      {id:'cat_video',br:'Товары',icon:'assets/goods/vcr.webp',title:'Видео',text:'Новая категория: телеки'},
      {id:'g2_rest',br:'Товары',icon:'assets/goods/jordan.webp',title:'Вторые товары',text:'Кроссовки, плееры, видаки'},
      {id:'g3_all',br:'Товары',icon:'assets/goods/champ.webp',title:'Третьи товары',text:'Алкоголь, кондитерская, кожа, сапоги, CD, видеокамеры'},
      {id:'biz_mid',br:'Бизнес',icon:'assets/icons/crown.webp',title:'Средний бизнес',text:'Бизнесы до ур. 9: дайнер 24/7, таксопарк, ночной клуб'},
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
  card.className='card event-card tree-card growth-summary';
  card.innerHTML=`<header class="ev-head"><span class="ev-badge"><img src="assets/icons/crown.webp" alt=""></span>
      <div class="ev-titles"><h2 class="ev-title">Карта пройдена</h2><span class="ev-sub">${META.maps[mapNo-1]} · карта ${mapNo}</span></div></header>
    <div class="ev-body">
      <div class="growth-summary-art">${treeFormatArt(Math.min(4,mapNo))}</div>
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
    $('treeNext').disabled=true;metaFinish(mapNo);treeScreen(mapNo);
  };
  await openCustom();save();render();
}

// The same unlock transaction is used by every branch and by regression tests.
function metaUnlock(mapNo,id){
  const m=metaState(),step=META.steps.find(s=>s.after===mapNo);
  if(m.map!==mapNo||!step?.nodes.some(n=>n.id===id)||m.owned.includes(id)||m.pp<1)return false;
  m.pp--;m.owned.push(id);track('tree_node',{node:id,map:mapNo});save();return true;
}
function metaFinish(mapNo){
  const m=metaState(),step=META.steps.find(s=>s.after===mapNo);
  m.settled=m.settled||[];if(m.settled.includes(mapNo))return false;
  const cash=Math.max(0,Math.round(S.cash)),rolls=Math.min(META.rollsCap,Math.floor(cash/META.cashPerRoll));
  S.rolls+=rolls;S.cash-=rolls*META.cashPerRoll;
  if(step)m.pp+=Math.max(0,step.nodes.filter(n=>!m.owned.includes(n.id)).length-m.pp);
  m.map=mapNo;m.settled.push(mapNo);save();render();return true;
}
const TREE_BRANCHES=['Точки','Товары','Бизнес'];
let treeView={map:0,branch:'Точки',scroll:{}};
const treeEsc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function treePointArt(g,f){return window.PropertyArt?PropertyArt.point(g,f):`assets/points/pt_${g}_${f}.webp`;}
function treeFormatArt(format){
  const names={cola:['Тележка колы','Ларёк колы','Киоск колы','Магазинчик колы'],gum:['Лоток жвачки','Прилавок жвачки','Киоск жвачки','Магазинчик жвачки']};
  return `<div class="growth-formats">${['cola','gum'].map(g=>`<figure><img src="${treePointArt(g,format)}" alt="" loading="lazy"><figcaption>${names[g][format-1]}</figcaption></figure>`).join('')}</div>`;
}
function treeNodeArt(n){
  const format=Number(n.id.replace('fmt',''));
  if(n.id.startsWith('fmt'))return treeFormatArt(format);
  const goods={g2_drinks:'bud',g2_sweets:'candy',g2_clothes:'jeans',cat_clothes:'sport',cat_shoes:'keds',cat_audio:'tape',cat_video:'tv'};
  if(goods[n.id])return `<div class="growth-object"><img src="${treePointArt(goods[n.id],1)}" alt="" loading="lazy"></div>`;
  const bizStages={biz_self3:1,biz_small:2,biz_mid:3};
  if(bizStages[n.id])return `<div class="growth-object"><img src="${PropertyArt.business(3,bizStages[n.id],'brooklyn')}" alt="" loading="lazy"></div>`;
  const extra={g2_rest:['sneak','walk','vcr'],g3_all:['champ','cake','jacket','boots','disc','cam']};
  const images=(extra[n.id]||[]).map(g=>'assets/goods/'+g+'.webp');
  return `<div class="growth-symbols ${n.br==='Бизнес'?'business-symbol':''}">${(images.length?images:[n.icon]).map(src=>`<img src="${src}" alt="" loading="lazy">`).join('')}</div>`;
}
function treeRoot(branch){
  const body=branch==='Точки'?treeFormatArt(1):branch==='Товары'?'<div class="growth-root-goods"><img src="assets/goods/cola.webp" alt="">Кола <img src="assets/goods/gum.webp" alt="">Жвачка</div>':'<b>Самозанятый</b><span>ур. 1</span>';
  return `<article class="growth-root"><div class="growth-root-title"><span>Старт</span>${branch==='Точки'?'<b>ур. 1–4</b>':'<span class="growth-root-check" aria-label="Открыто">✓</span>'}</div>${body}</article>`;
}
function treeNode(n,step,mapNo){
  const owned=metaState().owned.includes(n.id),current=step.after===mapNo,state=owned?'own':current?'available':'locked';
  const fmt=n.id.startsWith('fmt')?Number(n.id.slice(3)):0;
  return `<article class="growth-node ${state}" data-tree-node="${n.id}" aria-label="${treeEsc(n.title)}${owned?' — открыто':''}">
    <div class="growth-node-meta"><span>После карты ${step.after}</span>${fmt?`<b>ур. ${(fmt-1)*4+1}–${fmt*4}</b>`:''}</div>
    <h3>${n.title}</h3>${treeNodeArt(n)}
    ${fmt?'':`<p>${n.text}</p>`}
    <div class="growth-node-action">${owned?'<span class="growth-stamp">Открыто</span>':current?`<button type="button" class="ok tree-buy" data-node="${n.id}" aria-label="Открыть: ${treeEsc(n.title)}" ${metaState().pp<1?'disabled':''}>Открыть <span>${ppIcon}1</span></button>`:`<span class="growth-lock" aria-label="после карты ${step.after}"><img src="assets/bp/bp-lock.webp" alt=""></span>`}</div>
  </article>`;
}
function treeRoute(mapNo){return `<div class="growth-route" aria-label="Карты">${META.maps.map((name,i)=>`<span class="growth-stop ${i<mapNo?'complete':i===mapNo?'next':''}" ${i===mapNo?'aria-current="step"':''} title="${treeEsc(name)}"><i>${i<mapNo?'✓':i+1}</i><span>${name}</span></span>`).join('')}</div><div class="growth-destination">${META.maps[mapNo-1]} <span aria-hidden="true">→</span> <b>${META.maps[mapNo]}</b></div>`;}
// Three branches on a wide board; one full-size branch at a time on a phone.
function treeScreen(mapNo){
  mapNo=Math.max(1,Math.min(4,Number(mapNo)||1));
  if(treeView.map!==mapNo)treeView={map:mapNo,branch:'Точки',scroll:{}};
  const m=metaState(),card=$('card'),cur=META.steps.find(s=>s.after===mapNo);
  const pending=cur.nodes.filter(n=>!m.owned.includes(n.id)),left=pending.length;
  card.className='card event-card tree-card growth-tree';card.dataset.treeMap=mapNo;
  card.innerHTML=`<header class="ev-head growth-header"><div class="ev-titles"><h2 class="ev-title">Развитие</h2></div>
    <div class="growth-wallet" aria-label="Очки прогресса: ${m.pp}">${ppIcon}<b>${m.pp}</b></div>
    ${helpBtn('Дерево решает, что тебе доступно на следующих картах: форматы точек, новые товары, стадии бизнеса. Очки прогресса дают за пройденную карту — ровно на узлы этого шага.')}</header>
    <div class="growth-route-wrap">${treeRoute(mapNo)}</div>
    <div class="growth-tabs" role="tablist" aria-label="Ветки развития">${TREE_BRANCHES.map((br,i)=>{const count=pending.filter(n=>n.br===br).length;return `<button type="button" id="treeTab${i}" role="tab" aria-controls="treeBranch${i}" aria-selected="${br===treeView.branch}" tabindex="${br===treeView.branch?0:-1}" data-branch="${br}">${br}${count?`<span>${count}</span>`:'<span class="branch-done">✓</span>'}</button>`;}).join('')}</div>
    <div class="ev-body growth-body"><div class="growth-columns">${TREE_BRANCHES.map((br,i)=>`<section class="growth-branch ${treeView.branch===br?'selected':''}" id="treeBranch${i}" role="tabpanel" aria-labelledby="treeTab${i}"><h3 class="growth-branch-title">${br}</h3><div class="growth-line">${treeRoot(br)}${META.steps.map(step=>step.nodes.filter(n=>n.br===br).map(n=>treeNode(n,step,mapNo)).join('')).join('')}</div></section>`).join('')}</div></div>
    <footer class="ev-foot"><div class="mbtns"><button class="ok" id="treeGo" ${left?'disabled':''}>${left?`Открой все узлы · ещё ${left}`:`Дальше: ${META.maps[mapNo]}`}</button></div></footer>`;
  const body=card.querySelector('.growth-body');
  const wide=()=>matchMedia('(min-width:761px)').matches;
  const remember=()=>{if(wide())card.querySelectorAll('.growth-branch').forEach((el,i)=>treeView.scroll[TREE_BRANCHES[i]]=el.scrollTop);else treeView.scroll[treeView.branch]=body.scrollTop;};
  const position=(scroller,branch,head)=>{
    const panel=card.querySelector('#treeBranch'+TREE_BRANCHES.indexOf(branch));
    const node=panel.querySelector('.growth-node.available')||[...panel.querySelectorAll('.growth-node.own')].at(-1);
    let top=0;for(let e=node;e&&e!==scroller;e=e.offsetParent)top+=e.offsetTop;
    scroller.scrollTop=treeView.scroll[branch]??(node?Math.max(0,top-head):0);
  };
  const restore=()=>{if(wide())card.querySelectorAll('.growth-branch').forEach((el,i)=>position(el,TREE_BRANCHES[i],52));else position(body,treeView.branch,12);};
  // Layout after the modal opens, without scrolling the underlying game.
  requestAnimationFrame(restore);
  function selectBranch(br){
    remember();treeView.branch=br;
    card.querySelectorAll('[data-branch]').forEach(b=>{const on=b.dataset.branch===br;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;});
    card.querySelectorAll('.growth-branch').forEach((s,i)=>s.classList.toggle('selected',TREE_BRANCHES[i]===br));restore();
  }
  card.querySelectorAll('[data-branch]').forEach((b,i)=>{
    b.onclick=()=>selectBranch(b.dataset.branch);
    b.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const j=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;selectBranch(TREE_BRANCHES[j]);$('treeTab'+j).focus({preventScroll:true});};
  });
  card.querySelectorAll('[data-node]').forEach(b=>b.onclick=()=>{
    const id=b.dataset.node;if(!metaUnlock(mapNo,id))return;
    remember();
    const from=card.querySelector('.growth-wallet').getBoundingClientRect();
    treeScreen(mapNo);
    const node=card.querySelector(`[data-tree-node="${id}"]`);node.classList.add('just');
    requestAnimationFrame(()=>{
      const target=node.querySelector('.growth-stamp'),to=target.getBoundingClientRect();
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
        const token=document.createElement('span');token.className='growth-flying-token';token.innerHTML=ppIcon;token.setAttribute('aria-hidden','true');document.body.append(token);
        token.style.left=from.left+'px';token.style.top=from.top+'px';
        const dx=to.left+to.width/2-from.left,dy=to.top-from.top;
        token.animate([{transform:'translate(0,0) scale(1)'},{transform:`translate(${dx*.5-24}px,${dy*.35}px) scale(1.15)`,offset:.45},{transform:`translate(${dx}px,${dy}px) scale(.35)`,opacity:0}],{duration:340,easing:'cubic-bezier(.3,.7,.4,1)'}).onfinish=()=>token.remove();
      }
      const next=card.querySelector(wide()?'.growth-branch .tree-buy':'.growth-branch.selected .tree-buy')||[...card.querySelectorAll('[data-branch]')].find(t=>t.querySelector('span:not(.branch-done)'))||$('treeGo');next.focus({preventScroll:true});
    });
    try{GameFeedback.sound('joy');}catch(e){}
  });
  $('treeGo').onclick=()=>{if(left)return;track('tree_done',{map:mapNo});closeModal();toast(`Карта ${mapNo+1} «${META.maps[mapNo]}» — следующая в разработке. Дерево сохранено.`,3600);};
}

// Вход для теста: кнопка в настройках и ?tree=1.
new MutationObserver(()=>{const c=$('card');if(!c.querySelector('#iRolls')||c.querySelector('#treeTest'))return;
  const b=document.createElement('button');b.id='treeTest';b.className='sec';b.textContent='Тест: конец карты 1 и дерево';
  b.onclick=()=>{closeModal();setTimeout(()=>mapEndFlow(1),120);};
  (c.querySelector('.mbtns')||c).before(b);
}).observe($('card'),{childList:true,subtree:true});
if(new URLSearchParams(location.search).get('tree')==='1')setTimeout(()=>{if($('modal').hidden)mapEndFlow(1);},2500);
