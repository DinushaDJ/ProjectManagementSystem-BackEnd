var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var User = require('../Models/user');

//Exports middleware for Login
exports.signIn = function (req, res) {

    User.findOne({username: req.body.username}, 'userType username password', function (err, user) {

        //If user not found
        if (err || !user) {
            return res.json({
                success: false,
                message: 'Authentication failed. Wrong Username'
            });
        }
        //If user has been found
        else{
            const tokenDetails = {
                //userId: user._id,
                username: user.username,
                email: user.email,
                type: user.userType
            };

            var password = req.body.password;

            bcrypt.compare(password, user.password, () => {

                if(!err){
                    console.log('Method');
                    //create token
                    const token = jwt.sign(tokenDetails, 'secret', {
                        expiresIn: '1d'
                    });
                    console.log(token);
                    return res.json({
                        success: true,
                        message: 'Login Successful',
                        token: token
                    });
                }
                else{
                    return res.json({
                        success: false,
                        message: 'Authentication failed. Wrong Password'
                    });
                }
            });
        }
    });
};