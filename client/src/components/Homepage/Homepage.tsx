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
      </>
    );
  }
}

//const defaultRSS: IRSSFeed = {
//};

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
