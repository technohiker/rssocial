import { IMessage } from "../types/IMessage";

/** Class for methods regarding messages. */
export class Message {
  /** Add multiple messages to database. */
  static async addMessages(messages: IMessage[]) {}
  /** Get a single message. */
  static async getMessage(messageID: string) {}
  /** Get all messages that match a certain feed ID. */
  static async getMessagesByFeed(feedID: string) {}
  /** Messages will be deleted if they are not saved by a certain amount of time. */
  static async expireMessages() {}
  /** Change unread to false. */
  static async messageRead(messageID: string) {}
}
