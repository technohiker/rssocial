import { useState, useContext, useEffect } from "react";
import { Button, Card, CardBody } from "reactstrap";
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
    console.log({ feeds });
    setFeeds(feeds.filter((feed) => feed.folder_id === folderID));
    console.log({ feeds });
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
    console.log({ feed });
    // console.log({ folderFeeds });
    // if (feed) {
    //   setFolderFeeds((folderFeeds) =>
    //     folderFeeds.filter((feed) => !(feed.id === feedID))
    //   );
    //   console.log({ folderFeeds });
    // }
    if (feed) {
      setFeeds((feeds) => feeds.filter((feed) => !(feed.id === feedID)));
    }
  };

  return (
    <>
      <Card onClick={loadAllFolderMessages}>
        <CardBody>
          <img alt="folder" src="folder.png" />
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
    </>
  );
}

interface IFolderObjectProps {
  folderName: string;
  folderID: number;
  removeFolder: (id: number) => Promise<void>;
}
