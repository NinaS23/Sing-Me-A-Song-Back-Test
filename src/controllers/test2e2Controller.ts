import {Request, Response} from "express";
import { deleteAll } from "../services/test2e2Service.js";

export async function reset(req:Request, res:Response) {
	await deleteAll();
	res.sendStatus(200);
}
