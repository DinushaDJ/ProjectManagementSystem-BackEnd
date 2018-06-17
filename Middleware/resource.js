const Project = require('../Models/project');

//Callback function to get the Resources of a Project
module.exports.projectResources = function(resourceId, callback) {
    console.log('method');
    var resources = [];
    Project.find({'_resourceId': {$in:[resourceId]}}, '_id', function (err, result) {
        if (err) {
            return json(err);
        }
        for(let i=0; i<result.length; i++) {
            resources[i] = result[i]._id;
        }
        return callback(resources);
    })
};

//Delete ResourceId from the Project
module.exports.deleteResourceIdFromProject = function(projId, resourceId) {

    Project.findById({'_id': projId}, '_resourceId', function (err, result) {
        if (err) {
            return json(err);
        }
        const index = result['_resourceId'].indexOf(resourceId);
        if (index !== -1) {
            result['_resourceId'].splice(index, 1);
        }
        Project.update({'_id': projId}, {$set: { '_resourceId': result['_resourceId'] }}, function (err, result) {
            if (err) {
                return json(err);
            }
            return result['_resourceId'];
        })
    });
};