import { FolderObject } from "../FolderObject/FolderObject";
import "./Sidebar.css";
import { useState, useContext } from "react";
import { ContextFeed } from "../../helpers/ContextFeed";

/** Contains all RSS info. */
export function Sidebar({ items }: ISidebarProps<any>) {
  const context = useContext(ContextFeed);
  const [folders, setFolders] = useState(context["folders"]);
  return (
    <>
      {folders.map((folder) => (
        <FolderObject folderID={folder.ID} folderName={folder.name} />
      ))}
    </>
  );
}

interface ISidebarProps<T> {
  items: Array<T>;
}

<Sidebar items={[5, "q"]} />;
