/**  Routes set up for making RSS/API calls. */

import Router, { RequestHandler } from "express";
import { Call } from "../models/call";
import { Feeds } from "../models/feeds";
import { BadRequestError } from "../helpers/ExpressError";
import { ICall } from "../types/ICall";

export const callRouter = Router();



callRouter.post('/new', async function (req, res, next) {
  try {
    const { source } = req.query
    const { id } = res.locals.user

    let newCall: ICall = {
      id: 999,
      base_url: "Test"
    }
    if (source === "rss") {
      //Make RSS Call.
      newCall = await Call.makeRSSCall(req.body.url)
      //Make RSS Feed.
      Feeds.newFeed(req.body.name, +id, req.body.folder, 1, newCall.id)
    }
    else if (source === "twitter") {
      //Make Twitter Call.

      //Make Twitter Feed.
    }

    return (res.json({ call: newCall }))
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler)

//Making RSS Call.
callRouter.post("/rss", async function (req, res, next) {
  try {
    const { rssURL } = req.body;
    const rssFeed = await Call.callRSS(rssURL);

    return res.status(201).json({ feed: rssFeed });
  } catch (err) {
    return next(err);
  }
} as RequestHandler);

//Making Reddit Call.

//Making Twitter Call.