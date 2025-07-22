const crypto = require('crypto');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function comparePassword(password, hashed) {
    return hashPassword(password) === hashed;
}

module.exports = {
    hashPassword,
    comparePassword
};