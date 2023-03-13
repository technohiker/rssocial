CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    profile_img TEXT
    bio TEXT NOT NULL
)
CREATE TABLE messages (
    message_id SERIAL NOT NULL,
    feed_id VARCHAR NOT NULL
      REFERENCES feeds ON DELETE NULL
    source_name TEXT NOT NULL,
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date_created DATE NOT NULL,
    source_link TEXT NOT NULL,
    unread BOOLEAN DEFAULT TRUE
)

CREATE TABLE feeds(
  feed_id SERIAL PRIMARY KEY,
  user_id VARCHAR NOT NULL 
    REFERENCES users ON DELETE CASCADE,
  folder_id VARCHAR
    REFERENCES folders ON DELETE NULL,
  source_id VARCHAR
    REFERENCES sources ON DELETE NULL
  feed_name TEXT NOT NULL,
  call_id VARCHAR
    REFERENCES feed_calls ON DELETE NULL
)

CREATE TABLE feed_calls(
  call_id SERIAL PRIMARY KEY,
  base_url TEXT NOT NULL,
  request_body TEXT,
  request_params TEXT,
  request_headers TEXT
)

CREATE TABLE folders(
  folder_id SERIAL PRIMARY KEY,
  user_id VARCHAR NOT NULL 
    REFERENCES users ON DELETE CASCADE,
  folder_name TEXT NOT NULL
)

CREATE TABLE user_messages(
  user_id VARCHAR PRIMARY KEY
    REFERENCES users ON DELETE CASCADE,
  message_id VARCHAR PRIMARY KEY
    REFERENCES users ON DELETE NULL,
  notes TEXT,
  clicks NUMBER DEFAULT 0,
  react_id VARCHAR
    REFERENCES reactions ON DELETE NULL
)

CREATE TABLE reactions (
    react_id SERIAL NOT NULL,
    name TEXT NOT NULL,
    img TEXT NOT NULL
)

CREATE TABLE sources(
  source_id SERIAL PRIMARY KEY,
  source_name TEXT NOT NULL
  source_img TEXT NOT NULL
)

-- Twitter Feed Options:
  -- User/List/Hashtag/Topic(?)/Search result
  -- Minimum number of likes
  -- Show Retweets?
  -- Frequency of calls.

-- Reddit Feed Options:
  -- User/Subreddit
  -- Minimum number of votes
  -- Show crossposts?
  -- Token
  -- Frequency of calls.

-- News Feed Options:
  -- Frequency of calls.