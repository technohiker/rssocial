/** Class that holds methods for making API/RSS calls. */
import { IMessage } from "../types/IMessage";
import { Item, Output } from "rss-parser";
import Parser from "rss-parser";
import { db } from "../db";
import { QueryResult } from "pg";
import { ICall } from "../types/ICall";

export class Call {

  /** Receives a URL and calls it. */
  static async callRSS(url: string) {
    try {
      const parser = new Parser()
      console.log({ url })
      console.log({ parser })
      const xml: Output<Item> = await parser.parseURL(url)
      console.log({ xml })
      const messages = xml.items.map(item => this.makeMessage(item))
      //delete xml.items
      //xml.items = messages
      return xml
    } catch (e: any) {
      return "Invalid URL";
    }
  }

  /** Convert RSS messages into IMessage for storage.
   *  Checks for any missing fields when needed.
  */
  static makeMessage(message: ItemEx) {
    // console.log({ message })
    const newMessage = {} as IMessage

    if (message.creator) {
      newMessage.author = message.creator;
    }
    else {
      newMessage.author = "No author."
    }

    if (message.title) {
      newMessage.title = message.title
    }
    else {
      newMessage.title = "No title."
    }

    if (message.pubDate) {
      newMessage.date_created = new Date(message.pubDate);
    }
    else {
      newMessage.date_created = new Date();
    }

    if (message.guid) {
      if (!isNaN(+message.guid)) {  //guid has occasionally been the news article's internal ID instead of a link.  Check for this.
        if (message.link) {
          newMessage.source_link = message.link
        }
      }
      else {
        newMessage.source_link = message.guid
      }
    }
    else {
      newMessage.source_link = ""
    }

    if (message["content:encoded"]) {
      newMessage.content = message["content:encoded"]
    }
    else if (message.content) {
      newMessage.content = message.content
    }
    else {
      newMessage.content = null
    }

    if (message["content:encodedSnippet"]) {
      newMessage.description = message["content:encodedSnippet"]
    }
    else if (message.contentSnippet) {
      newMessage.description = message.contentSnippet
    }

    return newMessage
  }

  /** Use info received from front-end to create calls tailored to RSS feeds. */
  static makeRSSCall(url: string) {
    //Test if URL is a valid RSS URL.
    console.log({ url })
    return this.newCall(url)
  }

  static async newCall(url: string, body: string | null = null, params: string | null = null, headers: string | null = null) {
    console.log({ url })
    const query: QueryResult<ICall> = await db.query(
      `INSERT INTO calls (base_url, request_body, request_params, request_headers)
        VALUES($1,$2,$3,$4)
        RETURNING *`, [url, body, params, headers]
    )

    return query.rows[0]
  }

  static async getByUserID(userID: number) {
    const query: QueryResult<ICall> = await db.query(
      `SELECT c.id, f.id AS feed_id, s.name AS source_name, base_url, request_body, request_params, request_headers
      FROM calls c
      JOIN feeds f ON f.call_id = c.id
      JOIN sources s ON s.id = f.source_id
      WHERE f.user_id=$1`, [userID]
    )
    return query.rows
  }
}

interface ItemEx extends Item {
  "content:encoded"?: string,
  "content:encodedSnippet"?: string
}