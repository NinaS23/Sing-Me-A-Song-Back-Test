import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";


export async function createDataRecommendation() {
  return {
    name: faker.name.fullName(),
    youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`,
  };
}

export async function createPreExistentRecommendation() {
  const allRecommendations = []
  for (let i = 0; i < 9; i++) {
    let recommendation = {
      name: faker.name.fullName(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`,
    }
    allRecommendations.push(recommendation)
  }
  await prisma.recommendation.createMany({ data: allRecommendations });
}