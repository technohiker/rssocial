import { FolderObject } from "../FolderObject/FolderObject";
import "./Sidebar.css";
import { useContext, ReactElement } from "react";
import { FeedContext } from "../../helpers/ContextFeed";
import { Col, Row } from "reactstrap";
import { ServerCaller } from "../../helpers/ServerCaller";
import { BookmarkObject } from "../BookmarkObject/BookmarkObject";
import { HamburgerButton } from "../HamburgerButton/HamburgerButton";

/** Contains all RSS info. */
export function Sidebar({ buttons }: ISidebarProps) {
  const context = useContext(FeedContext);
  const { folders, setFolders } = context;
  const { bookmarks, setBookmarks } = context;
  console.log({ context });

  const removeFolder = async (folderID: number) => {
    const folder = await ServerCaller.deleteFolder(folderID);

    if (folder) {
      setFolders((folders) =>
        folders.filter((folder) => !(folder.id === folderID))
      );
    }
  };

  const removeBookmark = async (bookmarkID: number) => {
    const bookmark = await ServerCaller.deleteBookmark(bookmarkID);

    if (bookmark) {
      setBookmarks((bookmarks) =>
        bookmarks.filter((bookmark) => !(bookmark.id === bookmarkID))
      );
    }
  };

  return (
    <div className="sidebar">
      <Row className="sidebar-header">
        <Col xs={10}>
          <h4 className="sidebar-title">Sidebar</h4>
        </Col>
        <Col xs={2} className="px-0">
          <HamburgerButton buttons={buttons} />
        </Col>
      </Row>
      <div className="sidebar-content">
        <div>
          {bookmarks ? (
            bookmarks.map((bookmark) => (
              <BookmarkObject
                bookmarkID={bookmark.id}
                name={bookmark.name}
                icon={bookmark.icon}
                removeBookmark={removeBookmark}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <div>
          {folders ? (
            folders.map((folder) => (
              <FolderObject
                folderID={folder.id}
                folderName={folder.name}
                removeFolder={removeFolder}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

interface ISidebarProps {
  buttons: Array<ReactElement<React.JSXElementConstructor<HTMLButtonElement>>>;
}
