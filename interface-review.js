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
  if(name==='warehouse'||name==='shipping'){
   const goods=MAP1?['cola','gum']:CFG.GOODS.map(g=>g.id);
   S.tiles.filter(t=>t.type==='kiosk').slice(0,goods.length).forEach((t,i)=>{
    const id=goods[i];t.good=id;t.base=goodsBase(id);t.tier=goodTier(good(id));t.owner='you';t.salesLvl=t.capLvl=1;t.l5=1;t.goods=name==='shipping'?cap(t):i%2?4:0;
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
  point:()=>{const t=reviewTile||S.tiles.find(t=>t.type==='kiosk'&&t.base==='cola'&&unlocked(t))||S.tiles.find(t=>t.type==='kiosk'&&unlocked(t));if(t)kioskWindow(t);},
  business:()=>{const t=reviewTile||S.tiles.find(t=>t.type==='biz'&&!t.owner&&unlocked(t))||S.tiles.find(t=>t.type==='biz');if(t)bizWindow(t);},
  tree:()=>{treeScreen(Math.max(1,Math.min(4,Number(params.get('after'))||1)));openCustom();},
  'map-end':()=>mapEndFlow(Math.max(1,Math.min(4,Number(params.get('after'))||1))),
  warehouse:()=>shop(),shipping:()=>shipClick(),police:()=>police(),chance:()=>Chance.play(),johnny:()=>johnny(),shop:()=>shopHard()
 }[name];
 if(!open)return;
 const show=()=>{if($('modal').hidden)open();};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',show,{once:true});else show();
})();
