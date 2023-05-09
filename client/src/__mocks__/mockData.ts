export const mockUser = {
  id: 1,
  username: "john_doe",
  password: "password",
};

export const mockMessages = [{
    id: 1,
    feed_id: 1,
    notes: "This is a note",
    clicks: 0,
    react_id: null,
    bookmark_id: 1,
    seen: false,
    author: "Test Author",
    title: "Test Title",
    content: "Test Content",
    date_created: "2020-01-01",
    source_link: "https://www.google.com"
}];

export const mockFeeds = [{
    id: 1,
    user_id: 1,
    feed_name: "Test Feed",
    folder_id: 1,
    source_name: "rss",
    source_img: "rss.png",

}];

export const mockCalls = [
    {
        "user_id": "1",
        "folder_id": "1",
        "source_id": "1",
        "feed_name": "Web Development",
        "call_id": "NULL"
    },
    {
        "user_id": "1",
        "folder_id": "2",
        "source_id": "2",
        "feed_name": "Software Development",
        "call_id": "1"
    },
    {
        "user_id": "1",
        "folder_id": "2",
        "source_id": "2",
        "feed_name": "Gaming",
        "call_id": "1"
    },
    {
        "user_id": "2",
        "folder_id": "3",
        "source_id": "1",
        "feed_name": "Personal Blog",
        "call_id": "NULL"
    }
];

export const mockFolders = [
  {
    id: 1,
  },
];

export const mockBookmarks = [{
    id: 1,
    user_id: 1,
    name: "Bookmark 1",
}]

export const mockReactions = [{
    id: 1,
    name: "Like",
    img: "thumbs-up.png"
},
{
    id: 2,
    name: "Dislike",
    img: "thumbs-down.png"
}]

export const mockSources = [{
    id: 1,
    name: "rss",
    img: "rss.png",
    token: false
},{
    id: 2,
    name: "reddit",
    img: "reddit.png",
    token: true
}]

