var U_=0,zf=1,O_=2;var Ko=1,B_=2,ha=3,zr=0,Ri=1,Ge=2,ar=0,ua=1,Qo=2,kf=3,Hf=4,z_=5;var ls=100,k_=101,H_=102,V_=103,G_=104,W_=200,X_=201,q_=202,Y_=203,Vf=204,Gf=205,J_=206,j_=207,Z_=208,$_=209,K_=210,Q_=211,tg=212,eg=213,ig=214,Wc=0,Xc=1,qc=2,Zs=3,Yc=4,Jc=5,jc=6,Zc=7,Wf=0,ng=1,rg=2,Ln=0,Xf=1,qf=2,Yf=3,Jf=4,jf=5,Zf=6,$f=7;var Kf=300,kr=301,cs=302,Ah=303,Ch=304,tl=306,$s=1e3,un=1001,$c=1002,Ve=1003,sg=1004;var el=1005;var ai=1006,Ph=1007;var or=1008;var rn=1009,Qf=1010,tp=1011,da=1012,Ih=1013,sn=1014,mn=1015,Nn=1016,Lh=1017,Nh=1018,fa=1020,ep=35902,ip=35899,np=1021,rp=1022,_n=1023,Qn=1026,Hr=1027,Dh=1028,Fh=1029,Vr=1030,Uh=1031;var Oh=1033,il=33776,nl=33777,rl=33778,sl=33779,Bh=35840,zh=35841,kh=35842,Hh=35843,Vh=36196,Gh=37492,Wh=37496,Xh=37488,qh=37489,al=37490,Yh=37491,Jh=37808,jh=37809,Zh=37810,$h=37811,Kh=37812,Qh=37813,tu=37814,eu=37815,iu=37816,nu=37817,ru=37818,su=37819,au=37820,ou=37821,lu=36492,cu=36494,hu=36495,uu=36283,du=36284,ol=36285,fu=36286;var So=2300,Kc=2301,Vc=2302,Cf=2303,Pf=2400,If=2401,Lf=2402;var ag=3200;var sp=0,og=1,Ke="",Wi="srgb",rs="srgb-linear",Mo="linear",be="srgb";var Gc=7680;var lg=519,cg=512,hg=513,ug=514,pu=515,dg=516,fg=517,mu=518,pg=519,ap=35044;var op="300 es",An=2e3,Eo=2001;function Dy(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Fy(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function To(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function mg(){let n=To("canvas");return n.style.display="block",n}var Qm={},Ks=null;function Ro(...n){let t="THREE."+n.shift();Ks?Ks("log",t,...n):console.log(t,...n)}function _g(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Vt(...n){n=_g(n);let t="THREE."+n.shift();if(Ks)Ks("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Xt(...n){n=_g(n);let t="THREE."+n.shift();if(Ks)Ks("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function ns(...n){let t=n.join(" ");t in Qm||(Qm[t]=!0,Vt(...n))}function gg(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}var wg={[Wc]:Xc,[qc]:jc,[Yc]:Zc,[Zs]:Jc,[Xc]:Wc,[jc]:qc,[Zc]:Yc,[Jc]:Zs},tr=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let r=i[t];if(r!==void 0){let s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}},Ni=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],t_=1234567,Ys=Math.PI/180,Qs=180/Math.PI;function Kn(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ni[n&255]+Ni[n>>8&255]+Ni[n>>16&255]+Ni[n>>24&255]+"-"+Ni[t&255]+Ni[t>>8&255]+"-"+Ni[t>>16&15|64]+Ni[t>>24&255]+"-"+Ni[e&63|128]+Ni[e>>8&255]+"-"+Ni[e>>16&255]+Ni[e>>24&255]+Ni[i&255]+Ni[i>>8&255]+Ni[i>>16&255]+Ni[i>>24&255]).toLowerCase()}function re(n,t,e){return Math.max(t,Math.min(e,n))}function lp(n,t){return(n%t+t)%t}function Uy(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function Oy(n,t,e){return n!==t?(e-n)/(t-n):0}function vo(n,t,e){return(1-e)*n+e*t}function By(n,t,e,i){return vo(n,t,1-Math.exp(-e*i))}function zy(n,t=1){return t-Math.abs(lp(n,t*2)-t)}function ky(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Hy(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Vy(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Gy(n,t){return n+Math.random()*(t-n)}function Wy(n){return n*(.5-Math.random())}function Xy(n){n!==void 0&&(t_=n);let t=t_+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function qy(n){return n*Ys}function Yy(n){return n*Qs}function Jy(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function jy(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Zy(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function $y(n,t,e,i,r){let s=Math.cos,a=Math.sin,o=s(e/2),l=a(e/2),c=s((t+i)/2),h=a((t+i)/2),d=s((t-i)/2),u=a((t-i)/2),f=s((i-t)/2),m=a((i-t)/2);switch(r){case"XYX":n.set(o*h,l*d,l*u,o*c);break;case"YZY":n.set(l*u,o*h,l*d,o*c);break;case"ZXZ":n.set(l*d,l*u,o*h,o*c);break;case"XZX":n.set(o*h,l*m,l*f,o*c);break;case"YXY":n.set(l*f,o*h,l*m,o*c);break;case"ZYZ":n.set(l*m,l*f,o*h,o*c);break;default:Vt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Rn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Re(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var cp={DEG2RAD:Ys,RAD2DEG:Qs,generateUUID:Kn,clamp:re,euclideanModulo:lp,mapLinear:Uy,inverseLerp:Oy,lerp:vo,damp:By,pingpong:zy,smoothstep:ky,smootherstep:Hy,randInt:Vy,randFloat:Gy,randFloatSpread:Wy,seededRandom:Xy,degToRad:qy,radToDeg:Yy,isPowerOfTwo:Jy,ceilPowerOfTwo:jy,floorPowerOfTwo:Zy,setQuaternionFromProperEuler:$y,normalize:Re,denormalize:Rn},mp=class mp{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(re(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*r+t.x,this.y=s*r+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};mp.prototype.isVector2=!0;var ct=mp,Se=class{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,a,o){let l=i[r+0],c=i[r+1],h=i[r+2],d=i[r+3],u=s[a+0],f=s[a+1],m=s[a+2],w=s[a+3];if(d!==w||l!==u||c!==f||h!==m){let g=l*u+c*f+h*m+d*w;g<0&&(u=-u,f=-f,m=-m,w=-w,g=-g);let _=1-o;if(g<.9995){let b=Math.acos(g),T=Math.sin(b);_=Math.sin(_*b)/T,o=Math.sin(o*b)/T,l=l*_+u*o,c=c*_+f*o,h=h*_+m*o,d=d*_+w*o}else{l=l*_+u*o,c=c*_+f*o,h=h*_+m*o,d=d*_+w*o;let b=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=b,c*=b,h*=b,d*=b}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,r,s,a){let o=i[r],l=i[r+1],c=i[r+2],h=i[r+3],d=s[a],u=s[a+1],f=s[a+2],m=s[a+3];return t[e]=o*m+h*d+l*f-c*u,t[e+1]=l*m+h*u+c*d-o*f,t[e+2]=c*m+h*f+o*u-l*d,t[e+3]=h*m-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(r/2),d=o(s/2),u=l(i/2),f=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:Vt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(re(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-i*c,this._z=s*h+a*c+i*l-r*o,this._w=a*h-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,r=t._y,s=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+r*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+r*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},_p=class _p{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(e_.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(e_.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*i),h=2*(o*e-s*r),d=2*(s*i-a*e);return this.x=e+l*c+a*d-o*h,this.y=i+l*h+o*c-s*d,this.z=r+l*d+s*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return nf.copy(this).projectOnVector(t),this.sub(nf)}reflect(t){return this.sub(nf.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(re(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};_p.prototype.isVector3=!0;var A=_p,nf=new A,e_=new Se,gp=class gp{constructor(t,e,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,l,c)}set(t,e,i,r,s,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=r,h[2]=o,h[3]=e,h[4]=s,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],m=i[8],w=r[0],g=r[3],_=r[6],b=r[1],T=r[4],v=r[7],E=r[2],R=r[5],I=r[8];return s[0]=a*w+o*b+l*E,s[3]=a*g+o*T+l*R,s[6]=a*_+o*v+l*I,s[1]=c*w+h*b+d*E,s[4]=c*g+h*T+d*R,s[7]=c*_+h*v+d*I,s[2]=u*w+f*b+m*E,s[5]=u*g+f*T+m*R,s[8]=u*_+f*v+m*I,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*s*h+i*o*l+r*s*c-r*a*l}invert(){let t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*s,f=c*s-a*l,m=e*d+i*u+r*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let w=1/m;return t[0]=d*w,t[1]=(r*c-h*i)*w,t[2]=(o*i-r*a)*w,t[3]=u*w,t[4]=(h*e-r*l)*w,t[5]=(r*s-o*e)*w,t[6]=f*w,t[7]=(i*l-c*e)*w,t[8]=(a*e-i*s)*w,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return ns("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(rf.makeScale(t,e)),this}rotate(t){return ns("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(rf.makeRotation(-t)),this}translate(t,e){return ns("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(rf.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};gp.prototype.isMatrix3=!0;var Yt=gp,rf=new Yt,i_=new Yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),n_=new Yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ky(){let n={enabled:!0,workingColorSpace:rs,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===be&&(r.r=vr(r.r),r.g=vr(r.g),r.b=vr(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===be&&(r.r=Js(r.r),r.g=Js(r.g),r.b=Js(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ke?Mo:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ns("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ns("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[rs]:{primaries:t,whitePoint:i,transfer:Mo,toXYZ:i_,fromXYZ:n_,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Wi},outputColorSpaceConfig:{drawingBufferColorSpace:Wi}},[Wi]:{primaries:t,whitePoint:i,transfer:be,toXYZ:i_,fromXYZ:n_,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Wi}}}),n}var ne=Ky();function vr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Js(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Cs,Qc=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Cs===void 0&&(Cs=To("canvas")),Cs.width=t.width,Cs.height=t.height;let r=Cs.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=Cs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=To("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=vr(s[a]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(vr(e[i]/255)*255):e[i]=vr(e[i]);return{data:e,width:t.width,height:t.height}}else return Vt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Qy=0,ta=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Qy++}),this.uuid=Kn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(sf(r[a].image)):s.push(sf(r[a]))}else s=sf(r);i.url=s}return e||(t.images[this.uuid]=i),i}};function sf(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Qc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Vt("Texture: Unable to serialize Texture."),{})}var tv=0,af=new A,Ei=class n extends tr{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=un,r=un,s=ai,a=or,o=_n,l=rn,c=n.DEFAULT_ANISOTROPY,h=Ke){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tv++}),this.uuid=Kn(),this.name="",this.source=new ta(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(af).x}get height(){return this.source.getSize(af).y}get depth(){return this.source.getSize(af).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Vt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){Vt(`Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $s:t.x=t.x-Math.floor(t.x);break;case un:t.x=t.x<0?0:1;break;case $c:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $s:t.y=t.y-Math.floor(t.y);break;case un:t.y=t.y<0?0:1;break;case $c:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ei.DEFAULT_IMAGE=null;Ei.DEFAULT_MAPPING=Kf;Ei.DEFAULT_ANISOTROPY=1;var wp=class wp{constructor(t=0,e=0,i=0,r=1){this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*i+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],w=l[2],g=l[6],_=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-w)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+w)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(c+1)/2,v=(f+1)/2,E=(_+1)/2,R=(h+u)/4,I=(d+w)/4,x=(m+g)/4;return T>v&&T>E?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=R/i,s=I/i):v>E?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=R/r,s=x/r):E<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(E),i=I/s,r=x/s),this.set(i,r,s,e),this}let b=Math.sqrt((g-m)*(g-m)+(d-w)*(d-w)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(g-m)/b,this.y=(d-w)/b,this.z=(u-h)/b,this.w=Math.acos((c+f+_-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this.w=re(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this.w=re(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};wp.prototype.isVector4=!0;var Ie=wp,th=class extends tr{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ai,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e),this.textures=[];let r={width:t,height:e,depth:i.depth},s=new Ei(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:ai,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let r=Object.assign({},t.textures[e].image);this.textures[e].source=new ta(r)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Fi=class extends th{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Ao=class extends Ei{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var eh=class extends Ei{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Rh=class Rh{constructor(t,e,i,r,s,a,o,l,c,h,d,u,f,m,w,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,l,c,h,d,u,f,m,w,g)}set(t,e,i,r,s,a,o,l,c,h,d,u,f,m,w,g){let _=this.elements;return _[0]=t,_[4]=e,_[8]=i,_[12]=r,_[1]=s,_[5]=a,_[9]=o,_[13]=l,_[2]=c,_[6]=h,_[10]=d,_[14]=u,_[3]=f,_[7]=m,_[11]=w,_[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Rh().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,r=1/Ps.setFromMatrixColumn(t,0).length(),s=1/Ps.setFromMatrixColumn(t,1).length(),a=1/Ps.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,r=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){let u=a*h,f=a*d,m=o*h,w=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+m*c,e[5]=u-w*c,e[9]=-o*l,e[2]=w-u*c,e[6]=m+f*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,m=c*h,w=c*d;e[0]=u+w*o,e[4]=m*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-m,e[6]=w+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,m=c*h,w=c*d;e[0]=u-w*o,e[4]=-a*d,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*h,e[9]=w-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,f=a*d,m=o*h,w=o*d;e[0]=l*h,e[4]=m*c-f,e[8]=u*c+w,e[1]=l*d,e[5]=w*c+u,e[9]=f*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,f=a*c,m=o*l,w=o*c;e[0]=l*h,e[4]=w-u*d,e[8]=m*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+m,e[10]=u-w*d}else if(t.order==="XZY"){let u=a*l,f=a*c,m=o*l,w=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+w,e[5]=a*h,e[9]=f*d-m,e[2]=m*d-f,e[6]=o*h,e[10]=w*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ev,t,iv)}lookAt(t,e,i){let r=this.elements;return Qi.subVectors(t,e),Qi.lengthSq()===0&&(Qi.z=1),Qi.normalize(),Pr.crossVectors(i,Qi),Pr.lengthSq()===0&&(Math.abs(i.z)===1?Qi.x+=1e-4:Qi.z+=1e-4,Qi.normalize(),Pr.crossVectors(i,Qi)),Pr.normalize(),hc.crossVectors(Qi,Pr),r[0]=Pr.x,r[4]=hc.x,r[8]=Qi.x,r[1]=Pr.y,r[5]=hc.y,r[9]=Qi.y,r[2]=Pr.z,r[6]=hc.z,r[10]=Qi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],m=i[2],w=i[6],g=i[10],_=i[14],b=i[3],T=i[7],v=i[11],E=i[15],R=r[0],I=r[4],x=r[8],S=r[12],L=r[1],U=r[5],z=r[9],W=r[13],N=r[2],H=r[6],j=r[10],Z=r[14],ot=r[3],K=r[7],rt=r[11],at=r[15];return s[0]=a*R+o*L+l*N+c*ot,s[4]=a*I+o*U+l*H+c*K,s[8]=a*x+o*z+l*j+c*rt,s[12]=a*S+o*W+l*Z+c*at,s[1]=h*R+d*L+u*N+f*ot,s[5]=h*I+d*U+u*H+f*K,s[9]=h*x+d*z+u*j+f*rt,s[13]=h*S+d*W+u*Z+f*at,s[2]=m*R+w*L+g*N+_*ot,s[6]=m*I+w*U+g*H+_*K,s[10]=m*x+w*z+g*j+_*rt,s[14]=m*S+w*W+g*Z+_*at,s[3]=b*R+T*L+v*N+E*ot,s[7]=b*I+T*U+v*H+E*K,s[11]=b*x+T*z+v*j+E*rt,s[15]=b*S+T*W+v*Z+E*at,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],m=t[3],w=t[7],g=t[11],_=t[15],b=l*f-c*u,T=o*f-c*d,v=o*u-l*d,E=a*f-c*h,R=a*u-l*h,I=a*d-o*h;return e*(w*b-g*T+_*v)-i*(m*b-g*E+_*R)+r*(m*T-w*E+_*I)-s*(m*v-w*R+g*I)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],r=t[8],s=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(s*h-o*l)+r*(s*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],m=t[12],w=t[13],g=t[14],_=t[15],b=e*o-i*a,T=e*l-r*a,v=e*c-s*a,E=i*l-r*o,R=i*c-s*o,I=r*c-s*l,x=h*w-d*m,S=h*g-u*m,L=h*_-f*m,U=d*g-u*w,z=d*_-f*w,W=u*_-f*g,N=b*W-T*z+v*U+E*L-R*S+I*x;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/N;return t[0]=(o*W-l*z+c*U)*H,t[1]=(r*z-i*W-s*U)*H,t[2]=(w*I-g*R+_*E)*H,t[3]=(u*R-d*I-f*E)*H,t[4]=(l*L-a*W-c*S)*H,t[5]=(e*W-r*L+s*S)*H,t[6]=(g*v-m*I-_*T)*H,t[7]=(h*I-u*v+f*T)*H,t[8]=(a*z-o*L+c*x)*H,t[9]=(i*L-e*z-s*x)*H,t[10]=(m*R-w*v+_*b)*H,t[11]=(d*v-h*R-f*b)*H,t[12]=(o*S-a*U-l*x)*H,t[13]=(e*U-i*S+r*x)*H,t[14]=(w*T-m*E-g*b)*H,t[15]=(h*E-d*T+u*b)*H,this}scale(t){let e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),r=Math.sin(e),s=1-i,a=t.x,o=t.y,l=t.z,c=s*a,h=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+i,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,a){return this.set(1,i,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){let r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,h=a+a,d=o+o,u=s*c,f=s*h,m=s*d,w=a*h,g=a*d,_=o*d,b=l*c,T=l*h,v=l*d,E=i.x,R=i.y,I=i.z;return r[0]=(1-(w+_))*E,r[1]=(f+v)*E,r[2]=(m-T)*E,r[3]=0,r[4]=(f-v)*R,r[5]=(1-(u+_))*R,r[6]=(g+b)*R,r[7]=0,r[8]=(m+T)*I,r[9]=(g-b)*I,r[10]=(1-(u+w))*I,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){let r=this.elements;t.x=r[12],t.y=r[13],t.z=r[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),e.identity(),this;let a=Ps.set(r[0],r[1],r[2]).length(),o=Ps.set(r[4],r[5],r[6]).length(),l=Ps.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Sn.copy(this);let c=1/a,h=1/o,d=1/l;return Sn.elements[0]*=c,Sn.elements[1]*=c,Sn.elements[2]*=c,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=d,Sn.elements[9]*=d,Sn.elements[10]*=d,e.setFromRotationMatrix(Sn),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,r,s,a,o=An,l=!1){let c=this.elements,h=2*s/(e-t),d=2*s/(i-r),u=(e+t)/(e-t),f=(i+r)/(i-r),m,w;if(l)m=s/(a-s),w=a*s/(a-s);else if(o===An)m=-(a+s)/(a-s),w=-2*a*s/(a-s);else if(o===Eo)m=-a/(a-s),w=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=w,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,r,s,a,o=An,l=!1){let c=this.elements,h=2/(e-t),d=2/(i-r),u=-(e+t)/(e-t),f=-(i+r)/(i-r),m,w;if(l)m=1/(a-s),w=a/(a-s);else if(o===An)m=-2/(a-s),w=-(a+s)/(a-s);else if(o===Eo)m=-1/(a-s),w=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=w,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Rh.prototype.isMatrix4=!0;var he=Rh,Ps=new A,Sn=new he,ev=new A(0,0,0),iv=new A(1,1,1),Pr=new A,hc=new A,Qi=new A,r_=new he,s_=new Se,dn=class n{constructor(t=0,e=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],d=r[2],u=r[6],f=r[10];switch(e){case"XYZ":this._y=Math.asin(re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(re(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-re(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Vt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return r_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(r_,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return s_.setFromEuler(this),this.setFromQuaternion(s_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};dn.DEFAULT_ORDER="XYZ";var Co=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},nv=0,a_=new A,Is=new Se,mr=new he,uc=new A,lo=new A,rv=new A,sv=new Se,o_=new A(1,0,0),l_=new A(0,1,0),c_=new A(0,0,1),h_={type:"added"},av={type:"removed"},Ls={type:"childadded",child:null},of={type:"childremoved",child:null},Ti=class n extends tr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nv++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new A,e=new dn,i=new Se,r=new A(1,1,1);function s(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new he},normalMatrix:{value:new Yt}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Co,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Is.setFromAxisAngle(t,e),this.quaternion.multiply(Is),this}rotateOnWorldAxis(t,e){return Is.setFromAxisAngle(t,e),this.quaternion.premultiply(Is),this}rotateX(t){return this.rotateOnAxis(o_,t)}rotateY(t){return this.rotateOnAxis(l_,t)}rotateZ(t){return this.rotateOnAxis(c_,t)}translateOnAxis(t,e){return a_.copy(t).applyQuaternion(this.quaternion),this.position.add(a_.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(o_,t)}translateY(t){return this.translateOnAxis(l_,t)}translateZ(t){return this.translateOnAxis(c_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(mr.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?uc.copy(t):uc.set(t,e,i);let r=this.parent;this.updateWorldMatrix(!0,!1),lo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mr.lookAt(lo,uc,this.up):mr.lookAt(uc,lo,this.up),this.quaternion.setFromRotationMatrix(mr),r&&(mr.extractRotation(r.matrixWorld),Is.setFromRotationMatrix(mr),this.quaternion.premultiply(Is.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Xt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(h_),Ls.child=t,this.dispatchEvent(Ls),Ls.child=null):Xt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(av),of.child=t,this.dispatchEvent(of),of.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),mr.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),mr.multiply(t.parent.matrixWorld)),t.applyMatrix4(mr),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(h_),Ls.child=t,this.dispatchEvent(Ls),Ls.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lo,t,rv),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lo,sv,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,r=t.z,s=this.matrix.elements;s[12]+=e-s[0]*e-s[4]*i-s[8]*r,s[13]+=i-s[1]*e-s[5]*i-s[9]*r,s[14]+=r-s[2]*e-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=r,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let r=t.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ti.DEFAULT_UP=new A(0,1,0);Ti.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ti.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Pe=class extends Ti{constructor(){super(),this.isGroup=!0,this.type="Group"}},ov={type:"move"},ea=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let w of t.hand.values()){let g=e.getJointPose(w,i),_=this._getHandJoint(c,w);g!==null&&(_.matrix.fromArray(g.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=g.radius),_.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ov)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Pe;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},yg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ir={h:0,s:0,l:0},dc={h:0,s:0,l:0};function lf(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var qt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Wi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=ne.workingColorSpace){return this.r=t,this.g=e,this.b=i,ne.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=ne.workingColorSpace){if(t=lp(t,1),e=re(e,0,1),i=re(i,0,1),e===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+e):i+e-i*e,a=2*i-s;this.r=lf(a,s,t+1/3),this.g=lf(a,s,t),this.b=lf(a,s,t-1/3)}return ne.colorSpaceToWorking(this,r),this}setStyle(t,e=Wi){function i(s){s!==void 0&&parseFloat(s)<1&&Vt("Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Vt("Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);Vt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Wi){let i=yg[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Vt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vr(t.r),this.g=vr(t.g),this.b=vr(t.b),this}copyLinearToSRGB(t){return this.r=Js(t.r),this.g=Js(t.g),this.b=Js(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Wi){return ne.workingToColorSpace(Di.copy(this),t),Math.round(re(Di.r*255,0,255))*65536+Math.round(re(Di.g*255,0,255))*256+Math.round(re(Di.b*255,0,255))}getHexString(t=Wi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.workingToColorSpace(Di.copy(this),e);let i=Di.r,r=Di.g,s=Di.b,a=Math.max(i,r,s),o=Math.min(i,r,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ne.workingColorSpace){return ne.workingToColorSpace(Di.copy(this),e),t.r=Di.r,t.g=Di.g,t.b=Di.b,t}getStyle(t=Wi){ne.workingToColorSpace(Di.copy(this),t);let e=Di.r,i=Di.g,r=Di.b;return t!==Wi?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(Ir),this.setHSL(Ir.h+t,Ir.s+e,Ir.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ir),t.getHSL(dc);let i=vo(Ir.h,dc.h,e),r=vo(Ir.s,dc.s,e),s=vo(Ir.l,dc.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Di=new qt;qt.NAMES=yg;var ss=class extends Ti{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dn,this.environmentIntensity=1,this.environmentRotation=new dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Mn=new A,_r=new A,cf=new A,gr=new A,Ns=new A,Ds=new A,u_=new A,hf=new A,uf=new A,df=new A,ff=new Ie,pf=new Ie,mf=new Ie,$n=class n{constructor(t=new A,e=new A,i=new A){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),Mn.subVectors(t,e),r.cross(Mn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){Mn.subVectors(r,e),_r.subVectors(i,e),cf.subVectors(t,e);let a=Mn.dot(Mn),o=Mn.dot(_r),l=Mn.dot(cf),c=_r.dot(_r),h=_r.dot(cf),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,m=(a*h-o*l)*u;return s.set(1-f-m,m,f)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,gr)===null?!1:gr.x>=0&&gr.y>=0&&gr.x+gr.y<=1}static getInterpolation(t,e,i,r,s,a,o,l){return this.getBarycoord(t,e,i,r,gr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,gr.x),l.addScaledVector(a,gr.y),l.addScaledVector(o,gr.z),l)}static getInterpolatedAttribute(t,e,i,r,s,a){return ff.setScalar(0),pf.setScalar(0),mf.setScalar(0),ff.fromBufferAttribute(t,e),pf.fromBufferAttribute(t,i),mf.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(ff,s.x),a.addScaledVector(pf,s.y),a.addScaledVector(mf,s.z),a}static isFrontFacing(t,e,i,r){return Mn.subVectors(i,e),_r.subVectors(t,e),Mn.cross(_r).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Mn.subVectors(this.c,this.b),_r.subVectors(this.a,this.b),Mn.cross(_r).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return n.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,r=this.b,s=this.c,a,o;Ns.subVectors(r,i),Ds.subVectors(s,i),hf.subVectors(t,i);let l=Ns.dot(hf),c=Ds.dot(hf);if(l<=0&&c<=0)return e.copy(i);uf.subVectors(t,r);let h=Ns.dot(uf),d=Ds.dot(uf);if(h>=0&&d<=h)return e.copy(r);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(Ns,a);df.subVectors(t,s);let f=Ns.dot(df),m=Ds.dot(df);if(m>=0&&f<=m)return e.copy(s);let w=f*c-l*m;if(w<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(i).addScaledVector(Ds,o);let g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return u_.subVectors(s,r),o=(d-h)/(d-h+(f-m)),e.copy(r).addScaledVector(u_,o);let _=1/(g+w+u);return a=w*_,o=u*_,e.copy(i).addScaledVector(Ns,a).addScaledVector(Ds,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},er=class{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(En.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(En.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=En.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,En):En.fromBufferAttribute(s,a),En.applyMatrix4(t.matrixWorld),this.expandByPoint(En);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),fc.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),fc.copy(i.boundingBox)),fc.applyMatrix4(t.matrixWorld),this.union(fc)}let r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,En),En.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(co),pc.subVectors(this.max,co),Fs.subVectors(t.a,co),Us.subVectors(t.b,co),Os.subVectors(t.c,co),Lr.subVectors(Us,Fs),Nr.subVectors(Os,Us),Qr.subVectors(Fs,Os);let e=[0,-Lr.z,Lr.y,0,-Nr.z,Nr.y,0,-Qr.z,Qr.y,Lr.z,0,-Lr.x,Nr.z,0,-Nr.x,Qr.z,0,-Qr.x,-Lr.y,Lr.x,0,-Nr.y,Nr.x,0,-Qr.y,Qr.x,0];return!_f(e,Fs,Us,Os,pc)||(e=[1,0,0,0,1,0,0,0,1],!_f(e,Fs,Us,Os,pc))?!1:(mc.crossVectors(Lr,Nr),e=[mc.x,mc.y,mc.z],_f(e,Fs,Us,Os,pc))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,En).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(En).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wr),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},wr=[new A,new A,new A,new A,new A,new A,new A,new A],En=new A,fc=new er,Fs=new A,Us=new A,Os=new A,Lr=new A,Nr=new A,Qr=new A,co=new A,pc=new A,mc=new A,ts=new A;function _f(n,t,e,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){ts.fromArray(n,s);let o=r.x*Math.abs(ts.x)+r.y*Math.abs(ts.y)+r.z*Math.abs(ts.z),l=t.dot(ts),c=e.dot(ts),h=i.dot(ts);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var hi=new A,_c=new ct,lv=0,ui=class extends tr{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lv++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=ap,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)_c.fromBufferAttribute(this,e),_c.applyMatrix3(t),this.setXY(e,_c.x,_c.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)hi.fromBufferAttribute(this,e),hi.applyMatrix3(t),this.setXYZ(e,hi.x,hi.y,hi.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)hi.fromBufferAttribute(this,e),hi.applyMatrix4(t),this.setXYZ(e,hi.x,hi.y,hi.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)hi.fromBufferAttribute(this,e),hi.applyNormalMatrix(t),this.setXYZ(e,hi.x,hi.y,hi.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)hi.fromBufferAttribute(this,e),hi.transformDirection(t),this.setXYZ(e,hi.x,hi.y,hi.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Rn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Re(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Rn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Rn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Rn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Rn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array),r=Re(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array),r=Re(r,this.array),s=Re(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Po=class extends ui{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Io=class extends ui{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var jt=class extends ui{constructor(t,e,i){super(new Float32Array(t),e,i)}},cv=new er,ho=new A,gf=new A,ir=class{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):cv.setFromPoints(t).getCenter(i);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ho.subVectors(t,this.center);let e=ho.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(ho,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(gf.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ho.copy(t.center).add(gf)),this.expandByPoint(ho.copy(t.center).sub(gf))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},hv=0,hn=new he,wf=new Ti,Bs=new A,tn=new er,uo=new er,yi=new A,_e=class n extends tr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hv++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Dy(t)?Io:Po)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Yt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,i){return hn.makeTranslation(t,e,i),this.applyMatrix4(hn),this}scale(t,e,i){return hn.makeScale(t,e,i),this.applyMatrix4(hn),this}lookAt(t){return wf.lookAt(t),wf.updateMatrix(),this.applyMatrix4(wf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bs).negate(),this.translate(Bs.x,Bs.y,Bs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let r=0,s=t.length;r<s;r++){let a=t[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new jt(i,3))}else{let i=Math.min(t.length,e.count);for(let r=0;r<i;r++){let s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&Vt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new er);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){let s=e[i];tn.setFromBufferAttribute(s),this.morphTargetsRelative?(yi.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(yi),yi.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(yi)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ir);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){let i=this.boundingSphere.center;if(tn.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){let o=e[s];uo.setFromBufferAttribute(o),this.morphTargetsRelative?(yi.addVectors(tn.min,uo.min),tn.expandByPoint(yi),yi.addVectors(tn.max,uo.max),tn.expandByPoint(yi)):(tn.expandByPoint(uo.min),tn.expandByPoint(uo.max))}tn.getCenter(i);let r=0;for(let s=0,a=t.count;s<a;s++)yi.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(yi));if(e)for(let s=0,a=e.length;s<a;s++){let o=e[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)yi.fromBufferAttribute(o,c),l&&(Bs.fromBufferAttribute(t,c),yi.add(Bs)),r=Math.max(r,i.distanceToSquared(yi))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Xt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Xt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,r=e.normal,s=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new ui(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new A,l[x]=new A;let c=new A,h=new A,d=new A,u=new ct,f=new ct,m=new ct,w=new A,g=new A;function _(x,S,L){c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,S),d.fromBufferAttribute(i,L),u.fromBufferAttribute(s,x),f.fromBufferAttribute(s,S),m.fromBufferAttribute(s,L),h.sub(c),d.sub(c),f.sub(u),m.sub(u);let U=1/(f.x*m.y-m.x*f.y);isFinite(U)&&(w.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(U),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(U),o[x].add(w),o[S].add(w),o[L].add(w),l[x].add(g),l[S].add(g),l[L].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let x=0,S=b.length;x<S;++x){let L=b[x],U=L.start,z=L.count;for(let W=U,N=U+z;W<N;W+=3)_(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let T=new A,v=new A,E=new A,R=new A;function I(x){E.fromBufferAttribute(r,x),R.copy(E);let S=o[x];T.copy(S),T.sub(E.multiplyScalar(E.dot(S))).normalize(),v.crossVectors(R,S);let U=v.dot(l[x])<0?-1:1;a.setXYZW(x,T.x,T.y,T.z,U)}for(let x=0,S=b.length;x<S;++x){let L=b[x],U=L.start,z=L.count;for(let W=U,N=U+z;W<N;W+=3)I(t.getX(W+0)),I(t.getX(W+1)),I(t.getX(W+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new ui(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let r=new A,s=new A,a=new A,o=new A,l=new A,c=new A,h=new A,d=new A;if(t)for(let u=0,f=t.count;u<f;u+=3){let m=t.getX(u+0),w=t.getX(u+1),g=t.getX(u+2);r.fromBufferAttribute(e,m),s.fromBufferAttribute(e,w),a.fromBufferAttribute(e,g),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,w),c.fromBufferAttribute(i,g),o.add(h),l.add(h),c.add(h),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(w,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)r.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)yi.fromBufferAttribute(t,e),yi.normalize(),t.setXYZ(e,yi.x,yi.y,yi.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,m=0;for(let w=0,g=l.length;w<g;w++){o.isInterleavedBufferAttribute?f=l[w]*o.data.stride+o.offset:f=l[w]*h;for(let _=0;_<h;_++)u[m++]=c[f++]}return new ui(u,h,d)}if(this.index===null)return Vt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=t(l,i);e.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(r[l]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let r=t.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(e))}let s=t.morphAttributes;for(let c in s){let h=[],d=s[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Lo=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ap,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[i+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}},Gi=new A,ia=class n{constructor(t,e,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Gi.fromBufferAttribute(this,e),Gi.applyMatrix4(t),this.setXYZ(e,Gi.x,Gi.y,Gi.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Gi.fromBufferAttribute(this,e),Gi.applyNormalMatrix(t),this.setXYZ(e,Gi.x,Gi.y,Gi.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Gi.fromBufferAttribute(this,e),Gi.transformDirection(t),this.setXYZ(e,Gi.x,Gi.y,Gi.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Rn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Re(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=Re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Rn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Rn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Rn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Rn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array),r=Re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array),r=Re(r,this.array),s=Re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){Ro("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new ui(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new n(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Ro("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},yf=new A,uv=new A,dv=new Yt,Tn=class{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let r=yf.subVectors(i,e).cross(uv.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let r=t.delta(yf),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(r,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||dv.getNormalMatrix(t),r=this.coplanarPoint(yf).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},fv=0,nr=class extends tr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fv++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=ua,this.side=zr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vf,this.blendDst=Gf,this.blendEquation=ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=Zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gc,this.stencilZFail=Gc,this.stencilZPass=Gc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Vt(`Material: parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){Vt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(e){let s=r(t.textures),a=r(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new qt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Tn().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ct().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ct().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},fn=class extends nr{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},zs,fo=new A,ks=new A,Hs=new A,Vs=new ct,po=new ct,vg=new he,gc=new A,mo=new A,wc=new A,d_=new ct,vf=new ct,f_=new ct,Cn=class extends Ti{constructor(t=new fn){if(super(),this.isSprite=!0,this.type="Sprite",zs===void 0){zs=new _e;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Lo(e,5);zs.setIndex([0,1,2,0,2,3]),zs.setAttribute("position",new ia(i,3,0,!1)),zs.setAttribute("uv",new ia(i,2,3,!1))}this.geometry=zs,this.material=t,this.center=new ct(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Xt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ks.setFromMatrixScale(this.matrixWorld),vg.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Hs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ks.multiplyScalar(-Hs.z);let i=this.material.rotation,r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));let a=this.center;yc(gc.set(-.5,-.5,0),Hs,a,ks,r,s),yc(mo.set(.5,-.5,0),Hs,a,ks,r,s),yc(wc.set(.5,.5,0),Hs,a,ks,r,s),d_.set(0,0),vf.set(1,0),f_.set(1,1);let o=t.ray.intersectTriangle(gc,mo,wc,!1,fo);if(o===null&&(yc(mo.set(-.5,.5,0),Hs,a,ks,r,s),vf.set(0,1),o=t.ray.intersectTriangle(gc,wc,mo,!1,fo),o===null))return;let l=t.ray.origin.distanceTo(fo);l<t.near||l>t.far||e.push({distance:l,point:fo.clone(),uv:$n.getInterpolation(fo,gc,mo,wc,d_,vf,f_,new ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function yc(n,t,e,i,r,s){Vs.subVectors(n,e).addScalar(.5).multiply(i),r!==void 0?(po.x=s*Vs.x-r*Vs.y,po.y=r*Vs.x+s*Vs.y):po.copy(Vs),n.copy(t),n.x+=po.x,n.y+=po.y,n.applyMatrix4(vg)}var yr=new A,xf=new A,vc=new A,xc=new A,na=class{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yr)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=yr.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yr.copy(this.origin).addScaledVector(this.direction,e),yr.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){xf.copy(t).add(e).multiplyScalar(.5),vc.copy(e).sub(t).normalize(),xc.copy(this.origin).sub(xf);let s=t.distanceTo(e)*.5,a=-this.direction.dot(vc),o=xc.dot(this.direction),l=-xc.dot(vc),c=xc.lengthSq(),h=Math.abs(1-a*a),d,u,f,m;if(h>0)if(d=a*l-o,u=a*o-l,m=s*h,d>=0)if(u>=-m)if(u<=m){let w=1/h;d*=w,u*=w,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(xf).addScaledVector(vc,u),f}intersectSphere(t,e){if(t.radius<0)return null;yr.subVectors(t.center,this.origin);let i=yr.dot(this.direction),r=yr.dot(yr)-i*i,s=t.radius*t.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,r=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,r=(t.min.x-u.x)*c),h>=0?(s=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,yr)!==null}intersectTriangle(t,e,i,r,s){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,m=e.x-a.x,w=e.y-a.y,g=e.z-a.z,_=i.x-a.x,b=i.y-a.y,T=i.z-a.z,v=Math.abs(l),E=Math.abs(c),R=Math.abs(h),I,x,S,L,U,z,W,N,H,j,Z,ot;if(v>=E&&v>=R?(S=l,z=d,H=m,ot=_,l>=0?(I=c,x=h,L=u,U=f,W=w,N=g,j=b,Z=T):(I=h,x=c,L=f,U=u,W=g,N=w,j=T,Z=b)):E>=R?(S=c,z=u,H=w,ot=b,c>=0?(I=h,x=l,L=f,U=d,W=g,N=m,j=T,Z=_):(I=l,x=h,L=d,U=f,W=m,N=g,j=_,Z=T)):(S=h,z=f,H=g,ot=T,h>=0?(I=l,x=c,L=d,U=u,W=m,N=w,j=_,Z=b):(I=c,x=l,L=u,U=d,W=w,N=m,j=b,Z=_)),S===0)return null;let K=I/S,rt=x/S,at=1/S,Ht=L-K*z,Ut=U-rt*z,De=W-K*H,ce=N-rt*H,me=j-K*ot,Q=Z-rt*ot,nt=me*ce-Q*De,Rt=Ht*Q-Ut*me,Jt=De*Ut-ce*Ht;if(r){if(nt<0||Rt<0||Jt<0)return null}else if((nt<0||Rt<0||Jt<0)&&(nt>0||Rt>0||Jt>0))return null;let Et=nt+Rt+Jt;if(Et===0)return null;let ie=at*(nt*z+Rt*H+Jt*ot);return(Et>0?ie<0:ie>0)?null:this.at(ie/Et,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Be=class extends nr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=Wf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},p_=new he,es=new na,bc=new ir,m_=new A,Sc=new A,Mc=new A,Ec=new A,bf=new A,Tc=new A,__=new A,Rc=new A,Bt=class extends Ti{constructor(t=new _e,e=new Be){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(r,t);let o=this.morphTargetInfluences;if(s&&o){Tc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],d=s[l];h!==0&&(bf.fromBufferAttribute(d,t),a?Tc.addScaledVector(bf,h):Tc.addScaledVector(bf.sub(e),h))}e.add(Tc)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),bc.copy(i.boundingSphere),bc.applyMatrix4(s),es.copy(t.ray).recast(t.near),!(bc.containsPoint(es.origin)===!1&&(es.intersectSphere(bc,m_)===null||es.origin.distanceToSquared(m_)>(t.far-t.near)**2))&&(p_.copy(s).invert(),es.copy(t.ray).applyMatrix4(p_),!(i.boundingBox!==null&&es.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,es)))}_computeIntersections(t,e,i){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,w=u.length;m<w;m++){let g=u[m],_=a[g.materialIndex],b=Math.max(g.start,f.start),T=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let v=b,E=T;v<E;v+=3){let R=o.getX(v),I=o.getX(v+1),x=o.getX(v+2);r=Ac(this,_,t,i,c,h,d,R,I,x),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,e.push(r))}}else{let m=Math.max(0,f.start),w=Math.min(o.count,f.start+f.count);for(let g=m,_=w;g<_;g+=3){let b=o.getX(g),T=o.getX(g+1),v=o.getX(g+2);r=Ac(this,a,t,i,c,h,d,b,T,v),r&&(r.faceIndex=Math.floor(g/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,w=u.length;m<w;m++){let g=u[m],_=a[g.materialIndex],b=Math.max(g.start,f.start),T=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=b,E=T;v<E;v+=3){let R=v,I=v+1,x=v+2;r=Ac(this,_,t,i,c,h,d,R,I,x),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,e.push(r))}}else{let m=Math.max(0,f.start),w=Math.min(l.count,f.start+f.count);for(let g=m,_=w;g<_;g+=3){let b=g,T=g+1,v=g+2;r=Ac(this,a,t,i,c,h,d,b,T,v),r&&(r.faceIndex=Math.floor(g/3),e.push(r))}}}};function pv(n,t,e,i,r,s,a,o){let l;if(t.side===Ri?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,t.side===zr,o),l===null)return null;Rc.copy(o),Rc.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Rc);return c<e.near||c>e.far?null:{distance:c,point:Rc.clone(),object:n}}function Ac(n,t,e,i,r,s,a,o,l,c){n.getVertexPosition(o,Sc),n.getVertexPosition(l,Mc),n.getVertexPosition(c,Ec);let h=pv(n,t,e,i,Sc,Mc,Ec,__);if(h){let d=new A;$n.getBarycoord(__,Sc,Mc,Ec,d),r&&(h.uv=$n.getInterpolatedAttribute(r,o,l,c,d,new ct)),s&&(h.uv1=$n.getInterpolatedAttribute(s,o,l,c,d,new ct)),a&&(h.normal=$n.getInterpolatedAttribute(a,o,l,c,d,new A),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new A,materialIndex:0};$n.getNormal(Sc,Mc,Ec,u.normal),h.face=u,h.barycoord=d}return h}var No=class extends Ei{constructor(t=null,e=1,i=1,r,s,a,o,l,c=Ve,h=Ve,d,u){super(null,a,o,l,c,h,r,s,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ra=class extends ui{constructor(t,e,i,r=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Gs=new he,g_=new he,Cc=[],w_=new er,mv=new he,_o=new Bt,go=new ir,Do=class extends Bt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ra(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,mv)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new er),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Gs),w_.copy(t.boundingBox).applyMatrix4(Gs),this.boundingBox.union(w_)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ir),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Gs),go.copy(t.boundingSphere).applyMatrix4(Gs),this.boundingSphere.union(go)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=t*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(t,e){let i=this.matrixWorld,r=this.count;if(_o.geometry=this.geometry,_o.material=this.material,_o.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),go.copy(this.boundingSphere),go.applyMatrix4(i),t.ray.intersectsSphere(go)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Gs),g_.multiplyMatrices(i,Gs),_o.matrixWorld=g_,_o.raycast(t,Cc);for(let a=0,o=Cc.length;a<o;a++){let l=Cc[a];l.instanceId=s,l.object=this,e.push(l)}Cc.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new ra(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new No(new Float32Array(r*this.count),r,this.count,Dh,mn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*t;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},is=new ir,_v=new ct(.5,.5),Pc=new A,Fo=class{constructor(t=new Tn,e=new Tn,i=new Tn,r=new Tn,s=new Tn,a=new Tn){this.planes=[t,e,i,r,s,a]}set(t,e,i,r,s,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=An,i=!1){let r=this.planes,s=t.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],d=s[5],u=s[6],f=s[7],m=s[8],w=s[9],g=s[10],_=s[11],b=s[12],T=s[13],v=s[14],E=s[15];if(r[0].setComponents(c-a,f-h,_-m,E-b).normalize(),r[1].setComponents(c+a,f+h,_+m,E+b).normalize(),r[2].setComponents(c+o,f+d,_+w,E+T).normalize(),r[3].setComponents(c-o,f-d,_-w,E-T).normalize(),i)r[4].setComponents(l,u,g,v).normalize(),r[5].setComponents(c-l,f-u,_-g,E-v).normalize();else if(r[4].setComponents(c-l,f-u,_-g,E-v).normalize(),e===An)r[5].setComponents(c+l,f+u,_+g,E+v).normalize();else if(e===Eo)r[5].setComponents(l,u,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),is.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),is.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(is)}intersectsSprite(t){is.center.set(0,0,0);let e=_v.distanceTo(t.center);return is.radius=.7071067811865476+e,is.applyMatrix4(t.matrixWorld),this.intersectsSphere(is)}intersectsSphere(t){let e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let r=e[i];if(Pc.x=r.normal.x>0?t.max.x:t.min.x,Pc.y=r.normal.y>0?t.max.y:t.min.y,Pc.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Pc)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var sa=class extends nr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},ih=new A,nh=new A,y_=new he,wo=new na,Ic=new ir,Sf=new A,v_=new A,rh=class extends Ti{constructor(t=new _e,e=new sa){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let r=1,s=e.count;r<s;r++)ih.fromBufferAttribute(e,r-1),nh.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=ih.distanceTo(nh);t.setAttribute("lineDistance",new jt(i,1))}else Vt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ic.copy(i.boundingSphere),Ic.applyMatrix4(r),Ic.radius+=s,t.ray.intersectsSphere(Ic)===!1)return;y_.copy(r).invert(),wo.copy(t.ray).applyMatrix4(y_);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let w=f,g=m-1;w<g;w+=c){let _=h.getX(w),b=h.getX(w+1),T=Lc(this,t,wo,l,_,b,w);T&&e.push(T)}if(this.isLineLoop){let w=h.getX(m-1),g=h.getX(f),_=Lc(this,t,wo,l,w,g,m-1);_&&e.push(_)}}else{let f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let w=f,g=m-1;w<g;w+=c){let _=Lc(this,t,wo,l,w,w+1,w);_&&e.push(_)}if(this.isLineLoop){let w=Lc(this,t,wo,l,m-1,f,m-1);w&&e.push(w)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Lc(n,t,e,i,r,s,a){let o=n.geometry.attributes.position;if(ih.fromBufferAttribute(o,r),nh.fromBufferAttribute(o,s),e.distanceSqToSegment(ih,nh,Sf,v_)>i)return;Sf.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Sf);if(!(c<t.near||c>t.far))return{distance:c,point:v_.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var x_=new A,b_=new A,Uo=class extends rh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let r=0,s=e.count;r<s;r+=2)x_.fromBufferAttribute(e,r),b_.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+x_.distanceTo(b_);t.setAttribute("lineDistance",new jt(i,1))}else Vt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var sh=class extends nr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},S_=new he,Nf=new na,Nc=new ir,Dc=new A,Oo=class extends Ti{constructor(t=new _e,e=new sh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Nc.copy(i.boundingSphere),Nc.applyMatrix4(r),Nc.radius+=s,t.ray.intersectsSphere(Nc)===!1)return;S_.copy(r).invert(),Nf.copy(t.ray).applyMatrix4(S_);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=u,w=f;m<w;m++){let g=c.getX(m);Dc.fromBufferAttribute(d,g),M_(Dc,g,l,r,t,e,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=u,w=f;m<w;m++)Dc.fromBufferAttribute(d,m),M_(Dc,m,l,r,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function M_(n,t,e,i,r,s,a){let o=Nf.distanceSqToPoint(n);if(o<e){let l=new A;Nf.closestPointToPoint(n,l),l.applyMatrix4(i);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Bo=class extends Ei{constructor(t=[],e=kr,i,r,s,a,o,l,c,h){super(t,e,i,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ei=class extends Ei{constructor(t,e,i,r,s,a,o,l,c){super(t,e,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var rr=class extends Ei{constructor(t,e,i=sn,r,s,a,o=Ve,l=Ve,c,h=Qn,d=1){if(h!==Qn&&h!==Hr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,r,s,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ta(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},ah=class extends rr{constructor(t,e=sn,i=kr,r,s,a=Ve,o=Ve,l,c=Qn){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,i,r,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},zo=class extends Ei{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Pn=class n extends _e{constructor(t=1,e=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;m("z","y","x",-1,-1,i,e,t,a,s,0),m("z","y","x",1,-1,i,e,-t,a,s,1),m("x","z","y",1,1,t,i,e,r,a,2),m("x","z","y",1,-1,t,i,-e,r,a,3),m("x","y","z",1,-1,t,e,i,r,s,4),m("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(d,2));function m(w,g,_,b,T,v,E,R,I,x,S){let L=v/I,U=E/x,z=v/2,W=E/2,N=R/2,H=I+1,j=x+1,Z=0,ot=0,K=new A;for(let rt=0;rt<j;rt++){let at=rt*U-W;for(let Ht=0;Ht<H;Ht++){let Ut=Ht*L-z;K[w]=Ut*b,K[g]=at*T,K[_]=N,c.push(K.x,K.y,K.z),K[w]=0,K[g]=0,K[_]=R>0?1:-1,h.push(K.x,K.y,K.z),d.push(Ht/I),d.push(1-rt/x),Z+=1}}for(let rt=0;rt<x;rt++)for(let at=0;at<I;at++){let Ht=u+at+H*rt,Ut=u+at+H*(rt+1),De=u+(at+1)+H*(rt+1),ce=u+(at+1)+H*rt;l.push(Ht,Ut,ce),l.push(Ut,De,ce),ot+=6}o.addGroup(f,ot,S),f+=ot,u+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var sr=class n extends _e{constructor(t=1,e=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:r},e=Math.max(3,e);let s=[],a=[],o=[],l=[],c=new A,h=new ct;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=i+d/e*r;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new jt(a,3)),this.setAttribute("normal",new jt(o,3)),this.setAttribute("uv",new jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},pn=class n extends _e{constructor(t=1,e=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],d=[],u=[],f=[],m=0,w=[],g=i/2,_=0;b(),a===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new jt(d,3)),this.setAttribute("normal",new jt(u,3)),this.setAttribute("uv",new jt(f,2));function b(){let v=new A,E=new A,R=0,I=(e-t)/i;for(let x=0;x<=s;x++){let S=[],L=x/s,U=L*(e-t)+t;for(let z=0;z<=r;z++){let W=z/r,N=W*l+o,H=Math.sin(N),j=Math.cos(N);E.x=U*H,E.y=-L*i+g,E.z=U*j,d.push(E.x,E.y,E.z),v.set(H,I,j).normalize(),u.push(v.x,v.y,v.z),f.push(W,1-L),S.push(m++)}w.push(S)}for(let x=0;x<r;x++)for(let S=0;S<s;S++){let L=w[S][x],U=w[S+1][x],z=w[S+1][x+1],W=w[S][x+1];(t>0||S!==0)&&(h.push(L,U,W),R+=3),(e>0||S!==s-1)&&(h.push(U,z,W),R+=3)}c.addGroup(_,R,0),_+=R}function T(v){let E=m,R=new ct,I=new A,x=0,S=v===!0?t:e,L=v===!0?1:-1;for(let z=1;z<=r;z++)d.push(0,g*L,0),u.push(0,L,0),f.push(.5,.5),m++;let U=m;for(let z=0;z<=r;z++){let N=z/r*l+o,H=Math.cos(N),j=Math.sin(N);I.x=S*j,I.y=g*L,I.z=S*H,d.push(I.x,I.y,I.z),u.push(0,L,0),R.x=H*.5+.5,R.y=j*.5*L+.5,f.push(R.x,R.y),m++}for(let z=0;z<r;z++){let W=E+z,N=U+z;v===!0?h.push(N,N+1,W):h.push(N+1,N,W),x+=3}c.addGroup(_,x,v===!0?1:2),_+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Fc=new A,Uc=new A,Mf=new A,Oc=new $n,ko=class extends _e{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let r=Math.pow(10,4),s=Math.cos(Ys*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:w,b:g,c:_}=Oc;if(w.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),_.fromBufferAttribute(o,c[2]),Oc.getNormal(Mf),d[0]=`${Math.round(w.x*r)},${Math.round(w.y*r)},${Math.round(w.z*r)}`,d[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,d[2]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let b=0;b<3;b++){let T=(b+1)%3,v=d[b],E=d[T],R=Oc[h[b]],I=Oc[h[T]],x=`${v}_${E}`,S=`${E}_${v}`;S in u&&u[S]?(Mf.dot(u[S].normal)<=s&&(f.push(R.x,R.y,R.z),f.push(I.x,I.y,I.z)),u[S]=null):x in u||(u[x]={index0:c[b],index1:c[T],normal:Mf.clone()})}}for(let m in u)if(u[m]){let{index0:w,index1:g}=u[m];Fc.fromBufferAttribute(o,w),Uc.fromBufferAttribute(o,g),f.push(Fc.x,Fc.y,Fc.z),f.push(Uc.x,Uc.y,Uc.z)}this.setAttribute("position",new jt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},en=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Vt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,r=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),s+=i.distanceTo(r),e.push(s),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),r=0,s=i.length,a;e?a=e:a=t*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);let h=i[r],u=i[r+1]-h,f=(a-h)/u;return(r+f)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=e||(a.isVector2?new ct:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new A,r=[],s=[],a=[],o=new A,l=new he;for(let f=0;f<=t;f++){let m=f/t;r[f]=this.getTangentAt(m,new A)}s[0]=new A,a[0]=new A;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),d=Math.abs(r[0].y),u=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(re(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(r[f],s[f])}if(e===!0){let f=Math.acos(re(s[0].dot(s[t]),-1,1));f/=t,r[0].dot(o.crossVectors(s[0],s[t]))>0&&(f=-f);for(let m=1;m<=t;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],f*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},aa=class extends en{constructor(t=0,e=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ct){let i=e,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);let o=this.aStartAngle+t*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},oh=class extends aa{constructor(t,e,i,r,s,a){super(t,e,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function hp(){let n=0,t=0,e=0,i=0;function r(s,a,o,l){n=s,t=o,e=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,d){let u=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,r(a,o,u,f)},calc:function(s){let a=s*s,o=a*s;return n+t*s+e*a+i*o}}}var E_=new A,T_=new A,Ef=new hp,Tf=new hp,Rf=new hp,lh=class extends en{constructor(t=[],e=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=r}getPoint(t,e=new A){let i=e,r=this.points,s=r.length,a=(s-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=r[(o-1)%s]:(T_.subVectors(r[0],r[1]).add(r[0]),c=T_);let d=r[o%s],u=r[(o+1)%s];if(this.closed||o+2<s?h=r[(o+2)%s]:(E_.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=E_),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(d),f),w=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);w<1e-4&&(w=1),m<1e-4&&(m=w),g<1e-4&&(g=w),Ef.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,m,w,g),Tf.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,m,w,g),Rf.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,m,w,g)}else this.curveType==="catmullrom"&&(Ef.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Tf.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Rf.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(Ef.calc(l),Tf.calc(l),Rf.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(new A().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function R_(n,t,e,i,r){let s=(i-t)*.5,a=(r-e)*.5,o=n*n,l=n*o;return(2*e-2*i+s+a)*l+(-3*e+3*i-2*s-a)*o+s*n+e}function gv(n,t){let e=1-n;return e*e*t}function wv(n,t){return 2*(1-n)*n*t}function yv(n,t){return n*n*t}function xo(n,t,e,i){return gv(n,t)+wv(n,e)+yv(n,i)}function vv(n,t){let e=1-n;return e*e*e*t}function xv(n,t){let e=1-n;return 3*e*e*n*t}function bv(n,t){return 3*(1-n)*n*n*t}function Sv(n,t){return n*n*n*t}function bo(n,t,e,i,r){return vv(n,t)+xv(n,e)+bv(n,i)+Sv(n,r)}var Ho=class extends en{constructor(t=new ct,e=new ct,i=new ct,r=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new ct){let i=e,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(bo(t,r.x,s.x,a.x,o.x),bo(t,r.y,s.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ch=class extends en{constructor(t=new A,e=new A,i=new A,r=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new A){let i=e,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(bo(t,r.x,s.x,a.x,o.x),bo(t,r.y,s.y,a.y,o.y),bo(t,r.z,s.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Vo=class extends en{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},hh=class extends en{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Go=class extends en{constructor(t=new ct,e=new ct,i=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ct){let i=e,r=this.v0,s=this.v1,a=this.v2;return i.set(xo(t,r.x,s.x,a.x),xo(t,r.y,s.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},uh=class extends en{constructor(t=new A,e=new A,i=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new A){let i=e,r=this.v0,s=this.v1,a=this.v2;return i.set(xo(t,r.x,s.x,a.x),xo(t,r.y,s.y,a.y),xo(t,r.z,s.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wo=class extends en{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){let i=e,r=this.points,s=(r.length-1)*t,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return i.set(R_(o,l.x,c.x,h.x,d.x),R_(o,l.y,c.y,h.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(r.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(new ct().fromArray(r))}return this}},A_=Object.freeze({__proto__:null,ArcCurve:oh,CatmullRomCurve3:lh,CubicBezierCurve:Ho,CubicBezierCurve3:ch,EllipseCurve:aa,LineCurve:Vo,LineCurve3:hh,QuadraticBezierCurve:Go,QuadraticBezierCurve3:uh,SplineCurve:Wo}),dh=class extends en{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new A_[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=i){let a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}s++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,r=this.curves.length;i<r;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let r=t.curves[e];this.curves.push(new A_[r.type]().fromJSON(r))}return this}},Xo=class extends dh{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new Vo(this.currentPoint.clone(),new ct(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,r){let s=new Go(this.currentPoint.clone(),new ct(t,e),new ct(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(t,e,i,r,s,a){let o=new Ho(this.currentPoint.clone(),new ct(t,e),new ct(i,r),new ct(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new Wo(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,r,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,i,r,s,a),this}absarc(t,e,i,r,s,a){return this.absellipse(t,e,i,i,r,s,a),this}ellipse(t,e,i,r,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,i,r,s,a,o,l),this}absellipse(t,e,i,r,s,a,o,l){let c=new aa(t,e,i,r,s,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Fr=class extends Xo{constructor(t){super(t),this.uuid=Kn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,r=this.holes.length;i<r;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let r=t.holes[e];this.holes.push(new Xo().fromJSON(r))}return this}};function Mv(n,t,e=2){let i=t&&t.length,r=i?t[0]*e:n.length,s=xg(n,0,r,e,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=Cv(n,t,s,e)),n.length>80*e){o=n[0],l=n[1];let h=o,d=l;for(let u=e;u<r;u+=e){let f=n[u],m=n[u+1];f<o&&(o=f),m<l&&(l=m),f>h&&(h=f),m>d&&(d=m)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return qo(s,a,e,o,l,c,0),a}function xg(n,t,e,i,r){let s;if(r===kv(n,t,e,i)>0)for(let a=t;a<e;a+=i)s=C_(a/i|0,n[a],n[a+1],s);else for(let a=e-i;a>=t;a-=i)s=C_(a/i|0,n[a],n[a+1],s);return s&&oa(s,s.next)&&(Jo(s),s=s.next),s}function as(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(oa(e,e.next)||$e(e.prev,e,e.next)===0)){if(Jo(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function qo(n,t,e,i,r,s,a){if(!n)return;!a&&s&&Dv(n,i,r,s);let o=n;for(;n.prev!==n.next;){let l=n.prev,c=n.next;if(s?Tv(n,i,r,s):Ev(n)){t.push(l.i,n.i,c.i),Jo(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=Rv(as(n),t),qo(n,t,e,i,r,s,2)):a===2&&Av(n,t,e,i,r,s):qo(as(n),t,e,i,r,s,1);break}}}function Ev(n){let t=n.prev,e=n,i=n.next;if($e(t,e,i)>=0)return!1;let r=t.x,s=e.x,a=i.x,o=t.y,l=e.y,c=i.y,h=Math.min(r,s,a),d=Math.min(o,l,c),u=Math.max(r,s,a),f=Math.max(o,l,c),m=i.next;for(;m!==t;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=f&&yo(r,o,s,l,a,c,m.x,m.y)&&$e(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Tv(n,t,e,i){let r=n.prev,s=n,a=n.next;if($e(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,h=r.y,d=s.y,u=a.y,f=Math.min(o,l,c),m=Math.min(h,d,u),w=Math.max(o,l,c),g=Math.max(h,d,u),_=Df(f,m,t,e,i),b=Df(w,g,t,e,i),T=n.prevZ,v=n.nextZ;for(;T&&T.z>=_&&v&&v.z<=b;){if(T.x>=f&&T.x<=w&&T.y>=m&&T.y<=g&&T!==r&&T!==a&&yo(o,h,l,d,c,u,T.x,T.y)&&$e(T.prev,T,T.next)>=0||(T=T.prevZ,v.x>=f&&v.x<=w&&v.y>=m&&v.y<=g&&v!==r&&v!==a&&yo(o,h,l,d,c,u,v.x,v.y)&&$e(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;T&&T.z>=_;){if(T.x>=f&&T.x<=w&&T.y>=m&&T.y<=g&&T!==r&&T!==a&&yo(o,h,l,d,c,u,T.x,T.y)&&$e(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;v&&v.z<=b;){if(v.x>=f&&v.x<=w&&v.y>=m&&v.y<=g&&v!==r&&v!==a&&yo(o,h,l,d,c,u,v.x,v.y)&&$e(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Rv(n,t){let e=n;do{let i=e.prev,r=e.next.next;!oa(i,r)&&Sg(i,e,e.next,r)&&Yo(i,r)&&Yo(r,i)&&(t.push(i.i,e.i,r.i),Jo(e),Jo(e.next),e=n=r),e=e.next}while(e!==n);return as(e)}function Av(n,t,e,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ov(a,o)){let l=Mg(a,o);a=as(a,a.next),l=as(l,l.next),qo(a,t,e,i,r,s,0),qo(l,t,e,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function Cv(n,t,e,i){let r=[];for(let s=0,a=t.length;s<a;s++){let o=t[s]*i,l=s<a-1?t[s+1]*i:n.length,c=xg(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(Uv(c))}r.sort(Pv);for(let s=0;s<r.length;s++)e=Iv(r[s],e);return e}function Pv(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),r=(t.next.y-t.y)/(t.next.x-t.x);e=i-r}return e}function Iv(n,t){let e=Lv(n,t);if(!e)return t;let i=Mg(e,n);return as(i,i.next),as(e,e.next)}function Lv(n,t){let e=t,i=n.x,r=n.y,s=-1/0,a;if(oa(n,e))return e;do{if(oa(n,e.next))return e.next;if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){let d=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=i&&d>s&&(s=d,a=e.x<e.next.x?e:e.next,d===i))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(i>=e.x&&e.x>=l&&i!==e.x&&bg(r<c?i:s,r,l,c,r<c?s:i,r,e.x,e.y)){let d=Math.abs(r-e.y)/(i-e.x);Yo(e,n)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&Nv(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function Nv(n,t){return $e(n.prev,n,t.prev)<0&&$e(t.next,n,n.next)<0}function Dv(n,t,e,i){let r=n;do r.z===0&&(r.z=Df(r.x,r.y,t,e,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Fv(r)}function Fv(n){let t,e=1;do{let i=n,r;n=null;let s=null;for(t=0;i;){t++;let a=i,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,e*=2}while(t>1);return n}function Df(n,t,e,i,r){return n=(n-e)*r|0,t=(t-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Uv(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function bg(n,t,e,i,r,s,a,o){return(r-a)*(t-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(s-o)>=(r-a)*(i-o)}function yo(n,t,e,i,r,s,a,o){return!(n===a&&t===o)&&bg(n,t,e,i,r,s,a,o)}function Ov(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Bv(n,t)&&(Yo(n,t)&&Yo(t,n)&&zv(n,t)&&($e(n.prev,n,t.prev)||$e(n,t.prev,t))||oa(n,t)&&$e(n.prev,n,n.next)>0&&$e(t.prev,t,t.next)>0)}function $e(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function oa(n,t){return n.x===t.x&&n.y===t.y}function Sg(n,t,e,i){let r=zc($e(n,t,e)),s=zc($e(n,t,i)),a=zc($e(e,i,n)),o=zc($e(e,i,t));return!!(r!==s&&a!==o||r===0&&Bc(n,e,t)||s===0&&Bc(n,i,t)||a===0&&Bc(e,n,i)||o===0&&Bc(e,t,i))}function Bc(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function zc(n){return n>0?1:n<0?-1:0}function Bv(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Sg(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Yo(n,t){return $e(n.prev,n,n.next)<0?$e(n,t,n.next)>=0&&$e(n,n.prev,t)>=0:$e(n,t,n.prev)<0||$e(n,n.next,t)<0}function zv(n,t){let e=n,i=!1,r=(n.x+t.x)/2,s=(n.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Mg(n,t){let e=Ff(n.i,n.x,n.y),i=Ff(t.i,t.x,t.y),r=n.next,s=t.prev;return n.next=t,t.prev=n,e.next=r,r.prev=e,i.next=e,e.prev=i,s.next=i,i.prev=s,i}function C_(n,t,e,i){let r=Ff(n,t,e);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Jo(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Ff(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function kv(n,t,e,i){let r=0;for(let s=t,a=e-i;s<e;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}var Uf=class{static triangulate(t,e,i=2){return Mv(t,e,i)}},js=class n{static area(t){let e=t.length,i=0;for(let r=e-1,s=0;s<e;r=s++)i+=t[r].x*t[s].y-t[s].x*t[r].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],r=[],s=[];P_(t),I_(i,t);let a=t.length;e.forEach(P_);for(let l=0;l<e.length;l++)r.push(a),a+=e[l].length,I_(i,e[l]);let o=Uf.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function P_(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function I_(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var ii=class n extends _e{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};let s=t/2,a=e/2,o=Math.floor(i),l=Math.floor(r),c=o+1,h=l+1,d=t/o,u=e/l,f=[],m=[],w=[],g=[];for(let _=0;_<h;_++){let b=_*u-a;for(let T=0;T<c;T++){let v=T*d-s;m.push(v,-b,0),w.push(0,0,1),g.push(T/o),g.push(1-_/l)}}for(let _=0;_<l;_++)for(let b=0;b<o;b++){let T=b+c*_,v=b+c*(_+1),E=b+1+c*(_+1),R=b+1+c*_;f.push(T,v,R),f.push(v,E,R)}this.setIndex(f),this.setAttribute("position",new jt(m,3)),this.setAttribute("normal",new jt(w,3)),this.setAttribute("uv",new jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};var os=class n extends _e{constructor(t=new Fr([new ct(0,.5),new ct(-.5,-.5),new ct(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let i=[],r=[],s=[],a=[],o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new jt(r,3)),this.setAttribute("normal",new jt(s,3)),this.setAttribute("uv",new jt(a,2));function c(h){let d=r.length/3,u=h.extractPoints(e),f=u.shape,m=u.holes;js.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,_=m.length;g<_;g++){let b=m[g];js.isClockWise(b)===!0&&(m[g]=b.reverse())}let w=js.triangulateShape(f,m);for(let g=0,_=m.length;g<_;g++){let b=m[g];f=f.concat(b)}for(let g=0,_=f.length;g<_;g++){let b=f[g];r.push(b.x,b.y,0),s.push(0,0,1),a.push(b.x,b.y)}for(let g=0,_=w.length;g<_;g++){let b=w[g],T=b[0]+d,v=b[1]+d,E=b[2]+d;i.push(T,v,E),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return Hv(e,t)}static fromJSON(t,e){let i=[];for(let r=0,s=t.shapes.length;r<s;r++){let a=e[t.shapes[r]];i.push(a)}return new n(i,t.curveSegments)}};function Hv(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){let r=n[e];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t}var jo=class n extends _e{constructor(t=1,e=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new A,u=new A,f=[],m=[],w=[],g=[];for(let _=0;_<=i;_++){let b=[],T=_/i,v=a+T*o,E=t*Math.cos(v),R=Math.sqrt(t*t-E*E),I=0;_===0&&a===0?I=.5/e:_===i&&l===Math.PI&&(I=-.5/e);for(let x=0;x<=e;x++){let S=x/e,L=r+S*s;d.x=-R*Math.cos(L),d.y=E,d.z=R*Math.sin(L),m.push(d.x,d.y,d.z),u.copy(d).normalize(),w.push(u.x,u.y,u.z),g.push(S+I,1-T),b.push(c++)}h.push(b)}for(let _=0;_<i;_++)for(let b=0;b<e;b++){let T=h[_][b+1],v=h[_][b],E=h[_+1][b],R=h[_+1][b+1];(_!==0||a>0)&&f.push(T,v,R),(_!==i-1||l<Math.PI)&&f.push(v,E,R)}this.setIndex(f),this.setAttribute("position",new jt(m,3)),this.setAttribute("normal",new jt(w,3)),this.setAttribute("uv",new jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var la=class n extends _e{constructor(t=1,e=.4,i=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},i=Math.floor(i),r=Math.floor(r);let l=[],c=[],h=[],d=[],u=new A,f=new A,m=new A;for(let w=0;w<=i;w++){let g=a+w/i*o;for(let _=0;_<=r;_++){let b=_/r*s;f.x=(t+e*Math.cos(g))*Math.cos(b),f.y=(t+e*Math.cos(g))*Math.sin(b),f.z=e*Math.sin(g),c.push(f.x,f.y,f.z),u.x=t*Math.cos(b),u.y=t*Math.sin(b),m.subVectors(f,u).normalize(),h.push(m.x,m.y,m.z),d.push(_/r),d.push(w/i)}}for(let w=1;w<=i;w++)for(let g=1;g<=r;g++){let _=(r+1)*w+g-1,b=(r+1)*(w-1)+g-1,T=(r+1)*(w-1)+g,v=(r+1)*w+g;l.push(_,b,v),l.push(b,T,v)}this.setIndex(l),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function hs(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let r=n[e][i];if(L_(r))r.isRenderTargetTexture?(Vt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone();else if(Array.isArray(r))if(L_(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();t[e][i]=s}else t[e][i]=r.slice();else t[e][i]=r}}return t}function Ui(n){let t={};for(let e=0;e<n.length;e++){let i=hs(n[e]);for(let r in i)t[r]=i[r]}return t}function L_(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Vv(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function up(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}var Eg={clone:hs,merge:Ui},Gv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ge=class extends nr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gv,this.fragmentShader=Wv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=hs(t.uniforms),this.uniformsGroups=Vv(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let r=t.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=e[r.value]||null;break;case"c":this.uniforms[i].value=new qt().setHex(r.value);break;case"v2":this.uniforms[i].value=new ct().fromArray(r.value);break;case"v3":this.uniforms[i].value=new A().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Ie().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Yt().fromArray(r.value);break;case"m4":this.uniforms[i].value=new he().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},fh=class extends ge{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ca=class extends nr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ag,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ph=class extends nr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ws(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Af(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Ur=class{constructor(t,e,i,r){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,r=e[i],s=e[i-1];i:{t:{let a;e:{n:if(!(t<r)){for(let o=i+2;;){if(r===void 0){if(t<s)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=r,r=e[++i],t<r)break t}a=e.length;break e}if(!(t>=s)){let o=e[1];t<o&&(i=2,s=o);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=e[--i-1],t>=s)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(r=e[i],s=e[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,t,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=t*r;for(let a=0;a!==r;++a)e[a]=i[s+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},mh=class extends Ur{constructor(t,e,i,r){super(t,e,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pf,endingEnd:Pf}}intervalChanged_(t,e,i){let r=this.parameterPositions,s=t-2,a=t+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case If:s=t,o=2*e-i;break;case Lf:s=r.length-2,o=e+r[s]-r[s+1];break;default:s=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case If:a=t,l=2*i-e;break;case Lf:a=1,l=i+r[1]-r[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(t,e,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(i-e)/(r-e),w=m*m,g=w*m,_=-u*g+2*u*w-u*m,b=(1+u)*g+(-1.5-2*u)*w+(-.5+u)*m+1,T=(-1-f)*g+(1.5+f)*w+.5*m,v=f*g-f*w;for(let E=0;E!==o;++E)s[E]=_*a[h+E]+b*a[c+E]+T*a[l+E]+v*a[d+E];return s}},_h=class extends Ur{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(r-e),d=1-h;for(let u=0;u!==o;++u)s[u]=a[c+u]*d+a[l+u]*h;return s}},gh=class extends Ur{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t){return this.copySampleValue_(t-1)}},wh=class extends Ur{interpolate_(t,e,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let m=(i-e)/(r-e),w=1-m;for(let g=0;g!==o;++g)s[g]=a[c+g]*w+a[l+g]*m;return s}let u=o*2,f=t-1;for(let m=0;m!==o;++m){let w=a[c+m],g=a[l+m],_=f*u+m*2,b=d[_],T=d[_+1],v=t*u+m*2,E=h[v],R=h[v+1],I=qv(i,e,b,E,r);s[m]=Tg(I,w,T,R,g)}return s}};function Tg(n,t,e,i,r){let s=1-n;return s*s*s*t+3*s*s*n*e+3*s*n*n*i+n*n*n*r}function Xv(n,t,e,i,r){let s=1-n;return 3*s*s*(e-t)+6*s*n*(i-e)+3*n*n*(r-i)}function qv(n,t,e,i,r){let s=(n-t)/(r-t);for(let a=0;a<8;a++){let o=Tg(s,t,e,i,r)-n;if(Math.abs(o)<1e-10)break;let l=Xv(s,t,e,i,r);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}var nn=class{constructor(t,e,i,r){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ws(e,this.TimeBufferType),this.values=Ws(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Ws(t.times,Array),values:Ws(t.values,Array)};let r=t.getInterpolation();r!==t.DefaultInterpolation&&(i.interpolation=r),Af(t.settings)&&(i.settings={inTangents:Ws(t.settings.inTangents,Array),outTangents:Ws(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new gh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new _h(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new mh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new wh(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case So:e=this.InterpolantFactoryMethodDiscrete;break;case Kc:e=this.InterpolantFactoryMethodLinear;break;case Vc:e=this.InterpolantFactoryMethodSmooth;break;case Cf:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Vt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return So;case this.InterpolantFactoryMethodLinear:return Kc;case this.InterpolantFactoryMethodSmooth:return Vc;case this.InterpolantFactoryMethodBezier:return Cf}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]*=t;Af(this.settings)&&(N_(this.settings.inTangents,t),N_(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,r=i.length,s=0,a=r-1;for(;s!==r&&i[s]<t;)++s;for(;a!==-1&&i[a]>e;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=i.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Xt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Xt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==s;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Xt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Xt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(r!==void 0&&Fy(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){Xt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Vc,s=t.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(r)l=!0;else{let d=o*i,u=d-i,f=d+i;for(let m=0;m!==i;++m){let w=e[d+m];if(w!==e[u+m]||w!==e[f+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*i,u=a*i;for(let f=0;f!==i;++f)e[u+f]=e[d+f]}++a}}if(s>0){t[a]=t[s];for(let o=s*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,r=new i(this.name,t,e);return r.createInterpolant=this.createInterpolant,Af(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function N_(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}nn.prototype.ValueTypeName="";nn.prototype.TimeBufferType=Float32Array;nn.prototype.ValueBufferType=Float32Array;nn.prototype.DefaultInterpolation=Kc;var Or=class extends nn{constructor(t,e,i){super(t,e,i)}};Or.prototype.ValueTypeName="bool";Or.prototype.ValueBufferType=Array;Or.prototype.DefaultInterpolation=So;Or.prototype.InterpolantFactoryMethodLinear=void 0;Or.prototype.InterpolantFactoryMethodSmooth=void 0;var yh=class extends nn{constructor(t,e,i,r){super(t,e,i,r)}};yh.prototype.ValueTypeName="color";var vh=class extends nn{constructor(t,e,i,r){super(t,e,i,r)}};vh.prototype.ValueTypeName="number";var xh=class extends Ur{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(r-e),c=t*o;for(let h=c+o;c!==h;c+=4)Se.slerpFlat(s,0,a,c-o,a,c,l);return s}},Zo=class extends nn{constructor(t,e,i,r){super(t,e,i,r)}InterpolantFactoryMethodLinear(t){return new xh(this.times,this.values,this.getValueSize(),t)}};Zo.prototype.ValueTypeName="quaternion";Zo.prototype.InterpolantFactoryMethodSmooth=void 0;var Br=class extends nn{constructor(t,e,i){super(t,e,i)}};Br.prototype.ValueTypeName="string";Br.prototype.ValueBufferType=Array;Br.prototype.DefaultInterpolation=So;Br.prototype.InterpolantFactoryMethodLinear=void 0;Br.prototype.InterpolantFactoryMethodSmooth=void 0;var bh=class extends nn{constructor(t,e,i,r){super(t,e,i,r)}};bh.prototype.ValueTypeName="vector";var Sh=class{constructor(t,e,i){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,s===!1&&r.onStart!==void 0&&r.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,r.onProgress!==void 0&&r.onProgress(h,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Rg=new Sh,Mh=class{constructor(t){this.manager=t!==void 0?t:Rg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(r,s){i.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Mh.DEFAULT_MATERIAL_NAME="__DEFAULT";var kc=new A,Hc=new Se,Zn=new A,$o=class extends Ti{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=An,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(kc,Hc,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kc,Hc,Zn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(kc,Hc,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kc,Hc,Zn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Dr=new A,D_=new ct,F_=new ct,Ji=class extends $o{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Qs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ys*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Qs*2*Math.atan(Math.tan(Ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Dr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Dr.x,Dr.y).multiplyScalar(-t/Dr.z),Dr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Dr.x,Dr.y).multiplyScalar(-t/Dr.z)}getViewSize(t,e){return this.getViewBounds(t,D_,F_),e.subVectors(F_,D_)}setViewOffset(t,e,i,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ys*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var In=class extends $o{constructor(t=-1,e=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-t,a=i+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var Xs=-90,qs=1,Eh=class extends Ti{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ji(Xs,qs,t,e);r.layers=this.layers,this.add(r);let s=new Ji(Xs,qs,t,e);s.layers=this.layers,this.add(s);let a=new Ji(Xs,qs,t,e);a.layers=this.layers,this.add(a);let o=new Ji(Xs,qs,t,e);o.layers=this.layers,this.add(o);let l=new Ji(Xs,qs,t,e);l.layers=this.layers,this.add(l);let c=new Ji(Xs,qs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,r,s,a,o,l]=e;for(let c of e)this.remove(c);if(t===An)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Eo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let w=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,r),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,s),t.setRenderTarget(i,1,r),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,r),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,r),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,r),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=w,t.setRenderTarget(i,5,r),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},Th=class extends Ji{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var dp="\\[\\]\\.:\\/",Yv=new RegExp("["+dp+"]","g"),fp="[^"+dp+"]",Jv="[^"+dp.replace("\\.","")+"]",jv=/((?:WC+[\/:])*)/.source.replace("WC",fp),Zv=/(WCOD+)?/.source.replace("WCOD",Jv),$v=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fp),Kv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fp),Qv=new RegExp("^"+jv+Zv+$v+Kv+"$"),tx=["material","materials","bones","map"],Of=class{constructor(t,e,i){let r=i||He.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,r)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},He=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Yv,"")}static parseTrackName(t){let e=Qv.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);tx.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},r=i(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)t[e++]=i[r]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,r=e.propertyName,s=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Vt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Xt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Xt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Xt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Xt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Xt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Xt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Xt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[r];if(a===void 0){let c=e.nodeName;Xt("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){Xt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Xt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};He.Composite=Of;He.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};He.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};He.prototype.GetterByBindingType=[He.prototype._getValue_direct,He.prototype._getValue_array,He.prototype._getValue_arrayElement,He.prototype._getValue_toArray];He.prototype.SetterByBindingTypeAndVersioning=[[He.prototype._setValue_direct,He.prototype._setValue_direct_setNeedsUpdate,He.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[He.prototype._setValue_array,He.prototype._setValue_array_setNeedsUpdate,He.prototype._setValue_array_setMatrixWorldNeedsUpdate],[He.prototype._setValue_arrayElement,He.prototype._setValue_arrayElement_setNeedsUpdate,He.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[He.prototype._setValue_fromArray,He.prototype._setValue_fromArray_setNeedsUpdate,He.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var _T=new Float32Array(1);var yp=class yp{constructor(t,e,i,r){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,r){let s=this.elements;return s[0]=t,s[2]=e,s[1]=i,s[3]=r,this}};yp.prototype.isMatrix2=!0;var Bf=yp;function pp(n,t,e,i){let r=ex(i);switch(e){case np:return n*t;case Dh:return n*t/r.components*r.byteLength;case Fh:return n*t/r.components*r.byteLength;case Vr:return n*t*2/r.components*r.byteLength;case Uh:return n*t*2/r.components*r.byteLength;case rp:return n*t*3/r.components*r.byteLength;case _n:return n*t*4/r.components*r.byteLength;case Oh:return n*t*4/r.components*r.byteLength;case il:case nl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case rl:case sl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case zh:case Hh:return Math.max(n,16)*Math.max(t,8)/4;case Bh:case kh:return Math.max(n,8)*Math.max(t,8)/2;case Vh:case Gh:case Xh:case qh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Wh:case al:case Yh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Jh:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case jh:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Zh:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case $h:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Kh:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Qh:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case tu:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case eu:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case iu:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case nu:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ru:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case su:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case au:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ou:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case lu:case cu:case hu:return Math.ceil(n/4)*Math.ceil(t/4)*16;case uu:case du:return Math.ceil(n/4)*Math.ceil(t/4)*8;case ol:case fu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ex(n){switch(n){case rn:case Qf:return{byteLength:1,components:1};case da:case tp:case Nn:return{byteLength:2,components:1};case Lh:case Nh:return{byteLength:2,components:4};case sn:case Ih:case mn:return{byteLength:4,components:1};case ep:case ip:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Vt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function jg(){let n=null,t=!1,e=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),e(s,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function ax(n){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let h=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){let m=d[u],w=d[f];w.start<=m.start+m.count+1?m.count=Math.max(m.count,w.start+w.count-m.start):(++u,d[u]=w)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){let w=d[f];n.bufferSubData(c,w.start*h.BYTES_PER_ELEMENT,h,w.start,w.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var ox=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,cx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ux=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,px=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,_x=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,vx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,bx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Sx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ex=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Rx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ax=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Cx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Px=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ix=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Lx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Nx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Fx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ux=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ox="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,kx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Hx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Vx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$x=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Qx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,tb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,eb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ib=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nb=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sb=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ab=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ob=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cb=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,hb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ub=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,db=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_b=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gb=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,xb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sb=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Mb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Eb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Tb=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Rb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ab=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Pb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ib=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Nb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Db=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ub=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Ob=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Wb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Xb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,qb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Yb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$b=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Kb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,eS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,iS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,nS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,aS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,oS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,pS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,mS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,_S=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,gS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,bS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,MS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ES=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,TS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,AS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,CS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,PS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,LS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,US=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,OS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,BS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:ox,alphahash_pars_fragment:lx,alphamap_fragment:cx,alphamap_pars_fragment:hx,alphatest_fragment:ux,alphatest_pars_fragment:dx,aomap_fragment:fx,aomap_pars_fragment:px,batching_pars_vertex:mx,batching_vertex:_x,begin_vertex:gx,beginnormal_vertex:wx,bsdfs:yx,iridescence_fragment:vx,bumpmap_pars_fragment:xx,clipping_planes_fragment:bx,clipping_planes_pars_fragment:Sx,clipping_planes_pars_vertex:Mx,clipping_planes_vertex:Ex,color_fragment:Tx,color_pars_fragment:Rx,color_pars_vertex:Ax,color_vertex:Cx,common:Px,cube_uv_reflection_fragment:Ix,defaultnormal_vertex:Lx,displacementmap_pars_vertex:Nx,displacementmap_vertex:Dx,emissivemap_fragment:Fx,emissivemap_pars_fragment:Ux,colorspace_fragment:Ox,colorspace_pars_fragment:Bx,envmap_fragment:zx,envmap_common_pars_fragment:kx,envmap_pars_fragment:Hx,envmap_pars_vertex:Vx,envmap_physical_pars_fragment:Qx,envmap_vertex:Gx,fog_vertex:Wx,fog_pars_vertex:Xx,fog_fragment:qx,fog_pars_fragment:Yx,gradientmap_pars_fragment:Jx,lightmap_pars_fragment:jx,lights_lambert_fragment:Zx,lights_lambert_pars_fragment:$x,lights_pars_begin:Kx,lights_toon_fragment:tb,lights_toon_pars_fragment:eb,lights_phong_fragment:ib,lights_phong_pars_fragment:nb,lights_physical_fragment:rb,lights_physical_pars_fragment:sb,lights_fragment_begin:ab,lights_fragment_maps:ob,lights_fragment_end:lb,lightprobes_pars_fragment:cb,logdepthbuf_fragment:hb,logdepthbuf_pars_fragment:ub,logdepthbuf_pars_vertex:db,logdepthbuf_vertex:fb,map_fragment:pb,map_pars_fragment:mb,map_particle_fragment:_b,map_particle_pars_fragment:gb,metalnessmap_fragment:wb,metalnessmap_pars_fragment:yb,morphinstance_vertex:vb,morphcolor_vertex:xb,morphnormal_vertex:bb,morphtarget_pars_vertex:Sb,morphtarget_vertex:Mb,normal_fragment_begin:Eb,normal_fragment_maps:Tb,normal_pars_fragment:Rb,normal_pars_vertex:Ab,normal_vertex:Cb,normalmap_pars_fragment:Pb,clearcoat_normal_fragment_begin:Ib,clearcoat_normal_fragment_maps:Lb,clearcoat_pars_fragment:Nb,iridescence_pars_fragment:Db,opaque_fragment:Fb,packing:Ub,premultiplied_alpha_fragment:Ob,project_vertex:Bb,dithering_fragment:zb,dithering_pars_fragment:kb,roughnessmap_fragment:Hb,roughnessmap_pars_fragment:Vb,shadowmap_pars_fragment:Gb,shadowmap_pars_vertex:Wb,shadowmap_vertex:Xb,shadowmask_pars_fragment:qb,skinbase_vertex:Yb,skinning_pars_vertex:Jb,skinning_vertex:jb,skinnormal_vertex:Zb,specularmap_fragment:$b,specularmap_pars_fragment:Kb,tonemapping_fragment:Qb,tonemapping_pars_fragment:tS,transmission_fragment:eS,transmission_pars_fragment:iS,uv_pars_fragment:nS,uv_pars_vertex:rS,uv_vertex:sS,worldpos_vertex:aS,background_vert:oS,background_frag:lS,backgroundCube_vert:cS,backgroundCube_frag:hS,cube_vert:uS,cube_frag:dS,depth_vert:fS,depth_frag:pS,distance_vert:mS,distance_frag:_S,equirect_vert:gS,equirect_frag:wS,linedashed_vert:yS,linedashed_frag:vS,meshbasic_vert:xS,meshbasic_frag:bS,meshlambert_vert:SS,meshlambert_frag:MS,meshmatcap_vert:ES,meshmatcap_frag:TS,meshnormal_vert:RS,meshnormal_frag:AS,meshphong_vert:CS,meshphong_frag:PS,meshphysical_vert:IS,meshphysical_frag:LS,meshtoon_vert:NS,meshtoon_frag:DS,points_vert:FS,points_frag:US,shadow_vert:OS,shadow_frag:BS,sprite_vert:zS,sprite_frag:kS},vt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new A},probesMax:{value:new A},probesResolution:{value:new A}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},cr={basic:{uniforms:Ui([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:Ui([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new qt(0)},envMapIntensity:{value:1}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:Ui([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:Ui([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:Ui([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new qt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:Ui([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:Ui([vt.points,vt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:Ui([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:Ui([vt.common,vt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:Ui([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:Ui([vt.sprite,vt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distance:{uniforms:Ui([vt.common,vt.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distance_vert,fragmentShader:$t.distance_frag},shadow:{uniforms:Ui([vt.lights,vt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};cr.physical={uniforms:Ui([cr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};var _u={r:0,b:0,g:0},HS=new he,Zg=new Yt;Zg.set(-1,0,0,0,1,0,0,0,1);function VS(n,t,e,i,r,s){let a=new qt(0),o=r===!0?0:1,l,c,h=null,d=0,u=null;function f(b){let T=b.isScene===!0?b.background:null;if(T&&T.isTexture){let v=b.backgroundBlurriness>0;T=t.get(T,v)}return T}function m(b){let T=!1,v=f(b);v===null?g(a,o):v&&v.isColor&&(g(v,1),T=!0);let E=n.xr.getEnvironmentBlendMode();E==="additive"?e.buffers.color.setClear(0,0,0,1,s):E==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,s),(n.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function w(b,T){let v=f(T);v&&(v.isCubeTexture||v.mapping===tl)?(c===void 0&&(c=new Bt(new Pn(1,1,1),new ge({name:"BackgroundCubeMaterial",uniforms:hs(cr.backgroundCube.uniforms),vertexShader:cr.backgroundCube.vertexShader,fragmentShader:cr.backgroundCube.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,R,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(HS.makeRotationFromEuler(T.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Zg),c.material.toneMapped=ne.getTransfer(v.colorSpace)!==be,(h!==v||d!==v.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Bt(new ii(2,2),new ge({name:"BackgroundMaterial",uniforms:hs(cr.background.uniforms),vertexShader:cr.background.vertexShader,fragmentShader:cr.background.fragmentShader,side:zr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=ne.getTransfer(v.colorSpace)!==be,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=n.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function g(b,T){b.getRGB(_u,up(n)),e.buffers.color.setClear(_u.r,_u.g,_u.b,T,s)}function _(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,T=1){a.set(b),o=T,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,g(a,o)},render:m,addToRenderList:w,dispose:_}}function GS(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null),s=r,a=!1;function o(U,z,W,N,H){let j=!1,Z=d(U,N,W,z);s!==Z&&(s=Z,c(s.object)),j=f(U,N,W,H),j&&m(U,N,W,H),H!==null&&t.update(H,n.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,v(U,z,W,N),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return n.createVertexArray()}function c(U){return n.bindVertexArray(U)}function h(U){return n.deleteVertexArray(U)}function d(U,z,W,N){let H=N.wireframe===!0,j=i[z.id];j===void 0&&(j={},i[z.id]=j);let Z=U.isInstancedMesh===!0?U.id:0,ot=j[Z];ot===void 0&&(ot={},j[Z]=ot);let K=ot[W.id];K===void 0&&(K={},ot[W.id]=K);let rt=K[H];return rt===void 0&&(rt=u(l()),K[H]=rt),rt}function u(U){let z=[],W=[],N=[];for(let H=0;H<e;H++)z[H]=0,W[H]=0,N[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:W,attributeDivisors:N,object:U,attributes:{},index:null}}function f(U,z,W,N){let H=s.attributes,j=z.attributes,Z=0,ot=W.getAttributes();for(let K in ot)if(ot[K].location>=0){let at=H[K],Ht=j[K];if(Ht===void 0&&(K==="instanceMatrix"&&U.instanceMatrix&&(Ht=U.instanceMatrix),K==="instanceColor"&&U.instanceColor&&(Ht=U.instanceColor)),at===void 0||at.attribute!==Ht||Ht&&at.data!==Ht.data)return!0;Z++}return s.attributesNum!==Z||s.index!==N}function m(U,z,W,N){let H={},j=z.attributes,Z=0,ot=W.getAttributes();for(let K in ot)if(ot[K].location>=0){let at=j[K];at===void 0&&(K==="instanceMatrix"&&U.instanceMatrix&&(at=U.instanceMatrix),K==="instanceColor"&&U.instanceColor&&(at=U.instanceColor));let Ht={};Ht.attribute=at,at&&at.data&&(Ht.data=at.data),H[K]=Ht,Z++}s.attributes=H,s.attributesNum=Z,s.index=N}function w(){let U=s.newAttributes;for(let z=0,W=U.length;z<W;z++)U[z]=0}function g(U){_(U,0)}function _(U,z){let W=s.newAttributes,N=s.enabledAttributes,H=s.attributeDivisors;W[U]=1,N[U]===0&&(n.enableVertexAttribArray(U),N[U]=1),H[U]!==z&&(n.vertexAttribDivisor(U,z),H[U]=z)}function b(){let U=s.newAttributes,z=s.enabledAttributes;for(let W=0,N=z.length;W<N;W++)z[W]!==U[W]&&(n.disableVertexAttribArray(W),z[W]=0)}function T(U,z,W,N,H,j,Z){Z===!0?n.vertexAttribIPointer(U,z,W,H,j):n.vertexAttribPointer(U,z,W,N,H,j)}function v(U,z,W,N){w();let H=N.attributes,j=W.getAttributes(),Z=z.defaultAttributeValues;for(let ot in j){let K=j[ot];if(K.location>=0){let rt=H[ot];if(rt===void 0&&(ot==="instanceMatrix"&&U.instanceMatrix&&(rt=U.instanceMatrix),ot==="instanceColor"&&U.instanceColor&&(rt=U.instanceColor)),rt!==void 0){let at=rt.normalized,Ht=rt.itemSize,Ut=t.get(rt);if(Ut===void 0)continue;let De=Ut.buffer,ce=Ut.type,me=Ut.bytesPerElement,Q=ce===n.INT||ce===n.UNSIGNED_INT||rt.gpuType===Ih;if(rt.isInterleavedBufferAttribute){let nt=rt.data,Rt=nt.stride,Jt=rt.offset;if(nt.isInstancedInterleavedBuffer){for(let Et=0;Et<K.locationSize;Et++)_(K.location+Et,nt.meshPerAttribute);U.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let Et=0;Et<K.locationSize;Et++)g(K.location+Et);n.bindBuffer(n.ARRAY_BUFFER,De);for(let Et=0;Et<K.locationSize;Et++)T(K.location+Et,Ht/K.locationSize,ce,at,Rt*me,(Jt+Ht/K.locationSize*Et)*me,Q)}else{if(rt.isInstancedBufferAttribute){for(let nt=0;nt<K.locationSize;nt++)_(K.location+nt,rt.meshPerAttribute);U.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let nt=0;nt<K.locationSize;nt++)g(K.location+nt);n.bindBuffer(n.ARRAY_BUFFER,De);for(let nt=0;nt<K.locationSize;nt++)T(K.location+nt,Ht/K.locationSize,ce,at,Ht*me,Ht/K.locationSize*nt*me,Q)}}else if(Z!==void 0){let at=Z[ot];if(at!==void 0)switch(at.length){case 2:n.vertexAttrib2fv(K.location,at);break;case 3:n.vertexAttrib3fv(K.location,at);break;case 4:n.vertexAttrib4fv(K.location,at);break;default:n.vertexAttrib1fv(K.location,at)}}}}b()}function E(){S();for(let U in i){let z=i[U];for(let W in z){let N=z[W];for(let H in N){let j=N[H];for(let Z in j)h(j[Z].object),delete j[Z];delete N[H]}}delete i[U]}}function R(U){if(i[U.id]===void 0)return;let z=i[U.id];for(let W in z){let N=z[W];for(let H in N){let j=N[H];for(let Z in j)h(j[Z].object),delete j[Z];delete N[H]}}delete i[U.id]}function I(U){for(let z in i){let W=i[z];for(let N in W){let H=W[N];if(H[U.id]===void 0)continue;let j=H[U.id];for(let Z in j)h(j[Z].object),delete j[Z];delete H[U.id]}}}function x(U){for(let z in i){let W=i[z],N=U.isInstancedMesh===!0?U.id:0,H=W[N];if(H!==void 0){for(let j in H){let Z=H[j];for(let ot in Z)h(Z[ot].object),delete Z[ot];delete H[j]}delete W[N],Object.keys(W).length===0&&delete i[z]}}}function S(){L(),a=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:S,resetDefaultState:L,dispose:E,releaseStatesOfGeometry:R,releaseStatesOfObject:x,releaseStatesOfProgram:I,initAttributes:w,enableAttribute:g,disableUnusedAttributes:b}}function WS(n,t,e){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function XS(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){let I=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(I){return!(I!==_n&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){let x=I===Nn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==rn&&I!==mn&&!x&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Vt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Vt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),R=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:w,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:v,maxSamples:E,samples:R}}function qS(n){let t=this,e=null,i=0,r=!1,s=!1,a=new Tn,o=new Yt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||r;return r=u,i=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let m=d.clippingPlanes,w=d.clipIntersection,g=d.clipShadows,_=n.get(d);if(!r||m===null||m.length===0||s&&!g)s?h(null):c();else{let b=s?0:i,T=b*4,v=_.clippingState||null;l.value=v,v=h(m,u,T,f);for(let E=0;E!==T;++E)v[E]=e[E];_.clippingState=v,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,m){let w=d!==null?d.length:0,g=null;if(w!==0){if(g=l.value,m!==!0||g===null){let _=f+w*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(g===null||g.length<_)&&(g=new Float32Array(_));for(let T=0,v=f;T!==w;++T,v+=4)a.copy(d[T]).applyMatrix4(b,o),a.normal.toArray(g,v),g[v+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,g}}var ma=4,YS=6,JS=20,jS=256,ll=new In,Ag=new qt,vp=null,xp=0,bp=0,Sp=!1,ZS=new A,us=new A,wu=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,r=100,s={}){let{size:a=256,position:o=ZS}=s;vp=this._renderer.getRenderTarget(),xp=this._renderer.getActiveCubeFace(),bp=this._renderer.getActiveMipmapLevel(),Sp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ig(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(vp,xp,bp),this._renderer.xr.enabled=Sp,t.scissorTest=!1,pa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===kr||t.mapping===cs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),vp=this._renderer.getRenderTarget(),xp=this._renderer.getActiveCubeFace(),bp=this._renderer.getActiveMipmapLevel(),Sp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ai,minFilter:ai,generateMipmaps:!1,type:Nn,format:_n,colorSpace:rs,depthBuffer:!1},r=Cg(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cg(t,e,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=$S(s)),this._blurMaterial=QS(s,t,e),this._ggxMaterial=KS(s,t,e)}return r}_compileMaterial(t){let e=new Bt(new _e,t);this._renderer.compile(e,ll)}_sceneToCubeUV(t,e,i,r,s){let l=new Ji(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Ag),d.toneMapping=Ln,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Bt(new Pn,new Be({name:"PMREM.Background",side:Ri,depthWrite:!1,depthTest:!1})));let w=this._backgroundBox,g=w.material,_=!1,b=t.background;b?b.isColor&&(g.color.copy(b),t.background=null,_=!0):(g.color.copy(Ag),_=!0);for(let T=0;T<6;T++){let v=T%3;v===0?(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[T],s.y,s.z)):v===1?(l.up.set(0,0,c[T]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[T],s.z)):(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[T]));let E=this._cubeSize;pa(r,v*E,T>2?E:0,E,E),d.setRenderTarget(r),_&&d.render(w,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=b}_textureToCubeUV(t,e){let i=this._renderer,r=t.mapping===kr||t.mapping===cs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ig()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pg());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=t;let l=this._cubeSize;pa(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,ll)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=i}_applyGGXFilter(t,e,i){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:m}=this,w=this._sizeLods[i],g=3*w*(i>m-ma?i-m+ma:0),_=4*(this._cubeSize-w);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=m-e,pa(s,g,_,3*w,2*w),r.setRenderTarget(s),r.render(o,ll),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-i,pa(t,g,_,3*w,2*w),r.setRenderTarget(t),r.render(o,ll)}_blur(t,e,i,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(t,s,e,i,a),this._blurPass(s,t,i,i,a)}_blurPass(t,e,i,r,s){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[r],d=3*h*(r>this._lodMax-ma?r-this._lodMax+ma:0),u=4*(this._cubeSize-h);pa(e,d,u,3*h,2*h),a.setRenderTarget(e),a.render(l,ll)}};function $S(n){let t=[],e=[],i=n,r=n-ma+1+YS;for(let s=0;s<r;s++){let a=Math.pow(2,i);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,m=new Float32Array(f*u*d),w=new Float32Array(f*u*d);for(let _=0;_<d;_++){let b=_%3*2/3-1,T=_>2?0:-1,v=[b,T,0,b+2/3,T,0,b+2/3,T+1,0,b,T,0,b+2/3,T+1,0,b,T+1,0];m.set(v,f*u*_);for(let E=0;E<u;E++){let R=h[E*2]*2-1,I=h[E*2+1]*2-1;_===0?us.set(1,I,R):_===1?us.set(-R,1,-I):_===2?us.set(-R,I,1):_===3?us.set(-1,I,-R):_===4?us.set(-R,-1,I):us.set(R,I,-1),us.toArray(w,(_*u+E)*f)}}let g=new _e;g.setAttribute("position",new ui(m,f)),g.setAttribute("outputDirection",new ui(w,f)),e.push(new Bt(g,null)),i>ma&&i--}return{lodMeshes:e,sizeLods:t}}function Cg(n,t,e){let i=new Fi(n,t,e);return i.texture.mapping=tl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function pa(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function KS(n,t,e){return new ge({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:jS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function QS(n,t,e){return new ge({name:"SphericalGaussianBlur",defines:{SAMPLES:JS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:xu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function Pg(){return new ge({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function Ig(){return new ge({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function xu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var yu=class extends Fi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Bo(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Pn(5,5,5),s=new ge({name:"CubemapFromEquirect",uniforms:hs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ri,blending:ar});s.uniforms.tEquirect.value=e;let a=new Bt(r,s),o=e.minFilter;return e.minFilter===or&&(e.minFilter=ai),new Eh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){let s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,r);t.setRenderTarget(s)}};function tM(n){let t=new WeakMap,e=new WeakMap,i=null;function r(u,f=!1){return u==null?null:f?a(u):s(u)}function s(u){if(u&&u.isTexture){let f=u.mapping;if(f===Ah||f===Ch)if(t.has(u)){let m=t.get(u).texture;return o(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let w=new yu(m.height);return w.fromEquirectangularTexture(n,u),t.set(u,w),u.addEventListener("dispose",c),o(w.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,m=f===Ah||f===Ch,w=f===kr||f===cs;if(m||w){let g=e.get(u),_=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==_)return i===null&&(i=new wu(n)),g=m?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{let b=u.image;return m&&b&&b.height>0||w&&b&&l(b)?(i===null&&(i=new wu(n)),g=m?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,f){return f===Ah?u.mapping=kr:f===Ch&&(u.mapping=cs),u}function l(u){let f=0,m=6;for(let w=0;w<m;w++)u[w]!==void 0&&f++;return f===m}function c(u){let f=u.target;f.removeEventListener("dispose",c);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function d(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function eM(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let r=n.getExtension(i);return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let r=e(i);return r===null&&ns("WebGLRenderer: "+i+" extension not supported."),r}}}function iM(n,t,e,i){let r={},s=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let m in u.attributes)t.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete r[u.id];let f=s.get(u);f&&(t.remove(f),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],n.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,m=d.attributes.position,w=0;if(m===void 0)return;if(f!==null){let b=f.array;w=f.version;for(let T=0,v=b.length;T<v;T+=3){let E=b[T+0],R=b[T+1],I=b[T+2];u.push(E,R,R,I,I,E)}}else{let b=m.array;w=m.version;for(let T=0,v=b.length/3-1;T<v;T+=3){let E=T+0,R=T+1,I=T+2;u.push(E,R,R,I,I,E)}}let g=new(m.count>=65535?Io:Po)(u,1);g.version=w;let _=s.get(d);_&&t.remove(_),s.set(d,g)}function h(d){let u=s.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function nM(n,t,e){let i;function r(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,u){n.drawElements(i,u,s,d*a),e.update(u,i,1)}function c(d,u,f){f!==0&&(n.drawElementsInstanced(i,u,s,d*a,f),e.update(u,i,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,d,0,f);let w=0;for(let g=0;g<f;g++)w+=u[g];e.update(w,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function rM(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(s/3);break;case n.LINES:e.lines+=o*(s/2);break;case n.LINE_STRIP:e.lines+=o*(s-1);break;case n.LINE_LOOP:e.lines+=o*s;break;case n.POINTS:e.points+=o*s;break;default:Xt("WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function sM(n,t,e){let i=new WeakMap,r=new Ie;function s(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==d){let S=function(){I.dispose(),i.delete(o),o.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,w=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],T=0;f===!0&&(T=1),m===!0&&(T=2),w===!0&&(T=3);let v=o.attributes.position.count*T,E=1;v>t.maxTextureSize&&(E=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let R=new Float32Array(v*E*4*d),I=new Ao(R,v,E,d);I.type=mn,I.needsUpdate=!0;let x=T*4;for(let L=0;L<d;L++){let U=g[L],z=_[L],W=b[L],N=v*E*4*L;for(let H=0;H<U.count;H++){let j=H*x;f===!0&&(r.fromBufferAttribute(U,H),R[N+j+0]=r.x,R[N+j+1]=r.y,R[N+j+2]=r.z,R[N+j+3]=0),m===!0&&(r.fromBufferAttribute(z,H),R[N+j+4]=r.x,R[N+j+5]=r.y,R[N+j+6]=r.z,R[N+j+7]=0),w===!0&&(r.fromBufferAttribute(W,H),R[N+j+8]=r.x,R[N+j+9]=r.y,R[N+j+10]=r.z,R[N+j+11]=W.itemSize===4?r.w:1)}}u={count:d,texture:I,size:new ct(v,E)},i.set(o,u),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let f=0;for(let w=0;w<c.length;w++)f+=c[w];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function aM(n,t,e,i,r){let s=new WeakMap;function a(c){let h=r.render.frame,d=c.geometry,u=t.get(c,d);if(s.get(u)!==h&&(t.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function o(){s=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var oM={[Xf]:"LINEAR_TONE_MAPPING",[qf]:"REINHARD_TONE_MAPPING",[Yf]:"CINEON_TONE_MAPPING",[Jf]:"ACES_FILMIC_TONE_MAPPING",[Zf]:"AGX_TONE_MAPPING",[$f]:"NEUTRAL_TONE_MAPPING",[jf]:"CUSTOM_TONE_MAPPING"};function lM(n,t,e,i,r,s){let a=new Fi(t,e,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new _e;c.setAttribute("position",new jt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new jt([0,2,0,0,2,0],2));let h=new fh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Bt(c,h),u=new In(-1,1,1,-1,0,1),f=null,m=null,w=!1,g,_=null,b=[],T=!1;this.setSize=function(v,E){a.setSize(v,E),o!==null&&o.setSize(v,E),l!==null&&l.setSize(v,E);for(let R=0;R<b.length;R++){let I=b[R];I.setSize&&I.setSize(v,E)}},this.setEffects=function(v){b=v,T=b.length>0&&b[0].isRenderPass===!0;let E=a.width,R=a.height;b.length>0&&o===null&&(o=new Fi(E,R,{type:Nn,depthBuffer:!1,stencilBuffer:!1}),l=new Fi(E,R,{type:Nn,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<b.length;I++){let x=b[I];x.setSize&&x.setSize(E,R)}},this.begin=function(v,E){if(w||v.toneMapping===Ln&&b.length===0)return!1;if(_=E,E!==null){let R=E.width,I=E.height;(a.width!==R||a.height!==I)&&this.setSize(R,I)}return T===!1&&v.setRenderTarget(a),g=v.toneMapping,v.toneMapping=Ln,!0},this.hasRenderPass=function(){return T},this.end=function(v,E){v.toneMapping=g,w=!0;let R=a,I=o;for(let x=0;x<b.length;x++){let S=b[x];S.enabled!==!1&&(S.render(v,I,R,E),S.needsSwap!==!1&&(R=I,I=I===o?l:o))}if(f!==v.outputColorSpace||m!==v.toneMapping){f=v.outputColorSpace,m=v.toneMapping,h.defines={},ne.getTransfer(f)===be&&(h.defines.SRGB_TRANSFER="");let x=oM[m];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=R.texture,v.setRenderTarget(_),v.render(d,u),_=null,w=!1},this.isCompositing=function(){return w},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var $g=new Ei,Tp=new rr(1,1),Kg=new Ao,Qg=new eh,t0=new Bo,Lg=[],Ng=[],Dg=new Float32Array(16),Fg=new Float32Array(9),Ug=new Float32Array(4);function ga(n,t,e){let i=n[0];if(i<=0||i>0)return n;let r=t*e,s=Lg[r];if(s===void 0&&(s=new Float32Array(r),Lg[r]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(s,o)}return s}function mi(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function _i(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function bu(n,t){let e=Ng[t];e===void 0&&(e=new Int32Array(t),Ng[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function cM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function hM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(mi(e,t))return;n.uniform2fv(this.addr,t),_i(e,t)}}function uM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(mi(e,t))return;n.uniform3fv(this.addr,t),_i(e,t)}}function dM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(mi(e,t))return;n.uniform4fv(this.addr,t),_i(e,t)}}function fM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(mi(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),_i(e,t)}else{if(mi(e,i))return;Ug.set(i),n.uniformMatrix2fv(this.addr,!1,Ug),_i(e,i)}}function pM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(mi(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),_i(e,t)}else{if(mi(e,i))return;Fg.set(i),n.uniformMatrix3fv(this.addr,!1,Fg),_i(e,i)}}function mM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(mi(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),_i(e,t)}else{if(mi(e,i))return;Dg.set(i),n.uniformMatrix4fv(this.addr,!1,Dg),_i(e,i)}}function _M(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function gM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(mi(e,t))return;n.uniform2iv(this.addr,t),_i(e,t)}}function wM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(mi(e,t))return;n.uniform3iv(this.addr,t),_i(e,t)}}function yM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(mi(e,t))return;n.uniform4iv(this.addr,t),_i(e,t)}}function vM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function xM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(mi(e,t))return;n.uniform2uiv(this.addr,t),_i(e,t)}}function bM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(mi(e,t))return;n.uniform3uiv(this.addr,t),_i(e,t)}}function SM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(mi(e,t))return;n.uniform4uiv(this.addr,t),_i(e,t)}}function MM(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Tp.compareFunction=e.isReversedDepthBuffer()?mu:pu,s=Tp):s=$g,e.setTexture2D(t||s,r)}function EM(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Qg,r)}function TM(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||t0,r)}function RM(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Kg,r)}function AM(n){switch(n){case 5126:return cM;case 35664:return hM;case 35665:return uM;case 35666:return dM;case 35674:return fM;case 35675:return pM;case 35676:return mM;case 5124:case 35670:return _M;case 35667:case 35671:return gM;case 35668:case 35672:return wM;case 35669:case 35673:return yM;case 5125:return vM;case 36294:return xM;case 36295:return bM;case 36296:return SM;case 35678:case 36198:case 36298:case 36306:case 35682:return MM;case 35679:case 36299:case 36307:return EM;case 35680:case 36300:case 36308:case 36293:return TM;case 36289:case 36303:case 36311:case 36292:return RM}}function CM(n,t){n.uniform1fv(this.addr,t)}function PM(n,t){let e=ga(t,this.size,2);n.uniform2fv(this.addr,e)}function IM(n,t){let e=ga(t,this.size,3);n.uniform3fv(this.addr,e)}function LM(n,t){let e=ga(t,this.size,4);n.uniform4fv(this.addr,e)}function NM(n,t){let e=ga(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function DM(n,t){let e=ga(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function FM(n,t){let e=ga(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function UM(n,t){n.uniform1iv(this.addr,t)}function OM(n,t){n.uniform2iv(this.addr,t)}function BM(n,t){n.uniform3iv(this.addr,t)}function zM(n,t){n.uniform4iv(this.addr,t)}function kM(n,t){n.uniform1uiv(this.addr,t)}function HM(n,t){n.uniform2uiv(this.addr,t)}function VM(n,t){n.uniform3uiv(this.addr,t)}function GM(n,t){n.uniform4uiv(this.addr,t)}function WM(n,t,e){let i=this.cache,r=t.length,s=bu(e,r);mi(i,s)||(n.uniform1iv(this.addr,s),_i(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Tp:a=$g;for(let o=0;o!==r;++o)e.setTexture2D(t[o]||a,s[o])}function XM(n,t,e){let i=this.cache,r=t.length,s=bu(e,r);mi(i,s)||(n.uniform1iv(this.addr,s),_i(i,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||Qg,s[a])}function qM(n,t,e){let i=this.cache,r=t.length,s=bu(e,r);mi(i,s)||(n.uniform1iv(this.addr,s),_i(i,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||t0,s[a])}function YM(n,t,e){let i=this.cache,r=t.length,s=bu(e,r);mi(i,s)||(n.uniform1iv(this.addr,s),_i(i,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||Kg,s[a])}function JM(n){switch(n){case 5126:return CM;case 35664:return PM;case 35665:return IM;case 35666:return LM;case 35674:return NM;case 35675:return DM;case 35676:return FM;case 5124:case 35670:return UM;case 35667:case 35671:return OM;case 35668:case 35672:return BM;case 35669:case 35673:return zM;case 5125:return kM;case 36294:return HM;case 36295:return VM;case 36296:return GM;case 35678:case 36198:case 36298:case 36306:case 35682:return WM;case 35679:case 36299:case 36307:return XM;case 35680:case 36300:case 36308:case 36293:return qM;case 36289:case 36303:case 36311:case 36292:return YM}}var Rp=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=AM(e.type)}},Ap=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=JM(e.type)}},Cp=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(t,e[o.id],i)}}},Mp=/(\w+)(\])?(\[|\.)?/g;function Og(n,t){n.seq.push(t),n.map[t.id]=t}function jM(n,t,e){let i=n.name,r=i.length;for(Mp.lastIndex=0;;){let s=Mp.exec(i),a=Mp.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Og(e,c===void 0?new Rp(o,n,t):new Ap(o,n,t));break}else{let d=e.map[o];d===void 0&&(d=new Cp(o),Og(e,d)),e=d}}}var _a=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);jM(o,l,this)}let r=[],s=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(t,e,i,r){let s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){let r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,a=e.length;s!==a;++s){let o=e[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){let i=[];for(let r=0,s=t.length;r!==s;++r){let a=t[r];a.id in e&&i.push(a)}return i}};function Bg(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var ZM=37297,$M=0;function KM(n,t){let e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var zg=new Yt;function QM(n){ne._getMatrix(zg,ne.workingColorSpace,n);let t=`mat3( ${zg.elements.map(e=>e.toFixed(4))} )`;switch(ne.getTransfer(n)){case Mo:return[t,"LinearTransferOETF"];case be:return[t,"sRGBTransferOETF"];default:return Vt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function kg(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=(n.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+KM(n.getShaderSource(t),o)}else return s}function t1(n,t){let e=QM(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var e1={[Xf]:"Linear",[qf]:"Reinhard",[Yf]:"Cineon",[Jf]:"ACESFilmic",[Zf]:"AgX",[$f]:"Neutral",[jf]:"Custom"};function i1(n,t){let e=e1[t];return e===void 0?(Vt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var gu=new A;function n1(){ne.getLuminanceCoefficients(gu);let n=gu.x.toFixed(4),t=gu.y.toFixed(4),e=gu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function r1(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hl).join(`
`)}function s1(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function a1(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(t,r),a=s.name,o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function hl(n){return n!==""}function Hg(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Vg(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var o1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pp(n){return n.replace(o1,c1)}var l1=new Map;function c1(n,t){let e=$t[t];if(e===void 0){let i=l1.get(t);if(i!==void 0)e=$t[i],Vt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Pp(e)}var h1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gg(n){return n.replace(h1,u1)}function u1(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Wg(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var d1={[Ko]:"SHADOWMAP_TYPE_PCF",[ha]:"SHADOWMAP_TYPE_VSM"};function f1(n){return d1[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var p1={[kr]:"ENVMAP_TYPE_CUBE",[cs]:"ENVMAP_TYPE_CUBE",[tl]:"ENVMAP_TYPE_CUBE_UV"};function m1(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":p1[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var _1={[cs]:"ENVMAP_MODE_REFRACTION"};function g1(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":_1[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var w1={[Wf]:"ENVMAP_BLENDING_MULTIPLY",[ng]:"ENVMAP_BLENDING_MIX",[rg]:"ENVMAP_BLENDING_ADD"};function y1(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":w1[n.combine]||"ENVMAP_BLENDING_NONE"}function v1(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function x1(n,t,e,i){let r=n.getContext(),s=e.defines,a=e.vertexShader,o=e.fragmentShader,l=f1(e),c=m1(e),h=g1(e),d=y1(e),u=v1(e),f=r1(e),m=s1(s),w=r.createProgram(),g,_,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(hl).join(`
`),g.length>0&&(g+=`
`),_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(hl).join(`
`),_.length>0&&(_+=`
`)):(g=[Wg(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hl).join(`
`),_=[Wg(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ln?"#define TONE_MAPPING":"",e.toneMapping!==Ln?$t.tonemapping_pars_fragment:"",e.toneMapping!==Ln?i1("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,t1("linearToOutputTexel",e.outputColorSpace),n1(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(hl).join(`
`)),a=Pp(a),a=Hg(a,e),a=Vg(a,e),o=Pp(o),o=Hg(o,e),o=Vg(o,e),a=Gg(a),o=Gg(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,_=["#define varying in",e.glslVersion===op?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===op?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let T=b+g+a,v=b+_+o,E=Bg(r,r.VERTEX_SHADER,T),R=Bg(r,r.FRAGMENT_SHADER,v);r.attachShader(w,E),r.attachShader(w,R),e.index0AttributeName!==void 0?r.bindAttribLocation(w,0,e.index0AttributeName):e.hasPositionAttribute===!0&&r.bindAttribLocation(w,0,"position"),r.linkProgram(w);function I(U){if(n.debug.checkShaderErrors){let z=r.getProgramInfoLog(w)||"",W=r.getShaderInfoLog(E)||"",N=r.getShaderInfoLog(R)||"",H=z.trim(),j=W.trim(),Z=N.trim(),ot=!0,K=!0;if(r.getProgramParameter(w,r.LINK_STATUS)===!1)if(ot=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,w,E,R);else{let rt=kg(r,E,"vertex"),at=kg(r,R,"fragment");Xt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(w,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+H+`
`+rt+`
`+at)}else H!==""?Vt("WebGLProgram: Program Info Log:",H):(j===""||Z==="")&&(K=!1);K&&(U.diagnostics={runnable:ot,programLog:H,vertexShader:{log:j,prefix:g},fragmentShader:{log:Z,prefix:_}})}r.deleteShader(E),r.deleteShader(R),x=new _a(r,w),S=a1(r,w)}let x;this.getUniforms=function(){return x===void 0&&I(this),x};let S;this.getAttributes=function(){return S===void 0&&I(this),S};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(w,ZM)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(w),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=$M++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=E,this.fragmentShader=R,this}var b1=0,Ip=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let r=this._getShaderCacheForMaterial(t);return r.has(e)===!1&&(r.add(e),e.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Lp(t),e.set(t,i)),i}},Lp=class{constructor(t){this.id=b1++,this.code=t,this.usedTimes=0}};function S1(n){return n===Vr||n===al||n===ol}function M1(n,t,e,i,r,s){let a=new Co,o=new Ip,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function w(x,S,L,U,z,W){let N=U.fog,H=z.geometry,j=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?U.environment:null,Z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ot=t.get(x.envMap||j,Z),K=ot&&ot.mapping===tl?ot.image.height:null,rt=f[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Vt("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let at=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ht=at!==void 0?at.length:0,Ut=0;H.morphAttributes.position!==void 0&&(Ut=1),H.morphAttributes.normal!==void 0&&(Ut=2),H.morphAttributes.color!==void 0&&(Ut=3);let De,ce,me,Q;if(rt){let Ue=cr[rt];De=Ue.vertexShader,ce=Ue.fragmentShader}else{De=x.vertexShader,ce=x.fragmentShader;let Ue=o.getVertexShaderStage(x),ve=o.getFragmentShaderStage(x);o.update(x,Ue,ve),me=Ue.id,Q=ve.id}let nt=n.getRenderTarget(),Rt=n.state.buffers.depth.getReversed(),Jt=z.isInstancedMesh===!0,Et=z.isBatchedMesh===!0,ie=!!x.map,pi=!!x.matcap,ae=!!ot,fe=!!x.aoMap,Fe=!!x.lightMap,le=!!x.bumpMap&&x.wireframe===!1,Je=!!x.normalMap,wi=!!x.displacementMap,Yi=!!x.emissiveMap,Ze=!!x.metalnessMap,li=!!x.roughnessMap,B=x.anisotropy>0,Ii=x.clearcoat>0,Te=x.dispersion>0,C=x.retroreflectivity>0,y=x.iridescence>0,k=x.sheen>0,X=x.transmission>0,$=B&&!!x.anisotropyMap,ut=Ii&&!!x.clearcoatMap,pt=Ii&&!!x.clearcoatNormalMap,tt=Ii&&!!x.clearcoatRoughnessMap,it=y&&!!x.iridescenceMap,mt=y&&!!x.iridescenceThicknessMap,Dt=k&&!!x.sheenColorMap,yt=k&&!!x.sheenRoughnessMap,_t=!!x.specularMap,Ft=!!x.specularColorMap,Gt=!!x.specularIntensityMap,Zt=X&&!!x.transmissionMap,O=X&&!!x.thicknessMap,gt=!!x.gradientMap,et=!!x.alphaMap,wt=x.alphaTest>0,St=!!x.alphaHash,st=!!x.extensions,Ot=Ln;x.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Ot=n.toneMapping);let It={shaderID:rt,shaderType:x.type,shaderName:x.name,vertexShader:De,fragmentShader:ce,defines:x.defines,customVertexShaderID:me,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:Et,batchingColor:Et&&z._colorsTexture!==null,instancing:Jt,instancingColor:Jt&&z.instanceColor!==null,instancingMorph:Jt&&z.morphTexture!==null,outputColorSpace:nt===null?n.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:ne.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ie,matcap:pi,envMap:ae,envMapMode:ae&&ot.mapping,envMapCubeUVHeight:K,aoMap:fe,lightMap:Fe,bumpMap:le,normalMap:Je,displacementMap:wi,emissiveMap:Yi,normalMapObjectSpace:Je&&x.normalMapType===og,normalMapTangentSpace:Je&&x.normalMapType===sp,packedNormalMap:Je&&x.normalMapType===sp&&S1(x.normalMap.format),metalnessMap:Ze,roughnessMap:li,anisotropy:B,anisotropyMap:$,clearcoat:Ii,clearcoatMap:ut,clearcoatNormalMap:pt,clearcoatRoughnessMap:tt,dispersion:Te,retroreflection:C,iridescence:y,iridescenceMap:it,iridescenceThicknessMap:mt,sheen:k,sheenColorMap:Dt,sheenRoughnessMap:yt,specularMap:_t,specularColorMap:Ft,specularIntensityMap:Gt,transmission:X,transmissionMap:Zt,thicknessMap:O,gradientMap:gt,opaque:x.transparent===!1&&x.blending===ua&&x.alphaToCoverage===!1,alphaMap:et,alphaTest:wt,alphaHash:St,combine:x.combine,mapUv:ie&&m(x.map.channel),aoMapUv:fe&&m(x.aoMap.channel),lightMapUv:Fe&&m(x.lightMap.channel),bumpMapUv:le&&m(x.bumpMap.channel),normalMapUv:Je&&m(x.normalMap.channel),displacementMapUv:wi&&m(x.displacementMap.channel),emissiveMapUv:Yi&&m(x.emissiveMap.channel),metalnessMapUv:Ze&&m(x.metalnessMap.channel),roughnessMapUv:li&&m(x.roughnessMap.channel),anisotropyMapUv:$&&m(x.anisotropyMap.channel),clearcoatMapUv:ut&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:pt&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:it&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:yt&&m(x.sheenRoughnessMap.channel),specularMapUv:_t&&m(x.specularMap.channel),specularColorMapUv:Ft&&m(x.specularColorMap.channel),specularIntensityMapUv:Gt&&m(x.specularIntensityMap.channel),transmissionMapUv:Zt&&m(x.transmissionMap.channel),thicknessMapUv:O&&m(x.thicknessMap.channel),alphaMapUv:et&&m(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Je||B),vertexNormals:!!H.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!H.attributes.uv&&(ie||et),fog:!!N,useFog:x.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||H.attributes.normal===void 0&&Je===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Rt,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Ht,morphTextureStride:Ut,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ot,decodeVideoTexture:ie&&x.map.isVideoTexture===!0&&ne.getTransfer(x.map.colorSpace)===be,decodeVideoTextureEmissive:Yi&&x.emissiveMap.isVideoTexture===!0&&ne.getTransfer(x.emissiveMap.colorSpace)===be,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ge,flipSided:x.side===Ri,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:st&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&x.extensions.multiDraw===!0||Et)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return It.vertexUv1s=l.has(1),It.vertexUv2s=l.has(2),It.vertexUv3s=l.has(3),l.clear(),It}function g(x){let S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(let L in x.defines)S.push(L),S.push(x.defines[L]);return x.isRawShaderMaterial===!1&&(_(S,x),b(S,x),S.push(n.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function _(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapCubeUVHeight),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.morphAttributeCount),x.push(S.numSunLights),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numSunLightShadows),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function b(x,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function T(x){let S=f[x.type],L;if(S){let U=cr[S];L=Eg.clone(U.uniforms)}else L=x.uniforms;return L}function v(x,S){let L=h.get(S);return L!==void 0?++L.usedTimes:(L=new x1(n,S,x,r),c.push(L),h.set(S,L)),L}function E(x){if(--x.usedTimes===0){let S=c.indexOf(x);c[S]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function R(x){o.remove(x)}function I(){o.dispose()}return{getParameters:w,getProgramCacheKey:g,getUniforms:T,acquireProgram:v,releaseProgram:E,releaseShaderCache:R,programs:c,dispose:I}}function E1(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function T1(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Xg(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function qg(){let n=[],t=0,e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,m,w,g,_){let b=n[t];return b===void 0?(b={id:u.id,object:u,geometry:f,material:m,materialVariant:a(u),groupOrder:w,renderOrder:u.renderOrder,z:g,group:_},n[t]=b):(b.id=u.id,b.object=u,b.geometry=f,b.material=m,b.materialVariant=a(u),b.groupOrder=w,b.renderOrder=u.renderOrder,b.z=g,b.group=_),t++,b}function l(u,f,m,w,g,_,b){b.reversedDepth===!0&&(g=-g);let T=o(u,f,m,w,g,_);m.transmission>0?i.push(T):m.transparent===!0?r.push(T):e.push(T)}function c(u,f,m,w,g,_){let b=o(u,f,m,w,g,_);m.transmission>0?i.unshift(b):m.transparent===!0?r.unshift(b):e.unshift(b)}function h(u,f){e.length>1&&e.sort(u||T1),i.length>1&&i.sort(f||Xg),r.length>1&&r.sort(f||Xg)}function d(){for(let u=t,f=n.length;u<f;u++){let m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:d,sort:h}}function R1(){let n=new WeakMap;function t(i,r){let s=n.get(i),a;return s===void 0?(a=new qg,n.set(i,[a])):r>=s.length?(a=new qg,s.push(a)):a=s[r],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function A1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new A,color:new qt};break;case"SpotLight":e={position:new A,direction:new A,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new A,halfWidth:new A,halfHeight:new A};break}return n[t.id]=e,e}}}function C1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var P1=0;function I1(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function L1(n){let t=new A1,e=C1(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new A);let r=new A,s=new he,a=new he;function o(c){let h=0,d=0,u=0;for(let z=0;z<9;z++)i.probe[z].set(0,0,0);let f=0,m=0,w=0,g=0,_=0,b=0,T=0,v=0,E=0,R=0,I=0,x=0,S=0,L=0;c.sort(I1);for(let z=0,W=c.length;z<W;z++){let N=c[z],H=N.color,j=N.intensity,Z=N.distance,ot=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Vr?ot=N.shadow.map.texture:ot=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=H.r*j,d+=H.g*j,u+=H.b*j;else if(N.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(N.sh.coefficients[K],j);L++}else if(N.isSunLight){let K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let rt=N.shadow,at=e.get(N);at.shadowIntensity=rt.intensity,at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize.copy(rt.mapSize).multiply(rt.getFrameExtents()),i.sunShadow[m]=at,i.sunShadowMap[m]=ot;let Ht=rt.getViewportCount();for(let Ut=0;Ut<Ht;Ut++)i.sunShadowMatrix[w+Ut]=rt.getMatrix(Ut),i.sunShadowCascade[w+Ut]=rt._cascadeData[Ut];w+=Ht,m++}i.sun[f]=K,f++}else if(N.isDirectionalLight){let K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let rt=N.shadow,at=e.get(N);at.shadowIntensity=rt.intensity,at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,i.directionalShadow[g]=at,i.directionalShadowMap[g]=ot,i.directionalShadowMatrix[g]=N.shadow.matrix,E++}i.directional[g]=K,g++}else if(N.isSpotLight){let K=t.get(N);K.position.setFromMatrixPosition(N.matrixWorld),K.color.copy(H).multiplyScalar(j),K.distance=Z,K.coneCos=Math.cos(N.angle),K.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),K.decay=N.decay,i.spot[b]=K;let rt=N.shadow;if(N.map&&(i.spotLightMap[x]=N.map,x++,rt.updateMatrices(N),N.castShadow&&S++),i.spotLightMatrix[b]=rt.matrix,N.castShadow){let at=e.get(N);at.shadowIntensity=rt.intensity,at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,i.spotShadow[b]=at,i.spotShadowMap[b]=ot,I++}b++}else if(N.isRectAreaLight){let K=t.get(N);K.color.copy(H).multiplyScalar(j),K.halfWidth.set(N.width*.5,0,0),K.halfHeight.set(0,N.height*.5,0),i.rectArea[T]=K,T++}else if(N.isPointLight){let K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),K.distance=N.distance,K.decay=N.decay,N.castShadow){let rt=N.shadow,at=e.get(N);at.shadowIntensity=rt.intensity,at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,at.shadowCameraNear=rt.camera.near,at.shadowCameraFar=rt.camera.far,i.pointShadow[_]=at,i.pointShadowMap[_]=ot,i.pointShadowMatrix[_]=N.shadow.matrix,R++}i.point[_]=K,_++}else if(N.isHemisphereLight){let K=t.get(N);K.skyColor.copy(N.color).multiplyScalar(j),K.groundColor.copy(N.groundColor).multiplyScalar(j),i.hemi[v]=K,v++}}T>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=vt.LTC_FLOAT_1,i.rectAreaLTC2=vt.LTC_FLOAT_2):(i.rectAreaLTC1=vt.LTC_HALF_1,i.rectAreaLTC2=vt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let U=i.hash;(U.sunLength!==f||U.directionalLength!==g||U.pointLength!==_||U.spotLength!==b||U.rectAreaLength!==T||U.hemiLength!==v||U.numSunShadows!==m||U.numDirectionalShadows!==E||U.numPointShadows!==R||U.numSpotShadows!==I||U.numSpotMaps!==x||U.numLightProbes!==L)&&(i.sun.length=f,i.directional.length=g,i.spot.length=b,i.rectArea.length=T,i.point.length=_,i.hemi.length=v,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=w,i.sunShadowCascade.length=w,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=R,i.pointShadowMap.length=R,i.pointShadowMatrix.length=R,i.spotShadow.length=I,i.spotShadowMap.length=I,i.spotLightMatrix.length=I+x-S,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=L,U.sunLength=f,U.directionalLength=g,U.pointLength=_,U.spotLength=b,U.rectAreaLength=T,U.hemiLength=v,U.numSunShadows=m,U.numDirectionalShadows=E,U.numPointShadows=R,U.numSpotShadows=I,U.numSpotMaps=x,U.numLightProbes=L,i.version=P1++)}function l(c,h){let d=0,u=0,f=0,m=0,w=0,g=0,_=h.matrixWorldInverse;for(let b=0,T=c.length;b<T;b++){let v=c[b];if(v.isSunLight){let E=i.sun[d];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(_),d++}else if(v.isDirectionalLight){let E=i.directional[u];E.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(_),u++}else if(v.isSpotLight){let E=i.spot[m];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(_),E.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(_),m++}else if(v.isRectAreaLight){let E=i.rectArea[w];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(_),a.identity(),s.copy(v.matrixWorld),s.premultiply(_),a.extractRotation(s),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),w++}else if(v.isPointLight){let E=i.point[f];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(_),f++}else if(v.isHemisphereLight){let E=i.hemi[g];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(_),g++}}}return{setup:o,setupView:l,state:i}}function Yg(n){let t=new L1(n),e=[],i=[],r=[];function s(u){d.camera=u,e.length=0,i.length=0,r.length=0}function a(u){e.push(u)}function o(u){i.push(u)}function l(u){r.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function N1(n){let t=new WeakMap;function e(r,s=0){let a=t.get(r),o;return a===void 0?(o=new Yg(n),t.set(r,[o])):s>=a.length?(o=new Yg(n),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var D1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,F1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,U1=[new A(1,0,0),new A(-1,0,0),new A(0,1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1)],O1=[new A(0,-1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1),new A(0,-1,0),new A(0,-1,0)],Jg=new he,cl=new A,Ep=new A;function B1(n,t,e){let i=new Fo,r=new ct,s=new ct,a=new Ie,o=new ca,l=new ph,c={},h=e.maxTextureSize,d={[zr]:Ri,[Ri]:zr,[Ge]:Ge},u=new ge({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:D1,fragmentShader:F1}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new _e;m.setAttribute("position",new ui(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let w=new Bt(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ko;let _=this.type;this.render=function(R,I,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;this.type===B_&&(Vt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ko);let S=n.getRenderTarget(),L=n.getActiveCubeFace(),U=n.getActiveMipmapLevel(),z=n.state;z.setBlending(ar),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let W=_!==this.type;W&&I.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(H=>H.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,H=R.length;N<H;N++){let j=R[N],Z=j.shadow;if(Z===void 0){Vt("WebGLShadowMap:",j,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);let ot=Z.getFrameExtents();r.multiply(ot),s.copy(Z.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/ot.x),r.x=s.x*ot.x,Z.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/ot.y),r.y=s.y*ot.y,Z.mapSize.y=s.y));let K=n.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=K,Z.map===null||W===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===ha){if(j.isPointLight){Vt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new Fi(r.x,r.y,{format:Vr,type:Nn,minFilter:ai,magFilter:ai,generateMipmaps:!1}),Z.map.texture.name=j.name+".shadowMap",Z.map.depthTexture=new rr(r.x,r.y,mn),Z.map.depthTexture.name=j.name+".shadowMapDepth",Z.map.depthTexture.format=Qn,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Ve,Z.map.depthTexture.magFilter=Ve}else j.isPointLight?(Z.map=new yu(r.x),Z.map.depthTexture=new ah(r.x,sn)):(Z.map=new Fi(r.x,r.y),Z.map.depthTexture=new rr(r.x,r.y,sn)),Z.map.depthTexture.name=j.name+".shadowMap",Z.map.depthTexture.format=Qn,this.type===Ko?(Z.map.depthTexture.compareFunction=K?mu:pu,Z.map.depthTexture.minFilter=ai,Z.map.depthTexture.magFilter=ai):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Ve,Z.map.depthTexture.magFilter=Ve);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==r.x||Z.map.height!==r.y)&&Z.map.setSize(r.x,r.y);let rt=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();j.isPointLight!==!0&&Z.updateMatrices(j,x);for(let at=0;at<rt;at++){let Ht=Z.getCamera(at);if(j.isPointLight){let Ut=Z.camera,De=Z.matrix,ce=j.distance||Ut.far;ce!==Ut.far&&(Ut.far=ce,Ut.updateProjectionMatrix()),cl.setFromMatrixPosition(j.matrixWorld),Ut.position.copy(cl),Ep.copy(Ut.position),Ep.add(U1[at]),Ut.up.copy(O1[at]),Ut.lookAt(Ep),Ut.updateMatrixWorld(),De.makeTranslation(-cl.x,-cl.y,-cl.z),Jg.multiplyMatrices(Ut.projectionMatrix,Ut.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(Jg,Ut.coordinateSystem,Ut.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)n.setRenderTarget(Z.map,at),n.clear();else{at===0&&(n.setRenderTarget(Z.map),n.clear());let Ut=Z.getViewport(at);a.set(s.x*Ut.x,s.y*Ut.y,s.x*Ut.z,s.y*Ut.w),z.viewport(a)}i=Z.getFrustum(at),v(I,x,Ht,j,this.type)}Z.isPointLightShadow!==!0&&this.type===ha&&b(Z,x),Z.needsUpdate=!1}_=this.type,g.needsUpdate=!1,n.setRenderTarget(S,L,U)};function b(R,I){let x=t.update(w);u.defines.VSM_SAMPLES!==R.blurSamples&&(u.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null?R.mapPass=new Fi(r.x,r.y,{format:Vr,type:Nn}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),u.uniforms.shadow_pass.value=R.map.depthTexture,u.uniforms.resolution.value.set(R.map.width,R.map.height),u.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(I,null,x,u,w,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value.set(R.map.width,R.map.height),f.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(I,null,x,f,w,null)}function T(R,I,x,S){let L=null,U=x.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(U!==void 0)L=U;else if(L=x.isPointLight===!0?l:o,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let z=L.uuid,W=I.uuid,N=c[z];N===void 0&&(N={},c[z]=N);let H=N[W];H===void 0&&(H=L.clone(),N[W]=H,I.addEventListener("dispose",E)),L=H}if(L.visible=I.visible,L.wireframe=I.wireframe,S===ha?L.side=I.shadowSide!==null?I.shadowSide:I.side:L.side=I.shadowSide!==null?I.shadowSide:d[I.side],L.alphaMap=I.alphaMap,L.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,L.map=I.map,L.clipShadows=I.clipShadows,L.clippingPlanes=I.clippingPlanes,L.clipIntersection=I.clipIntersection,L.displacementMap=I.displacementMap,L.displacementScale=I.displacementScale,L.displacementBias=I.displacementBias,L.wireframeLinewidth=I.wireframeLinewidth,L.linewidth=I.linewidth,x.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let z=n.properties.get(L);z.light=x}return L}function v(R,I,x,S,L){if(R.visible===!1)return;if(R.layers.test(I.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&L===ha)&&(!R.frustumCulled||R.intersectsFrustum(i))){R.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,R.matrixWorld);let W=t.update(R),N=R.material;if(Array.isArray(N)){let H=W.groups;for(let j=0,Z=H.length;j<Z;j++){let ot=H[j],K=N[ot.materialIndex];if(K&&K.visible){let rt=T(R,K,S,L);R.onBeforeShadow(n,R,I,x,W,rt,ot),n.renderBufferDirect(x,null,W,rt,R,ot),R.onAfterShadow(n,R,I,x,W,rt,ot)}}}else if(N.visible){let H=T(R,N,S,L);R.onBeforeShadow(n,R,I,x,W,H,null),n.renderBufferDirect(x,null,W,H,R,null),R.onAfterShadow(n,R,I,x,W,H,null)}}let z=R.children;for(let W=0,N=z.length;W<N;W++)v(z[W],I,x,S,L)}function E(R){R.target.removeEventListener("dispose",E);for(let x in c){let S=c[x],L=R.target.uuid;L in S&&(S[L].dispose(),delete S[L])}}}function z1(n,t){function e(){let O=!1,gt=new Ie,et=null,wt=new Ie(0,0,0,0);return{setMask:function(St){et!==St&&!O&&(n.colorMask(St,St,St,St),et=St)},setLocked:function(St){O=St},setClear:function(St,st,Ot,It,Ue){Ue===!0&&(St*=It,st*=It,Ot*=It),gt.set(St,st,Ot,It),wt.equals(gt)===!1&&(n.clearColor(St,st,Ot,It),wt.copy(gt))},reset:function(){O=!1,et=null,wt.set(-1,0,0,0)}}}function i(){let O=!1,gt=!1,et=null,wt=null,St=null;return{setReversed:function(st){if(gt!==st){let Ot=t.get("EXT_clip_control");st?Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.ZERO_TO_ONE_EXT):Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.NEGATIVE_ONE_TO_ONE_EXT),gt=st;let It=St;St=null,this.setClear(It)}},getReversed:function(){return gt},setTest:function(st){st?nt(n.DEPTH_TEST):Rt(n.DEPTH_TEST)},setMask:function(st){et!==st&&!O&&(n.depthMask(st),et=st)},setFunc:function(st){if(gt&&(st=wg[st]),wt!==st){switch(st){case Wc:n.depthFunc(n.NEVER);break;case Xc:n.depthFunc(n.ALWAYS);break;case qc:n.depthFunc(n.LESS);break;case Zs:n.depthFunc(n.LEQUAL);break;case Yc:n.depthFunc(n.EQUAL);break;case Jc:n.depthFunc(n.GEQUAL);break;case jc:n.depthFunc(n.GREATER);break;case Zc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}wt=st}},setLocked:function(st){O=st},setClear:function(st){St!==st&&(St=st,gt&&(st=1-st),n.clearDepth(st))},reset:function(){O=!1,et=null,wt=null,St=null,gt=!1}}}function r(){let O=!1,gt=null,et=null,wt=null,St=null,st=null,Ot=null,It=null,Ue=null;return{setTest:function(ve){O||(ve?nt(n.STENCIL_TEST):Rt(n.STENCIL_TEST))},setMask:function(ve){gt!==ve&&!O&&(n.stencilMask(ve),gt=ve)},setFunc:function(ve,bn,Jn){(et!==ve||wt!==bn||St!==Jn)&&(n.stencilFunc(ve,bn,Jn),et=ve,wt=bn,St=Jn)},setOp:function(ve,bn,Jn){(st!==ve||Ot!==bn||It!==Jn)&&(n.stencilOp(ve,bn,Jn),st=ve,Ot=bn,It=Jn)},setLocked:function(ve){O=ve},setClear:function(ve){Ue!==ve&&(n.clearStencil(ve),Ue=ve)},reset:function(){O=!1,gt=null,et=null,wt=null,St=null,st=null,Ot=null,It=null,Ue=null}}}let s=new e,a=new i,o=new r,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,m=[],w=null,g=!1,_=null,b=null,T=null,v=null,E=null,R=null,I=null,x=new qt(0,0,0),S=0,L=!1,U=null,z=null,W=null,N=null,H=null,j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,ot=0,K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(ot=parseFloat(/^WebGL (\d)/.exec(K)[1]),Z=ot>=1):K.indexOf("OpenGL ES")!==-1&&(ot=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Z=ot>=2);let rt=null,at={},Ht=n.getParameter(n.SCISSOR_BOX),Ut=n.getParameter(n.VIEWPORT),De=new Ie().fromArray(Ht),ce=new Ie().fromArray(Ut);function me(O,gt,et,wt){let St=new Uint8Array(4),st=n.createTexture();n.bindTexture(O,st),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ot=0;Ot<et;Ot++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(gt,0,n.RGBA,1,1,wt,0,n.RGBA,n.UNSIGNED_BYTE,St):n.texImage2D(gt+Ot,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,St);return st}let Q={};Q[n.TEXTURE_2D]=me(n.TEXTURE_2D,n.TEXTURE_2D,1),Q[n.TEXTURE_CUBE_MAP]=me(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[n.TEXTURE_2D_ARRAY]=me(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Q[n.TEXTURE_3D]=me(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(n.DEPTH_TEST),a.setFunc(Zs),le(!1),Je(zf),nt(n.CULL_FACE),fe(ar);function nt(O){h[O]!==!0&&(n.enable(O),h[O]=!0)}function Rt(O){h[O]!==!1&&(n.disable(O),h[O]=!1)}function Jt(O,gt){return u[O]!==gt?(n.bindFramebuffer(O,gt),u[O]=gt,O===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=gt),O===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=gt),!0):!1}function Et(O,gt){let et=m,wt=!1;if(O){et=f.get(gt),et===void 0&&(et=[],f.set(gt,et));let St=O.textures;if(et.length!==St.length||et[0]!==n.COLOR_ATTACHMENT0){for(let st=0,Ot=St.length;st<Ot;st++)et[st]=n.COLOR_ATTACHMENT0+st;et.length=St.length,wt=!0}}else et[0]!==n.BACK&&(et[0]=n.BACK,wt=!0);wt&&n.drawBuffers(et)}function ie(O){return w!==O?(n.useProgram(O),w=O,!0):!1}let pi={[ls]:n.FUNC_ADD,[k_]:n.FUNC_SUBTRACT,[H_]:n.FUNC_REVERSE_SUBTRACT};pi[V_]=n.MIN,pi[G_]=n.MAX;let ae={[W_]:n.ZERO,[X_]:n.ONE,[q_]:n.SRC_COLOR,[Vf]:n.SRC_ALPHA,[K_]:n.SRC_ALPHA_SATURATE,[Z_]:n.DST_COLOR,[J_]:n.DST_ALPHA,[Y_]:n.ONE_MINUS_SRC_COLOR,[Gf]:n.ONE_MINUS_SRC_ALPHA,[$_]:n.ONE_MINUS_DST_COLOR,[j_]:n.ONE_MINUS_DST_ALPHA,[Q_]:n.CONSTANT_COLOR,[tg]:n.ONE_MINUS_CONSTANT_COLOR,[eg]:n.CONSTANT_ALPHA,[ig]:n.ONE_MINUS_CONSTANT_ALPHA};function fe(O,gt,et,wt,St,st,Ot,It,Ue,ve){if(O===ar){g===!0&&(Rt(n.BLEND),g=!1);return}if(g===!1&&(nt(n.BLEND),g=!0),O!==z_){if(O!==_||ve!==L){if((b!==ls||E!==ls)&&(n.blendEquation(n.FUNC_ADD),b=ls,E=ls),ve)switch(O){case ua:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qo:n.blendFunc(n.ONE,n.ONE);break;case kf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Hf:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Xt("WebGLState: Invalid blending: ",O);break}else switch(O){case ua:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case kf:Xt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hf:Xt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xt("WebGLState: Invalid blending: ",O);break}T=null,v=null,R=null,I=null,x.set(0,0,0),S=0,_=O,L=ve}return}St=St||gt,st=st||et,Ot=Ot||wt,(gt!==b||St!==E)&&(n.blendEquationSeparate(pi[gt],pi[St]),b=gt,E=St),(et!==T||wt!==v||st!==R||Ot!==I)&&(n.blendFuncSeparate(ae[et],ae[wt],ae[st],ae[Ot]),T=et,v=wt,R=st,I=Ot),(It.equals(x)===!1||Ue!==S)&&(n.blendColor(It.r,It.g,It.b,Ue),x.copy(It),S=Ue),_=O,L=!1}function Fe(O,gt){O.side===Ge?Rt(n.CULL_FACE):nt(n.CULL_FACE);let et=O.side===Ri;gt&&(et=!et),le(et),O.blending===ua&&O.transparent===!1?fe(ar):fe(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),s.setMask(O.colorWrite);let wt=O.stencilWrite;o.setTest(wt),wt&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Yi(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?nt(n.SAMPLE_ALPHA_TO_COVERAGE):Rt(n.SAMPLE_ALPHA_TO_COVERAGE)}function le(O){U!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),U=O)}function Je(O){O!==U_?(nt(n.CULL_FACE),O!==z&&(O===zf?n.cullFace(n.BACK):O===O_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Rt(n.CULL_FACE),z=O}function wi(O){O!==W&&(Z&&n.lineWidth(O),W=O)}function Yi(O,gt,et){O?(nt(n.POLYGON_OFFSET_FILL),(N!==gt||H!==et)&&(N=gt,H=et,a.getReversed()&&(gt=-gt),n.polygonOffset(gt,et))):Rt(n.POLYGON_OFFSET_FILL)}function Ze(O){O?nt(n.SCISSOR_TEST):Rt(n.SCISSOR_TEST)}function li(O){O===void 0&&(O=n.TEXTURE0+j-1),rt!==O&&(n.activeTexture(O),rt=O)}function B(O,gt,et){et===void 0&&(rt===null?et=n.TEXTURE0+j-1:et=rt);let wt=at[et];wt===void 0&&(wt={type:void 0,texture:void 0},at[et]=wt),(wt.type!==O||wt.texture!==gt)&&(rt!==et&&(n.activeTexture(et),rt=et),n.bindTexture(O,gt||Q[O]),wt.type=O,wt.texture=gt)}function Ii(){let O=at[rt];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Te(){try{n.compressedTexImage2D(...arguments)}catch(O){Xt("WebGLState:",O)}}function C(){try{n.compressedTexImage3D(...arguments)}catch(O){Xt("WebGLState:",O)}}function y(){try{n.texSubImage2D(...arguments)}catch(O){Xt("WebGLState:",O)}}function k(){try{n.texSubImage3D(...arguments)}catch(O){Xt("WebGLState:",O)}}function X(){try{n.compressedTexSubImage2D(...arguments)}catch(O){Xt("WebGLState:",O)}}function $(){try{n.compressedTexSubImage3D(...arguments)}catch(O){Xt("WebGLState:",O)}}function ut(){try{n.texStorage2D(...arguments)}catch(O){Xt("WebGLState:",O)}}function pt(){try{n.texStorage3D(...arguments)}catch(O){Xt("WebGLState:",O)}}function tt(){try{n.texImage2D(...arguments)}catch(O){Xt("WebGLState:",O)}}function it(){try{n.texImage3D(...arguments)}catch(O){Xt("WebGLState:",O)}}function mt(O){return d[O]!==void 0?d[O]:n.getParameter(O)}function Dt(O,gt){d[O]!==gt&&(n.pixelStorei(O,gt),d[O]=gt)}function yt(O){De.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),De.copy(O))}function _t(O){ce.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),ce.copy(O))}function Ft(O,gt){let et=c.get(gt);et===void 0&&(et=new WeakMap,c.set(gt,et));let wt=et.get(O);wt===void 0&&(wt=n.getUniformBlockIndex(gt,O.name),et.set(O,wt))}function Gt(O,gt){let wt=c.get(gt).get(O);l.get(gt)!==wt&&(n.uniformBlockBinding(gt,wt,O.__bindingPointIndex),l.set(gt,wt))}function Zt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},d={},rt=null,at={},u={},f=new WeakMap,m=[],w=null,g=!1,_=null,b=null,T=null,v=null,E=null,R=null,I=null,x=new qt(0,0,0),S=0,L=!1,U=null,z=null,W=null,N=null,H=null,De.set(0,0,n.canvas.width,n.canvas.height),ce.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:nt,disable:Rt,bindFramebuffer:Jt,drawBuffers:Et,useProgram:ie,setBlending:fe,setMaterial:Fe,setFlipSided:le,setCullFace:Je,setLineWidth:wi,setPolygonOffset:Yi,setScissorTest:Ze,activeTexture:li,bindTexture:B,unbindTexture:Ii,compressedTexImage2D:Te,compressedTexImage3D:C,texImage2D:tt,texImage3D:it,pixelStorei:Dt,getParameter:mt,updateUBOMapping:Ft,uniformBlockBinding:Gt,texStorage2D:ut,texStorage3D:pt,texSubImage2D:y,texSubImage3D:k,compressedTexSubImage2D:X,compressedTexSubImage3D:$,scissor:yt,viewport:_t,reset:Zt}}function k1(n,t,e,i,r,s,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ct,h=new WeakMap,d=new Set,u,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(C,y){return m?new OffscreenCanvas(C,y):To("canvas")}function g(C,y,k){let X=1,$=Te(C);if(($.width>k||$.height>k)&&(X=k/Math.max($.width,$.height)),X<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let ut=Math.floor(X*$.width),pt=Math.floor(X*$.height);u===void 0&&(u=w(ut,pt));let tt=y?w(ut,pt):u;return tt.width=ut,tt.height=pt,tt.getContext("2d").drawImage(C,0,0,ut,pt),Vt("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+ut+"x"+pt+")."),tt}else return"data"in C&&Vt("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),C;return C}function _(C){return C.generateMipmaps}function b(C){n.generateMipmap(C)}function T(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(C,y,k,X,$,ut=!1){if(C!==null){if(n[C]!==void 0)return n[C];Vt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let pt;X&&(pt=t.get("EXT_texture_norm16"),pt||Vt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let tt=y;if(y===n.RED&&(k===n.FLOAT&&(tt=n.R32F),k===n.HALF_FLOAT&&(tt=n.R16F),k===n.UNSIGNED_BYTE&&(tt=n.R8),k===n.UNSIGNED_SHORT&&pt&&(tt=pt.R16_EXT),k===n.SHORT&&pt&&(tt=pt.R16_SNORM_EXT)),y===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(tt=n.R8UI),k===n.UNSIGNED_SHORT&&(tt=n.R16UI),k===n.UNSIGNED_INT&&(tt=n.R32UI),k===n.BYTE&&(tt=n.R8I),k===n.SHORT&&(tt=n.R16I),k===n.INT&&(tt=n.R32I)),y===n.RG&&(k===n.FLOAT&&(tt=n.RG32F),k===n.HALF_FLOAT&&(tt=n.RG16F),k===n.UNSIGNED_BYTE&&(tt=n.RG8),k===n.UNSIGNED_SHORT&&pt&&(tt=pt.RG16_EXT),k===n.SHORT&&pt&&(tt=pt.RG16_SNORM_EXT)),y===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(tt=n.RG8UI),k===n.UNSIGNED_SHORT&&(tt=n.RG16UI),k===n.UNSIGNED_INT&&(tt=n.RG32UI),k===n.BYTE&&(tt=n.RG8I),k===n.SHORT&&(tt=n.RG16I),k===n.INT&&(tt=n.RG32I)),y===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(tt=n.RGB8UI),k===n.UNSIGNED_SHORT&&(tt=n.RGB16UI),k===n.UNSIGNED_INT&&(tt=n.RGB32UI),k===n.BYTE&&(tt=n.RGB8I),k===n.SHORT&&(tt=n.RGB16I),k===n.INT&&(tt=n.RGB32I)),y===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(tt=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(tt=n.RGBA16UI),k===n.UNSIGNED_INT&&(tt=n.RGBA32UI),k===n.BYTE&&(tt=n.RGBA8I),k===n.SHORT&&(tt=n.RGBA16I),k===n.INT&&(tt=n.RGBA32I)),y===n.RGB&&(k===n.UNSIGNED_SHORT&&pt&&(tt=pt.RGB16_EXT),k===n.SHORT&&pt&&(tt=pt.RGB16_SNORM_EXT),k===n.UNSIGNED_INT_5_9_9_9_REV&&(tt=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&(tt=n.R11F_G11F_B10F)),y===n.RGBA){let it=ut?Mo:ne.getTransfer($);k===n.FLOAT&&(tt=n.RGBA32F),k===n.HALF_FLOAT&&(tt=n.RGBA16F),k===n.UNSIGNED_BYTE&&(tt=it===be?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT&&pt&&(tt=pt.RGBA16_EXT),k===n.SHORT&&pt&&(tt=pt.RGBA16_SNORM_EXT),k===n.UNSIGNED_SHORT_4_4_4_4&&(tt=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(tt=n.RGB5_A1)}return(tt===n.R16F||tt===n.R32F||tt===n.RG16F||tt===n.RG32F||tt===n.RGBA16F||tt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function E(C,y){let k;return C?y===null||y===sn||y===fa?k=n.DEPTH24_STENCIL8:y===mn?k=n.DEPTH32F_STENCIL8:y===da&&(k=n.DEPTH24_STENCIL8,Vt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===sn||y===fa?k=n.DEPTH_COMPONENT24:y===mn?k=n.DEPTH_COMPONENT32F:y===da&&(k=n.DEPTH_COMPONENT16),k}function R(C,y){return _(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ve&&C.minFilter!==ai?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function I(C){let y=C.target;y.removeEventListener("dispose",I),S(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&d.delete(y)}function x(C){let y=C.target;y.removeEventListener("dispose",x),U(y)}function S(C){let y=i.get(C);if(y.__webglInit===void 0)return;let k=C.source,X=f.get(k);if(X){let $=X[y.__cacheKey];$.usedTimes--,$.usedTimes===0&&L(C),Object.keys(X).length===0&&f.delete(k)}i.remove(C)}function L(C){let y=i.get(C);n.deleteTexture(y.__webglTexture);let k=C.source,X=f.get(k);delete X[y.__cacheKey],a.memory.textures--}function U(C){let y=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(y.__webglFramebuffer[X]))for(let $=0;$<y.__webglFramebuffer[X].length;$++)n.deleteFramebuffer(y.__webglFramebuffer[X][$]);else n.deleteFramebuffer(y.__webglFramebuffer[X]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[X])}else{if(Array.isArray(y.__webglFramebuffer))for(let X=0;X<y.__webglFramebuffer.length;X++)n.deleteFramebuffer(y.__webglFramebuffer[X]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let X=0;X<y.__webglColorRenderbuffer.length;X++)y.__webglColorRenderbuffer[X]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[X]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let k=C.textures;for(let X=0,$=k.length;X<$;X++){let ut=i.get(k[X]);ut.__webglTexture&&(n.deleteTexture(ut.__webglTexture),a.memory.textures--),i.remove(k[X])}i.remove(C)}let z=0;function W(){z=0}function N(){return z}function H(C){z=C}function j(){let C=z;return C>=r.maxTextures&&Vt("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+r.maxTextures),z+=1,C}function Z(C){let y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function ot(C,y){let k=i.get(C);if(C.isVideoTexture&&B(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&k.__version!==C.version){let X=C.image;if(X===null)Vt("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Vt("WebGLRenderer: Texture marked for update but image is incomplete");else{Rt(k,C,y);return}}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+y)}function K(C,y){let k=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){Rt(k,C,y);return}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+y)}function rt(C,y){let k=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){Rt(k,C,y);return}e.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+y)}function at(C,y){let k=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&k.__version!==C.version){Jt(k,C,y);return}e.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+y)}let Ht={[$s]:n.REPEAT,[un]:n.CLAMP_TO_EDGE,[$c]:n.MIRRORED_REPEAT},Ut={[Ve]:n.NEAREST,[sg]:n.NEAREST_MIPMAP_NEAREST,[el]:n.NEAREST_MIPMAP_LINEAR,[ai]:n.LINEAR,[Ph]:n.LINEAR_MIPMAP_NEAREST,[or]:n.LINEAR_MIPMAP_LINEAR},De={[cg]:n.NEVER,[pg]:n.ALWAYS,[hg]:n.LESS,[pu]:n.LEQUAL,[ug]:n.EQUAL,[mu]:n.GEQUAL,[dg]:n.GREATER,[fg]:n.NOTEQUAL};function ce(C,y){if(y.type===mn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===ai||y.magFilter===Ph||y.magFilter===el||y.magFilter===or||y.minFilter===ai||y.minFilter===Ph||y.minFilter===el||y.minFilter===or)&&Vt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,Ht[y.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,Ht[y.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,Ht[y.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,Ut[y.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,Ut[y.minFilter]),y.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,De[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ve||y.minFilter!==el&&y.minFilter!==or||y.type===mn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");n.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function me(C,y){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",I));let X=y.source,$=f.get(X);$===void 0&&($={},f.set(X,$));let ut=Z(y);if(ut!==C.__cacheKey){$[ut]===void 0&&($[ut]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,k=!0),$[ut].usedTimes++;let pt=$[C.__cacheKey];pt!==void 0&&($[C.__cacheKey].usedTimes--,pt.usedTimes===0&&L(y)),C.__cacheKey=ut,C.__webglTexture=$[ut].texture}return k}function Q(C,y,k){return Math.floor(Math.floor(C/k)/y)}function nt(C,y,k,X){let ut=C.updateRanges;if(ut.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,k,X,y.data);else{ut.sort((Dt,yt)=>Dt.start-yt.start);let pt=0;for(let Dt=1;Dt<ut.length;Dt++){let yt=ut[pt],_t=ut[Dt],Ft=yt.start+yt.count,Gt=Q(_t.start,y.width,4),Zt=Q(yt.start,y.width,4);_t.start<=Ft+1&&Gt===Zt&&Q(_t.start+_t.count-1,y.width,4)===Gt?yt.count=Math.max(yt.count,_t.start+_t.count-yt.start):(++pt,ut[pt]=_t)}ut.length=pt+1;let tt=e.getParameter(n.UNPACK_ROW_LENGTH),it=e.getParameter(n.UNPACK_SKIP_PIXELS),mt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let Dt=0,yt=ut.length;Dt<yt;Dt++){let _t=ut[Dt],Ft=Math.floor(_t.start/4),Gt=Math.ceil(_t.count/4),Zt=Ft%y.width,O=Math.floor(Ft/y.width),gt=Gt,et=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Zt),e.pixelStorei(n.UNPACK_SKIP_ROWS,O),e.texSubImage2D(n.TEXTURE_2D,0,Zt,O,gt,et,k,X,y.data)}C.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,tt),e.pixelStorei(n.UNPACK_SKIP_PIXELS,it),e.pixelStorei(n.UNPACK_SKIP_ROWS,mt)}}function Rt(C,y,k){let X=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(X=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(X=n.TEXTURE_3D);let $=me(C,y),ut=y.source;e.bindTexture(X,C.__webglTexture,n.TEXTURE0+k);let pt=i.get(ut);if(ut.version!==pt.__version||$===!0){if(e.activeTexture(n.TEXTURE0+k),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let et=ne.getPrimaries(ne.workingColorSpace),wt=y.colorSpace===Ke?null:ne.getPrimaries(y.colorSpace),St=y.colorSpace===Ke||et===wt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,St)}e.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment);let it=g(y.image,!1,r.maxTextureSize);it=Ii(y,it);let mt=s.convert(y.format,y.colorSpace),Dt=s.convert(y.type),yt=v(y.internalFormat,mt,Dt,y.normalized,y.colorSpace,y.isVideoTexture);ce(X,y);let _t,Ft=y.mipmaps,Gt=y.isVideoTexture!==!0,Zt=pt.__version===void 0||$===!0,O=ut.dataReady,gt=R(y,it);if(y.isDepthTexture)yt=E(y.format===Hr,y.type),Zt&&(Gt?e.texStorage2D(n.TEXTURE_2D,1,yt,it.width,it.height):e.texImage2D(n.TEXTURE_2D,0,yt,it.width,it.height,0,mt,Dt,null));else if(y.isDataTexture)if(Ft.length>0){Gt&&Zt&&e.texStorage2D(n.TEXTURE_2D,gt,yt,Ft[0].width,Ft[0].height);for(let et=0,wt=Ft.length;et<wt;et++)_t=Ft[et],Gt?O&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,_t.width,_t.height,mt,Dt,_t.data):e.texImage2D(n.TEXTURE_2D,et,yt,_t.width,_t.height,0,mt,Dt,_t.data);y.generateMipmaps=!1}else Gt?(Zt&&e.texStorage2D(n.TEXTURE_2D,gt,yt,it.width,it.height),O&&nt(y,it,mt,Dt)):e.texImage2D(n.TEXTURE_2D,0,yt,it.width,it.height,0,mt,Dt,it.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Gt&&Zt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,yt,Ft[0].width,Ft[0].height,it.depth);for(let et=0,wt=Ft.length;et<wt;et++)if(_t=Ft[et],y.format!==_n)if(mt!==null)if(Gt){if(O)if(y.layerUpdates.size>0){let St=pp(_t.width,_t.height,y.format,y.type);for(let st of y.layerUpdates){let Ot=_t.data.subarray(st*St/_t.data.BYTES_PER_ELEMENT,(st+1)*St/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,st,_t.width,_t.height,1,mt,Ot)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,0,_t.width,_t.height,it.depth,mt,_t.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,et,yt,_t.width,_t.height,it.depth,0,_t.data,0,0);else Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?O&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,0,_t.width,_t.height,it.depth,mt,Dt,_t.data):e.texImage3D(n.TEXTURE_2D_ARRAY,et,yt,_t.width,_t.height,it.depth,0,mt,Dt,_t.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Gt&&Zt&&e.texStorage2D(n.TEXTURE_2D,gt,yt,Ft[0].width,Ft[0].height);for(let et=0,wt=Ft.length;et<wt;et++)_t=Ft[et],y.format!==_n?mt!==null?Gt?O&&e.compressedTexSubImage2D(n.TEXTURE_2D,et,0,0,_t.width,_t.height,mt,_t.data):e.compressedTexImage2D(n.TEXTURE_2D,et,yt,_t.width,_t.height,0,_t.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?O&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,_t.width,_t.height,mt,Dt,_t.data):e.texImage2D(n.TEXTURE_2D,et,yt,_t.width,_t.height,0,mt,Dt,_t.data)}else if(y.isDataArrayTexture)if(Gt){if(Zt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,yt,it.width,it.height,it.depth),O)if(y.layerUpdates.size>0){let et=pp(it.width,it.height,y.format,y.type);for(let wt of y.layerUpdates){let St=it.data.subarray(wt*et/it.data.BYTES_PER_ELEMENT,(wt+1)*et/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,wt,it.width,it.height,1,mt,Dt,St)}y.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,mt,Dt,it.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,yt,it.width,it.height,it.depth,0,mt,Dt,it.data);else if(y.isData3DTexture)Gt?(Zt&&e.texStorage3D(n.TEXTURE_3D,gt,yt,it.width,it.height,it.depth),O&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,mt,Dt,it.data)):e.texImage3D(n.TEXTURE_3D,0,yt,it.width,it.height,it.depth,0,mt,Dt,it.data);else if(y.isFramebufferTexture){if(Zt)if(Gt)e.texStorage2D(n.TEXTURE_2D,gt,yt,it.width,it.height);else{let et=it.width,wt=it.height;for(let St=0;St<gt;St++)e.texImage2D(n.TEXTURE_2D,St,yt,et,wt,0,mt,Dt,null),et>>=1,wt>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in n){let et=n.canvas;if(et.hasAttribute("layoutsubtree")||et.setAttribute("layoutsubtree","true"),it.parentNode!==et){et.appendChild(it),d.add(y),et.onpaint=wt=>{let St=wt.changedElements;for(let st of d)St.includes(st.image)&&(st.needsUpdate=!0)},et.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,it);else{let St=n.RGBA,st=n.RGBA,Ot=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,St,st,Ot,it)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ft.length>0){if(Gt&&Zt){let et=Te(Ft[0]);e.texStorage2D(n.TEXTURE_2D,gt,yt,et.width,et.height)}for(let et=0,wt=Ft.length;et<wt;et++)_t=Ft[et],Gt?O&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,mt,Dt,_t):e.texImage2D(n.TEXTURE_2D,et,yt,mt,Dt,_t);y.generateMipmaps=!1}else if(Gt){if(Zt){let et=Te(it);e.texStorage2D(n.TEXTURE_2D,gt,yt,et.width,et.height)}O&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,mt,Dt,it)}else e.texImage2D(n.TEXTURE_2D,0,yt,mt,Dt,it);_(y)&&b(X),pt.__version=ut.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Jt(C,y,k){if(y.image.length!==6)return;let X=me(C,y),$=y.source;e.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+k);let ut=i.get($);if($.version!==ut.__version||X===!0){e.activeTexture(n.TEXTURE0+k);let pt=ne.getPrimaries(ne.workingColorSpace),tt=y.colorSpace===Ke?null:ne.getPrimaries(y.colorSpace),it=y.colorSpace===Ke||pt===tt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);let mt=y.isCompressedTexture||y.image[0].isCompressedTexture,Dt=y.image[0]&&y.image[0].isDataTexture,yt=[];for(let st=0;st<6;st++)!mt&&!Dt?yt[st]=g(y.image[st],!0,r.maxCubemapSize):yt[st]=Dt?y.image[st].image:y.image[st],yt[st]=Ii(y,yt[st]);let _t=yt[0],Ft=s.convert(y.format,y.colorSpace),Gt=s.convert(y.type),Zt=v(y.internalFormat,Ft,Gt,y.normalized,y.colorSpace),O=y.isVideoTexture!==!0,gt=ut.__version===void 0||X===!0,et=$.dataReady,wt=R(y,_t);ce(n.TEXTURE_CUBE_MAP,y);let St;if(mt){O&&gt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,wt,Zt,_t.width,_t.height);for(let st=0;st<6;st++){St=yt[st].mipmaps;for(let Ot=0;Ot<St.length;Ot++){let It=St[Ot];y.format!==_n?Ft!==null?O?et&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot,0,0,It.width,It.height,Ft,It.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot,Zt,It.width,It.height,0,It.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot,0,0,It.width,It.height,Ft,Gt,It.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot,Zt,It.width,It.height,0,Ft,Gt,It.data)}}}else{if(St=y.mipmaps,O&&gt){St.length>0&&wt++;let st=Te(yt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,wt,Zt,st.width,st.height)}for(let st=0;st<6;st++)if(Dt){O?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,yt[st].width,yt[st].height,Ft,Gt,yt[st].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Zt,yt[st].width,yt[st].height,0,Ft,Gt,yt[st].data);for(let Ot=0;Ot<St.length;Ot++){let Ue=St[Ot].image[st].image;O?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot+1,0,0,Ue.width,Ue.height,Ft,Gt,Ue.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot+1,Zt,Ue.width,Ue.height,0,Ft,Gt,Ue.data)}}else{O?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Ft,Gt,yt[st]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Zt,Ft,Gt,yt[st]);for(let Ot=0;Ot<St.length;Ot++){let It=St[Ot];O?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot+1,0,0,Ft,Gt,It.image[st]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot+1,Zt,Ft,Gt,It.image[st])}}}_(y)&&b(n.TEXTURE_CUBE_MAP),ut.__version=$.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Et(C,y,k,X,$,ut){let pt=s.convert(k.format,k.colorSpace),tt=s.convert(k.type),it=v(k.internalFormat,pt,tt,k.normalized,k.colorSpace),mt=i.get(y),Dt=i.get(k);if(Dt.__renderTarget=y,!mt.__hasExternalTextures){let yt=Math.max(1,y.width>>ut),_t=Math.max(1,y.height>>ut);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?e.texImage3D($,ut,it,yt,_t,y.depth,0,pt,tt,null):e.texImage2D($,ut,it,yt,_t,0,pt,tt,null)}e.bindFramebuffer(n.FRAMEBUFFER,C),li(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,X,$,Dt.__webglTexture,0,Ze(y)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,X,$,Dt.__webglTexture,ut),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ie(C,y,k){if(n.bindRenderbuffer(n.RENDERBUFFER,C),y.depthBuffer){let X=y.depthTexture,$=X&&X.isDepthTexture?X.type:null,ut=E(y.stencilBuffer,$),pt=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;li(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ze(y),ut,y.width,y.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ze(y),ut,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,ut,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pt,n.RENDERBUFFER,C)}else{let X=y.textures;for(let $=0;$<X.length;$++){let ut=X[$],pt=s.convert(ut.format,ut.colorSpace),tt=s.convert(ut.type),it=v(ut.internalFormat,pt,tt,ut.normalized,ut.colorSpace);li(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ze(y),it,y.width,y.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ze(y),it,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,it,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function pi(C,y,k){let X=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let $=i.get(y.depthTexture);if($.__renderTarget=y,(!$.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),X){if($.__webglInit===void 0&&($.__webglInit=!0,y.depthTexture.addEventListener("dispose",I)),$.__webglTexture===void 0){$.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),ce(n.TEXTURE_CUBE_MAP,y.depthTexture);let mt=s.convert(y.depthTexture.format),Dt=s.convert(y.depthTexture.type),yt;y.depthTexture.format===Qn?yt=n.DEPTH_COMPONENT24:y.depthTexture.format===Hr&&(yt=n.DEPTH24_STENCIL8);for(let _t=0;_t<6;_t++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,yt,y.width,y.height,0,mt,Dt,null)}}else ot(y.depthTexture,0);let ut=$.__webglTexture,pt=Ze(y),tt=X?n.TEXTURE_CUBE_MAP_POSITIVE_X+k:n.TEXTURE_2D,it=y.depthTexture.format===Hr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(y.depthTexture.format===Qn)li(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,it,tt,ut,0,pt):n.framebufferTexture2D(n.FRAMEBUFFER,it,tt,ut,0);else if(y.depthTexture.format===Hr)li(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,it,tt,ut,0,pt):n.framebufferTexture2D(n.FRAMEBUFFER,it,tt,ut,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ae(C){let y=i.get(C),k=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){let X=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),X){let $=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,X.removeEventListener("dispose",$)};X.addEventListener("dispose",$),y.__depthDisposeCallback=$}y.__boundDepthTexture=X}if(C.depthTexture&&!y.__autoAllocateDepthBuffer)if(k)for(let X=0;X<6;X++)pi(y.__webglFramebuffer[X],C,X);else{let X=C.texture.mipmaps;X&&X.length>0?pi(y.__webglFramebuffer[0],C,0):pi(y.__webglFramebuffer,C,0)}else if(k){y.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[X]),y.__webglDepthbuffer[X]===void 0)y.__webglDepthbuffer[X]=n.createRenderbuffer(),ie(y.__webglDepthbuffer[X],C,!1);else{let $=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ut=y.__webglDepthbuffer[X];n.bindRenderbuffer(n.RENDERBUFFER,ut),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,ut)}}else{let X=C.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),ie(y.__webglDepthbuffer,C,!1);else{let $=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ut=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ut),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,ut)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function fe(C,y,k){let X=i.get(C);y!==void 0&&Et(X.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&ae(C)}function Fe(C){let y=C.texture,k=i.get(C),X=i.get(y);C.addEventListener("dispose",x);let $=C.textures,ut=C.isWebGLCubeRenderTarget===!0,pt=$.length>1;if(pt||(X.__webglTexture===void 0&&(X.__webglTexture=n.createTexture()),X.__version=y.version,a.memory.textures++),ut){k.__webglFramebuffer=[];for(let tt=0;tt<6;tt++)if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer[tt]=[];for(let it=0;it<y.mipmaps.length;it++)k.__webglFramebuffer[tt][it]=n.createFramebuffer()}else k.__webglFramebuffer[tt]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer=[];for(let tt=0;tt<y.mipmaps.length;tt++)k.__webglFramebuffer[tt]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(pt)for(let tt=0,it=$.length;tt<it;tt++){let mt=i.get($[tt]);mt.__webglTexture===void 0&&(mt.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&li(C)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let tt=0;tt<$.length;tt++){let it=$[tt];k.__webglColorRenderbuffer[tt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[tt]);let mt=s.convert(it.format,it.colorSpace),Dt=s.convert(it.type),yt=v(it.internalFormat,mt,Dt,it.normalized,it.colorSpace,C.isXRRenderTarget===!0),_t=Ze(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,_t,yt,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+tt,n.RENDERBUFFER,k.__webglColorRenderbuffer[tt])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),ie(k.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ut){e.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),ce(n.TEXTURE_CUBE_MAP,y);for(let tt=0;tt<6;tt++)if(y.mipmaps&&y.mipmaps.length>0)for(let it=0;it<y.mipmaps.length;it++)Et(k.__webglFramebuffer[tt][it],C,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,it);else Et(k.__webglFramebuffer[tt],C,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0);_(y)&&b(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let tt=0,it=$.length;tt<it;tt++){let mt=$[tt],Dt=i.get(mt),yt=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(yt=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(yt,Dt.__webglTexture),ce(yt,mt),Et(k.__webglFramebuffer,C,mt,n.COLOR_ATTACHMENT0+tt,yt,0),_(mt)&&b(yt)}e.unbindTexture()}else{let tt=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(tt=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(tt,X.__webglTexture),ce(tt,y),y.mipmaps&&y.mipmaps.length>0)for(let it=0;it<y.mipmaps.length;it++)Et(k.__webglFramebuffer[it],C,y,n.COLOR_ATTACHMENT0,tt,it);else Et(k.__webglFramebuffer,C,y,n.COLOR_ATTACHMENT0,tt,0);_(y)&&b(tt),e.unbindTexture()}C.depthBuffer&&ae(C)}function le(C){let y=C.textures;for(let k=0,X=y.length;k<X;k++){let $=y[k];if(_($)){let ut=T(C),pt=i.get($).__webglTexture;e.bindTexture(ut,pt),b(ut),e.unbindTexture()}}}let Je=[],wi=[];function Yi(C){if(C.samples>0){if(li(C)===!1){let y=C.textures,k=C.width,X=C.height,$=n.COLOR_BUFFER_BIT,ut=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=i.get(C),tt=y.length>1;if(tt)for(let mt=0;mt<y.length;mt++)e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer);let it=C.texture.mipmaps;it&&it.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let mt=0;mt<y.length;mt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),tt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);let Dt=i.get(y[mt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Dt,0)}n.blitFramebuffer(0,0,k,X,0,0,k,X,$,n.NEAREST),l===!0&&(Je.length=0,wi.length=0,Je.push(n.COLOR_ATTACHMENT0+mt),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(Je.push(ut),wi.push(ut),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,wi)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Je))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),tt)for(let mt=0;mt<y.length;mt++){e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);let Dt=i.get(y[mt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.TEXTURE_2D,Dt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let y=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function Ze(C){return Math.min(r.maxSamples,C.samples)}function li(C){let y=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function B(C){let y=a.render.frame;h.get(C)!==y&&(h.set(C,y),C.update())}function Ii(C,y){let k=C.colorSpace,X=C.format,$=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==rs&&k!==Ke&&(ne.getTransfer(k)===be?(X!==_n||$!==rn)&&Vt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xt("WebGLTextures: Unsupported texture color space:",k)),y}function Te(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=j,this.resetTextureUnits=W,this.getTextureUnits=N,this.setTextureUnits=H,this.setTexture2D=ot,this.setTexture2DArray=K,this.setTexture3D=rt,this.setTextureCube=at,this.rebindTextures=fe,this.setupRenderTarget=Fe,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=Yi,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=li,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function H1(n,t){function e(i,r=Ke){let s,a=ne.getTransfer(r);if(i===rn)return n.UNSIGNED_BYTE;if(i===Lh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Nh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ep)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ip)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Qf)return n.BYTE;if(i===tp)return n.SHORT;if(i===da)return n.UNSIGNED_SHORT;if(i===Ih)return n.INT;if(i===sn)return n.UNSIGNED_INT;if(i===mn)return n.FLOAT;if(i===Nn)return n.HALF_FLOAT;if(i===np)return n.ALPHA;if(i===rp)return n.RGB;if(i===_n)return n.RGBA;if(i===Qn)return n.DEPTH_COMPONENT;if(i===Hr)return n.DEPTH_STENCIL;if(i===Dh)return n.RED;if(i===Fh)return n.RED_INTEGER;if(i===Vr)return n.RG;if(i===Uh)return n.RG_INTEGER;if(i===Oh)return n.RGBA_INTEGER;if(i===il||i===nl||i===rl||i===sl)if(a===be)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===il)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===nl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===rl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===il)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===nl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===rl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===sl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Bh||i===zh||i===kh||i===Hh)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Bh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===zh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===kh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Hh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Vh||i===Gh||i===Wh||i===Xh||i===qh||i===al||i===Yh)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Vh||i===Gh)return a===be?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Wh)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Xh)return s.COMPRESSED_R11_EAC;if(i===qh)return s.COMPRESSED_SIGNED_R11_EAC;if(i===al)return s.COMPRESSED_RG11_EAC;if(i===Yh)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Jh||i===jh||i===Zh||i===$h||i===Kh||i===Qh||i===tu||i===eu||i===iu||i===nu||i===ru||i===su||i===au||i===ou)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Jh)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===jh)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Zh)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===$h)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Kh)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qh)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===tu)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===eu)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===iu)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===nu)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ru)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===su)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===au)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ou)return a===be?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===lu||i===cu||i===hu)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===lu)return a===be?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===cu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===hu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===uu||i===du||i===ol||i===fu)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===uu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===du)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ol)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===fu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===fa?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var V1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,G1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Np=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new zo(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new ge({vertexShader:V1,fragmentShader:G1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Bt(new ii(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Dp=class extends tr{constructor(t,e){super();let i=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null,w=typeof XRWebGLBinding<"u",g=new Np,_={},b=e.getContextAttributes(),T=null,v=null,E=[],R=[],I=new ct,x=null,S=null,L=new Ji;L.viewport=new Ie;let U=new Ji;U.viewport=new Ie;let z=[L,U],W=new Th,N=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let nt=E[Q];return nt===void 0&&(nt=new ea,E[Q]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Q){let nt=E[Q];return nt===void 0&&(nt=new ea,E[Q]=nt),nt.getGripSpace()},this.getHand=function(Q){let nt=E[Q];return nt===void 0&&(nt=new ea,E[Q]=nt),nt.getHandSpace()};function j(Q){let nt=R.indexOf(Q.inputSource);if(nt===-1)return;let Rt=E[nt];Rt!==void 0&&(Rt.update(Q.inputSource,Q.frame,c||a),Rt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Z(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",Z),r.removeEventListener("inputsourceschange",ot);for(let Q=0;Q<E.length;Q++){let nt=R[Q];nt!==null&&(R[Q]=null,E[Q].disconnect(nt))}N=null,H=null,g.reset();for(let Q in _)delete _[Q];if(t.setRenderTarget(T),f=null,u=null,d=null,r=null,v=null,me.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(I.width,I.height,!1),S!==null){let Q=S.camera;Q.fov=S.fov,Q.zoom=S.zoom,Q.updateProjectionMatrix(),S=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,i.isPresenting===!0&&Vt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&Vt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&w&&(d=new XRWebGLBinding(r,e)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(T=t.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",Z),r.addEventListener("inputsourceschange",ot),b.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(I),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let Rt=null,Jt=null,Et=null;b.depth&&(Et=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Rt=b.stencil?Hr:Qn,Jt=b.stencil?fa:sn);let ie={colorFormat:e.RGBA8,depthFormat:Et,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(ie),r.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new Fi(u.textureWidth,u.textureHeight,{format:_n,type:rn,depthTexture:new rr(u.textureWidth,u.textureHeight,Jt,void 0,void 0,void 0,void 0,void 0,void 0,Rt),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let Rt={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,e,Rt),r.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Fi(f.framebufferWidth,f.framebufferHeight,{format:_n,type:rn,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),me.setContext(r),me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ot(Q){for(let nt=0;nt<Q.removed.length;nt++){let Rt=Q.removed[nt],Jt=R.indexOf(Rt);Jt>=0&&(R[Jt]=null,E[Jt].disconnect(Rt))}for(let nt=0;nt<Q.added.length;nt++){let Rt=Q.added[nt],Jt=R.indexOf(Rt);if(Jt===-1){for(let ie=0;ie<E.length;ie++)if(ie>=R.length){R.push(Rt),Jt=ie;break}else if(R[ie]===null){R[ie]=Rt,Jt=ie;break}if(Jt===-1)break}let Et=E[Jt];Et&&Et.connect(Rt)}}let K=new A,rt=new A;function at(Q,nt,Rt){K.setFromMatrixPosition(nt.matrixWorld),rt.setFromMatrixPosition(Rt.matrixWorld);let Jt=K.distanceTo(rt),Et=nt.projectionMatrix.elements,ie=Rt.projectionMatrix.elements,pi=Et[14]/(Et[10]-1),ae=Et[14]/(Et[10]+1),fe=(Et[9]+1)/Et[5],Fe=(Et[9]-1)/Et[5],le=(Et[8]-1)/Et[0],Je=(ie[8]+1)/ie[0],wi=pi*le,Yi=pi*Je,Ze=Jt/(-le+Je),li=Ze*-le;if(nt.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(li),Q.translateZ(Ze),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Et[10]===-1)Q.projectionMatrix.copy(nt.projectionMatrix),Q.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{let B=pi+Ze,Ii=ae+Ze,Te=wi-li,C=Yi+(Jt-li),y=fe*ae/Ii*B,k=Fe*ae/Ii*B;Q.projectionMatrix.makePerspective(Te,C,y,k,B,Ii),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Ht(Q,nt){nt===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(nt.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let nt=Q.near,Rt=Q.far;g.texture!==null&&(g.depthNear>0&&(nt=g.depthNear),g.depthFar>0&&(Rt=g.depthFar)),W.near=U.near=L.near=nt,W.far=U.far=L.far=Rt,(N!==W.near||H!==W.far)&&(r.updateRenderState({depthNear:W.near,depthFar:W.far}),N=W.near,H=W.far),W.layers.mask=Q.layers.mask|6,L.layers.mask=W.layers.mask&-5,U.layers.mask=W.layers.mask&-3;let Jt=Q.parent,Et=W.cameras;Ht(W,Jt);for(let ie=0;ie<Et.length;ie++)Ht(Et[ie],Jt);Et.length===2?at(W,L,U):W.projectionMatrix.copy(L.projectionMatrix),S===null&&Q.isPerspectiveCamera&&(S={camera:Q,fov:Q.fov,zoom:Q.zoom}),Ut(Q,W,Jt)};function Ut(Q,nt,Rt){Rt===null?Q.matrix.copy(nt.matrixWorld):(Q.matrix.copy(Rt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(nt.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(nt.projectionMatrix),Q.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Qs*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(W)},this.getCameraTexture=function(Q){return _[Q]};let De=null;function ce(Q,nt){if(h=nt.getViewerPose(c||a),m=nt,h!==null){let Rt=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let Jt=!1;Rt.length!==W.cameras.length&&(W.cameras.length=0,Jt=!0);for(let ae=0;ae<Rt.length;ae++){let fe=Rt[ae],Fe=null;if(f!==null)Fe=f.getViewport(fe);else{let Je=d.getViewSubImage(u,fe);Fe=Je.viewport,ae===0&&(t.setRenderTargetTextures(v,Je.colorTexture,Je.depthStencilTexture),t.setRenderTarget(v))}let le=z[ae];le===void 0&&(le=new Ji,le.layers.enable(ae),le.viewport=new Ie,z[ae]=le),le.matrix.fromArray(fe.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(fe.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),ae===0&&(W.matrix.copy(le.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Jt===!0&&W.cameras.push(le)}let Et=r.enabledFeatures;if(Et&&Et.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&w){d=i.getBinding();let ae=d.getDepthInformation(Rt[0]);ae&&ae.isValid&&ae.texture&&g.init(ae,r.renderState)}if(Et&&Et.includes("camera-access")&&w){t.state.unbindTexture(),d=i.getBinding();for(let ae=0;ae<Rt.length;ae++){let fe=Rt[ae].camera;if(fe){let Fe=_[fe];Fe||(Fe=new zo,_[fe]=Fe);let le=d.getCameraImage(fe);Fe.sourceTexture=le}}}}for(let Rt=0;Rt<E.length;Rt++){let Jt=R[Rt],Et=E[Rt];Jt!==null&&Et!==void 0&&Et.update(Jt,nt,c||a)}De&&De(Q,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),m=null}let me=new jg;me.setAnimationLoop(ce),this.setAnimationLoop=function(Q){De=Q},this.dispose=function(){}}},W1=new he,e0=new Yt;e0.set(-1,0,0,0,1,0,0,0,1);function X1(n,t){function e(g,_){g.matrixAutoUpdate===!0&&g.updateMatrix(),_.value.copy(g.matrix)}function i(g,_){_.color.getRGB(g.fogColor.value,up(n)),_.isFog?(g.fogNear.value=_.near,g.fogFar.value=_.far):_.isFogExp2&&(g.fogDensity.value=_.density)}function r(g,_,b,T,v){_.isNodeMaterial?_.uniformsNeedUpdate=!1:_.isMeshBasicMaterial?s(g,_):_.isMeshLambertMaterial?(s(g,_),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)):_.isMeshToonMaterial?(s(g,_),d(g,_)):_.isMeshPhongMaterial?(s(g,_),h(g,_),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)):_.isMeshStandardMaterial?(s(g,_),u(g,_),_.isMeshPhysicalMaterial&&f(g,_,v)):_.isMeshMatcapMaterial?(s(g,_),m(g,_)):_.isMeshDepthMaterial?s(g,_):_.isMeshDistanceMaterial?(s(g,_),w(g,_)):_.isMeshNormalMaterial?s(g,_):_.isLineBasicMaterial?(a(g,_),_.isLineDashedMaterial&&o(g,_)):_.isPointsMaterial?l(g,_,b,T):_.isSpriteMaterial?c(g,_):_.isShadowMaterial?(g.color.value.copy(_.color),g.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function s(g,_){g.opacity.value=_.opacity,_.color&&g.diffuse.value.copy(_.color),_.emissive&&g.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(g.map.value=_.map,e(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,e(_.alphaMap,g.alphaMapTransform)),_.bumpMap&&(g.bumpMap.value=_.bumpMap,e(_.bumpMap,g.bumpMapTransform),g.bumpScale.value=_.bumpScale,_.side===Ri&&(g.bumpScale.value*=-1)),_.normalMap&&(g.normalMap.value=_.normalMap,e(_.normalMap,g.normalMapTransform),g.normalScale.value.copy(_.normalScale),_.side===Ri&&g.normalScale.value.negate()),_.displacementMap&&(g.displacementMap.value=_.displacementMap,e(_.displacementMap,g.displacementMapTransform),g.displacementScale.value=_.displacementScale,g.displacementBias.value=_.displacementBias),_.emissiveMap&&(g.emissiveMap.value=_.emissiveMap,e(_.emissiveMap,g.emissiveMapTransform)),_.specularMap&&(g.specularMap.value=_.specularMap,e(_.specularMap,g.specularMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest);let b=t.get(_),T=b.envMap,v=b.envMapRotation;T&&(g.envMap.value=T,g.envMapRotation.value.setFromMatrix4(W1.makeRotationFromEuler(v)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(e0),g.reflectivity.value=_.reflectivity,g.ior.value=_.ior,g.refractionRatio.value=_.refractionRatio),_.lightMap&&(g.lightMap.value=_.lightMap,g.lightMapIntensity.value=_.lightMapIntensity,e(_.lightMap,g.lightMapTransform)),_.aoMap&&(g.aoMap.value=_.aoMap,g.aoMapIntensity.value=_.aoMapIntensity,e(_.aoMap,g.aoMapTransform))}function a(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,_.map&&(g.map.value=_.map,e(_.map,g.mapTransform))}function o(g,_){g.dashSize.value=_.dashSize,g.totalSize.value=_.dashSize+_.gapSize,g.scale.value=_.scale}function l(g,_,b,T){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.size.value=_.size*b,g.scale.value=T*.5,_.map&&(g.map.value=_.map,e(_.map,g.uvTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,e(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function c(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.rotation.value=_.rotation,_.map&&(g.map.value=_.map,e(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,e(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function h(g,_){g.specular.value.copy(_.specular),g.shininess.value=Math.max(_.shininess,1e-4)}function d(g,_){_.gradientMap&&(g.gradientMap.value=_.gradientMap)}function u(g,_){g.metalness.value=_.metalness,_.metalnessMap&&(g.metalnessMap.value=_.metalnessMap,e(_.metalnessMap,g.metalnessMapTransform)),g.roughness.value=_.roughness,_.roughnessMap&&(g.roughnessMap.value=_.roughnessMap,e(_.roughnessMap,g.roughnessMapTransform)),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)}function f(g,_,b){g.ior.value=_.ior,_.sheen>0&&(g.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),g.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(g.sheenColorMap.value=_.sheenColorMap,e(_.sheenColorMap,g.sheenColorMapTransform)),_.sheenRoughnessMap&&(g.sheenRoughnessMap.value=_.sheenRoughnessMap,e(_.sheenRoughnessMap,g.sheenRoughnessMapTransform))),_.clearcoat>0&&(g.clearcoat.value=_.clearcoat,g.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(g.clearcoatMap.value=_.clearcoatMap,e(_.clearcoatMap,g.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,e(_.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(g.clearcoatNormalMap.value=_.clearcoatNormalMap,e(_.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Ri&&g.clearcoatNormalScale.value.negate())),_.dispersion>0&&(g.dispersion.value=_.dispersion),_.retroreflectivity>0&&(g.retroreflectivity.value=_.retroreflectivity),_.iridescence>0&&(g.iridescence.value=_.iridescence,g.iridescenceIOR.value=_.iridescenceIOR,g.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(g.iridescenceMap.value=_.iridescenceMap,e(_.iridescenceMap,g.iridescenceMapTransform)),_.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=_.iridescenceThicknessMap,e(_.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),_.transmission>0&&(g.transmission.value=_.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),_.transmissionMap&&(g.transmissionMap.value=_.transmissionMap,e(_.transmissionMap,g.transmissionMapTransform)),g.thickness.value=_.thickness,_.thicknessMap&&(g.thicknessMap.value=_.thicknessMap,e(_.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=_.attenuationDistance,g.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(g.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(g.anisotropyMap.value=_.anisotropyMap,e(_.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=_.specularIntensity,g.specularColor.value.copy(_.specularColor),_.specularColorMap&&(g.specularColorMap.value=_.specularColorMap,e(_.specularColorMap,g.specularColorMapTransform)),_.specularIntensityMap&&(g.specularIntensityMap.value=_.specularIntensityMap,e(_.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,_){_.matcap&&(g.matcap.value=_.matcap)}function w(g,_){let b=t.get(_).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function q1(n,t,e,i){let r={},s={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,E){let R=E.program;i.uniformBlockBinding(v,R)}function c(v,E){let R=r[v.id];R===void 0&&(g(v),R=h(v),r[v.id]=R,v.addEventListener("dispose",b));let I=E.program;i.updateUBOMapping(v,I);let x=t.render.frame;s[v.id]!==x&&(u(v),s[v.id]=x)}function h(v){let E=d();v.__bindingPointIndex=E;let R=n.createBuffer(),I=v.__size,x=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,R),n.bufferData(n.UNIFORM_BUFFER,I,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,R),R}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Xt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let E=r[v.id],R=v.uniforms,I=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let x=0,S=R.length;x<S;x++){let L=R[x];if(Array.isArray(L))for(let U=0,z=L.length;U<z;U++)f(L[U],x,U,I);else f(L,x,0,I)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(v,E,R,I){if(w(v,E,R,I)===!0){let x=v.__offset,S=v.value;if(Array.isArray(S)){let L=0;for(let U=0;U<S.length;U++){let z=S[U],W=_(z);m(z,v.__data,L),typeof z!="number"&&typeof z!="boolean"&&!z.isMatrix3&&!ArrayBuffer.isView(z)&&(L+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(S,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,v.__data)}}function m(v,E,R){typeof v=="number"||typeof v=="boolean"?E[0]=v:v.isMatrix3?(E[0]=v.elements[0],E[1]=v.elements[1],E[2]=v.elements[2],E[3]=0,E[4]=v.elements[3],E[5]=v.elements[4],E[6]=v.elements[5],E[7]=0,E[8]=v.elements[6],E[9]=v.elements[7],E[10]=v.elements[8],E[11]=0):ArrayBuffer.isView(v)?E.set(new v.constructor(v.buffer,v.byteOffset,E.length)):v.toArray(E,R)}function w(v,E,R,I){let x=v.value,S=E+"_"+R;if(I[S]===void 0)return typeof x=="number"||typeof x=="boolean"?I[S]=x:ArrayBuffer.isView(x)?I[S]=x.slice():I[S]=x.clone(),!0;{let L=I[S];if(typeof x=="number"||typeof x=="boolean"){if(L!==x)return I[S]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(L.equals(x)===!1)return L.copy(x),!0}}return!1}function g(v){let E=v.uniforms,R=0,I=16;for(let S=0,L=E.length;S<L;S++){let U=Array.isArray(E[S])?E[S]:[E[S]];for(let z=0,W=U.length;z<W;z++){let N=U[z],H=Array.isArray(N.value)?N.value:[N.value];for(let j=0,Z=H.length;j<Z;j++){let ot=H[j],K=_(ot),rt=R%I,at=rt%K.boundary,Ht=rt+at;R+=at,Ht!==0&&I-Ht<K.storage&&(R+=I-Ht),N.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=R,R+=K.storage}}}let x=R%I;return x>0&&(R+=I-x),v.__size=R,v.__cache={},this}function _(v){let E={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(E.boundary=4,E.storage=4):v.isVector2?(E.boundary=8,E.storage=8):v.isVector3||v.isColor?(E.boundary=16,E.storage=12):v.isVector4?(E.boundary=16,E.storage=16):v.isMatrix3?(E.boundary=48,E.storage=48):v.isMatrix4?(E.boundary=64,E.storage=64):v.isTexture?Vt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(E.boundary=16,E.storage=v.byteLength):Vt("WebGLRenderer: Unsupported uniform value type.",v),E}function b(v){let E=v.target;E.removeEventListener("dispose",b);let R=a.indexOf(E.__bindingPointIndex);a.splice(R,1),n.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function T(){for(let v in r)n.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:l,update:c,dispose:T}}var Y1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),lr=null;function J1(){return lr===null&&(lr=new No(Y1,16,16,Vr,Nn),lr.name="DFG_LUT",lr.minFilter=ai,lr.magFilter=ai,lr.wrapS=un,lr.wrapT=un,lr.generateMipmaps=!1,lr.needsUpdate=!0),lr}var vu=class{constructor(t={}){let{canvas:e=mg(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=rn}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;let w=f,g=new Set([Oh,Uh,Fh]),_=new Set([rn,sn,da,fa,Lh,Nh]),b=new Uint32Array(4),T=new Int32Array(4),v=new A,E=null,R=null,I=[],x=[],S=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,U=!1,z=null,W=null,N=null,H=null;this._outputColorSpace=Wi;let j=0,Z=0,ot=null,K=-1,rt=null,at=new Ie,Ht=new Ie,Ut=null,De=new qt(0),ce=0,me=e.width,Q=e.height,nt=1,Rt=null,Jt=null,Et=new Ie(0,0,me,Q),ie=new Ie(0,0,me,Q),pi=!1,ae=new Fo,fe=!1,Fe=!1,le=new he,Je=new A,wi=new Ie,Yi={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ze=!1;function li(){return ot===null?nt:1}let B=i;function Ii(M,F){return e.getContext(M,F)}let Te,C,y,k,X,$,ut,pt,tt,it,mt,Dt,yt,_t,Ft,Gt,Zt,O,gt,et,wt,St,st;try{let M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Ue,!1),e.addEventListener("webglcontextrestored",ve,!1),e.addEventListener("webglcontextcreationerror",bn,!1),B===null){let F="webgl2";if(B=Ii(F,M),B===null)throw Ii(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ot()}catch(M){throw e.removeEventListener("webglcontextlost",Ue,!1),e.removeEventListener("webglcontextrestored",ve,!1),e.removeEventListener("webglcontextcreationerror",bn,!1),Xt("WebGLRenderer: "+M.message),M}function Ot(){Te=new eM(B),Te.init(),wt=new H1(B,Te),C=new XS(B,Te,t,wt),y=new z1(B,Te),C.reversedDepthBuffer&&u&&y.buffers.depth.setReversed(!0),W=B.createFramebuffer(),N=B.createFramebuffer(),H=B.createFramebuffer(),k=new rM(B),X=new E1,$=new k1(B,Te,y,X,C,wt,k),ut=new tM(L),pt=new ax(B),St=new GS(B,pt),tt=new iM(B,pt,k,St),it=new aM(B,tt,pt,St,k),O=new sM(B,C,$),Ft=new qS(X),mt=new M1(L,ut,Te,C,St,Ft),Dt=new X1(L,X),yt=new R1,_t=new N1(Te),Zt=new VS(L,ut,y,it,m,l),Gt=new B1(L,it,C),st=new q1(B,k,C,y),gt=new WS(B,Te,k),et=new nM(B,Te,k),k.programs=mt.programs,L.capabilities=C,L.extensions=Te,L.properties=X,L.renderLists=yt,L.shadowMap=Gt,L.state=y,L.info=k}w!==rn&&(S=new lM(w,e.width,e.height,o,r,s));let It=new Dp(L,B);this.xr=It,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let M=Te.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=Te.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(M){M!==void 0&&(nt=M,this.setSize(me,Q,!1))},this.getSize=function(M){return M.set(me,Q)},this.setSize=function(M,F,Y=!0){if(It.isPresenting){Vt("WebGLRenderer: Can't change size while VR device is presenting.");return}me=M,Q=F,e.width=Math.floor(M*nt),e.height=Math.floor(F*nt),Y===!0&&(e.style.width=M+"px",e.style.height=F+"px"),S!==null&&S.setSize(e.width,e.height),this.setViewport(0,0,M,F)},this.getDrawingBufferSize=function(M){return M.set(me*nt,Q*nt).floor()},this.setDrawingBufferSize=function(M,F,Y){me=M,Q=F,nt=Y,e.width=Math.floor(M*Y),e.height=Math.floor(F*Y),this.setViewport(0,0,M,F)},this.setEffects=function(M){if(w===rn){Xt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let F=0;F<M.length;F++)if(M[F].isOutputPass===!0){Vt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(at)},this.getViewport=function(M){return M.copy(Et)},this.setViewport=function(M,F,Y,V){M.isVector4?Et.set(M.x,M.y,M.z,M.w):Et.set(M,F,Y,V),y.viewport(at.copy(Et).multiplyScalar(nt).round())},this.getScissor=function(M){return M.copy(ie)},this.setScissor=function(M,F,Y,V){M.isVector4?ie.set(M.x,M.y,M.z,M.w):ie.set(M,F,Y,V),y.scissor(Ht.copy(ie).multiplyScalar(nt).round())},this.getScissorTest=function(){return pi},this.setScissorTest=function(M){y.setScissorTest(pi=M)},this.setOpaqueSort=function(M){Rt=M},this.setTransparentSort=function(M){Jt=M},this.getClearColor=function(M){return M.copy(Zt.getClearColor())},this.setClearColor=function(){Zt.setClearColor(...arguments)},this.getClearAlpha=function(){return Zt.getClearAlpha()},this.setClearAlpha=function(){Zt.setClearAlpha(...arguments)},this.clear=function(M=!0,F=!0,Y=!0){let V=0;if(M){let G=!1;if(ot!==null){let bt=ot.texture.format;G=g.has(bt)}if(G){let bt=ot.texture.type,Tt=_.has(bt),xt=Zt.getClearColor(),At=Zt.getClearAlpha(),Lt=xt.r,Qt=xt.g,oe=xt.b;Tt?(b[0]=Lt,b[1]=Qt,b[2]=oe,b[3]=At,B.clearBufferuiv(B.COLOR,0,b)):(T[0]=Lt,T[1]=Qt,T[2]=oe,T[3]=At,B.clearBufferiv(B.COLOR,0,T))}else V|=B.COLOR_BUFFER_BIT}F&&(V|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(V|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&B.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),z=M},this.dispose=function(){e.removeEventListener("webglcontextlost",Ue,!1),e.removeEventListener("webglcontextrestored",ve,!1),e.removeEventListener("webglcontextcreationerror",bn,!1),Zt.dispose(),yt.dispose(),_t.dispose(),X.dispose(),ut.dispose(),it.dispose(),St.dispose(),st.dispose(),mt.dispose(),It.dispose(),It.removeEventListener("sessionstart",Wm),It.removeEventListener("sessionend",Xm),Kr.stop()};function Ue(M){M.preventDefault(),Ro("WebGLRenderer: Context Lost."),U=!0}function ve(){Ro("WebGLRenderer: Context Restored."),U=!1;let M=k.autoReset,F=Gt.enabled,Y=Gt.autoUpdate,V=Gt.needsUpdate,G=Gt.type;Ot(),k.autoReset=M,Gt.enabled=F,Gt.autoUpdate=Y,Gt.needsUpdate=V,Gt.type=G}function bn(M){Xt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Jn(M){let F=M.target;F.removeEventListener("dispose",Jn),Ry(F)}function Ry(M){Ay(M),X.remove(M)}function Ay(M){let F=X.get(M).programs;F!==void 0&&(F.forEach(function(Y){mt.releaseProgram(Y)}),M.isShaderMaterial&&mt.releaseShaderCache(M))}this.renderBufferDirect=function(M,F,Y,V,G,bt){F===null&&(F=Yi);let Tt=G.isMesh&&G.matrixWorld.determinantAffine()<0,xt=Iy(M,F,Y,V,G);y.setMaterial(V,Tt);let At=Y.index,Lt=1;if(V.wireframe===!0){if(At=tt.getWireframeAttribute(Y),At===void 0)return;Lt=2}let Qt=Y.drawRange,oe=Y.attributes.position,Ct=Qt.start*Lt,xe=(Qt.start+Qt.count)*Lt;bt!==null&&(Ct=Math.max(Ct,bt.start*Lt),xe=Math.min(xe,(bt.start+bt.count)*Lt)),At!==null?(Ct=Math.max(Ct,0),xe=Math.min(xe,At.count)):oe!=null&&(Ct=Math.max(Ct,0),xe=Math.min(xe,oe.count));let ci=xe-Ct;if(ci<0||ci===1/0)return;St.setup(G,V,xt,Y,At);let ke,Le=gt;if(At!==null&&(ke=pt.get(At),Le=et,Le.setIndex(ke)),G.isMesh)V.wireframe===!0?(y.setLineWidth(V.wireframeLinewidth*li()),Le.setMode(B.LINES)):Le.setMode(B.TRIANGLES);else if(G.isLine){let Li=V.linewidth;Li===void 0&&(Li=1),y.setLineWidth(Li*li()),G.isLineSegments?Le.setMode(B.LINES):G.isLineLoop?Le.setMode(B.LINE_LOOP):Le.setMode(B.LINE_STRIP)}else G.isPoints?Le.setMode(B.POINTS):G.isSprite&&Le.setMode(B.TRIANGLES);if(G.isBatchedMesh)if(Te.get("WEBGL_multi_draw"))Le.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Li=G._multiDrawStarts,Mt=G._multiDrawCounts,Vi=G._multiDrawCount,ue=At?pt.get(At).bytesPerElement:1,cn=X.get(V).currentProgram.getUniforms();for(let jn=0;jn<Vi;jn++)cn.setValue(B,"_gl_DrawID",jn),Le.render(Li[jn]/ue,Mt[jn])}else if(G.isInstancedMesh)Le.renderInstances(Ct,ci,G.count);else if(Y.isInstancedBufferGeometry){let Li=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Mt=Math.min(Y.instanceCount,Li);Le.renderInstances(Ct,ci,Mt)}else Le.render(Ct,ci)};function Gm(M,F,Y,V){z!==null&&M.isNodeMaterial&&z.setObject(V,M),fe===!0&&Ft.setState(M,Y,!1),M.transparent===!0&&M.side===Ge&&M.forceSinglePass===!1?(M.side=Ri,M.needsUpdate=!0,cc(M,F,V),M.side=zr,M.needsUpdate=!0,cc(M,F,V),M.side=Ge):cc(M,F,V)}this.compile=function(M,F,Y=null){Y===null&&(Y=M),z!==null&&z.renderStart(M,F,Y),R=_t.get(Y),R.init(F),x.push(R),Y.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(R.pushLight(G),G.castShadow&&R.pushShadow(G))}),M!==Y&&M.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(R.pushLight(G),G.castShadow&&R.pushShadow(G))}),R.setupLights(),z!==null&&z.updateLights(R.state.lightsArray),Fe=this.localClippingEnabled,fe=Ft.init(this.clippingPlanes,Fe),fe===!0&&Ft.setGlobalState(this.clippingPlanes,F),z!==null&&Gt.render(R.state.shadowsArray,Y,F);let V=new Set;return M.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let bt=G.material;if(bt)if(Array.isArray(bt))for(let Tt=0;Tt<bt.length;Tt++){let xt=bt[Tt];Gm(xt,Y,F,G),V.add(xt)}else Gm(bt,Y,F,G),V.add(bt)}),R=x.pop(),z!==null&&z.renderEnd(),V},this.compileAsync=function(M,F,Y=null){let V=this.compile(M,F,Y);return new Promise(G=>{function bt(){if(V.forEach(function(Tt){let At=X.get(Tt).currentProgram;(At===void 0||At.isReady())&&V.delete(Tt)}),V.size===0){G(M);return}setTimeout(bt,10)}Te.get("KHR_parallel_shader_compile")!==null?bt():setTimeout(bt,10)})};let tf=null;function Cy(M){tf&&tf(M)}function Wm(){Kr.stop()}function Xm(){Kr.start()}let Kr=new jg;Kr.setAnimationLoop(Cy),typeof self<"u"&&Kr.setContext(self),this.setAnimationLoop=function(M){tf=M,It.setAnimationLoop(M),M===null?Kr.stop():Kr.start()},It.addEventListener("sessionstart",Wm),It.addEventListener("sessionend",Xm),this.render=function(M,F){if(F!==void 0&&F.isCamera!==!0){Xt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;z!==null&&z.renderStart(M,F);let Y=It.enabled===!0&&It.isPresenting===!0,V=S!==null&&(ot===null||Y)&&S.begin(L,ot);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),It.enabled===!0&&It.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(It.cameraAutoUpdate===!0&&It.updateCamera(F),F=It.getCamera()),M.isScene===!0&&M.onBeforeRender(L,M,F,ot),R=_t.get(M,x.length),R.init(F),R.state.textureUnits=$.getTextureUnits(),x.push(R),le.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ae.setFromProjectionMatrix(le,An,F.reversedDepth),Fe=this.localClippingEnabled,fe=Ft.init(this.clippingPlanes,Fe),E=yt.get(M,I.length),E.init(),I.push(E),It.enabled===!0&&It.isPresenting===!0){let Tt=L.xr.getDepthSensingMesh();Tt!==null&&ef(Tt,F,-1/0,L.sortObjects)}ef(M,F,0,L.sortObjects),E.finish(),z!==null&&z.updateLights(R.state.lightsArray),L.sortObjects===!0&&E.sort(Rt,Jt),Ze=It.enabled===!1||It.isPresenting===!1||It.hasDepthSensing()===!1,Ze&&Zt.addToRenderList(E,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),fe===!0&&Ft.beginShadows();let G=R.state.shadowsArray;if(Gt.render(G,M,F),fe===!0&&Ft.endShadows(),(V&&S.hasRenderPass())===!1){let Tt=E.opaque,xt=E.transmissive;if(R.setupLights(),F.isArrayCamera){let At=F.cameras;if(xt.length>0)for(let Lt=0,Qt=At.length;Lt<Qt;Lt++){let oe=At[Lt];Ym(Tt,xt,M,oe)}Ze&&Zt.render(M);for(let Lt=0,Qt=At.length;Lt<Qt;Lt++){let oe=At[Lt];qm(E,M,oe,oe.viewport)}}else xt.length>0&&Ym(Tt,xt,M,F),Ze&&Zt.render(M),qm(E,M,F)}ot!==null&&Z===0&&($.updateMultisampleRenderTarget(ot),$.updateRenderTargetMipmap(ot)),V&&S.end(L),M.isScene===!0&&M.onAfterRender(L,M,F),St.resetDefaultState(),K=-1,rt=null,x.pop(),x.length>0?(R=x[x.length-1],$.setTextureUnits(R.state.textureUnits),fe===!0&&Ft.setGlobalState(L.clippingPlanes,R.state.camera)):R=null,I.pop(),I.length>0?E=I[I.length-1]:E=null,z!==null&&z.renderEnd()};function ef(M,F,Y,V){if(M.visible===!1)return;if(M.layers.test(F.layers)){if(M.isGroup)Y=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(F);else if(M.isLightProbeGrid)R.pushLightProbeGrid(M);else if(M.isLight)R.pushLight(M),M.castShadow&&R.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(ae)){V&&wi.setFromMatrixPosition(M.matrixWorld).applyMatrix4(le);let Tt=it.update(M),xt=M.material;xt.visible&&E.push(M,Tt,xt,Y,wi.z,null,F)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(ae))){let Tt=it.update(M),xt=M.material;if(V&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),wi.copy(M.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),wi.copy(Tt.boundingSphere.center)),wi.applyMatrix4(M.matrixWorld).applyMatrix4(le)),Array.isArray(xt)){let At=Tt.groups;for(let Lt=0,Qt=At.length;Lt<Qt;Lt++){let oe=At[Lt],Ct=xt[oe.materialIndex];Ct&&Ct.visible&&E.push(M,Tt,Ct,Y,wi.z,oe,F)}}else xt.visible&&E.push(M,Tt,xt,Y,wi.z,null,F)}}let bt=M.children;for(let Tt=0,xt=bt.length;Tt<xt;Tt++)ef(bt[Tt],F,Y,V)}function qm(M,F,Y,V){let{opaque:G,transmissive:bt,transparent:Tt}=M;R.setupLightsView(Y),fe===!0&&Ft.setGlobalState(L.clippingPlanes,Y),V&&y.viewport(at.copy(V)),G.length>0&&lc(G,F,Y),bt.length>0&&lc(bt,F,Y),Tt.length>0&&lc(Tt,F,Y),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Ym(M,F,Y,V){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[V.id]===void 0){let Ct=Te.has("EXT_color_buffer_half_float")||Te.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[V.id]=new Fi(1,1,{generateMipmaps:!0,type:Ct?Nn:rn,minFilter:or,samples:Math.max(4,C.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ne.workingColorSpace})}let bt=R.state.transmissionRenderTarget[V.id],Tt=V.viewport||at;bt.setSize(Tt.z*L.transmissionResolutionScale,Tt.w*L.transmissionResolutionScale);let xt=L.getRenderTarget(),At=L.getActiveCubeFace(),Lt=L.getActiveMipmapLevel();L.setRenderTarget(bt),L.getClearColor(De),ce=L.getClearAlpha(),ce<1&&L.setClearColor(16777215,.5),L.clear(),Ze&&Zt.render(Y);let Qt=L.toneMapping;L.toneMapping=Ln;let oe=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),R.setupLightsView(V),fe===!0&&Ft.setGlobalState(L.clippingPlanes,V),lc(M,Y,V),$.updateMultisampleRenderTarget(bt),$.updateRenderTargetMipmap(bt),Te.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let xe=0,ci=F.length;xe<ci;xe++){let ke=F[xe],{object:Le,geometry:Li,material:Mt,group:Vi}=ke;if(Mt.side===Ge&&Le.layers.test(V.layers)){let ue=Mt.side;Mt.side=Ri,Mt.needsUpdate=!0,Jm(Le,Y,V,Li,Mt,Vi),Mt.side=ue,Mt.needsUpdate=!0,Ct=!0}}Ct===!0&&($.updateMultisampleRenderTarget(bt),$.updateRenderTargetMipmap(bt))}L.setRenderTarget(xt,At,Lt),L.setClearColor(De,ce),oe!==void 0&&(V.viewport=oe),L.toneMapping=Qt}function lc(M,F,Y){let V=F.isScene===!0?F.overrideMaterial:null;for(let G=0,bt=M.length;G<bt;G++){let Tt=M[G],{object:xt,geometry:At,group:Lt}=Tt,Qt=Tt.material;Qt.allowOverride===!0&&V!==null&&(Qt=V),xt.layers.test(Y.layers)&&Jm(xt,F,Y,At,Qt,Lt)}}function Jm(M,F,Y,V,G,bt){z!==null&&G.isNodeMaterial&&z.setObject(M,G),M.onBeforeRender(L,F,Y,V,G,bt),M.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),G.onBeforeRender(L,F,Y,V,M,bt),G.transparent===!0&&G.side===Ge&&G.forceSinglePass===!1?(G.side=Ri,G.needsUpdate=!0,L.renderBufferDirect(Y,F,V,G,M,bt),G.side=zr,G.needsUpdate=!0,L.renderBufferDirect(Y,F,V,G,M,bt),G.side=Ge):L.renderBufferDirect(Y,F,V,G,M,bt),M.onAfterRender(L,F,Y,V,G,bt)}function cc(M,F,Y){F.isScene!==!0&&(F=Yi);let V=X.get(M),G=R.state.lights,bt=R.state.shadowsArray,Tt=G.state.version,xt=mt.getParameters(M,G.state,bt,F,Y,R.state.lightProbeGridArray),At=mt.getProgramCacheKey(xt),Lt=V.programs;V.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?F.environment:null,V.fog=F.fog;let Qt=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;V.envMap=ut.get(M.envMap||V.environment,Qt),V.envMapRotation=V.environment!==null&&M.envMap===null?F.environmentRotation:M.envMapRotation,Lt===void 0&&(M.addEventListener("dispose",Jn),Lt=new Map,V.programs=Lt);let oe=Lt.get(At);if(oe!==void 0){if(V.currentProgram===oe&&V.lightsStateVersion===Tt)return Zm(M,xt),oe}else xt.uniforms=mt.getUniforms(M),z!==null&&M.isNodeMaterial&&z.build(M,Y,xt),M.onBeforeCompile(xt,L),oe=mt.acquireProgram(xt,At),Lt.set(At,oe),V.uniforms=xt.uniforms;let Ct=V.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ct.clippingPlanes=Ft.uniform),Zm(M,xt),V.needsLights=Ny(M),V.lightsStateVersion=Tt,V.needsLights&&(Ct.ambientLightColor.value=G.state.ambient,Ct.lightProbe.value=G.state.probe,Ct.sunLights.value=G.state.sun,Ct.sunLightShadows.value=G.state.sunShadow,Ct.directionalLights.value=G.state.directional,Ct.directionalLightShadows.value=G.state.directionalShadow,Ct.spotLights.value=G.state.spot,Ct.spotLightShadows.value=G.state.spotShadow,Ct.rectAreaLights.value=G.state.rectArea,Ct.ltc_1.value=G.state.rectAreaLTC1,Ct.ltc_2.value=G.state.rectAreaLTC2,Ct.pointLights.value=G.state.point,Ct.pointLightShadows.value=G.state.pointShadow,Ct.hemisphereLights.value=G.state.hemi,Ct.sunShadowMatrix.value=G.state.sunShadowMatrix,Ct.sunShadowCascade.value=G.state.sunShadowCascade,Ct.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ct.spotLightMatrix.value=G.state.spotLightMatrix,Ct.spotLightMap.value=G.state.spotLightMap,Ct.pointShadowMatrix.value=G.state.pointShadowMatrix),V.lightProbeGrid=R.state.lightProbeGridArray.length>0,V.currentProgram=oe,V.uniformsList=null,oe}function jm(M){if(M.uniformsList===null){let F=M.currentProgram.getUniforms();M.uniformsList=_a.seqWithValue(F.seq,M.uniforms)}return M.uniformsList}function Zm(M,F){let Y=X.get(M);Y.outputColorSpace=F.outputColorSpace,Y.batching=F.batching,Y.batchingColor=F.batchingColor,Y.instancing=F.instancing,Y.instancingColor=F.instancingColor,Y.instancingMorph=F.instancingMorph,Y.skinning=F.skinning,Y.morphTargets=F.morphTargets,Y.morphNormals=F.morphNormals,Y.morphColors=F.morphColors,Y.morphTargetsCount=F.morphTargetsCount,Y.numClippingPlanes=F.numClippingPlanes,Y.numIntersection=F.numClipIntersection,Y.vertexAlphas=F.vertexAlphas,Y.vertexTangents=F.vertexTangents,Y.toneMapping=F.toneMapping}function Py(M,F){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;v.setFromMatrixPosition(F.matrixWorld);for(let Y=0,V=M.length;Y<V;Y++){let G=M[Y];if(G.texture!==null&&G.boundingBox.containsPoint(v))return G}return null}function Iy(M,F,Y,V,G){F.isScene!==!0&&(F=Yi),$.resetTextureUnits();let bt=F.fog,Tt=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?F.environment:null,xt=ot===null?L.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:ne.workingColorSpace,At=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Lt=ut.get(V.envMap||Tt,At),Qt=V.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,oe=!!Y.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ct=!!Y.morphAttributes.position,xe=!!Y.morphAttributes.normal,ci=!!Y.morphAttributes.color,ke=Ln;V.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(ke=L.toneMapping);let Le=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Li=Le!==void 0?Le.length:0,Mt=X.get(V),Vi=R.state.lights;if(fe===!0&&(Fe===!0||M!==rt)){let Oe=M===rt&&V.id===K;Ft.setState(V,M,Oe)}let ue=!1;V.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==Vi.state.version||Mt.outputColorSpace!==xt||G.isBatchedMesh&&Mt.batching===!1||!G.isBatchedMesh&&Mt.batching===!0||G.isBatchedMesh&&Mt.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&Mt.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&Mt.instancing===!1||!G.isInstancedMesh&&Mt.instancing===!0||G.isSkinnedMesh&&Mt.skinning===!1||!G.isSkinnedMesh&&Mt.skinning===!0||G.isInstancedMesh&&Mt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Mt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Mt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Mt.instancingMorph===!1&&G.morphTexture!==null||Mt.envMap!==Lt||V.fog===!0&&Mt.fog!==bt||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==Ft.numPlanes||Mt.numIntersection!==Ft.numIntersection)||Mt.vertexAlphas!==Qt||Mt.vertexTangents!==oe||Mt.morphTargets!==Ct||Mt.morphNormals!==xe||Mt.morphColors!==ci||Mt.toneMapping!==ke||Mt.morphTargetsCount!==Li||!!Mt.lightProbeGrid!=R.state.lightProbeGridArray.length>0)&&(ue=!0):(ue=!0,Mt.__version=V.version);let cn=Mt.currentProgram;ue===!0&&(cn=cc(V,F,G),z&&V.isNodeMaterial&&z.onUpdateProgram(V,cn,Mt));let jn=!1,Rr=!1,Rs=!1,Ce=cn.getUniforms(),si=Mt.uniforms;if(y.useProgram(cn.program)&&(jn=!0,Rr=!0,Rs=!0),V.id!==K&&(K=V.id,Rr=!0),Mt.needsLights){let Oe=Py(R.state.lightProbeGridArray,G);Mt.lightProbeGrid!==Oe&&(Mt.lightProbeGrid=Oe,Rr=!0)}if(jn||rt!==M){y.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Ce.setValue(B,"projectionMatrix",M.projectionMatrix),Ce.setValue(B,"viewMatrix",M.matrixWorldInverse);let Cr=Ce.map.cameraPosition;Cr!==void 0&&Cr.setValue(B,Je.setFromMatrixPosition(M.matrixWorld)),C.logarithmicDepthBuffer&&Ce.setValue(B,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Ce.setValue(B,"isOrthographic",M.isOrthographicCamera===!0),rt!==M&&(rt=M,Rr=!0,Rs=!0)}if(Mt.needsLights&&(Vi.state.sunShadowMap.length>0&&Ce.setValue(B,"sunShadowMap",Vi.state.sunShadowMap,$),Vi.state.directionalShadowMap.length>0&&Ce.setValue(B,"directionalShadowMap",Vi.state.directionalShadowMap,$),Vi.state.spotShadowMap.length>0&&Ce.setValue(B,"spotShadowMap",Vi.state.spotShadowMap,$),Vi.state.pointShadowMap.length>0&&Ce.setValue(B,"pointShadowMap",Vi.state.pointShadowMap,$)),G.isSkinnedMesh){Ce.setOptional(B,G,"bindMatrix"),Ce.setOptional(B,G,"bindMatrixInverse");let Oe=G.skeleton;Oe&&(Oe.boneTexture===null&&Oe.computeBoneTexture(),Ce.setValue(B,"boneTexture",Oe.boneTexture,$))}G.isBatchedMesh&&(Ce.setOptional(B,G,"batchingTexture"),Ce.setValue(B,"batchingTexture",G._matricesTexture,$),Ce.setOptional(B,G,"batchingIdTexture"),Ce.setValue(B,"batchingIdTexture",G._indirectTexture,$),Ce.setOptional(B,G,"batchingColorTexture"),G._colorsTexture!==null&&Ce.setValue(B,"batchingColorTexture",G._colorsTexture,$));let Ar=Y.morphAttributes;if((Ar.position!==void 0||Ar.normal!==void 0||Ar.color!==void 0)&&O.update(G,Y,cn),(Rr||Mt.receiveShadow!==G.receiveShadow)&&(Mt.receiveShadow=G.receiveShadow,Ce.setValue(B,"receiveShadow",G.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&F.environment!==null&&(si.envMapIntensity.value=F.environmentIntensity),si.dfgLUT!==void 0&&(si.dfgLUT.value=J1()),Rr){if(Ce.setValue(B,"toneMappingExposure",L.toneMappingExposure),Mt.needsLights&&Ly(si,Rs),bt&&V.fog===!0&&Dt.refreshFogUniforms(si,bt),Dt.refreshMaterialUniforms(si,V,nt,Q,R.state.transmissionRenderTarget[M.id]),Mt.needsLights&&Mt.lightProbeGrid){let Oe=Mt.lightProbeGrid;si.probesSH.value=Oe.texture,si.probesMin.value.copy(Oe.boundingBox.min),si.probesMax.value.copy(Oe.boundingBox.max),si.probesResolution.value.copy(Oe.resolution)}_a.upload(B,jm(Mt),si,$)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(_a.upload(B,jm(Mt),si,$),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Ce.setValue(B,"center",G.center),Ce.setValue(B,"modelViewMatrix",G.modelViewMatrix),Ce.setValue(B,"normalMatrix",G.normalMatrix),Ce.setValue(B,"modelMatrix",G.matrixWorld),V.uniformsGroups!==void 0){let Oe=V.uniformsGroups;for(let Cr=0,As=Oe.length;Cr<As;Cr++){let Km=Oe[Cr];st.update(Km,cn),st.bind(Km,cn)}}return cn}function Ly(M,F){M.ambientLightColor.needsUpdate=F,M.lightProbe.needsUpdate=F,M.sunLights.needsUpdate=F,M.sunLightShadows.needsUpdate=F,M.directionalLights.needsUpdate=F,M.directionalLightShadows.needsUpdate=F,M.pointLights.needsUpdate=F,M.pointLightShadows.needsUpdate=F,M.spotLights.needsUpdate=F,M.spotLightShadows.needsUpdate=F,M.rectAreaLights.needsUpdate=F,M.hemisphereLights.needsUpdate=F}function Ny(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return ot},this.setRenderTargetTextures=function(M,F,Y){let V=X.get(M);V.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),X.get(M.texture).__webglTexture=F,X.get(M.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:Y,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,F){let Y=X.get(M);Y.__webglFramebuffer=F,Y.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(M,F=0,Y=0){ot=M,j=F,Z=Y;let V=null,G=!1,bt=!1;if(M){let xt=X.get(M);if(xt.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(B.FRAMEBUFFER,xt.__webglFramebuffer),at.copy(M.viewport),Ht.copy(M.scissor),Ut=M.scissorTest,y.viewport(at),y.scissor(Ht),y.setScissorTest(Ut),K=-1;return}else if(xt.__webglFramebuffer===void 0)$.setupRenderTarget(M);else if(xt.__hasExternalTextures)$.rebindTextures(M,X.get(M.texture).__webglTexture,X.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Qt=M.depthTexture;if(xt.__boundDepthTexture!==Qt){if(Qt!==null&&X.has(Qt)&&(M.width!==Qt.image.width||M.height!==Qt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(M)}}let At=M.texture;(At.isData3DTexture||At.isDataArrayTexture||At.isCompressedArrayTexture)&&(bt=!0);let Lt=X.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Lt[F])?V=Lt[F][Y]:V=Lt[F],G=!0):M.samples>0&&$.useMultisampledRTT(M)===!1?V=X.get(M).__webglMultisampledFramebuffer:Array.isArray(Lt)?V=Lt[Y]:V=Lt,at.copy(M.viewport),Ht.copy(M.scissor),Ut=M.scissorTest}else at.copy(Et).multiplyScalar(nt).floor(),Ht.copy(ie).multiplyScalar(nt).floor(),Ut=pi;if(Y!==0&&(V=W),y.bindFramebuffer(B.FRAMEBUFFER,V)&&y.drawBuffers(M,V),y.viewport(at),y.scissor(Ht),y.setScissorTest(Ut),G){let xt=X.get(M.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+F,xt.__webglTexture,Y)}else if(bt){let xt=F;for(let At=0;At<M.textures.length;At++){let Lt=X.get(M.textures[At]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+At,Lt.__webglTexture,Y,xt)}}else if(M!==null&&Y!==0){let xt=X.get(M.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,xt.__webglTexture,Y)}K=-1};function $m(M){let F=X.get(M);return(F.__readFormat!==M.format||F.__readType!==M.type)&&(F.__readFormat=M.format,F.__readType=M.type,F.__formatReadable=C.textureFormatReadable(M.format),F.__typeReadable=C.textureTypeReadable(M.type)),F}this.readRenderTargetPixels=function(M,F,Y,V,G,bt,Tt,xt=0){if(!(M&&M.isWebGLRenderTarget)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=X.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Tt!==void 0&&(At=At[Tt]),At){y.bindFramebuffer(B.FRAMEBUFFER,At);try{let Lt=M.textures[xt],Qt=Lt.format,oe=Lt.type;M.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+xt);let Ct=$m(Lt);if(Ct.__formatReadable===!1){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ct.__typeReadable===!1){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=M.width-V&&Y>=0&&Y<=M.height-G&&B.readPixels(F,Y,V,G,wt.convert(Qt),wt.convert(oe),bt)}finally{let Lt=ot!==null?X.get(ot).__webglFramebuffer:null;y.bindFramebuffer(B.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(M,F,Y,V,G,bt,Tt,xt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=X.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Tt!==void 0&&(At=At[Tt]),At)if(F>=0&&F<=M.width-V&&Y>=0&&Y<=M.height-G){y.bindFramebuffer(B.FRAMEBUFFER,At);let Lt=M.textures[xt],Qt=Lt.format,oe=Lt.type;M.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+xt);let Ct=$m(Lt);if(Ct.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ct.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xe=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,xe),B.bufferData(B.PIXEL_PACK_BUFFER,bt.byteLength,B.STREAM_READ),B.readPixels(F,Y,V,G,wt.convert(Qt),wt.convert(oe),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let ci=ot!==null?X.get(ot).__webglFramebuffer:null;y.bindFramebuffer(B.FRAMEBUFFER,ci);let ke=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await gg(B,ke,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,xe),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,bt),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(xe),B.deleteSync(ke),bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,F=null,Y=0){let V=Math.pow(2,-Y),G=Math.floor(M.image.width*V),bt=Math.floor(M.image.height*V),Tt=F!==null?F.x:0,xt=F!==null?F.y:0;$.setTexture2D(M,0),B.copyTexSubImage2D(B.TEXTURE_2D,Y,0,0,Tt,xt,G,bt),y.unbindTexture()},this.copyTextureToTexture=function(M,F,Y=null,V=null,G=0,bt=0){let Tt,xt,At,Lt,Qt,oe,Ct,xe,ci,ke=M.isCompressedTexture?M.mipmaps[bt]:M.image;if(Y!==null)Tt=Y.max.x-Y.min.x,xt=Y.max.y-Y.min.y,At=Y.isBox3?Y.max.z-Y.min.z:1,Lt=Y.min.x,Qt=Y.min.y,oe=Y.isBox3?Y.min.z:0;else{let si=Math.pow(2,-G);Tt=Math.floor(ke.width*si),xt=Math.floor(ke.height*si),M.isDataArrayTexture?At=ke.depth:M.isData3DTexture?At=Math.floor(ke.depth*si):At=1,Lt=0,Qt=0,oe=0}V!==null?(Ct=V.x,xe=V.y,ci=V.z):(Ct=0,xe=0,ci=0);let Le=wt.convert(F.format),Li=wt.convert(F.type),Mt;F.isData3DTexture?($.setTexture3D(F,0),Mt=B.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?($.setTexture2DArray(F,0),Mt=B.TEXTURE_2D_ARRAY):($.setTexture2D(F,0),Mt=B.TEXTURE_2D),y.activeTexture(B.TEXTURE0),y.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,F.flipY),y.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),y.pixelStorei(B.UNPACK_ALIGNMENT,F.unpackAlignment);let Vi=y.getParameter(B.UNPACK_ROW_LENGTH),ue=y.getParameter(B.UNPACK_IMAGE_HEIGHT),cn=y.getParameter(B.UNPACK_SKIP_PIXELS),jn=y.getParameter(B.UNPACK_SKIP_ROWS),Rr=y.getParameter(B.UNPACK_SKIP_IMAGES);y.pixelStorei(B.UNPACK_ROW_LENGTH,ke.width),y.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ke.height),y.pixelStorei(B.UNPACK_SKIP_PIXELS,Lt),y.pixelStorei(B.UNPACK_SKIP_ROWS,Qt),y.pixelStorei(B.UNPACK_SKIP_IMAGES,oe);let Rs=M.isDataArrayTexture||M.isData3DTexture,Ce=F.isDataArrayTexture||F.isData3DTexture;if(M.isDepthTexture){let si=X.get(M),Ar=X.get(F),Oe=X.get(si.__renderTarget),Cr=X.get(Ar.__renderTarget);y.bindFramebuffer(B.READ_FRAMEBUFFER,Oe.__webglFramebuffer),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,Cr.__webglFramebuffer);for(let As=0;As<At;As++)Rs&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,X.get(M).__webglTexture,G,oe+As),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,X.get(F).__webglTexture,bt,ci+As)),B.blitFramebuffer(Lt,Qt,Tt,xt,Ct,xe,Tt,xt,B.DEPTH_BUFFER_BIT,B.NEAREST);y.bindFramebuffer(B.READ_FRAMEBUFFER,null),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(G!==0||M.isRenderTargetTexture||X.has(M)){let si=X.get(M),Ar=X.get(F);y.bindFramebuffer(B.READ_FRAMEBUFFER,N),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,H);for(let Oe=0;Oe<At;Oe++)Rs?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,si.__webglTexture,G,oe+Oe):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,si.__webglTexture,G),Ce?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ar.__webglTexture,bt,ci+Oe):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ar.__webglTexture,bt),G!==0?B.blitFramebuffer(Lt,Qt,Tt,xt,Ct,xe,Tt,xt,B.COLOR_BUFFER_BIT,B.NEAREST):Ce?B.copyTexSubImage3D(Mt,bt,Ct,xe,ci+Oe,Lt,Qt,Tt,xt):B.copyTexSubImage2D(Mt,bt,Ct,xe,Lt,Qt,Tt,xt);y.bindFramebuffer(B.READ_FRAMEBUFFER,null),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Ce?M.isDataTexture||M.isData3DTexture?B.texSubImage3D(Mt,bt,Ct,xe,ci,Tt,xt,At,Le,Li,ke.data):F.isCompressedArrayTexture?B.compressedTexSubImage3D(Mt,bt,Ct,xe,ci,Tt,xt,At,Le,ke.data):B.texSubImage3D(Mt,bt,Ct,xe,ci,Tt,xt,At,Le,Li,ke):M.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,bt,Ct,xe,Tt,xt,Le,Li,ke.data):M.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,bt,Ct,xe,ke.width,ke.height,Le,ke.data):B.texSubImage2D(B.TEXTURE_2D,bt,Ct,xe,Tt,xt,Le,Li,ke);y.pixelStorei(B.UNPACK_ROW_LENGTH,Vi),y.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ue),y.pixelStorei(B.UNPACK_SKIP_PIXELS,cn),y.pixelStorei(B.UNPACK_SKIP_ROWS,jn),y.pixelStorei(B.UNPACK_SKIP_IMAGES,Rr),bt===0&&F.generateMipmaps&&B.generateMipmap(Mt),y.unbindTexture()},this.initRenderTarget=function(M){X.get(M).__webglFramebuffer===void 0&&$.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?$.setTextureCube(M,0):M.isData3DTexture?$.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?$.setTexture2DArray(M,0):$.setTexture2D(M,0),y.unbindTexture()},this.resetState=function(){j=0,Z=0,ot=null,y.reset(),St.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ne._getDrawingBufferColorSpace(t),e.unpackColorSpace=ne._getUnpackColorSpace()}};var i0={width:1536,height:1024,worldHeight:12.7,elevation:40,squareSize:1254,squareX:.005,squareY:.479,squareScaleY:.676};var wa=Object.freeze(i0),We=wa,xr=We.elevation*Math.PI/180,ul=We.height/We.worldHeight,Fp=[Math.SQRT1_2,0,-Math.SQRT1_2],Up=[-Math.sin(xr)*Math.SQRT1_2,Math.cos(xr),-Math.sin(xr)*Math.SQRT1_2],n0=[Math.cos(xr)*Math.SQRT1_2,Math.sin(xr),Math.cos(xr)*Math.SQRT1_2],Op=ul*Math.cos(xr);function Bp(n,t,e=0){let i=(n-We.width/2)/(ul*Math.SQRT1_2),r=(t+e*Op-We.height/2)/(ul*Math.sin(xr)*Math.SQRT1_2);return[(i+r)/2,e,(r-i)/2]}function Su(n,t){return[(n/We.squareSize-We.squareX)*We.width,((t/We.squareSize-We.squareY)/We.squareScaleY+.5)*We.height]}var zp=We.width*We.squareScaleY/We.height,ji=-Math.sin(xr)*zp,Oi=Object.freeze({x:900,y:890.8,sourceIntercept:1537,sourceSlope:-.718,sleeperSlope:.65,width:.8});function Mu(n){return Oi.y+ji*(n-Oi.x)}var ze=n=>Number(n).toFixed(12),ds=`
vec2 original_plate_uv(vec3 w){return vec2(.5+dot(w,vec3(${Fp.map(ze)}))/${ze(We.worldHeight*We.width/We.height)},.5-dot(w,vec3(${Up.map(ze)}))/${ze(We.worldHeight)});}
vec2 square_uv(vec2 o){return vec2(o.x+${ze(We.squareX)},(o.y-.5)*${ze(We.squareScaleY)}+${ze(We.squareY)});}
vec2 original_uv(vec2 s){return vec2(s.x-${ze(We.squareX)},(s.y-${ze(We.squareY)})/${ze(We.squareScaleY)}+.5);}
vec2 extended_plate_uv(vec3 w){return square_uv(original_plate_uv(w));}
vec2 rail_source(vec2 p,float width){float d=p.y-(${ze(Oi.y)}+${ze(ji)}*(p.x-${ze(Oi.x)}));float sx=p.x+d*(((${ze(-2*ji)}/width/${ze(Oi.sleeperSlope-Oi.sourceSlope)})-1.)/${ze(-2*ji)});return vec2(sx,${ze(Oi.sourceIntercept)}+${ze(Oi.sourceSlope)}*sx+d/width);}
float rail_blend(vec2 p){float d=p.y-(${ze(Oi.y)}+${ze(ji)}*(p.x-${ze(Oi.x)}));return 1.-smoothstep(27.,37.,abs(d+14.));}
float rail_ground_mask(vec2 p){
 float d=p.y-(${ze(Oi.y)}+${ze(ji)}*(p.x-${ze(Oi.x)}));
 float old=p.y-(${ze(Oi.sourceIntercept)}+${ze(Oi.sourceSlope)}*p.x);
 return max(1.-smoothstep(82.,108.,abs(d+14.)),1.-smoothstep(52.,70.,abs(old+14.)));
}
`;ne.enabled=!1;var oi=new A(...n0),pe=new A(...Fp),Ne=new A(...Up),A2=new A(0,1,0),Bi=ul,dl=Op,Gr=13,r0=6.5,fl=.585;function gn(n,t){return new A(...Bp(n,t))}function br(n,t,e){return new A(...Bp(n,t,e))}function s0(){let n=[];for(let t=0;t<10;t++)n.push([5-t,5]);for(let t=0;t<10;t++)n.push([-5,5-t]);for(let t=0;t<10;t++)n.push([-5+t,-5]);for(let t=0;t<10;t++)n.push([5,-5+t]);return n}var Ai=()=>performance.now(),di=(n,t,e)=>Math.min(e,Math.max(t,n)),pl=(n,t,e)=>n+(t-n)*e,ya=(n,t)=>1-Math.exp(-n*t);var a0=`
vec3 vegetation_motion(vec2 p,float clock,vec2 mask,float strength){
 float t=floor(clock*12.)/12.;
 // This is one painted plate, not separate rooted stems or cut-out crowns.
 // Keep deformation below 1.2 source pixels; large UV waves tear the drawing.
 float gain=clamp(strength,0.,2.);
 float breeze=.75+.25*sin(t*.31);
 // Nearby leaves share a slow phase. No rapid flutter inside a fixed silhouette.
 float crown=(.42*sin(t*.85+p.x*.001+p.y*.0007)
             +.10*sin(t*1.31+.6))*gain*breeze;
 // Only slight lateral bending: never lift/translate the field vertically.
 // Long wavelength keeps adjacent painted stalks together instead of rippling.
 float stalk=(.40*sin(t*1.15+p.x*.004+p.y*.002)
             +.08*sin(t*1.73+p.x*.006))*gain*breeze;
 return vec3(crown*mask.y+stalk*mask.x,0.,1.);
}
vec2 river_drift(vec2 p,float clock){
 float t=floor(clock*12.)/12.;
 // Negative sampling drift makes painted foam travel downstream, down/right.
 return -t*vec2(14.,9.)+vec2(4.*sin(p.y*.025-t*1.3),2.*cos(p.x*.035+t*.9));
}
`;var o0=1,Z1=.68,Kt={lightOn:{value:!1},sunDirection:{value:new A(0,1,0)},sunColor:{value:new qt(1,1,1)},ambient:{value:new qt(.4,.4,.4)},sunPower:{value:.77},night:{value:0},shadowsOn:{value:1},lampsOn:{value:1},shadowMap:{value:null},shadowMatrix:{value:new he},lampPositions:{value:Array.from({length:14},()=>new A(0,-100,0))},lampUV:{value:Array.from({length:14},()=>new ct(-10,-10))},lampCount:{value:0},enginePosition:{value:new A(0,-100,0)},engineDirection:{value:new A(0,0,1)},engineOn:{value:0},emission:{value:null},glowMap:{value:null},circuitMap:{value:null},buildingLevels:{value:new Float32Array(12)}},hr=`
uniform bool lightOn;
uniform vec3 sunDirection, sunColor, ambient;
uniform float sunPower, night, shadowsOn, lampsOn;
uniform sampler2D shadowMap; uniform mat4 shadowMatrix;
uniform vec3 lampPositions[14]; uniform vec2 lampUV[14]; uniform float lampCount;
uniform vec3 enginePosition, engineDirection; uniform float engineOn;
uniform sampler2D emission, glowMap, circuitMap; uniform float buildingLevels[12];
// \u0421\u0432\u0435\u0442 \u043F\u043E\u043B\u0443\u0434\u043D\u044F \u0434\u043B\u044F \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u043E\u0439 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438 \u0431\u0435\u0437 \u0442\u0435\u043D\u0438 \u2014 \u0438\u043C \u043D\u043E\u0440\u043C\u0438\u0440\u0443\u0435\u043C, \u0447\u0442\u043E\u0431\u044B \u0434\u043D\u0451\u043C
// \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043E\u0441\u0442\u0430\u0432\u0430\u043B\u0441\u044F \u043A\u0430\u043A \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D (ambient .385/.40/.43 + \u0441\u043E\u043B\u043D\u0446\u0435 1.10/.98/.85 \xD7 .77).
const vec3 NOON = vec3(1.22, 1.15, 1.08);
float visibilityAt(vec3 world) {
  vec4 clip = shadowMatrix * vec4(world, 1.0); vec3 p = clip.xyz / clip.w * 0.5 + 0.5;
  if (p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0 || p.z > 1.0 || p.z < 0.0) return 1.0;
  float a = 0.0;
  for (int x = -1; x <= 1; x++) for (int y = -1; y <= 1; y++) {
    float d = texture2D(shadowMap, p.xy + vec2(float(x), float(y)) * 1.35 / 2048.0).r;
    a += step(p.z - 0.0028, d);
  }
  return mix(1.0, a / 9.0, shadowsOn);
}
vec3 engineLight(vec3 world) {
  vec3 delta = world - enginePosition; float d = length(delta);
  float cone = smoothstep(0.62, 0.94, dot(normalize(delta), engineDirection));
  return vec3(1.0, 0.64, 0.28) * (cone * exp(-d * d / 17.0) * 1.5 + exp(-d * d / 1.8) * 0.36) * engineOn * (0.18 + 0.82 * night) * lampsOn;
}
vec3 practicalLight(vec3 world, vec3 normal) {
  vec3 result = vec3(0.0);
  for (int i = 0; i < 14; i++) { if (float(i) >= lampCount) break;
    vec3 delta = lampPositions[i] - world; float dist = length(delta);
    float facing = max(dot(normal, normalize(delta)), 0.0);
    result += vec3(1.0, 0.57, 0.21) * exp(-dist * dist / 2.0) * (0.25 + 0.75 * facing) * 1.55;
  }
  return result * night * lampsOn + engineLight(world);
}
// \u0421\u0432\u0435\u0442 \u043D\u0430 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438 \u0441 \u043D\u043E\u0440\u043C\u0430\u043B\u044C\u044E n: \u22481 \u0432 \u043F\u043E\u043B\u0434\u0435\u043D\u044C \u043D\u0430 \u0437\u0435\u043C\u043B\u0435.
vec3 sceneLight(vec3 world, vec3 n) {
  float ndl = max(dot(n, sunDirection), 0.0);
  float bounce = (1.0 - abs(n.y)) * (1.0 - night) * 0.14;
  return (ambient * (0.90 + 0.10 * max(n.y, 0.0)) + vec3(1.0, 0.86, 0.69) * bounce
    + sunColor * sunPower * ndl * visibilityAt(world) + practicalLight(world, n)) / NOON;
}
// \u042D\u043A\u0440\u0430\u043D\u043D\u044B\u0439 \u043E\u0440\u0435\u043E\u043B \u0444\u043E\u043D\u0430\u0440\u0435\u0439 \u0432 UV \u043F\u043E\u0434\u043B\u043E\u0436\u043A\u0438.
vec3 lampHalos(vec2 uv) {
  vec3 c = vec3(0.0); float noct = night * lampsOn;
  if (noct < 0.001) return c;
  for (int i = 0; i < 14; i++) { if (float(i) >= lampCount) break;
    float screenDist = length((uv - lampUV[i]) * vec2(1536.0, 1024.0));
    c += vec3(1.0, 0.51, 0.17) * exp(-screenDist * screenDist / 95.0) * 0.5;
  }
  return c * noct;
}
// \u041E\u043A\u043D\u0430 \u0437\u0434\u0430\u043D\u0438\u0439: \u043F\u0440\u043E\u0451\u043C \u0441\u0432\u0435\u0442\u0438\u0442\u0441\u044F \u043F\u043E \u0443\u0440\u043E\u0432\u043D\u044E \u0441\u0432\u043E\u0435\u0439 \u0446\u0435\u043F\u0438 (\u0437\u0434\u0430\u043D\u0438\u044F \u0432\u043A\u043B\u044E\u0447\u0430\u044E\u0442\u0441\u044F \u043F\u043E \u043E\u0447\u0435\u0440\u0435\u0434\u0438).
vec3 windowGlow(vec3 color, vec2 uv) {
  vec4 e = texture2D(emission, uv); vec4 g = texture2D(glowMap, uv);
  if (e.a + g.a < 0.002) return color;
  int circuit = int(floor(texture2D(circuitMap, uv).r * 255.0 + 0.5));
  float on = 0.0; for (int i = 0; i < 12; i++) { if (i == circuit) on = buildingLevels[i]; }
  color = mix(color, e.rgb * vec3(1.18, 1.02, 0.78), e.a * on * 0.91);
  return color + g.rgb * g.a * on * 1.1;
}
vec3 shoulder(vec3 color) { float m = max(color.r, max(color.g, color.b)); return color * (m > 0.88 ? (0.88 + 0.12 * (1.0 - exp(-(m - 0.88) / 0.12))) / m : 1.0); }
vec3 nightTint(vec3 c) { return mix(c, vec3(dot(c, vec3(0.299, 0.587, 0.114))) * vec3(0.72, 0.88, 1.14), night * 0.16); }
`;var kp=(n,t,e)=>{let i=cp.clamp((e-n)/(t-n),0,1);return i*i*(3-2*i)};function $1(n,t){let e=n.map(()=>({target:!1,wait:0,value:0}));return{update(i,r,s){let a=!1,o=r*s;return Math.abs(t[0]-o)>1e-5&&(t[0]=o,a=!0),e.forEach((l,c)=>{let h=n[c],d=!!s&&r>h.threshold;if(l.target!==d&&(l.target=d,l.wait=d?h.delay:.08*c),l.wait=Math.max(0,l.wait-i),l.wait===0){let u=Math.max(0,Math.min(1,l.value+(l.target?i/.24:-i/.45)));u!==l.value&&(l.value=u,t[c+1]=u,a=!0)}}),a}}}var Eu=class{constructor(t,e,i,r,s){this.renderer=t,this.scene=e,this.cfg=i,this.cycleMinutes=i.cycle||12,this.fixedHour=null,this.hour=12,this.enabled=!0;let a=new URLSearchParams(location.search).get("hour");a!=null&&Number.isFinite(+a)&&(this.fixedHour=(+a%24+24)%24);let o=(r.rounds||[]).filter(c=>/^Lamp(?!Head)/.test(c.name)).slice(0,14).map(c=>({p:br(...c.pixel,0).add(new A(0,c.height-.12,0)),uv:new ct(c.pixel[0]/1536,(c.pixel[1]-(c.height-.12)*Bi*.76604444)/1024)}));Kt.lampCount.value=o.length,o.forEach((c,h)=>{Kt.lampPositions.value[h].copy(c.p),Kt.lampUV.value[h].copy(c.uv)}),this.lamps=o,this.buildEmission(i.windows||[],i.circuits||[],o,s),this.windows=$1(i.circuits||[],Kt.buildingLevels.value);let l=matchMedia("(pointer: coarse)").matches;this.size=l?1024:2048,this.target=new Fi(this.size,this.size,{minFilter:Ve,magFilter:Ve}),this.target.depthTexture=new rr(this.size,this.size,sn),Kt.shadowMap.value=this.target.depthTexture,this.sunCamera=new In(-23,23,23,-23,.1,110),this.sunCamera.layers.set(o0),this.depthMaterial=new ca({side:Ge}),this.shadowKey="",this.dirty=!0,Kt.lightOn.value=!0,this.update(0)}cast(t){t.layers.enable(o0)}setHour(t){this.fixedHour=t==null?null:(+t%24+24)%24}clockHour(){let t=Date.now()/6e4/this.cycleMinutes%1,e=this.cfg.dayShare??Z1;return t<e?6+12*t/e:(18+12*(t-e)/(1-e))%24}buildEmission(t,e,i,r){let o=document.createElement("canvas");o.width=1536,o.height=1024;let l=o.getContext("2d");l.fillStyle="#000",l.fillRect(0,0,1536,1024),e.forEach((w,g)=>w.windows.forEach(_=>{let[b,T,v,E]=t[_];l.fillStyle=`rgb(${g+1},0,0)`,l.fillRect(b-v/2-22,T-E/2-28,v+44,E+56)}));let c=w=>(w.colorSpace=Ke,w.flipY=!1,w.generateMipmaps=!1,w.minFilter=w.magFilter=ai,w.needsUpdate=!0,w),h=c(new ei(o));h.minFilter=h.magFilter=Ve;let d=document.createElement("canvas");d.width=1536,d.height=1024;let u=d.getContext("2d");if(t.length&&r?.image){let w=document.createElement("canvas");w.width=1536,w.height=1024;let g=w.getContext("2d",{willReadFrequently:!0});g.drawImage(r.image,0,0,1536,1024);let _=g.getImageData(0,0,1536,1024).data,b=["#ffe0a0","#ffc372","#ffd98b"];t.forEach(([v,E,R,I,x],S)=>{u.fillStyle=b[S%3],u.beginPath(),u.moveTo(v-R/2,E-I/2),u.quadraticCurveTo(v,E-I/2-8,v+R/2,E-I/2+R*x),u.lineTo(v+R/2,E+I/2+R*x),u.lineTo(v-R/2,E+I/2),u.closePath(),u.fill()});let T=u.getImageData(0,0,1536,1024);for(let v=0;v<T.data.length;v+=4)if(T.data[v+3]){let E=(_[v]*.3+_[v+1]*.59+_[v+2]*.11)/255;T.data[v+3]*=Math.max(0,Math.min(1,(.43-E)/.17))}u.putImageData(T,0,0)}i.forEach(w=>{let g=w.uv.x*1536,_=w.uv.y*1024;u.fillStyle="#ffdd8b",u.beginPath(),u.ellipse(g,_,3.3,5,0,0,Math.PI*2),u.fill()});let f=document.createElement("canvas");f.width=1536,f.height=1024;let m=f.getContext("2d");m.filter="blur(9px)",m.drawImage(d,0,0),Kt.emission.value=c(new ei(d)),Kt.glowMap.value=c(new ei(f)),Kt.circuitMap.value=h}applyHour(t){this.hour=t;let e=(t-6)/12*Math.PI,i=Math.max(this.cfg.minimumSunAltitude??-1,Math.sin(e)),r=new A(-Math.cos(e)*.72,.62+Math.max(0,i)*.85,Math.cos(e)*.3+.22).normalize();Kt.sunDirection.value.copy(r);let s=kp(-.12,.24,i),a=1-kp(.05,.65,i);if(Kt.sunPower.value=s*(.65+.12*Math.max(0,i)),Kt.sunColor.value.setRGB(1.1,.98-a*.43,.85-a*.58),Kt.ambient.value.setRGB(.075+s*.31,.12+s*.28,.22+s*.21),Kt.night.value=1-kp(-.08,.25,i),this.cfg.moon){let l=Kt.night.value;Kt.ambient.value.r+=l*.018,Kt.ambient.value.g+=l*.024,Kt.ambient.value.b+=l*.028}this.sunCamera.position.copy(r).multiplyScalar(45),this.sunCamera.lookAt(0,0,0),this.sunCamera.updateMatrixWorld(),Kt.shadowMatrix.value.multiplyMatrices(this.sunCamera.projectionMatrix,this.sunCamera.matrixWorldInverse);let o=r.toArray().map(l=>Math.round(l*380)).join(",");o!==this.shadowKey&&(this.shadowKey=o,this.dirty=!0)}groundLight(){let t=Kt.sunDirection.value,e=Kt.sunColor.value,i=Kt.ambient.value,r=Kt.sunPower.value;return[(i.r+e.r*r*t.y)/1.22,(i.g+e.g*r*t.y)/1.15,(i.b+e.b*r*t.y)/1.08]}update(t){this.applyHour(this.fixedHour??this.clockHour()),this.windows.update(t,Kt.night.value,Kt.lampsOn.value)}renderShadows(t=""){if(!this.dirty&&t===this.moveKey)return!1;this.moveKey=t,this.dirty=!1;let e=this.renderer;return this.scene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.target),e.clear(),e.render(this.scene,this.sunCamera),e.setRenderTarget(null),this.scene.overrideMaterial=null,!0}};function l0(n,t){n.onBeforeCompile=e=>{Object.assign(e.uniforms,Kt,{heroFoot:t}),e.vertexShader=`varying vec2 vUvL;
`+e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vUvL=uv;`),e.fragmentShader=hr+`
uniform vec3 heroFoot; varying vec2 vUvL;
`+e.fragmentShader.replace("#include <opaque_fragment>",`
    if (lightOn) {
      vec3 world = heroFoot + vec3(0.0, max(0.0, (vUvL.y - 0.09) * 1.65), 0.0) + vec3(0.707, 0.0, -0.707) * (vUvL.x - 0.5) * 0.35;
      vec3 n = normalize(vec3(0.54, 0.22, 0.54) + vec3(0.707, 0.0, -0.707) * (vUvL.x - 0.5));
      vec3 fill = mix(vec3(0.46, 0.44, 0.41), vec3(0.43, 0.46, 0.53), night);
      vec3 l = (ambient * 0.8 + fill + sunColor * sunPower * (0.20 + 0.35 * max(dot(n, sunDirection), 0.0)) * visibilityAt(world)
        + practicalLight(world, n) * 0.65) / vec3(1.12, 1.07, 1.02);
      outgoingLight = shoulder(outgoingLight * max(l, vec3(0.45, 0.49, 0.57)));
    }
    #include <opaque_fragment>`)},n.customProgramCacheKey=()=>"hero-scene-light-v1",n.needsUpdate=!0}var dt={time:{value:0},ambientMotion:{value:!0},artWobble:{value:!0},waterRipple:{value:!1},riverFlow:{value:!1},wheatOn:{value:!1},swayStrength:{value:1},railWidth:{value:1},roadFill:{value:null},roadMask:{value:null},roadOn:{value:!1},routeGroundShade:{value:1},dryWind:{value:!1},wheatOriginal:{value:null},wheatSquare:{value:null},bobCount:{value:0},bobRect:{value:Array.from({length:6},()=>new Ie)},bobParam:{value:Array.from({length:6},()=>new Ie)},bobPivot:{value:Array.from({length:6},()=>new ct)},flagA:{value:new Ie(1480,-1,48,3.4)},flagB:{value:new Ie(508,537,553,578)},harborPhase:{value:-1},harborDebug:{value:!1},plate:{value:null},extendedPlate:{value:null},overscanPlate:{value:null},overscanScale:{value:1},overscanOrigin:{value:new ct(.5,.5)},seaPlate:{value:null},waterMatteOriginal:{value:null},waterMatteSquare:{value:null},boatMask:{value:null}},Tu=`
vec3 srgb2lin(vec3 c){ return mix(c/12.92, pow((c+0.055)/1.055, vec3(2.4)), step(0.04045, c)); }
vec3 lin2srgb(vec3 c){ c=max(c,vec3(0.0)); return mix(c*12.92, 1.055*pow(c, vec3(1.0/2.4))-0.055, step(0.0031308, c)); }
`,Ru=hr+ds+a0+`
uniform float uTime;
uniform bool ambientMotion;
uniform bool artWobble;
uniform bool waterRipple;
uniform bool riverFlow;
uniform bool wheatOn;
uniform float swayStrength;
uniform float railWidth;
uniform bool dryWind;
uniform sampler2D wheatOriginal;
uniform sampler2D wheatSquare;
uniform int bobCount;
uniform vec4 bobRect[6];
uniform vec4 bobParam[6];
uniform vec2 bobPivot[6];
uniform vec4 flagA;
uniform vec4 flagB;
uniform float harborPhase;
uniform bool harborDebug;
uniform sampler2D plate;
uniform sampler2D extendedPlate;
uniform sampler2D overscanPlate;
uniform float overscanScale;
uniform vec2 overscanOrigin;
vec2 overscan_uv(vec2 core){return (core-.5)/overscanScale+overscanOrigin;}
bool outside_core(vec2 core){return any(lessThan(core,vec2(0.)))||any(greaterThan(core,vec2(1.)));}
uniform sampler2D seaPlate;
uniform sampler2D waterMatteOriginal;
uniform sampler2D waterMatteSquare;
uniform sampler2D boatMask;
uniform sampler2D roadFill, roadMask;
uniform bool roadOn;
vec3 clean_road(vec2 o,vec3 base){
 if(!roadOn)return base;
 vec2 sq=square_uv(o);
 float edge=min(min(o.x,1.-o.x),min(o.y,1.-o.y));
 float wet=mix(texture(waterMatteSquare,sq).r,texture(waterMatteOriginal,clamp(o,vec2(0),vec2(1))).r,smoothstep(0.,.04,edge));
 // Railway soil cleanup must never paste static water over the moving river.
 float m=max(texture(roadMask,o).r,rail_ground_mask(sq*1254.))*(1.-wet);
 return mix(base,texture(roadFill,square_uv(o)).rgb,m);
}
// Compress only the Kansas railway cross-section; near wheel-contact rail stays fixed.
vec3 fitted_rail_art(vec3 world, vec3 base) {
  if (railWidth >= 0.999) return base;
  vec2 p = extended_plate_uv(world) * 1254.0;
  float blend = rail_blend(p);
  if (blend <= 0.0) return base;
  // Only ballast/rails are transformed; background earth has no baked railway.
  vec2 squareUV = rail_source(p,railWidth) / 1254.0;
  vec2 originalUV = original_uv(squareUV);
  float edge = min(min(originalUV.x,1.0-originalUV.x),min(originalUV.y,1.0-originalUV.y));
  vec3 art = mix(textureLod(extendedPlate,squareUV,0.0).rgb,
    textureLod(plate,clamp(originalUV,vec2(0),vec2(1)),0.0).rgb,smoothstep(0.0,.04,edge));
  return mix(base,art,blend);
}
// \u0422\u0435\u043A\u0441\u0442\u0443\u0440\u044B \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u044B \u0441 flipY=false: v \u0440\u0430\u0441\u0442\u0451\u0442 \u0432\u043D\u0438\u0437, \u043A\u0430\u043A \u0432 Godot.
vec3 static_environment_art(vec3 world) {
  vec2 core=extended_plate_uv(world);
  if(overscanScale>1. && outside_core(core))return texture(overscanPlate,overscan_uv(core)).rgb;
  vec2 o = original_plate_uv(world);
  float edge = min(min(o.x, 1.0-o.x), min(o.y, 1.0-o.y));
  float keep = smoothstep(0.0, 0.04, edge);
  return fitted_rail_art(world, clean_road(o, mix(texture(extendedPlate, extended_plate_uv(world)).rgb, texture(plate, clamp(o, vec2(0.0), vec2(1.0))).rgb, keep)));
}
vec3 smoke_art_position(vec3 world) {
  vec2 p = original_plate_uv(world) * vec2(1536.0,1024.0);
  float along = (180.0-p.x)/190.0;
  float center_y = 14.0-70.0*along;
  float radius = 8.0+17.0*clamp(along,0.0,1.0);
  float region = smoothstep(-0.02,0.12,along)*(1.0-smoothstep(0.94,1.13,along));
  region *= 1.0-smoothstep(radius,radius+9.0,abs(p.y-center_y));
  float t = floor(uTime*12.0)/12.0;
  float phase = along*19.0-t*2.8;
  vec2 drift = vec2(sin(phase)*3.5,cos(phase+0.8)*2.4+sin(t*1.3+along*7.0)*1.3)*region;
  return world + vec3(0.70710678,0.0,-0.70710678)*drift.x/(1024.0/12.7)
    - vec3(-0.45451948,0.76604444,-0.45451948)*drift.y/(1024.0/12.7);
}
float harbor_clock() { return harborPhase >= 0.0 ? harborPhase : uTime; }
vec2 wave_offset(vec2 p, float t) {
  return vec2(10.5*sin(p.y*0.025-t*1.18)+4.6*sin(p.x*0.013+t*0.58),
    4.1*sin(p.x*0.020-t*0.89)+2.3*cos(p.y*0.031+t*0.49));
}
vec3 painted_sea(vec2 pixel, float t) {
  vec2 drift = riverFlow ? river_drift(pixel,t) : vec2(t*7.2,t*1.7)+wave_offset(pixel,t)*0.92;
  vec2 q = (pixel+drift)/vec2(126.0,114.0);
  q = abs(fract(q*0.5)*2.0-1.0);
  vec2 sp = vec2(2.0,1136.0)+q*vec2(126.0,114.0);
  return texture(seaPlate, sp/1254.0).rgb;
}
vec3 water_original(vec2 uv, float t) {
  vec3 base = texture(plate, uv).rgb;
  float m = texture(waterMatteOriginal, uv).r*(1.0-texture(boatMask, uv).g);
  if (m < 0.01) return base;
  if (waterRipple) {
    // \u0421\u0430\u043C\u0438 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0432\u043E\u043B\u043D\u044B \u043F\u043E\u043A\u0430\u0447\u0438\u0432\u0430\u044E\u0442\u0441\u044F (\u043A\u0430\u0434\u0440\u044B \u043D\u0430 \u0434\u0432\u043E\u0439\u043A\u0430\u0445), \u0431\u0435\u0440\u0435\u0433 \u043D\u0435 \u0442\u0440\u043E\u0433\u0430\u0435\u043C.
    float ts = floor(t*12.0)/12.0;
    vec2 off = wave_offset(uv*vec2(1536.0,1024.0)*2.2, ts)*0.22*m/vec2(1536.0,1024.0);
    float shore = texture(waterMatteOriginal, uv+off).r;
    return mix(base, texture(plate, uv+off).rgb, m*shore);
  }
  vec2 p = vec2(uv.x+0.005,(uv.y-0.5)*0.676+0.479)*1254.0;
  return mix(base, painted_sea(p,t), m);
}
vec3 water_square(vec2 uv, float t) {
  vec3 base = texture(extendedPlate, uv).rgb;
  float m = texture(waterMatteSquare, uv).r;
  if (m < 0.01) return base;
  if (waterRipple) {
    float ts = floor(t*12.0)/12.0;
    vec2 off = wave_offset(uv*2600.0, ts)*0.22*m/1254.0;
    float shore = texture(waterMatteSquare, uv+off).r;
    return mix(base, texture(extendedPlate, uv+off).rgb, m*shore);
  }
  return mix(base, painted_sea(uv*1254.0,t), m);
}
vec3 environment_art(vec3 world) {
  vec2 core=extended_plate_uv(world);
  if(overscanScale>1. && outside_core(core))return texture(overscanPlate,overscan_uv(core)).rgb;
  if (!ambientMotion && !harborDebug) return static_environment_art(world);
  float t = harbor_clock();
  vec3 art_world = artWobble ? smoke_art_position(world) : world;
  vec2 uv = original_plate_uv(art_world);
  vec2 ext = extended_plate_uv(art_world);
  float edge = min(min(uv.x,1.0-uv.x),min(uv.y,1.0-uv.y));
  float ow = smoothstep(0.0,0.04,edge);
  vec3 color = mix(water_square(ext,t), water_original(clamp(uv,vec2(0.0),vec2(1.0)),t), ow);
  vec2 p = uv*vec2(1536.0,1024.0);
  if (harborDebug) {
    float m = mix(texture(waterMatteSquare,ext).r, texture(waterMatteOriginal,uv).r, ow);
    vec3 bm = texture(boatMask,uv).rgb;
    color = mix(static_environment_art(world), vec3(0.04,0.65,0.82), m*0.55);
    color = mix(color, vec3(0.9,0.26,0.06), bm.r*0.55);
    return mix(color, vec3(0.25,0.9,0.20), bm.g*0.6);
  }
  if (artWobble && p.x > 25.0 && p.x < 310.0 && p.y > 8.0 && p.y < 220.0) {
    vec2 pivot = vec2(164.0,148.0);
    float angle = 0.0225*sin(t*0.95)+0.0072*sin(t*0.47+0.7);
    vec2 heave = vec2(1.9*sin(t*0.95-0.45),4.7*sin(t*0.95));
    vec2 d = p-pivot-heave;
    vec2 source = mat2(vec2(cos(angle),-sin(angle)),vec2(sin(angle),cos(angle)))*d+pivot;
    float fixed_fg = texture(boatMask,uv).g;
    float reach = smoothstep(25.0,45.0,p.x)*(1.0-smoothstep(285.0,310.0,p.x));
    reach *= smoothstep(8.0,16.0,p.y)*(1.0-smoothstep(194.0,220.0,p.y));
    float chimney = smoothstep(152.0,166.0,p.x)*(1.0-smoothstep(193.0,207.0,p.x));
    float face = smoothstep(203.0,216.0,p.x)*(1.0-smoothstep(270.0,285.0,p.x));
    reach *= max(smoothstep(72.0,90.0,p.y),max(chimney,face));
    source = mix(p,source,reach*(1.0-fixed_fg));
    color = mix(color, water_original(source/vec2(1536.0,1024.0),t), reach);
  }
  // \u041F\u0448\u0435\u043D\u0438\u0446\u0430: \u043F\u043E\u0440\u044B\u0432 \u0431\u0435\u0436\u0438\u0442 \u043F\u043E \u043F\u043E\u043B\u044E \u0432\u043E\u043B\u043D\u043E\u0439, \u043A\u043E\u043B\u043E\u0441\u044C\u044F \u043A\u043B\u043E\u043D\u044F\u0442\u0441\u044F \u0438 \u0441\u0432\u0435\u0442\u043B\u0435\u044E\u0442 \u043D\u0430 \u0433\u0440\u0435\u0431\u043D\u0435.
  // \u0412\u0440\u0435\u043C\u044F \u2014 \u043D\u0430 \u0434\u0432\u043E\u0439\u043A\u0430\u0445 (12 \u043A\u0430\u0434\u0440\u043E\u0432 \u0432 \u0441\u0435\u043A\u0443\u043D\u0434\u0443), \u043A\u0430\u043A \u0443 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438.
  if (wheatOn) {
    vec3 sm = mix(textureLod(wheatSquare, ext, 0.0).rgb, textureLod(wheatOriginal, clamp(uv, vec2(0.0), vec2(1.0)), 0.0).rgb, ow);
    float wm = sm.r, tm = sm.g;
    if (wm > 0.01 || tm > 0.01) {
      float ts = floor(t * 12.0) / 12.0;
      float gust = 0.5 + 0.5 * sin(dot(p, vec2(0.016, 0.010)) - ts * 1.7);
      // \u043F\u0448\u0435\u043D\u0438\u0446\u0430: \u0432\u043E\u043B\u043D\u0430 \u043F\u043E\u0440\u044B\u0432\u0430 \u043F\u043E \u043F\u043E\u043B\u044E, \u043A\u043E\u043B\u043E\u0441\u044C\u044F \u043A\u043B\u043E\u043D\u044F\u0442\u0441\u044F
      float sway = sin(p.y * 0.11 + p.x * 0.035 - ts * 3.3) * (0.9 + 2.8 * gust);
      vec2 off = vec2(sway, -0.35 * abs(sway)) * wm;
      // \u0434\u0435\u0440\u0435\u0432\u044C\u044F: \u043A\u0440\u043E\u043D\u0430 \u043F\u043E\u043A\u0430\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0446\u0435\u043B\u0438\u043A\u043E\u043C, \u0443 \u043A\u0440\u0430\u044F \u043A\u0440\u043E\u043D\u044B \u2014 \u0432 \u043D\u043E\u043B\u044C (\u0441\u0442\u0432\u043E\u043B \u0441\u0442\u043E\u0438\u0442)
      float tsway = sin(ts * 1.9 + p.x * 0.021 + p.y * 0.013) * (2.2 + 2.8 * gust);
      float windLight=1.0+0.08*(gust-0.5);
      if (dryWind) {
        vec3 motion=vegetation_motion(p,t,vec2(wm,tm),swayStrength);
        off=motion.xy;windLight=motion.z;
      } else off += vec2(tsway, 0.25 * tsway) * tm;
      vec2 q = (p + off) / vec2(1536.0, 1024.0);
      vec2 qe = vec2(q.x + 0.005, (q.y - 0.5) * 0.676 + 0.479);
      vec3 moved = mix(textureLod(extendedPlate, qe, 0.0).rgb, textureLod(plate, clamp(q, vec2(0.0), vec2(1.0)), 0.0).rgb, ow);
      color = mix(color, moved * windLight, max(wm, tm));
    }
  }
  // \u041A\u043E\u0440\u043E\u0432\u044B: \u0433\u043E\u043B\u043E\u0432\u0430 \u043F\u0435\u0440\u0438\u043E\u0434\u0438\u0447\u0435\u0441\u043A\u0438 \u043A\u0438\u0432\u0430\u0435\u0442 \u043A \u0442\u0440\u0430\u0432\u0435 \u2014 \u043A\u0443\u0441\u043E\u043A \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438 \u043F\u043E\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0432\u043E\u043A\u0440\u0443\u0433
  // \u0448\u0430\u0440\u043D\u0438\u0440\u0430 \u043D\u0430 \u0448\u0435\u0435, \u0443 \u0448\u0430\u0440\u043D\u0438\u0440\u0430 \u0441\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u043D\u0443\u043B\u0435\u0432\u043E\u0435, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0448\u0435\u044F \u043D\u0435 \u0442\u044F\u043D\u0435\u0442\u0441\u044F. \u041A \u043A\u0440\u0430\u044F\u043C
  // \u043F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A\u0430 \u043F\u043E\u0432\u043E\u0440\u043E\u0442 \u0433\u0430\u0441\u043D\u0435\u0442 \u2014 \u0448\u0432\u043E\u0432 \u043D\u0435\u0442.
  for (int i = 0; i < 6; i++) {
    if (i >= bobCount) break;
    vec4 rc = bobRect[i]; vec4 pr = bobParam[i];
    if (p.x < rc.x - 4.0 || p.x > rc.z + 4.0 || p.y < rc.y - 4.0 || p.y > rc.w + 4.0) continue;
    float ts = floor(t * 12.0) / 12.0;
    float ph = fract(ts / pr.y + pr.z);
    float dip = smoothstep(0.0, 0.22, ph) * (1.0 - smoothstep(pr.w - 0.25, pr.w, ph));
    float fade = smoothstep(rc.x - 4.0, rc.x + 3.0, p.x) * (1.0 - smoothstep(rc.z - 3.0, rc.z + 4.0, p.x))
      * smoothstep(rc.y - 4.0, rc.y + 3.0, p.y) * (1.0 - smoothstep(rc.w - 3.0, rc.w + 4.0, p.y));
    float ang = -pr.x * dip * fade;
    vec2 d = p - bobPivot[i];
    vec2 q = (bobPivot[i] + vec2(d.x * cos(ang) - d.y * sin(ang), d.x * sin(ang) + d.y * cos(ang))) / vec2(1536.0, 1024.0);
    vec2 qe = vec2(q.x + 0.005, (q.y - 0.5) * 0.676 + 0.479);
    color = mix(textureLod(extendedPlate, qe, 0.0).rgb, textureLod(plate, clamp(q, vec2(0.0), vec2(1.0)), 0.0).rgb, ow);
  }
  // \u0424\u043B\u0430\u0433 \u043D\u0430 \u0432\u0435\u0442\u0440\u0443 (flagA/flagB \u2014 \u043F\u043E \u043A\u0430\u0440\u0442\u0435): \u043F\u043E\u043B\u043E\u0442\u043D\u0438\u0449\u0435 \u043A\u0440\u0435\u043F\u0438\u0442\u0441\u044F \u043A \u0434\u0440\u0435\u0432\u043A\u0443, \u0432\u043E\u043B\u043D\u0430
  // \u0431\u0435\u0436\u0438\u0442 \u043A \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u043C\u0443 \u043A\u0440\u0430\u044E \u0438 \u0440\u0430\u0441\u0442\u0451\u0442 \u043A \u043D\u0435\u043C\u0443. \u0421\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0431\u0435\u0440\u0451\u0442\u0441\u044F \u0438\u0437 \u0442\u043E\u0439 \u0436\u0435 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438,
  // \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u043A\u0440\u0430\u0439 \u0444\u043B\u0430\u0433\u0430 \u043A\u043E\u043B\u044B\u0448\u0435\u0442\u0441\u044F, \u0430 \u0441\u043A\u043B\u0430\u0434\u043A\u0438 \u0447\u0443\u0442\u044C \u0442\u0435\u043C\u043D\u0435\u044E\u0442.
  float along = (p.x - flagA.x) * flagA.y;
  if (flagA.w > 0.0 && along > -1.0 && along < flagA.z + 14.0
      && p.y > min(flagB.x, flagB.y) - 16.0 && p.y < max(flagB.z, flagB.w) + 16.0) {
    float u = clamp(along / flagA.z, 0.0, 1.0);
    float top = mix(flagB.x, flagB.y, u), bot = mix(flagB.z, flagB.w, u), amp = flagA.w * u;
    // \u0441\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u043F\u043B\u0430\u0432\u043D\u043E \u0433\u0430\u0441\u043D\u0435\u0442 \u043A \u043A\u0440\u0430\u044F\u043C \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u2014 \u043D\u0438\u043A\u0430\u043A\u043E\u0433\u043E \u0448\u0432\u0430 \u043D\u0430 \u0444\u043E\u043D\u0435
    float fade = (1.0 - smoothstep(flagA.z + 1.0, flagA.z + 12.0, along)) * smoothstep(top - amp - 8.0, top - amp - 1.0, p.y)
      * (1.0 - smoothstep(bot + amp + 1.0, bot + amp + 8.0, p.y));
    float ph = u * 7.0 - t * 5.2 + sin(t * 1.7) * 0.6;
    vec2 off = vec2(0.8 * u * (1.0 - cos(ph)) * flagA.y, amp * sin(ph)) * fade;
    vec2 q = (p - off) / vec2(1536.0, 1024.0);
    vec2 qe = vec2(q.x + 0.005, (q.y - 0.5) * 0.676 + 0.479);
    // textureLod: \u0432\u043D\u0443\u0442\u0440\u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u043D\u044B\u0435 \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u044B, \u0438 \u043E\u0431\u044B\u0447\u043D\u0430\u044F \u0432\u044B\u0431\u043E\u0440\u043A\u0430
    // \u0434\u0430\u0451\u0442 \u0448\u043E\u0432 \u043D\u0430 \u0433\u0440\u0430\u043D\u0438\u0446\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u0438.
    vec3 cloth = mix(textureLod(extendedPlate, qe, 0.0).rgb, textureLod(plate, q, 0.0).rgb, ow);
    float inFlag = step(top - 0.5, p.y - off.y) * step(p.y - off.y, bot + 0.5) * step(along, flagA.z + 1.0);
    cloth *= 1.0 + 0.09 * u * cos(ph + 1.2) * inFlag;
    color = cloth;
  }
  return fitted_rail_art(world, clean_road(original_plate_uv(world), color));
}
// \u0414\u0438\u043D\u0430\u043C\u0438\u043A\u0430 \u0441\u0432\u0435\u0442\u0430 (daylight.js) \u043F\u043E\u0432\u0435\u0440\u0445 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E: world \u2014 \u0442\u043E\u0447\u043A\u0430 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438,
// n \u2014 \u0435\u0451 \u043D\u043E\u0440\u043C\u0430\u043B\u044C (\u0437\u0435\u043C\u043B\u044F \u2014 \u0432\u0432\u0435\u0440\u0445), foliage \u2014 \u043A\u0440\u043E\u043D\u044B: \u043C\u044F\u0433\u0447\u0435, \u0431\u0435\u0437 \u0436\u0451\u0441\u0442\u043A\u0438\u0445 \u043F\u043E\u043B\u0443\u0441\u0444\u0435\u0440.
// \u0412 \u043F\u043E\u043B\u0434\u0435\u043D\u044C \u043C\u043D\u043E\u0436\u0438\u0442\u0435\u043B\u044C \u2248 1: \u0434\u043D\u0451\u043C \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u043A\u0430\u043A \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D.
vec3 lit_art(vec3 base, vec3 world, vec3 n, float foliage) {
  if (!lightOn) return base;
  vec2 uv = original_plate_uv(world);
  vec2 ext = extended_plate_uv(world);
  vec2 cuv = clamp(uv, vec2(0.0), vec2(1.0));
  float edge = min(min(uv.x, 1.0-uv.x), min(uv.y, 1.0-uv.y));
  float ow = smoothstep(0.0, 0.04, edge);
  // \u0421\u043D\u044F\u0442\u0438\u0435 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u0441\u0432\u0435\u0442\u0430 \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u0433\u0440\u0430\u043D\u0435\u0439 (\u0443 \u0437\u0435\u043C\u043B\u0438 \u043C\u043D\u043E\u0436\u0438\u0442\u0435\u043B\u044C 1): \u0441\u0442\u0435\u043D\u044B, \u0433\u043B\u044F\u0434\u044F\u0449\u0438\u0435
  // \u043E\u0442 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u0441\u043E\u043B\u043D\u0446\u0430, \u043D\u0435 \u0442\u0435\u043C\u043D\u0435\u044E\u0442 \u0434\u0432\u0430\u0436\u0434\u044B.
  float oldLight = (0.65 + 0.35 * max(dot(n, normalize(vec3(-0.4, 0.85, 0.3))), 0.0)) / 0.95;
  vec3 albedo = base / oldLight;
  vec3 l = sceneLight(world, n);
  if (foliage > 0.5) {
    vec3 canopy = (ambient + sunColor * sunPower * (0.48 + 0.12 * max(dot(n, sunDirection), 0.0))) / NOON;
    l = mix(canopy, l, 0.18); albedo = base;
  }
  vec3 color = albedo * l + lampHalos(uv) * ow;
  color = windowGlow(color, cuv);
  // \u0412\u043E\u0434\u0430: \u0431\u043B\u0438\u043A \u0441\u043E\u043B\u043D\u0446\u0430 \u0438 \u0445\u043E\u043B\u043E\u0434\u043D\u0430\u044F \u043D\u043E\u0447\u043D\u0430\u044F \u0441\u0438\u043D\u0435\u0432\u0430.
  float water = mix(texture(waterMatteSquare, ext).r, texture(waterMatteOriginal, cuv).r, ow);
  if (water > 0.01) {
    vec3 wn = normalize(vec3(0.05 * sin(world.x * 19.0 + uTime * 0.8), 1.0, 0.07 * cos(world.z * 17.0 - uTime * 0.55)));
    vec3 halfV = normalize(sunDirection + vec3(0.541675, 0.642788, 0.541675));
    float specular = pow(max(dot(wn, halfV), 0.0), 65.0) * sunPower;
    color += water * (sunColor * specular * 0.55 + base * vec3(0.035, 0.075, 0.12) * night);
  }
  return shoulder(nightTint(color));
}
// \u0422\u043E\u0447\u043A\u0430 \u0437\u0435\u043C\u043B\u0438 \u043F\u043E\u0434 \u0442\u043E\u0447\u043A\u043E\u0439 world \u043D\u0430 \u043B\u0443\u0447\u0435 \u043A\u0430\u043C\u0435\u0440\u044B: \u0437\u0430\u0434\u043D\u0438\u043A \u0438 \u043F\u043B\u043E\u0441\u043A\u043E \u043E\u0441\u0432\u0435\u0449\u0430\u0435\u043C\u044B\u0435 \u043E\u0431\u044A\u0451\u043C\u044B
// \u043E\u0441\u0432\u0435\u0449\u0430\u044E\u0442\u0441\u044F \u043A\u0430\u043A \u0437\u0435\u043C\u043B\u044F \u0432 \u0442\u043E\u0439 \u0436\u0435 \u0442\u043E\u0447\u043A\u0435 \u044D\u043A\u0440\u0430\u043D\u0430.
vec3 ground_under(vec3 world) { return world + vec3(0.541675, 0.642788, 0.541675) * (-world.y / 0.642788); }
`,Au=`
varying vec3 vWorld; varying vec3 vNormalW;
void main(){
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}`;function Cu(n={}){return{roadFill:dt.roadFill,roadMask:dt.roadMask,roadOn:dt.roadOn,routeGroundShade:dt.routeGroundShade,uTime:dt.time,ambientMotion:dt.ambientMotion,artWobble:dt.artWobble,waterRipple:dt.waterRipple,riverFlow:dt.riverFlow,wheatOn:dt.wheatOn,wheatOriginal:dt.wheatOriginal,wheatSquare:dt.wheatSquare,bobCount:dt.bobCount,bobRect:dt.bobRect,bobParam:dt.bobParam,bobPivot:dt.bobPivot,flagA:dt.flagA,flagB:dt.flagB,harborPhase:dt.harborPhase,harborDebug:dt.harborDebug,plate:dt.plate,extendedPlate:dt.extendedPlate,overscanPlate:dt.overscanPlate,overscanScale:dt.overscanScale,overscanOrigin:dt.overscanOrigin,seaPlate:dt.seaPlate,railWidth:dt.railWidth,swayStrength:dt.swayStrength,dryWind:dt.dryWind,waterMatteOriginal:dt.waterMatteOriginal,waterMatteSquare:dt.waterMatteSquare,boatMask:dt.boatMask,...Kt,...n}}function K1(){return new ge({uniforms:Cu(),vertexShader:Au,side:Ge,fragmentShader:Ru+`varying vec3 vWorld; varying vec3 vNormalW;
void main(){ gl_FragColor = vec4(lit_art(environment_art(vWorld), ground_under(vWorld), vec3(0.0, 1.0, 0.0), 0.0), 1.0); }`})}function c0(){return new ge({uniforms:Cu(),vertexShader:Au,side:Ge,fragmentShader:Ru+`varying vec3 vWorld;varying vec3 vNormalW;
void main(){
 vec2 p=original_plate_uv(vWorld)*vec2(1536.,1024.);
 float along=(p.x-flagA.x)*flagA.y;
 float u=clamp(along/flagA.z,0.,1.);
 float top=mix(flagB.x,flagB.y,u),bot=mix(flagB.z,flagB.w,u);
 float t=harbor_clock(),amp=flagA.w*u;
 float ph=u*7.-t*5.2+sin(t*1.7)*.6;
 float fade=(1.-smoothstep(flagA.z+1.,flagA.z+12.,along))*smoothstep(top-amp-8.,top-amp-1.,p.y)*(1.-smoothstep(bot+amp+1.,bot+amp+8.,p.y));
 vec2 off=ambientMotion?vec2(.8*u*(1.-cos(ph))*flagA.y,amp*sin(ph))*fade:vec2(0.);
 vec2 q=p-off;float a=(q.x-flagA.x)*flagA.y;
 if(a<-.6||a>flagA.z+.5||q.y<mix(flagB.x,flagB.y,clamp(a/flagA.z,0.,1.))-.5||q.y>mix(flagB.z,flagB.w,clamp(a/flagA.z,0.,1.))+.5)discard;
 gl_FragColor=vec4(environment_art(vWorld),1.);
}`})}function Q1(){return new ge({uniforms:Cu({showArt:{value:!0},showWells:{value:!0}}),vertexShader:Au,fragmentShader:Tu+Ru+`
uniform bool showArt; uniform bool showWells; uniform float routeGroundShade;
varying vec3 vWorld; varying vec3 vNormalW;
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main(){
  vec2 cell = floor(vWorld.xz / 1.02 + 0.5);
  vec2 off = abs(vWorld.xz - cell * 1.02);
  // \u041D\u0430\u0434 \u0448\u0430\u0445\u0442\u0430\u043C\u0438 \u043A\u043B\u0435\u0442\u043E\u043A \u0437\u0435\u043C\u043B\u044F \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0430: \u043F\u0440\u043E\u0434\u0430\u0432\u043B\u0435\u043D\u043D\u0430\u044F \u043A\u043B\u0435\u0442\u043A\u0430 \u0443\u0445\u043E\u0434\u0438\u0442 \u0432\u043D\u0438\u0437.
  // \u041F\u0440\u043E\u0451\u043C \u0447\u0443\u0442\u044C \u0443\u0436\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 (0,985 \u2192 \xB10,4925): \u0437\u0435\u043C\u043B\u044F \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0432\u043F\u043B\u043E\u0442\u043D\u0443\u044E, \u0441\u0442\u0435\u043D\u043A\u0438 \u0448\u0430\u0445\u0442\u044B \u043D\u0435 \u043F\u0440\u043E\u0441\u0432\u0435\u0447\u0438\u0432\u0430\u044E\u0442
  // \u0432 \u0437\u0430\u0437\u043E\u0440\u0435 \u043C\u0435\u0436\u0434\u0443 \u043A\u043B\u0435\u0442\u043A\u0430\u043C\u0438 \u0438 \u043D\u0435 \u043C\u0435\u0440\u0446\u0430\u044E\u0442 \u0442\u043E\u043D\u043A\u043E\u0439 \u043F\u043E\u043B\u043E\u0441\u043A\u043E\u0439 \u043F\u0440\u0438 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438 \u043A\u0430\u043C\u0435\u0440\u044B.
  if (showWells && max(abs(cell.x), abs(cell.y)) == 5.0 && max(off.x, off.y) < 0.49) discard;
  vec2 puv = overscan_uv(extended_plate_uv(vWorld));
  vec2 paving = vWorld.xz * vec2(1.4, 2.5);
  paving.x += mod(floor(paving.y), 2.0) * 0.5;
  vec2 e = min(fract(paving), 1.0 - fract(paving));
  float seam = smoothstep(0.012, 0.04, min(e.x, e.y));
  float grain = hash21(floor(vWorld.xz * 100.0));
  vec3 ext = lin2srgb(vec3(0.57, 0.50, 0.39) * (0.85 + 0.08 * hash21(floor(paving)) + 0.06 * grain) * mix(0.88, 1.0, seam));
  float ed = min(min(puv.x, 1.0 - puv.x), min(puv.y, 1.0 - puv.y));
  vec3 c;
  if (!showArt) c = lin2srgb(vec3(0.51, 0.46, 0.37));
  else if (ed < -0.055) c = ext;
  else c = mix(ext, environment_art(vWorld), smoothstep(-0.05, 0.028, ed));
  float routeDistance=abs(max(abs(vWorld.x),abs(vWorld.z))-5.1);
  float routeBand=1.-smoothstep(.75,1.8,routeDistance);
  c*=mix(1.,routeGroundShade,routeBand);
  gl_FragColor = vec4(lit_art(c, vWorld, vec3(0.0, 1.0, 0.0), 0.0), 1.0);
}`})}function h0(n,t,e={}){let i=n.silhouette||[],r=Array.from({length:96},(s,a)=>new ct(...i[a]||[0,0]));return new ge({side:Ge,uniforms:Cu({debugVisible:{value:!1},debugOcclusion:{value:!1},silhouetteCount:{value:i.length},silhouette:{value:r},foliageMask:{value:!!n.foliage_mask},foliageMatte:{value:t},lightFlat:{value:!!e.flat},lightFoliage:{value:!!e.foliage}}),vertexShader:Au,fragmentShader:Ru+`
uniform bool debugVisible; uniform bool debugOcclusion; uniform int silhouetteCount;
uniform bool foliageMask; uniform sampler2D foliageMatte; uniform vec2 silhouette[96];
uniform bool lightFlat; uniform bool lightFoliage;
varying vec3 vWorld; varying vec3 vNormalW;
void main(){
  vec2 uv = original_plate_uv(vWorld);
  bool clip = !debugVisible || debugOcclusion;
  if (foliageMask && clip && texture(foliageMatte, uv).r < 0.5) discard;
  if (silhouetteCount > 2 && clip) {
    vec2 p = uv * vec2(1536.0, 1024.0);
    bool inside = false; int j = silhouetteCount - 1;
    for (int i = 0; i < 96; i++) {
      if (i >= silhouetteCount) break;
      vec2 a = silhouette[i]; vec2 b = silhouette[j];
      if ((a.y > p.y) != (b.y > p.y)) { if (p.x < (b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x) inside = !inside; }
      j = i;
    }
    if (!inside) discard;
  }
  vec3 n = normalize(vNormalW); if (!gl_FrontFacing) n = -n;
  vec3 lw = vWorld;
  if (lightFlat) { lw = ground_under(vWorld); n = vec3(0.0, 1.0, 0.0); }
  vec3 art = lit_art(environment_art(vWorld), lw, n, lightFoliage ? 1.0 : 0.0);
  gl_FragColor = vec4(debugVisible ? mix(art, debugOcclusion ? vec3(0.95,0.35,0.58) : vec3(0.1,0.75,0.95), 0.30) : art, 1.0);
}`})}function u0(n){let t=new Bt(new ii(19.05*dt.overscanScale.value,19.05*dt.overscanScale.value),K1());return t.quaternion.copy(n.quaternion),t.position.copy(oi).multiplyScalar(-20),t.renderOrder=-10,t}function d0(){let n=new ii(60,60);return n.rotateX(-Math.PI/2),new Bt(n,Q1())}function Pu(n,t){let e=[];for(let r of t)for(let s=1;s<r.length-1;s++)for(let a of[r[0],r[s],r[s+1]])e.push(n[a].x,n[a].y,n[a].z);let i=new _e;return i.setAttribute("position",new jt(e,3)),i.computeVertexNormals(),i}function Hp(n){let t=new A;return n.forEach(e=>t.add(e)),t.divideScalar(n.length),{center:t,local:n.map(e=>e.clone().sub(t))}}function f0(n){let t=[];for(let e of n.prisms){let i=+e.height,r=+(e.bottom||0),s=e.roof.map(([u,f])=>br(u,f,i)),a=new A;s.forEach(u=>a.add(u)),a.divideScalar(s.length),a.y=(i+r)/2;let o=s.length,l=[];for(let u=0;u<o;u++)if(e.base){let[f,m]=e.base[u];l.push(br(f,m,r).sub(a))}else l.push(new A(s[u].x,r,s[u].z).sub(a));for(let u of s)l.push(u.clone().sub(a));let c=[],h=[],d=[];for(let u=0;u<o;u++)h.push(o-1-u),d.push(o+u);c.push(h,d);for(let u=0;u<o;u++){let f=(u+1)%o;c.push([u,f,o+f,o+u])}t.push({name:e.name,center:a,kind:"hull",points:l,geometry:Pu(l,c),spec:e})}for(let e of n.hulls||[]){let i=e.vertices.map(([a,o,l])=>br(a,o,+l)),{center:r,local:s}=Hp(i);t.push({name:e.name,center:r,kind:"hull",points:s,geometry:Pu(s,e.faces),spec:e})}for(let e of n.beams||[]){let i=e.ends.map(([f,m,w])=>br(f,m,+w)),r=i[1].clone().sub(i[0]).normalize(),s=r.clone().cross(new A(0,1,0)).normalize();s.length()<.1&&(s=new A(1,0,0));let a=r.clone().cross(s).normalize(),o=[],l=[],c=[],h=[];for(let f=0;f<2;f++)for(let m=0;m<16;m++){let w=Math.PI*2*m/16;o.push(i[f].clone().add(s.clone().multiplyScalar(Math.cos(w)*e.radius)).add(a.clone().multiplyScalar(Math.sin(w)*e.radius)))}for(let f=0;f<16;f++)c.push(15-f),h.push(16+f),l.push([f,(f+1)%16,(f+1)%16+16,f+16]);l.push(c,h);let{center:d,local:u}=Hp(o);t.push({name:e.name,center:d,kind:"hull",points:u,geometry:Pu(u,l),spec:e})}for(let e of n.crowns||[]){let i=pe.clone().cross(Ne).normalize(),[r,s]=e.pixel,a=+e.height,o=gn(r,s+a*dl).add(new A(0,a,0)),l=e.silhouette.length,c=[-.92,-.65,0,.65,.92],h=[],d=[];for(let g of c){let _=Math.sqrt(1-g*g);for(let[b,T]of e.silhouette)h.push(o.clone().add(pe.clone().multiplyScalar((b-r)/Bi*_)).add(Ne.clone().multiplyScalar((s-T)/Bi*_)).add(i.clone().multiplyScalar(g*e.depth)))}for(let g=0;g<c.length-1;g++)for(let _=0;_<l;_++)d.push([g*l+_,g*l+(_+1)%l,(g+1)*l+(_+1)%l,(g+1)*l+_]);let u=[],f=[];for(let g=0;g<l;g++)u.push(l-1-g),f.push((c.length-1)*l+g);d.push(u,f);let{center:m,local:w}=Hp(h);t.push({name:e.name,center:m,kind:"hull",points:w,geometry:Pu(w,d),spec:e})}for(let e of n.rounds){let i=+e.height,r=+(e.bottom||0),s=+e.radius,a=!!e.sphere,o=r+i/2,l=e.groundAnchor?0:a?o:r,c=gn(e.pixel[0],e.pixel[1]+l*dl).add(new A(0,o,0));if(a){let h=[];for(let u=0;u<9;u++){let f=Math.PI*u/8;for(let m=0;m<16;m++){let w=Math.PI*2*m/16;h.push(new A(Math.cos(w)*Math.sin(f)*s,Math.cos(f)*i/2,Math.sin(w)*Math.sin(f)*s))}}let d=new jo(s,24,12);d.scale(1,i/(2*s),1),t.push({name:e.name,center:c,kind:"hull",points:h,geometry:d,spec:e})}else t.push({name:e.name,center:c,kind:"cylinder",radius:s,halfHeight:i/2,geometry:new pn(e.radiusTop??s,s,i,24),spec:e})}return t}var ml=new A;function wn(n,t,e,i,r,s){let a=2*Math.PI*r/4,o=Math.max(s-2*r,0),l=Math.PI/4;ml.copy(t),ml[i]=0,ml.normalize();let c=.5*a/(a+o),h=1-ml.angleTo(n)/l;return Math.sign(ml[e])===1?h*c:o/(a+o)+c+c*(1-h)}var Iu=class n extends Pn{constructor(t=1,e=1,i=1,r=2,s=.1){let a=r*2+1;if(s=Math.min(t/2,e/2,i/2,s),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:i,segments:r,radius:s},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new A,c=new A,h=new A(t,e,i).divideScalar(2).subScalar(s),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,m=d.length/6,w=new A,g=.5/a;for(let _=0,b=0;_<d.length;_+=3,b+=2)switch(l.fromArray(d,_),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),d[_+0]=h.x*Math.sign(l.x)+c.x*s,d[_+1]=h.y*Math.sign(l.y)+c.y*s,d[_+2]=h.z*Math.sign(l.z)+c.z*s,u[_+0]=c.x,u[_+1]=c.y,u[_+2]=c.z,Math.floor(_/m)){case 0:w.set(1,0,0),f[b+0]=wn(w,c,"z","y",s,i),f[b+1]=1-wn(w,c,"y","z",s,e);break;case 1:w.set(-1,0,0),f[b+0]=1-wn(w,c,"z","y",s,i),f[b+1]=1-wn(w,c,"y","z",s,e);break;case 2:w.set(0,1,0),f[b+0]=1-wn(w,c,"x","z",s,t),f[b+1]=wn(w,c,"z","x",s,i);break;case 3:w.set(0,-1,0),f[b+0]=1-wn(w,c,"x","z",s,t),f[b+1]=1-wn(w,c,"z","x",s,i);break;case 4:w.set(0,0,1),f[b+0]=1-wn(w,c,"x","y",s,t),f[b+1]=1-wn(w,c,"y","x",s,e);break;case 5:w.set(0,0,-1),f[b+0]=wn(w,c,"x","y",s,t),f[b+1]=1-wn(w,c,"y","x",s,e);break}}static fromJSON(t){return new n(t.width,t.height,t.depth,t.segments,t.radius)}};function va(n,t=!1){let e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},a={},o=n[0].morphTargetsRelative,l=new _e,c=0;for(let h=0;h<n.length;++h){let d=n[h],u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(d.attributes[f]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!r.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0,d=[];for(let u=0;u<n.length;++u){let f=n[u].index;for(let m=0;m<f.count;++m)d.push(f.getX(m)+h);h+=n[u].attributes.position.count}l.setIndex(d)}for(let h in s){let d=p0(s[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(let h in a){let d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){let f=[];for(let w=0;w<a[h].length;++w)f.push(a[h][w][u]);let m=p0(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}}return l}function p0(n){let t,e,i,r=-1,s=0;for(let c=0;c<n.length;++c){let h=n[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=h.gpuType),r!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*e}let a=new t(s),o=new ui(a,e,i),l=0;for(let c=0;c<n.length;++c){let h=n[c];if(h.isInterleavedBufferAttribute){let d=l/e;for(let u=0,f=h.count;u<f;u++)for(let m=0;m<e;m++){let w=h.getComponent(u,m);o.setComponent(u+d,m,w)}}else a.set(h.array,l);l+=h.count*e}return r!==void 0&&(o.gpuType=r),o}var m0=16,xa=.66,Lu,_0={value:0},g0={value:1};function w0(n,t=!0){_0.value+=n,g0.value=t?1:0}function tE(n){n.onBeforeCompile=t=>{t.uniforms.coinGlintTime=_0,t.uniforms.coinGlintEnabled=g0,t.vertexShader=`varying vec3 coinWorld; varying vec3 coinNormal;
`+t.vertexShader,t.vertexShader=t.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
      vec4 coinP=vec4(transformed,1.0); vec3 coinN=normal;
      #ifdef USE_INSTANCING
        coinP=instanceMatrix*coinP;coinN=mat3(instanceMatrix)*coinN;
      #endif
      coinWorld=(modelMatrix*coinP).xyz;coinNormal=normalize(mat3(modelMatrix)*coinN);`),t.fragmentShader=`uniform float coinGlintTime; uniform float coinGlintEnabled; varying vec3 coinWorld; varying vec3 coinNormal;
`+t.fragmentShader,t.fragmentShader=t.fragmentShader.replace("#include <opaque_fragment>",`
      vec2 tile=floor(coinWorld.xz/1.02+0.5);
      float seed=fract(sin(dot(tile,vec2(12.9898,78.233)))*43758.5453);
      float phase=mod(coinGlintTime+seed*17.0,11.0+seed*8.0);
      vec2 local=coinWorld.xz-tile*1.02;
      float sweep=(phase/0.95-0.5)*0.8;
      float band=1.0-smoothstep(0.006,0.043,abs(local.x+local.y-sweep));
      float front=smoothstep(0.1,0.7,dot(normalize(coinNormal),normalize(vec3(1.0,0.2,1.0))));
      float pulse=sin(clamp(phase/0.95,0.0,1.0)*3.14159265);
      outgoingLight+=vec3(0.34,0.27,0.14)*band*front*pulse*coinGlintEnabled;
      #include <opaque_fragment>`)},n.customProgramCacheKey=()=>"coin-front-glint-v1"}function y0(){if(Lu)return Lu;let n=[];function t(r,s){let a=r.toNonIndexed(),o=new qt(s),l=[];for(let c=0;c<a.attributes.position.count;c++)l.push(o.r,o.g,o.b);a.setAttribute("color",new jt(l,3)),n.push(a),r.dispose()}t(new pn(.19,.19,.052,32),"#cd9339");for(let r of[-.027,.027])t(new la(.19,.005,4,32).rotateX(Math.PI/2).translate(0,r,0),"#593a1d");for(let r of[-1,1]){t(new pn(.169,.169,.008,32).translate(0,r*.032,0),"#f2c45c"),t(new la(.151,.006,4,32).rotateX(Math.PI/2).translate(0,r*.038,0),"#986020");let s=new Fr;for(let a=0;a<10;a++){let o=a*Math.PI/5+Math.PI/2,l=a%2?.033:.077,c=Math.cos(o)*l,h=Math.sin(o)*l;a?s.lineTo(c,h):s.moveTo(c,h)}s.closePath(),t(new os(s).rotateX(-r*Math.PI/2).translate(0,r*.039,0),"#a76b23")}let e=va(n);n.forEach(r=>r.dispose());let i=new Be({vertexColors:!0});return tE(i),Lu={geometry:e,material:i},Lu}function Du(n){return n>0?Math.min(m0,Math.max(1,Math.ceil(Math.sqrt(n)*.9))):0}function ba(n){return{x:.34+Math.sin(n*2.4)*.003,y:.1+.0264+n*.0444,z:-.34+Math.cos(n*1.7)*.003,yaw:n*1.97}}function Vp(){let{geometry:n,material:t}=y0();return new Bt(n,t)}function v0(){let{geometry:n,material:t}=y0(),e=new Do(n,t,m0);return e.count=0,e.visible=!1,e.frustumCulled=!1,e.userData.amount=-1,e}var _l=new Ti;function x0(n,t){if(n.userData.amount!==t){n.userData.amount=t,n.count=Du(t),n.visible=n.count>0;for(let e=0;e<n.count;e++){let i=ba(e);_l.position.set(i.x,i.y,i.z),_l.rotation.set(0,i.yaw,0),_l.scale.setScalar(xa),_l.updateMatrix(),n.setMatrixAt(e,_l.matrix)}n.instanceMatrix.needsUpdate=!0}}var Nu=class{constructor(t,e){this.scene=t,this.board=e,this.items=[]}pop(t,e=!1){let i=this.board.tile(t);if(!i)return;this.items.length>=12&&this.remove(this.items.shift());let r=Vp();r.material=r.material.clone(),r.material.transparent=!0;let s=i.group.position.clone();s.y+=.45,r.position.copy(s),r.rotation.set(.8,0,.2),this.scene.add(r),this.items.push({coin:r,origin:s,t:0,reduced:e})}remove(t){this.scene.remove(t.coin),t.coin.material.dispose()}update(t){for(let e=this.items.length-1;e>=0;e--){let i=this.items[e],r=Math.min(1,(i.t+=t)/(i.reduced?.28:.8));i.coin.position.y=i.origin.y+(i.reduced?0:1.05*Math.sin(r*Math.PI*.65)),i.reduced||i.coin.rotation.set(.8+r*Math.PI*2,r*.7,.2),i.coin.material.opacity=1-Math.max(0,(r-.55)/.45),r===1&&(this.remove(i),this.items.splice(e,1))}}};var Dn={value:1},gl=new Set;function Gp(n){Dn.value=n?1:0,gl.forEach(t=>t(!!n))}var eE=`
float paperHash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float paperNoise(vec2 p) {
  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(paperHash(i),paperHash(i+vec2(1,0)),f.x),
    mix(paperHash(i+vec2(0,1)),paperHash(i+vec2(1,1)),f.x),f.y);
}
float inkLine(float d, float width) {
  float aa=max(fwidth(d),0.0005); return 1.0-smoothstep(width-aa,width+aa,abs(d));
}
`;function b0(n="#eddbb4",t=!1,e=0){return new ge({uniforms:{...Kt,crafted:Dn,isDie:{value:t?1:0},paperSeed:{value:e},paperColor:{value:new qt(n)},frameColor:{value:new qt("#c99a32")},frameWidth:{value:0}},vertexShader:`
      varying vec3 vLocal; varying vec3 vNormalW; varying vec3 vNormalL; varying vec3 vWorld;
      void main(){
        vLocal = position; vNormalL = normal;
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:Tu+eE+hr+`
      uniform float crafted; uniform float isDie; uniform float paperSeed;
      uniform vec3 paperColor; uniform vec3 frameColor; uniform float frameWidth;
      varying vec3 vLocal; varying vec3 vNormalW; varying vec3 vNormalL; varying vec3 vWorld;
      float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
      void main(){
        vec3 n = normalize(vNormalW);
        // \u0421\u0432\u0435\u0442 \u0441\u0443\u0442\u043E\u043A (daylight.js): \u0434\u043D\u0451\u043C 1, \u043D\u043E\u0447\u044C\u044E \u0442\u0435\u043C\u043D\u0435\u0435 \u0441 \u043D\u0438\u0436\u043D\u0438\u043C \u043F\u043E\u0440\u043E\u0433\u043E\u043C \u2014 \u043F\u043E\u043B\u0435 \u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F.
        vec3 dayLight = lightOn ? max(sceneLight(vWorld, n), vec3(0.22, 0.25, 0.32)) : vec3(1.0);
        float shade = n.y > 0.5 ? 1.0 : (n.x > 0.5 ? 0.73 : 0.85);
        float grain = (hash(floor(vLocal * 450.0)) - 0.5) * 0.018;
        float wash = sin(vLocal.x * 16.0 + vLocal.z * 23.0) * 0.008;
        vec3 color = srgb2lin(paperColor);
        if (frameWidth > 0.0 && n.y > 0.5) {
          float d = 0.5 - max(abs(vLocal.x), abs(vLocal.z));
          float outer = 0.035;
          if (d > outer && d < outer + frameWidth) color = srgb2lin(frameColor);
          if (d >= outer + frameWidth && d < outer + frameWidth + 0.014) color = vec3(0.19, 0.16, 0.11);
        }
        
        vec3 original = lin2srgb(color * (shade + grain + wash));
        if (crafted < 0.5) { gl_FragColor = vec4(shoulder(original * dayLight),1.0); return; }
        // Warm key from upper left, restrained cool fill. No specular/bloom.
        vec3 light = normalize(vec3(-1.1,1.6,0.35));
        float ndl = dot(n,light);
        float lightStep = 0.72 + 0.16*smoothstep(-0.35,-0.15,ndl)
          + 0.12*smoothstep(0.25,0.48,ndl);
        vec2 q = abs(vNormalL.y)>0.5 ? vLocal.xz : vec2(vLocal.x+vLocal.z,vLocal.y);
        vec2 paperQ = q + vec2(paperSeed*2.73,paperSeed*1.37);
        float fibre = paperNoise(paperQ*vec2(92.0,230.0))-0.5;
        float pigment = paperNoise(paperQ*23.0)-0.5;
        float texel = max(length(dFdx(paperQ)),length(dFdy(paperQ)));
        float fine = 1.0-smoothstep(0.005,0.025,texel);
        vec3 base = paperColor;
        float edge = 0.5-max(abs(vLocal.x),abs(vLocal.z));
        float uneven = 0.0018*sin(vLocal.x*38.0+paperSeed)+0.0012*sin(vLocal.z*51.0);
        if (isDie < 0.5) {
          float top = smoothstep(0.50,0.88,vNormalL.y);
          // Exposed compressed paper in the cut edge, below the printed facing.
          float layer = 0.5+0.5*sin((vLocal.y+0.0015*sin((vLocal.x+vLocal.z)*31.0))*205.0);
          layer = mix(0.5,layer,1.0-smoothstep(0.006,0.03,texel));
          vec3 cut = mix(vec3(0.57,0.43,0.28),vec3(0.77,0.64,0.44),layer);
          cut += pigment*0.025;
          base = mix(cut,base,top);
          if (top>0.8) {
            float border=inkLine(edge-0.023-uneven,0.005);
            base=mix(base,vec3(0.23,0.18,0.12),border*0.84);
            float rim=inkLine(edge-0.038-uneven,0.004);
            base=mix(base,vec3(0.97,0.91,0.76),rim*0.65);
            if(frameWidth>0.0) {
              float band=smoothstep(0.052,0.056,edge)*(1.0-smoothstep(0.056+frameWidth,0.060+frameWidth,edge));
              base=mix(base,frameColor,band);
              base=mix(base,vec3(0.24,0.18,0.12),inkLine(edge-0.061-frameWidth-uneven,0.004)*0.85);
            }
            // Tiny worn corners, no blanket grunge over the playing surface.
            float corner=smoothstep(0.33,0.49,min(abs(vLocal.x),abs(vLocal.z)));
            base=mix(base,vec3(0.86,0.76,0.57),corner*0.16);
          }
          float lip=inkLine(vLocal.y-0.153,0.004)*(1.0-top);
          base=mix(base,vec3(0.35,0.25,0.15),lip*0.6);
        } else {
          // Ivory with a broad painted highlight, legible rounded shoulders.
          float bevel=1.0-max(max(abs(vNormalL.x),abs(vNormalL.y)),abs(vNormalL.z));
          base *= 1.0-bevel*0.13;
        }
        vec3 tint = mix(vec3(0.92,0.94,0.95),vec3(1.02,1.005,0.975),smoothstep(-0.1,0.65,ndl));
        vec3 painted = base * tint * lightStep + fibre*0.025*fine + pigment*0.016;
        gl_FragColor = vec4(clamp(shoulder(painted * dayLight),0.0,1.0),1.0);
      }`})}var Uu=new Be({color:"#30281d"}),S0=new Be({color:"#5b4936"}),M0=new ge({side:Ri,vertexShader:"void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position + normal * 0.008, 1.0); }",fragmentShader:Tu+"void main(){ gl_FragColor = vec4(lin2srgb(vec3(0.028,0.019,0.012)), 1.0); }"}),Fu;function iE(){if(Fu)return Fu;let n=document.createElement("canvas");n.width=128,n.height=128;let t=n.getContext("2d"),e=t.createRadialGradient(64,64,5,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.35,"rgba(255,255,255,0.8)"),e.addColorStop(.7,"rgba(255,255,255,0.25)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Fu=new ei(n),Fu}function Wr(n=.24){let t=new Be({color:new qt(.1,.07,.03),transparent:!0,opacity:n,depthWrite:!1}),e=i=>{t.map=i?iE():null,t.needsUpdate=!0};return gl.add(e),t.addEventListener("dispose",()=>gl.delete(e)),e(Dn.value>.5),t}function Wp(n=null,t="#d6c39b"){return new ge({uniforms:{...Kt,surface:{value:n},edgeColor:{value:new qt(t)}},vertexShader:`
      varying vec2 vUv; varying vec3 vWorld; varying vec3 vN; varying vec3 vNL;
      void main(){ vUv = uv; vNL = normal; vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
        vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:hr+`
      uniform sampler2D surface; uniform vec3 edgeColor;
      varying vec2 vUv; varying vec3 vWorld; varying vec3 vN; varying vec3 vNL;
      void main(){
        vec3 n = normalize(vN);
        vec3 base = vNL.y > 0.999 ? texture2D(surface, vUv).rgb : edgeColor;
        // \u0422\u043E\u0440\u0446\u044B \u0447\u0438\u0442\u0430\u044E\u0442\u0441\u044F \u043A\u0430\u043A \u0443 \u043F\u0440\u0435\u0436\u043D\u0435\u0439 \u0431\u0443\u043C\u0430\u0433\u0438: \u0433\u0440\u0430\u043D\u044C \u043A +X \u0442\u0435\u043C\u043D\u0435\u0435, \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u0447\u0443\u0442\u044C.
        float shade = vNL.y > 0.5 ? 1.0 : (vNL.x > 0.5 ? 0.82 : 0.91);
        vec3 l = lightOn ? max(sceneLight(vWorld, n), vec3(0.22, 0.25, 0.32)) : vec3(1.0);
        gl_FragColor = vec4(shoulder(base * shade * l), 1.0);
      }`})}var Xi={linear:n=>n,sineInOut:n=>-(Math.cos(Math.PI*n)-1)/2,quadIn:n=>n*n,quadOut:n=>1-(1-n)*(1-n),cubicIn:n=>n*n*n,cubicOut:n=>1-Math.pow(1-n,3),backOut:n=>1+2.70158*Math.pow(n-1,3)+1.70158*Math.pow(n-1,2)},Sa=new Set;function E0(n,t,e,i){let r={i:0,t:0,from:null,dead:!1};return r.update=s=>{let a=s;for(;r.i<e.length;){let o=e[r.i];if(o.call){o.call(),r.i++;continue}r.from===null&&(r.from=n()),r.t+=a,a=0;let l=o.wait??o.dur,c=l>0?Math.min(1,r.t/l):1;if(o.wait===void 0&&t(r.from+(o.to-r.from)*(o.ease||Xi.linear)(c)),c<1)return!1;a=r.t-l,r.t=0,r.from=null,r.i++}return i?.(),!0},r.kill=()=>{r.dead=!0,Sa.delete(r)},Sa.add(r),r}function T0(n,t,e){let i=0,r={dead:!1};return r.update=s=>{i+=s;let a=Math.min(1,i/Math.max(n,1e-6));return t(a),a>=1?(e?.(),!0):!1},r.kill=()=>{r.dead=!0,Sa.delete(r)},Sa.add(r),r}function R0(n){for(let t of[...Sa])t.dead||t.update(n)&&Sa.delete(t)}var A0=0,Xp=0,C0=()=>{};function P0(n){C0=n}function nE(){A0++,C0(Xp?Math.round(A0/Xp*100):100)}function I0(n){return Xp++,new Promise((t,e)=>{let i=new Image;i.decoding="async",i.onload=()=>{nE(),t(i)},i.onerror=()=>e(new Error("\u041D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u043E\u0441\u044C: "+n)),i.src=n})}function qp(n,{flipY:t=!0,nearest:e=!1,repeat:i=!1}={}){return n.colorSpace=Ke,n.flipY=t,n.generateMipmaps=!e,n.minFilter=e?Ve:or,n.magFilter=e?Ve:ai,n.wrapS=n.wrapT=i?$s:un,n.anisotropy=4,n.needsUpdate=!0,n}async function vi(n,t){let e=await I0(n);return qp(new Ei(e),t)}async function Ou(n,t,e=t,i){let r=await I0(n),s=document.createElement("canvas");return s.width=t,s.height=e,s.getContext("2d").drawImage(r,0,0,t,e),qp(new ei(s),i)}function L0(n,t,e,i,r){let s=n.clone(),a=n.image.width,o=n.image.height;return s.repeat.set(i/a,r/o),s.offset.set(t/a,1-(e+r)/o),s.needsUpdate=!0,s.userData.size=[i,r],s}function N0(n,{size:t=48,color:e="#fff0cf",outline:i="#33271d",stroke:r=12}={}){let s=document.createElement("canvas"),a=s.getContext("2d"),o=`800 ${t}px Bitter, "Golos Text", Georgia, serif`;a.font=o;let l=Math.ceil(a.measureText(n).width+r*2+4),c=Math.ceil(t*1.3+r*2);s.width=l,s.height=c,a.font=o,a.textAlign="center",a.textBaseline="middle",a.lineJoin="round",a.lineWidth=r,a.strokeStyle=i,a.strokeText(n,l/2,c/2+t*.04),a.fillStyle=e,a.fillText(n,l/2,c/2+t*.04);let h=qp(new ei(s));return h.userData.size=[l,c],h}var D0={neutral:"#eddbb4",closed:"#817866",negative:"#bc5143",positive:"#79a477",owned:"#648ca4",collector:"#dfb34e"},rE=["home","wh","bank","pot","scatter","chance","hazard","police","slot"],F0={home:"\u0421\u0422\u0410\u0420\u0422",wh:"\u0421\u041A\u041B\u0410\u0414",bank:"\u0411\u0410\u041D\u041A",pot:"\u041A\u041E\u041F\u0418\u041B\u041A\u0410",scatter:"\u0418\u041D\u041A\u0410\u0421\u0421\u0410\u0422\u041E\u0420",chance:"\u0428\u0410\u041D\u0421",hazard:"\u0418\u041D\u0421\u041F\u0415\u041A\u0422\u041E\u0420",police:"\u0423\u0427\u0410\u0421\u0422\u041E\u041A",slot:"\u0410\u0412\u0422\u041E\u041C\u0410\u0422"};function sE(n,t,e){let i=parseInt(n.slice(1),16),r=parseInt(t.slice(1),16),s=a=>Math.round((i>>a&255)*(1-e)+(r>>a&255)*e);return"#"+[16,8,0].map(a=>s(a).toString(16).padStart(2,"0")).join("")}function U0(n,t,e=!1){let i=n.type,r=!!(n.insp||n.drop?.insp),s=i==="kiosk"||i==="biz";if(t?.color&&s&&(e||!r))return{role:t.mine?"owned":"rival",color:sE(D0.neutral,t.color,.88),frame:t.color,functional:!1};let a=n.unlocked?"neutral":"closed";return["home","bank","pot"].includes(i)&&(a="positive"),i==="scatter"&&(a="collector"),s&&(n.owner===!0||n.owner==="you")&&(a="owned"),(["hazard","police"].includes(i)||r&&!(e&&a==="owned"))&&(a="negative"),{role:a,color:D0[a],frame:a==="collector"?"#714720":a==="owned"?"#d2e1d3":null,functional:rE.includes(i)}}function O0(n){let t=n.drop;return!!n.unlocked||["home","hazard","chance","pot","scatter","police","slot"].includes(n.type)||!!(t&&!(Number(t.cash)>0))}function B0(n,t=40){let e=r=>n?.[r]?.pid??(n?.[r]?n[r].mine?"me":n[r].color:null),i=Array.from({length:t},(r,s)=>s).filter(r=>e(r)&&e(r)!==e((r+t-1)%t));return i.length?i.map(r=>{let s=[r];for(let a=(r+1)%t;a!==r&&e(a)===e(r);a=(a+1)%t)s.push(a);return s}).filter(r=>r.length>1):e(0)&&Array.from({length:t},(r,s)=>s).every(r=>e(r)===e(0))?[Array.from({length:t},(r,s)=>s)]:[]}function z0(n,t,e=40){let i=n?.[t]?.pid;return i?[(t+e-1)%e,(t+1)%e].filter(r=>n?.[r]?.pid===i).length*25:0}var Yp=["gum","cola","tape","jeans","sneak","vcr","marl","bud","walk","levis","jordan","cam","cigar","champ","disc","jacket","bmx","comp","candy","cake","sport","keds","boots","tv","lot"],Jp=["goods","home","chance","warehouse","bank","piggy","biz","police","inspector","scatter","slot","dice21","die"],jp="e0486044d3";var V0=[...Yp,...Jp],G0={gum:[215,704,115,76],cola:[35,682,72,104],shop:[116,681,103,106],basket:[337,686,98,100],hazard:[445,696,69,88],tv:[533,686,84,96],coin:[623,700,80,80],pizza:[706,693,87,93],biz:[801,705,113,70],crate:[929,706,89,80],gem:[382,180,78,62],die:[758,831,74,73],home:[893,574,125,95]},Ma=.12,Zp=.23,$p=-.06,k0=.095,aE=.052,oE=.045,lE=16,H0=new sr(.26,28).rotateX(-Math.PI/2);function Bu(n,t,e,i,r,s){let a=new Pn(n,t,e);return a.translate(i,r,s),a}function cE(n){let t=document.createElement("canvas");t.width=t.height=2;let e=t.getContext("2d");e.fillStyle=n,e.fillRect(0,0,2,2);let i=new ei(t);return i.colorSpace=Ke,i}function W0(n,t){let e=parseInt(n.slice(1),16),i=r=>Math.round((e>>r&255)*t);return"#"+[16,8,0].map(r=>i(r).toString(16).padStart(2,"0")).join("")}function hE(n,{color:t,frame:e,symbol:i,ink:r,caption:s,level:a,rent:o,boost:l,joined:c=[],functional:h,owned:d}){let u=document.createElement("canvas");u.width=u.height=256;let f=u.getContext("2d");f.fillStyle=t,f.fillRect(0,0,256,256);for(let _=0;_<600;_++){let b=_*71%256,T=_*113%256;f.fillStyle=_%2?"#ffffff08":"#523f2a09",f.fillRect(b,T,1+_%3,1)}if(f.lineJoin="round",f.lineCap="round",h)for(let[_,b,T]of[[10,7,"#30261b"],[19,3,"#f2e3bd"]])f.beginPath(),f.moveTo(_+18,_),f.lineTo(256-_-18,_),f.lineTo(256-_,_+18),f.lineTo(256-_,256-_-18),f.lineTo(256-_-18,256-_),f.lineTo(_+18,256-_),f.lineTo(_,256-_-18),f.lineTo(_,_+18),f.closePath(),f.strokeStyle=T,f.lineWidth=b,f.stroke();else{let _=[[0,0,1,0],[1,0,1,1],[1,1,0,1],[0,1,0,0]];for(let[b,T,v]of e?[[11,9,W0(e,.65)],[20,3,"#f2e3bd"]]:[[11,3,"#786346"]])f.strokeStyle=v,f.lineWidth=T,_.forEach((E,R)=>{c.includes(R)||(f.beginPath(),f.moveTo(b+E[0]*(256-2*b),b+E[1]*(256-2*b)),f.lineTo(b+E[2]*(256-2*b),b+E[3]*(256-2*b)),f.stroke())})}i&&((d||h)&&(f.fillStyle="#f2e3bd",f.beginPath(),f.ellipse(128,107,h?73:66,h?73:64,0,0,Math.PI*2),f.fill(),f.strokeStyle="#30261b",f.lineWidth=2,f.stroke()),f.drawImage(i,h?63:68,h?42:48,h?130:120,h?130:120));let m=parseInt(t.slice(1),16),w=(m>>16)*.299+(m>>8&255)*.587+(m&255)*.114>145;f.fillStyle=d&&!w?"#fff0cb":r||"#30261b",f.textAlign="center",f.textBaseline="alphabetic",a>0?(f.font="800 23px Bitter, Georgia, serif",f.textAlign="left",f.fillText("\u0423\u0420. "+a,27,42),l&&(f.textAlign="right",f.font="800 23px Bitter, Georgia, serif",f.fillText("+"+l+"%",229,42)),f.textAlign="center",o!=null?(f.font="800 17px Bitter, Georgia, serif",f.fillText("\u0413\u041E\u0421\u0422\u042C",128,184),f.font="800 52px Bitter, Georgia, serif",f.fillText("$"+o,128,236,210)):(f.font="800 26px Bitter, Georgia, serif",f.fillText(s,128,221,205))):(f.font="800 "+(s.length>10?23:28)+"px Bitter, Georgia, serif",f.fillText(s,128,221,205));let g=new ei(u);return g.colorSpace=Ke,g.anisotropy=4,g}function X0(n){let t={};if(!n||n.phase==="lobby"||!n.tiles)return t;let e=n.turn?.n??0;n.tiles.forEach((i,r)=>{i&&Number(i.frozen)>e&&(t[i.i??r]={frozen:!0})});for(let i of n.lots||[])Number.isInteger(+i.tile)&&((t[+i.tile]=t[+i.tile]||{}).lot=i.kind==="bankrupt"?"bankrupt":"sale");return t}var Kp={};function uE(n){if(Kp[n])return Kp[n];let t=n==="frozen",e=n==="bankrupt",i=t?160:360,r=160,s=document.createElement("canvas");s.width=i,s.height=r;let a=s.getContext("2d");a.lineJoin="round",a.lineCap="round";let o="#2a241c",l=t?"#dcebf2":e?"#b4473a":"#f3e6c6",c=e?"#f3e6c6":t?"#3d6f8c":o;if(a.fillStyle="rgba(30,22,14,.28)",t?(a.beginPath(),a.arc(83,86,64,0,Math.PI*2),a.fill()):(a.beginPath(),a.roundRect(14,26,i-22,r-44,52),a.fill()),a.fillStyle=l,a.strokeStyle=o,a.lineWidth=9,t?(a.beginPath(),a.arc(78,80,64,0,Math.PI*2),a.fill(),a.stroke()):(a.beginPath(),a.roundRect(8,20,i-22,r-44,52),a.fill(),a.stroke()),a.strokeStyle=c,a.fillStyle=c,t){a.lineWidth=9;for(let d=0;d<3;d++){let u=d*Math.PI/3,f=Math.cos(u),m=Math.sin(u);a.beginPath(),a.moveTo(78-f*40,80-m*40),a.lineTo(78+f*40,80+m*40),a.stroke();for(let w of[-1,1])for(let g of[24]){let _=78+f*g*w,b=80+m*g*w;a.lineWidth=6;for(let T of[-1,1]){let v=u+T*Math.PI/4;a.beginPath(),a.moveTo(_,b),a.lineTo(_+Math.cos(v)*13*w,b+Math.sin(v)*13*w),a.stroke()}a.lineWidth=9}}}else a.save(),a.translate(70,78),a.rotate(-.7),a.fillStyle=c,a.beginPath(),a.roundRect(-30,-17,60,34,8),a.fill(),a.fillRect(-6,12,12,46),a.restore(),a.beginPath(),a.roundRect(40,108,52,11,4),a.fill(),a.font='800 46px Bitter, "Golos Text", Georgia, serif',a.textAlign="left",a.textBaseline="middle",a.fillText(e?"\u0417\u0410 \u0414\u041E\u041B\u0413\u0418":"\u0422\u041E\u0420\u0413\u0418",124,82,i-150);let h=new ei(s);return h.colorSpace=Ke,h.anisotropy=4,h.userData.size=[i,r],Kp[n]=h}var zu=class{constructor(t,e){this.tex=e,this.group=new Pe,t.add(this.group),this.tiles=[],this.occupied=-1,this.owners=null;let i=new Iu(.985,Zp,.985,2,.025),r=new Pn(.985,1,.985),s=[];s0().forEach(([l,c],h)=>{let d=new Pe;d.position.set(l*1.02,$p,c*1.02);let u=Wp(),f=new Bt(i,u);f.position.y=Ma-Zp/2;let m=new Bt(r,Wp(cE("#d6c39b")));m.visible=!1,d.add(f,m);let w=new Cn(new fn({alphaTest:.12,depthTest:!0}));w.position.y=.45,w.visible=!1;let g=new Cn(new fn({alphaTest:.05,depthTest:!0,transparent:!0}));g.position.y=.94,g.visible=!1,g.renderOrder=5;let _=v0();_.position.y=Ma+.003;let b=ba(0),T=new Bt(H0,Wr(.31));T.position.set(b.x-.03,Ma+.02,b.z+.12),T.scale.setScalar(1.15),T.renderOrder=1,T.visible=!1;let v=new Bt(H0,Wr(.32));v.position.set(0,Ma+.02,.1),v.scale.setScalar(1.1),v.renderOrder=1,v.visible=!1;let E=new Cn(new fn({alphaTest:.08,depthTest:!0,transparent:!0}));E.position.set(.3,.86,-.3),E.visible=!1,E.renderOrder=6,d.add(w,g,_,T,v,E),this.group.add(d),this.tiles.push({index:h,group:d,block:f,stack:m,mat:u,sprite:w,label:g,coins:_,pileShadow:T,dropShadow:v,mark:E,restY:$p,rise:0,anim:null,labelText:"",labelKey:"",topKey:""}),s.push(Bu(1.016,.035,1.016,l*1.02,-.68,c*1.02));for(let R of[-.514,.514])s.push(Bu(1.04,.635,.012,l*1.02,-.3325,c*1.02+R)),s.push(Bu(.012,.635,1.04,l*1.02+R,-.3325,c*1.02))});let a=s.filter((l,c)=>c%5===0),o=s.filter((l,c)=>c%5!==0);t.add(new Bt(va(a),Uu),new Bt(va(o),S0)),this.plates=new Pe,t.add(this.plates),this.platesKey="",this.state=[]}tile(t){return this.tiles[t]}_animate(t,e){t.anim?.kill(),t.anim=E0(()=>t.group.position.y,i=>{t.group.position.y=i},e)}setOccupied(t,e,i=!1){let r=this.tiles[t];if(!r||r.occupied===e&&!i)return;r.occupied=e,r.anim?.kill();let s=e?r.restY-k0:r.restY;if(i){r.group.position.y=s;return}this._animate(r,e?[{to:s,dur:.2,ease:Xi.cubicOut}]:[{to:r.restY+.018,dur:.16,ease:Xi.quadOut},{to:r.restY,dur:.22,ease:Xi.sineInOut}])}passOver(t){let e=this.tiles[t];e.occupied||this._animate(e,[{to:e.restY-aE,dur:.07,ease:Xi.sineInOut},{to:e.restY+.012,dur:.14,ease:Xi.quadOut},{to:e.restY,dur:.16,ease:Xi.sineInOut}])}occupy(t,e=!1){this.occupied!==t&&(this.occupied>=0&&this.setOccupied(this.occupied,!1),this.occupied=t,this.update(),t>=0&&this.setOccupied(t,!0,e))}setLevel(t,e){let i=Math.max(0,Math.min(lE,e)-1)*oE;if(Math.abs(i-t.rise)<1e-4)return;t.rise=i,t.restY=$p+i,t.stack.visible=i>.001,t.stack.scale.y=Math.max(.001,i),t.stack.position.y=Ma-Zp-i/2;let r=t.occupied?t.restY-k0:t.restY;this._animate(t,[{to:r,dur:.35,ease:Xi.backOut}])}setLabel(t,e,i,r){let s=e+i+r;if(t.labelKey===s)return;if(t.labelKey=s,t.label.material.map?.dispose(),!e){t.label.material.map=null;return}let a=N0(e,{color:i});t.label.material.map=a,t.label.material.needsUpdate=!0,t.label.scale.set(a.userData.size[0]*r,a.userData.size[1]*r,1)}setOwners(t){this.owners=t||{},this.state&&this.update()}get multiplayer(){return!!this.owners&&Object.keys(this.owners).length>0}setMarks(t){let e=JSON.stringify(t||{});e!==this.marksKey&&(this.marksKey=e,this.marks=t||{},this.tiles.forEach((i,r)=>{let s=this.marks[r],a=s?.lot||(s?.frozen?"frozen":null);if(i.mark.visible=!!a,!a)return;let o=uE(a),[l,c]=o.userData.size,h=(a==="frozen"?.38:.86)/l;i.mark.position.set(a==="frozen"?.28:0,a==="frozen"?.78:.94,a==="frozen"?-.28:0),i.mark.material.map!==o&&(i.mark.material.map=o,i.mark.material.needsUpdate=!0),i.mark.scale.set(l*h,c*h,1)}),this.state&&this.update())}updatePlates(){let t=this.owners||{},e=this.multiplayer?B0(t,this.tiles.length):[],i=e.map(r=>r.join(",")+":"+(t[r[0]].color||"")).join("|");if(i!==this.platesKey){this.platesKey=i;for(let r of this.plates.children)r.geometry.dispose(),r.material.uniforms?.surface.value?.dispose(),r.material.dispose();this.plates.clear();for(let r of e){let s=t[r[0]].color||"#6b5f52",a=[];for(let l of r){let c=this.tiles[l].group.position;for(let[h,d]of[[1,0],[-1,0],[0,1],[0,-1]])r.some(u=>u!==l&&Math.abs(this.tiles[u].group.position.x-c.x-h*1.02)<.001&&Math.abs(this.tiles[u].group.position.z-c.z-d*1.02)<.001)||a.push(Bu(h?.025:1.02,.014,d?.025:1.02,c.x+h*.511,.021,c.z+d*.511))}let o=new Bt(va(a),new Be({color:s}));o.userData.members=r,this.plates.add(o)}}}update(t=this.state){this.state=t;let{symbols:e,atlas:i,drops:r}=this.tex,s=this.multiplayer;for(let a=0;a<Math.min(40,t.length);a++){let o=t[a],l=this.tiles[a],c=o.type||"",h="crate";c==="kiosk"?(h=o.good||"gum",e[h]||(h="goods")):c==="biz"?h="biz":c==="home"?h="home":c==="wh"?h="warehouse":c==="bank"?h="bank":c==="pot"?h="piggy":c==="hazard"?h="inspector":c==="chance"?h="chance":c==="scatter"?h="scatter":c==="police"?h="police":c==="slot"&&(h=o.game==="dice21"?"dice21":"slot");let d=h,u=o.drop&&typeof o.drop=="object"?o.drop:null,f=Number(u?.cash)>0,m=c==="pot"?Math.max(0,Number(o.pot)||0):0,w="";u&&(u.cash>0?w="+"+Math.floor(u.cash):u.hard>0?(h="gem",w="+"+Math.floor(u.hard)):u.rolls>0?(h="die",w="+"+Math.floor(u.rolls)):u.insp?h="insp":(h="hazard",w="!")),x0(l.coins,m||Math.max(0,Number(u?.cash)||0));let g=O0(o),_=c==="kiosk"&&Yp.includes(d)||Jp.includes(d)?d:c==="kiosk"?e[o.good]?o.good:"goods":null,b=g&&_&&!(u&&!f&&!u.insp),T=U0(o,this.owners?.[a],s),v=c==="kiosk"||c==="biz"?Math.max(0,Number(o.lvl)||0):0,E=null;if(s&&this.owners?.[a])try{let N=window.parent.MP,H=N?.view?.tiles?.find(j=>j.i===a);H&&typeof N.rentOf=="function"&&(E=Math.max(0,Math.round(N.rentOf({...H,rival:this.owners[a].pid,owner:null}))))}catch{}let R=s?z0(this.owners,a):0,I=[];if(R)for(let[N,H,j]of[[0,0,-1],[1,1,0],[2,0,1],[3,-1,0]])[(a+39)%40,(a+1)%40].some(Z=>this.owners[Z]?.pid===this.owners[a].pid&&Math.abs(this.tiles[Z].group.position.x-l.group.position.x-H*1.02)<.001&&Math.abs(this.tiles[Z].group.position.z-l.group.position.z-j*1.02)<.001)&&I.push(N);let x=!!this.owners?.[a]||T.role==="owned",S=F0[c]||(c==="biz"?"\u0411\u0418\u0417\u041D\u0415\u0421":v||o.unlocked?"\u0422\u041E\u0427\u041A\u0410":"\u0417\u0410\u041A\u0420\u042B\u0422\u041E"),L=c==="home"?"#30261b":null,U=[T.color,T.frame||"",b?_:"",S,v,E,R,I.join(),T.functional,x].join("|");if(l.topKey!==U){l.topKey=U,l.mat.uniforms.surface.value?.dispose(),l.mat.uniforms.surface.value=hE(a,{color:T.color,frame:T.frame,symbol:b?(e[_]||e.goods)?.image:null,ink:L,caption:S,level:v,rent:E,boost:R,joined:I,functional:T.functional,owned:x});let N=W0(T.color,.9);l.mat.uniforms.edgeColor.value.set(N),l.stack.material.uniforms.edgeColor.value.set(N)}if(!_||u&&!f){let N=u&&!f&&r[h]||i[h]||i.crate;l.sprite.material.map!==N&&(l.sprite.material.map=N,l.sprite.material.needsUpdate=!0);let[H,j]=N.userData.size||[N.image.width,N.image.height],Z=.67/Math.max(H,j);l.sprite.scale.set(H*Z,j*Z,1),l.sprite.visible=g&&h!=="coin"&&!(a===this.occupied&&(!u||f))}else l.sprite.visible=!1;if(f||m){let N=ba(l.coins.count-1);l.label.position.set(N.x,Ma+N.y+.18,N.z)}else l.label.position.set(0,.94,0);m&&(w=String(Math.floor(m))),this.setLabel(l,w,f||m?"#ffd76a":"#fff0cf",.005),l.label.visible=!!w;let z=a===this.occupied&&(f||m>0);z?(l.coins.visible=!1,l.label.position.set(0,2.45,0)):l.coins.visible=l.coins.count>0,l.pileShadow.visible=l.coins.visible,l.dropShadow.visible=!!u&&!f&&l.sprite.visible;let W=Dn.value>.5?.95:.34;l.pileShadow.material.opacity=W,l.dropShadow.material.opacity=W*.85,l.label.material.depthTest===z&&(l.label.material.depthTest=!z,l.label.material.needsUpdate=!0),l.label.renderOrder=z?9:5,this.setLevel(l,(c==="kiosk"||c==="biz")&&Number(o.lvl)||0)}this.updatePlates()}};var Bn=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,Qp.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,Qp.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawbroadphase_free(t,0)}castRay(t,e,i,r,s,a,o,l,c,h,d,u){try{P(t,ri),P(e,Ae),P(i,qe),P(r,J),P(s,J);let f=p.rawbroadphase_castRay(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a,o,l,zt(c)?Number.MAX_SAFE_INTEGER:c>>>0,!zt(h),zt(h)?0:h,!zt(d),zt(d)?0:d,ft(u));return f===0?void 0:Nl.__wrap(f)}finally{lt[ht++]=void 0}}castRayAndGetNormal(t,e,i,r,s,a,o,l,c,h,d,u){try{P(t,ri),P(e,Ae),P(i,qe),P(r,J),P(s,J);let f=p.rawbroadphase_castRayAndGetNormal(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a,o,l,zt(c)?Number.MAX_SAFE_INTEGER:c>>>0,!zt(h),zt(h)?0:h,!zt(d),zt(d)?0:d,ft(u));return f===0?void 0:Pa.__wrap(f)}finally{lt[ht++]=void 0}}castShape(t,e,i,r,s,a,o,l,c,h,d,u,f,m,w){try{P(t,ri),P(e,Ae),P(i,qe),P(r,J),P(s,ee),P(a,J),P(o,se);let g=p.rawbroadphase_castShape(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a.__wbg_ptr,o.__wbg_ptr,l,c,h,d,zt(u)?Number.MAX_SAFE_INTEGER:u>>>0,!zt(f),zt(f)?0:f,!zt(m),zt(m)?0:m,ft(w));return g===0?void 0:Ta.__wrap(g)}finally{lt[ht++]=void 0}}collidersWithAabbIntersectingAabb(t,e,i,r,s,a){try{P(t,ri),P(e,Ae),P(i,qe),P(r,J),P(s,J),p.rawbroadphase_collidersWithAabbIntersectingAabb(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,ft(a))}finally{lt[ht++]=void 0}}intersectionWithShape(t,e,i,r,s,a,o,l,c,h,d){try{let m=p.__wbindgen_add_to_stack_pointer(-16);P(t,ri),P(e,Ae),P(i,qe),P(r,J),P(s,ee),P(a,se),p.rawbroadphase_intersectionWithShape(m,this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a.__wbg_ptr,o,zt(l)?Number.MAX_SAFE_INTEGER:l>>>0,!zt(c),zt(c)?0:c,!zt(h),zt(h)?0:h,ft(d));var u=de().getInt32(m+0,!0),f=de().getFloat64(m+8,!0);return u===0?void 0:f}finally{p.__wbindgen_add_to_stack_pointer(16),lt[ht++]=void 0}}intersectionsWithPoint(t,e,i,r,s,a,o,l,c,h){try{P(t,ri),P(e,Ae),P(i,qe),P(r,J),p.rawbroadphase_intersectionsWithPoint(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,ft(s),a,zt(o)?Number.MAX_SAFE_INTEGER:o>>>0,!zt(l),zt(l)?0:l,!zt(c),zt(c)?0:c,ft(h))}finally{lt[ht++]=void 0,lt[ht++]=void 0}}intersectionsWithRay(t,e,i,r,s,a,o,l,c,h,d,u,f){try{P(t,ri),P(e,Ae),P(i,qe),P(r,J),P(s,J),p.rawbroadphase_intersectionsWithRay(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a,o,ft(l),c,zt(h)?Number.MAX_SAFE_INTEGER:h>>>0,!zt(d),zt(d)?0:d,!zt(u),zt(u)?0:u,ft(f))}finally{lt[ht++]=void 0,lt[ht++]=void 0}}intersectionsWithShape(t,e,i,r,s,a,o,l,c,h,d,u){try{P(t,ri),P(e,Ae),P(i,qe),P(r,J),P(s,ee),P(a,se),p.rawbroadphase_intersectionsWithShape(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a.__wbg_ptr,ft(o),l,zt(c)?Number.MAX_SAFE_INTEGER:c>>>0,!zt(h),zt(h)?0:h,!zt(d),zt(d)?0:d,ft(u))}finally{lt[ht++]=void 0,lt[ht++]=void 0}}constructor(){let t=p.rawbroadphase_new();return this.__wbg_ptr=t,Qp.register(this,this.__wbg_ptr,this),this}projectPoint(t,e,i,r,s,a,o,l,c,h){try{P(t,ri),P(e,Ae),P(i,qe),P(r,J);let d=p.rawbroadphase_projectPoint(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s,a,zt(o)?Number.MAX_SAFE_INTEGER:o>>>0,!zt(l),zt(l)?0:l,!zt(c),zt(c)?0:c,ft(h));return d===0?void 0:Aa.__wrap(d)}finally{lt[ht++]=void 0}}projectPointAndGetFeature(t,e,i,r,s,a,o,l,c){try{P(t,ri),P(e,Ae),P(i,qe),P(r,J);let h=p.rawbroadphase_projectPointAndGetFeature(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s,zt(a)?Number.MAX_SAFE_INTEGER:a>>>0,!zt(o),zt(o)?0:o,!zt(l),zt(l)?0:l,ft(c));return h===0?void 0:Aa.__wrap(h)}finally{lt[ht++]=void 0}}};Symbol.dispose&&(Bn.prototype[Symbol.dispose]=Bn.prototype.free);var _s=class{__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,q0.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawccdsolver_free(t,0)}constructor(){let t=p.rawccdsolver_new();return this.__wbg_ptr=t,q0.register(this,this.__wbg_ptr,this),this}};Symbol.dispose&&(_s.prototype[Symbol.dispose]=_s.prototype.free);var Ea=class{__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,Y0.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawcharactercollision_free(t,0)}handle(){return p.rawcharactercollision_handle(this.__wbg_ptr)}constructor(){let t=p.rawcharactercollision_new();return this.__wbg_ptr=t,Y0.register(this,this.__wbg_ptr,this),this}toi(){return p.rawcharactercollision_toi(this.__wbg_ptr)}translationDeltaApplied(t){try{p.rawcharactercollision_translationDeltaApplied(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}translationDeltaRemaining(t){try{p.rawcharactercollision_translationDeltaRemaining(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}worldNormal1(t){try{p.rawcharactercollision_worldNormal1(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}worldNormal2(t){try{p.rawcharactercollision_worldNormal2(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}worldWitness1(t){try{p.rawcharactercollision_worldWitness1(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}worldWitness2(t){try{p.rawcharactercollision_worldWitness2(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}};Symbol.dispose&&(Ea.prototype[Symbol.dispose]=Ea.prototype.free);var qe=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,tm.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,tm.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawcolliderset_free(t,0)}coActiveCollisionTypes(t){return p.rawcolliderset_coActiveCollisionTypes(this.__wbg_ptr,t)}coActiveEvents(t){return p.rawcolliderset_coActiveEvents(this.__wbg_ptr,t)>>>0}coActiveHooks(t){return p.rawcolliderset_coActiveHooks(this.__wbg_ptr,t)>>>0}coCastCollider(t,e,i,r,s,a,o){P(e,J),P(r,J);let l=p.rawcolliderset_coCastCollider(this.__wbg_ptr,t,e.__wbg_ptr,i,r.__wbg_ptr,s,a,o);return l===0?void 0:Ta.__wrap(l)}coCastRay(t,e,i,r,s){return P(e,J),P(i,J),p.rawcolliderset_coCastRay(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r,s)}coCastRayAndGetNormal(t,e,i,r,s){P(e,J),P(i,J);let a=p.rawcolliderset_coCastRayAndGetNormal(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r,s);return a===0?void 0:Ia.__wrap(a)}coCastShape(t,e,i,r,s,a,o,l,c){P(e,J),P(i,se),P(r,J),P(s,ee),P(a,J);let h=p.rawcolliderset_coCastShape(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a.__wbg_ptr,o,l,c);return h===0?void 0:La.__wrap(h)}coCollisionGroups(t){return p.rawcolliderset_coCollisionGroups(this.__wbg_ptr,t)>>>0}coCombineVoxelStates(t,e,i,r,s){p.rawcolliderset_coCombineVoxelStates(this.__wbg_ptr,t,e,i,r,s)}coContactCollider(t,e,i){let r=p.rawcolliderset_coContactCollider(this.__wbg_ptr,t,e,i);return r===0?void 0:gs.__wrap(r)}coContactForceEventThreshold(t){return p.rawcolliderset_coContactForceEventThreshold(this.__wbg_ptr,t)}coContactShape(t,e,i,r,s){P(e,se),P(i,J),P(r,ee);let a=p.rawcolliderset_coContactShape(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s);return a===0?void 0:gs.__wrap(a)}coContactSkin(t){return p.rawcolliderset_coContactSkin(this.__wbg_ptr,t)}coContainsPoint(t,e){return P(e,J),p.rawcolliderset_coContainsPoint(this.__wbg_ptr,t,e.__wbg_ptr)!==0}coDensity(t){return p.rawcolliderset_coDensity(this.__wbg_ptr,t)}coFriction(t){return p.rawcolliderset_coFriction(this.__wbg_ptr,t)}coFrictionCombineRule(t){return p.rawcolliderset_coFrictionCombineRule(this.__wbg_ptr,t)>>>0}coHalfExtents(t,e){try{return p.rawcolliderset_coHalfExtents(this.__wbg_ptr,t,ft(e))!==0}finally{lt[ht++]=void 0}}coHalfHeight(t){let e=p.rawcolliderset_coHalfHeight(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}coHalfspaceNormal(t,e){try{return p.rawcolliderset_coHalfspaceNormal(this.__wbg_ptr,t,ft(e))!==0}finally{lt[ht++]=void 0}}coHeightFieldFlags(t){let e=p.rawcolliderset_coHeightFieldFlags(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}coHeightfieldHeights(t){try{let r=p.__wbindgen_add_to_stack_pointer(-16);p.rawcolliderset_coHeightfieldHeights(r,this.__wbg_ptr,t);var e=de().getInt32(r+0,!0),i=de().getInt32(r+4,!0);let s;return e!==0&&(s=Da(e,i).slice(),p.__wbindgen_export2(e,4*i,4)),s}finally{p.__wbindgen_add_to_stack_pointer(16)}}coHeightfieldNCols(t){let e=p.rawcolliderset_coHeightfieldNCols(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}coHeightfieldNRows(t){let e=p.rawcolliderset_coHeightfieldNRows(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}coHeightfieldScale(t,e){try{return p.rawcolliderset_coHeightfieldScale(this.__wbg_ptr,t,ft(e))!==0}finally{lt[ht++]=void 0}}coIndices(t){try{let r=p.__wbindgen_add_to_stack_pointer(-16);p.rawcolliderset_coIndices(r,this.__wbg_ptr,t);var e=de().getInt32(r+0,!0),i=de().getInt32(r+4,!0);let s;return e!==0&&(s=Mm(e,i).slice(),p.__wbindgen_export2(e,4*i,4)),s}finally{p.__wbindgen_add_to_stack_pointer(16)}}coIntersectsRay(t,e,i,r){return P(e,J),P(i,J),p.rawcolliderset_coIntersectsRay(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r)!==0}coIntersectsShape(t,e,i,r){return P(e,se),P(i,J),P(r,ee),p.rawcolliderset_coIntersectsShape(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr)!==0}coIsEnabled(t){return p.rawcolliderset_coIsEnabled(this.__wbg_ptr,t)!==0}coIsSensor(t){return p.rawcolliderset_coIsSensor(this.__wbg_ptr,t)!==0}coMass(t){return p.rawcolliderset_coMass(this.__wbg_ptr,t)}coParent(t){try{let r=p.__wbindgen_add_to_stack_pointer(-16);p.rawcolliderset_coParent(r,this.__wbg_ptr,t);var e=de().getInt32(r+0,!0),i=de().getFloat64(r+8,!0);return e===0?void 0:i}finally{p.__wbindgen_add_to_stack_pointer(16)}}coProjectPoint(t,e,i){P(e,J);let r=p.rawcolliderset_coProjectPoint(this.__wbg_ptr,t,e.__wbg_ptr,i);return Ca.__wrap(r)}coPropagateVoxelChange(t,e,i,r,s,a,o,l){p.rawcolliderset_coPropagateVoxelChange(this.__wbg_ptr,t,e,i,r,s,a,o,l)}coRadius(t){let e=p.rawcolliderset_coRadius(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}coRestitution(t){return p.rawcolliderset_coRestitution(this.__wbg_ptr,t)}coRestitutionCombineRule(t){return p.rawcolliderset_coRestitutionCombineRule(this.__wbg_ptr,t)>>>0}coRotation(t,e){try{p.rawcolliderset_coRotation(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}coRotationWrtParent(t,e){try{return p.rawcolliderset_coRotationWrtParent(this.__wbg_ptr,t,ft(e))!==0}finally{lt[ht++]=void 0}}coRoundRadius(t){let e=p.rawcolliderset_coRoundRadius(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}coSetActiveCollisionTypes(t,e){p.rawcolliderset_coSetActiveCollisionTypes(this.__wbg_ptr,t,e)}coSetActiveEvents(t,e){p.rawcolliderset_coSetActiveEvents(this.__wbg_ptr,t,e)}coSetActiveHooks(t,e){p.rawcolliderset_coSetActiveHooks(this.__wbg_ptr,t,e)}coSetCollisionGroups(t,e){p.rawcolliderset_coSetCollisionGroups(this.__wbg_ptr,t,e)}coSetContactForceEventThreshold(t,e){p.rawcolliderset_coSetContactForceEventThreshold(this.__wbg_ptr,t,e)}coSetContactSkin(t,e){p.rawcolliderset_coSetContactSkin(this.__wbg_ptr,t,e)}coSetDensity(t,e){p.rawcolliderset_coSetDensity(this.__wbg_ptr,t,e)}coSetEnabled(t,e){p.rawcolliderset_coSetEnabled(this.__wbg_ptr,t,e)}coSetFriction(t,e){p.rawcolliderset_coSetFriction(this.__wbg_ptr,t,e)}coSetFrictionCombineRule(t,e){p.rawcolliderset_coSetFrictionCombineRule(this.__wbg_ptr,t,e)}coSetHalfExtents(t,e){P(e,J),p.rawcolliderset_coSetHalfExtents(this.__wbg_ptr,t,e.__wbg_ptr)}coSetHalfHeight(t,e){p.rawcolliderset_coSetHalfHeight(this.__wbg_ptr,t,e)}coSetMass(t,e){p.rawcolliderset_coSetMass(this.__wbg_ptr,t,e)}coSetMassProperties(t,e,i,r,s){P(i,J),P(r,J),P(s,ee),p.rawcolliderset_coSetMassProperties(this.__wbg_ptr,t,e,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr)}coSetRadius(t,e){p.rawcolliderset_coSetRadius(this.__wbg_ptr,t,e)}coSetRestitution(t,e){p.rawcolliderset_coSetRestitution(this.__wbg_ptr,t,e)}coSetRestitutionCombineRule(t,e){p.rawcolliderset_coSetRestitutionCombineRule(this.__wbg_ptr,t,e)}coSetRotation(t,e,i,r,s){p.rawcolliderset_coSetRotation(this.__wbg_ptr,t,e,i,r,s)}coSetRotationWrtParent(t,e,i,r,s){p.rawcolliderset_coSetRotationWrtParent(this.__wbg_ptr,t,e,i,r,s)}coSetRoundRadius(t,e){p.rawcolliderset_coSetRoundRadius(this.__wbg_ptr,t,e)}coSetSensor(t,e){p.rawcolliderset_coSetSensor(this.__wbg_ptr,t,e)}coSetShape(t,e){P(e,se),p.rawcolliderset_coSetShape(this.__wbg_ptr,t,e.__wbg_ptr)}coSetSolverGroups(t,e){p.rawcolliderset_coSetSolverGroups(this.__wbg_ptr,t,e)}coSetTranslation(t,e,i,r){p.rawcolliderset_coSetTranslation(this.__wbg_ptr,t,e,i,r)}coSetTranslationWrtParent(t,e,i,r){p.rawcolliderset_coSetTranslationWrtParent(this.__wbg_ptr,t,e,i,r)}coSetVoxel(t,e,i,r,s){p.rawcolliderset_coSetVoxel(this.__wbg_ptr,t,e,i,r,s)}coShape(t){let e=p.rawcolliderset_coShape(this.__wbg_ptr,t);return se.__wrap(e)}coShapeType(t){return p.rawcolliderset_coShapeType(this.__wbg_ptr,t)}coSolverGroups(t){return p.rawcolliderset_coSolverGroups(this.__wbg_ptr,t)>>>0}coTranslation(t,e){try{p.rawcolliderset_coTranslation(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}coTranslationWrtParent(t,e){try{return p.rawcolliderset_coTranslationWrtParent(this.__wbg_ptr,t,ft(e))!==0}finally{lt[ht++]=void 0}}coTriMeshFlags(t){let e=p.rawcolliderset_coTriMeshFlags(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}coVertices(t){try{let r=p.__wbindgen_add_to_stack_pointer(-16);p.rawcolliderset_coVertices(r,this.__wbg_ptr,t);var e=de().getInt32(r+0,!0),i=de().getInt32(r+4,!0);let s;return e!==0&&(s=Da(e,i).slice(),p.__wbindgen_export2(e,4*i,4)),s}finally{p.__wbindgen_add_to_stack_pointer(16)}}coVolume(t){return p.rawcolliderset_coVolume(this.__wbg_ptr,t)}coVoxelData(t){try{let r=p.__wbindgen_add_to_stack_pointer(-16);p.rawcolliderset_coVoxelData(r,this.__wbg_ptr,t);var e=de().getInt32(r+0,!0),i=de().getInt32(r+4,!0);let s;return e!==0&&(s=xw(e,i).slice(),p.__wbindgen_export2(e,4*i,4)),s}finally{p.__wbindgen_add_to_stack_pointer(16)}}coVoxelSize(t){let e=p.rawcolliderset_coVoxelSize(this.__wbg_ptr,t);return e===0?void 0:J.__wrap(e)}contains(t){return p.rawcolliderset_contains(this.__wbg_ptr,t)!==0}createCollider(t,e,i,r,s,a,o,l,c,h,d,u,f,m,w,g,_,b,T,v,E,R,I,x,S){try{let z=p.__wbindgen_add_to_stack_pointer(-16);P(e,se),P(i,J),P(r,ee),P(o,J),P(l,J),P(c,ee),P(S,Ae),p.rawcolliderset_createCollider(z,this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s,a,o.__wbg_ptr,l.__wbg_ptr,c.__wbg_ptr,h,d,u,f,m,w,g,_,b,T,v,E,R,I,x,S.__wbg_ptr);var L=de().getInt32(z+0,!0),U=de().getFloat64(z+8,!0);return L===0?void 0:U}finally{p.__wbindgen_add_to_stack_pointer(16)}}forEachColliderHandle(t){try{p.rawcolliderset_forEachColliderHandle(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}isHandleValid(t){return p.rawcolliderset_isHandleValid(this.__wbg_ptr,t)!==0}len(){return p.rawcolliderset_len(this.__wbg_ptr)>>>0}constructor(){let t=p.rawcolliderset_new();return this.__wbg_ptr=t,tm.register(this,this.__wbg_ptr,this),this}remove(t,e,i,r){P(e,kn),P(i,Ae),p.rawcolliderset_remove(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r)}};Symbol.dispose&&(qe.prototype[Symbol.dispose]=qe.prototype.free);var Ta=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,J0.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,J0.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawcollidershapecasthit_free(t,0)}colliderHandle(){return p.rawcollidershapecasthit_colliderHandle(this.__wbg_ptr)}getComponents(t){try{p.rawcollidershapecasthit_getComponents(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}};Symbol.dispose&&(Ta.prototype[Symbol.dispose]=Ta.prototype.free);var Sl=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,j0.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,j0.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawcontactforceevent_free(t,0)}collider1(){return p.rawcontactforceevent_collider1(this.__wbg_ptr)}collider2(){return p.rawcontactforceevent_collider2(this.__wbg_ptr)}max_force_direction(t){try{p.rawcontactforceevent_max_force_direction(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}max_force_magnitude(){return p.rawcontactforceevent_max_force_magnitude(this.__wbg_ptr)}total_force(t){try{p.rawcontactforceevent_total_force(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}total_force_magnitude(){return p.rawcontactforceevent_total_force_magnitude(this.__wbg_ptr)}};Symbol.dispose&&(Sl.prototype[Symbol.dispose]=Sl.prototype.free);var Ml=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,Z0.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,Z0.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawcontactmanifold_free(t,0)}contact_dist(t){return p.rawcontactmanifold_contact_dist(this.__wbg_ptr,t)}contact_fid1(t){return p.rawcontactmanifold_contact_fid1(this.__wbg_ptr,t)>>>0}contact_fid2(t){return p.rawcontactmanifold_contact_fid2(this.__wbg_ptr,t)>>>0}contact_impulse(t){return p.rawcontactmanifold_contact_impulse(this.__wbg_ptr,t)}contact_local_p1(t,e){try{return p.rawcontactmanifold_contact_local_p1(this.__wbg_ptr,t,ft(e))!==0}finally{lt[ht++]=void 0}}contact_local_p2(t,e){try{return p.rawcontactmanifold_contact_local_p2(this.__wbg_ptr,t,ft(e))!==0}finally{lt[ht++]=void 0}}contact_tangent_impulse_x(t){return p.rawcontactmanifold_contact_tangent_impulse_x(this.__wbg_ptr,t)}contact_tangent_impulse_y(t){return p.rawcontactmanifold_contact_tangent_impulse_y(this.__wbg_ptr,t)}friction(){return p.rawcontactmanifold_friction(this.__wbg_ptr)}local_n1(t){try{p.rawcontactmanifold_local_n1(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}local_n2(t){try{p.rawcontactmanifold_local_n2(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}normal(t){try{p.rawcontactmanifold_normal(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}num_contacts(){return p.rawcontactmanifold_num_contacts(this.__wbg_ptr)>>>0}num_solver_contacts(){return p.rawcontactmanifold_num_solver_contacts(this.__wbg_ptr)>>>0}restitution(){return p.rawcontactmanifold_restitution(this.__wbg_ptr)}solver_contact_dist(t){return p.rawcontactmanifold_solver_contact_dist(this.__wbg_ptr,t)}solver_contact_point(t,e,i){try{return P(t,Ae),p.rawcontactmanifold_solver_contact_point(this.__wbg_ptr,t.__wbg_ptr,e,ft(i))!==0}finally{lt[ht++]=void 0}}solver_contact_tangent_velocity(t,e){try{p.rawcontactmanifold_solver_contact_tangent_velocity(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}subshape1(){return p.rawcontactmanifold_subshape1(this.__wbg_ptr)>>>0}subshape2(){return p.rawcontactmanifold_subshape2(this.__wbg_ptr)>>>0}};Symbol.dispose&&(Ml.prototype[Symbol.dispose]=Ml.prototype.free);var El=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,$0.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,$0.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawcontactpair_free(t,0)}collider1(){return p.rawcontactpair_collider1(this.__wbg_ptr)}collider2(){return p.rawcontactpair_collider2(this.__wbg_ptr)}contactManifold(t){let e=p.rawcontactpair_contactManifold(this.__wbg_ptr,t);return e===0?void 0:Ml.__wrap(e)}numContactManifolds(){return p.rawcontactpair_numContactManifolds(this.__wbg_ptr)>>>0}};Symbol.dispose&&(El.prototype[Symbol.dispose]=El.prototype.free);var Tl=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,K0.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,K0.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawconvexmeshdata_free(t,0)}get indices(){try{let r=p.__wbindgen_add_to_stack_pointer(-16);p.__wbg_get_rawconvexmeshdata_indices(r,this.__wbg_ptr);var t=de().getInt32(r+0,!0),e=de().getInt32(r+4,!0),i=Mm(t,e).slice();return p.__wbindgen_export2(t,4*e,4),i}finally{p.__wbindgen_add_to_stack_pointer(16)}}get vertices(){try{let r=p.__wbindgen_add_to_stack_pointer(-16);p.__wbg_get_rawconvexmeshdata_vertices(r,this.__wbg_ptr);var t=de().getInt32(r+0,!0),e=de().getInt32(r+4,!0),i=Da(t,e).slice();return p.__wbindgen_export2(t,4*e,4),i}finally{p.__wbindgen_add_to_stack_pointer(16)}}set indices(t){let e=Xr(t,p.__wbindgen_export3),i=Xe;p.__wbg_set_rawconvexmeshdata_indices(this.__wbg_ptr,e,i)}set vertices(t){let e=an(t,p.__wbindgen_export3),i=Xe;p.__wbg_set_rawconvexmeshdata_vertices(this.__wbg_ptr,e,i)}};Symbol.dispose&&(Tl.prototype[Symbol.dispose]=Tl.prototype.free);var Rl=class{__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,Q0.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawdebugrenderpipeline_free(t,0)}colors(){return Vu(p.rawdebugrenderpipeline_colors(this.__wbg_ptr))}constructor(){let t=p.rawdebugrenderpipeline_new();return this.__wbg_ptr=t,Q0.register(this,this.__wbg_ptr,this),this}render(t,e,i,r,s,a,o){try{P(t,Ae),P(e,qe),P(i,zn),P(r,Hn),P(s,ri),p.rawdebugrenderpipeline_render(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a,ft(o))}finally{lt[ht++]=void 0}}vertices(){return Vu(p.rawdebugrenderpipeline_vertices(this.__wbg_ptr))}};Symbol.dispose&&(Rl.prototype[Symbol.dispose]=Rl.prototype.free);var Al=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,tw.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,tw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawdeserializedworld_free(t,0)}takeBodies(){let t=p.rawdeserializedworld_takeBodies(this.__wbg_ptr);return t===0?void 0:Ae.__wrap(t)}takeBroadPhase(){let t=p.rawdeserializedworld_takeBroadPhase(this.__wbg_ptr);return t===0?void 0:Bn.__wrap(t)}takeColliders(){let t=p.rawdeserializedworld_takeColliders(this.__wbg_ptr);return t===0?void 0:qe.__wrap(t)}takeGravity(){let t=p.rawdeserializedworld_takeGravity(this.__wbg_ptr);return t===0?void 0:J.__wrap(t)}takeImpulseJoints(){let t=p.rawdeserializedworld_takeImpulseJoints(this.__wbg_ptr);return t===0?void 0:zn.__wrap(t)}takeIntegrationParameters(){let t=p.rawdeserializedworld_takeIntegrationParameters(this.__wbg_ptr);return t===0?void 0:Sr.__wrap(t)}takeIslandManager(){let t=p.rawdeserializedworld_takeIslandManager(this.__wbg_ptr);return t===0?void 0:kn.__wrap(t)}takeMultibodyJoints(){let t=p.rawdeserializedworld_takeMultibodyJoints(this.__wbg_ptr);return t===0?void 0:Hn.__wrap(t)}takeNarrowPhase(){let t=p.rawdeserializedworld_takeNarrowPhase(this.__wbg_ptr);return t===0?void 0:ri.__wrap(t)}};Symbol.dispose&&(Al.prototype[Symbol.dispose]=Al.prototype.free);var Cl=class{__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,ew.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawdynamicraycastvehiclecontroller_free(t,0)}add_wheel(t,e,i,r,s){P(t,J),P(e,J),P(i,J),p.rawdynamicraycastvehiclecontroller_add_wheel(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r,s)}chassis(){return p.rawdynamicraycastvehiclecontroller_chassis(this.__wbg_ptr)}current_vehicle_speed(){return p.rawdynamicraycastvehiclecontroller_current_vehicle_speed(this.__wbg_ptr)}index_forward_axis(){return p.rawdynamicraycastvehiclecontroller_index_forward_axis(this.__wbg_ptr)>>>0}index_up_axis(){return p.rawdynamicraycastvehiclecontroller_index_up_axis(this.__wbg_ptr)>>>0}constructor(t){let e=p.rawdynamicraycastvehiclecontroller_new(t);return this.__wbg_ptr=e,ew.register(this,this.__wbg_ptr,this),this}num_wheels(){return p.rawdynamicraycastvehiclecontroller_num_wheels(this.__wbg_ptr)>>>0}set_index_forward_axis(t){p.rawdynamicraycastvehiclecontroller_set_index_forward_axis(this.__wbg_ptr,t)}set_index_up_axis(t){p.rawdynamicraycastvehiclecontroller_set_index_up_axis(this.__wbg_ptr,t)}set_wheel_axle_cs(t,e){P(e,J),p.rawdynamicraycastvehiclecontroller_set_wheel_axle_cs(this.__wbg_ptr,t,e.__wbg_ptr)}set_wheel_brake(t,e){p.rawdynamicraycastvehiclecontroller_set_wheel_brake(this.__wbg_ptr,t,e)}set_wheel_chassis_connection_point_cs(t,e){P(e,J),p.rawdynamicraycastvehiclecontroller_set_wheel_chassis_connection_point_cs(this.__wbg_ptr,t,e.__wbg_ptr)}set_wheel_direction_cs(t,e){P(e,J),p.rawdynamicraycastvehiclecontroller_set_wheel_direction_cs(this.__wbg_ptr,t,e.__wbg_ptr)}set_wheel_engine_force(t,e){p.rawdynamicraycastvehiclecontroller_set_wheel_engine_force(this.__wbg_ptr,t,e)}set_wheel_friction_slip(t,e){p.rawdynamicraycastvehiclecontroller_set_wheel_friction_slip(this.__wbg_ptr,t,e)}set_wheel_max_suspension_force(t,e){p.rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_force(this.__wbg_ptr,t,e)}set_wheel_max_suspension_travel(t,e){p.rawdynamicraycastvehiclecontroller_set_wheel_max_suspension_travel(this.__wbg_ptr,t,e)}set_wheel_radius(t,e){p.rawdynamicraycastvehiclecontroller_set_wheel_radius(this.__wbg_ptr,t,e)}set_wheel_side_friction_stiffness(t,e){p.rawdynamicraycastvehiclecontroller_set_wheel_side_friction_stiffness(this.__wbg_ptr,t,e)}set_wheel_steering(t,e){p.rawdynamicraycastvehiclecontroller_set_wheel_steering(this.__wbg_ptr,t,e)}set_wheel_suspension_compression(t,e){p.rawdynamicraycastvehiclecontroller_set_wheel_suspension_compression(this.__wbg_ptr,t,e)}set_wheel_suspension_relaxation(t,e){p.rawdynamicraycastvehiclecontroller_set_wheel_suspension_relaxation(this.__wbg_ptr,t,e)}set_wheel_suspension_rest_length(t,e){p.rawdynamicraycastvehiclecontroller_set_wheel_suspension_rest_length(this.__wbg_ptr,t,e)}set_wheel_suspension_stiffness(t,e){p.rawdynamicraycastvehiclecontroller_set_wheel_suspension_stiffness(this.__wbg_ptr,t,e)}update_vehicle(t,e,i,r,s,a,o,l){try{P(e,Bn),P(i,ri),P(r,Ae),P(s,qe),p.rawdynamicraycastvehiclecontroller_update_vehicle(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a,zt(o)?Number.MAX_SAFE_INTEGER:o>>>0,ft(l))}finally{lt[ht++]=void 0}}wheel_axle_cs(t,e){try{return p.rawdynamicraycastvehiclecontroller_wheel_axle_cs(this.__wbg_ptr,t,ft(e))!==0}finally{lt[ht++]=void 0}}wheel_brake(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_brake(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_chassis_connection_point_cs(t,e){try{return p.rawdynamicraycastvehiclecontroller_wheel_chassis_connection_point_cs(this.__wbg_ptr,t,ft(e))!==0}finally{lt[ht++]=void 0}}wheel_contact_normal_ws(t,e){try{return p.rawdynamicraycastvehiclecontroller_wheel_contact_normal_ws(this.__wbg_ptr,t,ft(e))!==0}finally{lt[ht++]=void 0}}wheel_contact_point_ws(t,e){try{return p.rawdynamicraycastvehiclecontroller_wheel_contact_point_ws(this.__wbg_ptr,t,ft(e))!==0}finally{lt[ht++]=void 0}}wheel_direction_cs(t,e){try{return p.rawdynamicraycastvehiclecontroller_wheel_direction_cs(this.__wbg_ptr,t,ft(e))!==0}finally{lt[ht++]=void 0}}wheel_engine_force(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_engine_force(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_forward_impulse(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_forward_impulse(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_friction_slip(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_friction_slip(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_ground_object(t){try{let r=p.__wbindgen_add_to_stack_pointer(-16);p.rawdynamicraycastvehiclecontroller_wheel_ground_object(r,this.__wbg_ptr,t);var e=de().getInt32(r+0,!0),i=de().getFloat64(r+8,!0);return e===0?void 0:i}finally{p.__wbindgen_add_to_stack_pointer(16)}}wheel_hard_point_ws(t,e){try{return p.rawdynamicraycastvehiclecontroller_wheel_hard_point_ws(this.__wbg_ptr,t,ft(e))!==0}finally{lt[ht++]=void 0}}wheel_is_in_contact(t){return p.rawdynamicraycastvehiclecontroller_wheel_is_in_contact(this.__wbg_ptr,t)!==0}wheel_max_suspension_force(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_max_suspension_force(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_max_suspension_travel(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_max_suspension_travel(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_radius(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_radius(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_rotation(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_rotation(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_side_friction_stiffness(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_side_friction_stiffness(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_side_impulse(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_side_impulse(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_steering(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_steering(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_suspension_compression(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_suspension_compression(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_suspension_force(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_suspension_force(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_suspension_length(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_suspension_length(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_suspension_relaxation(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_suspension_relaxation(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_suspension_rest_length(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_suspension_rest_length(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}wheel_suspension_stiffness(t){let e=p.rawdynamicraycastvehiclecontroller_wheel_suspension_stiffness(this.__wbg_ptr,t);return e===Number.MAX_SAFE_INTEGER?void 0:e}};Symbol.dispose&&(Cl.prototype[Symbol.dispose]=Cl.prototype.free);var Ra=class{__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,iw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_raweventqueue_free(t,0)}clear(){p.raweventqueue_clear(this.__wbg_ptr)}drainCollisionEvents(t){try{p.raweventqueue_drainCollisionEvents(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}drainContactForceEvents(t){try{p.raweventqueue_drainContactForceEvents(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}constructor(t){let e=p.raweventqueue_new(t);return this.__wbg_ptr=e,iw.register(this,this.__wbg_ptr,this),this}};Symbol.dispose&&(Ra.prototype[Symbol.dispose]=Ra.prototype.free),Object.freeze({Vertex:0,0:"Vertex",Edge:1,1:"Edge",Face:2,2:"Face",Unknown:3,3:"Unknown"});var Zi=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,nw.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,nw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawgenericjoint_free(t,0)}static fixed(t,e,i,r){P(t,J),P(e,ee),P(i,J),P(r,ee);let s=p.rawgenericjoint_fixed(t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr);return n.__wrap(s)}static generic(t,e,i,r){P(t,J),P(e,J),P(i,J);let s=p.rawgenericjoint_generic(t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r);return s===0?void 0:n.__wrap(s)}static prismatic(t,e,i,r,s,a){P(t,J),P(e,J),P(i,J);let o=p.rawgenericjoint_prismatic(t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r,s,a);return o===0?void 0:n.__wrap(o)}static revolute(t,e,i){P(t,J),P(e,J),P(i,J);let r=p.rawgenericjoint_revolute(t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr);return r===0?void 0:n.__wrap(r)}static revoluteWithAxes(t,e,i,r){P(t,J),P(e,J),P(i,J),P(r,J);let s=p.rawgenericjoint_revoluteWithAxes(t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr);return s===0?void 0:n.__wrap(s)}static rope(t,e,i){P(e,J),P(i,J);let r=p.rawgenericjoint_rope(t,e.__wbg_ptr,i.__wbg_ptr);return n.__wrap(r)}static spherical(t,e){P(t,J),P(e,J);let i=p.rawgenericjoint_spherical(t.__wbg_ptr,e.__wbg_ptr);return n.__wrap(i)}static spring(t,e,i,r,s){P(r,J),P(s,J);let a=p.rawgenericjoint_spring(t,e,i,r.__wbg_ptr,s.__wbg_ptr);return n.__wrap(a)}};Symbol.dispose&&(Zi.prototype[Symbol.dispose]=Zi.prototype.free);var zn=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,em.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,em.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawimpulsejointset_free(t,0)}contains(t){return p.rawimpulsejointset_contains(this.__wbg_ptr,t)!==0}createJoint(t,e,i,r){return P(t,Zi),p.rawimpulsejointset_createJoint(this.__wbg_ptr,t.__wbg_ptr,e,i,r)}forEachJointAttachedToRigidBody(t,e){try{p.rawimpulsejointset_forEachJointAttachedToRigidBody(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}forEachJointHandle(t){try{p.rawimpulsejointset_forEachJointHandle(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}jointAnchor1(t,e){try{p.rawimpulsejointset_jointAnchor1(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}jointAnchor2(t,e){try{p.rawimpulsejointset_jointAnchor2(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}jointBodyHandle1(t){return p.rawimpulsejointset_jointBodyHandle1(this.__wbg_ptr,t)}jointBodyHandle2(t){return p.rawimpulsejointset_jointBodyHandle2(this.__wbg_ptr,t)}jointConfigureMotor(t,e,i,r,s,a){p.rawimpulsejointset_jointConfigureMotor(this.__wbg_ptr,t,e,i,r,s,a)}jointConfigureMotorModel(t,e,i){p.rawimpulsejointset_jointConfigureMotorModel(this.__wbg_ptr,t,e,i)}jointConfigureMotorPosition(t,e,i,r,s){p.rawimpulsejointset_jointConfigureMotorPosition(this.__wbg_ptr,t,e,i,r,s)}jointConfigureMotorVelocity(t,e,i,r){p.rawimpulsejointset_jointConfigureMotorVelocity(this.__wbg_ptr,t,e,i,r)}jointContactsEnabled(t){return p.rawimpulsejointset_jointContactsEnabled(this.__wbg_ptr,t)!==0}jointFrameX1(t,e){try{p.rawimpulsejointset_jointFrameX1(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}jointFrameX2(t,e){try{p.rawimpulsejointset_jointFrameX2(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}jointLimitsEnabled(t,e){return p.rawimpulsejointset_jointLimitsEnabled(this.__wbg_ptr,t,e)!==0}jointLimitsMax(t,e){return p.rawimpulsejointset_jointLimitsMax(this.__wbg_ptr,t,e)}jointLimitsMin(t,e){return p.rawimpulsejointset_jointLimitsMin(this.__wbg_ptr,t,e)}jointSetAnchor1(t,e){P(e,J),p.rawimpulsejointset_jointSetAnchor1(this.__wbg_ptr,t,e.__wbg_ptr)}jointSetAnchor2(t,e){P(e,J),p.rawimpulsejointset_jointSetAnchor2(this.__wbg_ptr,t,e.__wbg_ptr)}jointSetContactsEnabled(t,e){p.rawimpulsejointset_jointSetContactsEnabled(this.__wbg_ptr,t,e)}jointSetFrameX1(t,e){P(e,ee),p.rawimpulsejointset_jointSetFrameX1(this.__wbg_ptr,t,e.__wbg_ptr)}jointSetFrameX2(t,e){P(e,ee),p.rawimpulsejointset_jointSetFrameX2(this.__wbg_ptr,t,e.__wbg_ptr)}jointSetLimits(t,e,i,r){p.rawimpulsejointset_jointSetLimits(this.__wbg_ptr,t,e,i,r)}jointSetLocalFrame1(t,e,i){P(e,J),P(i,ee),p.rawimpulsejointset_jointSetLocalFrame1(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr)}jointSetLocalFrame2(t,e,i){P(e,J),P(i,ee),p.rawimpulsejointset_jointSetLocalFrame2(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr)}jointSetMotorMaxForce(t,e,i){p.rawimpulsejointset_jointSetMotorMaxForce(this.__wbg_ptr,t,e,i)}jointType(t){return p.rawimpulsejointset_jointType(this.__wbg_ptr,t)}len(){return p.rawimpulsejointset_len(this.__wbg_ptr)>>>0}constructor(){let t=p.rawimpulsejointset_new();return this.__wbg_ptr=t,em.register(this,this.__wbg_ptr,this),this}remove(t,e){p.rawimpulsejointset_remove(this.__wbg_ptr,t,e)}};Symbol.dispose&&(zn.prototype[Symbol.dispose]=zn.prototype.free);var Sr=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,im.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,im.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawintegrationparameters_free(t,0)}get contact_erp(){return p.rawintegrationparameters_contact_erp(this.__wbg_ptr)}get dt(){return p.rawintegrationparameters_dt(this.__wbg_ptr)}get lengthUnit(){return p.rawintegrationparameters_lengthUnit(this.__wbg_ptr)}get maxCcdSubsteps(){return p.rawintegrationparameters_maxCcdSubsteps(this.__wbg_ptr)>>>0}constructor(){let t=p.rawintegrationparameters_new();return this.__wbg_ptr=t,im.register(this,this.__wbg_ptr,this),this}get normalizedAllowedLinearError(){return p.rawintegrationparameters_normalizedAllowedLinearError(this.__wbg_ptr)}get normalizedPredictionDistance(){return p.rawintegrationparameters_normalizedPredictionDistance(this.__wbg_ptr)}get numInternalPgsIterations(){return p.rawintegrationparameters_numInternalPgsIterations(this.__wbg_ptr)>>>0}get numSolverIterations(){return p.rawintegrationparameters_numSolverIterations(this.__wbg_ptr)>>>0}set contact_natural_frequency(t){p.rawintegrationparameters_set_contact_natural_frequency(this.__wbg_ptr,t)}set dt(t){p.rawintegrationparameters_set_dt(this.__wbg_ptr,t)}set lengthUnit(t){p.rawintegrationparameters_set_lengthUnit(this.__wbg_ptr,t)}set maxCcdSubsteps(t){p.rawintegrationparameters_set_maxCcdSubsteps(this.__wbg_ptr,t)}set normalizedAllowedLinearError(t){p.rawintegrationparameters_set_normalizedAllowedLinearError(this.__wbg_ptr,t)}set normalizedPredictionDistance(t){p.rawintegrationparameters_set_normalizedPredictionDistance(this.__wbg_ptr,t)}set numInternalPgsIterations(t){p.rawintegrationparameters_set_numInternalPgsIterations(this.__wbg_ptr,t)}set numSolverIterations(t){p.rawintegrationparameters_set_numSolverIterations(this.__wbg_ptr,t)}};Symbol.dispose&&(Sr.prototype[Symbol.dispose]=Sr.prototype.free);var kn=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,nm.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,nm.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawislandmanager_free(t,0)}forEachActiveRigidBodyHandle(t){try{p.rawislandmanager_forEachActiveRigidBodyHandle(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}constructor(){let t=p.rawislandmanager_new();return this.__wbg_ptr=t,nm.register(this,this.__wbg_ptr,this),this}};Symbol.dispose&&(kn.prototype[Symbol.dispose]=kn.prototype.free);var Md=Object.freeze({LinX:0,0:"LinX",LinY:1,1:"LinY",LinZ:2,2:"LinZ",AngX:3,3:"AngX",AngY:4,4:"AngY",AngZ:5,5:"AngZ"}),Un=Object.freeze({Revolute:0,0:"Revolute",Fixed:1,1:"Fixed",Prismatic:2,2:"Prismatic",Rope:3,3:"Rope",Spring:4,4:"Spring",Spherical:5,5:"Spherical",Generic:6,6:"Generic"}),Pl=class{__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,rw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawkinematiccharactercontroller_free(t,0)}autostepEnabled(){return p.rawkinematiccharactercontroller_autostepEnabled(this.__wbg_ptr)!==0}autostepIncludesDynamicBodies(){let t=p.rawkinematiccharactercontroller_autostepIncludesDynamicBodies(this.__wbg_ptr);return t===16777215?void 0:t!==0}autostepMaxHeight(){let t=p.rawkinematiccharactercontroller_autostepMaxHeight(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}autostepMinWidth(){let t=p.rawkinematiccharactercontroller_autostepMinWidth(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}computeColliderMovement(t,e,i,r,s,a,o,l,c,h,d,u){try{P(e,Bn),P(i,ri),P(r,Ae),P(s,qe),P(o,J),p.rawkinematiccharactercontroller_computeColliderMovement(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a,o.__wbg_ptr,l,zt(c)?Number.MAX_SAFE_INTEGER:Math.fround(c),h,zt(d)?Number.MAX_SAFE_INTEGER:d>>>0,ft(u))}finally{lt[ht++]=void 0}}computedCollision(t,e){return P(e,Ea),p.rawkinematiccharactercontroller_computedCollision(this.__wbg_ptr,t,e.__wbg_ptr)!==0}computedGrounded(){return p.rawkinematiccharactercontroller_computedGrounded(this.__wbg_ptr)!==0}computedMovement(t){try{p.rawkinematiccharactercontroller_computedMovement(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}disableAutostep(){p.rawkinematiccharactercontroller_disableAutostep(this.__wbg_ptr)}disableSnapToGround(){p.rawkinematiccharactercontroller_disableSnapToGround(this.__wbg_ptr)}enableAutostep(t,e,i){p.rawkinematiccharactercontroller_enableAutostep(this.__wbg_ptr,t,e,i)}enableSnapToGround(t){p.rawkinematiccharactercontroller_enableSnapToGround(this.__wbg_ptr,t)}maxSlopeClimbAngle(){return p.rawkinematiccharactercontroller_maxSlopeClimbAngle(this.__wbg_ptr)}minSlopeSlideAngle(){return p.rawkinematiccharactercontroller_minSlopeSlideAngle(this.__wbg_ptr)}constructor(t){let e=p.rawkinematiccharactercontroller_new(t);return this.__wbg_ptr=e,rw.register(this,this.__wbg_ptr,this),this}normalNudgeFactor(){return p.rawkinematiccharactercontroller_normalNudgeFactor(this.__wbg_ptr)}numComputedCollisions(){return p.rawkinematiccharactercontroller_numComputedCollisions(this.__wbg_ptr)>>>0}offset(){return p.rawkinematiccharactercontroller_offset(this.__wbg_ptr)}setMaxSlopeClimbAngle(t){p.rawkinematiccharactercontroller_setMaxSlopeClimbAngle(this.__wbg_ptr,t)}setMinSlopeSlideAngle(t){p.rawkinematiccharactercontroller_setMinSlopeSlideAngle(this.__wbg_ptr,t)}setNormalNudgeFactor(t){p.rawkinematiccharactercontroller_setNormalNudgeFactor(this.__wbg_ptr,t)}setOffset(t){p.rawkinematiccharactercontroller_setOffset(this.__wbg_ptr,t)}setSlideEnabled(t){p.rawkinematiccharactercontroller_setSlideEnabled(this.__wbg_ptr,t)}setUp(t){P(t,J),p.rawkinematiccharactercontroller_setUp(this.__wbg_ptr,t.__wbg_ptr)}slideEnabled(){return p.rawkinematiccharactercontroller_slideEnabled(this.__wbg_ptr)!==0}snapToGroundDistance(){let t=p.rawkinematiccharactercontroller_snapToGroundDistance(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}snapToGroundEnabled(){return p.rawkinematiccharactercontroller_snapToGroundEnabled(this.__wbg_ptr)!==0}up(){let t=p.rawkinematiccharactercontroller_up(this.__wbg_ptr);return J.__wrap(t)}};Symbol.dispose&&(Pl.prototype[Symbol.dispose]=Pl.prototype.free),Object.freeze({AccelerationBased:0,0:"AccelerationBased",ForceBased:1,1:"ForceBased"});var Hn=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,rm.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,rm.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawmultibodyjointset_free(t,0)}contains(t){return p.rawmultibodyjointset_contains(this.__wbg_ptr,t)!==0}createJoint(t,e,i,r){return P(t,Zi),p.rawmultibodyjointset_createJoint(this.__wbg_ptr,t.__wbg_ptr,e,i,r)}forEachJointAttachedToRigidBody(t,e){try{p.rawmultibodyjointset_forEachJointAttachedToRigidBody(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}forEachJointHandle(t){try{p.rawmultibodyjointset_forEachJointHandle(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}jointAnchor1(t){let e=p.rawmultibodyjointset_jointAnchor1(this.__wbg_ptr,t);return J.__wrap(e)}jointAnchor2(t){let e=p.rawmultibodyjointset_jointAnchor2(this.__wbg_ptr,t);return J.__wrap(e)}jointContactsEnabled(t){return p.rawmultibodyjointset_jointContactsEnabled(this.__wbg_ptr,t)!==0}jointFrameX1(t){let e=p.rawmultibodyjointset_jointFrameX1(this.__wbg_ptr,t);return ee.__wrap(e)}jointFrameX2(t){let e=p.rawmultibodyjointset_jointFrameX2(this.__wbg_ptr,t);return ee.__wrap(e)}jointLimitsEnabled(t,e){return p.rawmultibodyjointset_jointLimitsEnabled(this.__wbg_ptr,t,e)!==0}jointLimitsMax(t,e){return p.rawmultibodyjointset_jointLimitsMax(this.__wbg_ptr,t,e)}jointLimitsMin(t,e){return p.rawmultibodyjointset_jointLimitsMin(this.__wbg_ptr,t,e)}jointSetContactsEnabled(t,e){p.rawmultibodyjointset_jointSetContactsEnabled(this.__wbg_ptr,t,e)}jointType(t){return p.rawmultibodyjointset_jointType(this.__wbg_ptr,t)}constructor(){let t=p.rawmultibodyjointset_new();return this.__wbg_ptr=t,rm.register(this,this.__wbg_ptr,this),this}remove(t,e){p.rawmultibodyjointset_remove(this.__wbg_ptr,t,e)}};Symbol.dispose&&(Hn.prototype[Symbol.dispose]=Hn.prototype.free);var ri=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,sm.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,sm.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawnarrowphase_free(t,0)}contact_pair(t,e){let i=p.rawnarrowphase_contact_pair(this.__wbg_ptr,t,e);return i===0?void 0:El.__wrap(i)}contact_pairs_with(t,e){p.rawnarrowphase_contact_pairs_with(this.__wbg_ptr,t,Qe(e))}intersection_pair(t,e){return p.rawnarrowphase_intersection_pair(this.__wbg_ptr,t,e)!==0}intersection_pairs_with(t,e){p.rawnarrowphase_intersection_pairs_with(this.__wbg_ptr,t,Qe(e))}constructor(){let t=p.rawnarrowphase_new();return this.__wbg_ptr=t,sm.register(this,this.__wbg_ptr,this),this}};Symbol.dispose&&(ri.prototype[Symbol.dispose]=ri.prototype.free);var Il=class{__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,sw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawphysicspipeline_free(t,0)}is_profiler_enabled(){return p.rawphysicspipeline_is_profiler_enabled(this.__wbg_ptr)!==0}constructor(){let t=p.rawphysicspipeline_new();return this.__wbg_ptr=t,sw.register(this,this.__wbg_ptr,this),this}set_profiler_enabled(t){p.rawphysicspipeline_set_profiler_enabled(this.__wbg_ptr,t)}step(t,e,i,r,s,a,o,l,c,h){P(t,J),P(e,Sr),P(i,kn),P(r,Bn),P(s,ri),P(a,Ae),P(o,qe),P(l,zn),P(c,Hn),P(h,_s),p.rawphysicspipeline_step(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a.__wbg_ptr,o.__wbg_ptr,l.__wbg_ptr,c.__wbg_ptr,h.__wbg_ptr)}stepWithEvents(t,e,i,r,s,a,o,l,c,h,d,u,f,m){P(t,J),P(e,Sr),P(i,kn),P(r,Bn),P(s,ri),P(a,Ae),P(o,qe),P(l,zn),P(c,Hn),P(h,_s),P(d,Ra),p.rawphysicspipeline_stepWithEvents(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a.__wbg_ptr,o.__wbg_ptr,l.__wbg_ptr,c.__wbg_ptr,h.__wbg_ptr,d.__wbg_ptr,Qe(u),Qe(f),Qe(m))}timing_broad_phase(){return p.rawphysicspipeline_timing_broad_phase(this.__wbg_ptr)}timing_ccd(){return p.rawphysicspipeline_timing_ccd(this.__wbg_ptr)}timing_ccd_broad_phase(){return p.rawphysicspipeline_timing_ccd_broad_phase(this.__wbg_ptr)}timing_ccd_narrow_phase(){return p.rawphysicspipeline_timing_ccd_narrow_phase(this.__wbg_ptr)}timing_ccd_solver(){return p.rawphysicspipeline_timing_ccd_solver(this.__wbg_ptr)}timing_ccd_toi_computation(){return p.rawphysicspipeline_timing_ccd_toi_computation(this.__wbg_ptr)}timing_collision_detection(){return p.rawphysicspipeline_timing_collision_detection(this.__wbg_ptr)}timing_island_construction(){return p.rawphysicspipeline_timing_island_construction(this.__wbg_ptr)}timing_narrow_phase(){return p.rawphysicspipeline_timing_narrow_phase(this.__wbg_ptr)}timing_solver(){return p.rawphysicspipeline_timing_solver(this.__wbg_ptr)}timing_step(){return p.rawphysicspipeline_timing_step(this.__wbg_ptr)}timing_user_changes(){return p.rawphysicspipeline_timing_user_changes(this.__wbg_ptr)}timing_velocity_assembly(){return p.rawphysicspipeline_timing_velocity_assembly(this.__wbg_ptr)}timing_velocity_resolution(){return p.rawphysicspipeline_timing_velocity_resolution(this.__wbg_ptr)}timing_velocity_update(){return p.rawphysicspipeline_timing_velocity_update(this.__wbg_ptr)}timing_velocity_writeback(){return p.rawphysicspipeline_timing_velocity_writeback(this.__wbg_ptr)}};Symbol.dispose&&(Il.prototype[Symbol.dispose]=Il.prototype.free);var Ll=class{__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,aw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawpidcontroller_free(t,0)}angular_correction(t,e,i,r,s,a){try{P(e,Ae),P(r,ee),P(s,J),p.rawpidcontroller_angular_correction(this.__wbg_ptr,t,e.__wbg_ptr,i,r.__wbg_ptr,s.__wbg_ptr,ft(a))}finally{lt[ht++]=void 0}}apply_angular_correction(t,e,i,r,s){P(e,Ae),P(r,ee),P(s,J),p.rawpidcontroller_apply_angular_correction(this.__wbg_ptr,t,e.__wbg_ptr,i,r.__wbg_ptr,s.__wbg_ptr)}apply_linear_correction(t,e,i,r,s){P(e,Ae),P(r,J),P(s,J),p.rawpidcontroller_apply_linear_correction(this.__wbg_ptr,t,e.__wbg_ptr,i,r.__wbg_ptr,s.__wbg_ptr)}linear_correction(t,e,i,r,s,a){try{P(e,Ae),P(r,J),P(s,J),p.rawpidcontroller_linear_correction(this.__wbg_ptr,t,e.__wbg_ptr,i,r.__wbg_ptr,s.__wbg_ptr,ft(a))}finally{lt[ht++]=void 0}}constructor(t,e,i,r){let s=p.rawpidcontroller_new(t,e,i,r);return this.__wbg_ptr=s,aw.register(this,this.__wbg_ptr,this),this}reset_integrals(){p.rawpidcontroller_reset_integrals(this.__wbg_ptr)}set_axes_mask(t){p.rawpidcontroller_set_axes_mask(this.__wbg_ptr,t)}set_kd(t,e){p.rawpidcontroller_set_kd(this.__wbg_ptr,t,e)}set_ki(t,e){p.rawpidcontroller_set_ki(this.__wbg_ptr,t,e)}set_kp(t,e){p.rawpidcontroller_set_kp(this.__wbg_ptr,t,e)}};Symbol.dispose&&(Ll.prototype[Symbol.dispose]=Ll.prototype.free);var Aa=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,ow.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,ow.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawpointcolliderprojection_free(t,0)}colliderHandle(){return p.rawpointcolliderprojection_colliderHandle(this.__wbg_ptr)}featureId(){let t=p.rawpointcolliderprojection_featureId(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}featureType(){return p.rawpointcolliderprojection_featureType(this.__wbg_ptr)}isInside(){return p.rawpointcolliderprojection_isInside(this.__wbg_ptr)!==0}point(t){try{p.rawpointcolliderprojection_point(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}};Symbol.dispose&&(Aa.prototype[Symbol.dispose]=Aa.prototype.free);var Ca=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,lw.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,lw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawpointprojection_free(t,0)}isInside(){return p.rawpointprojection_isInside(this.__wbg_ptr)!==0}point(t){try{p.rawpointprojection_point(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}};Symbol.dispose&&(Ca.prototype[Symbol.dispose]=Ca.prototype.free);var Nl=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,cw.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,cw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawraycolliderhit_free(t,0)}colliderHandle(){return p.rawraycolliderhit_colliderHandle(this.__wbg_ptr)}timeOfImpact(){return p.rawraycolliderhit_timeOfImpact(this.__wbg_ptr)}};Symbol.dispose&&(Nl.prototype[Symbol.dispose]=Nl.prototype.free);var Pa=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,hw.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,hw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawraycolliderintersection_free(t,0)}colliderHandle(){return p.rawraycolliderintersection_colliderHandle(this.__wbg_ptr)}featureId(){let t=p.rawraycolliderintersection_featureId(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}featureType(){return p.rawraycolliderintersection_featureType(this.__wbg_ptr)}normal(t){try{p.rawraycolliderintersection_normal(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}time_of_impact(){return p.rawraycolliderintersection_time_of_impact(this.__wbg_ptr)}};Symbol.dispose&&(Pa.prototype[Symbol.dispose]=Pa.prototype.free);var Ia=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,uw.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,uw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawrayintersection_free(t,0)}featureId(){let t=p.rawrayintersection_featureId(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}featureType(){return p.rawrayintersection_featureType(this.__wbg_ptr)}normal(t){try{p.rawrayintersection_normal(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}time_of_impact(){return p.rawrayintersection_time_of_impact(this.__wbg_ptr)}};Symbol.dispose&&(Ia.prototype[Symbol.dispose]=Ia.prototype.free);var Ae=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,am.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,am.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawrigidbodyset_free(t,0)}contains(t){return p.rawrigidbodyset_contains(this.__wbg_ptr,t)!==0}createRigidBody(t,e,i,r,s,a,o,l,c,h,d,u,f,m,w,g,_,b,T,v,E,R,I,x,S,L){return P(e,J),P(i,ee),P(o,J),P(l,J),P(c,J),P(h,J),P(d,ee),p.rawrigidbodyset_createRigidBody(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r,s,a,o.__wbg_ptr,l.__wbg_ptr,c.__wbg_ptr,h.__wbg_ptr,d.__wbg_ptr,u,f,m,w,g,_,b,T,v,E,R,I,x,S,L)}forEachRigidBodyHandle(t){try{p.rawrigidbodyset_forEachRigidBodyHandle(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}len(){return p.rawrigidbodyset_len(this.__wbg_ptr)>>>0}constructor(){let t=p.rawrigidbodyset_new();return this.__wbg_ptr=t,am.register(this,this.__wbg_ptr,this),this}propagateModifiedBodyPositionsToColliders(t){P(t,qe),p.rawrigidbodyset_propagateModifiedBodyPositionsToColliders(this.__wbg_ptr,t.__wbg_ptr)}rbAddForce(t,e,i){P(e,J),p.rawrigidbodyset_rbAddForce(this.__wbg_ptr,t,e.__wbg_ptr,i)}rbAddForceAtPoint(t,e,i,r){P(e,J),P(i,J),p.rawrigidbodyset_rbAddForceAtPoint(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r)}rbAddTorque(t,e,i){P(e,J),p.rawrigidbodyset_rbAddTorque(this.__wbg_ptr,t,e.__wbg_ptr,i)}rbAdditionalSolverIterations(t){return p.rawrigidbodyset_rbAdditionalSolverIterations(this.__wbg_ptr,t)>>>0}rbAngularDamping(t){return p.rawrigidbodyset_rbAngularDamping(this.__wbg_ptr,t)}rbAngvel(t,e){try{p.rawrigidbodyset_rbAngvel(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbApplyImpulse(t,e,i){P(e,J),p.rawrigidbodyset_rbApplyImpulse(this.__wbg_ptr,t,e.__wbg_ptr,i)}rbApplyImpulseAtPoint(t,e,i,r){P(e,J),P(i,J),p.rawrigidbodyset_rbApplyImpulseAtPoint(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r)}rbApplyTorqueImpulse(t,e,i){P(e,J),p.rawrigidbodyset_rbApplyTorqueImpulse(this.__wbg_ptr,t,e.__wbg_ptr,i)}rbBodyType(t){return p.rawrigidbodyset_rbBodyType(this.__wbg_ptr,t)}rbCollider(t,e){return p.rawrigidbodyset_rbCollider(this.__wbg_ptr,t,e)}rbDominanceGroup(t){return p.rawrigidbodyset_rbDominanceGroup(this.__wbg_ptr,t)}rbEffectiveAngularInertia(t,e){try{p.rawrigidbodyset_rbEffectiveAngularInertia(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbEffectiveInvMass(t,e){try{p.rawrigidbodyset_rbEffectiveInvMass(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbEffectiveWorldInvInertia(t,e){try{p.rawrigidbodyset_rbEffectiveWorldInvInertia(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbEnableCcd(t,e){p.rawrigidbodyset_rbEnableCcd(this.__wbg_ptr,t,e)}rbGravityScale(t){return p.rawrigidbodyset_rbGravityScale(this.__wbg_ptr,t)}rbInvMass(t){return p.rawrigidbodyset_rbInvMass(this.__wbg_ptr,t)}rbInvPrincipalInertia(t,e){try{p.rawrigidbodyset_rbInvPrincipalInertia(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbIsCcdEnabled(t){return p.rawrigidbodyset_rbIsCcdEnabled(this.__wbg_ptr,t)!==0}rbIsDynamic(t){return p.rawrigidbodyset_rbIsDynamic(this.__wbg_ptr,t)!==0}rbIsEnabled(t){return p.rawrigidbodyset_rbIsEnabled(this.__wbg_ptr,t)!==0}rbIsFixed(t){return p.rawrigidbodyset_rbIsFixed(this.__wbg_ptr,t)!==0}rbIsKinematic(t){return p.rawrigidbodyset_rbIsKinematic(this.__wbg_ptr,t)!==0}rbIsMoving(t){return p.rawrigidbodyset_rbIsMoving(this.__wbg_ptr,t)!==0}rbIsSleeping(t){return p.rawrigidbodyset_rbIsSleeping(this.__wbg_ptr,t)!==0}rbLinearDamping(t){return p.rawrigidbodyset_rbLinearDamping(this.__wbg_ptr,t)}rbLinvel(t,e){try{p.rawrigidbodyset_rbLinvel(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbLocalCom(t,e){try{p.rawrigidbodyset_rbLocalCom(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbLockRotations(t,e,i){p.rawrigidbodyset_rbLockRotations(this.__wbg_ptr,t,e,i)}rbLockTranslations(t,e,i){p.rawrigidbodyset_rbLockTranslations(this.__wbg_ptr,t,e,i)}rbMass(t){return p.rawrigidbodyset_rbMass(this.__wbg_ptr,t)}rbNextRotation(t,e){try{p.rawrigidbodyset_rbNextRotation(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbNextTranslation(t,e){try{p.rawrigidbodyset_rbNextTranslation(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbNumColliders(t){return p.rawrigidbodyset_rbNumColliders(this.__wbg_ptr,t)>>>0}rbPrincipalInertia(t,e){try{p.rawrigidbodyset_rbPrincipalInertia(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbPrincipalInertiaLocalFrame(t,e){try{p.rawrigidbodyset_rbPrincipalInertiaLocalFrame(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbRecomputeMassPropertiesFromColliders(t,e){P(e,qe),p.rawrigidbodyset_rbRecomputeMassPropertiesFromColliders(this.__wbg_ptr,t,e.__wbg_ptr)}rbResetForces(t,e){p.rawrigidbodyset_rbResetForces(this.__wbg_ptr,t,e)}rbResetTorques(t,e){p.rawrigidbodyset_rbResetTorques(this.__wbg_ptr,t,e)}rbRotation(t,e){try{p.rawrigidbodyset_rbRotation(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbSetAdditionalMass(t,e,i){p.rawrigidbodyset_rbSetAdditionalMass(this.__wbg_ptr,t,e,i)}rbSetAdditionalMassProperties(t,e,i,r,s,a){P(i,J),P(r,J),P(s,ee),p.rawrigidbodyset_rbSetAdditionalMassProperties(this.__wbg_ptr,t,e,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a)}rbSetAdditionalSolverIterations(t,e){p.rawrigidbodyset_rbSetAdditionalSolverIterations(this.__wbg_ptr,t,e)}rbSetAngularDamping(t,e){p.rawrigidbodyset_rbSetAngularDamping(this.__wbg_ptr,t,e)}rbSetAngvel(t,e,i){P(e,J),p.rawrigidbodyset_rbSetAngvel(this.__wbg_ptr,t,e.__wbg_ptr,i)}rbSetBodyType(t,e,i){p.rawrigidbodyset_rbSetBodyType(this.__wbg_ptr,t,e,i)}rbSetDominanceGroup(t,e){p.rawrigidbodyset_rbSetDominanceGroup(this.__wbg_ptr,t,e)}rbSetEnabled(t,e){p.rawrigidbodyset_rbSetEnabled(this.__wbg_ptr,t,e)}rbSetEnabledRotations(t,e,i,r,s){p.rawrigidbodyset_rbSetEnabledRotations(this.__wbg_ptr,t,e,i,r,s)}rbSetEnabledTranslations(t,e,i,r,s){p.rawrigidbodyset_rbSetEnabledTranslations(this.__wbg_ptr,t,e,i,r,s)}rbSetGravityScale(t,e,i){p.rawrigidbodyset_rbSetGravityScale(this.__wbg_ptr,t,e,i)}rbSetLinearDamping(t,e){p.rawrigidbodyset_rbSetLinearDamping(this.__wbg_ptr,t,e)}rbSetLinvel(t,e,i){P(e,J),p.rawrigidbodyset_rbSetLinvel(this.__wbg_ptr,t,e.__wbg_ptr,i)}rbSetNextKinematicRotation(t,e,i,r,s){p.rawrigidbodyset_rbSetNextKinematicRotation(this.__wbg_ptr,t,e,i,r,s)}rbSetNextKinematicTranslation(t,e,i,r){p.rawrigidbodyset_rbSetNextKinematicTranslation(this.__wbg_ptr,t,e,i,r)}rbSetRotation(t,e,i,r,s,a){p.rawrigidbodyset_rbSetRotation(this.__wbg_ptr,t,e,i,r,s,a)}rbSetSoftCcdPrediction(t,e){p.rawrigidbodyset_rbSetSoftCcdPrediction(this.__wbg_ptr,t,e)}rbSetTranslation(t,e,i,r,s){p.rawrigidbodyset_rbSetTranslation(this.__wbg_ptr,t,e,i,r,s)}rbSetUserData(t,e){p.rawrigidbodyset_rbSetUserData(this.__wbg_ptr,t,e)}rbSleep(t){p.rawrigidbodyset_rbSleep(this.__wbg_ptr,t)}rbSoftCcdPrediction(t){return p.rawrigidbodyset_rbSoftCcdPrediction(this.__wbg_ptr,t)}rbTranslation(t,e){try{p.rawrigidbodyset_rbTranslation(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbUserData(t){return p.rawrigidbodyset_rbUserData(this.__wbg_ptr,t)>>>0}rbUserForce(t,e){try{p.rawrigidbodyset_rbUserForce(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbUserTorque(t,e){try{p.rawrigidbodyset_rbUserTorque(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}rbVelocityAtPoint(t,e,i){try{P(e,J),p.rawrigidbodyset_rbVelocityAtPoint(this.__wbg_ptr,t,e.__wbg_ptr,ft(i))}finally{lt[ht++]=void 0}}rbWakeUp(t){p.rawrigidbodyset_rbWakeUp(this.__wbg_ptr,t)}rbWorldCom(t,e){try{p.rawrigidbodyset_rbWorldCom(this.__wbg_ptr,t,ft(e))}finally{lt[ht++]=void 0}}remove(t,e,i,r,s){P(e,kn),P(i,qe),P(r,zn),P(s,Hn),p.rawrigidbodyset_remove(this.__wbg_ptr,t,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr)}};Symbol.dispose&&(Ae.prototype[Symbol.dispose]=Ae.prototype.free),Object.freeze({Dynamic:0,0:"Dynamic",Fixed:1,1:"Fixed",KinematicPositionBased:2,2:"KinematicPositionBased",KinematicVelocityBased:3,3:"KinematicVelocityBased"});var ee=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,om.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,om.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawrotation_free(t,0)}static identity(){let t=p.rawrotation_identity();return n.__wrap(t)}constructor(t,e,i,r){let s=p.rawrotation_new(t,e,i,r);return this.__wbg_ptr=s,om.register(this,this.__wbg_ptr,this),this}get w(){return p.rawrotation_w(this.__wbg_ptr)}get x(){return p.rawrotation_x(this.__wbg_ptr)}get y(){return p.rawrotation_y(this.__wbg_ptr)}get z(){return p.rawrotation_z(this.__wbg_ptr)}};Symbol.dispose&&(ee.prototype[Symbol.dispose]=ee.prototype.free);var Dl=class{__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,dw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawserializationpipeline_free(t,0)}deserializeAll(t){let e=p.rawserializationpipeline_deserializeAll(this.__wbg_ptr,Qe(t));return e===0?void 0:Al.__wrap(e)}constructor(){let t=p.rawserializationpipeline_new();return this.__wbg_ptr=t,dw.register(this,this.__wbg_ptr,this),this}serializeAll(t,e,i,r,s,a,o,l,c){return P(t,J),P(e,Sr),P(i,kn),P(r,Bn),P(s,ri),P(a,Ae),P(o,qe),P(l,zn),P(c,Hn),Vu(p.rawserializationpipeline_serializeAll(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a.__wbg_ptr,o.__wbg_ptr,l.__wbg_ptr,c.__wbg_ptr))}};Symbol.dispose&&(Dl.prototype[Symbol.dispose]=Dl.prototype.free);var se=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,fw.register(e,e.__wbg_ptr,e),e}static __unwrap(t){return t instanceof n?t.__destroy_into_raw():0}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,fw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawshape_free(t,0)}static ball(t){let e=p.rawshape_ball(t);return n.__wrap(e)}static capsule(t,e){let i=p.rawshape_capsule(t,e);return n.__wrap(i)}castRay(t,e,i,r,s,a){return P(t,J),P(e,ee),P(i,J),P(r,J),p.rawshape_castRay(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s,a)}castRayAndGetNormal(t,e,i,r,s,a){P(t,J),P(e,ee),P(i,J),P(r,J);let o=p.rawshape_castRayAndGetNormal(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s,a);return o===0?void 0:Ia.__wrap(o)}castShape(t,e,i,r,s,a,o,l,c,h){P(t,J),P(e,ee),P(i,J),P(r,n),P(s,J),P(a,ee),P(o,J);let d=p.rawshape_castShape(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a.__wbg_ptr,o.__wbg_ptr,l,c,h);return d===0?void 0:La.__wrap(d)}static compound(t,e,i){let r=(function(d,u){let f=u(4*d.length,4)>>>0,m=de();for(let w=0;w<d.length;w++)m.setUint32(f+4*w,Qe(d[w]),!0);return Xe=d.length,f})(t,p.__wbindgen_export3),s=Xe,a=an(e,p.__wbindgen_export3),o=Xe,l=an(i,p.__wbindgen_export3),c=Xe,h=p.rawshape_compound(r,s,a,o,l,c);return n.__wrap(h)}compoundLen(){let t=p.rawshape_compoundLen(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}compoundRotation(t){let e=p.rawshape_compoundRotation(this.__wbg_ptr,t);return e===0?void 0:ee.__wrap(e)}compoundShape(t){let e=p.rawshape_compoundShape(this.__wbg_ptr,t);return e===0?void 0:n.__wrap(e)}compoundTranslation(t){let e=p.rawshape_compoundTranslation(this.__wbg_ptr,t);return e===0?void 0:J.__wrap(e)}static cone(t,e){let i=p.rawshape_cone(t,e);return n.__wrap(i)}contactShape(t,e,i,r,s,a){P(t,J),P(e,ee),P(i,n),P(r,J),P(s,ee);let o=p.rawshape_contactShape(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr,a);return o===0?void 0:gs.__wrap(o)}containsPoint(t,e,i){return P(t,J),P(e,ee),P(i,J),p.rawshape_containsPoint(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr)!==0}static convexDecomposition(t,e){let i=an(t,p.__wbindgen_export3),r=Xe,s=Xr(e,p.__wbindgen_export3),a=Xe,o=p.rawshape_convexDecomposition(i,r,s,a);return o===0?void 0:n.__wrap(o)}static convexDecompositionWithParams(t,e,i){let r=an(t,p.__wbindgen_export3),s=Xe,a=Xr(e,p.__wbindgen_export3),o=Xe;P(i,Na);let l=p.rawshape_convexDecompositionWithParams(r,s,a,o,i.__wbg_ptr);return l===0?void 0:n.__wrap(l)}static convexHull(t){let e=an(t,p.__wbindgen_export3),i=Xe,r=p.rawshape_convexHull(e,i);return r===0?void 0:n.__wrap(r)}static convexMesh(t,e){let i=an(t,p.__wbindgen_export3),r=Xe,s=Xr(e,p.__wbindgen_export3),a=Xe,o=p.rawshape_convexMesh(i,r,s,a);return o===0?void 0:n.__wrap(o)}convexMeshData(){let t=p.rawshape_convexMeshData(this.__wbg_ptr);return t===0?void 0:Tl.__wrap(t)}static cuboid(t,e,i){let r=p.rawshape_cuboid(t,e,i);return n.__wrap(r)}static cylinder(t,e){let i=p.rawshape_cylinder(t,e);return n.__wrap(i)}halfExtents(){let t=p.rawshape_halfExtents(this.__wbg_ptr);return t===0?void 0:J.__wrap(t)}halfHeight(){let t=p.rawshape_halfHeight(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}static halfspace(t){P(t,J);let e=p.rawshape_halfspace(t.__wbg_ptr);return n.__wrap(e)}halfspaceNormal(){let t=p.rawshape_halfspaceNormal(this.__wbg_ptr);return t===0?void 0:J.__wrap(t)}heightFieldFlags(){let t=p.rawshape_heightFieldFlags(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}static heightfield(t,e,i,r,s){let a=an(i,p.__wbindgen_export3),o=Xe;P(r,J);let l=p.rawshape_heightfield(t,e,a,o,r.__wbg_ptr,s);return n.__wrap(l)}heightfieldHeights(){try{let i=p.__wbindgen_add_to_stack_pointer(-16);p.rawshape_heightfieldHeights(i,this.__wbg_ptr);var t=de().getInt32(i+0,!0),e=de().getInt32(i+4,!0);let r;return t!==0&&(r=Da(t,e).slice(),p.__wbindgen_export2(t,4*e,4)),r}finally{p.__wbindgen_add_to_stack_pointer(16)}}heightfieldNCols(){let t=p.rawshape_heightfieldNCols(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}heightfieldNRows(){let t=p.rawshape_heightfieldNRows(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}heightfieldScale(){let t=p.rawshape_heightfieldScale(this.__wbg_ptr);return t===0?void 0:J.__wrap(t)}indices(){try{let i=p.__wbindgen_add_to_stack_pointer(-16);p.rawshape_indices(i,this.__wbg_ptr);var t=de().getInt32(i+0,!0),e=de().getInt32(i+4,!0);let r;return t!==0&&(r=Mm(t,e).slice(),p.__wbindgen_export2(t,4*e,4)),r}finally{p.__wbindgen_add_to_stack_pointer(16)}}intersectsRay(t,e,i,r,s){return P(t,J),P(e,ee),P(i,J),P(r,J),p.rawshape_intersectsRay(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s)!==0}intersectsShape(t,e,i,r,s){return P(t,J),P(e,ee),P(i,n),P(r,J),P(s,ee),p.rawshape_intersectsShape(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r.__wbg_ptr,s.__wbg_ptr)!==0}static polyline(t,e){let i=an(t,p.__wbindgen_export3),r=Xe,s=Xr(e,p.__wbindgen_export3),a=Xe,o=p.rawshape_polyline(i,r,s,a);return n.__wrap(o)}projectPoint(t,e,i,r){P(t,J),P(e,ee),P(i,J);let s=p.rawshape_projectPoint(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r);return Ca.__wrap(s)}radius(){let t=p.rawshape_radius(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}static roundCone(t,e,i){let r=p.rawshape_roundCone(t,e,i);return n.__wrap(r)}static roundConvexHull(t,e){let i=an(t,p.__wbindgen_export3),r=Xe,s=p.rawshape_roundConvexHull(i,r,e);return s===0?void 0:n.__wrap(s)}static roundConvexMesh(t,e,i){let r=an(t,p.__wbindgen_export3),s=Xe,a=Xr(e,p.__wbindgen_export3),o=Xe,l=p.rawshape_roundConvexMesh(r,s,a,o,i);return l===0?void 0:n.__wrap(l)}static roundCuboid(t,e,i,r){let s=p.rawshape_roundCuboid(t,e,i,r);return n.__wrap(s)}static roundCylinder(t,e,i){let r=p.rawshape_roundCylinder(t,e,i);return n.__wrap(r)}roundRadius(){let t=p.rawshape_roundRadius(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}static roundTriangle(t,e,i,r){P(t,J),P(e,J),P(i,J);let s=p.rawshape_roundTriangle(t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr,r);return n.__wrap(s)}static segment(t,e){P(t,J),P(e,J);let i=p.rawshape_segment(t.__wbg_ptr,e.__wbg_ptr);return n.__wrap(i)}shapeType(){return p.rawshape_shapeType(this.__wbg_ptr)}triMeshFlags(){let t=p.rawshape_triMeshFlags(this.__wbg_ptr);return t===Number.MAX_SAFE_INTEGER?void 0:t}static triangle(t,e,i){P(t,J),P(e,J),P(i,J);let r=p.rawshape_triangle(t.__wbg_ptr,e.__wbg_ptr,i.__wbg_ptr);return n.__wrap(r)}static trimesh(t,e,i){let r=an(t,p.__wbindgen_export3),s=Xe,a=Xr(e,p.__wbindgen_export3),o=Xe,l=p.rawshape_trimesh(r,s,a,o,i);return l===0?void 0:n.__wrap(l)}vertices(){try{let i=p.__wbindgen_add_to_stack_pointer(-16);p.rawshape_vertices(i,this.__wbg_ptr);var t=de().getInt32(i+0,!0),e=de().getInt32(i+4,!0);let r;return t!==0&&(r=Da(t,e).slice(),p.__wbindgen_export2(t,4*e,4)),r}finally{p.__wbindgen_add_to_stack_pointer(16)}}voxelData(){try{let i=p.__wbindgen_add_to_stack_pointer(-16);p.rawshape_voxelData(i,this.__wbg_ptr);var t=de().getInt32(i+0,!0),e=de().getInt32(i+4,!0);let r;return t!==0&&(r=xw(t,e).slice(),p.__wbindgen_export2(t,4*e,4)),r}finally{p.__wbindgen_add_to_stack_pointer(16)}}voxelSize(){let t=p.rawshape_voxelSize(this.__wbg_ptr);return t===0?void 0:J.__wrap(t)}static voxels(t,e){P(t,J);let i=Xr(e,p.__wbindgen_export3),r=Xe,s=p.rawshape_voxels(t.__wbg_ptr,i,r);return n.__wrap(s)}static voxelsFromPoints(t,e){P(t,J);let i=an(e,p.__wbindgen_export3),r=Xe,s=p.rawshape_voxelsFromPoints(t.__wbg_ptr,i,r);return n.__wrap(s)}};Symbol.dispose&&(se.prototype[Symbol.dispose]=se.prototype.free);var La=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,pw.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,pw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawshapecasthit_free(t,0)}getComponents(t){try{p.rawshapecasthit_getComponents(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}};Symbol.dispose&&(La.prototype[Symbol.dispose]=La.prototype.free);var gs=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,mw.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,mw.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawshapecontact_free(t,0)}getComponents(t){try{p.rawshapecontact_getComponents(this.__wbg_ptr,ft(t))}finally{lt[ht++]=void 0}}};Symbol.dispose&&(gs.prototype[Symbol.dispose]=gs.prototype.free);var te=Object.freeze({Ball:0,0:"Ball",Cuboid:1,1:"Cuboid",Capsule:2,2:"Capsule",Segment:3,3:"Segment",Polyline:4,4:"Polyline",Triangle:5,5:"Triangle",TriMesh:6,6:"TriMesh",HeightField:7,7:"HeightField",Compound:8,8:"Compound",ConvexPolyhedron:9,9:"ConvexPolyhedron",Cylinder:10,10:"Cylinder",Cone:11,11:"Cone",RoundCuboid:12,12:"RoundCuboid",RoundTriangle:13,13:"RoundTriangle",RoundCylinder:14,14:"RoundCylinder",RoundCone:15,15:"RoundCone",RoundConvexPolyhedron:16,16:"RoundConvexPolyhedron",HalfSpace:17,17:"HalfSpace",Voxels:18,18:"Voxels"}),Na=class{__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,_w.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawvhacdparameters_free(t,0)}get alpha(){return p.rawvhacdparameters_alpha(this.__wbg_ptr)}get beta(){return p.rawvhacdparameters_beta(this.__wbg_ptr)}get concavity(){return p.rawvhacdparameters_concavity(this.__wbg_ptr)}get convex_hull_approximation(){return p.rawvhacdparameters_convex_hull_approximation(this.__wbg_ptr)!==0}get convex_hull_downsampling(){return p.rawvhacdparameters_convex_hull_downsampling(this.__wbg_ptr)>>>0}get max_convex_hulls(){return p.rawvhacdparameters_max_convex_hulls(this.__wbg_ptr)>>>0}constructor(){let t=p.rawvhacdparameters_new();return this.__wbg_ptr=t,_w.register(this,this.__wbg_ptr,this),this}get plane_downsampling(){return p.rawvhacdparameters_plane_downsampling(this.__wbg_ptr)>>>0}get resolution(){return p.rawvhacdparameters_resolution(this.__wbg_ptr)>>>0}set alpha(t){p.rawvhacdparameters_set_alpha(this.__wbg_ptr,t)}set beta(t){p.rawvhacdparameters_set_beta(this.__wbg_ptr,t)}set concavity(t){p.rawvhacdparameters_set_concavity(this.__wbg_ptr,t)}set convex_hull_approximation(t){p.rawvhacdparameters_set_convex_hull_approximation(this.__wbg_ptr,t)}set convex_hull_downsampling(t){p.rawvhacdparameters_set_convex_hull_downsampling(this.__wbg_ptr,t)}set max_convex_hulls(t){p.rawvhacdparameters_set_max_convex_hulls(this.__wbg_ptr,t)}set plane_downsampling(t){p.rawvhacdparameters_set_plane_downsampling(this.__wbg_ptr,t)}set resolution(t){p.rawvhacdparameters_set_resolution(this.__wbg_ptr,t)}};Symbol.dispose&&(Na.prototype[Symbol.dispose]=Na.prototype.free);var J=class n{static __wrap(t){let e=Object.create(n.prototype);return e.__wbg_ptr=t,lm.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){let t=this.__wbg_ptr;return this.__wbg_ptr=0,lm.unregister(this),t}free(){let t=this.__destroy_into_raw();p.__wbg_rawvector_free(t,0)}constructor(t,e,i){let r=p.rawvector_new(t,e,i);return this.__wbg_ptr=r,lm.register(this,this.__wbg_ptr,this),this}set x(t){p.rawvector_set_x(this.__wbg_ptr,t)}set y(t){p.rawvector_set_y(this.__wbg_ptr,t)}set z(t){p.rawvector_set_z(this.__wbg_ptr,t)}get x(){return p.rawvector_x(this.__wbg_ptr)}xyz(){let t=p.rawvector_xyz(this.__wbg_ptr);return n.__wrap(t)}xzy(){let t=p.rawvector_xzy(this.__wbg_ptr);return n.__wrap(t)}get y(){return p.rawvector_y(this.__wbg_ptr)}yxz(){let t=p.rawvector_yxz(this.__wbg_ptr);return n.__wrap(t)}yzx(){let t=p.rawvector_yzx(this.__wbg_ptr);return n.__wrap(t)}get z(){return p.rawvector_z(this.__wbg_ptr)}static zero(){let t=p.rawvector_zero();return n.__wrap(t)}zxy(){let t=p.rawvector_zxy(this.__wbg_ptr);return n.__wrap(t)}zyx(){let t=p.rawvector_zyx(this.__wbg_ptr);return n.__wrap(t)}};Symbol.dispose&&(J.prototype[Symbol.dispose]=J.prototype.free);var Qp=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawbroadphase_free(n,1))),q0=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawccdsolver_free(n,1))),Y0=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawcharactercollision_free(n,1))),tm=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawcolliderset_free(n,1))),J0=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawcollidershapecasthit_free(n,1))),j0=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawcontactforceevent_free(n,1))),Z0=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawcontactmanifold_free(n,1))),$0=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawcontactpair_free(n,1))),K0=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawconvexmeshdata_free(n,1))),Q0=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawdebugrenderpipeline_free(n,1))),tw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawdeserializedworld_free(n,1))),ew=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawdynamicraycastvehiclecontroller_free(n,1))),iw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_raweventqueue_free(n,1))),nw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawgenericjoint_free(n,1))),em=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawimpulsejointset_free(n,1))),im=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawintegrationparameters_free(n,1))),nm=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawislandmanager_free(n,1))),rw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawkinematiccharactercontroller_free(n,1))),rm=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawmultibodyjointset_free(n,1))),sm=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawnarrowphase_free(n,1))),sw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawphysicspipeline_free(n,1))),aw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawpidcontroller_free(n,1))),ow=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawpointcolliderprojection_free(n,1))),lw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawpointprojection_free(n,1))),cw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawraycolliderhit_free(n,1))),hw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawraycolliderintersection_free(n,1))),uw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawrayintersection_free(n,1))),am=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawrigidbodyset_free(n,1))),om=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawrotation_free(n,1)));typeof FinalizationRegistry>"u"||new FinalizationRegistry((n=>p.__wbg_rawsdpmatrix3_free(n,1)));var dw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawserializationpipeline_free(n,1))),fw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawshape_free(n,1))),pw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawshapecasthit_free(n,1))),mw=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawshapecontact_free(n,1))),_w=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawvhacdparameters_free(n,1))),lm=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((n=>p.__wbg_rawvector_free(n,1)));function Qe(n){bl===lt.length&&lt.push(lt.length+1);let t=bl;return bl=lt[t],lt[t]=n,t}function P(n,t){if(!(n instanceof t))throw new Error(`expected instance of ${t.name}`)}function ft(n){if(ht==1)throw new Error("out of js stack");return lt[--ht]=n,ht}function Da(n,t){return n>>>=0,bw().subarray(n/4,n/4+t)}function xw(n,t){return n>>>=0,(function(){return yl!==null&&yl.byteLength!==0||(yl=new Int32Array(p.memory.buffer)),yl})().subarray(n/4,n/4+t)}function Mm(n,t){return n>>>=0,Mw().subarray(n/4,n/4+t)}function gw(n,t){return n>>>=0,Ew().subarray(n/1,n/1+t)}var ps=null;function de(){return(ps===null||ps.buffer.detached===!0||ps.buffer.detached===void 0&&ps.buffer!==p.memory.buffer)&&(ps=new DataView(p.memory.buffer)),ps}var wl=null;function bw(){return wl!==null&&wl.byteLength!==0||(wl=new Float32Array(p.memory.buffer)),wl}var yl=null;function Sw(n,t){return(function(e,i){return hm+=i,hm>=2146435072&&(Hu=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}),Hu.decode(),hm=i),Hu.decode(Ew().subarray(e,e+i))})(n>>>0,t)}var vl=null;function Mw(){return vl!==null&&vl.byteLength!==0||(vl=new Uint32Array(p.memory.buffer)),vl}var xl=null;function Ew(){return xl!==null&&xl.byteLength!==0||(xl=new Uint8Array(p.memory.buffer)),xl}function Me(n){return lt[n]}function cm(n,t){try{return n.apply(this,t)}catch(e){p.__wbindgen_export(Qe(e))}}var lt=new Array(1024).fill(void 0);lt.push(void 0,null,!0,!1);var bl=lt.length;function zt(n){return n==null}function Xr(n,t){let e=t(4*n.length,4)>>>0;return Mw().set(n,e/4),Xe=n.length,e}function an(n,t){let e=t(4*n.length,4)>>>0;return bw().set(n,e/4),Xe=n.length,e}var ht=1024;function Vu(n){let t=Me(n);return(function(e){e<1028||(lt[e]=bl,bl=e)})(n),t}var Hu=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});Hu.decode();var hm=0,p,Xe=0;async function dE(n){if(p!==void 0)return p;n!==void 0&&(Object.getPrototypeOf(n)===Object.prototype?{module_or_path:n}=n:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),n===void 0&&(n=new URL("rapier_wasm3d_bg.wasm","<deleted>"));let t=(function(){return{__proto__:null,"./rapier_wasm3d_bg.js":{__proto__:null,__wbg___wbindgen_boolean_get_c9c83ebd41b34df3:function(s){let a=Me(s),o=typeof a=="boolean"?a:void 0;return zt(o)?16777215:o?1:0},__wbg___wbindgen_is_function_5e4570eb24ffa122:function(s){return typeof Me(s)=="function"},__wbg___wbindgen_is_undefined_6cff064c44e0d823:function(s){return Me(s)===void 0},__wbg___wbindgen_number_get_136b9679cab35cfb:function(s,a){let o=Me(a),l=typeof o=="number"?o:void 0;de().setFloat64(s+8,zt(l)?0:l,!0),de().setInt32(s+0,!zt(l),!0)},__wbg___wbindgen_throw_bb96b2010945f0bc:function(s,a){throw new Error(Sw(s,a))},__wbg_bind_f0a9af73583d6566:function(s,a,o,l){return Qe(Me(s).bind(Me(a),Me(o),Me(l)))},__wbg_call_0f2a9af232c18fd2:function(){return cm((function(s,a,o,l){return Qe(Me(s).call(Me(a),Me(o),Me(l)))}),arguments)},__wbg_call_35dba3c747ad7521:function(){return cm((function(s,a,o){return Qe(Me(s).call(Me(a),Me(o)))}),arguments)},__wbg_call_39f824e18d9d2414:function(){return cm((function(s,a,o,l,c){return Qe(Me(s).call(Me(a),Me(o),Me(l),Me(c)))}),arguments)},__wbg_length_1009454859bb3e03:function(s){return Me(s).length},__wbg_length_36bd29c6848c2144:function(s){return Me(s).length},__wbg_new_from_slice_3eea173078478cfe:function(s,a){return Qe(new Uint8Array(gw(s,a)))},__wbg_new_with_length_ef112d2291d8ab95:function(s){return Qe(new Float32Array(s>>>0))},__wbg_now_e7c6795a7f81e10f:function(s){return Me(s).now()},__wbg_performance_3fcf6e32a7e1ed0a:function(s){return Qe(Me(s).performance)},__wbg_prototypesetcall_de8e0d9553586985:function(s,a,o){Uint8Array.prototype.set.call(gw(s,a),Me(o))},__wbg_rawcontactforceevent_new:function(s){return Qe(Sl.__wrap(s))},__wbg_rawraycolliderintersection_new:function(s){return Qe(Pa.__wrap(s))},__wbg_rawshape_unwrap:function(s){return se.__unwrap(Me(s))},__wbg_set_577f5f7485b6744e:function(s,a,o){Me(s).set(Da(a,o))},__wbg_set_index_aac0f95bd3ef91b6:function(s,a,o){Me(s)[a>>>0]=o},__wbg_static_accessor_GLOBAL_THIS_466428f93b4eaa76:function(){let s=typeof globalThis>"u"?null:globalThis;return zt(s)?0:Qe(s)},__wbg_static_accessor_GLOBAL_c7aea38d4de089bc:function(){let s=typeof global>"u"?null:global;return zt(s)?0:Qe(s)},__wbg_static_accessor_SELF_42d4fae05e59267a:function(){let s=typeof self>"u"?null:self;return zt(s)?0:Qe(s)},__wbg_static_accessor_WINDOW_e0db14a0eba6a812:function(){let s=typeof window>"u"?null:window;return zt(s)?0:Qe(s)},__wbindgen_cast_0000000000000001:function(s){return Qe(s)},__wbindgen_object_clone_ref:function(s){return Qe(Me(s))},__wbindgen_object_drop_ref:function(s){Vu(s)}}}})();(typeof n=="string"||typeof Request=="function"&&n instanceof Request||typeof URL=="function"&&n instanceof URL)&&(n=fetch(n));let{instance:e,module:i}=await(async function(r,s){if(typeof Response=="function"&&r instanceof Response){if(!r.ok)throw new Error(`failed to fetch Wasm: ${r.status} ${r.statusText} fetching '${r.url}'`);if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(r,s)}catch(o){if(!(function(l){switch(l){case"basic":case"cors":case"default":return!0}return!1})(r.type)||r.headers.get("Content-Type")==="application/wasm")throw o;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",o)}let a=await r.arrayBuffer();return await WebAssembly.instantiate(a,s)}{let a=await WebAssembly.instantiate(r,s);return a instanceof WebAssembly.Instance?{instance:a,module:r}:a}})(await n,t);return(function(r,s){return p=r.exports,ps=null,wl=null,yl=null,vl=null,xl=null,p})(e)}var q=new Float32Array(16),Gu=class{constructor(t,e,i){this.x=t,this.y=e,this.z=i}},D=class n{static new(t,e,i){return new Gu(t,e,i)}static intoRaw(t){return new J(t.x,t.y,t.z)}static zeros(){return n.new(0,0,0)}static fromBuffer(t,e){return t?(e!=null||(e=n.zeros()),e.x=t[0],e.y=t[1],e.z=t[2],e):null}static fromRaw(t){if(!t)return null;let e=n.new(t.x,t.y,t.z);return t.free(),e}static copy(t,e){t.x=e.x,t.y=e.y,t.z=e.z}},Fl=class{constructor(t,e,i,r){this.x=t,this.y=e,this.z=i,this.w=r}},Wt=class n{static identity(){return new Fl(0,0,0,1)}static fromBuffer(t,e){return t?(e!=null||(e=n.identity()),e.x=t[0],e.y=t[1],e.z=t[2],e.w=t[3],e):null}static fromRaw(t){if(!t)return null;let e=new Fl(t.x,t.y,t.z,t.w);return t.free(),e}static intoRaw(t){return new ee(t.x,t.y,t.z,t.w)}static copy(t,e){t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w}},Ul=class{constructor(t){this.elements=t}get m11(){return this.elements[0]}get m12(){return this.elements[1]}get m21(){return this.m12}get m13(){return this.elements[2]}get m31(){return this.m13}get m22(){return this.elements[3]}get m23(){return this.elements[4]}get m32(){return this.m23}get m33(){return this.elements[5]}},Ol=class{static fromBuffer(t,e){return t?(e!=null||(e=new Ul(t)),e.elements[0]=t[0],e.elements[1]=t[1],e.elements[2]=t[2],e.elements[3]=t[3],e.elements[4]=t[4],e.elements[5]=t[5],e):null}static fromRaw(t){let e=new Ul(t.elements());return t.free(),e}},Fn,xi,um,dm,fm,Bl,Fa,ti,pm,mm,_m,Wu,Xu,gm,wm,qu,ms;(function(n){n[n.Dynamic=0]="Dynamic",n[n.Fixed=1]="Fixed",n[n.KinematicPositionBased=2]="KinematicPositionBased",n[n.KinematicVelocityBased=3]="KinematicVelocityBased"})(Fn||(Fn={}));var zl=class{constructor(t,e,i){this.rawSet=t,this.colliderSet=e,this.handle=i}finalizeDeserialization(t){this.colliderSet=t}isValid(){return this.rawSet.contains(this.handle)}lockTranslations(t,e){return this.rawSet.rbLockTranslations(this.handle,t,e)}lockRotations(t,e){return this.rawSet.rbLockRotations(this.handle,t,e)}setEnabledTranslations(t,e,i,r){return this.rawSet.rbSetEnabledTranslations(this.handle,t,e,i,r)}restrictTranslations(t,e,i,r){this.setEnabledTranslations(t,e,i,r)}setEnabledRotations(t,e,i,r){return this.rawSet.rbSetEnabledRotations(this.handle,t,e,i,r)}restrictRotations(t,e,i,r){this.setEnabledRotations(t,e,i,r)}dominanceGroup(){return this.rawSet.rbDominanceGroup(this.handle)}setDominanceGroup(t){this.rawSet.rbSetDominanceGroup(this.handle,t)}additionalSolverIterations(){return this.rawSet.rbAdditionalSolverIterations(this.handle)}setAdditionalSolverIterations(t){this.rawSet.rbSetAdditionalSolverIterations(this.handle,t)}enableCcd(t){this.rawSet.rbEnableCcd(this.handle,t)}setSoftCcdPrediction(t){this.rawSet.rbSetSoftCcdPrediction(this.handle,t)}softCcdPrediction(){return this.rawSet.rbSoftCcdPrediction(this.handle)}translation(t){return this.rawSet.rbTranslation(this.handle,q),D.fromBuffer(q,t)}rotation(t){return this.rawSet.rbRotation(this.handle,q),Wt.fromBuffer(q,t)}nextTranslation(t){return this.rawSet.rbNextTranslation(this.handle,q),D.fromBuffer(q,t)}nextRotation(t){return this.rawSet.rbNextRotation(this.handle,q),Wt.fromBuffer(q,t)}setTranslation(t,e){this.rawSet.rbSetTranslation(this.handle,t.x,t.y,t.z,e)}setLinvel(t,e){let i=D.intoRaw(t);this.rawSet.rbSetLinvel(this.handle,i,e),i.free()}gravityScale(){return this.rawSet.rbGravityScale(this.handle)}setGravityScale(t,e){this.rawSet.rbSetGravityScale(this.handle,t,e)}setRotation(t,e){this.rawSet.rbSetRotation(this.handle,t.x,t.y,t.z,t.w,e)}setAngvel(t,e){let i=D.intoRaw(t);this.rawSet.rbSetAngvel(this.handle,i,e),i.free()}setNextKinematicTranslation(t){this.rawSet.rbSetNextKinematicTranslation(this.handle,t.x,t.y,t.z)}setNextKinematicRotation(t){this.rawSet.rbSetNextKinematicRotation(this.handle,t.x,t.y,t.z,t.w)}linvel(t){return this.rawSet.rbLinvel(this.handle,q),D.fromBuffer(q,t)}velocityAtPoint(t,e){let i=D.intoRaw(t);return this.rawSet.rbVelocityAtPoint(this.handle,i,q),i.free(),D.fromBuffer(q,e)}angvel(t){return this.rawSet.rbAngvel(this.handle,q),D.fromBuffer(q,t)}mass(){return this.rawSet.rbMass(this.handle)}effectiveInvMass(t){return this.rawSet.rbEffectiveInvMass(this.handle,q),D.fromBuffer(q,t)}invMass(){return this.rawSet.rbInvMass(this.handle)}localCom(t){return this.rawSet.rbLocalCom(this.handle,q),D.fromBuffer(q,t)}worldCom(t){return this.rawSet.rbWorldCom(this.handle,q),D.fromBuffer(q,t)}invPrincipalInertia(t){return this.rawSet.rbInvPrincipalInertia(this.handle,q),D.fromBuffer(q,t)}principalInertia(t){return this.rawSet.rbPrincipalInertia(this.handle,q),D.fromBuffer(q,t)}principalInertiaLocalFrame(t){return this.rawSet.rbPrincipalInertiaLocalFrame(this.handle,q),Wt.fromBuffer(q,t)}effectiveWorldInvInertia(t){return this.rawSet.rbEffectiveWorldInvInertia(this.handle,q),Ol.fromBuffer(q,t)}effectiveAngularInertia(t){return this.rawSet.rbEffectiveAngularInertia(this.handle,q),Ol.fromBuffer(q,t)}sleep(){this.rawSet.rbSleep(this.handle)}wakeUp(){this.rawSet.rbWakeUp(this.handle)}isCcdEnabled(){return this.rawSet.rbIsCcdEnabled(this.handle)}numColliders(){return this.rawSet.rbNumColliders(this.handle)}collider(t){return this.colliderSet.get(this.rawSet.rbCollider(this.handle,t))}setEnabled(t){this.rawSet.rbSetEnabled(this.handle,t)}isEnabled(){return this.rawSet.rbIsEnabled(this.handle)}bodyType(){return this.rawSet.rbBodyType(this.handle)}setBodyType(t,e){return this.rawSet.rbSetBodyType(this.handle,t,e)}isSleeping(){return this.rawSet.rbIsSleeping(this.handle)}isMoving(){return this.rawSet.rbIsMoving(this.handle)}isFixed(){return this.rawSet.rbIsFixed(this.handle)}isKinematic(){return this.rawSet.rbIsKinematic(this.handle)}isDynamic(){return this.rawSet.rbIsDynamic(this.handle)}linearDamping(){return this.rawSet.rbLinearDamping(this.handle)}angularDamping(){return this.rawSet.rbAngularDamping(this.handle)}setLinearDamping(t){this.rawSet.rbSetLinearDamping(this.handle,t)}recomputeMassPropertiesFromColliders(){this.rawSet.rbRecomputeMassPropertiesFromColliders(this.handle,this.colliderSet.raw)}setAdditionalMass(t,e){this.rawSet.rbSetAdditionalMass(this.handle,t,e)}setAdditionalMassProperties(t,e,i,r,s){let a=D.intoRaw(e),o=D.intoRaw(i),l=Wt.intoRaw(r);this.rawSet.rbSetAdditionalMassProperties(this.handle,t,a,o,l,s),a.free(),o.free(),l.free()}setAngularDamping(t){this.rawSet.rbSetAngularDamping(this.handle,t)}resetForces(t){this.rawSet.rbResetForces(this.handle,t)}resetTorques(t){this.rawSet.rbResetTorques(this.handle,t)}addForce(t,e){let i=D.intoRaw(t);this.rawSet.rbAddForce(this.handle,i,e),i.free()}applyImpulse(t,e){let i=D.intoRaw(t);this.rawSet.rbApplyImpulse(this.handle,i,e),i.free()}addTorque(t,e){let i=D.intoRaw(t);this.rawSet.rbAddTorque(this.handle,i,e),i.free()}applyTorqueImpulse(t,e){let i=D.intoRaw(t);this.rawSet.rbApplyTorqueImpulse(this.handle,i,e),i.free()}addForceAtPoint(t,e,i){let r=D.intoRaw(t),s=D.intoRaw(e);this.rawSet.rbAddForceAtPoint(this.handle,r,s,i),r.free(),s.free()}applyImpulseAtPoint(t,e,i){let r=D.intoRaw(t),s=D.intoRaw(e);this.rawSet.rbApplyImpulseAtPoint(this.handle,r,s,i),r.free(),s.free()}userForce(t){return this.rawSet.rbUserForce(this.handle,q),D.fromBuffer(q,t)}userTorque(t){return this.rawSet.rbUserTorque(this.handle,q),D.fromBuffer(q,t)}},ym=class n{constructor(t){this.enabled=!0,this.status=t,this.translation=D.zeros(),this.rotation=Wt.identity(),this.gravityScale=1,this.linvel=D.zeros(),this.mass=0,this.massOnly=!1,this.centerOfMass=D.zeros(),this.translationsEnabledX=!0,this.translationsEnabledY=!0,this.angvel=D.zeros(),this.principalAngularInertia=D.zeros(),this.angularInertiaLocalFrame=Wt.identity(),this.translationsEnabledZ=!0,this.rotationsEnabledX=!0,this.rotationsEnabledY=!0,this.rotationsEnabledZ=!0,this.linearDamping=0,this.angularDamping=0,this.canSleep=!0,this.sleeping=!1,this.ccdEnabled=!1,this.softCcdPrediction=0,this.dominanceGroup=0,this.additionalSolverIterations=0}static dynamic(){return new n(Fn.Dynamic)}static kinematicPositionBased(){return new n(Fn.KinematicPositionBased)}static kinematicVelocityBased(){return new n(Fn.KinematicVelocityBased)}static fixed(){return new n(Fn.Fixed)}static newDynamic(){return new n(Fn.Dynamic)}static newKinematicPositionBased(){return new n(Fn.KinematicPositionBased)}static newKinematicVelocityBased(){return new n(Fn.KinematicVelocityBased)}static newStatic(){return new n(Fn.Fixed)}setDominanceGroup(t){return this.dominanceGroup=t,this}setAdditionalSolverIterations(t){return this.additionalSolverIterations=t,this}setEnabled(t){return this.enabled=t,this}setTranslation(t,e,i){if(typeof t!="number"||typeof e!="number"||typeof i!="number")throw TypeError("The translation components must be numbers.");return this.translation={x:t,y:e,z:i},this}setRotation(t){return Wt.copy(this.rotation,t),this}setGravityScale(t){return this.gravityScale=t,this}setAdditionalMass(t){return this.mass=t,this.massOnly=!0,this}setLinvel(t,e,i){if(typeof t!="number"||typeof e!="number"||typeof i!="number")throw TypeError("The linvel components must be numbers.");return this.linvel={x:t,y:e,z:i},this}setAngvel(t){return D.copy(this.angvel,t),this}setAdditionalMassProperties(t,e,i,r){return this.mass=t,D.copy(this.centerOfMass,e),D.copy(this.principalAngularInertia,i),Wt.copy(this.angularInertiaLocalFrame,r),this.massOnly=!1,this}enabledTranslations(t,e,i){return this.translationsEnabledX=t,this.translationsEnabledY=e,this.translationsEnabledZ=i,this}restrictTranslations(t,e,i){return this.enabledTranslations(t,e,i)}lockTranslations(){return this.enabledTranslations(!1,!1,!1)}enabledRotations(t,e,i){return this.rotationsEnabledX=t,this.rotationsEnabledY=e,this.rotationsEnabledZ=i,this}restrictRotations(t,e,i){return this.enabledRotations(t,e,i)}lockRotations(){return this.restrictRotations(!1,!1,!1)}setLinearDamping(t){return this.linearDamping=t,this}setAngularDamping(t){return this.angularDamping=t,this}setCanSleep(t){return this.canSleep=t,this}setSleeping(t){return this.sleeping=t,this}setCcdEnabled(t){return this.ccdEnabled=t,this}setSoftCcdPrediction(t){return this.softCcdPrediction=t,this}setUserData(t){return this.userData=t,this}},Ua=class{constructor(){this.fconv=new Float64Array(1),this.uconv=new Uint32Array(this.fconv.buffer),this.data=new Array,this.size=0}set(t,e){let i=this.index(t);for(;this.data.length<=i;)this.data.push(null);this.data[i]==null&&(this.size+=1),this.data[i]=e}len(){return this.size}delete(t){let e=this.index(t);e<this.data.length&&(this.data[e]!=null&&(this.size-=1),this.data[e]=null)}clear(){this.data=new Array}get(t){let e=this.index(t);return e<this.data.length?this.data[e]:null}forEach(t){for(let e of this.data)e!=null&&t(e)}getAll(){return this.data.filter((t=>t!=null))}index(t){return this.fconv[0]=t,this.uconv[0]}},Yu=class{constructor(t){this.raw=t||new Ae,this.map=new Ua,t&&t.forEachRigidBodyHandle((e=>{this.map.set(e,new zl(t,null,e))}))}free(){this.raw&&this.raw.free(),this.raw=void 0,this.map&&this.map.clear(),this.map=void 0}finalizeDeserialization(t){this.map.forEach((e=>e.finalizeDeserialization(t)))}createRigidBody(t,e){let i=D.intoRaw(e.translation),r=Wt.intoRaw(e.rotation),s=D.intoRaw(e.linvel),a=D.intoRaw(e.centerOfMass),o=D.intoRaw(e.angvel),l=D.intoRaw(e.principalAngularInertia),c=Wt.intoRaw(e.angularInertiaLocalFrame),h=this.raw.createRigidBody(e.enabled,i,r,e.gravityScale,e.mass,e.massOnly,a,s,o,l,c,e.translationsEnabledX,e.translationsEnabledY,e.translationsEnabledZ,e.rotationsEnabledX,e.rotationsEnabledY,e.rotationsEnabledZ,e.linearDamping,e.angularDamping,e.status,e.canSleep,e.sleeping,e.softCcdPrediction,e.ccdEnabled,e.dominanceGroup,e.additionalSolverIterations);i.free(),r.free(),s.free(),a.free(),o.free(),l.free(),c.free();let d=new zl(this.raw,t,h);return d.userData=e.userData,this.map.set(h,d),d}remove(t,e,i,r,s){for(let a=0;a<this.raw.rbNumColliders(t);a+=1)i.unmap(this.raw.rbCollider(t,a));r.forEachJointHandleAttachedToRigidBody(t,(a=>r.unmap(a))),s.forEachJointHandleAttachedToRigidBody(t,(a=>s.unmap(a))),this.raw.remove(t,e.raw,i.raw,r.raw,s.raw),this.map.delete(t)}len(){return this.map.len()}contains(t){return this.get(t)!=null}get(t){return this.map.get(t)}forEach(t){this.map.forEach(t)}forEachActiveRigidBody(t,e){t.forEachActiveRigidBodyHandle((i=>{e(this.get(i))}))}getAll(){return this.map.getAll()}},Ju=class{constructor(t){this.raw=t||new Sr}free(){this.raw&&this.raw.free(),this.raw=void 0}get dt(){return this.raw.dt}get contact_erp(){return this.raw.contact_erp}get lengthUnit(){return this.raw.lengthUnit}get normalizedAllowedLinearError(){return this.raw.normalizedAllowedLinearError}get normalizedPredictionDistance(){return this.raw.normalizedPredictionDistance}get numSolverIterations(){return this.raw.numSolverIterations}get numInternalPgsIterations(){return this.raw.numInternalPgsIterations}get maxCcdSubsteps(){return this.raw.maxCcdSubsteps}set dt(t){this.raw.dt=t}set contact_natural_frequency(t){this.raw.contact_natural_frequency=t}set lengthUnit(t){this.raw.lengthUnit=t}set normalizedAllowedLinearError(t){this.raw.normalizedAllowedLinearError=t}set normalizedPredictionDistance(t){this.raw.normalizedPredictionDistance=t}set numSolverIterations(t){this.raw.numSolverIterations=t}set numInternalPgsIterations(t){this.raw.numInternalPgsIterations=t}set maxCcdSubsteps(t){this.raw.maxCcdSubsteps=t}};(function(n){n[n.Revolute=0]="Revolute",n[n.Fixed=1]="Fixed",n[n.Prismatic=2]="Prismatic",n[n.Rope=3]="Rope",n[n.Spring=4]="Spring",n[n.Spherical=5]="Spherical",n[n.Generic=6]="Generic"})(xi||(xi={})),(function(n){n[n.AccelerationBased=0]="AccelerationBased",n[n.ForceBased=1]="ForceBased"})(um||(um={})),(function(n){n[n.LinX=0]="LinX",n[n.LinY=1]="LinY",n[n.LinZ=2]="LinZ",n[n.AngX=3]="AngX",n[n.AngY=4]="AngY",n[n.AngZ=5]="AngZ"})(dm||(dm={})),(function(n){n[n.LinX=1]="LinX",n[n.LinY=2]="LinY",n[n.LinZ=4]="LinZ",n[n.AngX=8]="AngX",n[n.AngY=16]="AngY",n[n.AngZ=32]="AngZ"})(fm||(fm={}));var Vn=class n{constructor(t,e,i){this.rawSet=t,this.bodySet=e,this.handle=i}static newTyped(t,e,i){switch(t.jointType(i)){case Un.Revolute:return new Qu(t,e,i);case Un.Prismatic:return new Ku(t,e,i);case Un.Fixed:return new ju(t,e,i);case Un.Spring:return new $u(t,e,i);case Un.Rope:return new Zu(t,e,i);case Un.Spherical:return new ed(t,e,i);case Un.Generic:return new td(t,e,i);default:return new n(t,e,i)}}finalizeDeserialization(t){this.bodySet=t}isValid(){return this.rawSet.contains(this.handle)}body1(){return this.bodySet.get(this.rawSet.jointBodyHandle1(this.handle))}body2(){return this.bodySet.get(this.rawSet.jointBodyHandle2(this.handle))}type(){return this.rawSet.jointType(this.handle)}frameX1(t){return this.rawSet.jointFrameX1(this.handle,q),Wt.fromBuffer(q,t)}frameX2(t){return this.rawSet.jointFrameX2(this.handle,q),Wt.fromBuffer(q,t)}anchor1(t){return this.rawSet.jointAnchor1(this.handle,q),D.fromBuffer(q,t)}anchor2(t){return this.rawSet.jointAnchor2(this.handle,q),D.fromBuffer(q,t)}setAnchor1(t){let e=D.intoRaw(t);this.rawSet.jointSetAnchor1(this.handle,e),e.free()}setAnchor2(t){let e=D.intoRaw(t);this.rawSet.jointSetAnchor2(this.handle,e),e.free()}setFrameX1(t){let e=Wt.intoRaw(t);this.rawSet.jointSetFrameX1(this.handle,e),e.free()}setFrameX2(t){let e=Wt.intoRaw(t);this.rawSet.jointSetFrameX2(this.handle,e),e.free()}setLocalFrame1(t,e){let i=D.intoRaw(t),r=Wt.intoRaw(e);this.rawSet.jointSetLocalFrame1(this.handle,i,r),i.free(),r.free()}setLocalFrame2(t,e){let i=D.intoRaw(t),r=Wt.intoRaw(e);this.rawSet.jointSetLocalFrame2(this.handle,i,r),i.free(),r.free()}setContactsEnabled(t){this.rawSet.jointSetContactsEnabled(this.handle,t)}contactsEnabled(){return this.rawSet.jointContactsEnabled(this.handle)}},kl=class extends Vn{limitsEnabled(){return this.rawSet.jointLimitsEnabled(this.handle,this.rawAxis())}limitsMin(){return this.rawSet.jointLimitsMin(this.handle,this.rawAxis())}limitsMax(){return this.rawSet.jointLimitsMax(this.handle,this.rawAxis())}setLimits(t,e){this.rawSet.jointSetLimits(this.handle,this.rawAxis(),t,e)}configureMotorModel(t){this.rawSet.jointConfigureMotorModel(this.handle,this.rawAxis(),t)}setMotorMaxForce(t){this.rawSet.jointSetMotorMaxForce(this.handle,this.rawAxis(),t)}configureMotorVelocity(t,e){this.rawSet.jointConfigureMotorVelocity(this.handle,this.rawAxis(),t,e)}configureMotorPosition(t,e,i){this.rawSet.jointConfigureMotorPosition(this.handle,this.rawAxis(),t,e,i)}configureMotor(t,e,i,r){this.rawSet.jointConfigureMotor(this.handle,this.rawAxis(),t,e,i,r)}},ju=class extends Vn{},Zu=class extends Vn{},$u=class extends Vn{},Ku=class extends kl{rawAxis(){return Md.LinX}},Qu=class extends kl{rawAxis(){return Md.AngX}},td=class extends Vn{},ed=class extends Vn{configureMotorModel(t,e){this.rawSet.jointConfigureMotorModel(this.handle,t,e)}setMotorMaxForce(t,e){this.rawSet.jointSetMotorMaxForce(this.handle,t,e)}configureMotorVelocity(t,e,i){this.rawSet.jointConfigureMotorVelocity(this.handle,t,e,i)}configureMotorPosition(t,e,i,r){this.rawSet.jointConfigureMotorPosition(this.handle,t,e,i,r)}configureMotor(t,e,i,r,s){this.rawSet.jointConfigureMotor(this.handle,t,e,i,r,s)}},vm=class n{constructor(){}static fixed(t,e,i,r){let s=new n;return s.anchor1=t,s.anchor2=i,s.frame1=e,s.frame2=r,s.jointType=xi.Fixed,s}static spring(t,e,i,r,s){let a=new n;return a.anchor1=r,a.anchor2=s,a.length=t,a.stiffness=e,a.damping=i,a.jointType=xi.Spring,a}static rope(t,e,i){let r=new n;return r.anchor1=e,r.anchor2=i,r.length=t,r.jointType=xi.Rope,r}static generic(t,e,i,r){let s=new n;return s.anchor1=t,s.anchor2=e,s.axis=i,s.axesMask=r,s.jointType=xi.Generic,s}static spherical(t,e){let i=new n;return i.anchor1=t,i.anchor2=e,i.jointType=xi.Spherical,i}static prismatic(t,e,i){let r=new n;return r.anchor1=t,r.anchor2=e,r.axis=i,r.jointType=xi.Prismatic,r}static revolute(t,e,i){let r=new n;return r.anchor1=t,r.anchor2=e,r.axis=i,r.jointType=xi.Revolute,r}static revoluteWithAxes(t,e,i,r){let s=new n;return s.anchor1=t,s.anchor2=e,s.axis=i,s.axis1=i,s.axis2=r,s.jointType=xi.Revolute,s}intoRaw(){let t,e,i=D.intoRaw(this.anchor1),r=D.intoRaw(this.anchor2),s=!1,a=0,o=0;switch(this.jointType){case xi.Fixed:let l=Wt.intoRaw(this.frame1),c=Wt.intoRaw(this.frame2);e=Zi.fixed(i,l,r,c),l.free(),c.free();break;case xi.Spring:e=Zi.spring(this.length,this.stiffness,this.damping,i,r);break;case xi.Rope:e=Zi.rope(this.length,i,r);break;case xi.Prismatic:t=D.intoRaw(this.axis),this.limitsEnabled&&(s=!0,a=this.limits[0],o=this.limits[1]),e=Zi.prismatic(i,r,t,s,a,o),t.free();break;case xi.Generic:t=D.intoRaw(this.axis);let h=this.axesMask;e=Zi.generic(i,r,t,h);break;case xi.Spherical:e=Zi.spherical(i,r);break;case xi.Revolute:if(this.axis1&&this.axis2){let d=D.intoRaw(this.axis1),u=D.intoRaw(this.axis2);e=Zi.revoluteWithAxes(i,r,d,u),d.free(),u.free()}else t=D.intoRaw(this.axis),e=Zi.revolute(i,r,t),t.free()}return i.free(),r.free(),e}},id=class{constructor(t){this.raw=t||new zn,this.map=new Ua,t&&t.forEachJointHandle((e=>{this.map.set(e,Vn.newTyped(t,null,e))}))}free(){this.raw&&this.raw.free(),this.raw=void 0,this.map&&this.map.clear(),this.map=void 0}finalizeDeserialization(t){this.map.forEach((e=>e.finalizeDeserialization(t)))}createJoint(t,e,i,r,s){let a=e.intoRaw(),o=this.raw.createJoint(a,i,r,s);a.free();let l=Vn.newTyped(this.raw,t,o);return this.map.set(o,l),l}remove(t,e){this.raw.remove(t,e),this.unmap(t)}forEachJointHandleAttachedToRigidBody(t,e){this.raw.forEachJointAttachedToRigidBody(t,e)}unmap(t){this.map.delete(t)}len(){return this.map.len()}contains(t){return this.get(t)!=null}get(t){return this.map.get(t)}forEach(t){this.map.forEach(t)}getAll(){return this.map.getAll()}},qr=class n{constructor(t,e){this.rawSet=t,this.handle=e}static newTyped(t,e){switch(t.jointType(e)){case Un.Revolute:return new sd(t,e);case Un.Prismatic:return new rd(t,e);case Un.Fixed:return new nd(t,e);case Un.Spherical:return new ad(t,e);default:return new n(t,e)}}isValid(){return this.rawSet.contains(this.handle)}setContactsEnabled(t){this.rawSet.jointSetContactsEnabled(this.handle,t)}contactsEnabled(){return this.rawSet.jointContactsEnabled(this.handle)}},Hl=class extends qr{},nd=class extends qr{},rd=class extends Hl{rawAxis(){return Md.LinX}},sd=class extends Hl{rawAxis(){return Md.AngX}},ad=class extends qr{},od=class{constructor(t){this.raw=t||new Hn,this.map=new Ua,t&&t.forEachJointHandle((e=>{this.map.set(e,qr.newTyped(this.raw,e))}))}free(){this.raw&&this.raw.free(),this.raw=void 0,this.map&&this.map.clear(),this.map=void 0}createJoint(t,e,i,r){let s=t.intoRaw(),a=this.raw.createJoint(s,e,i,r);s.free();let o=qr.newTyped(this.raw,a);return this.map.set(a,o),o}remove(t,e){this.raw.remove(t,e),this.map.delete(t)}unmap(t){this.map.delete(t)}len(){return this.map.len()}contains(t){return this.get(t)!=null}get(t){return this.map.get(t)}forEach(t){this.map.forEach(t)}forEachJointHandleAttachedToRigidBody(t,e){this.raw.forEachJointAttachedToRigidBody(t,e)}getAll(){return this.map.getAll()}};(function(n){n[n.Average=0]="Average",n[n.Min=1]="Min",n[n.Multiply=2]="Multiply",n[n.Max=3]="Max"})(Bl||(Bl={}));var ld=class{constructor(t){this.raw=t||new _s}free(){this.raw&&this.raw.free(),this.raw=void 0}},cd=class{constructor(t){this.raw=t||new kn}free(){this.raw&&this.raw.free(),this.raw=void 0}forEachActiveRigidBodyHandle(t){this.raw.forEachActiveRigidBodyHandle(t)}};(function(n){n[n.Vertex=0]="Vertex",n[n.Edge=1]="Edge",n[n.Face=2]="Face",n[n.Unknown=3]="Unknown"})(Fa||(Fa={}));var xm=class{constructor(t,e){this.origin=t,this.dir=e}pointAt(t){return{x:this.origin.x+this.dir.x*t,y:this.origin.y+this.dir.y*t,z:this.origin.z+this.dir.z*t}}},Vl=class n{constructor(t,e,i,r){this.featureType=Fa.Unknown,this.featureId=void 0,this.timeOfImpact=t,this.normal=e,r!==void 0&&(this.featureId=r),i!==void 0&&(this.featureType=i)}static fromBuffer(t,e){return t?(t.normal(q),e!=null||(e=new n(0,D.zeros())),e.timeOfImpact=t.time_of_impact(),e.normal=D.fromBuffer(q,e.normal),e.featureType=t.featureType(),e.featureId=t.featureId(),t.free(),e):null}},Gl=class n{constructor(t,e,i,r,s){this.featureType=Fa.Unknown,this.featureId=void 0,this.collider=t,this.timeOfImpact=e,this.normal=i,s!==void 0&&(this.featureId=s),r!==void 0&&(this.featureType=r)}static fromBuffer(t,e,i){return e?(e.normal(q),i!=null||(i=new n(null,0,D.zeros())),i.collider=t.get(e.colliderHandle()),i.timeOfImpact=e.time_of_impact(),i.normal=D.fromBuffer(q,i.normal),i.featureType=e.featureType(),i.featureId=e.featureId(),e.free(),i):null}},hd=class n{constructor(t,e){this.collider=t,this.timeOfImpact=e}static fromRaw(t,e){if(!e)return null;let i=new n(t.get(e.colliderHandle()),e.timeOfImpact());return e.free(),i}},Wl=class n{constructor(t,e){this.point=t,this.isInside=e}static fromBuffer(t,e){return t?(t.point(q),e!=null||(e=new n(D.zeros(),!1)),e.point=D.fromBuffer(q,e.point),e.isInside=t.isInside(),t.free(),e):null}},Xl=class n{constructor(t,e,i,r,s){this.featureType=Fa.Unknown,this.featureId=void 0,this.collider=t,this.point=e,this.isInside=i,s!==void 0&&(this.featureId=s),r!==void 0&&(this.featureType=r)}static fromBuffer(t,e,i){return e?(e.point(q),i!=null||(i=new n(null,D.zeros(),!1)),i.collider=t.get(e.colliderHandle()),i.point=D.fromBuffer(q,i.point),i.isInside=e.isInside(),i.featureType=e.featureType(),i.featureId=e.featureId(),e.free(),i):null}},Oa=class n{constructor(t,e,i,r,s){this.time_of_impact=t,this.witness1=e,this.witness2=i,this.normal1=r,this.normal2=s}static fromBuffer(t,e,i){return e?(i!=null||(i=new n(0,D.zeros(),D.zeros(),D.zeros(),D.zeros())),i.time_of_impact=e[0],i.witness1.x=e[1],i.witness1.y=e[2],i.witness1.z=e[3],i.witness2.x=e[4],i.witness2.y=e[5],i.witness2.z=e[6],i.normal1.x=e[7],i.normal1.y=e[8],i.normal1.z=e[9],i.normal2.x=e[10],i.normal2.y=e[11],i.normal2.z=e[12],i):null}},ql=class n extends Oa{constructor(t,e,i,r,s,a){super(e,i,r,s,a),this.collider=t}static fromBuffer(t,e,i){return e?(i!=null||(i=new n(null,0,D.zeros(),D.zeros(),D.zeros(),D.zeros())),i.collider=t,i.time_of_impact=e[0],i.witness1.x=e[1],i.witness1.y=e[2],i.witness1.z=e[3],i.witness2.x=e[4],i.witness2.y=e[5],i.witness2.z=e[6],i.normal1.x=e[7],i.normal1.y=e[8],i.normal1.z=e[9],i.normal2.x=e[10],i.normal2.y=e[11],i.normal2.z=e[12],i):null}},ud=class{constructor(t){this.raw=t||new Bn}free(){this.raw&&this.raw.free(),this.raw=void 0}castRay(t,e,i,r,s,a,o,l,c,h,d){let u=D.intoRaw(r.origin),f=D.intoRaw(r.dir),m=hd.fromRaw(i,this.raw.castRay(t.raw,e.raw,i.raw,u,f,s,a,o,l,c,h,d));return u.free(),f.free(),m}castRayAndGetNormal(t,e,i,r,s,a,o,l,c,h,d,u){let f=D.intoRaw(r.origin),m=D.intoRaw(r.dir),w=Gl.fromBuffer(i,this.raw.castRayAndGetNormal(t.raw,e.raw,i.raw,f,m,s,a,o,l,c,h,d),u);return f.free(),m.free(),w}intersectionsWithRay(t,e,i,r,s,a,o,l,c,h,d,u){let f=D.intoRaw(r.origin),m=D.intoRaw(r.dir);this.raw.intersectionsWithRay(t.raw,e.raw,i.raw,f,m,s,a,(w=>o(Gl.fromBuffer(i,w))),l,c,h,d,u),f.free(),m.free()}intersectionWithShape(t,e,i,r,s,a,o,l,c,h,d){let u=D.intoRaw(r),f=Wt.intoRaw(s),m=a.intoRaw(),w=this.raw.intersectionWithShape(t.raw,e.raw,i.raw,u,f,m,o,l,c,h,d);return u.free(),f.free(),m.free(),w}projectPoint(t,e,i,r,s,a,o,l,c,h,d){let u=D.intoRaw(r),f=Xl.fromBuffer(i,this.raw.projectPoint(t.raw,e.raw,i.raw,u,s,a,o,l,c,h),d);return u.free(),f}projectPointAndGetFeature(t,e,i,r,s,a,o,l,c,h){let d=D.intoRaw(r),u=Xl.fromBuffer(i,this.raw.projectPointAndGetFeature(t.raw,e.raw,i.raw,d,s,a,o,l,c),h);return d.free(),u}intersectionsWithPoint(t,e,i,r,s,a,o,l,c,h){let d=D.intoRaw(r);this.raw.intersectionsWithPoint(t.raw,e.raw,i.raw,d,s,a,o,l,c,h),d.free()}castShape(t,e,i,r,s,a,o,l,c,h,d,u,f,m,w,g){let _=D.intoRaw(r),b=Wt.intoRaw(s),T=D.intoRaw(a),v=o.intoRaw(),E=this.raw.castShape(t.raw,e.raw,i.raw,_,b,T,v,l,c,h,d,u,f,m,w),R=null;if(E){let I=E.colliderHandle();E.getComponents(q),R=ql.fromBuffer(i.get(I),q,g),E.free()}return _.free(),b.free(),T.free(),v.free(),R}intersectionsWithShape(t,e,i,r,s,a,o,l,c,h,d,u){let f=D.intoRaw(r),m=Wt.intoRaw(s),w=a.intoRaw();this.raw.intersectionsWithShape(t.raw,e.raw,i.raw,f,m,w,o,l,c,h,d,u),f.free(),m.free(),w.free()}collidersWithAabbIntersectingAabb(t,e,i,r,s,a){let o=D.intoRaw(r),l=D.intoRaw(s);this.raw.collidersWithAabbIntersectingAabb(t.raw,e.raw,i.raw,o,l,a),o.free(),l.free()}},dd=class{constructor(t){this.raw=t||new ri,this.tempManifold=new fd(null)}free(){this.raw&&this.raw.free(),this.raw=void 0}contactPairsWith(t,e){this.raw.contact_pairs_with(t,e)}intersectionPairsWith(t,e){this.raw.intersection_pairs_with(t,e)}contactPair(t,e,i,r){let s=this.raw.contact_pair(t,e);if(s){let a=s.collider1()!=t,o;for(o=0;o<s.numContactManifolds();++o)this.tempManifold.bodies=i,this.tempManifold.raw=s.contactManifold(o),this.tempManifold.raw&&r(this.tempManifold,a),this.tempManifold.free();s.free()}}intersectionPair(t,e){return this.raw.intersection_pair(t,e)}},fd=class{constructor(t,e){this.raw=t,this.bodies=e}free(){this.raw&&this.raw.free(),this.raw=void 0}normal(t){return this.raw.normal(q),D.fromBuffer(q,t)}localNormal1(t){return this.raw.local_n1(q),D.fromBuffer(q,t)}localNormal2(t){return this.raw.local_n2(q),D.fromBuffer(q,t)}subshape1(){return this.raw.subshape1()}subshape2(){return this.raw.subshape2()}numContacts(){return this.raw.num_contacts()}localContactPoint1(t,e){return this.raw.contact_local_p1(t,q)?D.fromBuffer(q,e):null}localContactPoint2(t,e){return this.raw.contact_local_p2(t,q)?D.fromBuffer(q,e):null}contactDist(t){return this.raw.contact_dist(t)}contactFid1(t){return this.raw.contact_fid1(t)}contactFid2(t){return this.raw.contact_fid2(t)}contactImpulse(t){return this.raw.contact_impulse(t)}contactTangentImpulseX(t){return this.raw.contact_tangent_impulse_x(t)}contactTangentImpulseY(t){return this.raw.contact_tangent_impulse_y(t)}numSolverContacts(){return this.raw.num_solver_contacts()}solverContactPoint(t,e){return this.raw.solver_contact_point(this.bodies.raw,t,q)?D.fromBuffer(q,e):null}solverContactDist(t){return this.raw.solver_contact_dist(t)}friction(){return this.raw.friction()}restitution(){return this.raw.restitution()}solverContactTangentVelocity(t,e){return this.raw.solver_contact_tangent_velocity(t,q),D.fromBuffer(q,e)}},Ba=class n{constructor(t,e,i,r,s){this.distance=t,this.point1=e,this.point2=i,this.normal1=r,this.normal2=s}static fromBuffer(t,e){return t?(t.getComponents(q),t.free(),e!=null||(e=new n(0,D.zeros(),D.zeros(),D.zeros(),D.zeros())),e.distance=q[0],e.point1.x=q[1],e.point1.y=q[2],e.point1.z=q[3],e.point2.x=q[4],e.point2.y=q[5],e.point2.z=q[6],e.normal1.x=q[7],e.normal1.y=q[8],e.normal1.z=q[9],e.normal2.x=q[10],e.normal2.y=q[11],e.normal2.z=q[12],e):null}},Ye=class{static fromRaw(t,e){let i=t.coShapeType(e);if(i===te.Compound)return Ja.fromRawShape(t.coShape(e));let r,s,a,o,l,c;switch(i){case te.Ball:return new za(t.coRadius(e));case te.Cuboid:return t.coHalfExtents(e,q),new ka(q[0],q[1],q[2]);case te.RoundCuboid:return r=t.coRoundRadius(e),t.coHalfExtents(e,q),new Ha(q[0],q[1],q[2],r);case te.Capsule:return o=t.coHalfHeight(e),l=t.coRadius(e),new Va(o,l);case te.Segment:return s=t.coVertices(e),new Ga(D.new(s[0],s[1],s[2]),D.new(s[3],s[4],s[5]));case te.Polyline:return s=t.coVertices(e),a=t.coIndices(e),new qa(s,a);case te.Triangle:return s=t.coVertices(e),new Wa(D.new(s[0],s[1],s[2]),D.new(s[3],s[4],s[5]),D.new(s[6],s[7],s[8]));case te.RoundTriangle:return s=t.coVertices(e),r=t.coRoundRadius(e),new Xa(D.new(s[0],s[1],s[2]),D.new(s[3],s[4],s[5]),D.new(s[6],s[7],s[8]),r);case te.HalfSpace:return t.coHalfspaceNormal(e,q),c=D.fromBuffer(q),new Yl(c);case te.Voxels:let h=t.coVoxelData(e),d=t.coVoxelSize(e);return new Ya(h,d);case te.TriMesh:s=t.coVertices(e),a=t.coIndices(e);let u=t.coTriMeshFlags(e);return new ja(s,a,u);case te.HeightField:let f=t.coHeightfieldHeights(e);t.coHeightfieldScale(e,q);let m={x:q[0],y:q[1],z:q[2]},w=t.coHeightfieldNRows(e),g=t.coHeightfieldNCols(e),_=t.coHeightFieldFlags(e);return new Za(w,g,f,m,_);case te.ConvexPolyhedron:return s=t.coVertices(e),a=t.coIndices(e),new ws(s,a);case te.RoundConvexPolyhedron:return s=t.coVertices(e),a=t.coIndices(e),r=t.coRoundRadius(e),new ys(s,a,r);case te.Cylinder:return o=t.coHalfHeight(e),l=t.coRadius(e),new $a(o,l);case te.RoundCylinder:return o=t.coHalfHeight(e),l=t.coRadius(e),r=t.coRoundRadius(e),new Ka(o,l,r);case te.Cone:return o=t.coHalfHeight(e),l=t.coRadius(e),new Qa(o,l);case te.RoundCone:return o=t.coHalfHeight(e),l=t.coRadius(e),r=t.coRoundRadius(e),new to(o,l,r);default:throw new Error("unknown shape type: "+i)}}static fromRawShape(t){if(!t)return null;let e,i,r,s,a,o,l,c=t.shapeType();try{switch(c){case te.Ball:return new za(t.radius());case te.Cuboid:return e=D.fromRaw(t.halfExtents()),new ka(e.x,e.y,e.z);case te.RoundCuboid:return e=D.fromRaw(t.halfExtents()),i=t.roundRadius(),new Ha(e.x,e.y,e.z,i);case te.Capsule:return a=t.halfHeight(),o=t.radius(),new Va(a,o);case te.Segment:return r=t.vertices(),new Ga(D.new(r[0],r[1],r[2]),D.new(r[3],r[4],r[5]));case te.Polyline:return r=t.vertices(),s=t.indices(),new qa(r,s);case te.Triangle:return r=t.vertices(),new Wa(D.new(r[0],r[1],r[2]),D.new(r[3],r[4],r[5]),D.new(r[6],r[7],r[8]));case te.RoundTriangle:return r=t.vertices(),i=t.roundRadius(),new Xa(D.new(r[0],r[1],r[2]),D.new(r[3],r[4],r[5]),D.new(r[6],r[7],r[8]),i);case te.HalfSpace:return l=D.fromRaw(t.halfspaceNormal()),new Yl(l);case te.Voxels:let h=t.voxelData(),d=D.fromRaw(t.voxelSize());return new Ya(h,d);case te.TriMesh:r=t.vertices(),s=t.indices();let u=t.triMeshFlags();return new ja(r,s,u);case te.HeightField:let f=D.fromRaw(t.heightfieldScale()),m=t.heightfieldHeights(),w=t.heightfieldNRows(),g=t.heightfieldNCols(),_=t.heightFieldFlags();return new Za(w,g,m,f,_);case te.ConvexPolyhedron:{let b=t.convexMeshData();if(!b)throw new Error("Failed to compute the convex hull of a convex polyhedron shape.");return r=b.vertices,s=b.indices,b.free(),new ws(r,s)}case te.RoundConvexPolyhedron:{let b=t.convexMeshData();if(!b)throw new Error("Failed to compute the convex hull of a convex polyhedron shape.");return r=b.vertices,s=b.indices,b.free(),i=t.roundRadius(),new ys(r,s,i)}case te.Cylinder:return a=t.halfHeight(),o=t.radius(),new $a(a,o);case te.RoundCylinder:return a=t.halfHeight(),o=t.radius(),i=t.roundRadius(),new Ka(a,o,i);case te.Cone:return a=t.halfHeight(),o=t.radius(),new Qa(a,o);case te.RoundCone:return a=t.halfHeight(),o=t.radius(),i=t.roundRadius(),new to(a,o,i);case te.Compound:return Ja.fromRawShape(t);default:throw new Error("unknown shape type: "+c)}}finally{c!==te.Compound&&t.free()}}castShape(t,e,i,r,s,a,o,l,c,h,d){let u=D.intoRaw(t),f=Wt.intoRaw(e),m=D.intoRaw(i),w=D.intoRaw(s),g=Wt.intoRaw(a),_=D.intoRaw(o),b=this.intoRaw(),T=r.intoRaw(),v=b.castShape(u,f,m,T,w,g,_,l,c,h),E=null;return v&&(v.getComponents(q),E=Oa.fromBuffer(null,q,d),v.free()),u.free(),f.free(),m.free(),w.free(),g.free(),_.free(),b.free(),T.free(),E}intersectsShape(t,e,i,r,s){let a=D.intoRaw(t),o=Wt.intoRaw(e),l=D.intoRaw(r),c=Wt.intoRaw(s),h=this.intoRaw(),d=i.intoRaw(),u=h.intersectsShape(a,o,d,l,c);return a.free(),o.free(),l.free(),c.free(),h.free(),d.free(),u}contactShape(t,e,i,r,s,a,o){let l=D.intoRaw(t),c=Wt.intoRaw(e),h=D.intoRaw(r),d=Wt.intoRaw(s),u=this.intoRaw(),f=i.intoRaw(),m=Ba.fromBuffer(u.contactShape(l,c,f,h,d,a),o);return l.free(),c.free(),h.free(),d.free(),u.free(),f.free(),m}containsPoint(t,e,i){let r=D.intoRaw(t),s=Wt.intoRaw(e),a=D.intoRaw(i),o=this.intoRaw(),l=o.containsPoint(r,s,a);return r.free(),s.free(),a.free(),o.free(),l}projectPoint(t,e,i,r,s){let a=D.intoRaw(t),o=Wt.intoRaw(e),l=D.intoRaw(i),c=this.intoRaw(),h=Wl.fromBuffer(c.projectPoint(a,o,l,r),s);return a.free(),o.free(),l.free(),c.free(),h}intersectsRay(t,e,i,r){let s=D.intoRaw(e),a=Wt.intoRaw(i),o=D.intoRaw(t.origin),l=D.intoRaw(t.dir),c=this.intoRaw(),h=c.intersectsRay(s,a,o,l,r);return s.free(),a.free(),o.free(),l.free(),c.free(),h}castRay(t,e,i,r,s){let a=D.intoRaw(e),o=Wt.intoRaw(i),l=D.intoRaw(t.origin),c=D.intoRaw(t.dir),h=this.intoRaw(),d=h.castRay(a,o,l,c,r,s);return a.free(),o.free(),l.free(),c.free(),h.free(),d}castRayAndGetNormal(t,e,i,r,s,a){let o=D.intoRaw(e),l=Wt.intoRaw(i),c=D.intoRaw(t.origin),h=D.intoRaw(t.dir),d=this.intoRaw(),u=Vl.fromBuffer(d.castRayAndGetNormal(o,l,c,h,r,s),a);return o.free(),l.free(),c.free(),h.free(),d.free(),u}};(function(n){n[n.Ball=0]="Ball",n[n.Cuboid=1]="Cuboid",n[n.Capsule=2]="Capsule",n[n.Segment=3]="Segment",n[n.Polyline=4]="Polyline",n[n.Triangle=5]="Triangle",n[n.TriMesh=6]="TriMesh",n[n.HeightField=7]="HeightField",n[n.Compound=8]="Compound",n[n.ConvexPolyhedron=9]="ConvexPolyhedron",n[n.Cylinder=10]="Cylinder",n[n.Cone=11]="Cone",n[n.RoundCuboid=12]="RoundCuboid",n[n.RoundTriangle=13]="RoundTriangle",n[n.RoundCylinder=14]="RoundCylinder",n[n.RoundCone=15]="RoundCone",n[n.RoundConvexPolyhedron=16]="RoundConvexPolyhedron",n[n.HalfSpace=17]="HalfSpace",n[n.Voxels=18]="Voxels"})(ti||(ti={})),(function(n){n[n.FIX_INTERNAL_EDGES=1]="FIX_INTERNAL_EDGES"})(pm||(pm={})),(function(n){n[n.DELETE_BAD_TOPOLOGY_TRIANGLES=4]="DELETE_BAD_TOPOLOGY_TRIANGLES",n[n.ORIENTED=8]="ORIENTED",n[n.MERGE_DUPLICATE_VERTICES=16]="MERGE_DUPLICATE_VERTICES",n[n.DELETE_DEGENERATE_TRIANGLES=32]="DELETE_DEGENERATE_TRIANGLES",n[n.DELETE_DUPLICATE_TRIANGLES=64]="DELETE_DUPLICATE_TRIANGLES",n[n.FIX_INTERNAL_EDGES=144]="FIX_INTERNAL_EDGES"})(mm||(mm={}));var za=class extends Ye{constructor(t){super(),this.type=ti.Ball,this.radius=t}intoRaw(){return se.ball(this.radius)}},Yl=class extends Ye{constructor(t){super(),this.type=ti.HalfSpace,this.normal=t}intoRaw(){let t=D.intoRaw(this.normal),e=se.halfspace(t);return t.free(),e}},ka=class extends Ye{constructor(t,e,i){super(),this.type=ti.Cuboid,this.halfExtents=D.new(t,e,i)}intoRaw(){return se.cuboid(this.halfExtents.x,this.halfExtents.y,this.halfExtents.z)}},Ha=class extends Ye{constructor(t,e,i,r){super(),this.type=ti.RoundCuboid,this.halfExtents=D.new(t,e,i),this.borderRadius=r}intoRaw(){return se.roundCuboid(this.halfExtents.x,this.halfExtents.y,this.halfExtents.z,this.borderRadius)}},Va=class extends Ye{constructor(t,e){super(),this.type=ti.Capsule,this.halfHeight=t,this.radius=e}intoRaw(){return se.capsule(this.halfHeight,this.radius)}},Ga=class extends Ye{constructor(t,e){super(),this.type=ti.Segment,this.a=t,this.b=e}intoRaw(){let t=D.intoRaw(this.a),e=D.intoRaw(this.b),i=se.segment(t,e);return t.free(),e.free(),i}},Wa=class extends Ye{constructor(t,e,i){super(),this.type=ti.Triangle,this.a=t,this.b=e,this.c=i}intoRaw(){let t=D.intoRaw(this.a),e=D.intoRaw(this.b),i=D.intoRaw(this.c),r=se.triangle(t,e,i);return t.free(),e.free(),i.free(),r}},Xa=class extends Ye{constructor(t,e,i,r){super(),this.type=ti.RoundTriangle,this.a=t,this.b=e,this.c=i,this.borderRadius=r}intoRaw(){let t=D.intoRaw(this.a),e=D.intoRaw(this.b),i=D.intoRaw(this.c),r=se.roundTriangle(t,e,i,this.borderRadius);return t.free(),e.free(),i.free(),r}},qa=class extends Ye{constructor(t,e){super(),this.type=ti.Polyline,this.vertices=t,this.indices=e??new Uint32Array(0)}intoRaw(){return se.polyline(this.vertices,this.indices)}},Ya=class extends Ye{constructor(t,e){super(),this.type=ti.Voxels,this.data=t,this.voxelSize=e}intoRaw(){let t,e=D.intoRaw(this.voxelSize);return t=this.data instanceof Int32Array?se.voxels(e,this.data):se.voxelsFromPoints(e,this.data),e.free(),t}},Ja=class n extends Ye{constructor(t,e,i){if(super(),this.type=ti.Compound,t.length!==e.length||t.length!==i.length)throw new Error("shapes, positions, and rotations arrays must have the same length");if(t.length===0)throw new Error("a compound shape must contain at least one shape");if(t.some((r=>r.type===ti.Compound)))throw new Error("nested compound shapes are not allowed");this.shapes=t,this.positions=e,this.rotations=i}static fromRawShape(t){try{let e=t.compoundLen();if(e==null)throw new Error("Expected a raw compound shape.");let i=new Array(e),r=new Array(e),s=new Array(e);for(let a=0;a<e;a++)i[a]=Ye.fromRawShape(t.compoundShape(a)),r[a]=D.fromRaw(t.compoundTranslation(a)),s[a]=Wt.fromRaw(t.compoundRotation(a));return new n(i,r,s)}finally{t.free()}}intoRaw(){let t=this.shapes.map((r=>r.intoRaw())),e=new Float32Array(3*this.positions.length);this.positions.forEach(((r,s)=>{e[3*s]=r.x,e[3*s+1]=r.y,e[3*s+2]=r.z}));let i=new Float32Array(4*this.rotations.length);return this.rotations.forEach(((r,s)=>{i[4*s]=r.x,i[4*s+1]=r.y,i[4*s+2]=r.z,i[4*s+3]=r.w})),se.compound(t,e,i)}},ja=class extends Ye{constructor(t,e,i){super(),this.type=ti.TriMesh,this.vertices=t,this.indices=e,this.flags=i}intoRaw(){return se.trimesh(this.vertices,this.indices,this.flags)}},ws=class extends Ye{constructor(t,e){super(),this.type=ti.ConvexPolyhedron,this.vertices=t,this.indices=e}intoRaw(){return this.indices?se.convexMesh(this.vertices,this.indices):se.convexHull(this.vertices)}},ys=class extends Ye{constructor(t,e,i){super(),this.type=ti.RoundConvexPolyhedron,this.vertices=t,this.indices=e,this.borderRadius=i}intoRaw(){return this.indices?se.roundConvexMesh(this.vertices,this.indices,this.borderRadius):se.roundConvexHull(this.vertices,this.borderRadius)}},Za=class extends Ye{constructor(t,e,i,r,s){super(),this.type=ti.HeightField,this.nrows=t,this.ncols=e,this.heights=i,this.scale=r,this.flags=s}intoRaw(){let t=D.intoRaw(this.scale),e=se.heightfield(this.nrows,this.ncols,this.heights,t,this.flags);return t.free(),e}},$a=class extends Ye{constructor(t,e){super(),this.type=ti.Cylinder,this.halfHeight=t,this.radius=e}intoRaw(){return se.cylinder(this.halfHeight,this.radius)}},Ka=class extends Ye{constructor(t,e,i){super(),this.type=ti.RoundCylinder,this.borderRadius=i,this.halfHeight=t,this.radius=e}intoRaw(){return se.roundCylinder(this.halfHeight,this.radius,this.borderRadius)}},Qa=class extends Ye{constructor(t,e){super(),this.type=ti.Cone,this.halfHeight=t,this.radius=e}intoRaw(){return se.cone(this.halfHeight,this.radius)}},to=class extends Ye{constructor(t,e,i){super(),this.type=ti.RoundCone,this.halfHeight=t,this.radius=e,this.borderRadius=i}intoRaw(){return se.roundCone(this.halfHeight,this.radius,this.borderRadius)}},pd=class{constructor(t){this.raw=t||new Il}free(){this.raw&&this.raw.free(),this.raw=void 0}step(t,e,i,r,s,a,o,l,c,h,d,u){let f=D.intoRaw(t);d?this.raw.stepWithEvents(f,e.raw,i.raw,r.raw,s.raw,a.raw,o.raw,l.raw,c.raw,h.raw,d.raw,u,u?u.filterContactPair:null,u?u.filterIntersectionPair:null):this.raw.step(f,e.raw,i.raw,r.raw,s.raw,a.raw,o.raw,l.raw,c.raw,h.raw),f.free()}},Jl=class{constructor(t){this.raw=t||new Dl}free(){this.raw&&this.raw.free(),this.raw=void 0}serializeAll(t,e,i,r,s,a,o,l,c){let h=D.intoRaw(t),d=this.raw.serializeAll(h,e.raw,i.raw,r.raw,s.raw,a.raw,o.raw,l.raw,c.raw);return h.free(),d}deserializeAll(t){return xd.fromRaw(this.raw.deserializeAll(t))}},md=class{constructor(t,e){this.vertices=t,this.colors=e}},_d=class{constructor(t){this.raw=t||new Rl}free(){this.raw&&this.raw.free(),this.raw=void 0,this.vertices=void 0,this.colors=void 0}render(t,e,i,r,s,a,o){this.raw.render(t.raw,e.raw,i.raw,r.raw,s.raw,a,e.castClosure(o)),this.vertices=this.raw.vertices(),this.colors=this.raw.colors()}},gd=class{},wd=class{constructor(t,e,i,r,s,a){this.params=e,this.bodies=s,this.colliders=a,this.broadPhase=i,this.narrowPhase=r,this.raw=new Pl(t),this.rawCharacterCollision=new Ea,this._applyImpulsesToDynamicBodies=!1,this._characterMass=null}free(){this.raw&&(this.raw.free(),this.rawCharacterCollision.free()),this.raw=void 0,this.rawCharacterCollision=void 0}up(){return this.raw.up()}setUp(t){let e=D.intoRaw(t);return this.raw.setUp(e)}applyImpulsesToDynamicBodies(){return this._applyImpulsesToDynamicBodies}setApplyImpulsesToDynamicBodies(t){this._applyImpulsesToDynamicBodies=t}characterMass(){return this._characterMass}setCharacterMass(t){this._characterMass=t}offset(){return this.raw.offset()}setOffset(t){this.raw.setOffset(t)}normalNudgeFactor(){return this.raw.normalNudgeFactor()}setNormalNudgeFactor(t){this.raw.setNormalNudgeFactor(t)}slideEnabled(){return this.raw.slideEnabled()}setSlideEnabled(t){this.raw.setSlideEnabled(t)}autostepMaxHeight(){return this.raw.autostepMaxHeight()}autostepMinWidth(){return this.raw.autostepMinWidth()}autostepIncludesDynamicBodies(){return this.raw.autostepIncludesDynamicBodies()}autostepEnabled(){return this.raw.autostepEnabled()}enableAutostep(t,e,i){this.raw.enableAutostep(t,e,i)}disableAutostep(){return this.raw.disableAutostep()}maxSlopeClimbAngle(){return this.raw.maxSlopeClimbAngle()}setMaxSlopeClimbAngle(t){this.raw.setMaxSlopeClimbAngle(t)}minSlopeSlideAngle(){return this.raw.minSlopeSlideAngle()}setMinSlopeSlideAngle(t){this.raw.setMinSlopeSlideAngle(t)}snapToGroundDistance(){return this.raw.snapToGroundDistance()}enableSnapToGround(t){this.raw.enableSnapToGround(t)}disableSnapToGround(){this.raw.disableSnapToGround()}snapToGroundEnabled(){return this.raw.snapToGroundEnabled()}computeColliderMovement(t,e,i,r,s){let a=D.intoRaw(e);this.raw.computeColliderMovement(this.params.dt,this.broadPhase.raw,this.narrowPhase.raw,this.bodies.raw,this.colliders.raw,t.handle,a,this._applyImpulsesToDynamicBodies,this._characterMass,i,r,this.colliders.castClosure(s)),a.free()}computedMovement(t){return this.raw.computedMovement(q),D.fromBuffer(q,t)}computedGrounded(){return this.raw.computedGrounded()}numComputedCollisions(){return this.raw.numComputedCollisions()}computedCollision(t,e){if(this.raw.computedCollision(t,this.rawCharacterCollision)){let i=this.rawCharacterCollision;return e=e??new gd,i.translationDeltaApplied(q),e.translationDeltaApplied=D.fromBuffer(q,e.translationDeltaApplied),i.translationDeltaRemaining(q),e.translationDeltaRemaining=D.fromBuffer(q,e.translationDeltaRemaining),e.toi=i.toi(),i.worldWitness1(q),e.witness1=D.fromBuffer(q,e.witness1),i.worldWitness2(q),e.witness2=D.fromBuffer(q,e.witness2),i.worldNormal1(q),e.normal1=D.fromBuffer(q,e.normal1),i.worldNormal2(q),e.normal2=D.fromBuffer(q,e.normal2),e.collider=this.colliders.get(i.handle()),e}return null}};(function(n){n[n.None=0]="None",n[n.LinX=1]="LinX",n[n.LinY=2]="LinY",n[n.LinZ=4]="LinZ",n[n.AngX=8]="AngX",n[n.AngY=16]="AngY",n[n.AngZ=32]="AngZ",n[n.AllLin=7]="AllLin",n[n.AllAng=56]="AllAng",n[n.All=63]="All"})(_m||(_m={}));var yd=class{constructor(t,e,i,r,s,a){this.params=t,this.bodies=e,this.raw=new Ll(i,r,s,a)}free(){this.raw&&this.raw.free(),this.raw=void 0}setKp(t,e){this.raw.set_kp(t,e)}setKi(t,e){this.raw.set_kp(t,e)}setKd(t,e){this.raw.set_kp(t,e)}setAxes(t){this.raw.set_axes_mask(t)}resetIntegrals(){this.raw.reset_integrals()}applyLinearCorrection(t,e,i){let r=D.intoRaw(e),s=D.intoRaw(i);this.raw.apply_linear_correction(this.params.dt,this.bodies.raw,t.handle,r,s),r.free(),s.free()}applyAngularCorrection(t,e,i){let r=Wt.intoRaw(e),s=D.intoRaw(i);this.raw.apply_angular_correction(this.params.dt,this.bodies.raw,t.handle,r,s),r.free(),s.free()}linearCorrection(t,e,i,r){let s=D.intoRaw(e),a=D.intoRaw(i);return this.raw.linear_correction(this.params.dt,this.bodies.raw,t.handle,s,a,q),s.free(),a.free(),D.fromBuffer(q,r)}angularCorrection(t,e,i,r){let s=Wt.intoRaw(e),a=D.intoRaw(i);return this.raw.angular_correction(this.params.dt,this.bodies.raw,t.handle,s,a,q),s.free(),a.free(),D.fromBuffer(q,r)}},vd=class{constructor(t,e,i,r,s){this.raw=new Cl(t.handle),this.broadPhase=e,this.narrowPhase=i,this.bodies=r,this.colliders=s,this._chassis=t}free(){this.raw&&this.raw.free(),this.raw=void 0}updateVehicle(t,e,i,r){this.raw.update_vehicle(t,this.broadPhase.raw,this.narrowPhase.raw,this.bodies.raw,this.colliders.raw,e,i,this.colliders.castClosure(r))}currentVehicleSpeed(){return this.raw.current_vehicle_speed()}chassis(){return this._chassis}get indexUpAxis(){return this.raw.index_up_axis()}set indexUpAxis(t){this.raw.set_index_up_axis(t)}get indexForwardAxis(){return this.raw.index_forward_axis()}set setIndexForwardAxis(t){this.raw.set_index_forward_axis(t)}addWheel(t,e,i,r,s){let a=D.intoRaw(t),o=D.intoRaw(e),l=D.intoRaw(i);this.raw.add_wheel(a,o,l,r,s),a.free(),o.free(),l.free()}numWheels(){return this.raw.num_wheels()}wheelChassisConnectionPointCs(t,e){return this.raw.wheel_chassis_connection_point_cs(t,q)?D.fromBuffer(q,e):null}setWheelChassisConnectionPointCs(t,e){let i=D.intoRaw(e);this.raw.set_wheel_chassis_connection_point_cs(t,i),i.free()}wheelSuspensionRestLength(t){return this.raw.wheel_suspension_rest_length(t)}setWheelSuspensionRestLength(t,e){this.raw.set_wheel_suspension_rest_length(t,e)}wheelMaxSuspensionTravel(t){return this.raw.wheel_max_suspension_travel(t)}setWheelMaxSuspensionTravel(t,e){this.raw.set_wheel_max_suspension_travel(t,e)}wheelRadius(t){return this.raw.wheel_radius(t)}setWheelRadius(t,e){this.raw.set_wheel_radius(t,e)}wheelSuspensionStiffness(t){return this.raw.wheel_suspension_stiffness(t)}setWheelSuspensionStiffness(t,e){this.raw.set_wheel_suspension_stiffness(t,e)}wheelSuspensionCompression(t){return this.raw.wheel_suspension_compression(t)}setWheelSuspensionCompression(t,e){this.raw.set_wheel_suspension_compression(t,e)}wheelSuspensionRelaxation(t){return this.raw.wheel_suspension_relaxation(t)}setWheelSuspensionRelaxation(t,e){this.raw.set_wheel_suspension_relaxation(t,e)}wheelMaxSuspensionForce(t){return this.raw.wheel_max_suspension_force(t)}setWheelMaxSuspensionForce(t,e){this.raw.set_wheel_max_suspension_force(t,e)}wheelBrake(t){return this.raw.wheel_brake(t)}setWheelBrake(t,e){this.raw.set_wheel_brake(t,e)}wheelSteering(t){return this.raw.wheel_steering(t)}setWheelSteering(t,e){this.raw.set_wheel_steering(t,e)}wheelEngineForce(t){return this.raw.wheel_engine_force(t)}setWheelEngineForce(t,e){this.raw.set_wheel_engine_force(t,e)}wheelDirectionCs(t,e){return this.raw.wheel_direction_cs(t,q)?D.fromBuffer(q,e):null}setWheelDirectionCs(t,e){let i=D.intoRaw(e);this.raw.set_wheel_direction_cs(t,i),i.free()}wheelAxleCs(t,e){return this.raw.wheel_axle_cs(t,q)?D.fromBuffer(q,e):null}setWheelAxleCs(t,e){let i=D.intoRaw(e);this.raw.set_wheel_axle_cs(t,i),i.free()}wheelFrictionSlip(t){return this.raw.wheel_friction_slip(t)}setWheelFrictionSlip(t,e){this.raw.set_wheel_friction_slip(t,e)}wheelSideFrictionStiffness(t){return this.raw.wheel_side_friction_stiffness(t)}setWheelSideFrictionStiffness(t,e){this.raw.set_wheel_side_friction_stiffness(t,e)}wheelRotation(t){return this.raw.wheel_rotation(t)}wheelForwardImpulse(t){return this.raw.wheel_forward_impulse(t)}wheelSideImpulse(t){return this.raw.wheel_side_impulse(t)}wheelSuspensionForce(t){return this.raw.wheel_suspension_force(t)}wheelContactNormal(t,e){return this.raw.wheel_contact_normal_ws(t,q)?D.fromBuffer(q,e):null}wheelContactPoint(t,e){return this.raw.wheel_contact_point_ws(t,q)?D.fromBuffer(q,e):null}wheelSuspensionLength(t){return this.raw.wheel_suspension_length(t)}wheelHardPoint(t,e){return this.raw.wheel_hard_point_ws(t,q)?D.fromBuffer(q,e):null}wheelIsInContact(t){return this.raw.wheel_is_in_contact(t)}wheelGroundObject(t){return this.colliders.get(this.raw.wheel_ground_object(t))}},xd=class n{constructor(t,e,i,r,s,a,o,l,c,h,d,u,f){this.gravity=t,this.integrationParameters=new Ju(e),this.islands=new cd(i),this.broadPhase=new ud(r),this.narrowPhase=new dd(s),this.bodies=new Yu(a),this.colliders=new Sd(o),this.impulseJoints=new id(l),this.multibodyJoints=new od(c),this.ccdSolver=new ld(h),this.physicsPipeline=new pd(d),this.serializationPipeline=new Jl(u),this.debugRenderPipeline=new _d(f),this.characterControllers=new Set,this.pidControllers=new Set,this.vehicleControllers=new Set,this.impulseJoints.finalizeDeserialization(this.bodies),this.bodies.finalizeDeserialization(this.colliders),this.colliders.finalizeDeserialization(this.bodies)}free(){this.integrationParameters.free(),this.islands.free(),this.broadPhase.free(),this.narrowPhase.free(),this.bodies.free(),this.colliders.free(),this.impulseJoints.free(),this.multibodyJoints.free(),this.ccdSolver.free(),this.physicsPipeline.free(),this.serializationPipeline.free(),this.debugRenderPipeline.free(),this.characterControllers.forEach((t=>t.free())),this.pidControllers.forEach((t=>t.free())),this.vehicleControllers.forEach((t=>t.free())),this.integrationParameters=void 0,this.islands=void 0,this.broadPhase=void 0,this.narrowPhase=void 0,this.bodies=void 0,this.colliders=void 0,this.ccdSolver=void 0,this.impulseJoints=void 0,this.multibodyJoints=void 0,this.physicsPipeline=void 0,this.serializationPipeline=void 0,this.debugRenderPipeline=void 0,this.characterControllers=void 0,this.pidControllers=void 0,this.vehicleControllers=void 0}static fromRaw(t){return t?new n(D.fromRaw(t.takeGravity()),t.takeIntegrationParameters(),t.takeIslandManager(),t.takeBroadPhase(),t.takeNarrowPhase(),t.takeBodies(),t.takeColliders(),t.takeImpulseJoints(),t.takeMultibodyJoints()):null}takeSnapshot(){return this.serializationPipeline.serializeAll(this.gravity,this.integrationParameters,this.islands,this.broadPhase,this.narrowPhase,this.bodies,this.colliders,this.impulseJoints,this.multibodyJoints)}static restoreSnapshot(t){return new Jl().deserializeAll(t)}debugRender(t,e){return this.debugRenderPipeline.render(this.bodies,this.colliders,this.impulseJoints,this.multibodyJoints,this.narrowPhase,t,e),new md(this.debugRenderPipeline.vertices,this.debugRenderPipeline.colors)}step(t,e){this.physicsPipeline.step(this.gravity,this.integrationParameters,this.islands,this.broadPhase,this.narrowPhase,this.bodies,this.colliders,this.impulseJoints,this.multibodyJoints,this.ccdSolver,t,e)}propagateModifiedBodyPositionsToColliders(){this.bodies.raw.propagateModifiedBodyPositionsToColliders(this.colliders.raw)}get timestep(){return this.integrationParameters.dt}set timestep(t){this.integrationParameters.dt=t}get lengthUnit(){return this.integrationParameters.lengthUnit}set lengthUnit(t){this.integrationParameters.lengthUnit=t}get numSolverIterations(){return this.integrationParameters.numSolverIterations}set numSolverIterations(t){this.integrationParameters.numSolverIterations=t}get numInternalPgsIterations(){return this.integrationParameters.numInternalPgsIterations}set numInternalPgsIterations(t){this.integrationParameters.numInternalPgsIterations=t}get maxCcdSubsteps(){return this.integrationParameters.maxCcdSubsteps}set maxCcdSubsteps(t){this.integrationParameters.maxCcdSubsteps=t}createRigidBody(t){return this.bodies.createRigidBody(this.colliders,t)}createCharacterController(t){let e=new wd(t,this.integrationParameters,this.broadPhase,this.narrowPhase,this.bodies,this.colliders);return this.characterControllers.add(e),e}removeCharacterController(t){this.characterControllers.delete(t),t.free()}createPidController(t,e,i,r){let s=new yd(this.integrationParameters,this.bodies,t,e,i,r);return this.pidControllers.add(s),s}removePidController(t){this.pidControllers.delete(t),t.free()}createVehicleController(t){let e=new vd(t,this.broadPhase,this.narrowPhase,this.bodies,this.colliders);return this.vehicleControllers.add(e),e}removeVehicleController(t){this.vehicleControllers.delete(t),t.free()}createCollider(t,e){let i=e?e.handle:void 0;return this.colliders.createCollider(this.bodies,t,i)}createImpulseJoint(t,e,i,r){return this.impulseJoints.createJoint(this.bodies,t,e.handle,i.handle,r)}createMultibodyJoint(t,e,i,r){return this.multibodyJoints.createJoint(t,e.handle,i.handle,r)}getRigidBody(t){return this.bodies.get(t)}getCollider(t){return this.colliders.get(t)}getImpulseJoint(t){return this.impulseJoints.get(t)}getMultibodyJoint(t){return this.multibodyJoints.get(t)}removeRigidBody(t){this.bodies&&this.bodies.remove(t.handle,this.islands,this.colliders,this.impulseJoints,this.multibodyJoints)}removeCollider(t,e){this.colliders&&this.colliders.remove(t.handle,this.islands,this.bodies,e)}removeImpulseJoint(t,e){this.impulseJoints&&this.impulseJoints.remove(t.handle,e)}removeMultibodyJoint(t,e){this.impulseJoints&&this.multibodyJoints.remove(t.handle,e)}forEachCollider(t){this.colliders.forEach(t)}forEachRigidBody(t){this.bodies.forEach(t)}forEachActiveRigidBody(t){this.bodies.forEachActiveRigidBody(this.islands,t)}castRay(t,e,i,r,s,a,o,l){return this.broadPhase.castRay(this.narrowPhase,this.bodies,this.colliders,t,e,i,r,s,a?a.handle:null,o?o.handle:null,this.colliders.castClosure(l))}castRayAndGetNormal(t,e,i,r,s,a,o,l){return this.broadPhase.castRayAndGetNormal(this.narrowPhase,this.bodies,this.colliders,t,e,i,r,s,a?a.handle:null,o?o.handle:null,this.colliders.castClosure(l))}intersectionsWithRay(t,e,i,r,s,a,o,l,c){this.broadPhase.intersectionsWithRay(this.narrowPhase,this.bodies,this.colliders,t,e,i,r,s,a,o?o.handle:null,l?l.handle:null,this.colliders.castClosure(c))}intersectionWithShape(t,e,i,r,s,a,o,l){let c=this.broadPhase.intersectionWithShape(this.narrowPhase,this.bodies,this.colliders,t,e,i,r,s,a?a.handle:null,o?o.handle:null,this.colliders.castClosure(l));return c!=null?this.colliders.get(c):null}projectPoint(t,e,i,r,s,a,o){return this.broadPhase.projectPoint(this.narrowPhase,this.bodies,this.colliders,t,e,i,r,s?s.handle:null,a?a.handle:null,this.colliders.castClosure(o))}projectPointAndGetFeature(t,e,i,r,s,a){return this.broadPhase.projectPointAndGetFeature(this.narrowPhase,this.bodies,this.colliders,t,e,i,r?r.handle:null,s?s.handle:null,this.colliders.castClosure(a))}intersectionsWithPoint(t,e,i,r,s,a,o){this.broadPhase.intersectionsWithPoint(this.narrowPhase,this.bodies,this.colliders,t,this.colliders.castClosure(e),i,r,s?s.handle:null,a?a.handle:null,this.colliders.castClosure(o))}castShape(t,e,i,r,s,a,o,l,c,h,d,u){return this.broadPhase.castShape(this.narrowPhase,this.bodies,this.colliders,t,e,i,r,s,a,o,l,c,h?h.handle:null,d?d.handle:null,this.colliders.castClosure(u))}intersectionsWithShape(t,e,i,r,s,a,o,l,c){this.broadPhase.intersectionsWithShape(this.narrowPhase,this.bodies,this.colliders,t,e,i,this.colliders.castClosure(r),s,a,o?o.handle:null,l?l.handle:null,this.colliders.castClosure(c))}collidersWithAabbIntersectingAabb(t,e,i){this.broadPhase.collidersWithAabbIntersectingAabb(this.narrowPhase,this.bodies,this.colliders,t,e,this.colliders.castClosure(i))}contactPairsWith(t,e){this.narrowPhase.contactPairsWith(t.handle,this.colliders.castClosure(e))}intersectionPairsWith(t,e){this.narrowPhase.intersectionPairsWith(t.handle,this.colliders.castClosure(e))}contactPair(t,e,i){this.narrowPhase.contactPair(t.handle,e.handle,this.bodies,i)}intersectionPair(t,e){return this.narrowPhase.intersectionPair(t.handle,e.handle)}set profilerEnabled(t){this.physicsPipeline.raw.set_profiler_enabled(t)}get profilerEnabled(){return this.physicsPipeline.raw.is_profiler_enabled()}timingStep(){return this.physicsPipeline.raw.timing_step()}timingCollisionDetection(){return this.physicsPipeline.raw.timing_collision_detection()}timingBroadPhase(){return this.physicsPipeline.raw.timing_broad_phase()}timingNarrowPhase(){return this.physicsPipeline.raw.timing_narrow_phase()}timingSolver(){return this.physicsPipeline.raw.timing_solver()}timingVelocityAssembly(){return this.physicsPipeline.raw.timing_velocity_assembly()}timingVelocityResolution(){return this.physicsPipeline.raw.timing_velocity_resolution()}timingVelocityUpdate(){return this.physicsPipeline.raw.timing_velocity_update()}timingVelocityWriteback(){return this.physicsPipeline.raw.timing_velocity_writeback()}timingCcd(){return this.physicsPipeline.raw.timing_ccd()}timingCcdToiComputation(){return this.physicsPipeline.raw.timing_ccd_toi_computation()}timingCcdBroadPhase(){return this.physicsPipeline.raw.timing_ccd_broad_phase()}timingCcdNarrowPhase(){return this.physicsPipeline.raw.timing_ccd_narrow_phase()}timingCcdSolver(){return this.physicsPipeline.raw.timing_ccd_solver()}timingIslandConstruction(){return this.physicsPipeline.raw.timing_island_construction()}timingUserChanges(){return this.physicsPipeline.raw.timing_user_changes()}};(function(n){n[n.NONE=0]="NONE",n[n.COLLISION_EVENTS=1]="COLLISION_EVENTS",n[n.CONTACT_FORCE_EVENTS=2]="CONTACT_FORCE_EVENTS"})(Wu||(Wu={}));var bd=class{free(){this.raw&&this.raw.free(),this.raw=void 0}collider1(){return this.raw.collider1()}collider2(){return this.raw.collider2()}totalForce(t){return this.raw.total_force(q),D.fromBuffer(q,t)}totalForceMagnitude(){return this.raw.total_force_magnitude()}maxForceDirection(t){return this.raw.max_force_direction(q),D.fromBuffer(q,t)}maxForceMagnitude(){return this.raw.max_force_magnitude()}},bm=class{constructor(t,e){this.raw=e||new Ra(t)}free(){this.raw&&this.raw.free(),this.raw=void 0}drainCollisionEvents(t){this.raw.drainCollisionEvents(t)}drainContactForceEvents(t){let e=new bd;this.raw.drainContactForceEvents((i=>{e.raw=i,t(e),e.free()}))}clear(){this.raw.clear()}};(function(n){n[n.NONE=0]="NONE",n[n.FILTER_CONTACT_PAIRS=1]="FILTER_CONTACT_PAIRS",n[n.FILTER_INTERSECTION_PAIRS=2]="FILTER_INTERSECTION_PAIRS"})(Xu||(Xu={})),(function(n){n[n.EMPTY=0]="EMPTY",n[n.COMPUTE_IMPULSE=1]="COMPUTE_IMPULSE"})(gm||(gm={})),(function(n){n[n.EXCLUDE_FIXED=1]="EXCLUDE_FIXED",n[n.EXCLUDE_KINEMATIC=2]="EXCLUDE_KINEMATIC",n[n.EXCLUDE_DYNAMIC=4]="EXCLUDE_DYNAMIC",n[n.EXCLUDE_SENSORS=8]="EXCLUDE_SENSORS",n[n.EXCLUDE_SOLIDS=16]="EXCLUDE_SOLIDS",n[n.ONLY_DYNAMIC=3]="ONLY_DYNAMIC",n[n.ONLY_KINEMATIC=5]="ONLY_KINEMATIC",n[n.ONLY_FIXED=6]="ONLY_FIXED"})(wm||(wm={})),(function(n){n[n.DYNAMIC_DYNAMIC=1]="DYNAMIC_DYNAMIC",n[n.DYNAMIC_KINEMATIC=12]="DYNAMIC_KINEMATIC",n[n.DYNAMIC_FIXED=2]="DYNAMIC_FIXED",n[n.KINEMATIC_KINEMATIC=52224]="KINEMATIC_KINEMATIC",n[n.KINEMATIC_FIXED=8704]="KINEMATIC_FIXED",n[n.FIXED_FIXED=32]="FIXED_FIXED",n[n.DEFAULT=15]="DEFAULT",n[n.ALL=60943]="ALL"})(qu||(qu={}));var jl=class{constructor(t,e,i,r){this.colliderSet=t,this.handle=e,this._parent=i,this._shape=r}finalizeDeserialization(t){this.handle!=null&&(this._parent=t.get(this.colliderSet.raw.coParent(this.handle)))}ensureShapeIsCached(){this._shape||(this._shape=Ye.fromRaw(this.colliderSet.raw,this.handle))}get shape(){return this.ensureShapeIsCached(),this._shape}clearShapeCache(){this._shape=null}isValid(){return this.colliderSet.raw.contains(this.handle)}translation(t){return this.colliderSet.raw.coTranslation(this.handle,q),D.fromBuffer(q,t)}translationWrtParent(t){return this.colliderSet.raw.coTranslationWrtParent(this.handle,q)?D.fromBuffer(q,t):null}rotation(t){return this.colliderSet.raw.coRotation(this.handle,q),Wt.fromBuffer(q,t)}rotationWrtParent(t){return this.colliderSet.raw.coRotationWrtParent(this.handle,q)?Wt.fromBuffer(q,t):null}isSensor(){return this.colliderSet.raw.coIsSensor(this.handle)}setSensor(t){this.colliderSet.raw.coSetSensor(this.handle,t)}setShape(t){let e=t.intoRaw();this.colliderSet.raw.coSetShape(this.handle,e),e.free(),this._shape=t}setEnabled(t){this.colliderSet.raw.coSetEnabled(this.handle,t)}isEnabled(){return this.colliderSet.raw.coIsEnabled(this.handle)}setRestitution(t){this.colliderSet.raw.coSetRestitution(this.handle,t)}setFriction(t){this.colliderSet.raw.coSetFriction(this.handle,t)}frictionCombineRule(){return this.colliderSet.raw.coFrictionCombineRule(this.handle)}setFrictionCombineRule(t){this.colliderSet.raw.coSetFrictionCombineRule(this.handle,t)}restitutionCombineRule(){return this.colliderSet.raw.coRestitutionCombineRule(this.handle)}setRestitutionCombineRule(t){this.colliderSet.raw.coSetRestitutionCombineRule(this.handle,t)}setCollisionGroups(t){this.colliderSet.raw.coSetCollisionGroups(this.handle,t)}setSolverGroups(t){this.colliderSet.raw.coSetSolverGroups(this.handle,t)}contactSkin(){return this.colliderSet.raw.coContactSkin(this.handle)}setContactSkin(t){return this.colliderSet.raw.coSetContactSkin(this.handle,t)}activeHooks(){return this.colliderSet.raw.coActiveHooks(this.handle)}setActiveHooks(t){this.colliderSet.raw.coSetActiveHooks(this.handle,t)}activeEvents(){return this.colliderSet.raw.coActiveEvents(this.handle)}setActiveEvents(t){this.colliderSet.raw.coSetActiveEvents(this.handle,t)}activeCollisionTypes(){return this.colliderSet.raw.coActiveCollisionTypes(this.handle)}setContactForceEventThreshold(t){return this.colliderSet.raw.coSetContactForceEventThreshold(this.handle,t)}contactForceEventThreshold(){return this.colliderSet.raw.coContactForceEventThreshold(this.handle)}setActiveCollisionTypes(t){this.colliderSet.raw.coSetActiveCollisionTypes(this.handle,t)}setDensity(t){this.colliderSet.raw.coSetDensity(this.handle,t)}setMass(t){this.colliderSet.raw.coSetMass(this.handle,t)}setMassProperties(t,e,i,r){let s=D.intoRaw(e),a=D.intoRaw(i),o=Wt.intoRaw(r);this.colliderSet.raw.coSetMassProperties(this.handle,t,s,a,o),s.free(),a.free(),o.free()}setTranslation(t){this.colliderSet.raw.coSetTranslation(this.handle,t.x,t.y,t.z)}setTranslationWrtParent(t){this.colliderSet.raw.coSetTranslationWrtParent(this.handle,t.x,t.y,t.z)}setRotation(t){this.colliderSet.raw.coSetRotation(this.handle,t.x,t.y,t.z,t.w)}setRotationWrtParent(t){this.colliderSet.raw.coSetRotationWrtParent(this.handle,t.x,t.y,t.z,t.w)}shapeType(){return this.colliderSet.raw.coShapeType(this.handle)}halfExtents(t){return this.colliderSet.raw.coHalfExtents(this.handle,q)?D.fromBuffer(q,t):null}setHalfExtents(t){let e=D.intoRaw(t);this.colliderSet.raw.coSetHalfExtents(this.handle,e)}radius(){return this.colliderSet.raw.coRadius(this.handle)}setRadius(t){this.colliderSet.raw.coSetRadius(this.handle,t)}roundRadius(){return this.colliderSet.raw.coRoundRadius(this.handle)}setRoundRadius(t){this.colliderSet.raw.coSetRoundRadius(this.handle,t)}halfHeight(){return this.colliderSet.raw.coHalfHeight(this.handle)}setHalfHeight(t){this.colliderSet.raw.coSetHalfHeight(this.handle,t)}setVoxel(t,e,i,r){this.colliderSet.raw.coSetVoxel(this.handle,t,e,i,r),this._shape=null}propagateVoxelChange(t,e,i,r,s,a,o){this.colliderSet.raw.coPropagateVoxelChange(this.handle,t.handle,e,i,r,s,a,o),this._shape=null}combineVoxelStates(t,e,i,r){this.colliderSet.raw.coCombineVoxelStates(this.handle,t.handle,e,i,r),this._shape=null}vertices(){return this.colliderSet.raw.coVertices(this.handle)}indices(){return this.colliderSet.raw.coIndices(this.handle)}heightfieldHeights(){return this.colliderSet.raw.coHeightfieldHeights(this.handle)}heightfieldScale(t){return this.colliderSet.raw.coHeightfieldScale(this.handle,q)?D.fromBuffer(q,t):null}heightfieldNRows(){return this.colliderSet.raw.coHeightfieldNRows(this.handle)}heightfieldNCols(){return this.colliderSet.raw.coHeightfieldNCols(this.handle)}parent(){return this._parent}friction(){return this.colliderSet.raw.coFriction(this.handle)}restitution(){return this.colliderSet.raw.coRestitution(this.handle)}density(){return this.colliderSet.raw.coDensity(this.handle)}mass(){return this.colliderSet.raw.coMass(this.handle)}volume(){return this.colliderSet.raw.coVolume(this.handle)}collisionGroups(){return this.colliderSet.raw.coCollisionGroups(this.handle)}solverGroups(){return this.colliderSet.raw.coSolverGroups(this.handle)}containsPoint(t){let e=D.intoRaw(t),i=this.colliderSet.raw.coContainsPoint(this.handle,e);return e.free(),i}projectPoint(t,e,i){let r=D.intoRaw(t),s=Wl.fromBuffer(this.colliderSet.raw.coProjectPoint(this.handle,r,e),i);return r.free(),s}intersectsRay(t,e){let i=D.intoRaw(t.origin),r=D.intoRaw(t.dir),s=this.colliderSet.raw.coIntersectsRay(this.handle,i,r,e);return i.free(),r.free(),s}castShape(t,e,i,r,s,a,o,l,c){let h=D.intoRaw(t),d=D.intoRaw(i),u=Wt.intoRaw(r),f=D.intoRaw(s),m=e.intoRaw(),w=this.colliderSet.raw.coCastShape(this.handle,h,m,d,u,f,a,o,l),g=null;return w&&(w.getComponents(q),g=Oa.fromBuffer(null,q,c),w.free()),h.free(),d.free(),u.free(),f.free(),m.free(),g}castCollider(t,e,i,r,s,a,o){let l=D.intoRaw(t),c=D.intoRaw(i),h=this.colliderSet.raw.coCastCollider(this.handle,l,e.handle,c,r,s,a),d=null;if(h){let u=h.colliderHandle();h.getComponents(q),d=ql.fromBuffer(this.colliderSet.get(u),q,o),h.free()}return l.free(),c.free(),d}intersectsShape(t,e,i){let r=D.intoRaw(e),s=Wt.intoRaw(i),a=t.intoRaw(),o=this.colliderSet.raw.coIntersectsShape(this.handle,a,r,s);return r.free(),s.free(),a.free(),o}contactShape(t,e,i,r,s){let a=D.intoRaw(e),o=Wt.intoRaw(i),l=t.intoRaw(),c=Ba.fromBuffer(this.colliderSet.raw.coContactShape(this.handle,l,a,o,r),s);return a.free(),o.free(),l.free(),c}contactCollider(t,e,i){return Ba.fromBuffer(this.colliderSet.raw.coContactCollider(this.handle,t.handle,e),i)}castRay(t,e,i){let r=D.intoRaw(t.origin),s=D.intoRaw(t.dir),a=this.colliderSet.raw.coCastRay(this.handle,r,s,e,i);return r.free(),s.free(),a}castRayAndGetNormal(t,e,i,r){let s=D.intoRaw(t.origin),a=D.intoRaw(t.dir),o=Vl.fromBuffer(this.colliderSet.raw.coCastRayAndGetNormal(this.handle,s,a,e,i),r);return s.free(),a.free(),o}};(function(n){n[n.Density=0]="Density",n[n.Mass=1]="Mass",n[n.MassProps=2]="MassProps"})(ms||(ms={}));var Sm=class n{constructor(t){this.enabled=!0,this.shape=t,this.massPropsMode=ms.Density,this.density=1,this.friction=.5,this.restitution=0,this.rotation=Wt.identity(),this.translation=D.zeros(),this.isSensor=!1,this.collisionGroups=4294967295,this.solverGroups=4294967295,this.frictionCombineRule=Bl.Average,this.restitutionCombineRule=Bl.Average,this.activeCollisionTypes=qu.DEFAULT,this.activeEvents=Wu.NONE,this.activeHooks=Xu.NONE,this.mass=0,this.centerOfMass=D.zeros(),this.contactForceEventThreshold=0,this.contactSkin=0,this.principalAngularInertia=D.zeros(),this.angularInertiaLocalFrame=Wt.identity()}static ball(t){let e=new za(t);return new n(e)}static capsule(t,e){let i=new Va(t,e);return new n(i)}static segment(t,e){let i=new Ga(t,e);return new n(i)}static triangle(t,e,i){let r=new Wa(t,e,i);return new n(r)}static roundTriangle(t,e,i,r){let s=new Xa(t,e,i,r);return new n(s)}static polyline(t,e){let i=new qa(t,e);return new n(i)}static voxels(t,e){let i=new Ya(t,e);return new n(i)}static trimesh(t,e,i){let r=new ja(t,e,i);return new n(r)}static cuboid(t,e,i){let r=new ka(t,e,i);return new n(r)}static roundCuboid(t,e,i,r){let s=new Ha(t,e,i,r);return new n(s)}static heightfield(t,e,i,r,s){let a=new Za(t,e,i,r,s);return new n(a)}static cylinder(t,e){let i=new $a(t,e);return new n(i)}static roundCylinder(t,e,i){let r=new Ka(t,e,i);return new n(r)}static cone(t,e){let i=new Qa(t,e);return new n(i)}static roundCone(t,e,i){let r=new to(t,e,i);return new n(r)}static convexHull(t){let e=new ws(t,null);return new n(e)}static convexMesh(t,e){let i=new ws(t,e);return new n(i)}static roundConvexHull(t,e){let i=new ys(t,null,e);return new n(i)}static roundConvexMesh(t,e,i){let r=new ys(t,e,i);return new n(r)}static compound(t,e,i){let r=new Ja(t,e,i);return new n(r)}static convexDecomposition(t,e,i){let r;if(i){let a=new Na;i.alpha!==void 0&&(a.alpha=i.alpha),i.beta!==void 0&&(a.beta=i.beta),i.concavity!==void 0&&(a.concavity=i.concavity),i.planeDownsampling!==void 0&&(a.plane_downsampling=i.planeDownsampling),i.convexHullDownsampling!==void 0&&(a.convex_hull_downsampling=i.convexHullDownsampling),i.maxConvexHulls!==void 0&&(a.max_convex_hulls=i.maxConvexHulls),i.resolution!==void 0&&(a.resolution=i.resolution),i.convexHullApproximation!==void 0&&(a.convex_hull_approximation=i.convexHullApproximation),r=se.convexDecompositionWithParams(t,e,a),a.free()}else r=se.convexDecomposition(t,e);if(!r)return null;let s=Ye.fromRawShape(r);return new n(s)}setTranslation(t,e,i){if(typeof t!="number"||typeof e!="number"||typeof i!="number")throw TypeError("The translation components must be numbers.");return this.translation={x:t,y:e,z:i},this}setRotation(t){return Wt.copy(this.rotation,t),this}setSensor(t){return this.isSensor=t,this}setEnabled(t){return this.enabled=t,this}setContactSkin(t){return this.contactSkin=t,this}setDensity(t){return this.massPropsMode=ms.Density,this.density=t,this}setMass(t){return this.massPropsMode=ms.Mass,this.mass=t,this}setMassProperties(t,e,i,r){return this.massPropsMode=ms.MassProps,this.mass=t,D.copy(this.centerOfMass,e),D.copy(this.principalAngularInertia,i),Wt.copy(this.angularInertiaLocalFrame,r),this}setRestitution(t){return this.restitution=t,this}setFriction(t){return this.friction=t,this}setFrictionCombineRule(t){return this.frictionCombineRule=t,this}setRestitutionCombineRule(t){return this.restitutionCombineRule=t,this}setCollisionGroups(t){return this.collisionGroups=t,this}setSolverGroups(t){return this.solverGroups=t,this}setActiveHooks(t){return this.activeHooks=t,this}setActiveEvents(t){return this.activeEvents=t,this}setActiveCollisionTypes(t){return this.activeCollisionTypes=t,this}setContactForceEventThreshold(t){return this.contactForceEventThreshold=t,this}},Sd=class{constructor(t){this.raw=t||new qe,this.map=new Ua,t&&t.forEachColliderHandle((e=>{this.map.set(e,new jl(this,e,null))}))}free(){this.raw&&this.raw.free(),this.raw=void 0,this.map&&this.map.clear(),this.map=void 0}castClosure(t){return e=>t?t(this.get(e)):void 0}finalizeDeserialization(t){this.map.forEach((e=>e.finalizeDeserialization(t)))}createCollider(t,e,i){let r=i!=null&&i!=null;if(r&&isNaN(i))throw Error("Cannot create a collider with a parent rigid-body handle that is not a number.");let s=e.shape.intoRaw(),a=D.intoRaw(e.translation),o=Wt.intoRaw(e.rotation),l=D.intoRaw(e.centerOfMass),c=D.intoRaw(e.principalAngularInertia),h=Wt.intoRaw(e.angularInertiaLocalFrame),d=this.raw.createCollider(e.enabled,s,a,o,e.massPropsMode,e.mass,l,c,h,e.density,e.friction,e.restitution,e.frictionCombineRule,e.restitutionCombineRule,e.isSensor,e.collisionGroups,e.solverGroups,e.activeCollisionTypes,e.activeHooks,e.activeEvents,e.contactForceEventThreshold,e.contactSkin,r,r?i:0,t.raw);s.free(),a.free(),o.free(),l.free(),c.free(),h.free();let u=r?t.get(i):null,f=new jl(this,d,u,e.shape);return this.map.set(d,f),f}remove(t,e,i,r){this.raw.remove(t,e.raw,i.raw,r),this.unmap(t)}unmap(t){this.map.delete(t)}get(t){return this.map.get(t)}len(){return this.map.len()}contains(t){return this.get(t)!=null}forEach(t){this.map.forEach(t)}getAll(){return this.map.getAll()}};function fE(n,t,e,i){return new(e||(e=Promise))((function(r,s){function a(c){try{l(i.next(c))}catch(h){s(h)}}function o(c){try{l(i.throw(c))}catch(h){s(h)}}function l(c){var h;c.done?r(c.value):(h=c.value,h instanceof e?h:new e((function(d){d(h)}))).then(a,o)}l((i=i.apply(n,t||[])).next())}))}for(pE={byteLength:function(n){var t=vw(n),e=t[0],i=t[1];return 3*(e+i)/4-i},toByteArray:function(n){var t,e,i=vw(n),r=i[0],s=i[1],a=new ww((function(c,h,d){return 3*(h+d)/4-d})(0,r,s)),o=0,l=s>0?r-4:r;for(e=0;e<l;e+=4)t=on[n.charCodeAt(e)]<<18|on[n.charCodeAt(e+1)]<<12|on[n.charCodeAt(e+2)]<<6|on[n.charCodeAt(e+3)],a[o++]=t>>16&255,a[o++]=t>>8&255,a[o++]=255&t;return s===2&&(t=on[n.charCodeAt(e)]<<2|on[n.charCodeAt(e+1)]>>4,a[o++]=255&t),s===1&&(t=on[n.charCodeAt(e)]<<10|on[n.charCodeAt(e+1)]<<4|on[n.charCodeAt(e+2)]>>2,a[o++]=t>>8&255,a[o++]=255&t),a},fromByteArray:function(n){for(var t,e=n.length,i=e%3,r=[],s=16383,a=0,o=e-i;a<o;a+=s)r.push(mE(n,a,a+s>o?o:a+s));return i===1?(t=n[e-1],r.push(On[t>>2]+On[t<<4&63]+"==")):i===2&&(t=(n[e-2]<<8)+n[e-1],r.push(On[t>>10]+On[t>>4&63]+On[t<<2&63]+"=")),r.join("")}},On=[],on=[],ww=typeof Uint8Array<"u"?Uint8Array:Array,ku="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fs=0,yw=ku.length;fs<yw;++fs)On[fs]=ku[fs],on[ku.charCodeAt(fs)]=fs;var pE,On,on,ww,ku,fs,yw;function vw(n){var t=n.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=n.indexOf("=");return e===-1&&(e=t),[e,e===t?0:4-e%4]}function mE(n,t,e){for(var i,r,s=[],a=t;a<e;a+=3)i=(n[a]<<16&16711680)+(n[a+1]<<8&65280)+(255&n[a+2]),s.push(On[(r=i)>>18&63]+On[r>>12&63]+On[r>>6&63]+On[63&r]);return s.join("")}function _E(){return fE(this,void 0,void 0,(function*(){yield dE({module_or_path:globalThis.__rapierWasm})}))}function gE(){return(function(){let n,t;try{let r=p.__wbindgen_add_to_stack_pointer(-16);p.version(r);var e=de().getInt32(r+0,!0),i=de().getInt32(r+4,!0);return n=e,t=i,Sw(e,i)}finally{p.__wbindgen_add_to_stack_pointer(16),p.__wbindgen_export2(n,t,1)}})()}function wE(n){var t;t=n,p.reserve_memory(t)}on[45]=62,on[95]=63;var Em=Object.freeze({__proto__:null,version:gE,reserveMemory:wE,scratchBuffer:q,Vector3:Gu,VectorOps:D,Quaternion:Fl,RotationOps:Wt,SdpMatrix3:Ul,SdpMatrix3Ops:Ol,get RigidBodyType(){return Fn},RigidBody:zl,RigidBodyDesc:ym,RigidBodySet:Yu,IntegrationParameters:Ju,get JointType(){return xi},get MotorModel(){return um},get JointAxis(){return dm},get JointAxesMask(){return fm},ImpulseJoint:Vn,UnitImpulseJoint:kl,FixedImpulseJoint:ju,RopeImpulseJoint:Zu,SpringImpulseJoint:$u,PrismaticImpulseJoint:Ku,RevoluteImpulseJoint:Qu,GenericImpulseJoint:td,SphericalImpulseJoint:ed,JointData:vm,ImpulseJointSet:id,MultibodyJoint:qr,UnitMultibodyJoint:Hl,FixedMultibodyJoint:nd,PrismaticMultibodyJoint:rd,RevoluteMultibodyJoint:sd,SphericalMultibodyJoint:ad,MultibodyJointSet:od,get CoefficientCombineRule(){return Bl},CCDSolver:ld,IslandManager:cd,BroadPhase:ud,NarrowPhase:dd,TempContactManifold:fd,Shape:Ye,get ShapeType(){return ti},get HeightFieldFlags(){return pm},get TriMeshFlags(){return mm},Ball:za,HalfSpace:Yl,Cuboid:ka,RoundCuboid:Ha,Capsule:Va,Segment:Ga,Triangle:Wa,RoundTriangle:Xa,Polyline:qa,Voxels:Ya,Compound:Ja,TriMesh:ja,ConvexPolyhedron:ws,RoundConvexPolyhedron:ys,Heightfield:Za,Cylinder:$a,RoundCylinder:Ka,Cone:Qa,RoundCone:to,get ActiveCollisionTypes(){return qu},Collider:jl,get MassPropsMode(){return ms},ColliderDesc:Sm,ColliderSet:Sd,get FeatureType(){return Fa},Ray:xm,RayIntersection:Vl,RayColliderIntersection:Gl,RayColliderHit:hd,PointProjection:Wl,PointColliderProjection:Xl,ShapeCastHit:Oa,ColliderShapeCastHit:ql,ShapeContact:Ba,World:xd,PhysicsPipeline:pd,SerializationPipeline:Jl,get ActiveEvents(){return Wu},TempContactForceEvent:bd,EventQueue:bm,get ActiveHooks(){return Xu},get SolverFlags(){return gm},DebugRenderBuffers:md,DebugRenderPipeline:_d,get QueryFilterFlags(){return wm},init:_E,CharacterCollision:gd,KinematicCharacterController:wd,get PidAxesMask(){return _m},PidController:yd,DynamicRayCastVehicleController:vd});var gi={floor:1,tiles:2,dice:4,scenery:8},Zl=(n,t)=>n<<16|t,zi=null,Ed=class n{static async create(){return await Em.init(),zi=Em,new n}constructor(){this.world=new zi.World({x:0,y:-9.8,z:0}),this.world.timestep=1/60,this.tileBodies=[],this.scenery=new Map;let t=this.world.createRigidBody(zi.RigidBodyDesc.fixed().setTranslation(0,-.2,0));this.world.createCollider(zi.ColliderDesc.cuboid(30,.2,30).setFriction(1).setRestitution(0).setCollisionGroups(Zl(gi.floor,gi.dice)),t)}addTile(t){let e=this.world.createRigidBody(zi.RigidBodyDesc.kinematicPositionBased().setTranslation(t.x,t.y,t.z));return this.world.createCollider(zi.ColliderDesc.cuboid(.5,.18,.5).setFriction(1).setRestitution(0).setCollisionGroups(Zl(gi.tiles,gi.dice)),e),this.tileBodies.push(e),e}addScenery(t){if(t.spec?.collision===!1)return null;let e=this.world.createRigidBody(zi.RigidBodyDesc.fixed().setTranslation(t.center.x,t.center.y,t.center.z)),i;if(t.kind==="cylinder")i=zi.ColliderDesc.cylinder(t.halfHeight,t.radius);else{let s=new Float32Array(t.points.length*3);t.points.forEach((a,o)=>s.set([a.x,a.y,a.z],o*3)),i=zi.ColliderDesc.convexHull(s)}if(!i)return console.warn("\u041D\u0435\u0442 \u0432\u044B\u043F\u0443\u043A\u043B\u043E\u0439 \u0444\u043E\u0440\u043C\u044B",t.name),null;let r=this.world.createCollider(i.setFriction(1).setRestitution(0).setCollisionGroups(Zl(gi.scenery,gi.dice)),e);return this.scenery.set(r.handle,t.name),r}addDie(t,e){let i=this.world.createRigidBody(zi.RigidBodyDesc.fixed().setGravityScale(1.3).setLinearDamping(.28).setAngularDamping(.55).setCcdEnabled(!0).setCanSleep(!0)),r=new Float32Array(t.length*3);t.forEach((a,o)=>r.set([a.x,a.y,a.z],o*3));let s=this.world.createCollider(zi.ColliderDesc.convexHull(r).setMass(e).setRestitution(.28).setFriction(.78).setRestitutionCombineRule(zi.CoefficientCombineRule.Max).setFrictionCombineRule(zi.CoefficientCombineRule.Min).setCollisionGroups(Zl(gi.dice,15)),i);return{body:i,collider:s}}contacts(t){let e=0,i=[];return this.world.contactPairsWith(t,r=>{this.world.contactPair(t,r,a=>{e+=a.numContacts()});let s=this.scenery.get(r.handle);s&&i.push(s)}),{n:e,names:i}}landingSurface(t,e=.65){let i=1/0,r=-1/0;for(let s of[-e,0,e])for(let a of[-e,0,e]){let l=this.ray(new A(t.x+s,12,t.z+a),new A(0,-1,0),14,gi.floor|gi.tiles|gi.scenery)?.point.y||0;i=Math.min(i,l),r=Math.max(r,l)}return{height:r,relief:r-i}}ray(t,e,i,r){let s=e.clone().normalize(),a=this.world.castRay(new zi.Ray(t,s),i,!0,void 0,Zl(gi.dice,r));return a?{point:t.clone().add(s.multiplyScalar(a.timeOfImpact)),collider:a.collider}:null}step(){this.world.step()}};var ur=[new A(0,1,0),new A(0,0,-1),new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,-1,0)],yE=[[[0,0]],[[-1,-1],[1,1]],[[-1,-1],[0,0],[1,1]],[[-1,-1],[1,-1],[-1,1],[1,1]],[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]];function vE(){let n=[],t=[];for(let r of ur){let s=Math.abs(r.y)<.5?new A(0,1,0).cross(r).normalize():new A(1,0,0),a=r.clone().cross(s);for(let o=0;o<16;o++)for(let l=0;l<16;l++){let c=[[0,0],[1,0],[1,1],[0,1]].map(([h,d])=>{let u=(l+h)/16-.5,f=(o+d)/16-.5;return r.clone().multiplyScalar(.48).add(s.clone().multiplyScalar(u*.96)).add(a.clone().multiplyScalar(f*.96))});for(let h of[0,1,2,0,2,3]){let d=c[h],u=d.clone().clampScalar(-.33,.33),f=d.clone().sub(u).normalize(),m=u.add(f.clone().multiplyScalar(.15)).multiplyScalar(fl);n.push(m.x,m.y,m.z),t.push(f.x,f.y,f.z)}}}let i=new _e;return i.setAttribute("position",new jt(n,3)),i.setAttribute("normal",new jt(t,3)),i}var Td=null;function Tm(){if(Td)return Td;let n=vE(),t=new Map,e=n.attributes.position;for(let s=0;s<e.count;s++){let a=[e.getX(s),e.getY(s),e.getZ(s)].map(o=>o.toFixed(4)).join(",");t.has(a)||t.set(a,new A(e.getX(s),e.getY(s),e.getZ(s)))}let i=new pn(.064*fl,.064*fl,.006*.65,16),r=[];return ur.forEach((s,a)=>{let o=Math.abs(s.y)<.5?new A(0,1,0).cross(s).normalize():new A(1,0,0),l=s.clone().cross(o);for(let[c,h]of yE[a]){let d=i.clone();d.applyQuaternion(new Se().setFromUnitVectors(new A(0,1,0),s));let u=s.clone().multiplyScalar(.481).add(o.clone().multiplyScalar(c*.21)).add(l.clone().multiplyScalar(h*.21)).multiplyScalar(fl);d.translate(u.x,u.y,u.z),r.push(d)}}),Td={geo:n,hull:[...t.values()],pips:r},Td}function Tw(){let n=Tm(),t=new Pe;t.add(new Bt(n.geo,b0("#fff0cd",!0)),new Bt(n.geo,M0));for(let e of n.pips)t.add(new Bt(e,Uu));return t}var xE=.985,bE=.75,SE=.5,ME=.1,Rd=1.28,EE=1.8,dr=(n,t)=>n+Math.random()*(t-n);function TE(n){let t=new Se,e=new A(1,0,0),i=new A(0,0,1);return n===2?t.setFromAxisAngle(e,Math.PI/2):n===3?t.setFromAxisAngle(i,Math.PI/2):n===4?t.setFromAxisAngle(i,-Math.PI/2):n===5?t.setFromAxisAngle(e,-Math.PI/2):n===6&&t.setFromAxisAngle(e,Math.PI),t}var Ad=class{constructor(t,e,i,r,s){let a=Tm();this.physics=t,this.group=new Pe,this.visual=Tw(),this.group.add(this.visual),this.faceMap=[0,1,2,3,4,5,6],e.add(this.group);let{body:o,collider:l}=t.addDie(a.hull,.8);this.body=o,this.collider=l,this.index=i,this.onSettled=r,this.onPredicted=s,this.home=new A(1.4+i*1.45,.49,-.85),this.value=i?3:1,this.rolling=!1,this.launchPending=!1,this.locked=!1,this.predictFace=0,this.predictTime=0,this.elapsed=0,this.quietTime=0,this.impacts=0,this.audibleImpacts=0,this.hadContact=!1,this.contacted=[],this.touchedGround=!1,this.bounced=!1,this.nudgeTime=0,this.tutorialFace=0,this.avoidHero=!1,this.heroCenter=new A,this.heroSide=1,this.closestHeroLane=999,o.setTranslation(this.home,!1),this.sync()}quat(){let t=this.body.rotation();return new Se(t.x,t.y,t.z,t.w)}get position(){let t=this.body.translation();return new A(t.x,t.y,t.z)}topFace(){let t=this.quat(),e=-2,i=1;return ur.forEach((r,s)=>{let a=r.clone().applyQuaternion(t).y;a>e&&(e=a,i=s+1)}),i}alignment(t){return ur[t-1].clone().applyQuaternion(this.quat()).y}shown(t){return this.faceMap[t]}relabel(t,e){let i=ur[e-1],r=ur[t-1],s=new Se().setFromUnitVectors(i,r);s.premultiply(new Se().setFromAxisAngle(r,Math.floor(Math.random()*4)*Math.PI/2)),this.visual.quaternion.copy(s),this.faceMap=[0];for(let a=1;a<=6;a++){let o=ur[a-1],l=-2,c=1;ur.forEach((h,d)=>{let u=h.clone().applyQuaternion(s).dot(o);u>l&&(l=u,c=d+1)}),this.faceMap[a]=c}}resetLabels(){this.visual.quaternion.identity(),this.faceMap=[0,1,2,3,4,5,6]}roll(t=0,e=null){this.rolling||(this.tutorialFace=t,this.resetLabels(),this.launch=e||this.makeLaunch(t),Object.assign(this,{rolling:!0,launchPending:!0,locked:!1,predictFace:0,predictTime:0,elapsed:0,quietTime:0,impacts:0,audibleImpacts:0,hadContact:!1,contacted:[],touchedGround:!1,bounced:!1,nudgeTime:0,closestHeroLane:999}),this.body.setBodyType(0,!0),this.body.setEnabledRotations(!t,!0,!t,!0),this.body.wakeUp())}makeLaunch(t){return t>0?{q:new Se().setFromAxisAngle(new A(0,1,0),dr(-.7,.7)).multiply(TE(t)),p:this.home.clone().add(new A(0,1.9,0)),lv:{x:0,y:-3.4,z:0},av:{x:0,y:3.2,z:0}}:{q:new Se().setFromEuler(new dn(dr(-Math.PI,Math.PI),dr(-Math.PI,Math.PI),dr(-Math.PI,Math.PI),"YXZ")),p:this.home.clone().add(new A(0,dr(1.8,2.25),0)),lv:{x:dr(-.45,.45),y:-3.4,z:dr(-.45,.45)},av:{x:dr(5,8)*(Math.random()<.5?-1:1),y:dr(-4,4),z:dr(-8,-5)}}}integrate(t){let e=this.body;if(this.launchPending){let{q:o,p:l,lv:c,av:h}=this.launch;e.setTranslation(l,!0),e.setRotation(o,!0),e.setLinvel(c,!0),e.setAngvel(h,!0),this.launchPending=!1;return}if(!this.rolling)return;let i=e.translation(),r=e.linvel();if(this.avoidHero){let o=pe.clone().multiplyScalar(this.heroSide),l=(i.x-this.heroCenter.x)*o.x+(i.z-this.heroCenter.z)*o.z,c=r.x*o.x+r.z*o.z;l+c*t<Rd&&(l<Rd&&e.setTranslation({x:i.x+o.x*(Rd-l),y:i.y,z:i.z+o.z*(Rd-l)},!0),c<0&&e.setLinvel({x:r.x-o.x*c*1.35,y:r.y,z:r.z-o.z*c*1.35},!0));let h=e.translation();this.closestHeroLane=Math.min(this.closestHeroLane,(h.x-this.heroCenter.x)*o.x+(h.z-this.heroCenter.z)*o.z)}let s=this.physics.contacts(this.collider),a=Math.hypot(r.x,r.y,r.z);if(s.n>0){!this.hadContact&&a>.35&&this.audibleImpacts++,this.impacts++;for(let o of s.names)this.contacted.includes(o)||this.contacted.push(o);this.touchedGround=!0}if(this.hadContact=s.n>0,this.touchedGround&&r.y>.3&&(this.bounced=!0),this.touchedGround&&this.elapsed>.48){let o=e.linvel(),l=e.angvel(),c=Math.exp(-t*2.6),h=Math.exp(-t*3.4);e.setLinvel({x:o.x*c,y:o.y*c,z:o.z*c},!0),e.setAngvel({x:l.x*h,y:l.y*h,z:l.z*h},!0)}}process(t){if(!this.rolling||this.launchPending)return;let e=this.body;this.elapsed+=t;let i=e.linvel(),r=e.angvel(),s=Math.hypot(i.x,i.y,i.z),a=Math.hypot(r.x,r.y,r.z);if(!this.locked&&this.touchedGround){let c=this.topFace();this.alignment(c)>xE&&s<SE&&a<bE?(this.predictTime=c===this.predictFace?this.predictTime+t:0,this.predictFace=c,this.predictTime>ME&&(this.locked=!0,this.value=this.shown(c),this.onPredicted?.(c))):(this.predictFace=0,this.predictTime=0)}if(!this.locked&&this.touchedGround&&this.elapsed>.62&&s<2.4){let h=ur[this.topFace()-1].clone().applyQuaternion(this.quat()).cross(new A(0,1,0)),d=Math.exp(-t*6);e.setAngvel({x:r.x*d+h.x*t*42,y:r.y*Math.exp(-t*4),z:r.z*d+h.z*t*42},!0)}if(this.locked){let c=Math.exp(-t*9),h=Math.exp(-t*12);e.setLinvel({x:i.x*c,y:i.y*c,z:i.z*c},!0),e.setAngvel({x:r.x*h,y:r.y*h,z:r.z*h},!0)}if(this.elapsed>EE){this.finish();return}let o=s<.14&&a<.2,l=e.isSleeping();if(this.quietTime=o||l?this.quietTime+t:0,this.quietTime>.16&&this.touchedGround&&this.alignment(this.topFace())>.97){this.finish();return}!this.locked&&this.elapsed>.65&&this.elapsed-this.nudgeTime>.4&&(o||l)&&(this.nudgeTime=this.elapsed,this.quietTime=0,e.wakeUp(),e.applyImpulse({x:.04,y:.45,z:-.04},!0),e.applyTorqueImpulse({x:.05,y:.025,z:-.04},!0))}finish(){this.rolling&&(this.value=this.shown(this.locked?this.predictFace:this.topFace()),this.rolling=!1,this.body.setLinvel({x:0,y:0,z:0},!1),this.body.setAngvel({x:0,y:0,z:0},!1),this.body.setBodyType(1,!1),this.onSettled?.(this.value))}freeze(){this.rolling=!1,this.launchPending=!1,this.body.setBodyType(1,!1)}sync(){let t=this.body.translation(),e=this.body.rotation();this.group.position.set(t.x,t.y,t.z),this.group.quaternion.set(e.x,e.y,e.z,e.w)}};var RE=.065,Iw=.375,Cd=n=>Math.max(0,Math.min(1,n));function AE(n){let t=Math.floor(Math.max(0,n)*24)/24,e={y:0,x:0,tilt:0,sx:1,sy:1,die:n<.25,accent:n>=.25&&n<Iw,accentFrame:Math.floor((n-.25)*24)};if(n<0)return e;if(t<.084){let i=t/.084;e.y=-.035*i,e.sx=1+.055*i,e.sy=1-.09*i,e.tilt=t<.04?0:-.09}else{let i=Cd((t-.084)/.166);e.y=-.035+.46*(1-(1-i)**2),e.x=.055*i,e.tilt=.16*Math.sin(i*Math.PI);let r=1-.5*Cd((i-.65)/.35);e.sx=(1-.04*Math.sin(i*Math.PI))*r,e.sy=(1+.08*Math.sin(i*Math.PI))*r}return e}var Rm,Rw,Aw,Cw;function Pw(n){let t=new Fr;return n.forEach(([e,i],r)=>r?t.lineTo(e,i):t.moveTo(e,i)),t.closePath(),new os(t)}function CE(){Rm||(Rm=new Be({color:"#342719",depthWrite:!0,depthTest:!0}),Rw=new Be({color:"#f3dfab",depthWrite:!0,depthTest:!0}),Aw=Pw([[0,.27],[.047,.071],[.23,.022],[.06,-.035],[.017,-.22],[-.038,-.048],[-.19,.012],[-.044,.057]]),Cw=Pw([[-.022,0],[.018,.012],[.028,.13],[.002,.2],[-.011,.115]]));let n=new Pe,t=new Pe;function e(r){let s=new Pe,a=new Bt(r,Rw),o=new Bt(r,Rm);return a.scale.set(1.38,1.14,1),o.position.z=.001,s.add(a,o),s}let i=e(Aw);return n.add(i,t),[.18,1.35,2.67,3.63,4.92].forEach((r,s)=>{let a=e(Cw);a.rotation.z=-r,a.userData.angle=r,a.scale.setScalar(s%2?.8:1),t.add(a)}),{group:n,star:i,rays:t}}var $l=class{constructor(t,e,i,r,s,a){this.onSnap=a,this.snapped=!1,this.scene=t,this.camera=e,this.age=-r*RE,this.done=!1,this.node=new Pe,this.origin=i.group.position.clone(),this.node.position.copy(this.origin),this.copy=i.group.clone(),this.copy.position.set(0,0,0),this.node.add(this.copy),this.accent=CE(),t.add(this.node,this.accent.group),this.sign=r?-1:1,s&&(this.shadow=s.clone(),this.shadow.material=s.material.clone(),this.shadowOpacity=s.material.opacity,this.shadowScale=s.scale.clone(),t.add(this.shadow)),this.update(0)}update(t){if(this.done)return;if(this.age+=t,this.age>=Iw){this.dispose();return}let e=AE(this.age);this.node.visible=e.die,this.node.position.copy(this.origin).addScaledVector(pe,e.x*this.sign),this.node.position.y+=e.y,this.node.scale.set(e.sx,e.sy,e.sx),this.node.quaternion.setFromAxisAngle(oi,e.tilt*this.sign);let{group:i,star:r,rays:s}=this.accent;i.visible=e.accent,i.position.copy(this.origin).addScaledVector(pe,.055*this.sign),i.position.y+=.43,i.quaternion.copy(this.camera.quaternion),e.accent&&!this.snapped&&(this.snapped=!0,this.onSnap?.(i.position)),r.visible=e.accentFrame===0,r.rotation.z=this.sign*.18,s.children.forEach((a,o)=>{let l=a.userData.angle,c=.24+Math.max(0,e.accentFrame)*.065;a.position.set(Math.sin(l)*c,Math.cos(l)*c,0),a.visible=e.accentFrame<2||o%2===0,a.scale.y=e.accentFrame>=2?.45:1}),this.shadow&&(this.shadow.visible=e.die,this.shadow.material.opacity=this.shadowOpacity*(1-Cd(e.y)*1.5),this.shadow.scale.copy(this.shadowScale).multiplyScalar(1-Cd(e.y)*.35))}dispose(){this.done||(this.done=!0,this.node.removeFromParent(),this.accent.group.removeFromParent(),this.shadow&&(this.shadow.removeFromParent(),this.shadow.material.dispose()))}};var Pd=.0065,PE=.3,Id={idle_front:{sheet:"idle_front",w:224,cols:8,first:0,count:48,fps:12,loop:!0},run_front:{sheet:"front",w:224,cols:7,first:1,count:20,fps:18,loop:!0},idle_back:{sheet:"idle_back",w:224,cols:8,first:0,count:48,fps:12,loop:!0},run_back:{sheet:"back",w:224,cols:7,first:1,count:20,fps:18,loop:!0},joy:{sheet:"joy",w:224,cols:8,first:0,count:48,fps:24,loop:!1},negative:{sheet:"negative",w:224,cols:8,first:0,count:48,fps:24,loop:!1},dance:{sheet:"dance",w:320,cols:12,first:0,count:96,fps:24,loop:!1},negative_return:{sheet:"negative",w:224,cols:8,first:0,count:19,fps:48,loop:!1,cells:[46,44,35,32,29,28,27,26,24,20,16,15,14,13,12,11,8,4,0]},police:{sheet:"police",w:320,cols:12,first:24,count:25,fps:24,loop:!1},police_hold:{sheet:"police",w:320,cols:12,first:48,count:46,fps:24,loop:!0,pingpong:24},police_release:{sheet:"police",w:320,cols:12,first:33,count:7,fps:24,loop:!1,reverse:!0}},Lw=["front","back","idle_front","idle_back"],IE=["joy","negative","dance","police"],Am=["joy","negative","dance","police"],Ld=class{constructor(t,e,i){this.base=i,this.camera=e,this.scene=t,this.policeBound=!1,this.reducedMotion=!1,this.blend=null,this.sheets={},this.mesh=new Bt(new ii(1,1),new Be({alphaTest:.12,transparent:!1})),this.mesh.renderOrder=2,t.add(this.mesh),this.position=new A,this.flipH=!1,this.facingBack=!1,this.celebrating=!1,this.animation="idle_front",this.frame=0,this.progress=0,this.playing=!0,this.speedScale=1,this.offset=new ct(3.5,132),this.onPoliceFinished=null,this.visible=!0}async load(t){await Promise.all(t.map(async e=>{if(this.sheets[e])return;let i=await vi(`${this.base}/${e}.webp`);this.sheets[e]=i}))}loadLate(){return this._late||(this._late=this.load(IE).catch(t=>console.warn(t))),this._late}has(t){return!!this.sheets[Id[t].sheet]}play(t){return!this.has(t)&&Am.includes(t)?(this.loadLate(),this._finish(t),!1):(this.animation!==t&&this.beginBlend(),Am.includes(t)&&(this.facingBack=!1),this.animation=t,this.frame=0,this.progress=0,this.playing=!0,!0)}_finish(t){if(t==="negative"&&!this.reducedMotion&&this.has("negative_return")){this.play("negative_return");return}if(t==="negative_return"){this.celebrating=!1,this.setRunning(!1);return}if(t==="police"){this.holdPolice(),this.onPoliceFinished?.();return}if(t==="police_release"){this.celebrating=!1,this.setRunning(!1);let e=this.releaseDone;this.releaseDone=null,e?.();return}Am.includes(t)&&(this.celebrating=!1,this.setRunning(!1),t==="dance"&&!this.facingBack&&(this.frame=16),t==="police"&&this.onPoliceFinished?.())}celebrate(t=!1){this.policeBound||this.animation==="police_release"||this.celebrating&&(!t||this.animation==="dance")||(this.celebrating=!0,this.offset.set((t?-4.5:3.5)*(this.flipH?-1:1),132),this.speedScale=1,this.play(t?"dance":"joy"))}reactNegative(){this.policeBound||this.animation==="police_release"||this.celebrating&&this.animation==="negative"||(this.celebrating=!0,this.offset.set(3.5*(this.flipH?-1:1),132),this.speedScale=1,this.play("negative"))}reactPolice(t=!1){this.reducedMotion=t,this.policeBound=!0,this.celebrating=!0,this.offset.set(-4.5*(this.flipH?-1:1),132),this.speedScale=1,t?(this.holdPolice(),this.onPoliceFinished?.()):this.play("police")}holdPolice(){this.policeBound=!0,this.celebrating=!0,this.speedScale=1,this.offset.set(-4.5*(this.flipH?-1:1),132),this.has("police_hold")?(this.play("police_hold"),this.playing=!this.reducedMotion):this.loadLate().then(()=>{this.policeBound&&this.has("police_hold")&&this.holdPolice()})}releasePolice(){return this.policeBound?(this.policeBound=!1,this.onPoliceFinished?.(),this.reducedMotion||!this.has("police_release")?(this.celebrating=!1,this.setRunning(!1),Promise.resolve()):new Promise(t=>{this.releaseDone=t,this.speedScale=1,this.play("police_release")})):Promise.resolve()}cancelCelebration(){if(this.policeBound){this.animation==="police"&&this.holdPolice(),this.onPoliceFinished?.();return}if(this.animation==="police_release"||!this.celebrating)return;let t=this.animation==="police";this.celebrating=!1,this.setRunning(!1),t&&this.onPoliceFinished?.()}setHeading(t,e){if(this.policeBound||this.animation==="police_release")return;let i=t<0,r=e>0;(i!==this.flipH||r!==this.facingBack)&&this.beginBlend(),this.flipH=i,this.facingBack=r}setRunning(t){if(this.policeBound||this.animation==="police_release"&&this.playing)return;if(this.celebrating){if(!t)return;let o=this.animation==="police";this.celebrating=!1,o&&this.onPoliceFinished?.()}let e=this.facingBack?"back":"front",i=(t?"run_":"idle_")+e;if(this.offset.set(3.5*(this.flipH?-1:1),this.facingBack?120:132),t||(this.speedScale=1),this.animation===i){this.playing||this.play(i);return}let r=this.frame,s=this.progress,a=this.animation.startsWith("run_");this.play(i),t&&a&&(this.frame=r,this.progress=s)}clearBlend(){this.blend&&(this.scene.remove(this.blend.mesh),this.blend.mesh.material.map.dispose(),this.blend.mesh.material.dispose(),this.blend=null),this.mesh.material.opacity=1,this.mesh.material.transparent=!1,this.mesh.material.depthWrite=!0}beginBlend(){if(this.clearBlend(),this.reducedMotion||!this.mesh.material.map||!this.mesh.visible)return;let t=this.mesh.clone();t.material=this.mesh.material.clone(),t.material.map=t.material.map.clone(),t.material.transparent=!0,t.material.depthWrite=!1,this.decorate?.(t.material),this.scene.add(t),this.blend={mesh:t,t:0,duration:this.animation==="negative_return"?.18:.24,origin:this.position.clone(),pose:t.position.clone()},this.mesh.material.transparent=!0,this.mesh.material.depthWrite=!1,this.mesh.material.opacity=0}update(t){let e=Id[this.animation];if(this.playing){for(this.progress+=t*e.fps*this.speedScale;this.progress>=1;)if(this.progress-=1,this.frame++,this.frame>=e.count)if(e.loop)this.frame=0;else{this.frame=e.count-1,this.playing=!1,this._finish(this.animation);break}}if(this.draw(),this.blend){let i=this.blend,r=Math.min(1,(i.t+=t)/i.duration),s=r*r*(3-2*r);i.mesh.position.copy(i.pose).add(this.position).sub(i.origin),i.mesh.material.opacity=1-s,this.mesh.material.opacity=s,r===1&&this.clearBlend()}}draw(){let t=Id[this.animation],e=this.sheets[t.sheet];if(!e&&this.sheets.idle_front&&(t=Id.idle_front,e=this.sheets.idle_front),this.mesh.visible=this.visible&&!!e,!e)return;let i=this.mesh.material;i.map!==e&&(i.map=e,i.needsUpdate=!0);let r=Math.min(this.frame,t.count-1)%t.count,s=t.cells?t.cells[r]:t.first+(t.reverse?-r:t.pingpong?r<t.pingpong?r:2*t.pingpong-2-r:r),a=e.userData.k||1,o=e.image.width/a,l=e.image.height/a,c=t.w,h=(t.w===320,320),d=s%t.cols,u=Math.floor(s/t.cols);e.repeat.set((this.flipH?-c:c)/o,h/l),e.offset.set((this.flipH?(d+1)*c:d*c)/o,1-(u+1)*h/l),this.mesh.scale.set(c*Pd,h*Pd,1),this.mesh.quaternion.copy(this.camera.quaternion);let f=new A(1,0,0).applyQuaternion(this.camera.quaternion),m=new A(0,1,0).applyQuaternion(this.camera.quaternion),w=new A(0,0,1).applyQuaternion(this.camera.quaternion);this.mesh.position.copy(this.position).add(f.multiplyScalar(this.offset.x*Pd)).add(m.multiplyScalar(this.offset.y*Pd)).addScaledVector(w,PE)}};var Dd=Math.PI*2,LE=n=>Math.max(0,Math.min(1,n)),Nd=n=>(n=LE(n),n*n*(3-2*n)),NE=[[[-200,790],[400,240],[1010,640],[1770,60]],[[1740,720],[1070,1010],[600,230],[-220,350]],[[-220,280],[420,680],[1140,30],[1760,460]]];function DE(n,t,e=NE){let i=Math.floor(n*24)/24,r=Math.floor(i/32),s=i%32,a=15.5+t*.8,o=s-2-t*1.1,l=r%3===1?3:2;if(t>=l||o<0||o>a)return null;let c=o/a,h=1-c,d=e[r%e.length],u=h*h*h*d[0][0]+3*h*h*c*d[1][0]+3*h*c*c*d[2][0]+c*c*c*d[3][0],f=h*h*h*d[0][1]+3*h*h*c*d[1][1]+3*h*c*c*d[2][1]+c*c*c*d[3][1],m=3*h*h*(d[1][0]-d[0][0])+6*h*c*(d[2][0]-d[1][0])+3*c*c*(d[3][0]-d[2][0]),w=3*h*h*(d[1][1]-d[0][1])+6*h*c*(d[2][1]-d[1][1])+3*c*c*(d[3][1]-d[2][1]),g=(o+t*.71)%(4.7+t*.27),_=2.6,b=Nd(g/.22)*(1-Nd((g-_+.35)/.35)),T=Math.sin(g/_*Dd*4)*b,v=Math.sin(c*Dd+t*.45)*.17;return{x:u-t*24,y:f+t*48+Math.sin(o*1.7+t)*3*b,dx:m,dy:w,bank:v,pose:Math.round((T+1)*4),size:(1-t*.14)*(1+.1*Math.sin(c*Math.PI)),alpha:Nd(o/.7)*Nd((a-o)/.8)}}function Nw(){return Array.from({length:9},(n,t)=>{let e=document.createElement("canvas");e.width=192,e.height=216;let i=e.getContext("2d");i.translate(96,108),i.scale(3,3);let r=(t-4)/4,s=-3-r*23,a=27-Math.abs(r)*10;i.lineWidth=.8,i.lineJoin="round",i.strokeStyle="#302d26";let o=(l,c)=>{i.beginPath(),c(),i.closePath(),i.fillStyle=l,i.fill(),i.stroke()};for(let l of[-1,1])i.save(),i.scale(l,1),o("#d7d5bd",()=>{i.moveTo(1,-3),i.quadraticCurveTo(8,-8,14,s-2),i.quadraticCurveTo(21,s-3,a,s),i.lineTo(a-3,s+3),i.lineTo(a-5,s+3),i.lineTo(a-7,s+5),i.quadraticCurveTo(12,s+6,7,4),i.lineTo(1,5)}),o("#464a43",()=>{i.moveTo(a-8,s-1),i.quadraticCurveTo(a-3,s-2,a,s),i.lineTo(a-3,s+3),i.lineTo(a-5,s+3),i.lineTo(a-7,s+5),i.lineTo(a-10,s+4)}),i.strokeStyle="#9da598",i.lineWidth=.55,i.beginPath(),i.moveTo(4,-1),i.quadraticCurveTo(10,s+2,a-10,s+2),i.stroke(),i.restore();return o("#e9e0c7",()=>{i.moveTo(-1,4),i.lineTo(-4,13),i.lineTo(0,12),i.lineTo(4,13),i.lineTo(1,4)}),o("#f2e9ce",()=>{i.moveTo(0,-11),i.bezierCurveTo(4,-11,4,-6,3,-3),i.bezierCurveTo(5,2,3,8,0,10),i.bezierCurveTo(-3,8,-5,2,-3,-3),i.bezierCurveTo(-4,-6,-4,-11,0,-11)}),o("#c89b46",()=>{i.moveTo(-1.2,-10),i.lineTo(0,-15),i.lineTo(1.4,-10)}),i.fillStyle="#b3b8a5",i.beginPath(),i.ellipse(1.1,1,1.2,4.8,-.1,0,Dd),i.fill(),i.fillStyle="#302d26",i.beginPath(),i.arc(1.6,-8,.55,0,Dd),i.fill(),e})}function Dw(n,t,e,i,r,s,a){for(let o=2;o>=0;o--){let l=DE(t,o,a);if(!l)continue;let c=e(l.x,l.y),h=e(l.x+l.dx*.002,l.y+l.dy*.002),d=l.alpha;if(d<.01)continue;let u=i*l.size*.72;n.save(),n.globalAlpha=d,n.translate(c.x,c.y),n.rotate(Math.atan2(h.y-c.y,h.x-c.x)+Math.PI/2),n.transform(1,0,l.bank,.83-Math.abs(l.bank),0,0),n.drawImage(s[l.pose],-32*u,-36*u,64*u,72*u),n.restore()}}var FE=[[596,322],[864,735],[103,294],[1274,653],[1355,939]],UE=[[336,850],[408,866]],Fd=14,Cm=(n,t,e)=>{let i=Math.min(1,Math.max(0,(e-n)/(t-n)));return i*i*(3-2*i)},OE=`
uniform float life; uniform float seed; varying vec2 vUv;
void main(){
  // \u042D\u043A\u0440\u0430\u043D\u043D\u0430\u044F \u043A\u0430\u043C\u0435\u0440\u0430 \u043F\u0435\u0440\u0435\u0432\u0451\u0440\u043D\u0443\u0442\u0430 (y \u0432\u043D\u0438\u0437), \u043F\u043E\u044D\u0442\u043E\u043C\u0443 vUv \u0443\u0436\u0435 \u0438\u0434\u0451\u0442 \u0441\u0432\u0435\u0440\u0445\u0443 \u0432\u043D\u0438\u0437, \u043A\u0430\u043A UV \u0432 Godot.
  vec2 uv = vUv;
  vec2 p = (uv - vec2(0.5)) * 2.0;
  float tick = floor(life * 58.0) / 12.0;
  float field = 10.0; vec2 nxy = vec2(0.0);
  for (int i = 0; i < 6; i++) {
    float k = float(i); float a = k * 1.256637 + seed * 0.71;
    vec2 c = i == 5 ? vec2(0.0) : vec2(cos(a), sin(a)) * (0.34 + sin(tick * 1.6 + a) * 0.025);
    float r = i == 5 ? 0.68 : 0.43 + sin(k * 2.3 + seed) * 0.065;
    vec2 q = (p - c) / r; float d = length(q);
    if (d < field) { field = d; nxy = q; }
  }
  float aa = max(fwidth(field), 0.006);
  float cover = 1.0 - smoothstep(1.0 - aa, 1.0 + aa, field);
  float z = sqrt(max(0.0, 1.0 - dot(nxy, nxy)));
  float light = dot(vec3(nxy.x, -nxy.y, z), normalize(vec3(-0.48, 0.62, 0.75)));
  vec3 col = mix(vec3(0.57,0.45,0.32), vec3(0.77,0.65,0.48), smoothstep(0.04, 0.13, light));
  col = mix(col, vec3(0.93,0.81,0.61), smoothstep(0.57, 0.66, light));
  col = mix(col, vec3(0.38,0.30,0.22), smoothstep(0.89, 0.98, field) * 0.38);
  col = mix(vec3(0.30,0.28,0.23), col, smoothstep(0.0, 0.19, life));
  float paper = fract(sin(dot(floor(uv * 100.0), vec2(12.9898, 78.233))) * 43758.5453);
  col *= 0.985 + paper * 0.03;
  float a = cover * (1.0 - smoothstep(0.88, 1.0, life));
  if (a < 0.01) discard;
  gl_FragColor = vec4(col, a);
}`,Ud=class{constructor(t,e,i,r=null){this.camera=t,this.canvas=e,this.ctx=e.getContext("2d"),this.mouths=r?r.smoke:[...UE,[(546/1254-.005)*1536,((13/1254-.479)/.676+.5)*1024]],this.metal=r?r.metal:FE,this.gulls=r?r.gulls:!0,this.gullRoutes=r?.gullRoutes,this.gullSprites=this.gulls?Nw():null,this.reducedMotion=matchMedia("(prefers-reduced-motion: reduce)"),this.heroRect=i,this.enabled=!0,this.elapsed=0,this.bursts=[],this.scene=new ss,this.ortho=new In(0,1,0,1,-100,100);let s=new ii(1,1);this.puffs=[];for(let a=0;a<3;a++)for(let o=0;o<Fd;o++){let l=new Bt(s,new ge({transparent:!0,depthTest:!1,depthWrite:!1,side:Ge,uniforms:{life:{value:0},seed:{value:o+a*1.7}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:OE}));l.visible=!1,this.scene.add(l),this.puffs.push(l)}this.w=1,this.h=1}resize(t,e,i){this.w=t,this.h=e,this.ortho.left=0,this.ortho.right=t,this.ortho.top=0,this.ortho.bottom=e,this.ortho.updateProjectionMatrix(),this.canvas.width=Math.round(t*i),this.canvas.height=Math.round(e*i),this.canvas.style.width=t+"px",this.canvas.style.height=e+"px",this.ctx.setTransform(i,0,0,i,0,0)}screen(t){let e=t.clone().project(this.camera);return{x:(e.x+1)/2*this.w,y:(1-e.y)/2*this.h}}screenAt(t,e){return this.screen(pe.clone().multiplyScalar((t-768)/Bi).add(Ne.clone().multiplyScalar((512-e)/Bi)))}nearHero(t){let e=this.heroRect();return!!e&&t.x>=e.x&&t.x<=e.x+e.w&&t.y>=e.y&&t.y<=e.y+e.h}burst(t){this.enabled&&this.bursts.push({world:t.clone(),age:0})}puff(t,e){this.puffs2=this.puffs2||[],this.puffs2.push({world:t.clone(),age:0,kind:e})}update(t){for(let o of this.bursts)o.age+=t;this.bursts=this.bursts.filter(o=>o.age<.48),this.puffs2=(this.puffs2||[]).filter(o=>(o.age+=t)<.62),this.enabled&&(this.elapsed+=t);let e=this.enabled&&!this.reducedMotion.matches,i=this.mouths;this.puffs.forEach((o,l)=>{l>=i.length*Fd&&(o.visible=!1)});let r=this.screenAt(0,0),s=this.screenAt(1,0),a=Math.hypot(s.x-r.x,s.y-r.y);i.forEach(([o,l],c)=>{for(let h=0;h<Fd;h++){let d=this.puffs[c*Fd+h],u=(this.elapsed+h*.35+c*.63)%4.9,f=u/4.9,m=this.screenAt(o-24*u,l-12*u+Math.sin(u*1.7+c)*u*.65),w=(6+u*4)*Cm(0,.055,f)*a;d.visible=e&&w>.3&&!this.nearHero(m),d.position.set(m.x,m.y,0),d.renderOrder=Math.round((1-f)*7),d.scale.set(w*2,w*2,1),d.material.uniforms.life.value=f}}),this.draw()}drawPuff(t,e,i){let r=this.screen(e.world),s=e.age,a=s/.62,o=e.kind==="launch",l=i*(o?.55:.42),c=1-Cm(.35,1,a),h=l*(.35+.95*(1-Math.pow(1-a,3)));t.beginPath(),t.ellipse(r.x,r.y,h,h*.55,0,0,Math.PI*2),t.strokeStyle=`rgba(74,59,41,${.7*c})`,t.lineWidth=Math.max(1,i*.03*(1-a*.6)),t.stroke(),t.fillStyle=`rgba(233,218,178,${.28*c})`,t.fill();let d=o?5:3;for(let u=0;u<d;u++){let f=u/d*Math.PI*2+(o?.3:1.1),m=l*(.25+.85*(1-Math.pow(1-a,2))),w=r.x+Math.cos(f)*m,g=r.y+Math.sin(f)*m*.5-s*i*.35,_=i*(.08+a*.12)*(o?1.2:1);t.beginPath();for(let b=0;b<=20;b++){let T=b/20*Math.PI*2,v=_*(1+.18*Math.sin(T*4+u));t.lineTo(w+Math.cos(T)*v,g+Math.sin(T)*v)}t.fillStyle=`rgba(230,214,176,${.9*c})`,t.fill(),t.strokeStyle=`rgba(85,67,48,${.75*c})`,t.lineWidth=Math.max(.7,i*.016),t.stroke()}if(e.kind==="cash"||e.kind==="hard"){let u=e.kind==="cash"?"255,214,90":"120,210,255";for(let f=0;f<6;f++){let m=-Math.PI/2+(f-2.5)*.42,w=l*(.3+a*.5),g=w+l*.28*(1-a);t.beginPath(),t.moveTo(r.x+Math.cos(m)*w,r.y-l*.3+Math.sin(m)*w),t.lineTo(r.x+Math.cos(m)*g,r.y-l*.3+Math.sin(m)*g),t.strokeStyle=`rgba(${u},${c})`,t.lineWidth=Math.max(1.2,i*.035),t.lineCap="round",t.stroke()}}}draw(){let t=this.ctx;t.clearRect(0,0,this.w,this.h);let e=this.screenAt(0,0),i=this.screenAt(Bi,0),r=Math.hypot(i.x-e.x,i.y-e.y);for(let a of this.bursts){let o=a.age,l=this.screen(a.world);if(o<.12){t.beginPath();for(let h=0;h<16;h++){let d=h/16*Math.PI*2,u=(h%2?.22:.55)*r*(.8+o*3);t.lineTo(l.x+Math.cos(d)*u,l.y+Math.sin(d)*u)}t.closePath(),t.fillStyle=`rgba(255,237,173,${1-o/.12})`,t.fill()}let c=1-Cm(.12,.48,o);for(let h=0;h<4;h++){let d=h/4*Math.PI*2+.4,u=(.1+.64*(1-Math.pow(1-o/.48,3)))*r,f=l.x+Math.cos(d)*u,m=l.y+Math.sin(d)*.5*u-o*r*.3,w=(.14+o*.42)*r;t.beginPath();for(let g=0;g<=32;g++){let _=g/32*Math.PI*2,b=w*(1+.16*Math.sin(_*5+h));t.lineTo(f+Math.cos(_)*b,m+Math.sin(_)*b)}t.fillStyle=`rgba(224,207,168,${c*.92})`,t.fill(),t.strokeStyle=`rgba(74,59,41,${c*.75})`,t.lineWidth=Math.max(.6,r*.018),t.stroke()}}for(let a of this.puffs2||[])this.drawPuff(t,a,r);if(!this.enabled||this.reducedMotion.matches)return;let s=Math.min(2.4,Math.max(.4,this.w/(this.camera.userData.viewW||this.camera.userData.width)/60));this.metal.forEach(([a,o],l)=>{let c=(this.elapsed+l*3.1)%16;if(c>.65)return;let h=this.screenAt(a,o);if(this.nearHero(h))return;let d=Math.sin(c/.65*Math.PI);if(d<.1)return;let u=7*s*d;t.beginPath(),[[0,-u],[u*.2,-u*.2],[u*.65,0],[u*.2,u*.2],[0,u],[-u*.2,u*.2],[-u*.65,0],[-u*.2,-u*.2]].forEach(([f,m])=>t.lineTo(h.x+f,h.y+m)),t.closePath(),t.fillStyle=`rgba(255,237,184,${d*.85})`,t.fill()}),this.gulls&&!this.reducedMotion.matches&&Dw(t,this.elapsed,(a,o)=>this.screenAt(a,o),s,this.heroRect(),this.gullSprites,this.gullRoutes)}};var Pm=.67,BE={hard:.34,rolls:.38},Od=class{constructor(t,e,i,r,s){Object.assign(this,{scene:t,board:e,physics:i,ambience:r,feedback:s}),this.items=[],this.active=null,this.leftovers=[]}get busy(){return!!this.active}start(t,e,i,r=!1){this.clearLeftovers();let s=!(t&&t.isVector3),a=s?this.board.tile(t).group.position.clone().add(new A(0,.35,0)):t.clone();s&&this.ambience.puff?.(a,"launch");let o=r||globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches||!1,l=e.flatMap(h=>{if(h.kind!=="cash")return[h];let d=Math.max(0,Number(this.board.state[h.to]?.drop?.cash)||0),u=Du(d+h.amount),f=u-Du(d),m=h.sink?Math.min(4,Math.max(1,h.count||1)):Math.max(1,f);return Array.from({length:m},(w,g)=>({...h,pose:ba(h.sink?g:Math.max(0,u-m+g)),replacement:!h.sink&&f===0,lead:g===0}))}),c=l.map((h,d)=>{let u=this.board.tile(h.to).group.position.clone().add(h.kind==="cash"?new A(h.pose.x,.183+h.pose.y,h.pose.z):new A(0,.45,0)),f=Math.hypot(u.x-a.x,u.z-a.z),m=o?.24:di(.72+f*.035,.78,1.25),g=8*(o?0:di(1.2+f*.15,1.4,2.8))/(m*m),_=(u.y-a.y+g*m*m/2)/m,[b,T]=h.map.userData.size||[h.map.image.width,h.map.image.height],v=Pm/Math.max(b,T),E=(BE[h.kind]??Pm)/Pm,R=h.kind==="cash"?Vp():new Cn(new fn({map:h.map,alphaTest:.12}));h.kind==="cash"&&R.scale.setScalar(xa),R.renderOrder=h.kind==="cash"?this.board.tile(h.to).coins.renderOrder:6,R.visible=!1;let I=new Bt(new sr(.26,28).rotateX(-Math.PI/2),Wr(.3));return I.renderOrder=1,I.visible=!1,this.scene.add(R,I),{d:h,src:a,dest:u,T:m,g,v0:_,reduced:o,targetRotation:new Se().setFromEuler(new dn(0,h.pose?.yaw||0,0)),base:[b*v,T*v],fly:E,sprite:R,shadow:I,t:-d*(o?0:Math.min(.065,.8/Math.max(1,l.length-1))),phase:"wait",spin:(Math.random()<.5?-1:1)*(7+Math.random()*4),landT:0}});this.active={items:c,done:i,finished:!1}}groundY(t,e){let i=this.physics?.ray(new A(t,6,e),new A(0,-1,0),8,gi.floor|gi.tiles);return i?i.point.y:0}update(t){let e=this.active;if(!e)return;let i=!0;for(let r of e.items){if(r.t+=t,r.d.kind==="cash"){let s=this.board.tile(r.d.to),a=r.d.pose;r.dest.copy(s.group.localToWorld(new A(a.x,.183+a.y,a.z))),r.v0=(r.dest.y-r.src.y+r.g*r.T*r.T/2)/r.T}if(r.phase==="wait"){if(i=!1,r.t<0)continue;r.phase="fly",r.sprite.visible=!0,r.shadow.visible=!0,r.d.lead!==!1&&this.feedback("drop_launch",r.src)}if(r.phase==="fly"){i=!1;let s=Math.min(r.t,r.T),a=s/r.T,o=r.src.clone().lerp(r.dest,a);if(o.y=r.src.y+r.v0*s-r.g*s*s/2,r.sprite.position.copy(o),r.d.kind==="cash")r.sprite.scale.setScalar(xa),r.sprite.rotation.set(r.reduced?0:.8+r.t*r.spin,r.t*1.3,.2),r.sprite.quaternion.slerp(r.targetRotation,Xi.cubicOut(di((a-.65)/.35,0,1)));else{let l=Xi.backOut(Math.min(1,r.t/.16));r.sprite.scale.set(r.base[0]*l*r.fly,r.base[1]*l*r.fly,1),r.sprite.material.rotation=r.reduced?0:Math.sin(r.t*3.1)*.3*(1-a)}this.placeShadow(r,o),r.t>=r.T&&(r.phase="land",r.landT=0,r.d.kind!=="cash"&&(r.sprite.material.rotation=0),this.ambience.puff?.(new A(r.dest.x,r.dest.y-.27,r.dest.z),r.d.kind),r.d.lead!==!1&&this.feedback(r.d.kind==="cash"?"drop_coin":"drop_land",r.dest))}else if(r.phase==="land"){r.landT+=t;let s=Math.min(1,r.landT/(r.reduced?.12:.32)),a=r.reduced?0:Math.sin(s*Math.PI)*.12*(1-s);if(r.sprite.position.set(r.dest.x,r.dest.y+a,r.dest.z),r.d.kind==="cash")r.sprite.scale.setScalar(xa),r.sprite.rotation.set(r.reduced?0:Math.sin(s*Math.PI*2)*.16*(1-s),r.d.pose.yaw,0);else{let o=r.fly+(1-r.fly)*Xi.cubicOut(s);r.sprite.scale.set(r.base[0]*o,r.base[1]*o,1)}s===1&&(r.phase=r.d.sink?"sink":"rest",r.sinkT=0,r.d.kind==="cash"&&!r.d.sink&&(this.board.tile(r.d.to).group.add(r.sprite),r.sprite.position.set(r.d.pose.x,.183+r.d.pose.y,r.d.pose.z),r.d.replacement&&(r.sprite.visible=!1))),i=!1,this.placeShadow(r,r.sprite.getWorldPosition(new A))}else if(r.phase==="sink"){r.sinkT+=t;let s=Math.min(1,r.sinkT/(r.reduced?.1:.26));r.sprite.position.set(r.dest.x,r.dest.y-.14*s,r.dest.z),r.sprite.scale.setScalar(xa*(1-Xi.cubicIn(s))),r.shadow.material.opacity=.32*(1-s),s===1?(r.phase="gone",r.sprite.visible=!1,r.shadow.visible=!1):i=!1}else r.phase!=="gone"&&this.placeShadow(r,r.sprite.getWorldPosition(new A))}i&&!e.finished&&(e.finished=!0,setTimeout(()=>e.done?.(),180))}placeShadow(t,e){let i=this.groundY(e.x,e.z),r=Math.max(0,e.y-(t.d.kind==="cash"?.035:.27)-i),s=di(1-r/3.4,.22,1);if(t.shadow.position.set(e.x,i+.007,e.z),t.shadow.scale.setScalar(.55+s*.55),t.shadow.material.opacity=.32*s,t.d.kind==="cash"&&!t.d.sink){let a=this.board.tile(t.d.to),o=a.pileShadow,l=t.phase==="rest"?1:t.phase==="land"?Xi.cubicOut(Math.min(1,t.landT/(t.reduced?.12:.32))):0;t.shadow.position.lerp(o.getWorldPosition(new A),l),t.shadow.scale.lerp(o.getWorldScale(new A),l);let c=t.d.lead&&!o.visible?o.material.opacity:0;t.shadow.material.opacity+=(c-t.shadow.material.opacity)*l}}finish(){this.active&&(this.leftovers.push(...this.active.items),this.active=null,this.clearLeftovers())}clearLeftovers(){for(let t of this.leftovers)t.sprite.removeFromParent(),t.shadow.removeFromParent(),t.d.kind!=="cash"&&t.sprite.material.dispose(),t.shadow.geometry.dispose(),t.shadow.material.dispose();this.leftovers=[]}frame(){return this.active?[this.active.items[0].src,...this.active.items.map(e=>e.dest)]:null}};var Fw=[[-.2,-.05],[.2,-.05],[-.12,.16],[.12,.16]],Im=128,Lm=168;function zE(n,t,e){let i=document.createElement("canvas");i.width=Im,i.height=Lm;let r=i.getContext("2d"),s=50,a=Im/2,o=56;r.fillStyle="#25221c",r.fillRect(a-4,o+s-6,8,Lm-(o+s)-4),e&&(r.beginPath(),r.arc(a,o,s+9,0,Math.PI*2),r.fillStyle="#fbf0d4",r.fill()),r.beginPath(),r.arc(a+4,o+6,s,0,Math.PI*2),r.fillStyle="rgba(37,34,28,.55)",r.fill(),r.beginPath(),r.arc(a,o,s,0,Math.PI*2),r.fillStyle=n,r.fill(),r.lineWidth=7,r.strokeStyle="#25221c",r.stroke(),r.fillStyle="#fbf0d4",r.font='800 58px "Golos Text", Arial, sans-serif',r.textAlign="center",r.textBaseline="middle",r.fillText(String(t||"?").slice(0,1).toUpperCase(),a,o+3);let l=new ei(i);return l.colorSpace=Wi,l.anisotropy=4,l}var Bd=class{constructor(t,e){this.group=new Pe,this.group.name="mp-rivals",t.add(this.group),this.tilePos=e,this.items=new Map}set(t){let e=new Set;for(let i of Array.isArray(t)?t:[]){if(!i||!i.pid)continue;e.add(i.pid);let r=this.items.get(i.pid),s=`${i.color}|${i.letter}|${i.on?1:0}`;if(!r){let a=new fn({alphaTest:.1,depthTest:!0,transparent:!0});r={sprite:new Cn(a),key:""},r.sprite.renderOrder=3,this.group.add(r.sprite),this.items.set(i.pid,r)}r.key!==s&&(r.key=s,r.sprite.material.map?.dispose(),r.sprite.material.map=zE(i.color,i.letter,i.on),r.sprite.material.needsUpdate=!0),Object.assign(r,{a:+i.a||0,b:Number.isFinite(+i.b)?+i.b:+i.a||0,k:Math.max(0,Math.min(1,+i.k||0)),seat:+i.seat||0,on:!!i.on,off:!!i.off}),r.sprite.material.opacity=r.off?.45:1,this.place(r)}for(let[i,r]of this.items)e.has(i)||(this.group.remove(r.sprite),r.sprite.material.map?.dispose(),r.sprite.material.dispose(),this.items.delete(i))}place(t){let e=this.tilePos(t.a%40),i=this.tilePos(t.b%40),r=e.clone().lerp(i,t.k),s=Fw[t.seat]||Fw[0];r.x+=s[0],r.z+=s[1],r.y+=.62+Math.sin(Math.PI*t.k)*.28;let a=t.on?.5:.42;t.sprite.position.copy(r),t.sprite.scale.set(a,a*Lm/Im,1)}};function kE(n){let t=n.slice().sort((s,a)=>s[0]-a[0]||s[1]-a[1]),e=(s,a,o)=>(a[0]-s[0])*(o[1]-s[1])-(a[1]-s[1])*(o[0]-s[0]),i=[],r=[];for(let s of t){for(;i.length>=2&&e(i[i.length-2],i[i.length-1],s)<=0;)i.pop();i.push(s)}for(let s=t.length-1;s>=0;s--){let a=t[s];for(;r.length>=2&&e(r[r.length-2],r[r.length-1],a)<=0;)r.pop();r.push(a)}return i.slice(0,-1).concat(r.slice(0,-1))}function HE(n,t,e){let i=0;for(let r=0;r<n.length;r++){let s=n[r],a=n[(r+1)%n.length],o=(a[0]-s[0])*(e-s[1])-(a[1]-s[1])*(t-s[0]);if(o!==0){if(i===0)i=Math.sign(o);else if(Math.sign(o)!==i)return!1}}return!0}var zd=class{constructor(t,e,i=[]){this.spec=t;let r=t.extent,s=t.cell,a=Math.ceil(2*r/s)+1;Object.assign(this,{E:r,h:s,N:a}),this.dir=new ct(t.dir[0],t.dir[1]).normalize();let o=t.height,l=[];for(let h of e){if(h.kind==="cylinder"){let T=h.center.y-h.halfHeight,v=h.center.y+h.halfHeight;if(T>o||v<t.minTop)continue;l.push({circle:[h.center.x,h.center.z,h.radius]});continue}let d=1/0,u=-1/0,f=[];for(let T of h.points){let v=T.y+h.center.y;d=Math.min(d,v),u=Math.max(u,v),f.push([T.x+h.center.x,T.z+h.center.z])}if(d>o||u<t.minTop)continue;let m=kE(f),w=1/0,g=-1/0,_=1/0,b=-1/0;for(let[T,v]of m)w=Math.min(w,T),g=Math.max(g,T),_=Math.min(_,v),b=Math.max(b,v);l.push({poly:m,box:[w,g,_,b]})}for(let h of i)l.push({poly:[[h.x-.5,h.z-.5],[h.x+.5,h.z-.5],[h.x+.5,h.z+.5],[h.x-.5,h.z+.5]],box:[h.x-.5,h.x+.5,h.z-.5,h.z+.5],low:!0});this.obstacles=l;let c=new Uint8Array(a*a);for(let h=0;h<a;h++)for(let d=0;d<a;d++){let u=-r+d*s,f=-r+h*s;for(let m of l){if(m.low&&!t.tilesBlock)continue;if(m.circle){let[T,v,E]=m.circle;if((u-T)**2+(f-v)**2<=E*E){c[h*a+d]=1;break}continue}let[w,g,_,b]=m.box;if(!(u<w||u>g||f<_||f>b)&&HE(m.poly,u,f)){c[h*a+d]=1;break}}}this.solid=c,this.solve()}solve(){let{N:t,h:e,solid:i}=this,r=this.dir.x,s=this.dir.y,a=new Float32Array(t*t),o=(f,m)=>m*t+f,l=this.spec.iterations,c=1.8;for(let f=0;f<l;f++)for(let m=1;m<t-1;m++)for(let w=1;w<t-1;w++){let g=o(w,m);if(i[g])continue;let _=0,b=0,T=[[w+1,m,1,0],[w-1,m,-1,0],[w,m+1,0,1],[w,m-1,0,-1]];for(let[v,E,R,I]of T){let x=o(v,E);i[x]?_+=a[g]-(r*R+s*I)*e:_+=a[x],b++}a[g]+=c*(_/b-a[g])}let h=new Float32Array(t*t),d=new Float32Array(t*t);for(let f=0;f<t;f++)for(let m=0;m<t;m++){let w=o(m,f);if(i[w])continue;let g=(_,b,T,v)=>{if(_<0||b<0||_>=t||b>=t)return a[w];let E=o(_,b);return i[E]?a[w]-(r*T+s*v)*e:a[E]};h[w]=r+(g(m+1,f,1,0)-g(m-1,f,-1,0))/(2*e),d[w]=s+(g(m,f+1,0,1)-g(m,f-1,0,-1))/(2*e)}this.vx=h,this.vz=d;let u=0;for(let f=0;f<t*t;f++)u=Math.max(u,Math.hypot(h[f],d[f]));this.maxSpeed=u}sample(t,e,i){let{E:r,h:s,N:a}=this,o=(t+r)/s,l=(e+r)/s,c=Math.floor(o),h=Math.floor(l);if(c<0||h<0||c>=a-1||h>=a-1)return i.x=this.dir.x,i.y=this.dir.y,!1;let d=o-c,u=l-h,f=h*a+c,m=f+1,w=f+a,g=w+1;return i.x=(this.vx[f]*(1-d)+this.vx[m]*d)*(1-u)+(this.vx[w]*(1-d)+this.vx[g]*d)*u,i.y=(this.vz[f]*(1-d)+this.vz[m]*d)*(1-u)+(this.vz[w]*(1-d)+this.vz[g]*d)*u,!this.solid[Math.round(l)*a+Math.round(o)]}isSolid(t,e){let i=Math.round((t+this.E)/this.h),r=Math.round((e+this.E)/this.h);return i>=0&&r>=0&&i<this.N&&r<this.N&&!!this.solid[r*this.N+i]}toCanvas(){let{N:t}=this,e=document.createElement("canvas");e.width=e.height=t;let i=e.getContext("2d"),r=i.createImageData(t,t);for(let s=0;s<t;s++)for(let a=0;a<t;a++){let o=s*t+a,l=o*4;if(this.solid[o]){r.data.set([20,16,12,255],l);continue}let c=Math.hypot(this.vx[o],this.vz[o]),h=[[0,[58,36,92]],[.7,[70,110,150]],[1,[62,150,130]],[1.35,[150,200,90]],[1.8,[245,210,80]]],d=h[0],u=h[h.length-1];for(let m=0;m<h.length-1;m++)if(c>=h[m][0]&&c<=h[m+1][0]){d=h[m],u=h[m+1];break}let f=u[0]>d[0]?Math.min(1,Math.max(0,(c-d[0])/(u[0]-d[0]))):1;r.data.set([0,1,2].map(m=>Math.round(d[1][m]+(u[1][m]-d[1][m])*f)).concat(255),l)}return i.putImageData(r,0,0),e}};var kd=class{constructor(t,e,i,r){this.reducedMotion=matchMedia("(prefers-reduced-motion: reduce)"),this.scene=t,this.spec=e,this.enabled=!0,this.t=0,this.field=new zd(e,i,r);let a=matchMedia("(max-width: 500px)").matches?e.particlesMobile:e.particles;this.N=a,this.pos=new Float32Array(a*3),this.life=new Float32Array(a),this.speed=new Float32Array(a),this.born=new Float32Array(a);let o=new Float32Array(a);for(let h=0;h<a;h++)this.spawn(h,!0),o[h]=Math.random();let l=new _e;l.setAttribute("position",new ui(this.pos,3)),l.setAttribute("tone",new ui(o,1)),l.setAttribute("fade",new ui(new Float32Array(a),1)),this.geo=l;let c=Math.min(devicePixelRatio||1,2);this.points=new Oo(l,new ge({transparent:!0,depthWrite:!1,uniforms:{size:{value:e.size*c},dry:{value:!!e.dry}},vertexShader:`uniform float size; attribute float tone; attribute float fade; varying float vT; varying float vF;
        void main(){ vT = tone; vF = fade; gl_PointSize = size * (0.7 + tone * 0.6); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform bool dry; varying float vT; varying float vF;
        void main(){ vec2 q = gl_PointCoord - 0.5; if(dry)q.y=(q.y+q.x*.3)*2.8; float d = length(q); if (d > 0.5) discard;
          vec3 c = dry?mix(vec3(.66,.43,.20),vec3(.90,.74,.43),vT):mix(vec3(0.93, 0.84, 0.62), vec3(1.0, 0.96, 0.84), vT);
          gl_FragColor = vec4(c, vF * smoothstep(0.5, 0.25, d)); }`})),this.points.frustumCulled=!1,this.points.renderOrder=4,t.add(this.points),this.debugMesh=null}spawn(t,e){let{E:i}=this.field,r=this.field.dir,s=this.spec,a,o,l=0;do if(e||Math.random()<.35)a=(Math.random()*2-1)*i*.95,o=(Math.random()*2-1)*i*.95;else{let c=(Math.random()*2-1)*i,h=-i*.95;a=r.x*h-r.y*c,o=r.y*h+r.x*c}while(this.field.isSolid(a,o)&&++l<8);this.pos[t*3]=a,this.pos[t*3+1]=s.minY+Math.pow(Math.random(),1.8)*(s.maxY-s.minY),this.pos[t*3+2]=o,this.life[t]=s.life*(.5+Math.random()),this.speed[t]=.75+Math.random()*.5}setEnabled(t){this.enabled=t,this.points.visible=t}update(t){if(this.reducedMotion.matches){this.points.visible=!1;return}if(this.points.visible=this.enabled,!this.enabled)return;t=Math.min(t,.05),this.t+=t;let e=this.spec,i=this.t,r=this.field.E,s=.2+.8*Math.max(0,Math.sin(i*.43))**2,a=e.speed*(e.dry?.4+s*1.25:.8+.35*Math.max(0,Math.sin(i*.33))+.15*Math.sin(i*1.4+1.3)),o=new ct,l=this.geo.attributes.fade.array;for(let c=0;c<this.N;c++){let h=c*3,d=this.pos[h],u=this.pos[h+1],f=this.pos[h+2],m=this.field.sample(d,f,o),w=e.turbulence*(1.2-u),g=Math.sin(f*3.1+i*2.3+c)*w,_=Math.cos(d*2.7-i*1.9+c*.7)*w,b=a*this.speed[c];if(d+=(o.x*b+g)*t,f+=(o.y*b+_)*t,u+=Math.sin(i*3+c*1.3)*.12*t,this.life[c]-=t,!m||this.life[c]<=0||Math.abs(d)>r||Math.abs(f)>r||this.field.isSolid(d,f)){this.spawn(c,!1),this.born[c]=0,l[c]=0;continue}this.pos[h]=d,this.pos[h+1]=Math.max(e.minY,Math.min(e.maxY,u)),this.pos[h+2]=f,this.born[c]=Math.min(1,this.born[c]+t*2.5),l[c]=this.born[c]*Math.min(1,this.life[c]/.8)*e.opacity,e.dry&&(l[c]*=(.12+.88*s)*(.3+.7*Math.max(0,Math.sin(d*.75+f*.4-i*.9))))}this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.fade.needsUpdate=!0}showMap(t){if(!t){this.debugMesh&&(this.debugMesh.visible=!1);return}if(!this.debugMesh){let e=this.field,i=e.toCanvas(),r=4,s=document.createElement("canvas");s.width=s.height=e.N*r;let a=s.getContext("2d");a.imageSmoothingEnabled=!1,a.drawImage(i,0,0,s.width,s.height),a.strokeStyle="#1a140e",a.lineWidth=1.6;for(let c=4;c<e.N;c+=8)for(let h=4;h<e.N;h+=8){let d=c*e.N+h;if(e.solid[d])continue;let u=e.vx[d],f=e.vz[d],m=Math.hypot(u,f)||1,w=9*Math.min(1.6,m),g=h*r,_=c*r,b=g+u/m*w,T=_+f/m*w;a.beginPath(),a.moveTo(g-u/m*w*.3,_-f/m*w*.3),a.lineTo(b,T),a.lineTo(b-(u/m*4-f/m*3),T-(f/m*4+u/m*3)),a.stroke()}let o=new ei(s);o.colorSpace=Ke;let l=new ii(2*e.E,2*e.E);l.rotateX(-Math.PI/2),this.debugMesh=new Bt(l,new Be({map:o,transparent:!0,opacity:.62,depthTest:!1})),this.debugMesh.position.y=.03,this.debugMesh.renderOrder=30,this.scene.add(this.debugMesh)}this.debugMesh.visible=!0}};var Kl=[[638,882],[780,806],[929,728]],Yr=66,Ql=80,Uw=32,VE=180;function Ow(n){let t=Uw*Math.cos(n),e=Uw*Math.sin(n),i=(u,f)=>[u*Yr/Ql,-.526*u*Yr/Ql+f],r=i(t,e),s=Kl.map(([u,f])=>[u+r[0],f+r[1]]),a=-58,o=t-Math.sqrt(VE**2-(e-a)**2),[l,c]=Kl[0],h=i(o,a),d=i(-250,a);return{pins:s,slider:[l+h[0],c+h[1]],piston:[l+d[0],c+d[1]],h:t,z:e,sliderH:o,sliderZ:a}}function Bw(n=!1){let t=document.createElement("canvas");t.width=n?96:256,t.height=n?96:32;let e=t.getContext("2d");if(n){e.fillStyle="#292522",e.beginPath(),e.ellipse(48,48,43,43,0,0,Math.PI*2),e.fill();let r=e.createLinearGradient(10,4,75,90);r.addColorStop(0,"#f0ddbb"),r.addColorStop(.45,"#a69b89"),r.addColorStop(1,"#574f44"),e.fillStyle=r,e.beginPath(),e.arc(48,48,36,0,Math.PI*2),e.fill(),e.strokeStyle="#524a40",e.lineWidth=5,e.beginPath(),e.arc(48,48,24,0,Math.PI*2),e.stroke(),e.fillStyle="#d3c3a7",e.beginPath(),e.arc(44,43,15,0,Math.PI*2),e.fill()}else{e.fillStyle="#302a23",e.fillRect(0,0,256,32);let r=e.createLinearGradient(0,2,0,30);r.addColorStop(0,"#f0dec0"),r.addColorStop(.26,"#b9ac94"),r.addColorStop(.64,"#a49885"),r.addColorStop(1,"#514a3f"),e.fillStyle=r,e.fillRect(0,4,256,23),e.fillStyle="#e2d2b3",e.fillRect(0,4,256,3);for(let s=0;s<256;s+=7)e.fillStyle=s%3?"#a69a8520":"#fff2d520",e.fillRect(s,8,2,15)}let i=new ei(t);return i.colorSpace=Ke,i}var Hd=class{constructor(t,e,i){this.angle={value:0},this.localPoint=i,e.material.onBeforeCompile=o=>{o.uniforms.driveAngle=this.angle,o.fragmentShader=`uniform float driveAngle;
`+o.fragmentShader;let l=$t.map_fragment,c=`
        vec2 driveUV=vMapUv;
        vec2 pixel=vec2(driveUV.x,1.0-driveUV.y)*1254.0;
        ${Kl.map(([h,d])=>`{
          vec2 d=pixel-vec2(${h}.0,${d}.0);
          vec2 q=vec2(d.x/${Yr}.0,(d.y+.526*d.x)/${Ql}.0);
          float r=length(q);
          if(r<.88){
            float c=cos(driveAngle),s=sin(driveAngle);
            vec2 from=vec2(c*q.x+s*q.y,-s*q.x+c*q.y);
            vec2 source=vec2(${h}.0,${d}.0)+vec2(from.x*${Yr}.0,-.526*from.x*${Yr}.0+from.y*${Ql}.0);
            vec2 sampled=vec2(source.x/1254.0,1.0-source.y/1254.0);
            driveUV=mix(driveUV,sampled,1.0-smoothstep(.83,.88,r));
          }
        }`).join(`
`)}
      `;o.fragmentShader=o.fragmentShader.replace("#include <map_fragment>",c+l.replaceAll("vMapUv","driveUV"))},e.material.customProgramCacheKey=()=>"steam-drive-v1";let r=Bw(),s=Bw(!0),a=o=>{let l=new _e;l.setAttribute("position",new jt(new Float32Array(12),3)),l.setAttribute("uv",new jt([0,1,1,1,0,0,1,0],2)),l.setIndex([0,2,1,2,3,1]);let c=new Bt(l,new Be({map:o,transparent:!0,depthWrite:!1,side:Ge}));return c.frustumCulled=!1,c.renderOrder=2,t.add(c),c};this.bars=Array.from({length:4},()=>a(r)),this.pins=Kl.map(()=>a(s)),this.update(0)}quad(t,e,i){let r=t.geometry.attributes.position;e.forEach(([s,a],o)=>{let l=this.localPoint(s,a).addScaledVector(oi,i);r.setXYZ(o,l.x,l.y,l.z)}),r.needsUpdate=!0}bar(t,e,i,r,s){let a=Math.hypot(i[0]-e[0],i[1]-e[1]),o=-(i[1]-e[1])/a*r/2,l=(i[0]-e[0])/a*r/2;this.quad(t,[[e[0]+o,e[1]+l],[i[0]+o,i[1]+l],[e[0]-o,e[1]-l],[i[0]-o,i[1]-l]],s)}update(t){this.angle.value=t;let e=Ow(t),i=e.pins;this.bar(this.bars[0],i[0],i[1],13,.016),this.bar(this.bars[1],i[1],i[2],13,.016),this.bar(this.bars[2],e.piston,e.slider,7,.018),this.bar(this.bars[3],e.slider,i[0],10,.022),this.pins.forEach((r,s)=>{let[a,o]=i[s],l=15,c=20;this.quad(r,[[a-l,o-c+l*.526],[a+l,o-c-l*.526],[a-l,o+c+l*.526],[a+l,o+c-l*.526]],.027)})}};var zw=`
varying vec2 vUv; varying vec3 smokeWorld;
void main(){ vUv=vec2(uv.x,1.0-uv.y); smokeWorld=(modelMatrix*vec4(position,1.0)).xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,kw=hr+`
uniform float life;
uniform float seed;
varying vec2 vUv; varying vec3 smokeWorld;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
void main(){
  vec2 p=(vUv-.5)*2.0;
  float t=life*3.2;
  vec2 drift=vec2(seed*2.71+t*.22,seed*.83-t*.38);
  float n=noise(p*3.1+drift)*.64+noise(p*6.3-drift)*.26+noise(p*12.0+drift)*.10;
  // Turbulence breaks the contour and continuously rolls across each puff.
  float edge=length(p*vec2(.94,1.0))+(n-.5)*.52;
  float density=1.0-smoothstep(.40,.99,edge);
  float fade=1.0-smoothstep(.43,1.0,life);
  float a=density*fade*(.70+.20*n);
  if(a<.004)discard;
  float shade=clamp(.65-p.y*.16-p.x*.12+(n-.5)*.35,0.0,1.0);
  vec3 col=mix(vec3(.65,.66,.65),vec3(.99,.98,.94),shade);
  if(lightOn){
    // \u041E\u043A\u0440\u0443\u0433\u043B\u044B\u0439 \u043A\u043B\u0443\u0431 \u043B\u043E\u0432\u0438\u0442 \u0441\u043E\u043B\u043D\u0446\u0435 \u0441 \u043D\u0443\u0436\u043D\u043E\u0439 \u0441\u0442\u043E\u0440\u043E\u043D\u044B, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0442\u043E\u043D\u043A\u0438\u0439 \u043A\u0440\u0430\u0439.
    vec3 normal=normalize(vec3(.54,.64,.54)*sqrt(max(.05,1.-dot(p,p)))+vec3(.707,0.,-.707)*p.x+vec3(-.455,.766,-.455)*(-p.y));
    float back=pow(max(dot(-sunDirection,vec3(.54,.64,.54)),0.),3.);
    vec3 l=(ambient*1.15+sunColor*sunPower*(.25+.65*max(dot(normal,sunDirection),0.))*visibilityAt(smokeWorld)+practicalLight(smokeWorld,normal)*.7)/vec3(1.0,.95,.90);
    l+=sunColor*sunPower*back*(1.-density)*.65;
    col=shoulder(col*l);
  }
  gl_FragColor=vec4(col,a);
}`;function Hw(n,t=!1){let e=n.onBeforeCompile,i=n.customProgramCacheKey;n.onBeforeCompile=r=>{e.call(n,r),Object.assign(r.uniforms,Kt,{trainHead:{value:+t}}),r.vertexShader=`varying vec3 trainWorld; varying vec2 trainUV;
`+r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
trainWorld=(modelMatrix*vec4(position,1.)).xyz;trainUV=uv;`),r.fragmentShader=hr+`
uniform float trainHead; varying vec3 trainWorld; varying vec2 trainUV;
`+r.fragmentShader.replace("#include <opaque_fragment>",`
    if (lightOn) {
      vec3 trainNormal = normalize(mix(vec3(.71,.15,.69), vec3(.25,.94,.25), smoothstep(.45,.82,trainUV.y)));
      // \u0412 \u043F\u043E\u043B\u0434\u0435\u043D\u044C \u2248 1 (\u043D\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u043A\u0430 1.10/1.07/1.03), \u0447\u0442\u043E\u0431\u044B \u0434\u043D\u0451\u043C \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u0441\u043E\u0441\u0442\u0430\u0432\u0430 \u043D\u0435 \u043C\u0435\u043D\u044F\u043B\u0441\u044F.
      vec3 illumination = (ambient*1.15 + sunColor*sunPower*(.22+.58*max(dot(trainNormal,sunDirection),0.))*visibilityAt(trainWorld)
        + practicalLight(trainWorld,trainNormal)) * 1.2 / vec3(1.10,1.07,1.03);
      outgoingLight = shoulder(outgoingLight * max(illumination, vec3(.17,.22,.31)));
      // \u041B\u0430\u043C\u043F\u0430 \u0444\u0430\u0440\u044B \u043D\u0430 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0435 \u043F\u0430\u0440\u043E\u0432\u043E\u0437\u0430 \u0441\u0432\u0435\u0442\u0438\u0442\u0441\u044F \u0441\u0430\u043C\u0430.
      vec2 lampPixel = vec2(trainUV.x, 1.-trainUV.y) * 1254.;
      float bulb = 1.-smoothstep(.45,1.,length((lampPixel-vec2(340.,560.))/vec2(20.,29.)));
      outgoingLight = mix(outgoingLight, vec3(1.,.94,.70), bulb*engineOn*lampsOn*trainHead);
    }
    #include <opaque_fragment>`)},n.customProgramCacheKey=()=>(i?i.call(n):"")+"|train-scene-light-v1",n.needsUpdate=!0}var Gw=72,Dm=2e3/Gw,Nm=Dm+1.5,Ww=.08,Xw=.18;function GE(n){return Mu(n)-18}var vs=[{anchor:[410,1065],slope:-.526,scale:.17,offset:0,stack:[414,396]},{anchor:[417,1110],slope:-.538,scale:.14,offset:151},{anchor:[360,1153],slope:-.5482298803,scale:.14,offset:279}],Vw=zp;function qw(n,t,e){let i=Math.atan(ji/Vw)-Math.atan(n.slope),r=t-n.anchor[0],s=e-n.anchor[1];return[(r*Math.cos(i)-s*Math.sin(i))*n.scale,(r*Math.sin(i)+s*Math.cos(i))*n.scale*Vw]}function Yw(n,t){return t===0?0:(Math.sin(n*1.75-t*1.9)+.25*Math.sin(n*2.9+t))*.004}function Jw(n){let t=(n%Nm+Nm)%Nm,e=1600-Math.min(t,Dm)*Gw;return{x:e,y:GE(e),moving:t<Dm}}var eo=Su;function jw(n,t){return t===0?0:.42*Math.sin(n*1.35-t*1.8)+.12*Math.sin(n*2.15-t*.7)}var Vd=class{constructor(t,e){this.enabled=!0,this.reducedMotion=matchMedia("(prefers-reduced-motion: reduce)"),this.time=10.416667,this.preview=null,this.covered=!1;try{let l=window.parent.document.body,c=()=>{this.covered=l.classList.contains("shipment-playing")};this.hostObserver=new MutationObserver(c),this.hostObserver.observe(l,{attributes:!0,attributeFilter:["class"]}),c()}catch{}this.emission=0,this.cursor=0,this.root=new Pe,t.add(this.root);let i=gn(...eo(0,0)),r=(l,c,h)=>{let[d,u]=qw(l,c,h),f=(ji*d-u)*1024/1254/.676/dl+.06;return br(...eo(d,u),f).sub(i)};this.trackStep=gn(...eo(1,ji)).sub(i),this.trackAxis=this.trackStep.clone().normalize(),this.parts=vs.map((l,c)=>{let h=e[c],d=h.image.width,u=h.image.height,f=new _e,m=[[0,0],[d,0],[0,u],[d,u]].map(g=>r(l,...g));f.setAttribute("position",new jt(m.flatMap(g=>g.toArray()),3)),f.setAttribute("uv",new jt([0,1,1,1,0,0,1,0],2)),f.setIndex([0,2,1,2,3,1]),f.computeBoundingSphere();let w=new Bt(f,new Be({map:h,transparent:!1,alphaTest:.35,depthWrite:!0,side:Ge}));return w.position.copy(gn(...eo(l.offset,ji*l.offset)).sub(i)).addScaledVector(oi,-c*Ww),w.userData.restPosition=w.position.clone(),this.root.add(w),w}),this.drive=new Hd(this.root,this.parts[0],(l,c)=>r(vs[0],l,c)),this.root.traverse(l=>{l.material&&Hw(l.material,l===this.parts[0])}),this.stack=r(vs[0],...vs[0].stack);let s=new ii(1,1),a=new Se().setFromRotationMatrix(new he().makeBasis(pe,Ne,oi));this.lamp=r(vs[0],340,560);let o=new Bt(new ii(.5,.5),new ge({uniforms:Kt,transparent:!0,depthWrite:!1,blending:Qo,vertexShader:"varying vec2 lampUV;varying vec3 lampWorld;void main(){lampUV=uv;lampWorld=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 lampUV;varying vec3 lampWorld;uniform bool lightOn;uniform float night,lampsOn,engineOn;void main(){if(!lightOn)discard;vec2 plateUV=vec2(dot(lampWorld,vec3(.70710678,0.,-.70710678))*80.629921/1536.+.5,dot(lampWorld,vec3(-.45451948,.76604444,-.45451948))*80.629921/1024.+.5);if(plateUV.x<0.||plateUV.x>1.||plateUV.y<0.||plateUV.y>1.)discard;float r=length(lampUV-.5)*2.;float a=(exp(-r*r*9.)*.30+exp(-r*r*90.)*.65)*(1.-smoothstep(.7,1.,r));gl_FragColor=vec4(1.,.72,.30,a*engineOn*lampsOn*(.4+.6*night));}"}));o.position.copy(this.lamp).addScaledVector(oi,.045),o.quaternion.copy(a),this.root.add(o),this.puffs=Array.from({length:36},(l,c)=>{let h=new Bt(s,new ge({transparent:!0,depthWrite:!1,side:Ge,uniforms:{...Kt,life:{value:0},seed:{value:c*.73}},vertexShader:zw,fragmentShader:kw}));return h.quaternion.copy(a),h.visible=!1,t.add(h),{mesh:h,age:10,origin:new A,seed:c}}),this.update(0)}update(t){let e=this.enabled&&!this.reducedMotion.matches&&this.preview===null&&!this.covered&&!document.hidden;e&&(this.time+=t);let i=Jw(this.preview??this.time),r=this.preview??this.time;if(this.parts.forEach((s,a)=>{s.quaternion.setFromAxisAngle(this.trackAxis,this.reducedMotion.matches?0:Yw(r,a)),s.position.copy(s.userData.restPosition).addScaledVector(this.trackStep,this.reducedMotion.matches?0:jw(r,a))}),this.drive.update(-(1600-i.x)/(Yr*vs[0].scale)),this.root.position.copy(gn(...eo(i.x,Mu(i.x)))).addScaledVector(oi,Xw),Kt.enginePosition.value.copy(this.root.position).add(this.lamp),Kt.engineDirection.value.copy(this.trackAxis).multiplyScalar(-1),Kt.engineDirection.value.y=-.18,Kt.engineDirection.value.normalize(),Kt.engineOn.value=this.enabled?1:0,e&&i.moving&&(this.emission+=t,this.emission>=.11)){this.emission%=.11;let s=this.puffs[this.cursor++%this.puffs.length];s.age=0,s.origin.copy(this.root.position).add(this.stack)}for(let s of this.puffs){if(!e){s.mesh.visible=!1,s.age=10;continue}if(s.age+=t,s.mesh.visible=s.age<3.2,!s.mesh.visible)continue;let a=s.age;s.mesh.position.copy(s.origin).addScaledVector(pe,a*.16+Math.sin(a*2.5+s.seed)*a*.025).addScaledVector(Ne,a*.3),s.mesh.position.y+=Math.sin(a*2+s.seed)*.025;let o=.14+Math.sqrt(a)*.34;s.mesh.scale.set(o*(1+.12*Math.sin(a*2+s.seed)),o,1),s.mesh.material.uniforms.life.value=s.age/3.2}}};var tc=-ji,WE=tc/.72;function Zw(n,t,e=null){let i=((n/22+t*.47)%1+1)%1,r=t?1070-i*1230:-160+i*1230;if(e?.centerline){let[a,o,l]=e.centerline;return[r,a+o*r+l*r*r+e.laneOffsets[t]]}let s=e?e[t]:(t?660:600)+.72*(1-WE)*627;return[r,tc*r+s]}function $w(n,t=null){return t?.centerline?t.centerline[1]+2*t.centerline[2]*n:tc}var Kw=Object.freeze([{size:96,anchor:[296,565],contacts:[[135,470],[457,660]],mirror:!1,wheels:[[133,410,23,39],[456,601,28,43]]},{size:104,anchor:[525,548],contacts:[[355,642],[695,454]],mirror:!0,wheels:[[356,570,26,39],[698,393,23,35]]}]);function Qw(n){let[t,e]=n.contacts,i=Math.atan2(e[1]-t[1],(e[0]-t[0])*(n.mirror?-1:1)),r=n.mirror?Math.atan((t[1]-e[1])/(e[0]-t[0])):i;return-(Math.atan(Math.sin(wa.elevation*Math.PI/180))-r)}var Gd=class{constructor(t,e,{clipOriginal:i=!1,foreground:r=null,route:s=null}={}){this.enabled=!0,this.time=29,this.route=s,this.reduced=matchMedia("(prefers-reduced-motion: reduce)");let a=new Se().setFromRotationMatrix(new he().makeBasis(pe,Ne,oi));this.shadows=[],this.wheelPhases=[],this.baseRotation=a,this.cars=e.map((o,l)=>{o.colorSpace=Ke;let c=Kw[l],h=c.size*(s?.sizeScale||1)*wa.width/wa.squareSize/Bi,d=new ii(h,h);d.translate(h*(.5-c.anchor[0]/768),h*(c.anchor[1]/768-.5),0),c.mirror&&d.scale(-1,1,1),d.rotateZ(Qw(c));let u={value:0};this.wheelPhases.push(u);let f=new Be({map:o,alphaTest:.3,side:Ge});f.onBeforeCompile=g=>{g.uniforms.sfWheelPhase=u,g.uniforms.sfForeground={value:r},g.vertexShader=ds+`
varying vec2 plateCoord;
`+g.vertexShader,g.vertexShader=g.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
plateCoord=original_plate_uv((modelMatrix*vec4(position,1.)).xyz);`);let _=c.wheels.map(b=>`p=spinWheel(p,vec2(${b[0]}.0,${b[1]}.0),vec2(${b[2]}.0,${b[3]}.0));`).join("");g.fragmentShader=ds+`
        varying vec2 plateCoord;uniform float sfWheelPhase;uniform sampler2D sfForeground;
        vec2 spinWheel(vec2 p,vec2 center,vec2 radius){
          vec2 q=(p-center)/radius;float blend=1.-smoothstep(.78,1.,length(q));
          float c=cos(sfWheelPhase),s=sin(sfWheelPhase);
          vec2 r=mat2(c,-s,s,c)*q;
          return mix(p,center+r*radius,blend);
        }
        vec2 sfWheelUV(vec2 uv){vec2 p=vec2(uv.x,1.-uv.y)*768.;${_}return vec2(p.x/768.,1.-p.y/768.);}
        `+g.fragmentShader,g.fragmentShader=g.fragmentShader.replace("#include <map_fragment>","vec4 sampledDiffuseColor=texture2D(map,sfWheelUV(vMapUv));diffuseColor*=sampledDiffuseColor;"),g.fragmentShader=g.fragmentShader.replace("void main() {",`void main() {vec2 frame=${i?"plateCoord":"square_uv(plateCoord)"};if(any(lessThan(frame,vec2(0.)))||any(greaterThan(frame,vec2(1.))))discard;${r?"vec2 fg=square_uv(plateCoord);if(texture2D(sfForeground,vec2(fg.x,1.-fg.y)).r>.38)discard;":""}`)},f.customProgramCacheKey=()=>`sf-traffic-wheels-${l}-${i}-${!!r}`;let m=new Bt(new ii(2,.8),new ge({transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1,vertexShader:ds+"varying vec2 q;varying vec2 plateCoord;void main(){q=uv;plateCoord=original_plate_uv((modelMatrix*vec4(position,1.)).xyz);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:ds+`varying vec2 q;varying vec2 plateCoord;void main(){vec2 frame=${i?"plateCoord":"square_uv(plateCoord)"};if(any(lessThan(frame,vec2(0.)))||any(greaterThan(frame,vec2(1.))))discard;vec2 a=abs(q-.5)*2.;float v=(1.-smoothstep(.45,1.,a.x))*(1.-smoothstep(.25,1.,a.y));gl_FragColor=vec4(.12,.10,.09,v*.30);}`}));m.rotation.x=-Math.PI/2,m.rotation.z=0,m.scale.setScalar(s?.sizeScale||1),t.add(m),this.shadows.push(m);let w=new Bt(d,f);return w.quaternion.copy(a),t.add(w),w}),this.update(0)}update(t){this.enabled&&!this.reduced.matches&&!document.hidden&&(this.time+=t);let e=this.enabled&&!this.reduced.matches,i=Math.floor(this.time*24)/24;this.cars.forEach((r,s)=>{if(this.wheelPhases[s].value=e?this.time*15:0,r.quaternion.copy(this.baseRotation),e){let h=Math.sin(i*9+s*1.7)*.0026;r.quaternion.multiply(new Se().setFromAxisAngle(new A(0,0,1),h))}let a=Zw(this.time,s,this.route?.centerline?this.route:this.route?.intercepts);this.route?.centerline&&r.quaternion.multiply(new Se().setFromAxisAngle(new A(0,0,1),Math.atan(tc)-Math.atan($w(a[0],this.route))));let o=Su(...a),l=gn(...o);r.position.copy(l).addScaledVector(oi,.55),e&&r.position.addScaledVector(Ne,.004*Math.sin(i*13+s*2.1));let c=this.shadows[s];c.position.copy(l),c.position.y=.025,c.visible=!0})}};function XE(n,t,e={x:9.5,top:9,bottom:9.8}){return{title:t,dir:`maps/${n}/`,plate:"plate.webp",square:"plate-square.webp",waterOriginal:"blank.png",waterSquare:"blank.png",foliage:"blank.png",boatPng:"blank.png",colliders:"colliders.json",bounds:e,artWobble:!1,wind:!1,ambience:{smoke:[],metal:[],gulls:!1}}}var qE=[[498,466,11,47,.58],[531,487,12,46,.58],[560,507,11,40,.58],[674,519,12,46,.55],[730,548,25,57,.58],[810,546,24,61,-.58],[870,513,13,43,-.58],[932,518,11,33,-.58],[955,500,11,33,-.58],[983,480,12,40,-.58],[1013,460,12,41,-.58],[1045,440,12,43,-.58],[739,364,6,23,.58],[750,371,6,25,.58],[783,368,6,24,-.58],[793,361,6,24,-.58],[802,355,6,22,-.58],[743,455,8,25,.58],[792,454,8,25,-.58],[521,637,8,25,.55],[559,633,9,25,-.55],[993,636,8,29,.55],[1028,633,9,28,-.55],[23,330,12,33,-.58],[78,303,12,31,-.58],[123,282,11,29,-.58],[164,256,11,30,-.58],[284,35,10,28,.58],[321,61,11,29,.58],[386,57,11,27,-.58],[1275,24,11,34,.55],[1365,31,11,33,.55],[1450,40,10,29,.55],[1411,118,11,49,.55],[1451,154,14,56,.55],[1313,981,11,40,.58],[1354,1007,10,33,.58]],YE={sanfrancisco:{cycle:12,windows:qE,circuits:[{name:"\u0420\u0430\u0442\u0443\u0448\u0430",windows:Array.from({length:19},(n,t)=>t),delay:.25,threshold:.28},{name:"\u0417\u0430\u043F\u0430\u0434\u043D\u044B\u0439 \u043F\u0430\u0432\u0438\u043B\u044C\u043E\u043D",windows:[19,20],delay:1.15,threshold:.43},{name:"\u0412\u043E\u0441\u0442\u043E\u0447\u043D\u044B\u0439 \u043F\u0430\u0432\u0438\u043B\u044C\u043E\u043D",windows:[21,22],delay:1.9,threshold:.57},{name:"\u0417\u0430\u043F\u0430\u0434\u043D\u044B\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B",windows:[23,24,25,26],delay:.7,threshold:.35},{name:"\u0421\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0434\u043E\u043C",windows:[27,28,29],delay:2.5,threshold:.65},{name:"\u0412\u043E\u0441\u0442\u043E\u0447\u043D\u044B\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B",windows:[30,31,32,33,34],delay:1.5,threshold:.5},{name:"\u042E\u0436\u043D\u044B\u0439 \u0434\u043E\u043C",windows:[35,36],delay:3.1,threshold:.7}]},kansas:{cycle:12,dayShare:.94,minimumSunAltitude:.045,moon:!0,windows:[[473,516,7,16,.55],[528,549,7,16,.55],[560,563,7,16,.55],[612,579,7,15,-.55],[793,646,7,16,.55],[848,684,7,16,.55],[926,641,7,17,-.55],[750,271,6,9,.55]],circuits:[{name:"\u0410\u043C\u0431\u0430\u0440",windows:[0,1,2,3],delay:.3,threshold:.28},{name:"\u0421\u043A\u043B\u0430\u0434",windows:[4,5,6],delay:1.4,threshold:.46},{name:"\u042D\u043B\u0435\u0432\u0430\u0442\u043E\u0440",windows:[7],delay:2.6,threshold:.63}]}},JE={sanfrancisco:{dryWind:!0,swayStrength:1,routeGroundShade:1,waterOriginal:"water-matte-original.png",waterSquare:"water-matte-square.png",waterRipple:!1,seaPlate:"plate-square.webp",sway:!0,foliage:"foliage-mask.png",flag:[770,1,36,2.6,220,243,250,268],ambience:{smoke:[],metal:[[765,204],[305,740],[279,209]],gulls:!0,gullRoutes:[[[-140,400],[60,450],[160,820],[430,1180]],[[450,1190],[170,960],[40,750],[-160,500]],[[-180,100],[0,-20],[125,-20],[260,-130]]]}},kansas:{daylight:YE.kansas,railWidth:Oi.width,roadFill:"terrain-clear-square-v3.webp",roadMask:"road-mask-v1.png",plate:"plate-railway.webp",square:"plate-square-railway.webp",train:["locomotive-drive-v3.webp","red-wagon-v2.webp","brown-wagon-v2.webp"],wind:!0,dryWind:!0,swayStrength:2,windOptions:{dir:[-.88,.47],speed:2.7,particles:480,particlesMobile:300,minY:.025,maxY:.38,size:3.4,opacity:.64,dry:!0},waterOriginal:"water-matte-original.png",waterSquare:"water-matte-square.png",waterRipple:!1,riverFlow:!0,seaPlate:"plate-square.webp",sway:!0,bobs:[[26,229,46,256,.16,3.6,0,.55,28,232],[91,290,114,320,-.16,4.1,.45,.55,113,294]]}},jE=[["kansas","\u041A\u0430\u043D\u0437\u0430\u0441"],["vegas","\u041B\u0430\u0441-\u0412\u0435\u0433\u0430\u0441"],["paloalto","\u041F\u0430\u043B\u043E-\u0410\u043B\u044C\u0442\u043E"],["sanfrancisco","\u0421\u0430\u043D-\u0424\u0440\u0430\u043D\u0446\u0438\u0441\u043A\u043E"],["losangeles","\u041B\u043E\u0441-\u0410\u043D\u0434\u0436\u0435\u043B\u0435\u0441"],["manhattan","\u041C\u0430\u043D\u0445\u044D\u0442\u0442\u0435\u043D"],["liberty","\u041E\u0441\u0442\u0440\u043E\u0432 \u0421\u0432\u043E\u0431\u043E\u0434\u044B"]],ty={brooklyn:{title:"\u0411\u0440\u0443\u043A\u043B\u0438\u043D",dir:"",plate:"plate.webp",square:"plate-square.webp",waterOriginal:"water-matte-original.png",waterSquare:"water-matte-square.png",foliage:"scenery-foliage-mask.png",boatSvg:"boat-motion-mask.svg",colliders:"scenery-colliders.json",bounds:{x:9.5,top:9,bottom:9.8},artWobble:!0,flag:[1480,-1,48,3.4,508,537,553,578],ambience:null},mainstreet:{title:"\u041C\u0435\u0439\u043D-\u0441\u0442\u0440\u0438\u0442",dir:"maps/mainstreet/",plate:"plate.webp",square:"plate-square.webp",waterOriginal:"blank.png",waterSquare:"blank.png",foliage:"blank.png",boatPng:"blank.png",colliders:"colliders.json",bounds:{x:8.8,top:8.8,bottom:8.8},artWobble:!1,wind:!1,ambience:{smoke:[],metal:[],gulls:!1}},...Object.fromEntries(jE.map(([n,t])=>[n,{...XE(n,t),...JE[n]||{}}]))};function ey(){let n=new URLSearchParams(location.search).get("map"),t=Object.hasOwn(ty,n||"")?n:"kansas",e={id:t,...ty[t]};return t==="sanfrancisco"&&["waterfront-v2","waterfront-v3","waterfront-v4"].includes(new URLSearchParams(location.search).get("mapDraft"))&&Object.assign(e,{plate:"plate-v4.webp",square:"plate-square-v4.webp",colliders:"colliders-v4.json",waterOriginal:"water-matte-original-v4.png",waterSquare:"water-matte-square-v4.png",swayOriginal:"sway-mask-original-v4.png",swaySquare:"sway-mask-square-v4.png",traffic:["vehicles/sedan.webp","vehicles/delivery.webp"],trafficForeground:"traffic-foreground-v4.png",flag:[769.7915000064568,1,36.53292859633359,3,261.14594717023874,281.6814170984212,278.0575106405066,302.2168870266037],ambience:{smoke:[],metal:[],gulls:!0,gullRoutes:[[[1350,150],[1220,140],[1100,80],[930,-70]],[[1490,450],[1430,390],[1360,290],[1040,30]]]}}),t==="sanfrancisco"&&new URLSearchParams(location.search).get("mapDraft")==="waterfront-v5"&&Object.assign(e,{plate:"plate-v5.webp",square:"plate-square-v5.webp",seaPlate:"maps/sanfrancisco/plate-square-v5.webp",colliders:"colliders-v5.json",waterOriginal:"water-matte-original-v5.png",waterSquare:"water-matte-square-v5.png",swayOriginal:"sway-mask-original-v5.png",swaySquare:"sway-mask-square-v5.png",traffic:["vehicles/sedan.webp","vehicles/delivery.webp"],trafficForeground:"traffic-foreground-v5.png",trafficRoute:{centerline:[760.647906,.681998488,818600671e-13],laneOffsets:[-32,32],sizeScale:.75},flag:[756.6453588516746,1,47.770334928229666,2,201.955475024301,218.86703849456893,230.94672668761746,247.85829015788534],ambience:{smoke:[],metal:[],gulls:!0,gullRoutes:[[[1350,150],[1220,140],[1100,80],[930,-70]]]}}),t==="sanfrancisco"&&new URLSearchParams(location.search).get("mapDraft")==="waterfront-v9"&&Object.assign(e,{plate:"plate-v9.webp",square:"plate-square-v9.webp",seaPlate:"maps/sanfrancisco/plate-square-v9.webp",colliders:"colliders-v9.json",waterOriginal:"water-matte-original-v9.png",waterSquare:"water-matte-square-v9.png",swayOriginal:"sway-mask-original-v9.png",swaySquare:"sway-mask-square-v9.png",traffic:["vehicles/sedan.webp","vehicles/delivery.webp"],trafficForeground:"traffic-foreground-v9.png",trafficRoute:{centerline:[760.647906,.681998488,818600671e-13],laneOffsets:[-32,32],sizeScale:.75},flag:[756.6453588516746,1,45.32057416267942,2,166.92437926446024,191.0837556505573,194.70766210847188,217.65906967526405],flagFront:!0,overscan:"overscan-v9.webp",overscanScale:1.3,overscanOrigin:[656/1254,695/1254],bounds:{x:11.7,top:13.9,bottom:10.7},ambience:{smoke:[],metal:[],gulls:!0,gullRoutes:[[[1350,150],[1220,140],[1100,80],[930,-70]]]}}),e}var ZE=document.querySelector('meta[name="rapier-wasm"]')?.content||"board/rapier.wasm",Hi=window.parent!==window&&window.parent.MobileHost?window.parent.MobileHost:mT(),Jr="board/assets";Gp(new URLSearchParams(location.search).get("finish")!=="original");window.setArtFinish=Gp;var kt=ey(),ki=`${Jr}/${kt.dir}`,iy=new A(.496,0,-.496),Ci=document.getElementById("scene"),$E=document.getElementById("overlay"),Wn=new vu({canvas:Ci,antialias:!0,powerPreference:"high-performance"});Wn.outputColorSpace=rs;Wn.setClearColor("#b8ab91");Wn.autoClear=!1;var Si=new ss,Pt=new In(-1,1,1,-1,.1,100);Pt.position.copy(oi).multiplyScalar(24);Pt.up.set(0,1,0);Pt.lookAt(0,0,0);Pt.userData.width=6.6;var Wd=oi.clone(),Ee=1,we=1;function ic(){let n=Pt.userData.width,t=n*we/Math.max(1,Ee);Ee>we*.8&&(t=Math.min(n*1.75,15),n=t*Ee/Math.max(1,we)),Pt.userData.viewW=n,Pt.left=-n/2,Pt.right=n/2,Pt.top=t/2,Pt.bottom=-t/2,Pt.updateProjectionMatrix()}function ny(){Ee=innerWidth,we=innerHeight;let n=Math.min(devicePixelRatio||1,2);Wn.setPixelRatio(n),Wn.setSize(Ee,we,!1),Ci.style.width=Ee+"px",Ci.style.height=we+"px",$r?.resize(Ee,we,n),ic()}function Ms(n){let t=n.clone().project(Pt);return{x:(t.x+1)/2*Ee,y:(1-t.y)/2*we}}var Es=null,sc=null,xn=null,Fm=new qt("#b8ab91"),KE=new qt,fy=matchMedia("(prefers-reduced-motion: reduce)"),nc=null,bs=null,yn=null,Hm=null,jd=0,io=null,je,qi,Nt,no,$r,ye=[],Ki,Zd=[],Kd=[],ry=null,ac={},sy=null,QE=-1,Pi=-1,pr=!1,Bm=-1,Yd=-1,ay="",oy=0,vn=[],jr=null,Um=null,Er=null,Yn=!1,Gn=6.6,Mi=new ct,Xn=0,Zr=0,$i=new ct,zm=.55,ro=0,Mr=!1,ly=n=>Math.sign(n)*zm*(1-1/(Math.abs(n)/zm+1)),fi=!1,ln=.18,fr=.23,ao=0,oc=!1,rc=!1,Ss=null,so=!1,bi=new ct,Jd=!1,Xd=new A,Ts=0,py=0,Tr="idle",my=0,Om=0,cy="";function oo(n,t){let e=Ms(t);Hi.feedback?.(n,e.x/Ee,e.y/we)}function qn(n){return je.tile(n).group.position}function km(n){let t;try{t=JSON.parse(n)}catch{return}if(!(!t||typeof t!="object"))switch(t.action){case"art_study":{if(new URLSearchParams(location.search).get("study")!=="1")break;km(JSON.stringify({action:"cancel"}));let e=qn(0).clone();Ki.visible=!0;for(let i=0;i<2;i++){let r=ye[i];r.freeze(),r.resetLabels(),r.body.setTranslation({x:e.x-1.25-i*.85,y:.285,z:e.z-1.65+i*.85},!0);let s=new Se().setFromAxisAngle(new A(0,1,0),i?.36:-.28);i&&s.multiply(new Se().setFromAxisAngle(new A(1,0,0),Math.PI/2)),r.body.setRotation(s,!0),r.sync()}break}case"dice_exit_study":{if(new URLSearchParams(location.search).get("study")!=="1")break;if(km(JSON.stringify({action:"art_study"})),vy(),vn=ye.map((e,i)=>new $l(Si,Pt,e,i,Kd[i])),Ki.visible=!1,["hero-behind","hero-front","building-behind","building-front"].includes(t.occlusion)){let e=Zd.find(s=>s.name==="GasStation"),i=t.occlusion.startsWith("building")&&e?e.mesh.position:Nt.mesh.position,r=vn[0];vn[1].dispose(),vn=[r],r.origin.copy(i).addScaledVector(oi,t.occlusion.endsWith("front")?4:t.occlusion.startsWith("building")?-.1:-.6),r.origin.y-=.43,r.origin.addScaledVector(pe,-.055)}Number.isFinite(t.at)&&vn.forEach(e=>{e.update(Math.max(0,t.at)),e.previewFrozen=!0});break}case"state":ac=t,pr||(t.police_bound&&!t.moving&&!Nt.policeBound?(Nt.reducedMotion=matchMedia("(prefers-reduced-motion: reduce)").matches,Bm=+t.pos,Nt.holdPolice()):!t.police_bound&&Nt.policeBound&&Nt.releasePolice()),je.update(t.tiles||[]),yn?.pendingFinish&&(yn.pendingFinish=!1,yn.finish()),pr||(!t.moving&&Pi<0&&je.occupy(+t.pos,je.occupied<0),Qd(+t.pos));break;case"step":iT(+t.from,+t.to,+t.ms,+t.id,String(t.kind||"lin"));break;case"celebrate":case"celebrate_big":!pr&&Pi<0&&(ao=0,Nt.celebrate(t.action==="celebrate_big"));break;case"react_police":pr||Pi>=0?Hi.reactionDone(+t.id):(_y(),Yd=+t.id,ao=0,Bm=+ac.pos,Nt.reactPolice(!!t.reduced));break;case"cancel_reaction":Nt.cancelCelebration();break;case"react_negative":!pr&&Pi<0&&(ao=0,Nt.reactNegative());break;case"roll":nT(t);break;case"layout":Number.isFinite(+t.top)&&Number.isFinite(+t.bottom)&&(ln=+t.top,fr=+t.bottom);break;case"owners":je?.setOwners(t.owners||{});break;case"rivals":!Um&&je&&(Um=new Bd(Si,qn)),Um?.set(t.list);break;case"cancel":Nt.cancelCelebration(),Vm(),Ki.visible=!1,Pi=-1,oc=!1,so=!1,Ts=0,Tr="idle",ye.forEach(e=>e.freeze());break;case"pan":{if(!Number.isFinite(+t.dx)||!Number.isFinite(+t.dy))break;let e=Ai();if(e>=Xn){let c=fi?new ct:bi,h=fi?Gr:Gn,d=Ee>we*.8?Math.min(h*1.75,15):h*we/Math.max(1,Ee),u=(ln+(1-ln-fr)*(fi?.5:.6)-.5)*d;Mi.set(c.x-Pt.position.dot(pe),Pt.position.dot(Ne)-c.y-u)}let i=Math.max(1,+(t.input_width||Ee)),r=Pt.userData.viewW||Pt.userData.width,s=+t.dx*r/i,a=+t.dy*r/i,o=e-ro;Mi.x+=s,Mi.y+=a,Mi.copy(tT(Mi));let l=new ct(s,a).multiplyScalar(1e3/Math.max(8,Math.min(o,60)));o>120?$i.copy(l):$i.lerp(l,.35),ro=e,Mr=!1,Xn=e+180;break}case"zoom":if(!(+t.factor>0)||!Number.isFinite(+t.factor))break;Gn=di(Gn*+t.factor,3.8,Math.max(3.8,Math.min(Gr,gy()))),Zr=Ai()+180;break;case"frame":Er=Array.isArray(t.tiles)?t.tiles.map(Number).filter(Number.isFinite):null,!Er||!Er.length?Er=null:(jr=null,fi=!1,Xn=0,Zr=0,Mi.set(0,0));break;case"focus":Er=null,jr=Number.isFinite(+t.a)?{a:+t.a,b:Number.isFinite(+t.b)?+t.b:+t.a,k:di(+t.k||0,0,1)}:null;break;case"home":Er=null,Ss=null,Xn=0,Zr=0,Mi.set(0,0),fi=!1,jr||(Jd=!1),jr=null,Gn=6.6;break;case"overview":Xn=0,Zr=0,fi=!fi,Mi.set(0,0);break;case"debug":oT(!!t.on,!!t.occlusion);break;case"windmap":bs?.showMap(!!t.on);break;case"train_preview":Es&&(Es.preview=t.time??null);break;case"harbor_preview":dt.harborPhase.value=+(t.phase??-1),dt.harborDebug.value=!!t.debug;break;case"daylight":xn&&("hour"in t&&xn.setHour(t.hour),+t.cycle>0&&(xn.cycleMinutes=+t.cycle));break;case"ambience":lT(t.on!==!1);break;case"look":nc=t.x==null?null:{x:+t.x,y:+t.y,w:+(t.width||3)};break;case"street_coin":Hm?.pop(+t.tile,Yn||matchMedia("(prefers-reduced-motion: reduce)").matches);break;case"scatter":{let e=+t.id,i=(t.drops||[]).map(s=>{let a=s.drop||{},o=a.cash>0?"cash":a.hard>0?"hard":a.rolls>0?"rolls":a.insp?"insp":"other",l=o==="cash"?io.coin:o==="hard"?io.gem:o==="rolls"?io.die:o==="insp"?io.insp:io.hazard;return{to:+s.to,map:l,kind:o,amount:Math.max(0,+a.cash||0),count:+s.count||0,sink:!!s.sink}});if(!i.length){Hi.complete(e);break}let r=+t.from;if(Array.isArray(t.fromScreen)){let s=new A(+t.fromScreen[0]*2-1,1-+t.fromScreen[1]*2,.5).unproject(Pt);r=s.add(oi.clone().multiplyScalar((1.4-s.y)/oi.y))}jd=1/0,yn.start(r,i,()=>{yn.pendingFinish=!0,jd=Ai()+700,Hi.complete(e)},Yn);break}}}function _y(){if(Yd>=0){let n=Yd;Yd=-1,Hi.reactionDone(n)}}function gy(){let n=kt.bounds,t=(n.top+n.bottom)*.98,e=2*n.x*.98;return Ee<2||we<2?Gr:Ee>we*.8?Math.min(t,e*we/Math.max(1,Ee))/1.75:Math.min(e,t*Ee/Math.max(1,we))}function tT(n){let t=Math.max(0,r0-Pt.userData.width*.5);return n.length()<=t?n.clone():n.clone().normalize().multiplyScalar(t)}function wy(n,t){let e=qn(t).clone().sub(qn(n));e.y=0,Nt.setHeading(e.dot(pe),e.dot(Ne))}function eT(n,t,e,i){let r=n?n.group.position.y+.19:e,s=t.group.position.y+.19,a=s-r;if(Math.abs(a)<.012)return pl(r,s,i);let o=(d,u)=>{let f=di((i-d)/(u-d),0,1);return f*f*(3-2*f)},l=a>0,c=r+a*(l?o(.16,.47):o(.53,.82)),h=Math.sin(Math.PI*di((i-(l?.1:.4))/.5,0,1))*Math.min(.14,.035+Math.abs(a)*.55);return c+h}function Qd(n){Nt.position.copy(qn(n)).add(new A(0,.19,0))}async function iT(n,t,e,i,r){sy?.kill(),await Nt.releasePolice(),Bm=-1;let s=Nt.position.clone();je.occupy(-1),pr=!0,Tr="travel",py=t,ao=Ai()+e+130,QE=i,Mi.set(0,0);let a=je.tile(t),o=je.tile(n),l=new A(a.group.position.x,a.restY+.19,a.group.position.z);wy(n,t),sy=T0(Math.max(.045,e/1e3),c=>{let h=r==="in"?c*c:r==="out"?1-Math.pow(1-c,2):r==="one"?c*c*(3-2*c):c;Nt.speedScale=r==="in"?pl(.55,1,c):r==="out"||r==="one"?pl(1,.55,c):1,Nt.position.lerpVectors(s,l,h),Nt.position.y=eT(o,a,s.y,h)},()=>{pr=!1,Ts=Math.max(0,Ts-1),r==="out"||r==="one"?(Tr="land",my=Ai()+280,ao=0,je.occupy(t),oo("land",Nt.position)):(je.passOver(t),oo("step",Nt.position)),ac.pos=t,Qd(t),Hi.stepDone(i)})}async function nT(n){if(Pi>=0)return;qi||(Pi=+n.id,await Ty(),Pi=-1),Vm(),Nt.cancelCelebration(),Pi=+n.id;let t=Pi;oc=!0,so=!1,rc=!!n.lesson,Mi.set(0,0),fi=!1,Tr="throw",Ts=0,Ki.visible=!1,await new Promise(e=>requestAnimationFrame(e)),Pi===t&&(aT(),ye[0].roll(rc?+(n.a||0):0),ye[1].roll(rc?+(n.b||0):0),!rc&&n.guided&&rT(+n.a,+n.b),setTimeout(()=>{Pi===t&&ye.forEach(e=>e.finish())},4e3))}var $d=n=>!n.rolling;function rT(n,t){let e=zi.World.restoreSnapshot(qi.world.takeSnapshot());e.timestep=qi.world.timestep;try{let i=Object.assign(Object.create(Object.getPrototypeOf(qi)),{world:e,scenery:qi.scenery}),r=qi.tileBodies.map(o=>e.getRigidBody(o.handle)),s=ye.map(o=>Object.assign(Object.create(Object.getPrototypeOf(o)),o,{physics:i,body:e.getRigidBody(o.body.handle),collider:e.getCollider(o.collider.handle),group:new Pe,visual:new Pe,contacted:[],onSettled:null,onPredicted:null})),a=e.timestep;for(let o=0;o<600&&!s.every($d);o++){for(let l=0;l<40;l++){let c=qn(l);r[l].setNextKinematicTranslation({x:c.x,y:c.y,z:c.z})}for(let l of s)l.process(a),l.integrate(a);e.step()}if(!s.every($d))return;ye[0].relabel(s[0].value,n),ye[1].relabel(s[1].value,t)}finally{e.free()}}async function hy(){if(Pi<0||so||!$d(ye[0])||!$d(ye[1]))return;so=!0;let n=Pi;Ts=ye[0].value+ye[1].value,await new Promise(t=>setTimeout(t,Yn?60:150)),!(Pi!==n||!so)&&(sT(),Hi.diceResult(ye[0].value,ye[1].value,rc),oc=!1,Tr="idle",Pi=-1,so=!1,Hi.diceDone(n,ye[0].value,ye[1].value))}function Vm(){vn.forEach(n=>n.dispose()),vn=[]}function sT(){!Yn&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&Ki.visible&&ye.forEach((n,t)=>{let e=Ms(n.position);e.x<-32||e.y<-32||e.x>Ee+32||e.y>we+32||vn.push(new $l(Si,Pt,n,t,Kd[t],i=>oo("dice_pop",i)))}),Ki.visible=!1}function aT(){let n=new A(Nt.position.x,0,Nt.position.z),t=new A(-.70710678,0,-.70710678),e=1/0,i=[];for(let r of[[-1.65,1.65],[1.5,2.5],[-1.5,-2.5]])for(let s of[-1.35,-.65,0,.65,1.35]){let a=[],o=Math.abs(s)*.2+(r[0]*r[1]<0?0:.3);for(let l of r){let c=n.clone().add(pe.clone().multiplyScalar(l)).add(t.clone().multiplyScalar(s)),h=qi.landingSurface(c);c.y=h.height,o+=Math.max(0,h.relief-.02)*24,o+=Math.max(c.y,0)*3;let d=Ms(c.clone().add(new A(0,.5,0))),u=d.x/Ee,f=d.y/we;(u<.09||u>.91)&&(o+=12),(f<ln+.08||f>1-fr)&&(o+=8);let w=c.clone().add(new A(0,.5,0)).clone().sub(Pt.position);qi.ray(Pt.position.clone(),w,w.length(),gi.scenery)&&(o+=5),a.push(c.clone().add(new A(0,.33,0)))}o<e&&(e=o,i=a)}ye.forEach((r,s)=>{r.home.copy(i[s]),r.avoidHero=!0,r.heroCenter.copy(n),r.heroSide=Math.sign(i[s].clone().sub(n).dot(pe))||1})}function oT(n,t){for(let e of Zd)e.mesh.material.uniforms.debugVisible.value=n,e.mesh.material.uniforms.debugOcclusion.value=t,e.wire.visible=n&&!t}function lT(n){Yn=!n,n||Vm(),$r.enabled=n,dt.ambientMotion.value=n&&!fy.matches,Es&&(Es.enabled=n),sc&&(sc.enabled=n),bs?.setEnabled(n&&kt.wind!==!1)}var uy=Ai(),qd=0;function yy(){requestAnimationFrame(yy);let n=Ai(),t=Math.min(.1,(n-uy)/1e3);if(uy=n,dt.time.value+=t,R0(t),cT(t),vn.forEach(e=>{e.previewFrozen||e.update(t)}),vn=vn.filter(e=>!e.done),yn?.update(t),Hm?.update(t),w0(t,!Yn&&!matchMedia("(prefers-reduced-motion: reduce)").matches),dt.ambientMotion.value=!Yn&&!fy.matches,bs?.update(t),Es?.update(t),sc?.update(t),uT(t),Nt.update(t),no.position.set(Nt.position.x,Nt.position.y-.003+.004,Nt.position.z),vy(),$r.update(t),xn){xn.update(t);let e=0;for(let a of je.tiles)e=e*31+Math.round(a.group.position.y*1e3);xn.renderShadows(e);let[i,r,s]=xn.groundLight();Wn.setClearColor(KE.setRGB(Fm.r*i,Fm.g*r,Fm.b*s))}Wn.clear(),Wn.render(Si,Pt),Wn.clearDepth(),Wn.render($r.scene,$r.ortho)}function cT(n){if(!qi)return;qd+=n;let t=qi.world.timestep,e=0;for(;qd>=t&&e<5;){for(let i=0;i<40;i++){let r=qn(i);qi.tileBodies[i].setNextKinematicTranslation({x:r.x,y:r.y,z:r.z})}for(let i of ye)i.process(t),i.integrate(t);qi.step();for(let i of ye)i.sync();qd-=t,e++}e===5&&(qd=0)}function vy(){ye.forEach((n,t)=>{let e=Kd[t];if(e.visible=Ki.visible,!e.visible)return;let i=n.position,r=qi.ray(new A(i.x,i.y-.2,i.z),new A(0,-1,0),6,gi.floor|gi.tiles|gi.scenery),s=r?r.point.y:0,a=Math.max(0,i.y-s),o=Dn.value>.5?.6875:iy.x,l=Dn.value>.5?-.21875:iy.z;e.position.set(i.x+o*a,s+.006,i.z+l*a);let c=di(1-a/3,.25,1);e.scale.setScalar((.8+(1-c)*.6)*(Dn.value>.5?1.9:1)),e.material.opacity=(Dn.value>.5?.46:.34)*c})}function hT(){let n=Ms(Nt.position),t=Ee/(Pt.userData.viewW||Pt.userData.width);return{x:n.x-.65*t,y:n.y-2*t,w:1.3*t,h:2.2*t}}function uT(n){let t=pr||Ai()<ao;if(!t){let s=+(ac.pos||0);wy(s,(s+1)%40)}Nt.setRunning(t),pr||Qd(+(ac.pos||0)),Nt.celebrating&&!["police_hold","police_release"].includes(Nt.animation)&&Nt.animation!==ay&&oo(Nt.animation,Nt.position.clone().add(Ne.clone().multiplyScalar(1.3))),ay=Nt.celebrating?Nt.animation:"",Pi>=0&&!Ki.visible&&ye.every(s=>!s.launchPending&&s.elapsed>=.045)&&(Ki.visible=!0);let e=ye.length?ye[0].audibleImpacts+ye[1].audibleImpacts:0;if(oc&&e>oy&&oo("dice_hit",ye[0].position),oy=e,Ss)Pt.position.copy(pe.clone().multiplyScalar(Ss.x).add(Ne.clone().multiplyScalar(Ss.y)).add(Wd.clone().multiplyScalar(24))),Pt.userData.width=Ss.width,ic(),Pt.updateMatrixWorld();else{let s=new A(Nt.position.x,0,Nt.position.z),a=new A;if(Tr==="travel"&&Ts>0){let T=qn((py+Math.min(2,Ts-1))%40).clone();T.y=0,a=T.sub(s),a.length()>1.5&&a.setLength(1.5),a.multiplyScalar(.45)}if(Xd.lerp(a,ya(n,5)),s.add(Xd),jr&&Ai()-ro>2500&&(s=qn(jr.a%40).clone().lerp(qn(jr.b%40),jr.k),s.y=0,!Mr&&Ai()>=Xn&&Mi.multiplyScalar(Math.exp(-n*3))),Tr==="land"&&Ai()>my&&(Tr="idle"),Ee<2||we<2)return;let o=Gn;if(fi&&(s=new A,o=Gr),Er&&!fi){let T=Er.map(U=>qn((U%40+40)%40)),v=T.map(U=>U.dot(pe)),E=T.map(U=>U.dot(Ne)+.3),R=(Math.min(...v)+Math.max(...v))/2,I=(Math.min(...E)+Math.max(...E))/2,x=we/Math.max(1,Ee),S=Math.max(.3,1-ln-fr),L=Math.max((Math.max(...v)-Math.min(...v))*1.3+2.4,(Math.max(...E)-Math.min(...E)+2.8)/(x*S));o=di(Math.max(L,Er.length===1?5:6),3.8,Gr),s=pe.clone().multiplyScalar(R).add(Ne.clone().multiplyScalar(I)),bi.set(R,I)}let l=Ai()<jd?yn.frame()||yn.lastFrame:null;if(l){yn.lastFrame=l;let T=l.map(L=>L.dot(pe)),v=l.map(L=>L.dot(Ne)+.3),E=(Math.min(...T)+Math.max(...T))/2,R=(Math.min(...v)+Math.max(...v))/2,I=we/Math.max(1,Ee),x=Math.max(.3,1-ln-fr),S=Math.max((Math.max(...T)-Math.min(...T))*1.3,(Math.max(...v)-Math.min(...v)+2.6)/(I*x));o=di(Math.max(Gn,S),Gn,Math.min(Gr,11)),s=pe.clone().multiplyScalar(E).add(Ne.clone().multiplyScalar(R)),bi.set(E,R)}o=Math.min(o,gy());let c=Ee>we*.8?Math.min(o*1.75,15):o*we/Math.max(1,Ee),h=new ct(s.dot(pe),s.dot(Ne));if(Jd||(bi.copy(h),Jd=!0),!fi){let T=new ct(o*.065,c*Math.max(.18,1-ln-fr)*.045);bi.x=di(bi.x,h.x-T.x,h.x+T.x),bi.y=di(bi.y,h.y-T.y,h.y+T.y)}let d=Ai()-ro<90;!d&&ro&&!Mr&&$i.lengthSq()>0&&(Mr=!Yn&&$i.length()>.6,Mr||$i.set(0,0)),Mr&&(Mi.addScaledVector($i,n),$i.multiplyScalar(Math.exp(-n*5)),Xn=Ai()+60,$i.length()<.08&&(Mr=!1,$i.set(0,0)));let u=Ai()<Xn;if(nc){let T=(nc.x-768)/Bi,v=(512-nc.y)/Bi;Pt.position.copy(pe.clone().multiplyScalar(T).add(Ne.clone().multiplyScalar(v)).add(Wd.clone().multiplyScalar(24))),Pt.userData.width=nc.w,ic(),Pt.updateMatrixWorld();return}let f=(fi?h.x:bi.x)-Mi.x,m=(fi?h.y:bi.y)+Mi.y,w=ln+(1-ln-fr)*(fi?.5:.6);m+=(w-.5)*c;let g=f,_=m;if(!fi){let T=Ee>we*.8?c*Ee/Math.max(1,we):o,v=kt.bounds,E=.45,R=Math.max(0,v.x-E-T*.5),I=-(v.bottom-E)+c*.5,x=v.top-E-c*.5,S=di(f,-R,R),L=I<x?di(m,I,x):0;if(d){let N=zm*3;g=S+di(f-S,-N,N),_=L+di(m-L,-N,N),f=S+ly(g-S),m=L+ly(_-L)}else S!==f&&($i.x=0),L!==m&&($i.y=0),f=g=S,m=_=L;let U=.0065*(160+Nt.offset.y),z=ln*we+66,W=new A(Nt.position.x,.14,Nt.position.z).dot(Ne)+U+(z/we-.5)*c;!u&&!l&&Mi.lengthSq()<.001&&(m=Math.max(m,W))}u&&Mi.set((fi?h.x:bi.x)-g,_-(fi?h.y:bi.y)-(w-.5)*c);let b=pe.clone().multiplyScalar(f).add(Ne.clone().multiplyScalar(m)).add(Wd.clone().multiplyScalar(24));if(![f,m,o,Pt.position.x,Pt.position.y,Pt.position.z,Pt.userData.width].every(Number.isFinite)){console.warn("\u041A\u0430\u043C\u0435\u0440\u0430 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0430 NaN \u2014 \u0441\u0431\u0440\u043E\u0441 \u043A \u0414\u0436\u043E\u043D\u043D\u0438",JSON.stringify({x:f,y:m,width:o,zoom:Gn,anchor:bi.toArray(),pan:Mi.toArray(),panVel:$i.toArray(),lead:Xd.toArray(),desired:h.toArray(),safeTop:ln,safeBottom:fr,vw:Ee,vh:we,overview:fi,sf:!!l,cam:Pt.position.toArray()})),Mi.set(0,0),$i.set(0,0),Mr=!1,ro=0,Xd.set(0,0,0),Xn=0,Zr=0,fi=!1,jd=0,Number.isFinite(Gn)||(Gn=6.6),(!Number.isFinite(ln)||!Number.isFinite(fr))&&(ln=.18,fr=.23),Number.isFinite(Pt.userData.width)||(Pt.userData.width=Gn),Jd=!1;let T=new A(Nt.position.x,0,Nt.position.z);bi.set(T.dot(pe),T.dot(Ne)),bi.toArray().every(Number.isFinite)||bi.set(0,0),Pt.position.copy(pe.clone().multiplyScalar(bi.x).add(Ne.clone().multiplyScalar(bi.y)).add(Wd.clone().multiplyScalar(24))),ic(),Pt.updateMatrixWorld();return}u?Pt.position.lerp(b,d?ya(n,24):ya(n,14)):Pt.position.lerp(b,ya(n,5.5)),Pt.userData.width=Ai()<Zr?o:pl(Pt.userData.width,o,ya(n,5)),ic(),Pt.updateMatrixWorld()}Om+=n;let i=Pt.position.x.toFixed(3)+","+Pt.position.y.toFixed(3)+","+Pt.position.z.toFixed(3)+","+Pt.userData.width.toFixed(3),r=i!==cy;if(cy=i,r&&Hi.positions(JSON.stringify(je.tiles.map(s=>{let a=Ms(s.group.position.clone().add(new A(0,.25,0)));return[a.x/Ee,a.y/we]}))),Om>.07){Om=0;let s=je.tiles.map(o=>{let l=Ms(o.group.position.clone().add(new A(0,.25,0)));return[l.x/Ee,l.y/we]});r||Hi.positions(JSON.stringify(s));let a=Ms(Nt.position);Hi.frameState?.(JSON.stringify({engine:"web",walking:pr,flip:Nt.flipH,hero_animation:Nt.animation,hero_frame:Nt.frame,camera:Pt.position.toArray(),camera_size:Pt.userData.width,camera_phase:Tr,hero_screen:[a.x/Ee,a.y/we],hero:Nt.position.toArray(),occupied_tile:je.occupied,dice_visible:Ki.visible,dice_focus:oc,dice:ye.map(o=>o.position.toArray()),hero_clearance:ye.map(o=>o.closestHeroLane),contacts:ye.map(o=>o.contacted),dice_pop_count:vn.length,rivals:!0,dice_bursts:$r.bursts.length,hour:xn?.hour}))}}var xy={},dT=fetch(`${Jr}/previews.json`).then(n=>n.ok?n.json():{}).catch(()=>({})).then(n=>xy=n||{}),by=[];async function xs(n,t,e,i=5){await dT;let r=xy[n.split("?")[0]];if(!r)return vi(n,t);let s=await vi(r.lo,t);return s.userData.preview=!0,r.final||by.push({prio:i,job:()=>vi(n,t).then(a=>{e(a),s.dispose()})}),s}var Sy=[],My=[];function ec(n,t=!1){(t?Sy:My).push(n)}async function fT(){let n=by.splice(0).sort((t,e)=>t.prio-e.prio).map(t=>t.job);for(let t of[Sy,n,My])for(let e of t.splice(0))try{await e()}catch(i){console.warn("\u0414\u043E\u0433\u0440\u0443\u0437\u043A\u0430 \u043F\u043E\u043B\u044F:",i)}Nt?.loadLate()}var dy=null,Ey=[];function Ty(){return dy||(dy=(async()=>{globalThis.__rapierWasm=fetch(ZE);let n=await Ed.create();for(let t of Ey)n.addScenery(t);je.tiles.forEach(t=>n.addTile(t.group.position));for(let t=0;t<2;t++){ye.push(new Ad(n,Ki,t,hy,hy));let e=new Bt(new sr(.2,24).rotateX(-Math.PI/2),Wr(.34));e.renderOrder=1,Si.add(e),Kd.push(e)}return qi=n,yn&&(yn.physics=n),n})())}async function pT(){Hi.progress?.(0),P0(S=>Hi.progress?.(Math.min(99,S)));let n={flipY:!1},t=xs(`${Jr}/johnny/idle_front.webp`,void 0,S=>{Nt&&(Nt.sheets.idle_front=S)},3),[e,i,r,s,a,o,l,c,h,d,u,f,m,w]=await Promise.all([xs(ki+kt.plate,n,S=>{dt.plate.value=S},0),xs(ki+kt.square,n,S=>{dt.overscanPlate.value===dt.extendedPlate.value&&(dt.overscanPlate.value=S),dt.seaPlate.value===dt.extendedPlate.value&&(dt.seaPlate.value=S),dt.roadFill.value===dt.extendedPlate.value&&(dt.roadFill.value=S),dt.extendedPlate.value=S},1),vi(ki+kt.waterOriginal,n),vi(ki+kt.waterSquare,n),vi(ki+kt.foliage,{flipY:!1,nearest:!0}),kt.boatSvg?Ou(ki+kt.boatSvg,1536,1024,n):vi(ki+kt.boatPng,n),xs("assets/interface-atlas.webp",void 0,()=>{}),vi("assets/icons/gem-clean.webp"),vi("assets/icons/die.webp"),fetch(ki+kt.colliders,{cache:"no-cache"}).then(S=>S.json()),fetch(`${Jr}/wind.json`,{cache:"no-cache"}).then(S=>S.json()),kt.seaPlate?xs(`${Jr}/${kt.seaPlate}`,n,S=>{dt.seaPlate.value=S},4):null,kt.roadFill?xs(ki+kt.roadFill,n,S=>{dt.roadFill.value=S},2):null,kt.roadMask?vi(ki+kt.roadMask,n):null]);await document.fonts.load("800 48px Bitter").catch(()=>{});let g={};await Promise.all(V0.map(async S=>{g[S]=await Ou(`${Jr}/symbols/${S}.svg?v=${jp}`,256)}));let _=await Ou(`${Jr}/markers/inspect.svg?v=${jp}`,256);dt.plate.value=e,dt.extendedPlate.value=i,dt.artWobble.value=kt.artWobble,dt.waterRipple.value=!!kt.waterRipple,dt.riverFlow.value=!!kt.riverFlow,dt.seaPlate.value=f||i,dt.wheatOn.value=!1,dt.wheatOriginal.value=r,dt.wheatSquare.value=s,kt.sway&&ec(async()=>{let[S,L]=await Promise.all([vi(ki+(kt.swayOriginal||"sway-mask-original.png"),n),vi(ki+(kt.swaySquare||"sway-mask-square.png"),n)]);dt.wheatOriginal.value=S,dt.wheatSquare.value=L,dt.wheatOn.value=!0}),dt.railWidth.value=kt.railWidth??1,dt.roadOn.value=!!m,dt.roadFill.value=m||e,dt.roadMask.value=w||r,dt.routeGroundShade.value=kt.routeGroundShade??1,dt.swayStrength.value=kt.swayStrength||1,dt.dryWind.value=!!kt.dryWind;let b=(kt.bobs||[]).slice(0,6);dt.bobCount.value=b.length,b.forEach((S,L)=>{dt.bobRect.value[L].set(S[0],S[1],S[2],S[3]),dt.bobParam.value[L].set(S[4],S[5],S[6],S[7]),dt.bobPivot.value[L].set(S[8],S[9])}),dt.flagA.value.fromArray(kt.flag?kt.flag.slice(0,4):[0,1,1,0]),kt.flag&&dt.flagB.value.fromArray(kt.flag.slice(4)),dt.waterMatteOriginal.value=r,dt.waterMatteSquare.value=s,dt.boatMask.value=o;let T={};for(let[S,L]of Object.entries(G0))T[S]=L0(l,...L);if(c.userData.size=[c.image.width,c.image.height],h.userData.size=[h.image.width,h.image.height],dt.overscanScale.value=kt.overscanScale||1,dt.overscanOrigin.value.fromArray(kt.overscanOrigin||[.5,.5]),dt.overscanPlate.value=kt.overscan?await xs(ki+kt.overscan,n,S=>{dt.overscanPlate.value=S},1):i,Si.add(u0(Pt),d0()),kt.flagFront&&kt.flag){let[S,L,U,,z,W,N,H]=kt.flag,j=Math.min(z,W)-8,Z=Math.max(N,H)+8,ot=new Bt(new ii((U+16)/Bi,(Z-j)/Bi),c0());ot.quaternion.copy(Pt.quaternion),ot.position.copy(gn(S+L*U/2,(j+Z)/2)).addScaledVector(oi,3),Si.add(ot)}let v=f0(d);Ey=v;for(let S of v){if(kt.trafficForeground&&/^Lamp/.test(S.name))continue;let L=/^(Tree|Trunk)\d+$/.test(S.name)||/Legs$/.test(S.name),U=new Bt(S.geometry,h0(S.spec,a,{flat:L,foliage:/Tree|Crown|Trunk/.test(S.name)||!!S.spec.foliage_mask}));U.position.copy(S.center);let z=new Uo(new ko(S.geometry,1),new sa({color:"#38dce7",depthTest:!1}));z.position.copy(S.center),z.visible=!1,z.renderOrder=20,Si.add(U,z),Zd.push({name:S.name,mesh:U,wire:z,casts:!L})}if(kt.daylight&&new URLSearchParams(location.search).get("light")!=="0"){xn=new Eu(Wn,Si,kt.daylight,d,e);for(let S of Zd)S.casts&&xn.cast(S.mesh)}je=new zu(Si,{symbols:g,atlas:T,drops:{gem:c,die:h,insp:_}}),xn&&je.tiles.forEach(S=>xn.cast(S.block));try{let S=window.parent!==window&&window.parent.MP;S?.owners&&je.setOwners(S.owners()),window.parent!==window&&window.parent.addEventListener("mp:owners",L=>je.setOwners(L.detail||{})),S&&setInterval(()=>{try{je.setMarks(X0(window.parent.MP.view))}catch{}},400)}catch{}Ki=new Pe,Ki.visible=!1,Si.add(Ki),ec(Ty,!0),Nt=new Ld(Si,Pt,`${Jr}/johnny`),Nt.onPoliceFinished=_y,Nt.decorate=S=>l0(S,{value:Nt.position}),Nt.decorate(Nt.mesh.material);let E=await t;E.userData.preview&&(E.userData.k=.5),Nt.sheets.idle_front=E,ec(()=>Nt.load(Lw),!0),no=new Bt(new pn(.31,.31,.012,32),Wr(.24));let R=no.geometry,I=new sr(.48,32).rotateX(-Math.PI/2),x=S=>{no.geometry=S?I:R,no.material.opacity=S?.36:.24};gl.add(x),x(Dn.value>.5),Si.add(no),$r=new Ud(Pt,$E,hT,kt.ambience),kt.traffic&&(sc=new Gd(Si,await Promise.all(kt.traffic.map(S=>vi(ki+S))),{route:kt.trafficRoute,foreground:kt.trafficForeground?await vi(ki+kt.trafficForeground):null}),sc.enabled=!Yn),kt.train&&ec(async()=>{let S=await Promise.all(kt.train.map(L=>vi(ki+L)));Es=new Vd(Si,S),Es.enabled=!Yn}),io={coin:T.coin,gem:c,die:h,hazard:T.hazard,insp:_},yn=new Od(Si,je,qi,$r,oo),Hm=new Nu(Si,je),kt.wind!==!1&&ec(async()=>{await new Promise(L=>setTimeout(L,0));let S=performance.now();bs=new kd(Si,{...u,...kt.windOptions},v,je.tiles.map(L=>({x:L.group.position.x,z:L.group.position.z}))),console.info("\u041A\u0430\u0440\u0442\u0430 \u0432\u0435\u0442\u0440\u043E\u0432",bs.field.N+"\xD7"+bs.field.N,Math.round(performance.now()-S)+" \u043C\u0441"),bs.setEnabled(!Yn&&kt.wind!==!1)}),ny(),addEventListener("resize",ny),Qd(0),yy(),Hi.progress?.(100),ry=km,fT();try{Hi.sceneReady(S=>ry(S))}catch(S){console.error("\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0443\u043F\u0430\u043B\u0430 \u0432 sceneReady:",S)}}pT().catch(n=>{console.error(n),Hi.failed?.(String(n&&n.message||n))});function mT(){let n={feedback(){},progress(){},positions(){},frameState(){},stepDone(){},reactionDone(){},diceResult(){},diceDone(){},complete(){},failed(t){console.error(t)}};return n.sceneReady=t=>{let e=Array.from({length:40},(h,d)=>({i:d,type:d===0?"home":d%5===3?"biz":"kiosk",good:"gum",unlocked:!0}));t(JSON.stringify({action:"state",pos:0,tiles:e})),window.devSend=h=>t(JSON.stringify(h)),Ci.style.touchAction="none",Ci.style.cursor="grab";let i=new Map,r=0,s=h=>t(JSON.stringify(h)),a=()=>Ss||(Ss={x:Pt.position.dot(pe),y:Pt.position.dot(Ne),width:Pt.userData.width}),o=h=>{let d=a();d.width=di(d.width*h,.9,Gr)};Ci.addEventListener("pointerdown",h=>{if(h.button===0)if(i.set(h.pointerId,{x:h.clientX,y:h.clientY}),Ci.setPointerCapture(h.pointerId),Ci.style.cursor="grabbing",i.size===2){let[d,u]=[...i.values()];r=Math.hypot(d.x-u.x,d.y-u.y)}else r=0}),Ci.addEventListener("pointermove",h=>{let d=i.get(h.pointerId);if(!d)return;let u=h.clientX-d.x,f=h.clientY-d.y;if(i.set(h.pointerId,{x:h.clientX,y:h.clientY}),i.size===2){let[m,w]=[...i.values()],g=Math.hypot(m.x-w.x,m.y-w.y);r>0&&g>0&&o(r/g),r=g}else{let m=a(),w=Ci.getBoundingClientRect();m.x-=u*Pt.userData.viewW/w.width,m.y+=f*(Pt.top-Pt.bottom)/w.height}Xn=Zr=1/0});let l=h=>{i.delete(h.pointerId),r=0,$i.set(0,0),Mr=!1,Ci.style.cursor=i.size?"grabbing":"grab",Ci.hasPointerCapture(h.pointerId)&&Ci.releasePointerCapture(h.pointerId)};Ci.addEventListener("pointerup",l),Ci.addEventListener("pointercancel",l),Ci.addEventListener("wheel",h=>{h.preventDefault(),fi=!1,o(Math.exp(h.deltaY*(h.deltaMode===1?16:h.deltaMode===2?we:1)*.0012)),Zr=Xn=1/0},{passive:!1}),Ci.addEventListener("dblclick",()=>s({action:"home"})),new URLSearchParams(location.search).get("study")==="1"&&(t(JSON.stringify({action:"layout",top:.02,bottom:.02})),t(JSON.stringify({action:"ambience",on:!1})),t(JSON.stringify({action:"art_study"})),parent.postMessage({type:"art-ready"},location.origin))},n}
