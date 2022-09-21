import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";
import { Recommendation } from "@prisma/client";


export async function createDataRecommendation() {
  return {
    name: faker.name.fullName(),
    youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`,
  };
}

export async function createPreExistentRecommendation() {
  const allRecommendations = []
  for (let i = 0; i < 9; i++) {
    let recommendation  = {
      name: faker.name.fullName(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`,
     
    }
    allRecommendations.push(recommendation)
  }
  await prisma.recommendation.createMany({ data: allRecommendations });
}

export async function findRecommendation(name:string){
  return await prisma.recommendation.findUnique({
    where: { name  }
  });
}

export async function getAll(){
  return await prisma.recommendation.findMany();
}


export async function createPreExistentRecommendationWithScore() {
  const allRecommendations = []
  for (let i = 0; i < 5; i++) {
    let recommendation  = {
      name: faker.name.fullName(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`,
      score: faker.random.numeric(2)
    }
    allRecommendations.push(recommendation)
  }
  await prisma.recommendation.createMany({ data: allRecommendations });
}

export async function updateXScores(X: number, update: number) {
  await createPreExistentRecommendation()
  await prisma.recommendation.updateMany({ data: { score: update } });
}