/**  Routes set up for making RSS/API calls. */

import Router, { RequestHandler } from "express";
import { Call } from "../models/call";
import { Feeds } from "../models/feeds";
import { Message } from "../models/message";
import { BadRequestError } from "../helpers/ExpressError";
import { ICall } from "../types/ICall";
import { ensureLoggedIn } from "../middleware/auth";
import { IMessage } from "../types/IMessage";

export const callRouter = Router();

callRouter.post('/new', ensureLoggedIn, async function (req, res, next) {
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

callRouter.get('/fetch', ensureLoggedIn, async function (req, res, next) {
  try {
    const { id } = res.locals.user
    // Get all calls from user.
    const calls: ICall[] = await Call.getByUserID(id)
    console.log({ calls })

    const allMessages: IMessage[] = []

    //Run each call.
    for (let call of calls) {
      console.log({ call })
      //  if(call.source_name === "rss"){
      const xml = await Call.callRSS(call.base_url)
      console.log({ xml })
      if (xml === "Invalid URL") continue

      const messages = xml.items.map((item) => Call.makeMessage(item))
      //  console.log("Messages:", messages)
      //  }

      if (!call.feed_id) return res.json({ "No Feed ID": call })
      if (!xml.title) return res.json({ "No Source Name": call })
      const msgRes = await Message.addMessages(messages, id, call.feed_id, xml.title)
      console.log({ msgRes })
      allMessages.push(...msgRes)
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