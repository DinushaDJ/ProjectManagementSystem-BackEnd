const Project = require('../Models/project');

//Callback function to get the Projects of Users
module.exports.userProjects = function(userId, callback) {
    console.log('method');
    var projects = [];
    Project.find({'_userId': {$in:[userId]}}, '_id', function (err, result) {
        if (err) {
            return json(err);
        }
        for(let i=0; i<result.length; i++) {
            projects[i] = result[i]._id;
        }
        return callback(projects);
    })
};


module.exports.deleteUserIdFromProject = function(projId, userId) {

    Project.findById({'_id': projId}, '_userId', function (err, result) {
        if (err) {
            return json(err);
        }
        const index = result['_userId'].indexOf(userId);
        if (index !== -1) {
            result['_userId'].splice(index, 1);
        }
        Project.update({'_id': projId}, {$set: { '_userId': result['_userId'] }}, function (err, result) {
            if (err) {
                return json(err);
            }
            return result['_userId'];
        })
    });
};