

import { test, expect } from '@playwright/test';

test('Handle Date Picker by Navigation and Selection', async ({ page }) => {

    const targetYear = '2025';
    const targetMonth = 'October';
    const targetDate = '15'; 

    const URL = 'https://testautomationpractice.blogspot.com/';


    await page.goto(URL, { timeout: 60000 });



   // await page.fill('#datepicker', 10/15/2025);

    //console.log('Current date is selected');


    //Approach 1. 

    console.log   (`Attempting to select date:  ${targetMonth} ${targetDate}, ${targetYear}`) 


    
    await page.locator("#datepicker").click()


    await page.waitForSelector('.ui-datepicker', {timeout: 10000});




    while(true){

    const CurrentYear = await page.locator('.ui-datepicker-year').textContent();
    const CurrentMonth = await page.locator('.ui-datepicker-month').textContent();


    if ( CurrentYear === targetYear &&   CurrentMonth === targetMonth ) {
        console.log( `Found the targeted date: ${CurrentMonth} ${CurrentYear}`)
               break;
            } else
// select next
                await page.locator('a[title="Next"]').click()
               // await page.locator('a[title="Prev""]').click() //previous value selected 

    }



// print whole month dates 



    await page.waitForSelector('.ui-datepicker-calendar', {timeout: 10000});
      const availabledates = await page.locator('.ui-datepicker-calendar a').allTextContents()

      console.log(`Available dates:     ${availabledates.join(',   ')}`);

// select specific date

let selectedDate = false;


try{
//select date by xpath 
await page.click(`//a[@class="ui-state-default"  and text()='${targetDate}']`, {timeout: 30000} ) 
dateSelected = true; 
console.log('date selected using X path')
} catch (error){
    console.log('Xpath Strategy failed.')
}

//css selector 






//






});
