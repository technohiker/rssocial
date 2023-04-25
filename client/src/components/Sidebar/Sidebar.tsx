import { FolderObject } from "../FolderObject/FolderObject";
import "./Sidebar.css";
import { useState, useContext, useEffect } from "react";
import { FeedContext } from "../../helpers/ContextFeed";
import { Accordion, AccordionItem, UncontrolledAccordion } from "reactstrap";
import { ServerCaller } from "../../helpers/ServerCaller";

/** Contains all RSS info. */
export function Sidebar({ items }: ISidebarProps<any>) {
  const context = useContext(FeedContext);
  console.log({ context });
  const { folders, setFolders } = context;

  useEffect(() => {
    console.log({ folders });
  }, [folders]);

  const removeFolder = async (folderID: number) => {
    const folder = await ServerCaller.deleteFolder(folderID);

    if (folder) {
      setFolders(folders.filter((folder) => !(folder.id === folderID)));
    }
  };

  return (
    <UncontrolledAccordion flush className="sidebar">
      {folders.map((folder) => (
        <AccordionItem>
          <FolderObject
            folderID={folder.id}
            folderName={folder.name}
            removeFolder={removeFolder}
          />
        </AccordionItem>
      ))}
    </UncontrolledAccordion>
  );
}

interface ISidebarProps<T> {
  items: Array<T>;
}
