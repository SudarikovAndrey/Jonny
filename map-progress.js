/* One absolute progress model for the map HUD and its three reward milestones. */
(function(){
 function progressModel(points,milestones){
  const value=Math.max(0,Number(points)||0),steps=milestones.map((m,i)=>({...m,index:i})).sort((a,b)=>a.pts-b.pts),goal=Math.max(1,steps.at(-1)?.pts||1);
  return {value,goal,percent:Math.min(100,value/goal*100),next:steps.find(m=>value<m.pts)||null,steps:steps.map(m=>({...m,percent:m.pts/goal*100,done:value>=m.pts}))};
 }
 if(typeof module!=='undefined'&&module.exports)module.exports={progressModel};
 if(typeof document==='undefined')return;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const names={brooklyn:'Бруклин',mainstreet:'Мейн-стрит',capital:'Столица',mainstreet2:'Мейн-стрит Б'};
 const mapName=()=>MAP1?'Мейн-стрит':names[boardMap()]||META.maps[(S.meta?.map||5)-1]||'Бруклин';
 function current(){return {...progressModel(S.pts,CFG.MILESTONES),name:mapName(),unit:'очков'};}
 function render(tabs){
  const p=current(),firstTasks=MAP1?m1Tasks():null,doneToday=S.finished||(S.parcelSent&&parcelsBehind()<=0),catchup=S.parcelSent&&parcelsBehind()>0;
  const header=`<header class="mp-head"><span class="mp-stamp" aria-hidden="true"></span><div class="mp-title"><h2>${esc(p.name)}</h2><span>Прогресс карты</span></div><button id="hNo" class="xhead" aria-label="Закрыть"></button><div class="mp-score"><strong>${firstTasks?firstTasks.filter(q=>q.ok).length+'/'+firstTasks.length:p.value}</strong><span>${firstTasks?'задач выполнено':'очков накоплено'}</span></div><div class="mp-city" aria-hidden="true"></div><p class="mp-time">До конца события: <b>${lbTimeLeft()}</b></p></header>`;
  const rows=p.steps.slice().reverse().map(m=>{
   const next=p.next?.pts===m.pts;
   return `<article class="mp-reward ${m.done?'earned':next?'next':'locked'}" style="--at:${100-m.percent}" aria-label="${esc(m.name)}: ${m.done?'получено':'при '+m.pts+' очках'}">
    <span class="mp-art ${m.index===0?'ticket':m.index===1?'rare':'legend'}" aria-hidden="true"></span>
    <div class="mp-reward-copy">${next?'<small class="mp-next-label">Следующий рубеж</small>':''}<h3>${esc(m.name)}</h3><p>${m.index===0?esc(m.reward):'Улучшение главного героя'}</p>${m.index>0?`<p class="mp-benefit">${esc(m.index===1?'Редкий ранг + Special Case':m.index===2?'Уникальный облик + Big Case + место в топе':m.reward)}</p>`:''}
    <span class="mp-state ${m.done?'done':''}">${m.done?'<b>✓</b> Получено':`<span class="mp-lock" aria-hidden="true">${passIcon('lock')}</span> При ${m.pts} очках`}</span>${next?`<strong class="mp-remaining">Ещё ${m.pts-p.value} очков</strong>`:''}</div></article>`;
  }).join('');
  const ticks=p.steps.map(m=>`<span class="mp-tick ${m.done?'done':''}" style="bottom:${m.percent}%"><b>${m.pts}</b></span>`).join('');
  const path=`<div class="mp-path"><div class="mp-rail" role="progressbar" aria-label="Общий прогресс карты" aria-valuemin="0" aria-valuemax="${p.goal}" aria-valuenow="${Math.min(p.goal,p.value)}" aria-valuetext="${p.value} очков. ${p.next?'Следующий рубеж '+p.next.pts:'Все рубежи достигнуты'}"><i style="height:${p.percent}%"></i>${ticks}<span class="mp-zero">0</span><em class="mp-current" style="bottom:${p.percent}%" title="${p.value} очков"><span>${p.value}</span></em></div>${rows}</div>`;
  const tasks=MAP1?`<div class="mp-first-map"><h3>Задачи Мейн-стрит</h3><p>Прогресс этой карты зависит от трёх задач.</p>${m1Tasks().map(q=>`<div><b>${esc(q.text(q.goal))}</b><span>${q.v}/${q.goal}</span><progress max="${q.goal}" value="${q.v}"></progress></div>`).join('')}</div>`:'';
  return header+`<div class="mp-scroll">${tasks||path}</div><footer class="mp-foot"><div class="mp-shipping"><img src="assets/icons/crate.webp" alt=""><p>${S.finished?'Событие завершено':doneToday?'Сегодняшняя поставка отправлена':catchup?'Наверстай пропущенную поставку':'Отправляй товары — получай очки'}</p><button class="hard" id="mpShip" ${doneToday?'disabled':''}>${doneToday?(S.finished||S.day>=CFG.DAYS?'Отправлено':'До завтра'):catchup?'Допоставка ›':'К поставке ›'}</button></div><p class="mp-note">Очки карты учитываются в пропуске и рейтинге</p>${tabs}</footer>`;
 }
 window.MapProgress={current,render,progressModel,mount(card){requestAnimationFrame(()=>{const scroller=card.querySelector('.mp-scroll'),next=card.querySelector('.mp-reward.next');if(scroller&&next)scroller.scrollTop=Math.max(0,next.offsetTop-scroller.clientHeight/2);});}};
})();
