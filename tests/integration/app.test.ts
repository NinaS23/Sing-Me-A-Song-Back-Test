import app from "../../src/app";
import supertest from "supertest";
import * as scenarioFactory from "../factories/scenarioFactory";
import * as recommendationFactory from "../factories/recommendationFactory";


beforeEach(async () => {
    await scenarioFactory.deleteAllData();
});

const server = supertest(app);

describe("test Route POST /recommendations", () => {
    it("create a recommendation , send correct format , it should return 201", async () => {
        await recommendationFactory.createPreExistentRecommendation();
        const getRecommendation = await recommendationFactory.createDataRecommendation()
        const isRecommendationUnique = await recommendationFactory.findRecommendation(getRecommendation.name)
        expect(isRecommendationUnique).toBeNull()
        const createRecommendation = await server
            .post("/recommendations")
            .send(getRecommendation)
        const findRecommendation = await recommendationFactory.findRecommendation(getRecommendation.name)
        expect(findRecommendation).not.toBeNull();
        expect(createRecommendation.statusCode).toBe(201);
    });
});

describe("test Route POST /recommendations/:id/upvote", () => {
    it("update vote with a valid id for upvote", async () =>{
        await recommendationFactory.createPreExistentRecommendation();
        const getRecommendation = await recommendationFactory.createDataRecommendation()
        const isRecommendationUnique = await recommendationFactory.findRecommendation(getRecommendation.name)
        expect(isRecommendationUnique).toBeNull()
        const createRecommendation = await server
            .post("/recommendations")
            .send(getRecommendation)
        expect(createRecommendation.statusCode).toBe(201);
        const findRecommendation = await recommendationFactory.findRecommendation(getRecommendation.name)
        expect(findRecommendation).not.toBeNull();
        const id = findRecommendation.id
        const updateVote = await server
            .post(`/recommendations/${id}/upvote`)
            .send("increment")
        expect(updateVote.statusCode).toBe(200)  
    })
});

describe("test Route POST /recommendations/:id/downvote", () => {
    it("update vote with a valid id for downvote", async () =>{
        await recommendationFactory.createPreExistentRecommendation();
        const getRecommendation = await recommendationFactory.createDataRecommendation()
        const isRecommendationUnique = await recommendationFactory.findRecommendation(getRecommendation.name)
        expect(isRecommendationUnique).toBeNull()
        const createRecommendation = await server
            .post("/recommendations")
            .send(getRecommendation)
        expect(createRecommendation.statusCode).toBe(201);
        const findRecommendation = await recommendationFactory.findRecommendation(getRecommendation.name)
        expect(findRecommendation).not.toBeNull();
        const id = findRecommendation.id
        const downVote = await server
            .post(`/recommendations/${id}/downvote`)
            .send("decrement")
        expect(downVote.statusCode).toBe(200)  
    })
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
