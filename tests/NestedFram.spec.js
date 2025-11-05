
import { test, expect } from '@playwright/test';

const FRAME_PAGE_URL = 'https://ui.vision/demo/webtest/frames/'; 


test('should interact with an element inside a nested child frame', async ({ page }) => {

    await page.goto(FRAME_PAGE_URL, { waitUntil: 'networkidle' });


    console.log(`go to: ${FRAME_PAGE_URL}`);

    //Got the outer fram and interacted with it.
    const frame3 =  page.frame({ url: /frame_3\.html/ });

    if (!frame3) {
        throw new Error("Could not find Frame 3 by URL match.");
    }
    
    console.log('Successfully located Frame 3.');

  
    const textInputLocator = frame3.locator('input[name="mytext3"]');
    await expect(textInputLocator).toBeVisible({ timeout: 1000 });
    
    const textToType = 'Text entered in Frame 3!';
    await textInputLocator.fill(textToType);

    console.log(`Successfully typed "${textToType}" into the element inside Frame 3.`);

   



    // Got the outer fram and counted child frames in it. 
    const outerFrame1 = page.frame({ url: /frame_3\.html/ });

    if (!outerFrame1) {
        throw new Error("Could not find the Outer Frame (Frame 3) by URL match.");
    }
    
    console.log('Successfully located the Outer Frame (Frame 3).');


    const childFrames = outerFrame1.childFrames();
  console.log(`here are nested frames: ${childFrames.length}`);
   
    const nestedFrame5 = childFrames[0];
    
    console.log(`Outer Frame 3 has ${childFrames.length} child frame. Targeting the Frame 5.`);

  // interact with radio button on the Nested Frame 5
  
    const radioButtonLocator = nestedFrame5.locator('[data-value="Hi, I am the UI.Vision IDE"]')   
   
    await expect(radioButtonLocator).toBeVisible({ timeout: 1000 });
    
    
    await radioButtonLocator.check();

    console.log(`Successfully checked the radio button "Hi, I am the UI.Vision IDE" inside the nested frame5.`);

   
    await page.waitForTimeout(3000);
});
