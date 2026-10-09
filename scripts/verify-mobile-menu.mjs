import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const page=fs.readFileSync('src/pages/index.astro','utf8');
const source=page.split('<script>')[1].split('</script>')[0].replace(/^import .*;$/gm,'');
const script=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText;
const css=fs.readFileSync('src/styles/global.css','utf8');
const events=new Map(),menuEvents=new Map();let expanded='false',focused=false;
const button={getAttribute:()=>expanded,setAttribute:(_key,value)=>expanded=value,focus:()=>focused=true,addEventListener:(type,fn)=>events.set(type,fn)};
const menu={classList:{names:new Set(),remove(name){this.names.delete(name);},toggle(name,on){if(on)this.names.add(name);else this.names.delete(name);}},addEventListener:(type,fn)=>menuEvents.set(type,fn)};
let keydown;
class Element{closest(selector){return selector==='a'?this:null;}}
vm.runInNewContext(script,{Element,document:{documentElement:{classList:{add(){}}},querySelector:selector=>selector==='.menu-toggle'?button:menu,addEventListener:(_type,fn)=>keydown=fn}});
events.get('click')();
assert.equal(expanded,'true');assert.ok(menu.classList.names.has('is-open'));
// The presence-only selector has higher specificity than nav.is-open and hides both states.
assert.ok(!css.includes(':has(.menu-toggle[aria-expanded]) nav'),'CSS must not hide an expanded menu merely because aria-expanded exists');
assert.ok(css.includes(':has(.menu-toggle[aria-expanded="false"]) nav'),'Only the collapsed state may be hidden');
events.get('click')();assert.equal(expanded,'false');assert.ok(!menu.classList.names.has('is-open'));
events.get('click')();keydown({key:'Escape'});assert.equal(expanded,'false');assert.ok(focused);
events.get('click')();menuEvents.get('click')({target:new Element()});assert.equal(expanded,'false');
events.get('click')();menuEvents.get('segmentnavigate')();assert.equal(expanded,'false');
console.log('PASS: open/close, CSS expanded state, Escape focus, link selection and segment navigation');
