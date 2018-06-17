var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var User = require('../Models/user');


//Exports middleware for Login
exports.signIn = function (req, res) {

    User.findOne({username: req.body.username}, 'userType username password', function (err, user) {
        
        //If user not found
        if (err || !user) {
            console.log(user);
            return res.json({
                success: false,
                message: 'Authentication failed. Wrong Username'
            });
        }

        //If user has been found
        else{
            console.log(user.userType);

            var uType = req.body.userType;

            console.log(uType);

            if(user.userType !== uType){
                return res.status(401).json({
                    success: false,
                    message: 'Authentication failed. Wrong UserType'
                });
            }
            else{
                const tokenDetails = {
                    username: user.username,
                    email: user.email,
                    userType: user.userType
                };


                var password = req.body.password;

                bcrypt.compare(password, user.password, () => {

                    if(!err){
                        //console.log('Method');

                        //create token
                        let token = jwt.sign(tokenDetails, 'secret', {
                            expiresIn: '1d'
                        });

                        if(user.userType === "Member")
                        {
                            token = token +'M';
                            console.log(token);
                        }
                        else if(user.userType === "Client")
                        {
                            token = token +'C';
                            console.log(token);
                        }
                        else if(user.userType === "Project Manager")
                        {
                            token = token +'P';
                            console.log(token);
                        }
                        else if(user.userType === "Admin")
                        {
                            token = token + 'A';
                            console.log(token);
                        }
                        else
                        {
                            process.exit(1);
                        }

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
        }
    });
};