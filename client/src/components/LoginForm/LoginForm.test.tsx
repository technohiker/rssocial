import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter, Route, Router } from "react-router";
import { ProtectedRoute } from "../../helpers/ProtectedRoute";
import { LoginForm } from "./LoginForm";
import { ServerCaller } from "../../helpers/ServerCaller";
import userEvent from "@testing-library/user-event";
import { mockUser } from "../../__mocks__/mockData";
import { Homepage } from "../Homepage/Homepage";

test("renders properly", () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Route exact path="/login">
        <LoginForm onSubmission={loginMock} />
      </Route>
    </MemoryRouter>
  );
});

test("logs user in", async () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Route exact path="/">
        <p>Successful login!</p>
      </Route>
      <Route exact path="/login">
        <LoginForm onSubmission={loginMock} />
      </Route>
    </MemoryRouter>
  );
  const userInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const submitButton = screen.getByText("Submit");

  // console.log({ mockUser });

  act(() => {
    userEvent.type(userInput, mockUser.username);
    userEvent.type(passwordInput, mockUser.password);
  });

  await act(async () => {
    submitButton.click();
  });
  await waitFor(() => {
    expect(screen.getByText(/Successful login!/i)).toBeInTheDocument();
  });
});

test("does not log in false user", async () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Route exact path="/login">
        <LoginForm onSubmission={loginMock} />
      </Route>
    </MemoryRouter>
  );
  const userInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const submitButton = screen.getByText("Submit");

  act(() => {
    userEvent.type(userInput, "ioug");
    userEvent.type(passwordInput, "utsxrhuio;");
  });

  await act(async () => {
    submitButton.click();
  });
  await waitFor(() => {
    expect(screen.getByText(/Invalid/i)).toBeInTheDocument();
  });
});

async function loginMock(username: string, password: string) {
  try {
    await ServerCaller.authUser(username, password);
  } catch (e: any) {
    return e;
  }
}
