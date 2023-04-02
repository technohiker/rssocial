import { useState, useContext } from "react";
import { Card, CardBody } from "reactstrap";
import { IFeed } from "../../types/IFeed";
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
          <span>Placeholder folder name.</span>
        </CardBody>
      </Card>
      {feeds.map((feed) => {
        if (feed.folderID === folderID)
          return (
            <FeedObject
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
  folderID: string;
}
