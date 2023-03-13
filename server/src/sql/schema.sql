CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    profile_url TEXT
)
CREATE TABLE messages (
    message_id SERIAL NOT NULL,
    source_name TEXT NOT NULL,
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date_created DATE NOT NULL,
    source_link TEXT NOT NULL,
    unread BOOLEAN DEFAULT TRUE
)

CREATE TABLE reactions (
    react_id SERIAL NOT NULL,
    name TEXT NOT NULL,
    img TEXT NOT NULL
)

CREATE TABLE metrics(
  user_id VARCHAR PRIMARY KEY
    REFERENCES users ON DELETE CASCADE,
  message_id VARCHAR PRIMARY KEY
    REFERENCES users ON DELETE NULL,
  clicks NUMBER,
  react_id VARCHAR
    REFERENCES reactions ON DELETE NULL,
  folder_id VARCHAR
    REFERENCES bookmars ON DELETE NULL
)

CREATE TABLE categories(
  category_id SERIAL PRIMARY KEY,
  user_id VARCHAR NOT NULL 
    REFERENCES users ON DELETE CASCADE
  category_name TEXT NOT NULL,
  token TEXT NOT NULL
)

CREATE TABLE folders(
  folder_id SERIAL PRIMARY KEY,
  user_id VARCHAR NOT NULL 
    REFERENCES users ON DELETE CASCADE,
  folder_name TEXT NOT NULL
)