// Costco presentation reuses the prototype's purchase, hold, allocation and tutorial handlers.
function costcoArt(x,y,w,h,cls=''){return atlasArt(x,y,w,h,cls,'costco-atlas.png',1222,1287);}
const COSTCO_ICONS={gum:[715,1132,83,88],cola:[808,1127,58,92],bud:[880,1130,66,90],tape:[949,1137,77,82],marl:[1032,1125,87,95]};
let warehouseScroll=0,warehouseStocks={};
function decorateWarehouse(card){
 if(!card.querySelector('#wNo')||card.querySelector('.warehouse-shell'))return;
 card.className='card warehouse-card';
 const old=card.querySelector('.shop'),close=$('wNo');
 const head=document.createElement('header');head.className='warehouse-head';
 head.innerHTML=`<div class="costco-sign" role="img" aria-label="Costco. Товары для всех!">${costcoArt(19,10,781,267)}</div><div class="warehouse-heading"><h2>Товары для твоих точек</h2><span class="warehouse-help"></span></div><p>Один запас: продать на старте или отправить пацанам.</p>`;
 const help=old.querySelector('.whead .qm');if(help)head.querySelector('.warehouse-help').append(help);
 const list=document.createElement('div');list.className='warehouse-list';list.setAttribute('aria-label','Товары на складе');
 const rows=[...old.querySelectorAll('.wr')];
 for(const row of rows){
  const button=row.querySelector('[data-g]'),id=button.dataset.g,g=good(id),stockNow=stock(id),capacity=goodCap(id);
  const icon=row.querySelector('.ring i');if(COSTCO_ICONS[id])icon.innerHTML=costcoArt(...COSTCO_ICONS[id]);
  const quantity=row.querySelector('.wq');quantity.setAttribute('aria-label',`Запас: ${stockNow} из ${capacity}`);
  const ring=row.querySelector('.ring');ring.setAttribute('role','meter');ring.setAttribute('aria-label',`Запас: ${g.name}`);ring.setAttribute('aria-valuemin','0');ring.setAttribute('aria-valuemax',String(capacity));ring.setAttribute('aria-valuenow',String(stockNow));
  const meta=row.querySelector('.wn small');meta.textContent=`${goodSales(id)}/круг · продажа $${sellPrice(id)}`;
  meta.title=[...new Set(goodKiosks(id).map(pointName))].join(', ');
  button.setAttribute('aria-label',stockNow>=capacity?`${g.name}: всё заполнено`:`Купить ${g.name}, 1 шт. за $${buyPrice(id)}`);
  if(button.disabled&&stockNow<capacity)button.title=`Нужно $${buyPrice(id)}. В кармане $${S.cash}.`;
  // Native keyboard activation shares the same purchase path as a tap.
  button.addEventListener('click',e=>{if(e.detail===0&&!button.disabled){button.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));document.dispatchEvent(new PointerEvent('pointerup',{bubbles:true}));}});
  if(warehouseStocks[id]!==undefined&&stockNow>warehouseStocks[id])row.classList.add('stock-added');
  warehouseStocks[id]=stockNow;list.append(row);
 }
 if(!rows.length)list.innerHTML='<div class="warehouse-empty"><b>Сначала нужна своя точка</b><p>Там будет храниться товар. Купи точку на карте и возвращайся за первой партией.</p></div>';
 const footer=document.createElement('footer');footer.className='warehouse-footer';
 const discount=Math.round((perk().disc||0)*100);
 footer.innerHTML=`<div class="warehouse-johnny"><div class="warehouse-portrait">${costcoArt(748,327,178,140)}</div><div class="warehouse-bubble">${discount?`Скидка Джонни <b>${discount}%</b><small>Уже учтена в ценах</small>`:'Чем больше товара —<br><b>тем больше прибыли!</b>'}</div><span class="warehouse-wallet">В кармане<b>$${S.cash}</b></span></div>`;
 const all=old.querySelector('#wAll');
 if(all){
  const text=all.querySelector('span');if(text?.textContent==='Закупиться на точки')text.textContent='Заполнить все точки';
  all.classList.add('bad','warehouse-bulk');all.insertAdjacentHTML('afterbegin',`<span class="warehouse-money">${costcoArt(1032,1024,90,69)}</span>`);footer.append(all);enamelButton(all);
  const canBuy=rows.some(r=>!r.querySelector('button').disabled);
  const note=document.createElement('small');note.className='warehouse-buy-note';note.textContent=canBuy?'Тап: +1 товар. Удерживай, чтобы покупать быстрее.':rows.every(r=>+r.querySelector('.ring').getAttribute('aria-valuenow')>=+r.querySelector('.ring').getAttribute('aria-valuemax'))?'Все точки заполнены. Товар готов к продаже или поставке.':'Не хватает денег на закупку.';footer.append(note);
 }else{
  const done=document.createElement('button');done.className='sec';done.textContent='На карту';done.onclick=()=>closeModal();footer.append(done);enamelButton(done);
 }
 const shell=document.createElement('div');shell.className='warehouse-shell';shell.append(head,list,footer);card.replaceChildren(shell,close);paintedClose(close);
 rows.forEach(r=>enamelButton(r.querySelector('button')));
 list.scrollTop=warehouseScroll;list.addEventListener('scroll',()=>warehouseScroll=list.scrollTop,{passive:true});
}
new MutationObserver(()=>{if($('modal').hidden){warehouseScroll=0;warehouseStocks={};}}).observe($('modal'),{attributes:true,attributeFilter:['hidden']});
