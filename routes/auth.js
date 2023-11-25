const express = require('express');
const authService = require('../services/authService');
const router = express.Router();

router.post('/login', authService.login);
router.post('/register', authService.register);
router.post('/addAdmin', authService.addAdmin);

module.exports = router;
