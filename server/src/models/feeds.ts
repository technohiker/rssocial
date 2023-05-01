import { QueryResult } from "pg";
import { db } from "../db";
import { IFeed } from "../types/IFeed";

export class Feeds {
  /** Get a feed by it's ID. */
  static async getFeed(feedID: number): Promise<IFeed> {
    const query: QueryResult<IFeed> = await db.query(
      `SELECT * FROM feeds
      WHERE id=$1`,
      [feedID]
    );
    return query.rows[0];
  }

  static async newFeed(
    feedName: string,
    userID: number,
    folderID: number,
    sourceID: number,
    callID: number
  ): Promise<IFeed> {
    const query: QueryResult<IFeed> = await db.query(
      `INSERT INTO feeds (user_id, folder_id, source_id, call_id, feed_name)
      VALUES($1,$2,$3,$4,$5)
      RETURNING *`,
      [userID, folderID, sourceID, callID, feedName]
    );

    return query.rows[0];
  }

  static async getFeedsByFolder(folderID: number): Promise<IFeed> {
    const query: QueryResult<IFeed> = await db.query(
      `SELECT f.id, f.user_id, f.folder_id, s.name AS source_name, 
      s.img AS source_img, feed_name, call_id 
      FROM feeds f
      JOIN sources s ON f.source_id = s.id
      WHERE folder_id=$1`,
      [folderID]
    );
    return query.rows[0];
  }

  static async getFeedsByUser(userID: number): Promise<IFeed> {
    const query: QueryResult<IFeed> = await db.query(
      `SELECT f.id, f.user_id, f.folder_id, s.name AS source_name, 
      s.img AS source_img, feed_name, call_id 
      FROM feeds f
      JOIN sources s ON f.source_id = s.id
      WHERE user_id=$1`,
      [userID]
    );
    return query.rows[0];
  }

  static async deleteFeed(feedID: number): Promise<IFeed> {
    const query: QueryResult<IFeed> = await db.query(
      `DELETE FROM feeds
       WHERE id=$1`,
      [feedID]
    );

    return query.rows[0];
  }
}
