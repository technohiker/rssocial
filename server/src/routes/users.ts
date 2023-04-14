/** Routes for users. */

import Router from "express";
import { User } from "../models/user";
import { RequestHandler } from "express";
import { IUser } from "../types/IUser";
import { ensureCorrectUser } from "../middleware/auth";

export const userRouter = Router();


/** Return all user messages, folders, feeds, and reactions. */
userRouter.get("/:username/feeds2", ensureCorrectUser, async function (req, res, next) {
  try {
    const userID = res.locals.user.id;

    const news = await User.getUserMessages(userID);

    return res.json({ news: news });
  } catch (e: any) {
    console.log({ e })
    return next(e);
  }
} as RequestHandler);

/** Return all user messages, folders, and feeds nested. */
userRouter.get("/:username/feeds", ensureCorrectUser, async function (req, res, next) {
  try {
    const userID = res.locals.user.id;

    const news = await User.getUserMessagesNested(userID);

    return res.json({ folders: news });
  } catch (e: any) {
    console.log({ e })
    return next(e);
  }
} as RequestHandler);

/** Returns user info.
 *
 * Returns {id, username, email, profile_img, bio}
 */
userRouter.get("/:username", ensureCorrectUser, async function (req, res, next) {
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