/** Routes for messages. */

import Router, { RequestHandler } from "express";
import { Message } from "../models/message";
import { Reaction } from "../models/reaction";
import { ensureCorrectUser } from "../middleware/auth";

export const msgRouter = Router();

/** Get all messages that have been imported. */
msgRouter.get("/all", async function (req, res, next) { } as RequestHandler);

/** Get single message. */
msgRouter.get("/:id", async function (req, res, next) {
  return res.json({ response: "Success!" });
} as RequestHandler);

/** Add reaction to message. */
msgRouter.post("/:id/react", async function (req, res, next) {
  try {
    const { reactID } = req.body;
    const messageID = req.params.id;
    const userID = res.locals.user.id;

    let reaction = await Reaction.addReaction(reactID, +messageID, userID);

    return res.json({ reaction: reaction });
  } catch (e: any) {
    return next(e);
  }
} as RequestHandler);

msgRouter.post("/:id/click", async function (req, res, next) {
  try {
    const { id } = req.params;

    const msg = await Message.addClick(+id);
    return res.json({ message: msg });
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler);

/** Set message as seen. */
msgRouter.post("/:id/seen", async function (req, res, next) {
  try {
    const { id } = req.params;
    const userID = res.locals.user.id;

    const seen = await Message.messageSeen(userID, +id);
    return res.json({ seen });
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler);

/** Add notes to message. */
msgRouter.post("/:id/notes", async function (req, res, next) {
  try {
    const { notes } = req.body;
    const messageID = req.params.id;
    const userID = res.locals.user.id;

    let message = await Message.addNotes(notes, +messageID, userID);

    return res.json({ message: message });
  } catch (e: any) {
    return next(e);
  }
} as RequestHandler);