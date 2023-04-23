import "./Homepage.css";
import { useState, useEffect, useContext } from "react";
import { IRSSFormSubmit, RSSForm } from "../RSSForm/RSSForm";
import { Message } from "../Message/Message";
import { ServerCaller } from "../../helpers/ServerCaller";
import { IMessage, IUserMessage } from "../../types/IMessage";
import { IFolder } from "../../types/IFolder";
import { Sidebar } from "../Sidebar/Sidebar";
import { FeedContext } from "../../helpers/ContextFeed";
import { UserContext } from "../../helpers/ContextUser";
import { IFeed } from "../../types/IFeed";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { FolderForm } from "../FolderForm/FolderForm";
import { IUser } from "../../types/IUser";
import { IReaction } from "../../types/IReaction";
import { INews } from "../../types/INews";
import { ISource } from "../../types/ISource";

export function Homepage({ currUser, userFeeds }: IHomepageProps) {
  const [folders, setFolders] = useState<Array<IFolder>>([]);
  const [feeds, setFeeds] = useState<Array<IFeed>>([]);
  const [messages, setMessages] = useState<Array<IUserMessage>>([]);
  const [reactions, setReactions] = useState<Array<IReaction>>([]);
  const [sources, setSources] = useState<Array<ISource>>([]);

  const [feedModal, setFeedModal] = useState(false);
  const [folderModal, setFolderModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [currMessages, setCurrMessages] = useState<Array<IUserMessage>>([]);

  /** Toggle spinning logo when a user's feeds is loading. */
  useEffect(() => {
    if (Object.keys(userFeeds).length !== 0) {
      setFolders(userFeeds.folders);
      setFeeds(userFeeds.feeds);
      setMessages(userFeeds.messages);
      setReactions(userFeeds.reactions);
      setSources(userFeeds.sources);

      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [userFeeds]);

  const newFolder = async (name: string) => {
    try {
      const newFolder = await ServerCaller.postFolder(name);
      console.log({ newFolder });
      setFolders((folders) => [...folders, newFolder]);
    } catch (e: any) {
      return e;
    }
  };

  const postReaction = async (reactID: number, messageID: number) => {
    const reaction = await ServerCaller.postReaction(reactID, messageID);
    return reaction;
  };

  const toggleFeedModal = () => setFeedModal(!feedModal);
  const toggleFolderModal = () => setFolderModal(!folderModal);

  const loadMessages = (newMessages: IUserMessage[]) => {
    setCurrMessages(newMessages);
  };

  /** Submit information for a new call, and return a new feed object. */
  const addCall = async (body: IRSSFormSubmit) => {
    try {
      const newFeed = await ServerCaller.postCall(body);
      setFeeds([...feeds, newFeed]);
      await ServerCaller.fetchMessages();
    } catch (e: any) {
      return e;
    }
  };

  if (!currUser.id) {
    return (
      <p>
        Welcome to the RSS Social Media conglomerate! Unfortunately, you need to
        be logged in to see any news feeds. Please make an account and we can
        get you started.
      </p>
    );
  } else if (!currUser.verified) {
    return (
      <p>
        Welcome to the RSS Social Media conglomerate! Unfortunately, your
        account is not verified. Please check your email and click on the link
        sent to you.
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
        <p>{"Not available yet."}</p>
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
            {
              <RSSForm
                onSubmission={addCall}
                sources={sources}
                folders={folders}
              />
            }
          </ModalBody>
        </Modal>
        <FeedContext.Provider
          value={{
            folders: folders,
            feeds: feeds,
            messages: messages,
            loadMessages: loadMessages,
          }}
        >
          <Sidebar items={folders} />
        </FeedContext.Provider>
        {currMessages.map((message) => (
          <Message
            key={message.title}
            message={message}
            reactions={reactions}
            postReaction={postReaction}
            thisReaction={message.react_id}
          />
        ))}
      </>
    );
  }
}

interface IHomepageProps {
  currUser: IUser;
  userFeeds: INews;
}
