import "./FolderObject.css";
import { useState, useContext, useEffect } from "react";
import { FeedObject } from "../FeedObject/FeedObject";
import { FeedContext } from "../../helpers/ContextFeed";
import { ServerCaller } from "../../helpers/ServerCaller";
import { IUserMessage } from "../../types/IMessage";
import { SidebarCard } from "../SidebarCard/SidebarCard";
import { CollapseButton } from "../CollapseButton/CollapseButton";

/** Sidebar object that displays all folders a user has. */
export function FolderObject({
  folderName,
  folderID,
  removeFolder,
}: IFolderObjectProps) {
  const context = useContext(FeedContext);
  const { feeds, setFeeds } = context;

  const [feedsVisible, toggleFeedsVisible] = useState(false);

  const changeFeedsHidden = () => {
    toggleFeedsVisible(!feedsVisible);
  };

  const deleteFolder = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this folder?"
    );
    if (confirmed) await removeFolder(folderID);
  };

  const loadAllFolderMessages = () => {
    const folderMessages: IUserMessage[] = [];
    for (let feed of feeds) {
      folderMessages.push(
        ...context["messages"].filter((message) => message.feed_id === feed.id)
      );
    }
    // context["loadMessages"]({ condition: "folder_id", value: folderID });
  };

  const removeFeed = async (feedID: number) => {
    const feed = await ServerCaller.deleteFeed(feedID);
    if (feed) {
      setFeeds((feeds) => feeds.filter((feed) => !(feed.id === feedID)));
    }
  };

  return (
    <>
      <SidebarCard
        collapseButton={
          <CollapseButton
            active={feedsVisible}
            changeActive={changeFeedsHidden}
          />
        }
        image="folder"
        cardName={folderName}
        cardDelete={deleteFolder}
        onCardClick={loadAllFolderMessages}
      />

      {feedsVisible &&
        feeds.map((feed) => {
          if (feed.folder_id === folderID)
            return (
              <FeedObject
                key={feed.id}
                icon={feed.source_name}
                feedName={feed.feed_name}
                feedID={feed.id}
                removeFeed={removeFeed}
              />
            );
        })}
    </>
  );
}

interface IFolderObjectProps {
  folderName: string;
  folderID: number;
  removeFolder: (id: number) => Promise<void>;
}
