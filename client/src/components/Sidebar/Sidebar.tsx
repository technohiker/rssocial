import { FolderObject } from "../FolderObject/FolderObject";
import "./Sidebar.css";
import { useState } from "react";

/** Contains all RSS info. */
export function Sidebar({items}: ISidebarProps<any>) {
  const [folders, setFolders] = useState([])
  return (
    <>
    {folders.map(folder => <FolderObject />)}
    </>
  )
}

interface ISidebarProps<T>{
  items: Array<T>
}

<Sidebar items={[5,"q"]} />