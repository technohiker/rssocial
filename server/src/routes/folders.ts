/**  Routes set up for making RSS/API calls. */

import Router, { RequestHandler } from "express";
import jsonschema from "jsonschema";
import { Folder } from "../models/folder";
import { BadRequestError } from "../helpers/ExpressError";
import folderNew from "../schemas/folderNew";
import folderPatch from "../schemas/folderPatch";

export const folderRouter = Router();

folderRouter.post("/new", async function (req, res, next) {
  //Validate req.body
  try {
    const validate = jsonschema.validate(req.body, folderNew);
    if (validate) {
      const { folderName } = req.body;
      const { userID } = res.locals.user;

      let newFolder = await Folder.newFolder(userID, folderName);
      return res.json({ newFolder });
    }
  } catch (e: any) {
    throw new BadRequestError(e);
  }
} as RequestHandler);

folderRouter.patch("/:folderID", async function (req, res, next) {
  try {
    const validate = jsonschema.validate(req.body, folderPatch);
    if (validate) {
      const { folderName } = req.body;
      const { userID } = res.locals.user;
      const { folderID } = req.params;

      let editFolder = await Folder.patchFolder(+folderID, folderName);

      return res.json({ editFolder });
    }
  } catch (e: any) {
    throw new BadRequestError(e);
  }
} as RequestHandler);
