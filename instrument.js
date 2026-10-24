import * as T from './vendor/three.module.min.js';
import {RoomEnvironment} from './vendor/RoomEnvironment.js';
const canvas=document.getElementById('view');
const renderer=new T.WebGLRenderer({canvas,antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
const scene=new T.Scene();scene.background=new T.Color('#e7e8df');scene.fog=new T.Fog('#e7e8df',28,65);
const pmrem=new T.PMREMGenerator(renderer);scene.environment=pmrem.fromScene(new RoomEnvironment(),.04).texture;scene.environmentIntensity=.8;
const camera=new T.PerspectiveCamera(34,1,.1,100);let opened=false,editing=false,editStep=0;
const root=new T.Group();scene.add(root);
function woodTexture(){
 const c=document.createElement('canvas');c.width=1024;c.height=512;const ctx=c.getContext('2d'),image=ctx.createImageData(c.width,c.height);
 const hash=(x,y,seed)=>{let h=Math.imul(x+seed*97,374761393)^Math.imul(y+seed*13,668265263);h=Math.imul(h^(h>>>13),1274126177);return ((h^(h>>>16))>>>0)/4294967296;};
 function noise(u,v,nx,ny,seed){const x=u*nx,y=v*ny,ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy,sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);const h=(a,b)=>hash((a%nx+nx)%nx,(b%ny+ny)%ny,seed);return (h(ix,iy)*(1-sx)+h(ix+1,iy)*sx)*(1-sy)+(h(ix,iy+1)*(1-sx)+h(ix+1,iy+1)*sx)*sy;}
 for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){const u=x/c.width,v=y/c.height,warp=10*noise(u,v,3,5,1)+2*noise(u,v,11,13,3),rings=Math.pow(Math.max(0,Math.sin((v*90+warp)*Math.PI*2)),12),broad=(noise(u,v,4,9,8)-.5)*13,cloud=(noise(u,v,12,27,5)-.5)*5,fibers=(noise(u,v,28,512,4)-.5)*5,variation=broad+cloud+fibers-rings*5+(hash(x,y,11)-.5)*1.6,i=(y*c.width+x)*4;image.data[i]=88+variation;image.data[i+1]=65+variation*.82;image.data[i+2]=47+variation*.65;image.data[i+3]=255;}
 ctx.putImageData(image,0,0);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=8;return t;
}
const grain=woodTexture();
const wood=new T.MeshPhysicalMaterial({map:grain,color:'#b2a08c',roughness:.61,metalness:0,clearcoat:.025,clearcoatRoughness:.8});
const darkWood=new T.MeshPhysicalMaterial({map:grain,color:'#775744',roughness:.62,clearcoat:.025,clearcoatRoughness:.8});
const trimWood=new T.MeshPhysicalMaterial({map:grain,color:'#ad8060',roughness:.58,clearcoat:.025});
const innerWood=new T.MeshStandardMaterial({map:grain,color:'#9c7858',roughness:.58});
const brass=new T.MeshStandardMaterial({color:'#a78e5b',metalness:.78,roughness:.47});
const brassLight=new T.MeshStandardMaterial({color:'#bfaa78',metalness:.78,roughness:.53});
const brassDark=new T.MeshStandardMaterial({color:'#716046',metalness:.74,roughness:.5});
const steel=new T.MeshStandardMaterial({color:'#bfc4c3',metalness:.92,roughness:.26});
const iron=new T.MeshStandardMaterial({color:'#343c3c',metalness:.75,roughness:.34});
const black=new T.MeshStandardMaterial({color:'#151b19',roughness:.37,metalness:.15});
const woodMats=new Set([wood,darkWood,trimWood,innerWood]);let board=0;
function orientGrain(geo){geo.computeBoundingBox();const size=new T.Vector3();geo.boundingBox.getSize(size);const vertical=size.y>size.x*1.8&&size.y>size.z*1.8,p=geo.attributes.position,n=geo.attributes.normal,uv=[];const offset=(board++*.173)%1;for(let i=0;i<p.count;i++){let u,v;const nx=Math.abs(n.getX(i)),ny=Math.abs(n.getY(i)),nz=Math.abs(n.getZ(i));if(vertical){u=p.getY(i)/4.7;v=(nx>nz?p.getZ(i):p.getX(i))/1.7;}else if(ny>nx&&ny>nz){u=p.getX(i)/4.7;v=p.getZ(i)/1.7;}else if(nx>nz){u=p.getZ(i)/4.7;v=p.getY(i)/1.7;}else{u=p.getX(i)/4.7;v=p.getY(i)/1.7;}uv.push(u+offset,v+offset*.73);}geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));}
function mesh(geo,mat,parent=root){if(woodMats.has(mat))orientGrain(geo);const m=new T.Mesh(geo,mat);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function box(w,h,d,x,y,z,mat=wood,parent=root){const m=mesh(new T.BoxGeometry(w,h,d),mat,parent);m.position.set(x,y,z);return m;}
function bevelBox(w,h,d,x,y,z,mat=wood,parent=root,r=.045){const s=new T.Shape(),hw=w/2,hh=h/2;s.moveTo(-hw+r,-hh);s.lineTo(hw-r,-hh);s.quadraticCurveTo(hw,-hh,hw,-hh+r);s.lineTo(hw,hh-r);s.quadraticCurveTo(hw,hh,hw-r,hh);s.lineTo(-hw+r,hh);s.quadraticCurveTo(-hw,hh,-hw,hh-r);s.lineTo(-hw,-hh+r);s.quadraticCurveTo(-hw,-hh,-hw+r,-hh);const geo=new T.ExtrudeGeometry(s,{depth:d-2*r,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:r,bevelThickness:r});geo.translate(0,0,-d/2+r);const m=mesh(geo,mat,parent);m.position.set(x,y,z);return m;}
function cyl(rad,len,x,y,z,mat=brass,parent=root,axis='y',segments=64){const m=mesh(new T.CylinderGeometry(rad,rad,len,segments),mat,parent);m.position.set(x,y,z);if(axis==='x')m.rotation.z=Math.PI/2;if(axis==='z')m.rotation.x=Math.PI/2;return m;}
function tube(points,r,mat=brass,parent=root){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));return mesh(new T.TubeGeometry(curve,80,r,12,false),mat,parent);}
function screw(x,y,z,parent=root){cyl(.052,.022,x,y,z,steel,parent);box(.06,.005,.008,x,y+.015,z,iron,parent);}
// Cabinet with a pull-out mechanism tray; the fixed deck supports the gramophone.
bevelBox(5.05,.19,3.94,0,.19,0,darkWood);bevelBox(4.92,.13,3.81,0,.33,0,trimWood);bevelBox(4.7,.13,3.62,0,.46,0,darkWood);
for(const x of [-2.08,2.08])for(const z of [-1.5,1.5]){const foot=box(.42,.27,.42,x,.04,z,darkWood);foot.rotation.y=.08;}
box(4.5,1.28,.18,0,1.16,-1.63,darkWood);box(.21,1.3,3.25,-2.15,1.16,0,wood);box(.21,1.3,3.25,2.15,1.16,0,wood);
box(4.3,.1,3.2,0,.58,0,darkWood);
bevelBox(4.78,.14,3.72,0,1.86,0,trimWood);bevelBox(4.98,.12,3.88,0,1.98,0,darkWood);
for(const x of [-2.17,2.17])for(const z of [-1.65,1.65]){box(.24,1.25,.24,x,1.17,z,darkWood);cyl(.14,.085,x,.65,z,trimWood);cyl(.14,.085,x,1.7,z,trimWood);for(let i=0;i<5;i++)box(.018,.83,.018,x-.1+i*.05,1.17,z+.13,trimWood);}
const drawer=new T.Group();root.add(drawer);bevelBox(4.17,.12,2.9,0,.65,.05,innerWood,drawer);box(4.16,.18,.10,0,.79,-1.35,innerWood,drawer);box(.1,.18,2.8,-2.03,.79,.02,innerWood,drawer);box(.1,.18,2.8,2.03,.79,.02,innerWood,drawer);
const panel=new T.Group();drawer.add(panel);bevelBox(4.13,1.12,.15,0,1.18,1.55,wood,panel);bevelBox(3.75,.76,.07,0,1.18,1.66,darkWood,panel);bevelBox(3.51,.56,.04,0,1.18,1.71,wood,panel);
for(const x of [-1.72,1.72])box(.035,.72,.02,x,1.18,1.72,trimWood,panel);for(const y of [.83,1.53])box(3.45,.028,.02,0,y,1.72,trimWood,panel);
const handle=cyl(.09,.085,0,1.15,1.79,brass,panel,'z');tube([[-.18,1.18,1.8],[-.13,1.08,1.9],[.13,1.08,1.9],[.18,1.18,1.8]],.026,brass,panel);
const hinge=new T.Group();drawer.add(hinge);hinge.position.set(0,.62,1.55);hinge.add(panel);panel.position.set(0,-.62,-1.55);
// Black shellac record is an exterior feature, never the music editor.
cyl(1.54,.09,-.23,2.085,.02,brassDark);
const recordCanvas=document.createElement('canvas');recordCanvas.width=recordCanvas.height=512;const rc=recordCanvas.getContext('2d');rc.fillStyle='#141a18';rc.fillRect(0,0,512,512);for(let i=59;i<249;i+=2){rc.beginPath();rc.arc(256,256,i,0,Math.PI*2);rc.strokeStyle=`rgba(139,148,137,${.035+(i%7)*.004})`;rc.lineWidth=.6;rc.stroke();}const recordTexture=new T.CanvasTexture(recordCanvas);recordTexture.colorSpace=T.SRGBColorSpace;const recordMat=new T.MeshStandardMaterial({map:recordTexture,color:'#b4bbb1',roughness:.5,metalness:.12});cyl(1.49,.025,-.23,2.145,.02,[black,recordMat,black]);
cyl(.34,.008,-.23,2.163,.02,new T.MeshStandardMaterial({color:'#c6b790',roughness:.76}));cyl(.045,.12,-.23,2.2,.02,steel);
cyl(.18,.1,1.62,2.12,.46,brass);tube([[1.62,2.18,.46],[1.45,2.36,.55],[.94,2.37,.95],[.64,2.28,1.03]],.036,steel);cyl(.14,.12,.64,2.25,1.03,iron,root,'y');
// Curved rising neck and a genuinely hollow flared eight-petal brass bell.
cyl(.33,.12,1.43,2.12,-1.03,brassDark);cyl(.25,.14,1.43,2.23,-1.03,brass);tube([[1.43,2.25,-1.03],[1.6,2.95,-1.05],[1.1,3.75,-1.12],[.95,4.57,-1.0]],.125,brass);
const horn=new T.Group();root.add(horn);horn.position.set(.95,4.57,-1);const axis=new T.Vector3(-.12,.52,.846).normalize();horn.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),axis);
const length=2.42,petals=8,angSteps=128,tSteps=40;
function surface(t,a,offset=0){const radial=.13+.05*t+.25*t*t+1.77*t*t*t;const radius=radial*(1+.055*Math.pow(t,5)*Math.cos(a*petals))+offset;return new T.Vector3(radius*Math.cos(a),radius*Math.sin(a),length*t);}
function bellGeometry(offset){const positions=[],uv=[],indices=[];for(let i=0;i<=tSteps;i++)for(let j=0;j<=angSteps;j++){const t=i/tSteps,a=j/angSteps*Math.PI*2,p=surface(t,a,offset);positions.push(p.x,p.y,p.z);uv.push(j/angSteps,t);}for(let i=0;i<tSteps;i++)for(let j=0;j<angSteps;j++){const a=i*(angSteps+1)+j,b=a+angSteps+1;indices.push(a,b,a+1,b,b+1,a+1);}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();const colors=[];for(let i=0;i<=tSteps;i++){const t=i/tSteps,f=.08+.92*Math.pow(t,1.4);for(let j=0;j<=angSteps;j++)colors.push(f,f*.96,f*.86);}g.setAttribute('color',new T.Float32BufferAttribute(colors,3));return g;}
const hornInside=new T.MeshStandardMaterial({color:'#bca36d',metalness:.78,roughness:.49,vertexColors:true,side:T.FrontSide});const hornOutside=new T.MeshStandardMaterial({color:'#998459',metalness:.78,roughness:.47,side:T.BackSide});mesh(bellGeometry(.024),hornOutside,horn);mesh(bellGeometry(0),hornInside,horn);const cavity=cyl(.128,.62,0,0,-.28,new T.MeshStandardMaterial({color:'#332a17',metalness:.45,roughness:.8,side:T.BackSide}),horn,'z');const darkEnd=mesh(new T.CircleGeometry(.125,32),new T.MeshBasicMaterial({color:'#1d2019',side:T.DoubleSide}),horn);darkEnd.position.z=-.6;
const rim=[];for(let i=0;i<=256;i++)rim.push(surface(1,i/256*Math.PI*2,.013));mesh(new T.TubeGeometry(new T.CatmullRomCurve3(rim,false),300,.025,10,false),brassLight,horn);
for(let k=0;k<petals;k++){const pts=[];for(let i=0;i<=50;i++)pts.push(surface(.08+.92*i/50,k*Math.PI*2/petals,-.006));mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts),50,.012,6,false),brassDark,horn);const edge=[];for(let i=0;i<=70;i++){const u=i/70,t=.60+.32*Math.sin(Math.PI*u),a=(k+.14+.72*u)*Math.PI*2/petals;edge.push(surface(t,a,-.012));}mesh(new T.TubeGeometry(new T.CatmullRomCurve3(edge),55,.007,4,false),brassLight,horn);}
// The mechanism is modelled independently from the textual cylinder/comb brief.
const mechanism=new T.Group();drawer.add(mechanism);box(3.75,.12,2.13,0,.77,-.05,brassDark,mechanism);box(3.55,.035,1.94,0,.85,-.05,brass,mechanism);
const rotor=new T.Group();rotor.position.set(-.12,1.25,.43);mechanism.add(rotor);const barrel=cyl(.38,2.98,0,0,0,brassLight,rotor,'x',64);cyl(.048,3.6,-.12,1.25,.43,steel,mechanism,'x');
for(const x of [-1.73,1.5]){box(.2,.38,.26,x,1.06,.43,brassDark,mechanism);cyl(.15,.2,x,1.25,.43,brass,mechanism,'x');for(const z of [.2,.65])screw(x,.88,z,mechanism);}
const PITCH_X=[-1.355,-.92,-.34,.24,.675,1.255],TEETH=[1,4,8,12,15,19],CONTACT=-.84,EDIT_ANGLE=.78,TAU=Math.PI*2;
const pins=new T.InstancedMesh(new T.CylinderGeometry(.028,.028,.09,8),brass,96);pins.count=0;pins.castShadow=false;rotor.add(pins);
const temp=new T.Object3D(),radial=new T.Vector3(),axisY=new T.Vector3(0,1,0);let currentNotes=[];
function setNotes(notes){currentNotes=notes.map(n=>({...n}));pins.count=notes.length;notes.forEach((n,i)=>{const a=CONTACT+n.t*TAU/16;radial.set(0,Math.cos(a),Math.sin(a));temp.position.set(PITCH_X[n.r]+.12,radial.y*.418,radial.z*.418);temp.quaternion.setFromUnitVectors(axisY,radial);temp.scale.set(1,1,1);temp.updateMatrix();pins.setMatrixAt(i,temp.matrix);});pins.instanceMatrix.needsUpdate=true;pins.computeBoundingSphere();}
const guide=new T.Group();mechanism.add(guide);guide.visible=false;const socketMat=new T.MeshStandardMaterial({color:'#71846d',roughness:.8,metalness:.1});
for(let r=0;r<6;r++){const dot=mesh(new T.CircleGeometry(.029,16),socketMat,guide);dot.position.set(PITCH_X[r],1.25+.383*Math.cos(EDIT_ANGLE),.43+.383*Math.sin(EDIT_ANGLE));dot.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),new T.Vector3(0,Math.cos(EDIT_ANGLE),Math.sin(EDIT_ANGLE)));}
const prospect=mesh(new T.SphereGeometry(.043,12,8),new T.MeshStandardMaterial({color:'#d1ddab',roughness:.6,metalness:.25}),guide);prospect.visible=false;prospect.castShadow=false;
function highlight(r){prospect.visible=r!==null;if(r!==null)prospect.position.set(PITCH_X[r],1.25+.43*Math.cos(EDIT_ANGLE),.43+.43*Math.sin(EDIT_ANGLE));}
const teethMeshes=[];
box(3.05,.13,.32,-.12,1.58,-.7,steel,mechanism);for(let i=0;i<20;i++){const len=.73+i*.012,tooth=box(.114,.032,len,-1.5+i*.145,1.56,.085-len/2,steel,mechanism);tooth.rotation.x=-.018;teethMeshes.push(tooth);}
for(const x of [-1.35,1.12])screw(x,1.66,-.72,mechanism);
function gear(x,y,z,r,teeth){const shape=new T.Shape();for(let i=0;i<teeth*4;i++){const a=i/(teeth*4)*Math.PI*2,rad=r*(i%4===1||i%4===2?1:.87);if(!i)shape.moveTo(Math.cos(a)*rad,Math.sin(a)*rad);else shape.lineTo(Math.cos(a)*rad,Math.sin(a)*rad);}shape.closePath();const hole=new T.Path();hole.absarc(0,0,r*.22,0,Math.PI*2,true);shape.holes.push(hole);const geo=new T.ExtrudeGeometry(shape,{depth:.06,bevelEnabled:true,bevelSize:.008,bevelThickness:.008,bevelSegments:1,steps:1});const m=mesh(geo,brass,mechanism);m.rotation.y=Math.PI/2;m.position.set(x,y,z);return m;}
const gears=[gear(1.68,1.25,.43,.43,22),gear(1.75,.98,-.19,.26,15)];cyl(.11,.14,1.77,1.25,.43,steel,mechanism,'x');
const crank=new T.Group();drawer.add(crank);tube([[1.8,1.25,.43],[2.5,1.25,.43],[2.7,1.05,.43],[2.7,.63,.43],[3.07,.61,.43]],.047,steel,crank);const grip=cyl(.095,.42,3.2,.61,.43,black,crank,'x');const crankPivot=new T.Group();drawer.add(crankPivot);crankPivot.position.set(1.8,1.25,.43);crankPivot.add(crank);crank.position.set(-1.8,-1.25,-.43);
const floor=mesh(new T.PlaneGeometry(200,200),new T.ShadowMaterial({color:'#626b57',opacity:.19}),scene);floor.rotation.x=-Math.PI/2;floor.position.y=-.12;floor.receiveShadow=true;floor.castShadow=false;
const hemi=new T.HemisphereLight('#fff8e9','#657263',1.25);scene.add(hemi);const key=new T.DirectionalLight('#fff2d9',3.0);key.position.set(-4,9,7);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-9;key.shadow.camera.right=9;key.shadow.camera.top=10;key.shadow.camera.bottom=-9;key.shadow.normalBias=.035;key.shadow.bias=-.0002;key.shadow.radius=4;scene.add(key);const fill=new T.DirectionalLight('#dbe8e2',.85);fill.position.set(6,5,-4);scene.add(fill);
function mergeBoards(parent){const byMaterial=new Map();for(const m of [...parent.children]){if(m.isMesh&&woodMats.has(m.material)){if(!byMaterial.has(m.material))byMaterial.set(m.material,[]);byMaterial.get(m.material).push(m);}}for(const [material,meshes]of byMaterial){if(meshes.length<2)continue;const buffers={position:[],normal:[],uv:[]};for(const m of meshes){m.updateMatrix();const g=(m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone()).applyMatrix4(m.matrix);for(const key of Object.keys(buffers))buffers[key].push(g.attributes[key].array);g.dispose();parent.remove(m);m.geometry.dispose();}const g=new T.BufferGeometry();for(const [key,arrays]of Object.entries(buffers)){const joined=new Float32Array(arrays.reduce((n,a)=>n+a.length,0));let offset=0;for(const a of arrays){joined.set(a,offset);offset+=a.length;}g.setAttribute(key,new T.BufferAttribute(joined,key==='uv'?2:3));}const m=new T.Mesh(g,material);m.castShadow=m.receiveShadow=true;parent.add(m);}}
mergeBoards(root);mergeBoards(drawer);mergeBoards(panel);
const raycaster=new T.Raycaster(),mouse=new T.Vector2(),gearQ=new T.Quaternion(),worldX=new T.Vector3(1,0,0),baseGearQ=new T.Quaternion().setFromEuler(new T.Euler(0,Math.PI/2,0));let phase=0,windStart=-Infinity;const plucks=new Array(6).fill(-Infinity);
renderer.shadowMap.autoUpdate=false;
function layout(){const rect=canvas.getBoundingClientRect(),w=rect.width,h=rect.height;renderer.setSize(w,h,false);camera.aspect=w/h;const fov=T.MathUtils.degToRad(camera.fov),hfov=2*Math.atan(Math.tan(fov/2)*camera.aspect);let target,dir,distance;if(editing){target=new T.Vector3(-.12,1.35,2.15);dir=new T.Vector3(.35,6.9,13).normalize();distance=Math.max(3.8/(2*Math.tan(hfov/2)),3.5/(2*Math.tan(fov/2)))*1.04;}else if(opened){target=new T.Vector3(.45,1.3,2.2);dir=new T.Vector3(2.8,7.4,12).normalize();distance=Math.max(6.1/(2*Math.tan(hfov/2)),4/(2*Math.tan(fov/2)))*1.10;}else{target=new T.Vector3(.2,3.6,.3);dir=new T.Vector3(4,3,13).normalize();distance=Math.max(6.5/(2*Math.tan(hfov/2)),8.9/(2*Math.tan(fov/2)))*1.06;}camera.position.copy(target).addScaledVector(dir,distance);camera.lookAt(target);camera.updateProjectionMatrix();renderer.shadowMap.needsUpdate=true;render();}
function render(){renderer.render(scene,camera);}
function setOpen(value,compose=false){opened=value;editing=compose;drawer.position.z=value?1.85:0;hinge.rotation.x=value?Math.PI/2:0;guide.visible=compose;if(compose)setEditStep(editStep);layout();}
function setEditStep(value){editStep=((value%16)+16)%16;rotor.rotation.x=EDIT_ANGLE-CONTACT-editStep*TAU/16;phase=editStep;highlight(null);}
function setPhase(value){phase=value;rotor.rotation.x=-value*TAU/16;gears.forEach((g,i)=>{gearQ.setFromAxisAngle(worldX,-value*TAU/16*(i?-1.65:1));g.quaternion.copy(baseGearQ).premultiply(gearQ);});}
function strike(notes,when){for(const n of notes)plucks[n.r]=when;}
function animate(now,stamp){for(let r=0;r<6;r++){const dt=now-plucks[r],tooth=teethMeshes[TEETH[r]];tooth.position.y=1.56+(dt>=0&&dt<.18?.018*Math.sin(dt*150)*Math.exp(-dt*22):0);}const t=(stamp-windStart)/650;crankPivot.rotation.x=t>=0&&t<1?-TAU*(1-(1-t)**3):0;return t>=0&&t<1;}
function wind(){windStart=performance.now();}
function pick(x,y){if(!editing)return null;const rect=canvas.getBoundingClientRect();mouse.set((x-rect.left)/rect.width*2-1,-(y-rect.top)/rect.height*2+1);raycaster.setFromCamera(mouse,camera);const hits=raycaster.intersectObject(barrel);if(!hits.length)return null;const point=mechanism.worldToLocal(hits[0].point.clone());let best=0;for(let r=1;r<6;r++)if(Math.abs(point.x-PITCH_X[r])<Math.abs(point.x-PITCH_X[best]))best=r;return best;}
function project(point){const rect=canvas.getBoundingClientRect(),p=new T.Vector3(...point).project(camera);return {x:rect.left+(p.x+1)/2*rect.width,y:rect.top+(1-p.y)/2*rect.height,visible:p.z<1};}
function gripPoint(){root.updateMatrixWorld(true);const p=grip.getWorldPosition(new T.Vector3());return project(p.toArray());}
function editPoint(r){return project([PITCH_X[r],1.25+.39*Math.cos(EDIT_ANGLE),.43+drawer.position.z+.39*Math.sin(EDIT_ANGLE)]);}
function contactProbe(step,r,value){const before=rotor.rotation.x;setPhase(value);root.updateMatrixWorld(true);const index=currentNotes.findIndex(n=>n.t===step&&n.r===r);if(index<0){rotor.rotation.x=before;return null;}const m=new T.Matrix4();pins.getMatrixAt(index,m);const tip=new T.Vector3(0,.045,0).applyMatrix4(m);rotor.localToWorld(tip);const tooth=mechanism.localToWorld(new T.Vector3(PITCH_X[r],1.56,.085));rotor.rotation.x=before;return {distance:tip.distanceTo(tooth),tip:tip.toArray(),tooth:tooth.toArray()};}
export const view={contactProbe,setOpen,setNotes,setPhase,setEditStep,highlight,strike,animate,wind,layout,render,pick,project,gripPoint,editPoint,canvas,info:()=>({opened,editing,phase,editStep,notes:currentNotes.map(n=>({...n})),rotation:rotor.rotation.x,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,contact:CONTACT,pitches:PITCH_X.slice()}),ready:true};
setOpen(false);
