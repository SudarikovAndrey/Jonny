// ===== Карты «Шанс»: коллекция, колода, вращение, эффекты (прототип механики) =====
// Дизайн: черновики/америкэн-бой-шансы.md (бэклог §5-1…§8, ob-coll, ob-l4).
// Модель ценности: черновики/модели/америкэн-бой-карты/chance_ev.py.
// Интерфейс рисует чат «Американ Интерфейс»: здесь только данные, правила и
// временное функциональное окно. API — window.Chance (внизу файла).
//
// Честность (§5-2): обе стороны карты видны, тормозной путь случаен, выпадает та
// сторона, что реально остановилась лицом к игроку. Результат не подменяется.
var CHANCE_RARITY={
  grey:  {name:'Серая',      deg:360,jitter:.15,color:'#9a9a90'},
  blue:  {name:'Синяя',      deg:540,jitter:.15,color:'#4a7ea8'},
  purple:{name:'Фиолетовая', deg:720,jitter:.20,color:'#7a4fa0'},
  gold:  {name:'Золотая',    deg:900,jitter:.20,color:'#d9a72f'},
};
// L — прибыль игрока за круг (продажи точек + сборы бизнесов): суммы карт считаются
// от неё, поэтому карта одинаково ощутима на Мейн-стрит и в Бруклине.
function chanceL(){
  const k=myKiosks().reduce((a,t)=>a+Math.min(t.goods||0,sales(t))*Math.max(0,sellPrice(t.good)-buyPrice(t.good)),0);
  const b=S.tiles.filter(t=>t.type==='biz'&&t.owner&&unlocked(t)).reduce((a,t)=>a+fee(t),0);
  return Math.max(30,Math.round((k+b)/5)*5);
}
const chanceMine=()=>myKiosks();
function chanceSell(share,mult){let units=0,cash=0;
  for(const t of chanceMine()){const n=Math.round((t.goods||0)*share);if(n<=0)continue;t.goods-=n;units+=n;cash+=Math.round(n*sellPrice(t.good)*mult);}
  S.cash+=cash;S.stat.earned+=cash;S.stat.sold=(S.stat.sold||0)+units;S.dstat.sold=(S.dstat.sold||0)+units;qProg('sell',units);qProg('earn',cash);
  return {units,cash};}
function chanceCash(m){m=Math.round(m);S.cash+=m;if(m>0){S.stat.earned+=m;qProg('earn',m);}return m;}
function chanceFx(){const c=chanceState();return c.fx;}

