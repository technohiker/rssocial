import { db } from "../db";

/** Class for handling user folder objects. */
export class Folder {
  static async newFolder(userID: number, folderName: string) {
    let query = await db.query(
      `INSERT INTO folders
                (folder_name,
                user_id)
                VALUES ($1,$2)
                RETURNING *`,
      [folderName, userID]
    );

    return query.rows[0];
  }
  static async getFolder(folderID: number) {
    let query = await db.query(
      `SELECT * FROM folders
        WHERE folder_id=$1 RETURNING *`,
      [folderID]
    );
    return query.rows[0];
  }
  static async getFoldersOfUser(userID: number) {
    let query = await db.query(
      `SELECT * FROM folders
        WHERE user_id=$1 
        RETURNING *`,
      [userID]
    );
    return query.rows;
  }

  static async deleteFolder(folderID: number) {
    let query = await db.query(
      `DELETE FROM folders
         WHERE folder_id=$1
         RETURNING *`,
      [folderID]
    );
    return query.rows[0];
  }
  static async deleteFoldersOfUser(userID: number) {
    let query = await db.query(
      `DELETE FROM folders
           WHERE user_id=$1
           RETURNING *`,
      [userID]
    );
    return query.rows[0];
  }

  static async patchFolder(folderID: number, folderName: string) {
    let query = await db.query(
      `UPDATE folders
        SET folder_name=$1
        WHERE folder_id=$2
        RETURNING *`,
      [folderName, folderID]
    );
    return query.rows[0];
  }
}
