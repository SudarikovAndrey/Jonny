// ===== Карточка точки или бизнеса вырастает из строки клетки и сворачивается в неё =====
// На экране всегда один элемент: пока карточка открыта, строки нет. Бумажная плашка
// растёт из прямоугольника строки до карточки с лёгким перелётом (0.86 → 1.04 → 1,
// навык cartoon-animation), текст строки гаснет, карточка проявляется. Закрытие — обратно.
// Кубик остаётся ярким и рабочим: тап сворачивает карточку и сразу бросает.
(function(){
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const isSheet=()=>/\b(print-property|illustrated-property|business-property)\b/.test($('card').className);
  const open=()=>document.body.classList.contains('tile-sheet');
  let plate=null;
  const box=el=>{const r=el.getBoundingClientRect();return {left:r.left,top:r.top,width:r.width,height:r.height};};
  const visible=el=>{if(!el||el.hidden)return false;const r=el.getBoundingClientRect();return r.width>40&&r.height>20;};
  const px=b=>({left:b.left+'px',top:b.top+'px',width:b.width+'px',height:b.height+'px'});
  const grow=(b,k)=>({left:b.left-b.width*k/2,top:b.top-b.height*k/2,width:b.width*(1+k),height:b.height*(1+k)});
  function dropPlate(){plate?.remove();plate=null;}
  function makePlate(from,withRow){
    dropPlate();plate=document.createElement('div');plate.className='tile-sheet-plate';plate.setAttribute('aria-hidden','true');
    if(withRow){const row=document.createElement('div');row.className='tile-sheet-row';row.innerHTML=$('tilebar').innerHTML;plate.append(row);}
    Object.assign(plate.style,px(from));document.body.append(plate);return plate;
  }
  // Кошелёк при открытой карточке точки: карточка начинается под строкой денег и кристаллов,
  // и та остаётся видна сквозь лёгкое затемнение (плейтест 01.10: игрок закрывал окно точки,
  // чтобы посмотреть, хватает ли денег).
  function showWallet(){
    const row=document.querySelector('#top .bar1');if(!row)return;
    const r=row.getBoundingClientRect();if(r.height<10)return;
    document.documentElement.style.setProperty('--sheet-top',Math.round(r.bottom+8)+'px');
  }
  function hideWallet(){document.documentElement.style.removeProperty('--sheet-top');}
  function enter(){
    const card=$('card'),bar=$('tilebar');
    document.body.classList.add('tile-sheet');showWallet();
    if(reduced.matches||CFG.SPEED>=100||!visible(bar)){bar.classList.add('tile-sheet-away');return;}
    const from=box(bar);bar.classList.add('tile-sheet-away');
    PaperMotion.stop(card);const to=box(card);
    const p=makePlate(from,true);card.style.opacity='0';
    const a=p.animate([{...px(from),borderRadius:'12px'},{...px(grow(to,.03)),borderRadius:'16px',offset:.72},{...px(to),borderRadius:'16px'}],
      {duration:240,easing:'cubic-bezier(.16,.78,.24,1)',fill:'forwards'});
    p.firstChild?.animate([{opacity:1},{opacity:0,offset:.35},{opacity:0}],{duration:240,fill:'forwards'});
    a.finished.then(()=>{
      if(plate!==p)return;
      card.style.opacity='';
      card.animate([{opacity:0},{opacity:1}],{duration:90,easing:'ease-out'});
      p.animate([{opacity:1},{opacity:0}],{duration:90,fill:'forwards'}).finished.then(()=>{if(plate===p)dropPlate();},()=>{});
    },()=>{});
  }
  function leave(){
    const card=$('card'),bar=$('tilebar');
    const done=()=>{document.body.classList.remove('tile-sheet');bar.classList.remove('tile-sheet-away');dropPlate();card.style.opacity='';hideWallet();};
    if(reduced.matches||CFG.SPEED>=100||bar.hidden){done();return;}
    const from=box(card);bar.classList.remove('tile-sheet-away');bar.style.visibility='hidden';
    const to=visible(bar)?box(bar):null;
    if(!to){bar.style.visibility='';done();return;}
    card.style.opacity='0';
    const p=makePlate(from,true);p.firstChild.style.opacity='0';
    const a=p.animate([{...px(from),borderRadius:'16px'},{...px(to),borderRadius:'12px'}],{duration:200,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
    p.firstChild.animate([{opacity:0},{opacity:0,offset:.55},{opacity:1}],{duration:200,fill:'forwards'});
    a.finished.then(()=>{if(plate!==p)return;bar.style.visibility='';done();},()=>{bar.style.visibility='';done();});
  }
  const baseCustom=openCustom;
  openCustom=function(...args){
    const fresh=$('modal').hidden||$('modal').classList.contains('closing');
    const res=baseCustom.apply(this,args);
    if(isSheet()&&(fresh||!open()))enter();
    else if(!isSheet()&&open()){document.body.classList.remove('tile-sheet');$('tilebar').classList.remove('tile-sheet-away');dropPlate();hideWallet();}
    return res;
  };
  const baseClose=closeModal;
  closeModal=function(...args){
    const was=open()&&!$('modal').hidden&&!$('modal').classList.contains('closing');
    const res=baseClose.apply(this,args);
    if(was)leave();
    return res;
  };
  // Подсказка Джонни бывает привязана к строке клетки. Строка ушла в карточку — подсказка
  // прячется, а фокус-размытие (coach-tip-open) оставалось на весь экран. Снимаем его вместе с ней.
  new MutationObserver(()=>{if($('tip').hidden)document.body.classList.remove('coach-tip-open');})
    .observe($('tip'),{attributes:true,attributeFilter:['hidden']});
  // Кубик поверх открытой карточки: сворачиваем её и бросаем тем же обычным нажатием.
  $('bRoll').addEventListener('click',e=>{
    if(!open()||$('modal').hidden)return;
    e.stopImmediatePropagation();e.preventDefault();
    closeModal();
    setTimeout(()=>{if($('modal').hidden&&!moving)$('bRoll').click();},170);
  },true);
})();
