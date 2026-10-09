import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const source=fs.readFileSync('src/scripts/section-animations.ts','utf8');
const script=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText;
function element(kind,left=800){const listeners=new Map();return {kind,parentElement:{closest:()=>null},classList:{values:new Set(),add(...names){names.forEach(n=>this.values.add(n));},remove(...names){names.forEach(n=>this.values.delete(n));},contains(name){return this.values.has(name);}},style:{values:new Map(),setProperty(k,v){this.values.set(k,v);},removeProperty(k){this.values.delete(k);},set animationDelay(v){this.values.set('animation-delay',v);}},matches(selector){return kind==='h2'?selector.includes('h2'):kind==='box'?selector.includes('.bento-item'):false;},getBoundingClientRect:()=>({left,width:300,top:1000,bottom:1100}),addEventListener:(type,fn)=>listeners.set(type,fn),removeEventListener:(type,fn)=>{if(listeners.get(type)===fn)listeners.delete(type);},finish(){listeners.get('animationend')?.({target:this});}};}
const elements=[element('p',120),element('p',850),element('h2')];
const section={querySelectorAll:()=>elements};
let observer;
class Observer{constructor(fn){this.callback=fn;this.observed=new Set();observer=this;}observe(el){this.observed.add(el);}unobserve(el){this.observed.delete(el);}disconnect(){this.observed.clear();}}
const motion={matches:false,addEventListener(_type,fn){this.change=fn;}};
vm.runInNewContext(script,{matchMedia:()=>motion,IntersectionObserver:Observer,window:{IntersectionObserver:Observer},document:{documentElement:{clientWidth:1440},querySelectorAll:()=>[section]},getComputedStyle:()=>({textAlign:'left'})});
assert.ok(elements.every(el=>el.classList.contains('reveal-pending')),'Offscreen elements must start transparent before their entry fires');
observer.callback(elements.map(target=>({target,isIntersecting:true})));
assert.ok(elements[0].classList.contains('animate__fadeInLeft'));
assert.ok(elements[1].classList.contains('animate__fadeInRight'));
assert.ok(elements[2].classList.contains('animate__fadeInUp'));
assert.equal(observer.observed.size,0,'Entries must run only once');
assert.ok(elements.every(el=>!el.classList.contains('reveal-pending')));
elements.forEach(el=>el.finish());
assert.ok(elements.every(el=>!el.classList.contains('animate__animated')),'Finished animations must release their transform and animation classes');
assert.ok(elements.every(el=>el.style.values.size===0),'Finished animations must clear temporary styles');
motion.matches=true;motion.change();
assert.ok(elements.every(el=>!el.classList.contains('reveal-pending')),'Reduced motion must leave all text visible');
console.log('PASS: pending visibility, directions, one-shot entrance, animation cleanup and reduced motion');
