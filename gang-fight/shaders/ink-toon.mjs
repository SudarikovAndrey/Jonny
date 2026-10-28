import * as THREE from '../viewer/vendor/three.module.js';
const vertex=`
#include <common>
#include <skinning_pars_vertex>
varying vec2 vUvInk; varying vec3 vNInk; varying vec3 vPInk; varying float vCleanMask; uniform vec2 cleanHeight;
void main(){vUvInk=uv;vCleanMask=1.-smoothstep(.70,.88,(position.y-cleanHeight.x)/max(.0001,cleanHeight.y-cleanHeight.x));
#include <beginnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <begin_vertex>
#include <skinning_vertex>
vNInk=normalize(normalMatrix*objectNormal);vec4 mv=modelViewMatrix*vec4(transformed,1.0);vPInk=mv.xyz;gl_Position=projectionMatrix*mv;}`;
const fragment=`
uniform sampler2D map;uniform float cleanArt;uniform vec3 lightDirection;uniform float contrast;uniform float rim;uniform float orthoView;uniform float time;
varying vec2 vUvInk;varying vec3 vNInk;varying vec3 vPInk;varying float vCleanMask;
void orderInk(inout vec3 a,inout vec3 b){if(dot(a,vec3(.2126,.7152,.0722))>dot(b,vec3(.2126,.7152,.0722))){vec3 t=a;a=b;b=t;}}
void main(){vec4 tex=texture2D(map,vUvInk);vec3 base=tex.rgb;if(cleanArt>0.){vec2 d=vec2(1./768.,0.);vec3 a=base,b=texture2D(map,vUvInk+d).rgb,c=texture2D(map,vUvInk-d).rgb,e=texture2D(map,vUvInk+d.yx).rgb,f=texture2D(map,vUvInk-d.yx).rgb;
orderInk(a,b);orderInk(e,f);orderInk(a,c);orderInk(b,c);orderInk(a,e);orderInk(c,e);orderInk(b,f);orderInk(b,c);orderInk(e,f);orderInk(c,e);
base=mix(base,c,.8*cleanArt*vCleanMask);}vec3 n=normalize(vNInk);float nl=dot(n,normalize(lightDirection));
float lit=smoothstep(.10,.32,nl);float high=smoothstep(.66,.82,nl);
vec3 shade=mix(vec3(.66,.69,.74),vec3(1.02,1.00,.96),lit);shade=mix(shade,vec3(1.06,1.04,1.00),high*.68);
// Orthographic silhouettes have a constant view direction across the screen.
vec3 viewDirection=normalize(mix(normalize(-vPInk),vec3(0.,0.,1.),orthoView));
float edge=1.0-max(0.,dot(n,viewDirection));
float band=smoothstep(.48,.68,edge);
float luminance=dot(base,vec3(.2126,.7152,.0722));
// Add reflected light instead of multiplying almost-black cloth by a tiny value.
// Keep the deepest painted ink dark, but let navy/brown fabric catch the rim.
float inkMask=smoothstep(.003,.035,luminance);
float bounce=band*(.50+.50*(1.-lit))*clamp(rim*.5,0.,1.)*inkMask;
vec3 col=base*mix(vec3(1.),shade,contrast);
vec3 reflected=max(col,vec3(.38,.52,.59));
col=mix(col,reflected,bounce*.85);
gl_FragColor=vec4(col,tex.a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
const outlineVertex=`
#include <common>
#include <skinning_pars_vertex>
uniform float width;uniform float time;uniform float boil;uniform vec2 resolution;
void main(){
#include <beginnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <begin_vertex>
#include <skinning_vertex>
vec4 mv=modelViewMatrix*vec4(transformed,1.);vec4 clip=projectionMatrix*mv;
vec3 vn=normalize(normalMatrix*objectNormal);vec2 nd=normalize((projectionMatrix*vec4(vn,0.)).xy+vec2(.0001));
float rhythm=.72+.21*sin(position.y*.24+position.x*.19)+.12*sin(position.z*.71-position.x*.33);
float tick=floor(time*12.);float breath=0.; // Silhouette thickness must stay stable across time.
clip.xy+=nd*(width*max(.3,rhythm+breath))*2./resolution*clip.w;gl_Position=clip;}`;
export function applyInkToon(root,settings){const mats=[],outlines=[];const bodies=[];root.traverse(o=>{if(o.isMesh)bodies.push(o)});
 for(const o of bodies){const src=Array.isArray(o.material)?o.material[0]:o.material;
 o.geometry.computeBoundingBox();const bounds=o.geometry.boundingBox;const clean=[4,5,6].includes(root.userData.kind)&&o.name!=='giant_boxer_pipe'&&root.userData.cleanArt!==false?1:0;
 const mat=new THREE.ShaderMaterial({uniforms:{cleanArt:{value:clean},cleanHeight:{value:new THREE.Vector2(bounds.min.y,bounds.max.y)},map:{value:src.map},lightDirection:{value:new THREE.Vector3(-.5,.8,.7)},contrast:{value:settings.contrast},rim:{value:settings.rim},orthoView:{value:0},time:{value:0}},vertexShader:vertex,fragmentShader:fragment});o.material=mat;mats.push(mat);
 const outmat=new THREE.ShaderMaterial({uniforms:{width:{value:settings.width},time:{value:0},boil:{value:settings.boil},resolution:{value:new THREE.Vector2(1000,1000)}},vertexShader:outlineVertex,fragmentShader:'void main(){gl_FragColor=vec4(.017,.014,.009,1.);}',side:THREE.BackSide,depthWrite:false});
 const ol=o.isSkinnedMesh?new THREE.SkinnedMesh(o.geometry,outmat):new THREE.Mesh(o.geometry,outmat);ol.name='ink_outline';ol.position.copy(o.position);ol.quaternion.copy(o.quaternion);ol.scale.copy(o.scale);ol.frustumCulled=false;
 if(o.isSkinnedMesh){ol.bindMode=o.bindMode;ol.bind(o.skeleton,o.bindMatrix);ol.bindMatrixInverse.copy(o.bindMatrixInverse)}o.parent.add(ol);outlines.push(ol);
 }
 return {mats,outlines,update(time,camera,w,h){const light=(settings.lightDirection?.clone()||new THREE.Vector3(-.6,.9,.7)).transformDirection(camera.matrixWorldInverse);for(const m of mats){m.uniforms.lightDirection.value.copy(light);m.uniforms.contrast.value=settings.contrast;m.uniforms.rim.value=settings.rim;m.uniforms.orthoView.value=camera.isOrthographicCamera?1:0}for(const o of outlines){o.visible=settings.width>0;o.material.uniforms.width.value=settings.width;o.material.uniforms.time.value=time;o.material.uniforms.boil.value=settings.boil;o.material.uniforms.resolution.value.set(w,h)}}};
}
