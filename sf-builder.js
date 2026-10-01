// ===== Карта «Сан-Франциско» — режим стройки (?map=sf) =====
// Спек: черновики/америкэн-бой-сан-франциско.md. Решения продюсера 28.09.2026:
// отдельная карта после Бруклина; поставок нет; игрок сам выбирает, что строить
// на пустырях; лицензии открывают дорогие товары (v2, 30.09); благосостояние города,
// который растёт, когда город обеспечен разными товарами, и поднимает цены.
// Плотные полчаса: 120 ходов, без дней. Своё сохранение (americanboy_sf).
var SFMAP=new URLSearchParams(location.search).get('map')==='sf';
if(SFMAP){
document.body.classList.add('map-mode','sf-mode');
boardMap=()=>'sanfrancisco';setBoardMap=()=>{};
Object.assign(CFG,{START_CASH:600,REAL_DAYS:false,ROLLS_PER_DAY:120,BANK_DAY:1}); // плейтест 01.10: с $400 оборотки не было — $600 на 3–4 дешёвые точки с запасом // банк на углу 20 открыт с первого хода
CFG.KIOSK.showProfit=true;
// Пустырь — псевдотовар, чтобы строка точки и карточка не падали на good(null).
CFG.GOODS.push({id:'lot',name:'Пустырь',buy:1,sell:1,pts:0,zone:0,icon:'🏗'});
const SF={
  rolls:120,taskRolls:10,levelCap:5,payback:6,
  upPayback:10,upGrow:1.15,                                       // прокачка: +1 продажа окупается за 10 кругов, каждый уровень дороже на 15%
  // Своя экономика режима (30.09, третья проба: «денег не хватает ни на что»): доход только с продаж,
  // поэтому цены продажи выше бруклинских — маржа сладости $6, напитки $9, аудио $25, одежда $40, обувь $60, видео $120;
  // продаж на 1-м уровне 3 за круг. Ориентир: 4 дешёвые точки ≈ $100/круг к 5-му кругу, лицензия «Одежда» к 7–8-му.
  sell:{gum:8,cola:13,tape:35,jeans:65,sneak:120,vcr:270},
  cats:['gum','cola','jeans','sneak','tape','vcr'],               // порядок карточек в меню пустыря: от стартовых к лицензионным
  // v2 (30.09): соседства нет, на любом пустыре строится любая категория, на которую есть лицензия.
  // Лицензии покупаются прямо из меню пустыря, только за деньги, без условий.
  lic:[{id:'clothes',name:'Одежда и обувь',cats:['jeans','sneak'],price:600}, // плейтест 01.10: лицензии дешевле, чтобы не застревать на дешёвых точках
       {id:'tech',name:'Техника',cats:['tape','vcr'],price:1500}], // модель 01.10: за $2500 технику в партии на 100 раундов никто не брал
  lotPass:5,                                                      // монетка за проход по чужому пустырю — оборотка на старте (плейтест 01.10)
  techPoints:3,                                                   // финальная задача: точек техники
  // Цена стройки по категориям (30.09, после пробы: $25/$35 не делали разницы и на старт хватало на всё).
  // Лестница: сладости $50 · напитки $100 · одежда $400 · обувь $700 · аудио $250 · видео $1500.
  build:{gum:50,cola:100,jeans:300,sneak:500,tape:200,vcr:1200},
  prosp:.06,                                                      // +6% к ценам за каждую категорию, которой обеспечен город
  cat:{gum:'Сладости',cola:'Напитки',tape:'Аудио',jeans:'Одежда',sneak:'Обувь',vcr:'Видео'},
  gen:{gum:'сладостей',cola:'напитков',tape:'кассет',jeans:'джинсов',sneak:'кроссовок',vcr:'видиков'},
  formats:['Лоток','Ларёк','Киоск','Магазинчик'],
  biz:{3:'Канатный трамвай',8:'Рыбный причал',17:'Кофейня «Норт-Бич»',23:'Прачечная Чайнатауна',32:'Сёрф-прокат',37:'Пекарня «Сауэрдоу»'},
};
const SF_TASKS=[
  {id:'lvl',text:()=>'Лицензия «Одежда и обувь»',goal:1,val:()=>sfHasLic('clothes')?1:0},
  {id:'city',text:()=>'Лицензия «Техника»',goal:1,val:()=>sfHasLic('tech')?1:0},
  {id:'build',text:n=>`${n} точки техники`,goal:SF.techPoints,val:()=>myKiosks().filter(t=>!sfIsLot(t)&&SF.lic[1].cats.includes(t.base)).length},
];
function sfLicOf(cat){return SF.lic.find(l=>l.cats.includes(cat))||null;}
function sfHasLic(id){return !!(S.sf&&S.sf.lic&&S.sf.lic[id]);}
function sfCatOpen(cat){const l=sfLicOf(cat);return !l||sfHasLic(l.id);}
function sfBuyLicense(l){
  if(sfHasLic(l.id)||S.cash<l.price)return false;
  S.sf.lic=S.sf.lic||{};S.cash-=l.price;S.sf.lic[l.id]=true;
  track('sf_license',{id:l.id,price:l.price});fly('💵',AT.cash(),AT.card(),flyN(l.price));
  toast(`📜 Лицензия «${l.name}» куплена — строй ${l.cats.map(c=>SF.cat[c].toLowerCase()).join(' и ')}`,3200);
  log(`📜 Купил лицензию «${l.name}» за $${l.price}.`);save();render();return true;
}
CFG.BIZ_NAMES=SF.biz;
const sfBase=G=>3+(G-1);                                          // продажи за круг по уровню: 3 на 1-м, +1 за уровень
function sfSell(cat){return SF.sell[cat]||good(cat).sell;}
function sfMargin(cat){return Math.max(1,sfSell(cat)-good(cat).buy);}
// Дефицит земли вместо дефицита денег (модель 01.10): каждая своя точка делает следующую стройку дороже на 20%.
SF.landGrow=0.20;SF.rebuildShare=0.5;
function sfBasePrice(cat){return SF.build[cat]||Math.max(20,Math.round(sfBase(1)*sfMargin(cat)*SF.payback/5)*5);}
// buildTiles() зовёт sfPrice до того, как S создано (новая партия без сохранения) — тогда своих точек ноль.
function sfPrice(cat){const n=(typeof S!=='undefined'&&S&&S.tiles)?myKiosks().filter(t=>!sfIsLot(t)).length:0;return Math.round(sfBasePrice(cat)*(1+SF.landGrow*n)/5)*5;}
function sfRebuildPrice(cat){return Math.round(sfPrice(cat)*SF.rebuildShare/5)*5;}

// Поле: пустыри вместо готовых точек. Служебные клетки как в Бруклине (углы: старт, бандит, банк, копилка на 25), «Шанса» нет.
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
    else if(i===20){o.type='bank';o.zone=-1;} // угол — банк, как в Бруклине (решение 30.09)
    else if(i===25){o.type='pot';o.zone=-1;}
    else if(i===35){o.type='scatter';o.zone=-1;}
    else if(biz.has(i)){o.type='biz';o.price=r10(150,250);o.price0=o.price;}
    else{k++;o.good='lot';o.base=null;o.lot=true;o.price=sfPrice('gum');o.price0=o.price;}
    t.push(o);
  }
  return t;
};

