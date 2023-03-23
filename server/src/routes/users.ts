/** Routes for users. */

import Router from "express";
import { User } from "../models/user";
import { RequestHandler } from "express";

export const userRouter = Router();

/** Get user.
 *
 * Returns {id, username, email, profile_img, bio}
 */
userRouter.get("/:username", async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
} as RequestHandler);
