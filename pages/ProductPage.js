import { expect } from '@playwright/test';

export class ProductPage {
  constructor(page) {
    this.page = page;
    this.laptopsCategory = page.locator('a:has-text("Laptops")');
    this.addToCartButton = page.locator('a:has-text("Add to cart")');
    this.cartLink = page.locator('#cartur');
  }

  async selectLaptopsCategory() {
    await this.laptopsCategory.click();
    await this.page.waitForTimeout(2000);
  }

  async selectProduct(productName) {
    await this.page.click(`a:has-text("${productName}")`);
    await this.page.waitForTimeout(1000);
  }

  async addToCart() {
    // Setup listener for alert before clicking
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.addToCartButton.click();
    
    // Handle the alert
    const dialog = await dialogPromise;
    expect(dialog.message()).toBe('Product added.');
    await dialog.accept();
  }

  async goToCart() {
    await this.cartLink.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyProductInCart(productName) {
    const cartRow = this.page.locator(`tbody tr:has-text("${productName}")`).first();
    await expect(cartRow).toBeVisible();
  }
}

