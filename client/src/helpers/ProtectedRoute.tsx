import { useEffect, useState } from "react";
import { Route, Redirect, RouteProps } from "react-router";

/** Route that only renders if authentication is passed. */
export function ProtectedRoute({
  children,
  auth,
  ...rest
}: IProtectedRouteProps) {
  const [bool, setBool] = useState(true);
  useEffect(() => {
    runAuth();
  }, []);

  const runAuth = async () => {
    setBool(await auth());
  };

  return (
    <Route
      {...rest}
      render={() => {
        return bool ? children : <Redirect to="/login" />;
      }}
    ></Route>
  );
}

interface IProtectedRouteProps extends RouteProps {
  children: React.ReactNode;
  //Children is not of the proper type.  Render will not accept it.  Will accept Redirect.
  //Any works as a workaround, but that's poor practice.
  auth: () => Promise<boolean>;
}
