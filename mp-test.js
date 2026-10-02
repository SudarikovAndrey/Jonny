// ===== Тестовый стол мультиплеера (?test=1): боты и панель механик =====
// Решение продюсера 02.10: «чтоб тестировать можно было без противников, осмотреть всё, не привлекая людей других».
// Подключается только из web/mp.html при ?test=1 (после web/mp.js); у живых столов этого кода нет.
//
// Боты живут внутри страницы хозяина стола как ещё одни клиенты (свой pid, hello/ping/state/end через hub.handle).
// Ход бота считается в фоне, «в закрытую» (решение продюсера 02.10): без окон и без Джонни хозяина — срез бота
// на миг подставляется вместо S, решения считаются теми же формулами движка (цены стройки, продажи, рента, штрафы,
// автомат), потом срез уходит хозяину стола как обычный пакет хода. На экране хозяина — только то, что видно при ходе
// живого соперника: фишка бота, плакат хода, плашки событий. «Авто-ход за меня» — свой ход играет видимый драйвер окон.
(function(){
'use strict';
if(!window.__MP)return;
const H=window.__MP,C=H.C;
const NAMES=['Саня-бот','Макс-бот','Вася-бот'];
const bots=new Map();                 // pid → {pid,name,view,ping}
const trace=[];                       // последние решения драйвера окон — для отладки в консоли (MPBots.trace)
let acting=null,heldView=null,heldNow=0,speed=1,force=null,hostPid=null,pendingT=0,clickBusy=false,lastTitle='',sameCount=0,keepAlive=0,autoMe=false,busy=false;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const dly=ms=>speed>=99?30:Math.round(ms/speed);
const rnd=p=>Math.random()<p;
const clone=o=>JSON.parse(JSON.stringify(o));
function hubSend(pid,msg){if(H.hub)H.hub.handle(pid,clone(msg),m=>inbox(pid,m));}
function inbox(pid,m){const b=bots.get(pid);if(!b||!m)return;
  if(m.t==='view'){b.view=m.v;if(acting===pid)H.view=m.v;schedule();}
}
function addBot(){
  if(!H.hub){toast('Боты — только у хозяина стола');return false;}
  const v=H.view;if(!v||v.phase!=='lobby'){toast('Ботов сажают в лобби');return false;}
  if(bots.size>=3||v.players.length>=C.MAX_PLAYERS){toast('Мест нет');return false;}
  const i=bots.size+1,pid='bot'+i+Math.random().toString(36).slice(2,6),name=NAMES[i-1]||('Бот '+i);
  const b={pid,name,view:null};bots.set(pid,b);
  hubSend(pid,{t:'hello',pid,name});
  b.ping=setInterval(()=>hubSend(pid,{t:'ping'}),2500);
  toast(`🤖 ${name} сел за стол`,1800);return true;
}
function removeBots(){for(const b of bots.values()){clearInterval(b.ping);hubSend(b.pid,{t:'bye'});}bots.clear();}
function schedule(){
  if(acting||pendingT)return;
  if(busy)return;
  for(const b of bots.values()){const v=b.view;if(v&&v.phase==='play'&&v.turn&&v.turn.pid===b.pid&&!v.paused){pendingT=setTimeout(()=>{pendingT=0;botTurnHidden(b.pid);},dly(1500));return;}}
  // «Авто-ход за меня»: свой ход страница играет тем же драйвером — так партию можно прогнать до конца одному.
  const hv=H.view;if(autoMe&&hv&&hv.phase==='play'&&hv.turn&&hv.turn.pid===H.PID&&!hv.paused&&!$('onboard')){pendingT=setTimeout(()=>{pendingT=0;playTurn(H.PID);},dly(1200));}
}
setInterval(schedule,700);
// Сторож: сцена не ответила (вкладка в фоне) — снимаем флаг движения и закрываем окна, иначе стол встанет.
function unstick(){try{if(typeof moving!=='undefined')moving=false;}catch(e){}H.closeAll();const l=document.querySelector('.minigame-layer');if(l){try{l.remove();}catch(e){}}console.warn('bot: ход застрял, сторож снял движение');trace.push('сторож');}
async function settle(max=250){
  let quiet=0;   // окно клетки открывается через такт после остановки — ждём три тихих проверки подряд
  for(let i=0;i<max;i++){const m=$('modal');const calm=!(typeof moving!=='undefined'&&moving)&&(!m||m.hidden)&&!document.querySelector('.minigame-layer');quiet=calm?quiet+1:0;if(quiet>=4)return true;await wait(100);}
  return false;
}
async function playTurn(pid){
  const self=pid===H.PID,b=bots.get(pid);if((!b&&!self)||acting)return;const v=self?H.view:b.view;if(!v||v.phase!=='play'||v.turn.pid!==pid)return;
  acting=pid;hostPid=H.PID;const speed0=CFG.SPEED;lastTitle='';sameCount=0;
  // Пока страница ходит за бота, пульс хозяина идёт от имени бота — держим его «живым» руками.
  keepAlive=setInterval(()=>{try{const p=H.hub.T.players.find(x=>x.pid===hostPid);if(p)p.seenAt=Date.now();}catch(e){}},1000);
  const driver=setInterval(driveModals,150);
  try{
    if(!self){H.PID=pid;H.view=v;H.setTurn({mine:true,rolled:!!v.turn.rolled,landed:!!v.turn.landed});H.adopt(v);}
    if(speed>=99)CFG.SPEED=100;else if(speed>1)CFG.SPEED=speed;   // ≥100 — шаги фишки без анимации сцены (web/mobile-hooks.js step)
    await wait(dly(400));
    spins=0;
    if(!H.flags.rolled){try{await Promise.race([H.roll(),wait(speed>=99?15000:40000)]);}catch(e){console.warn('bot roll',e);}}
    if(!await settle(speed>=99?80:250))unstick();
    await act();
    if(!await settle(speed>=99?60:120))unstick();
    await wait(dly(400));
    if(acting===pid&&H.view&&H.view.phase==='play'&&H.view.turn.pid===pid)H.finishTurn();
    for(let i=0;i<80&&H.view&&H.view.phase==='play'&&H.view.turn.pid===pid;i++)await wait(100);   // окно долга закроет драйвер
  }catch(e){console.error('bot turn',e);}
  finally{
    clearInterval(driver);clearInterval(keepAlive);CFG.SPEED=speed0;
    H.closeAll();H.PID=hostPid;acting=null;
    if(heldView){const hv=heldView,hn=heldNow;heldView=null;try{H.onView(hv,hn);}catch(e){console.error(e);}}
    else if(self){try{H.onView(H.view,0);}catch(e){}}
    schedule();
  }
}
// Драйвер окон: отвечает за бота на любое окно по заголовку и подписям кнопок, с долей случайности.
function driveModals(){
  if(!acting||clickBusy)return;
  const layer=document.querySelector('.minigame-layer');
  if(layer){clickBusy=true;setTimeout(()=>{try{playMinigame(layer);}catch(e){H.closeMinigame();}setTimeout(()=>{clickBusy=false;},300);},dly(900));return;}
  const m=$('modal');if(!m||m.hidden)return;
  const card=$('card');if(!card)return;
  const head=card.querySelector('h2,h1,h3,.property-title,.card-title,[class*=title]');const title=((head||{}).innerText||card.innerText.split('\n')[0]||'').trim();
  if(title===lastTitle)sameCount++;else{lastTitle=title;sameCount=0;}
  const isHelp=b=>/^\?$|^\s*\?\s*$/.test(b.textContent.trim())||/help|hint|подсказ/i.test(b.className+' '+(b.getAttribute('aria-label')||''));
  // Кнопки карточек «Интерфейса» — не только <button>: варианты стройки и лицензии — div[role=button] (.sf-opt, .sf-lic-doc), .poor — не по карману.
  const btns=[...card.querySelectorAll('button,[role=button]')].filter(b=>!b.disabled&&!b.classList.contains('poor')&&!b.closest('[hidden]')&&getComputedStyle(b).display!=='none'&&b.getClientRects().length>0&&!isHelp(b));
  if(!btns.length)return;
  const pick=re=>btns.find(b=>re.test(b.textContent.trim()));
  const sec=()=>pick(/^(Закрыть|Уйти|Понял|Ок|Отмена|Передумал|Назад|Играть дальше|Хватит|Дальше|Потом|Нет|Пропустить|✕|×)/i)||btns.find(b=>b.classList.contains('sec')||b.classList.contains('xclose'));
  let b=null;
  if(sameCount>8)b=sec()||btns[btns.length-1];
  else if(/Ты в минусе/.test(title))b=pick(/^Взять/)||pick(/^Продать/)||pick(/Играть дальше/)||pick(/^Выставить/);
  else if(/хочет купить/.test(title))b=rnd(.35)?pick(/^Продать/):pick(/Отказать/);
  else if(/NYPD|участок/i.test(title))b=(S.cash>200&&rnd(.7)?pick(/^Заплатить/):null)||pick(/дубль/i)||pick(/Откупиться/);
  else if(/Шанс/.test(title))b=pick(/^Ок/);
  else if(btns.some(x=>x.classList.contains('sf-opt'))){const opts=btns.filter(x=>x.classList.contains('sf-opt')),lics=btns.filter(x=>x.classList.contains('sf-lic-doc'));
    b=(lics.length&&rnd(.15))?lics[0]:(opts.length&&rnd(.85))?(rnd(.7)?opts[0]:opts[Math.floor(Math.random()*opts.length)]):sec();}   // пустырь: стройка, чаще самое дешёвое; иногда лицензия
  else if(btns.some(x=>x.classList.contains('ok')&&/\d/.test(x.textContent)&&!/^(Заплатить|Взять|Продать|Ставка)/.test(x.textContent.trim()))){const oks=btns.filter(x=>x.classList.contains('ok')&&/\d/.test(x.textContent));b=oks.length&&rnd(.85)?(rnd(.7)?oks[0]:oks[Math.floor(Math.random()*oks.length)]):sec();}   // покупка с ценой: чаще самое дешёвое
  else{
    b=(rnd(.85)?pick(/^(Построить|Купить лицензию|Закупить|Затарить)|на все/i):null)||(rnd(.5)?pick(/^(Прокачать|Улучшить|Апгрейд)/i):null);
    if(!b&&rnd(.6)){const ok=card.querySelector('.buy-btn.buy-ok:not([disabled])');if(ok&&ok.offsetParent!==null)b=ok;}
    if(!b)b=sec()||btns[0];
  }
  if(!b)return;
  trace.push((acting||'').slice(0,5)+' «'+title.slice(0,24)+'» → '+b.textContent.trim().slice(0,24));if(trace.length>40)trace.shift();
  clickBusy=true;setTimeout(()=>{try{b.click();}catch(e){}setTimeout(()=>{clickBusy=false;},250);},dly(600));
}
// Мини-игра: автомат (iframe bandit/) — пара бесплатных прокруток и «Вернуться на игровое поле»; остальное — закрыть.
let spins=0;
function playMinigame(layer){
  const f=layer.querySelector('iframe');let d=null;try{d=f?f.contentDocument:null;}catch(e){}
  const root=d||layer;
  const main=d&&d.getElementById('bMain');
  if(main&&!main.disabled&&spins<3&&rnd(.75)){spins++;trace.push((acting||'').slice(0,5)+' автомат → крутить');main.click();return;}
  const b=[...root.querySelectorAll('button')].find(x=>!x.disabled&&/Вернуться на игровое поле|Закрыть|Выйти|Хватит|Готово|Забрать/i.test((x.textContent||'')+' '+(x.getAttribute('aria-label')||'')));
  trace.push((acting||'').slice(0,5)+' мини-игра → '+(b?(b.textContent.trim()||b.getAttribute('aria-label')||'').slice(0,20):'закрыть'));
  if(b)b.click();else H.closeMinigame();
}
// ===== Ход бота в фоне =====
const botLocal=(v,pid)=>v.tiles.map(t=>{const o=clone(t);if(o.owner===pid)o.owner='you';else if(o.owner){o.rival=o.owner;o.owner=null;}return o;});
const botShared=(tiles,pid)=>tiles.map(t=>{const o=Object.assign({},t);if(o.owner)o.owner=pid;else if(o.rival)o.owner=o.rival;else o.owner=null;delete o.rival;return o;});
const sliceOfBot=s=>{const o=clone(s);delete o.tiles;if(o.log&&o.log.length>30)o.log=o.log.slice(-30);return o;};
const pick=arr=>arr[Math.floor(Math.random()*arr.length)];
// Внутренности режима SF и мультиплеера живут в своих областях видимости — берём через window.SFBuilder и __MP.
const SFB=()=>window.SFBuilder;
const titleOf=t=>H.titleOf(t);
const catOpen=cat=>{const l=(SFB().licenses||[]).find(x=>x.cats.includes(cat));return !l||SFB().hasLic(l.id);};
const upCost=t=>typeof kioskUpCost==='function'?kioskUpCost(t):(t.salesLvl<salTab(t).length?salesCost(t):0)+(t.capLvl<capTab(t).length?Math.round(t.price*CFG.KIOSK.capUpMult*t.capLvl):0);
const canUp=t=>t.capLvl<capTab(t).length||t.salesLvl<salTab(t).length;
function fillGoods(t,share){const need=cap(t)-(t.goods||0);if(need<=0)return 0;const price=buyPrice(t.good),can=Math.floor(Math.max(0,S.cash*share)/price),n=Math.min(need,can);if(n<=0)return 0;S.cash-=n*price;t.goods=(t.goods||0)+n;return n;}
async function botTurnHidden(pid){
  const b=bots.get(pid);if(!b||busy||acting)return;const v=b.view;if(!v||v.phase!=='play'||v.turn.pid!==pid)return;
  busy=true;
  const S0=S,view0=H.view,pid0=H.PID,n=v.turn.n,players=v.players.length;
  const credits=[],evts=[],after=[];let seq=0,dice=null;
  const credit=(to,cash,extra)=>credits.push(Object.assign({id:`${pid}:${n}:b:${++seq}`,to,cash:Math.round(cash||0)},extra||{}));
  const emit=e=>evts.push(e);
  try{
    const s=clone(v.mine);s.tiles=botLocal(v,pid);S=s;H.view=v;H.PID=pid;    // тихая подмена, синхронно, без render
    // 1. Ответы на предложения о покупке своих клеток
    for(const t of S.tiles.filter(x=>x.owner&&x.mpOffer)){const o=t.mpOffer,inv=H.invested(t);
      if(o.amount>=inv*2||rnd(.35)){S.cash+=o.amount;credit(o.from,0,{escrow:-o.amount});t.mpPrem=o.amount-(inv-(t.mpPrem||0));t.owner=null;t.rival=o.from;delete t.mpOffer;
        emit({kind:'sale',text:`продал «${titleOf(t)}»`,amount:o.amount,tile:t.i,to:o.from});trace.push(b.name+': продал по предложению');}
      else{delete t.mpOffer;credit(o.from,o.amount,{escrow:-o.amount});emit({kind:'decline',text:`отказал в продаже «${titleOf(t)}»`,amount:null,tile:t.i,to:o.from});}}
    // 2. Бросок и движение
    const a=1+Math.floor(Math.random()*6),bb=1+Math.floor(Math.random()*6),sum=a+bb,dbl=a===bb;dice={a,b:bb};
    if(S.jail>0){if(dbl){S.jail=0;trace.push(b.name+': дубль — вышел из участка');}else{S.jail--;trace.push(b.name+': в участке, попыток '+S.jail);}}
    else{
      if(dbl){const c=H.dblCash(sum);S.cash+=c;emit({kind:'double',text:'выбросил дубль',amount:c,tile:S.pos});}
      const from=S.pos,to=(from+sum)%40;
      if(to<from)lapHidden({credit,emit});
      S.pos=to;landHidden(S.tiles[to],{credit,emit,v,after,bot:b});
    }
    // 3. Стратегия: предложения, выкуп, ставки, свой лот; приказ из панели
    strategyHidden({credit,emit,v,after,bot:b});
    // 4. Долг
    debtHidden({credit,emit,v,after,bot:b});
    S.mpLanded={n,i:S.pos};S.rolls=999;
  }catch(e){console.error('bot hidden',e);}
  finally{
    const slice=sliceOfBot(S),shared=botShared(S.tiles,pid);
    S=S0;H.view=view0;H.PID=pid0;
    for(const e of evts)hubSend(pid,{t:'evt',e});
    const pack={n,s:slice,tiles:shared,credits,rolled:true,landed:true,dice};
    hubSend(pid,{t:'state',pack});
    for(const m of after)hubSend(pid,m);                 // лоты, ставки, удары — после того, как стол принял клетки
    await wait(dly(1200));
    hubSend(pid,{t:'end',n,pack});
    busy=false;schedule();
  }
}
// Проход старта: продажи с точек по формулам режима, +$10 в кассу автомата, микрозайм — процент, круги в минусе.
function lapHidden({credit,emit}){
  S.laps=(S.laps||0)+1;let income=0,units=0;const mult=SFB()&&SFB().priceMult?SFB().priceMult():1;
  for(const t of myKiosks()){const k=Math.min(sales(t),t.goods||0);if(k<=0)continue;t.goods-=k;units+=k;income+=Math.round(k*H.sellOf(t.good)*mult);}
  if(income>0){S.cash+=income;S.stat.earned=(S.stat.earned||0)+income;emit({kind:'pass',text:'прошёл старт — продажи',amount:income,tile:0});}
  credit(null,0,{slot:10});
  for(const l of (S.loans||[]))if(l.micro){const i=Math.round(l.principal*l.rate);S.cash-=i;}
  if(S.cash<0)S.mpDebtLaps=(S.mpDebtLaps||0)+1;else S.mpDebtLaps=0;
}
function collectHidden(t,{credit,emit}){
  const d=t.drop;if(!d)return;let got=0;
  if(d.cash)got+=d.cash;if(d.rolls)got+=d.rolls*H.rollCash();if(d.hard)S.hard=(S.hard||0)+d.hard;
  if(got){S.cash+=got;emit({kind:'bonus',text:'подобрал находку',amount:got,tile:t.i});}
  t.drop=null;
}
function landHidden(t,ctx){
  const {credit,emit,v,after,bot}=ctx;if(!t)return;const n=v.turn.n;
  collectHidden(t,ctx);
  switch(t.type){
    case 'kiosk':{
      if(t.rival){rentHidden(t,ctx);break;}
      if(!t.owner){   // пустырь: строим, чаще дешёвое, иногда лицензию
        const cats=Object.keys(SFB().build||{}),open=cats.filter(c=>catOpen(c)&&S.cash>=SFB().price(c)).sort((x,y)=>SFB().price(x)-SFB().price(y));
        if(!open.length||!rnd(.85))break;
        if(rnd(.12)){const lic=(SFB().licenses||[]).find(l=>!SFB().hasLic(l.id)&&S.cash>=l.price*1.3);if(lic){S.sf=S.sf||{};S.sf.lic=S.sf.lic||{};S.sf.lic[lic.id]=true;S.cash-=lic.price;emit({kind:'license',text:`купил лицензию «${lic.name}»`,amount:-lic.price,tile:t.i});}}
        const cat=rnd(.7)?open[0]:pick(open),p=SFB().price(cat);if(S.cash<p)break;
        S.cash-=p;Object.assign(t,{owner:'you',good:cat,base:cat,lot:false,price:p,price0:p,capLvl:1,salesLvl:1,goods:0,tier:1,insp:false});delete t.mpPrem;
        S.stat.bought=(S.stat.bought||0)+1;
        emit({kind:'build',text:`построил «${titleOf(t)}»`,amount:-p,tile:t.i});trace.push(bot.name+': построил '+titleOf(t)+' за $'+p);
        fillGoods(t,.5);break;}
      // своя точка: прокачка (50%) и дозакупка
      if(rnd(.5)&&canUp(t)){const cost=upCost(t);if(S.cash>=cost){S.cash-=cost;if(t.capLvl<capTab(t).length)t.capLvl++;if(t.salesLvl<salTab(t).length)t.salesLvl++;emit({kind:'upgrade',text:`прокачал «${titleOf(t)}»`,amount:-cost,tile:t.i});}}
      fillGoods(t,.4);break;}
    case 'biz':{
      if(t.rival){rentHidden(t,ctx);break;}
      if(!t.owner&&rnd(.3)&&S.cash>=t.price*1.5){S.cash-=t.price;t.owner='you';t.level=t.level||1;emit({kind:'build',text:`купил бизнес «${titleOf(t)}»`,amount:-t.price,tile:t.i});trace.push(bot.name+': купил бизнес');}
      break;}
    case 'wh':for(const k of myKiosks())fillGoods(k,.35);break;
    case 'chance':chanceHidden(ctx);break;
    case 'police':{const fine=policeFine();
      if(S.cash>=fine&&rnd(.7)){S.cash-=fine;credit(null,0,{pot:fine});emit({kind:'fine',text:'заплатил полиции',amount:-fine,tile:t.i});}
      else{S.jail=CFG.POLICE.attempts;S.jailFine=0;emit({kind:'jail',text:'сел в участок',amount:null,tile:t.i});}break;}
    case 'slot':slotHidden(t,ctx);break;
    case 'pot':{const m=Math.round(v.pot||0);if(m>0){S.cash+=m;credit(null,0,{potTake:true});emit({kind:'minigame',text:'сорвал копилку',amount:m,tile:t.i});}break;}
    default:break;   // старт, банк, инкассатор, инспектор — бот не трогает
  }
}
function rentHidden(t,{credit,emit,v}){
  const n=v.turn.n;if(t.insp||(t.frozen&&t.frozen>n)||(S.mpShieldN&&n<=S.mpShieldN))return;
  const r=H.rentOf(t);if(r<=0)return;S.cash-=r;credit(t.rival,r,{rent:true});
  emit({kind:'rent',text:`заплатил ренту за «${titleOf(t)}»`,amount:-r,tile:t.i,to:t.rival});
}
// «Шанс» бота: денежные карты той же колоды плюс изредка пакость (сдвиг, пропуск хода) через удар стола.
function chanceHidden({credit,emit,v,after}){
  const rivals=v.players.filter(p=>p.pid!==H.PID),r=rnd;let text,amount=null;
  const roll=Math.random();
  if(roll<.2){amount=60;S.cash+=60;text='👟 Нашёл в старых кроссовках $60. Америка!';}
  else if(roll<.4){amount=-40;S.cash-=40;credit(null,0,{pot:40});text='🚗 Штраф за парковку $40 — в общую копилку.';}
  else if(roll<.55&&rivals.length){amount=30*rivals.length;S.cash+=amount;for(const p of rivals)credit(p.pid,-30);text='🎂 День рождения! Каждый соперник скидывается по $30.';}
  else if(roll<.7&&rivals.length){amount=-20*rivals.length;S.cash+=amount;for(const p of rivals)credit(p.pid,20);text='🍻 Проставился пацанам: по $20 каждому.';}
  else if(roll<.85&&rivals.length){const p=pick(rivals);after.push({t:'hit',h:{k:'move',to:p.pid,d:-3}});text=`🚧 Ремонт дороги: ${p.name} откатывается на 3 клетки назад.`;}
  else if(rivals.length){const p=pick(rivals);after.push({t:'hit',h:{k:'skip',to:p.pid}});text=`⏳ Очередь в ЖЭК: ${p.name} пропускает следующий ход.`;}
  else{amount=60;S.cash+=60;text='👟 Нашёл в старых кроссовках $60.';}
  emit({kind:'chance',text,amount,tile:S.pos});
}
// Автомат в фоне: бесплатные спины тем же движком и таблицей выплат; на поле — только результат.
function slotHidden(t,{credit,emit,v}){
  const E=window.SlotEngine;if(!E)return;
  const st={P:Math.max(0,Math.round(lapNet())),day:S.day||1,pot:Math.round(v.slotPot||0),rollCash:H.rollCash(),visits:1};
  let cash=0,potD=10,gem=0;
  for(let i=0;i<3;i++){const o=E.choose(Math.random),p=E.award(st,o,[]);
    if(o.id==='jackpot'){cash+=p.cash;gem+=p.gem;potD-=st.pot;st.pot=0;}
    else{cash+=p.cash;gem+=p.gem;potD+=Math.round(p.cash*.1);st.pot+=Math.round(p.cash*.1);}
    if(p.restock){for(const k of myKiosks()){k.goods=cap(k);if(p.restock==='one')break;}}}
  S.cash+=cash;S.hard=(S.hard||0)+gem;if(potD)credit(null,0,{slot:potD});
  emit({kind:'minigame',text:cash?'выиграл в автомате':'крутил автомат впустую',amount:cash||null,tile:t.i});
}
function strategyHidden({credit,emit,v,after,bot}){
  const t=S.tiles[S.pos],n=v.turn.n,f=force;force=null;
  const mine=S.tiles.filter(x=>x.owner&&(x.type==='kiosk'||x.type==='biz')&&!(typeof sfIsLot==='function'?sfIsLot(x):(!x.owner&&(x.lot||x.good==='lot')))&&!H.lotOn(x.i)).sort((a,b)=>H.invested(a)-H.invested(b));
  const rivalHere=H.isRival(t)&&!H.lotOn(t.i)&&!t.mpOffer;
  const offer=(tt,m)=>{const amount=Math.round(H.invested(tt)*m);if(S.cash<amount)return false;S.cash-=amount;S.mpEscrow=(S.mpEscrow||0)+amount;tt.mpOffer={from:H.PID,amount,mult:m,n};
    emit({kind:'offer',text:`предлагает $${amount} за «${titleOf(tt)}»`,amount:null,tile:tt.i,to:tt.rival});trace.push(bot.name+': предложил $'+amount);return true;};
  const buyout=tt=>{const amount=Math.round(H.invested(tt)*10),ready=(S.mpForceLap==null)||(S.laps||0)>=S.mpForceLap+2;if(!ready||S.cash<amount)return false;
    S.cash-=amount;credit(tt.rival,amount,{force:true,tile:tt.i});tt.mpPrem=amount-(H.invested(tt)-(tt.mpPrem||0));const who=tt.rival;tt.owner='you';delete tt.rival;delete tt.mpOffer;S.mpForceLap=S.laps||0;
    emit({kind:'sale',text:`выкупил «${titleOf(tt)}» за ×10`,amount:-amount,tile:tt.i,to:who});trace.push(bot.name+': выкуп ×10');return true;};
  if(f==='lot'){if(mine.length)after.push({t:'lot',tile:mine[0].i,min:Math.round(H.invested(mine[0])*1.5),kind:'sale'});else toast('🤖 У бота нет клеток для торгов');}
  else if(f==='offer'||f==='buy'){let r=rivalHere?t:S.tiles.find(x=>H.isRival(x)&&!H.lotOn(x.i)&&!x.mpOffer);
    if(!r)toast('🤖 Нет чужих клеток — боту нечего предлагать');else{if(S.pos!==r.i)S.pos=r.i;
      if(f==='offer'){if(S.cash<H.invested(r)*1.5)S.cash=Math.round(H.invested(r)*1.5)+50;offer(r,1.5);}
      else{S.cash=Math.max(S.cash,Math.round(H.invested(r)*10)+100);S.mpForceLap=null;buyout(r);}}}
  else{
    if(rivalHere){if(rnd(.05))buyout(t);else if(rnd(.2))offer(t,rnd(.5)?1.5:2);}
    for(const l of (v.lots||[])){if(l.seller===H.PID||l.bestBy===H.PID)continue;const next=l.best?Math.ceil(l.best*1.1/10)*10:l.min;if(S.cash>=next*1.5&&rnd(.5))after.push({t:'bid',id:l.id,amount:next});}
    if(rnd(.06)&&mine.length)after.push({t:'lot',tile:mine[0].i,min:Math.round(H.invested(mine[0])*1.5),kind:'sale'});
  }
}
function debtHidden({credit,emit,v,after,bot}){
  if(S.cash>=0)return;
  if(!(S.loans||[]).some(l=>l.micro)){const amt=Math.min(500,Math.max(100,Math.ceil((-S.cash+50)/50)*50));S.loans=S.loans||[];S.loans.push({tier:0,micro:true,name:'Микрозайм',principal:amt,rate:.25,strikes:0,maxStrikes:99});S.cash+=amt;emit({kind:'loan',text:`взял микрозайм $${amt}`,amount:amt,tile:S.pos});trace.push(bot.name+': микрозайм $'+amt);}
  if(S.cash<0){let v2=0;for(const k of myKiosks()){v2+=Math.round((k.goods||0)*buyPrice(k.good)*.5);k.goods=0;}if(v2>0){S.cash+=v2;emit({kind:'sale',text:`продал товар с точек за $${v2}`,amount:v2,tile:S.pos});}}
  if(S.cash<0&&(S.mpDebtLaps||0)>=2){let need=-S.cash;const mine=S.tiles.filter(x=>x.owner&&(x.type==='kiosk'||x.type==='biz')&&!(typeof sfIsLot==='function'?sfIsLot(x):(!x.owner&&(x.lot||x.good==='lot')))&&!H.lotOn(x.i)).sort((a,b)=>H.invested(a)-H.invested(b));
    for(const x of mine){if(need<=0)break;const inv=Math.round(H.invested(x));after.push({t:'lot',tile:x.i,min:inv,kind:'bankrupt',bank:Math.round(inv*.5)});need-=Math.round(inv*.5);}}
}

// Стратегия после остановки: предложения, выкуп, ставки на торгах, иногда свой лот. force — приказ из панели.
async function act(){
  const v=H.view;if(!v||v.turn.pid!==acting)return;
  const t=S.tiles[S.pos];
  // Окно клетки в партии открывается тапом по строке клетки над доком — бот «тапает» её, драйвер окон строит/прокачивает.
  const tb=$('tilebar');
  if(tb&&!tb.hidden&&tb.offsetParent&&!H.isRival(t)&&(t.type==='kiosk'||t.type==='biz')&&rnd(.9)){trace.push((acting||'').slice(0,5)+' строка клетки');tb.click();await wait(dly(500));await settle(speed>=99?60:150);}
  if(force){const f=force;force=null;await doForce(f,t);return;}
  if(H.isRival(t)&&!H.lotOn(t.i)){
    if(S.cash>H.invested(t)*10+100&&H.forceReady()&&rnd(.05))H.forceBuy(t);
    else if(rnd(.2)){const m=rnd(.5)?1.5:2;if(S.cash>=H.invested(t)*m)H.placeOffer(t,m);}
  }
  for(const l of (v.lots||[])){if(l.seller===acting||l.bestBy===acting)continue;const next=l.best?Math.ceil(l.best*1.1/10)*10:l.min;if(S.cash>=next*1.5&&rnd(.5))H.placeBid(l.id,next);}
  if(rnd(.06))listCheapest(1.5);
}
function myTiles(){return S.tiles.filter(x=>x.owner&&(x.type==='kiosk'||x.type==='biz')&&!(typeof sfIsLot==='function'&&sfIsLot(x))&&!H.lotOn(x.i));}
function listCheapest(mult){const mine=myTiles().sort((a,b)=>H.invested(a)-H.invested(b));if(!mine.length)return false;const x=mine[0];return H.startLot(x.i,Math.round(H.invested(x)*mult),'sale');}
async function doForce(f,t){
  if(f==='lot'){if(!listCheapest(1.5))toast('🤖 У бота нет клеток для торгов');return;}
  let r=H.isRival(t)?t:S.tiles.find(x=>H.isRival(x)&&!H.lotOn(x.i));
  if(!r){toast('🤖 Нет чужих клеток — бот не может предложить');return;}
  if(S.pos!==r.i){S.pos=r.i;save();render();}   // тест: бота переставляем на чужую клетку
  if(f==='offer'){if(S.cash<H.invested(r)*1.5)S.cash=Math.round(H.invested(r)*1.5)+50;H.placeOffer(r,1.5);}
  if(f==='buy'){S.cash=Math.max(S.cash,Math.round(H.invested(r)*10)+100);S.mpForceLap=null;H.forceBuy(r);}
}
window.MPBots={trace,add:addBot,clear:removeBots,acting:()=>!!acting,busy:()=>busy,instant:()=>!!acting&&speed>=99,list:()=>[...bots.values()].map(b=>({pid:b.pid,name:b.name})),
  holdHostView(v,now){heldView=v;heldNow=now;if(acting===H.PID)H.view=v;if(v&&v.phase!=='play'&&acting)unstick();},   // свой авто-ход: вид свежий, применим в конце; партия кончилась — ход бота обрываем
  get speed(){return speed;},set speed(x){speed=+x||1;},
  get force(){return force;},set force(f){force=f;},
  get autoMe(){return autoMe;},set autoMe(x){autoMe=!!x;schedule();},
};

// ---- панель механик ----
const CHANCE_LABELS={birthday:'🎂 День рождения',treat:'🍻 Проставился',raid:'🚔 Облава',mtv:'📺 Сюжет на MTV',complaint:'📋 Жалоба соседей',stash:'💰 Заначка общака',parking:'🚗 Штраф за парковку',sneakers:'👟 Кроссовки',robin:'🤑 Робин Гуд',roof:'🛡 Крыша',roadwork:'🚧 Ремонт дороги',snitch:'🚔 Донос',queue:'⏳ Очередь в ЖЭК',blackout:'❄️ Отключили свет'};
const css=document.createElement('style');css.textContent=`
.mp-test{position:fixed;left:8px;top:110px;z-index:10000;background:#f7ecd2;color:#2a221a;font:600 12px/1.3 system-ui,sans-serif;border:2px solid #7a5a2a;border-radius:8px;max-width:232px;box-shadow:0 4px 14px #0006}
.mp-test summary{cursor:pointer;padding:5px 8px;list-style:none}.mp-test summary::-webkit-details-marker{display:none}
.mp-test-body{padding:4px 8px 8px;display:flex;flex-wrap:wrap;gap:4px;max-height:60vh;overflow:auto}
.mp-test-body b{flex-basis:100%;margin-top:4px;color:#7a5a2a;font-size:11px;text-transform:uppercase;letter-spacing:.04em}
.mp-test-body button,.mp-test-body select,.mp-test-body input{font:600 12px system-ui,sans-serif;padding:3px 6px;border:1px solid #7a5a2a;border-radius:5px;background:#fff8e6;color:#2a221a}
.mp-test-body button:active{background:#e8d6ad}.mp-test-body input{width:46px}.mp-test-body .on{background:#2f6b35;color:#fff}`;
document.head.append(css);
const panel=document.createElement('details');panel.className='mp-test';panel.id='mpTestPanel';
panel.innerHTML=`<summary>🧪 Тестовый стол</summary><div class="mp-test-body">
  <b>Боты</b><button data-a="bot">+ Бот</button><button data-a="auto">Авто-ход за меня</button><button data-a="speed" data-v="1" class="on">×1</button><button data-a="speed" data-v="3">×3</button><button data-a="speed" data-v="99">⚡ мгновенно</button>
  <b>Деньги</b><button data-a="cash" data-v="500">+$500</button><button data-a="cash" data-v="-500">−$500</button><button data-a="hard">+5 💎</button><button data-a="minus">Уйти в минус</button>
  <b>Фишка</b><input id="mpTestTile" type="number" min="0" max="39" value="5"><button data-a="goto">На клетку</button><button data-a="land">…и сыграть клетку</button>
  <b>Бросок</b><input id="mpTestA" type="number" min="1" max="6" value="3"><input id="mpTestB" type="number" min="1" max="6" value="3"><button data-a="dice">Задать a+b</button>
  <b>Шанс</b><select id="mpTestChance">${Object.keys(CHANCE_LABELS).map(k=>`<option value="${k}">${CHANCE_LABELS[k]}</option>`).join('')}</select><button data-a="chance">Вытянуть</button>
  <b>Бот в следующий ход</b><button data-a="force" data-v="lot">Лот</button><button data-a="force" data-v="offer">Предложение</button><button data-a="force" data-v="buy">Выкуп ×10</button>
  <b>События</b><button data-a="insp">Инспектор</button><button data-a="jail">В участок</button><button data-a="scatter">Инкассатор</button>
  <b>Партия</b><button data-a="final">К последнему раунду</button><button data-a="over">К итогу</button>
</div>`;
document.body.append(panel);
const sync=()=>{save();render();try{H.push();}catch(e){}};
panel.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;const a=b.dataset.a,v=b.dataset.v;
  const needTurn=()=>{if(acting||!(MP.view&&MP.view.phase==='play'&&MP.view.turn.pid===MP.pid)){toast('🧪 Это — в свой ход');return false;}return true;};
  switch(a){
    case 'bot':addBot();break;
    case 'auto':autoMe=!autoMe;b.classList.toggle('on',autoMe);toast(autoMe?'🤖 Твой ход играет автомат — партию можно прогнать до конца':'Ходишь сам',2200);schedule();break;
    case 'speed':speed=+v;panel.querySelectorAll('[data-a=speed]').forEach(x=>x.classList.toggle('on',x===b));toast(`🤖 Скорость ботов ${speed>=99?'мгновенно':'×'+speed}`,1500);break;
    case 'cash':if(!needTurn())break;S.cash+=+v;sync();break;
    case 'hard':if(!needTurn())break;S.hard=(S.hard||0)+5;sync();break;
    case 'minus':if(!needTurn())break;S.cash=-100;sync();toast('🧪 Касса −$100: в конце хода — окно долга',2200);break;
    case 'goto':{if(!needTurn())break;const i=Math.max(0,Math.min(39,+$('mpTestTile').value|0));S.pos=i;sync();break;}
    case 'land':{if(!needTurn())break;const i=Math.max(0,Math.min(39,+$('mpTestTile').value|0));S.pos=i;S.mpLanded={n:MP.view.turn.n,i};sync();try{land(S.tiles[i]);}catch(x){console.error(x);}break;}
    case 'dice':window.MP_FORCE_DICE={a:+$('mpTestA').value|0,b:+$('mpTestB').value|0};toast(`🧪 Следующий бросок: ${window.MP_FORCE_DICE.a}+${window.MP_FORCE_DICE.b}`,1800);break;
    case 'chance':if(!needTurn())break;H.mpChance($('mpTestChance').value);break;
    case 'force':force=v;toast(`🤖 Бот в свой следующий ход: ${v==='lot'?'выставит лот':v==='offer'?'предложит цену':'выкупит ×10'}`,2200);break;
    case 'insp':if(!needTurn())break;try{hazard();}catch(x){console.error(x);}break;
    case 'jail':{if(!needTurn())break;const i=S.tiles.findIndex(t=>t.type==='police');if(i>=0)S.pos=i;S.jail=CFG.POLICE.attempts;S.jailFine=0;sync();toast('🧪 В участке: следующий бросок — на дубль',2200);break;}
    case 'scatter':if(!needTurn())break;try{scatter();}catch(x){console.error(x);}break;
    case 'final':case 'over':if(!H.hub){toast('Только у хозяина стола');break;}H.net.send({t:'debug',op:a});break;
  }
});
// Кнопка «+ Бот» рядом с «Начать» в лобби хозяина.
setInterval(()=>{const st=$('mpStart');if(st&&!$('mpBotBtn')){const b=document.createElement('button');b.id='mpBotBtn';b.className='sec mp-botbtn';b.type='button';b.textContent='🤖 + Бот';b.onclick=addBot;st.before(b);}},700);
})();
