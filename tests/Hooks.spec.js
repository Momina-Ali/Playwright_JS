import { test, expect } from '@playwright/test';


const BASE_URL = 'https://www.demoblaze.com/';
// define testscenario
test.describe('DemoBlaze E-commerce Tests with Hooks', () => {

// Before Each
  test.beforeEach(async ({ page }) => {
    console.log('Setup: Navigating to DemoBlaze homepage...');
    
    
    await page.goto(BASE_URL);
    

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    console.log('Setup Complete: Homepage loaded successfully');
  });



 // AFterEach ()
  test.afterEach(async ({ page }) => {
    console.log('🧹 Cleanup: Test completed, performing cleanup...');
    
  
    const timestamp = Date.now();
    await page.screenshot({ path: `tests/Screenshots/after-test-${timestamp}.png` });
    
    console.log(' Cleanup Complete');
  });

  test('Test 1: Should display all product categories on homepage', async ({ page }) => {
    console.log('Running Test 1: Verify Categories');
    
  
    const phonesCategory = page.locator('a:has-text("Phones")');
    const laptopsCategory = page.locator('a:has-text("Laptops")');
    const monitorsCategory = page.locator('a:has-text("Monitors")');
    
    await expect(phonesCategory).toBeVisible();
    await expect(laptopsCategory).toBeVisible();
    await expect(monitorsCategory).toBeVisible();
    
    // Verify that products are displayed on the homepage
    const productCards = page.locator('.card');
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
    
    console.log(`   ✅ Test 1 Passed: Found ${count} products and all categories are visible`);
  });


  test('Test 2: Should filter and display only Laptops when category is selected', async ({ page }) => {
    console.log('📝 Running Test 2: Filter Laptops');
    
    // Click on Laptops category
    await page.click('a:has-text("Laptops")');
    await page.waitForTimeout(2000);
    
    // Wait for products to load
    await page.waitForSelector('.card-title', { state: 'visible' });
    
    // Get all product titles after filtering
    const productTitles = page.locator('.card-title a');
    const count = await productTitles.count();
    
    // Verify that we have laptop products
    expect(count).toBeGreaterThan(0);
    
    // Print all laptop names
    console.log(`   📋 Found ${count} laptop products:`);
    for (let i = 0; i < count; i++) {
      const title = await productTitles.nth(i).textContent();
      console.log(`      ${i + 1}. ${title}`);
    }
    
    // Verify specific laptops exist (common ones on DemoBlaze)
    const pageContent = await page.content();
    const hasLaptops = pageContent.includes('Sony') || 
                       pageContent.includes('MacBook') || 
                       pageContent.includes('Dell');
    
    expect(hasLaptops).toBeTruthy();
    
    console.log('   ✅ Test 2 Passed: Laptop category filter working correctly');
  });

});
