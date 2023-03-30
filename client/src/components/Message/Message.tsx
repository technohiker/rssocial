import { IMessage } from "../../types/IMessage";
import "./Message.css";
import DOMPurify from "dompurify";
import { Button, Card, CardBody, CardFooter, CardTitle } from "reactstrap";

export function Message({ message }: IMessageProps) {
  console.log({ message });
  const sanitizedHTML = DOMPurify.sanitize(message.content);

  let author = "";
  if (message.author) author = `by ${message.author}`;

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
        <Button name="emoteButton">React</Button>
        <Button name="folderButton">Add to Folder</Button>
      </CardFooter>
    </Card>
  );
}

interface IMessageProps {
  message: IMessage;
}
