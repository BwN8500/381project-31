const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklistedToken');
require('dotenv').config();

exports.verifyRole = (requiredRole) => {
    return async (req, res, next) => {
        let token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(403).send({ message: 'No token provided!' });
        }
        try {
            const isBlacklisted = await BlacklistedToken.findOne({ token });
            if (isBlacklisted) {
                return res.status(401).send({ message: 'Invalid or expired token.' });
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded.role !== requiredRole && decoded.role !== "admin") {
                return res.status(403).send({ message: `Invalid or expired token.` });
            }
            req.userId = decoded.id;
            req.userRole = decoded.role;
            next();
        } catch (err) {
            return res.status(401).send({ message: 'Invalid or expired token.' });
        }
    };
};
