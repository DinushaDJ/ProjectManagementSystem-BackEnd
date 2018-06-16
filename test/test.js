var chakram = require("chakram");
var expect = chakram.expect;
//var before = chakram.before;
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;


describe('Project', function() {

    //get the list of all the projects
    describe('GET /projects', function() {
        it('returns a list of projects', function() {
            var getProject_list = chakram.get("http://localhost:3000/projects");
            return expect(getProject_list).to.have.status(200);
        });
    });

    //delete a specific project
    describe('DELETE /projects/:id/delete', function() {
        it('delete a project', function() {
            var project_delete = chakram.delete("http://localhost:3000/project/5b2340c2ead73e27749f8080/delete");
            return expect(project_delete).to.have.status(200);
        });
    });

    //create a project
    describe('POST /project/create', function() {

        it('create a project', function() {
            var project = {
                _userId: ObjectId("5b2216e4c0af2e0c6053c360"),
                _resourceId: ObjectId("5b2216e4c0af2e0c6053c35f"),
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
            var project_post = chakram.post("http://localhost:3000/project/create", project);
            return expect(project_post).to.have.status(200);
        });
    });

    //update a project
    describe('PUT /project/:id/update', function() {

        it('update a project', function() {
            var project = {
                name : "MEAN Stack",
                type: "Web application"
            };
            var project_put = chakram.put("http://localhost:3000/project/5b2216e4c0af2e0c6053c361/update", project);
            return expect(project_put).to.have.status(200);
        });
    });
});