var express = require('express');
var router = express.Router();

var authentication = require('../authentication');
var task_controller = require('../Controllers/taskController');


    /// TASK ROUTES ///


// POST request for creating Task.
router.post('/create', authentication.allMembers, task_controller.task_create_POST);//Admin, PM, Member

// POST request to delete Task.
router.delete('/:id/delete', authentication.AdminAndProManagerOnly, task_controller.task_delete_DELETE);//Admin, PM

// POST request to update Task.
router.put('/:id/update', authentication.allMembers, task_controller.task_update_PUT);//Admin, PM, Member

// GET request for one Task.
router.get('/:id', authentication.AdminAndProManagerOnly, task_controller.task_detail);//Admin, PM

// GET request for list of all Task.
router.get('/', authentication.AdminOnly, task_controller.task_list);//Admin


module.exports = router;