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
import { NotesForm } from "../../NotesForm/NotesForm";
import { IBookmark } from "../../types/IBookmark";

export function Message({
  message,
  postReaction,
  reactions,
  thisReaction,
  bookmarks,
}: IMessageProps) {
  const sanitizedHTML = DOMPurify.sanitize(message.content);

  console.log({ bookmarks });

  let author = "";
  if (message.author) author = `by ${message.author}`;

  const addClick = async () => {
    const res = await ServerCaller.addClick(message.id);
    console.log({ res });
  };

  const addToBookmark = async (bookmarkID: number) => {
    const bkID = await ServerCaller.postBookmark(message.id, bookmarkID);

    if (bkID) {
      message.bookmark_id = bkID.bookmark_id;
    }
  };

  const addNotes = async (notes: string) => {
    const res = await ServerCaller.addNotes(message.id, notes);
    console.log({ res });
  };

  //Have function that, when user clicks link, sends backend request to mark message as read.
  return (
    <Card className="message-card">
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
          onSubmission={postReaction}
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
        />
        <NotesForm onSubmission={addNotes} defaultNote={message.notes} />
      </CardFooter>
    </Card>
  );
}

interface IMessageProps {
  message: IUserMessage;
  postReaction: (reactID: number, messageID: number) => Promise<void>;
  reactions: IReaction[];
  thisReaction: number;
  bookmarks: IBookmark[];
}
