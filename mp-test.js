// ===== Боты (любой стол, у хозяина) и панель механик (тестовый стол, ?test=1) =====
// Решение продюсера 02.10: «чтоб тестировать можно было без противников, осмотреть всё, не привлекая людей других».
// Подключается из web/mp.html на любом столе (после web/mp.js): ботов сажает хозяин кнопкой «🤖 + Бот» в пустом месте
// лобби (backlog 02.10). Панель механик, скорость ×3/мгновенно и «Авто-ход за меня» — только при ?test=1 (H.test).
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
  if(m.t==='view'){b.view=m.v;if(acting===pid)H.view=m.v;schedule();watchLots(b);}
}
// Живые торги (Дебаг 03.10: 96,5% лотов уходили по стартовой с первой ставки — лот живёт круг стола, а бот ставил только
// в свой ход и перебитым ответить не мог). Теперь перебитый или заинтересованный бот отвечает на чужую ставку сразу,
// не дожидаясь хода: +10%, пока цена ниже его ценности клетки с запасом профиля.
function watchLots(b){const v=b.view;if(!v||v.phase!=='play'||!(v.lots||[]).length)return;b.lotSeen=b.lotSeen||{};
  for(const l of v.lots){if(!l.bestBy||l.bestBy===b.pid||l.seller===b.pid)continue;const k=l.id+':'+l.best;if(b.lotSeen[k])continue;b.lotSeen[k]=1;
    setTimeout(()=>counterBid(b.pid,l.id),dly(700+Math.random()*1300));}}
function counterBid(pid,lotId,tries=0){const b=bots.get(pid),v=b&&b.view;if(!v||v.phase!=='play')return;
  const l=(v.lots||[]).find(x=>x.id===lotId);if(!l||!l.bestBy||l.bestBy===pid)return;
  if(busy||acting){if(tries<5)setTimeout(()=>counterBid(pid,lotId,tries+1),dly(600));return;}   // идёт чей-то ход ботом — срез занят
  const S0=S,view0=H.view,pid0=H.PID;let amount=0;
  try{const s=clone(v.mine);s.tiles=botLocal(v,pid);S=s;H.view=v;H.PID=pid;
    const V=valOf(pid),P=profOf(pid),next=Math.ceil(l.best*1.1/10)*10;freshSnap();const g=gainOf({[l.tile]:ME},V,leaderOf(v));
    if(next*(1+V.margin)<=g&&S.cash-next>=S.cash*P.keep){amount=next;brainLog(b,`перебивает ставку на «${titleOf(S.tiles[l.tile])}»: $${next} (ценность $${Math.round(g)})`);}}
  catch(e){amount=0;}
  finally{S=S0;H.view=view0;H.PID=pid0;snap=null;}
  if(amount)hubSend(pid,{t:'bid',id:lotId,amount});}
// ---- стратегии ботов (продюсер 03.10: «боты должны играть по разным стратегиям и прикидывать, к чему приведёт сделка») ----
// Все решения о покупке и продаже — по рыночной цене (window.MP_MARKET: доход клетки с цепочкой × круги), а не по вложенному.
const PROFILES={
  builder:{name:'строитель',build:.9,cheap:.5,lic:.4,upgrade:.6,offer:.10,buyout:.02,bid:.3,list:.03,hand:.4,swap:.10,sellAt:1.3,buyUpTo:1.0,keep:.15},   // ширится дёшево, копит точки
  chain:{name:'цепочки',build:.92,cheap:.3,lic:.5,upgrade:.4,offer:.35,buyout:.08,bid:.5,list:.02,hand:.4,swap:.45,sellAt:1.8,buyUpTo:1.5,keep:.10},      // собирает соседей, за них платит дороже
  trader:{name:'делец',build:.75,cheap:.2,lic:.7,upgrade:.6,offer:.25,buyout:.04,bid:.7,list:.06,hand:.3,swap:.20,sellAt:1.1,buyUpTo:1.1,keep:.15},        // держит кассу, продаёт выгодно, ставит на торгах
  saboteur:{name:'пакостник',build:.8,cheap:.3,lic:.5,upgrade:.4,offer:.15,buyout:.10,bid:.4,list:.03,hand:.9,swap:.10,sellAt:1.5,buyUpTo:1.2,keep:.15}, // бьёт лидера картами и выкупом
};
const PROFILE_ORDER=['chain','trader','saboteur','builder'];
const profOf=pid=>{const b=bots.get(pid);return PROFILES[(b&&b.profile)||'builder'];};
const MV=(i,buyer)=>window.MP_MARKET?MP_MARKET(i,buyer):0;
const adjOwn=i=>[S.tiles[(i+39)%40],S.tiles[(i+1)%40]].some(x=>x&&x.owner&&(x.type==='kiosk'||x.type==='biz'));   // клетка рядом со своей — достроит цепочку
// ===== Одна оценка всех сделок (Андрей 03.10: «бот предлагает невыгодный для него обмен, разбивает свою группу;
// обмен, продажа, покупка выглядят хаотично — бот должен следовать одной из стратегий») =====
// Ценность владений бота = Σ база клетки × (1 + вес группы профиля × число своих соседей). База — рыночная цена
// клетки без группы (MP_MARKET ÷ групповой множитель хозяина, не ниже вложенного). Любая сделка — обмен, ответ на
// предложение, покупка, своё предложение, выкуп, ставка, лот, продажа за долги — проходит, только если ценность
// растёт с запасом профиля. Поэтому бот не рвёт свою группу без компенсации и не платит больше, чем клетка ему стоит.
const VALUE={
  chain:{groupW:.6,margin:.05,swaps:true,swapPause:8,offerPause:5},      // соседство ценит вдвое выше реального бонуса — тянется к улицам
  trader:{groupW:.25,margin:.2,swaps:true,swapPause:10,offerPause:6},     // по реальной ренте, только с наценкой
  saboteur:{groupW:.25,margin:.15,swaps:false,spite:.5,offerPause:6},   // доплачивает за то, что ослабит лидера
  builder:{groupW:.35,margin:.35,swaps:false,offerPause:8},  // держится за своё
};
const ME='\u0001me',GROUP=.25;
const tradeOk=t=>!!t&&(t.type==='kiosk'||t.type==='biz')&&!(typeof sfIsLot==='function'&&sfIsLot(t));
const profKey=pid=>{const b=bots.get(pid);return (b&&b.profile)||'builder';};
const valOf=pid=>VALUE[profKey(pid)]||VALUE.builder;
// Снимок поля на одно решение: хозяева и базы клеток считаются один раз (MP_MARKET не дёшев, а обменов перебираются сотни).
let snap=null;
const snapKey=()=>S.tiles.map(t=>(t.owner?1:0)+(t.rival||'')+(t.salesLvl||0)+(t.level||0)+'|'+(t.price||0)+(t.base||'')).join();
function freshSnap(){const o=S.tiles.map(t=>tradeOk(t)?(t.owner?ME:(t.rival||null)):null);
  const base=S.tiles.map((t,i)=>{if(!tradeOk(t))return 0;const inv=H.invested(t),own=o[i];if(!own)return inv;
    const nb=(o[(i+39)%40]===own)+(o[(i+1)%40]===own);return Math.max(inv,MV(i)/(1+GROUP*nb));});
  const cat=S.tiles.map(t=>tradeOk(t)&&t.type==='kiosk'&&t.base&&!t.lot?t.base:null);
  return snap={o,base,cat,key:snapKey()};}
