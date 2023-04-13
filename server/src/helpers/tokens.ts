import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { IUser } from "../types/IUser";

/** return signed JWT from user data. */

export function createToken(user: IUser) {
  let payload = {
    ...user
  };

  return jwt.sign(payload, SECRET_KEY);
}
