import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type PointerEvent, type KeyboardEvent } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import './RubberSegment.css';
type Item = string | {value:string;label:ReactNode;icon?:ReactNode};
interface Props {items:Item[];value?:string;defaultValue?:string;onChange?:(value:string,index:number)=>void;trackColor?:string;thumbColor?:string;textColor?:string;activeTextColor?:string;size?:'sm'|'md'|'lg';radius?:number;inset?:number;equalSlots?:boolean;stretch?:number;squash?:number;speed?:number;glide?:number;draggable?:boolean;disabled?:boolean;className?:string;'aria-label'?:string;}
const clamp=(x:number,min:number,max:number)=>Math.min(max,Math.max(min,x));
export default function RubberSegment({items,value,defaultValue,onChange,trackColor='#E9DFD5',thumbColor='#6B1B2C',textColor='#6B1B2C',activeTextColor='#FFFFFF',size='lg',radius=12,inset=3,equalSlots=false,stretch=100,squash=3,speed=1,glide=75,draggable=true,disabled=false,className='','aria-label':label='Seções do site'}:Props){
const list=items.map(item=>typeof item==='string'?{value:item,label:item}:item);
const [inner,setInner]=useState(defaultValue??'');const [ready,setReady]=useState(false);
const current=value??inner;const index=list.findIndex(item=>item.value===current);
const reduced=useReducedMotion();const track=useRef<HTMLDivElement>(null);const links=useRef<(HTMLAnchorElement|null)[]>([]);
const slots=useRef<{l:number;r:number}[]>([]);const committed=useRef(index);const timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);const generation=useRef(0);const suppressClick=useRef(0);const pending=useRef<{value:string;until:number}|null>(null);
const drag=useRef<{id:number;start:number;left:number;width:number;lastX:number;lastT:number;velocity:number;live:boolean}|null>(null);
const left=useMotionValue(0),right=useMotionValue(0),width=useMotionValue(0);
const clipPath=useTransform(()=> 'inset(0 '+Math.max(0,width.get()-right.get())+'px 0 '+Math.max(0,left.get())+'px round '+Math.max(0,radius-inset)+'px)');
const jump=(i:number)=>{clearTimeout(timer.current);generation.current++;left.stop();right.stop();const slot=slots.current[i];if(slot){left.jump(slot.l);right.jump(slot.r);}};
const travel=(to:number)=>{const slot=slots.current[to];if(!slot)return;clearTimeout(timer.current);const token=++generation.current;left.stop();right.stop();if(reduced){left.jump(slot.l);right.jump(slot.r);return;}const seconds=(n:number)=>n/Math.max(speed,.1);const dilation=clamp(stretch/100,0,2);const direction=slot.l>left.get()?1:-1;const ease:[number,number,number,number]=[.23,1,.32,1];animate(left,slot.l+(Math.min(left.get(),slot.l)-slot.l)*dilation,{duration:seconds(.19),ease});animate(right,slot.r+(Math.max(right.get(),slot.r)-slot.r)*dilation,{duration:seconds(.19),ease});timer.current=setTimeout(()=>{const trailing=direction>0?left:right;const leading=direction>0?right:left;const destination=direction>0?slot.l:slot.r;animate(leading,direction>0?slot.r:slot.l,{type:'spring',duration:seconds(.3),bounce:0});animate(trailing,destination+direction*squash,{type:'spring',duration:seconds(.3),bounce:0}).then(()=>{if(generation.current===token)animate(trailing,destination,{type:'spring',duration:seconds(.16),bounce:0});});},seconds(.15)*1000);};
const choose=(i:number,animated=true)=>{if(i<0||!list[i])return;const from=committed.current;committed.current=i;pending.current={value:list[i].value,until:Date.now()+1500};if(value===undefined)setInner(list[i].value);onChange?.(list[i].value,i);if(animated && from>=0 && from!==i)travel(i);else jump(i);};
const key=list.map(item=>item.value).join('|');
useEffect(()=>{let live=true;const measure=()=>{const el=track.current;if(!el||!el.getBoundingClientRect().width)return;const rect=el.getBoundingClientRect();slots.current=links.current.map(link=>{const bounds=link?.getBoundingClientRect();return bounds?{l:bounds.left-rect.left-inset,r:bounds.right-rect.left-inset}:{l:0,r:0};});width.set(rect.width-inset*2);jump(committed.current);setReady(true);};measure();const observer=new ResizeObserver(measure);if(track.current)observer.observe(track.current);document.fonts?.ready.then(()=>{if(live)measure();});return()=>{live=false;observer.disconnect();clearTimeout(timer.current);generation.current++;left.stop();right.stop();};},[key,inset,size,equalSlots]);
useEffect(()=>{if(committed.current!==index&&!drag.current){committed.current=index;jump(index);}},[index]);
useEffect(()=>{if(reduced)jump(committed.current);},[reduced]);
// Keep the selected link in sync without interrupting click navigation.
useEffect(()=>{
 if(value!==undefined)return;
 let frame=0;
 const offsetFor=(section:HTMLElement)=>{
  const padding=parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||0;
  const margin=parseFloat(getComputedStyle(section).scrollMarginTop)||0;
  return padding+margin;
 };
 const update=()=>{
  frame=0;
  if(drag.current)return;
  if(pending.current){
   const destination=document.getElementById(pending.current.value);
   // A destination above the viewport is still in transit when navigating upward.
   const landed=destination && Math.abs(destination.getBoundingClientRect().top-offsetFor(destination))<=8;
   if(Date.now()<pending.current.until && destination && !landed)return;
   pending.current=null;
  }
  let next='';
  list.forEach(item=>{
   const section=document.getElementById(item.value);
   if(section && section.getBoundingClientRect().top<=offsetFor(section)+8)next=item.value;
  });
  setInner(previous=>previous===next?previous:next);
 };
 const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
 window.addEventListener('scroll',scroll,{passive:true});
 update();
 return()=>{window.removeEventListener('scroll',scroll);cancelAnimationFrame(frame);};
},[key,value]);
const down=(e:PointerEvent<HTMLDivElement>)=>{if(disabled||!draggable||e.button!==0||index<0||matchMedia('(max-width: 900px)').matches)return;const rect=track.current?.getBoundingClientRect();if(!rect)return;const x=e.clientX-rect.left-inset;if(x<left.get()||x>right.get())return;drag.current={id:e.pointerId,start:x,left:left.get(),width:right.get()-left.get(),lastX:x,lastT:e.timeStamp,velocity:0,live:false};};
const move=(e:PointerEvent<HTMLDivElement>)=>{const d=drag.current;const rect=track.current?.getBoundingClientRect();if(!d||d.id!==e.pointerId||!rect)return;const x=e.clientX-rect.left-inset;if(!d.live){if(Math.abs(x-d.start)<4)return;d.live=true;clearTimeout(timer.current);generation.current++;left.stop();right.stop();e.currentTarget.setPointerCapture(e.pointerId);}const elapsed=e.timeStamp-d.lastT;if(elapsed>0)d.velocity=clamp((x-d.lastX)/elapsed*1000,-2000,2000);d.lastX=x;d.lastT=e.timeStamp;const raw=d.left+x-d.start;const max=width.get()-d.width;const position=clamp(raw,0,max);const over=raw-position;const rubber=reduced?0:over*.55/(1+Math.abs(over)/Math.max(d.width,1));left.set(position+Math.max(0,rubber));right.set(position+d.width+Math.min(0,rubber));e.preventDefault();};
const release=(e:PointerEvent<HTMLDivElement>,cancel=false)=>{const d=drag.current;if(!d||d.id!==e.pointerId)return;drag.current=null;if(!d.live)return;suppressClick.current=Date.now()+300;if(cancel){jump(committed.current);return;}const velocity=e.timeStamp-d.lastT>100?0:d.velocity;const center=(left.get()+right.get())/2+(reduced?0:velocity*.08*glide/75);let target=0;slots.current.forEach((slot,i)=>{if(Math.abs((slot.l+slot.r)/2-center)<Math.abs((slots.current[target].l+slots.current[target].r)/2-center))target=i;});choose(target);const link=links.current[target];if(link){location.hash=list[target].value;link.focus();track.current?.dispatchEvent(new CustomEvent('segmentnavigate',{bubbles:true}));}e.preventDefault();};
const keyboard=(e:KeyboardEvent<HTMLAnchorElement>,i:number)=>{let next=i;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=Math.min(list.length-1,i+1);else if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=Math.max(0,i-1);else if(e.key==='Home')next=0;else if(e.key==='End')next=list.length-1;else return;e.preventDefault();links.current[next]?.focus();};
const preset={sm:{height:44,font:12,pad:10},md:{height:44,font:13,pad:14},lg:{height:48,font:14,pad:14}}[size];
return <div ref={track} className={'rubber-segment '+className} role="group" aria-label={label} aria-disabled={disabled||undefined} data-equal={equalSlots||undefined} style={{'--rs-track':trackColor,'--rs-thumb':thumbColor,'--rs-ink':textColor,'--rs-ink-active':activeTextColor,'--rs-radius':radius+'px','--rs-inset':inset+'px','--rs-thumb-radius':Math.max(0,radius-inset)+'px','--rs-h':preset.height+'px','--rs-font':preset.font+'px','--rs-pad':preset.pad+'px'} as CSSProperties} onPointerDown={down} onPointerMove={move} onPointerUp={e=>release(e)} onPointerCancel={e=>release(e,true)} onLostPointerCapture={e=>release(e,true)}>
{list.map((item,i)=><a key={item.value} ref={el=>{links.current[i]=el;}} href={'#'+item.value} aria-current={i===index?'location':undefined} aria-disabled={disabled||undefined} className="rubber-segment__item" onKeyDown={e=>keyboard(e,i)} onClick={e=>{if(disabled||Date.now()<suppressClick.current){e.preventDefault();suppressClick.current=0;return;}if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey)choose(i);}}>{item.icon}{item.label}</a>)}
<motion.div className="rubber-segment__thumb" aria-hidden="true" style={{clipPath,opacity:ready&&index>=0?1:0}}>{list.map(item=><span key={item.value} className="rubber-segment__item rubber-segment__copy">{item.icon}{item.label}</span>)}</motion.div>
</div>;
}