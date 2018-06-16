const Project = require('../Models/project');
const User = require('../Models/user');

//Callback function to get the Projects of Users
module.exports.userProjects = function(userId, callback) {
    console.log('method');
    var projects = [];
    Project.find({'_userId': userId}, '_id', function (err, result) {
        if (err) {
            return json(err);
        }
        for(let i=0; i<result.length; i++) {
            projects[i] = result[i]._id;
        }
        return callback(projects);
    })
};

module.exports.user_clients = function(userType, callback) {
    console.log('method');
    var clients = [];
    User.find({'userType': 'Client'}, '_id', function (err, result) {

        if (err) {
            return json(err);
        }
        for(let i=0; i<result.length; i++) {
            clients[i] = result[i]._id;
        }
        return callback(clients);
    });
    console.log(clients);
};