// v2: соседства нет (правило не читалось игроком — решение 30.09). sfMod оставлен как 1 для совместимости.
function sfMod(){return 1;}
function sfCovered(){return new Set(myKiosks().filter(t=>!sfIsLot(t)).map(t=>t.base).filter(Boolean)).size;}
function sfPriceMult(){return 1+SF.prosp*sfCovered();}

// ---- Лестница точки (как на карте 1) с поправкой соседства на продажи ----
sales=function(t){return salesBoost(sfBase(t.salesLvl));};
cap=function(t){return 4*sfBase(t.salesLvl);};
salesCost=function(t){const m=sfMargin(t.base||t.good);return Math.max(20,Math.round(m*SF.upPayback*Math.pow(SF.upGrow,t.salesLvl-1)/5)*5);};
kioskLvl=t=>t.salesLvl;
kioskMaxLvl=()=>SF.levelCap;
kioskNextStat=t=>t.salesLvl<SF.levelCap?'sales':null;
kioskUpCost=t=>kioskNextStat(t)?salesCost(t):0;
kioskAfter=t=>kioskNextStat(t)?{cap:4*sfBase(t.salesLvl+1),sales:salesBoost(sfBase(t.salesLvl+1))}:null;
kioskLevelsNormalize=function(){if(!S||!S.tiles)return;for(const t of S.tiles)if(t.type==='kiosk'&&t.owner)t.capLvl=t.salesLvl;};
function sfIsLot(t){return !!t&&t.type==='kiosk'&&!t.owner&&(t.lot||t.good==='lot');}
pointName=function(t){if(sfIsLot(t)||!t.base)return 'Пустырь';const f=SF.formats[Math.min(SF.formats.length-1,Math.floor((t.salesLvl-1)/2))];return `${f} ${SF.gen[t.base]||''}`.trim();};
evolveState=()=>'max';
// Благосостояние: чем больше категорий у города, тем дороже всё продаётся.
(function(){const base=sellPrice;sellPrice=function(g){const p=SF.sell[g]?base.apply(this,arguments)*SF.sell[g]/good(g).sell:base.apply(this,arguments);return Math.round(p*sfPriceMult());};})();

