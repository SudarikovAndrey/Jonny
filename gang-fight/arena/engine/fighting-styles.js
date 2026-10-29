// Each signature reuses a complete authored FBX clip already in motions.json.
// Distances are upper bounds; the arena constrains every launch to its walkable ground.
export const fightingStyles=[
 {name:'Жилет',combos:[['jab','cross','hook'],['jab','body','cross']],super:{name:'Пробивной прямой',attack:'cross',distance:2.0,height:.28,duration:.62,fx:0}},
 {name:'Шляпа',combos:[['body','hookLeft'],['hookLeft','body','hook']],super:{name:'Хлёсткий боковой',attack:'hookLeft',distance:2.2,height:.38,duration:.70,fx:1}},
 {name:'Тяжеловес',combos:[['body','hook','uppercut'],['hook','body']],super:{name:'Таран',attack:'hook',distance:2.6,height:.32,duration:.78,fx:2}},
 {name:'Мясница',combos:[['hookLeft','body','hook'],['body','cross']],super:{name:'Сокрушительный удар в корпус',attack:'body',distance:2.1,height:.23,duration:.70,fx:3}},
 {name:'Дед',super:{name:'Сметающая подсечка',attack:'sweepKick',distance:2.5,height:.25,duration:.75,fx:4}},
 {name:'Внук',super:{name:'Ураганный круговой',attack:'roundKick',distance:2.7,height:.65,duration:.85,fx:5}},
 {name:'Гигант',super:{name:'Козырной апперкот',attack:'giantUppercut',distance:3,height:1.25,duration:.95,fx:6}}
];
