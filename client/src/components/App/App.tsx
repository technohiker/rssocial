import "./App.css";
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { Homepage } from "../Homepage/Homepage";
import { RSSCall } from "../../helpers/Callers/RSSCall";

export function App() {
  const [token, setToken] = useState("");

  const callRSS = (url: string) => {
    console.log(RSSCall.callRSS(url));
  };

  return (
    <BrowserRouter>
      <NavBar
        routes={token === "" ? unauthRoutes : authRoutes}
        text="RSSFeed"
      />
      <main>
        <Switch>
          <Homepage callRSS={callRSS}></Homepage>
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
