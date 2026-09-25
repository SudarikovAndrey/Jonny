// Sprite windows use the supplied atlas as artwork. All game text remains live DOM.
function atlasArt(x,y,w,h,cls='',file='modal-atlas.png',sw=1536,sh=1024){
  return `<svg class="atlas-art ${cls}" viewBox="${x} ${y} ${w} ${h}" preserveAspectRatio="${cls==='property-illustration'?'xMidYMid slice':'xMidYMid meet'}" aria-hidden="true"><image href="assets/${file}" width="${sw}" height="${sh}"/></svg>`;
}
function paperSurface(el){
  if(!el)return;
  el.classList.add('sheet-surface');
  el.querySelector(':scope > .sheet-paper')?.remove();
}
function paintedClose(button){
  if(!button||button.dataset.painted)return;
  button.dataset.painted='1';button.classList.add('painted-close');button.setAttribute('aria-label','Закрыть');
  button.innerHTML=atlasArt(1252,21,69,64).replace('xMidYMid meet','xMidYMid slice');
}
function upgradeIcons(root){
  root.querySelectorAll('.up').forEach(up=>{
    const ic=up.querySelector('.uic');if(!ic||ic.dataset.painted)return;
    ic.dataset.painted='1';const lab=up.querySelector('.lab')?.textContent||'';
    ic.innerHTML=lab.includes('Вместимость')?atlasArt(929,706,89,80,'','interface-atlas.png'):lab.includes('Продажи')?atlasArt(623,700,80,80,'','interface-atlas.png'):atlasArt(1435,541,88,83,'round-art');
  });
}
function shopFrame(t,inner){
  track('window',{w:t.type==='biz'?'biz':'point',tile:t.i,owner:!!t.owner});
  const isPoint=t.type==='kiosk',g=isPoint?good(t.good):null,title=isPoint?pointName(t):bizName(t);
  const path=isPoint?`img/pt_${t.base||'gum'}_${t.tier||1}.webp`:`img/biz_${t.i}.webp`;
  // Вырезка из атласа — только для Soda Cart; у Beer & Wine и Champagne Bar свои баннеры.
  const illustration=isPoint&&t.base==='cola'&&(t.tier||1)===1?atlasArt(443,63,374,241,'property-illustration'):
    `<img class="property-illustration" src="${path}" alt="${title}">`;
  $('modal').classList.add('mid');$('card').className='card bare illustrated-property';
  $('card').innerHTML=`<div class="shop"><header class="property-title"><span class="property-mark">${g?g.icon:bizIcon(t)}</span><h2>${title}</h2></header><div class="property-picture">${illustration}</div>${inner}</div><button class="xclose" id="xNo" aria-label="Закрыть"></button>`;
  $('xNo').onclick=()=>closeModal();paperSurface($('card').querySelector('.shop'));paintedClose($('xNo'));upgradeIcons($('card'));fitCard();
}
// Readable scrolling replaces automatic shrinking between the top and bottom HUD.
// Деньги показываются одним знаком во всём интерфейсе: в шапке это пачка купюр,
// значит и в значениях окон тоже она, а не текстовый $. Рубль за реальные
// покупки остаётся текстом — это действительно другая валюта.
function cashGlyphCard(){ const c=$('card'); if(c) cashGlyph(c); }
function fitCard(){
  cashGlyphCard();
  if(typeof goodsIcons==='function') goodsIcons($('card'));
  $('card').style.setProperty('--cs','1');
}
// Atlas viewports keep the supplied bitmap intact; labels and controls stay accessible.
function windowScene(kind){
  // The shipping illustration is a clean crop from the supplied scene atlas.
  // Rendering it as a plain image avoids SVG atlas overflow leaking the
  // neighbouring interface panels into the card header.
  if(kind==='shipping'){
    return `<div class="window-scene shipping-scene" aria-hidden="true"><img class="shipping-scene-image" src="assets/shipping-scene-clean.png" alt=""></div>`;
  }
  const region=[38,73,408,150];
  return `<div class="window-scene ${kind}-scene" aria-hidden="true">${atlasArt(...region,'','windows-scenes.png')}</div>`;
}
function enamelButton(button){
  if(button.querySelector('.enamel-skin'))return;
  const color=button.classList.contains('bad')?'red':button.classList.contains('ok')?'green':button.classList.contains('sec')||button.classList.contains('hard')?'blue':'dark';
  const regions={green:[29,708,229,58],red:[275,707,229,60],blue:[524,708,190,60],dark:[730,707,181,61]};
  button.classList.add('enamel-button');
  button.insertAdjacentHTML('afterbegin',`<span class="enamel-skin">${atlasArt(...regions[color],'','windows-kit.png').replace('xMidYMid meet','none')}</span>`);
  button.dataset.enamel=color;
  cashGlyph(button);
}
// Игровые деньги везде показаны монетами (как на поле), а не знаком доллара.
// Ставим ту же иконку рядом с ценой. Рубли за реальные покупки не трогаем.
function cashGlyph(root){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const hits=[];
  while(walker.nextNode()){
    const node=walker.currentNode;
    if(node.parentElement.closest('.enamel-skin'))continue;
    if(node.nodeValue.includes('$')||node.nodeValue.includes('💵'))hits.push(node);
  }
  for(const node of hits){
    // Эмодзи купюр из прототипа тоже становится монетой: «💵 $120» — одна
    // монета перед суммой, одиночное «💵» — просто монета.
    const text=node.nodeValue.replace(/💵\s?(?=\$)/g,'').replace(/💵/g,'$');
    const parts=text.split('$');
    const frag=document.createDocumentFragment();
    frag.append(parts[0]);
    for(let i=1;i<parts.length;i++){
      const ic=document.createElement('i');
      ic.className='cash-glyph';ic.setAttribute('aria-hidden','true');
      frag.append(ic,parts[i]);
    }
    node.replaceWith(frag);
  }
}
function windowClose(card,action){
  if(card.querySelector('.window-close'))return;
  const button=document.createElement('button');button.className='window-close';button.onclick=action;
  card.append(button);paintedClose(button);
}
function decorateSettings(card){
  if(!card.querySelector('#iRolls')||card.querySelector('.settings-title'))return;
  card.classList.add('settings-card');
  const title=card.querySelector('h2');title.classList.add('settings-title');title.textContent='Настройки';
  title.insertAdjacentHTML('afterbegin',`<span class="settings-gear">${atlasArt(1332,584,59,59,'round-art','windows-kit.png')}</span>`);
  windowClose(card,()=>$('cClose').click());
  for(const [id,label,min,step] of [['iRolls','Ходов в день',1,1],['iCash','Денег на старте',0,50],['iSlots','Мест в фуре',1,1],['iStart','Начать с дня',1,1]]){
    const input=$(id);input.setAttribute('aria-label',label);input.min=String(min);input.step=String(step);
    const group=document.createElement('div');group.className='settings-stepper';input.before(group);group.append(input);
    for(const delta of [-1,1]){
      const b=document.createElement('button');b.type='button';b.textContent=delta>0?'+':'−';b.setAttribute('aria-label',`${delta>0?'Увеличить':'Уменьшить'}: ${label.toLowerCase()}`);
      b.onclick=()=>{const value=(Number(input.value)||min)+delta*step;input.value=String(Math.max(min,Math.min(input.max?Number(input.max):Infinity,value)));input.dispatchEvent(new Event('input',{bubbles:true}));};
      if(delta<0)group.prepend(b);else group.append(b);
    }
  }
}
function decorateParcel(card){
  if(!card.querySelector('#mSend')||card.querySelector('.cargo-scroll')||card.querySelector('.pc-head'))return;
  card.classList.add('shipping-window');
  const title=card.querySelector('h2');
  const head=document.createElement('header');head.className='cargo-head';head.append(title);
  const body=document.createElement('div');body.className='cargo-scroll';
  body.insertAdjacentHTML('afterbegin',windowScene('shipping'));
  const actions=card.querySelector('.parcel-actions');
  const last=actions.nextElementSibling;
  const foot=document.createElement('footer');foot.className='cargo-foot';foot.append(actions);
  if(last)foot.append(last);
  for(const node of [...card.childNodes])body.append(node);
  card.replaceChildren(head,body,foot);
  windowClose(card,()=>$('mNo').click());
  card.querySelectorAll('.slot').forEach((slot,i)=>slot.setAttribute('aria-label',`Место ${i+1}: ${slot.classList.contains('f')?'занято':'пусто'}`));
}
function decorateHelp(){
  const body=$('helpBody');
  if(body.querySelector('.help-steps')&&!body.querySelector('.help-scene'))body.insertAdjacentHTML('afterbegin',windowScene('help'));
  body.querySelectorAll('.help-action').forEach(enamelButton);
}
function decorateWindows(){
  const card=$('card');
  card.classList.toggle('settings-card',!!card.querySelector('#iRolls'));
  card.classList.toggle('shipping-window',!!card.querySelector('#mSend')&&!card.querySelector('.pc-head'));
  card.classList.toggle('warehouse-card',!!card.querySelector('#wNo'));
  decorateWarehouse(card);decorateSettings(card);decorateParcel(card);decorateEvent(card);
  if(!card.classList.contains('bare')&&!card.classList.contains('battlepass-card')&&!card.classList.contains('event-card'))paperSurface(card);
  else card.querySelectorAll('.shop').forEach(paperSurface);
  card.querySelectorAll('.xclose,.xhead').forEach(paintedClose);
  upgradeIcons(card);
  paperSurface($('helpDialog'));paintedClose($('helpClose'));
  decorateHelp();
  if(!card.classList.contains('battlepass-card')){
    card.querySelectorAll('button:not(.painted-close):not(.qm):not(.training-good):not(.tab):not(.pc-step)').forEach(enamelButton);
  }
  // Reuse the character vignette for feedback, without introducing a blocking popup.
  const toast=$('toast');
  if(!toast.querySelector('.ttxt')){
    const text=document.createElement('span');text.className='ttxt';
    for(const node of [...toast.childNodes])if(node.nodeType===Node.TEXT_NODE)text.append(node);
    toast.append(text);
  }
  if(!toast.querySelector('.feedback-sun'))toast.insertAdjacentHTML('afterbegin',`<span class="feedback-sun">${atlasArt(1194,39,122,119,'','windows-kit.png')}</span>`);
}
let windowPaintPending=false;
new MutationObserver(()=>{
  if(windowPaintPending)return;windowPaintPending=true;
  requestAnimationFrame(()=>{windowPaintPending=false;decorateWindows();});
}).observe($('card'),{childList:true,subtree:true});
new MutationObserver(()=>{if(!$('toast').querySelector('.feedback-sun'))decorateWindows();}).observe($('toast'),{childList:true});
new MutationObserver(decorateHelp).observe($('helpBody'),{childList:true});
decorateWindows();

