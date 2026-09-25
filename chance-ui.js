// ===== «Шанс»: интерфейс карт (Американ Интерфейс) =====
// Механика — chance-system.js (не менять). Здесь только вид: окно вращения,
// коллекция и её раскрытие, сборщик колоды, значки эффектов в шапке, заставки
// новых редкостей. Навыки: game-ui-designer, cartoon-animation, game-copywriter.
//
// Честность вращения (§5-2): обе стороны видны до тапа (сама карта крутится и
// под ней — две плашки A/B); тормозной путь — из Chance.spinParams; выпадает та
// сторона, что по углу смотрит на игрока, когда карта встала. «Верняк» докручивает
// путь до A заранее и честно — так же, как в chancePresentBasic.
(function(){
if(!window.Chance)return;
const CUI={};
const IC='assets/icons/', SYM='board/assets/symbols/';
const SVG={
  empty:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="17" fill="#e9dcbb" stroke="#2a2118" stroke-width="3.5"/><path d="M15 33 33 15" stroke="#2a2118" stroke-width="4" stroke-linecap="round"/></svg>',
  freeze:'<svg viewBox="0 0 48 48"><g stroke="#243f4b" stroke-width="4" stroke-linecap="round"><path d="M24 5v38M7.5 14.5l33 19M7.5 33.5l33-19"/></g><g stroke="#2a2118" stroke-width="2" fill="none"><path d="M19 8l5 5 5-5M19 40l5-5 5 5"/></g></svg>',
  star:'<svg viewBox="0 0 48 48"><path d="M24 4l6 13 14 1.5-10.5 9.5 3 14L24 35l-12.5 7 3-14L4 18.5 18 17z" fill="#f0c44e" stroke="#2a2118" stroke-width="3" stroke-linejoin="round"/></svg>',
  x2:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#c43a2d" stroke="#2a2118" stroke-width="3.5"/><text x="24" y="31" text-anchor="middle" font-family="Bitter,Georgia,serif" font-weight="900" font-size="19" fill="#fff4d8">×2</text></svg>',
  down:'<svg viewBox="0 0 48 48"><path d="M24 42 8 22h10V6h12v16h10z" fill="#c43a2d" stroke="#2a2118" stroke-width="3" stroke-linejoin="round"/></svg>',
  up:'<svg viewBox="0 0 48 48"><path d="M24 6 40 26H30v16H18V26H8z" fill="#5c8f47" stroke="#2a2118" stroke-width="3" stroke-linejoin="round"/></svg>',
  lose:'<svg viewBox="0 0 48 48"><rect x="8" y="14" width="32" height="26" rx="3" fill="#e9dcbb" stroke="#2a2118" stroke-width="3"/><path d="M6 14h36l-4-8H10z" fill="#c43a2d" stroke="#2a2118" stroke-width="3" stroke-linejoin="round"/><path d="M14 20 34 36M34 20 14 36" stroke="#c43a2d" stroke-width="4" stroke-linecap="round"/></svg>',
};
const img=src=>`<img src="${src}" alt="">`;
// Иконка каждой стороны каждой карты — маленький мультяшный предмет из кита.
const ICONS={
  stash:[img(IC+'soft.png'),img(IC+'soft.png')], coffee:[img(IC+'cup.png'),img(IC+'cup.png')],
  wholesale:[img(IC+'box.png'),img(IC+'box.png')], cab:[img(IC+'taxi.png'),img(IC+'percent.png')],
  freegoods:[img(IC+'crate.png'),SVG.empty], grant:[img(IC+'crown.png'),SVG.empty],
  supplier:[img(IC+'percent.png'),SVG.empty], collector:[img(IC+'coins.png'),SVG.empty],
  sellout:[img(IC+'coins.png'),SVG.freeze], reprice:[SVG.up,SVG.down],
  alibi:[SVG.star,img(SYM+'police.svg')], sure:[SVG.star,SVG.empty], double:[SVG.x2,SVG.empty],
  jackpot:[img(IC+'money.png'),img(SYM+'police.svg')], investor:[img(IC+'shop.png'),SVG.lose],
  credit:[img(IC+'soft.png'),img(IC+'percent.png')],
};
const RAR=['grey','blue','purple','gold'];
const RWORD={grey:'Серая',blue:'Синяя',purple:'Фиолетовая',gold:'Золотая'};
const RISK={grey:'плюс или плюс поменьше',blue:'большой плюс или пусто',purple:'сильный плюс или настоящий минус',gold:'огромный плюс или огромный минус'};
// Минус у стороны B: у фиолетовых и золотых — это настоящая потеря.
const badB=c=>c.r==='purple'||c.r==='gold';
const lib=()=>Chance.library(), byId=id=>lib().find(c=>c.id===id);
const ui=()=>{S.chanceUI=S.chanceUI||{seen:{},fresh:{},revealed:false,deckTip:false,rarityShown:{}};S.chanceUI.fresh=S.chanceUI.fresh||{};return S.chanceUI;};
// «Новая» — карта, которую механика только что добавила в коллекцию и игрок её ещё не открывал.
const isFresh=id=>Chance.onCardAdded?!!ui().fresh[id]:!ui().seen[id];
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const snd=k=>{try{GameFeedback.sound(k);}catch(e){}};

// ---------- карта: одна сторона ----------
function face(c,side){
  const bad=side==='B'&&badB(c),empty=/^пусто$/i.test(c[side]);
  return `<div class="cu-face cu-${side==='A'?'front':'back'}">
    <span class="cu-stamp">${RWORD[c.r]}</span>
    <span class="cu-side ${side==='A'?'good':bad?'bad':'meh'}">${side}</span>
    <b class="cu-title">${c.title}</b>
    <span class="cu-art">${(ICONS[c.id]||[])[side==='A'?0:1]||SVG.star}</span>
    <span class="cu-cap ${bad?'bad':''} ${empty?'empty':''}">${c[side]}</span>
  </div>`;
}
function cardHTML(c,cls=''){return `<div class="cu-card r-${c.r} ${cls}" data-id="${c.id}"><div class="cu-spin">${face(c,'A')}${face(c,'B')}</div></div>`;}
CUI.cardHTML=cardHTML;

// ---------- экран 5: заставка новой редкости ----------
function rarityIntro(c){
  const u=ui();if(u.rarityShown[c.r]||c.r==='grey')return Promise.resolve();
  u.rarityShown[c.r]=true;save();
  return new Promise(res=>{
    const el=document.createElement('div');el.className='cu-layer cu-intro r-'+c.r;
    el.innerHTML=`<div class="cu-intro-in"><span class="cu-rays"></span>
      <small class="cu-kicker">Новая редкость</small><h2 class="cu-intro-name">${RWORD[c.r]}</h2>
      <p class="cu-intro-txt">${RISK[c.r][0].toUpperCase()+RISK[c.r].slice(1)}.</p>
      <div class="cu-intro-card">${cardHTML(c,'cu-mini')}</div>
      ${badB(c)?`<p class="cu-intro-warn">У этих карт есть настоящий минус — лови нужную сторону.</p>`:`<p class="cu-intro-note">Минуса нет — рискуешь только остаться без награды.</p>`}
      <button class="ok" id="cuIntroGo">Понял, крути!</button></div>`;
    document.body.append(el);enamelButton($('cuIntroGo'));
    if(!reduced())el.querySelector('.cu-intro-in').animate([{transform:'scale(.6) rotate(-6deg)',opacity:0},{transform:'scale(1.05) rotate(1deg)',opacity:1,offset:.7},{transform:'none'}],{duration:420,easing:'cubic-bezier(.34,1.56,.64,1)'});
    snd(badB(c)?'negative':'joy');
    $('cuIntroGo').onclick=()=>{el.remove();res();};
  });
}

// ---------- экран 1: показ и вращение ----------
Chance.present=async function(card){
  await rarityIntro(card);
  const p=Chance.spinParams(card);
  return new Promise(resolve=>{
    const el=document.createElement('div');el.className='cu-layer cu-play r-'+card.r;
    const plate=s=>`<div class="cu-opt ${s} ${s==='B'&&badB(card)?'bad':''}" data-side="${s}"><span class="cu-opt-ic">${ICONS[card.id][s==='A'?0:1]}</span><span><b>${s}</b> ${card[s]}</span></div>`;
    el.innerHTML=`<div class="cu-play-in">
      <header class="cu-head"><span class="cu-chip">${RWORD[card.r]}</span><h2>Шанс</h2>
        ${p.double?'<span class="cu-flag x2">×2 — и плюс, и минус</span>':''}${p.forced?'<span class="cu-flag sure">Верняк: выпадет A</span>':''}</header>
      <div class="cu-stage" id="cuStage"><span class="cu-rays"></span><span class="cu-shadow"></span>${cardHTML(card,'cu-big')}</div>
      <div class="cu-opts">${plate('A')}${plate('B')}</div>
      <p class="cu-hint" id="cuHint">Жми, когда к тебе повернётся нужная сторона</p>
      <button class="bad cu-stop" id="cuStop">Стоп!</button>
      <button class="ok cu-take" id="cuTake" hidden>Забрать</button>
    </div>`;
    document.body.append(el);
    ['cuStop','cuTake'].forEach(id=>enamelButton($(id)));
    const cardEl=el.querySelector('.cu-big'),spinEl=cardEl.querySelector('.cu-spin'),shadow=el.querySelector('.cu-shadow');
    let ang=0,w=p.deg,last=performance.now(),stopping=false,decel=0,side=null,done=false;const t0=last;
    // вход: карта вылетает из колоды и шлёпается со сжатием
    if(!reduced())cardEl.animate([{transform:'translateY(120px) scale(.4) rotate(-12deg)',opacity:0},{transform:'translateY(-18px) scale(1.06,.94)',opacity:1,offset:.6},{transform:'translateY(4px) scale(.97,1.04)',offset:.8},{transform:'none'}],{duration:480,easing:'cubic-bezier(.3,.7,.3,1)'});
    snd('throw');
    const stop=()=>{if(stopping||done)return;stopping=true;
      let dist=p.stopDeg*(1-p.jitter+Math.random()*2*p.jitter);
      if(p.forced){const a=((ang+dist)%360+360)%360;if(!(a<90||a>=270))dist+=180;}
      decel=w*w/(2*dist);$('cuStop').disabled=true;$('cuHint').textContent='Тормозит…';
      // кнопка вдавливается — упреждение
      $('cuStop').animate([{scale:1},{scale:.92},{scale:1}],{duration:180});
      snd('ui');};
    el.querySelector('#cuStage').onclick=stop;$('cuStop').onclick=stop;
    const land=()=>{done=true;
      const a=((ang%360)+360)%360;side=(a<90||a>=270)?'A':'B';
      const good=side==='A',bad=side==='B'&&badB(card);
      el.classList.add('landed',good?'win-a':bad?'win-bad':'win-b');
      el.querySelector(`.cu-opt[data-side="${side}"]`).classList.add('hit');
      el.querySelector(`.cu-opt[data-side="${side==='A'?'B':'A'}"]`).classList.add('miss');
      $('cuHint').innerHTML=`<b>${good?'Выпало A':'Выпало B'}:</b> ${card[side]}`;
      $('cuStop').hidden=true;const take=$('cuTake');take.hidden=false;
      // вспышка стороны и лёгкое покачивание вокруг итогового угла — сторона не меняется
      // Сторона уже решена углом остановки. Карта «плюхается» лицом этой же
      // стороны: доворот к ближайшему 0° (A) или 180° (B) с перелётом — чтобы не
      // читать карту ребром. Исход при этом не меняется.
      const target=Math.round((ang-(side==='A'?0:180))/360)*360+(side==='A'?0:180);
      if(!reduced()){
        const from=ang,t1=performance.now(),D=.55;
        const settle=now=>{const t=Math.min(1,(now-t1)/1000/D);if(!el.isConnected)return;
          const k=1+2.2*Math.pow(t-1,3)+1.2*Math.pow(t-1,2); // easeOutBack
          spinEl.style.transform=`rotateY(${from+(target-from)*k}deg)`;shadow.style.transform=`scaleX(${0.35+0.65*Math.abs(Math.cos((from+(target-from)*k)*Math.PI/180))})`;
          if(t<1)requestAnimationFrame(settle);};requestAnimationFrame(settle);
        cardEl.animate([{transform:'scale(1)'},{transform:'scale(1.12,.9)',offset:.35},{transform:'scale(.96,1.06)',offset:.6},{transform:'scale(1)'}],{duration:620,easing:'ease-out'});
        take.animate([{transform:'translateY(20px) scale(.8)',opacity:0},{transform:'translateY(-4px) scale(1.04)',opacity:1,offset:.7},{transform:'none'}],{duration:340,easing:'cubic-bezier(.34,1.56,.64,1)'});
      } else spinEl.style.transform=`rotateY(${target}deg)`;
      snd(good?'joy':bad?'negative':'ui');
      take.focus();
      take.onclick=()=>{
        if(!reduced()){el.animate([{opacity:1},{opacity:0}],{duration:200,fill:'forwards'});setTimeout(()=>{el.remove();resolve(side);},190);}
        else{el.remove();resolve(side);}
      };
    };
    const tick=now=>{if(!el.isConnected||done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
      if(!stopping&&now-t0>p.autoMs)stop();
      if(stopping)w=Math.max(0,w-decel*dt);
      ang+=w*dt;spinEl.style.transform=`rotateY(${ang}deg)`;
      // тень сужается, когда карта стоит ребром — объём без 3D-движка
      shadow.style.transform=`scaleX(${0.35+0.65*Math.abs(Math.cos(ang*Math.PI/180))})`;
      if(stopping&&w===0){land();return;}
      requestAnimationFrame(tick);};
    requestAnimationFrame(tick);
  });
};

// ---------- экран 2: коллекция ----------
function collectionGrid(filter,opts={}){
  const col=Chance.collection(),u=ui(),stage=Chance.stage();
  const cards=lib().filter(c=>filter==='all'||c.r===filter).sort((a,b)=>RAR.indexOf(a.r)-RAR.indexOf(b.r));
  return cards.map(c=>{const n=col[c.id]||0,isNew=n&&isFresh(c.id),inDeck=opts.deck?opts.deck.filter(x=>x===c.id).length:0;
    if(!n)return `<div class="cu-cell locked r-${c.r}"><div class="cu-lock"><span>?</span><small>${RWORD[c.r]}</small></div></div>`;
    return `<button class="cu-cell r-${c.r} ${inDeck?'in':''}" data-id="${c.id}">${cardHTML(c,'cu-mini')}
      ${n>1?`<span class="cu-copies">×${n}</span>`:''}${isNew?'<span class="cu-new">новая</span>':''}${opts.deck?`<span class="cu-indeck">${inDeck?'в колоде'+(inDeck>1?' ×'+inDeck:''):''}</span>`:''}</button>`;}).join('');
}
function filters(active){
  const col=Chance.collection();
  return `<div class="cu-filters">${['all',...RAR].map(r=>{const n=r==='all'?Object.keys(col).length:lib().filter(c=>c.r===r&&col[c.id]).length;
    return `<button class="cu-f ${r===active?'on':''} r-${r}" data-f="${r}">${r==='all'?'Все':RWORD[r]}<b>${n}</b></button>`;}).join('')}</div>`;
}
function layer(cls,html){const el=document.createElement('div');el.className='cu-layer '+cls;el.innerHTML=html;document.body.append(el);
  if(!reduced())el.firstElementChild.animate([{transform:'scale(.88)',opacity:0},{transform:'scale(1.03)',opacity:1,offset:.7},{transform:'none'}],{duration:260,easing:'cubic-bezier(.34,1.56,.64,1)'});
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});return el;}
CUI.openCollection=function(tab='col'){
  if(Chance.stage()>=4&&tab==='deck')return CUI.openDeck();
  let f='all';
  const el=layer('cu-coll',`<div class="cu-panel"><header class="cu-phead"><span class="ev-badge"><img src="${IC}crown.png" alt=""></span><h2>Коллекция</h2><button class="cu-x" aria-label="Закрыть">✕</button></header>
    <div class="cu-fwrap"></div><div class="cu-grid"></div>
    <footer class="cu-pfoot">${Chance.stage()>=4?'<button class="ok" id="cuToDeck">Собрать колоду</button>':`<p class="cu-foot-note">Колоду из 8 карт скоро соберёшь сам. Пока её собирает Джонни.</p>`}</footer></div>`);
  const draw=()=>{el.querySelector('.cu-fwrap').innerHTML=filters(f);el.querySelector('.cu-grid').innerHTML=collectionGrid(f);
    el.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{f=b.dataset.f;draw();});
    el.querySelectorAll('.cu-cell[data-id]').forEach(b=>b.onclick=()=>{ui().seen[b.dataset.id]=true;delete ui().fresh[b.dataset.id];save();cardDetail(byId(b.dataset.id));draw();});};
  draw();el.querySelector('.cu-x').onclick=()=>el.remove();
  const td=el.querySelector('#cuToDeck');if(td){enamelButton(td);td.onclick=()=>{el.remove();CUI.openDeck();};}
  return el;
};
function cardDetail(c){
  const el=layer('cu-detail r-'+c.r,`<div class="cu-detail-in">${cardHTML(c,'cu-big')}<p class="cu-detail-r">${RWORD[c.r]} · ${RISK[c.r]}</p>
    <div class="cu-opts"><div class="cu-opt"><span class="cu-opt-ic">${ICONS[c.id][0]}</span><span><b>A</b> ${c.A}</span></div><div class="cu-opt ${badB(c)?'bad':''}"><span class="cu-opt-ic">${ICONS[c.id][1]}</span><span><b>B</b> ${c.B}</span></div></div>
    <button class="sec" id="cuFlip">Перевернуть</button></div>`);
  let a=0;const sp=el.querySelector('.cu-spin');enamelButton($('cuFlip'));
  $('cuFlip').onclick=()=>{a+=180;sp.style.transition='transform .5s cubic-bezier(.34,1.4,.64,1)';sp.style.transform=`rotateY(${a}deg)`;};
}

