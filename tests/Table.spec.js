import { test, expect } from '@playwright/test';

test('Handle Table and pagination', async ({ page }) => {




 await page.goto('https://testautomationpractice.blogspot.com/');

 // Select table data by ID 
 const table = await page.locator('#productTable');


    // //1) total number of rows & columns
    const columns = await table.locator('thead tr th');
    const rows = await table.locator('tbody tr');


    //console.log('Number of columns:', await columns.count());
    //console.log('Number of rows:', await rows.count());


    // Assert the expected counts
    // expect(await columns.count()).toBe(4);
    // expect(await rows.count()).toBe(5);



    
      //2) check box for product 4 (Direct selection method)
    // const matchedRow = rows.filter({
    //     has: page.locator('td'),
    //     hasText: 'Smartwatch',
    // })
    // await matchedRow.locator('input').check()



        // //3) select multiple products by re-usable function ( Make funcytion)
    await selectProduct(rows, page, 'Smartphone');
    await selectProduct(rows, page, 'Tablet');
    await selectProduct(rows, page, 'Wireless Earbuds');
    



    // Wait to visually confirm selection
    await page.waitForTimeout(5000);










    // //4) print all product details using loop (Single page only )
    console.log('\n=== Product Details (Single Page) ===');
    for (let i = 0; i < await rows.count(); i++) {
        const row = rows.nth(i);
        const tds = row.locator('td');
       
        console.log(`\n--- Product ${i + 1} ---`);
        // Loop through columns (tds), excluding the last one which is the checkbox (-1)
        for (let j = 0; j < await tds.count() - 1; j++) {
            const columnHeaders = ['ID', 'Name', 'Price'];
            const cellText = await tds.nth(j).textContent();
            console.log(`${columnHeaders[j]}: ${cellText}`);
        }
    }




     //5) read data from all the pages in the table (The final, most comprehensive step)
    const pages = page.locator('.pagination li a');
    const pageCount = await pages.count();
    console.log('\n=== Reading Data from All Pages ===');
    console.log('Number of pages in the table:', pageCount);


    // Check if pagination exists
    if (pageCount > 0) {
        // Outer loop for iterating through all pagination links
        for (let p = 0; p < pageCount; p++) {
            console.log(`\n--- Page ${p + 1} Data ---`);
           
            // Click the page link only if it's not the first page (p > 0)
            if (p > 0) {
                await pages.nth(p).click();
                // Wait briefly after navigating to a new page
                await page.waitForTimeout(2000);
            }


            // Re-get rows after potential page navigation
            const currentRows = page.locator('#productTable tbody tr');
            const currentRowCount = await currentRows.count();
           
            // Inner loops to read data from the current page
            for (let i = 0; i < currentRowCount; i++) {
                const row = currentRows.nth(i);
                const tds = row.locator('td');
               
                console.log(`\nProduct ${i + 1}:`);
                // Loop through columns (tds), excluding the last one which is the checkbox (-1)
                const columnHeaders = ['ID', 'Name', 'Price'];
                for (let j = 0; j < await tds.count() - 1; j++) {
                    const cellText = await tds.nth(j).textContent();
                    console.log(`  ${columnHeaders[j]}: ${cellText}`);
                }
            }
        }
    } else {
        console.log('No pagination found - displaying single page data:');
        // If no pagination, just display current page data
        for (let i = 0; i < await rows.count(); i++) {
            const row = rows.nth(i);
            const tds = row.locator('td');
           
            console.log(`\nProduct ${i + 1}:`);
            const columnHeaders = ['ID', 'Name', 'Price'];
            for (let j = 0; j < await tds.count() - 1; j++) {
                const cellText = await tds.nth(j).textContent();
                console.log(`  ${columnHeaders[j]}: ${cellText}`);
            }
        }
    }


    // Final wait to keep the browser open after reading all data
    await page.waitForTimeout(5000);
});






async function selectProduct(rows, page, name) {
    // 1. Filter all rows to find the one matching the product name
    const matchedRow = rows.filter({
        has: page.locator('td'),
        hasText: name,
    })


    // 2. Locate the input (checkbox) within the matched row and check it
    await matchedRow.locator('input').check()
}


