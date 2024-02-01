const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET, {});
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET, {});
    } catch (error) {
        console.log(error);
        throw new Error('Token verification failed');
    }
};

module.exports = {
    generateToken,
    verifyToken,
};
