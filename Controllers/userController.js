var async = require('async');

const User = require('../Models/user');
const Project = require('../Models/project');
const Phases = require('../Models/phase');
const Task = require('../Models/task');

const userMiddleware =  require('../Middleware/user');
const projectMiddleware =  require('../Middleware/project');

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


// Handle User create on POST.
exports.user_create_POST = function(req, res) {

    const data ={
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
    };

    const rules = {
        username: 'required|min:5',
        email: 'required|email',
        password: 'required',
        userType: 'required'
    };

    validate(data, rules)
        .then(() => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType
            });

            user.save(function (err) {
                if (err)
                {
                    return res.json({
                        error: err,
                        message: "error"
                    });
                }
                return res.json(user);
            });
        })
        .catch((errors) => {
            return res.json({errors});
        });
};


// Handle User delete on DELETE.
exports.user_delete_DELETE = function(req, res) {

    User.find({userType: req.body.userType}, function (err, result) {
        //check if the user ia a client
       if(req.body.userType === "Client"){
           //delete the user along with the projects, phases and tasks
           User.findByIdAndDelete(req.params.id, function (err, result) {
               if (err) {
                   return res.json({
                       message: "Unable to Delete User",
                       error: err
                   });
               }
               else {
                   //console.log('Project');
                   userMiddleware.userProjects(req.params.id, function(projects) {
                       //delete all the phases of project specified by the passed project Id
                       Project.deleteMany({'_userId': req.params.id}, function (err, result) {
                           if (err) {
                               return res.json({
                                   message: "Unable to Delete Project",
                                   error: err
                               });
                           }
                           else {
                               for(let x = 0; x < projects.length; x++){
                                   projectMiddleware.projectPhases(projects[x],function (phases) {

                                       Phases.deleteMany({'_projectId': projects[x]},function (err, result) {
                                           if (err) {
                                               return res.json({
                                                   message: "Unable to Delete Phase",
                                                   error: err
                                               });
                                           }
                                           //delete the tasks of each phase
                                           for(let i=0; i<phases.length; i++) {
                                               Task.deleteMany({'_phaseId': phases[i]}, function (err, result) {
                                                   if (err) {
                                                       return res.json({
                                                           message: "Unable to Delete Task",
                                                           error: err
                                                       });
                                                   }
                                               });
                                           }
                                       })
                                   });
                               }
                           }
                       });
                       return res.json({
                           message: "Client Deleted Successfully",
                           result: result
                       })
                   });
               }
           });
       }
       else{
           //delete a user
           User.findByIdAndDelete(req.params.id, function (err, result) {
               if (err) {
                   return res.json({
                       message: "Unable to Delete User",
                       error: err
                   });
               }
               else {
                   userMiddleware.userProjects(req.params.id, function (projects) {
                       if (err) {
                           return res.json({
                               message: "Unable get Project",
                               error: err
                           });
                       }
                       for(let y=0; y < projects.length; y++){
                           //Project.findByIdAndUpdate({'_id': projects[i]}, {$pull: {'_userId': req.params.id}}, function(req, res, result) {
                           userMiddleware.deleteUserIdFromProject(projects[y], req.params.id);

                           //});
                       }
                       return res.json({
                           message: "User of Project Deleted Successfully",
                           //result: [userArray]
                       });
                   });
               }
           });
       }
    });
};


// Handle User update on PUT.
exports.user_update_PUT = function(req, res) {

    const data ={
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
    };

    const rules = {
        username: 'required|min:5',
        email: 'required|email',
        password: 'required',
        userType: 'required'
    };

    validate(data, rules)
        .then(() => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType
            });

            User.findByIdAndUpdate(req.params.id, data, {}, function (err, result) {
                if (err) {
                    return res.json({
                        message: "Unable to Update User",
                        error: err
                    });
                }
                else {
                    return res.json({
                        message: "Updated Successfully",
                        result: result
                    });
                }
            });
        })
        .catch((errors) => {
            return res.json({errors});
        });
};


//Display all the Projects of an specific User
exports.user_project_detail = function(req, res) {

    User.find({},{'_userId': req.params.id},
        //"_projectId",
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


// exports.user_project = function(req) {
//     const userId = User.findById('_id',req.params.id);
//
//     //const userProjectId = UserProject(userId.find(''))
//     console.log(userId);
// };