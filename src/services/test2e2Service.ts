import * as testRepository from '../repositories/test2e2Repository.js';
import { faker } from '@faker-js/faker';
import { conflictError, notFoundError } from "../utils/errorUtils.js";

export async function deleteAll() {
    await testRepository.deleteAll();
}

