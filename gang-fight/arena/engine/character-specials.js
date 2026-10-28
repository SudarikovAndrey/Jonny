// The integrator owns targeting and damage. These helpers only expose authored motion.
export function splitSpecialRootMotion(clip){
 const rootMotion=clip.frames.map(f=>[f.hip[0],0,f.hip[2]]);
 return {rootMotion,clip:{...clip,rootMotionEmbedded:false,frames:clip.frames.map(f=>({...f,hip:[0,f.hip[1],0]}))}};
}
export function specialContactWindows(manifest,kind,clipTime){
 const character=manifest.characters.find(c=>c.kind===kind);
 return character?character.contacts.filter(w=>clipTime>=w.frames[0]/manifest.fps&&clipTime<=w.frames[1]/manifest.fps):[];
}
