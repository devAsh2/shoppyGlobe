import { Cart } from '../Model/cart.model.js';
import { Product } from '../Model/product.model.js';
import { handleDatabaseError } from '../Middleware/validation.middleware.js';

// GET /api/cart - Fetch all cart items
export const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('productId');
        res.json(cartItems);
    } catch (error) {
        handleDatabaseError(error, res);
    }
};

// POST /api/cart - Add product to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        // Check if product is already in cart
        const existingCartItem = await Cart.findOne({ productId });
        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.json(existingCartItem);
        }
        
        // Add new item to cart
        const cartItem = new Cart({ productId, quantity });
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        handleDatabaseError(error, res);
    }
};

// PUT /api/cart/:id - Update quantity of product in cart
export const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        
        // Validate quantity
        if (quantity === undefined || typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be a positive number' });
        }
        
        const cartItem = await Cart.findByIdAndUpdate(
            req.params.id,
            { quantity },
            { new: true, runValidators: true }
        );
        
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }
        
        res.json(cartItem);
    } catch (error) {
        handleDatabaseError(error, res);
    }
};

// DELETE /api/cart/:id - Remove product from cart
export const removeFromCart = async (req, res) => {
    try {
        const cartItem = await Cart.findByIdAndDelete(req.params.id);
        
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }
        
        res.json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        handleDatabaseError(error, res);
    }
};
