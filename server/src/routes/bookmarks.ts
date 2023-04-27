import jsonschema from "jsonschema";
import Router, { RequestHandler } from "express";
import bookmarkNew from "../schemas/bookmarkNew";
import bookmarkEdit from "../schemas/bookmarkEdit";
import { BadRequestError } from "../helpers/ExpressError";
import { ensureCorrectUser } from "../middleware/auth";
import { Bookmark } from "../models/bookmark";

export const bookmarkRouter = Router();


/** Get single bookmark.*/
bookmarkRouter.get('/:id', async function (req, res, next) {
  try {
    const { id } = req.params
    const bookmark = await Bookmark.getBookmark(+id)
    return res.json({ bookmark: bookmark })
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler);


/** Create new bookmark.*/
bookmarkRouter.post('/', ensureCorrectUser, async function (req, res, next) {
  try {
    const validate = jsonschema.validate(req.body, bookmarkNew);
    if (validate) {
      const userID = res.locals.user.id
      const { name, icon } = req.body
      const bookmark = await Bookmark.newBookmark(+userID, name, icon)
      return res.json({ bookmark: bookmark })
    }
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler);


/** Change a bookmark's name.*/
bookmarkRouter.patch('/:id', ensureCorrectUser, async function (req, res, next) {
  try {
    const validate = jsonschema.validate(req.body, bookmarkEdit);
    if (validate) {
      const { id } = res.locals.user
      const { name } = req.body
      const bookmark = await Bookmark.changeName(+id, name)
      return res.json({ bookmark: bookmark })
    }
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler);


/** Delete a bookmark.*/
bookmarkRouter.delete('/:id', ensureCorrectUser, async function (req, res, next) {
  try {
    const { id } = res.locals.user
    const bookmark = await Bookmark.deleteBookmark(+id)
    return res.json({ bookmark: bookmark })
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler);


/** Get all bookmarks from a user. */
bookmarkRouter.get('/', ensureCorrectUser, async function (req, res, next) {
  try {
    const { id } = res.locals.user
    const bookmarks = await Bookmark.getByUserID(+id)
    return res.json({ bookmarks: bookmarks })
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler);

/** Add message to a bookmark. */
bookmarkRouter.post('/:id', async function (req, res, next) {
  try {
    const userID = res.locals.user.id
    const { id } = req.params
    const { msgID } = req.query
    if (!msgID) throw new BadRequestError('msgID is required')
    const bookmark = await Bookmark.addMessageToBookmark(+id, +msgID, +userID)
    console.log({ bookmark })
    return res.json({ bookmark: bookmark })
  }
  catch (e: any) {
    return next(e)
  }
} as RequestHandler);