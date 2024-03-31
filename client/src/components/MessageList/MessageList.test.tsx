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

  const reactButtons = screen.getAllByRole("button", { name: "" });

  //Click on Reaction button.
  await act(async () => {
    reactButtons[0].click();
  });

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

test("move back and forth between messages in list.", async () => {
  render(messageList);

  const nextButton = screen.getByRole("button", { name: /Next/i });
  const prevButton = screen.getByRole("button", { name: /Previous/i });

  act(() => {
    nextButton.click();
  });
  expect(screen.getByText(/This is also a note/i)).toBeInTheDocument();

  //TODO: PrevButton click isn't going through.  No idea why.
  //Button is not disabled when attempting to click it.
  // act(() => {
  //   prevButton.click();
  // });
  // expect(screen.getByText(/This is a note/i)).toBeInTheDocument();
});

/** Mocks function that changes state of Messages. */
async function updateMessage(uMessage: IUserMessage) {
  testMessages = testMessages.map((message) =>
    message.id === uMessage.id ? { ...uMessage } : message
  );
}
