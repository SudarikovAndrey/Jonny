const root='./assets/audio/recorded/';
// Shared across all fighters, so increasing team size cannot multiply the mix density.
export class SoundBudget {
 constructor(){this.effects=[];this.lastEffect=-Infinity;this.lastLanding=-Infinity;this.landingUntil=0;this.lastVoice=-Infinity;this.voiceUntil=0;this.actorVoices=new Map();}
 landing(now){if(now-this.lastLanding<.2)return false;this.lastLanding=now;this.landingUntil=now+.42;return true;}
 effect(now,important=false){if(now<this.landingUntil)return false;this.effects=this.effects.filter(t=>now-t<1);if(this.effects.length>=6||now-this.lastEffect<(important?.12:.19))return false;this.effects.push(now);this.lastEffect=now;return true;}
 voice(now,id,duration){if(now<this.voiceUntil||now-this.lastVoice<4.8||now-(this.actorVoices.get(id)??-Infinity)<8)return false;this.lastVoice=now;this.voiceUntil=now+duration+.25;this.actorVoices.set(id,now);return true;}
}
export class CartoonAudio {
 constructor(){this.muted=new URLSearchParams(location.search).has('mute');this.enabled=false;this.buffers=new Map();this.budget=new SoundBudget();this.active=0;this.sources=new Set();this.voiceIndex=0;this.lastVoiceSample=-1;this.pendingVoice=null;this.voiceTimer=null;}
 async toggle(){
  if(this.muted)return false;
  if(!this.context){
   this.context=new AudioContext();this.bus=this.context.createGain();this.bus.gain.value=0;
   const limiter=this.context.createDynamicsCompressor();limiter.threshold.value=-18;limiter.knee.value=12;limiter.ratio.value=3;limiter.attack.value=.008;limiter.release.value=.22;
   this.effectsBus=this.context.createGain();this.effectsBus.gain.value=1;this.effectsBus.connect(this.bus);this.voiceBus=this.context.createGain();this.voiceBus.connect(this.bus);this.bus.connect(limiter);limiter.connect(this.context.destination);
  }
  // Retry missing buffers after a failed request, instead of leaving audio half-initialized.
  await Promise.all(['impact','voice0','voice1','voice2','voice3'].filter(n=>!this.buffers.has(n)).map(async n=>{const r=await fetch(root+n+'.wav');if(!r.ok)throw Error('Audio '+n);this.buffers.set(n,await this.context.decodeAudioData(await r.arrayBuffer()));}));
  await this.context.resume();this.enabled=!this.enabled;this.bus.gain.setTargetAtTime(this.enabled?.55:0,this.context.currentTime,.06);
  if(!this.enabled){clearTimeout(this.voiceTimer);this.voiceTimer=null;this.pendingVoice=null;for(const s of this.sources)s.stop();}
  return this.enabled;
 }
 play(name,volume=1,pan=0,rate=1,voice=false,priority=false){
  if(!this.enabled||this.muted||!this.buffers.has(name)||(!voice&&!priority&&this.active>=4))return false;
  const c=this.context,s=c.createBufferSource(),gain=c.createGain(),p=c.createStereoPanner();s.buffer=this.buffers.get(name);s.playbackRate.value=rate;gain.gain.value=volume;p.pan.value=Math.max(-.5,Math.min(.5,pan));
  s.connect(gain);gain.connect(p);p.connect(priority?this.bus:voice?this.voiceBus:this.effectsBus);this.active++;this.sources.add(s);s.onended=()=>{this.active--;this.sources.delete(s);s.disconnect();gain.disconnect();p.disconnect();};s.start();return true;
 }
 queueVoice(e,f){
  const priority=e.type==='knockouts'?3:2;
  if(!this.pendingVoice||priority>this.pendingVoice.priority)this.pendingVoice={id:e.fighter,profile:f?.kind??0,pan:(f?.root.position.x||0)/7,priority};
  // Coalesce simultaneous KO/knockdown events; never queue a chorus for later.
  if(this.voiceTimer===null)this.voiceTimer=setTimeout(()=>this.flushVoice(),60);
 }
 flushVoice(){
  this.voiceTimer=null;const v=this.pendingVoice;this.pendingVoice=null;
  if(!v||!this.enabled||this.muted||(typeof document!=='undefined'&&document.hidden))return;
  if(this.context.currentTime<this.budget.landingUntil)return;
  const sample=v.profile%4;
  const name='voice'+sample,buffer=this.buffers.get(name),now=this.context.currentTime;if(!buffer||!this.budget.voice(now,v.id,buffer.duration))return;
  this.voiceIndex++;this.lastVoiceSample=sample;
  // Original recorded voice pitch. No oscillator, formant approximation or character pitch shifting.
  this.play(name,.72,v.pan,1,true);
  const gain=this.effectsBus.gain;gain.cancelScheduledValues(now);gain.setTargetAtTime(.38,now,.035);gain.setTargetAtTime(1,now+buffer.duration+.12,.22);
 }
 event(e,fighters){
  if(!this.enabled||this.muted||(typeof document!=='undefined'&&document.hidden))return;
  const f=fighters?.[e.fighter],pan=(f?.root.position.x||0)/7,now=this.context.currentTime;
  if(e.type==='landings'&&this.budget.landing(now)){
   // A recorded low thud bypasses the ordinary impact budget and its ducked bus.
   this.play('impact',e.heavy?1.12:.95,pan,e.heavy?.68:.78,false,true);
   for(const [bus,level] of [[this.effectsBus,.16],[this.voiceBus,.30]]){const g=bus.gain;g.cancelScheduledValues(now);g.setTargetAtTime(level,now,.008);g.setTargetAtTime(bus===this.effectsBus&&this.budget.voiceUntil>now+.42?.38:1,now+.42,.16);if(bus===this.effectsBus&&this.budget.voiceUntil>now+.42)g.setTargetAtTime(1,this.budget.voiceUntil,.22);}
   return;
  }
  // No voice or swish on routine attacks. Only a selected subset of actual impacts is audible.
  if(e.type==='hits'||e.type==='blocks'){
   const strong=e.type==='hits'&&(e.damage>=19||e.impulseMagnitude>=30);
   if(this.active<4&&this.budget.effect(now,strong))this.play('impact',e.type==='blocks'?.16:strong?.43:.28,pan,.97+Math.random()*.06);
  }
  if(e.type==='knockdowns'||e.type==='knockouts')this.queueVoice(e,f);
 }
}
