import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter, Route, Router } from "react-router";
import { ProtectedRoute } from "../../helpers/ProtectedRoute";
import { RegisterForm } from "./RegisterForm";
import { ServerCaller } from "../../helpers/ServerCaller";
import userEvent from "@testing-library/user-event";
import { mockUser } from "../../__mocks__/mockData";
import { Homepage } from "../Homepage/Homepage";

test("renders properly", () => {
  render(
    <MemoryRouter initialEntries={["/register"]}>
      <Route exact path="/register">
        <RegisterForm onSubmission={registerMock} />
      </Route>
    </MemoryRouter>
  );
});

test("registers", async () => {
  render(
    <MemoryRouter initialEntries={["/register"]}>
      <Route exact path="/">
        <p>Successful registration!</p>
      </Route>
      <Route exact path="/register">
        <RegisterForm onSubmission={registerMock} />
      </Route>
    </MemoryRouter>
  );
  const userInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const emailInput = screen.getByLabelText(/Email Address/i);
  const submitButton = screen.getByText("Submit");

  console.log({ mockUser });

  act(() => {
    userEvent.type(userInput, "user2");
    userEvent.type(passwordInput, "password2");
    userEvent.type(emailInput, "email@mail.com");
  });

  await act(async () => {
    try{
      submitButton.click();
    }
    catch(e: any){
      console.log(e)
    }
  });
  await waitFor(() => {
    expect(screen.getByText(/Successful registration!/i)).toBeInTheDocument();
  });
});

test("does not register false user", async () => {
  render(
    <MemoryRouter initialEntries={["/register"]}>
      <Route exact path="/">
        <p>Invalid.</p>
      </Route>
      <Route exact path="/register">
        <RegisterForm onSubmission={registerMock} />
      </Route>
    </MemoryRouter>
  );
  const userInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const emailInput = screen.getByLabelText(/Email Address/i);
  const submitButton = screen.getByText("Submit");

  act(() => {
    userEvent.type(userInput, "ioug");
    userEvent.type(passwordInput, "utsxrhuio;");
    userEvent.type(emailInput, "test@email.com");
  });

  await act(async () => {
    submitButton.click();
  });
  await waitFor(() => {
    expect(screen.getByText(/Invalid/i)).toBeInTheDocument();
  });
});

async function registerMock(username: string, password: string, email: string) {
  try {
    await ServerCaller.registerUser({username, password, email});
  } catch (e: any) {
    return e;
  }
}
