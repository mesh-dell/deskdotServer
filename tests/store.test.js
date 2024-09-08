const app = require("../app");
const request = require("supertest");
const pool = require("../config/db");

describe("Store routes", () => {
  let token;

  it("should get all stores", async () => {
    const res = await request(app).get("/api/stores");
    expect(res.statusCode).toEqual(200);
    expect(res.body.stores).toBeInstanceOf(Array);
  });

  it("Get a single store by id", async () => {
    const res = await request(app).get("/api/stores/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.seller_id).toBe(1);
  });

  it("Get all products in a store", async () => {
    const res = await request(app).get("/api/stores/1/products");
    expect(res.statusCode).toEqual(200);
    expect(res.body.products).toBeInstanceOf(Array);
  });

  it("should login a selller", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "jane@example.com",
      password: "password123",
      role: "seller"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.user).toHaveProperty("email", "jane@example.com");
    expect(res.body).toHaveProperty("accessToken");
    token = res.body.accessToken;
  });

  it("Get all order made to a seller", async () => {
    const res = await request(app)
      .get("/api/stores/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);    
  });

  afterAll(() => {
    pool.end();
  });
});
