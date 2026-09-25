// ===== Карта 1 «Мейн-стрит» — играбельный прототип (?map=1) =====
// Спек: черновики/америкэн-бой-карты-и-дерево.md §5; баланс: …-баланс-карты-1.md.
// Та же игра и то же поле, но: раскладка как у подложки района, две категории
// (напитки, сладости), лестница точки «+1 продажа и +4 места за уровень»,
// предел ур. 4, бизнесы без прокачки, серые «Шансы», нет дней, поставок, банка,
// такси, копилки и хулиганов. Карта закрывается тремя задачами, в конце —
// итоги, остаток денег в ходы и дерево развития (meta-tree.js).
// Своё сохранение (ключ americanboy_map1, см. tools/build_mobile.py).
var MAP1=new URLSearchParams(location.search).get('map')==='1';
if(MAP1){
document.body.classList.add('map-mode');
Object.assign(CFG,{START_CASH:600,REAL_DAYS:false});
CFG.KIOSK.showProfit=true;
const M1={rescue:50,levelCap:4,rollsStart:80,taskRolls:10,soldStep:50,soldBonus:100,soldBonusRolls:10,
  biz:{3:'Мотель «Motor Court»',8:'Прачечная',17:'Кинотеатр «Рокси»',23:'Закусочная у трассы',32:'Автомастерская',37:'Бензоколонка'},
  chance:[{p:.5,cash:30,text:'Нашёл заначку в старом пиджаке'},{p:.5,cash:15,text:'Сосед вернул долг'}],
  formats:{cola:['Тележка колы','Ларёк колы','Киоск колы','Магазинчик напитков'],gum:['Лоток жвачки','Прилавок сладостей','Киоск сладостей','Магазинчик сладостей']}};
CFG.BIZ_NAMES=M1.biz;
const M1_TASKS=[
  {id:'buy',text:n=>`Купи ${n} точек`,goal:12,val:()=>myKiosks().length},
  {id:'lvl',text:n=>`${n} точки до ур. 3`,goal:3,val:()=>myKiosks().filter(t=>t.salesLvl>=3).length},
  {id:'sold',text:n=>`Продай ${n} шт.`,goal:200,val:()=>S.stat.sold||0},
];

// Поле: номера клеток Бруклина, как у подложки (design/районы/01-мейн-стрит.md).
buildTiles=function(){
  const biz=new Set([3,8,17,23,32,37]),wh=new Set([6,10,19,24,30,34]),ch=new Set([5,20,25]);
  const r10=(a,b)=>Math.round((a+Math.random()*(b-a))/10)*10;let k=0;const t=[];
  for(let i=0;i<40;i++){
    const o={i,type:'kiosk',zone:0,owner:null,level:0,capLvl:1,salesLvl:1,goods:0,tier:1};
    if(i===0)o.type='home';
    else if(wh.has(i)){o.type='wh';o.zone=-1;}
    else if(ch.has(i)){o.type='chance';o.zone=-1;}
    else if(i===15){o.type='police';o.zone=-1;}
    else if(i===35){o.type='scatter';o.zone=-1;}
    else if(biz.has(i)){o.type='biz';o.price=r10(150,250);o.price0=o.price;}
    else{const g=k++%2===0?'cola':'gum';o.good=g;o.base=g;o.price=g==='cola'?r10(40,60):r10(20,40);o.price0=o.price;}
    t.push(o);
  }
  return t;
};

// Лестница точки: +1 продажа и +4 места за уровень; цена — прирост прибыли ×
// окупаемость 6 кругов ×1,03 за уровень (модели/америкэн-бой-карты/economy.py).
const m1Base=G=>2+(G-1);
sales=function(t){return salesBoost(m1Base(t.salesLvl));};
cap=function(t){return 4*m1Base(t.salesLvl);};
salesCost=function(t){const m=Math.max(1,good(t.good).sell-good(t.good).buy);return Math.max(5,Math.round(m*6*Math.pow(1.03,t.salesLvl-1)/5)*5);};
kioskLvl=t=>t.salesLvl;
kioskMaxLvl=()=>M1.levelCap;
kioskNextStat=t=>t.salesLvl<M1.levelCap?'sales':null;
kioskUpCost=t=>kioskNextStat(t)?salesCost(t):0;
kioskAfter=t=>kioskNextStat(t)?{cap:4*m1Base(t.salesLvl+1),sales:salesBoost(m1Base(t.salesLvl+1))}:null;
kioskLevelsNormalize=function(){if(!S||!S.tiles)return;for(const t of S.tiles)if(t.type==='kiosk'&&t.owner)t.capLvl=t.salesLvl;};
function kioskStageName(t){const f=M1.formats[t.base||t.good]||['Точка'];return f[Math.min(f.length-1,Math.floor((t.salesLvl-1)/4))];}
pointName=kioskStageName;
evolveState=()=>'max';

// Бизнесы на первой карте не качаются: вместо кнопок — пояснение.
new MutationObserver(()=>{const c=$('card'),up=c.querySelector('#bUp');if(!up||c.querySelector('.m1-bizlock'))return;
  const two=up.closest('.two');if(!two)return;const note=document.createElement('p');note.className='m1-bizlock';
  note.textContent='Самозанятый. Прокачка бизнеса откроется на следующей карте — в дереве развития.';two.replaceWith(note);
  c.querySelector('.hintline')?.remove();
}).observe($('card'),{childList:true,subtree:true});

// Новая партия: без учебного круга Бруклина, дневных заданий и стартовых наград.
const m1BaseNew=newGame;
newGame=function(){const r=m1BaseNew.apply(this,arguments);
  S.firstRoute={variant:0,index:0,done:true};S.training={shipped:true,explained:true,skipped:true};S.starter.closed=true;
  S.q=[];S.rolls=M1.rollsStart;S.opened=[true,true,true];S.map1={done:{},soldPaid:0,ended:false};S.tips.intro=true;
  log('Джонни на Мейн-стрит. В кармане $'+S.cash+'. Задачи карты — в строке сверху.');save();render();return r;};
intro=async function(){await modal(`<h2>🛣 Мейн-стрит</h2><p class="t">Городок у трассы. Здесь Джонни учится торговать.</p>
  <p>Покупай точки, закупай товар на складе — на Старте он продаётся сам. Бизнесы платят за каждый проход.</p>
  <p><b>Задачи карты:</b> купи 12 точек · прокачай 3 точки до ур. 3 · продай 200 шт.</p>`,[{t:'Поехали',v:1,cls:'ok'}]);};

const m1BaseLand=land;
// «Шанс» на карте 1 — система карт (web/chance-system.js), этап 1: только серые.
land=async function(t){if(t.type==='chance'){S.landN=(S.landN||0)+1;if(t.drop)await collectDrop(t);await chancePlay();return;}return m1BaseLand.apply(this,arguments);};

// Задачи карты: строка под ресурсами, награды, премии за продажи, конец карты.
function m1Tasks(){return M1_TASKS.map(q=>({...q,v:Math.min(q.goal,q.val()),ok:q.val()>=q.goal}));}
function m1RenderTasks(){
  const row=$('qrow');if(!row)return;let box=$('m1Tasks');
  if(!box){box=document.createElement('div');box.id='m1Tasks';row.append(box);}
  box.innerHTML=m1Tasks().map(q=>`<span class="qchip m1-task${q.ok?' ok':''}"><b>${q.ok?'✓':q.v+'/'+q.goal}</b><span>${q.text(q.goal)}</span><i style="--p:${Math.round(q.v/q.goal*100)}%"></i></span>`).join('');
}
function m1Progress(){
  if(!S.map1)return;const st=S.map1;
  for(const q of m1Tasks())if(q.ok&&!st.done[q.id]){st.done[q.id]=true;S.rolls+=M1.taskRolls;toast(`✓ ${q.text(q.goal)} — +${M1.taskRolls} ходов`,2600);track('map_task',{map:1,task:q.id});}
  const steps=Math.min(3,Math.floor((S.stat.sold||0)/M1.soldStep));
  while(st.soldPaid<steps){st.soldPaid++;S.cash+=M1.soldBonus;S.rolls+=M1.soldBonusRolls;toast(`Продано ${st.soldPaid*M1.soldStep} шт. — премия $${M1.soldBonus} и +${M1.soldBonusRolls} ходов`,2600);track('map_bonus',{map:1,sold:st.soldPaid*M1.soldStep});}
  // Ловушка бедности (модель: ~1% партий, автопрогон 25.09): товара нет, денег на закупку нет.
  // Только совет, без денег — по §12 помощь не исправляет решения игрока.
  const mine=myKiosks(),stock=mine.reduce((a,t)=>a+t.goods,0);
  // Решение 25.09: на первой карте один раз помогаем деньгами — карта обучающая и прощает ошибки.
  if(mine.length&&!stock&&S.cash<Math.min(...mine.map(t=>buyPrice(t.good)))*4&&$('modal').hidden&&!moving&&!st.rescued){
    st.rescued=true;S.cash+=M1.rescue;track('map_rescue',{map:1,cash:M1.rescue});fly('💵',AT.cash(),AT.cash(),4,{pulse:'sCash'});save();
    setTimeout(()=>modal(`<h2>🤝 Джонни подкинул</h2><div class="ev-prize">$+${M1.rescue}</div><p class="t">Товар кончился, а на закупку не хватает. Вот на первую партию.</p><p>Вези деньги на склад: без товара точки не продают. Прокачка подождёт.</p>`,[{t:'Спасибо, Джонни',v:1,cls:'ok'}]),200);}
  if(!st.ended&&m1Tasks().every(q=>q.ok)&&!moving&&$('modal').hidden){st.ended=true;save();setTimeout(()=>mapEndFlow(1),600);}
}
renderHubGoal=function(){
  const el=$('bHub');if(!el||!S)return;const ts=m1Tasks(),n=ts.filter(q=>q.ok).length;
  el.innerHTML=`${HUB_TICKET}<span class="hub-goal"><span class="hub-row"><b>${n}<small>/3</small></b><span class="hub-place">карта 1</span></span>
    <span class="hub-bar"><i style="width:${Math.round(ts.reduce((a,q)=>a+q.v/q.goal,0)/3*100)}%"></i></span>
    <span class="hub-row hub-meta"><em>Мейн-стрит · задачи</em></span></span>`;
  el.classList.add('hub-goal-chip');el.classList.remove('okc');
};
(function(){const base=render;render=function(){const r=base.apply(this,arguments);try{m1RenderTasks();m1Progress();}catch(e){console.error(e);}return r;};})();
$('bHub').onclick=async()=>{if(moving)return;const ts=m1Tasks();
  await modal(`<h2>🛣 Мейн-стрит · задачи</h2>${ts.map(q=>`<div class="row"><span class="n">${q.ok?'✓ ':''}${q.text(q.goal)}</span><span class="v">${q.v}/${q.goal}</span></div>`).join('')}<p>За каждую задачу +${M1.taskRolls} ходов, за каждые ${M1.soldStep} проданных — премия $${M1.soldBonus}.</p>`,[{t:'Ок',v:1}]);};

// Конец карты: после дерева — сыграть карту заново (карт 2–4 в прототипе нет).
const m1BaseTree=treeScreen;
treeScreen=function(mapNo){m1BaseTree(mapNo);const go=$('treeGo');if(!go||go.disabled)return;
  go.textContent='Сыграть карту 1 заново';go.onclick=()=>{closeModal();const meta=S.meta;newGame();S.meta=meta;save();render();};};
}
