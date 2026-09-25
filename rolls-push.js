// ===== Пуш «Ходы восстановились» =====
// Дизайн: черновики/америкэн-бой-пуш-ходов.md. Ходы копятся до потолка и дальше
// сгорают; пуш зовёт игрока ровно тогда, когда запас полон. В продакшене это
// локальное уведомление, которое ставится при уходе из игры. В браузерном
// прототипе — Notification API: придёт, только пока вкладка жива в фоне.
CFG.PUSH={on:true,quietFrom:22,quietTo:9,minAwayMin:30,maxPerDay:2};
const PUSH_TEXTS=[
  'Джонни размял пальцы: {n} ходов на месте. Бруклин ждёт!',
  'Кубики остыли, ходы полные — {n} из {n}. Пора на улицы!',
  'Ходы восстановились. Точки сами себя не прокачают.',
];
let pushTimer=null;
function pushState(){if(!S.push)S.push={asked:false,optIn:false,day:0,sent:0};return S.push;}
function rollsFullInMs(){
  if(S.rolls>=CFG.ROLLS_PER_DAY)return 0;
  const step=CFG.REGEN_MIN*60000/CFG.TIME_SCALE;
  return nextRollIn()+(CFG.ROLLS_PER_DAY-S.rolls-1)*step;
}
// Тихие часы: пуш, выпавший на ночь, переносится на утро.
function pushFireAt(ms){
  const at=new Date(Date.now()+ms),h=at.getHours(),q=CFG.PUSH;
  if(h>=q.quietFrom||h<q.quietTo){
    const m=new Date(at);if(h>=q.quietFrom)m.setDate(m.getDate()+1);m.setHours(q.quietTo,0,0,0);return m.getTime()-Date.now();
  }
  return ms;
}
function schedulePush(){
  clearTimeout(pushTimer);pushTimer=null;
  const p=pushState();
  if(!CFG.PUSH.on||!p.optIn||S.finished||typeof Notification==='undefined'||Notification.permission!=='granted')return;
  const full=rollsFullInMs();
  if(full<CFG.PUSH.minAwayMin*60000)return; // почти полные — игрок и так рядом
  const wait=pushFireAt(full);
  pushTimer=setTimeout(()=>{
    const p=pushState();if(p.day!==S.day){p.day=S.day;p.sent=0;}
    if(p.sent>=CFG.PUSH.maxPerDay||!document.hidden)return;
    p.sent++;save();
    const text=PUSH_TEXTS[Math.floor(Math.random()*PUSH_TEXTS.length)].replaceAll('{n}',CFG.ROLLS_PER_DAY);
    try{const n=new Notification('Америкэн бой',{body:text,icon:'icon.png',tag:'rolls-full'});n.onclick=()=>{window.focus();track('push_open',{kind:'rolls_full'});n.close();};}catch(e){}
    track('push_sent',{kind:'rolls_full',delayMin:Math.round(wait/60000)});
  },wait);
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)schedulePush();else{clearTimeout(pushTimer);pushTimer=null;}});
window.addEventListener('pagehide',schedulePush);

// Согласие спрашиваем, когда игрок впервые упёрся в ноль ходов и решил подождать:
// в этот момент он понимает, зачем напоминание.
async function askPushOptIn(){
  const p=pushState();if(p.asked||typeof Notification==='undefined')return;
  p.asked=true;save();
  const v=await modal(`<h2>🎲 Напомнить про ходы?</h2><p class="t">Ходы копятся до ${CFG.ROLLS_PER_DAY}, дальше перестают прибавляться. Джонни свистнет, когда запас полный.</p><p>Ночью не беспокоим, не чаще двух раз в день.</p>`,
    [{t:'Напомни',v:1,cls:'ok'},{t:'Не надо',v:0,cls:'sec'}]);
  track('push_optin_ask',{choice:v===1?'yes':'no'});
  if(v!==1)return;
  try{const r=await Notification.requestPermission();p.optIn=r==='granted';track('push_permission',{result:r});}catch(e){}
  save();
}
const pushBaseOvertime=overtimeOffer;
overtimeOffer=async function(){const r=await pushBaseOvertime.apply(this,arguments);if(S.rolls<=0)await askPushOptIn();return r;};

// Счётчик сгоревших ходов: восстановление, которое упёрлось в потолок.
// Нужен, чтобы на живых игроках померить, сколько теряется и помогает ли пуш.
// regenTick уже стоит в setInterval прототипа, поэтому считаем рядом:
// раз в секунду, пока запас полный, и один раз при загрузке — за офлайн.
function addRollsLost(x){if(!(x>0)||!S||!S.stat)return;S.stat.rollsLost=(S.stat.rollsLost||0)+x;if(S.dstat)S.dstat.rollsLost=(S.dstat.rollsLost||0)+x;}
let lostSeen=Date.now();
setInterval(()=>{const now=Date.now(),dt=(now-lostSeen)*CFG.TIME_SCALE;lostSeen=now;
  if(S&&!S.finished&&S.rolls>=CFG.ROLLS_PER_DAY)addRollsLost(dt/(CFG.REGEN_MIN*60000));},1000);
const pushBaseLoad=load;
load=function(){const r=pushBaseLoad.apply(this,arguments);
  try{if(r&&S&&S.lastTick&&!S.finished){const step=CFG.REGEN_MIN*60000,dt=(Date.now()-S.lastTick)*CFG.TIME_SCALE;
    addRollsLost(Math.max(0,dt/step-Math.max(0,CFG.ROLLS_PER_DAY-S.rolls)));}}catch(e){}
  return r;};
// Итог дня в телеметрию — до того, как полночь обнулит дневную статистику.
const pushBaseRollover=rollover;
rollover=function(){try{track('rolls_lost_day',{day:S.day,lost:Math.round((S.dstat&&S.dstat.rollsLost)||0)});}catch(e){}return pushBaseRollover.apply(this,arguments);};
