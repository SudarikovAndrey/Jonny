/* A small texture rig: move the original drawing, pin the table and resting hand.
   Nothing is cut out or duplicated. Closed eyelids come from a registered raster cel. */
(()=>{'use strict';
const table=document.getElementById('table'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let enabled=()=>true,canvas,gl,program,texture,blinkTexture,timer=0,disposed=false,ready=false;
let reaction=null,nextBlink=performance.now()+1900,blinkAt=-10000,lastBet=-10000;
// time, head y, head x, angle, shoulders, left lid, right lid, presenting hand.
const poses={
 bet:[[0,0,0,0,0,0,0,0],[.1,-1,0,-.004,-.5,0,0,0],[.32,6,1,.012,1,0,0,-3],[.55,-2,0,-.006,-1,0,0,1],[.85,0,0,0,0,0,0,0]],
 watch:[[0,0,0,0,0,0,0,0],[.13,-2,0,-.006,-1,0,0,0],[.45,7,2,.018,1.5,0,0,0],[1.25,7,2,.018,1.5,0,0,0],[1.7,0,0,0,0,0,0,0]],
 throw:[[0,0,0,0,0,0,0,0],[.12,-3,-2,-.012,-2,0,0,2],[.34,5,3,.018,3,0,0,-8],[.57,-2,0,-.005,-1,0,0,2],[.9,0,0,0,0,0,0,0]],
 win:[[0,0,0,0,0,0,0,0],[.12,3,0,.007,1,0,0,1],[.32,-8,-3,-.023,-3,0,0,-5],[.5,-5,-2,-.015,-1,0,1,-3],[.7,2,1,.008,1,0,0,1],[.94,-4,0,-.009,-1,0,0,-2],[1.3,0,0,0,0,0,0,0]],
 lose:[[0,0,0,0,0,0,0,0],[.2,2,2,.012,1,0,0,0],[.45,5,4,.028,2,1,1,0],[.65,5,4,.028,2,0,0,0],[1.1,1,-1,-.006,0,0,0,0],[1.45,0,0,0,0,0,0,0]],
 push:[[0,0,0,0,0,0,0,0],[.15,-3,0,0,-3,0,0,-3],[.4,-3,1,.012,-3,0,0,-3],[.8,1,0,-.004,1,0,0,0],[1.05,0,0,0,0,0,0,0]]
};
function react(name){if(disposed||reduced.matches||!enabled())return;const now=performance.now();if(name==='bet'&&now-lastBet<650)return;if(name==='bet')lastBet=now;if(!poses[name])return;reaction={name,start:now};table.dataset.croupier=name;}
function pose(now){if(!reaction)return Array(7).fill(0);const keys=poses[reaction.name],t=(now-reaction.start)/1000;if(t>=keys.at(-1)[0]){reaction=null;table.dataset.croupier='idle';return Array(7).fill(0);}let i=1;while(keys[i][0]<t)i++;const a=keys[i-1],b=keys[i],u=(t-a[0])/(b[0]-a[0]),k=u*u*(3-2*u);return a.slice(1).map((v,j)=>v+(b[j+1]-v)*k);}
const vertex=`attribute vec2 position;varying vec2 v;void main(){v=vec2((position.x+1.)*.5,(1.-position.y)*.5);gl_Position=vec4(position,0.,1.);}`;
const fragment=`precision highp float;
varying vec2 v;uniform sampler2D art;uniform sampler2D closedEyes;uniform vec4 head;uniform vec4 motion;
float region(vec2 p,vec2 center,vec2 size){return 1.-smoothstep(.73,1.,length((p-center)/size));}
vec4 sampleArt(vec2 p){return texture2D(art,p/vec2(941.,1672.));}
void main(){
 vec2 p=v*vec2(941.,710.);
 // Broad head weight includes the ink silhouette; the soft perimeter stays in dark scenery.
 float h=region(p,vec2(429.,263.),vec2(155.,170.));
 float shoulders=region(p,vec2(466.,456.),vec2(256.,168.))*(1.-smoothstep(545.,599.,p.y));
 p.y-=motion.x*shoulders;
 vec2 d=p-vec2(457.,389.);float c=cos(head.z),s=sin(head.z);
 vec2 rotated=vec2(c*d.x+s*d.y,-s*d.x+c*d.y)+vec2(457.,389.);
 p=mix(p,rotated-head.xy,h);
 // Only the offered palm moves; the hand resting on the rail remains pinned.
 p.y-=motion.w*region(p,vec2(258.,591.),vec2(76.,100.));
 vec4 color=sampleArt(p);
 float left=region(p,vec2(429.,277.),vec2(40.,47.))*step(.55,motion.y);
 float right=region(p,vec2(492.,260.),vec2(32.,43.))*step(.55,motion.z);
 color=mix(color,texture2D(closedEyes,p/vec2(941.,1672.)),max(left,right));
 gl_FragColor=color;
}`;
function compile(kind,source){const shader=gl.createShader(kind);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader));return shader;}
function upload(img,unit){const t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,t);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);return t;}
function image(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src;});}
function schedule(){clearTimeout(timer);if(!disposed&&!document.hidden&&ready)timer=setTimeout(tick,1000/12);}
function tick(){if(disposed||document.hidden||!ready)return;const active=!reduced.matches&&enabled();canvas.hidden=!active;if(!active){reaction=null;table.dataset.croupier='still';timer=setTimeout(tick,800);return;}
 const now=performance.now(),t=Math.floor(now/83.333)/12,r=pose(now);
 if(now>=nextBlink){blinkAt=now;nextBlink=now+3500+Math.random()*3800;}
 const bt=now-blinkAt,blink=bt<85?bt/85:bt<155?1:bt<250?1-(bt-155)/95:0;
 const breath=Math.sin(t*1.55),angle=Math.sin(t*.65)*.004;
 gl.uniform4f(gl.getUniformLocation(program,'head'),r[1]+Math.sin(t*.65)*1.2,r[0]+breath*2.2,r[2]+angle,0);
 gl.uniform4f(gl.getUniformLocation(program,'motion'),breath*1.6+r[3],Math.max(blink,r[4]),Math.max(blink,r[5]),r[6]);
 gl.drawArrays(gl.TRIANGLES,0,6);schedule();
}
async function init(){try{
 const [art,eyes]=await Promise.all([image('assets/table.webp'),image('assets/croupier-blink.webp')]);if(disposed)return;
 canvas=document.createElement('canvas');canvas.id='croupier-canvas';canvas.width=941;canvas.height=710;canvas.setAttribute('aria-hidden','true');
 gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power'});if(!gl)return;
 program=gl.createProgram();const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment);gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);
 const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
 texture=upload(art,0);blinkTexture=upload(eyes,1);gl.uniform1i(gl.getUniformLocation(program,'art'),0);gl.uniform1i(gl.getUniformLocation(program,'closedEyes'),1);gl.viewport(0,0,941,710);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;clearTimeout(timer);canvas.hidden=true;});
 canvas.addEventListener('webglcontextrestored',()=>{canvas.remove();init();});
 table.prepend(canvas);table.dataset.croupier='idle';ready=true;tick();
 }catch(error){canvas?.remove();console.warn('Croupier animation unavailable; original art retained.',error);}}
function visibility(){clearTimeout(timer);if(!document.hidden){reaction=null;nextBlink=performance.now()+1500;blinkAt=-10000;schedule();}}
document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',()=>{clearTimeout(timer);tick();});
window.Dice21Croupier={configure(fn){enabled=fn;},react,dispose(){disposed=true;clearTimeout(timer);document.removeEventListener('visibilitychange',visibility);gl?.deleteTexture(texture);gl?.deleteTexture(blinkTexture);gl?.deleteProgram(program);canvas?.remove();}};
addEventListener('pagehide',()=>{clearTimeout(timer);});addEventListener('pageshow',visibility);
init();
})();