// Раскрытие коллекции: конец карты 3 (этап 3) — один раз, после первой карты этапа.
function collectionReveal(){
  const u=ui();if(u.revealed||Chance.stage()<3)return;u.revealed=true;save();
  const deck=Chance.deck();
  const el=layer('cu-reveal',`<div class="cu-reveal-in"><span class="cu-rays"></span><small class="cu-kicker">Открыто</small><h2>Твоя колода «Шанса»</h2>
    <div class="cu-fan">${deck.map((id,i)=>`<div class="cu-fan-card" style="--i:${i};--n:${deck.length}">${cardHTML(byId(id),'cu-mini')}</div>`).join('')}</div>
    <ul class="cu-rules"><li><b>8 карт</b> в колоде</li><li>каждая выходит <b>раз за круг колоды</b></li><li>редкость = сила награды <b>и риск</b></li></ul>
    <button class="ok" id="cuRevOpen">Смотреть коллекцию</button></div>`);
  enamelButton($('cuRevOpen'));snd('joy');
  $('cuRevOpen').onclick=()=>{el.remove();CUI.openCollection();};
}

// ---------- экран 3: сборщик колоды ----------
CUI.openDeck=function(){
  if(Chance.stage()<4)return CUI.openCollection();
  let deck=Chance.deck().slice(),f='all';const u=ui();
  const el=layer('cu-deck',`<div class="cu-panel"><header class="cu-phead"><span class="ev-badge"><img src="${IC}crate.png" alt=""></span><h2>Колода</h2><button class="cu-x" aria-label="Закрыть">✕</button></header>
    <div class="cu-slots"></div><p class="cu-deckmsg"></p><div class="cu-fwrap"></div><div class="cu-grid"></div>
    <footer class="cu-pfoot two"><button class="sec" id="cuRec">Рекомендованная</button><button class="ok" id="cuSave">Сохранить</button></footer></div>`);
  ['cuRec','cuSave'].forEach(id=>enamelButton($(id)));
  const msg=el.querySelector('.cu-deckmsg');
  const draw=note=>{
    el.querySelector('.cu-slots').innerHTML=Array.from({length:Chance.DECK_SIZE},(_,i)=>{const c=deck[i]&&byId(deck[i]);
      return c?`<button class="cu-slot r-${c.r}" data-i="${i}" aria-label="Убрать ${c.title}">${cardHTML(c,'cu-mini')}${badB(c)?'<span class="cu-risk">минус</span>':''}</button>`:`<button class="cu-slot empty" data-i="${i}"><span>+</span></button>`;}).join('');
    const risky=deck.map(byId).filter(c=>c&&badB(c));
    msg.className='cu-deckmsg'+(note?' err':risky.length?' warn':'');
    msg.innerHTML=note||(risky.length?`Рискованных карт: ${risky.length}. У них есть настоящий минус — ${risky.map(c=>`«${c.title}»: ${c.B}`).join('; ')}.`:
      !u.deckTip?'<b>Замени одну карту:</b> тапни карту в колоде, чтобы убрать, и выбери новую ниже.':`Колода: ${deck.length} из ${Chance.DECK_SIZE}`);
    el.querySelector('.cu-fwrap').innerHTML=filters(f);
    el.querySelector('.cu-grid').innerHTML=collectionGrid(f,{deck});
    el.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{f=b.dataset.f;draw();});
    el.querySelectorAll('.cu-slot').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(deck[i]){deck.splice(i,1);draw();}});
    el.querySelectorAll('.cu-cell[data-id]').forEach(b=>b.onclick=()=>{const id=b.dataset.id,c=byId(id);ui().seen[id]=true;delete ui().fresh[id];
      if(deck.length>=Chance.DECK_SIZE)return draw('Колода полная — сначала убери карту сверху.');
      const test=deck.concat(id);const n=test.filter(x=>x===id).length,col=Chance.collection();
      if(n>Math.min(2,col[id]||0))return draw(col[id]<2?`«${c.title}» у тебя одна — второй копии нет.`:'Не больше 2 копий одной карты.');
      if(c.r==='gold'&&test.filter(x=>byId(x).r==='gold').length>2)return draw('Золотых — не больше двух.');
      deck.push(id);
      const slot=el.querySelectorAll('.cu-slot')[deck.length-1];draw();
      const s2=el.querySelectorAll('.cu-slot')[deck.length-1];
      if(s2&&!reduced())s2.animate([{transform:'translateY(40px) scale(.6)',opacity:0},{transform:'translateY(-6px) scale(1.08)',opacity:1,offset:.7},{transform:'none'}],{duration:300,easing:'cubic-bezier(.34,1.56,.64,1)'});
      snd('ui');});
  };
  draw();
  if(!u.deckTip&&!reduced()){const first=el.querySelector('.cu-slot');first&&first.classList.add('cu-coach');}
  $('cuRec').onclick=()=>{deck=Chance.recommendedDeck().slice();draw();};
  $('cuSave').onclick=()=>{const err=Chance.setDeck(deck);if(err)return draw(err);u.deckTip=true;save();toast('Колода сохранена');el.remove();};
  el.querySelector('.cu-x').onclick=()=>el.remove();
  return el;
};

