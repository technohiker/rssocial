import { QueryResult } from "pg";
import { db } from "../db";
import { IReaction } from "../types/IReaction";

export class Reaction {
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
}
