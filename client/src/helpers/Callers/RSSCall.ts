import axios from "axios";

/** Receives RSS info and returns parsed XML. */
export class RSSCall {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  getRSS() {
    //Call RSS.
  }

  parseXML() {
    //Either parse XML that comes in, or use library that converts XML to JSON.
  }

  static async callRSS(url: string) {
    const response = await fetch(url);
    const decoded = new window.DOMParser().parseFromString(
      await response.text(),
      "text/xml"
    );
    return decoded;
  }
}
