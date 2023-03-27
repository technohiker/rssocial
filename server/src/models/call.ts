/** Class that holds methods for making API/RSS calls. */
import axios from "axios";
import X2JS from "x2js";
import { IMessage } from "../types/IMessage";
import { IRSSItem } from "../types/IRSS";

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
      return this.parseXML(response.data);
    } catch (e: any) {
      console.log(e);
      return e;
    }
  }

  /** Convert RSS messages into IMessage for storage.*/
  static makeMessage(message: IRSSItem): IMessage {
    const newMessage: IMessage = {
      author: message.creator.__text,
      title: message.title,
      description: message.description,
      date_created: message.pubDate,
      source_link: message.guid.__text
    }
    return newMessage
  }
}
