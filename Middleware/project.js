const Phase = require('../Models/phase');

// Get the Phases of a Project
module.exports.projectPhases = function(projectId, callback) {
    console.log('method');
    var phases = [];
    Phase.find({'_projectId': projectId}, '_id', function (err, result) {
        if (err) {
            return json(err);
        }
        for(let i=0; i<result.length; i++) {
            phases[i] = result[i]._id;
        }
        return callback(phases);
    })
};