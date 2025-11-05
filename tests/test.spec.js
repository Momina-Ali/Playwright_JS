// Playwright with JavaScript - Date Picker Handling Demo
// Based on the tutorial demonstrating navigation and selection of a date in a dynamic calendar.

import { test, expect } from '@playwright/test';

// Define the test block
test('Handle Date Picker by Navigation and Selection', async ({ page }) => {
    // --- Configuration ---
    // Define the date components you wish to select.
    // Ensure the month matches the text exactly (e.g., 'March', 'April', 'July')
    const targetYear = '2025';
    const targetMonth = 'October';
    const targetDate = '10'; 

    const URL = 'https://testautomationpractice.blogspot.com/';

    // Navigate to the target application with increased timeout
    await page.goto(URL, { timeout: 60000 });

    // ----------------------------------------------------
    // OPTIONAL: Simple Direct Fill Method (If allowed by the date input)
    // This is the simplest approach if the field supports direct date entry.
    // await page.fill('#datepicker', '03/15/2024'); 
    // console.log('Date filled directly.');
    // await page.waitForTimeout(3000); 
    // ----------------------------------------------------

    // --- 1. Open the Calendar ---
    console.log(`Attempting to select: ${targetMonth} ${targetDate}, ${targetYear}`);
    await page.locator('#datepicker').click(); // Click to display the date picker
    
    // Wait for the datepicker to be visible
    await page.waitForSelector('.ui-datepicker', { timeout: 10000 });

    // --- 2. Navigate to the Target Month/Year using a While Loop ---
    // This loop continues to click 'Next' until the desired month and year are displayed.
    while (true) {
        // Capture the current month and year displayed on the calendar header
        const currentYear = await page.locator('.ui-datepicker-year').textContent();
        const currentMonth = await page.locator('.ui-datepicker-month').textContent();
        
        // Check if the current display matches the expected target
        if (currentYear === targetYear && currentMonth === targetMonth) {
            console.log(`Found target month/year: ${currentMonth} ${currentYear}. Breaking loop.`);
            break; // Exit the loop when the match is found
        } else {
            // If not matched, click the 'Next' button to advance one month
            // To select a date in the past, you would change this locator to 'a[title="Prev"]'
            await page.locator('a[title="Next"]').click(); 
        }
    }

    // --- 3. Select the Target Date (Day) ---
    // Wait for the calendar to be fully loaded
    await page.waitForSelector('.ui-datepicker-calendar', { timeout: 10000 });
    
    // Debug: Log all available dates
    const availableDates = await page.locator('.ui-datepicker-calendar a').allTextContents();
    console.log(`Available dates: ${availableDates.join(', ')}`);
    
    // Try multiple locator strategies for better reliability
    let dateSelected = false;
    
    // Strategy 1: Original XPath
    try {
        await page.click(`//a[@class='ui-state-default' and text()='${targetDate}']`, { timeout: 5000 });
        dateSelected = true;
        console.log(`Date selected using Strategy 1 (XPath)`);
    } catch (error) {
        console.log(`Strategy 1 failed: ${error.message}`);
    }
    
    // Strategy 2: CSS selector with text content
    if (!dateSelected) {
        try {
            await page.locator('.ui-datepicker-calendar a').filter({ hasText: targetDate }).first().click({ timeout: 5000 });
            dateSelected = true;
            console.log(`Date selected using Strategy 2 (CSS + text filter)`);
        } catch (error) {
            console.log(`Strategy 2 failed: ${error.message}`);
        }
    }
    
    // Strategy 3: More flexible XPath
    if (!dateSelected) {
        try {
            await page.click(`//td[@data-handler='selectDay']//a[text()='${targetDate}']`, { timeout: 5000 });
            dateSelected = true;
            console.log(`Date selected using Strategy 3 (flexible XPath)`);
        } catch (error) {
            console.log(`Strategy 3 failed: ${error.message}`);
        }
    }
    
    // Strategy 4: General approach - find any clickable element with the target date
    if (!dateSelected) {
        try {
            await page.locator(`text=${targetDate}`).first().click({ timeout: 5000 });
            dateSelected = true;
            console.log(`Date selected using Strategy 4 (text locator)`);
        } catch (error) {
            console.log(`Strategy 4 failed: ${error.message}`);
        }
    }
    
    if (!dateSelected) {
        throw new Error(`Failed to select date ${targetDate} using all strategies`);
    }

    console.log(`Date selected successfully.`);

    // Wait a few seconds to visually confirm the result in the input box
    await page.waitForTimeout(5000); 

    // Optional: Assertion to confirm the date was entered correctly
    const selectedDate = await page.locator('#datepicker').inputValue();
    // Note: The date format might be M/D/YYYY or MM/DD/YYYY depending on browser/locale.
    console.log(`Value in input field: ${selectedDate}`);
    
    // Simple verification check 
    // The actual format inserted by the datepicker may vary, but we expect the year to be correct.
    expect(selectedDate).toContain(targetYear);
});
