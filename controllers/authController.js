const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { hashPassword, comparePassword } = require('./authHelpers');
const User = require('../models/User');

// Register User
exports.registerUser = async (req, res) => {
    try {
        console.log('Registering user with data:', req.body);
        const { name, email, password } = req.body;
        const exists = await User.findOne({
            where: { email: email }
        });
        console.log('Checking if user exists:', exists);
        if (exists) {
            return res.json({ status: false, message: 'Email already exists!' });
        }
        console.log('Creating user:', { name, email });
        await User.create({
            name,
            email,
            password: hashPassword(password)
        });
        res.json({ status: true, message: "User has been registered successfully!." });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: 'Server error.' });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (user && comparePassword(password, user.password)) {
            const token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            user.token = token;
            await user.save();
            return res.json({ status: true, message: "Login successfully!", token });
        }
        res.json({ status: false, message: "Invalid email or password." });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ status: false, message: 'Server error.' });
    }
};

// Logout User 
exports.logoutUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id} });
        if (!user) {
            return res.status(401).json({ status: false, message: "Invalid token." });
        }
        user.token = null;
        await user.save();
        res.json({ status: true, message: "Logout successfully!" });
    } catch (err) {
        res.status(401).json({ status: false, message: "Invalid token." });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { email, oldPassword, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (!user || !comparePassword(oldPassword, user.password)) {
            return res.json({ status: false, message: "Invalid email or old password." });
        }
        if (comparePassword(password, user.password)) {
            return res.json({ status: false, message: "New password cannot be the same as old password." });
        }
        user.password = hashPassword(password);
        await user.save();
        res.json({ status: true, message: "Password has been reset successfully!" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: 'Server error.' });
    }
};
