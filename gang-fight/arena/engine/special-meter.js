export const SPECIAL_LIMIT=2;
export const specialReady=f=>(f.specialUses||0)<SPECIAL_LIMIT&&(f.specialCharge||0)>=100;
export function gainSpecial(f,amount){if(!f||f.down||f.health<=0||(f.specialUses||0)>=SPECIAL_LIMIT)return;f.specialCharge=Math.min(100,(f.specialCharge||0)+Math.max(0,amount));}
export function spendSpecial(f){if(!specialReady(f))return false;f.specialCharge=0;f.specialUses=(f.specialUses||0)+1;return true;}
