import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('src/components/ui/RubberSegment.tsx','utf8');
const marker=source.indexOf('// Keep the selected link');
const begin=source.indexOf('useEffect(()=>{',marker)+'useEffect(()=>{'.length;
const end=source.indexOf('},[key,value]);',begin);
const effect=source.slice(begin,end).replace('section:HTMLElement','section');
const values=['sobre','psicoterapia','como-funciona','duvidas'];
function run(tops,pendingValue,expires=2000,now=1000){let selected=pendingValue;const pending={current:pendingValue?{value:pendingValue,until:expires}:null};const sections=Object.fromEntries(values.map((id,i)=>[id,{getBoundingClientRect:()=>({top:tops[i]})}]));const script='(function(){'+effect+'})()';vm.runInNewContext(script,{value:undefined,frame:0,list:values.map(value=>({value})),pending,drag:{current:null},document:{documentElement:{},getElementById:id=>sections[id]},getComputedStyle:()=>({scrollPaddingTop:'100px',scrollMarginTop:'100px'}),Date:{now:()=>now},setInner:value=>{selected=typeof value==='function'?value(selected):value;},window:{addEventListener(){},removeEventListener(){}},requestAnimationFrame(){return 1;},cancelAnimationFrame(){}});return {selected,pending};}
assert.equal(run([-2400,-1400,-600,200],'sobre').selected,'sobre','Upward click must retain its destination while scrolling');
assert.equal(run([-400,300,1000,1800],'duvidas').selected,'duvidas','Downward click must retain its destination while scrolling');
assert.equal(run([200,1000,1800,2600],'sobre').selected,'sobre','Anchor landing at combined scroll offset must select its destination');
assert.equal(run([-1800,-1000,-400,200],'duvidas').selected,'duvidas');
assert.equal(run([-500,200,1000,1800],null).selected,'psicoterapia','Manual scroll uses the same anchor offset');
assert.equal(run([-500,200,1000,1800],'duvidas',500).selected,'psicoterapia','Expired navigation lock must allow manual section updates');
console.log('PASS: upward/downward clicks, anchor landing, manual scroll and expired lock');

const chooseSource=source.slice(source.indexOf('const choose='),source.indexOf('const key=')).replace('i:number','i');
for(const from of [-1,3]){let travelCount=0,jumpCount=0;const context={committed:{current:from},pending:{current:null},list:values.map(value=>({value})),value:undefined,setInner(){},onChange:undefined,travel(){travelCount++;},jump(){jumpCount++;},Date};vm.createContext(context);vm.runInContext(chooseSource+';choose(3);',context);assert.equal(travelCount,0,'Initial selection and clicking the active link must not stretch across unrelated links');assert.equal(jumpCount,1);}
console.log('PASS: initial selection and repeated active click do not flash through other slots');
