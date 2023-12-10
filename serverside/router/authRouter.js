const express = require('express');
const authController = require('../controller/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get all users
router.get('/users', authenticateToken, authController.getAllUsers);

// Route to register a user
router.post('/register', authController.registerUser);

// Route to login
router.post('/login', authController.loginUser);

// Route to get user profile (requires authentication)
router.get('/profile', authenticateToken, authController.getUserProfile);

module.exports = router;
