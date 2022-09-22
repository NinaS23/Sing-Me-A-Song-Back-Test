import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";
import { Recommendation } from "@prisma/client";


export  function createDataRecommendation() {
  return {
    name: faker.name.fullName(),
    youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`,
  };
}

export  function wrongDataRecommendation() {
  return {
    name: faker.name.fullName(),
    youtubeLink: `http://www.google.com/${faker.random.alphaNumeric(11)}`,
  };
}

export  function existentNameRecommendation() {
  return {
    name: "lolapaloozaaaa",
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

export async function updateXScores(X: number, update: number) {
  await createPreExistentRecommendation()
  await prisma.recommendation.updateMany({ data: { score: update } });
}

export function unitRecommendationData(){
  return(
   {
      id: 1,
      name: "workDev",
      score: 4,
      youtubeLink: "http://www.youtube.com",
    }
  )
}
export function gtUnitTest() {
  return {
    id: 1,
    name: faker.name.fullName(),
    youtubeLink: 'https://youtu.be/qrBz29PeqGI',
    score: -6
  }
};


export function CreateUnitRecommendations(){
   let allRecommendations = []
   for(let i = 0; i < 10; i++){
    let recommendation  = {
      id: i,
      name: faker.name.fullName(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`,
      score: 9 + i 
    }
    allRecommendations.push(recommendation)
   }
   return allRecommendations;
}



