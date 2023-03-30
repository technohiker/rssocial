export interface IMessage {
  messageID?: string;
  author: string;
  title: string;
  content: string;
  description: string;
  date_created: string;
  source_link: string;
  thumbnail?: string;
  unread?: boolean;
  // message_id SERIAL NOT NULL,
  // feed_id VARCHAR NOT NULL
  //   REFERENCES feeds ON DELETE NULL
  // source_name TEXT NOT NULL,
  // author TEXT NOT NULL,
  // title TEXT NOT NULL,
  // content TEXT NOT NULL,
  // date_created DATE NOT NULL,
  // source_link TEXT NOT NULL,
  // unread BOOLEAN DEFAULT TRUE
}
