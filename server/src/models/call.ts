/** Class that holds methods for making API/RSS calls. */
import axios from "axios";
import X2JS from "x2js";
import { IMessage } from "../types/IMessage";
import { IRSSFeed, IRSSItem, IRSSParserObject } from "../types/IRSS";
import Parser from "rss-parser";

export class Call {

  static async parseXML(xml: string) {
    const x2js = new X2JS();
    let json: any = x2js.xml2js(xml);
    console.log(json.rss);
    return json.rss;
  }

  /** Receives a URL and calls it. */
  static async callRSS(url: string) {
    try {
      console.log({ url })
      let response = await axios.get(url);
      // let response = await fetch(url)
      // const textResponse = await response.text()
      // const xml = this.parseXML(response.data);
      const parser = new Parser()
      const xml = await parser.parseURL(url)
      console.log({ xml })
      return xml
    } catch (e: any) {
      console.log(e);
      return e;
    }
  }

  /** Convert RSS messages into IMessage for storage.
   *  Checks for any missing fields.
  */
  static makeMessage(message: IRSSParserObject): IMessage {
    const newMessage = {} as IMessage

    if (message.creator) newMessage.author = message.creator; //Ars Technica uses the attribute "__cdata"

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

    if (message.guid) {  //Everything seems to conform to guid.
      newMessage.source_link = message.guid
    }
    else {
      newMessage.source_link = message.link
    }

    if (message.content) {
      newMessage.content = message.content
    }
    //Have description if it's a clean string.
    //There may be HTML in string.  If so, should I parse it?

    // const newMessage: IMessage = {
    //   author: message.creator.__text,
    //   title: message.title,
    //   description: message.description,
    //   date_created: message.pubDate,
    //   source_link: message.guid.__text
    //   thumbnail: IDFK, seems to be all over the place.
    //      Ars Technica and medium have the image wrapped within other objects.  CNN doesn't always include an image.
    // }
    return newMessage
  }
}
