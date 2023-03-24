/** Class pertaining to user objects. */
import bcrypt from "bcrypt";
import { BCRYPT_WORK_FACTOR } from "../config";
import { db } from "../db";
import { UnauthorizedError } from "../helpers/ExpressError";
import { BadRequestError } from "../helpers/ExpressError";
import { IUser } from "../types/IUser";

export class User {
  userID: string;
  username: string;
  constructor(userID: string, username: string) {
    (this.userID = userID), (this.username = username);
  }

  /** Check if credentials match a user. */
  static async authenticate(username: string, password: string) {
    // try to find the user first
    const result = await db.query(
      `SELECT   username,
                password,
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

    throw new UnauthorizedError("Invalid username/password");
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
         RETURNING username, email`,
      [username, hashedPassword, email]
    );

    const user = result.rows[0];
    return user;
  }

  /** Return all users.(is this even useful for this project?) */
  static async findAll() {
    const result = await db.query(
      `SELECT   username,
                email
               FROM users
               ORDER BY username`
    );

    return result.rows;
  }

  /** Return specific user. */
  static async get(username: string) {
    const userRes = await db.query(
      `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];
    return user;
  }
}
