/** Class pertaining to user objects. */
import bcrypt from "bcrypt";
import { BCRYPT_WORK_FACTOR } from "../config";
import { db } from "../db";
import { UnauthorizedError } from "../helpers/ExpressError";
import { BadRequestError } from "../helpers/ExpressError";
import { IUser } from "../types/IUser";
import format from "pg-format";

export class User {
  userID: number;
  username: string;
  constructor(userID: number, username: string) {
    (this.userID = userID), (this.username = username);
  }

  /** Check if credentials match a user. */
  static async authenticate(username: string, password: string) {
    // try to find the user first
    const result = await db.query(
      `SELECT   id,
                username,
                password,
                email
              FROM users
              WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Incorrect username/password");
  }

  static async register({ username, password, email }: IUser) {
    const duplicateCheck = await db.query(
      `SELECT username
         FROM users
         WHERE username = $1`,
      [username]
    );
    console.log({ duplicateCheck });

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
         (username,
          password,
          email)
         VALUES ($1, $2, $3)
         RETURNING username, email`,
      [username, hashedPassword, email]
    );

    const user = result.rows[0];
    return user;
  }

  /** Return all users.(is this even useful for this project?) */
  static async getAll() {
    const result = await db.query(
      `SELECT   id,
                username,
                email
               FROM users
               ORDER BY username`
    );

    return result.rows;
  }

  /** Return specific user. */
  static async get(username: string) {
    const userRes = await db.query(
      `SELECT id,
              username,
              email
           FROM users
           WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];
    return user;
  }

  /** Return all reactions user has made. */
  static async getReactions(user_id: number) {
    const query = await db.query(
      `SELECT r.id, r.name, r.img
        FROM users u
          JOIN user_messages um ON u.id = um.user_id
          JOIN reactions r ON um.react_id = r.id
        WHERE u.id=$1
        `,
      [user_id]
    );
    return query.rows;
  }

  /** Return full object of all messages user has called. */
  static async getUserMessages(userID: number) {
    let requests = await Promise.all([
      db.query(`SELECT * FROM feeds WHERE user_id=$1`, [userID]),
      db.query(`SELECT * FROM folders WHERE user_id=$1`, [userID]),
    ]);

    const feeds = requests[0].rows;
    const folders = requests[1].rows;

    let promises = [];

    for (let feed of feeds) {
      folders[feed.folder_id].feeds.push(feed);
      promises.push((feed.messages = await this.getMessagesByFeed(feed.id)));
    }

    await Promise.all([promises]);

    // let feedIDs = feeds.map((feed) => feed.id);

    // const msgSql = format(
    //   `SELECT * FROM user_messages
    //   WHERE feedID= ANY($1)`,
    //   [feedIDs]
    // );
  }

  /** Get object of messages by feed ID.
   * Done to easily add array of messages to feed object,
   * instead of checking each feed ID on a message to determine whether to add it.
   */
  static async getMessagesByFeed(feedID: number) {
    const msgQuery = await db.query(
      `SELECT * FROM user_messages WHERE feedID=$1`,
      [feedID]
    );
    return msgQuery.rows;
  }
}
