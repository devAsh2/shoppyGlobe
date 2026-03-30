import { User } from '../Model/user.model.js';
import { generateToken } from '../Middleware/auth.middleware.js';
import { handleDatabaseError } from '../Middleware/validation.middleware.js';

// POST /api/register - Register a new user
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate that username and email are provided
        if (!username || !email) {
            return res.status(400).json({ error: 'Username and email are required' });
        }

        // Check if user already exists
        let existingUser;
        try {
            existingUser = await User.findOne({
                $or: [{ email }, { username }]
            });
        } catch (error) {
            return handleDatabaseError(error, res);
        }

        if (existingUser) {
            return res.status(409).json({ 
                error: 'User already exists with this email or username' 
            });
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (error) {
        handleDatabaseError(error, res);
    }
};

// POST /api/login - Authenticate user and return JWT token
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (error) {
        handleDatabaseError(error, res);
    }
};