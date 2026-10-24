import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const files=[];function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(['.git','node_modules','evidence','test-results','playwright-report'].includes(entry.name))continue;const p=path.join(dir,entry.name);entry.isDirectory()?walk(p):files.push(p);}}walk(root);
const forbidden=[/\/Users\//,/\/home\/[a-z][^\s/]*\//,/libfile_[a-f0-9]+/,/https?:\/\/sdmnt[^\s]*oaiusercontent/,/gh[pousr]_[A-Za-z0-9]{30,}/,/github_pat_[A-Za-z0-9_]{30,}/,/-----BEGIN [A-Z ]*PRIVATE KEY-----/];
for(const file of files){const name=path.relative(root,file);assert.ok(!/\.(png|jpe?g|gif|webp|zip|pem|key)$/i.test(name),`unexpected private/binary artifact: ${name}`);assert.ok(!name.startsWith('.env'),`environment file: ${name}`);const text=fs.readFileSync(file,'utf8');for(const pattern of forbidden)assert.ok(!pattern.test(text),`private data or credential pattern: ${name}`);}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');assert.ok(html.includes('src="app.js?v=petal-03"'));assert.ok(html.includes('./vendor/three.module.min.js'));
for(const f of ['app.js','audio.js','music.js','instrument.js','mechanism.js','style.css','vendor/three.core.min.js','vendor/three.module.min.js','vendor/RoomEnvironment.js','vendor/THREE-LICENSE.txt','.nojekyll'])assert.ok(fs.statSync(path.join(root,f)).isFile(),`missing asset ${f}`);
assert.ok(fs.readFileSync(path.join(root,'vendor/THREE-LICENSE.txt'),'utf8').includes('The MIT License'));
for(const f of ['index.html','app.js','audio.js','instrument.js','mechanism.js']){const source=fs.readFileSync(path.join(root,f),'utf8');assert.ok(!/https?:\/\//.test(source),`external runtime URL: ${f}`);}
console.log(`PASS: ${files.length} release files, local asset routing, renderer license and private-data/credential patterns.`);
