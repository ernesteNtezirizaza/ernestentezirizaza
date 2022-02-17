const request = require("supertest");
const chai = require("chai");
const http = require("chai-http");

const { expect } = chai;

const db = require("../config/db.config");
const User = db.User;
const app = require("../app");
const { mongoose } = require("../models");

chai.use(http);

describe("Users endpoint", () => {

    let data = [
        {
            _id: "4882200e85yytii999",
            username: "erneste",
            email: "erneste@gmail.com",
            first_name: "tbg",
            password: "maestrou",
            last_name: "lorenzo",   
        },
    ];

    let emptyArr = [];

    test("GET /api/users --> should return 200 on success", async () => {
        jest.spyOn(User, "find").mockReturnValue(Promise.resolve(data));
        const res = await chai.request(app).get("/api/users");
        expect(res.status).to.equal(200);
        await mongoose.disconnect();
    });


    test("GET /api/users --> should return 404 if there is no empty data", async () => {
        jest.spyOn(User, "find").mockReturnValue(Promise.resolve(emptyArr));
        const res = await chai.request(app).get("/api/users");
        expect(res.status).to.equal(404);
    });

    it("GET /api/users/:id --> should return tutorial by id successfully", async () => {
        let tutorial = {
            _id: "4882200e85yytii999",
            username: "erneste",
            email: "erneste@gmail.com",
            first_name: "tbg",
            password: "maestrou",
            last_name: "lorenzo",   
        };
        jest.spyOn(User, "findById").mockReturnValue(
            Promise.resolve(tutorial)
        );
        const response = await request(app).get("/api/users/dSDSAFDSDSDAS");
        expect(response.statusCode).to.equal(200);
        expect(response.body.username).to.equal("erneste");
    });

    test("PUT /api/users/:id -->should return 201 if the user is updated", async () => {
        jest.spyOn(User, "findByIdAndUpdate").mockReturnValue(
            Promise.resolve(updatedUser)
        );
        const res = await chai
            .request(app)
            .put("/api/users/:4882200e85yytii999");
        expect(res.body.message).to.equal("User was updated successfully.");
    });

    test("PUT /api/users/:id --> should return 404 if no data was given", async () => {
        jest.spyOn(User, "findByIdAndUpdate").mockReturnValue(
            Promise.resolve(null)
        );
        const res = await chai
            .request(app)
            .put("/api/users/:4882200e85yytii999");
        expect(res.body.message).to.equal("Not Found");
    });

    it("POST /api/users --> should create user  successfully", async () => {
        jest.spyOn(User, "create").mockReturnValue(Promise.resolve(true));

        const res = await request(app).post("/api/users/").send({
            username: "mane",
            email: "mane@gmail.com",
            first_name: "sadio",
            password: "maestrou",
            last_name: "manizo",   
        });

        expect(res.statusCode).to.equal(201);
    });

    it("DELETE /api/users/:id -->should delete one user successfully", async () => {
        jest.spyOn(User, "findByIdAndRemove").mockReturnValue(
            Promise.resolve(true)
        );

        const res = await request(app).post("/api/users/").send({
            username: "erneste",
            email: "erneste@gmail.com",
            first_name: "tbg",
            password: "maestrou",
            last_name: "lorenzo",   
        });

        const id = res.body.id;
        const response = await request(app).delete("/api/users/" + id);
        expect(response.statusCode).to.equal(200);
        expect(response.body.message).to.equal(
            "User was deleted successfully!"
        );
    });

    it("DELETE /api/users --> should delete all users successfully", async () => {
        jest.spyOn(User, "deleteMany").mockReturnValue(
            Promise.resolve(true)
        );
        const response = await request(app).delete("/api/users/");
        expect(response.statusCode).to.equal(200);
        expect(response.body.message).to.equal(
            "Users were deleted successfully!"
        );
    });
});
