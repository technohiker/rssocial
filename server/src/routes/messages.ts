/** Routes for messages. */

import Router, { RequestHandler } from "express";
import { Message } from "../models/message";
import { Reaction } from "../models/reaction";

export const msgRouter = Router();

/** Get all messages that have been imported. */
msgRouter.get("/all", async function (req, res, next) { } as RequestHandler);

msgRouter.get("/test", async function (req, res, next) {
  const obj = { test: "Testaroo" };
  return res.json(obj);
} as RequestHandler);

/** Get single message. */
msgRouter.get("/:id", async function (req, res, next) {
  return res.json({ response: "Success!" });
} as RequestHandler);

/** Mark post as read. */
msgRouter.post("/:msgID/read", async function (req, res, next) {
  try {
    const { msgID } = req.params;
    const userID = res.locals.user.id;
    Message.messageRead(userID, +msgID);
  } catch (e: any) {
    return next(e);
  }
} as RequestHandler);

/** Add reaction to message. */
msgRouter.post("/:id/react", async function (req, res, next) {
  try {
    const { react_id } = req.body;
    const message_id = req.params.id;
    const { user_id } = res.locals.user;

    let reaction = await Reaction.addReaction(react_id, +message_id, user_id);

    return res.json({ reaction: reaction });
  } catch (e: any) {
    return next(e);
  }
} as RequestHandler); //How to get user ID?  Can I get token info from middleware?  Res.locals?
