-- Insert some sample users
INSERT INTO users (username, password, email, profile_img, bio, verified) 
VALUES ('john_doe', '$2a$04$cp7OVoLD4bZ.o2XVzFF5XeVQZ7yYvXxLQ2bYmSaTmZe/xVREq/mnq', 'johndoe@example.com', 'https://example.com/profile.jpg', 'I am a software developer', TRUE),
       ('jane_doe', '$2a$04$cp7OVoLD4bZ.o2XVzFF5XeVQZ7yYvXxLQ2bYmSaTmZe/xVREq/mnq', 'janedoe@example.com', 'https://example.com/profile2.jpg', 'I am a graphic designer', FALSE);

-- Insert some sample messages
INSERT INTO messages (source_name, author, title, content, date_created, source_link) 
VALUES ('rss', 'Jane Smith', 'New article on web development', 'Check out this great article on web development', '2022-01-01', 'https://example.com/article1'),
       ('reddit', 'John Doe', 'Just published a new blog post', 'Check out my latest blog post on software development', '2022-01-02', 'https://example.com/blogpost1');

-- Insert some sample folders
INSERT INTO folders (user_id, name, icon) 
VALUES (1, 'Development', 'folder.png'),
       (1, 'Design', 'folder.png'),
       (2, 'Personal', 'folder.png');

-- Insert some sample sources
INSERT INTO sources (name, img, token) 
VALUES ('rss', 'rss.png', FALSE),
       ('reddit', 'reddit.png', TRUE);

-- Insert some sample reactions
INSERT INTO reactions (name, img) 
VALUES ('Like', 'thumbs-up.png'),
       ('Dislike', 'thumbs-down.png');

-- Insert some sample calls
INSERT INTO calls (base_url, feed_id, request_body, request_params, request_headers) 
VALUES ('https://api.twitter.com/1.1/statuses/user_timeline.json',2, '', 'user_id=12345', '"Authorization": Bearer XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

-- Insert some sample feeds
INSERT INTO feeds (user_id, folder_id, source_id, feed_name) 
VALUES (1, 1, 1, 'Web Development'),
       (1, 2, 2, 'Software Development'),
       (1, 2, 2, 'Gaming'),
       (2, 3, 1, 'Personal Blog');

INSERT INTO bookmarks(user_id, name)
VALUES(1,'Bookmark 1'),
      (1,'Bookmark 2'),
      (2,'Bookmark 3');


-- Insert some sample user messages
INSERT INTO user_messages (user_id, message_id, feed_id, bookmark_id, notes, clicks, react_id, seen) 
VALUES (1, 1, 1, 1, 'This is a great article!', 10, 1, TRUE),
       (2, 2, 2, NULL, 'I enjoyed reading this post', 5, 2, FALSE);