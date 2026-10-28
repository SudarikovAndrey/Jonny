export function intensityProfile(value=.5){
 const x=Math.max(0,Math.min(1,Number.isFinite(+value)?+value:.5)),t=x<.5?x*2:(x-.5)*2;
 return {value:x,urgency:Math.max(0,(x-.5)*2),frequency:x<.5?.35+.65*t:1+5*t,playback:x<.5?.55+.45*t:1+1.15*t,aimError:x<.5?.65*(1-t):0,tracking:x<.5?1+1.4*t:2.4+4*t,rangeScale:x<.5?1+.13*(1-t):1-.045*t,label:x<.2?'Неумелый драчун':x<.45?'Осторожный':x<.65?'Обычный бой':x<.85?'Яростный':'Берсерк'};
}
