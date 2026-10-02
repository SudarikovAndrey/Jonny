// ===== Спасение логов, сыгранных до включения отправки (плейтест 01.10) =====
// Грузится раньше прототипа: тот при первом же сбросе новой партии затирает <режим>_runlog.
// Здесь только откладываем копии старых логов в abrescue:<ключ>; отправляет их web/telemetry.js
// и сразу удаляет копию. Старые = события без поля at (его ставит новая телеметрия),
// столы мультиплеера — без startedAt.
(function(){try{
  const RK='americanboy_recovered';let done={};try{done=JSON.parse(localStorage.getItem(RK)||'{}')||{};}catch(e){}
  const keys=[];for(let i=0;i<localStorage.length;i++)keys.push(localStorage.key(i));
  for(const k of keys){try{
    const raw=localStorage.getItem(k);if(!raw)continue;let id='';
    if(/_runlog$/.test(k)){const a=JSON.parse(raw);id=(a.summary&&a.summary.runId)||a.runId;
      if(!id||done['runlog:'+k+':'+id]||!(a.events||[]).some(e=>!e.at))continue;}
    else if(/_log$/.test(k)){const a=JSON.parse(raw);if(!Array.isArray(a)||!a.some(e=>!e.at))continue;id='log';}
    else if(/^abmp_host_[A-Z]{4}$/.test(k)){const T=JSON.parse(raw);if(!T||!T.match||T.startedAt)continue;id='m'+T.match;
      if(done['table:'+k+':'+id])continue;}
    else continue;
    const rk='abrescue:'+k+':'+id;if(!localStorage.getItem(rk))localStorage.setItem(rk,raw);
  }catch(e){}}
}catch(e){}})();
