import { test, expect } from "@playwright/test";
import RegistrationPage from "../helpers/lesson24/registration";

const longValue = "a".repeat(21);
let uniqueEmail;

test.describe("name fields", () => {
  let reg;
  test.beforeEach(async ({ page }) => {
    reg = new RegistrationPage(page);
    await reg.navigate();
    await reg.regModal();
  });

  test("emptyNameField", async ({ page }) => {
    await reg.nameField.fill("A");
    await reg.nameField.clear();
    await reg.deactivate();
    await reg.nameError();
    await expect(reg.error).toHaveText("Name required");
    await expect(reg.registerButton).toBeDisabled();
  });

  test("wrongNameLengthBelow", async ({ page }) => {
    await reg.nameField.fill("a");
    await reg.deactivate();

    await expect(reg.error).toHaveText(
      "Name has to be from 2 to 20 characters long",
    );
    await reg.nameError();
  });

  test("wrongData", async ({ page }) => {
    await reg.lastNameField.fill("!!");
    await reg.deactivate();
    await expect(reg.error).toHaveText("Last name is invalid");
    await reg.lastNameError();
    await reg.disabledRegButton();
  });

  test("wrongLengthBelow", async ({ page }) => {
    await reg.lastNameField.fill("a");
    await reg.deactivate();
    await reg.lastNameErrorText();
    await reg.disabledRegButton();
  });

  test("wrongLengthAbove", async ({ page }) => {
    await reg.lastNameField.fill(`${longValue}`);
    await reg.deactivate();
    await reg.lastNameErrorText();
    await reg.disabledRegButton();
  });

  test("redLastNameBorder", async ({ page }) => {
    await reg.lastNameField.fill("a");
    await reg.deactivate();
    await reg.lastNameErrorText();
    await reg.lastNameError();
    await reg.disabledRegButton();
  });
});
test.describe("email fields", () => {
  let reg;
  test.beforeEach(async ({ page }) => {
    reg = new RegistrationPage(page);
    await reg.navigate();
    await reg.regModal();
  });
  test("emptyEmailField", async ({ page }) => {
    await reg.emailField.fill("A");
    await reg.emailField.clear();
    await reg.deactivate();
    await reg.emailError();
    await reg.disabledRegButton();
  });

  test("wrongEmailData", async ({ page }) => {
    await reg.emailField.fill("!!");
    await reg.deactivate();
    await reg.emailError();
    await reg.disabledRegButton();
  });

  test("redEmailBorder", async ({ page }) => {
    await reg.emailField.fill("a");
    await reg.deactivate();
    await reg.emailError();
    await reg.disabledRegButton();
  });
});

test.describe("pass fields", () => {
  let reg;
  test.beforeEach(async ({ page }) => {
    reg = new RegistrationPage(page);
    await reg.navigate();
    await reg.regModal();
  });
  test("emptyPassField", async ({ page }) => {
    await reg.passwordField.fill("A");
    await reg.passwordField.clear();
    await reg.deactivate();
    await reg.passwordError();
    await reg.disabledRegButton();
  });

  test("wrongPassData", async ({ page }) => {
    await reg.passwordField.fill("!!");
    await reg.deactivate();
    await reg.passwordErrorText();
    await reg.disabledRegButton();
  });

  test("redPassBorder", async ({ page }) => {
    await reg.passwordField.fill("a");
    await reg.deactivate();
    await reg.passwordError();
    await reg.disabledRegButton();
  });

  test("wrongDataTooLong", async ({ page }) => {
    await reg.passwordField.fill("Password123456789");
    await reg.deactivate();
    await reg.passwordErrorText();
    await reg.disabledRegButton();
  });

  test("wrongDataNoCapital", async ({ page }) => {
    await reg.passwordField.fill("password123");
    await reg.deactivate();
    await reg.passwordErrorText();
    await reg.disabledRegButton();
  });

  test("wrongDataNoInteger", async ({ page }) => {
    await reg.passwordField.fill("Password");
    await reg.deactivate();
    await reg.passwordErrorText();
    await reg.disabledRegButton();
  });

  test("rePassEmpty", async ({ page }) => {
    await reg.repeatPasswordField.fill("A");
    await reg.repeatPasswordField.clear();
    await reg.deactivate();
    await expect(reg.error).toHaveText("Re-enter password required");
    await reg.disabledRegButton();
  });

  test("passwordsDoNotMatch", async ({ page }) => {
    await reg.passwordField.fill("Password123");
    await reg.repeatPasswordField.fill("Password456");
    await reg.deactivate();
    await expect(reg.error).toHaveText("Passwords do not match");
    await reg.disabledRegButton();
  });

  test("redRepeatPasswordBorder", async ({ page }) => {
    await reg.repeatPasswordField.fill("a");
    await reg.deactivate();
    await reg.repeatPasswordError();
    await reg.disabledRegButton();
  });

  test("rePassTooLong", async ({ page }) => {
    await reg.repeatPasswordField.fill("Password123456789");
    await reg.deactivate();
    await reg.repeatPasswordError();
    await reg.disabledRegButton();
  });

  test("rePassNoCapital", async ({ page }) => {
    await reg.repeatPasswordField.fill("password123");
    await reg.deactivate();
    await reg.repeatPasswordError();
    await reg.disabledRegButton();
  });

  test("rePassNoInteger", async ({ page }) => {
    await reg.repeatPasswordField.fill("Password");
    await reg.deactivate();
    await reg.repeatPasswordError();
    await reg.disabledRegButton();
  });
});

test.describe("registration", () => {
  let reg;
  test.beforeEach(async ({ page }) => {
    reg = new RegistrationPage(page);
    await reg.navigate();
    await reg.regModal();
  });
  test("should register and login successfully", async ({ page }) => {
    const password = "Password123";

    uniqueEmail = await reg.registration(password);
    await expect(page).toHaveURL(/garage/);

    await reg.logout();
    await expect(page).toHaveURL("https://qauto.forstudy.space");
    await reg.loginViaUI(uniqueEmail, password);
    await expect(page).toHaveURL(/garage/);
  });
});
