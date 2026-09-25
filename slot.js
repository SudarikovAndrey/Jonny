// ===== Мини-игра «Однорукий бандит» (клетка-автомат) =====
// Концепт и ТЗ — сессия «Американ миниигры» (однорукий-бандит-концепт.md, -тз-дизайн.md).
// Вход: Slot.open() → Promise, резолвится, когда игрок закрыл автомат.
// Один бесплатный спин за визит, «Ещё разок» за кристаллы (1, 2, 4… за день).
// Ставок нет, пустых спинов нет. Честность как в «Шансе»: исход выбирается по весам
// таблицы, и барабаны останавливаются ровно на нём — что видно, то и выдано.
// Навыки: game-ui-designer (экран), cartoon-animation (рычаг, барабаны, выигрыши).
(function(){
const IC='assets/icons/';
const SEVEN='<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 9h40l-19 46H19l17-35H13z" fill="#d63a2a" stroke="#2a2118" stroke-width="4.5" stroke-linejoin="round"/><path d="M16 12h31" stroke="#ffd76a" stroke-width="3" stroke-linecap="round"/><path d="M36 20 22 52" stroke="#ff8a6a" stroke-width="3" stroke-linecap="round" opacity=".7"/></svg>';
const CHERRY='<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M33 10c-6 8-12 17-14 26M33 10c3 9 8 16 14 20" fill="none" stroke="#3f6b2a" stroke-width="4" stroke-linecap="round"/><path d="M33 10c6-5 14-5 19-1-5 5-13 5-19 1z" fill="#5c8f47" stroke="#2a2118" stroke-width="2.5" stroke-linejoin="round"/><circle cx="18" cy="44" r="12" fill="#c9302a" stroke="#2a2118" stroke-width="4"/><circle cx="45" cy="40" r="12" fill="#c9302a" stroke="#2a2118" stroke-width="4"/><circle cx="14" cy="40" r="3.5" fill="#ffb4a0"/><circle cx="41" cy="36" r="3.5" fill="#ffb4a0"/></svg>';
const ART={seven:SEVEN,cherry:CHERRY,gem:`<img src="${IC}gem-clean.png" alt="">`,dice:`<img src="${IC}die.png" alt="">`,
  coin:`<img src="${IC}coins.png" alt="">`,box:`<img src="${IC}box.png" alt=""><em class="sl-costco">COSTCO</em>`};
const NAME={seven:'семёрка',gem:'кристалл',dice:'кубик',coin:'монеты',box:'коробка Costco',cherry:'вишни'};
const ORDER=['seven','gem','dice','coin','box','cherry'];
// Таблица по концепту. p — шанс за спин, %.
const OUT=[
  {id:'jackpot',p:1, row:'j', lvl:3,mk:()=>['seven','seven','seven']},
  {id:'gem3',   p:3, row:'g', lvl:2,mk:()=>['gem','gem','gem']},
  {id:'dice3',  p:4, row:'d', lvl:2,mk:()=>['dice','dice','dice']},
  {id:'coin3',  p:5, row:'c', lvl:2,mk:()=>['coin','coin','coin']},
  {id:'box3',   p:5, row:'b', lvl:2,mk:()=>['box','box','box']},
  {id:'cherry3',p:7, row:'ch',lvl:2,mk:()=>['cherry','cherry','cherry']},
  {id:'dice2',  p:8, row:'d2',lvl:1,mk:()=>pair('dice')},
  {id:'box2',   p:8, row:'b2',lvl:1,mk:()=>pair('box')},
  {id:'pair',   p:24,row:'p2',lvl:1,mk:()=>pair(pick(['seven','gem','coin','cherry']))},
  {id:'none',   p:35,row:'n', lvl:0,mk:()=>shuffle(ORDER.slice()).slice(0,3)},
];
const rnd=n=>Math.floor(Math.random()*n),pick=a=>a[rnd(a.length)];
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
function pair(s){const o=pick(ORDER.filter(x=>x!==s));return shuffle([s,s,o]);}
function rollOutcome(){let r=Math.random()*100;for(const o of OUT){if((r-=o.p)<0)return o;}return OUT[OUT.length-1];}

// ---------- состояние ----------
const st=()=>{S.slot=S.slot||{pot:0,again:0,day:S.day,visits:0,hinted:false};if(S.slot.day!==S.day){S.slot.day=S.day;S.slot.again=0;}return S.slot;};
const P=()=>Math.max(Math.round(lapNet()),15*S.day);
const againPrice=()=>Math.pow(2,st().again);
const money=v=>'$'+Math.round(v).toLocaleString('ru-RU');
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const snd=k=>{try{GameFeedback.sound(k);}catch(e){}};
// Касса растёт сама: $10 × день за каждый круг.
if(typeof lapDone==='function'){const b=lapDone;lapDone=async function(){const r=await b.apply(this,arguments);try{st().pot+=10*S.day;}catch(e){}return r;};}

// ---------- призы ----------
function restockOne(){const ks=myKiosks().filter(t=>t.goods<cap(t)).sort((a,b)=>sales(b)*(sellPrice(b.good)-buyPrice(b.good))-sales(a)*(sellPrice(a.good)-buyPrice(a.good)));
  const t=ks[0];if(!t)return null;const n=cap(t)-t.goods;t.goods=cap(t);return {n,name:pointName(t)};}
function restockAll(){let n=0;for(const t of myKiosks()){n+=Math.max(0,cap(t)-t.goods);t.goods=cap(t);}return n;}
function fullPointCash(){const t=myKiosks().sort((a,b)=>cap(b)*buyPrice(b.good)-cap(a)*buyPrice(a.good))[0];return t?cap(t)*buyPrice(t.good):P();}
// Что покажет таблица и карточка приза (до выдачи).
function prizeOf(o){const p=P();
  switch(o.id){
    case 'jackpot':return {cash:st().pot,hard:5,title:'Джекпот',line:'Джонни, пакуй чемодан!'};
    case 'gem3':return {hard:3,title:'3 кристалла',line:'Сверкает как надо'};
    case 'dice3':return {rolls:10,title:'+10 ходов',line:'Кубики сами просятся'};
    case 'coin3':return {cash:Math.round(1.5*p),title:money(1.5*p),line:'Касса звенит'};
    case 'box3':return {restock:'all',title:'Затарить все точки',line:'Костко приехал сам'};
    case 'cherry3':return {cash:Math.round(.5*p),title:money(.5*p),line:'Сладкий выигрыш'};
    case 'dice2':return {rolls:3,title:'+3 хода',line:'Ещё погуляем'};
    case 'box2':return {restock:'one',title:'Затарить точку',line:'Одна коробка — и полный прилавок'};
    case 'pair':return {cash:Math.round(.25*p),title:money(.25*p),line:'Пара — уже удача'};
    default:return {cash:Math.max(1,Math.round(.1*p)),title:money(.1*p),line:'Ну хоть на жвачку'};
  }}
// Выдача: деньги, кристаллы, ходы, товар. Возвращает текст для лога.
function grant(o,pr,from){const out=[];
  if(pr.restock==='all'){const n=restockAll();if(n>0)out.push(`все точки затарены: +${n} шт.`);else{pr.cash=(pr.cash||0)+fullPointCash();}}
  if(pr.restock==='one'){const r=restockOne();if(r)out.push(`${r.name} затарена: +${r.n} шт.`);else{pr.cash=(pr.cash||0)+fullPointCash();}}
  if(pr.cash){S.cash+=pr.cash;S.stat.earned+=pr.cash;S.dstat.earned+=pr.cash;qProg('earn',pr.cash);out.push('+'+money(pr.cash));
    fly('💵',from,AT.cash(),flyN(pr.cash),{pulse:'sCash'});}
  if(pr.hard){S.hard+=pr.hard;out.push(`+💎 ${pr.hard}`);fly('💎',from,AT.el('sHard')||AT.cash(),Math.min(4,pr.hard));}
  if(pr.rolls){S.rolls+=pr.rolls;out.push(`+${pr.rolls} ходов`);fly('🎲',from,AT.dice(),3);}
  // Касса: 10% от денежного приза сверху; джекпот её обнуляет.
  if(o.id==='jackpot')st().pot=0;else if(pr.cash)st().pot+=Math.round(pr.cash*.1);
  track('slot',{id:o.id,cash:pr.cash||0,hard:pr.hard||0,rolls:pr.rolls||0,restock:pr.restock||null});
  log(`🎰 Автомат: ${out.join(', ')||pr.title}.`);save();render();
  return out.join(', ');}

// ---------- экран ----------
const TRIPLES=[['j','seven'],['g','gem'],['d','dice'],['c','coin'],['b','box'],['ch','cherry']];
const SMALL=[['d2','dice','+3 хода'],['b2','box','1 точка'],['p2',null,'пара'],['n',null,'разнобой']];
function rowPrize(id){const o=OUT.find(x=>x.row===id),pr=prizeOf(o);
  return id==='j'?'Джекпот':pr.hard?`<i class="sl-g"></i>${pr.hard}`:pr.rolls?`+${pr.rolls} ${pr.rolls<5?'хода':'ходов'}`:pr.restock?(pr.restock==='all'?'Все точки':'Одна точка'):`$${Math.round(pr.cash)}`;}
// Таблица — две панели, как на референсе: слева старшие тройки, справа остальное,
// пара и разнобой — одной строкой.
function payHTML(){
  const row=(id,syms,v)=>`<div class="sl-pr" data-row="${id}"><span class="sl-pr-s">${syms}</span><span class="sl-pr-v">${v}</span></div>`;
  const ic=(k,n)=>Array(n).fill(`<i class="sl-pi">${ART[k]}</i>`).join('');
  const L=TRIPLES.slice(0,4).map(([id,k])=>row(id,ic(k,3),rowPrize(id))).join('');
  const Rr=TRIPLES.slice(4).map(([id,k])=>row(id,ic(k,3),rowPrize(id))).join('')
    +SMALL.slice(0,2).map(([id,k])=>row(id,ic(k,2),rowPrize(id))).join('')
    +row('p2 n','<em>Пара /<br>разнобой</em>',`${rowPrize('p2')} / ${rowPrize('n')}`);
  return `<div class="sl-panel"><h3>★ Выигрыши ★</h3>${L}</div><div class="sl-panel">${Rr}</div>`;}
function digits(v){const s=Math.round(v).toString().padStart(6,'0');return [...s].map((d,i)=>`<span class="sl-dg${i===2?' gap':''}"><span class="sl-dr" style="--d:${d}">${'0123456789'.split('').map(x=>`<b>${x}</b>`).join('')}</span></span>`).join('');}
const REP=5,L=ORDER.length*REP;

let current=null;
function open(opts={}){
  if(current)return current.promise;
  let done;const promise=new Promise(r=>done=r);
  const s=st();s.visits++;let free=opts.free!==false,spinning=false,pending=null,hand=!s.hinted;
  const el=document.createElement('div');el.className='sl-layer';
  el.innerHTML=`<div class="sl-machine">
    <header class="sl-sign"><span class="sl-bulbs"></span><small>ONE ARMED</small><b>BANDIT</b>
      <img class="sl-johnny" src="assets/bp/tip-johnny.png" alt=""><span class="sl-sticker sl-st1">Маленькая ставка — большие пацанские выигрыши!</span><span class="sl-sticker sl-st2">Удача любит смелых!</span><button class="sl-help" aria-label="Шансы">?</button><button class="sl-x" aria-label="Закрыть">✕</button></header>
    <div class="sl-jackpot"><span class="sl-jl"><i class="sl-crown"></i>JACKPOT<i class="sl-crown"></i></span><div class="sl-counter">${digits(s.pot)}</div></div>
    <div class="sl-body">
      <div class="sl-reels">${[0,1,2].map(i=>`<div class="sl-win"><div class="sl-strip" id="slR${i}"></div></div>`).join('')}<span class="sl-line"></span></div>
      <div class="sl-lever" id="slLever" role="button" aria-label="Дёрнуть рычаг" tabindex="0"><span class="sl-rod"><span class="sl-ball"></span></span><span class="sl-mount"></span></div>
      ${hand?'<span class="sl-hand">дёрни!</span>':''}
    </div>
    <div class="sl-pay"><div class="sl-pay-grid">${payHTML()}</div></div>
    <div class="sl-base"><div class="sl-bar"><p class="sl-result" id="slRes">${free?'Дёрни рычаг!':'Бесплатный спин — на клетке'}</p><button class="sl-again" id="slAgain" hidden></button></div>
    <footer class="sl-foot" id="slFoot"><button class="sl-go" id="slGo">Крутить</button></footer></div>
  </div>
  <div class="sl-odds" hidden><div><h3>Шансы за спин</h3>${OUT.map(o=>`<p><span>${{jackpot:'7 7 7',gem3:'три кристалла',dice3:'три кубика',coin3:'три монеты',box3:'три коробки',cherry3:'три вишни',dice2:'пара кубиков',box2:'пара коробок',pair:'другая пара',none:'разнобой'}[o.id]}</span><b>${o.p}%</b></p>`).join('')}<p class="sl-odds-n">Пустых спинов нет.</p><button class="sec" id="slOddsOk">Понятно</button></div></div>`;
  document.body.append(el);
  ['slOddsOk'].forEach(id=>enamelButton(el.querySelector('#'+id)));
  const q=s=>el.querySelector(s),res=q('#slRes'),go=q('#slGo'),again=q('#slAgain'),lever=q('#slLever'),x=q('.sl-x');
  if(!reduced())q('.sl-machine').animate([{transform:'translateY(60px) scale(.9)',opacity:0},{transform:'translateY(-8px) scale(1.02)',opacity:1,offset:.7},{transform:'none'}],{duration:340,easing:'cubic-bezier(.34,1.56,.64,1)'});
  // Барабаны: лента символов, повтор для бесшовной прокрутки.
  const reels=[0,1,2].map(i=>{const seq=[];for(let k=0;k<REP;k++)seq.push(...shuffle(ORDER.slice()));
    const strip=q('#slR'+i);strip.innerHTML=seq.concat(seq).map(k=>`<div class="sl-sym s-${k}">${ART[k]}</div>`).join('');
    return {i,seq,strip,y:rnd(L),v:0,mode:'idle'};});
  // offsetHeight, а не getBoundingClientRect: окно въезжает с масштабом, и ряд считался бы кривым.
  const rowH=()=>q('.sl-win').offsetHeight/3;
  const place=r=>{r.strip.style.transform=`translateY(${-(((r.y%L)+L)%L)*rowH()}px)`;};
  // Подгонка под экран: высота ряда барабанов подбирается так, чтобы автомат
  // вместе с кнопками помещался без прокрутки между шапкой и низом экрана.
  const machine=q('.sl-machine');
  const fit=()=>{
    const reserve=()=>0; // кнопка «Крутить» всегда на месте — отдельный запас не нужен
    const avail=el.clientHeight-14,need=()=>machine.scrollHeight+reserve()-avail;
    machine.classList.remove('tight');machine.style.setProperty('--row','60px');
    let over=need();
    if(over>0){let r=Math.floor(60-over/3);
      if(r<44){machine.classList.add('tight');machine.style.setProperty('--row','60px');r=Math.floor(60-need()/3);}
      machine.style.setProperty('--row',Math.max(34,r)+'px');}
    reels.forEach(place);};
  fit();requestAnimationFrame(fit);addEventListener('resize',fit);
  // Главная кнопка: «Крутить» (бесплатный спин) → «Забрать» после спина;
  // когда бесплатного нет — «Крутить» с ценой, а «Ещё разок» в строке не нужен.
  const paint=()=>{const pr=againPrice();again.innerHTML=`Ещё разок<b><i class="sl-g"></i>${pr}</b>`;again.classList.toggle('poor',S.hard<pr);
    go.disabled=spinning;go.classList.toggle('take',!!pending);
    go.innerHTML=pending?'Забрать':free?'Крутить':`Крутить <b><i class="sl-g"></i>${pr}</b>`;
    x.hidden=spinning;q('.sl-counter').innerHTML=digits(st().pot);q('.sl-pay-grid').innerHTML=payHTML();};
  paint();
  let raf=0,last=performance.now();
  const tick=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;let busy=false;
    for(const r of reels){
      if(r.mode==='spin'){r.v=Math.min(r.v+dt*60,22);r.y-=r.v*dt;busy=true;}
      else if(r.mode==='stop'){const k=Math.min(1,(now-r.t0)/r.dur);
        const e=k<1?1-Math.pow(1-k,3)+Math.sin(k*Math.PI)*0.06*(1-k):1; // торможение с лёгким отскоком от упора
        r.y=r.y0+(r.target-r.y0)*e;busy=true;
        if(k>=1){r.mode='idle';r.y=r.target;r.strip.parentElement.classList.remove('blur');landFx(r);}}
      place(r);}
    if(busy)raf=requestAnimationFrame(tick);else raf=0;};
  const landFx=r=>{snd('dice_hit');const w=r.strip.parentElement;w.classList.add('hit');setTimeout(()=>w.classList.remove('hit'),260);
    if(!reduced())q('.sl-reels').animate([{transform:'none'},{transform:'translateY(2px)'},{transform:'none'}],{duration:120});};
  // Цель: символ нужного вида в центре окна. Ищем его дальше по ленте (вниз по движению).
  const stopAt=(r,sym,delay,dur)=>setTimeout(()=>{let k=Math.floor(r.y)-8;while(r.seq[((k%L)+L)%L]!==sym)k--;
    r.mode='stop';r.t0=performance.now();r.dur=dur;r.y0=r.y;r.target=k-1;},delay);
  const spin=()=>{
    if(spinning)return;
    if(!free){const pr=againPrice();if(S.hard<pr){closeAll();setTimeout(()=>shopHard(),200);return;}
      if(!spendHard(pr,AT.el(again.hidden?'slGo':'slAgain')))return;st().again++;}
    if(pending){claim();}
    free=false;spinning=true;pending=null;hand=false;st().hinted=true;q('.sl-hand')?.remove();
    el.classList.remove('lvl-0','lvl-1','lvl-2','lvl-3');el.querySelectorAll('.win').forEach(e=>e.classList.remove('win'));
    again.hidden=true;x.hidden=true;res.textContent='Крутится…';res.className='sl-result';paint();
    q('.sl-johnny').src='assets/bp/tip-johnny.png';
    // рычаг: рывок вниз и пружина назад
    if(!reduced())lever.animate([{transform:'rotate(0)'},{transform:'rotate(58deg)',offset:.35},{transform:'rotate(-8deg)',offset:.7},{transform:'rotate(3deg)',offset:.85},{transform:'rotate(0)'}],{duration:620,easing:'ease-out'});
    snd('throw');
    // Slot.debugNext — только для проверки состояний выигрыша из консоли/тестов.
    const forced=window.Slot&&Slot.debugNext&&OUT.find(x=>x.id===Slot.debugNext);if(window.Slot)Slot.debugNext=null;
    const o=forced||rollOutcome(),syms=o.mk();
    reels.forEach(r=>{r.mode='spin';r.v=4;r.strip.parentElement.classList.add('blur');});
    if(!raf){last=performance.now();raf=requestAnimationFrame(tick);}
    const base=reduced()?250:700;
    reels.forEach((r,i)=>stopAt(r,syms[i],base+i*(reduced()?120:430),reduced()?200:520));
    setTimeout(()=>reveal(o),base+2*(reduced()?120:430)+(reduced()?220:560));
  };
  const reveal=o=>{spinning=false;const pr=prizeOf(o);pending={o,pr};
    el.classList.add('lvl-'+o.lvl);
    const row=q(`[data-row~="${o.row}"]`);row&&row.classList.add('win');
    el.querySelectorAll('.sl-sticker').forEach((st,i)=>o.lvl>=1&&!reduced()&&st.animate([{scale:1},{scale:1.25,rotate:(i?8:-8)+'deg'},{scale:1}],{duration:420,delay:i*120,easing:'cubic-bezier(.34,1.56,.64,1)'}));
    res.innerHTML=`<b>${o.lvl?pr.title:'На сдачу '+pr.title}</b>${pr.line}`;res.className='sl-result on';
    again.hidden=false;paint();x.hidden=false;
    if(o.lvl>=1)q('.sl-johnny').src='assets/bp/bp-johnny.png';
    if(o.lvl===0){snd('ui');}
    if(o.lvl===1){snd('joy');}
    if(o.lvl===2){snd('joy');prizeCard(pr,o);}
    if(o.lvl===3){snd('dance');jackpotShow(pr);}
    if(!reduced()){go.animate([{transform:'translateY(16px) scale(.85)',opacity:0},{transform:'translateY(-3px) scale(1.04)',opacity:1,offset:.7},{transform:'none'}],{duration:320,easing:'cubic-bezier(.34,1.56,.64,1)'});}
    go.focus({preventScroll:true});fit();el.scrollTop=el.scrollHeight;};
  const claim=()=>{if(!pending)return;const r=q('.sl-reels').getBoundingClientRect(),from={x:r.left+r.width/2,y:r.top+r.height/2};
    const {o,pr}=pending;pending=null;grant(o,pr,from);if(o.lvl>=2)queueMobileJoy(o.lvl===3?'dance':'joy');paint();};
  // Карточка крупного приза по центру.
  const prizeCard=(pr,o)=>{const ic=pr.hard?ART.gem:pr.rolls?ART.dice:pr.restock?ART.box:o.id==='cherry3'?ART.cherry:ART.coin;
    const c=document.createElement('div');c.className='sl-prize';c.innerHTML=`<div><span class="sl-prize-ic">${ic}</span><b>${pr.title}</b><small>${pr.line}</small></div>`;
    el.append(c);if(!reduced())c.firstChild.animate([{transform:'scale(.3) rotate(-10deg)',opacity:0},{transform:'scale(1.12) rotate(2deg)',opacity:1,offset:.6},{transform:'scale(.96)',offset:.8},{transform:'none'}],{duration:480,easing:'ease-out'});
    setTimeout(()=>{c.animate([{opacity:1},{opacity:0,transform:'scale(.9)'}],{duration:260,fill:'forwards'});setTimeout(()=>c.remove(),260);},1700);};
  // Джекпот: затемнение, дождь монет и купюр, конфетти, лого и сумма.
  const jackpotShow=pr=>{const o=document.createElement('div');o.className='sl-jov';
    o.innerHTML=`<canvas></canvas><div class="sl-jov-in"><img src="assets/bp/bp-johnny.png" alt=""><b class="sl-jov-logo">JACKPOT!</b><span class="sl-jov-sum">${money(pr.cash)} + <i class="sl-g"></i>5</span><small>Джонни, пакуй чемодан!</small><button class="ok" id="slJovOk">Забрать всё</button></div>`;
    el.append(o);enamelButton(o.querySelector('#slJovOk'));
    if(!reduced())o.querySelector('.sl-jov-in').animate([{transform:'scale(.2) rotate(-14deg)',opacity:0},{transform:'scale(1.1) rotate(3deg)',opacity:1,offset:.6},{transform:'none'}],{duration:620,easing:'ease-out'});
    const cv=o.querySelector('canvas'),W=innerWidth,H=innerHeight,dpr=Math.min(devicePixelRatio||1,2);cv.width=W*dpr;cv.height=H*dpr;const cx=cv.getContext('2d');cx.scale(dpr,dpr);
    const coin=new Image();coin.src=IC+'soft.png';const bill=new Image();bill.src=IC+'money.png';
    const bits=Array.from({length:reduced()?0:70},(_,i)=>({x:Math.random()*W,y:-Math.random()*H,vy:120+Math.random()*220,vx:(Math.random()-.5)*60,r:Math.random()*6,vr:(Math.random()-.5)*6,k:i%3,s:22+Math.random()*16}));
    let alive=true,lastT=performance.now(),acc=0;
    const t=now=>{if(!alive||!o.isConnected)return;const dt=Math.min(.05,(now-lastT)/1000);lastT=now;acc+=dt;
      if(acc>=1/12){const s=acc;acc=0;cx.clearRect(0,0,W,H); // «на двойках»
        for(const b of bits){b.y+=b.vy*s;b.x+=b.vx*s;b.r+=b.vr*s;if(b.y>H+40){b.y=-40;b.x=Math.random()*W;}
          cx.save();cx.translate(b.x,b.y);cx.rotate(b.r);
          if(b.k===2){cx.fillStyle=['#c43a2d','#f0c44e','#3f6f98'][Math.floor(b.x)%3];cx.fillRect(-6,-4,12,8);cx.strokeStyle='#2a2118';cx.lineWidth=1.5;cx.strokeRect(-6,-4,12,8);}
          else{const im=b.k?bill:coin;if(im.complete)cx.drawImage(im,-b.s/2,-b.s/2,b.s,b.s*(im.naturalHeight/im.naturalWidth||1));}
          cx.restore();}}
      requestAnimationFrame(t);};requestAnimationFrame(t);
    o.querySelector('#slJovOk').onclick=()=>{alive=false;o.remove();claim();closeAll();};};
  const closeAll=()=>{if(spinning)return;removeEventListener('resize',fit);if(pending)claim();cancelAnimationFrame(raf);current=null;
    const fin=()=>{el.remove();done();};
    if(reduced())fin();else{q('.sl-machine').animate([{transform:'none',opacity:1},{transform:'translateY(40px) scale(.94)',opacity:0}],{duration:220,fill:'forwards'});el.animate([{opacity:1},{opacity:0}],{duration:240,fill:'forwards'});setTimeout(fin,230);}};
  // Рычаг: тап или свайп вниз по нему.
  let y0=null;
  lever.addEventListener('pointerdown',e=>{y0=e.clientY;lever.setPointerCapture(e.pointerId);});
  lever.addEventListener('pointermove',e=>{if(y0==null||spinning)return;const d=Math.max(0,Math.min(90,e.clientY-y0));lever.style.transform=`rotate(${d*.6}deg)`;});
  lever.addEventListener('pointerup',()=>{y0=null;lever.style.transform='';if(!spinning)spin();});
  lever.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();if(!spinning)spin();}});
  const spinAgain=()=>{if(!spinning)spin();};
  go.onclick=()=>{if(spinning)return;if(pending)closeAll();else spin();};
  again.onclick=()=>spinAgain();
  x.onclick=()=>closeAll();
  q('.sl-help').onclick=()=>{q('.sl-odds').hidden=false;};
  q('#slOddsOk').onclick=()=>{q('.sl-odds').hidden=true;};
  current={promise};
  return promise;
}

