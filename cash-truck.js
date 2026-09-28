// ===== Инкассатор: мешок лопается всегда, даже когда свободных клеток нет =====
// Решение продюсера 28.09.2026: раньше при полностью выкупленном поле клетка 🚚 вместо
// разлёта вешала ×1,5 на точки (boostRain). Теперь монеты разлетаются в любом случае —
// сначала на закрытые клетки, если их мало — на любые точки и бизнесы, включая свои и чужие.
scatter=async function(){
  const c=CFG.SCATTER,sc=S.day;
  const ok=t=>t.i!==S.pos&&t.i!==0&&!t.drop;
  let spots=S.tiles.filter(t=>!unlocked(t)&&ok(t));
  if(spots.length<c.drops){
    const more=S.tiles.filter(t=>unlocked(t)&&ok(t)&&(t.type==='kiosk'||t.type==='biz'));
    more.sort(()=>Math.random()-0.5);
    spots=spots.concat(more.slice(0,c.drops-spots.length));
  }
  spots.sort(()=>Math.random()-0.5);
  let money=0,n=0,rollsN=0,hardN=0;const plan=[];
  spots.slice(0,c.drops).forEach(t=>{const r=Math.random();
    if(r<c.hardChance){plan.push({t,drop:{hard:1},icon:'💎'});hardN++;}
    else if(r<c.hardChance+c.rollsChance){plan.push({t,drop:{rolls:2},icon:'🎲'});rollsN++;}
    else{const m=(c.min+Math.floor(Math.random()*(c.max-c.min)))*sc;plan.push({t,drop:{cash:m},icon:'🪙'});money+=m;}
    n++;});
  if(!plan.length){toast('🚚 Инкассатор проехал мимо — кидать некуда');return;}
  toast(`🚚 Мешок лопнул! $${money} разлетелось по району`);
  track('scatter',{n,money,rolls:rollsN,hard:hardN});
  await flyDrops(plan);
  log(`🚚 Инкассатор растерял мешок: $${money}${rollsN?', '+rollsN+'×🎲':''}${hardN?', '+hardN+'×💎':''} разлетелось по ${n} клеткам. Забираешь, когда останавливаешься.`);render();
};
