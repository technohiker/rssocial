import { useState, useContext } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { FeedObject } from "../FeedObject/FeedObject";
import { FeedContext } from "../../helpers/ContextFeed";
import { ServerCaller } from "../../helpers/ServerCaller";
export function FolderObject({
  folderName,
  folderID,
  removeFolder,
}: IFolderObjectProps) {
  const context = useContext(FeedContext);
  const [feeds, setFeeds] = useState(context["feeds"]);
  const [feedsVisible, toggleFeeds] = useState(false);

  const toggleFeedObject = () => {
    toggleFeeds(!feedsVisible);
  };

  const deleteFolder = async () => {
    await removeFolder(folderID);
  };

  const removeFeed = async (feedID: number) => {
    //  const feed = await ServerCaller.deleteFeed(feedID);
    //  if (feed) {
    setFeeds(feeds.filter((feed) => !(feed.id === feedID)));
    //  }
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
              removeFeed={removeFeed}
            />
          );
      })}
      <Button onClick={deleteFolder}>Y</Button>
    </>
  );
}

interface IFolderObjectProps {
  folderName: string;
  folderID: number;
  removeFolder: (id: number) => Promise<void>;
}
