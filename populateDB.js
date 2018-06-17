#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async');
var Project = require('./models/project');
var Phase = require('./models/phase');
var Task = require('./models/task');
var Resource = require('./models/resource');
var User = require('./models/user');
//var userProject = require('./models/userProject');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var projects = [];
var phases = [];
var tasks = [];
var resources = [];
var users = [];

//populate data to Project
function projectCreate(cb) {

    var project = new Project ({
        _userId: users[0],
        _resourceId: resources[0],
        _phase: phases[0],
        name:'Project Management',
        type:'IT',
        start_date:'2017-06-06',
        end_date:'2018-02-06',
        budget:45000,
        status: 'Ongoing',
        percentageComplete:40.5,
        description: 'Project Management tool',
        deletedAt: null
    });

    project.save( function (err)
    {
        if (err) {
            cb('project', null);
            return;
        }
        console.log('New Project: ' + project);
        projects.push(project);
        cb(null, project);
    })
}

//populate data to Resource
function resourceCreate(cb) {

    var resource = new Resource({
        //_projectId: [projects[0]],
        name: 'server',
        type: 'Facility',
        status: 'Available',
        deletedAt: null
    });

    resource.save(function (err) {
        if (err) {
            cb('resource', null);
            return
        }
        console.log('New Resource ' + resource);
        resources.push(resource);
        cb(null, resource);
    }  );
}

//populate data to task
function taskCreate(cb) {

    var task = new Task({
        //_projectId: projects[0],
        _phaseId: phases[0],
        name: 'Phase 1',
        number: 1,
        start_date:'2017-06-06',
        end_date:'2018-02-06',
        priority: 'High',
        status: 'Ongoing',
        percentageComplete: 91,
        description: 'Create Models ',
        deletedAt: null
    });

    task.save(function (err) {
        if (err) {
            cb('task', null);
            return
        }
        console.log('New Task ' + task);
        tasks.push(task);
        cb(null, task)
    }  );
}

//populate data to Phase
function phaseCreate(cb) {

    var phase = new Phase({
        _projectId: projects[0],
        _task: tasks[0],
        name: 'Requirement gathering',
        start_date: '2017-06-06',
        end_date: '2017-07-06',
        duration: '1 Month',
        status: 'Complete',
        percentageComplete: 100.0,
        description: 'Gather requirements to the project',
        deletedAt: null
    });

    phase.save(function (err) {
        if (err) {
            cb('phase', null);
            return
        }
        console.log('New Phase ' + phase);
        phases.push(phase);
        cb(null, phase)
    }  );
}

//populate data to User
function userCreate(cb) {

    var user = new User({
        _projectId: projects[0],
        username: 'DinushaDJ',
        email: 'dinusha.jayashan01@gmail.com',
        password: 'dinusha123',
        userType: 'Member'
    });

    user.save(function (err) {
        if (err) {
            cb('user', null);
            return
        }
        console.log('New User ' + user);
        users.push(user);
        cb(null, user)
    }  );
}


function createUserResource(cb) {
    async.parallel([
            function(callback) {
                resourceCreate(callback);
            },
            function (callback) {
                userCreate(callback);
            }
        ],
        // optional callback
        cb);
}

// function createUser(cb) {
//     async.parallel([
//             function(callback) {
//                 userCreate(callback);
//             }
//         ],
//         // optional callback
//         cb);
// }

function createProject(cb) {
    async.parallel([
            function(callback) {
                projectCreate(callback);
            }
        ],
        // optional callback
        cb);
}

function createPhase(cb) {
    async.parallel([
            function(callback) {
                phaseCreate(callback);
            }
        ],
        // optional callback
        cb);
}

function createTask(cb) {
    async.parallel([
            function(callback) {
                taskCreate(callback);
            }
        ],
        // optional callback
        cb);
}

async.series([
        createUserResource,
        createProject,
        createPhase,
        createTask
    ],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('All done');

    }
    // All done, disconnect from database
    mongoose.connection.close();
});



