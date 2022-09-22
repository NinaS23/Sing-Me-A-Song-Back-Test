import { faker } from "@faker-js/faker";

export function createDataRecommendationUnit() {
    return {
        name: faker.name.fullName(),
        youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
    };
}
