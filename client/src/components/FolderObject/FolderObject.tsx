import { useState, useContext, useEffect } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { FeedObject } from "../FeedObject/FeedObject";
import { FeedContext } from "../../helpers/ContextFeed";
import { ServerCaller } from "../../helpers/ServerCaller";
import { IMessage, IUserMessage } from "../../types/IMessage";
export function FolderObject({
  folderName,
  folderID,
  removeFolder,
}: IFolderObjectProps) {
  const context = useContext(FeedContext);
  const { feeds, setFeeds } = context;
  //setFeeds((feeds) => feeds.filter((feed) => feed.folder_id === folderID));
  // const [folderFeeds, setFolderFeeds] = useState(
  //   feeds.filter((feed) => feed.folder_id === folderID)
  // );

  const [folderFeeds, setFolderFeeds] = useState(feeds);

  console.log({ feeds });
  console.log({ folderFeeds });

  useEffect(() => {
    setFeeds(feeds.filter((feed) => feed.folder_id === folderID));
  }, []);

  const deleteFolder = async () => {
    await removeFolder(folderID);
  };

  const loadAllFolderMessages = () => {
    const folderMessages: IUserMessage[] = [];
    for (let feed of folderFeeds) {
      folderMessages.push(
        ...context["messages"].filter((message) => message.feed_id === feed.id)
      );
    }
    context["loadMessages"](folderMessages);
  };

  const removeFeed = async (feedID: number) => {
    const feed = await ServerCaller.deleteFeed(feedID);
    if (feed) {
      setFeeds((feeds) => feeds.filter((feed) => !(feed.id === feedID)));
    }
  };

  return (
    <Container>
      <Card className="sidebar-card" onClick={loadAllFolderMessages}>
        <CardBody>
          <img alt="folder" className="sidebar-img" src="folder.png" />
          <span>{folderName}</span>
        </CardBody>
      </Card>
      {feeds.map((feed) => {
        if (feed.folder_id === folderID)
          return (
            <FeedObject
              key={feed.id}
              icon={feed.source_img}
              feedName={feed.feed_name}
              feedID={feed.id}
              removeFeed={removeFeed}
            />
          );
      })}
      <Button onClick={deleteFolder}>Remove Folder</Button>
    </Container>
  );
}

interface IFolderObjectProps {
  folderName: string;
  folderID: number;
  removeFolder: (id: number) => Promise<void>;
}
