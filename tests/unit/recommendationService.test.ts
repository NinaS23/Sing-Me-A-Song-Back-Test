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

        let inputRecommendation = recommendationFactory.createDataRecommendation();
        await recommendationService.insert(inputRecommendation)

        expect(recommendationRepository.findByName).toBeCalled()
        expect(recommendationRepository.create).toBeCalled()
    });
});

describe("", () => {
    it.todo("",);
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
