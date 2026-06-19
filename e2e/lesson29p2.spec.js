import { test, expect, playwright } from "@playwright/test";
import regApi from "../helpers/lesson29/garageApi";

let carId;
let reportedAt;
let mileage;
const uniqueDate = Date.now();

test.describe("API", () => {
  test.beforeEach(
    ("base register and create car",
    async ({ page, request }) => {
      const regViaApi = new regApi();
      await regViaApi.regApi(page, request);
      //  await regViaApi.createCar(request);
      const carData = await regViaApi.createCar(request);
      carId = carData.id;
      reportedAt = carData.reportedAt;
      mileage = carData.mileage;
      console.log("reportedAt:", reportedAt);
      // await request.dispose();
    }),
  );

  test("fuel expense less than initial", async ({ request }) => {
    const expenseResponse = await request.post("/api/expenses", {
      data: {
        carId: carId,
        reportedAt: uniqueDate,
        mileage: 1,
        liters: 2,
        totalCost: 2,
        forceMileage: false,
      },
    });

    const expenseJson = await expenseResponse.json();
    console.log("error:", expenseJson);

    expect(expenseJson).toMatchObject({
      message: `First expense mileage must not be less or equal to car initial mileage. Car initial mileage is ${mileage}`,
    });
  });

  test("fuel expense with not enough mileage", async ({ request }) => {
    const expenseResponse = await request.post("/api/expenses", {
      data: {
        carId: carId,
        liters: 1,
        mileage: 1,
        reportedAt: uniqueDate,
        totalCost: 2,
      },
    });

    const expenseJson = await expenseResponse.json();
    console.log("expenses error:", expenseJson);

    expect(expenseJson).toMatchObject({
      message: `First expense mileage must not be less or equal to car initial mileage. Car initial mileage is ${mileage}`,
    });
  });

  test("delete car", async ({ request }) => {
    const deleteCarResponse = await request.delete(`/api/cars/${carId}`);
    expect(deleteCarResponse.ok()).toBeTruthy();
    await request.dispose();
  });
});
