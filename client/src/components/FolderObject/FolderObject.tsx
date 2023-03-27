import { useState } from "react";
import { Card, CardBody } from "reactstrap";
import { IFeed } from "../../types/IFeed";
import { FeedObject } from "../FeedObject/FeedObject";
export function FolderObject({ folderName, folderID }: IFolderObjectProps) {
  const [feeds, setFeeds] = useState([{} as IFeed]);
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
      {/* {feeds.map(feed => (<FeedObject icon=""/>))} */}
    </>
  );
}

interface IFolderObjectProps {
  folderName: string;
  folderID: string;
}
