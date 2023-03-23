/** Routes for users. */

import Router, { RequestHandler } from "express";
import { User } from "../models/user";

export const authRouter = Router();

authRouter.get("/users", async function (req, res, next) {
  //Use token to find user.
} as RequestHandler);
