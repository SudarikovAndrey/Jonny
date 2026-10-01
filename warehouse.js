// Costco presentation reuses the prototype's purchase, hold, allocation and tutorial handlers.
function costcoArt(x,y,w,h,cls=''){return atlasArt(x,y,w,h,cls,'costco-atlas.webp',1222,1287);}
const COSTCO_ICONS={gum:[715,1132,83,88],cola:[808,1127,58,92],bud:[880,1130,66,90],tape:[949,1137,77,82],marl:[1032,1125,87,95]};
let warehouseScroll=0,warehouseStocks={};
function decorateWarehouse(card){
 if(!card.querySelector('#wNo')||card.querySelector('.warehouse-shell'))return;
 card.className='card warehouse-card';
 const old=card.querySelector('.shop'),close=$('wNo');
 const head=document.createElement('header');head.className='warehouse-head';
 head.innerHTML=`<img class="warehouse-head-icon" src="assets/icons/crate.webp" alt=""><div class="warehouse-heading"><h2>Склад</h2><p>Товары для твоих точек</p></div><span class="warehouse-help"></span>`;
 const help=old.querySelector('.whead .qm');if(help)head.querySelector('.warehouse-help').append(help);
 const list=document.createElement('div');list.className='warehouse-list';list.setAttribute('aria-label','Товары на складе');list.tabIndex=0;
 const rows=[...old.querySelectorAll('.wr')];
 for(const row of rows){
  const button=row.querySelector('[data-g]'),id=button.dataset.g,g=good(id),stockNow=stock(id),capacity=goodCap(id);
  const icon=row.querySelector('.ring i');icon.innerHTML=`<img class="warehouse-good-art" src="assets/goods/${GOODS_ICON[g.name]||id}.webp" alt="">`;
  const quantity=row.querySelector('.wq');quantity.innerHTML=`<span>На точках</span> <b>${stockNow}<small> / ${capacity}</small></b>`;quantity.setAttribute('aria-label',`Запас: ${stockNow} из ${capacity}`);
  const ring=row.querySelector('.ring');ring.setAttribute('role','meter');ring.setAttribute('aria-label',`Запас: ${g.name}`);ring.setAttribute('aria-valuemin','0');ring.setAttribute('aria-valuemax',String(capacity));ring.setAttribute('aria-valuenow',String(stockNow));
  const meta=row.querySelector('.wn small');meta.textContent=`Продажа: ${goodSales(id)} шт./круг · $${sellPrice(id)} за шт.`;meta.style.whiteSpace='nowrap';
  meta.title=[...new Set(goodKiosks(id).map(pointName))].join(', ');
  meta.classList.add('warehouse-meta');row.append(meta);
  if(stockNow<capacity)button.innerHTML=`<span>Купить 1</span><span class="warehouse-unit-price">$${buyPrice(id)}</span>`;
  button.setAttribute('aria-label',stockNow>=capacity?`${g.name}: всё заполнено`:`Купить ${g.name}, 1 шт. за $${buyPrice(id)}`);
  if(button.disabled&&stockNow<capacity)button.title=`Нужно $${buyPrice(id)}. В кармане $${S.cash}.`;
  // Native keyboard activation shares the same purchase path as a tap.
  button.addEventListener('click',e=>{if(e.detail===0&&!button.disabled){button.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));document.dispatchEvent(new PointerEvent('pointerup',{bubbles:true}));}});
  if(warehouseStocks[id]!==undefined&&stockNow>warehouseStocks[id])row.classList.add('stock-added');
  warehouseStocks[id]=stockNow;list.append(row);
 }
 if(!rows.length)list.innerHTML='<div class="warehouse-empty"><b>Сначала нужна своя точка</b><p>Там будет храниться товар. Купи точку на карте и возвращайся за первой партией.</p></div>';
 const footer=document.createElement('footer');footer.className='warehouse-footer';
 let wallet=document.querySelector('#modal > .warehouse-cash');
 if(!wallet){wallet=document.createElement('output');wallet.className='warehouse-cash';wallet.setAttribute('aria-label','В кармане');card.before(wallet);}
 wallet.innerHTML=`<span>В кармане</span><b>$${S.cash}</b>`;cashGlyph(wallet);
 const all=old.querySelector('#wAll');
 if(all){
  // Primary action states whether the budget can fill every point.
  const text=all.querySelector('span');
  const need=myKiosks().reduce((sum,t)=>sum+(cap(t)-t.goods)*buyPrice(t.good),0);
  if(text)text.textContent=need<=0?'Точки заполнены':S.cash>=need?'Пополнить всё':'Купить максимум';
  if(need>0&&S.cash<need)all.querySelector('b').prepend('до ');
  all.classList.remove('bad');all.classList.add('ok','warehouse-bulk');
  const buys=document.createElement('div');buys.className='warehouse-buys';
  buys.append(all);footer.append(buys);enamelButton(all);
  // Вторая закупка — на половину суммы «на всё» (а не половину кармана, иначе
  // «половина» выходила дороже «всего»). Берём самые выгодные товары по кругу.
  const allPrice=+(all.querySelector('b')?.textContent||'').replace(/\D/g,'')||0;
  if(!all.disabled){
    const half=document.createElement('button');
    half.className='sec warehouse-bulk warehouse-half';
    const budget=Math.floor(allPrice/2);
    half.innerHTML=`<span>Половина суммы</span><b><small>до</small> $${budget}</b>`;
    half.disabled=!myKiosks().some(t=>t.goods<cap(t)&&buyPrice(t.good)<=budget);
    half.title='Бюджет — половина суммы полной закупки. Товар распределится по точкам.';
    half.onclick=()=>{
      // Закупка — общим алгоритмом web/restock.js: кругами продаж, по прибыли на доллар (механика — Геймплей).
      const spent=smartRestock(budget);
      if(spent>0){ toast('Закуплено на $'+spent); save(); render(); draw(); }
      else toast('Не хватает даже на одну штуку');
      closeModal();
    };
    buys.append(half); enamelButton(half);
  }
  const canBuy=rows.some(r=>!r.querySelector('button').disabled);
  const note=document.createElement('small');note.className='warehouse-buy-note';note.textContent=canBuy?'Товар распределяется по точкам автоматически.':rows.every(r=>+r.querySelector('.ring').getAttribute('aria-valuenow')>=+r.querySelector('.ring').getAttribute('aria-valuemax'))?'Все точки заполнены. Товар готов к продаже или поставке.':'Не хватает денег на закупку.';footer.append(note);
 }else{
  const done=document.createElement('button');done.className='sec';done.textContent='На карту';done.onclick=()=>closeModal();footer.append(done);enamelButton(done);
 }
 const shell=document.createElement('div');shell.className='warehouse-shell';
 const caption=document.createElement('div');caption.className='warehouse-list-caption';caption.innerHTML=`<b>Товары · ${rows.length}</b><span>Закупка за 1 шт.</span>`;
 shell.append(head);if(rows.length)shell.append(caption);shell.append(list,footer);
 card.dataset.goodsCount=String(rows.length);card.replaceChildren(shell,close);paintedClose(close);
 rows.forEach(r=>enamelButton(r.querySelector('button')));
 list.scrollTop=warehouseScroll;list.addEventListener('scroll',()=>warehouseScroll=list.scrollTop,{passive:true});
}
new MutationObserver(()=>{if($('modal').hidden){warehouseScroll=0;warehouseStocks={};}}).observe($('modal'),{attributes:true,attributeFilter:['hidden']});
