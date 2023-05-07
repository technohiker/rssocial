import { QueryResult } from "pg";
import { db } from "../db";
import { IMessage, IUserMessage } from "../types/IMessage";
import pgPromise from 'pg-promise'
import { IReaction } from "../types/IReaction";

const pgp = pgPromise()
const insert = pgp.helpers.insert


/** Class for methods regarding messages. */
export class userMessage {

  /** Add multiple messages to database. 
   * Uses pg-promise to allow for dynamic multiple insertion
   * Re*/
  static async addMessages(messages: IMessage[], sourceName: string): Promise<IMessage[]> {

    //List columns to be added, then use pg-promise to format the values.
    let msgColumns = new pgp.helpers.ColumnSet(['source_name', 'author', 'title', 'content', 'date_created', 'source_link'], { table: 'messages' })
    let msgValues = insert(messages.map(message => {
      return {
        ...message,
        source_name: sourceName
      }
    }), msgColumns)

    //Insert messages into database and return ID.
    //If message already exists, update source name to avoid duplicates.
    //Need to update so that an ID is still returned.
    let msgQuery: QueryResult<IMessage> = await db.query(`${msgValues} 
      ON CONFLICT ON CONSTRAINT unique_title_source_name 
        DO UPDATE SET source_name = $1
      RETURNING *`, [sourceName]);

    if (msgQuery.rows.length === 0) return [{} as IMessage]
    return msgQuery.rows

    // //Tie all messages to the user and feed used to get them.
    // const idPairs = msgQuery.rows.map((msg) => ({
    //   message_id: msg.id,
    //   user_id: userID,
    //   feed_id: feedID
    // }));

    // //Use pg-promise once again.
    // let usrColumns = new pgp.helpers.ColumnSet(['message_id', 'user_id', 'feed_id'], { table: 'user_messages' })

    // let usrValues = insert(idPairs, usrColumns)

    // let userQuery: QueryResult<IUserMessage> = await db.query(`${usrValues} 
    // ON CONFLICT (user_id, message_id) 
    //   DO UPDATE SET user_id=$1 
    // RETURNING *`, [userID]);

    // return userQuery.rows;
  }

  /** New instances of user's messages are added in. */
  static async addUserMessages(messages: IMessage[], userID: number, feedID: number): Promise<IUserMessage[]> {
    const idPairs = messages.map((msg) => ({
      message_id: msg.id,
      user_id: userID,
      feed_id: feedID
    }));

    let usrColumns = new pgp.helpers.ColumnSet(['message_id', 'user_id', 'feed_id'], { table: 'user_messages' })

    let usrValues = insert(idPairs, usrColumns)

    let userQuery: QueryResult<IUserMessage> = await db.query(`${usrValues} 
    ON CONFLICT (user_id, message_id) 
      DO UPDATE SET feed_id=$1
    RETURNING *`, [feedID]);

    return userQuery.rows;
  }

  /** Get a single message. */
  static async getMessage(messageID: number): Promise<IUserMessage> {
    let query: QueryResult<IUserMessage> = await db.query(
      `
      SELECT
        source_name, author, title, content, date_created, source_link,r.name
        FROM user_messages um
        JOIN messages m WHERE m.id = um.message_id
        JOIN reactions r WHERE r.id = um.react_id
        WHERE message_id=$1`,
      [messageID]
    );

    return query.rows[0];
  }

  /** Get every user_message. */
  static async getAllUserMessages(): Promise<IUserMessage[]> {
    let query: QueryResult<IUserMessage> = await db.query(
      `SELECT * FROM user_messages`
    );

    return query.rows;
  }

  /** Get all messages from a certain user. */
  static async getMessagesByUser(userID: number): Promise<IUserMessage[]> {
    let query: QueryResult<IUserMessage> = await db.query(`
      SELECT  m.id, feed_id, notes, clicks, react_id, feed_id, bookmark_id,
            seen, source_name, author, title, content, date_created, source_link
      FROM user_messages um 
      JOIN messages m ON um.message_id = m.id
      WHERE user_id=$1
      ORDER BY SEEN ASC, date_created DESC`, [userID])

    return query.rows;
  }

  /** Get object of messages by feed ID.
   * Done to easily add array of messages to feed object,
   * instead of checking each feed ID on a message to determine whether to add it.(Currenly unused)
   */
  static async getMessagesByFeed(feedID: number) {
    const msgQuery = await db.query(
      `SELECT 
        m.id, feed_id notes, clicks, react_id, source_name,
        seen, author, title, content, date_created, source_link
      FROM user_messages um 
      JOIN messages m ON um.message_id = m.id
      WHERE feed_id=$1`,
      [feedID]
    );
    return msgQuery.rows;
  }

  /** Messages will be deleted if they are not saved by a certain amount of time. */
  static async expireMessages() {
    let seenQuery = await db.query(`
    SELECT message_id FROM user_messages
    WHERE seen=TRUE
    AND `); //If user had seen it 3 days ago and did nothing, delete.
    //Also check if message was bookmarked or reacted to.

    let deleteQuery = await db.query(`
    DELETE FROM messages
    WHERE message_id`);
  }

  static async addReaction(reactID: number, messageID: number, userID: number): Promise<IReaction> {
    const result: QueryResult<IReaction> = await db.query(
      `UPDATE user_messages  
                SET react_id=$1
                WHERE user_id = $2 AND message_id = $3
                RETURNING *`,
      [reactID, userID, messageID]
    );
    return result.rows[0];
  }

  /** Change unread to false. */
  static async messageSeen(userID: number, messageID: number): Promise<boolean> {
    let query: QueryResult<{ seen: boolean }> = await db.query(
      `UPDATE user_messages 
      SET seen=true
      WHERE message_id=$1 AND user_id=$2
      RETURNING message_id, seen`,
      [messageID, userID]
    );

    return query.rows[0].seen;
  }

  /** Increment a messages's click counter by 1. */
  static async addClick(messageID: number): Promise<IUserMessage> {
    let query: QueryResult<IUserMessage> = await db.query(
      `UPDATE user_messages 
      SET clicks=clicks+1
      WHERE message_id=$1
      RETURNING *`,
      [messageID]
    );

    return query.rows[0];
  }

  /** Add or update notes to a message. */
  static async addNotes(notes: string, messageID: number, userID: number): Promise<IUserMessage> {
    let query: QueryResult<IUserMessage> = await db.query(
      `UPDATE user_messages 
      SET notes=$1
      WHERE message_id=$2 AND user_id=$3
      RETURNING *`,
      [notes, messageID, userID]
    );

    return query.rows[0];
  }

  /** Add a bookmark to a message. */
  static async setBookmark(bookmarkID: number, messageID: number, userID: number): Promise<IUserMessage> {
    let query: QueryResult<IUserMessage> = await db.query(
      `UPDATE user_messages 
      SET bookmark_id=$1
      WHERE message_id=$2 AND user_id=$3
      RETURNING *`,
      [bookmarkID, messageID, userID]
    );

    return query.rows[0];
  }
}
