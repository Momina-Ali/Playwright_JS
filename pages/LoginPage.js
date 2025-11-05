import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginButton = page.locator('#login2');
    this.usernameField = page.locator('#loginusername');
    this.passwordField = page.locator('#loginpassword');
    this.loginModalButton = page.locator('button:has-text("Log in")');
    this.welcomeText = page.locator('#nameofuser');
  }

//define actions 

  async clickLogin() {
    await this.loginButton.click();
    await this.page.waitForTimeout(1000);
  }

  async enterCredentials(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
  }

  async clickLoginSubmit() {
    await this.loginModalButton.click();
    await this.page.waitForTimeout(2000);
  }

  async verifyLoginSuccess(username) {
    await expect(this.welcomeText).toHaveText(`Welcome ${username}`);
  }




  async login(username, password) {
    await this.clickLogin();
    await this.enterCredentials(username, password);
    await this.clickLoginSubmit();
    await this.verifyLoginSuccess(username);
  }
}


