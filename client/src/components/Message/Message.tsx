import { IMessage, IUserMessage } from "../../types/IMessage";
import { useContext, useEffect, useState } from "react";
import "./Message.css";
import DOMPurify from "dompurify";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "reactstrap";
import { IReaction } from "../../types/IReaction";
import { ServerCaller } from "../../helpers/ServerCaller";
import { SetBookmarkForm } from "../SetBookmarkForm/SetBookmarkForm";
import { NotesForm } from "../NotesForm/NotesForm";
import { IBookmark } from "../../types/IBookmark";
import { Icon } from "../Icon/Icon";

export function Message({
  message,
  reactions,
  bookmarks,
  prevButton,
  nextButton,
  updateMessage,
}: IMessageProps) {
  const [isSeen, setIsSeen] = useState(message.seen);

  useEffect(() => {
    console.log({ message });
  }, [message]);

  //Clean Author data.
  let author = "";
  if (message.author) author = `by ${message.author}`;

  //Parse the message content as HTML, then sanitize it.
  let DOMString = new DOMParser().parseFromString(message.content, "text/html")
    .documentElement.textContent;

  if (DOMString === "null" || !DOMString) {
    DOMString = "";
  }

  const sanitizedHTML = DOMPurify.sanitize(DOMString);

  /** Increment the number of clicks to the external source a message has received. */
  const addClick = async () => {
    const res = await ServerCaller.addClick(message.id);
    if (res) updateMessage({ ...message, clicks: res });
  };

  /** Set a message to appear on a particular bookmark. */
  const addToBookmark = async (bookmarkID: number) => {
    const bkID = await ServerCaller.setBookmark(message.id, bookmarkID);
    if (bkID) updateMessage({ ...message, bookmark_id: bkID });
  };

  /** Store any notes a user may add. */
  const addNotes = async (notes: string) => {
    const res = await ServerCaller.addNotes(message.id, notes);
    if (res) updateMessage({ ...message, notes: res });
  };

  /** Add a reaction(thumbs up/thumbs down) to the message. */
  const addReaction = async (reactID: number) => {
    const res = await ServerCaller.postReaction(reactID, message.id);
    updateMessage({ ...message, react_id: res });
  };

  /** Sets a message as seen. */
  const addSeen = async () => {
    if (isSeen) return; //Do not need to run if already seen.
    const res = await ServerCaller.addSeen(message.id);

    setIsSeen(true);

    if (res) updateMessage({ ...message, seen: true });
  };
  //Have function that, when user clicks link, sends backend request to mark message as read.
  return (
    <Card className={`message-card`} onMouseLeave={addSeen}>
      <CardHeader>
        <p>{message.source_name}</p>
      </CardHeader>
      <CardTitle>
        <h2>
          <a
            className="message-title"
            onClick={addClick}
            href={message.source_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {message.title}
          </a>
        </h2>
        <h6>{new Date(message.date_created).toLocaleDateString()}</h6>
        <h6>{author}</h6>
      </CardTitle>
      <CardBody>
        <h4>{message.description}</h4>
        <div
          className="message-content"
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        ></div>
      </CardBody>
      <CardFooter className="d-flex justify-content-evenly">
        <div className="reaction-buttons d-flex flex-row align-items-center">
          {reactions.map((react) => (
            <Button
              key={react.id}
              name={`react-button-${react.name}`}
              className={`${
                react.id === message.react_id ? "react-true" : ""
              } react-button`}
              onClick={() => addReaction(react.id)}
            >
              <Icon name={react.name} />
            </Button>
          ))}
        </div>

        <div className="d-flex align-items-center">
          <NotesForm onSubmission={addNotes} defaultNote={message.notes} />
        </div>
        <div className="d-flex align-items-center">
          <SetBookmarkForm
            onSubmission={addToBookmark}
            bookmarkOptions={bookmarks.map((bookmark) => ({
              value: bookmark.id,
              text: bookmark.name,
            }))}
            messageID={message.id}
            defaultValue={message.bookmark_id ?? 1}
          />
        </div>
      </CardFooter>
      <div className="message-buttons d-flex flex-row justify-content-center">
        {prevButton}
        {nextButton}
      </div>
    </Card>
  );
}

interface IMessageProps {
  message: IUserMessage;
  reactions: IReaction[];
  bookmarks: IBookmark[];
  updateMessage: (message: IUserMessage) => void;
  nextButton: JSX.Element;
  prevButton: JSX.Element;
}
