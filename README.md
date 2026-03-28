## ShoppyGlobe App (React + Node.js + MongoDB)

A full-stack online shopping web application built with **React**, **Node.js**, **Express**, and **MongoDB**.  
Users can browse items, search items, view detailed information, add selected item to the cart and view checkout section to place the final order. The application features a RESTful API backend with JWT authentication and MVC architecture.

### Github Link : [Visit GitHub](https://github.com/devAsh2/shoppyGlobe)

### 1. Getting started

#### **Prerequisites**

- **Node.js** (recommended LTS version)
- **npm** (comes with Node)
- **MongoDB** (local installation or MongoDB Atlas)

#### **Install dependencies**

**Frontend (from root folder):**
```bash
npm install
```

**Backend (from NodeJs folder):**
```bash
cd NodeJs
npm install
```

#### **Run the development servers**

**Step 1: Start MongoDB**
```bash
# For local MongoDB installation
mongod
```

**Step 2: Start Backend Server**
```bash
cd NodeJs
npm start
```
Backend runs on `http://localhost:8002`

**Step 3: Start Frontend Server**
```bash
# From root folder
npm run dev
```
Frontend runs on `http://localhost:5173`

### 2. Project overview

This project simulates an online shopping app where users can:

- **Browse a list of products** as cards (managed via Redux state).
- **Search products by title/category/brand** using dynamic routes like `/books/:category`.
- **View products details** on a dedicated page, including cover samples, title, description, price, rating and a button to add the cart.
- **View Cart and Checkout** After adding the product to the cart, user can view the Cart page where he can increase/decrease the item quantity and can also remove the items. Then he can navigate to checkout page, where a dedicated form fetches the user details along with giving an order summary and finally can place the order (all managed via Redux state).
- **Navigate with routing**: Home, Cart, Checkout, and product Details.
- **Error handling**: Any wrong routes will be handed gracefully using reacter-router-dom. User can go back to Home page using Back link.

**Current Architecture Note:** The frontend operates independently with Redux Toolkit managing all state (products, cart). The backend API is a separate service that can be tested independently using API clients.

### 2.1 Backend API Documentation

**Important Note:** The frontend currently uses Redux Toolkit for state management and does not directly connect to the backend API. The backend API is standalone and can only be accessed using external API clients like Postman, Thunder Client, curl, or other API testing tools.

The backend provides a RESTful API with JWT authentication. The server runs on `http://localhost:8002`.

#### **API Testing with Postman/Thunder Client**

**Base URL:** `http://localhost:8002`

**Authentication:** Most endpoints require JWT token (except register/login)

**Setup Instructions:**
1. **Register a new user:**
   - Method: POST
   - URL: `http://localhost:8002/api/register`
   - Body (JSON):
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "password123"
     }
     ```

2. **Login to get JWT token:**
   - Method: POST
   - URL: `http://localhost:8002/api/login`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```

3. **Use the token for protected endpoints:**
   - Copy the `token` from login response
   - In Postman/Thunder Client, add Authorization header:
     - Key: `Authorization`
     - Value: `Bearer <your-jwt-token>`

#### **API Endpoints**

**Authentication Endpoints:**
- `POST /api/register` - Register new user
- `POST /api/login` - Login user and return JWT token

**Product Endpoints:**
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

**Cart Endpoints (Protected):**
- `GET /api/cart` - Get all cart items for authenticated user
- `POST /api/cart` - Add product to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

#### **Example API Calls**

**Get All Products:**
```bash
curl -X GET http://localhost:8002/api/products
```

**Add Product to Cart (with token):**
```bash
curl -X POST http://localhost:8002/api/cart \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId": "product_id", "quantity": 2}'
```

### 3. Tech stack

#### **Frontend**
- **React** – UI components and application logic.
- **Vite** – fast dev server and build tool.
- **React Router DOM** – client-side routing (`createBrowserRouter`, nested routes, dynamic params).
- **Redux Toolkit** – state management for:
  - `product` list (product catalog)
  - `cart` items (for add-to-cart behavior in details page)
- **CSS** – custom styles in `CssFrComponents` folder. Contains Header Css file for Header component and Shop Css file which applies to the whole app components.

