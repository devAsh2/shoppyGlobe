import { registerUser, loginUser } from '../Controller/auth.controller.js';

export function authRoutes(app) {
    // POST /api/register - Register a new user
    app.post('/api/register', registerUser);
    
    // POST /api/login - Authenticate user and return JWT token
    app.post('/api/login', loginUser);
}
