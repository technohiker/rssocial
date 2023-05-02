import Router, { RequestHandler } from "express";
import { Source } from "../models/source";

export const sourceRouter = Router();

//These actions should only be allowed by an administrative user.  Currently do not have functionality for one.  Maybe for later down the road?

/** Get all sources. */
sourceRouter.get("/", async function (req, res, next) {
  try {
    const sources = await Source.getAll();
    return res.json({ sources });
  } catch (e: any) {
    return next(e);
  }
} as RequestHandler);

/** Add a source. */
sourceRouter.post("/new", async function (req, res, next) {
  try {
    const { name, img } = req.body;
    const source = await Source.addSource(name, img);
    return res.json({ source });
  } catch (e: any) {
    return next(e);
  }
} as RequestHandler);