const snapNow=()=>snap&&snap.key===snapKey()?snap:freshSnap();
const baseAt=i=>snapNow().base[i];
const ownersNow=()=>snapNow().o;
// Вклад клетки i в ценность владельца who при хозяевах f(j).
const cellWorth=(i,f,base,w,who)=>f(i)!==who?0:base[i]*(1+w*((f((i+39)%40)===who)+(f((i+1)%40)===who)));
// Сколько бот выигрывает (минус — теряет) от смены хозяев: change = {клетка: ME | pid | null}. Считаются только
// изменённые клетки и их соседи. У пакостника к выгоде прибавляется доля того, что от сделки теряет лидер.
function gainOf(change,V,leader){const sn=snapNow(),o=sn.o,base=sn.base,a=j=>o[(j+40)%40],b=j=>{j=(j+40)%40;return j in change?change[j]:o[j];};
  const touched=new Set();for(const k in change){const i=+k;touched.add((i+39)%40);touched.add(i);touched.add((i+1)%40);}
  let d=0,hurt=0;for(const i of touched){d+=cellWorth(i,b,base,V.groupW,ME)-cellWorth(i,a,base,V.groupW,ME);
    if(V.spite&&leader)hurt+=cellWorth(i,a,base,GROUP,leader)-cellWorth(i,b,base,GROUP,leader);}
  // Благосостояние города: каждая своя категория — +prosp ко всем ценам продажи своих точек (SF: +6%).
  // Без этого бот не видел смысла в напитках или одежде при своих сладостях — и звал только на «Лоток сладостей».
  if(Object.keys(change).some(k=>sn.cat[+k]))d+=cityWorth(b,sn)-cityWorth(a,sn);
  // Миссия стола: шаг к своей цели — плюс, шаг сопернику — минус, закрыть сопернику миссию — никогда.
  if(MISSION_CELLS[winId()]){d+=missionWorth(b,ME)-missionWorth(a,ME);
    for(const who of new Set(Object.values(change).filter(x=>x&&x!==ME))){const s0=missionSteps(a,who),s1=missionSteps(b,who),g=missionGoal();
      if(s1>s0)d-=s1>=g&&s0<g?missionWin():(V.spite?1:.5)*missionStep()*(s1-s0);}}
  return d+(V.spite?V.spite*Math.max(0,hurt):0);}
// ===== Миссия стола (Андрей 04.10: «никто не стремился выполнить основную миссию, никто не покупал лицензии») =====
// Условие победы — view.win (winOf ядра). Для «клеточных» миссий шаг к цели входит в ту же оценку ценности, что и
// обмены, покупки, продажи, ставки и лоты: бот тянется к цели всеми сделками и не отдаёт сопернику последний шаг.
const TECH_C=['tape','vcr'];
const MISSION_CELLS={city:1,chain:1,empire:1};
const winId=()=>{const v=H.view;return (v&&v.win&&v.win.id)||(v&&v.settings&&v.settings.win)||'capital';};
const missionGoal=()=>({city:8,chain:5,empire:(H.view&&H.view.win&&H.view.win.goal)||9})[winId()]||0;
// Лицензии игрока: свои — из среза, соперников — из view (players[].chain: clothes/tech).
function licOf(who){if(who===ME)return (S.sf&&S.sf.lic)||{};const p=H.view&&H.view.players.find(x=>x.pid===who);return p&&p.chain?{clothes:p.chain.clothes,tech:p.chain.tech}:{};}
// Шаги миссии у who при хозяевах f: «Весь город» — категории (до 6) + бизнесы (до 2); «Король техники» — лицензии (2) +
// точки техники (до 3); «Империя» — владения.
function missionSteps(f,who){const sn=snapNow(),id=winId();let cats=new Set(),biz=0,tech=0,n=0;
  for(let i=0;i<40;i++){if(f(i)!==who)continue;n++;const t=S.tiles[i];if(t&&t.type==='biz')biz++;const c=sn.cat[i];if(c){cats.add(c);if(TECH_C.includes(c))tech++;}}
  // Дубль категории перестраивается в недостающую (за полцены) — это полшага: так Андрей 04.10 собрал «Весь город»
  // из лотков сладостей, купленных у Васи-бота, а бот этого не видел и продавал.
  if(id==='city'){let kiosks=0;for(let i=0;i<40;i++)if(f(i)===who&&sn.cat[i])kiosks++;const c=Math.min(6,cats.size);
    return c+.6*Math.min(6-c,kiosks-cats.size)+Math.min(2,biz);}
  if(id==='chain'){const l=licOf(who);return (l.clothes?1:0)+(l.tech?1:0)+Math.min(3,tech);}
  if(id==='empire')return n;
  return 0;}
// Цена шага — от средней базы клеток стола (растёт со стадией партии); ближе к цели — дороже; победа — 20 шагов.
function missionStep(){const sn=snapNow();let sum=0,k=0;for(let i=0;i<40;i++)if(sn.base[i]){sum+=sn.base[i];k++;}return Math.max(120,1.2*(k?sum/k:150));}
const missionWin=()=>20*missionStep();
function missionWorth(f,who){const s=missionSteps(f,who),g=missionGoal();if(!g)return 0;return missionStep()*s*(1+s/g)+(s>=g?missionWin():0);}
const PROSP=()=>(window.SFBuilder&&+SFBuilder.prosp)||.06;
function cityWorth(f,sn,who=ME){const cats=new Set();let sum=0;for(let i=0;i<40;i++){if(f(i)!==who||!sn.cat[i])continue;cats.add(sn.cat[i]);sum+=sn.base[i];}
  return PROSP()*cats.size*sum;}
const leaderOf=v=>{const ps=v.players.filter(p=>p.pid!==H.PID).sort((a,b)=>(b.cap?b.cap.total:b.cash)-(a.cap?a.cap.total:a.cash));return ps[0]&&ps[0].pid;};
const brainLog=(bot,msg)=>trace.push(`${bot?bot.name:'бот'} (${(PROFILES[profKey(H.PID)]||{}).name||''}): ${msg}`);
// Лучший обмен: до 2 клеток с каждой стороны; соперник по базе клеток не теряет (доплату ставим так, чтобы ему было
// не обидно), бот выигрывает не меньше запаса профиля. Одинаковое предложение не повторяет 12 кругов стола.
// Выгода соперника who от смены хозяев — глазами среднего игрока: реальный бонус соседства и категории города.
// Раньше бот смотрел только, чтобы база соперника не падала, — и звал рвать его улицу: 111 отказов на 117 обменов
// (прогон «Дебага» 03.10). Теперь зовёт на обмен, выгодный обоим, а соперника в минусе догоняет доплатой.
const THEIR_MARGIN=.1;
function theirGain(change,who){const sn=snapNow(),o=sn.o,base=sn.base,a=j=>o[(j+40)%40],b=j=>{j=(j+40)%40;return j in change?change[j]:o[j];};
  const touched=new Set();for(const k in change){const i=+k;touched.add((i+39)%40);touched.add(i);touched.add((i+1)%40);}
  let d=0;for(const i of touched)d+=cellWorth(i,b,base,GROUP,who)-cellWorth(i,a,base,GROUP,who);
  if(Object.keys(change).some(k=>sn.cat[+k]))d+=cityWorth(b,sn,who)-cityWorth(a,sn,who);
  return d;}
