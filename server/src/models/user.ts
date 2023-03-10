/** Class pertaining to user objects. */
import bcrypt from 'bcrypt'
import { db } from '../db';
import { UnauthorizedError } from '../helpers/ExpressError';

export class User {
    userID: string;
    username: string;
    constructor(userID: string,username: string){
        this.userID = userID,
        this.username = username
    }

    /** Check if credentials match a user. */
    static async authenticate(username: string, password: string) {
        // try to find the user first
        const result = await db.query(
          `SELECT username,
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
}