// Библиотека: 16 карт. apply(side, k) — k = 2 для «Двойной». Возвращает текст исхода.
var CHANCE_LIB=[
  {id:'stash',r:'grey',title:'Заначка',A:'+1 круг денег',B:'+⅓ круга денег',
    apply:(s,k)=>{const m=chanceCash(chanceL()*(s==='A'?1:1/3)*k);return `Нашёл заначку: +$${m}`;}},
  {id:'coffee',r:'grey',title:'Кофе на вынос',A:'+3 хода',B:'+1 ход',
    apply:(s,k)=>{const n=(s==='A'?3:1)*k;S.rolls+=n;return `Кофе бодрит: +${n} ${n===1?'ход':'хода'}`;}},
  {id:'wholesale',r:'grey',title:'Оптовик',A:'скупит 25% товара ×1,3',B:'скупит 10% ×1,2',
    apply:(s,k)=>{const r=chanceSell(Math.min(1,(s==='A'?.25:.10)*k),s==='A'?1.3:1.2);return r.units?`Оптовик забрал ${r.units} шт. за $${r.cash}`:'Оптовик зашёл, но товара нет';}},
  {id:'cab',r:'grey',title:'Такси до склада',A:'сразу на ближайший склад',B:'закупка −10% на круг',
    apply:async(s,k)=>{if(s==='B'){chanceFx().buy={mult:1-.1*k,laps:1};return `Закупка −${10*k}% до конца круга`;}
      for(let d=1;d<40;d++){const i=(S.pos+d)%40,t=S.tiles[i];if(t.type==='wh'&&unlocked(t)){await step(S.pos,i,CFG.MOVE_MS*3,'one');S.pos=i;render();setTimeout(()=>{if($('modal').hidden)shop();},350);return 'Такси довезло до склада';}}
      return 'Складов нет — такси уехало';}},
  {id:'freegoods',r:'blue',title:'Бесплатная партия',A:'заполнить все точки даром',B:'пусто',
    apply:(s,k)=>{if(s==='B')return 'Фура заблудилась. Пусто';let n=0;for(const t of chanceMine()){n+=Math.max(0,cap(t)-t.goods);t.goods=cap(t);}return `Все точки заполнены даром: +${n} шт.`;}},
  {id:'grant',r:'blue',title:'Грант',A:'бесплатная прокачка точки',B:'пусто',
    apply:(s,k)=>{if(s==='B')return 'Грант ушёл другому. Пусто';let done=0;for(let j=0;j<k;j++){const c=chanceMine().filter(t=>kioskNextStat(t)).sort((a,b)=>kioskLvl(a)-kioskLvl(b))[0];
      if(!c)break;if(kioskNextStat(c)==='cap')c.capLvl++;else{c.salesLvl++;c.capLvl=c.salesLvl;}done++;}return done?`Грант: точка прокачана даром${done>1?' ×'+done:''}`:'Все точки на пределе';}},
  {id:'supplier',r:'blue',title:'Скидка поставщика',A:'закупка −30% на 2 круга',B:'пусто',
    apply:(s,k)=>{if(s==='B')return 'Поставщик передумал. Пусто';chanceFx().buy={mult:Math.max(.2,1-.3*k),laps:2};return `Закупка −${Math.round(30*k)}% на 2 круга`;}},
  {id:'collector',r:'blue',title:'Инкассатор',A:'инкассатор снова раскидает находки',B:'пусто',
    apply:async(s,k)=>{if(s==='B')return 'Инкассатор проехал мимо. Пусто';for(let j=0;j<k;j++)await scatter();return 'Инкассатор раскидал находки';}},
  {id:'sellout',r:'purple',title:'Sell Out',A:'продать 75% товара ×1,5',B:'50% товара заморожено на круг',
    apply:(s,k)=>{if(s==='A'){const r=chanceSell(Math.min(1,.75*Math.min(k,1.33)),1.5*(k>1?1.25:1));return `Sell Out: ${r.units} шт. за $${r.cash}`;}
      let n=0;for(const t of chanceMine()){const f=Math.floor(t.goods*Math.min(1,.5*k));t.goods-=f;t.frozen=(t.frozen||0)+f;n+=f;}chanceFx().freezeLaps=1;return `Заморожено ${n} шт. до следующего круга`;}},
  {id:'reprice',r:'purple',title:'Ажиотаж',A:'маржа категории ×2 на 2 круга',B:'маржа ×0,5 на 2 круга',
    apply:(s,k)=>{const own=[...new Set(chanceMine().map(t=>t.good))];if(!own.length)return 'Торговать пока нечем';const g=own[Math.floor(Math.random()*own.length)];
      chanceFx().sell={good:g,category:good(g).cat||g,mult:s==='A'?1+k:Math.pow(.5,k),laps:2};return s==='A'?`Ажиотаж: ${good(g).name} продаётся с наценкой на 2 круга`:`Затоварка: ${good(g).name} дешевеет на 2 круга`;}},
  {id:'alibi',r:'purple',title:'Отмазка',A:'следующая полиция без наказания',B:'сразу в участок',
    apply:async(s,k)=>{if(s==='A'){chanceFx().alibi=(chanceFx().alibi||0)+k;return 'Отмазка в кармане: полиция отпустит';}for(let j=0;j<k;j++)await police();return 'Попался — в участок';}},
  {id:'sure',r:'purple',title:'Верняк',A:'следующая карта — только сторона A',B:'пусто',combo:true,
    apply:(s,k)=>{if(s==='B')return 'Не свезло. Пусто';chanceFx().nextSure=true;return 'Следующий «Шанс» — верняк';}},
  {id:'double',r:'purple',title:'Двойная',A:'следующая карта ×2 — плюс и минус',B:'пусто',combo:true,
    apply:(s,k)=>{if(s==='B')return 'Пусто';chanceFx().nextDouble=true;return 'Следующий «Шанс» — ×2';}},
  {id:'jackpot',r:'gold',title:'Джекпот',A:'+5 кругов денег',B:'в участок и двойной штраф',
    apply:async(s,k)=>{if(s==='A'){const m=chanceCash(chanceL()*5*k);return `ДЖЕКПОТ: +$${m}`;}await police(2*k);return 'Попался с поличным: в участок и двойной штраф';}},
  {id:'investor',r:'gold',title:'Инвестор',A:'самая дорогая свободная точка — даром',B:'теряешь самую дешёвую точку',
    apply:(s,k)=>{const free=S.tiles.filter(t=>t.type==='kiosk'&&!t.owner&&unlocked(t)).sort((a,b)=>b.price-a.price);const mine=chanceMine().sort((a,b)=>a.price-b.price);let out=[];
      for(let j=0;j<k;j++){if(s==='A'){const t=free.shift();if(!t)break;t.owner='you';t.goods=0;t.capLvl=1;t.salesLvl=1;out.push(pointName(t));}
        else{const t=mine.shift();if(!t||chanceMine().length<=1)break;t.owner=null;t.goods=0;t.capLvl=1;t.salesLvl=1;out.push(pointName(t));}}
      return out.length?(s==='A'?`Инвестор подарил: ${out.join(', ')}`:`Пришлось отдать: ${out.join(', ')}`):'Ничего не изменилось';}},
  {id:'credit',r:'gold',title:'Кредит',A:'долг погашен',B:'процент +2 п.п.',bankOnly:true,
    apply:(s,k)=>{if(!(S.loans||[]).length)return 'Долгов нет — повезло';if(s==='A'){S.loans=[];return 'Банк простил долг';}S.loans.forEach(l=>l.rate=(l.rate||0)+.02*k);return 'Процент по кредитам вырос';}},
];
const chanceCard=id=>CHANCE_LIB.find(c=>c.id===id);

