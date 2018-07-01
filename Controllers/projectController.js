const Project = require('../Models/project');
//const User = require('../Models/user');
const Phase = require('../Models/phase');
const Task = require('../Models/task');

const projectMiddleware = require('../Middleware/project');
const userMiddleware = require('../Middleware/user');

const { validate } = require('indicative');


// Display list of all Projects.
exports.project_list = function(req, res) {
    Project.find({},
        "_id _userId _resourceId name type start_date end_date budget status percentageComplete description deletedAt"
        , function (err, result) {
            if (err) {
                return res.status(404).json({
                    message: "Unable to get all projects",
                    error: err
                });
            }
            else {
                return res.status(200).json(result);
            }
        }).
        populate('_userId _resourceId');
};


// Display detail page for a specific Project.
exports.project_detail = function(req, res) {
    Project.findById({'_id': req.params.id},
        "_id _userId _resourceId _phaseId name type start_date end_date budget status percentageComplete description deletedAt"
        , function (err, result) {
            if (err) {
                return res.status(404).json({
                    message: "Unable to get the project",
                    error: err
                });
            }
            else {
                return res.status(200).json(result);
            }
        }).
        populate('_userId _resourceId')
        .populate({
            path:'_phaseId', populate:{path: '_taskId'}
        });
};


// Get Phase details of a specific Project
exports.project_phase_detail = function(req, res) {
    Project.findById({'_id': req.params.id},
        "_id _userId _resourceId _phaseId name type start_date end_date budget status percentageComplete description deletedAt"
        , function (err, result) {
            if (err) {
                return res.status(404).json({
                    message: "Unable to get the project",
                    error: err
                });
            }
            else {
                return res.status(200).json(result);
            }
        }).
    populate('_userId _resourceId')
        .populate({
            path:'_phaseId', populate:{path: '_taskId'}
        });
};


// Handle Project create on POST.
exports.project_create_POST = function(req, res) {

    const data ={
        _userId: req.body._userId,
        _resourceId: req.body._resourceId,
        _phaseId: req.body._phaseId,
        name: req.body.name,
        type: req.body.type,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        budget: req.body.budget,
        status: req.body.status,
        percentageComplete: req.body.percentageComplete,
        description: req.body.description,
        deletedAt: req.body.deletedAt
    };

    const rules = {
        _userId: 'required|array',
        _resourceId: 'required|array',
        _phaseId: 'array',
        name: 'required',
        type: 'required',
        start_date: 'required|date',
        end_date: 'required|date',
        budget: 'required|number',
        status: 'required|in:Complete,Not Complete,Ongoing',
        percentageComplete: 'required|number',
        description: 'required'
    };

    validate(data, rules)
        .then(() => {
            const project = new Project({
                _userId: req.body._userId,
                _resourceId: req.body._resourceId,
                _phaseId: req.body._phaseId,
                name: req.body.name,
                type: req.body.type,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                budget: req.body.budget,
                status: req.body.status,
                percentageComplete: req.body.percentageComplete,
                description: req.body.description,
                deletedAt: req.body.deletedAt
            });
            project.save(function (err) {
                if (err) {
                    return res.status(404).json({err});
                }
                return res.status(200).json(project);
            });
        })
        .catch((errors) => {
            return res.status(403).json({errors});
        });
};


// Handle Project delete on DELETE.
exports.project_delete_DELETE = function(req, res) {

    Project.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) {
            return res.status(404).json({
                message: "Unable to Delete Project",
                error: err
            });
        }
        else {
            projectMiddleware.projectPhases(req.params.id, function(phases) {
                //delete all the phases of project specified by the passed project Id
                Phase.deleteMany({'_projectId': req.params.id}, function (err, result) {
                    if (err) {
                        return res.status(404).json({
                            message: "Unable to Delete Phase",
                            error: err
                        });
                    }
                    else {
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
                    }
                });
                return res.status(200).json({
                    message: "Deleted Successfully",
                    result: result
                })
            });
        }
    });
};


// Handle Project update on PUT.
exports.project_update_PUT = function(req, res) {

    const data = {
        _userId: req.body._userId,
        _resourceId: req.body._resourceId,
        _phaseId: req.body._phaseId,
        name: req.body.name,
        type: req.body.type,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        budget: req.body.budget,
        status: req.body.status,
        percentageComplete: req.body.percentageComplete,
        description: req.body.description,
        deletedAt: req.body.deletedAt
    };

    const rules = {
        _userId: 'required|array',
        _resourceId: 'required|array',
        _phaseId: 'array',
        name: 'required',
        type: 'required',
        start_date: 'required|date',
        end_date: 'required|date',
        budget: 'required|number',
        status: 'required|in:Complete,NotComplete,Ongoing',
        percentageComplete: 'required|number',
        //description: 'alpha_numeric'
    };

    validate(data, rules)
        .then(() => {
            console.log(req.body._userId);

            Project.findByIdAndUpdate(req.params.id, data, function (err, result) {
                if (err) {
                    return res.status(404).json({
                        message: "Unable to Update Project",
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


// Get the phases of a specific project
exports.project_phase_list = function (req, res) {

    Project.findById({'_id': req.params.id} , '_phaseId'
        , function (err, result) {
            if (err) {
                return res.status(404).json({
                    message: "Unable to get the phase",
                    error: err
                });
            }
            else {
                return res.status(200).json(result);
            }
        })
        .populate({
            path: '_phaseId',
            select: 'name start_date end_date duration status percentageComplete description'});
};


 // Get the tasks of a Phase and Project
exports.project_phase_task_list = function (req, res) {

    Project.findById({'_id': req.params.id} , '_phaseId'
        , function (err, result) {
        //console.log('TAAASK')
            if (err) {
                return res.status(404).json({
                    message: "Unable to get the phase",
                    error: err
                });
            }
            else {
                //console.log('TAAASK')
                return res.status(200).json(result);
            }
        })
        //.populate('_phaseId').populate('_taskId');
        .populate({
            path: '_phaseId',
            populate:{
                path: '_taskId',
                select: 'name number start_date end_date priority status percentageComplete description'}
        });
};