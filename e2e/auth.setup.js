import { test as setup } from "@playwright/test";
import RegistrationPage from "../helpers/lesson24/registration"; // Перевірте шлях до вашого POM

const authFile = ".auth/user.json";

setup("base register and login", async ({ page }) => {
  let login = new RegistrationPage(page);

  await login.registration(process.env.USER_PASSWORD);
  await login.logoutButton.waitFor({ state: "visible" });

  await page.context().storageState({ path: authFile });
});
