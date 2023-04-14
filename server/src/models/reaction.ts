import { db } from "../db";

export class Reaction {
  static async addReaction(reactID: number, messageID: number, userID: number) {
    const result = await db.query(
      `UPDATE user_messages  
                SET react_id=$1
                WHERE user_id = $2 AND message_id = $3
                RETURNING *`,
      [reactID, userID, messageID]
    );
    return result.rows[0];
  }
}
