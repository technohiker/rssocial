import { IMessage, IUserMessage } from "../../types/IMessage";
import { useContext, useState } from "react";
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
import { ReactionForm } from "../ReactionForm/ReactionForm";
import { FeedContext } from "../../helpers/ContextFeed";
import { IReaction } from "../../types/IReaction";
import { ServerCaller } from "../../helpers/ServerCaller";
import { SetBookmarkForm } from "../SetBookmarkForm/SetBookmarkForm";
import { NotesForm } from "../NotesForm/NotesForm";
import { IBookmark } from "../../types/IBookmark";

export function Message({
  message,
  reactions,
  thisReaction,
  bookmarks,
  prevButton,
  nextButton,
  updateMessage,
}: IMessageProps) {
  let DOMString = new DOMParser().parseFromString(message.content, "text/html")
    .documentElement.textContent;

  if (DOMString === "null" || !DOMString) {
    //DOMString is returning a string of 'null' instead of null.
    DOMString = "";
  }

  const sanitizedHTML = DOMPurify.sanitize(DOMString);

  let author = "";
  if (message.author) author = `by ${message.author}`;

  const [isSeen, setIsSeen] = useState(message.seen);

  const addClick = async () => {
    const res = await ServerCaller.addClick(message.id);
    if (res) updateMessage({ ...message, clicks: res });
  };

  const addToBookmark = async (bookmarkID: number) => {
    const bkID = await ServerCaller.setBookmark(message.id, bookmarkID);
    if (bkID) updateMessage({ ...message, bookmark_id: bkID });
  };

  const addNotes = async (notes: string) => {
    const res = await ServerCaller.addNotes(message.id, notes);
    if (res) updateMessage({ ...message, notes: res });
  };

  const addReaction = async (reactID: number) => {
    const res = await ServerCaller.postReaction(reactID, message.id);
    console.log({ res });
    updateMessage({ ...message, react_id: res });
    console.log({ message });
  };

  const addSeen = async () => {
    if (isSeen) return; //Do not need to run if already seen.
    const res = await ServerCaller.addSeen(message.id);
    console.log({ res });

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
        <div className="reaction-buttons d-flex flex-row align-items-center ">
          {reactions.map((react) => (
            <Button
              name="react-button"
              className={`${
                react.id === thisReaction ? "react-true" : ""
              } react-button`}
              onClick={() => addReaction(react.id)}
            >
              <img src={react.img} alt={react.name} />
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
  thisReaction: number | null;
  bookmarks: IBookmark[];
  updateMessage: (message: IUserMessage) => void;
  nextButton: JSX.Element;
  prevButton: JSX.Element;
}
