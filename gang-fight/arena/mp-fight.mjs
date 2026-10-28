// Окно драки банды (МП «С бойцами», Андрей 28.10: «при наездах не понятно, кто и почему победил — нужно окно драки,
// драка уже сделана, бери готовое»). Движок, модели, эффекты, камера и согласованный профиль — общая арена
// (владелец «Американ - боевая система»; снимок выпуска — tools/build_gang_fight.py). Здесь только состав наезда,
// карточки бойцов и «режиссёр» исхода.
// Исход заранее посчитан столом (web/mp-gang.js battle по общему seed): выжившие победители держат здоровье не ниже
// остатка, проигравшие сдают быстрее и падают сами — бой на экране кончается тем же, что записано в итог наезда.
// Вход — JSON в #hash: {blue:[{id,kind,lvl,name}], gold:[…], win:0|1, survivors:[id], left:{id:доля}, blueName, goldName}
// или {preload:[kind…]} — только прогреть кэш (модули, движения, модели) и сообщить {preloaded:true}.
// Выход — postMessage родителю {type:'gang-fight', ready | done, skipped}.
import {installSpecialMotions} from './engine/authored-specials.js';
import {prepareGroundSupport} from './engine/ground-rest.js?v=20261027all-updates';
import {resolveProfile} from './profile-settings.mjs';
import {CourtyardProp} from './courtyard-prop.mjs';
import {BreakableProps} from './breakable-props.mjs?v=20261028loot';
import {FallingHatFX} from './falling-hat.mjs?v=20261027hat';
import {BattleFraming,isStandingForCamera} from './battle-framing.mjs?v=20261027close-camera';
import {GiantPipeFX} from './giant-pipe.mjs?v=20261028no-smoke';
import {CombatNotices} from './combat-notices.mjs?v=20261027compact';
import {CameraImpulse} from './camera-impulse.mjs?v=20261027am';
import {CAMERA_POSITION,CAMERA_TARGET,PLATE_SIZE,PLATE_OFFSET} from './engine/courtyard.js?v=20261027am';
import {CartoonAudio} from './cartoon-audio.mjs?v=20261027landing-audio';
import {CartoonFX} from './cartoon-fx.mjs?v=20261027berserk';
import * as T from 'three';
import {GLTFLoader} from '../viewer/vendor/GLTFLoader.js?v=20261027am';
import {clone} from '../viewer/vendor/SkeletonUtils.js?v=20261027am';
import {Combat} from './engine/combat.js?v=20261028boxing-contact';
import {prepareMeshyRig,updateChinatownRig} from './retarget.mjs?v=20261028martial-power';
import {applyInkToon} from '../shaders/ink-toon.mjs?v=20261028rim';

const $=s=>document.querySelector(s);
const NAMES=['Жилет','Шляпа','Тяжеловес','Мясница','Дед','Внук','Гигант'];
const MODEL=['fighter01','fighter03','fighter02','fighter04','grandfather','grandson','giant-boxer'];   // kind → модель (как в арене)
const PORTRAIT=['zhilet','shlyapa','tyazheloves','myasnitsa','ded','vnuk','gigant'];                  // kind → портрет игры (web/assets/gang)
const modelUrl=k=>'../models/textures-1024/'+MODEL[k]+'.glb?v=20261028art';
const DATA=['./assets/motions.json?v=20261028martial-power','./assets/character-specials.json','./assets/character-specials-manifest.json','./profile-defaults.json'];
const post=m=>{try{parent.postMessage(Object.assign({type:'gang-fight'},m),location.origin);}catch(e){}};
let spec={};try{spec=JSON.parse(decodeURIComponent(location.hash.slice(1))||'{}');}catch(e){}

if(Array.isArray(spec.preload)){
 // Фоновая подгрузка в начале партии: модули уже загружены импортами, докачиваем данные и модели — в HTTP-кэш.
 const kinds=[...new Set(spec.preload.map(k=>k|0))].filter(k=>MODEL[k]);
 Promise.all([...DATA,'./assets/courtyard-calm.webp',...kinds.map(modelUrl)].map(u=>fetch(u).then(r=>r.ok&&r.arrayBuffer()).catch(()=>null)))
  .then(r=>post({preloaded:true,files:r.filter(Boolean).length}));
}else start();

