/**  Routes set up for making RSS/API calls. */

import Router, { RequestHandler } from "express";
import { Call } from "../models/call";
import { BadRequestError } from "../helpers/ExpressError";

export const callRouter = Router();

//Making RSS Call.
callRouter.get("/rss", async function (req, res, next) {
  try {
    const { rssURL } = req.body;
    const messages = await Call.callRSS(rssURL);
    return res.status(201).json({ messages });
  } catch (err) {
    return next(err);
  }
} as RequestHandler);

//Making Reddit Call.

//Making Twitter Call.
