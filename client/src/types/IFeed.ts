import { IUserMessage } from "./IMessage";

export interface IFeed {
  id: number;
  user_id: number;
  folder_id: number;
  source_name: string;
  source_img: string;
  feed_name: string;
  messages?: IUserMessage[];
}