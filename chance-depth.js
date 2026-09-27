/* Shared matte card renderer. Cosmetic tilt is independent of the outcome rotor. */
(function(){
'use strict';
const names={grey:'Серая',blue:'Синяя',purple:'Фиолетовая',gold:'Золотая'};
const arts={stash:'cash',jackpot:'cash',credit:'cash',collector:'cash',cab:'taxi',wholesale:'cargo',freegoods:'cargo',supplier:'cargo',sellout:'cargo',coffee:'coffee'};
const icons={grant:'crown',reprice:'coins',alibi:'cap',sure:'crown',double:'gem-clean',investor:'shop'};
const root=new URL('.',document.currentScript.src).href;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function face(c,s){const bad=s==='B'&&['purple','gold'].includes(c.r)&&c[s]!=='пусто',empty=c[s]==='пусто';
return `<div class="cu-face cu-${s==='A'?'front':'back'}${bad?' cu-danger':''}"><span class="cu-stamp">${names[c.r]}</span><span class="cu-side ${s==='A'?'good':bad?'bad':'meh'}">${s}</span><b class="cu-title">${esc(c.title)}</b><span class="cu-art ${arts[c.id]&&!(s==='B'&&c.faceIcons)?'cu-vignette art-'+arts[c.id]:''}">${s==='B'&&c.faceIcons?c.faceIcons[1]:arts[c.id]?'':`<img src="${root}assets/icons/${icons[c.id]||'money'}.webp" alt="">`}</span><span class="cu-cap ${bad?'bad':''} ${empty?'empty':''}">${esc(c[s])}</span><span class="cu-diffuse" aria-hidden="true"></span></div>`;}
function cardHTML(c,cls=''){return `<div class="cu-card cu-matte r-${c.r} ${cls}" data-id="${esc(c.id)}"><div class="cu-tilt"><div class="cu-spin">${[-.5,0,.5].map(z=>`<i class="cu-core" style="--z:${z}px" aria-hidden="true"></i>`).join('')}<i class="cu-edge edge-l" aria-hidden="true"></i><i class="cu-edge edge-r" aria-hidden="true"></i>${face(c,'A')}${face(c,'B')}</div></div></div>`;}
function light(card,angle=0){
 const a=angle*Math.PI/180;
 card.style.setProperty('--lx',(46+Math.sin(a)*31).toFixed(1)+'%');
 card.style.setProperty('--shade',(0.035+Math.pow(Math.abs(Math.sin(a)),2)*.24).toFixed(3));
}
const mounted=new WeakSet();
function mount(card){if(mounted.has(card)||card.classList.contains('cu-mini'))return;mounted.add(card);
 let x=0,y=0,tx=0,ty=0,raf=0,last=0;
 const draw=t=>{const dt=Math.min(40,t-(last||t));last=t;const k=1-Math.exp(-dt/85);x+=(tx-x)*k;y+=(ty-y)*k;
 card.style.setProperty('--tx',x.toFixed(2)+'deg');card.style.setProperty('--ty',y.toFixed(2)+'deg');
 card.style.setProperty('--py',(47+x*.7).toFixed(1)+'%');
 const rotation=card.querySelector('.cu-spin').style.transform.match(/rotateY\(([-.\d]+)deg\)/);light(card,(rotation?+rotation[1]:0)+y);
 if(card.isConnected&&(Math.abs(tx-x)>.025||Math.abs(ty-y)>.025))raf=requestAnimationFrame(draw);else{raf=0;last=0;}};
 const move=e=>{if(reduced()||card.closest('.cu-play:not(.landed)'))return;
 const b=card.getBoundingClientRect();tx=-(e.clientY-b.top-b.height/2)/b.height*19;ty=(e.clientX-b.left-b.width/2)/b.width*25;if(!raf)raf=requestAnimationFrame(draw);};
 const leave=()=>{tx=0;ty=0;if(!raf)raf=requestAnimationFrame(draw);};
 card.addEventListener('pointermove',move);card.addEventListener('pointerleave',leave);card.addEventListener('pointercancel',leave);
}
function scan(node){if(node.nodeType!==1)return;if(node.matches('.cu-matte'))mount(node);node.querySelectorAll('.cu-matte').forEach(mount);}
new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(scan))).observe(document.documentElement,{childList:true,subtree:true});
window.ChanceDepth={cardHTML,light,mount};
})();
