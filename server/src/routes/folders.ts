/**  Routes set up for making RSS/API calls. */

import Router, { RequestHandler } from "express";
import jsonschema from "jsonschema"
import { Folder } from "../models/folder";
import { BadRequestError } from "../helpers/ExpressError";
import folderNew from "../schemas/folderNew.json"

export const folderRouter = Router();

folderRouter.post('/new',async function (req, res, next) {
    //Validate req.body
    try{
        const validate = jsonschema.validate(req.body,folderNew);
        if(validate){
            const {folderName, userID } = req.body;
    
            let newFolder = await Folder.newFolder(userID, folderName)
        }
    }
    catch(e: any){
        throw new BadRequestError(e)
    }
    
} as RequestHandler)