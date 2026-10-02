// ===== Логи партий: копятся на телефоне и сами уходят на приёмник =====
// Приёмник — Apps Script «Америкэн бой — партии тестировщиков», лист runs
// (черновики/америкэн-бой-сбор-данных.md). Формат прежний: POST text/plain с JSON {summary, events};
// приёмник раскладывает известные поля по колонкам, остальное лежит в json-колонках сводки и событий.
//
// Чем отличается от прототипа (там лог жил только в localStorage и терялся):
// • очередь «исходящие» хранит ВСЕ неотправленные порции любых партий; порция удаляется только
//   после ответа приёмника «ok» (он читается: Apps Script отдаёт CORS);
// • отправка — каждые 10 событий, раз в 30 с, при уходе со вкладки (fetch keepalive),
//   при закрытии страницы (sendBeacon) и в конце партии; при следующем открытии игра досылает остаток;
// • у каждого события настоящее время с поясом устройства (at), секунды от начала партии (sec),
//   в мультиплеере — ещё время хозяина стола (hostAt) и место за столом;
// • у порции свой id (bid): если ответ потерялся и порция ушла дважды, дубль отбрасывается по bid.
// Выключить в своём браузере: ?tm= (пусто); вернуть: ?tm=on; другой приёмник: ?tm=<url>.
(function(){
  if(typeof track!=='function'||typeof pending==='undefined')return;
  const DEFAULT_URL='https://script.google.com/macros/s/AKfycbwWyE62gs3S_sF3NuT4iAktoNcXkq1uzjJIgO_pCfJjjjnvgN-2W3FOBHsZ2yqSzhCi/exec';
  const BUILD='__AB_BUILD__';              // хэш сборки, подставляет tools/build_mobile.py
  const OUTK=LS+'_outbox', DROPK=LS+'_outbox_dropped';
  const MAX_OUT=2.5e6;                     // ~2,5 МБ очереди; старшие порции вытесняются, счёт — в сводке
  const CHUNK=38000;                       // ячейка таблицы держит 50 000 символов — событий в порции меньше
  const lsGet=k=>{try{return localStorage.getItem(k);}catch(e){return null;}};
  const lsSet=(k,v)=>{try{localStorage.setItem(k,v);return true;}catch(e){return false;}};

  let URL_=DEFAULT_URL;
  try{const q=new URLSearchParams(location.search).get('tm');
    if(q!==null)lsSet('americanboy_tm',q===''?'off':q==='on'?'':q);
    const v=lsGet('americanboy_tm');if(v==='off')URL_='';else if(v)URL_=v;}catch(e){}

  // ---- время ----
  const pad=(n,w=2)=>String(Math.abs(Math.trunc(n))).padStart(w,'0');
  function isoLocal(ms){const d=new Date(ms),o=-d.getTimezoneOffset();
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(),3)}${o>=0?'+':'-'}${pad(o/60)}:${pad(o%60)}`;}
  let TZ='';try{TZ=Intl.DateTimeFormat().resolvedOptions().timeZone||'';}catch(e){}
  const mp=()=>{try{return window.MPTele&&window.MPTele.info();}catch(e){return null;}};
  // Начало партии: соло — S.startedAt, мультиплеер — старт стола по часам хозяина.
  function stamp(){
    const now=Date.now(),m=mp(),o={at:isoLocal(now)};
    if(m&&m.room){
      const h=m.hostNow?m.hostNow():now;o.hostAt=isoLocal(h);o.hostTs=h;
      if(m.startedAt)o.sec=Math.round((h-m.startedAt)/100)/10;
      o.room=m.room;if(m.match!=null)o.match=m.match;if(m.seat!=null)o.seat=m.seat;
      if(m.turnN!=null)o.turnN=m.turnN;if(m.round!=null)o.round=m.round;
    }else if(S&&S.startedAt)o.sec=Math.round((now-S.startedAt)/100)/10;
    return o;
  }
  // Каждое событие игры получает настоящее время (прототип ставил только t=Date.now()).
  {const base=track;track=function(type,data){return base.call(this,type,Object.assign({},data||{},stamp()));};}

  // ---- сводка партии (шапка лога) ----
  function summary(){
    let s={};try{s=summaryDoc();}catch(e){s={runId:S&&S.runId};}
    const m=mp(),now=Date.now();
    Object.assign(s,{build:BUILD,tz:TZ,tzOffsetMin:-new Date().getTimezoneOffset(),
      startedAtISO:s.startedAt?isoLocal(s.startedAt):null,updatedAtISO:isoLocal(now),
      dropped:+lsGet(DROPK)||0,url:location.pathname+location.search.replace(/([?&])tm=[^&]*/,'$1')});
    if(m&&m.room){
      // Место за столом — своя «партия»: runId у всех игроков стола разный, склейка — по room+match.
      s.runId=`mp-${m.room}-m${m.match||0}-${m.pid||'?'}`;
      s.player=m.name||s.player;
      s.mp={room:m.room,match:m.match,seat:m.seat,pid:m.pid,host:!!m.host,players:m.players,names:m.names,
        rounds:m.rounds,turnSec:m.turnSec,startedAt:m.startedAt||null,startedAtISO:m.startedAt?isoLocal(m.startedAt):null,
        phase:m.phase,mpBuild:m.mpBuild||null,clockOffMs:m.clockOff||0};
      if(m.phase==='over')s.finished=true;
    }
    return s;
  }

  // ---- очередь исходящих ----
  let out=[];try{out=JSON.parse(lsGet(OUTK)||'[]');if(!Array.isArray(out))out=[];}catch(e){out=[];}
  function save_(){
    let str=JSON.stringify(out);
    while(str.length>MAX_OUT&&out.length>1){out.shift();lsSet(DROPK,String((+lsGet(DROPK)||0)+1));str=JSON.stringify(out);}
    if(!lsSet(OUTK,str)){while(out.length>1){out.shift();lsSet(DROPK,String((+lsGet(DROPK)||0)+1));if(lsSet(OUTK,JSON.stringify(out)))break;}}
  }
  let seq=+lsGet(LS+'_outbox_seq')||0;
  const newBid=()=>{seq++;lsSet(LS+'_outbox_seq',String(seq));return Date.now().toString(36)+'-'+seq.toString(36)+'-'+Math.random().toString(36).slice(2,6);};
  // Положить порцию в очередь: события режутся так, чтобы ячейка таблицы их вместила.
  function enqueue(sum,events){
    events=events||[];
    const parts=[];let cur=[],len=0;
    for(const e of events){const l=JSON.stringify(e).length+1;if(cur.length&&len+l>CHUNK){parts.push(cur);cur=[];len=0;}cur.push(e);len+=l;}
    if(cur.length||!parts.length)parts.push(cur);
    for(const ev of parts){const bid=newBid();out.push({bid,body:JSON.stringify({summary:Object.assign({},sum,{bid,batchEvents:ev.length}),events:ev}),at:Date.now()});}
    save_();
  }

  // ---- спасение логов, сыгранных до включения отправки (плейтест 01.10) ----
  // Копии старых логов откладывает web/tm-rescue.js раньше прототипа (abrescue:<ключ>:<партия>).
  // Ставим в очередь с пометкой recovered и удаляем копию. Старые события — без поля at;
  // события новой телеметрии уже ушли обычным путём и не повторяются. Каждую партию — один раз.
  (function recover(){
    const RK='americanboy_recovered';let done={};try{done=JSON.parse(lsGet(RK)||'{}')||{};}catch(e){done={};}
    const mark=k=>{done[k]=Date.now();lsSet(RK,JSON.stringify(done));};
    const base=()=>({recovered:true,recoveredAt:isoLocal(Date.now()),build:BUILD,tz:TZ,url:location.pathname,player:lsGet('abmp_name')||null});
    function runlog(k,all){
      const id=(all.summary&&all.summary.runId)||all.runId,ev=(all.events||[]).filter(e=>!e.at);
      const tag='runlog:'+k+':'+id;if(!id||done[tag]||!ev.length)return;
      enqueue(Object.assign(base(),all.summary||{},{recovered:true,runId:id,source:k,recoveredEvents:ev.length}),ev);mark(tag);
    }
    function log(k,ev){
      ev=(Array.isArray(ev)?ev:[]).filter(e=>!e.at);if(!ev.length)return;
      const tag='log:'+k+':'+ev.length+':'+(ev[ev.length-1].t||0);if(done[tag])return;
      enqueue(Object.assign(base(),{runId:'recovered-'+k+'-'+(ev[0].t||0),source:k,recoveredEvents:ev.length}),ev);mark(tag);
    }
    function table(k,T){
      if(!T||!T.match||T.startedAt)return;const tag='table:'+k+':m'+T.match;if(done[tag])return;
      const ev=[];(T.log||[]).forEach((note,i)=>ev.push({type:'table_log',i,note:typeof note==='string'?note:JSON.stringify(note)}));
      (T.players||[]).forEach(p=>((p.s&&p.s.log)||[]).forEach((line,i)=>ev.push({type:'player_log',pid:p.pid,name:p.name,seat:p.seat,i,line:typeof line==='string'?line:JSON.stringify(line)})));
      if(!ev.length)ev.push({type:'table_empty'});
      enqueue(Object.assign(base(),{kind:'mp_table_recovered',runId:`mp-${T.room||k.slice(10)}-m${T.match}-table-recovered`,player:'стол '+(T.room||k.slice(10)),source:k,
        room:T.room||k.slice(10),match:T.match,phase:T.phase,settings:T.settings||null,result:T.result||null,finalRound:T.finalRound||null,
        turn:T.turn?{n:T.turn.n,round:T.turn.round,pid:T.turn.pid}:null,
        players:(T.players||[]).map(p=>({pid:p.pid,name:p.name,seat:p.seat,color:p.color,online:p.online,cash:p.s?Math.round(p.s.cash||0):null,laps:p.s?p.s.laps||0:null,
          pts:p.s?p.s.pts||0:null,stat:p.s?p.s.stat||null:null,loans:p.s&&p.s.loans?p.s.loans.length:0,owned:(p.s&&p.s.tiles||[]).filter(t=>t.owner).length})),
        tiles:(T.tiles||[]).filter(t=>t&&t.owner).map(t=>({i:t.i,type:t.type,name:t.name||null,owner:t.owner,tier:t.tier||null}))}),ev);
      mark(tag);
    }
    function one(k,raw){
      if(/_runlog$/.test(k))runlog(k,JSON.parse(raw||'{}'));
      else if(/_log$/.test(k)&&k!==LOGK)log(k,JSON.parse(raw||'[]'));
      else if(/^abmp_host_[A-Z]{4}$/.test(k))table(k,JSON.parse(raw||'null'));
    }
    let keys=[];try{for(let i=0;i<localStorage.length;i++)keys.push(localStorage.key(i));}catch(e){return;}
    for(const k of keys.filter(k=>k.startsWith('abrescue:'))){   // копии, отложенные до прототипа
      const raw=lsGet(k),src=k.slice(9).replace(/:[^:]*$/,'');
      try{localStorage.removeItem(k);}catch(e){}
      try{one(src,raw);}catch(e){}
    }
    for(const k of keys)if(!k.startsWith('abrescue:'))try{one(k,lsGet(k));}catch(e){}
  })();

  // ---- отправка: по одной порции, удаляем после «ok» ----
  const inflight=new Set();let busy=false,failAt=0;
  async function post(b,keepalive){
    inflight.add(b.bid);
    try{
      const r=await fetch(URL_,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:b.body,keepalive:!!keepalive&&b.body.length<60000,credentials:'omit'});
      const txt=await r.text();
      return r.ok&&/\bok\b/i.test(txt);
    }catch(e){return false;}
    finally{inflight.delete(b.bid);}
  }
  async function pump(keepalive){
    if(!URL_||busy||!out.length)return;
    if(!keepalive&&failAt&&Date.now()-failAt<15000)return;     // приёмник не ответил — подождём
    busy=true;
    try{
      while(out.length){
        const b=out[0];
        if(await post(b,keepalive)){out=out.filter(x=>x.bid!==b.bid);save_();failAt=0;}
        else{failAt=Date.now();break;}
      }
    }finally{busy=false;}
  }
  // Закрытие страницы: всё неотправленное — маячком. Порцию оставляем в очереди: подтверждения
  // маячок не даёт, при следующем открытии она уйдёт ещё раз (дубль отсекается по bid).
  function beaconAll(){
    if(!URL_||!navigator.sendBeacon)return;
    let budget=60000;
    for(const b of out){if(inflight.has(b.bid))continue;if(b.body.length>budget)break;
      try{if(navigator.sendBeacon(URL_,new Blob([b.body],{type:'text/plain;charset=utf-8'}))){budget-=b.body.length;b.beacon=Date.now();}}catch(e){}}
    save_();
  }

  // ---- точка входа вместо flush прототипа ----
  // Прототип: flush() → localFlush() держал полный лог одной (последней) партии в FULLK — это
  // оставляем для «Экспорта»; отправка теперь идёт через очередь.
  let lastFinal=0;
  function drain(final){
    if(PLAYTEST||!S)return;
    try{dispatchEvent(new CustomEvent('abtm:flush',{detail:{final:!!final}}));}catch(e){}   // хозяин стола сдаёт лог стола
    if(pending.length){
      const chunk=pending.splice(0,pending.length);
      chunk.forEach(e=>{if(!e.at&&e.t)e.at=isoLocal(e.t);});   // уходят сейчас — спасение (recover) их не повторит
      try{const all=JSON.parse(lsGet(FULLK)||'{}');if(all.runId!==S.runId){all.runId=S.runId;all.events=[];}
        all.events=(all.events||[]).concat(chunk).slice(-3000);all.summary=summary();lsSet(FULLK,JSON.stringify(all));}catch(e){}
      lsSet(LOGK,'[]');
      enqueue(summary(),chunk);
    }else if(final&&S.runId&&Date.now()-lastFinal>3000){lastFinal=Date.now();enqueue(summary(),[]);}   // конец партии — свежая сводка без событий
  }
  flush=function(final){drain(final);pump();};
  window.ABTelemetry={enqueue,stamp,isoLocal,summary,flush:()=>flush(),pump,get url(){return URL_;},get queued(){return out.length;},build:BUILD};

  // ---- когда отправлять ----
  document.addEventListener('visibilitychange',()=>{if(document.hidden){drain(false);pump(true);}else pump();});
  addEventListener('pagehide',()=>{drain(true);beaconAll();});
  addEventListener('online',()=>{failAt=0;pump();});
  setInterval(()=>{if(S&&pending.length)drain(false);pump();},30000);
  setTimeout(()=>pump(),2500);                                 // при запуске — досылаем прошлые партии
  // Конец партии (соло): финальная сводка сразу.
  let wasFinished=null;
  {const base=render;render=function(){const r=base.apply(this,arguments);
    try{const f=!!(S&&S.finished);if(wasFinished===false&&f)flush(true);wasFinished=f;}catch(e){}return r;};}
})();
