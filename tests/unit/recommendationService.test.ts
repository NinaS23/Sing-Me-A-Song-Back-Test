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
    it("should update a upvote", async () => {
        const inputRecommendation = recommendationFactory.unitRecommendationData();
        jest
            .spyOn(recommendationRepository, "find")
            .mockResolvedValueOnce(inputRecommendation);
        jest
            .spyOn(recommendationRepository, "updateScore")
            .mockResolvedValueOnce(null);
        await recommendationService.upvote(inputRecommendation.id);
        expect(recommendationRepository.updateScore).toBeCalled();

    })
});

describe("downvote", () => {
    it("should remove a recommendation with score < -5", async () => {
        const inputRecommendation = recommendationFactory.unitRecommendationData();
        jest
            .spyOn(recommendationRepository, "find")
            .mockResolvedValueOnce({ ...inputRecommendation });
        jest
            .spyOn(recommendationRepository, "updateScore")
            .mockResolvedValueOnce({ score: -6 } as any);
        jest
            .spyOn(recommendationRepository, "remove")
            .mockImplementationOnce((): any => { });

        const downvoteValue = 1
        await recommendationService.downvote(downvoteValue);

        expect(recommendationRepository.remove).toBeCalledTimes(1);
    });
    
    it("should not remove a recommendation with score > -5", async () => {
        const inputRecommendation = recommendationFactory.unitRecommendationData();
        jest
            .spyOn(recommendationRepository, "find")
            .mockResolvedValueOnce({ ...inputRecommendation });
        jest
            .spyOn(recommendationRepository, "updateScore")
            .mockResolvedValueOnce({ score: 7 } as any);
        jest
            .spyOn(recommendationRepository, "remove")
            .mockImplementationOnce((): any => { });

        const downvoteValue = 1
        await recommendationService.downvote(downvoteValue);

        expect(recommendationRepository.remove).toBeCalledTimes(0);
    });
});

describe("get recommendations", () => {
    it("shoul find all recomendations", async () => {
       const allRecommendations = recommendationFactory.CreateUnitRecommendations()
        jest
            .spyOn(recommendationRepository, "findAll")
            .mockImplementationOnce((): any => { return allRecommendations });
        const getAllRecommendations = await recommendationService.get()
        expect(getAllRecommendations.length).toEqual(10)
        expect(getAllRecommendations).toEqual(allRecommendations)

    });
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