async function start(){
const stage=$('#stage'),canvas=$('canvas');
const lineup=[spec.blue||[],spec.gold||[]],winTeam=spec.win===1?1:0,survivors=new Set((spec.survivors||[]).map(String)),left=spec.left||{};
if(!lineup[0].length)lineup[0]=[{id:'a',kind:0,lvl:1}];if(!lineup[1].length)lineup[1]=[{id:'d',kind:2,lvl:1}];
let finished=false;const finish=skipped=>{if(finished)return;finished=true;post({done:true,skipped:!!skipped});};
$('#skip').onclick=()=>finish(true);
const esc=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('#sideBlue').innerHTML=`<small>Нападение</small>${esc(spec.blueName||'')}`;
$('#sideGold').innerHTML=`<small>Защита</small>${esc(spec.goldName||'')}`;

// ---- карточки бойцов внизу: портрет, уровень, здоровье; выбывший переворачивается ----
const cards=new Map();   // id МП → {el, hp, ghost, shown, ghostAt}
for(const [team,list] of lineup.entries())for(const f of list){
 const el=document.createElement('div');el.className='fc '+(team?'gold':'blue');el.dataset.id=f.id;
 el.setAttribute('aria-label',`${f.name||NAMES[f.kind|0]}, ${f.lvl||1}-й уровень`);
 el.innerHTML=`<div class="fc-in"><div class="fc-face"><img src="../../assets/gang/portrait-${PORTRAIT[f.kind|0]}.webp" alt="" draggable="false"><span class="fc-hp"><i></i><b></b></span></div><b class="fc-lv">${f.lvl||1}</b><div class="fc-back"><span>нокаут</span></div></div>`;
 (team?$('#cardsGold'):$('#cardsBlue')).append(el);
 cards.set(String(f.id),{el,hpEl:el.querySelector('.fc-hp b'),ghostEl:el.querySelector('.fc-hp i'),shown:1,ghost:1,ghostHold:0,out:false});
}
const reducedUi=matchMedia('(prefers-reduced-motion: reduce)');
function cardTick(dt){
 for(const f of combat.fighters){const m=byFighter.get(f.id),c=m&&cards.get(m.id);if(!c)continue;
  const v=Math.max(0,Math.min(1,f.health/f.maxHealth));
  if(v<c.shown-.005){c.ghostHold=.18;if(!reducedUi.matches){c.el.classList.remove('hit');void c.el.offsetWidth;c.el.classList.add('hit');}}
  c.shown=v;c.hpEl.style.transform=`scaleX(${v})`;c.el.classList.toggle('low',v<.3);
  // След удара: держится мгновение и догоняет — видно, сколько сняли.
  if(c.ghostHold>0)c.ghostHold-=dt;else c.ghost+=(v-c.ghost)*Math.min(1,dt*4);
  if(c.ghost<v)c.ghost=v;c.ghostEl.style.transform=`scaleX(${c.ghost})`;
  if(f.down&&!c.out){c.out=true;c.el.classList.add('out');if(!reducedUi.matches)c.el.classList.add('flip');}}
}

// ---- сцена: как в общей арене, с согласованным профилем (profile-defaults.json, без локальных настроек арены) ----
const [motions,specialClips,specialManifest,agreed]=await Promise.all(DATA.map(u=>fetch(u).then(r=>{if(!r.ok)throw Error(u);return r.json();})));
const profile=resolveProfile(agreed,null,new URLSearchParams());
const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=T.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
const scene=new T.Scene(),camera=new T.OrthographicCamera(-6,6,6,-6,.1,80);camera.position.fromArray(CAMERA_POSITION);camera.lookAt(...CAMERA_TARGET);
camera.updateMatrixWorld(true);const framingView=camera.matrixWorldInverse.clone(),cameraHome=camera.position.clone(),screenRight=new T.Vector3(1,0,0).applyQuaternion(camera.quaternion),screenUp=new T.Vector3(0,1,0).applyQuaternion(camera.quaternion);
const framing=new BattleFraming();
const sun=new T.DirectionalLight(0xffefd0,1);sun.position.set(-1,9,-8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
Object.assign(sun.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:.1,far:30});sun.shadow.bias=-.00012;sun.shadow.normalBias=.012;sun.shadow.camera.updateProjectionMatrix();scene.add(sun);scene.add(sun.target);
const shadowGround=new T.Mesh(new T.PlaneGeometry(40,40),new T.ShadowMaterial({color:0x29251e,opacity:profile.visual.shadowOpacity,depthWrite:false}));shadowGround.rotation.x=-Math.PI/2;shadowGround.position.y=.001;shadowGround.receiveShadow=true;scene.add(shadowGround);
const settings={width:profile.visual.width,contrast:profile.visual.contrast,rim:profile.visual.rim,boil:0,lightDirection:sun.position.clone().normalize()};
let framingZoom=null,combat,hatFX,pipeFX,pipeRound=0,looks=[],markers=[],labels=[],time=0,last=performance.now(),acc=0,W=0,H=0,hitStop=0,renderDt=0;
const combatNotices=new CombatNotices($('#badges'));
const sound=new CartoonAudio();const effects=new CartoonFX(scene);
const props=new BreakableProps(scene),courtyardProp=new CourtyardProp(scene),cameraImpulse=new CameraImpulse(),reduced=matchMedia('(prefers-reduced-motion: reduce)');
props.bin=courtyardProp;courtyardProp.onBreak=()=>{if(combat)combat.binActive=false;props.syncNavigation();};
effects.enabled=profile.visual.effects!==false;cameraImpulse.enabled=profile.visual.cameraShake!==false;
function onEvent(e){const source=combat?.fighters[e.attacker??e.fighter],target=combat?.fighters[e.attacker!==undefined?e.fighter:e.target];
 if(!e.impulse&&!e.direction&&source&&target)e={...e,direction:target.root.position.clone().sub(source.root.position).normalize().toArray()};
 courtyardProp.event(e);if(['wallImpacts','bodyCollisions','propImpacts'].includes(e.type))effects.hit({...e,type:'blocks'},camera);
 if(e.type==='crateBreaks'||e.type==='wallHits'){effects.hit({...e,damage:35,impulseMagnitude:45},camera);effects.landing({...e,heavy:true},camera);sound.event({...e,type:'landings'},combat?.fighters);}
 if(e.type==='hits'&&e.hitStop>0)hitStop=Math.max(hitStop,Math.min(.065,e.hitStop));
 combatNotices.event(e);if(effects.enabled)cameraImpulse.trigger(e,performance.now()/1000,reduced.matches);sound.event(e,combat?.fighters);
 if(e.type==='landings')effects.landing(e,camera);if(e.type==='hits'||e.type==='blocks')effects.hit(e,camera);}
scene.background=new T.Color('#d4be91');
new T.TextureLoader().load(profile.visual.backdrop==='original'?'./assets/courtyard.webp':'./assets/courtyard-calm.webp',tex=>{tex.colorSpace=T.SRGBColorSpace;
 const plate=new T.Mesh(new T.PlaneGeometry(PLATE_SIZE,PLATE_SIZE),new T.MeshBasicMaterial({map:tex,depthWrite:false,depthTest:false}));plate.renderOrder=-1000;plate.frustumCulled=false;
 plate.quaternion.copy(camera.quaternion);plate.position.copy(cameraHome).addScaledVector(camera.getWorldDirection(new T.Vector3()),35).add(new T.Vector3(0,-PLATE_OFFSET*PLATE_SIZE,0).applyQuaternion(camera.quaternion));scene.add(plate);resize();});
// Как resize() арены: апертура от согласованного zoom профиля и текущего зума кадрирования.
function resize(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);const a=w/h,zoom=Math.max(1.0005,Math.min(profile.visual.zoom,framingZoom||profile.visual.zoom)),span=11.4/zoom,vh=span/Math.max(1,a);
 camera.left=-vh*a/2;camera.right=vh*a/2;camera.top=vh/2;camera.bottom=-vh/2;camera.updateProjectionMatrix();camera.updateMatrixWorld();W=w;H=h;}
