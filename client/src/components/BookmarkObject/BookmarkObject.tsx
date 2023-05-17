import "./BookmarkObject.css";
import { useContext, useState } from "react";
import { FeedContext } from "../../helpers/ContextFeed";
import { Button, Card, CardBody } from "reactstrap";
import { SidebarCard } from "../SidebarCard/SidebarCard";

export function BookmarkObject({
  bookmarkID,
  name,
  icon,
  removeBookmark,
}: IBookmarkObjectProps) {
  const { messages, loadMessages } = useContext(FeedContext);
  const feedMessages = messages.filter(
    (message) => message.bookmark_id === bookmarkID
  );

  const [isClicked, toggleClicked] = useState(false);

  const deployMessages = () => {
    toggleClicked(!isClicked); //Needs to listen for any other clicks to occur.  Must be done in Sidebar.
    loadMessages(feedMessages);
  };

  const deleteBookmark = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this folder?"
    );
    if (confirmed) await removeBookmark(bookmarkID);
  };

  return (
    <>
      <SidebarCard
        image="bookmark"
        cardName={name}
        cardDelete={deleteBookmark}
        onCardClick={deployMessages}
      />
      {/* <Card className={`${isClicked && "feed-clicked"}`}>
        <CardBody>
          <div onClick={deployMessages}>
            <img className="sidebar-img" src={icon} />
            <p>{name}</p>
          </div>
        </CardBody>
      </Card>
      <Button onClick={deleteBookmark}>Delete Bookmark</Button> */}
    </>
  );
}
interface IBookmarkObjectProps {
  bookmarkID: number;
  name: string;
  icon: string;
  removeBookmark: (id: number) => Promise<void>;
}
