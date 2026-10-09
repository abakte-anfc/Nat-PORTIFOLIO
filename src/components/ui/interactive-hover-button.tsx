import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { text?: string; }
const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(({ text = 'Button', className, ...props }, ref) => (
<button ref={ref} className={cn('interactive-hover group relative cursor-pointer overflow-hidden rounded-full border bg-background p-2 text-center font-semibold',className)} {...props}>
<span className="hover-label">{text}</span><span className="hover-active" aria-hidden="true">{text}<ArrowRight size={20}/></span><span className="hover-fill" aria-hidden="true"/>
</button>));
InteractiveHoverButton.displayName = 'InteractiveHoverButton';
// Contact navigation keeps native link semantics and works without hydration.
interface InteractiveHoverLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { text: string; }
const InteractiveHoverLink = React.forwardRef<HTMLAnchorElement, InteractiveHoverLinkProps>(({text,className,...props},ref)=>(
<a ref={ref} className={cn('button interactive-hover group relative cursor-pointer overflow-hidden rounded-full border text-center font-semibold',className)} {...props}><span className="hover-label">{text}</span><span className="hover-active" aria-hidden="true">{text}<ArrowRight size={20}/></span><span className="hover-fill" aria-hidden="true"/></a>));
InteractiveHoverLink.displayName = 'InteractiveHoverLink';
export { InteractiveHoverButton, InteractiveHoverLink };