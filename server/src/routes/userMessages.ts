/** Routes for messages. */

import Router, { RequestHandler } from "express";
import { userMessage } from "../models/userMessage";
import { Reaction } from "../models/reaction";
import { ensureCorrectUser } from "../middleware/auth";

export const umsgRouter = Router();

/** Get all messages that have been imported. */
umsgRouter.get("/all", async function (req, res, next) {
  try {
    const messages = await userMessage.getAllUserMessages();
    return res.json({ messages });
  } catch (e: any) {
    return next(e);
  }
} as RequestHandler);

/** Get single message. */
umsgRouter.get("/:id", async function (req, res, next) {
  return res.json({ response: "Success!" });
} as RequestHandler);

/** Add reaction to message. */
umsgRouter.post("/:id/react", async function (req, res, next) {
  try {
    const { reactID } = req.body;
    const messageID = req.params.id;
    const userID = res.locals.user.id;

    console.log({ reactID, messageID, userID })

    let reactionID = await userMessage.addReaction(reactID, +messageID, userID);

    return res.json({ reactID: reactionID });
  } catch (e: any) {
    return next(e);
  }
} as RequestHandler);

umsgRouter.post("/:id/click", async function (req, res, next) {
  try {
    const { id } = req.params;

    const msg = await userMessage.addClick(+id);
    return res.json({ message: msg });
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler);

/** Set message as seen. */
umsgRouter.post("/:id/seen", async function (req, res, next) {
  try {
    const { id } = req.params;
    const userID = res.locals.user.id;

    const seen = await userMessage.messageSeen(userID, +id);
    return res.json({ seen });
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler);

/** Add notes to message. */
umsgRouter.post("/:id/notes", async function (req, res, next) {
  try {
    const { notes } = req.body;
    const messageID = req.params.id;
    const userID = res.locals.user.id;

    let message = await userMessage.addNotes(notes, +messageID, userID);

    return res.json({ message: message });
  } catch (e: any) {
    return next(e);
  }
} as RequestHandler);