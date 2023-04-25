import axios from "axios";
import { IUser } from "../types/IUser";
import { Redirect } from "react-router-dom";
import { IRSSFormSubmit } from "../components/RSSForm/RSSForm";
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

  /** Send info for new call and feed. */
  static async postFeed(body: IRSSFormSubmit) {
    const response = await this.request(`calls/new?source=${body.source}`, "post", { ...body })
    console.log({ response })
    return response.feed
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

  /** Make RSS call and get new messages. */
  static async fetchMessages() {
    let res = await this.request(`calls/fetch`)
    console.log({ res })
    return res
  }

  /** Retrieve user info by username. */
  static async getUser(username: string) {
    let res = await this.request(`users/${username}`);
    console.log({ res })
    return res.user;
  }

  /** Send token to backend to verify new user. */
  static async verifyUser(token: string) {
    console.log("Now verifying...")
    let res = await this.request(`auth/verify`, 'post', {
      verToken: token
    })
    console.log({ res })

    return {
      verified: res.verified,
      token: res.token
    }
    //Need to give message if verification failed.
  }

  static async getFeeds(username: string) {
    //Use token with ID instead of userID?
    let res = await this.request(`users/${username}/feeds`);
    console.log({ res })
    return res.folders;
  }

  static async getNews(username: string) {
    //Use token with ID instead of userID?
    let res = await this.request(`users/${username}/feeds2`);
    console.log({ res })
    return res.news;
  }

  static async addClick(messageID: number) {
    let res = await this.request(`messages/${messageID}/click`, "post")

    return res.message
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

interface INewUser {
  username: string,
  password: string
}
