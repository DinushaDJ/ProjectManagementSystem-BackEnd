const Phase = require('../Models/phase');
const Task = require('../Models/task');

const { validate } = require('indicative');


// Display list of all Phases.
exports.phase_list = function(req, res) {
    Phase.find({},
        "_id _projectId name start_date end_date duration status percentageComplete description deletedAt"
        , function (err, result) {
            if (err) {
                return res.json({
                    message: "Unable to get all Phases",
                    error: err
                });
            }
            else {
                return res.json(result);
            }
        }).populate('_projectId');
};


// Display a specific Phase.
exports.phase_detail = function(req, res) {
    Phase.findById({'_id': req.params.id},
        "_id _projectId name start_date end_date duration status percentageComplete description deletedAt"
        , function (err, result) {
            if (err) {
                return res.json({
                    message: "Unable to get the Phase",
                    error: err
                });
            }
            else {
                return res.json(result);
            }
        }).populate('_projectId');
};


// Handle Phase create on POST.
exports.phase_create_post = function(req, res) {

    const data ={
        _projectId: req.body._projectId,
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        duration: req.body.duration,
        status: req.body.status,
        percentageComplete: req.body.percentageComplete,
        description: req.body.description,
        deletedAt: req.body.deletedAt
    };

    const rules = {
        _projectId: 'required|alpha_numeric',
        name: 'required',
        start_date: 'required',
        end_date: 'required',
        duration: 'requires',
        status: 'required',
        percentageComplete: 'required',
        description: 'required',
    };

    validate(data, rules)
        .then(() => {
            const phase = new Phase({
                _projectId: req.body._projectId,
                name: req.body.name,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                duration: req.body.duration,
                status: req.body.status,
                percentageComplete: req.body.percentageComplete,
                description: req.body.description,
                deletedAt: req.body.deletedAt
            });
            phase.save(function (err) {
                if (err) {
                    return res.json({err});
                }
                return res.json(phase);
            });
        })
        .catch((errors) => {
            return res.json({errors});
        });
};


// Handle Phase delete on POST.
exports.phase_delete_post = function(req, res) {
    Phase.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to Delete Phase",
                error: err
            });
        }
        else{
            //delete all the tasks of project specified by the passed project Id
            Task.deleteMany({'_phaseId': req.params.id}, function (err, result) {
                if (err) {
                    return res.json({
                        message: "Unable to Delete Task",
                        error: err
                    });
                }
            });
        }
        return res.json({
            message: "Deleted Successfully",
            result: result
        });
    });
};


// Handle Phase update on POST.
exports.phase_update_post = function(req, res) {

    const data = {
        _projectId: req.body._projectId,
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        duration: req.body.duration,
        status: req.body.status,
        percentageComplete: req.body.percentageComplete,
        description: req.body.description,
        deletedAt: req.body.deletedAt
    };

    const rules = {
        _projectId: 'required|alpha_numeric',
        name: 'required',
        start_date: 'required',
        end_date: 'required',
        duration: 'required',
        status: 'required',
        percentageComplete: 'required',
        description: 'required',
    };

    validate(data, rules)
        .then(() => {
            Phase.findByIdAndUpdate(req.params.id, data, function (err, result) {
                if (err) {
                    return res.json({
                        message: "Unable to Update Phase",
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


// Get the tasks of a specific Phase
exports.phase_task_get = function (req, res) {

    Task.findById()
};