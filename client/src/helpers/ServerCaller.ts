import axios from "axios";
/** Call server endpoints that trigger RSS/API fetches. */

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"; //Update this if needed.

export class ServerCaller {
  constructor() {}
  static token: string; //Multiple tokens are possible.  This logic may not work.
  static async request(endpoint: string, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: ` ${ServerCaller.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message]; //Is an array the best means for throwing errors?
    }
  }

  static async callRSS(rssURL: string) {
    const response = await this.request("/calls/rss", rssURL);
    return response.data;
  }
}
