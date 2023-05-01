import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { ProtectedRoute } from "../../helpers/ProtectedRoute";
import { MemoryRouter } from "react-router-dom";

//Create test objects.  Use example objects from previous commit.

test("Sidebar properly displays folders and feeds.")

test("Can create new folder.")

test("creates new call and feed.")

test("renders message.")

test("add reaction to message.")

test("add new message to bookmark/folder")

test("edit profile")

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});

test("uses token to log in on load", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/test!/i)).toBeInTheDocument();
  });
});

test("cannot get to authorized links without token", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  //Expect user to be logged in.
  await waitFor(() => {
    expect(screen.getByText(/Jobs/i)).toBeInTheDocument();
  });
  const jobsText = screen.queryByText(/Jobs/i);

  //Log user out.
  const logoutButton = screen.getByText(/Log Out/i);
  await act(async () => {
    logoutButton.click();
  });

  await waitFor(() => {
    expect(jobsText).not.toBeInTheDocument();
  });
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImlhdCI6MTUxNjIzOTAyMn0.NDKFLXEYmoc3yRNPFxvBS1wMmHy_cndjLGUPsAj_pI0";