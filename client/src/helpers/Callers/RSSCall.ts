import axios from "axios";
import X2JS from "x2js";

/** Receives RSS info and returns parsed XML. */
export class RSSCall {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  static parseXML(xml: string) {
    const x2js = new X2JS();
    let json = x2js.xml2js(xml);
    return json;
  }
  /** Receives a URL and calls it. */
  static async callRSS(url: string) {
    try {
      let response = await axios.get(url);
      return this.parseXML(response.data);
      // return response;
    } catch (e: any) {
      console.log(e);
      return e;
    }
    //Should I do any checking to see if the URL string will lead to an RSS feed?
  }
}
