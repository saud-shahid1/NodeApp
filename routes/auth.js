const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController') 
const authorizeToken = require('../middleware/authMiddleware');
const passwordValidator = require('../validators/passwordValidator');


router.post('/register', passwordValidator, authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authorizeToken, authController.logoutUser);
router.post('/reset-password', passwordValidator, authController.resetPassword);

module.exports = router;
