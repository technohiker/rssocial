/**  Routes set up for making RSS/API calls. */

import Router, { RequestHandler } from "express";
import { Call } from "../models/call";
import { Feed } from "../models/feed";
import { userMessage } from "../models/userMessage";
import { BadRequestError } from "../helpers/ExpressError";
import { ICall } from "../types/ICall";
import { ensureLoggedIn } from "../middleware/auth";
import { IMessage, IUserMessage } from "../types/IMessage";
import { IFeed } from "../types/IFeed";

export const callRouter = Router();

/** Recieves information for creating a call.  Returns a feed created with call info. */
callRouter.post('/new', ensureLoggedIn, async function (req, res, next) {
  try {
    const { source } = req.query
    const { id } = res.locals.user

    let newCall: ICall = {
      id: 999,
      base_url: "Test"
    }
    let newFeed: IFeed = {} as IFeed
    if (source === "rss") {
      //Make RSS Call.
      newCall = await Call.makeRSSCall(req.body.url)
      //Make RSS Feed.
      Feed.newFeed(req.body.name, +id, req.body.folder, 1, newCall.id)
      //TODO: Make sure URL passed in is valid.
    }
    else if (source === "twitter") {
      //Make Twitter Call.

      //Make Twitter Feed.

      //TODO: Make sure API call works before saving.
    }

    return (res.json({ feed: newFeed }))
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler)

callRouter.get('/fetch', ensureLoggedIn, async function (req, res, next) {
  try {
    const { id } = res.locals.user

    const calls: ICall[] = await Call.getByUserID(id)

    const allMessages: IUserMessage[] = []

    //Run each call.
    for (let call of calls) {
      console.log({ call })
      //  if(call.source_name === "rss"){
      const xml = await Call.callRSS(call.base_url)
      console.log({ xml })
      if (xml === "Invalid URL") continue

      const messages = xml.items.map((item) => Call.makeMessage(item))
      //  }

      if (!call.feed_id) return res.json({ "No Feed ID": call })
      if (!xml.title) return res.json({ "No Source Name": call })
      const msgRes = await userMessage.addMessages(messages, xml.title)
      const umsgRes = await userMessage.addUserMessages(msgRes, id, call.feed_id)
      console.log({ msgRes })
      allMessages.push(...umsgRes)
    }
    console.log({ allMessages })
    return res.json({ "messages": allMessages })
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