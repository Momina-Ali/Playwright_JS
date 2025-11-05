import { test, expect } from '@playwright/test';
import { waitForDebugger } from 'inspector';



//Take screenshot of Homepage ( Viewport)
test('Take screenshot of Homepage', async ({ page }) => {
  await page.goto('https://playwright.dev/' , {waitUntil: 'domcontentloaded'});
  await page.waitForTimeout(2000)
  await page.screenshot({path: 'tests/screenshots/' + Date.now()  + 'Home.png'});
 console.log('1. Screenshot of Home page is taken successfully');

});



// Take screenshot of FullPage.


test('Take screenshot of FullPage', async ({ page }) => {
  await page.goto('https://playwright.dev/' , {waitUntil: 'domcontentloaded'});
  await page.waitForTimeout(2000)
  await page.screenshot({path: 'tests/screenshots/' + Date.now()  + 'FullPage.png', fullPage: true});
 console.log('2. Screenshot of Full page is taken successfully')
});



//Take screenshot of specific element

test('Take screenshot of Specific Element', async ({ page }) => {
  await page.goto('https://playwright.dev/' , {waitUntil: 'domcontentloaded'});
  await page.waitForTimeout(2000)

    const logo = page.locator('.logosSection_gMWS').first();
    await logo.waitFor({state: 'visible', timeout: 2000})

  await logo.screenshot({path: 'tests/screenshots/' + Date.now()  + 'Logo.png', });
 console.log('3. Screenshot of Specific element is taken successfully');
});