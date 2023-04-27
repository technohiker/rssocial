import { IBookmark } from "../../types/IBookmark";
import { IUserMessage } from "../../types/IMessage";
import { IReaction } from "../../types/IReaction";
import { Message } from "../Message/Message";
import "./MessageList.css";

/** List of messages.(what's the best way to present these?  avoid infinite scroll) */
export function MessageList({
  messages,
  reactions,
  postReaction,
  bookmarks,
}: IMessageListProps) {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message
          key={message.title}
          message={message}
          reactions={reactions}
          postReaction={postReaction}
          thisReaction={message.react_id}
          bookmarks={bookmarks}
        />
      ))}
    </div>
  );
}

interface IMessageListProps {
  messages: IUserMessage[];
  reactions: IReaction[];
  postReaction: (reactID: number, messageID: number) => Promise<void>;
  bookmarks: IBookmark[];
}
