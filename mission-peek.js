// ===== Миссии сверху — свёрнуты, выезжают, когда действие игрока их продвигает =====
// Плейтест 01.10: три миссии постоянно висели над полем и мешали. Ряд #qrow вынесен из
// потока шапки (поле получает его место) и показывается на несколько секунд, когда растёт
// прогресс любой миссии, появляется новая или миссию можно забрать — тогда до забора.
(function(){
  const row=$('qrow');if(!row)return;
  const PEEK=3600;
  let last=null,timer=0,first=true;
  const chips=()=>[...row.querySelectorAll('.qchip:not([hidden]), .m1-task')].filter(e=>e.offsetParent!==null||e.closest('#m1Tasks,#sfTasks'));
  const ratio=e=>parseFloat(e.style.getPropertyValue('--mission-ratio'))||0;
  const claimable=()=>chips().some(e=>e.classList.contains('done'));
  function snapshot(){return chips().map(e=>({k:(e.dataset.kind||'')+'|'+(e.querySelector('span')?.textContent||''),r:ratio(e),ok:e.classList.contains('done')||e.classList.contains('ok')}));}
  function peek(bumped){
    document.body.classList.add('missions-peek');
    bumped.forEach(e=>{e.classList.remove('mission-bump');void e.offsetWidth;e.classList.add('mission-bump');});
    clearTimeout(timer);
    timer=setTimeout(()=>{timer=0;if(!claimable())document.body.classList.remove('missions-peek');},PEEK);
  }
  function check(){
    const now=snapshot(),els=chips();
    if(first){first=false;last=now;if(now.length)peek([]);return;}   // первый показ — чтобы игрок знал, что миссии есть
    const prev=new Map((last||[]).map(x=>[x.k,x]));
    const bumped=els.filter((e,i)=>{const p=prev.get(now[i].k);return !p||now[i].r>p.r+1e-6||(now[i].ok&&!p.ok);});
    last=now;
    if(bumped.length)peek(bumped);
    else if(claimable())document.body.classList.add('missions-peek');
    else if(!timer)document.body.classList.remove('missions-peek');
  }
  // проверяем после кадра: шапка (top-hud.js) пишет --mission-ratio в своей обёртке render
  let queued=false;
  const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;try{check();}catch(e){}});};
  const base=render;render=function(){const r=base.apply(this,arguments);schedule();return r;};
  // тап по свёрнутому ряду не нужен: шапка «Билета» открывает все задания
  addEventListener('load',()=>setTimeout(schedule,400));
})();
