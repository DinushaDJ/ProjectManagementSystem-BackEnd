const Task = require('../models/task');
//const Project = require('../models/project');
//const Phase = require('../models/phase');

const { validate } = require('indicative');


// Display list of all Task.
exports.task_list = function(req, res) {
    Task.find({},
        "_id _projectId _phaseId name number start_date end_date priority status percentageComplete description deletedAt"
        , function (err, result) {
            if (err) {
                return res.json({
                    message: "Unable to get all task",
                    error: err
                });
            }
            else {
                return res.json(result);
            }
        }).populate('project phase');
};


// Display detail page for a specific Task.
exports.task_detail = function(req, res) {
    Task.findById({'_id': req.params.id},
        "_id _projectId _phaseId name number start_date end_date priority status percentageComplete description deletedAt"
        , function (err, result) {
            if (err) {
                return res.json({
                    message: "Unable to get the task",
                    error: err
                });
            }
            else {
                return res.json(result);
            }
        }).populate('employee phase');
};

// Display detail page for a specific Task.
exports.task_detail = function(req, res) {
    Task.findById({'_id': req.params.id},
        "_id _projectId _phaseId name number start_date end_date priority status percentageComplete description deletedAt"
        , function (err, result) {
            if (err) {
                return res.json({
                    message: "Unable to get the task",
                    error: err
                });
            }
            else {
                return res.json(result);
            }
        }).populate('employee phase');
};

// Display Task create form on GET.
exports.task_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task create GET');
};


// Handle Task create on POST.
exports.task_create_post = function(req, res) {

    const data ={
        name: req.body.name,
        number: req.body.number,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        priority: req.body.priority,
        status: req.body.status,
        percentageComplete: req.body.percentageComplete,
        description: req.body.description,
        deletedAt: req.body.deletedAt
    };

    const rules = {
        name: 'required',
        number: 'required',
        start_date: 'required',
        end_date: 'required',
        priority: 'required',
        status: 'required',
        percentageComplete: 'required',
        description: 'required',
        employee: 'alpha_numeric',
        phase: 'required|alpha_numeric',
    };

    validate(data, rules)
        .then(() => {
            const task = new Task({
                name: req.body.name,
                number: req.body.number,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                priority: req.body.priority,
                status: req.body.status,
                percentageComplete: req.body.percentageComplete,
                description: req.body.description,
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


// Display Task delete form on GET.
exports.task_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task delete GET');
};


// Handle Task delete on POST.
exports.task_delete_post = function(req, res) {
    Task.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to Delete Task",
                error: err
            });
        }
        else{
            return res.json({
                message: "Deleted Successfully",
                result: result
            });
        }
    });
};


// Display Task update form on GET.
exports.task_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task update GET');
};


// Handle Task update on POST.
exports.task_update_post = function(req, res) {

    var task = new Task(
        {

        }
    );

    Task.findByIdAndUpdate(req.params.id, task, {}, function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to Update Task",
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