function bestSwap(V,v,keep){
  const combos=arr=>{const out=[];for(let a=0;a<arr.length;a++){out.push([arr[a]]);for(let c=a+1;c<arr.length;c++)out.push([arr[a],arr[c]]);}return out;};
  const free=i=>MPSwap.free(i);
  // Отдаёт только то, что было его на начало хода по столу: точка, построенная в этот ход, у хозяина стола ещё
  // пустырь — обмен на неё выглядел бы как «пустырь в обмен» (нашёл «Интерфейс» 03.10). Со следующего хода — можно.
  const synced=i=>!v.tiles||(v.tiles[i]&&v.tiles[i].owner===H.PID&&v.tiles[i].base===S.tiles[i].base);
  const mine=S.tiles.filter(t=>t.owner&&tradeOk(t)&&free(t.i)&&synced(t.i)).map(t=>({i:t.i,k:-gainOf({[t.i]:null},V)})).sort((a,c)=>a.k-c.k).slice(0,8).map(e=>e.i);if(!mine.length)return null;
  const asked=S.botAsked||{},round=Math.floor(v.turn.n/v.players.length),lastTo=S.botSwapTo||{};let best=null;
  for(const p of v.players){if(p.pid===H.PID)continue;
    if(lastTo[p.pid]!=null&&round-lastTo[p.pid]<(V.swapPause||6))continue;   // этому игроку недавно предлагал — не засыпает обменами
    const theirs=S.tiles.filter(t=>t.rival===p.pid&&tradeOk(t)&&free(t.i)).map(t=>({i:t.i,k:gainOf({[t.i]:ME},V)})).sort((a,c)=>c.k-a.k).slice(0,8).map(e=>e.i);if(!theirs.length)continue;
    for(const give of combos(mine))for(const get of combos(theirs)){
      const ch={};for(const i of give)ch[i]=p.pid;for(const i of get)ch[i]=ME;
      // С миссией — обмен только ради шага к цели и без потери шага у соперника: иначе отказ наверняка (прод 04.10: 26 предложений, 17 отказов).
      if(missionOn()&&(stepGain(ch)<=0||stepGain(ch,p.pid)<0))continue;
      const g=gainOf(ch,V),bGive=give.reduce((x,i)=>x+baseAt(i),0),bGet=get.reduce((x,i)=>x+baseAt(i),0);
      const tg=theirGain(ch,p.pid),need=THEIR_MARGIN*Math.max(50,bGet);   // соперник отдаёт get, получает give и доплату
      const pays=MPSwap.pays.filter(x=>tg+x>=need&&(x<=0||S.cash-x>=keep));if(!pays.length)continue;   // pay>0 — доплачивает бот
      const pay=Math.min(...pays),net=g-pay;if(net<V.margin*Math.max(50,bGive))continue;
      const key=give.join('.')+'>'+get.join('.')+'@'+p.pid;if(asked[key]!=null&&v.turn.n-asked[key]<12*v.players.length)continue;
      if(!best||net>best.net)best={to:p.pid,give,get,pay,net,key};}}
  if(!best)return null;
  const pv=MPSwap.preview({to:best.to,give:best.give,get:best.get,pay:best.pay});if(!pv.ok&&!/одно предложение/.test(pv.reason||''))return null;
  return best;}
function addBot(){
  if(!H.hub){toast('Боты — только у хозяина стола');return false;}
  const v=H.view;if(!v||v.phase!=='lobby'){toast('Ботов сажают в лобби');return false;}
  if(bots.size>=3||v.players.length>=C.MAX_PLAYERS){toast('Мест нет');return false;}
  const i=bots.size+1,pid='bot'+i+Math.random().toString(36).slice(2,6),name=NAMES[i-1]||('Бот '+i);
  const b={pid,name,view:null,profile:PROFILE_ORDER[(i-1)%PROFILE_ORDER.length]};bots.set(pid,b);
  hubSend(pid,{t:'hello',pid,name});
  b.ping=setInterval(()=>hubSend(pid,{t:'ping'}),2500);
  toast(`🤖 ${name} сел за стол — стратегия «${PROFILES[b.profile].name}»`,2200);return true;
}
function removeBots(){for(const b of bots.values()){clearInterval(b.ping);hubSend(b.pid,{t:'bye'});}bots.clear();}
function schedule(){
  if(acting||pendingT)return;
  if(busy)return;
  for(const b of bots.values()){const v=b.view;if(v&&v.phase==='play'&&v.turn&&v.turn.pid===b.pid&&!v.paused&&v.turn.n!==b.lastN){pendingT=setTimeout(()=>{pendingT=0;botTurnHidden(b.pid);},dly(1500));return;}}
  // «Авто-ход за меня»: свой ход страница играет тем же драйвером — так партию можно прогнать до конца одному.
  const hv=H.view;if(autoMe&&hv&&hv.phase==='play'&&hv.turn&&hv.turn.pid===H.PID&&!hv.paused&&!$('onboard')){pendingT=setTimeout(()=>{pendingT=0;playTurn(H.PID);},dly(1200));}
}
setInterval(schedule,700);
// После перезагрузки страницы хозяина стол поднимается из localStorage (mp.js, hostTable), а боты жили только
// в памяти этой страницы — их ходы больше никто не делал, стол вставал. На первом же хабе (это и есть
// восстановленный стол) возвращаем ботов по pid из T.players: ping снова делает их online и подключает ответы
// (hub.handle, case 'ping'), дальше view и ходы — как обычно. Один раз на хаб: убранные вручную не воскресают.
const seenHubs=new WeakSet();
function adoptRestored(){
  const hub=H.hub,T=hub&&hub.T;if(!T||!Array.isArray(T.players)||seenHubs.has(hub))return;
  seenHubs.add(hub);
  for(const p of T.players){if(!/^bot\d/.test(p.pid)||bots.has(p.pid))continue;
    const k=+((p.pid.match(/^bot(\d)/)||[])[1]||1),b={pid:p.pid,name:p.name,view:null,profile:PROFILE_ORDER[(k-1)%PROFILE_ORDER.length]};bots.set(p.pid,b);   // стратегия — по номеру места бота в pid, как в addBot
    hubSend(p.pid,{t:'ping'});b.ping=setInterval(()=>hubSend(p.pid,{t:'ping'}),2500);
    trace.push(p.name+': вернулся за стол после перезагрузки');}
}
setInterval(adoptRestored,500);
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
// Свои категории и бизнесы; категории, которых не хватает для миссии стола.
const ownCats=()=>new Set(S.tiles.filter(x=>x.owner&&x.type==='kiosk'&&x.base&&!x.lot).map(x=>x.base));
const myBiz=()=>S.tiles.filter(x=>x.owner&&x.type==='biz').length;
// Лицензии — из меню пустыря или карточки своей точки, как у человека: под миссию (недостающие категории, «Король
// техники») или в богатой кассе ради дорогих категорий. Раньше — 12% случайно на пустыре, лицензий у ботов не было.
function buyLicenses(t,P,bot,emit,onOwn){const want=wantCats(),keepB=S.cash*P.keep;
  for(const lic of (SFB().licenses||[])){if(SFB().hasLic(lic.id))continue;
    const need=winId()==='chain'||lic.cats.some(c=>want.includes(c)),cheapest=Math.min(...lic.cats.map(c=>onOwn&&SFB().rebuildPrice?SFB().rebuildPrice(c):SFB().price(c)));
    // Под миссию — как только хватает на саму лицензию с небольшим запасом: точку под неё строит или перестраивает следом.
    const can=need&&missionOn()?S.cash-lic.price>=Math.min(keepB,100):S.cash-lic.price-(winId()==='chain'?0:cheapest)>=keepB;
    // Без миссии — по расчёту: категории под лицензию окупаются быстрее (джинсы 65%, кроссовки 72% цены за круг против 48% у
    // сладостей) и дают опасную ренту; хватает на лицензию, первую точку и запас — берёт с вероятностью профиля.
    if(can&&(need||rnd(P.lic||.5))){S.sf=S.sf||{};S.sf.lic=S.sf.lic||{};S.sf.lic[lic.id]=true;S.cash-=lic.price;
      emit({kind:'license',text:`купил лицензию «${lic.name}»`,amount:-lic.price,tile:t.i});brainLog(bot,`лицензия «${lic.name}»${need?' — под миссию':''}`);}}}
