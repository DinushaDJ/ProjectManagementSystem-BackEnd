var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var phaseSchema = new Schema({

    _projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    name: {
        type: String,
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
    duration: {
        type: String,
        //default: end_date.diff(start_date)
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
phaseSchema.virtual('url').get(function () {
    return '/phase'+this._id;
});

//Export model
module.exports = mongoose.model('Phase', phaseSchema);