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
import { Source } from "../models/source";
import Parser from "rss-parser";
import { IRedditPost } from "../types/IReddit";

export const callRouter = Router();

/** Recieves information for creating a call.  Returns a feed created with call info. */
callRouter.post('/new/rss', ensureLoggedIn, async function (req, res, next) {
  try {
    const { source } = req.query
    const { id } = res.locals.user

    const newCall = await Call.makeRSSCall(req.body.url)
    const newFeed = Feed.newFeed(req.body.name, +id, req.body.folder, 1, newCall.id)

    return (res.json({ feed: newFeed }))
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler)

callRouter.post('/new/reddit', ensureLoggedIn, async function (req, res, next) {
  try {
    const { subreddit, params } = req.body
    const sourceID = await Source.getSourceID("reddit")
    const { id } = res.locals.user

    const newCall = await Call.makeRedditCall(subreddit, params)
    const newFeed = await Feed.newFeed(req.body.name, +id, req.body.folder, sourceID.id, newCall.id)

    return res.json({ feed: newFeed })
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
      let title;
      let messages: IMessage[] = [];

      if (call.source_name === "rss") {
        const response = await Call.callRSS(call.base_url)
        title = response.title

        messages = response.items.map((item: Parser.Item) => Call.makeMessage(item))
      }

      else if (call.source_name === "reddit") {
        if (!call.request_headers) {
          console.log("No headers found.  Please update the call in the database.")
          continue
        }

        if (!call.request_params) call.request_params = ""

        const response = await Call.callReddit(call.base_url, call.request_params, call.request_headers)
        title = response.children[0].data.subreddit
        messages = response.children.map((item) => Call.redditToMessage(item.data))
      }

      if (!call.feed_id) return res.json({ "No Feed ID": call })
      if (!title) return res.json({ "No Source Name": call })

      const msgRes = await userMessage.addMessages(messages, title)
      const umsgRes = await userMessage.addUserMessages(msgRes, id, call.feed_id)

      allMessages.push(...umsgRes)
    }
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
callRouter.get("/reddit", async function (req, res, next) {
  try {

    const { subreddit, params } = req.body;
    const redditFeed = await Call.makeRedditCall(subreddit, params);
    return res.status(201).json({ feed: redditFeed });
    // console.log("Route reached.")
    // // const { subreddit } = req.body;
    // const redditFeed = await Call.callReddit(subreddit);
    // let redditMessages = []
    // for (let message of redditFeed) {
    //   redditMessages.push(Call.redditToMessage(message))
    // }

    // return res.status(201).json({ feed: redditFeed });
  } catch (err) {
    return next(err);
  }
} as RequestHandler)

//Making Twitter Call.