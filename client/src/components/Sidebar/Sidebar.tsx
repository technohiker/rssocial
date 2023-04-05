import { FolderObject } from "../FolderObject/FolderObject";
import "./Sidebar.css";
import { useState, useContext } from "react";
import { ContextFeed } from "../../helpers/ContextFeed";
import { Accordion, AccordionItem, UncontrolledAccordion } from "reactstrap";

/** Contains all RSS info. */
export function Sidebar({ items }: ISidebarProps<any>) {
  const context = useContext(ContextFeed);
  const [folders, setFolders] = useState(context["folders"]);
  return (
    <UncontrolledAccordion flush className="sidebar">
      {folders.map((folder) => (
        <AccordionItem>
          <FolderObject folderID={folder.ID} folderName={folder.name} />
        </AccordionItem>
      ))}
    </UncontrolledAccordion>
  );
}

interface ISidebarProps<T> {
  items: Array<T>;
}
