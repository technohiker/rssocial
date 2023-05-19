import { useEffect, useState } from "react";
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
  resetIndex,
  setResetIndex,
  updateMessage,
}: IMessageListProps) {
  const [msgIndex, setIndex] = useState(0);
  const [msgID, setMsgID] = useState(messages[0].id);
  // const [isLoading, setIsLoading] = useState(true);

  const [listMessages, setListMessages] = useState(messages);
  console.log(msgID, messages[0].id);

  const updateListMessage = (uMessage: IUserMessage) => {
    setListMessages((messages) => {
      return messages.map((message) =>
        uMessage.id === message.id ? { ...uMessage } : message
      );
    });
  };

  useEffect(() => {
    setIndex(0);
    setListMessages(messages);
  }, [messages]);

  // useEffect(() => {
  //   // if (resetIndex) {
  //   //   setIndex(0);
  //   //   setResetIndex(false);
  //   // }
  //   if (msgID !== messages[0].id) {
  //     setIndex(0);
  //     setMsgID(messages[0].id);
  //   }
  // }, [messages]);

  // useEffect(() => {
  //   console.log({ isLoading });
  // }, [isLoading]);

  // useEffect(() => {
  //   console.log("Fired.");
  //   setIsLoading(true);
  //   if (msgID !== messages[0].id) {
  //     setIndex(0);
  //     setMsgID(messages[0].id);
  //   }
  //   setIsLoading(false);
  // }, [messages]);

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
      className="message-button btn-info"
      disabled={msgIndex === 0}
      onClick={prevMessage}
    >
      Previous
    </Button>
  );

  const nextButton = (
    <Button
      className="message-button btn-info"
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
          key={listMessages[msgIndex].id}
          message={listMessages[msgIndex]}
          reactions={reactions}
          thisReaction={listMessages[msgIndex].react_id}
          bookmarks={bookmarks}
          updateMessage={updateListMessage}
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
  resetIndex: boolean;
  setResetIndex: React.Dispatch<React.SetStateAction<boolean>>;
  updateMessage: (message: IUserMessage) => void;
}
