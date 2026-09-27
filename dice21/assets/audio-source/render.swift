// Render our original cue scores with the external GeneralUser GS bank.
// swift render.swift /path/GeneralUser-GS.sf2 scores.json /output/directory
import Foundation
import AVFoundation
struct Event: Decodable { let at: Double; let part: String; let note: UInt8?; let velocity: UInt8?; let duration: Double?; let bend: UInt16? }
struct Cue: Decodable { let length: Double; let events: [Event] }
let args=CommandLine.arguments
let cues=try JSONDecoder().decode([String:Cue].self,from:Data(contentsOf:URL(fileURLWithPath:args[2])))
let programs:[String:UInt8]=["clarinet":71,"trombone":57,"trumpet":56,"muted":59,"tuba":58,"pizz":45,"xylophone":13,"wood":115,"drums":0]
for (name,cue) in cues.sorted(by:{$0.key<$1.key}) {
 let engine=AVAudioEngine(),format=AVAudioFormat(standardFormatWithSampleRate:44100,channels:2)!
 var samplers=[String:AVAudioUnitSampler]()
 for part in Set(cue.events.map{$0.part}) {
  let s=AVAudioUnitSampler();engine.attach(s);engine.connect(s,to:engine.mainMixerNode,format:format)
  try s.loadSoundBankInstrument(at:URL(fileURLWithPath:args[1]),program:programs[part]!,bankMSB:part=="drums" ? 120:121,bankLSB:0)
  s.masterGain = -9; s.sendController(91,withValue:18,onChannel:0);s.sendController(93,withValue:0,onChannel:0)
  samplers[part]=s
 }
 try engine.enableManualRenderingMode(.offline,format:format,maximumFrameCount:512);try engine.start()
 let output=try AVAudioFile(forWriting:URL(fileURLWithPath:args[3]+"/"+name+".wav"),settings:format.settings)
 let buffer=AVAudioPCMBuffer(pcmFormat:format,frameCapacity:512)!
 var events:[(Int,()->Void)]=[]
 for e in cue.events {let s=samplers[e.part]!
  if let bend=e.bend {events.append((Int(e.at*44100),{s.sendPitchBend(bend,onChannel:0)}))}
  if let note=e.note {events.append((Int(e.at*44100),{s.startNote(note,withVelocity:e.velocity ?? 90,onChannel:0)}));events.append((Int((e.at+(e.duration ?? 0.1))*44100),{s.stopNote(note,onChannel:0)}))}
 }
 events.sort{$0.0<$1.0};var cursor=0,position=0;let total=Int(cue.length*44100)
 while position<total {
  while cursor<events.count && events[cursor].0<=position {events[cursor].1();cursor+=1}
  let next=cursor<events.count ? events[cursor].0:total
  let count=AVAudioFrameCount(min(512,total-position,max(1,next-position)))
  let status=try engine.renderOffline(count,to:buffer)
  if status == .success {try output.write(from:buffer);position+=Int(count)}
  else if status == .error {fatalError("Audio render error")}
 }
 engine.stop();print("Rendered \(name)")
}
