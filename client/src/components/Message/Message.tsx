import { IRSSItem } from "../../types/IRSS";
import "./Message.css";

export function Message({ message }: IMessageProps) {
  return <p>{message.description}</p>;
}

interface IMessageProps {
  message: IRSSItem;
}
