import { createContext } from "react";
import { IFeed } from "../types/IFeed";
import { IFolder } from "../types/IFolder";
import { IMessage } from "../types/IMessage";
import { IReaction } from "../types/IReaction";

const defaultFolders: IFolder[] = [
  { name: "Folder1", ID: 1, userID: 1 },
  { name: "Folder2", ID: 2, userID: 1 },
  { name: "Folder3", ID: 3, userID: 2 },
];

const defaultFeeds: IFeed[] = [];

const defaultMessages: IMessage[] = [];

const defaultReactions: IReaction[] = [];

const defaultFunction = async (): Promise<void> => {};

export const FeedContext = createContext<IContextFeed>({
  folders: defaultFolders,
  feeds: defaultFeeds,
  messages: defaultMessages,
  loadMessages: function () {},
});

interface IContextFeed {
  folders: IFolder[];
  feeds: IFeed[];
  messages: IMessage[];
  loadMessages: (message: IMessage[]) => void;
}
