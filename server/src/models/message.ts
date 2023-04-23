import { QueryResult } from "pg";
import { db } from "../db";
import { IMessage } from "../types/IMessage";
import format from "pg-format";
import pgPromise from 'pg-promise'

const pgp = pgPromise()
const insert = pgp.helpers.insert


/** Class for methods regarding messages. */
export class Message {
  /** Add multiple messages to database. Uses pg-format to allow for dynamic multiple insertion*/
  static async addMessages(messages: IMessage[], userID: number, feedID: number, sourceName: string) {

    let msgColumns = new pgp.helpers.ColumnSet(['source_name', 'author', 'title', 'content', 'date_created', 'source_link'], { table: 'messages' })

    let msgValues = insert(messages.map(message => {
      return {
        ...message,
        source_name: sourceName
      }
    }), msgColumns)


    //Insert into messages.
    // let sql = format(
    //   `INSERT INTO messages
    //   (source_name, author, title, content, date_created, source_link)
    //   VALUES %L RETURNING *`,
    //   messages
    // );
    // console.log({ sql })
    let msgQuery: QueryResult<IMessage> = await db.query(`${msgValues} 
      ON CONFLICT ON CONSTRAINT unique_title_source_name 
        DO UPDATE SET source_name = $1
      RETURNING id`, [sourceName]);

    //  console.log({ msgQuery })
    //  console.log("Row 1:", msgQuery.rows[0])

    if (msgQuery.rows.length === 0) return [{} as IMessage]

    const idPairs = msgQuery.rows.map((msg) => ({
      message_id: msg.id,
      user_id: userID,
      feed_id: feedID
    }));
    //console.log({ idPairs })

    let usrColumns = new pgp.helpers.ColumnSet(['message_id', 'user_id', 'feed_id'], { table: 'user_messages' })

    let usrValues = insert(idPairs, usrColumns)
    // console.log({ usrValues })

    //Insert into user messages.
    //I need a message ID for each message I insert.  How do I get it?
    // let sql2 = format(
    //   `INSERT INTO user_messages
    //   (message_id,user_id,feed_id)
    //   VALUES %L RETURNING *`,
    //   idPairs
    // );
    // console.log({ sql2 })

    let userQuery = await db.query(`${usrValues} 
    ON CONFLICT (user_id, message_id) 
      DO UPDATE SET user_id=$1 
    RETURNING *`, [userID]);
    // console.log({ userQuery })

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
