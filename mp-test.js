// ===== Тестовый стол мультиплеера (?test=1): боты и панель механик =====
// Решение продюсера 02.10: «чтоб тестировать можно было без противников, осмотреть всё, не привлекая людей других».
// Подключается только из web/mp.html при ?test=1 (после web/mp.js); у живых столов этого кода нет.
//
// Боты живут внутри страницы хозяина стола как ещё одни клиенты (свой pid, hello/ping/state/end через hub.handle).
// Ход бота идёт тем же потоком, что и ход игрока: на время хода страница «становится ботом» (PID и view
// подменяются, срез бота принимается через adopt), бросок — prototypeRoll, клетка — land, окна — те же модалки,
// на которые отвечает драйвер окон. Потом страница возвращается к своему игроку и применяет отложенный вид.
(function(){
'use strict';
if(!window.__MP)return;
const H=window.__MP,C=H.C;
const NAMES=['Саня-бот','Макс-бот','Вася-бот'];
const bots=new Map();                 // pid → {pid,name,view,ping}
const trace=[];                       // последние решения драйвера окон — для отладки в консоли (MPBots.trace)
let acting=null,heldView=null,heldNow=0,speed=1,force=null,hostPid=null,pendingT=0,clickBusy=false,lastTitle='',sameCount=0,keepAlive=0,autoMe=false;
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
  for(const b of bots.values()){const v=b.view;if(v&&v.phase==='play'&&v.turn&&v.turn.pid===b.pid&&!v.paused){pendingT=setTimeout(()=>{pendingT=0;playTurn(b.pid);},dly(1200));return;}}
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
window.MPBots={trace,add:addBot,clear:removeBots,acting:()=>!!acting,instant:()=>!!acting&&speed>=99,list:()=>[...bots.values()].map(b=>({pid:b.pid,name:b.name})),
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
