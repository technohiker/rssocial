import { useEffect, useState } from "react";
import { Route, Redirect, RouteProps } from "react-router";

/** Route that redirects if verification is passed.
 * Stops users from returning to register/login, if they're already logged in.
 */
export function AuthorizedRoute({
  children,
  token,
  ...rest
}: IAuthorizeRouteProps) {
  const [hasToken, setBool] = useState(false);
  useEffect(() => {
    runAuth();
  }, []);

  const runAuth = () => {
    setBool(token !== "");
  };

  return (
    <Route
      {...rest}
      render={() => {
        return hasToken ? <Redirect to="/" /> : children; //Redirects to home page if user is already logged in.
      }}
    ></Route>
  );
}

interface IAuthorizeRouteProps extends RouteProps {
  children: React.ReactNode;
  //Children is not of the proper type.  Render will not accept it.  Will accept Redirect.
  //Any works as a workaround, but that's poor practice.
  token: string;
}