new ResizeObserver(resize).observe(stage);

// ---- двор на весь экран (Андрей 28.10: «бой должен быть на весь экран») ----
// Кадрирование арены (BattleFraming) на узком экране отъезжает так, что кадр выходит за квадрат задника двора
// (PLATE_SIZE × PLATE_SIZE вокруг (0, −PLATE_OFFSET·PLATE_SIZE) в виде камеры) — сверху и снизу пустой беж. Страница
// поверх её решения не даёт кадру выйти за двор: приближение не меньше «двор целиком по меньшей стороне» и сдвиг внутрь.
// Файлы и правила камеры арены не меняются; на широком экране кадр арены и так внутри двора — там это ничего не меняет.
function cover(fr){const a=W/Math.max(1,H),half=PLATE_SIZE/2,cy=-PLATE_OFFSET*PLATE_SIZE;
 const zoom=Math.max(fr.zoom,1.0005),span=PLATE_SIZE/zoom,vh=span/Math.max(1,a),hw=vh*a/2,hh=vh/2;   // та же апертура, что в resize()
 const clamp=(v,r)=>Math.max(-r,Math.min(r,v));
 return {x:clamp(fr.x,Math.max(0,half-hw)),y:cy+clamp(fr.y-cy,Math.max(0,half-hh)),zoom};}
