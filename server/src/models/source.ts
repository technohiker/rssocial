import { QueryResult } from "pg"
import { db } from "../db"
import { BadRequestError } from "../helpers/ExpressError"
import { ISource } from "../types/ISource"

export class Source {
  static async getAll() {
    try {
      const sources: QueryResult<ISource> = await db.query(
        `SELECT * FROM sources`
      )
      return sources.rows
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }
  static async addSource(name: string, img: string) {
    try {
      const sources: QueryResult<ISource> = await db.query(
        `INSERT INTO sources (name, img)
        VALUES ($1, $2)
        RETURNING *`, [name, img]
      )
      return sources.rows[0]
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }
}