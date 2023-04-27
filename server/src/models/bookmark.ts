import { db } from '../db';
import { BadRequestError } from '../helpers/ExpressError';

export class Bookmark {
  static async newBookmark(userID: number, name: string, icon: string) {
    try {
      const newBookmark = await db.query(
        `INSERT INTO bookmarks(user_id, name, icon)
        VALUES ($1,$2,$3)`, [userID, name, icon]
      )
      return newBookmark.rows[0]
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }

  static async getBookmark(id: number) {
    try {
      const bookmarks = await db.query(
        `SELECT * FROM bookmarks WHERE id=$1`, [id]
      )
      return bookmarks.rows[0]
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }

  static async changeName(id: number, name: string) {
    try {
      const bookmark = await db.query(
        `UPDATE bookmarks
        SET name=$2
        WHERE id=$1
        RETURNING *`, [id, name]
      )
      return bookmark.rows[0]
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }

  static async deleteBookmark(id: number) {
    try {
      const bookmark = await db.query(
        `DELETE FROM bookmarks
        WHERE id=$1
        RETURNING *`, [id]
      )
      return bookmark.rows[0]
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }

  static async getByUserID(userID: number) {
    try {
      const bookmarks = await db.query(
        `SELECT * FROM bookmarks
        WHERE user_id=$1`, [userID]
      )
      return bookmarks.rows
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }

  static async addMessageToBookmark(bookmarkID: number, messageID: number, userID: number) {
    try {
      const bookmark = await db.query(
        `UPDATE user_messages 
         SET bookmark_id=$1
         WHERE user_id=$2 AND message_id=$3 
         RETURNING bookmark_id
         `, [bookmarkID, messageID, userID])
      return bookmark.rows[0]
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }
}
