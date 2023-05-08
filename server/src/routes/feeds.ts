import { Router } from "express";
import { RequestHandler } from "express";
import { Feed } from "../models/feed";
import { ensureCorrectUser } from "../middleware/auth";

export const feedRouter = Router();

feedRouter.get('/:username', ensureCorrectUser, async function (req, res, next) {
  try {
    const userID = res.locals.user.id

    const feeds = await Feed.getFeedsByUser(userID)
    return res.json({ feeds: feeds })
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler)

/** Get a single feed. */
feedRouter.get('/:id', async function (req, res, next) {
  try {
    const { id } = req.params
    const feed = await Feed.getFeed(+id)
    return res.json({ feed })
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler)

feedRouter.delete('/:id', async function (req, res, next) {
  try {
    const { id } = req.params
    console.log({ id })
    const feed = await Feed.deleteFeed(+id)
    console.log({ feed })
    return res.json({ feed })
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler)