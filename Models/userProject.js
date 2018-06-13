var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var taskSchema = new Schema({

    _projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

//Virtual for Project's URL
taskSchema.virtual('url').get(function () {
    return '';
});

//Export model
module.exports = mongoose.model('UserProject', taskSchema);