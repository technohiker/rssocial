/** ExpressError extends normal JS error so we can
 *  add a status when we make an instance of it.
 *
 *  The error-handling middleware will return this.
 */

export class ExpressError extends Error {
  message: string;
  status: number;
  constructor(status: number, ...messages: string[]) {
    super();
    this.message = messages.join(" ");
    this.status = status;
  }
}

/** 404 NOT FOUND error. */

export class NotFoundError extends ExpressError {
  constructor(...messages: string[]) {
    super(404, messages.join(" "));
  }
}

/** 401 UNAUTHORIZED error. */

export class UnauthorizedError extends ExpressError {
  constructor(...messages: string[]) {
    super(401, messages.join(" "));
  }
}

/** 400 BAD REQUEST error. */

export class BadRequestError extends ExpressError {
  constructor(...messages: string[]) {
    super(400, messages.join(" "));
  }
}

/** 403 BAD REQUEST error. */

export class ForbiddenError extends ExpressError {
  constructor(...messages: string[]) {
    super(403, messages.join(" "));
  }
}
