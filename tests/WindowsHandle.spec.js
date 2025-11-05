import { test, expect, chromium} from '@playwright/test';

test('Window Handles independently', async () => {
 const  browser = await chromium.launch()
 const contex = await browser.newContext()


 const page1 = await contex.newPage()
 const page2 = await contex.newPage()

const allPages=contex.pages();
console.log('No of pages:' , allPages.length);

 await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
 await expect(page1).toHaveTitle("OrangeHRM");

await page2.goto("https://www.orangehrm.com/");
await expect(page2).toHaveTitle('Human Resources Management Software | HRMS | OrangeHRM');


});

test.only('Window Handles by clicking link', async ({page}) => {


 await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
 await expect(page).toHaveTitle("OrangeHRM");

 const newPagePromise = page.context().waitForEvent('page');

 const linkLocator =page.locator("//a[normalize-space()='OrangeHRM, Inc']");
 linkLocator.click();


 const newPage = await newPagePromise;
await expect(newPage).toHaveTitle('Human Resources Management Software | HRMS | OrangeHRM')

await page.waitForTimeout(5000)

});