-- Insert some sample users
INSERT INTO users (username, password, email, profile_img, bio) 
VALUES ('john_doe', '$2a$04$cp7OVoLD4bZ.o2XVzFF5XeVQZ7yYvXxLQ2bYmSaTmZe/xVREq/mnq', 'johndoe@example.com', 'https://example.com/profile.jpg', 'I am a software developer'),
       ('jane_doe', '$2a$04$cp7OVoLD4bZ.o2XVzFF5XeVQZ7yYvXxLQ2bYmSaTmZe/xVREq/mnq', 'janedoe@example.com', 'https://example.com/profile2.jpg', 'I am a graphic designer');

-- Insert some sample messages
INSERT INTO messages (source_name, author, title, content, date_created, source_link) 
VALUES ('RSS Feed', 'Jane Smith', 'New article on web development', 'Check out this great article on web development', '2022-01-01', 'https://example.com/article1'),
       ('Twitter', 'John Doe', 'Just published a new blog post', 'Check out my latest blog post on software development', '2022-01-02', 'https://example.com/blogpost1');

-- Insert some sample folders
INSERT INTO folders (user_id, folder_name, icon) 
VALUES (1, 'Development', 'https://example.com/icons/folder1.jpg'),
       (1, 'Design', 'https://example.com/icons/folder2.jpg'),
       (2, 'Personal', 'https://example.com/icons/folder3.jpg');

-- Insert some sample sources
INSERT INTO sources (name, img) 
VALUES ('RSS Feed', 'https://example.com/icons/rss.jpg'),
       ('Twitter', 'https://example.com/icons/twitter.jpg',TRUE);

-- Insert some sample reactions
INSERT INTO reactions (name, img) 
VALUES ('Select Reaction','https://example.com/icon/neutral.jpg'),
        ('Like', 'https://example.com/icons/like.jpg'),
       ('Dislike', 'https://example.com/icons/dislike.jpg');

-- Insert some sample calls
INSERT INTO calls (base_url, request_body, request_params, request_headers) 
VALUES ('https://api.twitter.com/1.1/statuses/user_timeline.json', '', 'user_id=12345', 'Authorization: Bearer XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

-- Insert some sample feeds
INSERT INTO feeds (user_id, folder_id, source_id, feed_name, call_id) 
VALUES (1, 1, 1, 'Web Development', NULL),
       (1, 2, 2, 'Software Development', 1),
       (1, 2, 2, 'Gaming', 1),
       (2, 3, 1, 'Personal Blog', NULL);

-- Insert some sample feed messages
INSERT INTO feed_messages (message_id, feed_id) 
VALUES (1, 1),
       (2, 2);

-- Insert some sample user messages
INSERT INTO user_messages (user_id, message_id, feed_id, notes, clicks, react_id, seen) 
VALUES (1, 1, 1, 'This is a great article!', 10, 1, TRUE),
       (2, 2, 2, 'I enjoyed reading this post', 5, 2, FALSE);