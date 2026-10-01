/* Daily shipment: presentation only. The existing transaction commits and saves
   before this scene starts; skip/replay/resize cannot award anything twice. */
window.ShipmentEvent=(()=>{
 const NS='http://www.w3.org/2000/svg',ART='assets/shipment/';
 const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
 const ease=t=>1-(1-clamp(t))**3;
 const lerp=(a,b,t)=>a+(b-a)*t;
 const svg=(tag,attrs={},parent)=>{const el=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))el.setAttribute(k,v);parent?.append(el);return el;};
 const sound=key=>{try{GameFeedback.sound(key);}catch{}};
 let active=null;
 function cargoPlan(box,k=1){
  const ids=Object.keys(box).filter(id=>box[id]>0),remaining=Object.fromEntries(ids.map(id=>[id,Math.max(0,Math.floor(box[id]*k))]));
  const count=Object.values(remaining).reduce((a,b)=>a+b,0),items=[];
  if(!count)return items;
  const flat=[];
  while(flat.length<count){for(const id of ids){if(remaining[id]>0&&flat.length<count){flat.push(id);remaining[id]--;}}}
  // One crate per item. Large loads overlap into a brisk stream, rather than
  // extending the event by one animation per unit.
  const spread=Math.min(2300,Math.max(0,count-1)*180);
  for(let i=0;i<count;i++)items.push({id:flat[i],start:550+(count>1?i/(count-1)*spread:0),duration:880+(i%3)*30});
  return items;
 }
 let stageModule;
 const loadStage=()=>stageModule||(stageModule=import(window.SHIPMENT_STAGE_URL||'./shipment-stage.js').catch(e=>{stageModule=null;throw e;}));
 // Pick a renderer once. A late WebGL scene is disposed, never swapped into an
 // animation already in flight.
 async function chooseStage(pending,timeout=2500){
  let expired=false,timer;
  const ready=pending.then(stage=>{if(expired){stage.dispose();return null;}return stage;}).catch(()=>null);
  const stage=await Promise.race([ready,new Promise(resolve=>{timer=setTimeout(()=>{expired=true;resolve(null);},timeout);})]);
  clearTimeout(timer);return stage;
 }
 if(typeof document!=='undefined')setTimeout(()=>loadStage().then(m=>m.preload()).catch(()=>{}),1200);
 // One uninterrupted trajectory: approach the near opening, then settle inside it.
 function cargoPose(index,t,count=18){
  t=clamp(t);const entry=.68,col=index%3,row=Math.floor(index%18/3);
  const depth=Math.floor(index/18)/Math.max(1,Math.ceil(count/18)-1);
  let x,y,scale,angle;
  if(t<entry){const u=t/entry,v=1-u;
   x=v*v*v*(200+(index%2)*38)+3*v*v*u*130+3*v*u*u*180+u*u*u*267;
   y=v*v*v*1110+3*v*v*u*945+3*v*u*u*660+u*u*u*725;
   scale=lerp(1.08,.78,u);angle=lerp(-8+(index%3)*6,0,u);
  }else{const u=ease((t-entry)/(1-entry));
   x=lerp(267,lerp(350+col*32,258+col*53,depth),u);y=lerp(725,lerp(594+col*9-row*26,690+col*14-row*42,depth),u);
   scale=lerp(.78,lerp(.36,.56,depth),u);angle=Math.sin(u*Math.PI*2)*2*(1-u);
  }
  return {x,y,scale,angle,inside:t>=entry,landed:t===1};
 }
 function doorMatrix(side,closed){
  const angle=(1-clamp(closed))*1.87,sign=side==='left'?1:-1;
  return [sign*212*Math.cos(angle)-205*Math.sin(angle),sign*57*Math.cos(angle)+112*Math.sin(angle),0,479,side==='left'?111:535,side==='left'?268:382];
 }
 function textSafe(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 function createScene(data){
  const dialog=document.createElement('dialog');dialog.className='shipment-event';dialog.setAttribute('aria-label','Отправка груза');
  const milestones=CFG.MILESTONES,goal=milestones.at(-1)?.pts||1350,after=data.before+data.points;
  const mapName=window.MapProgress?.current().name||'Бруклин';
  dialog.innerHTML=`<div class="shipment-layout"><header class="shipment-header"><span class="shipment-day">${data.catchUp?'Допоставка':data.training?'Пробная посылка':'Поставка дня'} · ${data.day}</span><h2>Грузим контейнер</h2></header><div class="shipment-stage" aria-hidden="true"></div><section class="shipment-caption" aria-live="polite"><p class="shipment-phase">Готовим отправку</p><p class="shipment-detail">${data.units} шт. груза</p></section><section class="shipment-result" hidden aria-label="Результат поставки"><span class="shipment-stamp">ОТПРАВЛЕНО</span><h2>Хорошая работа!</h2><strong class="shipment-score">+<span>0</span></strong><p class="shipment-score-label">очков карты</p><div class="shipment-progress-title"><b>${textSafe(mapName)}</b><strong class="shipment-total">${data.before} / ${goal}</strong></div><div class="shipment-meter"><i></i>${milestones.map(m=>`<span style="left:${m.pts/goal*100}%" class="shipment-tick"><b>${m.pts}</b></span>`).join('')}</div><p class="shipment-next"></p><button class="ok shipment-continue" type="button" disabled>Продолжить</button></section></div>`;
  const stage=dialog.querySelector('.shipment-stage');
  const art=svg('svg',{viewBox:'-190 -345 1260 1480',role:'presentation'},stage);
  const defs=svg('defs',{},art),clip=svg('clipPath',{id:'shipment-mouth'},defs);
  svg('polygon',{points:'111,268 535,382 535,861 111,747'},clip);
  const lift=svg('g',{'data-lift':''},art),rig=svg('g',{'data-rig':''},lift);
  // The cable reaches past the viewport in every pose; all slings share the hook.
  svg('path',{d:'M505 -5000 L505 -293 M519 -5000 L519 -293',stroke:'#171713','stroke-width':10,fill:'none'},lift);
  svg('path',{d:'M509 -5000 L509 -293',stroke:'#b7b39e','stroke-width':3,fill:'none'},lift);
  const rear=svg('g',{'stroke-linecap':'round',fill:'none'},rig);
  for(const [x,y]of [[441,65],[905,164]]){svg('path',{d:`M514 -182 L${x} ${y}`,stroke:'#191b18','stroke-width':12},rear);svg('path',{d:`M514 -182 L${x} ${y}`,stroke:'#929589','stroke-width':5},rear);}
  svg('image',{href:ART+'container-open.webp',width:1000,height:1000},rig);
  const stock=svg('g',{'clip-path':'url(#shipment-mouth)'},rig);
  const flights=svg('g',{},rig);
  function door(side){
   const g=svg('g',{'data-door':side},rig);
   svg('rect',{x:0,y:0,width:1,height:1,fill:'#a43121',stroke:'#251b15','stroke-width':.018},g);
   const texture=svg('svg',{x:0,y:0,width:1,height:1,viewBox:'175 35 674 1464',preserveAspectRatio:'none',overflow:'hidden'},g);
   svg('image',{href:ART+'door.webp',width:1024,height:1536},texture);return g;
  }
  const doors=[door('left'),door('right')];
  const sling=svg('g',{'stroke-linecap':'round',fill:'none'},rig);
  for(const [x,y]of [[109,216],[567,325]]){svg('path',{d:`M514 -182 L${x} ${y}`,stroke:'#171916','stroke-width':12},sling);svg('path',{d:`M514 -182 L${x} ${y}`,stroke:'#a6a48e','stroke-width':5},sling);}
  // Inked crane block, steel hook and painted caution stripes.
  svg('path',{d:'M477 -298 L541 -298 L555 -269 L543 -210 L503 -198 L472 -226 Z',fill:'#d7a331',stroke:'#241e17','stroke-width':9,'stroke-linejoin':'round'},rig);
  svg('path',{d:'M477 -278 L491 -292 M480 -237 L518 -284 M512 -211 L543 -247',stroke:'#3c3526','stroke-width':16},rig);
  svg('path',{d:'M516 -201 C502 -188 509 -167 524 -174 C541 -182 530 -195 526 -190',stroke:'#1f201c','stroke-width':17,fill:'none','stroke-linecap':'round'},rig);
  svg('path',{d:'M514 -199 C507 -189 511 -174 523 -178',stroke:'#b8b4a2','stroke-width':5,fill:'none','stroke-linecap':'round'},rig);
  const flash=svg('g',{stroke:'#efc866','stroke-width':9,'stroke-linecap':'round',opacity:0},rig);
  for(const [x,y,dx,dy]of [[60,455,-42,-20],[32,520,-45,0],[735,440,42,-20],[757,510,45,0]])svg('path',{d:`M${x} ${y} l${dx} ${dy}`},flash);
  return {dialog,lift,rig,stock,flights,doors,flash,goal,after,milestones};
 }
 async function play(input){
  if(active)return active.promise;
  const data={...input,box:{...input.box},units:input.units??Object.values(input.box).reduce((a,b)=>a+b,0)*(input.k||1)};
  let resolve;const promise=new Promise(r=>resolve=r);active={promise};
  const previousFocus=document.activeElement,state=createScene(data),{dialog,lift,rig,stock,flights,doors,flash,goal,after,milestones}=state;
  const caption=dialog.querySelector('.shipment-caption'),result=dialog.querySelector('.shipment-result'),phase=dialog.querySelector('.shipment-phase'),detail=dialog.querySelector('.shipment-detail');
  const nextButton=dialog.querySelector('.shipment-continue');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)'),plan=cargoPlan(data.box,data.k);
  const closeAt=Math.max(1600,...plan.map(p=>p.start+p.duration))+250,resultAt=closeAt+760,liftAt=resultAt+750,endAt=liftAt+1050;
  const particles=plan.map((p,i)=>{
   const carrier=svg('g',{opacity:0},flights),pic=svg('g',{},carrier);
   svg('ellipse',{cx:0,cy:78,rx:65,ry:15,fill:'#17130d',opacity:.25},pic);
   svg('image',{href:ART+'cargo-crate.webp',x:-90,y:-90,width:180,height:180},pic);
   const label=svg('g',{transform:'matrix(1 .13 0 1 -47 -29)'},pic);
   svg('image',{href:`assets/goods/${p.id}.webp`,width:66,height:66},label);
   return {...p,i,pic,carrier};
  });
  let stage3d=null;
  let frame=0,lastStamp=0,time=0,lastPhase='',finished=false,disposed=false,skipped=false,shown=false;
  const soundOnce=new Set();
  const soundAt=(id,key)=>{if(soundOnce.has(id)||skipped)return;soundOnce.add(id);sound(key);};
  const status=(title,note)=>{if(lastPhase===title)return;lastPhase=title;phase.textContent=title;detail.textContent=note;};
  function paint(ms){
   const simple=reduced.matches||input.reduceMotion||CFG.SPEED>=100;
   const visual=simple||ms>=endAt?endAt:ms;
   dialog.classList.toggle('shipment-reduced',simple);
   stage3d?.update({time:visual,closeAt,liftAt,endAt,simple});
   dialog.dataset.phase=visual<600?'ready':visual<closeAt?'loading':visual<resultAt?'closing':visual<liftAt?'result':visual<endAt?'lifting':'done';
   const enter=ease(visual/550),liftT=simple?0:clamp((visual-liftAt)/1050)**2.2;
   lift.setAttribute('transform',`translate(0,${lerp(-260,0,enter)-liftT*2400})`);
   const sway=simple?0:Math.sin(visual/500)*.45*(visual<closeAt?1:.35);
   rig.setAttribute('transform',`rotate(${sway} 514 -210)`);
   for(const p of particles){
    const t=clamp((visual-p.start)/p.duration),pose=cargoPose(p.i,t,plan.length);
    if(pose.inside)p.carrier.setAttribute('clip-path','url(#shipment-mouth)');else p.carrier.removeAttribute('clip-path');
    p.pic.setAttribute('transform',`translate(${pose.x} ${pose.y}) rotate(${pose.angle}) scale(${pose.scale})`);
    p.carrier.setAttribute('opacity',t>0?1:0);
    if(pose.landed&&p.i%Math.max(1,Math.ceil(plan.length/12))===0)soundAt('cargo'+p.i,'step');
   }
   const left=ease((visual-closeAt)/510),right=ease((visual-closeAt-130)/510);
   doors.forEach((d,i)=>d.setAttribute('transform',`matrix(${doorMatrix(i?'right':'left',i?right:left).join(' ')})`));
   const hit=clamp((visual-closeAt-570)/230);
   flash.setAttribute('opacity',hit>0&&hit<1?1-hit:0);
   if(visual>=closeAt+640)soundAt('doors','land');
   if(visual<600)status('Готовим отправку',`${data.units} шт. груза`);
   else if(visual<closeAt)status('Загружаем товары',`${Math.round(data.units*particles.filter(p=>visual>=p.start+p.duration).length/Math.max(1,particles.length))} / ${data.units} шт.`);
   else if(visual<resultAt)status('Груз на месте', 'Закрываем контейнер');
   if(visual>=resultAt){
    if(!shown){shown=true;soundAt('reward','joy');}
    status('+'+data.points+' очков',visual<liftAt?'Груз готов к отправке':'В добрый путь!');
    const progress=simple||skipped?1:ease((visual-resultAt)/900),points=Math.round(data.before+data.points*progress);
    dialog.querySelector('.shipment-score span').textContent=Math.round(data.points*progress);
    dialog.querySelector('.shipment-total').textContent=`${points} / ${goal}`;
    dialog.querySelector('.shipment-meter i').style.width=clamp(points/goal)*100+'%';
    dialog.querySelectorAll('.shipment-tick').forEach((tick,i)=>tick.classList.toggle('earned',points>=milestones[i].pts));
    const crossed=milestones.filter(m=>m.pts>data.before&&m.pts<=points),next=milestones.find(m=>m.pts>points);
    dialog.querySelector('.shipment-next').textContent=crossed.length?'Новая награда открыта!':next?`До «${next.name}» — ${next.pts-points} очков`:'Все рубежи карты достигнуты!';
   }
   if(visual>=endAt&&!finished){finished=true;dialog.querySelector('.shipment-header').hidden=true;caption.hidden=true;result.hidden=false;dialog.classList.add('has-result');nextButton.disabled=false;nextButton.focus({preventScroll:true});}
  }
  function tick(stamp){
   if(disposed)return;
   if(!document.hidden){time+=Math.min(70,stamp-lastStamp);if(!lastStamp)time=0;paint(time);}
   lastStamp=stamp;
   if(!finished)frame=requestAnimationFrame(tick);
  }
  function skip(){if(finished)return;skipped=true;cancelAnimationFrame(frame);time=endAt;paint(time);}
  function finish(){
   if(disposed||!finished)return;disposed=true;stage3d?.dispose();cancelAnimationFrame(frame);reduced.removeEventListener('change',onReduced);document.removeEventListener('visibilitychange',onVisibility);
   dialog.close();dialog.remove();document.body.classList.remove('shipment-playing');active=null;previousFocus?.isConnected&&previousFocus.focus({preventScroll:true});resolve();
  }
  function onReduced(){if(reduced.matches)skip();}
  function onVisibility(){lastStamp=performance.now();}
  nextButton.onclick=finish;
  dialog.addEventListener('cancel',e=>{e.preventDefault();if(finished)finish();else skip();});
  document.body.append(dialog);document.body.classList.add('shipment-playing');
  dialog.showModal();dialog.focus({preventScroll:true});paint(0);
  reduced.addEventListener('change',onReduced);document.addEventListener('visibilitychange',onVisibility);
  const images=[ART+'container-open.webp',ART+'door.webp',ART+'cargo-crate.webp',...new Set(plan.map(p=>`assets/goods/${p.id}.webp`))];
  // Decode before the first flight; a failed asset must never lock the result.
  const fallbackReady=Promise.race([Promise.all(images.map(src=>{const im=new Image();im.src=src;return im.decode().catch(()=>{});})),new Promise(r=>setTimeout(r,1600))]);
  chooseStage(loadStage().then(m=>m.create(dialog.querySelector('.shipment-stage'),{plan,units:data.units}))).then(async stage=>{
   if(disposed||finished){stage?.dispose();return;}
   stage3d=stage;
   if(stage3d)dialog.querySelector('.shipment-stage>svg').style.display='none';else await fallbackReady;
   if(disposed||finished)return;
   time=input.previewAt!==undefined?Number(input.previewAt)||0:0;paint(time);
   stage3d?.reveal();dialog.classList.add('scene-ready');dialog.dataset.renderer=stage3d?'webgl':'painted';
   if(input.previewAt!==undefined)return;lastStamp=performance.now();if(reduced.matches||input.reduceMotion||CFG.SPEED>=100)skip();else frame=requestAnimationFrame(tick);
  });
  return promise;
 }
 function celebrate(m,{reduceMotion=false,premium=false,waiting=0}={}){
  const index=CFG.MILESTONES.findIndex(step=>step.pts===m.pts),dialog=document.createElement('dialog');
  const previousFocus=document.activeElement;
  dialog.className='shipment-milestone';dialog.setAttribute('aria-label',premium?m.name:'Новый рубеж: '+m.name);
  const description=premium?(waiting?'Доступны награды за '+waiting+' уровней':'Премиум-награды на каждой ступени'):index===0?'Джонни вступает в банду':index===1?'Редкий ранг + Special Case':'Уникальный облик + Big Case';
  dialog.innerHTML=`<div class="shipment-award"><div class="shipment-award-marquee"><img class="shipment-prize-backdrop" src="${ART}reward-marquee.webp" alt="Новая награда"><div class="shipment-award-content"><div class="shipment-award-art ${premium||index===0?'ticket':index===1?'rare':'legend'}" role="img" aria-label="${textSafe(m.name)}"></div><div><h2>${textSafe(m.name)}</h2><strong class="shipment-award-seal">${premium?'ПРОПУСК АКТИВЕН':'✓ '+m.pts+' очков'}</strong></div></div></div><p class="shipment-award-description">${description}</p><button class="shipment-continue" type="button">Отлично!</button></div>`;
  document.body.append(dialog);dialog.showModal();
  const button=dialog.querySelector('button'),art=dialog.querySelector('.shipment-award-art'),marquee=dialog.querySelector('.shipment-award-marquee');
  const simple=reduceMotion||matchMedia('(prefers-reduced-motion:reduce)').matches||CFG.SPEED>=100,animations=[];
  if(!simple){
   animations.push(marquee.animate([{transform:'translateY(-60px) rotate(-5deg) scale(.85)',opacity:0},{transform:'translateY(0) rotate(2deg) scale(1.02)',opacity:1,offset:.65},{transform:'translateY(0) rotate(0) scale(1)',opacity:1}],{duration:850,easing:'cubic-bezier(.2,.7,.25,1)'}));
   animations.push(art.animate([{transform:'scale(.25) rotate(-14deg)',opacity:0},{transform:'scale(1.12) rotate(3deg)',opacity:1,offset:.7},{transform:'scale(1) rotate(0)',opacity:1}],{duration:650,delay:180,fill:'backwards',easing:'ease-out'}));
   // Same burst-then-rain rhythm as the physical bandit win, without fake currency.
   const width=dialog.clientWidth,height=dialog.clientHeight;
   for(let i=0;i<42;i++){
    const particle=document.createElement('i');particle.className='shipment-win-particle';particle.style.background=['#d5a141','#ab3927','#f2dfb1'][i%3];dialog.append(particle);
    const a=i/42*Math.PI*2,spread=width*(.23+(i%7)/20),x=Math.cos(a)*spread,y=Math.sin(a)*spread*.64-width*.13,spin=(i%2?1:-1)*(70+i*8),rain=i>=24,px=rain?((i%9)/8-.5)*width:x,py=rain?-height*.6:y;
    animations.push(particle.animate([{opacity:0,transform:`translate(${rain?px:0}px,${rain?py:0}px) rotate(0) scale(.3)`},{opacity:1,transform:`translate(${px*.85}px,${py}px) rotate(${spin}deg) scale(1)`,offset:.25},{opacity:0,transform:`translate(${px}px,${height*.65}px) rotate(${spin+240}deg) scale(.8)`}],{duration:2100+(i%5)*180,delay:rain?700+(i-24)*38:i*14,easing:'cubic-bezier(.16,.45,.6,1)',fill:'both'}));
   }
  }
  sound('joy');button.focus({preventScroll:true});
  return new Promise(resolve=>{const finish=()=>{animations.forEach(a=>a.cancel());dialog.close();dialog.remove();previousFocus?.isConnected&&previousFocus.focus({preventScroll:true});resolve();};button.onclick=finish;dialog.addEventListener('cancel',e=>{e.preventDefault();finish();});});
 }
 return {play,celebrate,get busy(){return !!active;},cargoPlan,cargoPose,doorMatrix,chooseStage};
})();