// ---- Меню стройки на пустыре: три варианта, каждый с последствиями ----
(function(){const base=kioskWindow;kioskWindow=async function(t){
  if(sfIsLot(t))return sfBuildMenu(t);
  return base.apply(this,arguments);
};})();
// Плашка соседства: «соседи +20% 🍬🥤». Соседи есть, а итог 0% (штраф и бонус погасили друг
// друга) — всё равно показываем их, иначе читается как «соседей нет».
// ---- Меню пустыря v2: шесть категорий, закрытые — с замком и покупкой лицензии на месте ----
async function sfBuildMenu(t,opts={}){
  const rebuild=!!opts.rebuild,priceOf=rebuild?sfRebuildPrice:sfPrice;
  track('window',{w:rebuild?'rebuild':'lot',tile:t.i,cash:S.cash});
  // Открытые категории — карточки точек. Закрытые категориями не показываем: лицензия — это
  // документ, а не точка (решение продюсера 30.09), и на нём написано, что она открывает.
  const rows=SF.cats.map((cat,i)=>{if(!sfCatOpen(cat)||(rebuild&&cat===t.base))return '';const g=good(cat),p=priceOf(cat),profit=sfBase(1)*Math.round(sfMargin(cat)*sfPriceMult()),fill=cap({salesLvl:1})*buyPrice(cat);
    const poor=S.cash<p,art=window.PropertyArt?PropertyArt.point(cat,1):`assets/points/pt_${cat}_1.webp`;
    // Правило продюсера: на кнопке — целевое действие и полная цена; можно ли — говорит цвет (зелёная/серая).
    const price=`<small>Построить</small><span><i class="cash-glyph"></i>${p}</span>`;
    return `<div role="button" tabindex="${poor?-1:0}" class="sf-opt ${poor?'poor':''}" data-i="${i}" data-cat="${cat}" ${poor?'aria-disabled="true"':''} aria-label="${SF.formats[0]} ${SF.gen[cat]}, $${p}">
      <span class="sf-art"><img src="${art}" alt="" decoding="async"></span>
      <span class="sf-info"><b>${SF.formats[0]} ${SF.gen[cat]||g.name}</b><small class="sf-cat">${SF.cat[cat]}</small>
        <span class="sf-stats"><span>≈ <i class="cash-glyph"></i>${profit}<em>за круг</em></span><span>запас <i class="cash-glyph"></i>${fill}</span><span>стройка <i class="cash-glyph"></i>${p}</span></span></span>
      <span class="sf-price">${price}</span></div>`;}).join('');
  // Документы-лицензии: одна карточка на лицензию, с перечнем товаров, которые она открывает.
  const docs=SF.lic.filter(l=>!sfHasLic(l.id)).map(l=>{const poor=S.cash<l.price;
    return `<div role="button" tabindex="${poor?-1:0}" class="sf-lic-doc ${poor?'poor':''}" data-lic="${l.id}" ${poor?'aria-disabled="true"':''} aria-label="Лицензия «${l.name}», $${l.price}">
      <span class="sf-doc-head"><img class="sf-doc-art" src="assets/ui/license_${l.id}.webp" alt="" decoding="async" onerror="this.remove()"><i class="sf-doc-seal" aria-hidden="true"></i><b>Лицензия «${l.name}»</b></span>
      <span class="sf-doc-body">Открывает: ${l.cats.map(c=>`<span class="sf-doc-good"><img class="sf-gi" src="assets/goods/${c}.webp" alt="">${SF.cat[c]}</span>`).join(' ')}</span>
      <span class="sf-doc-buy"><span class="sf-lic-name">Купить лицензию</span><span class="sf-lic-cost"><i class="cash-glyph"></i>${l.price}</span></span></div>`;}).join('');
  const licBlock=docs?`<div class="sf-lics"><p class="sf-lics-title">Лицензии мэрии</p>${docs}</div>`:'';
  $('card').classList.add('sf-build');
  const btns=SF.cats.map((cat,i)=>({t:`${good(cat).icon} $${priceOf(cat)}`,v:i,cls:'ok',dis:!sfCatOpen(cat)||S.cash<priceOf(cat)||(rebuild&&cat===t.base)})).concat([{t:'Позже',v:-1,cls:'sec'}]);
  const head=rebuild?`<h2>🏗 Перестроить <small>${pointName(t)} · клетка ${t.i}</small></h2><p class="t sf-lead">Снести и построить другое за полцены. Товар вернётся по закупочной, уровень начнётся заново.</p>`:`<h2>🏗 Пустырь <small>клетка ${t.i}</small></h2><p class="t sf-lead">Что построить?${docs?' Дорогие товары открывает лицензия — её продаёт мэрия прямо здесь.':''}</p>`;
  const pending=modal(`${head}<div class="sf-opts">${rows}</div>${licBlock}`,btns);
  $('card').querySelectorAll('.sf-opt').forEach(o=>{
    const pick=()=>{const b=$('card').querySelector(`.mbtns button[data-i="${o.dataset.i}"]`);if(b&&!b.disabled)b.click();};
    o.onclick=pick;o.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick();}};});
  $('card').querySelectorAll('.sf-lic-doc').forEach(o=>{
    const pick=()=>{const l=SF.lic.find(x=>x.id===o.dataset.lic);if(!l||S.cash<l.price){toast(`Лицензия «${l?l.name:''}» стоит $${l?l.price:0} — не хватает`);return;}
      closeModal(-2);setTimeout(()=>{if(sfBuyLicense(l))sfBuildMenu(t,opts);},200);};
    o.onclick=pick;o.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick();}};});
  const v=await pending;
  if(v===undefined||v<0)return;
  const cat=SF.cats[v],p=priceOf(cat);if(!sfCatOpen(cat)||S.cash<p)return;
  if(rebuild){const refund=(t.goods||0)*buyPrice(t.good);if(refund>0){S.cash+=refund;log(`🏗 Снёс ${pointName(t)}: товар вернулся по закупочной, $${refund}.`);}track('sf_rebuild',{tile:t.i,from:t.base,cat,price:p,refund});}
  else track('sf_build',{tile:t.i,cat,price:p});
  fly('💵',AT.cash(),AT.tile(t.i),flyN(p));S.cash-=p;
  t.owner='you';t.good=cat;t.base=cat;t.lot=false;t.price=p;t.price0=p;t.capLvl=1;t.salesLvl=1;t.goods=0;t.tier=1;t.insp=false;
  if(!rebuild){S.stat.bought++;S.dstat.bought++;qProg('buy',1);}
  const cov=sfCovered();
  toast(`🏗 ${pointName(t)} построен${cov>(S.sf.covered||0)?` · город обеспечен: ${cov}/6, цены +${Math.round(SF.prosp*cov*100)}%`:''}`,3000);
  S.sf.covered=cov;
  log(`🏗 Построил ${pointName(t)} на клетке ${t.i} за $${p}.`);
  save();render();
}

