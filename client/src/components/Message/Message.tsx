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
import { BookmarkFormAdd } from "../BookmarkFormAdd/BookmarkFormAdd";
import { NotesForm } from "../NotesForm/NotesForm";
import { IBookmark } from "../../types/IBookmark";

export function Message({
  message,
  reactions,
  thisReaction,
  bookmarks,
  updateMessage,
}: IMessageProps) {
  const sanitizedHTML = DOMPurify.sanitize(message.content);

  let author = "";
  if (message.author) author = `by ${message.author}`;

  const [isSeen, setIsSeen] = useState(message.seen);

  const addClick = async () => {
    const res = await ServerCaller.addClick(message.id);
    console.log({ res });

    if (res) updateMessage({ ...message, clicks: res });
  };

  const addToBookmark = async (bookmarkID: number) => {
    console.log({ bookmarkID });
    const bkID = await ServerCaller.setBookmark(message.id, bookmarkID);
    console.log({ bkID });

    if (bkID) updateMessage({ ...message, bookmark_id: bkID });
  };

  const addNotes = async (notes: string) => {
    const res = await ServerCaller.addNotes(message.id, notes);
    console.log({ res });

    if (res) updateMessage({ ...message, notes: res });
  };

  const addReaction = async (reactID: number) => {
    const res = await ServerCaller.postReaction(reactID, message.id);
    console.log({ res });

    if (res) updateMessage({ ...message, react_id: res });
  };

  const addSeen = async () => {
    if(isSeen) return;  //Do not need to run if already seen.
    const res = await ServerCaller.addSeen(message.id);
    console.log({ res });

    //TODO:  Update message to have seen value.
    setIsSeen(true)

    if (res) updateMessage({ ...message });
  };
  //Have function that, when user clicks link, sends backend request to mark message as read.
  return (
    <Card className={`${isSeen ? 'seen': ''} message-card`} onMouseLeave={addSeen}>
      <CardHeader>
        <p>{message.source_name}</p>
      </CardHeader>
      <CardTitle>
        <h2>
          <a
            onClick={addClick}
            href={message.source_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {message.title}
          </a>
        </h2>
        <h6>{message.date_created.toString()}</h6>
        <h6>{author}</h6>
        {/** Indicator that message was read. */}
      </CardTitle>
      <CardBody>
        <h4>{message.description}</h4>
        <h5
          className="message-content"
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        ></h5>
      </CardBody>
      <CardFooter>
        <ReactionForm
          onSubmission={addReaction}
          reactOptions={reactions.map((react) => ({
            value: react.id,
            text: react.name,
          }))}
          messageID={message.id}
          defaultValue={thisReaction}
        />
        {/* <Button name="folderButton">Add Bookmark</Button> */}
        <BookmarkFormAdd
          onSubmission={addToBookmark}
          bookmarkOptions={bookmarks.map((bookmark) => ({
            value: bookmark.id,
            text: bookmark.name,
          }))}
          messageID={message.id}
          defaultValue={message.bookmark_id}
        />
        <NotesForm onSubmission={addNotes} defaultNote={message.notes} />
      </CardFooter>
    </Card>
  );
}

interface IMessageProps {
  message: IUserMessage;
  reactions: IReaction[];
  thisReaction: number;
  bookmarks: IBookmark[];
  updateMessage: (message: IUserMessage) => void;
}
