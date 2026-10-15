/* Мост в пределах одного origin: прототип владеет состоянием игры, веб-поле (board.html) — 3D-сценой. */
window.MobileHost = (() => {
  let callback=null, nextId=1, lastSign=Date.now();
  const pending=new Map();
  const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)");
  const api={
    ready:false, points:[], sceneState:null,
    feedback(kind,x,y){window.GameFeedback?.play(kind,x,y);},
    frameState(json){api.sceneState=JSON.parse(json);},
    sceneReady(fn){callback=fn;api.ready=true;document.body.classList.add('engine-ready');window.MobileGame?.ready();api.send({action:"ambience",on:!reducedMotion.matches});},
    progress(percent){
      lastSign=Date.now();
      const el=document.getElementById('loadProgress');
      if(el)el.textContent=percent?'Загружаем поле · '+percent+'%':'Загружаем поле…';
      const bar=document.getElementById('loadBar');
      if(bar)bar.style.width=(percent||0)+'%';
      const box=bar&&bar.parentElement;
      if(box)box.setAttribute('aria-valuenow',String(percent||0));
    },
    failed(message){
      api.ready=false;document.body.classList.remove('engine-ready');const el=document.getElementById('loadProgress');if(el)el.textContent='Не удалось открыть 3D. Перезагрузите страницу.';console.error(message);},
    send(data){if(callback)callback(JSON.stringify(data));},
    request(action,data={},timeout=25000){return new Promise((resolve,reject)=>{
      if(!api.ready){reject(new Error('Поле ещё загружается'));return;}
      const id=nextId++;const timer=setTimeout(()=>{pending.delete(id);reject(new Error('Сцена не ответила'));},timeout);
      pending.set(id,{resolve,reject,timer});api.send({action,id,...data});
    });},
    complete(id,value){const task=pending.get(id);if(!task)return;clearTimeout(task.timer);pending.delete(id);task.resolve(value);},
    stepDone(id){api.complete(id);},
    reactionDone(id){api.complete(id);},
    diceResult(a,b,lesson,x,y){window.MobileGame?.showDiceResult(a,b,lesson,x,y);},
    diceDone(id,a,b){api.complete(id,{a,b});},
    positions(json){api.points=JSON.parse(json);}
  };
  // Страховка: веб-поле молчит — сначала перезапускаем загрузку сами, потом уже ошибка. Считаем от последнего шага
  // загрузки, а не от старта: на холодном кэше Канзас грузится дольше 15 с, хотя исправно шлёт проценты (02.10, «Графика»).
  // Время скрытой вкладки не считается (m8-slowload, 14.10): в фоне requestAnimationFrame стоит, поле не дорисовывается,
  // а сторож раньше всё равно отсчитывал 20 с и показывал «Перезагрузите страницу». Вернулись — ждём заново.
  // Встала на видимой вкладке — 20 с без процента или 90 с без готовности: тихо перезапускаем поле (до 2 раз).
  let idle=0,shown=0,tick=Date.now(),restarts=0;
  const visible=()=>document.visibilityState!=='hidden';
  document.addEventListener('visibilitychange',()=>{tick=Date.now();if(visible())idle=0;});
  const restart=frame=>{
    restarts++;idle=0;shown=0;lastSign=Date.now();
    const el=document.getElementById('loadProgress');if(el)el.textContent='Загружаем поле заново…';
    console.warn('Поле не грузится — перезапуск загрузки',restarts);
    try{frame.contentWindow.location.reload();}catch(e){const src=frame.src;frame.src='about:blank';setTimeout(()=>{frame.src=src;},50);}
  };
  const watch=setInterval(()=>{
    if(api.ready){clearInterval(watch);return;}
    const frame=document.getElementById('board-frame'),now=Date.now(),dt=now-tick;tick=now;
    if(!frame||!/board\.html/.test(frame.src))return;
    if(!visible())return;
    if(lastSign>now-dt)idle=now-lastSign;else idle+=dt;   // процент пришёл за этот такт — отсчёт с него
    shown+=dt;
    if(idle<=20000&&shown<=90000)return;
    if(restarts<2){restart(frame);return;}
    clearInterval(watch);api.failed(shown>90000?'поле не поднялось за 90 с видимой вкладки':'загрузка поля встала на 20 с видимой вкладки');
  },2000);
  reducedMotion.addEventListener("change",()=>api.send({action:"ambience",on:!reducedMotion.matches}));
  return api;
})();
