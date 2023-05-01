export interface IMessage {
  id?: string;
  author: string;
  title: string;
  content: string | null;
  description: string;
  date_created: Date;
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

export interface IUserMessage {
  id: number;
  notes: string;
  clicks: number;
  react_id: number;
  feed_id: number;
  source_name: string,
  author: string;
  title: string;
  content?: string;
  description?: string;
  date_created: Date;
  source_link: string;
}