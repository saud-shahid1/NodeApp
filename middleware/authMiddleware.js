const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authorizeToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: false, message: 'No token provided.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ status: false, message: 'Invalid token.' });
    }
}

module.exports = authorizeToken;