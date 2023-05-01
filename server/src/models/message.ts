import { QueryResult } from "pg";
import { db } from "../db";
import { IMessage, IUserMessage } from "../types/IMessage";
import pgPromise from 'pg-promise'

const pgp = pgPromise()
const insert = pgp.helpers.insert


/** Class for methods regarding messages. */
export class Message {
  /** Add multiple messages to database. Uses pg-format to allow for dynamic multiple insertion*/
  static async addMessages(messages: IMessage[], userID: number, feedID: number, sourceName: string): Promise<IUserMessage[]> {

    //Use pg-promise to dynamically insert multiple messages at once.
    let msgColumns = new pgp.helpers.ColumnSet(['source_name', 'author', 'title', 'content', 'date_created', 'source_link'], { table: 'messages' })

    let msgValues = insert(messages.map(message => {
      return {
        ...message,
        source_name: sourceName
      }
    }), msgColumns)

    let msgQuery: QueryResult<{ id: number }> = await db.query(`${msgValues} 
      ON CONFLICT ON CONSTRAINT unique_title_source_name 
        DO UPDATE SET source_name = $1
      RETURNING id`, [sourceName]);


    if (msgQuery.rows.length === 0) return [{} as IUserMessage]

    const idPairs = msgQuery.rows.map((msg) => ({
      message_id: msg.id,
      user_id: userID,
      feed_id: feedID
    }));

    let usrColumns = new pgp.helpers.ColumnSet(['message_id', 'user_id', 'feed_id'], { table: 'user_messages' })

    let usrValues = insert(idPairs, usrColumns)

    let userQuery: QueryResult<IUserMessage> = await db.query(`${usrValues} 
    ON CONFLICT (user_id, message_id) 
      DO UPDATE SET user_id=$1 
    RETURNING *`, [userID]);

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

  /** Get all messages that match a certain feed ID. */
  static async getMessagesByFeed(feedID: number): Promise<IUserMessage[]> {
    let query: QueryResult<IUserMessage> = await db.query(
      `SELECT * FROM user_messages
      WHERE message_id=$1`,
      [feedID]
    );

    return query.rows;
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

  /** Change unread to false. */
  static async messageSeen(userID: number, messageID: number): Promise<boolean> {
    let query: QueryResult<{ seen: boolean }> = await db.query(
      `UPDATE user_messages 
      SET seen=true
      WHERE message_id=$1 AND user_id=$2
      RETURNING message_id,seen`,
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
}
