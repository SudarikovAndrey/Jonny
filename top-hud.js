/* Approved paper HUD: presentation only, using each map's existing progress. */
(function(){
  function compactResource(value){
    const n=Number(value)||0,sign=n<0?'−':'',v=Math.abs(n);
    if(v<10000)return sign+Math.floor(v);
    const units=['K','M','B','T'];let i=Math.min(3,Math.floor(Math.log10(v)/3)-1),amount=v/(1000**(i+1));
    let text=amount.toFixed(amount<100?1:0).replace(/\.0$/,'');
    if(+text>=1000&&i<3){i++;text=(v/(1000**(i+1))).toFixed(1).replace(/\.0$/,'');}
    return sign+Math.min(9999,+text)+units[i];
  }
  if(typeof module!=='undefined'&&module.exports)module.exports={compactResource};
  if(typeof document==='undefined')return;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const gear='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="m13 2 6 0 1 5 4 2 4-2 3 5-4 3v4l4 2-3 5-5-2-3 2-1 5h-6l-1-5-4-2-4 2-3-5 4-3v-4l-4-2 3-5 5 2 3-2z" fill="#efdeb3"/><circle cx="16" cy="16" r="5" fill="#302b23"/></svg>';
  const portrait=$('bJohnnyTop');
  portrait.innerHTML='<img class="hud-portrait" src="assets/icons/hud-johnny.webp" alt=""><small id="tJ"></small><i class="hud-gear">'+gear+'</i>';
  portrait.setAttribute('aria-label','Настройки аккаунта');portrait.title='Настройки аккаунта';
  $('bHelp').textContent='?';$('bHelp').setAttribute('aria-label','Как играть');
  // Keep legacy nodes available to the core; they are no longer visible HUD controls.
  $('sTimer').hidden=true;$('bSettings').hidden=true;
  if(!$('q2')){const q=document.createElement('button');q.id='q2';q.className='qchip';q.innerHTML='<span></span><i></i>';q.hidden=true;$('qrow').append(q);}
  function mapProgress(){
    if(MAP1&&typeof m1Tasks==='function'){
      const tasks=m1Tasks();return {name:'Мейн-стрит',value:tasks.filter(q=>q.ok).length,goal:tasks.length,percent:tasks.reduce((a,q)=>a+q.v/q.goal,0)/tasks.length*100,unit:'задач'};
    }
    const names={brooklyn:'Бруклин',mainstreet:'Мейн-стрит',capital:'Столица',mainstreet2:'Мейн-стрит Б'};
    const next=nextMilestone(),goal=next?next.pts:CFG.MILESTONES.at(-1).pts;
    return {name:names[boardMap()]||META.maps[(S.meta?.map||5)-1]||'Бруклин',value:S.pts,goal,percent:Math.min(100,S.pts/goal*100),unit:'очков'};
  }
  renderHubGoal=function(){
    if(!S)return;
    const p=mapProgress(),el=$('bHub');
    el.className='chip hud-map';
    el.innerHTML=`<span class="hud-map-heading"><strong>${esc(p.name)}</strong><b>${compactResource(p.value)}<small>/${compactResource(p.goal)}</small></b></span><span class="hud-map-track" role="progressbar" aria-label="Прогресс карты ${esc(p.name)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(p.percent)}"><i style="width:${p.percent}%"></i></span>`;
    el.setAttribute('aria-label',`${p.name}: ${p.value} из ${p.goal} ${p.unit}`);
  };
  const openTicket=()=>{if(!moving)eventHub('ticket');};
  $('bHub').onclick=openTicket;$('bJohnny').onclick=openTicket;
  function decorateMissions(){
    if(MAP1){
      const ts=m1Tasks(),nodes=document.querySelectorAll('#m1Tasks .m1-task');
      nodes.forEach((el,i)=>{const q=ts[i];el.dataset.kind=q.id;el.style.setProperty('--mission-ratio',q.v/q.goal);el.setAttribute('aria-label',`${q.text(q.goal)}: ${q.v} из ${q.goal}`);});
      $('q2').hidden=true;$('qrow').dataset.count=String(ts.length);return;
    }
    $('qrow').dataset.count=String((S.q||[]).slice(0,3).filter(q=>!q.claimed).length);
    [0,1,2].forEach(i=>{
      const el=$('q'+i),q=S.q?.[i];el.hidden=!q||!!q.claimed;
      if(!q)return;
      el.dataset.kind=q.id;el.className='qchip'+(q.done&&!q.claimed?' done':'');
      el.querySelector('span').textContent=q.done&&!q.claimed?'Забрать: '+rwText(q.reward):q.text;
      el.style.setProperty('--mission-ratio',Math.min(1,q.prog/q.goal));
      el.setAttribute('aria-label',`${q.text}: ${Math.min(q.prog,q.goal)} из ${q.goal}${q.done&&!q.claimed?', забрать награду':''}`);
    });
  }
  // The first two quests retain core handlers; the optional third uses the same reward flow.
  $('q2').onclick=()=>{
    if(moving)return;const q=S.q?.[2];if(!q||q.claimed)return;
    if(!q.done){toast(`🎯 ${q.text} · ${Math.min(q.prog,q.goal)}/${q.goal} · ${rwText(q.reward)}`);return;}
    const r=q.reward;
    if(r.rolls){fly('🎲',AT.el('q2'),AT.dice(),3);S.rolls+=r.rolls;}
    if(r.cash){fly('💵',AT.el('q2'),AT.cash(),flyN(r.cash),{pulse:'sCash'});S.cash+=r.cash;}
    q.claimed=true;track('quest_claim',{id:q.id,goal:q.goal,reward:r});toast('🎯 Награда получена');save();render();
  };
  function refresh(){
    if(!S)return;
    renderHubGoal();
    for(const [id,value] of [['sCash',S.cash],['sHard',S.hard]]){
      const el=$(id);el.textContent=compactResource(value);el.title=String(value);el.setAttribute('aria-label',String(value));
    }
    document.querySelector('#top .bar1').classList.toggle('hud-wide-balances',compactResource(S.cash).length>4||compactResource(S.hard).length>3);
    $('tJ').textContent='ур. '+level();portrait.classList.remove('ready');
    decorateMissions();
    // Geometry is measured again after mission count, safe-area or orientation changes.
    requestAnimationFrame(()=>typeof mobileLayout==='function'&&mobileLayout());
  }
  const baseRender=render;render=function(){const out=baseRender.apply(this,arguments);refresh();return out;};
  portrait.onclick=()=>{
    if(moving)return;
    const card=$('card');card.className='card hud-account';
    card.innerHTML=`<button id="hudClose" class="xhead" aria-label="Закрыть"></button><h2>Настройки аккаунта</h2><label class="hud-name">Имя<input id="hudName" maxlength="24" autocomplete="nickname" value="${esc(S.player||'')}"></label><div class="hud-account-toggles"><button id="hudSound" class="sec"></button><button id="hudMusic" class="sec"></button></div><button id="hudCharacter" class="sec">Персонаж</button>${PLAYTEST?'<button id="hudTesting" class="sec">Меню тестирования</button>':''}<button id="hudSave" class="ok">Сохранить</button>`;
    function audioLabel(){
      [['hudSound','Звук',GameFeedback.muted],['hudMusic','Музыка',GameFeedback.musicMuted]].forEach(([id,label,off])=>{$(id).textContent=label+': '+(off?'выкл.':'вкл.');$(id).setAttribute('aria-pressed',String(!off));});
    }
    $('hudClose').onclick=()=>closeModal();
    audioLabel();$('hudSound').onclick=()=>{GameFeedback.toggle();audioLabel();};$('hudMusic').onclick=()=>{GameFeedback.toggleMusic();audioLabel();};
    $('hudCharacter').onclick=()=>{closeModal();johnny();};
    if($('hudTesting'))$('hudTesting').onclick=()=>{card.className='card';settings();};
    $('hudSave').onclick=()=>{const name=$('hudName').value.trim();if(!name){$('hudName').focus();return;}S.player=name;save();closeModal();render();};
    openCustom();
  };
  // env(safe-area-inset-top) is supplied by the browser/native host, not a guessed device model.
  new ResizeObserver(()=>{if(typeof mobileLayout==='function')mobileLayout();}).observe($('top'));
  window.addEventListener('orientationchange',()=>requestAnimationFrame(refresh));
  refresh();
})();
