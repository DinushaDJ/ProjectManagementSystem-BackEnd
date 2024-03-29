var express = require('express');
var router = express.Router();

var authentication = require('../authentication');
var phase_controller = require('../Controllers/phaseController');


    /// PHASE ROUTES ///


// POST request for creating Task.
router.post(
    '/create',
    //authentication.AdminAndProManagerOnly,
    phase_controller.phase_create_POST
);//Admin, PM

// POST request to delete Task.
router.delete('/:id/delete', authentication.AdminAndProManagerOnly, phase_controller.phase_delete_DELETE);//Admin, PM

// POST request to update Task.
router.put('/:id/update', authentication.allMembers, phase_controller.phase_update_PUT);//Admin, PM, Member

// GET request for one Task.
router.get('/:id', authentication.AdminAndProManagerOnly, phase_controller.phase_detail);//Admin, PM

// GET request for list of all Task.
router.get(
    '/',
    //authentication.AdminOnly,
    phase_controller.phase_list
);//Admin


module.exports = router;