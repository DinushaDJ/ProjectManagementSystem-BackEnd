const Project = require('../Models/project');
//const User = require('../Models/user');

const { validate } = require('indicative');


// Display list of all Projects.
exports.project_list = function(req, res) {
    Project.find({},
        "_id _userId _resourceId name type start_date end_date budget status percentageComplete description deletedAt"
        , function (err, result) {
            if (err) {
                return res.json({
                    message: "Unable to get all projects",
                    error: err
                });
            }
            else {
                return res.json(result);
            }
        }).
    populate('_userId _resourceId');
};


// Display detail page for a specific Project.
exports.project_detail = function(req, res) {
    Project.findById({'_id': req.params.id},
        "_id _userId _resourceId name type start_date end_date budget status percentageComplete description deletedAt"
        , function (err, result) {
            if (err) {
                return res.json({
                    message: "Unable to get the project",
                    error: err
                });
            }
            else {
                return res.json(result);
            }
        })
        .populate('_userId _resourceId');
};

// Display Project create form on GET.
exports.project_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task create GET');
};


// Handle Project create on POST.
exports.project_create_post = function(req, res) {

    const data ={
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
        name: 'required',
        type: 'required',
        start_date: 'required',
        end_date: 'required',
        budget: 'required',
        status: 'required',
        percentageComplete: 'required',
        description: 'required',
    };

    validate(data, rules)
        .then(() => {
            const task = new Project({
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


// Display Project delete form on GET.
exports.project_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task delete GET');
};


// Handle Project delete on POST.
exports.project_delete_post = function(req, res) {
    Project.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to Delete Project",
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


// Display Project update form on GET.
exports.project_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task update GET');
};


// Handle Project update on POST.
exports.project_update_post = function(req, res) {

    var task = new Project(
        {

        }
    );

    Project.findByIdAndUpdate(req.params.id, task, {}, function (err, result) {
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
