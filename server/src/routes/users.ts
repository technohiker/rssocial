/** Routes for users. */

import Router from "express";
import { User } from "../models/user";
import { RequestHandler } from "express";
import { createToken } from "../helpers/tokens";
import { IUser } from "../types/IUser";

export const userRouter = Router();

/** Returns user info.
 *
 * Returns {id, username, email, profile_img, bio}
 */
userRouter.get("/:username", async function (req, res, next) {
  try {
    const user: IUser = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
} as RequestHandler);

userRouter.get("/", async function (req, res, next) {
  try {
    const users: IUser[] = await User.getAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
} as RequestHandler);

/** Return all user messages, folders, feeds, and reactions. */
userRouter.get("/feeds", async function (req, res, next) {
  try {
    const { userID } = res.locals;
    const news = User.getUserMessages(userID);
    return res.json({ news: news });
  } catch (e: any) {
    return next(e);
  }
} as RequestHandler);