// Этапы ввода (§8, ob-*): что в коллекции и как собирается колода.
var CHANCE_STAGES={
  1:{own:['stash','coffee','wholesale','cab'],copies:2,manual:false},
  2:{own:['stash','coffee','wholesale','cab','freegoods','grant','supplier','collector'],copies:1,manual:false},
  3:{own:['stash','coffee','wholesale','cab','freegoods','grant','supplier','collector'],copies:1,manual:false,reveal:true},
  4:{own:['stash','coffee','wholesale','cab','freegoods','grant','supplier','collector','sellout','reprice','alibi','sure','double'],copies:1,manual:true},
  5:{own:CHANCE_LIB.filter(c=>c.r!=='gold').map(c=>c.id),copies:1,manual:true},
};
const CHANCE_DECK_SIZE=8,CHANCE_MAX_COPIES=2,CHANCE_MAX_GOLD=2;
const CHANCE_EV={stash:.68,coffee:.60,wholesale:.55,cab:.55,freegoods:1,grant:.9,supplier:.8,collector:.75,sellout:1.15,reprice:.75,alibi:.6,sure:.7,double:.5,jackpot:1.75,investor:1,credit:.8};

function chanceStage(){return typeof MAP1!=='undefined'&&MAP1?1:(S.chanceStage||5);}
function chanceState(){
  if(!S.chance)S.chance={collection:{},deck:null,bag:[],fx:{},seen:{}};
  const c=S.chance,st=CHANCE_STAGES[chanceStage()];
  const added=[];
  for(const id of st.own)if(!c.collection[id]){c.collection[id]=st.copies;added.push(id);}
  if(added.length)setTimeout(()=>chanceEmitAdded(added),0); // после сохранения состояния, вне текущего рендера
  return c;
}
function chanceRecommended(){
  const stage=chanceStage(),st=CHANCE_STAGES[stage],c=chanceState();
  if(stage===1)return st.own.flatMap(id=>[id,id]);
  if(!st.manual)return st.own.slice();
  const pool=Object.keys(c.collection).filter(id=>chanceCard(id)&&!(chanceCard(id).bankOnly&&!S.tiles.some(t=>t.type==='bank')));
  // Рекомендованная колода — надёжная: без фиолетовых и золотых, по ценности «наугад».
  const safe=pool.filter(id=>['grey','blue'].includes(chanceCard(id).r)).sort((a,b)=>CHANCE_EV[b]-CHANCE_EV[a]);
  const deck=[];for(const id of safe)for(let k=0;k<Math.min(CHANCE_MAX_COPIES,c.collection[id]);k++)deck.push(id);
  let i=0;while(deck.length<CHANCE_DECK_SIZE&&safe.length){deck.push(safe[i%safe.length]);i++;}
  return deck.slice(0,CHANCE_DECK_SIZE);
}
function chanceDeckCheck(ids){
  if(!Array.isArray(ids)||ids.length!==CHANCE_DECK_SIZE)return `Нужно ровно ${CHANCE_DECK_SIZE} карт`;
  const c=chanceState(),n={};
  for(const id of ids){const card=chanceCard(id);if(!card)return `Нет карты ${id}`;n[id]=(n[id]||0)+1;
    if(n[id]>CHANCE_MAX_COPIES)return `Не больше ${CHANCE_MAX_COPIES} копий одной карты`;
    if(!c.collection[id])return `Карты «${card.title}» нет в коллекции`;
    if(n[id]>c.collection[id])return `Не хватает копий «${card.title}»`;
    if(card.bankOnly&&(chanceStage()<5||!S.tiles.some(t=>t.type==='bank')))return 'Кредит доступен только на карте с банком';
    if((card.r==='purple'&&chanceStage()<4)||(card.r==='gold'&&chanceStage()<5))return 'Эта редкость ещё не открыта';}
  if(ids.filter(id=>chanceCard(id).r==='gold').length>CHANCE_MAX_GOLD)return `Золотых — не больше ${CHANCE_MAX_GOLD}`;
  return null;
}
function chanceDeck(){const c=chanceState(),st=CHANCE_STAGES[chanceStage()];return st.manual&&c.deck&&!chanceDeckCheck(c.deck)?c.deck:chanceRecommended();}
// «Мешок»: каждая карта выходит один раз за цикл, потом колода перемешивается.
function chanceDraw(){
  const c=chanceState(),deck=chanceDeck(),key=chanceStage()+':'+deck.join(',');
  if(c.bagKey!==key){c.bag=[];c.bagKey=key;}
  if(!c.bag.length){c.bag=chanceDeck().slice();for(let i=c.bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[c.bag[i],c.bag[j]]=[c.bag[j],c.bag[i]];}}
  const id=c.bag.pop();return chanceCard(id);
}
function chanceSpinParams(card){const r=CHANCE_RARITY[card.r],fx=chanceFx();
  return {deg:r.deg,stopDeg:270,jitter:r.jitter,autoMs:6000,forced:fx.nextSure?'A':null,double:!!fx.nextDouble};}
