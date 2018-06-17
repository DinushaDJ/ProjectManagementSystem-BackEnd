const Resource = require('../Models/resource');
const resourceMiddleware = require('../Middleware/resource');

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


// Handle Resource create on POST.
exports.resource_create_POST = function(req, res) {

    const data ={
        name: req.body.name,
        type: req.body.type,
        status: req.body.status,
        deletedAt: req.body.deletedAt
    };

    const rules = {
        name: 'required',
        type: 'required|in:Equipment,Facility,Funds',
        status: 'required|in:Available,Not Available',
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
                    return res.status(404).json({err});
                }
                return res.status(200).json(task);
            });
        })
        .catch((errors) => {
            return res.status(200).json({errors});
        });
};


// Handle Resource delete on DELETE.
exports.resource_delete_DELETE = function(req, res) {
    Resource.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) {
            return res.status(404).json({
                message: "Unable to Delete Resource",
                error: err
            });
        }
        resourceMiddleware.projectResources(req.params.id, function(resources) {
            if (err) {
                return res.status(404).json({
                    message: "Unable to Delete Resource",
                    error: err
                });
            }
            //delete the resource Id from all the Projects
            for(let i = 0; i < resources.length; i++) {
                resourceMiddleware.deleteResourceIdFromProject(resources[i], req.params.id);
            }
            return res.status(200).json({
                message: "Deleted Successfully",
                //result: [resourceArray]
            });
        });
    });
};


// Handle Resource update on POST.
exports.resource_update_PUT = function(req, res) {

    const data = {
        name: req.body.name,
        type: req.body.type,
        status: req.body.status,
        deletedAt: req.body.deletedAt
    };

    const rules = {
        name: 'required',
        type: 'required|in:Equipment,Facility,Funds',
        status: 'required|in:Available,Not Available',
    };

    validate(data, rules)
        .then(() => {
            Resource.findByIdAndUpdate(req.params.id, data, function (err, result) {
                if (err) {
                    return res.status(404).json({
                        message: "Unable to Update Resource",
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