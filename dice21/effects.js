/* Printed cartoon feedback shared by counters, physical props and prizes. */
(()=>{'use strict';
const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
let enabled=()=>true,ctx,master,loading,lastImpact=0,lastTick=0,epoch=0;
const buffers={},voices=new Set(),counts=new WeakMap();
const names=['button','small','triple','jackpot','chip','remove','cup','impact','score','tick','collect','draw','lose','open','close'];
function unlock(){if(!enabled())return;try{if(!ctx){ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=.7;const compressor=ctx.createDynamicsCompressor();compressor.threshold.value=-14;compressor.ratio.value=3;compressor.attack.value=.006;compressor.release.value=.12;master.connect(compressor);compressor.connect(ctx.destination);loading=Promise.all(names.map(async n=>{try{const r=await fetch('assets/audio/'+n+'.mp3');if(!r.ok)throw Error(n);buffers[n]=await ctx.decodeAudioData(await r.arrayBuffer());}catch(e){console.warn('Звук 21 не загружен:',n);}}));}if(ctx.state==='suspended')ctx.resume().catch(()=>{});}catch{}}
function stop(group){epoch++;for(const v of [...voices])if(!group||v.group===group){try{v.source.stop();}catch{}v.source.disconnect();v.gain.disconnect();voices.delete(v);}}
function sound(name='button',volume=.6,rate=1,group='effect'){
 if(!enabled()||document.hidden)return;if(name==='impact'){const now=performance.now();if(now-lastImpact<55)return;lastImpact=now;}if(name==='tick'){const now=performance.now();if(now-lastTick<85)return;lastTick=now;}
 unlock();if(!ctx)return;const ticket=epoch,at=performance.now();loading.then(()=>{if(ticket!==epoch||!enabled()||!buffers[name]||performance.now()-at>900)return;
 const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=buffers[name];source.playbackRate.value=rate;gain.gain.value=volume;source.connect(gain);gain.connect(master);const voice={source,gain,group};voices.add(voice);source.onended=()=>{voices.delete(voice);source.disconnect();gain.disconnect();};source.start();
 });
}
function animate(el,frames,opts={}){if(!el||reduced())return Promise.resolve();return el.animate(frames,{duration:340,easing:'cubic-bezier(.18,.9,.32,1.25)',...opts}).finished.catch(()=>{});}
function pop(el,strong=false){return animate(el,[{transform:'scale(.78,1.18)'},{offset:.5,transform:`scale(${strong?1.55:1.2},.93)`},{offset:.78,transform:'scale(.96,1.04)'},{transform:'scale(1)'}],{duration:strong?470:340});}
function count(el,value,{format=String,duration=420,quiet=false,instant=false,from,pulse=true}={}){
 const previous=counts.get(el);if(previous?.value===value)return;previous?.cancel?.();
 const start=from??previous?.shown??value;let cancelled=false;const entry={value,shown:start,cancel:()=>{cancelled=true;}};counts.set(el,entry);
 if(instant||reduced()||start===value){entry.shown=value;el.textContent=format(value);return;}
 const began=performance.now();let step=-1;if(pulse)pop(el,value===21);function frame(now){if(cancelled)return;const k=Math.min(1,(now-began)/duration),v=Math.round(start+(value-start)*(1-Math.pow(1-k,3)));entry.shown=v;el.textContent=format(v);const beat=Math.floor(k*4);if(!quiet&&beat!==step&&k<.85){step=beat;sound('tick',.18,1+beat*.05);}if(k<1)requestAnimationFrame(frame);else el.textContent=format(value);}requestAnimationFrame(frame);
}
function score(el,value){el.classList.toggle('bust',value>21);count(el,value,{from:counts.get(el)?.value??0,quiet:true,duration:320,pulse:false});pop(el,true);sound(value>21?'impact':'score',value>21?.3:.44,1,'score');el.classList.remove('score-flare');requestAnimationFrame(()=>el.classList.add('score-flare'));setTimeout(()=>el.classList.remove('score-flare'),550);}

let overlay=null,finishReward=null;
function dismiss(){finishReward?.();}
function reward({amount,perfect=false,chipHTML}){
 dismiss();sound(perfect?'jackpot':'triple',.82,1,'reward');
 const layer=document.createElement('div');layer.className='d21-reward'+(perfect?' perfect':'');layer.setAttribute('role','dialog');layer.setAttribute('aria-label',perfect?'Двадцать одно! Выигрыш':'Выигрыш');layer.tabIndex=0;
 layer.innerHTML=`<div class="reward-light"></div><div class="reward-shower" aria-hidden="true"></div><div class="reward-marquee"><img src="assets/prize-marquee.webp" alt="Выигрыш"><div class="reward-number">+$0</div>${perfect?'<b class="perfect-stamp">21!</b>':''}<i class="marquee-glint" aria-hidden="true"></i></div>`;
 document.body.append(layer);overlay=layer;const focus=document.activeElement;layer.focus({preventScroll:true});
 const number=layer.querySelector('.reward-number');count(number,amount,{from:0,format:n=>'+$'+n.toLocaleString('ru-RU'),duration:perfect?650:470,quiet:true});
 if(!reduced()){const shower=layer.querySelector('.reward-shower');for(let i=0;i<(perfect?28:18);i++){const p=document.createElement('div');p.className=i%3?'celebration-chip':'celebration-star';p.innerHTML=i%3?chipHTML([25,50,100,250,500][i%5]):'✦';p.style.setProperty('--x',(Math.sin(i*2.39)*48)+'vw');p.style.setProperty('--rise',(-18-i%5*6)+'vh');p.style.setProperty('--fall',(45+i%4*12)+'vh');p.style.setProperty('--r',(i%2?1:-1)*(150+i*17)+'deg');p.style.animationDelay=(i%7)*65+'ms';shower.append(p);}}
 return new Promise(resolve=>{let closing=false;const timer=setTimeout(close,reduced()?850:perfect?2900:2100);
  function close(){if(closing)return;closing=true;clearTimeout(timer);if(finishReward===close)finishReward=null;stop('reward');animate(layer,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.96) translateY(-12px)'}],{duration:170, easing:'ease-out'}).then(()=>{layer.remove();if(overlay===layer)overlay=null;if(focus?.isConnected)focus.focus({preventScroll:true});resolve();});}
  finishReward=close;layer.addEventListener('pointerdown',close);layer.addEventListener('keydown',e=>{if(['Escape','Enter',' '].includes(e.key)){e.preventDefault();e.stopPropagation();close();}});
 });
}
addEventListener('pointerdown',unlock,{capture:true});addEventListener('keydown',unlock,{capture:true});addEventListener('pagehide',()=>{stop();ctx?.close();});document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
window.Dice21FX={sound,score,count,pop,reward,dismiss,stop,configure(fn){enabled=fn;},mute(){stop();}};
})();
