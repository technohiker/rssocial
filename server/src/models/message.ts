import { QueryResult } from "pg";
import { db } from "../db";
import { IMessage } from "../types/IMessage";
import format from "pg-format";

/** Class for methods regarding messages. */
export class Message {
  /** Add multiple messages to database. Uses pg-format to allow for dynamic multiple insertion*/
  static async addMessages(messages: IMessage[], userID: number) {
    //Insert into messages.
    let sql = format(
      `INSERT INTO messages
    (source_name, author, title, content, date_created, source_link)
    VALUES %L RETURNING *`,
      messages
    );
    let msgQuery: QueryResult<IMessage> = await db.query(sql);

    const idPairs = msgQuery.rows.map((msg) => ({
      message_id: msg.messageID,
      user_id: userID,
    }));

    //Insert into user messages.
    //I need a message ID for each message I insert.  How do I get it?
    let sql2 = format(
      `INSERT INTO user_messages
      (message_id,user_id)
      VALUES %L RETURNING *`,
      idPairs
    );

    let userQuery = await db.query(sql);

    return userQuery.rows;
  }

  /** Get a single message. */
  static async getMessage(messageID: number) {
    let query = await db.query(
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
  static async getMessagesByFeed(feedID: number) {
    let query = await db.query(
      `
    SELECT * FROM user_messages
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
  static async messageRead(userID: number, messageID: number) {
    let query = await db.query(
      `
      UPDATE user_messages 
      SET seen=true
      WHERE message_id=$1 AND user_id=$2
      RETURNING message_id,seen`,
      [messageID, userID]
    );

    return query.rows[0];
  }
}
