const app = require("../app");
const request = require("supertest");
const pool = require("../config/db");

describe("Product routes", () => {
  let token;

  it("login a seller", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "jane@example.com",
      password: "password123",
      role: "seller",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.user).toHaveProperty("email", "jane@example.com");
    expect(res.body).toHaveProperty("accessToken");
    token = res.body.accessToken;
  });

  it("get all products", async () => {
    const res = await request(app).get("/api/products/");
    expect(res.statusCode).toEqual(200);
    expect(res.body.products).toBeInstanceOf(Array);
  });

  //   it("create a product", async () => {
  //     const res = await request(app)
  //       .post("/api/products")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({
  //         product_name: "A5 notebook",
  //         product_description: "Put it down on paper",
  //         price: 250,
  //         quantity: 25,
  //       });

  //     expect(res.statusCode).toEqual(201);
  //     expect(res.body.product).toBeInstanceOf(Object);
  //     console.log(res.body);

  //   });

  it("should find product by id", async () => {
    const res = await request(app).get("/api/products/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("product_name");
  });

  it("should update product", async () => {
    const res = await request(app)
      .put("/api/products/2")
      .set("Authorization", `Bearer ${token}`)
      .send({
        product_name: "BIC Blue pen",
        product_description: "Best ball point pen",
        price: 13,
        quantity: 50,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.product_id).toBe(2);
  });

  //   it("should delete a product", async () => {
  //     const res = await request(app)
  //       .delete("/api/products/3")
  //       .set("Authorization", `Bearer ${token}`);
  //     expect(res.statusCode).toBe(200);
  //     expect(res.body.product_id).toBe(3);
  //   });

  afterAll(() => {
    pool.end();
  });
});
