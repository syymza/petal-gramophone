export const PITCHES=[60,62,64,67,69,72];
export const NAMES=['C','D','E','G','A','C↑'];
export const STEPS=16;
const melody=(line)=>line.split(' ').flatMap((v,t)=>v==='-'?[]:v.split('+').map(Number).map(r=>({t,r})));
export const TUNES=[
 ['Apricot morning','An unhurried little beginning',92,'0 2 3 4 3 2 1 - 0 1 2 3 2 1 0 -'],
 ['Paper sailboats','A small drift on still water',105,'0 2 4 3 - 2 1 3 5 4 - 3 2 1 0 -'],
 ['The little orchard','Sunlight through the leaves',100,'2 3 4 2 1 0 1 - 2 3 5 4 3 1 0 -'],
 ['Velvet rain','Soft drops on the window',78,'4 - 3 2 1 - 2 - 3 - 2 1 0 - 0 -'],
 ['Sunday bicycle','A light and winding way home',116,'0 0 2 3 4 3 2 1 2 2 3 4 3 1 0 -'],
 ['Moon in a teacup','A lullaby in miniature',76,'3 - 4 3 2 - 1 - 2 - 3 1 0 - 0 -'],
 ['Wildflower lane','A little dance for no occasion',108,'0 2 1 3 2 4 3 - 4 5 4 3 2 1 0 -'],
 ['The amber hour','Warm light, slowly fading',84,'0+3 - 2 4 3 - 1 2 0+3 - 4 5 3 2 0 -'],
 ['After the fair','One last turn before goodnight',90,'5 4 3 2 3 4 3 - 2 1 2 3 1 - 0 -']
].map(([title,subtitle,bpm,line])=>({title,subtitle,bpm,notes:melody(line)}));
export const DEFAULT_NOTES=melody('0 - 2 - 3 - 4 3 2 - 1 - 0 - - -');
export function sanitizeNotes(value){if(!Array.isArray(value))return DEFAULT_NOTES.map(n=>({...n}));const unique=new Map();for(const n of value){if(n&&Number.isInteger(n.t)&&n.t>=0&&n.t<STEPS&&Number.isInteger(n.r)&&n.r>=0&&n.r<PITCHES.length)unique.set(n.t+':'+n.r,{t:n.t,r:n.r});}return [...unique.values()].slice(0,96);}
export const CONTACT=-.84,TAU=Math.PI*2,STEP_COUNT=16;
export function rotationForPhase(phase){return -phase*TAU/STEP_COUNT;}
export function pinAngle(step,phase){return CONTACT+(step-phase)*TAU/STEP_COUNT;}
export class CylinderTransport{
 constructor(clock,onStep){this.clock=clock;this.onStep=onStep;this.bpm=92;this.running=false;this.count=0;this.skipped=0;this.position=-.025/(30/this.bpm);this.nextIndex=0;this.originTime=0;this.originPhase=this.position;}
 phase(){return this.running?this.originPhase+(this.clock()-this.originTime)/(30/this.bpm):this.position;}
 start(){if(this.running)return;this.originPhase=this.position;this.originTime=this.clock();this.nextIndex=Math.ceil(this.position+1e-8);this.running=true;}
 pause(){if(!this.running)return;this.position=this.phase();this.running=false;}
 reset(step=0){this.position=step-.025/(30/this.bpm);this.originPhase=this.position;this.originTime=this.clock();this.nextIndex=step;this.count=0;this.skipped=0;}
 tick(){if(!this.running)return;const now=this.clock(),duration=30/this.bpm,phase=this.phase();let when=this.originTime+(this.nextIndex-this.originPhase)*duration;if(when<now-.005){const target=Math.ceil(phase);this.skipped+=Math.max(0,target-this.nextIndex);this.nextIndex=target;when=this.originTime+(this.nextIndex-this.originPhase)*duration;}while(when<now+.12){const absolute=this.nextIndex;this.onStep(((absolute%16)+16)%16,when,absolute);this.nextIndex++;this.count++;when=this.originTime+(this.nextIndex-this.originPhase)*duration;}}
}
