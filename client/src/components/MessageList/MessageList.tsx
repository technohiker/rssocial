import { IBookmark } from "../../types/IBookmark";
import { IUserMessage } from "../../types/IMessage";
import { IReaction } from "../../types/IReaction";
import { Message } from "../Message/Message";
import "./MessageList.css";

/** List of messages.(what's the best way to present these?  avoid infinite scroll) */
export function MessageList({
  messages,
  reactions,
  bookmarks,
  updateMessage,
}: IMessageListProps) {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          reactions={reactions}
          thisReaction={message.react_id}
          bookmarks={bookmarks}
          updateMessage={updateMessage}
        />
      ))}
    </div>
  );
}

interface IMessageListProps {
  messages: IUserMessage[];
  reactions: IReaction[];
  bookmarks: IBookmark[];
  updateMessage: (message: IUserMessage) => void;
}
