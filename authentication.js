'use strict';

module.exports = (req, res, next) => {
    const jwt = require('jsonwebtoken');

    // Check header for token
    const token = req.headers['x-access-token'];

    // Check if token has been sent
    if (token) {
        // Verify token
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                // Invalid token
                return res.json({
                    success: false,
                    message: 'Unauthorised'
                });
            } else {
                // If everything is good, save to request for use in other routes
                req.decoded = decoded;
                return next();
            }
        });
    } else {
        // No token
        return res.json({
            success: false,
            message: 'Unauthorised'
        });
    }
};

module