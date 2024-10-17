const app = require("../app");
const request = require("supertest");
const pool = require("../config/db");

describe("Cart routes", () => {
  let token;
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

  // it("should add item to cart", async () => {
  //   const res = await request(app)
  //     .post("/api/cart/items")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send({
  //       product_id: 1,
  //       quantity: 3,
  //     });
  //   expect(res.statusCode).toEqual(201);
  //   expect(res.body).toHaveProperty("product_id", 1);
  // });

  it("should get the cart", async () => {
    const res = await request(app)
      .get("/api/cart/")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should clear cart", async () => {
    const res = await request(app)
      .delete("/api/cart")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    console.log(res.body);
    
  });

  // it("should update item quantity", async () => {
  //   const res = await request(app)
  //     .put("/api/cart/items/3")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send({ quantity: 10 });
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toHaveProperty("quantity", 10);
  // });

  // it("should remove item from cart", async () => {
  //   const res = await request(app)
  //     .delete("/api/cart/items/3")
  //     .set("Authorization", `Bearer ${token}`);
  //   expect(res.status).toEqual(200);
  //   expect(res.body.removedItem).toHaveProperty("cart_item_id", 3);
  //   expect(res.body.message).toEqual("Item removed from cart");
  // });

  afterAll(() => {
    pool.end();
  });
});
