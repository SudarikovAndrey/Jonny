/* Existing windows; deterministic fixtures use their own save, only in playtest. */
(()=>{
 if(!PLAYTEST)return;
 const params=new URLSearchParams(location.search),name=params.get('window');
 let reviewTile=null;
 const goodsBase=id=>{
  for(const g of CFG.GOODS.filter(g=>g.zone!==undefined)){
   let current=g;const seen=new Set();
   while(current&&!seen.has(current.id)){if(current.id===id)return g.id;seen.add(current.id);current=CFG.GOODS.find(x=>x.id===current.next);}
  }
  return id;
 };
 if(UI_REVIEW){
  CFG.REAL_DAYS=false;
  S.player='Джонни';S.cash=5000;S.hard=0;S.day=MAP1?1:7;S.rolls=80;S.pos=1;S.opened=[true,true,true];
  S.firstRoute={variant:0,index:0,done:true};S.training={shipped:true,explained:true,skipped:true};S.starter.closed=true;
  Object.assign(S.tips,{intro:true,shop:true,kiosk:true,upgrade:true,evolve:true,guideActive:false});
  S.tiles.forEach(t=>{if(t.type==='kiosk'||t.type==='biz')t.owner=null;});
  if(name==='hud'){
   const safe=Math.max(0,Math.min(80,Number(params.get('safeTop'))||0));
   document.documentElement.style.setProperty('--host-safe-top',safe+'px');
   if(!MAP1){S.q=[{id:'earn',goal:2000,text:QTEXT.earn(2000),prog:280,done:false,claimed:false,reward:{cash:100}},{id:'buy',goal:2,text:QTEXT.buy(2),prog:0,done:false,claimed:false,reward:{rolls:5}},{id:'sell',goal:12,text:QTEXT.sell(12),prog:0,done:false,claimed:false,reward:{rolls:10}}];S.pts=22;S.cash=params.has('large')?12345678:85;S.hard=params.has('large')?987654:4;S.day=4;}
  }
  if(name==='hud'&&!MAP1){
   const count=Math.max(1,Math.min(3,Number(params.get('missions'))||3));
   S.q=S.q.slice(0,count);
   const claimed=Math.max(0,Math.min(count,Number(params.get('claimed'))||0));
   S.q.forEach((q,i)=>{q.claimed=i<claimed;});
  }
  if(name==='police'){S.pos=S.tiles.findIndex(t=>t.type==='police');S.jail=0;delete S.policePoseTile;}
  if(name==='coins'){S.pos=3;[4,36,225,900].forEach((cash,k)=>{S.tiles[[1,2,4,5][k]].drop={cash};});S.tiles[6].drop={rolls:2};S.pot=77;}
  if(name==='progress'){if(params.has('day'))S.day=Math.max(1,Math.min(CFG.DAYS,Number(params.get('day'))||1));S.pts=Math.max(0,Number(params.get('points'))||0);S.parcelSent=params.has('sent');S.stat.parcels=S.parcelSent&&!params.has('catchup')?S.day:0;}
  if(name==='inspector'){S.pos=1;S.tiles[1].insp=true;}
  if(name==='board-marks'){S.pos=2;S.tiles[1].insp=true;S.tiles[1].drop=null;}
  if(name==='warehouse'||name==='shipping'||name==='progress'&&params.has('goods')){
   if(name==='shipping'&&params.has('day'))S.day=Math.max(1,Math.min(CFG.DAYS,Number(params.get('day'))||1));
   const allGoods=MAP1?['cola','gum']:CFG.GOODS.map(g=>g.id);
   const goods=allGoods.slice(0,params.has('goods')?Math.max(0,Number(params.get('goods'))||0):allGoods.length);
   S.tiles.filter(t=>t.type==='kiosk').slice(0,goods.length).forEach((t,i)=>{
    const id=goods[i];t.good=id;t.base=goodsBase(id);t.tier=goodTier(good(id));t.owner='you';t.salesLvl=t.capLvl=1;t.l5=1;t.goods=name==='shipping'||params.has('full')?cap(t):i%2?4:0;
   });
  }
  if(name==='point'){
   reviewTile=S.tiles.find(t=>t.type==='kiosk');
   const requested=params.get('good')||'cola',id=good(requested)?requested:'cola';
   Object.assign(reviewTile,{good:id,base:goodsBase(id),tier:goodTier(good(id)),salesLvl:Math.max(1,Math.min(MAP1?4:CFG.L5_LADDER?16:4,Number(params.get('level'))||1)),price:50,l5:1});
   reviewTile.capLvl=reviewTile.salesLvl;reviewTile.owner=params.get('owned')==='1'?'you':null;reviewTile.goods=reviewTile.owner?4:0;S.pos=reviewTile.i;
  }
  if(name==='business'){
   reviewTile=S.tiles.find(t=>t.type==='biz'&&t.i===Number(params.get('tile')))||S.tiles.find(t=>t.type==='biz');
   reviewTile.owner=params.get('owned')==='1'?'you':null;reviewTile.level=MAP1?1:Math.max(1,Math.min(CFG.BIZ.maxLevel,Number(params.get('level'))||1));reviewTile.tier=Math.max(1,Math.min(3,Number(params.get('tier'))||1));reviewTile.price=200;S.pos=reviewTile.i;
  }
  if(name==='tree'||name==='map-end'){
   const after=Math.max(1,Math.min(4,Number(params.get('after'))||1));
   S.meta={map:after,pp:name==='tree'?META.steps.find(s=>s.after===after).nodes.length:0,owned:META.steps.filter(s=>s.after<after).flatMap(s=>s.nodes.map(n=>n.id)),settled:name==='tree'?[after]:[]};
   S.cash=360;S.stat.earned=2840;S.stat.sold=216;
   if(name==='map-end')S.tiles.filter(t=>t.type==='kiosk').slice(0,12).forEach((t,i)=>{t.owner='you';t.salesLvl=t.capLvl=i<3?3:1;t.goods=4;});
  }
  if(name==='chance'){
   S.chanceStage=Math.max(1,Math.min(5,Number(params.get('chanceStage'))||1));
   const id=params.get('chance')||'coffee';
   if(Chance.library().some(c=>c.id===id)){
    const ch=chanceState();ch.bagKey=Chance.stage()+':'+Chance.deck().join(',');ch.bag=[id];
   }
  }
  if(params.has('cash')&&Number.isFinite(Number(params.get('cash'))))S.cash=Math.max(0,Number(params.get('cash')));
  save();render();
 }
 const open={
  'level-up':()=>modal(`<h2>🧢 Джонни — уровень 2!</h2><p class="t">Новое улучшение: <b>${CFG.PERKS[2]}</b></p>`,[{t:'Красава',v:1,cls:'ok'}]),
  'notice-reward':()=>milestoneModal(CFG.MILESTONES[0]),
  'notice-confirm':()=>{S.day=1;return offerOpen(1);},
  'notice-street':()=>modal('<h2>Улица 2 открыта!</h2><p>Теперь здесь можно покупать новые точки и бизнесы.</p>',[{t:'Поехали',v:1,cls:'ok'}]),

  onboarding:async()=>{await window.GameStart.whenEntered;showOnboarding();},
  coins:async()=>{
   if(!UI_REVIEW)return;
   await window.GameStart.whenEntered;
   const controls=document.createElement('div');
   controls.style.cssText='position:fixed;top:180px;left:12px;z-index:95;display:flex;gap:8px';
   const burst=document.createElement('button'),single=document.createElement('button');
   burst.textContent='Разлёт монет';single.textContent='Монета за проход';
   burst.onclick=async()=>{burst.disabled=true;try{await flyDrops([1,2,4,5].map(i=>({t:S.tiles[i],drop:{cash:100},icon:'🪙'})));}finally{burst.disabled=false;}};
   single.onclick=()=>streetPassCoin(3);
   controls.append(burst,single);document.body.append(controls);
  },
  point:()=>{const t=reviewTile||S.tiles.find(t=>t.type==='kiosk'&&t.base==='cola'&&unlocked(t))||S.tiles.find(t=>t.type==='kiosk'&&unlocked(t));if(t)kioskWindow(t);},
  business:()=>{const t=reviewTile||S.tiles.find(t=>t.type==='biz'&&!t.owner&&unlocked(t))||S.tiles.find(t=>t.type==='biz');if(t)bizWindow(t);},
  tree:()=>{treeScreen(Math.max(1,Math.min(4,Number(params.get('after'))||1)));openCustom();},
  'map-end':()=>mapEndFlow(Math.max(1,Math.min(4,Number(params.get('after'))||1))),
  'tip-point':()=>showTip('Ты попал на точку, которую можно купить. Жми на строку для открытия карточки точки.','tilebar'),
  tip:()=>showTip('Серые клетки — стройка. Пробегая мимо, ты подрабатываешь и получаешь немного денег. Когда улица откроется, здесь появятся новые точки.'),
  'tip-attached':()=>{shop();showTip('Серые клетки — стройка. Пробегая мимо, ты подрабатываешь и получаешь немного денег. Когда улица откроется, здесь появятся новые точки.');},
  progress:()=>eventHub('ticket'),inspector:()=>inspectorPopup(S.tiles[S.pos]),
  warehouse:()=>shop(),shipping:()=>shipClick(),police:()=>police(),chance:()=>Chance.play(),johnny:()=>johnny(),shop:()=>shopHard()
 }[name];
 if(!open)return;
 const show=()=>{if($('modal').hidden)open();};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',show,{once:true});else show();
})();
