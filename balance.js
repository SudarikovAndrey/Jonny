// ===== Балансные правки мобильной сборки =====
// 25.09: магнит склада (§10, пороги 3/4 круга) и единый апгрейд точки (§4, шаги
// по очереди) подняли очки недели: умный бот +14%, казуал +18%, занятой −3%
// (черновики/америкэн-бой-направленный-рандом.md, …-единый-апгрейд.md).
// Решение продюсера — магнит как в карточке, а награды требуют больше очков.
// Пороги подобраны так, чтобы доли ботов на рубежах совпали с прежними:
// билет — по казуалу и занятому, 700 — по умному F2P, 1200 — тем же множителем.
CFG.TICKET_PTS=375;
CFG.MILESTONES[0].pts=375;
CFG.MILESTONES[1].pts=800;
CFG.MILESTONES[2].pts=1350;
// Соперники в «Топе» растут вместе с игроком, иначе он уходит в отрыв раньше.
CFG.LB_SCALE=1.14;
(function(){const base=lbBots;lbBots=function(){return base.apply(this,arguments).map(b=>({...b,fin:Math.round(b.fin*CFG.LB_SCALE)}));};})();
// Первый кредит — без взноса кристаллами и без процентов (решение продюсера 30.09.2026):
// клетка банка должна работать с первого захода, главное — вернуть тело долга. Второй и третий как были.
CFG.LOANS[0].hard=0;CFG.LOANS[0].rate=0;
// Первый кредит доступен без залога и без проверки платёжеспособности (иначе с дешёвыми точками
// банк отказывал): сумма — от минимума до потолка FIRST_LOAN_CAP по потенциалу прибыли за круг.
CFG.FIRST_LOAN_CAP=1000;
(function(){
  const baseCan=canLoan,baseAmt=loanAmount;
  canLoan=function(i){if(i===0&&!(S.loans||[]).length)return true;return baseCan.apply(this,arguments);};
  loanAmount=function(i){if(i===0&&!(S.loans||[]).length){const L=CFG.LOANS[0];return Math.round(Math.min(CFG.FIRST_LOAN_CAP,Math.max(L.floor,lapPotential()*L.laps))/10)*10;}return baseAmt.apply(this,arguments);};
})();
