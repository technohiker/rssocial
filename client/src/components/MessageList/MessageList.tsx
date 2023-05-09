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

  // Declaring buttons here since they depend on MessageList state,
  //but they will be passed down to Message.
  const prevButton = (
    <Button
      className="btn-info"
      disabled={msgIndex === 0}
      onClick={prevMessage}
    >
      Previous
    </Button>
  );

  const nextButton = (
    <Button
      className="btn-info"
      disabled={msgIndex === messages.length - 1}
      onClick={nextMessage}
    >
      Next
    </Button>
  );

  return (
    <Container className="message-list d-flex flex-column">
      <div className="d-flex justify-content-center">
        <Message
          key={messages[msgIndex].id}
          message={messages[msgIndex]}
          reactions={reactions}
          thisReaction={messages[msgIndex].react_id}
          bookmarks={bookmarks}
          updateMessage={updateMessage}
          prevButton={prevButton}
          nextButton={nextButton}
        />
      </div>
    </Container>
  );
}

interface IMessageListProps {
  messages: IUserMessage[];
  reactions: IReaction[];
  bookmarks: IBookmark[];
  updateMessage: (message: IUserMessage) => void;
}
