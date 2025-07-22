
function passwordValidator(req, res, next) {
    const passwordCheck = isValidPassword(req.body.password);
    if (!passwordCheck.valid) {
        return res.json({ status: false, message: passwordCheck.message });
    }
    next();
}
function isValidPassword(password) {
    if (typeof password !== 'string' || password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters long.' };
    }
    if (!/[A-Za-z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one letter.' };
    }
    if (!/\d/.test(password)) {
        return { valid: false, message: 'Password must contain at least one number.' };
    }
    return { valid: true };
}
module.exports = passwordValidator;