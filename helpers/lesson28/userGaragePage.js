import { test as base } from "@playwright/test";
import GaragePage from "./GaragePage";

export const test = base.extend({
  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);

    await garagePage.navigate("/panel/garage");
    await garagePage.addCarButton.waitFor({ state: "visible" });
    await use(garagePage);
    await page.context().clearCookies();
  },
});

export { expect } from "@playwright/test";
