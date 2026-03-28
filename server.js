import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { cartRoutes } from './Routes/cart.routes.js';
import { productRoutes } from './Routes/product.routes.js';
import { authRoutes } from './Routes/auth.routes.js';

// Load environment variables
dotenv.config();

const app = new express();
app.use(express.json());

// Initialize routes
authRoutes(app);
productRoutes(app);
cartRoutes(app);

app.listen(8002,()=>{
    console.log("Server is running");
})

mongoose.connect("mongodb://localhost:27017/")
    .then(() => {
        console.log("Database connection is successful");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);
    });