// ---- режиссёр исхода ----
const byFighter=new Map();   // fighter.id арены → {id МП, team}
function direct(){
 for(const f of combat.fighters){const m=byFighter.get(f.id);if(!m||f.down)continue;
  if(m.team===winTeam&&survivors.has(m.id)){const floor=Math.max(40,(+left[m.id]||0)*f.maxHealth);if(f.health<floor)f.health=floor;}   // выживший победитель не падает
  else if(m.team!==winTeam){const d=(m.prev??f.health)-f.health;if(d>0)f.health=Math.max(1,f.health-d*1.5);   // проигравшие получают в 2,5 раза больше
   if(combat.time>6)f.health=Math.max(1,f.health-(6+3*(combat.time-6))/60);   // после 6 с — выдыхаются, всё быстрее (драка ≈ 12–18 с)
   // На последнем издыхании и никто не добил — падает сам (как тестовая кнопка «падение» арены).
   if(f.health<=1&&!f.knockdown&&!f.launch){m.low=m.low??combat.time;if(combat.time-m.low>1.2){const by=combat.fighters.find(o=>o.team!==f.team&&!o.down);
     f.health=0;f.down=true;f.state='fall';f.attack=null;f.fall={clip:'fallBack',time:0,velocity:new T.Vector3()};combat.emit('knockouts',f,{attacker:by?.id,zone:'body'});}}else m.low=null;}
  m.prev=f.health;}
}
let endAt=null;

