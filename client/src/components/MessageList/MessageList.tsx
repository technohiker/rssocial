import { IMessage } from "../../types/IMessage";
import { Message } from "../Message/Message";
import "./MessageList.css";

/** List of messages.(what's the best way to present these?  avoid infinite scroll) */
// export function MessageList({messages}: IMessageListProps){
//     return(messages.map(msg => {
//         <Message key={msg.messageID} message={msg} />
//     }))
// }

interface IMessageListProps {
  messages: IMessage[];
}
