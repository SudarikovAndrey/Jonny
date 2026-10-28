import {bodyCapsules,sweepCapsule} from './contact.js?v=20261027giant';
// Authored windows are normalized clip times. No radial damage: every result
// requires an actual limb sweep through an enemy capsule and a clear wall path.
export class MultiContact {
 constructor(windows,maxVictims=Infinity){this.maxVictims=maxVictims;this.victims=new Set();this.windows=windows;this.hit=new Map();this.previous=null;}
 sample({phase,points,attacker,targets,clear,capsules=bodyCapsules}){
  const old=this.previous;this.previous={phase,points:Object.fromEntries(Object.entries(points).map(([k,v])=>[k,v.clone()]))};
  if(!old||phase<=old.phase)return [];
  const hits=[];
  for(const [index,w] of this.windows.entries()){
   const fromPhase=Math.max(old.phase,w.start),toPhase=Math.min(phase,w.end);if(toPhase<=fromPhase)continue;
   const seen=this.hit.get(w.swing??index)||new Set();this.hit.set(w.swing??index,seen);
   for(const t of targets){if(t===attacker||t.team===attacker.team||t.down||t.health<=0||t.launch||seen.has(t.id))continue;
    let first=null;
    for(const limb of w.limbs){const a=old.points[limb],b=points[limb];if(!a||!b)continue;
     const from=a.clone().lerp(b,(fromPhase-old.phase)/(phase-old.phase)),to=a.clone().lerp(b,(toPhase-old.phase)/(phase-old.phase));
     for(const capsule of capsules(t)){if(w.zones&&!w.zones.includes(capsule.zone))continue;const h=sweepCapsule(from,to,capsule,w.radius??.065);if(!h||!clear(attacker.root.position,t.root.position)||!clear(from,h.point))continue;
      const time=fromPhase+(toPhase-fromPhase)*h.t;if(!first||time<first.time)first={...h,time,target:t,limb,window:index,from,to};
     }
    }
    if(first&&(this.victims.has(t.id)||this.victims.size<this.maxVictims)){seen.add(t.id);this.victims.add(t.id);hits.push(first);}
   }
  }
  return hits.sort((a,b)=>a.time-b.time||a.target.id-b.target.id);
 }
}
