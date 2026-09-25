/* Lightweight original Web Audio foley; no remote audio or autoplay. */
window.GameFeedback=(()=>{
 let ctx,master,noise,muted=true,last={},played=0;
 let music=null,musicIndex=0,musicStarted=false,musicMuted=true;
 const musicTracks=['assets/audio/bouncy-arcade-fun.mp3','assets/audio/arcade-bounce.mp3'];
 try{muted=localStorage.getItem('americanboy_sound_muted')!=='0';musicMuted=localStorage.getItem('americanboy_music_muted')!=='0'}catch{muted=musicMuted=true}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function makeMusic(){
  if(music)return music;
  music=new Audio();music.preload='auto';music.volume=.18;music.loop=false;
  music.addEventListener('ended',()=>{if(musicMuted)return;musicIndex=(musicIndex+1)%musicTracks.length;music.src=musicTracks[musicIndex];music.play().catch(()=>{});});
  music.src=musicTracks[musicIndex];
  return music;
 }
 function startMusic(){
  if(musicMuted)return;
  const player=makeMusic();
  if(!musicStarted){musicStarted=true;player.play().catch(()=>{musicStarted=false;});}
 }
 function unlock(){
  if(!ctx){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;ctx=new Audio();master=ctx.createGain();master.gain.value=muted?0:.20;master.connect(ctx.destination);noise=ctx.createBuffer(1,ctx.sampleRate*.18,ctx.sampleRate);const d=noise.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);}
  if(ctx.state==='suspended')ctx.resume().catch(()=>{});
  startMusic();
 }
 document.addEventListener('pointerdown',unlock,{passive:true});document.addEventListener('keydown',unlock,{passive:true});
 function tone(freq,end,duration,volume,type='sine',delay=0){if(!ctx||muted||ctx.state!=='running')return;const t=ctx.currentTime+delay,o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(Math.max(20,end),t+duration);g.gain.setValueAtTime(.001,t);g.gain.exponentialRampToValueAtTime(volume,t+.008);g.gain.exponentialRampToValueAtTime(.001,t+duration);o.connect(g).connect(master);o.start(t);o.stop(t+duration+.02);played++;}
 function tap(freq=750,volume=.13,duration=.05){if(!ctx||muted||ctx.state!=='running')return;const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain(),t=ctx.currentTime;source.buffer=noise;filter.type='bandpass';filter.frequency.value=freq;filter.Q.value=.6;gain.gain.setValueAtTime(volume,t);gain.gain.exponentialRampToValueAtTime(.001,t+duration);source.connect(filter).connect(gain).connect(master);source.start();source.stop(t+duration);played++;}
 function sound(kind){
  const now=performance.now(),gap=kind.startsWith('drop_')?60:kind==='dice_hit'?140:kind==='step'?110:kind==='joy'?1200:100;
  if(now-(last['s'+kind]||-9999)<gap)return;last['s'+kind]=now;
  if(kind==='step'){tap(620,.13);tone(155,85,.08,.16)}
  if(kind==='land'){tap(280,.25,.12);tone(150,65,.18,.36);tone(220,310,.12,.10,'triangle',.1)}
  if(kind==='dice_hit'){tap(1700,.30,.07);tone(850,430,.055,.12,'triangle')}
  if(kind==='dice_pop'){tap(900,.26,.09);tone(310,95,.12,.19,'triangle')}
  if(kind==='throw'){tap(1100,.2,.17);tone(220,470,.13,.13,'triangle')}
  if(kind==='joy'){for(const [i,f] of [392,494,587,784].entries())tone(f,f*.99,.23,.19,'triangle',i*.085)}
  if(kind==='dance'){for(const [i,f] of [392,494,587,784,659,988].entries())tone(f,f*.995,.26,.17,'triangle',i*.11)}
  if(kind==='negative'){tone(330,220,.18,.14,'triangle');tone(220,130,.3,.12,'triangle',.16)}
  if(kind==='ui')tone(430,310,.04,.075,'triangle');
  // Разлёт наград инкассатора: вылет — «пуф» вверх, приземление монеты — звон, остального — мягкий стук.
  if(kind==='drop_launch'){tap(1400,.12,.06);tone(300,720,.16,.09,'triangle')}
  if(kind==='drop_coin'){tap(2400,.1,.04);tone(1568,1568,.09,.07,'triangle');tone(2093,2093,.14,.05,'triangle',.05)}
  if(kind==='drop_land'){tap(420,.18,.08);tone(210,120,.12,.14,'triangle')}
 }
 const drawings={dust:'<path d="M8 37c-9-9-1-20 10-17-4-17 18-24 25-10 15-15 35-4 30 11 18-5 23 21 7 25H19Z" fill="#e6d5b2" stroke="#554330" stroke-width="2"/><path d="m16 19-5-5m64-4 6-6M4 45l-4 3" stroke="#554330" stroke-width="3" fill="none"/>',star:'<path d="m40 2 8 24 25-9-14 22 22 15-27 1 1 25-16-20-20 17 6-25L1 44l26-10Z" fill="#f4cc57" stroke="#473325" stroke-width="3"/>',hit:'<path d="M9 24 2 6m20 18 2-22m12 24L50 9" fill="none" stroke="#efe0bd" stroke-width="5" stroke-linecap="round"/>'};
 function sprite(type,x,y,size,dx,dy){
  const el=document.createElement('div');el.className='cartoon-fx';el.innerHTML=`<svg viewBox="0 0 ${type==='star'?82:96} ${type==='dust'?55:82}" aria-hidden="true">${drawings[type]}</svg>`;
  Object.assign(el.style,{left:x+'px',top:y+'px',width:size+'px'});document.body.append(el);
  const a=el.animate([{transform:'translate(-50%,-50%) scale(.35)',opacity:.9},{offset:.35,transform:`translate(calc(-50% + ${dx*.4}px),calc(-50% + ${dy*.4}px)) scale(1)`,opacity:.8},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1.15)`,opacity:0}],{duration:type==='star'?600:420,easing:'ease-out'});a.finished.finally(()=>el.remove());
 }
 function play(kind,nx,ny){
  sound(kind);
  if(reduced.matches||document.body.classList.contains('mobile-modal'))return;
  const now=performance.now();if(now-(last['v'+kind]||-9999)<(kind==='step'?300:kind==='dice_hit'?220:250))return;last['v'+kind]=now;
  const r=document.querySelector('#board-frame')?.getBoundingClientRect(),s=window.MobileHost?.sceneState;if(!r||!s)return;
  const x=r.left+(nx??s.hero_screen[0])*r.width,y=r.top+(ny??s.hero_screen[1])*r.height;
  if(kind==='step')sprite('dust',x,y,22,-15,3);
  if(kind==='land'){sprite('dust',x-10,y,34,-20,3);sprite('dust',x+10,y,30,20,3)}
  if(kind==='dice_hit')sprite('hit',x,y,25,0,-10);
  if(kind==='dance')for(const [dx,dy] of [[-42,-5],[42,-5],[-26,-34],[26,-34],[0,-52]])sprite('star',x+dx,y+dy,27,dx*.5,-28);
  if(kind==='joy')for(const [dx,dy] of [[-32,-10],[32,-6],[0,-38]])sprite('star',x+dx,y+dy,23,dx*.3,-20);
 }
 document.addEventListener('click',e=>{if(e.target.closest('button:not(:disabled)')&&!e.target.closest('#bRoll'))sound('ui')});
 return {play,sound,unlock,get muted(){return muted},get musicMuted(){return musicMuted},toggle(){muted=!muted;try{localStorage.setItem('americanboy_sound_muted',muted?'1':'0')}catch{}if(master)master.gain.setTargetAtTime(muted?0:.20,ctx.currentTime,.03);return muted},toggleMusic(){musicMuted=!musicMuted;try{localStorage.setItem('americanboy_music_muted',musicMuted?'1':'0')}catch{}if(musicMuted){if(music)music.pause();}else{startMusic();}return musicMuted},status(){return{muted,musicMuted,state:ctx?.state||'locked',played}}};
})();
