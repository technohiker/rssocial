import { db } from "../db";

export class Reaction {
  static async addReaction(messageID: number, userID: number) {
    const result = await db.query(
      `UPDATE user_messages  
                SET react_id
                WHERE user_id = ${userID} && message_id = ${messageID}
                RETURNING *`
    );
    return result.rows[0];
  }
}
