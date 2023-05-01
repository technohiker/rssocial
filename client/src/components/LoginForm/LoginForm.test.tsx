import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter, Route, Router } from "react-router";
import { ProtectedRoute } from "../../helpers/ProtectedRoute";
import { LoginForm } from "./LoginForm";
import { ServerCaller } from "../../helpers/ServerCaller";
import userEvent from "@testing-library/user-event";

test("renders properly", () => {
  render(<LoginForm onSubmission={loginMock} />);
});

test("logs user in", async () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Route exact path="/login">
        <LoginForm onSubmission={loginMock} />
      </Route>
    </MemoryRouter>
  );
  const userInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const submitButton = screen.getByRole("button");

  userEvent.type(userInput, "testuser");
  userEvent.type(passwordInput, "testpassword");

  submitButton.click();

  await waitFor(() => {
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
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
  const submitButton = screen.getByRole("button");

  userEvent.type(userInput, "ioug");
  userEvent.type(passwordInput, "utsxrhuio;");

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