// Клетка 10: остановка — один бесплатный спин; повторное открытие строкой — только платный.
if(typeof land==='function'){const bl=land;land=async function(t){
  if(t&&t.type==='slot'){S.landN=(S.landN||0)+1;track('land',{tile:t.i,ttype:'slot'});if(t.drop)await collectDrop(t);await open();return;}
  return bl.apply(this,arguments);};}
(function(){const tb=document.getElementById('tilebar');if(!tb)return;
  const base=render;render=function(){const r=base.apply(this,arguments);try{const t=S.tiles[S.pos];
    if(t&&t.type==='slot'&&!moving&&!S.finished){tb.hidden=false;tb.disabled=false;tb.classList.remove('poor','off');
      $('tbText').textContent=`🎰 Однорукий бандит · касса $${st().pot}`;tb.querySelector('b').textContent='открыть';}}catch(e){}return r;};
  tb.addEventListener('click',e=>{const t=S.tiles[S.pos];if(t&&t.type==='slot'&&!moving&&$('modal').hidden){e.stopImmediatePropagation();open({free:false});}},true);})();
window.Slot={open,rollOutcome,prizeOf,OUT,pot:()=>st().pot};

// Тест: в настройках кнопка «Автомат», в адресе ?slot=1 — открыть сразу.
new MutationObserver(()=>{const c=$('card');if(!c.querySelector('#iRolls')||c.querySelector('#slTest'))return;
  const b=document.createElement('button');b.id='slTest';b.className='sec';b.textContent='🎰 Однорукий бандит';b.style.cssText='width:100%;margin:6px 0';
  (c.querySelector('.mbtns')||c).before(b);enamelButton(b);b.onclick=()=>{closeModal();setTimeout(()=>open(),160);};
}).observe($('card'),{childList:true,subtree:true});
})();
