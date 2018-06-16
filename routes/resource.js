var express = require('express');
var router = express.Router();

var authentication = require('../authentication');
var resource_controller = require('../Controllers/resourceController');


    /// RESOURCE ROUTES ///


// POST request for creating Task.
router.post('/create', authentication, resource_controller.resource_create_post);//Admin, PM

// POST request to delete Task.
router.delete('/:id/delete', authentication, resource_controller.resource_delete_post);//Admin, PM

// POST request to update Task.
router.put('/:id/update', authentication, resource_controller.resource_delete_post);//PM, Member

// GET request for one Task.
router.get('/:id', authentication, resource_controller.resource_detail);//Admin

// GET request for list of all Task.
router.get('/', resource_controller.resource_list);//Admin, PM


module.exports = router;