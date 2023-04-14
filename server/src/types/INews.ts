import { IFeed } from "./IFeed";
import { IFolder } from "./IFolder";
import { IUserMessage } from "./IMessage";
import { IReaction } from "./IReaction";

export interface INews {
  folders: IFolder[],
  feeds: IFeed[],
  messages: IUserMessage[],
  reactions: IReaction[]
}