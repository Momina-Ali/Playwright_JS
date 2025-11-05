import { expect } from '@playwright/test';

export class LogoutPage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.locator('#logout2');
    this.loginButton = page.locator('#login2');
  }

  async logout() {
    await this.logoutButton.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyLogoutSuccess() {
    await expect(this.loginButton).toBeVisible();
  }
}


