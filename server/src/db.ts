import { Client } from 'pg'
import { getDatabaseUri } from './config';

let database;

if (process.env.NODE_ENV === "production") {
  database = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  database = new Client({
    connectionString: getDatabaseUri(),
  });
}

export const db = database

db.connect();