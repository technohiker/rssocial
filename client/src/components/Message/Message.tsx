import { IMessage } from "../../types/IMessage";
import "./Message.css";
import { Button, Card, CardBody, CardFooter, CardTitle } from "reactstrap";

export function Message({ message }: IMessageProps) {

  //Have function that, when user clicks link, sends backend request to mark message as read.
  return (<Card>
    <CardTitle>
      <h1><a href={message.source_link}>{message.title}</a></h1>
      <h6>{message.date_created}</h6>
      <h6>{message.author}</h6>
      {/** Indicator that message was read. */}
    </CardTitle>
    <CardBody>
      <h4>{message.description}</h4>
      <h5>{message.content}</h5>
    </CardBody>
    <CardFooter>
      <Button name="emoteButton"></Button>
      <Button name="folderButton"></Button>
    </CardFooter>
  </Card>)
}

interface IMessageProps {
  message: IMessage;
}
