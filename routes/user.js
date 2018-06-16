var express = require('express');
var router = express.Router();

var authentication = require('../authentication');
var user_controller = require('../Controllers/userController');


    /// USER ROUTES ///


// POST request for creating User.
router.post('/create', authentication, user_controller.user_create_post);

// POST request to delete User.
router.delete('/:id/delete', authentication, user_controller.user_delete_post);

// POST request to update User.
router.put('/:id/update', authentication, user_controller.user_delete_post);

// GET request for one User.
router.get('/:id', authentication, user_controller.user_detail);

// GET request for one User.
//router.get('/user/:id/projects', user_controller.user_project_detail);

// GET request for list of all Task.
router.get('/', user_controller.user_list);


module.exports = router;