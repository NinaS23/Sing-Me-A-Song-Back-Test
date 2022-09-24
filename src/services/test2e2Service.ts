import * as testRepository from '../repositories/test2e2Repository.js';

export async function deleteAll() {
    await testRepository.deleteAll();
}