// ---------- экран 4: значки активных эффектов в шапке ----------
const FXICON={buy:img(IC+'percent.png'),sell:SVG.up,freeze:SVG.freeze,alibi:SVG.star,sure:SVG.star,double:SVG.x2};
function renderFx(){
  const top=document.getElementById('top');if(!top||!S)return;
  let box=document.getElementById('chanceFx');
  const list=Chance.active();
  if(!list.length){if(box)box.remove();return;}
  if(!box){box=document.createElement('div');box.id='chanceFx';box.setAttribute('aria-label','Эффекты «Шанса»');top.append(box);}
  const html=list.map(a=>`<span class="cu-fx fx-${a.id}" title="${a.text}"><i>${FXICON[a.id]||SVG.star}</i><b>${a.text}</b>${a.laps?`<em>${a.laps} ${a.laps===1?'круг':'круга'}</em>`:a.count>1?`<em>×${a.count}</em>`:''}</span>`).join('');
  if(box.dataset.h!==html){const fresh=box.dataset.h!==undefined&&html.length>(box.dataset.h||'').length;box.innerHTML=html;box.dataset.h=html;
    if(fresh&&!reduced())box.lastElementChild?.animate([{transform:'scale(.4)',opacity:0},{transform:'scale(1.15)',opacity:1,offset:.7},{transform:'none'}],{duration:320,easing:'cubic-bezier(.34,1.56,.64,1)'});}
}
const baseRender=render;render=function(){const r=baseRender.apply(this,arguments);try{renderFx();}catch(e){}return r;};

