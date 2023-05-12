import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MessageList } from "./MessageList";
import { MemoryRouter } from "react-router-dom";
import {
  mockBookmarks,
  mockMessages,
  mockReactions,
} from "../../__mocks__/mockData";
import { IUserMessage } from "../../types/IMessage";

let testMessages = mockMessages;

const messageList =     <MessageList
messages={mockMessages}
reactions={mockReactions}
bookmarks={mockBookmarks}
updateMessage={updateMessage}
/>

test("renders message.", () => {
  render(
    messageList
  );
  const linkElement = screen.getByText(/This is a note/i);
  expect(linkElement).toBeInTheDocument();
});

 test("add reaction to message.", () => {
    render(
        messageList
    )

    const msgReaction = mockMessages[0].react_id

    const reactButtons = screen.getAllByRole("button", {name: /Like/i})
    //Click on Reaction button.
    act(() => {
      reactButtons[0].click()
    });

    //Message's reaction should be changed.
    expect(testMessages[0].react_id).not.toBe(msgReaction)
    
 })

// test("add new message to bookmark/folder")

// test("add bookmark to message.")

// test("move back and forth between messages in list.")

async function updateMessage(message: IUserMessage) {
  testMessages = [...testMessages, message];
}
