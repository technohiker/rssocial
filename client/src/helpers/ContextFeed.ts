import { createContext } from "react";
import { IFeed } from "../types/IFeed";
import { IFolder } from "../types/IFolder";
import { IMessage, IUserMessage } from "../types/IMessage";
import { IReaction } from "../types/IReaction";
import { IBookmark } from "../types/IBookmark";
import { ICondition } from "../types/ICondition";

const defaultFolders: IFolder[] = [
];

const defaultFeeds: IFeed[] = [];

const defaultMessages: IUserMessage[] = [];

const defaultReactions: IReaction[] = [];

const defaultFunction = async (): Promise<void> => { };

// export const FeedContext = createContext<IContextFeed>({
//   folders: defaultFolders,
//   feeds: defaultFeeds,
//   messages: defaultMessages,
//   loadMessages: function () { },
//});

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
