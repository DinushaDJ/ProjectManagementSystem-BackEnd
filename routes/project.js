var express = require('express');
var router = express.Router({mergeParams: true});

var project_controller = require('../Controllers/projectController');

const phaseController = require('../Controllers/phaseController');
const taskController = require('../Controllers/taskController');

var login_authentication = require('../authentication');


//var authentication = require('../authentication').AdminOnly;
//var projectMiddleware = require('../Middleware/project');


    /// PROJECT ROUTES ///


// POST request for creating Project.
router.post(
    '/create',
    login_authentication.AdminAndProManagerOnly,
    project_controller.project_create_POST
);//Admin, PM

// POST request to delete Project.
router.delete(
    '/:id/delete',
    //login_authentication.AdminAndProManagerOnly,
    project_controller.project_delete_DELETE
);//Admin, PM

// POST request to update Project.
router.put('/:id/update', login_authentication.allMembers, project_controller.project_update_PUT);//Admin, PM, Member

// GET request for one Project.
router.get('/:id', login_authentication.AdminAndProManagerOnly, project_controller.project_detail);//Admin,PM

// GET request for list of all Project.
router.get(
    '/',
    //login_authentication.AdminOnly,
    project_controller.project_list
);//Admin

// GET all the phases of a Project
router.get('/:id/phases', project_controller.project_phase_list);

// GET a specific Phase of a Project
router.get('/:id/phases/:id', phaseController.phase_detail);

// GET all the tasks of a specific Phase from Project
router.get('/:id/phases/:id/tasks', phaseController.phase_task_list);

// GET the tasks of a specific phase and specific project
router.get('/:id/phases/:id/tasks/:id', taskController.task_detail);


// GET all the tasks of a specific Phase from Project
router.get('/:projectId/phases/:phaseId/tasks', taskController.index);

// GET the tasks of a specific phase and specific project
router.get('/:projectId/phases/:phaseId/tasks/:taskId', taskController.show);

//router.get('/:userId/projects', project_controller.loggedIn_project);

module.exports = router;