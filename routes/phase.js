var express = require('express');
var router = express.Router();

var authentication = require('../authentication');
var phase_controller = require('../Controllers/phaseController');


    /// PHASE ROUTES ///


// POST request for creating Task.
router.post('/create', authentication, phase_controller.phase_create_post);//Admin, PM

// POST request to delete Task.
router.delete('/:id/delete', authentication, phase_controller.phase_delete_post);//Admin, PM

// POST request to update Task.
router.put('/:id/update', authentication, phase_controller.phase_delete_post);//Admin, PM, Member

// GET request for one Task.
router.get('/:id', authentication, phase_controller.phase_detail);//Admin, PM

// GET request for list of all Task.
router.get('/', phase_controller.phase_list);//Admin, PM


module.exports = router;