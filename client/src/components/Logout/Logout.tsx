import { useEffect } from "react";
import { Redirect } from "react-router";

/** Immediately runs a function for logging the user out. */
export function Logout({ logout }: ILogoutProps) {
  useEffect(() => {
    logout();
  }, [logout]);
  return <Redirect to="/" />;
}

interface ILogoutProps {
  logout: () => void;
}
