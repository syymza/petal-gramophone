export const PITCHES=Array.from({length:37},(_,i)=>60+i);
const spell=['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];
export const NAMES=PITCHES.map(n=>spell[n%12]+(Math.floor(n/12)-1));
export const STEPS=64,CONTACT=-.84,TAU=Math.PI*2;
const midi=s=>{const m=/^([A-G])([#b]?)(\d)$/.exec(s);if(!m)throw Error('Bad pitch '+s);return 12*(+m[3]+1)+{C:0,D:2,E:4,F:5,G:7,A:9,B:11}[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0);};
export function phrase(line){let t=0;const notes=[];for(const token of line.trim().split(/\s+/)){const [p,d='2']=token.split(':');if(p!=='-')for(const pitch of p.split('+'))notes.push({t,r:midi(pitch)-48});t+=+d;}return {notes,steps:t};}
function tune(title,bpm,meter,line,source){const p=phrase(line);return {title,bpm,meter,ticksPerBeat:2,...p,source};}
export const TUNES=[
 tune('Ode to Joy',100,4,'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4:3 D4:1 D4:4 E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 D4:3 C4:1 C4:4 D4 D4 E4 C4 D4 E4:1 F4:1 E4 C4 D4 E4:1 F4:1 E4 D4 C4 D4 G3:4 E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 D4:3 C4:1 C4:4 -:4','https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=528'),
 tune('Für Elise',72,3,'E5:1 D#5:1 E5:1 D#5:1 E5:1 B4:1 D5:1 C5:1 A4:3 C4:1 E4:1 A4:1 B4:3 E4:1 G#4:1 B4:1 C5:3 E4:1 E5:1 D#5:1 E5:1 D#5:1 E5:1 B4:1 D5:1 C5:1 A4:3 C4:1 E4:1 A4:1 B4:3 E4:1 C5:1 B4:1 A4:4 B4:1 C5:1 D5:1 E5:3 G4:1 F5:1 E5:1 D5:3 F4:1 E5:1 D5:1 C5:3 E4:1 D5:1 C5:1 B4:3 E4:1 E5:1 -:1 E5:1 E5:1 E5:1 D#5:1 E5:1 D#5:1 E5:1 B4:1 D5:1 C5:1 A4:3 C4:1 E4:1 A4:1 B4:3 E4:1 C5:1 B4:1 A4:4 -:8','https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=931'),
 tune('Brahms’ Lullaby',78,3,'E4:1 E4:1 G4:3 E4:1 E4:2 G4:2 -:2 E4:1 G4:1 C5:2 B4:3 A4:1 A4:2 G4:2 D4:1 E4:1 F4:2 D4:2 D4:1 E4:1 F4:2 -:2 D4:1 F4:1 B4:1 A4:1 G4:2 B4:2 C5:2 -:2 C4:1 C4:1 C5:4 A4:1 F4:1 G4:4 E4:1 C4:1 F4:2 G4:2 A4:2 G4:4 C4:1 C4:1 C5:4 A4:1 F4:1 G4:4 E4:1 C4:1 F4:2 E4:2 D4:2 C4:4 -:4','https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=1037'),
 tune('Greensleeves',88,3,'A3:2 C4:4 D4:2 E4:3 F4:1 E4:2 D4:4 B3:2 G3:3 A3:1 B3:2 C4:4 A3:2 A3:3 G#3:1 A3:2 B3:6 E3:4 A3:2 C4:4 D4:2 E4:3 F4:1 E4:2 D4:4 B3:2 G3:3 A3:1 B3:2 C4:3 B3:1 A3:2 G#3:3 F#3:1 G#3:2 A3:10 -:2 G4:6 G4:3 F#4:1 E4:2 D4:4 B3:2 G3:3 A3:1 B3:2 C4:4 A3:2 A3:3 G#3:1 A3:2 B3:4 G#3:2 E3:4 -:2 G4:6 G4:3 F4:1 E4:2 D4:4 B3:2 G3:3 A3:1 B3:2 C4:3 B3:1 A3:2 G#3:3 F#3:1 G#3:2 A3:10 -:6','https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=1247'),
 tune('Amazing Grace',76,3,'G3:2 C4:4 E4:1 C4:1 E4:4 D4:2 C4:4 A3:2 G3:4 G3:2 C4:4 E4:1 C4:1 E4:4 D4:2 G4:10 E4:2 G4:3 E4:1 G4:2 E4:3 C4:1 G3:2 A3:4 C4:2 C4:4 A3:2 G3:4 G3:2 C4:4 E4:1 C4:1 E4:4 D4:2 C4:8 -:4','https://www.loc.gov/collections/amazing-grace/articles-and-essays/timeline/'),
 tune('Auld Lang Syne',90,4,'G3:2 C4:3 C4:1 C4:2 E4:2 D4:3 C4:1 D4:2 E4:2 C4:3 C4:1 E4:2 G4:2 A4:6 A4:2 G4:3 E4:1 E4:2 C4:2 D4:3 C4:1 D4:2 E4:2 C4:3 A3:1 A3:2 G3:2 C4:6 A4:2 G4:3 E4:1 E4:2 C4:2 D4:3 C4:1 D4:2 A4:2 G4:3 E4:1 E4:2 G4:2 A4:6 C5:2 G4:3 E4:1 E4:2 C4:2 D4:3 C4:1 D4:2 E4:2 C4:3 A3:1 A3:2 G3:2 C4:6 -:4','https://www.loc.gov/resource/music.musihas-100000420/'),
 tune('Twinkle, Twinkle',96,4,'C4 C4 G4 G4 A4 A4 G4:4 F4 F4 E4 E4 D4 D4 C4:4 G4 G4 F4 F4 E4 E4 D4:4 G4 G4 F4 F4 E4 E4 D4:4 C4 C4 G4 G4 A4 A4 G4:4 F4 F4 E4 E4 D4 D4 C4:4 -:4','https://imslp.org/wiki/12_Variations_on_%27Ah,_vous_dirai-je_maman%27,_K.265/300e_(Mozart,_Wolfgang_Amadeus)'),
 tune('Frère Jacques',104,4,'C4 D4 E4 C4 C4 D4 E4 C4 E4 F4 G4:4 E4 F4 G4:4 G4:1 A4:1 G4:1 F4:1 E4 C4 G4:1 A4:1 G4:1 F4:1 E4 C4 C4 G3 C4:4 C4 G3 C4:4 -:4','https://www.gutenberg.org/files/42711/42711-h/42711-h.htm'),
 tune('Silent Night',70,3,'G4:3 A4:1 G4:2 E4:6 G4:3 A4:1 G4:2 E4:6 D5:4 D5:2 B4:6 C5:4 C5:2 G4:6 A4:4 A4:2 C5:3 B4:1 A4:2 G4:3 A4:1 G4:2 E4:6 A4:4 A4:2 C5:3 B4:1 A4:2 G4:3 A4:1 G4:2 E4:6 D5:4 D5:2 F5:3 D5:1 B4:2 C5:6 E5:6 C5:2 G4:2 E4:2 G4:3 F4:1 D4:2 C4:6 -:6','https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=1295')
];
TUNES[1].ticksPerBeat=4;
export const DEFAULT_NOTES=phrase('C4:4 E4:4 G4:4 C5:4 G4:4 E4:4 C4:8').notes;
export const clone=p=>({steps:p.steps,bpm:p.bpm,ticksPerBeat:p.ticksPerBeat||2,notes:p.notes.map(n=>({...n}))});
export function sanitizeNotes(value,steps=STEPS){if(!Array.isArray(value))return DEFAULT_NOTES.map(n=>({...n}));const unique=new Map();for(const n of value)if(n&&Number.isInteger(n.t)&&n.t>=0&&n.t<steps&&Number.isInteger(n.r)&&n.r>=0&&n.r<PITCHES.length)unique.set(n.t+':'+n.r,{t:n.t,r:n.r});return [...unique.values()].slice(0,512*PITCHES.length);}
export function sanitizePattern(value){const steps=Number.isInteger(value?.steps)&&value.steps>=16&&value.steps<=512?value.steps:STEPS;return {steps,ticksPerBeat:value?.ticksPerBeat===4?4:2,bpm:Number.isFinite(value?.bpm)?Math.max(50,Math.min(140,value.bpm)):92,notes:sanitizeNotes(value?.notes,steps)};}
export const rotationForPhase=(phase,steps=STEPS)=>-phase*TAU/steps;
export const pinAngle=(step,phase,steps=STEPS)=>CONTACT+(step-phase)*TAU/steps;
export class CylinderTransport{
 constructor(clock,onStep){this.clock=clock;this.onStep=onStep;this.bpm=92;this.ticksPerBeat=2;this.steps=STEPS;this.running=false;this.count=0;this.skipped=0;this.position=-.025*this.bpm*this.ticksPerBeat/60;this.originTime=0;this.originPhase=this.position;this.nextIndex=0;}
 phase(at=this.clock()){return this.running?this.originPhase+(at-this.originTime)*this.bpm*this.ticksPerBeat/60:this.position;}
 timeAt(index){return this.originTime+(index-this.originPhase)*60/(this.bpm*this.ticksPerBeat);}
 start(){if(this.running)return;this.originPhase=this.position;this.originTime=this.clock();this.nextIndex=Math.ceil(this.position+1e-8);this.running=true;}
 pause(){if(!this.running)return;this.position=this.phase();this.running=false;}
 reset(step=0){this.position=step-.025*this.bpm*this.ticksPerBeat/60;this.originPhase=this.position;this.originTime=this.clock();this.nextIndex=step;this.count=0;this.skipped=0;}
 tick(){if(!this.running)return;const now=this.clock(),phase=this.phase();let when=this.timeAt(this.nextIndex);if(when<now-.005){const target=Math.ceil(phase);this.skipped+=Math.max(0,target-this.nextIndex);this.nextIndex=target;when=this.timeAt(this.nextIndex);}while(when<now+.12){const absolute=this.nextIndex;this.onStep(((absolute%this.steps)+this.steps)%this.steps,when,absolute);this.nextIndex++;this.count++;when=this.timeAt(this.nextIndex);}}
}
