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

describe("get recommendation by id", () => {
    it("should return a recommendation with a specific id", async () => {
        const inputRecommendation = recommendationFactory.unitRecommendationData();
        jest
            .spyOn(recommendationRepository, "find")
            .mockResolvedValueOnce({ ...inputRecommendation });
        const getRecommendation = await recommendationService.getById(inputRecommendation.id);
        expect(getRecommendation.id).toEqual(inputRecommendation.id)
        expect(getRecommendation).not.toBeNull()
        expect(recommendationRepository.find).toHaveBeenCalledTimes(1);

    });
});

describe("get radom recommendation", () => {
    it("should get random recommendation lte", async () => {
        const recomendation = recommendationFactory.unitRecommendationData()
        jest.spyOn(Math, 'random').mockImplementationOnce((): any => {
            return 0.9
        });
        jest
            .spyOn(recommendationRepository, 'findAll')
            .mockImplementationOnce((): any => {
                return [recomendation];
            });
            jest.spyOn(Math, 'random').mockImplementationOnce((): any => {
                return 0
            });

        const random = await recommendationService.getRandom();
        expect(random).toEqual(recomendation);

    });

    it('should get random recommendation gt', async () => {
        const recomendation = recommendationFactory.unitRecommendationData()
        jest.spyOn(Math, 'random').mockImplementationOnce((): any => {
            return 0.5
        });
        jest
            .spyOn(recommendationRepository, 'findAll')
            .mockImplementationOnce((): any => {
                return [recomendation];
            });

        jest.spyOn(Math, 'floor').mockImplementationOnce((): any => {
            return 0
        });
        const random = await recommendationService.getRandom();
        expect(random).toEqual(recomendation);

    });

   
});

describe("get recommendation amount", () => {
    it("should get a amount number of recommendations ordered by top scores",async () =>{
        const recomendations = recommendationFactory.CreateUnitRecommendations()
        const amount = 4
        jest
        .spyOn(recommendationRepository, 'getAmountByScore').mockImplementationOnce( () : any =>{
            return [
                recomendations[3],
                recomendations[2],
                recomendations[1],
                recomendations[0]
            ]
        })
        const result = await recommendationService.getTop(amount);  
        expect(result.length).toEqual(amount);
        expect(result).not.toBe(null);
        expect(recommendationRepository.getAmountByScore).toHaveBeenCalledTimes(1);
    
    });
});
