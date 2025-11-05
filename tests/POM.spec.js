import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { LogoutPage } from '../pages/LogoutPage.js';

// Test credentials
const TEST_USERNAME = 'User222';
const TEST_PASSWORD = 'User222';

test.describe('DemoBlaze E-commerce with POM', () => {

  test('Complete Flow: Login → Add Product to Cart → Logout', async ({ page }) => {
    // Navigate to DemoBlaze
    await page.goto('https://www.demoblaze.com/');
    await page.waitForLoadState('domcontentloaded');
    
    // Initialize Page Objects
    const loginPage = new LoginPage(page);

   const productPage = new ProductPage(page);
   
    const logoutPage = new LogoutPage(page);




    // Step 1: Login
    console.log('📝 Step 1: Logging in...');


    await loginPage.login(TEST_USERNAME, TEST_PASSWORD);
    console.log('✅ Login successful');















    // Step 2: Select Laptops Category
    console.log('📝 Step 2: Selecting Laptops category...');
    
    await productPage.selectLaptopsCategory();
    console.log('✅ Laptops category selected');

    // Step 3: Select a Product (Sony vaio i5)
    console.log('📝 Step 3: Selecting product...');
    const productName = 'Sony vaio i5';
    await productPage.selectProduct(productName);
    console.log(`✅ Product "${productName}" selected`);

    // Step 4: Add to Cart
    console.log('📝 Step 4: Adding product to cart...');
    await productPage.addToCart();
    console.log('✅ Product added to cart');

    // Step 5: Go to Cart and Verify
    console.log('📝 Step 5: Verifying product in cart...');
    await productPage.goToCart();
    await productPage.verifyProductInCart(productName);
    console.log('✅ Product verified in cart');

    // Step 6: Logout
    console.log('📝 Step 6: Logging out...');
    await logoutPage.logout();
    await logoutPage.verifyLogoutSuccess();
    console.log('✅ Logout successful');

    console.log('🎉 Test completed successfully!');
  });

});

