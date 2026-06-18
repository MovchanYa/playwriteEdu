import { test, expect } from "@playwright/test";
import BasePage from "../BasePage";

export default class GaragePage extends BasePage {
  constructor(page) {
    super(page);
  }

  get addCarButton() {
    return this.page.locator('button:has-text("Add car")');
  }

  get garageHeader() {
    return this.page.locator('h1:has-text("Garage")');
  }

  get addCarButton() {
    return this.page.locator('button:has-text("Add car")');
  }

  get garageHeader() {
    return this.page.locator("h1", { hasText: "Garage" });
  }

  get brandSelect() {
    return this.page.locator("#addCarBrand");
  }

  get modelSelect() {
    return this.page.locator("#addCarModel");
  }

  get mileageInput() {
    return this.page.locator("#addCarMileage");
  }

  get errorMessage() {
    return this.page.locator(".invalid-feedback");
  }

  get submitCarButton() {
    return this.page.locator('.modal-footer button:has-text("Add")');
  }

  get expenseMileageInput() {
    return this.page.locator("#addExpenseMileage");
  }

  get litersInput() {
    return this.page.locator("#addExpenseLiters");
  }

  get costInput() {
    return this.page.locator("#addExpenseTotalCost");
  }

  async openFuelExpenseForCar(carName) {
    const carItem = this.page.locator(".car-item", { hasText: carName });
    await carItem.locator(".car_add-expense").click();
  }

  async deactivate() {
    await this.page.locator(".modal-title:has-text('Add a car')").click();
  }
  async submitExpense() {
    await this.page.locator('.modal-footer button:has-text("Add")').click();
  }

  async addCar() {
    await this.addCarButton.click();
    await this.brandSelect.selectOption({ index: 1 });
    await this.modelSelect.selectOption({ index: 1 });

    await this.mileageInput.fill("1");
    await this.mileageInput.clear();
    await this.deactivate();
    await expect(this.errorMessage).toHaveText("Mileage cost required");

    await this.mileageInput.fill("200");
    await this.submitCarButton.click();
  }
}
