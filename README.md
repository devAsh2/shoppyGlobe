## ShoppyGlobe App (React + Vite)

An online shopping web application built with **React**, **Vite**, and **Redux Toolkit**.  
Users can browse items, search items, view detailed information, add selected item to the cart and view checkout section to place the final order.

### Github Link : [Visit GitHub](https://github.com/devAsh2/shoppyGlobe)

### 1. Getting started

#### **Prerequisites**

- **Node.js** (recommended LTS version)
- **npm** (comes with Node)

#### **Install dependencies**

From the `shoppyGlobe` folder:

```bash
npm install
```

#### **Run the development server**

```bash
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`) in your browser.

### 2. Project overview

This project simulates an online shopping app where users can:

- **Browse a list of products** as cards.
- **Search products by title/category/brand** using dynamic routes like `/books/:category`.
- **View products details** on a dedicated page, including cover samples, title, description, price, rating and a button to add the cart.
- **View Cart and Checkout** After adding the product to the cart, user can view the Cart page where he can increase/decrease the item quantity and can also remove the items. Then he can navigate to checkout page, where a dedicated form fetches the user details along with giving an order summary and finally can place the order.
- **Navigate with routing**: Home, Cart, Checkout, and product Details.
- **Error handling**: Any wrong routes will be handed gracefully using reacter-router-dom. User can go back to Home page using Back link.

### 3. Tech stack

- **React** – UI components and application logic.
- **Vite** – fast dev server and build tool.
- **React Router DOM** – client-side routing (`createBrowserRouter`, nested routes, dynamic params).
- **Redux Toolkit** – state management for:
  - `product` list (product catalog)
  - `cart` items (for add-to-cart behavior in details page)
- **CSS** – custom styles in `CssFrComponents` folder. Contains Header Css file for Header component and Shop Css file which applies to the whole app components.

### 4. Project structure (key files)

```text
shoppyGlobe/

  src/
    main.jsx              # Entry point, sets up RouterProvider and routes
    App.jsx               # Main layout with header and <Outlet />

    components/
      Header.jsx          # Top navigation (Home, Cart, Checkout)
      Cart.jsx          # Page to display all the items added in the cart. 
      ProductList.jsx        # Default page on App component with searchable items and neat design.
      CartItem.jsx     # Single cart card component
      App.jsx       # App level component nesting common header and other routes dynamically.
      Product.jsx            # Single product card component
      ProductDetails.jsx     # Detailed view for a specific product (/book/:id)
      Checkout.jsx         # Dummy form to fetch user details to place the order with Order Summary
      NotFound.jsx       # Fallback error/404 page

    utils/
      appStore.js         # Redux store configuration
      cartSlice.js        # Redux slice for cart state
      productSlice.js       # Redux slice for product list (setSearchQuery, clearSearchQuery)

    CssFrComponents/
      Header.css          #Styles for Header bar containing nav links, input search product, title.
      Shop.css            #Shared styles for all the other app components like Cart, ProductItem.

    components/style.css  # Shared styles for cards, layout, form, etc.
    index.css             # Global styles imported by main.jsx
```

---
