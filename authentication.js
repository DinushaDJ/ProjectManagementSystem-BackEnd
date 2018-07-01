'use strict';

const jwt = require('jsonwebtoken');

// Acquire authentication for all the User Types
exports.allMembers = (req, res, next) => {

    // Check header for token
    let token = req.headers['x-access-token'];

    // Check if token has been sent
    if (token) {
        //Get user type from token
        let type = token.slice(-1);
        console.log(type);
        token = token.slice(0, -1);

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
        return res.status(401).json({
            success: false,
            message: 'Unauthorised'
        });
    }
};


// Acquire authentication for Admin only
exports.AdminOnly = function(req, res, next) {
    // Check header for token
    let token = req.headers['x-access-token'];

    // Check if token has been sent
    if (token) {
        //Get user type from token
        let type =token.slice(-1);
        console.log(type);
        token = token.slice(0, -1);

        // Verify token
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err||type!=='A') {
                // Invalid token
                return res.status(403).json({
                    success: false,
                    message: 'Unauthorised User'
                });
            }
            else {
                // If everything is good, save to request for use in other routes
                req.decoded = decoded;
                return next();
            }
        });
    }
    else {
        console.log("Error");
        // No token
        return res.status(401).json({
            success: false,
            message: 'Unauthorised Token'
        });
    }
};


// Acquire authentication for Admin and Project Manager only
exports.AdminAndProManagerOnly = function(req, res, next) {
    // Check header for token
    let token = req.headers['x-access-token'];

    // Check if token has been sent
    if (token) {
        //Get user type from token
        let type =token.slice(-1);
        console.log(type);
        token = token.slice(0, -1);

        // Verify token
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err||(type!=='A'&&type!=='P')) {
                // Invalid token
                return res.status(403).json({
                    success: false,
                    message: 'Unauthorised User'
                });
            }
            else {
                // If everything is good, save to request for use in other routes
                req.decoded = decoded;
                return next();
            }
        });
    }
    else {
        // No token
        return res.status(401).json({
            success: false,
            message: 'Unauthorised'
        });
    }
};