import { Router } from "express";
import { RequestHandler } from "express";
import { Feeds } from "../models/feeds";
import { ensureCorrectUser } from "../middleware/auth";

export const feedRouter = Router();

feedRouter.get('/:username', ensureCorrectUser, async function (req, res, next) {
  try {
    const userID = res.locals.user.id

    const feeds = await Feeds.getFeedsByUser(userID)
    return res.json({ feeds: feeds })
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler)

feedRouter.get('/', async function (req, res, next) {
  try {

  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler)

feedRouter.delete('/:id', async function (req, res, next) {
  try {
    const { id } = req.params
    const feed = await Feeds.deleteFeed(+id)
    return res.json({ feed })
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler)