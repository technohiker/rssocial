import "./Homepage.css";
import { useState, useEffect } from "react";
import { RSSForm } from "../RSSForm/RSSForm";
import { IRSSFeed, IRSSItem } from "../../types/IRSS";
import { Message } from "../Message/Message";
import { ServerCaller } from "../../helpers/ServerCaller";
import { IMessage } from "../../types/IMessage";
import { FolderObject } from "../FolderObject/FolderObject";
import { IFolder } from "../../types/IFolder";
import { Sidebar } from "../Sidebar/Sidebar";
import { ContextFeed } from "../../helpers/ContextFeed";

export function Homepage({ sendRSS }: IHomepageProps) {
  const [rss, setRSS] = useState<IRSSFeed>({} as IRSSFeed);
  const [isLoading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [folders, setFolders] = useState<Array<IFolder>>([]);

  /** Call RSS info when homepage loads. */
  //  useEffect(() => {
  //   makeCall();
  // }, []);

  const makeCall = async (url: string) => {
    // setLoading(true);

    try {
      // const { REACT_APP_RSS_URL } = process.env;

      // if (!REACT_APP_RSS_URL) return;

      const newRSS = await ServerCaller.callRSS(url);
      console.log({ newRSS });
      setRSS(newRSS);
      setMessages(newRSS.items);
      console.log(newRSS.items);
      // setLoading(false);
    } catch (e: any) {
      return e;
    }
  };

  const loadMessages = (newMessages: IMessage[]) => {
    setMessages(newMessages);
    console.log(messages);
  };

  if (isLoading) {
    return <p>{"Not available yet."}</p>;
  } else {
    // return <CategoryFolder />;
    return (
      <>
        {/* <button onClick={makeCall}>Call API</button> */}
        <button>Make New Folder</button>
        <RSSForm onSubmission={makeCall} />
        {folders.map((folder) => (
          <FolderObject
            key={folder.ID}
            folderID={folder.ID}
            folderName={folder.name}
          />
        ))}
        {/* <FeedObject
          icon={rss.channel.image.url}
          feedName={rss.channel.title}
          messages={rss.channel.item}
          loadMessages={loadMessages}
        /> */}
        {messages.map((message) => (
          <Message key={message.title} message={message} />
        ))}
        <ContextFeed.Provider value={[]}>
          <Sidebar items={folders} />
        </ContextFeed.Provider>
      </>
    );
  }
}

//const defaultRSS: IRSSFeed = {
//};

interface IHomepageProps {
  sendRSS: (url: string) => Promise<string[] | undefined>;
}
