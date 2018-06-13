var async = require('async');

const User = require('../Models/user');
const UserProject = require('../Models/userProject');
//const Phase = require('../models/phase');

const { validate } = require('indicative');


// Display list of all Users.
exports.user_list = function(req, res) {
    User.find({},
        "_id username email password userType"
        , function (err, result) {
            if (err) {
                return res.json({
                    message: "Unable to get all Users",
                    error: err
                });
            }
            else {
                return res.json(result);
            }
        })
        //.populate('project phase');
};

// Display a specific User.
exports.user_detail = function(req, res) {
    User.findById({'_id': req.params.id},
        "_id username email password userType"
        , function (err, result) {
            if (err) {
                return res.json({
                    message: "Unable to get the User",
                    error: err
                });
            }
            else {
                return res.json(result);
            }
        })
        //.populate('employee phase');
};

//Display all the Projects of an specific User
exports.user_project_detail = function(req, res) {

    UserProject.find({'_userId': req.params.id},
        "_projectId",
        function (err, result) {
            if (err) {
                return res.json({
                    message: "Unable to get the User Project",
                    error: err
                });
            }
            else {
                return res.json(result);
            }
        }).
        populate({path: '_projectId', select: 'name'});
};

// Display User create form on GET.
exports.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task create GET');
};


// Handle User create on POST.
exports.user_create_post = function(req, res) {

    const data ={
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
    };

    const rules = {
        username: 'required|min:5',
        email: 'required',
        password: 'required',
        userType: 'required'
    };

    validate(data, rules)
        .then(() => {
            const task = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType
            });
            task.save(function (err) {
                if (err) {
                    return res.json({err});
                }
                return res.json(task);
            });
        })
        .catch((errors) => {
            return res.json({errors});
        });
};


// Display User delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task delete GET');
};


// Handle User delete on POST.
exports.user_delete_post = function(req, res) {
    User.findByIdAndDelete(req.params.id, function (err, result) {
        if(req.body.userType === 'Client')
        {
            UserProject.findByIdAndDelete('_projectId',req.params.id);
            if (err) {
                return res.json({
                    message: "Unable to Delete User",
                    error: err
                });
            }
            else{
                return res.json({
                    message: "Deleted Successfully",
                    result: result
                });
            }
        }
    });
};


// Display User update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task update GET');
};


// Handle User update on POST.
exports.user_update_post = function(req, res) {

    var task = new User(
        {

        }
    );

    User.findByIdAndUpdate(req.params.id, task, {}, function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to Update User",
                error: err
            });
        }
        else{
            return res.json({
                message: "Updated Successfully",
                result: result
            });
        }
    });
};