#### **Backend**
- **Node.js** – JavaScript runtime environment
- **Express.js** – Web framework for building RESTful APIs
- **MongoDB** – NoSQL database for data storage
- **Mongoose** – Object Data Modeling (ODM) library for MongoDB
- **JWT (JSON Web Tokens)** – Authentication and authorization
- **bcryptjs** – Password hashing
- **dotenv** – Environment variable management

#### **Development Tools**
- **nodemon** – Auto-restart development server
- **ESLint** – Code linting and formatting

### 4. Project structure (MVC Architecture)

```text
shoppyGlobe/

  src/                           # Frontend source code
    main.jsx                     # Entry point, sets up RouterProvider and routes
    App.jsx                      # Main layout with header and <Outlet />

    components/
      Header.jsx                 # Top navigation (Home, Cart, Checkout)
      Cart.jsx                   # Page to display all cart items
      ProductList.jsx            # Default page with searchable items
      CartItem.jsx               # Single cart card component
      Product.jsx                # Single product card component
      ProductDetails.jsx         # Detailed view for specific product (/book/:id)
      Checkout.jsx               # Form for user details and order summary
      NotFound.jsx               # Fallback error/404 page

    hooks/
      useProduct.js              # Custom hook for product logic

    CssFrComponents/
      Header.css                 # Styles for Header bar
      Shop.css                   # Shared styles for app components

  NodeJs/                        # Backend API (MVC Architecture)
    server.js                    # Express server setup and route initialization
    .env                         # Environment variables (JWT secrets)

    Controllers/                 # Controllers (Handle HTTP requests)
      auth.controller.js         # User registration/login logic
      products.controller.js     # Product CRUD operations
      cart.controller.js         # Cart operations for authenticated users

    Models/                      # Models (Database schemas)
      user.model.js              # User schema with password hashing
      product.model.js           # Product schema
      cart.model.js              # Cart item schema

    Routes/                      # Routes (API endpoints)
      auth.routes.js             # Authentication routes (/api/register, /api/login)
      product.routes.js          # Product routes (/api/products/*)
      cart.routes.js             # Cart routes (/api/cart/*)

    Middleware/                  # Middleware (Request processing)
      auth.middleware.js         # JWT token verification
      validation.middleware.js    # Input validation and error handling

  package.json                   # Frontend dependencies and scripts
  package-lock.json              # Frontend dependency lock file
  vite.config.js                 # Vite configuration
  eslint.config.js               # ESLint configuration
```

### 5. MVC Architecture Explanation

The backend follows the **Model-View-Controller (MVC)** pattern:

#### **Models** (`NodeJs/Model/`)
- Define data structure and database schemas using Mongoose
- Handle data validation and business logic
- Examples: `user.model.js`, `product.model.js`, `cart.model.js`

#### **Controllers** (`NodeJs/Controller/`)
- Process incoming HTTP requests
- Implement business logic and interact with Models
- Send responses back to clients
- Examples: `auth.controller.js`, `products.controller.js`, `cart.controller.js`

#### **Routes** (`NodeJs/Routes/`)
- Define API endpoints and map them to controller functions
- Handle middleware application (authentication, validation)
- Examples: `auth.routes.js`, `product.routes.js`, `cart.routes.js`

#### **Middleware** (`NodeJs/Middleware/`)
- Reusable functions that process requests before reaching controllers
- Examples: JWT authentication, input validation, error handling

### 6. Backend Libraries and Dependencies

Install these libraries in the `NodeJs` folder:

#### **Core Dependencies**
```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken
```

- **express** - Web framework for building APIs
- **mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation/verification

#### **Development Dependencies**
```bash
npm install --save-dev nodemon
```

- **nodemon** - Auto-restart server during development

#### **Backend Package.json Scripts**
```json
{
  "scripts": {
    "start": "nodemon server.js"
  }
}
```

### 7. Environment Configuration

**After cloning the repository locally, you must create a `.env` file in the `NodeJs` folder:**

```env
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=10m
MONGODB_URI=mongodb://localhost:27017/shoppyglobe
```

**Important Steps:**
1. Navigate to the `NodeJs` folder
2. Create a new file named `.env` (this file is not included in the repo for security reasons)
3. Copy the above content into your `.env` file
4. Replace `your-secret-key-here` with a secure random string for production

**Note:** The `.env` file is already included in `.gitignore` to ensure your sensitive configuration is never committed to version control.

---
