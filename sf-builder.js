// ===== Карта «Сан-Франциско» — режим стройки (?map=sf) =====
// Спек: черновики/америкэн-бой-сан-франциско.md. Решения продюсера 28.09.2026:
// отдельная карта после Бруклина; поставок нет; игрок сам выбирает, что строить
// на пустырях; одно правило соседства; общий уровень благосостояния города,
// который растёт, когда город обеспечен разными товарами, и поднимает цены.
// Плотные полчаса: 120 ходов, без дней. Своё сохранение (americanboy_sf).
var SFMAP=new URLSearchParams(location.search).get('map')==='sf';
if(SFMAP){
document.body.classList.add('map-mode','sf-mode');
boardMap=()=>'sanfrancisco';setBoardMap=()=>{};
Object.assign(CFG,{START_CASH:600,REAL_DAYS:false,ROLLS_PER_DAY:120});
CFG.KIOSK.showProfit=true;
// Пустырь — псевдотовар, чтобы строка точки и карточка не падали на good(null).
CFG.GOODS.push({id:'lot',name:'Пустырь',buy:1,sell:1,pts:0,zone:0,icon:'🏗'});
const SF={
  rolls:120,taskRolls:10,levelCap:5,payback:6,
  cats:['gum','cola','tape','jeans','sneak','vcr'],
  tiers:[['gum','cola'],['tape','jeans'],['sneak','vcr']],       // дешёвый · средний · дорогой вариант на пустыре
  pen:{gum:.10,cola:.15,tape:.20,jeans:.25,sneak:.30,vcr:.40},   // штраф за такого же соседа: дороже — больнее
  bonus:.10,bonusMax:.20,                                         // премия за соседа другой категории
  prosp:.06,                                                      // +6% к ценам за каждую категорию, которой обеспечен город
  cat:{gum:'Сладости',cola:'Напитки',tape:'Аудио',jeans:'Одежда',sneak:'Обувь',vcr:'Видео'},
  gen:{gum:'сладостей',cola:'напитков',tape:'кассет',jeans:'джинсов',sneak:'кроссовок',vcr:'видиков'},
  formats:['Лоток','Ларёк','Киоск','Магазинчик'],
  biz:{3:'Канатный трамвай',8:'Рыбный причал',17:'Кофейня «Норт-Бич»',23:'Прачечная Чайнатауна',32:'Сёрф-прокат',37:'Пекарня «Сауэрдоу»'},
};
const SF_TASKS=[
  {id:'build',text:n=>`Построй ${n} точек`,goal:16,val:()=>myKiosks().length},
  {id:'city',text:n=>`Обеспечь город: ${n} категорий`,goal:6,val:()=>sfCovered()},
  {id:'earn',text:n=>`Заработай $${n}`,goal:4000,val:()=>S.stat.earned||0},
];
CFG.BIZ_NAMES=SF.biz;
const sfBase=G=>2+(G-1);                                          // продажи за круг по уровню, как на карте 1
function sfMargin(cat){return Math.max(1,good(cat).sell-good(cat).buy);}
function sfPrice(cat){return Math.max(20,Math.round(sfBase(1)*sfMargin(cat)*SF.payback/5)*5);}

// Поле: пустыри вместо готовых точек. Служебные клетки как в Бруклине, «Шанса» нет.
buildTiles=function(){
  const biz=new Set([3,8,17,23,32,37]),wh=new Set([6,19,24,30,34]);
  const r10=(a,b)=>Math.round((a+Math.random()*(b-a))/10)*10;let k=0;const t=[];
  for(let i=0;i<40;i++){
    const o={i,type:'kiosk',zone:0,owner:null,level:0,capLvl:1,salesLvl:1,goods:0,tier:1};
    if(i===0)o.type='home';
    else if(i===10){o.type='slot';o.zone=-1;}
    else if(wh.has(i)){o.type='wh';o.zone=-1;}
    else if(i===5){o.type='hazard';o.zone=-1;}
    else if(i===15){o.type='police';o.zone=-1;}
    else if(i===25){o.type='pot';o.zone=-1;}
    else if(i===35){o.type='scatter';o.zone=-1;}
    else if(biz.has(i)){o.type='biz';o.price=r10(150,250);o.price0=o.price;}
    else{const n=k++;o.good='lot';o.base=null;o.lot=true;
      o.opts=[SF.tiers[0][n%2],SF.tiers[1][(n+1)%2],SF.tiers[2][n%2]];
      o.price=sfPrice(o.opts[0]);o.price0=o.price;}
    t.push(o);
  }
  return t;
};

// ---- Соседство: единственное правило района ----
function sfNeighbors(t){return [S.tiles[(t.i+39)%40],S.tiles[(t.i+1)%40]].filter(n=>n.type==='kiosk'&&n.owner&&n.base&&!sfIsLot(n));}
function sfMod(t,cat){
  cat=cat||t.base;if(!cat)return 1;let m=1,bonus=0;
  for(const n of sfNeighbors(t)){if(n.base===cat)m-=SF.pen[cat];else bonus+=SF.bonus;}
  return Math.max(.3,m+Math.min(SF.bonusMax,bonus));
}
function sfModText(t,cat){
  cat=cat||t.base;const ns=sfNeighbors(t);if(!cat||!ns.length)return 'нет';
  const same=ns.filter(n=>n.base===cat),diff=ns.filter(n=>n.base!==cat);
  const parts=[];if(same.length)parts.push(`−${Math.round(SF.pen[cat]*100*same.length)}% такие же рядом`);
  if(diff.length)parts.push(`+${Math.round(Math.min(SF.bonusMax,SF.bonus*diff.length)*100)}% ${diff.map(n=>good(n.base).icon).join('')}`);
  return parts.join(' · ');
}
function sfCovered(){return new Set(myKiosks().filter(t=>!sfIsLot(t)).map(t=>t.base).filter(Boolean)).size;}
function sfPriceMult(){return 1+SF.prosp*sfCovered();}

// ---- Лестница точки (как на карте 1) с поправкой соседства на продажи ----
sales=function(t){const base=salesBoost(sfBase(t.salesLvl));return t.owner?Math.max(1,Math.round(base*sfMod(t))):base;};
cap=function(t){return 4*sfBase(t.salesLvl);};
salesCost=function(t){const m=sfMargin(t.base||t.good);return Math.max(5,Math.round(m*SF.payback*Math.pow(1.03,t.salesLvl-1)/5)*5);};
kioskLvl=t=>t.salesLvl;
kioskMaxLvl=()=>SF.levelCap;
kioskNextStat=t=>t.salesLvl<SF.levelCap?'sales':null;
kioskUpCost=t=>kioskNextStat(t)?salesCost(t):0;
kioskAfter=t=>kioskNextStat(t)?{cap:4*sfBase(t.salesLvl+1),sales:Math.max(1,Math.round(salesBoost(sfBase(t.salesLvl+1))*sfMod(t)))}:null;
kioskLevelsNormalize=function(){if(!S||!S.tiles)return;for(const t of S.tiles)if(t.type==='kiosk'&&t.owner)t.capLvl=t.salesLvl;};
function sfIsLot(t){return !!t&&t.type==='kiosk'&&!t.owner&&(t.lot||t.good==='lot');}
pointName=function(t){if(sfIsLot(t)||!t.base)return 'Пустырь';const f=SF.formats[Math.min(SF.formats.length-1,Math.floor((t.salesLvl-1)/2))];return `${f} ${SF.gen[t.base]||''}`.trim();};
evolveState=()=>'max';
// Благосостояние: чем больше категорий у города, тем дороже всё продаётся.
(function(){const base=sellPrice;sellPrice=function(g){return Math.round(base.apply(this,arguments)*sfPriceMult());};})();

// ---- Меню стройки на пустыре: три варианта, каждый с последствиями ----
(function(){const base=kioskWindow;kioskWindow=async function(t){
  if(sfIsLot(t))return sfBuildMenu(t);
  return base.apply(this,arguments);
};})();
// Плашка соседства: «соседи +20% 🍬🥤». Соседи есть, а итог 0% (штраф и бонус погасили друг
// друга) — всё равно показываем их, иначе читается как «соседей нет».
function sfNbChip(t,cat,cls){
  const ns=sfNeighbors(t);if(!ns.length)return `<span class="${cls}">соседей нет</span>`;
  const pct=Math.round((sfMod(t,cat)-1)*100),same=ns.some(n=>n.base===(cat||t.base));
  return `<span class="${cls} ${pct>0?'good':pct<0?'bad':''}">соседи ${pct>0?'+':pct<0?'−':'±'}${Math.abs(pct)}% <span class="sf-gis">${ns.map(n=>`<img class="sf-gi" src="assets/goods/${n.base}.webp" alt="${good(n.base).name}">`).join('')}</span>${same?'<small> такой же рядом</small>':''}</span>`;
}
async function sfBuildMenu(t){
  track('window',{w:'lot',tile:t.i,cash:S.cash});
  // Три карточки варианта: картинка точки, цена, прибыль, подсказка соседства.
  // Тап по карточке жмёт её кнопку в .mbtns (data-i) — выбор идёт тем же путём, что и раньше.
  const rows=t.opts.map((cat,i)=>{const g=good(cat),p=sfPrice(cat),mod=sfMod(t,cat),profit=Math.max(1,Math.round(sfBase(1)*mod))*Math.round(sfMargin(cat)*sfPriceMult()),fill=cap({salesLvl:1})*buyPrice(cat);
    const pct=Math.round((mod-1)*100),poor=S.cash<p,art=window.PropertyArt?PropertyArt.point(cat,1):`assets/points/pt_${cat}_1.webp`;
    const tier=['дёшево','средне','дорого'][i]||'';
    return `<div role="button" tabindex="${poor?-1:0}" class="sf-opt ${poor?'poor':''}" data-i="${i}" ${poor?'aria-disabled="true"':''} aria-label="${SF.formats[0]} ${SF.gen[cat]}, $${p}">
      <span class="sf-art"><img src="${art}" alt="" decoding="async"></span>
      <span class="sf-info"><b>${SF.formats[0]} ${SF.gen[cat]||g.name}</b><small class="sf-cat">${SF.cat[cat]} · ${tier}</small>
        <span class="sf-stats"><span>≈ <i class="cash-glyph"></i>${profit}<em>за круг</em></span><span>запас <i class="cash-glyph"></i>${fill}</span></span>
        ${sfNbChip(t,cat,'sf-nb')}</span>
      <span class="sf-price">${poor?`<small>не хватает</small><i class="cash-glyph"></i>${p-S.cash}`:`<i class="cash-glyph"></i>${p}`}</span></div>`;}).join('');
  $('card').classList.add('sf-build');
  const pending=modal(`<h2>🏗 Пустырь <small>клетка ${t.i}</small></h2><p class="t sf-lead">Что построить? Разное рядом продаёт лучше, одинаковое — хуже.</p><div class="sf-opts">${rows}</div>`,
    t.opts.map((cat,i)=>({t:`${good(cat).icon} $${sfPrice(cat)}`,v:i,cls:S.cash>=sfPrice(cat)?'ok':'sec',dis:S.cash<sfPrice(cat)})).concat([{t:'Позже',v:-1,cls:'sec'}]));
  $('card').querySelectorAll('.sf-opt').forEach(o=>{const pick=()=>{const b=$('card').querySelector(`.mbtns button[data-i="${o.dataset.i}"]`);if(b&&!b.disabled)b.click();};
    o.onclick=pick;o.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick();}};});
  const v=await pending;
  if(v===undefined||v<0)return;
  const cat=t.opts[v],p=sfPrice(cat);if(S.cash<p)return;
  track('sf_build',{tile:t.i,cat,price:p,mod:sfMod(t,cat)});
  fly('💵',AT.cash(),AT.tile(t.i),flyN(p));S.cash-=p;
  t.owner='you';t.good=cat;t.base=cat;t.lot=false;t.price=p;t.price0=p;t.capLvl=1;t.salesLvl=1;t.goods=0;t.tier=1;
  S.stat.bought++;S.dstat.bought++;qProg('buy',1);
  const cov=sfCovered();
  toast(`🏗 ${pointName(t)} построен${cov>(S.sf.covered||0)?` · город обеспечен: ${cov}/6, цены +${Math.round(SF.prosp*cov*100)}%`:''}`,3000);
  S.sf.covered=cov;
  log(`🏗 Построил ${pointName(t)} на клетке ${t.i} за $${p}. Соседи: ${sfModText(t)}.`);
  save();render();
}

