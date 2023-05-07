/** Config values to be used across the project. */

import { iTestInterface } from "../../shared/EXAMPLE";

const test: iTestInterface = { test: "string" }

console.log({ test })

import dotenv from "dotenv";
import colors from "colors";
import axios from "axios";

dotenv.config();

colors.enabled = true;

export const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
export const { pg_user } = process.env;
export const { pg_password } = process.env;
export const { pg_host } = process.env;
export const { pg_database } = process.env;
export const { pg_port } = process.env;
export const { email_address } = process.env;
export const { email_password } = process.env;
export const { email_host } = process.env;
export const { email_port } = process.env;

export const { sendinblue_key } = process.env;
export const { reddit_id } = process.env;
export const { reddit_secret } = process.env;
export const { reddit_token } = process.env;
export const { reddit_useragent } = process.env;
export const { reddit_refreshtoken } = process.env;


export const PORT = +(process.env.PORT ?? 3001);

/** Generate Postgres database URL.  Values will be dependent on .env.  Changes if you want to use a testing database. */
export function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? `postgresql://${pg_user}:${pg_password}@${pg_host}:${pg_port}/${pg_database}_test`
    : `postgresql://${pg_user}:${pg_password}@${pg_host}:${pg_port}/${pg_database}`;
}

// /** Reddit's access token expires after enough time passes.  Check to see if it's still good.(how do I make this persist between sessions?) */
// async function validateRedditToken(refreshToken: string) {
//   //Define parameters.
//   const params = {
//     grant_type: "authorization_code",
//   }
//   const newToken = await axios.get("https://www.reddit.com/api/v1/access_token", {})
//   //https://www.reddit.com/api/v1/access_token
//   return "access_token"
// }

// Speed up bcrypt during tests, since the algorithm safety doesn't need to be tested.
export const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 14;

console.log("Capstone Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("---");
console.log("URL:", getDatabaseUri());
