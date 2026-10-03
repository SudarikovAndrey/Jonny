/* Журнал «откуда что пришло» (плейтест мультиплеера 01.10.2026, решение продюсера).
   Каждая проводка денег и кристаллов — отдельная строка: «+$10 точка Лоток»,
   «−$30 инспектор: штраф», «+$200 автомат». Плюс действия соперников в мультиплеере.

   Как ловим: на S.cash и S.hard ставится свойство-ловушка (enumerable — сохранение
   через JSON не меняется). Причину берём из стека вызовов (имя функции игры) и клетки
   под Джонни; в окне — из заголовка окна; если сразу следом игра пишет текст события
   в log()/toast() — он и становится подписью. Одинаковые проводки подряд склеиваются.

   Соперники: window.dispatchEvent(new CustomEvent('mp:event',{detail})) или
   GameJournal.add(detail), detail = {kind, who, color, text, amount, tile, mine}
   (формат согласован с «Американ мультиплеер режим»).

   Виды: свёрнут (плашка с последней проводкой) · развёрнут (список) · закрыт
   (вернуть — кнопкой в «Настройках аккаунта»). Состояние помнится в браузере.
   Крестик на раскрытом журнале сворачивает его в плашку (плейтест 01.10: «закрыт насовсем» путал всех);
   совсем убрать журнал — только в «Настройках аккаунта». */
