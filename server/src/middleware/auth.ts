/** Middleware: Authentication
 * 
 * Verify any tokens, and store them for future use.
 */

import { RequestHandler } from "express";

export const authenticateJWT: RequestHandler = (req, res, next) => {

}