// ---- Карточка построенной точки: строка соседства и городской надбавки ----
function sfCardNote(){
  const card=$('card'),t=S&&S.tiles[S.pos];
  if(!card||card.hidden||!t||t.type!=='kiosk'||!t.owner||!t.base||card.querySelector('.sf-note'))return;
  const anchor=card.querySelector('.srow')||card.querySelector('h2');if(!anchor)return;
  const mod=Math.round((sfMod(t)-1)*100);
  const n=document.createElement('p');n.className='sf-note';
  n.innerHTML=`${sfNbChip(t,null,'sf-chip')}<span class="sf-chip city">Город +${Math.round((sfPriceMult()-1)*100)}% <small>к ценам</small></span>`;
  anchor.after(n);
}
new MutationObserver(()=>sfCardNote()).observe($('card'),{childList:true,subtree:true});

// ---- Новая партия и вступление ----
const sfBaseNew=newGame;
newGame=function(){const r=sfBaseNew.apply(this,arguments);
  S.firstRoute={variant:0,index:0,done:true};S.training={shipped:true,explained:true,skipped:true};S.starter.closed=true;
  S.q=[];S.rolls=SF.rolls;S.opened=[true,true,true];S.sf={done:{},ended:false,covered:0};S.tips.intro=true;
  log('Джонни в Сан-Франциско. В кармане $'+S.cash+'. Пустыри ждут — строй, что хочешь.');save();render();return r;};
