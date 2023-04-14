import { createContext } from "react";
import { IFeed } from "../types/IFeed";
import { IFolder } from "../types/IFolder";
import { IMessage, IUserMessage } from "../types/IMessage";
import { IReaction } from "../types/IReaction";

const defaultFolders: IFolder[] = [
];

const defaultFeeds: IFeed[] = [];

const defaultMessages: IUserMessage[] = [];

const defaultReactions: IReaction[] = [];

const defaultFunction = async (): Promise<void> => { };

export const FeedContext = createContext<IContextFeed>({
  folders: defaultFolders,
  feeds: defaultFeeds,
  messages: defaultMessages,
  loadMessages: function () { },
});

interface IContextFeed {
  folders: IFolder[];
  feeds: IFeed[];
  messages: IUserMessage[];
  loadMessages: (message: IUserMessage[]) => void;
}
