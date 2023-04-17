import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { Homepage } from "../Homepage/Homepage";
import { UserPage } from "../UserPage/UserPage";
import { LoginForm } from "../LoginForm/LoginForm";
import { IUser } from "../../types/IUser";
import { INews } from "../../types/INews";
import { ServerCaller } from "../../helpers/ServerCaller";
import { AuthorizedRoute } from "../../helpers/AuthorizedRoute";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { Logout } from "../Logout/Logout";
import { ProtectedRoute } from "../../helpers/ProtectedRoute";
import jwt_decode from "jwt-decode";
import { VerifyRedirect } from "../VerifyRedirect/VerifyRedirect";

export function App() {
  const [userFeeds, setUserFeeds] = useState({} as INews);
  const [token, setToken] = useState("");
  const [currUser, setUser] = useState<IUser>({} as IUser);

  /** Call when token is changed. */
  useEffect(() => {
    console.log("Token changed:", token);
    changeToken(token);
  }, [token]);

  /** Call when currUser is changed. */
  useEffect(() => {
    console.log("currUser changed: ", currUser.id);

    if (currUser.id) {
      getUserFeeds(currUser.username);
    }
    console.log({ currUser });
  }, [currUser]);

  /** Set the API caller's token to what App's token is now.
   * If token exists, use it to get the current user.
   */
  const changeToken = async (token: string) => {
    ServerCaller.token = token;

    if (token) {
      let decoded = jwt_decode<ITokenDecoded>(token);

      const user = await ServerCaller.getUser(decoded.username);
      setUser(user);
    }
  };

  /** Receive massive object of folders, feeds and messages. */
  const getUserFeeds = async (username: string) => {
    try {
      const feeds = await ServerCaller.getNews(username);
      console.log({ feeds });
      setUserFeeds(feeds);
    } catch (e: any) {
      throw e;
    }
  };

  /** Add a new user to backend.
   * Receives token. {id, username, email}
   */
  const registerUser = async (
    username: string,
    password: string,
    email: string
  ): Promise<undefined | string[]> => {
    try {
      const newUser = { username: username, password: password, email: email };

      let token = await ServerCaller.registerUser(newUser);
      setToken(token);
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
    setUserFeeds({} as INews);
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
            <Homepage currUser={currUser} userFeeds={userFeeds} />
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
          <Route exact path="/verify">
            <VerifyRedirect setToken={setToken} />
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
