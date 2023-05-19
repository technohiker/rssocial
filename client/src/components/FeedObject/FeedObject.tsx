import { useState, useContext } from "react";
import { FeedContext } from "../../helpers/ContextFeed";
import "./FeedObject.css";
import { SidebarCard } from "../SidebarCard/SidebarCard";

/** Displays render of clickable feed object.  Clicking on this opens up view of feed messages. */
export function FeedObject({
  icon,
  feedName,
  feedID,
  removeFeed,
}: IFeedObjectProps) {
  const { messages, loadMessages } = useContext(FeedContext);
  const feedMessages = messages.filter((message) => message.feed_id === feedID);

  const [isClicked, toggleClicked] = useState(false);

  const deployMessages = () => {
    toggleClicked(!isClicked); //Needs to listen for any other clicks to occur.  Must be done in Sidebar.
    //loadMessages(feedMessages);
    loadMessages({ condition: "feed_id", value: feedID });
  };

  const deleteFeed = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this folder?"
    );
    if (confirmed) await removeFeed(feedID);
  };

  return (
    <>
      <SidebarCard
        image={icon}
        cardName={feedName}
        cardDelete={deleteFeed}
        onCardClick={deployMessages}
      />
    </>
  );
}

interface IFeedObjectProps {
  icon: string;
  feedName: string;
  feedID: number;
  removeFeed: (id: number) => Promise<void>;
}
