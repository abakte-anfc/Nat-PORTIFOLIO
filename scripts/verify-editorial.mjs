import { chromium } from 'file:///C:/PALICE/node_modules/@playwright/test/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser = await chromium.launch({headless:true,executablePath:'C:/Users/jvgsl/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe'});
await fs.mkdir('docs/previews',{recursive:true});
const errors=[];
const results=[];
const source=await fs.readFile('src/data/content.ts','utf8');
const content=JSON.parse(source.slice(source.indexOf('{'),source.lastIndexOf('}')+1));
try {
for (const width of [360,390,768,1024,1440]) for (const reducedMotion of ['no-preference','reduce']) {
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4321', {waitUntil:'networkidle'});
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('.theme-grid li').count(),7);
  assert.ok(await page.getByRole('heading',{name:'Sofrimento relacionado ao trabalho',exact:true}).isVisible());
  assert.equal(await page.locator('.steps li').count(),4);
  assert.equal(await page.locator('details').count(),5);
  const text=await page.locator('body').innerText();
  for(const paragraph of [...content.about,...content.audience,...content.therapy,...content.steps.flatMap(s=>[s.title,s.text])]) assert.ok(text.includes(paragraph),'Missing content: '+paragraph);
  for (const a of await page.locator('a[href^="#"]').all()) assert.equal(await page.locator(await a.getAttribute('href')).count(),1);
  for (const a of await page.locator('a[href*="wa.me"]').all()) assert.equal(await a.getAttribute('href'),'https://wa.me/557588634101');
  assert.equal(await page.locator('.polaroid').count(),1);
  assert.ok(!await page.locator('body').innerText().then(t=>/Alice|Gestalt|Belém|a definir|quest\?es/.test(t)));
  assert.ok(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),`overflow ${width}`);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Pular para o conteúdo');
  if(width<=700){
    const menu=page.locator('.menu-toggle');
    await menu.click(); assert.equal(await menu.getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Escape'); assert.equal(await menu.getAttribute('aria-expanded'),'false');
    assert.ok(await menu.evaluate(el=>el===document.activeElement));
    await menu.click(); await page.locator('nav a[href="#sobre"]').click(); assert.equal(await menu.getAttribute('aria-expanded'),'false');
  }
  const flip=page.locator('.flip-button');
  await flip.scrollIntoViewIfNeeded();await page.waitForTimeout(200);
  const before=await flip.getAttribute('aria-pressed');await flip.click();assert.notEqual(await flip.getAttribute('aria-pressed'),before);
  const details=page.locator('details').first();await details.locator('summary').click();assert.ok(await details.getAttribute('open')!==null);
  for(const id of ['inicio','sobre','para-quem','atendimentos','psicoterapia','como-funciona','duvidas','contato']){
    await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(90);
    assert.ok(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),`overflow ${width} ${id}`);
  }
  if([390,1440].includes(width)&&reducedMotion==='no-preference'){
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(100);
    await page.screenshot({path:`docs/previews/hero-${width}.png`});
    await page.locator('#sobre').scrollIntoViewIfNeeded();await page.waitForTimeout(100);
    await page.screenshot({path:`docs/previews/about-${width}.png`});
    await page.locator('#contato').scrollIntoViewIfNeeded();await page.waitForTimeout(100);
    await page.screenshot({path:`docs/previews/contact-${width}.png`});
  }
  results.push({width,reducedMotion,status:'passed'});await page.close();
}
const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:900}});
await nojs.goto('http://127.0.0.1:4321');
assert.ok(await nojs.locator('h1').isVisible());assert.ok(await nojs.locator('nav a').first().isVisible());
assert.equal(await nojs.locator('.chapter-transition:visible').count(),0);
await nojs.locator('summary').first().click();assert.ok(await nojs.locator('details').first().getAttribute('open')!==null);
assert.ok(!await nojs.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await nojs.close();assert.deepEqual(errors,[]);
const motion=await browser.newPage({viewport:{width:1440,height:900}});
await motion.goto('http://127.0.0.1:4321');
const scene=motion.locator('[data-tear-scene]').first();
const y=await scene.evaluate(el=>el.getBoundingClientRect().top+scrollY);
const scrollTo=async top=>{await motion.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),top);await motion.waitForTimeout(100);};
await scrollTo(y);const closed=await scene.evaluate(el=>Number(el.style.getPropertyValue('--open')));
await scrollTo(y+600);const opened=await scene.evaluate(el=>Number(el.style.getPropertyValue('--open')));
assert.ok(opened>closed,'Tear opens with scroll');
await scrollTo(y);const reversed=await scene.evaluate(el=>Number(el.style.getPropertyValue('--open')));assert.ok(reversed<opened,'Tear reverses');
await motion.emulateMedia({reducedMotion:'reduce'});assert.ok(!await scene.isVisible());
await motion.evaluate(()=>document.documentElement.style.zoom='2');
assert.ok(!await motion.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'Overflow at CSS zoom 200%: '+JSON.stringify(await motion.evaluate(()=>[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+2).map(e=>({tag:e.tagName,cls:e.className,right:e.getBoundingClientRect().right})).slice(0,15))));
await motion.close();
await fs.writeFile('docs/previews/results.json',JSON.stringify({results,noJavaScript:'passed',errors},null,2));
console.log(JSON.stringify({results,noJavaScript:'passed',errors},null,2));
} finally { await browser.close(); }
