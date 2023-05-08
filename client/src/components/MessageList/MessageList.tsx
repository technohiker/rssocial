import { useState } from "react";
import { IBookmark } from "../../types/IBookmark";
import { IUserMessage } from "../../types/IMessage";
import { IReaction } from "../../types/IReaction";
import { Message } from "../Message/Message";
import "./MessageList.css";
import { Button, Container } from "reactstrap";

/** List of messages.(what's the best way to present these?  avoid infinite scroll) */
export function MessageList({
  messages,
  reactions,
  bookmarks,
  updateMessage,
}: IMessageListProps) {
  const [msgIndex, setIndex] = useState(0);

  const nextMessage = () => {
    if (msgIndex < messages.length - 1) {
      setIndex(msgIndex + 1);
    }
  };

  const prevMessage = () => {
    if (msgIndex > 0) {
      setIndex(msgIndex - 1);
    }
  };

  return (
    <div className="message-list">
      {/* {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          reactions={reactions}
          thisReaction={message.react_id}
          bookmarks={bookmarks}
          updateMessage={updateMessage}
        />
      ))} */}
      <Container></Container>
      <Message
        key={messages[msgIndex].id}
        message={messages[msgIndex]}
        reactions={reactions}
        thisReaction={messages[msgIndex].react_id}
        bookmarks={bookmarks}
        updateMessage={updateMessage}
      />
      <Button disabled={msgIndex === 0} onClick={prevMessage}>
        Previous
      </Button>
      <Button disabled={msgIndex === messages.length - 1} onClick={nextMessage}>
        Next
      </Button>
    </div>
  );
}

interface IMessageListProps {
  messages: IUserMessage[];
  reactions: IReaction[];
  bookmarks: IBookmark[];
  updateMessage: (message: IUserMessage) => void;
}
