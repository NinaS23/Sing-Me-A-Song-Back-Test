import { Router } from 'express';
import * as testController from '../controllers/test2e2Controller.js';

const e2eRouter = Router();

e2eRouter.post('/e2e/reset', testController.reset);


export default e2eRouter;