// «Богатая касса»: денег больше, чем на дорогую точку и лицензию — копить дальше незачем.
const richCash=()=>Math.max(1200,(SFB().build||{}).vcr||0);
// Отдача категории за круг на 1-м уровне: продажи × маржа ÷ цена стройки.
const roiOf=c=>{try{const sell=(SFB().sell||{})[c]||0,buy=typeof buyPrice==='function'?buyPrice(c):sell*.5;return 3*(sell-buy)/Math.max(1,SFB().price(c));}catch(e){return 0;}};
// Копилка под лицензию — как у людей (Андрей 04.10: лицензии к 42-му и 58-му раунду, боты — ни одной): три точки есть —
// дешёвое не строит, выкуп не предлагает, одиночки не качает, пока не наберёт на следующую лицензию и первую точку под неё.
// Копит ли бот в этой партии — решается раз, с вероятностью профиля lic.
// С миссией (backlog 04.10, прод: 38 кругов — 1 лицензия, 26 обменов): копят все и сразу, как только бесплатные шаги
// миссии (категории без лицензии, бизнесы) кончились или набрано 3 владения; сумма — сама лицензия.
function saveGoal(P){const L=(SFB().licenses||[]).filter(l=>!SFB().hasLic(l.id));if(!L.length)return 0;
  if(MISSION_CELLS[winId()]&&winId()!=='empire'){const want=wantCats(),free=want.filter(c=>catOpen(c));
    if(free.length&&holdings()<3)return 0;const need=L.filter(l=>winId()==='chain'||l.cats.some(c=>want.includes(c)));
    return need.length?need.sort((a,b)=>a.price-b.price)[0].price:0;}
  if(holdings()<3)return 0;if(S.botSaver==null)S.botSaver=rnd(P.lic||0);if(!S.botSaver)return 0;
  const nx=L.sort((a,b)=>a.price-b.price)[0];return nx.price+Math.min(...nx.cats.map(c=>SFB().price(c)));}
// Сколько шагов миссии даёт смена хозяев (для отбора сделок: с миссией бот торгуется только ради шага к цели).
function stepGain(change,who=ME){const o=snapNow().o,a=j=>o[(j+40)%40],b=j=>{j=(j+40)%40;return j in change?change[j]:o[j];};return missionSteps(b,who)-missionSteps(a,who);}
const missionOn=()=>!!MISSION_CELLS[winId()];
const holdings=()=>S.tiles.filter(x=>x.owner&&(x.type==='kiosk'||x.type==='biz')).length;
function wantCats(){const id=winId(),own=ownCats();
  if(id==='city')return ['gum','cola','jeans','sneak','tape','vcr'].filter(c=>!own.has(c));
  if(id==='chain')return TECH_C.slice();
  return [];}
