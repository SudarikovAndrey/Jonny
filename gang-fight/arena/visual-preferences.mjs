export const VISUAL_KEY='american-boy.arena.visual.v1';
export function sanitizeVisual(value){
 if(!value||value.version!==1)return null;
 const out={version:1};
 for(const [key,min,max] of [['width',0,5],['contrast',0,1],['rim',0,2],['shadowOpacity',0,1],['zoom',.85,3.2]])if(Number.isFinite(value[key]))out[key]=Math.max(min,Math.min(max,value[key]));
 for(const [key,values] of [['shadowMode',['silhouette','oval']],['cameraMode',['follow','overview']],['quality',['auto','high','mobile']]])if(values.includes(value[key]))out[key]=value[key];
 for(const key of ['cameraShake','effects'])if(typeof value[key]==='boolean')out[key]=value[key];
 return out;
}
export function loadVisual(storage){try{return sanitizeVisual(JSON.parse(storage.getItem(VISUAL_KEY)));}catch{return null;}}
export function saveVisual(storage,value){storage.setItem(VISUAL_KEY,JSON.stringify(sanitizeVisual({...value,version:1})));}