try{
 const loader=new GLTFLoader();const kinds=[...new Set([...lineup[0],...lineup[1]].map(f=>f.kind|0))];
 const loaded=await Promise.all(kinds.map(k=>loader.loadAsync(modelUrl(k))));
 const templates=new Map(kinds.map((k,i)=>{const root=prepareMeshyRig(loaded[i].scene);prepareGroundSupport(root);return [k,root];}));
 const models=[],order=[];
 for(let slot=0;slot<Math.max(lineup[0].length,lineup[1].length);slot++)for(let team=0;team<2;team++){const f=lineup[team][slot];if(!f)continue;
  const root=clone(templates.get(f.kind|0));root.userData.kind=f.kind|0;root.userData.team=team;models.push(root);order.push({id:String(f.id),team});}
 const specialProfiles=installSpecialMotions(motions,specialClips,specialManifest);
 combat=new Combat(scene,models,motions,onEvent);combat.specialProfiles=specialProfiles;props.attach(combat);combat.reset();
 combat.flightCollisions=!!profile.battle.flightCollisions;combat.setIntensity?.(Number(profile.battle.intensity)/100);
 combat.fighters.forEach((f,i)=>byFighter.set(f.id,Object.assign({},order[i])));
 for(const f of combat.fighters){looks.push(applyInkToon(f.root,settings));
  const ring=new T.Mesh(new T.RingGeometry(.34,.385,48),new T.MeshBasicMaterial({color:f.team?0xc69937:0x326e8c,transparent:true,opacity:.9,depthWrite:false,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.007;scene.add(ring);markers.push(ring);
  const badge=document.createElement('div');badge.className='badge';$('#badges').append(badge);labels.push(badge);   // невидимая опора для всплывающих надписей
  badge.anchorHeight=f.rig.bones.Head.getWorldPosition(new T.Vector3()).y-f.root.position.y+.62;}
 hatFX=new FallingHatFX(scene,combat.fighters,settings);pipeFX=new GiantPipeFX(scene,combat.fighters,settings);pipeRound=combat.round;
 window.gangFight={combat,byFighter,advance(sec){for(let i=0;i<sec*60;i++){combat.update(1/60);direct();cardTick(1/60);}render();return combat.fighters.map(f=>({team:f.team,hp:Math.round(f.health),down:f.down}));}};   // для проверок
 $('#loading').classList.add('hidden');resize();post({ready:true});
}catch(e){$('#loading').textContent='Драку не показать: '+e.message;console.error(e);setTimeout(()=>finish(true),1500);}

function render(){if(!combat)return;
 for(const f of combat.fighters)updateChinatownRig(f,combat.time);
 const samples=combat.fighters.filter(f=>f.root.visible).map(f=>{const b=f.root.position.clone().applyMatrix4(framingView),t=f.root.position.clone().add(new T.Vector3(0,f.kind===6?2.7:2.15,0)).applyMatrix4(framingView);return {id:f.id,x:b.x,bottom:b.y,top:t.y,down:f.down,standing:isStandingForCamera(f)};});
 const fr=cover(framing.update(samples,{dt:document.hidden?0:renderDt,width:W,height:H,maxZoom:profile.visual.zoom,mode:profile.visual.cameraMode,reduced:reduced.matches,key:String(combat.round)}));
 camera.position.copy(cameraHome).addScaledVector(screenRight,fr.x).addScaledVector(screenUp,fr.y);camera.updateMatrixWorld(true);
 if(framingZoom!==fr.zoom){framingZoom=fr.zoom;resize();}
 const stable=camera.position.clone(),jolt=cameraImpulse.sample(performance.now()/1000,document.hidden||reduced.matches||!effects.enabled);
 camera.position.add(new T.Vector3(1,0,0).applyQuaternion(camera.quaternion).multiplyScalar(jolt.x*(camera.right-camera.left)/Math.max(1,W))).add(new T.Vector3(0,1,0).applyQuaternion(camera.quaternion).multiplyScalar(jolt.y*(camera.top-camera.bottom)/Math.max(1,H)));camera.updateMatrixWorld(true);
 const bars=[];
 for(const f of combat.fighters){const p=f.root.position;markers[f.id].position.set(p.x,.007,p.z);markers[f.id].visible=!f.down;
  const label=labels[f.id],anchor=f.down||f.knockdown?f.rig.bones.Head.getWorldPosition(new T.Vector3()).add(new T.Vector3(0,.62,0)):p.clone().add(new T.Vector3(0,label.anchorHeight,0)),hp=anchor.project(camera);
  bars.push({id:f.id,label,visible:!f.down,x:Math.max(18,Math.min(W-18,(hp.x*.5+.5)*W)),y:Math.max(8,Math.min(H-8,(-hp.y*.5+.5)*H))});}
 combatNotices.update(renderDt,bars,combat.time,reduced.matches,point=>{const p=new T.Vector3().fromArray(point).project(camera);return {x:(p.x*.5+.5)*W,y:(-p.y*.5+.5)*H};});
 courtyardProp.update(renderDt);effects.update(renderDt,camera,combat.fighters);
 for(const l of looks)l.update(time,camera,W*renderer.getPixelRatio(),H*renderer.getPixelRatio());
 hatFX?.update(renderDt,camera,W*renderer.getPixelRatio(),H*renderer.getPixelRatio());
 if(pipeFX){if(pipeRound!==combat.round){pipeFX.clear();hatFX?.clear();pipeRound=combat.round;}pipeFX.update(renderDt,camera,W*renderer.getPixelRatio(),H*renderer.getPixelRatio(),effects.enabled);}
 cardTick(renderDt);
 const alive=[0,1].map(t=>combat.fighters.filter(f=>f.team===t&&!f.down).length);
 if(alive.includes(0)&&endAt==null){endAt=combat.time;const v=$('#verdict');v.hidden=false;v.textContent=alive[0]?'Наезд удался!':'Отбились!';}
 if(endAt!=null&&combat.time-endAt>3.2)finish(false);   // победная поза и переворот карточки — и к итогам
 try{renderer.render(scene,camera);}finally{camera.position.copy(stable);camera.updateMatrixWorld(true);}
}
function frame(now){requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000);last=now;renderDt=dt;
 if(hitStop>0){hitStop=Math.max(0,hitStop-dt);render();return;}
 if(combat&&!document.hidden&&!finished){acc+=dt*(profile.battle.speed||1);let n=0;while(acc>=1/60&&n++<6){combat.update(1/60);direct();time+=1/60;acc-=1/60;if(hitStop>0){acc=0;break;}}}
 render();}
requestAnimationFrame(frame);
}
