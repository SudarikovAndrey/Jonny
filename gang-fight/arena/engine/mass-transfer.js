// Both the mass ratio and the receiver's absolute inertia affect displacement.
// Above 105 kg, a planted heavyweight absorbs more impulse than a regular fighter.
export function massTransfer(attackerMass,targetMass){
 const a=Math.max(1,attackerMass),b=Math.max(1,targetMass);
 const ratio=Math.max(.45,Math.min(1.7,2*a/(a+b)));
 const inertia=Math.min(1,(105/b)**2);
 return ratio*inertia;
}
