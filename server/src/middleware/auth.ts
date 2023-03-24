/** Middleware: Authentication
 *
 * Verify any tokens, and store them for future use.
 */

import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
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
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (e: any) {
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
