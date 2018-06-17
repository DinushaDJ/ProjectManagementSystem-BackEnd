var chakram = require("chakram");
var expect = chakram.expect;
//var before = chakram.before;
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

var authentication = require('../authentication');

let authToken;

describe('Project', function() {

    //Testing Login
    it('Login', function () {
        var login = {
            username: "DinushaDJ",
            password: "dinusha123",
            userType: "Member"
        };
        var response = chakram.post("http://localhost:3000/login", login);

       // authToken = login.body.token;

        expect(response).to.have.status(200);
        expect(response).to.have.json((json) => {

            //console.log(json);
            authToken = json.token;

        });

        return chakram.wait();
    });

    //get the list of all the projects
    describe('GET /projects', function() {
        it('returns a list of projects', function() {

            var getProject_list = chakram.get("http://localhost:3000/projects", {
                headers: {
                    'x-access-token': authToken
                }
            });
            return expect(getProject_list).to.have.status(200);
        });
    });

    //delete a specific project
    // describe('DELETE /projects/:id/delete', function() {
    //     it('delete a project', function() {
    //         var project_delete = chakram.delete("http://localhost:3000/projects/5b2626186fd1cb4c985237e2/delete", [], {
    //             headers: {
    //                 'x-access-token': authToken
    //             }
    //         });
    //         return expect(project_delete).to.have.status(200);
    //     });
    // });


    //create a project
    describe('POST /projects/create', function() {

        it('create a project', function() {
            var project = {
                _userId: ["5b2626186fd1cb4c985237e1"],
                _resourceId: ["5b2626186fd1cb4c985237e0"],
                name : "ADB",
                type: "database",
                start_date: Date.now(),
                end_date: Date.now(),
                budget: 50000,
                status: "Ongoing",
                percentageComplete: 60.0,
                description: "ADB database",
                deletedAt: null
            };
            var project_post = chakram.post("http://localhost:3000/projects/create", project, {
                headers: {
                    'x-access-token': authToken
                }
            });
            return expect(project_post).to.have.status(200);
        });
    });


    //update a project
    describe('PUT /projects/:id/update', function() {

        it('update a project', function() {
            var project = {
                _userId: ["5b2626186fd1cb4c985237e1"],
                _resourceId: ["5b2626186fd1cb4c985237e0"],
                name : "MEAN Stack",
                type: "Web application",
                start_date: Date.now(),
                end_date: Date.now(),
                budget: 500000,
                status: "Ongoing",
                percentageComplete: 0.0,
                description: "MEKA AMARUI"
            };
            var project_put = chakram.put("http://localhost:3000/projects/5b2636683cfb32525c59ed1e/update", project, {
                headers: {
                    'x-access-token': authToken
                }
            });
            return expect(project_put).to.have.status(200);
        });
    });
});