// ---- Проход по пустырю даёт монетку: деньги на старте капают даже без точек ----
(function(){const base=step;step=async function(from,to){const r=await base.apply(this,arguments);
  try{const t=S.tiles[to];if(sfIsLot(t)&&SF.lotPass>0){S.cash+=SF.lotPass;S.stat.earned+=SF.lotPass;S.dstat.earned+=SF.lotPass;float(t.i,'+$'+SF.lotPass,'#9aa3b8');}}catch(e){}
  return r;};})();
// ---- Банк: первый кредит без срока — точки не отнимут, но новый не дадут, пока не вернёшь ----
new MutationObserver(()=>{const card=$('card');if(!card||card.hidden)return;const h=card.querySelector('h2');if(!h||!/Chase/.test(h.textContent))return;
  card.querySelectorAll('.row').forEach(r=>{const n=r.querySelector('.n');if(!n||r.dataset.sfBank)return;
    if(/заберут/.test(n.textContent)){r.dataset.sfBank='1';n.textContent='Точки не отнимут';const v=r.querySelector('.v');if(v)v.textContent='кредит без срока';}});
}).observe($('card'),{childList:true,subtree:true});

// ---- Окно лицензий мэрии: из карточки своей точки и из шапки (земля застроена — лицензия всё равно доступна) ----
async function sfLicenseMenu(){
  const docs=SF.lic.map(l=>{const has=sfHasLic(l.id),poor=!has&&S.cash<l.price;
    return `<div role="button" tabindex="${has||poor?-1:0}" class="sf-lic-doc ${poor?'poor':''} ${has?'owned':''}" data-lic="${has?'':l.id}" aria-label="Лицензия «${l.name}», $${l.price}">
      <span class="sf-doc-head"><img class="sf-doc-art" src="assets/ui/license_${l.id}.webp" alt="" decoding="async" onerror="this.remove()"><i class="sf-doc-seal" aria-hidden="true"></i><b>Лицензия «${l.name}»</b></span>
      <span class="sf-doc-body">Открывает: ${l.cats.map(c=>`<span class="sf-doc-good"><img class="sf-gi" src="assets/goods/${c}.webp" alt="">${SF.cat[c]}</span>`).join(' ')}</span>
      <span class="sf-doc-buy">${has?'<span class="sf-lic-name">Куплена</span>':`<span class="sf-lic-name">Купить лицензию</span><span class="sf-lic-cost"><i class="cash-glyph"></i>${l.price}</span>`}</span></div>`;}).join('');
  const pending=modal(`<h2>📜 Мэрия <small>лицензии</small></h2><p class="t sf-lead">Лицензия открывает категорию товара на любом пустыре и при перестройке своей точки.</p><div class="sf-lics">${docs}</div>`,[{t:'Закрыть',v:-1,cls:'sec'}]);
  $('card').querySelectorAll('.sf-lic-doc[data-lic]').forEach(o=>{if(!o.dataset.lic)return;const pick=()=>{const l=SF.lic.find(x=>x.id===o.dataset.lic);if(!l||S.cash<l.price){toast(`Лицензия «${l?l.name:''}» стоит $${l?l.price:0} — не хватает`);return;}
      closeModal(-2);setTimeout(()=>{if(sfBuyLicense(l))sfLicenseMenu();},200);};o.onclick=pick;o.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick();}};});
  await pending;
}

