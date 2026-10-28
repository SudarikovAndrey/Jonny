// Dedicated authored heavyweight clips. The medium set remains available as an alternative.
const clips={jab:['giantJabLeft','Left',[.0941,1.6961,1.4148]],cross:['giantJabRight','Right',[.1003,1.7268,1.4204]],hookLeft:['giantHookLeft','Left',[-.3241,1.5733,1.2962]],hook:['giantHookRight','Right',[.5322,1.7126,1.3382]]};
export function boxingSpec(f,type,spec){
 if(f.kind!==6||!clips[type])return spec;
 const [clip,side,nativeAnchor]=clips[type];
 return {...spec,clip,side,nativeAnchor,recordedBoxing:true,snapImpact:true,playbackCap:.85};
}