intro=async function(){await modal(`<h2>🌉 Сан-Франциско</h2><p class="t">Город на холмах. Здесь Джонни не покупает готовое — он строит.</p>
  <p>На каждом пустыре три варианта: дешёвый, средний, дорогой. <b>Одинаковое рядом продаёт хуже, разное — лучше.</b></p>
  <p>Город богатеет, когда обеспечен всем: каждая новая категория товара поднимает цены на всё.</p>
  <p><b>Задачи:</b> построй 16 точек · обеспечь город 6 категориями · заработай $4000. Ходов — ${SF.rolls}.</p>`,[{t:'Строим',v:1,cls:'ok'}]);};

// ---- Задачи, благосостояние в шапке, конец карты ----
function sfTasks(){return SF_TASKS.map(q=>({...q,v:Math.min(q.goal,q.val()),ok:q.val()>=q.goal}));}
function sfRenderTasks(){
  const row=$('qrow');if(!row)return;let box=$('sfTasks');
  if(!box){box=document.createElement('div');box.id='sfTasks';row.append(box);}
  box.innerHTML=sfTasks().map(q=>`<span class="qchip m1-task${q.ok?' ok':''}"><b>${q.ok?'✓':q.v+'/'+q.goal}</b><span>${q.text(q.goal)}</span><i style="--p:${Math.round(q.v/q.goal*100)}%"></i></span>`).join('');
}
function sfProgress(){
  if(!S.sf)return;const st=S.sf;
  for(const q of sfTasks())if(q.ok&&!st.done[q.id]){st.done[q.id]=true;S.rolls+=SF.taskRolls;toast(`✓ ${q.text(q.goal)} — +${SF.taskRolls} ходов`,2600);track('map_task',{map:'sf',task:q.id});}
  if(!st.ended&&sfTasks().every(q=>q.ok)&&!moving&&$('modal').hidden){st.ended=true;save();setTimeout(sfEnd,600);}
}
async function sfEnd(){
  track('map_end',{map:'sf',cash:S.cash,earned:S.stat.earned,points:myKiosks().length,rollsLeft:S.rolls});
  const v=await modal(`<h2>🌉 Сан-Франциско построен</h2><div class="row"><span class="n">Заработано</span><span class="v">$${S.stat.earned||0}</span></div>
    <div class="row"><span class="n">Точек</span><span class="v">${myKiosks().length}</span></div><div class="row"><span class="n">Город обеспечен</span><span class="v">${sfCovered()}/6</span></div>
    <div class="row"><span class="n">Ходов осталось</span><span class="v">${S.rolls}</span></div>`,[{t:'Сыграть заново',v:1,cls:'ok'},{t:'Остаться',v:0,cls:'sec'}]);
  if(v===1){newGame();}
}
renderHubGoal=function(){
  const el=$('bHub');if(!el||!S)return;const cov=sfCovered(),have=new Set(myKiosks().map(t=>t.base));
  el.innerHTML=`${HUB_TICKET}<span class="hub-goal"><span class="hub-row"><b>${cov}<small>/6</small></b><span class="hub-place">+${Math.round((sfPriceMult()-1)*100)}% к ценам</span></span>
    <span class="sf-cats">${SF.cats.map(c=>`<i class="${have.has(c)?'on':''}" title="${SF.cat[c]}">${good(c).icon}</i>`).join('')}</span>
    <span class="hub-row hub-meta"><em>Город обеспечен</em></span></span>`;
  el.classList.add('hub-goal-chip');el.classList.remove('okc');
};
(function(){const base=render;render=function(){const r=base.apply(this,arguments);try{sfRenderTasks();sfProgress();sfLotBar();}catch(e){console.error(e);}return r;};})();
// Пустырь — место под точку: в строке нет цены, кнопка всегда «открыть»; зелёная, если хватает на самый дешёвый вариант.
function sfLotBar(){
  const t=S.tiles[S.pos],tb=$('tilebar');if(!tb||!sfIsLot(t)||moving||S.finished)return;
  const minPrice=Math.min(...t.opts.map(sfPrice)),can=S.cash>=minPrice;
  tb.hidden=false;tb.disabled=false;$('tbText').textContent='🏗 Пустырь · место под точку';
  tb.querySelector('b').textContent='открыть';tb.classList.toggle('off',!can);tb.classList.toggle('poor',!can);
}
// Сохранение из общего кода могло подставить пустырю базовый товар — снимаем.
(function(){const base=newGame;newGame=function(){const r=base.apply(this,arguments);S.tiles.forEach(t=>{if(sfIsLot(t))t.base=null;});return r;};})();
(function(){const base=load;load=function(){const r=base.apply(this,arguments);try{if(r&&S&&S.tiles)S.tiles.forEach(t=>{if(sfIsLot(t))t.base=null;});}catch(e){}return r;};})();
async function sfHub(){if(moving)return;const ts=sfTasks(),have=new Set(myKiosks().map(t=>t.base));
  await modal(`<h2>🌉 Благосостояние города</h2><p class="t">Город обеспечен ${sfCovered()}/6 категорий — все товары продаются на <b>+${Math.round((sfPriceMult()-1)*100)}%</b> дороже.</p>
    <div class="row"><span class="n">Есть</span><span class="v">${SF.cats.filter(c=>have.has(c)).map(c=>good(c).icon).join(' ')||'—'}</span></div>
    <div class="row"><span class="n">Городу не хватает</span><span class="v">${SF.cats.filter(c=>!have.has(c)).map(c=>SF.cat[c]).join(', ')||'ничего'}</span></div>
    <h2 style="margin-top:10px">Задачи</h2>${ts.map(q=>`<div class="row"><span class="n">${q.ok?'✓ ':''}${q.text(q.goal)}</span><span class="v">${q.v}/${q.goal}</span></div>`).join('')}`,[{t:'Ок',v:1,cls:'ok'}]);}
$('bHub').onclick=sfHub;
window.SFBuilder={mod:sfMod,covered:sfCovered,priceMult:sfPriceMult,price:sfPrice,tasks:sfTasks};
// Шапка (web/top-hud.js) берёт прогресс и задачи режима отсюда.
window.MapMode={
  progress(){const ts=sfTasks();return {name:'Сан-Франциско',value:sfCovered(),goal:6,percent:ts.reduce((a,q)=>a+q.v/q.goal,0)/ts.length*100,unit:'категорий'};},
  tasks:sfTasks,
  hubClick(){return sfHub();},
};
}
