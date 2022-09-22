import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService";
import * as recommendationFactory from "../factories/recommendationFactory.js";

beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe("creation", () => {
    it("should insert a recommendation", async () => {
        jest.spyOn(recommendationRepository, "findByName")
            .mockImplementationOnce((): any => { });
        jest.spyOn(recommendationRepository, "create")
            .mockImplementationOnce((): any => { });

        let inputRecommendation = recommendationFactory.unitRecommendationData();
        await recommendationService.insert({
            name: inputRecommendation.name,
            youtubeLink: inputRecommendation.youtubeLink
        })

        expect(recommendationRepository.findByName).toBeCalled()
        expect(recommendationRepository.create).toBeCalled()
    });
});

describe("upvote", () => {
    it.todo("should update a upvote")
});

describe("", () => {
    it.todo(" ",);
});

describe("", () => {
    it.todo("",);
});

describe("", () => {
    it.todo("",);
});

describe("", () => {
    it.todo("",);
});

describe("", () => {
    it.todo("",);
});
