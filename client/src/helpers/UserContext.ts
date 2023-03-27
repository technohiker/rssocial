import { createContext } from "react";
import { IUser } from "../types/IUser";

/** Context that passes down user info and a function to update it.
 * Meant for /jobs:id route so clicking Apply will add the job ID to the user's info.
 */
export const UserContext = createContext<IUserContext>({
  currUser: {} as IUser,
  token: ""
});

interface IUserContext {
  currUser: IUser;
  token: string
}
