import * as T from 'three';
// Fixed painted grain: no animated noise, and the same texture works in tests.
function woodTexture(seed){const w=64,h=128,data=new Uint8Array(w*h*4);for(let y=0;y<h;y++)for(let x=0;x<w;x++){
 const wave=x+1.2*Math.sin(y*.035+seed),grain=Math.abs(Math.sin(wave*.13+seed)),scratch=grain<.035?-16:grain>.995?5:0;
 const knot=Math.abs(Math.hypot((x-23-seed*4)*1.1,(y-52-seed*11)*.35)-7)<.5?-12:0;
 const tone=scratch+knot+2*Math.sin(x*.12+y*.09+seed);const i=(y*w+x)*4;data[i]=188+tone;data[i+1]=151+tone;data[i+2]=99+tone;data[i+3]=255;
 }const map=new T.DataTexture(data,w,h);map.colorSpace=T.SRGBColorSpace;map.needsUpdate=true;map.magFilter=T.LinearFilter;return map;}

export function paintedMaterial(map,color=0xffffff){
const material=new T.MeshBasicMaterial({map,color});
 // Painted, world-locked key: upper-left light matches the plate; tumbling boards retain face shading.
 material.onBeforeCompile=shader=>{
  shader.vertexShader='varying vec3 vPaintNormal;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvPaintNormal=normalize(mat3(modelMatrix)*normal);');
  shader.fragmentShader='varying vec3 vPaintNormal;\n'+shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb *= 0.55 + 0.45 * max(0.0,dot(normalize(vPaintNormal),normalize(vec3(-3.0,8.0,5.0))));');
 };material.customProgramCacheKey=()=> 'painted-crate-v1';return material;
}
export function woodMaterials(){return [0,1,2].map(i=>paintedMaterial(woodTexture(i)));}
export function metalMaterial(){return paintedMaterial(null,0xb0a58b);}