function chanceRotor(p,random=Math.random){
  let angle=0,speed=p.deg,braking=false,elapsed=0,start=0,distance=0,duration=0;
  const side=()=>{const a=((angle%360)+360)%360;return a<90||a>=270?'A':'B';};
  return {
    get angle(){return angle;},get stopped(){return braking&&elapsed>=duration;},side,
    brake(){if(braking)return;distance=p.stopDeg*(1-p.jitter+random()*2*p.jitter);
      const end=((angle+distance)%360+360)%360;
      if(p.forced&&end>=90&&end<270)distance+=180;
      start=angle;duration=2*distance/speed;elapsed=0;braking=true;},
    advance(dt){if(!braking){angle+=speed*dt;return angle;}
      elapsed=Math.min(duration,elapsed+dt);const t=elapsed/duration;
      angle=start+distance*(2*t-t*t);return angle;}
  };
}
async function chanceResolve(card,side){
  card=chanceCard(card.id);
  if(!card||!['A','B'].includes(side))throw new Error('Invalid Chance result');
  const fx=chanceFx(),k=fx.nextDouble?2:1;
  // Consume the previous combo before applying this card, which can grant a new one.
  fx.nextDouble=false;fx.nextSure=false;
  const c=chanceState();c.seen[card.id]=(c.seen[card.id]||0)+1;
  const text=await card.apply(side,k);
  track('chance',{id:card.id,r:card.r,side,k,stage:chanceStage()});log(`🎴 ${card.title}: ${text}.`);save();render();
  return text;
}
function chanceActive(){const fx=chanceFx(),out=[];
  if(fx.buy&&fx.buy.laps>0)out.push({id:'buy',text:`Закупка ${fx.buy.mult<1?'−':'+'}${Math.round(Math.abs(1-fx.buy.mult)*100)}%`,laps:fx.buy.laps});
  if(fx.sell&&fx.sell.laps>0)out.push({id:'sell',text:`${good(fx.sell.good).name} ×${String(fx.sell.mult).replace('.',',')}`,laps:fx.sell.laps});
  if(fx.freezeLaps>0)out.push({id:'freeze',text:'Товар заморожен',laps:fx.freezeLaps});
  if(fx.alibi>0)out.push({id:'alibi',text:'Отмазка',count:fx.alibi});
  if(fx.nextSure)out.push({id:'sure',text:'Следующий — верняк'});
  if(fx.nextDouble)out.push({id:'double',text:'Следующий ×2'});
  return out;}

