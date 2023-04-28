export interface IMetrics {
  clicks: Array<{
    feed_name: string | null;
    feed_clicks: number;
  }>;
  reactions: Array<{
    feed_name: string | null;
    react_name: string;
    sum_reactions: number;
  }>;
  messages: Array<{
    seen_messages: number;
    total_messages: number;
  }>;
}