const Phase = require('../Models/phase');
//const Project = require('../models/project');
//const Phase = require('../models/phase');

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
        }).populate('project');
};

// Display detail page for a specific Phase.
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
        }).populate('project');
};

// Display Phase create form on GET.
exports.phase_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task create GET');
};

// Handle Phase create on POST.
exports.phase_create_post = function(req, res) {

    const data ={
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


// Display Phase delete form on GET.
exports.phase_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task delete GET');
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
            return res.json({
                message: "Deleted Successfully",
                result: result
            });
        }
    });
};


// Display Phase update form on GET.
exports.phase_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task update GET');
};


// Handle Phase update on POST.
exports.phase_update_post = function(req, res) {

    var task = new Phase(
        {

        }
    );

    Phase.findByIdAndUpdate(req.params.id, task, {}, function (err, result) {
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