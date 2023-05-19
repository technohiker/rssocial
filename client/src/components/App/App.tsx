import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { NavBar } from "../NavBar/NavBar";
import { Homepage } from "../Homepage/Homepage";
import { LoginForm } from "../LoginForm/LoginForm";
import { IUser } from "../../types/IUser";
import { INews } from "../../types/INews";
import { IMetrics } from "../../types/IMetrics";
import { ServerCaller } from "../../helpers/ServerCaller";
import { AuthorizedRoute } from "../../helpers/AuthorizedRoute";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { Logout } from "../Logout/Logout";
import { ProtectedRoute } from "../../helpers/ProtectedRoute";
import { VerifyRedirect } from "../VerifyRedirect/VerifyRedirect";
import { useLocalStorageState } from "../../helpers/useLocalStorageState";
import { Metrics } from "../Metrics/Metrics";

/** Handles user login data and routing.  Also retrieves main news information from backend. */
export function App() {
  const [userFeeds, setUserFeeds] = useState({} as INews);
  const [token, setToken] = useLocalStorageState("token", "");
  const [currUser, setUser] = useState({} as IUser);

  /** Call when token is changed. */
  useEffect(() => {
    console.log("Token changed:", token);
    changeToken(token);
  }, [token]);

  /** Call when currUser is changed. */
  useEffect(() => {
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
      //Make RSS/API call to fetch any new messages.
      const res = await ServerCaller.fetchMessages();
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
      console.log({ token });
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
      console.log({ token });
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

  return (
    <BrowserRouter>
      <NavBar
        routes={token === "" ? unauthRoutes : authRoutes}
        text="RSSocial"
      />
      <main>
        <Switch>
          <Route exact path="/">
            <Homepage
              currUser={currUser}
              userFeeds={userFeeds}
              getUserFeeds={getUserFeeds}
            />
          </Route>
          <AuthorizedRoute exact path="/register" token={token}>
            <RegisterForm onSubmission={registerUser} />
          </AuthorizedRoute>
          <AuthorizedRoute exact path="/login" token={token}>
            <LoginForm onSubmission={loginUser} />
          </AuthorizedRoute>
          {/* <ProtectedRoute exact path="/metrics" auth={authToken}>
            <Metrics
              currUser={currUser}
              totalMessages={userFeeds.messages ? userFeeds.messages.length : 0}
            />
          </ProtectedRoute> */}
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
  // {
  //   path: "/metrics",
  //   text: "Metrics",
  // },
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