// Эффекты в экономике: цены закупки и продажи, заморозка, отмазка, счёт кругов.
(function(){
  const bBuy=buyPrice;buyPrice=function(g){const p=bBuy.apply(this,arguments),fx=S&&S.chance&&S.chance.fx;return fx&&fx.buy&&fx.buy.laps>0?Math.max(1,Math.round(p*fx.buy.mult)):p;};
  const bSell=sellPrice;sellPrice=function(g){const p=bSell.apply(this,arguments),fx=S&&S.chance&&S.chance.fx;if(!fx||!fx.sell||fx.sell.laps<=0)return p;const effect=fx.sell;
    if((effect.category||good(effect.good).cat||effect.good)!==(good(g).cat||g))return p;
    const cost=bBuy.call(this,g);return Math.max(1,Math.round(cost+(p-cost)*effect.mult));};
  const bLap=lapDone;lapDone=async function(){const r=await bLap.apply(this,arguments);const fx=S.chance&&S.chance.fx;if(!fx)return r;
    if(fx.buy&&fx.buy.laps>0)fx.buy.laps--;if(fx.sell&&fx.sell.laps>0)fx.sell.laps--;
    if(fx.freezeLaps>0&&--fx.freezeLaps===0){for(const t of myKiosks()){if(t.frozen){t.goods=Math.min(cap(t),t.goods+t.frozen);t.frozen=0;}}toast('Замороженный товар вернулся на полки');}
    save();render();return r;};
  const bPolice=police;police=async function(){const fx=S.chance&&S.chance.fx;if(fx&&fx.alibi>0){fx.alibi--;toast('Отмазка сработала — полиция отпустила');log('🎴 Отмазка: полиция отпустила без штрафа.');save();render();return;}return bPolice.apply(this,arguments);};
})();

// Временное функциональное окно: «Американ Интерфейс» заменит Chance.present.
async function chancePresentBasic(card){
  const p=chanceSpinParams(card),R=CHANCE_RARITY[card.r];let side=null;
  await modal(`<h2>🎴 Шанс</h2><div class="ch-rarity" style="--rc:${R.color}">${R.name}${p.double?' · ×2':''}${p.forced?' · верняк':''}</div>
    <div class="m1-spin" id="chSpin"><div class="m1-card3d ch-${card.r}" id="chCard" style="--rc:${R.color}"><div class="m1-face m1-front"><em>${card.title}</em><b>A</b><small>${card.A}</small></div><div class="m1-face m1-backside"><em>${card.title}</em><b>B</b><small>${card.B}</small></div></div></div>
    <p class="t" id="chHint" style="text-align:center">Выпадет сторона, что смотрит на тебя, когда карта остановится.</p><button class="ok m1-stop" id="chStop">Стоп!</button>`,
    [{t:'Забрать',v:1,cls:'ok',dis:true}],{},()=>setTimeout(()=>{
      const cardEl=$('chCard'),take=[...$('card').querySelectorAll('.mbtns button')].pop();if(!cardEl)return;
      let ang=0,last=performance.now(),stopping=false;const t0=last,rotor=chanceRotor(p);
      const stop=()=>{if(stopping)return;stopping=true;rotor.brake();const sb=$('chStop');if(sb)sb.disabled=true;};
      $('chSpin').onclick=stop;$('chStop').onclick=stop;
      const tick=now=>{if(!cardEl.isConnected)return;const dt=Math.max(0,(now-last)/1000);last=now;
        if(!stopping&&now-t0>p.autoMs)stop();
        ang=rotor.advance(dt);cardEl.style.transform=`rotateY(${ang}deg)`;
        if(rotor.stopped){side=rotor.side();cardEl.classList.add('stopped');
          $('chHint').textContent=`Сторона ${side}: ${card[side]}`;$('chStop')?.remove();if(take)take.disabled=false;return;}
        requestAnimationFrame(tick);};
      requestAnimationFrame(tick);
    },30));
  return side||(p.forced||'A');
}
let chancePending=null;
function chancePlay(){
  if(chancePending)return chancePending;
  const wasMoving=moving;moving=true;
  chancePending=(async()=>{const card=chanceDraw(),side=await Chance.present(card),text=await chanceResolve(card,side);
    toast(`🎴 ${text}`,2600);return {card,side,text};
  })().finally(()=>{chancePending=null;moving=wasMoving;render();});
  return chancePending;
}
// All maps use the same deck and presentation. M1 keeps its own landing hook.
const chanceBaseLand=land;land=function(t){if(t.type==='chance'&&unlocked(t))return (async()=>{
  S.landN=(S.landN||0)+1;if(t.drop)await collectDrop(t);return chancePlay();
})();return chanceBaseLand.apply(this,arguments);};

