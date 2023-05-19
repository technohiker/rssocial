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

let testMessages = [...mockMessages];
let testReactions = [...mockReactions];
let testBookmarks = [...mockBookmarks];

const messageList = (
  <MessageList
    messages={testMessages}
    reactions={testReactions}
    bookmarks={testBookmarks}
    resetIndex={false}
    setResetIndex={() => {}}
    updateMessage={updateMessage}
  />
);

test("renders message.", () => {
  render(messageList);
  const linkElement = screen.getByText(/This is a note/i);
  expect(linkElement).toBeInTheDocument();
});

test("add reaction to message.", async () => {
  render(messageList);

  const msgReaction = testMessages[0].react_id;
  console.log({ messageList });

  const reactButtons = screen.getAllByRole("button", { name: /Like/i });
  console.log({ msgReaction });
  console.log(reactButtons[0]);
  //Click on Reaction button.
  await act(async () => {
    reactButtons[0].click();
  });
  console.log({ msgReaction });
  console.log(testMessages[0]);

  //Message's reaction should be changed.
  expect(testMessages[0].react_id).not.toBe(msgReaction);
});

test("add new message to bookmark/folder", async () => {
  render(messageList);

  const bookmarkButton = screen.getByRole("button", { name: /Bookmark/i });

  await act(async () => {
    bookmarkButton.click();
  });
  expect(mockMessages[0].bookmark_id).toBe(1);
});

// test("add bookmark to message.")

// test("move back and forth between messages in list.")

async function updateMessage(uMessage: IUserMessage) {
  console.log({ testMessages });
  testMessages = testMessages.map((message) =>
    message.id === uMessage.id ? { ...uMessage } : message
  );
  console.log({ testMessages });
}
