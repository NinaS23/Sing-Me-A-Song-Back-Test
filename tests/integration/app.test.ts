import app from "../../src/app";
import supertest from "supertest";
import * as scenarioFactory from "../factories/scenarioFactory";


beforeEach(async () => {
    await scenarioFactory.deleteAllData();
});

const server = supertest(app);

describe("test Route POST /recommendations", () => {
    it.todo("create a recommendation , send correct format , it should return 201")
});

describe("test Route POST /recommendations/:id/upvote", () => {
    it.todo("")
});

describe("test Route POST /recommendations/:id/downvote", () => {
    it.todo("")
});

describe("test Route GET /recommendations", () => {
    it.todo("")
});

describe("test Route GET /recommendations/:id", () => {
    it.todo("")
});

describe("test Route GET /recommendations/random", () => {
    it.todo("")
});

describe("test Route GET /recommendations/top/:amount", () => {
    it.todo("")
});


afterAll(async () => {
    await scenarioFactory.disconnectPrisma();
});
