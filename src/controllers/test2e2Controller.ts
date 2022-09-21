import {Request, Response} from "express";
import * as testService from "../services/test2e2Service.js"

export async function reset(req:Request, res:Response) {
	await testService.deleteAll();
	res.sendStatus(200);
}
