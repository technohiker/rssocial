import "./FolderObject.css";
import { useState, useContext, useEffect } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { FeedObject } from "../FeedObject/FeedObject";
import { FeedContext } from "../../helpers/ContextFeed";
import { ServerCaller } from "../../helpers/ServerCaller";
import { IMessage, IUserMessage } from "../../types/IMessage";
import { SidebarCard } from "../SidebarCard/SidebarCard";
import { CollapseButton } from "../CollapseButton/CollapseButton";
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
  const [feedsHidden, toggleFeedsHidden] = useState(false);

  const changeFeedsHidden = () => {
    toggleFeedsHidden(!feedsHidden);
  };

  //console.log({ feeds });
  console.log({ folderFeeds });

  useEffect(() => {
    console.log({ feeds });
    //  setFeeds(feeds.filter((feed) => feed.folder_id === folderID));
    console.log({ feeds });
  }, []);

  const deleteFolder = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this folder?"
    );
    if (confirmed) await removeFolder(folderID);
  };

  const loadAllFolderMessages = () => {
    const folderMessages: IUserMessage[] = [];
    for (let feed of feeds) {
      folderMessages.push(
        ...context["messages"].filter((message) => message.feed_id === feed.id)
      );
    }
    // context["loadMessages"]({ condition: "folder_id", value: folderID });
  };

  const removeFeed = async (feedID: number) => {
    const feed = await ServerCaller.deleteFeed(feedID);
    if (feed) {
      setFeeds((feeds) => feeds.filter((feed) => !(feed.id === feedID)));
    }
  };

  return (
    <>
      <SidebarCard
        collapseButton={
          <CollapseButton
            active={feedsHidden}
            changeActive={changeFeedsHidden}
          />
        }
        image="folder"
        cardName={folderName}
        cardDelete={deleteFolder}
        onCardClick={loadAllFolderMessages}
      />
      {/* <Card className="sidebar-card" onClick={loadAllFolderMessages}>
        <CardBody className="d-flex flex-row align-items-center">
          <Col xs={1}></Col>
          <Col xs={1}>
            <img alt="folder" className="sidebar-img" src="folder.png" />
          </Col>
          <Col xs={9}>
            <span>{folderName}</span>
          </Col>
          <Col xs={1}>
            <Button onClick={deleteFolder}>X</Button>
          </Col>
        </CardBody>
      </Card> */}
      {feedsHidden &&
        feeds.map((feed) => {
          if (feed.folder_id === folderID)
            return (
              <FeedObject
                key={feed.id}
                icon={feed.source_name}
                feedName={feed.feed_name}
                feedID={feed.id}
                removeFeed={removeFeed}
              />
            );
        })}
    </>
  );
}

interface IFolderObjectProps {
  folderName: string;
  folderID: number;
  removeFolder: (id: number) => Promise<void>;
}
