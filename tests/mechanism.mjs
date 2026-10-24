import assert from 'node:assert/strict';
import {PITCHES,TUNES,CONTACT} from '../music.js';
import {BARREL,PIN_LENGTH,PIN_ROOT,PIN_CENTER,PIN_TIP,CONTACT_Y,CONTACT_Z,PITCH_X,pinRadius} from '../mechanism.js';
assert.equal(PITCHES.length,37);assert.equal(PITCH_X.length,37);
for(let r=0;r<37;r++){assert.equal(PITCHES[r],60+r);const previousFrequency=440*2**(((48+r)+12-69)/12),frequency=440*2**((PITCHES[r]-69)/12);assert.equal(frequency,previousFrequency);assert.ok(PITCH_X[r]-.006>BARREL.x-BARREL.length/2);assert.ok(PITCH_X[r]+.006<BARREL.x+BARREL.length/2);}
assert.ok(PIN_ROOT<BARREL.radius);assert.equal(PIN_TIP,PIN_ROOT+PIN_LENGTH);assert.ok((PIN_TIP-BARREL.radius)/(BARREL.radius*2)<.05);assert.equal(CONTACT_Y,BARREL.y+PIN_TIP*Math.cos(CONTACT));assert.equal(CONTACT_Z,BARREL.z+PIN_TIP*Math.sin(CONTACT));
for(let steps=16;steps<=512;steps++){const centerChord=2*PIN_CENTER*Math.sin(Math.PI/steps),width=2*pinRadius(steps);assert.ok(width<centerChord*.31);}
const distinct=new Set(TUNES.flatMap(t=>t.notes.map(n=>n.r)));assert.equal(distinct.size,20);assert.equal(Math.min(...distinct),4);
console.log(JSON.stringify({pass:true,teeth:37,presetDistinctPitches:distinct.size,soundingRange:[PITCHES[0],PITCHES.at(-1)],body:BARREL,pinLength:PIN_LENGTH,projection:PIN_TIP-BARREL.radius,projectionDiameterRatio:(PIN_TIP-BARREL.radius)/(2*BARREL.radius),laneMargins:[PITCH_X[0]-(BARREL.x-BARREL.length/2),BARREL.x+BARREL.length/2-PITCH_X.at(-1)],audioFrequenciesUnchanged:37,nonOverlapStepCounts:497},null,2));
