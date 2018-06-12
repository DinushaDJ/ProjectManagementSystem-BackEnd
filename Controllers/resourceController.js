const Resource = require('../Models/resource');
//const Project = require('../models/project');
//const Phase = require('../models/phase');

const { validate } = require('indicative');


// Display list of all Resources.
exports.resource_list = function(req, res) {
    Resource.find({},
        "_id name type status deletedAt"
        , function (err, result) {
            if (err) {
                return res.json({
                    message: "Unable to get all Resources",
                    error: err
                });
            }
            else {
                return res.json(result);
            }
        })
        //.populate('project phase');
};


// Display detail page for a specific Resource.
exports.resource_detail = function(req, res) {
    Resource.findById({'_id': req.params.id},
        "_id name type status deletedAt"
        , function (err, result) {
            if (err) {
                return res.json({
                    message: "Unable to get the Resource",
                    error: err
                });
            }
            else {
                return res.json(result);
            }
        })
        //.populate('employee phase');
};

// Display Resource create form on GET.
exports.resource_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task create GET');
};


// Handle Resource create on POST.
exports.resource_create_post = function(req, res) {

    const data ={
        name: req.body.name,
        type: req.body.type,
        status: req.body.status,
        deletedAt: req.body.deletedAt
    };

    const rules = {
        name: 'required',
        type: 'required',
        status: 'required',
    };

    validate(data, rules)
        .then(() => {
            const task = new Resource({
                name: req.body.name,
                type: req.body.type,
                status: req.body.status,
                deletedAt: req.body.deletedAt
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


// Display Resource delete form on GET.
exports.resource_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task delete GET');
};


// Handle Resource delete on POST.
exports.resource_delete_post = function(req, res) {
    Resource.findByIdAndDelete(req.params.id, function (err, result) {
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


// Display Resource update form on GET.
exports.resource_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task update GET');
};


// Handle Resource update on POST.
exports.resource_update_post = function(req, res) {

    var task = new Resource(
        {

        }
    );

    Resource.findByIdAndUpdate(req.params.id, task, {}, function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to Update Resource",
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