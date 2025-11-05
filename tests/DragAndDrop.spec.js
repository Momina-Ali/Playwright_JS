import { test, expect } from '@playwright/test';

test('Drag colum A to colum B and verify them', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');



const columnA = page.locator('#column-a');

const columnB = page.locator('#column-b');

console.log(`initial state: column A text was '${await columnA.textContent()}', column B text was '${await columnB.textContent()}'`);

// drag and drop 
await columnA.dragTo(columnB);


// assertion 

await expect(columnA).toHaveText('B');
await expect(columnB).toHaveText('A');

console.log(`Final state: column A text is '${await columnA.textContent()}', column B text is '${await columnB.textContent()}'`);



})