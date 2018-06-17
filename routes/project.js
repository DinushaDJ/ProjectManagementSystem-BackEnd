var express = require('express');
var router = express.Router();

var project_controller = require('../Controllers/projectController');
var login_authentication = require('../authentication');
//var authentication = require('../authentication').AdminOnly;
//var projectMiddleware = require('../Middleware/project');


    /// PROJECT ROUTES ///


// POST request for creating Project.
router.post('/create', login_authentication.allMembers, project_controller.project_create_POST);//Admin, PM

// POST request to delete Project.
router.delete('/:id/delete', login_authentication.allMembers, project_controller.project_delete_DELETE);//Admin, PM

// POST request to update Project.
router.put('/:id/update', login_authentication.allMembers, project_controller.project_update_PUT);//Admin, PM, Member

// GET request for one Project.
router.get('/:id', login_authentication.AdminAndProManagerOnly, project_controller.project_detail);//Admin,PM

// GET request for list of all Project.
router.get('/', login_authentication.allMembers, project_controller.project_list);//Admin


module.exports = router;