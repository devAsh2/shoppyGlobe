import { getAllCartItems, addToCart, updateCartItem, removeFromCart } from '../Controller/cart.controller.js';
import { validateObjectId, validateCartData } from '../Middleware/validation.middleware.js';
import { authenticateToken } from '../Middleware/auth.middleware.js';

export function cartRoutes(app) {
    // GET /api/cart - Fetch all cart items (protected)
    app.get('/api/cart', authenticateToken, getAllCartItems);
    
    // POST /api/cart - Add product to cart (protected)
    app.post('/api/cart', authenticateToken, validateCartData, addToCart);
    
    // PUT /api/cart/:id - Update quantity of product in cart (protected)
    app.put('/api/cart/:id', authenticateToken, validateObjectId, updateCartItem);
    
    // DELETE /api/cart/:id - Remove product from cart (protected)
    app.delete('/api/cart/:id', authenticateToken, validateObjectId, removeFromCart);
}