// После карты этапа 3 — раскрытие коллекции; отметка «увидел» для новой карты.
const basePlay=Chance.play;
Chance.play=async function(){const r=await basePlay.apply(this,arguments);try{if(r&&r.card)ui().seen[r.card.id]=ui().seen[r.card.id]||false;collectionReveal();}catch(e){}return r;};
// chancePlay вызывается напрямую из map1.js — оборачиваем и его, если доступно.
if(typeof chancePlay==='function'){const bp=chancePlay;chancePlay=async function(){const r=await bp.apply(this,arguments);try{collectionReveal();}catch(e){}return r;};}

// Вход в коллекцию и колоду: значок-карта в шапке с этапа 3.
function renderEntry(){
  const top=document.getElementById('top');if(!top||!S)return;
  let b=document.getElementById('chanceDeckBtn');
  if(Chance.stage()<3||!ui().revealed){if(b)b.remove();return;}
  if(!b){b=document.createElement('button');b.id='chanceDeckBtn';b.type='button';b.setAttribute('aria-label','Карты «Шанса»');
    b.innerHTML=`<span class="cu-deckicon"></span><small>${Chance.stage()>=4?'Колода':'Карты'}</small>`;b.onclick=()=>Chance.stage()>=4?CUI.openDeck():CUI.openCollection();document.getElementById('stage').append(b);}
}
const baseRender2=render;render=function(){const r=baseRender2.apply(this,arguments);try{renderEntry();}catch(e){}return r;};

