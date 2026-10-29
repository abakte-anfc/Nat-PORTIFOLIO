const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const menu = document.querySelector<HTMLElement>('#navigation');
const card = document.querySelector<HTMLElement>('.postcard');
const flip = document.querySelector<HTMLButtonElement>('.flip-button');
let manual = false;
let flipped = false;
if (menuButton) menuButton.hidden = false;
if (flip) flip.hidden = false;
document.documentElement.classList.add('has-motion');
function closeMenu(returnFocus = false) {
  menuButton?.setAttribute('aria-expanded', 'false');
  menu?.classList.remove('open');
  if (returnFocus) menuButton?.focus();
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menu?.classList.toggle('open', open);
});
menu?.addEventListener('click', event => {
  if (event.target instanceof Element && event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
function setFlip(value: boolean) {
  flipped = value;
  card?.classList.toggle('flipped', value);
  card?.querySelector('.postcard-front')?.setAttribute('aria-hidden', String(value));
  card?.querySelector('.postcard-back')?.setAttribute('aria-hidden', String(!value));
  flip?.setAttribute('aria-pressed', String(value));
  if (flip) flip.textContent = value ? '↻ Ver o retrato' : '↻ Vire este cartão';
}
flip?.addEventListener('click', () => {
  manual = true;
  card?.classList.add('manual');
  setFlip(!flipped);
});
const media = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => { const p = clamp(n); return p * p * (3 - 2 * p); };
let frame = 0;
function update() {
  frame = 0;
  const height = innerHeight;
  const reduced = media.matches;
  document.querySelectorAll<HTMLElement>('[data-scene]').forEach(el => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--progress', String(reduced ? .5 : clamp((height - r.top) / (height + r.height))));
  });
  document.querySelectorAll<HTMLElement>('[data-tear-scene]').forEach(el => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--open', String(reduced ? 1 : smooth(-r.top / Math.max(1, r.height - height))));
  });
  if (card && !manual) {
    // Deixa o retrato entrar e permanecer visível antes de iniciar a virada.
    const p = reduced ? 0 : smooth((height * .2 - card.getBoundingClientRect().top) / (height * .9));
    card.style.setProperty('--flip', String(p));
    setFlip(p > .5);
  }
  document.querySelectorAll<HTMLElement>('.polaroids').forEach(el => {
    el.style.setProperty('--spread', String(reduced ? 1 : smooth((height * .95 - el.getBoundingClientRect().top) / (height * .55))));
    el.querySelectorAll<HTMLElement>('.polaroid').forEach(c => c.style.setProperty('--stack-x', (innerWidth > 700 ? el.clientWidth / 2 - c.offsetLeft - c.offsetWidth / 2 : 0) + 'px'));
  });
  const route = document.querySelector<HTMLElement>('.route');
  if (route) route.style.setProperty('--draw', String(reduced ? 1 : clamp((height * .85 - route.getBoundingClientRect().top) / (height * .85))));
}
function tick() { if (!frame) frame = requestAnimationFrame(update); }
addEventListener('scroll', tick, { passive: true });
addEventListener('resize', tick);
media.addEventListener('change', tick);
update();
