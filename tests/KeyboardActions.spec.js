import { test, expect } from '@playwright/test';


test('Simulate keyboard actions (Select, Copy, Tab, Paste)', async ({ page }) => {
  
    await page.goto('https://gotranscript.com/text-compare');
     
    const textToCopy = 'Demonstrating Keyboard Actions in playwright';


    const InputTextArea = page.locator('[name="text1"]');


    const OutputTexArea = page.locator('[name="text2"]'); 


    await InputTextArea.fill(textToCopy);

    //await InputTextArea.type('Automaytion testing');

   console.log('Text entered successfully');


   // Ctrl + A

    await page.keyboard.press("Control+A");

// macos Cmd + A
   //  await page.keyboard.press("Meta+A");
console.log(' All Text selected');


   // Ctrl + C

await page.keyboard.press("Control+C");

console.log(' All selected text is copied');



   // Tab

await page.keyboard.press('Tab');

console.log('Now focus is moved to next tab text box');


   // Ctrl + V
await page.keyboard.press("Control+V");


await expect(OutputTexArea).toHaveValue(textToCopy);


console.log('Verified.');



});
