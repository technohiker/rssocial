import { FolderObject } from "../FolderObject/FolderObject";
import "./Sidebar.css";
import { useState, useContext, useEffect, ReactElement } from "react";
import { FeedContext } from "../../helpers/ContextFeed";
import { Accordion, AccordionItem, UncontrolledAccordion } from "reactstrap";
import { ServerCaller } from "../../helpers/ServerCaller";
import { BookmarkObject } from "../BookmarkObject/BookmarkObject";
import { HamburgerButton } from "../HamburgerButton/HamburgerButton";

/** Contains all RSS info. */
export function Sidebar({ buttons }: ISidebarProps) {
  console.log({ FeedContext });
  const context = useContext(FeedContext);
  console.log({ context });
  const { folders, setFolders } = context;
  const { bookmarks, setBookmarks } = context;

  useEffect(() => {
    console.log({ folders });
  }, [folders]);

  const removeFolder = async (folderID: number) => {
    const folder = await ServerCaller.deleteFolder(folderID);

    if (folder) {
      setFolders(folders.filter((folder) => !(folder.id === folderID)));
    }
  };

  const removeBookmark = async (bookmarkID: number) => {
    const bookmark = await ServerCaller.deleteBookmark(bookmarkID);

    if (bookmark) {
      setBookmarks(
        bookmarks.filter((bookmark) => !(bookmark.id === bookmarkID))
      );
    }
  };

  return (
    <>
      <HamburgerButton buttons={buttons} />
      <UncontrolledAccordion flush className="sidebar">
        <div>
          {bookmarks ? (
            bookmarks.map((bookmark) => (
              <AccordionItem>
                <BookmarkObject
                  bookmarkID={bookmark.id}
                  name={bookmark.name}
                  icon={bookmark.icon}
                  removeBookmark={removeBookmark}
                />
              </AccordionItem>
            ))
          ) : (
            <></>
          )}
        </div>
        <div>
          {folders ? (
            folders.map((folder) => (
              <AccordionItem>
                <FolderObject
                  folderID={folder.id}
                  folderName={folder.name}
                  removeFolder={removeFolder}
                />
              </AccordionItem>
            ))
          ) : (
            <></>
          )}
        </div>
      </UncontrolledAccordion>
    </>
  );
}

interface ISidebarProps {
  buttons: Array<ReactElement<React.JSXElementConstructor<HTMLButtonElement>>>;
}
