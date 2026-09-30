(async()=>{'use strict';
const E=window.Dice21Engine,$=id=>document.getElementById(id),bank=n=>Math.round(n).toLocaleString('ru-RU'),money=n=>'$'+bank(n);
const embedded=new URLSearchParams(location.search).has('embedded');
document.documentElement.classList.toggle('embedded',embedded);
const host=embedded?parent.Dice21?.connect(window,decodeURIComponent(location.hash.slice(1))):null;
$('exit').onclick=()=>{if(host)host.exit();else location.href='../?map=1&playtest=1';};
if(embedded&&!host){$('status').textContent='Открой игру заново из меню.';return;}
let saved={cash:5000,game:E.initial()};
try{const old=JSON.parse(localStorage.getItem('americanboy_dice21_preview_v1'));if(old&&Number.isFinite(old.cash)&&old.game)saved=old;}catch{}
const service=host||E.createService({read:()=>saved.game,wallet:()=>saved.cash,commit(state,delta){saved={cash:saved.cash+delta,game:state};try{localStorage.setItem('americanboy_dice21_preview_v1',JSON.stringify(saved));}catch{}}});
if(!window.Dice21Three&&!window.Dice21ThreeError)await new Promise(r=>addEventListener('dice21-ready',r,{once:true}));
if(!window.Dice21Three){$('status').textContent='Не удалось запустить 3D. Перезагрузи страницу.';return;}
const dice3d=window.Dice21Three,FX=window.Dice21FX,croupier=window.Dice21Croupier;
croupier?.configure(()=>host?.motionEnabled?.()!==false);
let state=service.snapshot(),busy=false,uid=0;
const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
const delay=ms=>new Promise(r=>setTimeout(r,reduced()?Math.min(ms,70):ms));
FX.configure(()=>host?.soundEnabled?.()!==false);
const sound=(name='button',volume=.6)=>FX.sound(name,volume);
window.addEventListener('dice21-impact',()=>sound('impact',.34));
function fit(){const scale=Math.min(innerWidth/941,Math.max(1,innerHeight)/1672);$('table').style.transform=`scale(${scale})`;$('viewport').style.width=941*scale+'px';$('viewport').style.height=1672*scale+'px';}
addEventListener('resize',fit);fit();
const crop=(href,x,y,w,h,clip='')=>`<svg viewBox="${x} ${y} ${w} ${h}" aria-hidden="true">${clip}<image href="${href}" width="941" height="1672" ${clip?'clip-path="url(#clip'+uid+')"':''}/></svg>`;
function chip(value){const index=E.CHIPS.indexOf(value),x=[72,237,400,565,729][index],y=1257;uid++;
 const clip=`<defs><clipPath id="clip${uid}"><path d="M${x+5} ${y+61} C${x+9} ${y-6},${x+132} ${y-2},${x+141} ${y+62} L${x+137} ${y+103} C${x+122} ${y+142},${x+28} ${y+149},${x+8} ${y+107}Z"/></clipPath></defs>`;
 return `<div class="chip-art">${crop('assets/chip-reference.webp',x,y,149,145,clip)}<b>${value}</b></div>`;
}
function dice(id,values){const area=$(id);area.innerHTML=values.map(v=>`<span role="img" aria-label="Кость ${v}"></span>`).join('');dice3d.place(id==='player-dice'?'player':'dealer',values);}
function stacks(){const area=$('stakes');area.innerHTML='';if(state.phase==='result')return;
 state.chips.forEach((v,i)=>{const b=document.createElement('button'),col=Math.floor(i/6),level=i%6;b.className='stake';b.dataset.index=i;b.innerHTML=chip(v);
  b.style.left=(390+col*118)+'px';b.style.top=(1185-level*10)+'px';b.style.zIndex=level+1;b.style.setProperty('--angle',((i*7)%5-2)+'deg');
  b.setAttribute('aria-label',`Убрать фишку ${v}, столбик ${col+1}, ${level+1}-я снизу`);b.disabled=busy||state.phase!=='betting';b.onclick=()=>act({type:'remove',index:i});area.append(b);
 });
}
function controls(){const betting=state.phase==='betting',playing=state.phase==='player',result=state.phase==='result',bet=E.total(state.chips),house=betting&&state.freeBet>0,lastVisitGame=result&&state.visitLimit>0&&(state.visitGames||0)+1>=state.visitLimit;
 FX.count($('bet'),bet,{format:money,quiet:true});
 const count=state.chips.length;$('chip-count').textContent=count+' '+(count%10===1&&count!==11?'фишка':count%10>=2&&count%10<=4&&(count<12||count>14)?'фишки':'фишек');
 $('primary').querySelector('span').textContent=betting?'БРОСИТЬ':playing?'ЕЩЁ КОСТЬ':lastVisitGame?'НА ПОЛЕ':'ЕЩЁ ПАРТИЯ';
 $('secondary').querySelector('span').textContent=playing?'ХВАТИТ':'УБРАТЬ';$('secondary').classList.toggle('hold',playing);
 $('primary').disabled=busy||betting&&(!bet||bet>state.cash&&!house);$('secondary').disabled=busy||result||betting&&(!bet||house);
 document.querySelectorAll('.chip').forEach(b=>b.disabled=busy||!betting||house||bet+Number(b.dataset.value)>state.cash||state.chips.length>=24);
 document.querySelectorAll('.stake').forEach(b=>b.disabled=busy||!betting||house);
 $('invitation').hidden=!betting||!!bet;
 $('status').textContent=busy?'Кости на стол…':betting?(house?'Ставка заведения '+money(bet)+' — бросай! Вторая партия на свои':bet?'Тап по фишке на столе — убрать':state.cash<25?'Недостаточно денег. Вернись на поле.':'Ближе к 21. Только без перебора!'):playing?'Ещё одну — или хватит?':state.result?.outcome==='lose'?(state.result.free?'Ставка заведения ушла дилеру · своих не потерял':'Ставка ушла дилеру · −'+money(state.stake)):state.result?.outcome==='push'?(state.result.free?'Ничья · ставка заведения сгорела':'Ничья · ставка возвращена'):'Выигрыш на балансе. '+(lastVisitGame?'Пора на поле':state.visitLimit?'Вторая партия — на свои':'Ещё партию?');
}
function render(){controls();stacks();dice('player-dice',state.player);dice('dealer-dice',state.dealer);FX.count($('player-score'),E.total(state.player),{instant:true,format:n=>n||'—'});FX.count($('dealer-score'),E.total(state.dealer),{instant:true,format:n=>n||'—'});$('player-score').classList.toggle('bust',E.total(state.player)>21);$('dealer-score').classList.toggle('bust',E.total(state.dealer)>21);$('result').hidden=true;}
function fly(node,frames,options={}){if(!node||reduced())return Promise.resolve();return node.animate(frames,{duration:420,easing:'cubic-bezier(.2,.8,.3,1)',...options}).finished.catch(()=>{});}
async function addChip(action,from){const prior=state.chips.length;const response=service.dispatch(action);if(!response.ok){$('status').textContent=response.error||'';return;}state=response.snapshot;render();const n=$('stakes').lastElementChild;if(!n||state.chips.length===prior)return;sound('chip',.6);croupier?.react('bet');const a=from.getBoundingClientRect(),b=n.getBoundingClientRect(),s=$('table').getBoundingClientRect().width/941,dx=(a.x-b.x)/s,dy=(a.y-b.y)/s;
 await fly(n,[{transform:`translate(${dx}px,${dy}px) rotate(-20deg) scale(1.2)`,filter:'drop-shadow(8px 26px 7px #07140866)'},{offset:.55,transform:`translate(${dx*.25}px,${dy*.15-55}px) rotate(13deg) scale(1.1)`,filter:'drop-shadow(10px 30px 8px #07140877)'},{offset:.83,transform:'translateY(3px) rotate(-4deg) scale(1.06,.94)'},{transform:'rotate(var(--angle))'}],{duration:400});}
async function rollSequence(id,values,from=0){$(id).innerHTML=values.map(v=>`<span role="img" aria-label="Кость ${v}"></span>`).join('');sound('cup',.55);croupier?.react(id==='player-dice'?'watch':'throw');await dice3d.play(id==='player-dice'?'player':'dealer',values,from);if(id==='player-dice')await delay(40);}
function burst(){if(reduced())return;for(let i=0;i<16;i++){const s=document.createElement('span');s.className='spark';s.textContent=i%3?'✦':'★';s.style.setProperty('--x',Math.cos(i*2.4)*(200+i*14)+'px');s.style.setProperty('--y',Math.sin(i*2.4)*(180+i*12)-270+'px');s.style.animationDelay=i%4*.05+'s';$('sparkles').append(s);setTimeout(()=>s.remove(),1200);}}
async function showComparison(){const r=state.result;if(!r)return;
 $('result-title').textContent=r.reason==='player-bust'?'ПЕРЕБОР У ТЕБЯ':'ДИЛЕР ЗАКОНЧИЛ';
 $('compare-player').textContent=r.player;$('compare-dealer').textContent=r.dealer||'—';
 $('compare-player').classList.toggle('bust',r.player>21);$('compare-dealer').classList.toggle('bust',r.dealer>21);
 $('result-detail').textContent=r.reason==='player-bust'?'Больше 21 — ставка дилеру':r.reason==='dealer-bust'?'У дилера перебор — ты выиграл':r.outcome==='push'?'По 21 — возвращаем ставку':r.outcome==='win'?'Ты ближе к 21':'Дилер ближе к 21';
 $('result').hidden=false;FX.pop($('compare-dealer'));sound('score',.4);
 // This is reading time, not animation: keep it even with reduced motion.
 await new Promise(resolve=>setTimeout(resolve,1250));
 await fly($('result'),[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-12px)'}],{duration:160});$('result').hidden=true;
}
async function finish(){const r=state.result;await showComparison();croupier?.react(r.outcome);if(r.outcome!=='win')sound(r.outcome==='push'?'draw':'lose',.62);const celebration=r.outcome==='win'?FX.reward({amount:r.net,perfect:r.player===21,chipHTML:chip}):Promise.resolve();const nodes=[...$('stakes').children];if(r.outcome==='win'){
 // The croupier adds matching chips to the bank before it returns to the player.
 const arriving=[];for(const source of [...nodes]){const n=source.cloneNode(true);n.disabled=true;$('stakes').append(n);nodes.push(n);const y=parseFloat(n.style.top);arriving.push(fly(n,[{transform:`translate(60px,${640-y}px) scale(.6)`,opacity:0},{transform:'translate(15px,-8px)',opacity:1}],{duration:300}));}sound('chip',.45);await Promise.all(arriving);
 }
 await delay(280);const win=r.outcome!=='lose';await Promise.all(nodes.map((n,i)=>{const x=parseFloat(n.style.left),y=parseFloat(n.style.top);return fly(n,[{transform:'rotate(var(--angle))',opacity:1},{offset:.45,transform:`translate(${(win?470-x:310-x)*.4}px,${win?80:-190}px) rotate(15deg) scale(1.05)`},{transform:`translate(${win?470-x:310-x}px,${(win?1570:610)-y}px) rotate(-15deg) scale(${win?.6:.45})`,opacity:0}],{duration:480,delay:i*14,fill:'forwards'});}));$('stakes').innerHTML='';if(r.returned)sound('collect',.55);await celebration;if(r.outcome==='win')croupier?.react('win');}
async function act(action,from){if(busy)return;if(action.type==='add'){await addChip(action,from);return;}sound();
 if(['remove','clear'].includes(action.type)){const r=service.dispatch(action);if(r.ok){state=r.snapshot;sound('remove',.5);render();}return;}
 if(action.type==='next'){busy=true;controls();const r=service.dispatch(action);state=r.snapshot;busy=false;render();return;}
 const before=state;const r=service.dispatch(action);if(!r.ok){$('status').textContent=r.error||'';return;}
 state=r.snapshot;busy=true;controls();$('result').hidden=true;
 if(action.type==='start'||action.type==='hit'){
  await rollSequence('player-dice',state.player,action.type==='start'?0:before.player.length);
  FX.score($('player-score'),E.total(state.player));
 }
 if(state.phase==='result'){
  if(state.dealer.length){$('status').textContent='Бросает дилер';await rollSequence('dealer-dice',state.dealer.slice(0,3));FX.score($('dealer-score'),E.total(state.dealer.slice(0,3)));
   for(let i=3;i<state.dealer.length;i++){await delay(60);await rollSequence('dealer-dice',state.dealer.slice(0,i+1),i);FX.score($('dealer-score'),E.total(state.dealer.slice(0,i+1)));}
   $('dealer-score').classList.toggle('bust',E.total(state.dealer)>21);
  }
  await delay(100);await finish();
 }
 busy=false;controls();if(state.phase==='result')$('primary').focus({preventScroll:true});
}
E.CHIPS.forEach(v=>{const b=document.createElement('button');b.className='chip';b.dataset.value=v;b.setAttribute('aria-label',`Поставить ${v}`);b.innerHTML=chip(v);b.onclick=()=>act({type:'add',value:v},b);$('tray').append(b);});
$('primary').onclick=()=>act({type:state.phase==='betting'?'start':state.phase==='player'?'hit':'next'});
$('secondary').onclick=()=>act({type:state.phase==='player'?'stand':'clear'});
const closeGame=$('exit').onclick;$('exit').onclick=()=>{sound('close');if(host)closeGame();else setTimeout(closeGame,110);};
addEventListener('keydown',e=>{if(e.key==='Escape'&&!e.defaultPrevented){e.preventDefault();$('exit').click();}});
render();host?.ready?.();
})();
