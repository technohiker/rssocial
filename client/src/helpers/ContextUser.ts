import { createContext } from "react";
import { IUser } from "../types/IUser";

/** Context that passes down user info and a function to update it.
 */
export const UserContext = createContext<IContextUser>({
  currUser: {} as IUser,
  token: "",
});

interface IContextUser {
  currUser: IUser;
  token: string;
}
