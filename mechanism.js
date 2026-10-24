import {PITCHES,CONTACT,TAU} from './music.js?v=petal-03';
export const BARREL={radius:.38,length:2.98,x:-.12,y:1.25,z:.43};
export const PIN_LENGTH=.035,PIN_ROOT=BARREL.radius-.003,PIN_CENTER=PIN_ROOT+PIN_LENGTH/2,PIN_TIP=PIN_ROOT+PIN_LENGTH;
export const TOOTH_THICKNESS=.026,CONTACT_Y=BARREL.y+PIN_TIP*Math.cos(CONTACT),CONTACT_Z=BARREL.z+PIN_TIP*Math.sin(CONTACT);
export const PITCH_X=PITCHES.map((_,r)=>BARREL.x+(r/(PITCHES.length-1)-.5)*(BARREL.length-.2));
export const pinRadius=steps=>Math.min(.006,PIN_CENTER*Math.sin(Math.PI/steps)*.3);
export const pinAt=(step,phase,steps)=>({angle:CONTACT+(step-phase)*TAU/steps,radius:PIN_TIP});
