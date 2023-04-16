/** Class pertaining to user objects. */
import bcrypt from "bcrypt";
import { BCRYPT_WORK_FACTOR } from "../config";
import { db } from "../db";
import { UnauthorizedError } from "../helpers/ExpressError";
import { BadRequestError } from "../helpers/ExpressError";
import { IUser } from "../types/IUser";
import format from "pg-format";
import { createToken } from "../helpers/tokens";

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
         RETURNING id AS userID, username, email`,
      [username, hashedPassword, email]
    );

    const user: IUser = result.rows[0];

    //Generate code for verification, then email it to user.

    const hashValue = bcrypt.hash(username+email,BCRYPT_WORK_FACTOR)

    createToken({
      id: user.id,
      hash: hashValue
    },{expiresIn: '1h'})

    console.log("New User:", user)
    return user;
  }

  /** Verify user. */
  static async verify(userID: number): Promise<IUser>{
    const result = await db.query(
      `UPDATE users
       SET verified=true
       WHERE user_id=$1
       RETURNING user_id,username,email,profile_img,bio`
       ,[userID]
    )

    return result.rows[0]
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
      `SELECT id, username, email, profile_img, bio
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

  /** Return full object of all user folders, feeds and messages. */
  static async getUserMessagesNested(userID: number) {
    let requests = await Promise.all([
      db.query(`SELECT f.id, f.folder_id, s.name AS source_name, s.img AS source_img, feed_name 
              FROM feeds f 
              JOIN sources s ON f.source_id = s.id
              WHERE user_id=$1`, [userID]),
      db.query(`SELECT * FROM folders WHERE user_id=$1`, [userID]),
    ]);

    const feeds = requests[0].rows;
    const folders = requests[1].rows;
    console.log({ feeds })
    console.log({ folders })

    let promises = [];

    for (let feed of feeds) {
      if (!folders[feed.folder_id - 1].feeds) {
        folders[feed.folder_id - 1].feeds = []
      }

      folders[feed.folder_id - 1].feeds.push(feed);
      promises.push((feed.messages = await this.getMessagesByFeed(feed.id)));
    }

    await Promise.all([promises]);

    console.log(folders[0].feeds[0].messages)

    return folders;
  }

  /** Get object of messages by feed ID.
   * Done to easily add array of messages to feed object,
   * instead of checking each feed ID on a message to determine whether to add it.
   */
  static async getMessagesByFeed(feedID: number) {
    const msgQuery = await db.query(
      `SELECT 
        m.id, feed_id notes, clicks, react_id, source_name
        author, title, content, date_created, source_link
      FROM user_messages um 
      JOIN messages m ON um.message_id = m.id
      WHERE feed_id=$1`,
      [feedID]
    );
    return msgQuery.rows;
  }
  static async getUserMessages(userID: number) {
    let requests = await Promise.all([
      db.query(`SELECT * FROM folders 
            WHERE user_id=$1`, [userID]),
      db.query(`SELECT f.id, f.folder_id, s.name AS source_name, s.img AS source_img, feed_name 
            FROM feeds f 
            JOIN sources s ON f.source_id = s.id
            WHERE user_id=$1`, [userID]),
      db.query(`SELECT 
              m.id, feed_id notes, clicks, react_id, feed_id, source_name,
              author, title, content, date_created, source_link
            FROM user_messages um 
            JOIN messages m ON um.message_id = m.id
            WHERE user_id=$1`, [userID]),
      db.query(`SELECT * FROM reactions`)
    ]);

    const masterFeeds = {
      folders: requests[0].rows,
      feeds: requests[1].rows,
      messages: requests[2].rows,
      reactions: requests[3].rows
    }

    return masterFeeds
  }
}

