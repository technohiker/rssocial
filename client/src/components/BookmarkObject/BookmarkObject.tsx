import "./BookmarkObject.css";
import { useContext, useState } from "react";
import { FeedContext } from "../../helpers/ContextFeed";
import { Button, Card, CardBody } from "reactstrap";

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
    await removeBookmark(bookmarkID);
  };

  return (
    <>
      <Card className={`${isClicked && "feed-clicked"}`}>
        <CardBody>
          <div onClick={deployMessages}>
            <img className="bookmark-img" src={icon} />
            <p>{name}</p>
            <p>{feedMessages.length}</p>
          </div>
        </CardBody>
      </Card>
      <Button onClick={deleteBookmark}>X</Button>
    </>
  );
}
interface IBookmarkObjectProps {
  bookmarkID: number;
  name: string;
  icon: string;
  removeBookmark: (id: number) => Promise<void>;
}
