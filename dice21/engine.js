/* Dice 21: presentation-independent, synchronous transactions. */
(function(root){
'use strict';
const CHIPS=[25,50,100,250,500], clone=x=>JSON.parse(JSON.stringify(x));
const total=dice=>dice.reduce((a,b)=>a+b,0);
const initial=()=>({phase:'betting',chips:[],player:[],dealer:[],stake:0,result:null,round:0,freeBet:0,houseChips:0,house:0,visitGames:0,visitLimit:0});
// Остановка на клетке: первая партия на ставку заведения (фишки уже на столе, снять нельзя),
// игрок может докинуть своих сверху; вторая — только на свои, после неё стол закрывается
// (решение продюсера 30.09.2026).
const VISIT_GAMES=2;
function chipsFor(amount){const out=[];let left=Math.max(0,Math.round(amount/25)*25);for(const v of [...CHIPS].reverse()){while(left>=v&&out.length<24){out.push(v);left-=v;}}return out;}
function transition(saved,action,cash,roll=()=>1+Math.floor(Math.random()*6)){
 const s=clone(saved||initial());let delta=0;
 const die=()=>{const n=roll();if(!Number.isInteger(n)||n<1||n>6)throw Error('Invalid die');return n;};
 const resolve=()=>{
  const p=total(s.player);
  if(p<=21){s.dealer=[die(),die(),die()];while(total(s.dealer)<=p&&total(s.dealer)<21)s.dealer.push(die());}
  const d=total(s.dealer), outcome=p>21?'lose':d>21||p>d?'win':p===d?'push':'lose';
  // Часть заведения: при выигрыше даёт чистую прибыль в свой размер, при ничьей и проигрыше сгорает.
  // Своя часть — как обычно: выигрыш ×2, ничья возвращается, проигрыш уходит дилеру.
  const own=s.stake-s.house;
  const returned=outcome==='win'?own*2+s.house:outcome==='push'?own:0;
  delta+=returned;s.phase='result';s.result={outcome,returned,net:returned-own,free:s.house>0,house:s.house,own,player:p,dealer:d,reason:p>21?'player-bust':d>21?'dealer-bust':outcome==='push'?'tie':'points'};
 };
 if(action.type==='visit'&&s.phase==='betting'){
  const chips=chipsFor(action.stake);if(!chips.length)return {ok:false,error:'Ставка заведения слишком мала'};
  s.chips=chips;s.freeBet=total(chips);s.houseChips=chips.length;s.house=0;s.visitGames=0;s.visitLimit=VISIT_GAMES;
 }else if(action.type==='add'&&s.phase==='betting'){
  if(!CHIPS.includes(action.value))return {ok:false,error:'Неизвестная фишка'};
  // Своя фишка списывается сразу, как легла на стол (решение продюсера 30.09.2026); снял — вернулась.
  if(action.value>cash)return {ok:false,error:'Не хватает денег на эту фишку'};
  if(s.chips.length>=24)return {ok:false,error:'На столе уже 24 фишки'};
  s.chips.push(action.value);delta=-action.value;
 }else if(action.type==='remove'&&s.phase==='betting'){
  if(!Number.isInteger(action.index)||action.index<0||action.index>=s.chips.length)return {ok:false};
  if(action.index<s.houseChips)return {ok:false,error:'Фишки заведения не снимаются'};
  delta=s.chips[action.index];s.chips.splice(action.index,1);
 }else if(action.type==='clear'&&s.phase==='betting'){delta=total(s.chips.slice(s.houseChips));s.chips=s.chips.slice(0,s.houseChips);}
 else if(action.type==='start'&&s.phase==='betting'){
  s.stake=total(s.chips);if(s.stake<=0)return {ok:false,error:'Сначала выбери фишки для ставки'};
  s.house=s.freeBet;s.freeBet=0;s.houseChips=0;delta=0; /* свои фишки уже списаны при выкладке */ s.player=[die(),die(),die()];s.dealer=[];s.phase='player';s.result=null;s.round++;
 }else if(action.type==='hit'&&s.phase==='player'){
  s.player.push(die());if(total(s.player)>=21)resolve();
 }else if(action.type==='stand'&&s.phase==='player')resolve();
 else if(action.type==='next'&&s.phase==='result'){
  const round=s.round,visitLimit=s.visitLimit||0,visitGames=visitLimit?(s.visitGames||0)+1:0;Object.assign(s,initial(),{round,visitLimit,visitGames});
 }else return {ok:false};
 return {ok:true,state:s,delta};
}
function createService({read,commit,wallet,roll}){
 return {snapshot(){return {...clone(read()||initial()),cash:wallet()};},dispatch(action){
  const result=transition(read(),action,wallet(),roll);
  if(result.ok)commit(result.state,result.delta,action);
  return {...result,snapshot:this.snapshot()};
 }};
}
const api={CHIPS,total,initial,transition,createService,chipsFor,VISIT_GAMES};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Dice21Engine=api;
})(typeof window==='undefined'?globalThis:window);
