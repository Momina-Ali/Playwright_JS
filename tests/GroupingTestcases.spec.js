import { test, expect } from '@playwright/test';
import { timeStamp } from 'console';

const BASE_URL= 'https://www.demoblaze.com/'


//test SCenario 
test.describe('Demoblaze website automation and testcase grouping by hooks', () => {
 
 
 
 
 
    //define Hooks 
test.beforeEach(async ({page}) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');
      await page.locator('#login2').click();
  await page.locator("//input[@id='loginusername']").fill('User222')
  await page.locator('#loginpassword').fill('User222')
 await page.locator("//button[normalize-space()='Log in']").click();

})


test.afterEach(async ({page}) => {
    await page.screenshot({ path: `tests\screenshots/File-name -${timeStamp}.png`})


    console.log('Console is clear now. ')
})


test('Testcase 1', async ({ page }) => {
 
console.log('Testcase 1 select phones ')
await page.locator("(//a[normalize-space()='Phones'])[1]").click()

//assertion here 

});



test('Testcase 2', async ({ page }) => {


await page.locator("(//a[normalize-space()='Laptops'])[1]").click()



});

});

