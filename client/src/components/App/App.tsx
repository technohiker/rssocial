import "./App.css";
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { Homepage } from "../Homepage/Homepage";
import { RSSCall } from "../../helpers/Callers/RSSCall";
import { UserPage } from "../UserPage/UserPage";
import { LoginForm } from "../LoginForm/LoginForm";

export function App() {
  const [token, setToken] = useState("");

  return (
    <BrowserRouter>
      <NavBar
        routes={token === "" ? unauthRoutes : authRoutes}
        text="RSSFeed"
      />
      <main>
        <Switch>
          <Route exact path="/">
            <Homepage></Homepage>
          </Route>
          <Route exact path="/profile">
            <UserPage></UserPage>
          </Route>
          <Route exact path="/register"></Route>
          <Route exact path="/login"></Route>
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
