import "./App.css";
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { Homepage } from "../Homepage/Homepage";
import { RSSCall } from "../../helpers/Callers/RSSCall";
import { UserPage } from "../UserPage/UserPage";
import { LoginForm } from "../LoginForm/LoginForm";
import { IUser } from "../../types/IUser";
import { ServerCaller } from "../../helpers/ServerCaller";
import { RegisterForm } from "../RegisterForm/RegisterForm";

export function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<IUser>({} as IUser);

  /** Add a new user */
  const registerUser = async (
    username: string,
    password: string,
    email: string
  ): Promise<undefined | string[]> => {
    try {
      const newUser = { username: username, password: password, email: email };
      let token = await ServerCaller.registerUser(newUser);
      setToken(token);
      setUser(newUser);
    } catch (e: any) {
      return e;
    }
    return undefined;
  };

  /**Receive value from register or login, and set user to value. */
  const loginUser = async (
    username: string,
    password: string
  ): Promise<undefined | string[]> => {
    try {
      let token = await ServerCaller.authUser(username, password);
      setToken(token);
      let newUser: IUser = await ServerCaller.getUser(username);
      setUser(newUser);
    } catch (e: any) {
      console.log({ e });
      setToken("");
      return e;
    }
  };

  /** Send user's RSS info to backend. */
  const newFeed = async(rssURL: string) => {
    try{
      let res = await ServerCaller.callRSS(rssURL)
    }
    catch(e: any){
      return e
    }
    return undefined
  }

  /** Store folder info created by user. */
  const newFolder = async(folderName: string) => {
    try{
      let res = await ServerCaller.postFolder(folderName)
    }
    catch(e:any){
      return e
    }
    return undefined
  }

  return (
    <BrowserRouter>
      <NavBar
        routes={token === "" ? unauthRoutes : authRoutes}
        text="RSSFeed"
      />
      <main>
        <Switch>
          <Route exact path="/">
            <Homepage sendRSS={newFeed} />
          </Route>
          <Route exact path="/profile">
            <UserPage />
          </Route>
          <Route exact path="/register">
            <RegisterForm onSubmission={registerUser} />
          </Route>
          <Route exact path="/login">
            <LoginForm onSubmission={loginUser} />
          </Route>
          <Route exact path="/logout"></Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;

const unauthRoutes = [
  {
    path: "/register",
    text: "Register",
  },
  {
    path: "/login",
    text: "Log In",
  },
];
const authRoutes = [
  {
    path: "/profile/edit",
    text: "Profile",
  },
  {
    path: "/logout",
    text: "Log Out",
  },
];
