import { useEffect, useState } from "react";

import { ServerCaller } from "../../helpers/ServerCaller";
import { Redirect } from "react-router-dom";
import { IUser } from "../../types/IUser";

/** Component for sending request to back-end for verifying new user's email. */
export function VerifyRedirect({ setToken }: IVerifyRedirectProps) {
  const [hasCalled, setHasCalled] = useState(false);
  const [verify, setVerify] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const verToken = params.get("verToken") ?? "No token";

  useEffect(() => {
    startVerify();
  }, []);

  const startVerify = async () => {
    const res = await ServerCaller.verifyUser(verToken);
    setVerify(res.verified);
    setHasCalled(true);
    if (res.verified) setToken(res.token);
  };

  if (!hasCalled) {
    return <div></div>;
  } else {
    if (verify) {
      return <Redirect exact to="/" />;
    } else {
      return <Redirect exact to="/register" />;
    }
  }
}

interface IVerifyRedirectProps {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}
