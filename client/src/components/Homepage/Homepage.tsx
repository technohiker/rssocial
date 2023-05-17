import "./Homepage.css";
import { useState, useEffect, useContext } from "react";
import { IRSSFormSubmit, FeedForm } from "../FeedForm/FeedForm";
import { Message } from "../Message/Message";
import { ServerCaller } from "../../helpers/ServerCaller";
import { Sidebar } from "../Sidebar/Sidebar";
import { FeedContext } from "../../helpers/ContextFeed";
import { UserContext } from "../../helpers/ContextUser";
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
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
import { AddBookmarkForm } from "../AddBookmarkForm/AddBookmarkForm";

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
    //console.log({ userFeeds });
    if (Object.keys(userFeeds).length !== 0) {
      //console.log("Setting state.");
      setFolders(userFeeds.folders);
      setFeeds(userFeeds.feeds);
      setMessages(userFeeds.messages);
      setReactions(userFeeds.reactions);
      setSources(userFeeds.sources);
      setBookmarks(userFeeds.bookmarks);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [userFeeds]);

  useEffect(() => {
    //console.log({ messages });
  }, [messages]);

  const newFolder = async (name: string) => {
    try {
      const newFolder = await ServerCaller.postFolder(name);
      setFolders([...folders, newFolder]);
    } catch (e: any) {
      return e;
    }
  };

  const newBookmark = async (name: string) => {
    try {
      const newBookmark = await ServerCaller.postBookmark(name);
      setBookmarks([...bookmarks, newBookmark]);
    } catch (e: any) {
      return e;
    }
  };

  /** Submit information for a new call, and return a new feed object. */
  const addCall = async (body: IRSSFormSubmit) => {
    try {
      const newFeed = await ServerCaller.postFeed(body);
      //console.log({ newFeed });
      // setFeeds([...feeds, newFeed]);
      // setFeeds((feeds) => [...feeds, newFeed]);
      const newFeeds = [...feeds, newFeed];
      setFeeds(newFeeds);
      //console.log({ feeds });
      //  await getUserFeeds(currUser.username);
    } catch (e: any) {
      return e;
    }
  };

  const toggleFeedModal = () => setFeedModal(!feedModal);
  const toggleFolderModal = () => setFolderModal(!folderModal);
  const toggleBookmarkModal = () => setBookmarkModal(!bookmarkModal);

  const formButtons = [
    <Button onClick={toggleFeedModal}>Make New Feed</Button>,
    <Button onClick={toggleFolderModal}>Make New Folder</Button>,
    <Button onClick={toggleBookmarkModal}>Make New Bookmark</Button>,
  ];

  const loadMessages = (newMessages: IUserMessage[]) => {
    // newMessages.sort();
    setCurrMessages(newMessages);
  };

  const updateMessage = (uMessage: IUserMessage) => {
    setMessages((messages) => {
      return messages.map((message) =>
        uMessage.id === message.id ? { ...uMessage } : message
      );
    });
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
        <p className="welcome-text">Welcome, {currUser.username}!</p>

        <Modal isOpen={folderModal} toggle={toggleFolderModal}>
          <ModalHeader toggle={toggleFolderModal}>
            Create New Folder
          </ModalHeader>
          <ModalBody>
            <FolderForm onSubmission={newFolder} />
          </ModalBody>
        </Modal>

        {/* <button onClick={toggleFeedModal}>Create New Feed</button> */}
        <Modal isOpen={feedModal} toggle={toggleFeedModal}>
          <ModalHeader toggle={toggleFeedModal}>Generate New Feed</ModalHeader>
          <ModalBody>
            {
              <FeedForm
                onSubmission={addCall}
                sources={sources}
                folders={folders}
              />
            }
          </ModalBody>
        </Modal>

        {/* <button onClick={toggleBookmarkModal}>Create New Bookmark</button> */}
        <Modal isOpen={bookmarkModal} toggle={toggleBookmarkModal}>
          <ModalHeader toggle={toggleBookmarkModal}>
            Create New Bookmark
          </ModalHeader>
          <ModalBody>
            <AddBookmarkForm onSubmission={newBookmark} />
          </ModalBody>
        </Modal>
        <div className="d-flex flex-row main-container">
          <Col xs={"2"}>
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
              <Sidebar buttons={formButtons} />
            </FeedContext.Provider>
          </Col>
          <Col xs={"9"}>
            {currMessages.length === 0 ? (
              <p className="message-list-empty">
                No messages yet. Please click on a feed to show messages. If you
                don't have a Feed, click on the Sidebar's top-right icon to add
                one.
              </p>
            ) : (
              <MessageList
                messages={currMessages}
                reactions={reactions}
                bookmarks={bookmarks}
                updateMessage={updateMessage}
              />
            )}
          </Col>
        </div>
      </>
    );
  }
}

interface IHomepageProps {
  currUser: IUser;
  userFeeds: INews;
  getUserFeeds: (username: string) => Promise<void>;
}
