import "./Homepage.css";
import { useState, useEffect } from "react";
import { RSSCall } from "../../helpers/Callers/RSSCall";
import { RSSForm } from "../RSSForm/RSSForm";
import { CategoryFolder } from "../CategoryFolder/CategoryFolder";
import { IRSSFeed, IRSSItem } from "../../types/IRSS";
import { FeedObject } from "../FeedObject/FeedObject";
import { Message } from "../Message/Message";
import { ServerCaller } from "../../helpers/ServerCaller";
import { IMessage } from "../../types/IMessage";

export function Homepage() {
  const [rss, setRSS] = useState<IRSSFeed>({} as IRSSFeed);
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState({} as IMessage);

  /** Call RSS info when homepage loads. */
  useEffect(() => {
    makeCall();
  }, []);

  const makeCall = async () => {
    setLoading(true);
    setRSS(
      await ServerCaller.callRSS(
        "https://moxie.foxnews.com/google-publisher/sports.xml"
      )
    );
    setLoading(false);
  };

  const loadMessages = (newMessage: IMessage) => {
    setMessage(newMessage);
    console.log(message);
  };

  if (isLoading) {
    return <p>{"Not available yet."}</p>;
  } else {
    // return <CategoryFolder />;
    return (
      <>
        <FeedObject
          icon={rss.channel.image.url}
          feedName={rss.channel.title}
          messages={rss.channel.item}
          loadMessages={loadMessages}
        />
        <Message message={message} />
      </>
    );
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

//const defaultRSS: IRSSFeed = {
//};
