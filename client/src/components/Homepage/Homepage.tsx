import "./Homepage.css";
import { useState, useEffect } from "react";
import { RSSCall } from "../../helpers/Callers/RSSCall";
import { RSSForm } from "../RSSForm/RSSForm";

export function Homepage({ callRSS }: IHomepageProps) {
  const [rss, setRSS] = useState<any>(defaultRSS);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    makeCall();
  }, []);

  const makeCall = async () => {
    setLoading(true);
    setRSS(
      await RSSCall.callRSS("https://patch.com/feeds/aol/new-jersey/oakland")
    );
    setLoading(false);
    console.log({ rss });
  };

  if (isLoading) {
    return <p>{"Not available yet."}</p>;
  } else {
    return <RSSForm onSubmission={rssFormSubmit} />;
  }
}

const rssFormSubmit = async (
  username: string,
  password: string,
  email: string
) => {
  return await setTimeout(() => {
    console.log("Timer go!");
  }, 2000);
};

interface IHomepageProps {
  callRSS: (url: string) => void;
}

const defaultRSS = {
  rss: {
    _version: 0,
  },
};
