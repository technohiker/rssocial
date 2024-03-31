/**  Routes set up for making RSS/API calls. */

import Router, { RequestHandler } from "express";
import jsonschema from "jsonschema";
import { Folder } from "../models/folder";
import { BadRequestError } from "../helpers/ExpressError";
import folderNew from "../schemas/folderNew";
import folderPatch from "../schemas/folderPatch";
import { ensureCorrectUser } from "../middleware/auth";

export const folderRouter = Router();

/** Create new folder. */
folderRouter.post("/new", async function (req, res, next) {
  //Validate req.body
  try {
    const validate = jsonschema.validate(req.body, folderNew);
    if (validate) {
      const { folderName } = req.body;
      const userID = res.locals.user.id;

      let newFolder = await Folder.newFolder(userID, folderName);
      return res.json({ folder: newFolder });
    }
  } catch (e: any) {
    throw new BadRequestError(e);
  }
} as RequestHandler);

/** Adjust folder name. */
folderRouter.patch("/:folderID", async function (req, res, next) {
  try {
    const validate = jsonschema.validate(req.body, folderPatch);
    if (validate) {
      const { folderName } = req.body;
      const { folderID } = req.params;

      let editFolder = await Folder.patchFolder(+folderID, folderName);

      return res.json({ editFolder });
    }
  } catch (e: any) {
    throw new BadRequestError(e);
  }
} as RequestHandler);

/** Delete folder. */
folderRouter.delete("/:folderID", async function (req, res, next) {
  try {
    const { folderID } = req.params;

    let folder = await Folder.deleteFolder(+folderID);

    return res.json({ folder });
  } catch (e: any) {
    throw new BadRequestError(e);
  }
} as RequestHandler);
