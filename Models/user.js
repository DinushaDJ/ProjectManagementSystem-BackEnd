var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

    // _projectId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Project'
    // },
    username: {
        type: String,
        required: true,
        min: [5, 'Username must be 5 characters or more']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

//Virtual for Project's URL
userSchema.virtual('url').get(function () {
    return '';
});

//Export model
module.exports = mongoose.model('User', userSchema);