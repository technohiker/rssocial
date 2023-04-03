import { FolderObject } from "../FolderObject/FolderObject";
import "./Sidebar.css";
import { useState, useContext } from "react";
import { ContextFeed } from "../../helpers/ContextFeed";

/** Contains all RSS info. */
export function Sidebar({ items }: ISidebarProps<any>) {
  const context = useContext(ContextFeed);
  const [folders, setFolders] = useState(context["folders"]);
  return (
    <div className="accordion sidebar">
      {folders.map((folder) => (
        <div className="accordion-header">
          <FolderObject folderID={folder.ID} folderName={folder.name} />
        </div>
      ))}
    </div>
  );
}

interface ISidebarProps<T> {
  items: Array<T>;
}
