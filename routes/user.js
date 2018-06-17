var express = require('express');
var router = express.Router();

var authentication = require('../authentication');
var user_controller = require('../Controllers/userController');
//var userMiddleware = require('../Middleware/user');
var project_controller = require('../Controllers/projectController');

    /// USER ROUTES ///


// POST request for creating User.
router.post('/create', authentication.AdminOnly, user_controller.user_create_POST);//Admin

// POST request to delete User.
router.delete('/:id/delete', authentication.AdminOnly, user_controller.user_delete_DELETE);//Admin

// POST request to update User.
router.put('/:id/update', authentication.allMembers, user_controller.user_update_PUT);//Admin, PM, Member

// GET request for one User.
router.get('/:id', authentication.AdminOnly, user_controller.user_detail);//Admin, Member

// GET request for one User.
//router.get('/user/:id/projects', user_controller.user_project_detail);

// GET request for list of all Users.
router.get('/', authentication.AdminOnly, user_controller.user_list);//Admin

//Get the projects of a LoggedIn User
//router.get('/:id/projects', userMiddleware.userProjects);

//
router.get('/:userId/projects', user_controller.loggedIn_project);

//
router.get('/:userId/projects/:id', project_controller.project_detail);


module.exports = router;