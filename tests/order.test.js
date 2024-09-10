const app = require("../app");
const request = require("supertest");
const pool = require("../config/db");

describe("order routes", () => {
  let token;
  let sellerToken;
  it("should login a buyer", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "password123",
      role: "buyer",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("accessToken");
    token = res.body.accessToken;
  });

//   it("should make an order", async () => {
//     const res = await request(app)
//       .post("/api/orders/")
//       .set("Authorization", `Bearer ${token}`);
//     expect(res.statusCode).toEqual(400);
//   });

  it("should get all orders", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.orders).toBeInstanceOf(Array);
  });

  it("should get an order", async () => {
    const res = await request(app)
      .get("/api/orders/2")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.orderItems).toBeInstanceOf(Array);
  });

  it("should login a seller", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "jane@example.com",
      password: "password123",
      role: "seller",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("accessToken");
    sellerToken = res.body.accessToken;    
  });

  it("should change order status", async () => {
    const res = await request(app)
      .put("/api/orders/1/status")
      .set("Authorization", `Bearer ${sellerToken}`)
      .send({
        status: "shipped",
      });
    expect(res.statusCode).toEqual(200);
  });

//   it("should cancel order", async () => {
//     const res = await request(app)
//       .delete("/api/orders/1/cancel")
//       .set("Authorization", `Bearer ${sellerToken}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.cancelledOrder).toHaveProperty("order_id", 1);
//   });

  afterAll(() => {
    pool.end();
  });
});
