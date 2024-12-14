# DeskDot Server

The **DeskDot Server** powers the backend of DeskDot, an e-commerce platform connecting stationery sellers and buyers. Built with Node.js and PostgreSQL, it ensures secure, scalable, and efficient operations.

---

## Key Features

- **Authentication**: Role-based token authentication for buyers and sellers.  
- **Product Management**: Add, edit, and manage products.  
- **Order Management**: Handle cart operations and order processing.  

---

## Tech Stack

- **Backend**: Node.js with Express  
- **Database**: PostgreSQL  
- **Testing**: Jest  

---

## Setup

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/mesh-dell/deskdotServer.git
   cd deskdotServer
   ```

2. **Install dependencies**:  
   ```bash
   npm install
   ```

3. **Configure environment variables** in `.env`:
   ```
   DATABASE_URL=
   JWT_SECRET=
   ```

4. **Run the server**:  
   ```bash
   npm start
   ```

5. **Run tests**:  
   ```bash
   npm test
   ```

---

## Key Endpoints

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| POST   | `/auth/buyer/signup`  | Buyer registration  |
| POST   | `/auth/seller/signup` | Seller registration |
| GET    | `/products`           | List products       |
| POST   | `/cart`               | Add to cart         |
| POST   | `/order`              | Place order         |

---