// Хук для интерфейса: карта впервые попала в коллекцию (этап ввода, позже — награды и сундуки).
// Событие 'chance:card-added' на window, detail {ids, stage}; подписка — Chance.onCardAdded(cb).
const chanceAddedCbs=[];
function chanceAddToCollection(id,n=1){const c=chanceState(),isNew=!c.collection[id];c.collection[id]=(c.collection[id]||0)+n;save();if(isNew)chanceEmitAdded([id]);return c.collection[id];}
function chanceEmitAdded(ids){const detail={ids,stage:chanceStage()};
  for(const cb of chanceAddedCbs)try{cb(detail);}catch(e){console.error(e);}
  try{window.dispatchEvent(new CustomEvent('chance:card-added',{detail}));}catch(e){}}
window.Chance={
  RARITY:CHANCE_RARITY,DECK_SIZE:CHANCE_DECK_SIZE,
  library:()=>CHANCE_LIB.map(({apply,...c})=>c),
  rarity:id=>CHANCE_RARITY[chanceCard(id).r],
  stage:chanceStage,collection:()=>({...chanceState().collection}),
  deck:chanceDeck,recommendedDeck:chanceRecommended,
  setDeck:ids=>{const e=chanceDeckCheck(ids);if(e)return e;chanceState().deck=ids.slice();chanceState().bag=[];save();return null;},
  draw:chanceDraw,spinParams:chanceSpinParams,rotor:chanceRotor,resolve:chanceResolve,active:chanceActive,
  present:chancePresentBasic, // интерфейс переопределяет: (card) => Promise<'A'|'B'>
  play:chancePlay,
  onCardAdded:cb=>{chanceAddedCbs.push(cb);return ()=>{const i=chanceAddedCbs.indexOf(cb);if(i>=0)chanceAddedCbs.splice(i,1);};},
  addToCollection:chanceAddToCollection, // выдача карты наградой: (id, n=1) → копий
};

// Тест в Бруклине: настройки → этап «Шанса» и «Сыграть карту «Шанс»».
new MutationObserver(()=>{const c=$('card');if(!c.querySelector('#iRolls')||c.querySelector('#chTest'))return;
  const box=document.createElement('div');box.id='chTest';box.className='ch-test';
  box.innerHTML=`<span>Шанс, этап</span>${[1,2,3,4,5].map(n=>`<button class="sec${chanceStage()===n?' on':''}" data-st="${n}">${n}</button>`).join('')}<button class="ok" id="chPlay">Сыграть «Шанс»</button>`;
  (c.querySelector('.mbtns')||c).before(box);
  box.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>{S.chanceStage=+b.dataset.st;S.chance=null;chanceState();save();box.querySelectorAll('[data-st]').forEach(x=>x.classList.toggle('on',x===b));});
  $('chPlay').onclick=()=>{closeModal();setTimeout(()=>chancePlay(),150);};
}).observe($('card'),{childList:true,subtree:true});
