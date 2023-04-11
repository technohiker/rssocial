import { IMessage } from "../../types/IMessage";
import { useContext, useState } from "react";
import "./Message.css";
import DOMPurify from "dompurify";
import { Button, Card, CardBody, CardFooter, CardTitle } from "reactstrap";
import { ReactionForm } from "../ReactionForm/ReactionForm";
import { FeedContext } from "../../helpers/ContextFeed";
import { IReaction } from "../../types/IReaction";

export function Message({
  message,
  postReaction,
  reactions,
  thisReaction,
}: IMessageProps) {
  const sanitizedHTML = DOMPurify.sanitize(message.content);

  let author = "";
  if (message.author) author = `by ${message.author}`;

  const context = useContext(FeedContext);
  const [reaction, setReaction] = useState(thisReaction);

  //Have function that, when user clicks link, sends backend request to mark message as read.
  return (
    <Card className="message-card">
      <CardTitle>
        <h2>
          <a href={message.source_link}>{message.title}</a>
        </h2>
        <h6>{message.date_created}</h6>
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
          messageID={message.messageID}
          defaultValue={1}
        />
        <Button name="folderButton">Add to Folder</Button>
      </CardFooter>
    </Card>
  );
}

interface IMessageProps {
  message: IMessage;
  postReaction: (reactID: number, messageID: number) => Promise<void>;
  reactions: IReaction[];
  thisReaction: IReaction;
}
