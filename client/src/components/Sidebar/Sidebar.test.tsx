import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sidebar } from "./Sidebar";
import { MemoryRouter } from "react-router-dom";
import {
  mockBookmarks,
  mockFeeds,
  mockFolders,
  mockMessages,
  mockReactions,
} from "../../__mocks__/mockData";
import { IUserMessage } from "../../types/IMessage";
import { FeedContext } from "../../helpers/ContextFeed";
import { useState } from "react";
import { ICondition } from "../../types/ICondition";

const [testFolders, setTestFolders] = useState(mockFolders);
const [testBookmarks, setTestBookmarks] = useState(mockBookmarks);
const [testMessages, setTestMessages] = useState(mockMessages);
const [testFeeds, setTestFeeds] = useState(mockFeeds)

const loadMessages = (condition: ICondition) => {
    console.log(condition);
}

const buttons = (
    [
    <button>Make New Feed</button>,
    ]
)

const sideBar = (
    <FeedContext.Provider value={{
        folders: testFolders,
        setFolders: setTestFolders,
        bookmarks: testBookmarks,
        setBookmarks: setTestBookmarks,
        messages: testMessages,
        setMessages: setTestMessages,
        feeds: testFeeds,
        setFeeds: setTestFeeds,
        loadMessages: loadMessages
    }}>
        <Sidebar buttons={buttons}/>
    </FeedContext.Provider>
)

test("renders sidebar.", () => {
    render(sideBar);
    const linkElement = screen.getByText(/Bookmarks/i);
    expect(linkElement).toBeInTheDocument();
});