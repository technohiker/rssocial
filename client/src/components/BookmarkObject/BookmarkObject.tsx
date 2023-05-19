import "./BookmarkObject.css";
import { useContext, useState } from "react";
import { FeedContext } from "../../helpers/ContextFeed";
import { SidebarCard } from "../SidebarCard/SidebarCard";

export function BookmarkObject({
  bookmarkID,
  name,
  icon,
  removeBookmark,
}: IBookmarkObjectProps) {
  const { messages, loadMessages } = useContext(FeedContext);
  const [isClicked, toggleClicked] = useState(false);

  const feedMessages = messages.filter(
    (message) => message.bookmark_id === bookmarkID
  );

  const deployMessages = () => {
    toggleClicked(!isClicked); //Needs to listen for any other clicks to occur.  Must be done in Sidebar.
    //loadMessages(feedMessages);
    loadMessages({ condition: "bookmark_id", value: bookmarkID });
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
    </>
  );
}
interface IBookmarkObjectProps {
  bookmarkID: number;
  name: string;
  icon: string;
  removeBookmark: (id: number) => Promise<void>;
}
