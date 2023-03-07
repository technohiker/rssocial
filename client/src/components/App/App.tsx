import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./App.css";

import { NavBar } from "../NavBar/NavBar";
import { CompanyList } from "../CompanyList/CompanyList";
import { JobList } from "../JobList/JobList";
import { CompanyDetail } from "../CompanyDetail/CompanyDetail";
import { JobDetail } from "../JobDetail/JobDetail";
import { LoginForm } from "../LoginForm/LoginForm";
import { SignupForm } from "../SignupForm/SignupForm";
import { ProfileForm } from "../ProfileForm/ProfileForm";
import { Homepage } from "../Homepage/Homepage";
import { Logout } from "../Logout/Logout";

import { useLocalStorageState } from "../../helpers/useLocalStorageState";
import { ProtectedRoute } from "../../helpers/ProtectedRoute";
import { AuthorizedRoute } from "../../helpers/AuthorizedRoute";
import { JoblyApi } from "../../helpers/API";
import { UserContext } from "../../helpers/UserContext";
import { defaultUser, IPatchUser, IUser } from "../../types/IUser";

function App({ defToken }: IApp) {
  const [token, setToken] = useLocalStorageState("token", defToken || "");
  const [currUser, setUser] = useState(defaultUser);

  /** Add new user. */
  const registerUser = async (
    newUser: IUser
  ): Promise<undefined | string[]> => {
    try {
      let token = await JoblyApi.registerUser(newUser);
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
      let token = await JoblyApi.authUser(username, password);
      setToken(token);
      let newUser: IUser = await JoblyApi.getUser(username);
      setUser(newUser);
    } catch (e: any) {
      console.log({ e });
      setToken("");
      return e;
    }
  };

  /**Unset user upon logout. */
  const logoutUser = () => {
    setUser(defaultUser);
    setToken("");
  };

  /** Check if token is authentic. */
  const authToken = async () => {
    try {
      //Decode current token.
      let decoded = jwt_decode<ITokenDecoded>(token);
      JoblyApi.token = token;

      //Run auth check to see if token is valid.
      let user = await JoblyApi.getUser(decoded["username"]);

      //Use token to get user data.
      setUser(user);
      return true;
    } catch (e) {
      setToken("");
      return false;
    }
  };

  /** Add job ID to user object. */
  const addJob = (jobID: string) => {
    setUser((user) => {
      user.applications.push(jobID);
      return user;
    });
  };

  /** Make changes to the user. */
  const editUser = async (adjUser: IPatchUser) => {
    try {
      let res = await JoblyApi.patchUser(currUser["username"], adjUser);
      setUser(res);
    } catch (e: any) {
      return e;
    }
  };

  /** Update JoblyAPI token whenever new token info is acquired. */
  useEffect(() => {
    if (token) JoblyApi.token = token;
  }, [token]);

  /**Check for token upon opening webpage. */
  useEffect(() => {
    if (token !== "") {
      authToken();
    } else {
      if (currUser) {
        setUser(defaultUser);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar routes={token === "" ? unauthRoutes : authRoutes} text="Jobly" />
      <main>
        <Switch>
          <ProtectedRoute exact path="/companies" auth={authToken}>
            <CompanyList />
          </ProtectedRoute>
          <ProtectedRoute exact path="/companies/:handle" auth={authToken}>
            <CompanyDetail />
          </ProtectedRoute>
          <ProtectedRoute exact path="/jobs" auth={authToken}>
            <JobList />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile/edit" auth={authToken}>
            <ProfileForm onSubmission={editUser} defaultValues={currUser} />
          </ProtectedRoute>
          <AuthorizedRoute exact path="/register" token={token}>
            {<SignupForm onSubmission={registerUser} />}
          </AuthorizedRoute>
          <AuthorizedRoute exact path="/login" token={token}>
            {<LoginForm onSubmission={loginUser} />}
          </AuthorizedRoute>
          <Route exact path="/logout">
            <Logout logout={logoutUser} />
          </Route>
          <Route exact path="/">
            <Homepage username={currUser.firstName} />
          </Route>
          <UserContext.Provider value={{ currUser, addJob }}>
            <ProtectedRoute exact path="/jobs/:id" auth={authToken}>
              <JobDetail />
            </ProtectedRoute>
          </UserContext.Provider>
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
    path: "/companies",
    text: "Companies",
  },
  {
    path: "/jobs",
    text: "Jobs",
  },
  {
    path: "/profile/edit",
    text: "Profile",
  },
  {
    path: "/logout",
    text: "Log Out",
  },
];

App.defaultProps = {
  defToken: "",
};

interface ITokenDecoded {
  username: string;
  isAdmin: boolean;
}

interface IApp {
  defToken?: string;
}
