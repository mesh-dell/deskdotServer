const { refreshToken } = require("../controllers/authController");
const app = require("../server");
const request = require("supertest");

describe("Auth routes", () => {
  it("should register new buyer", async () => {
    const res = await request(app).post("/api/auth/register").send({
      first_name: "John",
      last_name: "Doe",
      password: "password123",
      email: "john@example.com",
      role: "buyer",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty("email", "john@example.com");
  });

  it("should login a registered buyer", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "password123",
      role: "buyer",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("accessToken");
  });

  it("should not login with incorrect credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "wrongPassword",
      role: "buyer",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Invalid credentials");
  });

  it("should logout a registered user", async () => {
    const res = await request(app)
      .post("/api/auth/logout")
      .send({
        refreshToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I
                       mlkIjoxfSwiaWF0IjoxNzI1NjYzMjYxLCJleHAiOjE3MjYyNjgwNjF9.XJGssL95CvuINyKjvy2-Gjyo4qbAsxfC9SgEIxK3UaQ`,
        role: "buyer",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Logged out successfully");
  });
});
