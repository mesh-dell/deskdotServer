const app = require("../app");
const request = require("supertest");
const pool = require("../config/db");

describe("user routes", () => {
  let token;
  beforeAll(async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "password123",
      role: "buyer",
    });
    token = res.body.accessToken;
  });

  it("should get user profile", async () => {
    const res = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "john@example.com");
  });

  it("Should update the profile", async () => {
    const res = await request(app)
      .put("/api/users/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "John",
        last_name: "Updated Fowler",
        email: "john@example.com",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Profile updated succesfully");
  });

  afterAll(() => {
    pool.end();
  });
});
