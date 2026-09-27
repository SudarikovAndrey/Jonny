/* Dice 21: presentation-independent, synchronous transactions. */
(function(root){
'use strict';
const CHIPS=[25,50,100,250,500], clone=x=>JSON.parse(JSON.stringify(x));
const total=dice=>dice.reduce((a,b)=>a+b,0);
const initial=()=>({phase:'betting',chips:[],player:[],dealer:[],stake:0,result:null,round:0});
function transition(saved,action,cash,roll=()=>1+Math.floor(Math.random()*6)){
 const s=clone(saved||initial());let delta=0;
 const die=()=>{const n=roll();if(!Number.isInteger(n)||n<1||n>6)throw Error('Invalid die');return n;};
 const resolve=()=>{
  const p=total(s.player);
  if(p<=21){s.dealer=[die(),die(),die()];while(total(s.dealer)<=p&&total(s.dealer)<21)s.dealer.push(die());}
  const d=total(s.dealer), outcome=p>21?'lose':d>21||p>d?'win':p===d?'push':'lose';
  const returned=outcome==='win'?s.stake*2:outcome==='push'?s.stake:0;
  delta+=returned;s.phase='result';s.result={outcome,returned,net:returned-s.stake,player:p,dealer:d,reason:p>21?'player-bust':d>21?'dealer-bust':outcome==='push'?'tie':'points'};
 };
 if(action.type==='add'&&s.phase==='betting'){
  if(!CHIPS.includes(action.value))return {ok:false,error:'Неизвестная фишка'};
  if(total(s.chips)+action.value>cash)return {ok:false,error:'Не хватает денег на эту фишку'};
  if(s.chips.length>=24)return {ok:false,error:'На столе уже 24 фишки'};
  s.chips.push(action.value);
 }else if(action.type==='remove'&&s.phase==='betting'){
  if(!Number.isInteger(action.index)||action.index<0||action.index>=s.chips.length)return {ok:false};
  s.chips.splice(action.index,1);
 }else if(action.type==='clear'&&s.phase==='betting')s.chips=[];
 else if(action.type==='start'&&s.phase==='betting'){
  s.stake=total(s.chips);if(s.stake<=0||s.stake>cash)return {ok:false,error:'Сначала выбери фишки для ставки'};
  delta=-s.stake;s.player=[die(),die(),die()];s.dealer=[];s.phase='player';s.result=null;s.round++;
 }else if(action.type==='hit'&&s.phase==='player'){
  s.player.push(die());if(total(s.player)>=21)resolve();
 }else if(action.type==='stand'&&s.phase==='player')resolve();
 else if(action.type==='next'&&s.phase==='result'){
  const round=s.round;Object.assign(s,initial(),{round});
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
const api={CHIPS,total,initial,transition,createService};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Dice21Engine=api;
})(typeof window==='undefined'?globalThis:window);
