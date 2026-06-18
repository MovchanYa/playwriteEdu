import { test, expect } from "../helpers/lesson28/userGaragePage";

test.describe("garage with session and fixtures", () => {
  test("garage page displayed", async ({ userGaragePage }) => {
    await expect(userGaragePage.addCarButton).toBeVisible();
    await expect(userGaragePage.garageHeader).toBeVisible();
  });

  test("add a car", async ({ userGaragePage }) => {
    await userGaragePage.addCar();
    await expect(userGaragePage.page.locator(".car-list")).toHaveCount(1);
  });
});
