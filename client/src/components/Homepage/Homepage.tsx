import "./Homepage.css";
import { useState, useEffect, useContext } from "react";
import { IRSSFormSubmit, RSSForm } from "../RSSForm/RSSForm";
import { Message } from "../Message/Message";
import { ServerCaller } from "../../helpers/ServerCaller";
import { Sidebar } from "../Sidebar/Sidebar";
import { FeedContext } from "../../helpers/ContextFeed";
import { UserContext } from "../../helpers/ContextUser";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { FolderForm } from "../FolderForm/FolderForm";
import { IMessage, IUserMessage } from "../../types/IMessage";
import { IFolder } from "../../types/IFolder";
import { IFeed } from "../../types/IFeed";
import { IUser } from "../../types/IUser";
import { IReaction } from "../../types/IReaction";
import { INews } from "../../types/INews";
import { ISource } from "../../types/ISource";
import { MessageList } from "../MessageList/MessageList";
import { IBookmark } from "../../types/IBookmark";
import { BookmarkForm } from "../BookmarkFormNew/BookmarkFormNew";

export function Homepage({
  currUser,
  userFeeds,
  getUserFeeds,
}: IHomepageProps) {
  const [folders, setFolders] = useState<Array<IFolder>>([]);
  const [feeds, setFeeds] = useState<Array<IFeed>>([]);
  const [messages, setMessages] = useState<Array<IUserMessage>>([]);
  const [reactions, setReactions] = useState<Array<IReaction>>([]);
  const [sources, setSources] = useState<Array<ISource>>([]);
  const [bookmarks, setBookmarks] = useState<Array<IBookmark>>([]);

  const [feedModal, setFeedModal] = useState(false);
  const [folderModal, setFolderModal] = useState(false);
  const [bookmarkModal, setBookmarkModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [currMessages, setCurrMessages] = useState<Array<IUserMessage>>([]);

  /** Toggle spinning logo when a user's feeds is loading. */
  useEffect(() => {
    console.log({ userFeeds });
    if (Object.keys(userFeeds).length !== 0) {
      console.log("Setting state.");
      setFolders(userFeeds.folders);
      setFeeds(userFeeds.feeds);
      setMessages(userFeeds.messages);
      setReactions(userFeeds.reactions);
      setSources(userFeeds.sources);
      setBookmarks(userFeeds.bookmarks);
      console.log({ folders });

      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [userFeeds]);

  const newFolder = async (name: string) => {
    try {
      const newFolder = await ServerCaller.postFolder(name);
      console.log({ newFolder });
      setFolders([...folders, newFolder]);
      console.log({ folders });
    } catch (e: any) {
      return e;
    }
  };

  const newBookmark = async (name: string) => {
    try {
      const newBookmark = await ServerCaller.postBookmark(name);
      console.log({ newBookmark });
      setBookmarks([...bookmarks, newBookmark]);
      console.log({ bookmarks });
    } catch (e: any) {
      return e;
    }
  };

  const toggleFeedModal = () => setFeedModal(!feedModal);
  const toggleFolderModal = () => setFolderModal(!folderModal);
  const toggleBookmarkModal = () => setBookmarkModal(!bookmarkModal);

  const formButtons = [
    <button onClick={toggleFeedModal}>Make New Feed</button>,
    <button onClick={toggleFolderModal}>Make New Folder</button>,
    <button onClick={toggleBookmarkModal}>Make New Bookmark</button>,
  ];

  const loadMessages = (newMessages: IUserMessage[]) => {
    newMessages.sort();
    setCurrMessages(newMessages);
  };

  /** Submit information for a new call, and return a new feed object. */
  const addCall = async (body: IRSSFormSubmit) => {
    try {
      const newFeed = await ServerCaller.postFeed(body);
      console.log({ newFeed });
      setFeeds([...feeds, newFeed]);
      console.log({ feeds });

      await getUserFeeds(currUser.username);
    } catch (e: any) {
      return e;
    }
  };

  const showObjects = () => {
    console.log({ bookmarks });
  };

  const updateMessage = (uMessage: IUserMessage) => {
    setMessages((messages) => {
      return messages.map((message) =>
        uMessage.id === message.id ? { ...uMessage } : message
      );
    });
    console.log({ uMessage });
    console.log({ messages });
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
        <button onClick={toggleBookmarkModal}>Create New Bookmark</button>
        <Modal isOpen={bookmarkModal} toggle={toggleBookmarkModal}>
          <ModalHeader toggle={toggleBookmarkModal}>
            Create New Bookmark
          </ModalHeader>
          <ModalBody>
            <BookmarkForm onSubmission={newBookmark} />
          </ModalBody>
        </Modal>
        <FeedContext.Provider
          value={{
            folders: folders,
            setFolders: setFolders,
            feeds: feeds,
            setFeeds: setFeeds,
            messages: messages,
            setMessages: setMessages,
            bookmarks: bookmarks,
            setBookmarks: setBookmarks,
            loadMessages: loadMessages,
          }}
        >
          <Sidebar buttons={[<button></button>]} />
        </FeedContext.Provider>
        {currMessages.length === 0 ? (
          "No messages yet."
        ) : (
          <MessageList
            messages={currMessages}
            reactions={reactions}
            bookmarks={bookmarks}
            updateMessage={updateMessage}
          />
        )}
        <button onClick={showObjects} />
      </>
    );
  }
}

interface IHomepageProps {
  currUser: IUser;
  userFeeds: INews;
  getUserFeeds: (username: string) => Promise<void>;
}
