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
                return res.status(404).json({
                    message: "Unable to get all Users",
                    error: err
                });
            }
            else {
                return res.status(200).json(result);
            }
        })
        //.populate('project phase');
};


// Display a specific User.
exports.user_detail = function(req, res) {
    User.findById({'_id': req.params.id},
        "_id _projectId username email password userType"
        , function (err, result) {
            if (err) {
                return res.status(404).json({
                    message: "Unable to get the User",
                    error: err
                });
            }
            else {
                return res.status(200).json(result);
            }
        }).
        populate('employee phase');
};


// Handle User create on POST.
exports.user_create_POST = function(req, res) {

    const data ={
        _projectId: req.body._projectId,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
    };

    const rules = {
        _projectId: 'array',
        username: 'required|min:5',
        email: 'required|email',
        password: 'required|min:4|max:40',
        userType: 'required'
    };

    validate(data, rules)
        .then(() => {
            const user = new User({
                _projectId: req.body._projectId,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType
            });

            user.save(function (err) {
                if (err)
                {
                    return res.status(304).json({
                        error: err,
                        message: "error"
                    });
                }
                return res.status(200).json(user);
            });
        })
        .catch((errors) => {
            return res.status(403).json({errors});
        });
};


// Handle User delete on DELETE.
exports.user_delete_DELETE = function(req, res) {

    User.find({userType: req.body.userType}, function (err, result) {

        //check if the user ia a client
       if(userType === "Client"){
           //delete the User along with the projects, phases and tasks
           User.findByIdAndDelete(req.params.id, function (err, result) {
               if (err) {
                   return res.status(404).json({
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
                               return res.status(404).json({
                                   message: "Unable to Delete Project",
                                   error: err
                               });
                           }
                           else {
                               for(let x = 0; x < projects.length; x++){
                                   projectMiddleware.projectPhases(projects[x],function (phases) {

                                       Phases.deleteMany({'_projectId': projects[x]},function (err, result) {
                                           if (err) {
                                               return res.status(404).json({
                                                   message: "Unable to Delete Phase",
                                                   error: err
                                               });
                                           }
                                           //delete the tasks of each phase
                                           for(let i=0; i<phases.length; i++) {
                                               Task.deleteMany({'_phaseId': phases[i]}, function (err, result) {
                                                   if (err) {
                                                       return res.status(404).json({
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
                       return res.status(200).json({
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
                   return res.status(404).json({
                       message: "Unable to Delete User",
                       error: err
                   });
               }
               else {
                   userMiddleware.userProjects(req.params.id, function (projects) {
                       if (err) {
                           return res.status(404).json({
                               message: "Unable get Project",
                               error: err
                           });
                       }
                       for(let y=0; y < projects.length; y++){
                           //Project.findByIdAndUpdate({'_id': projects[i]}, {$pull: {'_userId': req.params.id}}, function(req, res, result) {
                           userMiddleware.deleteUserIdFromProject(projects[y], req.params.id);

                           //});
                       }
                       return res.status(200).json({
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
        _projectId: req.body._projectId,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
    };

    const rules = {
        _projectId: 'array',
        username: 'required|min:5',
        email: 'required|email',
        password: 'required|min:4|max:40',
        userType: 'required'
    };

    validate(data, rules)
        .then(() => {
            const user = new User({
                _projectId: req.body._projectId,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType
            });

            User.findByIdAndUpdate(req.params.id, data, {}, function (err, result) {
                if (err) {
                    return res.status(404).json({
                        message: "Unable to Update User",
                        error: err
                    });
                }
                else {
                    return res.status(200).json({
                        message: "Updated Successfully",
                        result: result
                    });
                }
            });
        })
        .catch((errors) => {
            return res.status(403).json({errors});
        });
};


//Display all the Projects of an specific User
exports.user_project_detail = function(req, res) {

    User.find({},{'_userId': req.params.id},
        //"_projectId",
        function (err, result) {
            if (err) {
                return res.status(404).json({
                    message: "Unable to get the User Project",
                    error: err
                });
            }
            else {
                return res.status(200).json(result);
            }
        }).
        populate({path: '_projectId', select: 'name'});
};


// Get the Project of a specific client
exports.loggedIn_project = (req, res) => {


    const {
        userId,
        projectId
    } = req.params;


    console.log(userId);

    let logUser = Project.find({_userId: userId}, (err, project) => {
        if(err)
        {
            return res.json({
                status: "ERROR",
                message: err
            });
        }
        return res.status(200).json({
            status: "OK",
            data: project
        })
    })
};