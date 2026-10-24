import {PITCHES,CONTACT,TAU} from './music.js?v=petal-04';
export const BARREL={radius:.38,length:2.98,x:-.12,y:1.25,z:.43};
export const PIN_LENGTH=.035,PIN_ROOT=BARREL.radius-.003,PIN_CENTER=PIN_ROOT+PIN_LENGTH/2,PIN_TIP=PIN_ROOT+PIN_LENGTH;
export const TOOTH_THICKNESS=.026,CONTACT_Y=BARREL.y+PIN_TIP*Math.cos(CONTACT),CONTACT_Z=BARREL.z+PIN_TIP*Math.sin(CONTACT);
export const PITCH_X=PITCHES.map((_,r)=>BARREL.x+(r/(PITCHES.length-1)-.5)*(BARREL.length-.2));
export const pinRadius=(steps,gap=1)=>Math.min(.012,PIN_CENTER*Math.sin(Math.PI*Math.min(gap,steps/2)/steps)*.3);
export const pinAt=(step,phase,steps)=>({angle:CONTACT+(step-phase)*TAU/steps,radius:PIN_TIP});
export function noteRadii(notes,steps){
 const lanes=new Map();for(const n of notes){if(!lanes.has(n.r))lanes.set(n.r,[]);lanes.get(n.r).push(n.t);}
 for(const times of lanes.values())times.sort((a,b)=>a-b);
 return notes.map(n=>{const times=lanes.get(n.r),i=times.indexOf(n.t),gap=times.length<2?steps/2:Math.min((n.t-times[(i+times.length-1)%times.length]+steps)%steps,(times[(i+1)%times.length]-n.t+steps)%steps);return pinRadius(steps,gap);});
}