(function(){
  const MODE_KEY='americanboy_journal', LOG_KEY='americanboy_journal_log', MAX=80, MERGE_MS=2500;
  const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:v;}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,v);}catch(e){}}};
  let entries=[];try{entries=JSON.parse(store.get(LOG_KEY,'[]'))||[];}catch(e){entries=[];}
  let mode=store.get(MODE_KEY,'min'); // 'min' | 'open' | 'off'
  // Закрытый крестиком до 01.10 журнал возвращаем плашкой один раз: тогда крестик прятал его насовсем.
  if(mode==='off'&&store.get(MODE_KEY+'_v','')!=='2'){mode='min';store.set(MODE_KEY,mode);}
  store.set(MODE_KEY+'_v','2');

  // ---------- откуда проводка ----------
  const tileName=t=>{try{return typeof name==='function'?name(t):(t.name||'');}catch(e){return '';}};
  const here=()=>{try{return S.tiles[S.pos];}catch(e){return null;}};
  const passLabel=()=>{const t=here();if(!t)return 'ход';
    if(t.type==='kiosk')return 'точка '+tileName(t);if(t.type==='biz')return 'бизнес '+tileName(t);
    if(t.type==='bank')return 'банк';return 'ход';};
  const fineLabel=()=>{const t=here();
    if(t&&(t.type==='police'))return 'ментовка: штраф';
    if((typeof S!=='undefined'&&S.insp)||(t&&(t.insp||t.type==='hazard')))return 'инспектор: штраф';
    return 'штраф';};
  const NAMES={
    prototypeRoll:passLabel, lapDone:'круг через старт', collectDrop:'находка на клетке',
    pay:fineLabel, payFine:fineLabel, potTile:'копилка', loanCharge:'банк: проценты',
    loanMidnight:'кредит: платёж в полночь', bankThreat:'коллекторы', bank:'банк',
    chance:'Шанс', chanceCash:'Шанс', chanceSell:'Шанс: продажа', buyPack:'покупка пакета',
    bpClaim:'Пропуск Джонни', questClick:'задание', rushOffer:'оффер «Рывок»',
    latePack:'стартовый пакет', lateModal:'стартовый пакет', evolve:'смена товара',
    kioskUpgradeBoth:'прокачка точки', smartRestock:'закупка на всё', needCash:'обмен 💎 на $',
    sfBuyLicense:'лицензия', m1Progress:'премия карты', metaFinish:'итог карты',
    makeSession:'автомат', makeService:'21 в кости', inspectorResolve:'инспектор', sleep:'конец дня',
  };
  // Подписи, которые лучше заменить текстом события из log()/toast().
  const GENERIC=new Set(['Шанс','ход','прочее','штраф','конец дня']);
  const SKIP=/^(Object\.set|set|record|hook|money-journal|Proxy|Reflect)/;
  function cause(){
    const st=(new Error().stack||'').split('\n').slice(1);
    for(const line of st){
      const m=line.match(/at (?:async )?([\w$.<>]+)(?: \[as [\w$]+\])? \(/);if(!m)continue;
      const fn=m[1].split('.').pop();
      if(SKIP.test(m[1])||fn==='set')continue;
      if(NAMES[fn])return typeof NAMES[fn]==='function'?NAMES[fn]():NAMES[fn];
      if(/onclick|click|HTMLButtonElement/.test(m[1])){const h=cardTitle();if(h)return h;}
    }
    const h=cardTitle();return h||'прочее';
  }
  function cardTitle(){
    const m=document.getElementById('modal');if(!m||m.hidden)return '';
    const h=document.querySelector('#card .ev-title,#card h2,#card .pc-name b');
    return h?h.textContent.replace(/\s+/g,' ').trim().slice(0,40):'';
  }

  // ---------- запись ----------
  let fresh=null; // проводка этого же такта — ждёт текст события
  function record(delta,cur){
    const label=cause(),now=Date.now(),last=entries[0];
    if(last&&!last.who&&last.cur===cur&&last.label===label&&Math.sign(last.amount)===Math.sign(delta)&&now-last.ts<MERGE_MS){
      last.amount+=delta;last.ts=now;fresh=last;
    }else{
      const e={ts:now,amount:delta,cur,label};entries.unshift(e);fresh=e;
      if(entries.length>MAX)entries.length=MAX;
    }
    setTimeout(()=>{fresh=null;},0);
    changed();
  }
  function note(text){
    if(!fresh||!text)return;
    const clean=String(text).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
    if(!clean)return;
    if(GENERIC.has(fresh.label)||fresh.label===cardTitle())fresh.note=clean.slice(0,90);
    fresh=null;changed();
  }
  const hooked=new WeakSet();
  function hook(){
    if(typeof S==='undefined'||!S||typeof S!=='object'||hooked.has(S))return;
    const obj=S;hooked.add(obj);
    for(const [prop,cur] of [['cash','$'],['hard','💎']]){
      let v=obj[prop];
      Object.defineProperty(obj,prop,{enumerable:true,configurable:true,
        get(){return v;},
        set(n){const d=(+n||0)-(+v||0);v=n;if(d&&Number.isFinite(d)&&obj===S)record(Math.round(d*100)/100,cur);}});
    }
  }
  function add(detail){ // соперники и любые внешние события
    const d=detail||{};if(!d.text&&d.amount==null)return;
    entries.unshift({ts:Date.now(),amount:d.amount==null?null:+d.amount,cur:'$',label:String(d.text||d.kind||''),
      who:d.who?String(d.who):'',color:d.color||'',mine:!!d.mine,kind:d.kind||''});
    if(entries.length>MAX)entries.length=MAX;
    changed(!!d.who);
  }

  // ---------- вид ----------
  let root,list,pill,saveTimer=0;
  const money=(a,cur)=>{if(a==null)return '';const s=a>0?'+':'−',v=Math.abs(Math.round(a));return cur==='💎'?`${s}${v} 💎`:`${s}$${v}`;};
  const textOf=e=>e.note||e.label;
  function rowHtml(e){
    const who=e.who?`<b class="mj-who" style="${e.color?`color:${e.color}`:''}">${esc(e.who)}</b> `:'';
    const cls=e.amount==null?'':e.amount>0?'plus':'minus';
    return `<li class="${e.who?'rival':''} ${e.mine?'mine':''}"><span class="mj-text">${who}${esc(textOf(e))}</span><span class="mj-sum ${cls}">${money(e.amount,e.cur)}</span></li>`;
  }
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  function build(){
    const app=document.getElementById('app');if(!app||root)return;
    root=document.createElement('div');root.id='moneyJournal';root.className='mj';
    root.innerHTML=`<button class="mj-pill" type="button" aria-label="Журнал: откуда деньги"><span class="mj-ico" aria-hidden="true">📒</span><span class="mj-last"></span></button>
      <section class="mj-panel" aria-label="Журнал: откуда деньги"><header><b>Откуда деньги</b>
        <button class="mj-x" type="button" aria-label="Свернуть журнал"></button></header>
        <ol class="mj-list"></ol><p class="mj-empty">Пока пусто — бросай кубики.</p></section>`;
    app.append(root);
    list=root.querySelector('.mj-list');pill=root.querySelector('.mj-last');
    root.querySelector('.mj-pill').onclick=()=>setMode('open');
    root.querySelector('.mj-x').onclick=()=>setMode('min');
    paint();
  }
  function setMode(m){mode=m;store.set(MODE_KEY,m);paint();}
  function paint(){
    if(!root)return;
    root.dataset.mode=mode;
    // Свёрнутый — только свои деньги: события соперников теперь в ленте слева (backlog 03.10: был повтор). В развёрнутом — всё.
    const e=entries.find(x=>!x.who);
    pill.innerHTML=e?`<span class="mj-sum ${e.amount>0?'plus':e.amount<0?'minus':''}">${money(e.amount,e.cur)}</span> ${esc(textOf(e))}`:'Журнал';
    list.innerHTML=entries.slice(0,MAX).map(rowHtml).join('');
    root.classList.toggle('empty',!entries.length);
  }
  function changed(rival){
    if(root){paint();if(mode==='min'&&!rival){root.classList.remove('ping');void root.offsetWidth;root.classList.add('ping');}}
    clearTimeout(saveTimer);saveTimer=setTimeout(()=>store.set(LOG_KEY,JSON.stringify(entries.slice(0,MAX))),300);
  }

  // ---------- подключение к игре ----------
  hook();
  if(typeof render==='function'){const base=render;render=function(){hook();return base.apply(this,arguments);};}
  if(typeof log==='function'){const base=log;log=function(m){note(m);return base.apply(this,arguments);};}
  if(typeof toast==='function'){const base=toast;toast=function(m){note(m);return base.apply(this,arguments);};}
  window.addEventListener('mp:event',ev=>add(ev.detail));
  // Вернуть закрытый журнал: кнопка в «Настройках аккаунта» (окно web/top-hud.js).
  new MutationObserver(()=>{const c=document.getElementById('card');
    if(!c||!c.classList.contains('hud-account')||document.getElementById('mjToggle'))return;
    const save=c.querySelector('#hudSave');if(!save)return;
    const b=document.createElement('button');b.id='mjToggle';b.className='sec';
    const label=()=>{b.textContent=mode==='off'?'📒 Показать журнал денег':'📒 Скрыть журнал денег';};label();
    b.onclick=()=>{setMode(mode==='off'?'min':'off');label();};
    save.before(b);if(typeof enamelButton==='function'&&save.classList.contains('enamel-button'))enamelButton(b);
  }).observe(document.getElementById('card')||document.body,{childList:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
  window.GameJournal={add,entries:()=>entries.slice(),clear(){entries=[];changed();},open(){setMode('open');},close(){setMode('off');}};
})();
