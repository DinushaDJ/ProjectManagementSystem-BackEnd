var express = require('express');
var router = express.Router();

var project_controller = require('../Controllers/projectController');
var authentication = require('../authentication');
//var projectMiddleware = require('../Middleware/project');


    /// PROJECT ROUTES ///


// POST request for creating Task.
router.post('/create', authentication, project_controller.project_create_post);//PM

// POST request to delete Task.
router.delete('/:id/delete', authentication, project_controller.project_delete_post);//Admin, PM

// POST request to update Task.
router.put('/:id/update', authentication, project_controller.project_update_post);//Admin, PM, Member

// GET request for one Task.
router.get('/:id', authentication, project_controller.project_detail);//Admin

// GET request for list of all Task.
router.get('/', project_controller.project_list);//Admin, PM


module.exports = router;