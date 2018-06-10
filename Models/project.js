var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var projectSchema = new Schema({

    _userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _resourceId: {
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    },
    name: {
        type: String,
        required: true
    },
    type: String,
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    budget: Number,
    status: {
        type: String,
        enum: ['Complete','Not Complete','Ongoing'],
        required: true
    },
    percentageComplete: {
        type: Number
    },
    description: {
        type: String
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

//Virtual for Project's URL
projectSchema.virtual('url').get(function () {
    return '';
});

//Export model
module.exports = mongoose.model('Project', projectSchema);

