import { IMessage } from "../../types/IMessage";
import { IRSSItem } from "../../types/IRSS";
import { useState, useContext } from "react";
import { FeedContext } from "../../helpers/ContextFeed";
import "./FeedObject.css";
import { Button, Card, CardBody } from "reactstrap";

/** Displays render of clickable feed object.  Clicking on this opens up view of feed messages. */
export function FeedObject({
  visible,
  icon,
  feedName,
  feedID,
  messages,
  removeFeed,
}: IFeedObjectProps) {
  const loadMessages = useContext(FeedContext).loadMessages;
  const feedMessages = messages.filter((message) => message.feedID === feedID);
  console.log({ feedMessages });

  const [isClicked, toggleClicked] = useState(false);

  const deployMessages = () => {
    toggleClicked(!isClicked); //Needs to listen for any other clicks to occur.  Must be done in Sidebar.
    loadMessages(feedMessages);
  };

  const deleteFeed = async () => {
    await removeFeed(feedID);
  };

  return (
    <>
      <Card
        className={`${isClicked && "feed-clicked"} ${!visible && "hidden"}`}
      >
        <CardBody>
          <div onClick={deployMessages}>
            <img className="feed-img" src={icon} />
            <p>{feedName}</p>
            <p>{feedMessages.length}</p>
          </div>
        </CardBody>
      </Card>
      <Button onClick={deleteFeed}>X</Button>
    </>
  );
}

interface IFeedObjectProps {
  visible: boolean;
  icon: string;
  feedName: string;
  feedID: number;
  messages: IMessage[];
  removeFeed: (id: number) => Promise<void>;
}
