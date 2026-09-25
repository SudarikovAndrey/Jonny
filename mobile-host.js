/* Мост в пределах одного origin: прототип владеет состоянием игры, веб-поле (board.html) — 3D-сценой. */
window.MobileHost = (() => {
  let callback=null, nextId=1;
  const pending=new Map();
  const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)");
  const api={
    ready:false, points:[], sceneState:null,
    feedback(kind,x,y){window.GameFeedback?.play(kind,x,y);},
    frameState(json){api.sceneState=JSON.parse(json);},
    sceneReady(fn){callback=fn;api.ready=true;document.body.classList.add('engine-ready');window.MobileGame?.ready();api.send({action:"ambience",on:!reducedMotion.matches});},
    progress(percent){
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
  // Страховка: веб-поле не ответило за 15 секунд — показываем ошибку.
  setTimeout(()=>{const frame=document.getElementById('board-frame');if(!api.ready&&frame&&/board\.html/.test(frame.src))api.failed('нет ответа за 15 с');},15000);
  reducedMotion.addEventListener("change",()=>api.send({action:"ambience",on:!reducedMotion.matches}));
  return api;
})();
