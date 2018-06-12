var express = require('express');
var router = express.Router();

//Require our controllers
var project_controller = require('../Controllers/projectController');
var phase_controller = require('../Controllers/phaseController');
var task_controller = require('../Controllers/taskController');
var resource_controller = require('../Controllers/resourceController');
var user_controller = require('../Controllers/userController');


    /// PROJECT ROUTES ///

// GET request for creating a Task. NOTE This must come before routes that display Task (phase id).
router.get('/project/create', project_controller.project_create_get);

// POST request for creating Task.
router.post('/project/create', project_controller.project_create_post);

// GET request to delete Task.
router.get('/project/:id/delete', project_controller.project_delete_get);

// POST request to delete Task.
router.post('/project/:id/delete', project_controller.project_create_post);

// GET request to update Task.
router.get('/project/:id/update', project_controller.project_update_get);

// POST request to update Task.
router.post('/project/:id/update', project_controller.project_update_post);

// GET request for one Task.
router.get('/project/:id', project_controller.project_detail);

// GET request for list of all Task.
router.get('/projects', project_controller.project_list);


    /// PHASE ROUTES ///

// GET request for creating a Task. NOTE This must come before routes that display Task (phase id).
router.get('/phase/create', phase_controller.phase_create_get);

// POST request for creating Task.
router.post('/phase/create', phase_controller.phase_create_post);

// GET request to delete Task.
router.get('/phase/:id/delete', phase_controller.phase_delete_get);

// POST request to delete Task.
router.post('/phase/:id/delete', phase_controller.phase_delete_post);

// GET request to update Task.
router.get('/phase/:id/update', phase_controller.phase_update_get);

// POST request to update Task.
router.post('/phase/:id/update', phase_controller.phase_delete_post);

// GET request for one Task.
router.get('/phase/:id', phase_controller.phase_detail);

// GET request for list of all Task.
router.get('/phases', phase_controller.phase_list);


    /// TASK ROUTES ///

// GET request for creating a Task. NOTE This must come before routes that display Task (phase id).
router.get('/task/create', task_controller.task_create_get);

// POST request for creating Task.
router.post('/task/create', task_controller.task_create_post);

// GET request to delete Task.
router.get('/task/:id/delete', task_controller.task_delete_get);

// POST request to delete Task.
router.post('/task/:id/delete', task_controller.task_delete_post);

// GET request to update Task.
router.get('/task/:id/update', task_controller.task_update_get);

// POST request to update Task.
router.post('/task/:id/update', task_controller.task_delete_post);

// GET request for one Task.
router.get('/task/:id', task_controller.task_detail);

// GET request for list of all Task.
router.get('/tasks', task_controller.task_list);


    /// RESOURCE ROUTES ///

// GET request for creating a Task. NOTE This must come before routes that display Task (phase id).
router.get('/resource/create', resource_controller.resource_create_get);

// POST request for creating Task.
router.post('/resource/create', resource_controller.resource_create_post);

// GET request to delete Task.
router.get('/resource/:id/delete', resource_controller.resource_delete_get);

// POST request to delete Task.
router.post('/resource/:id/delete', resource_controller.resource_delete_post);

// GET request to update Task.
router.get('/resource/:id/update', resource_controller.resource_update_get);

// POST request to update Task.
router.post('/resource/:id/update', resource_controller.resource_delete_post);

// GET request for one Task.
router.get('/resource/:id', resource_controller.resource_detail);

// GET request for list of all Task.
router.get('/resources', resource_controller.resource_list);

module.exports = router;