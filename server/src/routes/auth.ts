/** Routes for users. */

import jsonschema from "jsonschema";
import Router, { RequestHandler } from "express";
import { User } from "../models/user";
import userRegisterSchema from "../schemas/userRegister";
import { BadRequestError } from "../helpers/ExpressError";
import { createToken } from "../helpers/tokens";
import { IUser } from "../types/IUser";
import { checkVerifyToken } from "../middleware/auth";


export const authRouter = Router();

/** Return JWT token, which will be used for authenticating later requests. */
authRouter.post("/token", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    console.log({ username, password })

    const user = await User.authenticate(username, password);
    const token = createToken(user, { expiresIn: '1w' });
    return res.json({ token });
  } catch (e: any) {
    next(e);
  }
} as RequestHandler);

/** Create new user.  Also returns JWT token. */
authRouter.post("/register", async function (req, res, next) {
  try {
    const validate = jsonschema.validate(req.body, userRegisterSchema);
    if (!validate.valid) {
      const errs = validate.errors.map((e) => e.stack);
      throw new BadRequestError(...errs);
    }
    const user: IUser = await User.register(req.body);
    console.log("New User(route)", user)

    const token = createToken(user, { expiresIn: '1w' });

    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
} as RequestHandler);

/** Receive verification token and verify user. */
authRouter.post('/verify', checkVerifyToken, async function (req, res, next) {
  try {
    //Check token.
    const userID = res.locals.userID
    console.log({ userID })
    //Approve user.
    const verUser = await User.verify(userID)
    const token = createToken(verUser, { expiresIn: '1w' })
    return res.json({ verified: true, token: token })
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler)