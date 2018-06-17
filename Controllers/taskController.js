const Task = require('../Models/task');

const { validate } = require('indicative');


// Find the tasks of a Phase
exports.index = (req, res) => {

    const {
        phaseId
    } = req.params;

    console.log(phaseId);

    let tasks = Task.find({_phaseId: phaseId}, (err, result) => {
        if (err)
        {
            return res.json({
                status: "ERROR",
                message: err
            });
        }

        return res.status(200).json({
            status: "OK",
            data: result
        })

    })

};


// Get the tasks by Id
exports.show = (req, res) => {

    const {
        phaseId,
        taskId
    } = req.params;

    let task = Task.find({_id: taskId}, (err, result) => {

        if (err)
        {
            return res.json({
                status: "ERROR",
                message: err
            });
        }

        return res.status(200).json({
            status: "OK",
            data: result
        })

    });

};


// Display list of all Task.
exports.task_list = function(req, res) {
    Task.find({},
    "_id _projectId _phaseId name number start_date end_date priority status percentageComplete description deletedAt"
    , function (err, result) {
        if (err) {
            return res.status(404).json({
                message: "Unable to get all task",
                error: err
            });
        }
        else {
            return res.status(200).json(result);
        }
    }).populate('_projectId _phaseId');
};


// Display detail page for a specific Task.
exports.task_detail = function(req, res) {
    Task.findById({'_id': req.params.id},
        "_id _phaseId name number start_date end_date priority status percentageComplete description deletedAt"
        , function (err, result) {
        if (err) {
            return res.status(200).json({
                message: "Unable to get the task",
                error: err
            });
        }
        else {
            return res.status(200).json(result);
        }
    }).populate('_phaseId');
};


// Handle Task create on POST.
exports.task_create_POST = function(req, res) {

    const data ={
        _phaseId: req.body._phaseId,
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
        _phaseId: 'required|alpha_numeric',
        name: 'required',
        number: 'required|number',
        start_date: 'required|date',
        end_date: 'required|date',
        priority: 'required|in:High,Low,Moderate',
        status: 'required|in:Complete,Not Complete,Ongoing',
        percentageComplete: 'required',
        description: 'required',
    };

    validate(data, rules)
        .then(() => {
            const task = new Task({
                _phaseId: req.body._phaseId,
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
                    return res.status(404).json({err});
                }
                return res.status(200).json(task);
            });
        })
        .catch((errors) => {
            return res.status(403).json({errors});
        });
};


// Handle Task delete on DELETE.
exports.task_delete_DELETE = function(req, res) {
    Task.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) {
            return res.status(404).json({
                message: "Unable to Delete Task",
                error: err
            });
        }
        else{
            return res.status(200).json({
                message: "Deleted Successfully",
                result: result
            });
        }
    });
};


// Handle Task update on PUT.
exports.task_update_PUT = function(req, res) {

    const data = {
        _phaseId: req.body._phaseId,
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
        _phaseId: 'required|alpha_numeric',
        name: 'required',
        number: 'required',
        start_date: 'required',
        end_date: 'required',
        priority: 'required|in: High,Low,Moderate',
        status: 'required|in: Complete,Not Complete, Ongoing',
        percentageComplete: 'required',
        description: 'required',
    };

    validate(data, rules)
        .then(() => {
            Task.findByIdAndUpdate(req.params.id, data, function (err, result) {
                if (err) {
                    return res.status(404).json({
                        message: "Unable to Update Phase",
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