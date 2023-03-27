import axios from "axios";
import { IUser } from "../types/IUser";
/** Call server endpoints that trigger RSS/API fetches. */

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export class ServerCaller {
  constructor() { }
  static token: string;

  static async request(endpoint: string, data = {}, method = "get") {

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ServerCaller.token}` };
    const params = method === "get" ? data : {};

    console.log("API Call:", url, data, method);

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      console.error("API Error:", err);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message]; //Is an array the best means for throwing errors?
    }
  }

  /** Send RSS info and retrieve RSS response. */
  static async callRSS(url: string) {
    const response = await this.request("calls/rss", { rssURL: url }, "post");
    console.log({ response })
    return response.data;
  }

  /** Create new user and receive token. */
  static async registerUser(user: IUser) {
    console.log("Setting up register call.")
    let res = await this.request(`auth/register/`, user, "post");
    console.log(res);
    return res.token;
  }

  /** Get token with login credentials. */
  static async authUser(username: string, password: string) {
    let res = await this.request(
      `auth/token/`,
      { username: username, password: password },
      "post"
    );
    return res.token;
  }

  static async getUser(username: string) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getFeeds(userID: string) { //Use token with ID instead of userID?  
    let res = await this.request(`users/${userID}/feeds`)
    return res.feeds
  }

  static async postFolder(folderName: string) {
    let res = await this.request(`folders/new`, { folderName: folderName }, "post")
    return res.folder;
  }
}
