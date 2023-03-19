import Express, { RequestHandler, ErrorRequestHandler } from "express";
import cors from "cors";

import { ExpressError, NotFoundError } from "./helpers/ExpressError";
import { callRouter } from "./routes/calls";
import { msgRouter } from "./routes/messages";
import { userRouter } from "./routes/users";

export const app = Express();

//Set up middleware
app.use(cors());
app.use(Express.json());

//Link routes.
app.use("/calls", callRouter);
app.use("/users", userRouter);
app.use("/messages", msgRouter);

/** Returns 404 when invalid URL is called. */
app.use(((req, res, next) => {
  return next(new NotFoundError());
}) as RequestHandler);

/**Generic error handler. */
app.use(((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);

  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
}) as ErrorRequestHandler);
