import { IMessage, IUserMessage } from "../../types/IMessage";
import { IRSSItem } from "../../types/IRSS";
import { useState, useContext } from "react";
import { FeedContext } from "../../helpers/ContextFeed";
import "./FeedObject.css";
import { Button, Card, CardBody, Col } from "reactstrap";

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
    loadMessages(feedMessages);
  };

  const deleteFeed = async () => {
    await removeFeed(feedID);
  };

  return (
    <>
      <Card
        className={`sidebar-card ${isClicked && "feed-clicked"}`}
        onClick={deployMessages}
      >
        <CardBody className="d-flex flex-row align-items-center">
          <Col xs={1}>
            <img className="feed-img" src={icon} />
          </Col>
          <Col xs={10}>
            <p>{feedName}</p>
          </Col>
          <Col xs={1}>
            <Button onClick={deleteFeed}>X</Button>
          </Col>
        </CardBody>
      </Card>
    </>
  );
}

interface IFeedObjectProps {
  icon: string;
  feedName: string;
  feedID: number;
  removeFeed: (id: number) => Promise<void>;
}
