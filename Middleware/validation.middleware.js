import mongoose from 'mongoose';

// Middleware to validate MongoDB ObjectId
export const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    next();
};

// Middleware to validate product data
export const validateProductData = (req, res, next) => {
    const { name, price, description, category, stock } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('Name is required and must be a non-empty string');
    }
    if (price === undefined || typeof price !== 'number' || price < 0) {
        errors.push('Price is required and must be a non-negative number');
    }
    if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
        errors.push('Stock must be a non-negative number');
    }
    if (category && typeof category !== 'string') {
        errors.push('Category must be a string');
    }
    if (description && typeof description !== 'string') {
        errors.push('Description must be a string');
    }

    if (errors.length > 0) {
        return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    next();
};

// Middleware to validate cart data
export const validateCartData = (req, res, next) => {
    const { productId, quantity } = req.body;
    const errors = [];

    if (!productId) {
        errors.push('Product ID is required');
    } else if (!mongoose.Types.ObjectId.isValid(productId)) {
        errors.push('Invalid Product ID format');
    }
    if (quantity === undefined || typeof quantity !== 'number' || quantity <= 0) {
        errors.push('Quantity is required and must be a positive number');
    }

    if (errors.length > 0) {
        return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    next();
};

// Database connection error handler
export const handleDatabaseError = (error, res) => {
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid data format' });
    }
    if (error.code === 11000) {
        return res.status(409).json({ error: 'Duplicate entry' });
    }
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
};
