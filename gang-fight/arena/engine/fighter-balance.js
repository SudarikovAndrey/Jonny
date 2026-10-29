// Roster tuning: health, ordinary-strike damage multiplier, extra seconds between series.
// Physical mass, hit impulse and animation playback remain independent.
// Order: vest, hat, heavyweight, butcher, grandfather, grandson, giant boxer.
export const fighterBalance=[
 {health:104,damage:1},
 {health:80,damage:.75,recovery:.5},
 {health:86,damage:.70,recovery:.8},
 {health:126,damage:1.15},
 {health:108,damage:1.12},
 {health:108,damage:1.12},
 {health:160,damage:1.1},
];
export const martialCombos={
 4:[['kick','palmStrike','sweepKick'],['roundKick','cross'],['kick','cross','roundKick']],
 5:[['jab','cross','spinKick'],['kick','roundKick'],['jab','kick','sweepKick']],
};
