import { createContext } from "react";
import { IFeed } from "../types/IFeed";
import { IFolder } from "../types/IFolder";
import { IUserMessage } from "../types/IMessage";
import { IBookmark } from "../types/IBookmark";
import { ICondition } from "../types/ICondition";


/** Context that passes down all news information and their containers. */
export const FeedContext = createContext({} as IContextFeed);

interface IContextFeed {
  folders: IFolder[];
  setFolders: React.Dispatch<React.SetStateAction<IFolder[]>>
  feeds: IFeed[];
  setFeeds: React.Dispatch<React.SetStateAction<IFeed[]>>
  messages: IUserMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IUserMessage[]>>
  bookmarks: IBookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<IBookmark[]>>
  loadMessages: (condition: ICondition) => void;
}
