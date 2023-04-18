/** Class that holds methods for making API/RSS calls. */
import { IMessage } from "../types/IMessage";
import { Item, Output } from "rss-parser";
import Parser from "rss-parser";

export class Call {

  /** Receives a URL and calls it. */
  static async callRSS(url: string) {
    try {
      const parser = new Parser()
      const xml: Output<Item> = await parser.parseURL(url)
      console.log({ xml })
      const messages = xml.items.map(item => this.makeMessage(item))
      xml.items = messages
      return xml
    } catch (e: any) {
      console.log(e);
      return e;
    }
  }

  /** Convert RSS messages into IMessage for storage.
   *  Checks for any missing fields when needed.
  */
  static makeMessage(message: ItemEx) {
    console.log({ message })
    const newMessage = {} as IMessage

    if (message.creator) newMessage.author = message.creator;

    if (message.title) {
      newMessage.title = message.title
    }
    else {
      newMessage.title = "No title."
    }

    if (message.pubDate) {
      newMessage.date_created = message.pubDate;
    }
    else {
      newMessage.date_created = new Date().toDateString();
    }

    if (message.guid) {
      newMessage.source_link = message.guid
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

    if (message["content:encodedSnippet"]) {
      newMessage.description = message["content:encodedSnippet"]
    }
    else if (message.contentSnippet) {
      newMessage.description = message.contentSnippet
    }

    return newMessage
  }
}

interface ItemEx extends Item {
  "content:encoded"?: string,
  "content:encodedSnippet"?: string
}