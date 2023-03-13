import "./Homepage.css";
import { useState } from "react";

export function Homepage({ callRSS }: IHomepageProps) {
  const [rss, setRSS] = useState(
    callRSS("https://patch.com/feeds/aol/new-jersey/oakland")
  );
  // callRSS("https://patch.com/feeds/aol/new-jersey/oakland");
  return <p>Placeholder.</p>;
}

interface IHomepageProps {
  callRSS: (url: string) => void;
}
