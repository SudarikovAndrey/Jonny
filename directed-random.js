// ===== Направленный рандом бросков (бэклог §9–12) =====
// Дизайн: черновики/америкэн-бой-направленный-рандом.md.
// Кубик честный, пока не сработал триггер: засуха по складам (§10) или полиция
// два круга подряд (§11). Тогда перед броском меняются веса сумм 2–12, пара
// кубиков берётся случайно из комбинаций выбранной суммы, а поле показывает её
// обычным кувыркающимся броском (перемаркировка граней после предпросчёта).
// §12: веса не читают наличные, запас, долг, кристаллы и очки — только позицию,
// клетки поля и счётчики кругов.
CFG.DR={
  on:true,
  dryLaps1:3, dryLaps2:4,   // кругов без склада до магнита и сильного магнита
  q1:.25, q2:.45,           // целевая вероятность попасть на склад этим броском
  cap1:4, cap2:8,           // потолок множителя одной суммы
  tv:.35,                   // потолок отклонения распределения от честного
  policeStreak:2,           // полиция на стольких кругах подряд…
  policeBlockLaps:1,        // …и столько следующих кругов суммы в полицию не выпадают
};
const DR_P0=(()=>{const p={};for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)p[a+b]=(p[a+b]||0)+1/36;return p;})();
function drState(){
  if(!S.dr)S.dr={laps:S.laps||0,dry:0,lapWh:false,polLap:-9,polStreak:0,polBlockUntil:-9,rolls:0,guided:0,mismatch:0};
  return S.dr;
}
// Засуха считается полными кругами без остановки на складе, пока есть своя точка.
function drLapTick(){
  const d=drState();
  while(d.laps<S.laps){d.laps++;if(!d.lapWh&&myKiosks().length)d.dry++;d.lapWh=false;}
}
function drLanded(t){
  const d=drState();
  if(t.type==='wh'&&unlocked(t)){d.dry=0;d.lapWh=true;}
  if(t.type==='police'){
    if(d.polLap===S.laps-1)d.polStreak++;else if(d.polLap!==S.laps)d.polStreak=1;
    d.polLap=S.laps;
    if(d.polStreak>=CFG.DR.policeStreak)d.polBlockUntil=S.laps+CFG.DR.policeBlockLaps;
  }
}
function drWeights(pos){
  const d=drState(),c=CFG.DR,w={...DR_P0},trig=[];
  const at=s=>S.tiles[(pos+s)%40];
  if(d.dry>=c.dryLaps1){
    const strong=d.dry>=c.dryLaps2,q=strong?c.q2:c.q1,cap=strong?c.cap2:c.cap1;
    const hit=s=>at(s).type==='wh'&&unlocked(at(s));
    let p=0;for(const s in w)if(hit(+s))p+=w[s];
    if(p>0&&p<q){const k=Math.min(cap,q*(1-p)/(p*(1-q)));for(const s in w)if(hit(+s))w[s]*=k;trig.push(strong?'wh_pity2':'wh_pity1');}
  }
  if(S.laps>d.polLap&&S.laps<=d.polBlockUntil){
    for(const s in w)if(at(+s).type==='police'&&w[s]>0){w[s]=0;if(!trig.includes('police'))trig.push('police');}
  }
  if(!trig.length)return null;
  let tot=0;for(const s in w)tot+=w[s];for(const s in w)w[s]/=tot;
  let tv=0;for(const s in w)tv+=Math.abs(w[s]-DR_P0[s])/2;
  // Полицию не возвращаем при сжатии: её ноль — жёсткое правило §11.
  if(tv>c.tv&&!trig.includes('police')){const k=c.tv/tv;for(const s in w)w[s]=DR_P0[s]+(w[s]-DR_P0[s])*k;}
  return {w,trig};
}
function drPick(w){let x=Math.random(),sum=12;for(const s of Object.keys(w).map(Number).sort((a,b)=>a-b)){x-=w[s];if(x<=0){sum=s;break;}}
  const pairs=[];for(let a=1;a<=6;a++){const b=sum-a;if(b>=1&&b<=6)pairs.push([a,b]);}
  const [a,b]=pairs[Math.floor(Math.random()*pairs.length)];return {sum,a,b};}

const drBaseOpening=openingDice;
openingDice=function(){
  const plan=drBaseOpening();
  // Учебный круг, участок и выключенный режим — честный бросок как был.
  if(plan.lesson||S.jail>0||!CFG.DR.on)return plan;
  drLapTick();
  const d=drState();d.rolls++;
  const r=drWeights(S.pos);
  if(!r)return plan;
  const {sum,a,b}=drPick(r.w);d.guided++;
  const reach=(w,f)=>{let p=0;for(const s in w)if(f(S.tiles[(S.pos+ +s)%40]))p+=w[s];return Math.round(p*1000)/1000;};
  const isWh=t=>t.type==='wh'&&unlocked(t);
  track('dr',{trig:r.trig.join('+'),dry:d.dry,p0:reach(DR_P0,isWh),p1:reach(r.w,isWh),sum,from:S.pos});
  return {a,b,lesson:false,guided:true};
};
// Поле получает заданную пару. Если физика разошлась с предпросчётом,
// засчитывается реальный бросок: честность дороже точности.
mobileDice=async function(planned){
  document.body.classList.add('dice-rolling');
  GameFeedback.sound('throw');
  $('diceResult').hidden=true;
  try{
    const payload=planned.lesson?{lesson:true,a:planned.a,b:planned.b}:planned.guided?{guided:true,a:planned.a,b:planned.b}:{};
    const result=await MobileHost.request('roll',payload);
    if(planned.lesson&&(result.a!==planned.a||result.b!==planned.b))throw new Error('Учебный бросок не совпал с маршрутом');
    if(planned.guided&&(result.a+result.b!==planned.a+planned.b)){drState().mismatch++;track('dr_mismatch',{want:[planned.a,planned.b],got:[result.a,result.b]});}
    return {...result,lesson:!!planned.lesson};
  }finally{document.body.classList.remove('dice-rolling');}
};
const drBaseLand=land;
land=async function(t){drLapTick();drLanded(t);return drBaseLand.apply(this,arguments);};
