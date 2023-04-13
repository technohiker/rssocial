/** Routes for users. */

import Router from "express";
import { User } from "../models/user";
import { RequestHandler } from "express";
import { createToken } from "../helpers/tokens";
import { IUser } from "../types/IUser";

export const userRouter = Router();


/** Return all user messages, folders, feeds, and reactions. */
userRouter.get("/feeds", async function (req, res, next) {
  try {
    const { id } = res.locals.user;

    const news = await User.getUserMessages(id);

    return res.json({ news: news });
  } catch (e: any) {
    console.log({ e })
    return next(e);
  }
} as RequestHandler);

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