import { test, expect } from "@playwright/test";
export default class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.nameField = this.page.locator("#signupName");
    this.lastNameField = this.page.locator("#signupLastName");
    this.emailField = this.page.locator("#signupEmail");
    this.passwordField = this.page.locator("#signupPassword");
    this.repeatPasswordField = this.page.locator("#signupRepeatPassword");

    this.loginButton = this.page.locator("button.header_signin");
    this.error = this.page.locator(".invalid-feedback");
    this.registerButton = this.page.locator('button:has-text("Register")');
    this.modalTitle = this.page.locator(".modal-title");
    this.logoutButton = this.page.locator(".icon-logout");
    this.enterEmail = this.page.locator("#signinEmail");
    this.enterPassword = this.page.locator("#signinPassword");
  }

  async navigate() {
    await this.page.goto("/");
  }
  async nameError() {
    await expect(this.nameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }

  async lastNameError() {
    await expect(this.lastNameField).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  }
  async lastNameErrorText() {
    await expect(this.error).toHaveText(
      "Last name has to be from 2 to 20 characters long",
    );
  }

  async nameErrorTextLength() {
    await expect(this.error).toHaveText(
      "Name has to be from 2 to 20 characters long",
    );
  }
  async emailError() {
    await expect(this.emailField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }

  async passwordError() {
    await expect(this.passwordField).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  }

  async passwordErrorText() {
    await expect(this.error).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  }

  async repeatPasswordError() {
    await expect(this.repeatPasswordField).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  }

  async disabledRegButton() {
    await expect(this.registerButton).toBeDisabled();
  }
  async activeRegButton() {
    await expect(this.registerButton).not.toBeDisabled();
  }

  async regModal() {
    await this.page.locator("button.header_signin").click();
    await this.page.locator("button.btn-link:has-text('Registration')").click();
  }

  async deactivate() {
    await this.page.locator(".modal-title:has-text('Registration')").click();
  }

  generateEmail() {
    const uniqueNumber = Date.now();
    return `a+${uniqueNumber}@koma.com`;
  }

  async registration(userPassword) {
    const uniqueEmail = this.generateEmail();

    await this.navigate();

    await this.regModal();
    await this.nameField.fill("John");
    await this.lastNameField.fill("Doe");
    await this.emailField.fill(uniqueEmail);
    await this.passwordField.fill(userPassword);
    await this.repeatPasswordField.fill(userPassword);
    await this.registerButton.click();

    return uniqueEmail;
  }

  async logout() {
    await this.logoutButton.click();
  }
  async logModal() {
    await this.loginButton.click();
  }

  async clickLogin() {
    await this.page.locator("button:has-text('Login')").click();
  }

  async loginViaUI(email, password) {
    await this.navigate();
    await this.logModal();
    await this.enterEmail.fill(email);
    await this.enterPassword.fill(password);
    await this.clickLogin();
  }
}
