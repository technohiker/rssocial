/** Middleware: Authentication
 *
 * Verify any tokens, and store them for future use.
 */

import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { UnauthorizedError } from "../helpers/ExpressError";

/** Authenticate user with token.
 *
 * If token was provided, verify it, then store on res.locals.
 * No error is thrown since user should be able to go through routes without providing a token.
 */
export const authenticateJWT: RequestHandler = (req, res, next) => {
  const authHeader = req.headers && req.headers.authorization;
  try {
    if (authHeader) {
      const token = authHeader;
      console.log({ token });
      res.locals.user = jwt.verify(token, SECRET_KEY);
      console.log("Locals:", res.locals.user);
    }
    return next();
  } catch (e: any) {
    console.log("Auth Error:", e);
    return next();
  }
};

/** Middleware to use when they must be logged in.
 *  If not, raise Unauthorized.*/
export const ensureLoggedIn: RequestHandler = (req, res, next) => {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
};

/** Check if user stored in res.locals matches user ID given. */
export const ensureCorrectUser: RequestHandler = (req, res, next) => {
  try {
    const user = res.locals.user;
    console.log({ user });
    console.log("Params:", req.params);
    if (!(user && user.username === req.params.username)) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

/** Decode token sent in body. */
export const checkVerifyToken: RequestHandler = (req, res, next) => {
  try {
    const { verToken } = req.body;
    if (!verToken) return res.json({ verified: false });
    //Verify token.
    const verified = <IVerifiedToken>jwt.verify(verToken, SECRET_KEY);
    console.log({ verified });
    //Set locals.
    res.locals.userID = verified.id;
    //What if user was already verified?
    return next();
  } catch (err: any) {
    return res.json({ verified: false, token: "" });
  }
};

interface IVerifiedToken extends JwtPayload {
  id: number;
  username: string;
  email: string;
  verifyID: string;
  iat: number;
  exp: number;
}
