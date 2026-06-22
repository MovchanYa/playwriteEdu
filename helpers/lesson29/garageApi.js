import { test, expect } from "@playwright/test";
import BasePage from "../BasePage";

export default class regApi extends BasePage {
  constructor(page) {
    super(page);
  }

  generateEmail() {
    const uniqueNumber = Date.now();
    return `a+${uniqueNumber}@koma.com`;
  }

  async regApi(page, request) {
    const signupResponse = await request.post("/api/auth/signup", {
      data: {
        name: "John",
        lastName: "Dou",
        email: this.generateEmail(),
        password: process.env.USER_PASSWORD,
        repeatPassword: process.env.USER_PASSWORD,
      },
    });

    expect(signupResponse.ok()).toBeTruthy();
    const signupJson = await signupResponse.json();
    console.log("user:", signupJson);
  }

  async createCar(request) {
    const createCarResponse = await request.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122,
      },
    });

    const carJson = await createCarResponse.json();

    // console.log("car:", carJson);

    expect(carJson.data).toMatchObject({
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    });
    return carJson.data;
  }
}
