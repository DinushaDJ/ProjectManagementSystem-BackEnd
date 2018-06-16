var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var taskSchema = new Schema({

    // _projectId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Project'
    // },
    _phaseId: {
        type: Schema.Types.ObjectId,
        ref: 'Phase'
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ['High','Low','Moderate'],
        required: true
    },
    status: {
        type: String,
        enum: ['Complete','Not Complete','Ongoing'],
        required: true
    },
    percentageComplete: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

//Virtual for Project's URL
taskSchema.virtual('url').get(function () {
    return '/task'+this._id;
});

//Export model
module.exports = mongoose.model('Task', taskSchema);