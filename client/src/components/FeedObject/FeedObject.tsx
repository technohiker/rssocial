import { IMessage } from "../../types/IMessage";
import { IRSSItem } from "../../types/IRSS";
import { useState } from "react";

/** Displays render of clickable feed object.  Clicking on this opens up view of feed messages. */
export function FeedObject({
  icon,
  feedName,
  messages,
  loadMessages,
}: IFeedObjectProps) {

  const [isClicked, toggleClicked] = useState(false)

  const deployMessages = () => {
    toggleClicked(!isClicked)  //Needs to listen for any other clicks to occur.  Must be done in Sidebar.
    loadMessages(messages[0])
  }

  return (
    <div className={isClicked ? "feed-clicked" : ""} onClick={deployMessages}>
      <img src={icon} />
      <p>{feedName}</p>
      <p>{messages.length}</p>
    </div>
  );
}

interface IFeedObjectProps {
  icon: string;
  feedName: string;
  messages: IMessage[];
  loadMessages: (message: IMessage) => void;
}
