import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from '../Controller/products.controller.js';
import { validateObjectId, validateProductData } from '../Middleware/validation.middleware.js';

export function productRoutes(app) {
    // GET /api/products - Fetch all products
    app.get('/api/products', getAllProducts);
    
    // POST /api/products - Create a new product
    app.post('/api/products', validateProductData, createProduct);
    
    // GET /api/products/:id - Fetch single product by ID
    app.get('/api/products/:id', validateObjectId, getProductById);
    
    // PUT /api/products/:id - Update a product
    app.put('/api/products/:id', validateObjectId, validateProductData, updateProduct);
    
    // DELETE /api/products/:id - Delete a product
    app.delete('/api/products/:id', validateObjectId, deleteProduct);
}