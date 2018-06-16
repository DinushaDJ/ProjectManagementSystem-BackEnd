var express = require('express');
var router = express.Router();

var authentication = require('../authentication');
var task_controller = require('../Controllers/taskController');


    /// TASK ROUTES ///


// POST request for creating Task.
router.post('/create', authentication, task_controller.task_create_post);//PM, Member

// POST request to delete Task.
router.delete('/:id/delete', authentication, task_controller.task_delete_post);//Admin, PM

// POST request to update Task.
router.put('/:id/update', authentication, task_controller.task_delete_post);//PM, Member

// GET request for one Task.
router.get('/:id', authentication, task_controller.task_detail);//Admin, PM

// GET request for list of all Task.
router.get('/', task_controller.task_list);//Admin


module.exports = router;