export const LOOT_MAGNET_RADIUS=1.65;
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
export function canReceiveLoot(f,kind){return !f.down&&!f.knockdown&&!f.launch&&f.health>0&&(kind==='coin'||f.health<f.maxHealth);}
export function magnetTarget(loot,fighters,clear=()=>true){
 const p=loot.object.position,current=loot.magnetTarget;
 if(current&&canReceiveLoot(current,loot.kind)&&distance(p,current.root.position)<LOOT_MAGNET_RADIUS+.65&&clear(p,current.root.position))return current;
 return fighters.filter(f=>canReceiveLoot(f,loot.kind)&&distance(p,f.root.position)<=LOOT_MAGNET_RADIUS&&clear(p,f.root.position)).sort((a,b)=>distance(p,a.root.position)-distance(p,b.root.position)||a.id-b.id)[0]||null;
}
