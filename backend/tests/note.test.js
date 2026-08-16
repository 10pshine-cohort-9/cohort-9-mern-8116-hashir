require("dotenv").config({
  path: ".env.test",
});

const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

const userModel = require("../src/models/user.model");
const noteModel = require("../src/models/note.model");

jest.setTimeout(30000);

let token;
let noteId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await request(app).post("/api/auth/register").send({
    username: "testuser",
    email: "test@gmail.com",
    password: "password123",
  });

  const response = await request(app).post("/api/auth/login").send({
    email: "test@gmail.com",
    password: "password123",
  });

  token = response.headers["set-cookie"][0];
});

afterAll(async () => {
  await noteModel.deleteMany({});
  await userModel.deleteMany({
    email: "test@gmail.com",
  });

  await mongoose.connection.close();
});

describe("Note Tests", () => {
  test("Should get user notes", async () => {
    const response = await request(app)
      .get("/api/notes/get-notes")
      .set("Cookie", token);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Should create a note", async () => {
    const response = await request(app)
      .post("/api/notes/create-note")
      .set("Cookie", token)
      .send({
        heading: "Test Note",
        content: "This is a test note",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);

    noteId = response.body.note._id;
  });

  test("Should update a note", async () => {
    const response = await request(app)
      .put(`/api/notes/update-note/${noteId}`)
      .set("Cookie", token)
      .send({
        heading: "Updated Note",
        content: "Updated content",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Should delete a note", async () => {
    const response = await request(app)
      .delete(`/api/notes/delete-note/${noteId}`)
      .set("Cookie", token);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
