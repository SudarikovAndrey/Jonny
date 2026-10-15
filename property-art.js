/* Complete printed property catalogue. IDs stay compatible with existing saves. */
window.PropertyArt={
 revisions:new Set(['bud_2','bud_3','champ_2','champ_3','gum_2','gum_3','candy_1','candy_2','candy_3','cake_1','cake_2','cake_3']),
 goods:['cola','bud','champ','gum','candy','cake','sport','jeans','jacket','keds','sneak','boots','tape','walk','disc','tv','vcr','cam','marl','cigar','levis','jordan','bmx','comp'],
 point(good,format=1){
  const aliases={levis:'jeans',jordan:'sneak'},legacy=new Set(['marl','cigar','bmx','comp']);
  const f=legacy.has(good)?1:aliases[good]?2:Math.max(1,Math.min(4,Number(format)||1));
  const key=`${aliases[good]||good}_${f}`;
  return `assets/points/pt_${key}${this.revisions.has(key)?'-v2':''}.webp`;
 },
 // Сан-Франциско и мультиплеер (SFMAP): картинка растёт с каждой прокачкой (Андрей 03.10).
 // Бизнес: стадия = уровень (1–3, потолок CFG.BIZ.maxLevel = 3). Точка: формат = уровень
 // (1–4; на 5-м, потолке SF.levelCap, — магазинчик: форматов у товара четыре).
 sf(){return typeof SFMAP!=='undefined'&&!!SFMAP;},
 sfFormat(t){return Math.max(1,Math.min(4,Number(t?.salesLvl)||1));},
 sfStage(t){return Math.max(1,Math.min(3,Number(t?.level)||1));},
 tile(t,map='brooklyn',ladder=false){
  if(this.sf())return t?.type==='biz'?this.business(t.i,this.sfStage(t),map):this.point(t?.good||t?.base||'gum',this.sfFormat(t));
  if(t?.type==='biz')return this.business(t.i,ladder?Math.ceil((t.level||1)/3):t.tier||1,map);
  const format=(map==='mainstreet'||ladder)?Math.ceil((t?.salesLvl||1)/4):1;
  return this.point(t?.good||t?.base||'gum',format);
 },
 // Сан-Франциско (?map=sf, и мультиплеер): свои бизнесы по клеткам — sf-builder.js, SF.biz;
 // картинки — заказ Codex 3 (design/ЗАДАЧА-CODEX-картинки-графики.md), 3 стадии.
 sfBiz:{3:'cablecar',8:'fishpier',17:'coffee',23:'chinalaundry',32:'surf',37:'sourdough'},
 business(tile,stage=1,map='mainstreet'){
  const st=Math.max(1,Math.min(3,Number(stage)||1));
  if(map!=='mainstreet'&&typeof SFMAP!=='undefined'&&SFMAP&&this.sfBiz[tile])return `assets/points/biz_sf_${this.sfBiz[tile]}_${st}.webp`;
  return map==='mainstreet'?`assets/points/biz_mainstreet_${tile}.webp`:`assets/points/biz_brooklyn_${tile}_${Math.max(1,Math.min(3,Number(stage)||1))}.webp`;
 }
};
// Сан-Франциско и мультиплеер: открыта карточка своей точки или бизнеса — заранее грузим картинки
// следующих форматов. Плейтест 14.10 (m8-emptyimg): две прокачки за секунду, карточка перерисована
// дважды, а впервые нужный pt_gum_4 ещё не пришёл — «прокачал, а картинка не прогрузилась».
(()=>{
 const warm=new Map();
 const load=src=>{if(!src||warm.has(src))return;const im=new Image();im.decoding='async';im.src=src;warm.set(src,im);im.decode?.().catch(()=>{});};
 function ahead(t){
  const P=window.PropertyArt;if(!t||!t.owner||!P.sf())return;
  if(t.type==='biz'){for(let s=P.sfStage(t)+1;s<=3;s++)load(P.business(t.i,s,'sanfrancisco'));return;}
  const g=t.good||t.base;if(t.type!=='kiosk'||!g||g==='lot')return;
  for(let f=P.sfFormat(t)+1;f<=4;f++)load(P.point(g,f));
 }
 function watch(){
  const card=document.getElementById('card');if(!card)return;
  const check=()=>{const id=card.dataset.propertyId;if(id==null||typeof S==='undefined'||!S.tiles)return;ahead(S.tiles.find(t=>String(t.i)===id));};
  new MutationObserver(check).observe(card,{attributes:true,attributeFilter:['data-property-id','data-property-owned']});
 }
 document.readyState==='loading'?document.addEventListener('DOMContentLoaded',watch):watch();
})();
