import { QueryResult } from 'pg';
import { db } from '../db';
import { BadRequestError } from '../helpers/ExpressError';
import { IBookmark } from '../types/IBookmark';

export class Bookmark {
  static async newBookmark(userID: number, name: string): Promise<IBookmark> {
    try {
      const newBookmark: QueryResult<IBookmark> = await db.query(
        `INSERT INTO bookmarks(user_id, name)
        VALUES ($1,$2)
        RETURNING *`, [userID, name]
      )
      return newBookmark.rows[0]
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }

  static async getBookmark(id: number): Promise<IBookmark> {
    try {
      const bookmarks: QueryResult<IBookmark> = await db.query(
        `SELECT * FROM bookmarks WHERE id=$1`, [id]
      )
      return bookmarks.rows[0]
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }

  static async changeName(id: number, name: string): Promise<IBookmark> {
    try {
      const bookmark: QueryResult<IBookmark> = await db.query(
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

  static async deleteBookmark(id: number): Promise<IBookmark> {
    console.log({ id })
    try {
      const bookmark: QueryResult<IBookmark> = await db.query(
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

  static async getBookmarksByUser(userID: number): Promise<IBookmark[]> {
    try {
      const bookmarks: QueryResult<IBookmark> = await db.query(
        `SELECT * FROM bookmarks
        WHERE user_id=$1`, [userID]
      )
      return bookmarks.rows
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }

  static async addMessageToBookmark(bookmarkID: number, messageID: number, userID: number): Promise<number> {
    try {
      const bookmark: QueryResult<{ bookmark_id: number }> = await db.query(
        `UPDATE user_messages 
         SET bookmark_id=$1
         WHERE user_id=$2 AND message_id=$3 
         RETURNING bookmark_id
         `, [bookmarkID, userID, messageID])
      return bookmark.rows[0].bookmark_id
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }
}
