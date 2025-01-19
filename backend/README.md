# ShoppyGlobe E-Commerce Backend

A robust e-commerce backend system built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Product management
- Shopping cart functionality
- MongoDB database integration
- RESTful API architecture

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **JSON Web Tokens (JWT)**

## API Endpoints

### Authentication

#### Register User

**POST** `/auth/register`

```json
Body:
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Login User

**POST** `/auth/login`

```json
Body:
{
  "email": "string",
  "password": "string"
}
```

### Products

#### Get All Products

**GET** `/products`

#### Get Single Product

**GET** `/products/:id`

#### Create Product

**POST** `/products`

```json
Body:
{
  "name": "string",
  "price": "number",
  "description": "string",
  "stockQuantity": "number"
}
```

### Cart (Protected Routes)

#### Add to Cart

**POST** `/cart`

```json
Body:
{
  "productId": "string",
  "quantity": "number"
}
```

#### Update Cart Item

**PUT** `/cart`

```json
Body:
{
  "productId": "string",
  "quantity": "number"
}
```

#### Remove from Cart

**DELETE** `/cart/:productId`

## Data Models

### User

- `name` (String)
- `email` (String, unique)
- `password` (String)

### Product

- `name` (String)
- `price` (Number)
- `description` (String)
- `stockQuantity` (Number)
- `createdAt` (Date)
- `updatedAt` (Date)

### Cart

- `user` (Reference to User)
- `items`
  - `product` (Reference to Product)
  - `quantity` (Number)
- `updatedAt` (Date)

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **404**: Not Found
- **500**: Server Error

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/akanshamore/ShoppyGlobe
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
4. Start the server:

   ```bash
   npm start
   ```

   ### Example .env File

```
MONGO_URI=mongodb://localhost:27017/shoppyglobe
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

---

Developed by Akansha More
