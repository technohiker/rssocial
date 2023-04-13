import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { Homepage } from "../Homepage/Homepage";
import { UserPage } from "../UserPage/UserPage";
import { LoginForm } from "../LoginForm/LoginForm";
import { IUser } from "../../types/IUser";
import { ServerCaller } from "../../helpers/ServerCaller";
import { AuthorizedRoute } from "../../helpers/AuthorizedRoute";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { Logout } from "../Logout/Logout";
import { ProtectedRoute } from "../../helpers/ProtectedRoute";
import jwt_decode from "jwt-decode";

export function App() {
  const [userFeeds, setUserFeeds] = useState({})
  const [token, setToken] = useState("");
  const [currUser, setUser] = useState<IUser>({} as IUser);

  /** Set API caller's token to the state's token upon change. */
  useEffect(() => {
    ServerCaller.token = token;
    getUserFeeds(currUser.id)
  }, [token]);

  const getUserFeeds = async (username: strin) => {
    try{
      const feeds = await ServerCaller.getFeeds(userID)
      setUserFeeds(feeds)
    }
    catch(e: any){
      throw e
    }
  }

  /** Add a new user */
  const registerUser = async (
    username: string,
    password: string,
    email: string
  ): Promise<undefined | string[]> => {
    try {
      const newUser = { username: username, password: password, email: email };

      let token = await ServerCaller.registerUser(newUser);
      let decoded = jwt_decode<ITokenDecoded>(token);

      setToken(token);
      setUser(decoded);

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

  /** Convert user-related states to nothing. */
  const logoutUser = () => {
    setUser({} as IUser);
    setToken("");
    setUserFeeds({})
  };

  /** Check if token is authentic. */
  const authToken = async () => {
    try {
      //Decode current token.
      let decoded = jwt_decode<ITokenDecoded>(token);

      //Run auth check to see if token is valid.
      let user = await ServerCaller.getUser(decoded["username"]);

      //Use token to get user data.
      setUser(user);
      return true;
    } catch (e) {
      setToken("");
      return false;
    }
  };

  // /** Send user's RSS info to backend. */
  // const newFeed = async (rssURL: string) => {
  //   try {
  //     let res = await ServerCaller.callRSS(rssURL);
  //   } catch (e: any) {
  //     return e;
  //   }
  //   return undefined;
  // };

  /** Store folder info created by user. */
  const newFolder = async (folderName: string) => {
    try {
      let res = await ServerCaller.postFolder(folderName);
    } catch (e: any) {
      return e;
    }
    return undefined;
  };

  return (
    <BrowserRouter>
      <NavBar
        routes={token === "" ? unauthRoutes : authRoutes}
        text="RSSFeed"
      />
      <main>
        <Switch>
          <Route exact path="/">
            <Homepage currUser={currUser} userFeeds={userFeeds}/>
          </Route>
          <ProtectedRoute exact path="/profile" auth={authToken}>
            <UserPage />
          </ProtectedRoute>
          <AuthorizedRoute exact path="/register" token={token}>
            <RegisterForm onSubmission={registerUser} />
          </AuthorizedRoute>
          <AuthorizedRoute exact path="/login" token={token}>
            <LoginForm onSubmission={loginUser} />
          </AuthorizedRoute>
          <Route exact path="/logout">
            <Logout logout={logoutUser} />
          </Route>
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

interface ITokenDecoded {
  id: number;
  username: string;
  email: string;
}
