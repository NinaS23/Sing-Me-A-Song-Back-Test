import app from "../../src/app";
import supertest from "supertest";
import { prisma } from "../../src/database.js";
import * as scenarioFactory from "../factories/scenarioFactory";
import * as recommendationFactory from "../factories/recommendationFactory";

beforeEach(async () => {
    await scenarioFactory.deleteAllData();
});

const server = supertest(app);

describe("test Route POST /recommendations", () => {
    it("create a recommendation , send correct format , it should return 201",async () => {
        await recommendationFactory.createPreExistentRecommendation();
        const getRecommendation = await recommendationFactory.createDataRecommendation()
        const isRecommendationUnique = await prisma.recommendation.findUnique({
            where: {
                name:getRecommendation.name
            }
        })
        expect(isRecommendationUnique).toBeNull()
        const createRecommendation = await server.post("/recommendations").send(getRecommendation)
        const findRecommendation = await prisma.recommendation.findUnique({
            where: {
                name:getRecommendation.name
            }
        })
        expect(findRecommendation).not.toBeUndefined();
        expect(createRecommendation.statusCode).toBe(201); 
    });
    
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
