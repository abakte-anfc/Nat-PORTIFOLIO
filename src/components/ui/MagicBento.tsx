import { useEffect, useRef, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';
export interface MagicBentoProps { cards: readonly string[]; textAutoHide?: boolean; enableStars?: boolean; enableSpotlight?: boolean; enableBorderGlow?: boolean; disableAnimations?: boolean; spotlightRadius?: number; particleCount?: number; enableTilt?: boolean; glowColor?: string; clickEffect?: boolean; enableMagnetism?: boolean; }
export default function MagicBento({cards,textAutoHide=false,enableStars=true,enableSpotlight=true,enableBorderGlow=true,disableAnimations=false,spotlightRadius=150,particleCount=12,enableTilt=true,glowColor='107, 27, 44',clickEffect=true,enableMagnetism=true}:MagicBentoProps){
const gridRef=useRef<HTMLDivElement>(null);
useEffect(()=>{
 const grid=gridRef.current;if(!grid)return;
 const media=matchMedia('(prefers-reduced-motion: reduce), (max-width: 768px), (hover: none)');
 let cleanups:(()=>void)[]=[];
 const clear=()=>{cleanups.forEach(fn=>fn());cleanups=[];};
 const setup=()=>{clear();if(disableAnimations||media.matches)return;
 const spotlight=document.createElement('div');spotlight.className='global-spotlight';spotlight.setAttribute('aria-hidden','true');spotlight.style.setProperty('--glow-color',glowColor);spotlight.style.width=spotlight.style.height=spotlightRadius*2+'px';if(enableSpotlight)grid.append(spotlight);
 const elements=Array.from(grid.querySelectorAll<HTMLElement>('.magic-bento-card'));
 elements.forEach(card=>{
 const particles=new Set<HTMLElement>();const timers=new Set<ReturnType<typeof setTimeout>>();let hovered=false;
 const clearParticles=()=>{timers.forEach(clearTimeout);timers.clear();particles.forEach(p=>{gsap.killTweensOf(p);p.remove();});particles.clear();};
 const enter=()=>{hovered=true;if(!enableStars)return;for(let i=0;i<Math.min(Math.max(particleCount,0),40);i++){const timer=setTimeout(()=>{timers.delete(timer);if(!hovered)return;const particle=document.createElement('span');particle.className='particle';particle.setAttribute('aria-hidden','true');particle.style.left=Math.random()*100+'%';particle.style.top=Math.random()*100+'%';card.append(particle);particles.add(particle);gsap.fromTo(particle,{scale:0,opacity:0},{scale:1,opacity:.7,duration:.3});gsap.to(particle,{x:(Math.random()-.5)*70,y:(Math.random()-.5)*70,duration:2+Math.random(),repeat:-1,yoyo:true,ease:'none'});},i*70);timers.add(timer);}};
 const move=(e:MouseEvent)=>{const rect=card.getBoundingClientRect();const x=e.clientX-rect.left,y=e.clientY-rect.top;card.style.setProperty('--glow-x',x+'px');card.style.setProperty('--glow-y',y+'px');card.style.setProperty('--glow-intensity','1');gsap.to(card,{...(enableTilt?{rotateX:-(y/rect.height-.5)*10,rotateY:(x/rect.width-.5)*10,transformPerspective:1000}:{}),...(enableMagnetism?{x:(x-rect.width/2)*.035,y:(y-rect.height/2)*.035}:{}),duration:.2,overwrite:'auto',ease:'power2.out'});};
 const leave=()=>{hovered=false;clearParticles();card.style.setProperty('--glow-intensity','0');gsap.to(card,{rotateX:0,rotateY:0,x:0,y:0,duration:.3,overwrite:true});};
 const click=(e:MouseEvent)=>{if(!clickEffect)return;const rect=card.getBoundingClientRect();const size=Math.hypot(rect.width,rect.height)*2;const ripple=document.createElement('span');ripple.className='bento-ripple';ripple.setAttribute('aria-hidden','true');Object.assign(ripple.style,{width:size+'px',height:size+'px',left:e.clientX-rect.left-size/2+'px',top:e.clientY-rect.top-size/2+'px'});card.append(ripple);particles.add(ripple);gsap.fromTo(ripple,{scale:0,opacity:.4},{scale:1,opacity:0,duration:.8,onComplete:()=>{particles.delete(ripple);ripple.remove();}});};
 card.addEventListener('mouseenter',enter);card.addEventListener('mousemove',move);card.addEventListener('mouseleave',leave);card.addEventListener('click',click);
 cleanups.push(()=>{hovered=false;clearParticles();gsap.killTweensOf(card);gsap.set(card,{clearProps:'transform'});card.style.setProperty('--glow-intensity','0');card.removeEventListener('mouseenter',enter);card.removeEventListener('mousemove',move);card.removeEventListener('mouseleave',leave);card.removeEventListener('click',click);});
 });
 const gridMove=(e:MouseEvent)=>{if(!enableSpotlight)return;const rect=grid.getBoundingClientRect();gsap.to(spotlight,{left:e.clientX-rect.left,top:e.clientY-rect.top,opacity:1,duration:.15,overwrite:true});};
 const gridLeave=()=>gsap.to(spotlight,{opacity:0,duration:.2,overwrite:true});
 grid.addEventListener('mousemove',gridMove);grid.addEventListener('mouseleave',gridLeave);
 cleanups.push(()=>{grid.removeEventListener('mousemove',gridMove);grid.removeEventListener('mouseleave',gridLeave);gsap.killTweensOf(spotlight);spotlight.remove();});
 };setup();media.addEventListener('change',setup);return()=>{clear();media.removeEventListener('change',setup);};
},[disableAnimations,enableStars,enableSpotlight,enableBorderGlow,enableTilt,enableMagnetism,clickEffect,spotlightRadius,particleCount,glowColor]);
return <div ref={gridRef} className="themes card-grid bento-section" style={{'--glow-color':glowColor,'--glow-radius':spotlightRadius+'px'} as CSSProperties}>{cards.map((title,index)=><div key={title} className="bento-item"><article className={'theme magic-bento-card '+(enableBorderGlow?'magic-bento-card--border-glow ':'')+(textAutoHide?'magic-bento-card--text-autohide':'')}><span className="theme-number" aria-hidden="true">0{index+1}</span><h3 className="magic-bento-card__title">{title}</h3><span className="theme-mark" aria-hidden="true">✧</span></article></div>)}</div>;
}