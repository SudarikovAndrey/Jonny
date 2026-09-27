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
 tile(t,map='brooklyn',ladder=false){
  if(t?.type==='biz')return this.business(t.i,ladder?Math.ceil((t.level||1)/3):t.tier||1,map);
  const format=(map==='mainstreet'||ladder)?Math.ceil((t?.salesLvl||1)/4):1;
  return this.point(t?.good||t?.base||'gum',format);
 },
 business(tile,stage=1,map='mainstreet'){
  return map==='mainstreet'?`assets/points/biz_mainstreet_${tile}.webp`:`assets/points/biz_brooklyn_${tile}_${Math.max(1,Math.min(3,Number(stage)||1))}.webp`;
 }
};
