import { Product } from '../Model/product.model.js';
import { handleDatabaseError } from '../Middleware/validation.middleware.js';

// GET /api/products - Fetch all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        handleDatabaseError(error, res);
    }
};

// POST /api/products - Create a new product
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        handleDatabaseError(error, res);
    }
};

// GET /api/products/:id - Fetch single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        handleDatabaseError(error, res);
    }
};

// PUT /api/products/:id - Update a product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        handleDatabaseError(error, res);
    }
};

// DELETE /api/products/:id - Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        handleDatabaseError(error, res);
    }
};
