import { IBookmark } from "./IBookmark";
import { IFeed } from "./IFeed";
import { IFolder } from "./IFolder";
import { IUserMessage } from "./IMessage";
import { IReaction } from "./IReaction";
import { ISource } from "./ISource";

export interface INews {
  folders: IFolder[],
  feeds: IFeed[],
  messages: IUserMessage[],
  reactions: IReaction[],
  sources: ISource[],
  bookmarks: IBookmark[],
}