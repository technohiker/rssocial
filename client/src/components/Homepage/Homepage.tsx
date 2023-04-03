import "./Homepage.css";
import { useState, useEffect } from "react";
import { RSSForm } from "../RSSForm/RSSForm";
import { IRSSFeed } from "../../types/IRSS";
import { Message } from "../Message/Message";
import { ServerCaller } from "../../helpers/ServerCaller";
import { IMessage } from "../../types/IMessage";
import { IFolder } from "../../types/IFolder";
import { Sidebar } from "../Sidebar/Sidebar";
import { ContextFeed } from "../../helpers/ContextFeed";
import { IFeed } from "../../types/IFeed";

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
    setLoading(true);

    try {
      const newRSS = await ServerCaller.callRSS(url);
      setRSS(newRSS);
      setMessages(newRSS.items);
    } catch (e: any) {
      return e;
    }
    setLoading(false);
  };

  const loadMessages = (newMessages: IMessage[]) => {
    setMessages(newMessages);
  };

  if (isLoading) {
    return (
      <>
        <div className="lds-ring">
          {/** From loading.io/css */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p>{"Not available yet."}</p>;
      </>
    );
  } else {
    return (
      <>
        <button>Make New Folder</button>
        <RSSForm onSubmission={makeCall} />
        <ContextFeed.Provider
          value={{
            folders: defaultFolders,
            feeds: defaultFeeds,
            messages: defaultMessages,
            loadMessages: loadMessages,
          }}
        >
          <Sidebar items={folders} />
        </ContextFeed.Provider>
        {messages.map((message) => (
          <Message key={message.title} message={message} />
        ))}
      </>
    );
  }
}

interface IHomepageProps {
  sendRSS: (url: string) => Promise<string[] | undefined>;
}

const defaultFolders: IFolder[] = [
  { name: "Folder1", ID: "1", userID: "1" },
  { name: "Folder2", ID: "2", userID: "1" },
  { name: "Folder3", ID: "3", userID: "2" },
];

const defaultFeeds: IFeed[] = [
  { id: "1", icon: "rss.png", name: "Feed1", folderID: "1" },
  { id: "2", icon: "rss.png", name: "Feed2", folderID: "2" },
  { id: "3", icon: "rss.png", name: "Feed3", folderID: "2" },
  { id: "4", icon: "rss.png", name: "Feed4", folderID: "3" },
  { id: "5", icon: "rss.png", name: "Feed5", folderID: "3" },
];

const defaultMessages: IMessage[] = [
  {
    messageID: "1",
    feedID: "1",
    author: "Tiny Tim",
    title: "Title 1",
    content: "Here's some test text",
    description: "Is this field even used by rss-parser?",
    date_created: "04/02/2023",
    source_link: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
    thumbnail: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
  },
  {
    messageID: "2",
    feedID: "2",
    author: "Tiny Tim",
    title: "Title 2",
    content: "Here's some test text",
    description: "Is this field even used by rss-parser?",
    date_created: "04/02/2023",
    source_link: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
    thumbnail: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
  },
  {
    messageID: "3",
    feedID: "3",
    author: "Tiny Tim",
    title: "Title 3",
    content: "Here's some test text",
    description: "Is this field even used by rss-parser?",
    date_created: "04/02/2023",
    source_link: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
    thumbnail: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
  },
  {
    messageID: "4",
    feedID: "4",
    author: "Tiny Tim",
    title: "Title 4",
    content: "Here's some test text",
    description: "Is this field even used by rss-parser?",
    date_created: "04/02/2023",
    source_link: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
    thumbnail: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
  },
  {
    messageID: "5",
    feedID: "4",
    author: "Tiny Tim",
    title: "Title 5",
    content: "Here's some test text",
    description: "Is this field even used by rss-parser?",
    date_created: "04/02/2023",
    source_link: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
    thumbnail: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
  },
];
