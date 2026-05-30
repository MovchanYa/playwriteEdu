import { test, expect } from "@playwright/test";
import { youtubeSearch, cySearch } from "../helpers/lesson23/searchQuerys";

test.describe("template spec", () => {
  test("passes", async ({ page }) => {
    await page.goto("/");

    const searchForm = page.locator(".ytSearchboxComponentSearchForm input");
    await searchForm.click();
    await searchForm.fill(youtubeSearch);
    await page.waitForTimeout(500);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);
    await page.locator('[title="Yung Gravy - oops! (Official Video)"]').click();

    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/NIdWvUuEBB0&list=/);
  });

  test("scrollIntoView", async ({ page }) => {
    await page.goto("https://docs.cypress.io/app/get-started/why-cypress");

    await page.waitForTimeout(500);
    await page.getByText("Search ⌘K").click();

    const docsSearch = page.locator('[placeholder="Search docs"]');
    await docsSearch.fill(cySearch);
    await page.waitForTimeout(500);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);

    await page.locator("#Requirements").scrollIntoViewIfNeeded();
  });
});
