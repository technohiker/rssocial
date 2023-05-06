import Snoowrap from "snoowrap";
import { reddit_id, reddit_secret, reddit_useragent, reddit_token } from "../config";

export const redditCall = new Snoowrap({
  userAgent: reddit_useragent ? reddit_useragent : "RSSocial-User-Agent",
  clientId: reddit_id,
  clientSecret: reddit_secret,
  refreshToken: reddit_token
})