import "./Homepage.css";
import { useState, useEffect, useContext } from "react";
import { RSSForm } from "../RSSForm/RSSForm";
import { IRSSFeed } from "../../types/IRSS";
import { Message } from "../Message/Message";
import { ServerCaller } from "../../helpers/ServerCaller";
import { IMessage } from "../../types/IMessage";
import { IFolder } from "../../types/IFolder";
import { Sidebar } from "../Sidebar/Sidebar";
import { FeedContext } from "../../helpers/ContextFeed";
import { UserContext } from "../../helpers/ContextUser";
import { IFeed } from "../../types/IFeed";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { FolderForm } from "../FolderForm/FolderForm";
import { IUser } from "../../types/IUser";

export function Homepage({ currUser, token }: IHomepageProps) {
  const [rss, setRSS] = useState<IRSSFeed>({} as IRSSFeed);
  const [feedModal, setFeedModal] = useState(false);
  const [folderModal, setFolderModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [folders, setFolders] = useState<Array<IFolder>>([]);

  /** Call RSS info when homepage loads. */
  //  useEffect(() => {
  //   makeCall();
  // }, []);

  
  const postReaction = async (reactID: number,messageID: number){
    const res = await ServerCaller.postReaction(reactID,messageID,currUser.userID)
  }

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

  const newFolder = async (name: string) => {
    try {
      const newFolder = await ServerCaller.postFolder(name);
      setFolders((folders) => [...folders, newFolder]);
    } catch (e: any) {
      return e;
    }
  };

  const toggleFeedModal = () => setFeedModal(!feedModal);
  const toggleFolderModal = () => setFolderModal(!folderModal);

  const loadMessages = (newMessages: IMessage[]) => {
    setMessages(newMessages);
  };

  if (!token) {
    return (
      <p>
        Welcome to the RSS Social Media conglomerate! Unfortunately, you need to
        be logged in to see any news feeds. Please make an account and we can
        get you started.
      </p>
    );
  } else if (isLoading) {
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
        <p>Welcome, {currUser.username}!</p>
        <button onClick={toggleFolderModal}>Make New Folder</button>
        <Modal isOpen={folderModal} toggle={toggleFolderModal}>
          <ModalHeader toggle={toggleFolderModal}>
            Create New Folder
          </ModalHeader>
          <ModalBody>
            <FolderForm onSubmission={newFolder} />
          </ModalBody>
        </Modal>
        <button onClick={toggleFeedModal}>Create New Feed</button>
        <Modal isOpen={feedModal} toggle={toggleFeedModal}>
          <ModalHeader toggle={toggleFeedModal}>Generate New Feed</ModalHeader>
          <ModalBody>
            <RSSForm
              onSubmission={makeCall}
              folderOptions={defaultFolders.map((folder) => {
                return { value: folder.name, text: folder.name };
              })}
            />
          </ModalBody>
        </Modal>
        <FeedContext.Provider
          value={{
            folders: defaultFolders,
            feeds: defaultFeeds,
            messages: defaultMessages,
            loadMessages: loadMessages,
          }}
        >
          <Sidebar items={folders} />
        </FeedContext.Provider>
        {messages.map((message) => (
          <Message key={message.title} message={message} />
        ))}
      </>
    );
  }
}

interface IHomepageProps {
  currUser: IUser;
  token: string;
}

const defaultFolders: IFolder[] = [
  { name: "Folder1", ID: 1, userID: 1 },
  { name: "Folder2", ID: 2, userID: 1 },
  { name: "Folder3", ID: 3, userID: 2 },
];

const defaultFeeds: IFeed[] = [
  { id: 1, icon: "rss.png", name: "Feed1", folderID: 1 },
  { id: 2, icon: "rss.png", name: "Feed2", folderID: 2 },
  { id: 3, icon: "rss.png", name: "Feed3", folderID: 2 },
  { id: 4, icon: "rss.png", name: "Feed4", folderID: 3 },
  { id: 5, icon: "rss.png", name: "Feed5", folderID: 3 },
];

const defaultMessages: IMessage[] = [
  {
    messageID: 1,
    feedID: 1,
    author: "Tiny Tim",
    title: "Title 1",
    content: "Here's some test text",
    description: "Is this field even used by rss-parser?",
    date_created: "04/02/2023",
    source_link: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
    thumbnail: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
  },
  {
    messageID: 2,
    feedID: 2,
    author: "Tiny Tim",
    title: "Title 2",
    content: "Here's some test text",
    description: "Is this field even used by rss-parser?",
    date_created: "04/02/2023",
    source_link: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
    thumbnail: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
  },
  {
    messageID: 3,
    feedID: 3,
    author: "Tiny Tim",
    title: "Title 3",
    content: "Here's some test text",
    description: "Is this field even used by rss-parser?",
    date_created: "04/02/2023",
    source_link: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
    thumbnail: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
  },
  {
    messageID: 4,
    feedID: 4,
    author: "Tiny Tim",
    title: "Title 4",
    content: "Here's some test text",
    description: "Is this field even used by rss-parser?",
    date_created: "04/02/2023",
    source_link: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
    thumbnail: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
  },
  {
    messageID: 5,
    feedID: 4,
    author: "Tiny Tim",
    title: "Title 5",
    content: "Here's some test text",
    description: "Is this field even used by rss-parser?",
    date_created: "04/02/2023",
    source_link: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
    thumbnail: "rick-astley-never-gonna-give-you-up_35327903_ver1.jpg",
  },
];
