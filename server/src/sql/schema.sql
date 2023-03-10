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
    react_id VARCHAR(2) NOT NULL
        REFERENCES reactions ON DELETE 99
)

CREATE TABLE reactions (
    react_id SERIAL NOT NULL,
    name TEXT NOT NULL,
    img TEXT NOT NULL
)