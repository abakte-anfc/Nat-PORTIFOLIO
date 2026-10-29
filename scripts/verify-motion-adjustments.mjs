import { chromium } from 'file:///C:/PALICE/node_modules/@playwright/test/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/jvgsl/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe'});
try {
  await fs.mkdir('docs/previews',{recursive:true});
  for(const width of [390,1440]) {
    const page=await browser.newPage({viewport:{width,height:1000}});
    await page.goto('http://127.0.0.1:4321',{waitUntil:'networkidle'});
    const card=page.locator('.postcard');
    const top=await card.evaluate(el=>el.getBoundingClientRect().top+scrollY);
    const scroll=async y=>{await page.evaluate(top=>scrollTo({top,behavior:'instant'}),y);await page.waitForTimeout(120);};
    await scroll(top-400);
    assert.equal(await card.evaluate(el=>Number(el.style.getPropertyValue('--flip'))),0,'Photo stays still at 40% viewport height');
    await scroll(top-200);
    assert.ok(await card.evaluate(el=>Number(el.style.getPropertyValue('--flip')))<.01);
    await scroll(top+250);
    assert.ok(Math.abs(await card.evaluate(el=>Number(el.style.getPropertyValue('--flip')))-.5)<.08,'Photo turns gradually after later start');
    const scene=page.locator('[data-tear-scene]').first();
    const y=await scene.evaluate(el=>el.getBoundingClientRect().top+scrollY);
    for(const progress of [.25,.5,.75]) {
      await scroll(y+progress*await scene.evaluate(el=>el.offsetHeight-innerHeight));
      const reveal=await scene.locator('.tear-underlay').boundingBox();
      assert.ok(reveal.x<=0&&reveal.x+reveal.width>=width,'Revealed paper also covers the full screen');
      for(const sheet of await scene.locator('.tear-sheet').all()) {
        const size=await sheet.evaluate(el=>({width:el.offsetWidth,left:parseFloat(getComputedStyle(el).left)}));
        assert.ok(size.width>=width+Math.max(width,1000)*.85,'Sheets extend beyond screen on both sides');
        assert.ok(size.left<0);
      }
      await page.screenshot({path:`docs/previews/tear-${width}-${progress}.png`});
    }
    assert.ok(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
    await page.close();
  }
  console.log('PASS: later/slower photo turn; oversized sheets at three opening positions on mobile and desktop; no horizontal overflow');
} finally {await browser.close();}
