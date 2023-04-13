import axios from "axios";
import { IUser } from "../types/IUser";
/** Call server endpoints that trigger RSS/API fetches. */

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export class ServerCaller {
  static token: string;

  static async request(endpoint: string, method = "get", data = {}) {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: ServerCaller.token };
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
    const response = await this.request("calls/rss", "post", { rssURL: url });
    console.log(response);
    return response.feed;
  }

  /** Create new user and receive token. */
  static async registerUser(user: INewUser) {
    console.log("Setting up register call.");
    let res = await this.request(`auth/register/`, "post", user);
    console.log(res);
    return res.token;
  }

  /** Get token with login credentials. */
  static async authUser(username: string, password: string) {
    let res = await this.request(`auth/token/`, "post", {
      username: username,
      password: password,
    });
    return res.token;
  }

  /** Retrieve user info by username. */
  static async getUser(username: string) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getFeeds(username: string) {
    //Use token with ID instead of userID?
    let res = await this.request(`users/${username}/feeds`);
    return res.feeds;
  }

  /** Create a new folder. */
  static async postFolder(folderName: string) {
    let res = await this.request(`folders/new`, "post", {
      folderName: folderName,
    });
    return res.folder;
  }

  /** Edit a folder's name. */
  static async patchFolder(folderName: string, folderID: number) {
    let res = await this.request(`folders/${folderID}`, "patch", {
      folderName: folderName,
    });
    return res.folder;
  }

  /** Delete a folder. */
  static async deleteFolder(folderID: number) {
    let res = await this.request(`folders/${folderID}`, "delete");
    return res.folder;
  }

  /** Add/update a reaction to a user's article. */
  static async postReaction(reactID: number, messageID: number) {
    let res = await this.request(`messages/${messageID}/react`, "post", {
      reactID: reactID,
    });
    return res.reaction;
  }

  /** Delete a folder. */
  static async deleteFeed(feedID: number) {
    let res = await this.request(`feeds/${feedID}`, "delete");
    return res.feed;
  }
}

interface INewUser extends Omit<IUser, "id"> {}
