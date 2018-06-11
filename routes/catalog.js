var express = require('express');
var router = express.Router();

//Require our controllers
var project_controller = require('../Controllers/projectController');
var phase_controller = require('../Controllers/phaseController');
var task_controller = require('../Controllers/taskController');
var resource_controller = require('../Controllers/resourceController');
var user_controller = require('../Controllers/userController');


    /// PROJECT ROUTES ///

// // GET request for creating a Task. NOTE This must come before routes that display Task (phase id).
// router.get('/task/create', task_controller.task_create_get);
//
// // POST request for creating Task.
// router.post('/task/create', task_controller.task_create_post);
//
// // GET request to delete Task.
// router.get('/task/:id/delete', task_controller.task_delete_get);
//
// // POST request to delete Task.
// router.post('/task/:id/delete', task_controller.task_delete_post);
//
// // GET request to update Task.
// router.get('/task/:id/update', task_controller.task_update_get);
//
// // POST request to update Task.
// router.post('/task/:id/update', task_controller.task_delete_post);
//
// // GET request for one Task.
// router.get('/task/:id', task_controller.task_detail);
//
// // GET request for list of all Task.
// router.get('/tasks', task_controller.task_list);


    /// PHASE ROUTES ///

// // GET request for creating a Task. NOTE This must come before routes that display Task (phase id).
// router.get('/task/create', task_controller.task_create_get);
//
// // POST request for creating Task.
// router.post('/task/create', task_controller.task_create_post);
//
// // GET request to delete Task.
// router.get('/task/:id/delete', task_controller.task_delete_get);
//
// // POST request to delete Task.
// router.post('/task/:id/delete', task_controller.task_delete_post);
//
// // GET request to update Task.
// router.get('/task/:id/update', task_controller.task_update_get);
//
// // POST request to update Task.
// router.post('/task/:id/update', task_controller.task_delete_post);
//
// // GET request for one Task.
// router.get('/task/:id', task_controller.task_detail);
//
// // GET request for list of all Task.
// router.get('/tasks', task_controller.task_list);


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

// // GET request for creating a Task. NOTE This must come before routes that display Task (phase id).
// router.get('/task/create', task_controller.task_create_get);
//
// // POST request for creating Task.
// router.post('/task/create', task_controller.task_create_post);
//
// // GET request to delete Task.
// router.get('/task/:id/delete', task_controller.task_delete_get);
//
// // POST request to delete Task.
// router.post('/task/:id/delete', task_controller.task_delete_post);
//
// // GET request to update Task.
// router.get('/task/:id/update', task_controller.task_update_get);
//
// // POST request to update Task.
// router.post('/task/:id/update', task_controller.task_delete_post);
//
// // GET request for one Task.
// router.get('/task/:id', task_controller.task_detail);
//
// // GET request for list of all Task.
// router.get('/tasks', task_controller.task_list);

module.exports = router;