import { IMessage } from "../../types/IMessage";
import { IRSSItem } from "../../types/IRSS";
import { useState, useContext } from "react";
import { ContextFeed } from "../../helpers/ContextFeed";
import "./FeedObject.css";
import { Card, CardBody } from "reactstrap";

/** Displays render of clickable feed object.  Clicking on this opens up view of feed messages. */
export function FeedObject({
  visible,
  icon,
  feedName,
  feedID,
  messages,
}: IFeedObjectProps) {
  const loadMessages = useContext(ContextFeed).loadMessages;
  const feedMessages = messages.filter((message) => message.feedID === feedID);
  console.log({ feedMessages });

  const [isClicked, toggleClicked] = useState(false);

  const deployMessages = () => {
    toggleClicked(!isClicked); //Needs to listen for any other clicks to occur.  Must be done in Sidebar.
    loadMessages(feedMessages);
  };

  return (
    <Card>
      <CardBody>
        <div
          className={`${isClicked && "feed-clicked"} ${!visible && "hidden"}`}
          onClick={deployMessages}
        >
          <img className="feed-img" src={icon} />
          <p>{feedName}</p>
          <p>{feedMessages.length}</p>
        </div>
      </CardBody>
    </Card>
  );
}

interface IFeedObjectProps {
  visible: boolean;
  icon: string;
  feedName: string;
  feedID: number;
  messages: IMessage[];
}
