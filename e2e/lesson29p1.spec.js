import { test, expect } from "../helpers/lesson28/userGaragePage";
import RegistrationPage from "../helpers/lesson24/registration";

test.describe("garage with session and fixtures", () => {
  test("garage page displayed", async ({ userGaragePage, page }) => {
    await expect(userGaragePage.addCarButton).toBeVisible();
    await expect(userGaragePage.garageHeader).toBeVisible();
    const regPage = new RegistrationPage(page);
    console.log(
      "user email: ",
      regPage.generateEmail(),
      "user name: ",
      process.env.USER_PASSWORD,
    );

    // page.on("request", (request) => {
    //   if (request.url().includes("/api/users/profile")) {
    //     console.log(
    //       ">>",
    //       request.method(),
    //       request.url(),
    //       "body:",
    //       request.postData(),
    //     );
    //   }
    // });

    // page.on("response", async (response) => {
    //   if (response.url().includes("/users/profile")) {
    //     console.log(
    //       "<<",
    //       response.status(),
    //       response.url(),
    //       "body:",
    //       await response.text(),
    //     );
    //   }
    // });

    // await page.route("**/api/users/profile", (route) => {
    //   const json = {
    //     status: "ok",
    //     data: {
    //       userId: 368873,
    //       photoFilename: "default-user.png",
    //       name: "Sherlock",
    //       lastName: "Holmes",
    //     },
    //   };

    //   route.fulfill({
    //     status: 200,
    //     contentType: "application/json",
    //     body: JSON.stringify(json),
    //   });
    // });

    await page.route("**/api/users/profile", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      json.data.photoFilename = "default-user.png";
      json.data.name = "Sherlock";
      json.data.lastName = "Holmes";

      await route.fulfill({
        response,
        body: JSON.stringify(json),
      });
    });

    await page.goto("/panel/profile");
    await expect(page).toHaveURL("/panel/profile");
    await expect(
      page.locator('.profile_name:has-text("Sherlock Holmes")'),
    ).toBeVisible();
  });

  //   test("add a car", async ({ userGaragePage }) => {
  //     await userGaragePage.addCar();
  //     await expect(userGaragePage.page.locator(".car-list")).toHaveCount(1);
  //   });
});
