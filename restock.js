// ===== Умная закупка на складе: одна функция для «Пополнить всё» и «Половина суммы» =====
// Правило продюсера 30.09.2026: закупка должна быть максимально эффективной — за наименьшее число
// проходов старта принести наибольшую прибыль на каждый вложенный доллар, с учётом уже лежащего
// товара, числа и уровня точек, акций (тренд, чёрная пятница — внутри sellPrice) и бустов (boostOf).
// Как: план строится кругами продаж. На каждом круге каждой точке — столько штук, сколько она
// продаст за круг (не больше свободного места), в порядке прибыли на доллар закупки.
// Пока первый круг не обеспечен у всех выгодных точек, второй не закупается.
function restockPlan(budget){
  const reserve=window.TutorialGuard?TutorialGuard.reserve():0;
  let left=Math.max(0,Math.min(budget,S.cash-reserve)),spent=0;
  const plan=new Map();
  const ks=myKiosks().filter(t=>cap(t)-t.goods>0);
  const value=t=>{const p=buyPrice(t.good),v=sellPrice(t.good)*boostOf(t)-p;return {p,v,q:p>0?v/p:0};};
  for(let lap=0;lap<60&&left>0;lap++){
    const need=ks.map(t=>{const x=value(t);return {t,...x,n:Math.min(sales(t),cap(t)-t.goods-(plan.get(t)||0))};})
      .filter(x=>x.n>0&&x.v>0).sort((a,b)=>b.q-a.q||b.v-a.v);
    if(!need.length)break;let any=false;
    for(const x of need){while(x.n>0&&left>=x.p){plan.set(x.t,(plan.get(x.t)||0)+1);left-=x.p;spent+=x.p;x.n--;any=true;}}
    if(!any)break;
  }
  return {plan,spent};
}
function smartRestock(budget){
  const {plan,spent}=restockPlan(budget);
  for(const [t,n] of plan)t.goods+=n;
  S.cash-=spent;
  if(spent>0)track('restock',{spent,points:plan.size,units:[...plan.values()].reduce((a,b)=>a+b,0)});
  return spent;
}
window.Restock={plan:restockPlan,run:smartRestock};
