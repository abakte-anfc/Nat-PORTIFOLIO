const motion = matchMedia('(prefers-reduced-motion: reduce)');
const effects = ['animate__fadeInRight', 'animate__fadeInLeft', 'animate__fadeInUp', 'animate__fadeIn'];
const boxes = '.bento-item, details, .steps > li, .hero-art, .contact-links > a, .button';
const targets = 'h1, h2, h3, p, .bento-item, details, .steps > li, .hero-art, .contact-links > a, .button';
let observer: IntersectionObserver | undefined;
const pending = new Set<HTMLElement>();
const animated = new Map<HTMLElement, (event: AnimationEvent) => void>();

function entranceFor(element: HTMLElement) {
  if (element.matches('h1, h2, h3') || element.matches(boxes)) return 'animate__fadeInUp';
  const bounds = element.getBoundingClientRect();
  const center = bounds.left + bounds.width / 2;
  const midpoint = document.documentElement.clientWidth / 2;
  if (getComputedStyle(element).textAlign === 'center') return 'animate__fadeInUp';
  return center > midpoint + 24 ? 'animate__fadeInRight' : 'animate__fadeInLeft';
}

function finish(element: HTMLElement) {
  const listener = animated.get(element);
  if (listener) {
    element.removeEventListener('animationend', listener);
    element.removeEventListener('animationcancel', listener);
  }
  element.classList.remove('reveal-pending', 'animate__animated', ...effects);
  element.style.removeProperty('animation-delay');
  element.style.removeProperty('--animate-duration');
  animated.delete(element);
  pending.delete(element);
}

function stop() {
  observer?.disconnect();
  [...pending, ...animated.keys()].forEach(finish);
}

function initialize() {
  stop();
  if (motion.matches || !('IntersectionObserver' in window)) return;
  observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    // Batch all geometry reads before applying classes or styles.
    const entrances = visible.map(entry => {
      const element = entry.target as HTMLElement;
      return { element, effect: entranceFor(element) };
    });
    entrances.forEach(({element, effect}, index) => {
      element.style.setProperty('--animate-duration', '650ms');
      element.style.animationDelay = Math.min(index * 65, 325) + 'ms';
      const onFinished = (event: AnimationEvent) => {
        if (event.target === element) finish(element);
      };
      animated.set(element, onFinished);
      element.addEventListener('animationend', onFinished);
      element.addEventListener('animationcancel', onFinished);
      element.classList.add('animate__animated', effect);
      element.classList.remove('reveal-pending');
      pending.delete(element);
      observer?.unobserve(element);
    });
  }, {threshold: 0, rootMargin: '0px 0px -8% 0px'});
  document.querySelectorAll<HTMLElement>('main section').forEach(section => {
    section.querySelectorAll<HTMLElement>(targets).forEach(element => {
      if (element.parentElement?.closest(boxes)) return;
      // Establish opacity zero before entry: never paint visible text then reset it.
      element.classList.add('reveal-pending');
      pending.add(element);
      observer?.observe(element);
    });
  });
}
initialize();
motion.addEventListener('change', initialize);
