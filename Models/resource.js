var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recourceSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Equipment', 'Facility', 'Funds'],
        required: true
    },
    status: {
        type: String,
        enum: ['Available','Not Available'],
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

//Virtual for Project's URL
recourceSchema.virtual('url').get(function () {
    return '/resource'+this._id;
});

//Export model
module.exports = mongoose.model('Resource', recourceSchema);

