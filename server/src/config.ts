/** Config values to be used across the project. */

import dotenv from "dotenv";
import colors from "colors";

export const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

export const PORT = +(process.env.PORT ?? 3001);

/** Generate Postgres database URL.  Values will be dependent on .env.  Changes if you want to use a testing database. */
export function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? `postgresql://${process.env.pg_user}:${process.env.pg_password}@${process.env.pg_host}:5432/${process.env.pg_database}_test`
    : `postgresql://${process.env.pg_user}:${process.env.pg_password}@${process.env.pg_host}:5432/${process.env.pg_database}`;
}

// Speed up bcrypt during tests, since the algorithm safety doesn't need to be tested.
export const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 14;

console.log("Capstone Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("---");
//console.log("URL:", getDatabaseUri());
