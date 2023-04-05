import { useState, useContext } from "react";
import { Card, CardBody } from "reactstrap";
import { FeedObject } from "../FeedObject/FeedObject";
import { ContextFeed } from "../../helpers/ContextFeed";
export function FolderObject({ folderName, folderID }: IFolderObjectProps) {
  const context = useContext(ContextFeed);
  const [feeds, setFeeds] = useState(context["feeds"]);
  const [feedsVisible, toggleFeeds] = useState(false);

  const toggleFeedObject = () => {
    toggleFeeds(!feedsVisible);
  };
  return (
    <>
      <Card onClick={toggleFeedObject}>
        <CardBody>
          <img alt="folder" src="folder.png" />
          <span>{folderName}</span>
        </CardBody>
      </Card>
      {feeds.map((feed) => {
        if (feed.folderID === folderID)
          return (
            <FeedObject
              visible={feedsVisible}
              icon={feed.icon}
              feedName={feed.name}
              feedID={feed.id}
              messages={context.messages}
            />
          );
      })}
    </>
  );
}

interface IFolderObjectProps {
  folderName: string;
  folderID: number;
}
