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

  static async deleteSource(id: number) {
    try {
      const sources: QueryResult<ISource> = await db.query(
        `DELETE FROM sources
        WHERE id=$1
        RETURNING *`, [id]
      )
      return sources.rows[0]
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }

  static async changeName(id: number, name: string) {
    try {
      const sources: QueryResult<ISource> = await db.query(
        `UPDATE sources
        SET name=$2
        WHERE id=$1
        RETURNING *`, [id, name]
      )
      return sources.rows[0]
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }

  static async getSourceID(name: string) {
    try {
      const sources: QueryResult<ISource> = await db.query(
        `SELECT id FROM sources
        WHERE name=$1`, [name]
      )
      return sources.rows[0]
    }
    catch (e: any) {
      throw new BadRequestError(e)
    }
  }
}