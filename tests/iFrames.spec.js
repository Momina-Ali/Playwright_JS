
import { test, expect } from '@playwright/test';


const TEST_URL = 'https://ui.vision/demo/webtest/frames/';

test('Handle Frames/iFrames in Playwright', async ({ page }) => {
    // 1. Launch the application
    await page.goto(TEST_URL);


    // --- Part 1: Finding the total number of frames
    console.log('--- Checking Frame Count ---');
    const allFrames = await page.frames();
    const numberOfFrames = allFrames.length;


    //  this will return the total count, including the main frame.
    console.log(`Number of frames on the page (including main frame): ${numberOfFrames}`);
    // Example assertion
     await expect(numberOfFrames).toBe(7);




    // --- Part 2: Approach 1 - Using page.frame() with URL or Name
    console.log('--- Approach 1: page.frame() with URL ---');


    // Using the actual frame URL from the debug output
    const FRAME_URL = 'https://ui.vision/demo/webtest/frames/frame_1.html';


    // Get the frame object using its URL
    // We use a try/catch here
    try {
        const frameOne = await page.frame({ url: FRAME_URL });


        if (frameOne) {
           
         
            const inputLocator = 'input[name="mytext1"]';
            const valueToFill = 'Hello from Approach One';


            await frameOne.fill(inputLocator, valueToFill);
            console.log(`Successfully f#username-input filled input box in frame via URL: ${valueToFill}`);
        } else {
            console.error(`Frame not found with URL: ${FRAME_URL}`);
        }
    } catch (e) {
        console.error('Error during Approach 1 (page.frame):', e);
    }

await page.waitForTimeout(5000);



console.log('--- Approach 2: page.frameLocator() with Selector ---');


    // Using the actual frame selector and input name from debug output
    const frameSelector = 'frame[src="frame_1.html"]';
    // Using the actual input name inside the frame
    const elementInsideFrameSelector = 'input[name="mytext1"]';
    const valueToFill2 = 'Hello from Approach Two';


    // Get the frame locator, chain it with the locator for the inner element, and perform the action.
    try {
        const inputBoxLocator = page.frameLocator(frameSelector).locator(elementInsideFrameSelector);
       
        // Ensure we await the fill operation
        await inputBoxLocator.fill(valueToFill2);
        console.log(`Successfully filled input box in frame via frameLocator: ${valueToFill2}`);
    } catch (e) {
        console.error('Error during Approach 2 (frameLocator):', e.message);
    }


    await page.waitForTimeout(5000);


   
})