import {PITCHES} from './music.js';
export class MusicBoxAudio{
 constructor(){this.context=null;this.voices=new Set();this.route='default';this.notesPlayed=0;this.dropped=0;}
 async unlock(){try{if(!this.context){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw Error('Audio unavailable');this.context=new AC({latencyHint:'interactive'});this.master=createOutput(this.context);}try{if(navigator.audioSession){navigator.audioSession.type='playback';this.route='playback';}}catch{}await this.context.resume();return this.context.state==='running';}catch{return false;}}
 pluck(r,when=this.context?.currentTime){const c=this.context;if(!c||c.state!=='running')return false;if(this.voices.size>=108){this.dropped++;return false;}this.notesPlayed++;synthesizeNote(c,this.master,r,when).forEach(voice=>{this.voices.add(voice);voice.o.onended=()=>{this.voices.delete(voice);voice.o.disconnect();voice.g.disconnect();};});return true;}

 stop(){for(const {o} of this.voices){try{o.stop();}catch{}}this.voices.clear();}
 signal(){return {state:this.context?.state||'not-started',voices:this.voices.size,route:this.route,notesPlayed:this.notesPlayed,dropped:this.dropped};}
}

export function synthesizeNote(c,output,r,when){const f=440*2**((PITCHES[r]+12-69)/12);return [1,2.756,5.404].map((partial,i)=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f*partial;o.detune.value=i===1?2:0;g.gain.setValueAtTime(0,when);g.gain.linearRampToValueAtTime([.19,.055,.014][i],when+.005);g.gain.exponentialRampToValueAtTime(.0001,when+[1.5,.65,.28][i]);o.connect(g);g.connect(output);o.start(when);o.stop(when+1.6);return {o,g};});}

export function createOutput(context){const master=context.createGain(),compressor=context.createDynamicsCompressor(),limiter=context.createWaveShaper();master.gain.value=.5;compressor.threshold.value=-18;compressor.knee.value=12;compressor.ratio.value=6;const curve=new Float32Array(8192);for(let i=0;i<curve.length;i++){const x=i/(curve.length-1)*2-1;curve[i]=.8*Math.tanh(x/.8);}limiter.curve=curve;limiter.oversample='2x';master.connect(compressor);compressor.connect(limiter);limiter.connect(context.destination);return master;}
