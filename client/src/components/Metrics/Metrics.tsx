import { useState, useEffect } from "react";
import { IFeed } from "../../types/IFeed";
import { IMessage } from "../../types/IMessage";
import { IMetrics } from "../../types/IMetrics";
import { IReaction } from "../../types/IReaction";
import { ServerCaller } from "../../helpers/ServerCaller";
import { IUser } from "../../types/IUser";

export function Metrics({ currUser, totalMessages }: IMetricsProps) {
  //What metrics do I want?
  //Number of clicks.
  //Number of reactions.
  //Clicks per feed.
  //Reactions per feed.
  //Seen messages vs all messages.

  //SQL queries:

  const [metrics, setMetrics] = useState({} as IMetrics);

  useEffect(() => {
    getMetrics();
  }, []);

  /** Pull metric information. */
  const getMetrics = async () => {
    try {
      const newMetrics = await ServerCaller.getMetrics(currUser.username);
      setMetrics(newMetrics);
    } catch (e: any) {
      throw e;
    }
  };

  return metrics.messages ? (
    <div>
      <h3>Clicks:</h3>
      {metrics.clicks.map((click) => {
        if (click.feed_name)
          return (
            <p>{`You clicked ${click.feed_clicks} times on ${click.feed_name}`}</p>
          );
        else
          return (
            <p>{`You clicked ${click.feed_clicks} times on all of your messages.`}</p>
          );
      })}
      <h3>Reactions:</h3>
      {metrics.reactions.map((reaction) => {
        if (reaction.feed_name)
          return (
            <p>{`You reacted ${reaction.sum_reactions} times on ${reaction.feed_name} with ${reaction.react_name}`}</p>
          );
        else
          return (
            <p>{`You reacted ${reaction.sum_reactions} times on all of your messages with ${reaction.react_name}`}</p>
          );
      })}
      <h3>Messages:</h3>
      {metrics.messages.map((message) => {
        return (
          <p>{`You saw ${message.seen_messages} out of ${totalMessages} messages.`}</p>
        );
      })}
    </div>
  ) : (
    <p>No metrics to display.</p>
  );
}

interface IMetricsProps {
  currUser: IUser;
  totalMessages: number;
}
