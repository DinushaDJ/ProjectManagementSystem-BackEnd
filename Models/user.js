var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({

    _projectId: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
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
    userType: {
        type: String,
        required: true
    }
});

//Virtual for Project's URL
userSchema.virtual('url').get(function () {
    return '/users'+this._id;
});

userSchema.pre('save', function(next){
    var user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if(err)
            {
                throw new err;
            }
            bcrypt.hash(user.password, salt, function(err, hash)
            {
                if(err)
                {
                    return next(err);
                }
                user.password = hash;
                next();
            });
            //next();
        });
    } else {
        return next();
    }
});

//Export model
module.exports = mongoose.model('User', userSchema);