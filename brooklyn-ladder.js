// ===== Бруклин (карта 5) на новой лестнице =====
// Спек: черновики/америкэн-бой-карты-и-дерево.md §2, §3, §6; решение 25.09 — перевести.
// Прежняя структура прототипа сохраняется: у линии три товара (tier, next), смена
// товара — прежнее «расширение» с дневными ограничениями TIER_DAY. Меняется:
//  • товары — 6 категорий × 3 товара (Брайтон: напитки, сладости; Кони: одежда,
//    обувь; Манхэттен: аудио, видео);
//  • внутри товара 16 уровней = 4 формата × 4; одна прокачка — +1 продажа за круг
//    и +4 места (запас = 4 круга продаж); уровень G сквозной: 16·(товар−1)+уровень;
//  • цена прокачки = прирост прибыли × окупаемость 6 кругов ×1,03 за уровень
//    (модели/америкэн-бой-карты/economy.py); смена товара — та же формула ×1,5;
//  • бизнес — 9 уровней в трёх стадиях «самозанятый → малый → средний», без «Сети»
//    и «Корпорации» (они — поздние стадии после карты 5).
// Карта 1 (?map=1) использует свою лестницу из map1.js и этот файл не включает.
// Пока баланс Бруклина на новой лестнице не откалиброван, она включается только по ?l5=1
// (карта 1 — своя лестница в map1.js). См. черновики/америкэн-бой-карты-и-дерево.md §6.
if(new URLSearchParams(location.search).get('l5')==='1'&&new URLSearchParams(location.search).get('map')!=='1'){
CFG.L5_LADDER=true;
const L5={perTier:16,payback:6,growth:1.03,switchMult:1.5,bizStageDay:[1,3,5],
  formats:{drinks:['Тележка','Ларёк','Киоск','Магазинчик'],sweets:['Лоток','Прилавок','Киоск','Магазинчик'],
    clothes:['Вешалка','Палатка','Павильон','Бутик'],shoes:['Коробки','Палатка','Павильон','Обувной магазинчик'],
    audio:['Раскладушка','Ларёк','Павильон','Салон'],video:['Прилавок','Ларёк','Салон','Магазин электроники']},
  biz:{3:['Тётя Роза стирает соседям','Прачечная на углу','Химчистка с доставкой'],
    8:['Луиджи печёт дома','Пиццерия на шесть столиков','Пиццерия с доставкой'],
    17:['Пневматика на ящике','Тир-палатка','Павильон аттракционов'],
    23:['Тележка с хот-догами','Закусочная у пирса','Дайнер 24/7'],
    32:['Перекупщик во дворе','Стоянка подержанных авто','Автосалон с сервисом'],
    37:['Диджей в гараже','Бар с музыкой','Ночной клуб']}};
// Очки поставки растут с ценой товара медленнее цены: pts ≈ продажа^0,55.
const l5pts=sell=>Math.max(2,Math.round(Math.pow(sell,.55)));
const G5=(id,name,buy,sell,zone,tier,icon,next,cat)=>({id,name,buy,sell,pts:l5pts(sell),...(tier===1?{zone}:{tier}),icon,next,cat});
// id прежних товаров оставлены там, где смысл совпал, — работают значки поля и сохранения.
CFG.GOODS=[
  G5('cola','Кола',4,7,0,1,'🥤','bud','drinks'),        G5('gum','Жвачка',2,4,0,1,'🍬','candy','sweets'),
  G5('sport','Спорт',20,32,1,1,'🎽','jeans','clothes'),  G5('keds','Кеды',25,40,1,1,'👟','sneak','shoes'),
  G5('tape','Кассетники',50,78,2,1,'📼','walk','audio'), G5('tv','Телеки',120,180,2,1,'📺','vcr','video'),
  G5('bud','Пиво',12,20,0,2,'🍺','champ','drinks'),      G5('candy','Конфеты',8,14,0,2,'🍫','cake','sweets'),
  G5('jeans','Джинса',60,95,1,2,'👖','jacket','clothes'),G5('sneak','Кроссовки',80,125,1,2,'👟','boots','shoes'),
  G5('walk','Плееры',150,225,2,2,'🎧','disc','audio'),   G5('vcr','Видаки',300,430,2,2,'📼','cam','video'),
  G5('champ','Алкоголь',40,64,0,3,'🍾',null,'drinks'),   G5('cake','Кондитерская',28,46,0,3,'🎂',null,'sweets'),
  G5('jacket','Кожаная одежда',180,270,1,3,'🧥',null,'clothes'),G5('boots','Сапоги',220,330,1,3,'🥾',null,'shoes'),
  G5('disc','CD',400,580,2,3,'💿',null,'audio'),         G5('cam','Видеокамеры',700,980,2,3,'📹',null,'video'),
];
CFG.POINT_NAMES=Object.fromEntries(CFG.GOODS.filter(g=>g.zone!==undefined).map(g=>{const a=[g];let n=g;while(n.next){n=CFG.GOODS.find(x=>x.id===n.next);a.push(n);}return [g.id,a.map(x=>x.name)];}));
const l5cat=g=>(CFG.GOODS.find(x=>x.id===g)||{}).cat||'drinks';
const l5G=t=>L5.perTier*((t.tier||1)-1)+t.salesLvl;
const l5sales=G=>2+(G-1);
const l5margin=g=>{const x=good(g);return Math.max(1,x.sell-x.buy);};
const l5profit=(g,G)=>l5sales(G)*l5margin(g);
const l5payback=G=>L5.payback*Math.pow(L5.growth,G-1);
const l5round=v=>v<100?Math.max(5,Math.round(v/5)*5):Math.round(v/10)*10;
// Лесенки по тиру: 16 значений, дальше существующий код прототипа читает их сам.
capTab=function(t){const b=L5.perTier*((t.tier||1)-1);return Array.from({length:L5.perTier},(_,i)=>4*l5sales(b+i+1));};
salTab=function(t){const b=L5.perTier*((t.tier||1)-1);return Array.from({length:L5.perTier},(_,i)=>l5sales(b+i+1));};
salesCost=function(t){return l5round(l5margin(t.good)*l5payback(l5G(t)));};
capCost=salesCost;
evolveCost=function(t){if(t.type!=='kiosk')return 0;const ng=good(t.good).next;if(!ng)return 0;const G=l5G(t);
  return l5round((l5profit(ng,G+1)-l5profit(t.good,G))*l5payback(G)*L5.switchMult);};
const l5baseEvolveState=evolveState;
evolveState=function(t){if(t.type==='biz')return 'max';return l5baseEvolveState.apply(this,arguments);};
// Одна прокачка — оба стата (решение 25.09); уровень в окне — «ур. N из 16» внутри товара.
kioskLvl=t=>t.salesLvl;
kioskMaxLvl=()=>L5.perTier;
kioskNextStat=t=>t.salesLvl<L5.perTier?'sales':null;
kioskUpCost=t=>kioskNextStat(t)?salesCost(t):0;
kioskAfter=t=>kioskNextStat(t)?{cap:4*l5sales(l5G(t)+1),sales:salesBoost(l5sales(l5G(t)+1))}:null;
// Старые сохранения: прежний уровень точки (capLvl+salesLvl−1) переносится как уровень внутри товара.
const L5_OLD={marl:'candy',cigar:'cake',levis:'jeans',jordan:'sneak',bmx:'boots',comp:'cam'};
kioskLevelsNormalize=function(){if(!S||!S.tiles)return;for(const t of S.tiles){
  if(t.type==='kiosk'){for(const k of ['good','base'])if(t[k]&&!good(t[k]))t[k]=L5_OLD[t[k]]||'cola';}
  if(t.type!=='kiosk'||!t.owner)continue;
  if(!t.l5){t.l5=1;if(t.capLvl!==t.salesLvl)t.salesLvl=Math.min(L5.perTier,t.capLvl+t.salesLvl-1);}t.capLvl=t.salesLvl;}};
// Опоздавшим — прокачанные точки как раньше (7 шагов), а не вся лестница товара.
const l5Late=latePack;latePack=function(){const r=l5Late.apply(this,arguments);for(const t of myKiosks()){t.salesLvl=Math.min(t.salesLvl,7);t.capLvl=t.salesLvl;t.l5=1;t.goods=Math.min(t.goods,cap(t));}return r;};
function kioskStageName(t){const f=L5.formats[l5cat(t.good)]||['Точка'];return f[Math.min(3,Math.floor((t.salesLvl-1)/4))];}
pointName=function(t){return `${kioskStageName(t)} · ${good(t.good||t.base||'cola').name}`;};
CFG.KIOSK.showProfit=true;
// Сбор точки за проход растёт как feeLevelMult^(уровень−1). Прежний уровень точки был ≤ 7
// (×3,8); 16 уровней товара дали бы ×800. Сводим их к прежнему масштабу 1–7 — дальше
// сбор растёт вместе с ценой точки при смене товара, как раньше при расширении.
klevel=function(t){return t.type==='biz'?t.level:1+Math.floor((Math.min(L5.perTier,t.salesLvl)-1)*6/15);};
// Бизнес: 9 уровней, три стадии; стадия открывается днём недели (как товары).
CFG.BIZ.maxLevel=9;CFG.BIZ.feeLevelMult=1.3;CFG.BIZ_LEVEL_DAY=[1,1,1,L5.bizStageDay[1],L5.bizStageDay[1],L5.bizStageDay[1],L5.bizStageDay[2],L5.bizStageDay[2],L5.bizStageDay[2]];
bizName=function(t){const st=L5.biz[t.i];const n=CFG.BIZ_NAMES[t.i]||'Бизнес';if(!st)return n;return `${st[Math.min(2,Math.floor(((t.level||1)-1)/3))]}`;};
}
