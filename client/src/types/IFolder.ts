import { IFeed } from "./IFeed";

export interface IFolder {
  id: number;
  user_id: number;
  folder_name: string;
  icon: string;
  feeds?: IFeed[]
}
