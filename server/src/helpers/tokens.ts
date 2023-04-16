import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { IUser } from "../types/IUser";

/** return signed JWT from user data. */

export function createToken(values: {},options: jwt.SignOptions = {}) {
  let payload = {
    ...values
  };
  return jwt.sign(payload, SECRET_KEY,options);
}