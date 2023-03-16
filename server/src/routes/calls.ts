/**  Routes set up for making RSS/API calls. */

import Router, { RequestHandler } from "express";
import { Call } from "../models/call";

export const callRouter = Router();

//Making RSS Call.
callRouter.get('/calls/rss', async function(req, res, next) {
    // try {
    //     const validator = jsonschema.validate(req.body, userNewSchema);
    //     if (!validator.valid) {
    //       const errs = validator.errors.map((e) => e.stack);
    //       throw new BadRequestError(errs);
    //     }
    
    //     const user = await User.register(req.body);
    //     const token = createToken(user);
    //     return res.status(201).json({ user, token });
    //   } catch (err) {
    //     return next(err);
    //   }

} as RequestHandler)


//Making Reddit Call.

//Making Twitter Call.