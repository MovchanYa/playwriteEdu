import { test, expect } from "@playwright/test";
import BasePage from "../BasePage";

export default class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
  }

  get nameField() {
    return this.page.locator("#signupName");
  }

  get lastNameField() {
    return this.page.locator("#signupLastName");
  }

  get emailField() {
    return this.page.locator("#signupEmail");
  }

  get passwordField() {
    return this.page.locator("#signupPassword");
  }

  get repeatPasswordField() {
    return this.page.locator("#signupRepeatPassword");
  }

  get loginButton() {
    return this.page.locator("button.header_signin");
  }

  get error() {
    return this.page.locator(".invalid-feedback");
  }

  get registerButton() {
    return this.page.locator('.modal-footer button:has-text("Register")');
  }

  get loginFormButton() {
    return this.page.locator('button:has-text("Login")');
  }

  get logoutButton() {
    return this.page.locator(".icon-logout");
  }

  get emailInField() {
    return this.page.locator("#signinEmail");
  }

  get passwordInField() {
    return this.page.locator("#signinPassword");
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
    await this.activeRegButton();
    await this.registerButton.click();

    return uniqueEmail;
  }

  async logout() {
    await this.logoutButton.click();
  }
  async logModal() {
    await this.loginButton.click();
  }

  async loginViaUI(email, password) {
    await this.navigate();
    await this.logModal();
    await this.emailInField.fill(email);
    await this.passwordInField.fill(password);
    await this.loginFormButton.click();
  }
}
