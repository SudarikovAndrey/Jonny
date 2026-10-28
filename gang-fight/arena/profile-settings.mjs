import {sanitizeVisual} from './visual-preferences.mjs';
export const PROFILE_KEY='american-boy.arena.profile.v2';
export function sanitizeArt(v={}){return {textures:['1024','2048','original'].includes(v.textures)?v.textures:undefined,backdrop:['calm','original'].includes(v.backdrop)?v.backdrop:undefined};}
export function sanitizeBattle(v={}){const out={};for(const k of ['blue','gold'])if(Number.isFinite(v[k]))out[k]=Math.max(1,Math.min(10,Math.trunc(v[k])));if(Number.isFinite(v.intensity))out.intensity=Math.max(0,Math.min(100,v.intensity));if(['chinatown','all','giant','classic'].includes(v.roster))out.roster=v.roster;if([1,.3,2].includes(v.speed))out.speed=v.speed;if(typeof v.flightCollisions==='boolean')out.flightCollisions=v.flightCollisions;return out;}
export function resolveProfile(defaults,storage,params=new URLSearchParams()){
 let saved;try{saved=JSON.parse(storage?.getItem(PROFILE_KEY)||'null');}catch{}
 const visual={...defaults.visual};
 if(saved?.profileId===defaults.id){Object.assign(visual,sanitizeVisual({...saved.visual,version:1})||{});for(const [k,v] of Object.entries(sanitizeArt(saved.visual)))if(v!==undefined)visual[k]=v;}
 const battle={...defaults.battle,...(saved?.profileId===defaults.id?sanitizeBattle(saved.battle):{})};
 // Old launch links and legacy per-port storage cannot silently replace the agreed defaults.
 if(params.get('profileOverrides')==='1'){
  for(const [k,v] of Object.entries(sanitizeArt(Object.fromEntries(params))))if(v!==undefined)visual[k]=v;
  if(['follow','overview'].includes(params.get('camera')))visual.cameraMode=params.get('camera');
  for(const k of ['blue','gold'])if(params.has(k))battle[k]=Math.max(1,Math.min(10,Math.trunc(+params.get(k))||1));
  if(['chinatown','all','giant','classic'].includes(params.get('roster')))battle.roster=params.get('roster');
  if(params.has('intensity'))battle.intensity=Math.max(0,Math.min(100,+params.get('intensity')||0));
  if(params.has('flightCollisions'))battle.flightCollisions=params.get('flightCollisions')==='1';
 }
 return {visual,battle};
}
export function saveProfile(storage,defaults,visual,battle=defaults.battle){const valid={...sanitizeVisual({...visual,version:1})};for(const [k,v] of Object.entries(sanitizeArt(visual)))if(v!==undefined)valid[k]=v;const value={profileId:defaults.id,visual:valid,battle:sanitizeBattle(battle)};storage.setItem(PROFILE_KEY,JSON.stringify(value));return value;}
