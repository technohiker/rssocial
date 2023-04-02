import { db } from "../db";

export class Reaction{
    static async addReaction(reactID: string, messageID: string, userID: string){
        const result = await db.query(
            `UPDATE user_messages  
                SET react_id
                WHERE user_id = ${userID} && message_id = ${messageID}
                RETURNING *`)
        return result.rows[0]
    }
    
}