const catOpen=cat=>{const l=(SFB().licenses||[]).find(x=>x.cats.includes(cat));return !l||SFB().hasLic(l.id);};
const upCost=t=>typeof kioskUpCost==='function'?kioskUpCost(t):(t.salesLvl<salTab(t).length?salesCost(t):0)+(t.capLvl<capTab(t).length?Math.round(t.price*CFG.KIOSK.capUpMult*t.capLvl):0);
const canUp=t=>t.capLvl<capTab(t).length||t.salesLvl<salTab(t).length;
function fillGoods(t,share){const need=cap(t)-(t.goods||0);if(need<=0)return 0;const price=buyPrice(t.good),can=Math.floor(Math.max(0,S.cash*share)/price),n=Math.min(need,can);if(n<=0)return 0;S.cash-=n*price;t.goods=(t.goods||0)+n;return n;}
async function botTurnHidden(pid){
  const b=bots.get(pid);if(!b||busy||acting)return;const v=b.view;if(!v||v.phase!=='play'||v.turn.pid!==pid)return;
  if(v.turn.n===b.lastN)return;   // этот ход уже сыгран: вид стола ещё не обновился (на мгновенной скорости бот ходил дважды)
  b.lastN=v.turn.n;busy=true;
  const S0=S,view0=H.view,pid0=H.PID,n=v.turn.n,players=v.players.length;
  const credits=[],evts=[],after=[];let seq=0,dice=null;
  const credit=(to,cash,extra)=>credits.push(Object.assign({id:`${pid}:${n}:b:${++seq}`,to,cash:Math.round(cash||0)},extra||{}));
  const emit=e=>evts.push(e);
  try{
    const s=clone(v.mine);s.tiles=botLocal(v,pid);S=s;H.view=v;H.PID=pid;    // тихая подмена, синхронно, без render
    // 1. Ответы на предложения о покупке своих клеток
    const P=profOf(pid);
    const V=valOf(pid);freshSnap();
    // Продаёт, если цена покрывает потерю ценности (с ослабленной группой) с наценкой профиля.
    for(const t of S.tiles.filter(x=>x.owner&&x.mpOffer)){const o=t.mpOffer,inv=H.invested(t),need=Math.max(inv,-gainOf({[t.i]:o.from},V))*P.sellAt;
      // Не распродаётся в ноль (партия Андрея 04.10: Вася-бот кончил без точек с $1 658 налом): меньше 4 владений — только в долгах.
      if(o.amount>=need&&(holdings()>3||S.cash<0)){brainLog(b,`продаёт «${titleOf(t)}» за $${o.amount} (порог $${Math.round(need)})`);S.cash+=o.amount;credit(o.from,0,{escrow:-o.amount});t.mpPrem=o.amount-(inv-(t.mpPrem||0));t.owner=null;t.rival=o.from;delete t.mpOffer;
        emit({kind:'sale',text:`продал «${titleOf(t)}»`,amount:o.amount,tile:t.i,to:o.from});trace.push(b.name+': продал по предложению');}
      else{delete t.mpOffer;credit(o.from,o.amount,{escrow:-o.amount});emit({kind:'decline',text:`отказал в продаже «${titleOf(t)}»`,amount:null,tile:t.i,to:o.from});}}
    // 1б. Обмены: принимает, если его ценность (с группами) растёт с запасом профиля с учётом доплаты; встречных не шлёт.
    if(window.MPSwap){const L=MPSwap._local,bc=(to,cash,x)=>credit(to,cash,{escrow:x&&x.escrow||undefined});
      for(const inc of MPSwap.incoming()){const o=L.byId(inc.id);if(!o)continue;const pv=MPSwap.preview({to:inc.from,give:inc.give,get:inc.get,pay:inc.pay});
        const ch={};for(const i of inc.give)ch[i]=inc.from;for(const i of inc.get)ch[i]=ME;
        const bGive=inc.give.reduce((x,i)=>x+baseAt(i),0),net=gainOf(ch,V)-inc.pay;
        const ok=net>=V.margin*Math.max(50,bGive)&&!(inc.pay>0&&S.cash-inc.pay<S.cash*P.keep);
        brainLog(b,`обмен ${ok?'принят':'отклонён'}: ${net>=0?'+':''}${Math.round(net)}`);
        if(ok&&L.accept(o,bc,emit))trace.push(b.name+': принял обмен');else{if(MPSwap._local.byId(inc.id))L.decline(o,bc,emit,false);trace.push(b.name+': отказал в обмене');}}}
    // 1в. Предложения продажи боту: берёт, если клетка стоит для него дороже цены с запасом профиля и касса остаётся.
    for(const t of S.tiles.filter(x=>x.rival&&x.mpSale&&x.mpSale.to===pid)){const o=t.mpSale,g=gainOf({[t.i]:ME},V,leaderOf(v));
      if(o.amount*(1+V.margin)<=g&&S.cash-o.amount>=S.cash*P.keep){brainLog(b,`покупает «${titleOf(t)}» за $${o.amount} (ценность $${Math.round(g)})`);S.cash-=o.amount;credit(o.from,o.amount,{sale:true,tile:t.i});t.mpPrem=o.amount-(H.invested(t)-(t.mpPrem||0));t.owner='you';delete t.rival;delete t.mpSale;
        emit({kind:'salebought',text:`купил «${titleOf(t)}» за $${o.amount}`,amount:null,tile:t.i,to:o.from});trace.push(b.name+': купил по предложению продажи');}
      else{delete t.mpSale;emit({kind:'decline',text:`отказался купить «${titleOf(t)}»`,amount:null,tile:t.i,to:o.from});}}
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
    S=S0;H.view=view0;H.PID=pid0;try{render();}catch(e){}   // карта из руки бота могла перерисовать экран его срезом
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
  if(S.mpLapCut!=null){income=Math.round(income*S.mpLapCut);delete S.mpLapCut;}   // карта соперника: демпинг или забастовка
  if(S.mpLapBoost){income=Math.round(income*S.mpLapBoost);delete S.mpLapBoost;}   // своя «Акция»
  income+=window.MP_START_BONUS_NOW?MP_START_BONUS_NOW():100;   // проход старта: $100 по кругам, $50 по времени
  if(window.MP_IS_UNDERDOG&&MP_IS_UNDERDOG()){const ex=window.MP_UNDERDOG_BONUS?MP_UNDERDOG_BONUS():50;income+=ex;emit({kind:'underdog',text:`пособие отстающему $${ex}`,amount:ex,tile:0});}
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
  const {credit,emit,v,after,bot}=ctx;if(!t)return;const n=v.turn.n,P=profOf(H.PID);
  collectHidden(t,ctx);
  // Инспектор (продюсер 02.10: «бот реагирует так же, как игрок»): клетка инспектора рассылает проверки по его точкам,
  // своя точка под проверкой — бот платит штраф, если есть деньги, и снимает проверку.
  if(t.type==='hazard'){inspHidden(t,ctx);return;}
  if(t.owner&&t.insp){const fine=typeof inspFine==='function'?inspFine():50;if(S.cash>=fine){S.cash-=fine;credit(null,0,{pot:fine});t.insp=false;emit({kind:'fine',text:`снял проверку с «${titleOf(t)}»`,amount:-fine,tile:t.i});}}
  switch(t.type){
    case 'kiosk':{
      if(t.rival){rentHidden(t,ctx);break;}
      if(!t.owner){   // пустырь: строим, чаще дешёвое, иногда лицензию
        // Лицензия — из меню пустыря, как у человека: под миссию (недостающие категории, «Король техники») или
        // в богатой кассе ради дорогих категорий и процветания города. Раньше — 12% случайно, лицензий у ботов не было.
        const want=wantCats();buyLicenses(t,P,bot,emit,false);
        const cats=Object.keys(SFB().build||{}),open=cats.filter(c=>catOpen(c)&&S.cash>=SFB().price(c)).sort((x,y)=>SFB().price(x)-SFB().price(y));
        const goal=open.filter(c=>want.includes(c)),fresh=open.filter(c=>!ownCats().has(c));
        // Недостающая для миссии категория — строит всегда; «Империя» — любую, лишь бы владение; рядом со своей — почти всегда.
        if(!open.length||!(goal.length||winId()==='empire'||rnd(adjOwn(t.i)?Math.max(P.build,.95):P.build)))break;
        const sg=saveGoal(P);if(sg&&!goal.length&&(missionOn()||!adjOwn(t.i))&&S.cash-Math.min(...open.map(c=>SFB().price(c)))<sg)break;   // копит на лицензию
        const fine=open.filter(c=>S.cash-SFB().price(c)>=S.cash*P.keep),best=(fine.length?fine:open).slice().sort((x,y)=>roiOf(y)-roiOf(x));
        const cat=goal.length?goal[0]:rnd(P.cheap)?open[0]:fresh.length&&rnd(.5)?fresh.sort((x,y)=>roiOf(y)-roiOf(x))[0]:best[0],p=SFB().price(cat);if(S.cash<p)break;
        S.cash-=p;Object.assign(t,{owner:'you',good:cat,base:cat,lot:false,price:p,price0:p,capLvl:1,salesLvl:1,goods:0,tier:1,insp:false});delete t.mpPrem;
        S.stat.bought=(S.stat.bought||0)+1;
        emit({kind:'build',text:`построил «${titleOf(t)}»`,amount:-p,tile:t.i});trace.push(bot.name+': построил '+titleOf(t)+' за $'+p);
        fillGoods(t,.5);break;}
      // своя точка: лицензии и перестройка — как у людей из карточки точки (раньше боты не перестраивали вовсе:
      // когда поле занято, им оставалось только предлагать выкуп). Дубль категории — в недостающую для миссии, без миссии —
      // в новую категорию города, если касса богатая.
      buyLicenses(t,P,bot,emit,true);
      if(t.base){const cnt={};for(const x of S.tiles)if(x.owner&&x.type==='kiosk'&&x.base&&!x.lot)cnt[x.base]=(cnt[x.base]||0)+1;
        const want=wantCats(),rb=c=>SFB().rebuildPrice?SFB().rebuildPrice(c):Math.round(SFB().price(c)/2);
        const opts=(want.length?want:Object.keys(SFB().build||{}).filter(c=>roiOf(c)>roiOf(t.base)*1.2)).filter(c=>c!==t.base&&catOpen(c)&&S.cash-rb(c)>=S.cash*P.keep);
        const go=opts.length&&(want.length?cnt[t.base]>1:(cnt[t.base]>1||roiOf(t.base)<.5)&&rnd(.4));
        if(go){const c=opts.sort((x,y)=>SFB().price(y)-SFB().price(x))[0],price=rb(c),refund=Math.round((t.goods||0)*buyPrice(t.good));
          S.cash+=refund-price;const from=titleOf(t);Object.assign(t,{good:c,base:c,lot:false,price,price0:price,capLvl:1,salesLvl:1,goods:0,tier:1,insp:false});
          emit({kind:'build',text:`перестроил точку: теперь «${titleOf(t)}»`,amount:-price,tile:t.i});brainLog(bot,`перестроил «${from}» → «${titleOf(t)}»${want.length?' — под миссию':''}`);fillGoods(t,.5);break;}}
      // своя точка: прокачка — как у людей, несколько шагов за остановку, пока касса выше запаса профиля
      // (разбор живых партий 04.10: люди прокачивают 0,18 раза за ход и тратят на это 31% денег, боты — 0,015).
      // Партия Андрея 04.10: «у ботов были группы точек, но они их не прокачивали — не было опасных мест» (по журналу:
      // одна прокачка на бота за 51 ход). Теперь первый шаг — всегда, если касса выше запаса; точка в группе (рядом своя)
      // качается дальше почти всегда — там рента ×1,25 за соседа, это и есть опасное место для соперника.
      // Копит под миссию — не качает вовсе; копит без миссии — качает только точку в группе.
      if(canUp(t)&&!(saveGoal(P)&&(missionOn()||!adjOwn(t.i)))){const keepUp=S.cash*P.keep,grp=adjOwn(t.i);for(let k=0;k<4&&canUp(t);k++){const cost=upCost(t);if(S.cash-cost<keepUp)break;
        S.cash-=cost;if(t.capLvl<capTab(t).length)t.capLvl++;if(t.salesLvl<salTab(t).length)t.salesLvl++;emit({kind:'upgrade',text:`прокачал «${titleOf(t)}»`,amount:-cost,tile:t.i});
        if(!rnd(grp?Math.max(.85,P.upgrade):P.upgrade))break;}}
      fillGoods(t,.4);break;}
    case 'biz':{   // бизнесы бустят друг друга — «цепочки» и «делец» берут охотнее
      if(t.rival){rentHidden(t,ctx);break;}
      const bizNeed=(winId()==='city'&&myBiz()<2)||winId()==='empire';   // бизнес — шаг миссии: берёт, если хватает денег
      if(!t.owner&&(bizNeed?S.cash>=t.price*1.05:rnd(P===PROFILES.chain||P===PROFILES.trader?.6:.3)&&S.cash>=t.price*1.5)){S.cash-=t.price;t.owner='you';t.level=t.level||1;emit({kind:'build',text:`купил бизнес «${titleOf(t)}»`,amount:-t.price,tile:t.i});trace.push(bot.name+': купил бизнес');}
      break;}
    case 'wh':if(!myKiosks().length){S.cash+=20;emit({kind:'bonus',text:'утешительный приз на складе',amount:20,tile:t.i});}for(const k of myKiosks())fillGoods(k,.35);break;
    case 'chance':chanceHidden(ctx);break;
    case 'police':{const fine=policeFine();
      if(S.cash>=fine&&rnd(.7)){S.cash-=fine;credit(null,0,{pot:fine});emit({kind:'fine',text:'заплатил полиции',amount:-fine,tile:t.i});}
      else{S.jail=CFG.POLICE.attempts;S.jailFine=0;emit({kind:'jail',text:'сел в участок',amount:null,tile:t.i});}break;}
    case 'slot':slotHidden(t,ctx);break;
    case 'pot':{const m=Math.round(v.pot||0);if(m>0){S.cash+=m;credit(null,0,{potTake:true});emit({kind:'minigame',text:'сорвал копилку',amount:m,tile:t.i});}break;}
    case 'scatter':scatterHidden(t,ctx);break;
    default:break;   // старт, банк, инспектор — бот не трогает
  }
}
// Инкассатор у бота: мешок лопается так же, как у игрока (scatter() в web/index.html — «мешок лопается всегда»):
// сначала закрытые клетки, мало — любые точки и бизнесы. Находки ложатся на клетки среза и уходят столу вместе
// с полем; событие 'scatter' отыгрывает разлёт на поле хозяина, как у живого соперника (mp.js, flyDrops/onEvt).
function scatterHidden(t,{emit}){
  const c=CFG.SCATTER,sc=S.day||1,ok=x=>x.i!==S.pos&&x.i!==0&&!x.drop;
  let spots=S.tiles.filter(x=>!unlocked(x)&&ok(x));
  if(spots.length<c.drops){const more=S.tiles.filter(x=>unlocked(x)&&ok(x)&&(x.type==='kiosk'||x.type==='biz')).sort(()=>Math.random()-0.5);spots=spots.concat(more.slice(0,c.drops-spots.length));}
  spots.sort(()=>Math.random()-0.5);
  const drops=[];let cash=0;
  for(const x of spots.slice(0,c.drops)){const r=Math.random();let d;
    if(r<c.hardChance)d={hard:1};else if(r<c.hardChance+c.rollsChance)d={rolls:2};
    else{const m=(c.min+Math.floor(Math.random()*(c.max-c.min)))*sc;d={cash:m};cash+=m;}
    x.drop=typeof mergeDrop==='function'?mergeDrop(x.drop,d):d;drops.push({to:x.i,drop:d});}
  if(drops.length)emit({kind:'scatter',text:'растерял мешок инкассатора',amount:null,tile:t.i,cash,drops});
}
function rentHidden(t,{credit,emit,v}){
  const n=v.turn.n;if(t.insp||(t.frozen&&t.frozen>n)||(S.mpShieldN&&n<=S.mpShieldN))return;
  const r=H.rentOf(t);if(r<=0)return;S.cash-=r;credit(t.rival,r,{rent:true});
  emit({kind:'rent',text:`заплатил ренту за «${titleOf(t)}»`,amount:-r,tile:t.i,to:t.rival});
}
// «Шанс» бота: денежные карты той же колоды плюс изредка пакость (сдвиг, пропуск хода) через удар стола.
function chanceHidden({credit,emit,v,after}){
  // Пакость — в руку (до 2 карт), как у игрока; сыграет бот позже в strategyHidden.
  if(window.MPHand&&(S.mpHand||[]).length<MPHand.max&&rnd(.5)){const ids=Object.keys(MPHand.cards);S.mpHand=(S.mpHand||[]).concat(pick(ids));emit({kind:'hand',text:'взял карту в руку',amount:null,tile:S.pos});trace.push('бот: карта в руку');return;}
  // Денежные карты бота — те же, что у игрока, и тоже от среднего дохода стола за круг.
  const rivals=v.players.filter(p=>p.pid!==H.PID);let text,amount=null;
  const U=Math.max(50,Math.round((window.MP_LAP_P?window.MP_LAP_P():100)/5)*5),k=x=>Math.max(10,Math.round(U*x/5)*5);
  const roll=Math.random();
  if(roll<.25){const a=k(.4);amount=-a;S.cash-=a;credit(null,0,{pot:a});text=`🚗 Штраф за парковку $${a} — в общую копилку.`;}
  else if(roll<.45&&myKiosks().length){S.mpLapBoost=1.5;text='🏷 Акция «Два по цене одного»: на следующем проходе старта продажи ×1,5.';}
  else if(roll<.65&&myKiosks().some(t=>t.goods<cap(t))){let n=0;for(const t of myKiosks()){const add=Math.ceil((cap(t)-t.goods)/2);if(add>0){t.goods+=add;n+=add;}}text=`🚚 Оптовый завоз: точки заполнились наполовину бесплатно (+${n} шт).`;}
  else if(roll<.8&&rivals.length){const a=k(.25);amount=-a;S.cash-=a;for(const p of rivals)credit(p.pid,-a);credit(null,0,{pot:a*(rivals.length+1)});text=`🚔 Облава на районе: все платят в копилку по $${a}.`;}
  else if(rivals.length){const p=pick(rivals);after.push({t:'hit',h:{k:'skip',to:p.pid}});text=`⏳ Очередь в ЖЭК: ${p.name} пропускает следующий ход.`;}
  else{const a=k(.4);amount=a;S.cash+=a;text=`📺 Сюжет на MTV: $${a} за интервью.`;}
  emit({kind:'chance',text,amount,tile:S.pos});
}
function inspHidden(t,{emit}){
  const own=S.tiles.filter(x=>(x.type==='kiosk'||x.type==='biz')&&x.owner&&unlocked(x));
  if(own.length<(CFG.INSP.minOwn||0)){emit({kind:'insp',text:'инспектору пока некого проверять',amount:null,tile:t.i});return;}
  const active=own.filter(x=>x.insp).length,lapCap=1+Math.floor(Math.max(0,(S.laps||0)-(CFG.INSP.fromLap||0))/(CFG.INSP.lapStep||3));
  const free=Math.min((CFG.INSP.limit||3)-active,lapCap-active);if(free<=0)return;
  const spots=own.filter(x=>!x.insp&&x.i!==S.pos).sort(()=>Math.random()-.5);
  const want=1+(CFG.INSP.steps||[3,7]).filter(x=>own.length>x).length,n=Math.min(free,spots.length,want);
  const hit=spots.slice(0,n);hit.forEach(x=>{x.insp=true;});
  if(n)emit({kind:'insp',text:`инспектор проверяет ${n===1?'точку':n+' точки'}: ${hit.map(titleOf).join(', ')}`,amount:null,tile:t.i});
  trace.push('бот: инспектор, проверок '+n);
}
// Автомат в фоне: бесплатные спины тем же движком и таблицей выплат; на поле — только результат.
function slotHidden(t,{credit,emit,v}){
  const E=window.SlotEngine;if(!E)return;
  const st={P:Math.max(0,Math.round(typeof window.MP_SLOT_BASE==='function'?window.MP_SLOT_BASE():lapNet())),day:S.day||1,pot:Math.round(v.slotPot||0),rollCash:window.MP_ROLL_CASH?window.MP_ROLL_CASH():H.rollCash(),mp:true,visits:1};
  let cash=0,potD=10,gem=0;
  for(let i=0;i<3;i++){const o=E.choose(Math.random),p=E.award(st,o,[]);
    if(o.id==='jackpot'){cash+=p.cash;gem+=p.gem;potD-=st.pot;st.pot=0;}
    else{cash+=p.cash;gem+=p.gem;potD+=Math.round(p.cash*.1);st.pot+=Math.round(p.cash*.1);}
    if(p.restock){for(const k of myKiosks()){k.goods=cap(k);if(p.restock==='one')break;}}}
  S.cash+=cash;S.hard=(S.hard||0)+gem;if(potD)credit(null,0,{slot:potD});
  emit({kind:'minigame',text:cash?'выиграл в автомате':'крутил автомат впустую',amount:cash||null,tile:t.i});
}
function strategyHidden({credit,emit,v,after,bot}){
  const t=S.tiles[S.pos],n=v.turn.n,f=force,P=profOf(H.PID);force=null;
  const mine=S.tiles.filter(x=>x.owner&&(x.type==='kiosk'||x.type==='biz')&&!(typeof sfIsLot==='function'?sfIsLot(x):(!x.owner&&(x.lot||x.good==='lot')))&&!H.lotOn(x.i)).sort((a,b)=>H.invested(a)-H.invested(b));
  const rivalHere=H.isRival(t)&&!H.lotOn(t.i)&&!t.mpOffer;
  const offer=(tt,m)=>{const amount=Math.round(Math.max(H.invested(tt),MV(tt.i,H.PID))*m/10)*10;if(S.cash-amount<S.cash*P.keep)return false;if(S.cash<amount)return false;S.cash-=amount;S.mpEscrow=(S.mpEscrow||0)+amount;tt.mpOffer={from:H.PID,amount,mult:m,n};
    emit({kind:'offer',text:`предлагает $${amount} за «${titleOf(tt)}»`,amount:null,tile:tt.i,to:tt.rival});trace.push(bot.name+': предложил $'+amount);return true;};
  const buyout=tt=>{const amount=MP.forcePrice?MP.forcePrice(tt.i):Math.round(H.invested(tt)*10),ready=(S.mpForceLap==null)||(S.laps||0)>=S.mpForceLap+2;if(!ready||S.cash<amount)return false;
    S.cash-=amount;credit(tt.rival,amount,{force:true,tile:tt.i});tt.mpPrem=amount-(H.invested(tt)-(tt.mpPrem||0));const who=tt.rival;tt.owner='you';delete tt.rival;delete tt.mpOffer;S.mpForceLap=S.laps||0;
    emit({kind:'sale',text:`выкупил «${titleOf(tt)}» за $${amount}`,amount:-amount,tile:tt.i,to:who});trace.push(bot.name+': выкуп за $'+amount);return true;};
  if(f==='lot'){if(mine.length)after.push({t:'lot',tile:mine[0].i,min:Math.round(H.invested(mine[0])*1.5),kind:'sale'});else toast('🤖 У бота нет клеток для торгов');}
  else if(f==='offer'||f==='buy'){let r=rivalHere?t:S.tiles.find(x=>H.isRival(x)&&!H.lotOn(x.i)&&!x.mpOffer);
    if(!r)toast('🤖 Нет чужих клеток — боту нечего предлагать');else{if(S.pos!==r.i)S.pos=r.i;
      if(f==='offer'){if(S.cash<H.invested(r)*1.5)S.cash=Math.round(H.invested(r)*1.5)+50;offer(r,1.5);}
      else{S.cash=Math.max(S.cash,Math.round(H.invested(r)*10)+100);S.mpForceLap=null;buyout(r);}}}
  else{
    const V=valOf(H.PID),keep=S.cash*P.keep,leader=leaderOf(v);freshSnap();
    // Обмен: лучший для его профиля, соперник по базе клеток не в минусе. Строитель и пакостник обменов не предлагают.
    if(window.MPSwap&&V.swaps&&S.mpProposeN!==v.turn.n){const sw=bestSwap(V,v,keep);
      if(sw){S.botAsked=S.botAsked||{};S.botAsked[sw.key]=v.turn.n;S.botSwapTo=Object.assign(S.botSwapTo||{},{[sw.to]:Math.floor(v.turn.n/v.players.length)});MPSwap._local.place({to:sw.to,give:sw.give,get:sw.get,pay:sw.pay},emit);S.mpProposeN=v.turn.n;
        brainLog(bot,`предлагает обмен ${sw.give.join(',')}→${sw.get.join(',')}, доплата ${sw.pay} (выгода $${Math.round(sw.net)})`);}}
    if(window.MPHand&&(S.mpHand||[]).length&&rnd(P.hand)){const l=MPHand.list(),i=l.findIndex(c=>c.targets.length);if(i>=0){MPHand.play(i,pick(l[i].targets));trace.push(bot.name+': сыграл карту из руки');}}
    // Выкуп и предложение цены — по ценности клетки для него: выбирает клетку с наибольшей выгодой за вычетом цены.
    const targets=S.tiles.filter(x=>H.isRival(x)&&!H.lotOn(x.i)&&!x.mpOffer&&!x.mpSwap&&!x.mpSale&&(!missionOn()||stepGain({[x.i]:ME})>0)).map(x=>{const g=gainOf({[x.i]:ME},V,leader),cap=g/(1+V.margin),
      min=Math.max(H.invested(x),MV(x.i,H.PID));return {x,g,cap,min};}).filter(e=>e.cap>=e.min).sort((a,c)=>(c.cap-c.min)-(a.cap-a.min));
    const fp=e=>MP.forcePrice?MP.forcePrice(e.x.i):1e9;
    const here=targets.find(e=>e.x.i===t.i&&rivalHere);
    if(here&&fp(here)<=here.cap&&S.cash-fp(here)>=keep){buyout(t);brainLog(bot,`выкупает «${titleOf(t)}» (ценность $${Math.round(here.g)})`);}
    else if(targets.length&&S.mpProposeN!==n&&!saveGoal(P)&&!(S.botOfferAt!=null&&Math.floor(n/v.players.length)-S.botOfferAt<(S.cash>richCash()?Math.ceil((V.offerPause||3)/2):(V.offerPause||3)))){   // касса лежит без дела — предлагает чаще
      // Отказали — повторяет только дороже (на 0,2 к прошлому множителю, пока клетка этого стоит), иначе отступает на 12 кругов стола.
      const memo=S.botOffered||{},round=Math.floor(n/v.players.length);
      const pickM=e=>{const top=Math.max(1,Math.min(P.buyUpTo,Math.floor(e.cap/e.min*10)/10)),last=memo[e.x.i];
        if(!last||round-last.r>=12)return Math.max(1,Math.min(top,Math.round((P.buyUpTo>1?1+(top-1)/2:1)*10)/10));
        const m=Math.round((last.m+.2)*10)/10;return m<=top?m:0;};
      const e=targets.find(x=>pickM(x)>0);const m=e?pickM(e):0;
      if(e&&offer(e.x,m)){S.mpProposeN=n;S.botOfferAt=round;S.botOffered=Object.assign(memo,{[e.x.i]:{m,r:round}});brainLog(bot,`предлагает ×${m} за «${titleOf(e.x)}» (ценность $${Math.round(e.g)})`);}}
    // Торги: ставит, пока цена ниже ценности клетки для него.
    for(const l of (v.lots||[])){if(l.seller===H.PID||l.bestBy===H.PID)continue;if(saveGoal(P)&&stepGain({[l.tile]:ME})<=0)continue;const next=l.best?Math.ceil(l.best*1.1/10)*10:l.min,g=gainOf({[l.tile]:ME},V,leader);
      if(next*(1+V.margin)<=g&&S.cash-next>=keep)after.push({t:'bid',id:l.id,amount:next});}
    // Свой лот — одиночку, которая его улицы не держит: когда в кассе пусто (отдаёт и чуть ниже своей ценности) или
    // с вероятностью профиля «на продажу» (делец чаще всех), если соперник ценит её хотя бы на 10% выше, чем он сам.
    const broke=S.cash<Math.max(150,keep);
    if(!(v.lots||[]).some(l=>l.seller===H.PID)&&(broke||(rnd(P.list)&&holdings()>3))){const o=ownersNow();
      // Ту же клетку без покупателей не выставляет снова 8 кругов стола — иначе лот «мигает» каждый ход.
      const listed=S.botListed||{},fresh=x=>listed[x.i]==null||v.turn.n-listed[x.i]>=8*v.players.length;
      const onTable=i=>!v.tiles||(v.tiles[i]&&v.tiles[i].owner===H.PID);   // на торги — только синхронизированное со столом
      const lone=mine.filter(x=>o[(x.i+39)%40]!==ME&&o[(x.i+1)%40]!==ME&&fresh(x)&&onTable(x.i)).sort((a,c)=>baseAt(a.i)-baseAt(c.i));
      // Спрос — сколько даст самый заинтересованный соперник с деньгами (его выгода глазами среднего игрока с запасом 25%).
      // Старт — 70% спроса (есть куда торговаться, перебивают — см. watchLots), не выше «ценность × наценка профиля» и не ниже порога продажи:
      // 80% ценности, когда касса пуста, и сама ценность, когда продаёт с выгодой. Раньше старт был «ценность × наценка»
      // (6 из 8 лотов без ставок), потом — только при спросе ≥ 95% ценности и пустой кассе (0 лотов за партию, прод 03.10).
      const demand=i=>Math.max(0,...v.players.filter(p=>p.pid!==H.PID).map(p=>Math.min(theirGain({[i]:p.pid},p.pid)/1.25,(p.cash||0)*.8)));
      const sale=lone.map(x=>{const loss=Math.max(H.invested(x),-gainOf({[x.i]:null},V)),d=demand(x.i),floor=broke?loss*.8:loss;
        if(d<(broke?floor:loss*1.1))return null;
        return {x,min:Math.floor(Math.max(floor,Math.min(loss*P.sellAt,d*.7))/10)*10};}).filter(Boolean);
      if(lone.length>(profKey(H.PID)==='builder'?2:0)&&sale.length){const {x,min}=sale[0];
        S.botListed=Object.assign(listed,{[x.i]:v.turn.n});
        after.push({t:'lot',tile:x.i,min,kind:'sale'});brainLog(bot,`выставил одиночку «${titleOf(x)}» от $${min}`);}}
  }
}
function debtHidden({credit,emit,v,after,bot}){
  if(S.cash>=0)return;
  if(!(S.loans||[]).some(l=>l.micro)){const amt=Math.min(500,Math.max(100,Math.ceil((-S.cash+50)/50)*50));S.loans=S.loans||[];S.loans.push({tier:0,micro:true,name:'Микрозайм',principal:amt,rate:.25,strikes:0,maxStrikes:99});S.cash+=amt;emit({kind:'loan',text:`взял микрозайм $${amt}`,amount:amt,tile:S.pos});trace.push(bot.name+': микрозайм $'+amt);}
  if(S.cash<0){let v2=0;for(const k of myKiosks()){v2+=Math.round((k.goods||0)*buyPrice(k.good)*.5);k.goods=0;}if(v2>0){S.cash+=v2;emit({kind:'sale',text:`продал товар с точек за $${v2}`,amount:v2,tile:S.pos});}}
  if(S.cash<0&&(S.mpDebtLaps||0)>=2){let need=-S.cash;const V=valOf(H.PID);freshSnap();
    // Сначала то, что меньше всего ломает его улицы (потеря ценности на доллар базы).
    const mine=S.tiles.filter(x=>x.owner&&(x.type==='kiosk'||x.type==='biz')&&!(typeof sfIsLot==='function'?sfIsLot(x):(!x.owner&&(x.lot||x.good==='lot')))&&!H.lotOn(x.i))
      .map(x=>({x,k:-gainOf({[x.i]:null},V)/Math.max(1,baseAt(x.i))})).sort((a,c)=>a.k-c.k).map(e=>e.x);
    for(const x of mine){if(need<=0)break;const mv=Math.round(Math.max(H.invested(x),MV(x.i)));after.push({t:'lot',tile:x.i,min:mv,kind:'bankrupt',bank:Math.round(mv*.5)});need-=Math.round(mv*.5);}}   // как у игрока: от рыночной цены
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
// Хозяин уступил стол (mp-hosthandoff): боты уже переехали к новому ведущему — здесь гасим их пульс без «bye».
function releaseBots(){for(const b of bots.values())clearInterval(b.ping);bots.clear();clearTimeout(pendingT);pendingT=0;}
window.MPBots={release:releaseBots,brain:{VALUE,gainOf,theirGain,bestSwap,freshSnap,ME,leaderOf,cityWorth},trace,add:addBot,clear:removeBots,acting:()=>!!acting,busy:()=>busy,instant:()=>!!acting&&speed>=99,list:()=>[...bots.values()].map(b=>({pid:b.pid,name:b.name})),
  holdHostView(v,now){heldView=v;heldNow=now;if(acting===H.PID)H.view=v;if(v&&v.phase!=='play'&&acting)unstick();},   // свой авто-ход: вид свежий, применим в конце; партия кончилась — ход бота обрываем
  get speed(){return speed;},set speed(x){speed=+x||1;},
  get force(){return force;},set force(f){force=f;},
  get autoMe(){return autoMe;},set autoMe(x){autoMe=!!x;schedule();},
};

// ---- панель механик: только тестовый стол ----
if(H.test){
const CHANCE_LABELS={birthday:'🎂 День рождения',treat:'🍻 Проставился',raid:'🚔 Облава',mtv:'📺 Сюжет на MTV',complaint:'📋 Жалоба соседей',stash:'💰 Заначка общака',parking:'🚗 Штраф за парковку',sneakers:'👟 Кроссовки',robin:'🤑 Робин Гуд',roof:'🛡 Крыша',roadwork:'🚧 Ремонт дороги',snitch:'🚔 Донос',queue:'⏳ Очередь в ЖЭК',blackout:'❄️ Отключили свет'};
const css=document.createElement('style');css.textContent=`
.mp-test{position:fixed;right:8px;left:auto;bottom:calc(150px + env(safe-area-inset-bottom));top:auto;   /* справа у дока: слева под шапкой журнал денег, слева у дока — склад */
z-index:10000;background:#f7ecd2;color:#2a221a;font:600 12px/1.3 system-ui,sans-serif;border:2px solid #7a5a2a;border-radius:8px;max-width:232px;box-shadow:0 4px 14px #0006}
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
}
})();
