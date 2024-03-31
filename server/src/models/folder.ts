import { QueryResult, QueryResultRow } from "pg";
import { db } from "../db";
import { BadRequestError } from "../helpers/ExpressError";
import { IFolder } from "../types/IFolder";

/** Class for handling user folder objects. */
export class Folder {
  static async newFolder(userID: number, folderName: string): Promise<IFolder> {
    //Make sure folder name doesn't already exist.

    let dupCheck: QueryResult<{ name: string }> = await db.query(
      `SELECT name FROM folders WHERE user_id=$1 AND name=$2`,
      [userID, folderName]
    );

    if (dupCheck.rows[0])
      throw new BadRequestError(`Duplicate folder name: ${folderName}`);

    let query: QueryResult<IFolder> = await db.query(
      `INSERT INTO folders
                (name,
                user_id)
                VALUES ($1,$2)
                RETURNING *`,
      [folderName, userID]
    );

    return query.rows[0];
  }
  static async getFolder(folderID: number): Promise<IFolder> {
    let query: QueryResult<IFolder> = await db.query(
      `SELECT * FROM folders
        WHERE id=$1 RETURNING *`,
      [folderID]
    );
    return query.rows[0];
  }
  static async getFoldersByUser(userID: number): Promise<IFolder[]> {
    let query: QueryResult<IFolder> = await db.query(
      `SELECT * FROM folders
        WHERE user_id=$1`,
      [userID]
    );
    return query.rows;
  }

  static async deleteFolder(folderID: number): Promise<IFolder> {
    let query: QueryResult<IFolder> = await db.query(
      `DELETE FROM folders
         WHERE id=$1
         RETURNING *`,
      [folderID]
    );
    return query.rows[0];
  }
  static async deleteFoldersOfUser(userID: number): Promise<IFolder[]> {
    let query: QueryResult<IFolder> = await db.query(
      `DELETE FROM folders
           WHERE user_id=$1
           RETURNING *`,
      [userID]
    );
    return query.rows;
  }

  static async patchFolder(
    folderID: number,
    folderName: string
  ): Promise<IFolder> {
    let query: QueryResult<IFolder> = await db.query(
      `UPDATE folders
        SET name=$1
        WHERE id=$2
        RETURNING *`,
      [folderName, folderID]
    );
    return query.rows[0];
  }
}
