import { QueryResult } from "pg";
import { db } from "../db";
import { IReaction } from "../types/IReaction";

export class Reaction {

  /** Return all reactions. */
  static async getReactions() {
    const result: QueryResult<IReaction> = await db.query(
      `SELECT * FROM reactions`
    )
    return result.rows
  }
}
