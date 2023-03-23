/** Routes for messages. */

import Router, { RequestHandler } from "express";
import { Message } from "../models/message";

export const msgRouter = Router();

/** Get all messages that have been imported. */
msgRouter.get("/all", async function (req, res, next) {} as RequestHandler);

/** Get single message. */
msgRouter.get(":id", async function (req, res, next) {} as RequestHandler);

/** Mark post as read. */
msgRouter.post(":id/read", async function (req, res, next) {
  try {
    const { id } = req.params;
    Message.messageRead(id);
  } catch (e: any) {
    return next(e);
  }
} as RequestHandler);
