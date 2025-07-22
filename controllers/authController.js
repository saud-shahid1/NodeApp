const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { hashPassword, comparePassword } = require('./authHelpers');
const { isValidPassword } = require('../validators/passwordValidator');

let users = [];

// to register user
exports.registerUser = (req, res) => {
    const passwordCheck = isValidPassword(req.body.password);
    if (!passwordCheck.valid) {
        return res.json({ status: false, message: passwordCheck.message });
    }
    const exists = users.some(user => user.email === req.body.email);

    if (exists) {
        return res.json({ status: false, message: 'Email already exists!' });
    }
    const user = {
        ...req.body,
        password: hashPassword(req.body.password)
    };
    users.push(user);
    res.json({ status: true, message: "User has been registered successfully!." });
};

// to login user
exports.loginUser = (req, res) => {
    const user = users.find(
        user => user.email === req.body.email && comparePassword(req.body.password, user.password)
    );
    if (user) {
        const token = jwt.sign(
            { email: user.email }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );
        return res.json({ status: true, message: "Login successfully!", token });
    }
    res.json({ status: false, message: "Invalid email or password." });
};

// to logout user
exports.logoutUser = (req, res) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Remove user from array
        users = users.filter(user => user.email !== decoded.email);
        res.json({ status: true, message: "Logout successfully!" });
    } catch (err) {
        res.status(401).json({ status: false, message: "Invalid token." });
    }
};

// to reset password
exports.resetPassword = (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    const user = users.find(user => user.email === email && comparePassword(oldPassword, user.password));
    if (user) {
        if (comparePassword(newPassword, user.password)) {
            return res.json({ status: false, message: "New password cannot be the same as old password." });
        }
        user.password = hashPassword(newPassword);
        return res.json({ status: true, message: "Password has been reset successfully!" });
    }
    res.json({ status: false, message: "Invalid email or old password." });
};