// ---- Карточка построенной точки: строка соседства и городской надбавки ----
function sfCardNote(){
  const card=$('card'),t=S&&S.tiles[S.pos];
  if(!card||card.hidden||!t||t.type!=='kiosk'||!t.owner||!t.base||card.querySelector('.sf-note'))return;
  // Только карточка точки (.property-body / .srow), не итоговое окно и не другие модалки.
  if(!card.querySelector('.property-body')&&!card.querySelector('.srow'))return;
  const anchor=card.querySelector('.srow');if(!anchor)return;
  const n=document.createElement('p');n.className='sf-note';
  n.innerHTML=`<span class="sf-chip city">Город +${Math.round((sfPriceMult()-1)*100)}% <small>к ценам</small></span><span class="sf-actions"><button type="button" class="sec sf-lic-btn">📜 Лицензии</button><button type="button" class="sec sf-rebuild-btn">🏗 Перестроить</button></span>`;
  n.querySelector('.sf-lic-btn').onclick=()=>{closeModal();setTimeout(sfLicenseMenu,160);};
  n.querySelector('.sf-rebuild-btn').onclick=()=>{if(S.pos!==t.i)return;closeModal();setTimeout(()=>sfBuildMenu(t,{rebuild:true}),160);};
  anchor.after(n);
}
new MutationObserver(()=>sfCardNote()).observe($('card'),{childList:true,subtree:true});

// ---- Новая партия и вступление ----
const sfBaseNew=newGame;
newGame=function(){const r=sfBaseNew.apply(this,arguments);
  S.firstRoute={variant:0,index:0,done:true};S.training={shipped:true,explained:true,skipped:true};S.starter.closed=true;
  S.q=[];S.rolls=SF.rolls;S.opened=[true,true,true];S.sf={done:{},ended:false,covered:0,lic:{}};S.tips.intro=true;S.tips.shipHot=true; // поставок в режиме нет — совет «пора отправлять фуру» не нужен
  log('Джонни в Сан-Франциско. В кармане $'+S.cash+'. Пустыри ждут — строй, что хочешь.');save();render();return r;};
