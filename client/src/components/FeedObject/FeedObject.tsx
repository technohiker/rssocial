import { IMessage } from "../../types/IMessage";
import { IRSSItem } from "../../types/IRSS";

/** Displays render of clickable feed object.  Clicking on this opens up view of feed messages. */
export function FeedObject({
  icon,
  feedName,
  messages,
  loadMessages,
}: IFeedObjectProps) {
  return (
    <div onClick={() => loadMessages(messages[0])}>
      <img src={icon} />
      <p>{feedName}</p>
      <p>{messages.length}</p>
    </div>
  );
}

interface IFeedObjectProps {
  icon: string;
  feedName: string;
  messages: IMessage[];
  loadMessages: (message: IMessage) => void;
}
