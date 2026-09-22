/* Same-origin bridge: prototype owns game state, Godot owns the 3D scene. */
window.MobileHost = (() => {
  let callback=null, nextId=1;
  const pending=new Map();
  const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)");
  const api={
    ready:false, points:[], sceneState:null,
    feedback(kind,x,y){window.GameFeedback?.play(kind,x,y);},
    frameState(json){api.sceneState=JSON.parse(json);},
    sceneReady(fn){callback=fn;api.ready=true;document.body.classList.add('engine-ready');window.MobileGame?.ready();api.send({action:"ambience",on:!reducedMotion.matches});},
    progress(percent){const el=document.getElementById('loadProgress');if(el)el.textContent=percent?percent+'%':'Загружаем поле…';},
    failed(message){api.ready=false;document.body.classList.remove('engine-ready');const el=document.getElementById('loadProgress');if(el)el.textContent='Не удалось открыть 3D. Перезагрузите страницу.';console.error(message);},
    send(data){if(callback)callback(JSON.stringify(data));},
    request(action,data={},timeout=25000){return new Promise((resolve,reject)=>{
      if(!api.ready){reject(new Error('Поле ещё загружается'));return;}
      const id=nextId++;const timer=setTimeout(()=>{pending.delete(id);reject(new Error('Сцена не ответила'));},timeout);
      pending.set(id,{resolve,reject,timer});api.send({action,id,...data});
    });},
    complete(id,value){const task=pending.get(id);if(!task)return;clearTimeout(task.timer);pending.delete(id);task.resolve(value);},
    stepDone(id){api.complete(id);},
    reactionDone(id){api.complete(id);},
    diceResult(a,b,lesson){window.MobileGame?.showDiceResult(a,b,lesson);},
    diceDone(id,a,b){api.complete(id,{a,b});},
    positions(json){api.points=JSON.parse(json);}
  };
  reducedMotion.addEventListener("change",()=>api.send({action:"ambience",on:!reducedMotion.matches}));
  return api;
})();