intro=async function(){await modal(`<h2>🌉 Сан-Франциско</h2><p class="t">Город на холмах. Здесь Джонни не покупает готовое — он строит.</p>
  <p>На любом пустыре строится что угодно — если есть лицензия. Начинаешь со сладостей и напитков. <b>Лицензии на одежду и технику покупаются прямо в меню пустыря.</b></p>
  <p>Город богатеет, когда обеспечен всем: каждая новая категория товара поднимает цены на всё.</p>
  <p><b>Задачи:</b> лицензия «Одежда и обувь» ($${SF.lic[0].price}) · лицензия «Техника» ($${SF.lic[1].price}) · ${SF.techPoints} точки техники. Ходов — ${SF.rolls}.</p>`,[{t:'Строим',v:1,cls:'ok'}]);};

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
    <div class="row"><span class="n">Точек</span><span class="v">${myKiosks().length}</span></div><div class="row"><span class="n">Лицензии</span><span class="v">${SF.lic.filter(l=>sfHasLic(l.id)).map(l=>l.name).join(', ')||'—'}</span></div><div class="row"><span class="n">Город обеспечен</span><span class="v">${sfCovered()}/6</span></div>
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
  const minPrice=Math.min(...SF.cats.filter(sfCatOpen).map(sfPrice)),can=S.cash>=minPrice;
  tb.hidden=false;tb.disabled=false;$('tbText').textContent='🏗 Пустырь · место под точку';
  tb.querySelector('b').textContent='открыть';tb.classList.toggle('off',!can);tb.classList.toggle('poor',!can);
}
// Сохранение из общего кода могло подставить пустырю базовый товар — снимаем.
(function(){const base=newGame;newGame=function(){const r=base.apply(this,arguments);S.tiles.forEach(t=>{if(sfIsLot(t))t.base=null;});return r;};})();
(function(){const base=load;load=function(){const r=base.apply(this,arguments);try{if(r&&S&&S.tiles){S.tiles.forEach(t=>{if(sfIsLot(t))t.base=null;});S.sf=S.sf||{done:{},ended:false,covered:0};S.sf.lic=S.sf.lic||{};S.tips=S.tips||{};S.tips.shipHot=true;}}catch(e){}return r;};})();
async function sfHub(){if(moving)return;const ts=sfTasks(),have=new Set(myKiosks().map(t=>t.base));
  await modal(`<h2>🌉 Благосостояние города</h2><p class="t">Город обеспечен ${sfCovered()}/6 категорий — все товары продаются на <b>+${Math.round((sfPriceMult()-1)*100)}%</b> дороже.</p>
    <div class="row"><span class="n">Есть</span><span class="v">${SF.cats.filter(c=>have.has(c)).map(c=>good(c).icon).join(' ')||'—'}</span></div>
    <div class="row"><span class="n">Городу не хватает</span><span class="v">${SF.cats.filter(c=>!have.has(c)).map(c=>SF.cat[c]).join(', ')||'ничего'}</span></div>
    <h2 style="margin-top:10px">Задачи</h2>${ts.map(q=>`<div class="row"><span class="n">${q.ok?'✓ ':''}${q.text(q.goal)}</span><span class="v">${q.v}/${q.goal}</span></div>`).join('')}`,[{t:'📜 Лицензии мэрии',v:2,cls:'ok'},{t:'Ок',v:1,cls:'sec'}]).then(v=>{if(v===2)setTimeout(sfLicenseMenu,160);});}
$('bHub').onclick=sfHub;
window.SFBuilder={covered:sfCovered,priceMult:sfPriceMult,prosp:SF.prosp,sell:SF.sell,build:SF.build,price:sfPrice,basePrice:sfBasePrice,rebuildPrice:sfRebuildPrice,landGrow:SF.landGrow,licenseMenu:sfLicenseMenu,tasks:sfTasks,licenses:SF.lic,hasLic:sfHasLic,buyLicense:sfBuyLicense}; // prosp — надбавка к ценам за категорию; её читает мультиплеер (web/mp.js)
// Шапка (web/top-hud.js) берёт прогресс и задачи режима отсюда.
window.MapMode={
  progress(){const ts=sfTasks();return {name:'Сан-Франциско',value:sfCovered(),goal:6,percent:ts.reduce((a,q)=>a+q.v/q.goal,0)/ts.length*100,unit:'категорий'};},
  tasks:sfTasks,
  hubClick(){return sfHub();},
};
}