// ===== Событийные окна в стиле баттлпасса =====
// Обычные окна modal() прототипа (копилка, шанс, полиция, итоги дня и т. д.)
// получают общий каркас: кремовая шапка со значком-жетоном и шильдой,
// небо с городом, содержимое на бумажной плашке, подвал с кнопками.
// Эмодзи из заголовка заменяется иконкой кита или знаком клетки.
// var, а не const: decorateWindows() вызывается выше по файлу, до этих строк.
var EVENT_BADGES = [
  [/Копилка/, 'board/assets/symbols/piggy.svg'], [/Шанс/, 'board/assets/symbols/chance.svg'],
  [/NYPD|Участок/, 'board/assets/symbols/police.svg'], [/Chase|коллектор|Банк/, 'assets/icons/soft.png'],
  [/Не хватает/, 'assets/icons/soft.png'], [/Ходы (кончились|вышли)/, 'assets/icons/die.png'],
  [/Итоги дня|День \d+ из/, 'assets/icons/calendar.png'], [/Задания/, 'assets/icons/crown.png'],
  [/Бандл|груза/, 'assets/icons/crate.png'], [/Yellow Cab|Такси/, 'assets/icons/taxi.png'],
  [/Сегодня|День \d/, 'assets/icons/clock.png'], [/Джонни/, 'assets/icons/cap.png', 'full'],
  [/Рывок|Билет|Смена|Легенда/, 'assets/icons/crown.png'], [/Кто играет/, 'assets/icons/cap.png', 'full'], [/Магазин/, 'assets/icons/shop.png'],
];
var EVENT_SKIP = ['pc-card','training-card','warehouse-card','shipping-window','settings-card','battlepass-card','hub-card','illustrated-property','bare'];
function decorateEvent(card){
  if(!EVENT_SKIP)return;
  if(EVENT_SKIP.some(c=>card.classList.contains(c)))return;
  let h2=card.querySelector(':scope>h2');
  const btns=card.querySelector(':scope>.mbtns');
  if(!btns||card.querySelector(':scope>.ev-head'))return;
  // Окна закрытого района начинаются не с заголовка, а со строки «🔒 Район».
  const lockLine=!h2&&card.querySelector(':scope>p.dim:first-child');
  if(lockLine&&/🔒/.test(lockLine.textContent)){
    h2=document.createElement('h2'); h2.textContent=lockLine.textContent.replace(/🔒\s*/,'');
    h2.dataset.badge='assets/bp/bp-lock.png'; lockLine.replaceWith(h2);
  }
  if(!h2)return;
  card.classList.add('event-card');
  const title=h2.textContent;
  const hit=h2.dataset.badge?[null,h2.dataset.badge]:EVENT_BADGES.find(([re])=>re.test(title));
  // Монета, в которую уже превратилась купюра из заголовка, и кнопка «?» —
  // не часть шильды: монету убираем, «?» переносим в шапку справа.
  while(h2.firstChild&&(h2.firstChild.nodeType===Node.ELEMENT_NODE?h2.firstChild.classList.contains('cash-glyph'):!h2.firstChild.nodeValue.trim()))h2.firstChild.remove();
  const help=h2.querySelector('.qm'); if(help)help.remove();
  // Эмодзи в начале заголовка убираем: его место занимает значок.
  const first=h2.firstChild;
  if(first&&first.nodeType===Node.TEXT_NODE)first.nodeValue=first.nodeValue.replace(/^[\p{Extended_Pictographic}️‍\s]+/u,'');
  h2.classList.add('ev-title');
  const small=h2.querySelector('small'); if(small){small.remove();}
  const head=document.createElement('header'); head.className='ev-head';
  head.innerHTML=`<span class="ev-badge${hit&&hit[2]?' ev-badge-'+hit[2]:''}">${hit?`<img src="${hit[1]}" alt="">`:''}</span><div class="ev-titles"></div>`;
  head.querySelector('.ev-titles').append(h2); if(small){small.className='ev-sub';head.querySelector('.ev-titles').append(small);}
  if(help){help.classList.add('ev-help');head.append(help);}
  const body=document.createElement('div'); body.className='ev-body';
  const plate=document.createElement('div'); plate.className='ev-plate';
  for(const node of [...card.childNodes]) if(node!==btns&&node!==head) plate.append(node);
  const prize=plate.querySelector('.ev-prize'); if(prize) body.append(prize);
  if(plate.textContent.trim()||plate.children.length) body.append(plate);
  const foot=document.createElement('footer'); foot.className='ev-foot'; foot.append(btns);
  card.replaceChildren(head,body,foot);
}