// Тест в настройках: рядом со строкой этапов — коллекция, колода, раскрытие.
new MutationObserver(()=>{const box=document.getElementById('chTest');if(!box||document.getElementById('cuTestColl'))return;
  const row=document.createElement('div');row.className='cu-testrow';
  row.innerHTML=`<button class="sec" id="cuTestColl">Коллекция</button><button class="sec" id="cuTestDeck">Колода</button><button class="sec" id="cuTestRev">Раскрытие</button><button class="sec" id="cuTestReset">Сброс заставок</button>`;
  box.after(row);
  $('cuTestColl').onclick=()=>{closeModal();setTimeout(()=>CUI.openCollection(),150);};
  $('cuTestDeck').onclick=()=>{closeModal();setTimeout(()=>CUI.openDeck(),150);};
  $('cuTestRev').onclick=()=>{ui().revealed=false;closeModal();setTimeout(()=>collectionReveal(),150);};
  $('cuTestReset').onclick=()=>{S.chanceUI=null;save();toast('Заставки «Шанса» сброшены');};
}).observe($('card'),{childList:true,subtree:true});

// Хук механики: карта впервые попала в коллекцию. Одиночная награда — тост,
// пачка при вводе этапа — без шума (её покажет раскрытие коллекции).
if(Chance.onCardAdded)Chance.onCardAdded(d=>{const ids=(d&&d.ids)||[];if(!S||!ids.length)return;const u=ui();
  ids.forEach(id=>u.fresh[id]=true);save();
  if(ids.length===1){const c=byId(ids[0]);if(c)toast(`🎴 Новая карта: «${c.title}» · ${RWORD[c.r].toLowerCase()}`,2600);}
  try{renderEntry();}catch(e){}});
window.ChanceUI=CUI;
})();
