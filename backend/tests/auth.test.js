require("dotenv").config({
  path: ".env.test",
});

const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

const userModel = require("../src/models/user.model");
jest.setTimeout(30000);

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await userModel.deleteMany({
    email: "test@gmail.com",
  });

  await mongoose.connection.close();
});

describe("Authentication Tests", () => {
  test("Should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "test@gmail.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(201);

    expect(response.body.message).toBe("User register successfully");
  });

  test("Should login user", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test@gmail.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);

    expect(response.headers["set-cookie"]).toBeDefined();

    token = response.headers["set-cookie"][0];
  });

  test("Should get current user", async () => {
    const response = await request(app)
      .get("/api/auth/get-me")
      .set("Cookie", token);

    expect(response.statusCode).toBe(200);

    expect(response.body.user.email).toBe("test@gmail.com");
  });

  test("Should logout user", async () => {
    const response = await request(app)
      .get("/api/auth/logout")
      .set("Cookie", token);

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe("User logout Successfully");
  });
});
