var express = require('express');
var router = express.Router();

var authentication = require('../authentication');
var resource_controller = require('../Controllers/resourceController');


    /// RESOURCE ROUTES ///


// POST request for creating Task.
router.post('/create', authentication.AdminAndProManagerOnly, resource_controller.resource_create_POST);//Admin, PM

// POST request to delete Task.
router.delete('/:id/delete', authentication.AdminAndProManagerOnly, resource_controller.resource_delete_DELETE);//Admin, PM

// POST request to update Task.
router.put('/:id/update', authentication.allMembers, resource_controller.resource_update_PUT);//Admin, PM, Member

// GET request for one Task.
router.get('/:id', authentication.AdminAndProManagerOnly, resource_controller.resource_detail);//Admin, PM

// GET request for list of all Task.
router.get('/',
    //authentication.AdminOnly,
    resource_controller.resource_list
);//Admin


module.exports = router;