const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController') 
const authorizeToken = require('../middleware/authMiddleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authorizeToken, authController.logoutUser);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
