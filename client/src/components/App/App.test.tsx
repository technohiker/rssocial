import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { ProtectedRoute } from "../../helpers/ProtectedRoute";
import { MemoryRouter } from "react-router-dom";
import { mockToken } from "../../__mocks__/mockData";

//Create test objects.  Use example objects from previous commit.

// test("Sidebar properly displays folders and feeds.")

// test("Can create new folder.")

// test("creates new call and feed.")

// test("renders message.")

// test("add reaction to message.")

// test("add new message to bookmark/folder")

// test("edit profile")

// const token =
//   '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huX2RvZSIsInBhc3N3b3JkIjoiIiwiZW1haWwiOiJqb2huZG9lQGV4YW1wbGUuY29tIiwicHJvZmlsZV9pbWciOiJodHRwczovL2V4YW1wbGUuY29tL3Byb2ZpbGUuanBnIiwiYmlvIjoiSSBhbSBhIHNvZnR3YXJlIGRldmVsb3BlciIsInZlcmlmaWVkIjp0cnVlLCJpYXQiOjE2ODMwNTExODEsImV4cCI6MTY4MzY1NTk4MX0.4azmOrY4pwMRfv3I_LJ5HZzgv8X5CjCYbEViJ3deMrU"';

// const token =
//   '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huX2RvZSIsInBhc3N3b3JkIjoiIiwiZW1haWwiOiJqb2huZG9lQGV4YW1wbGUuY29tIiwicHJvZmlsZV9pbWciOiJodHRwczovL2V4YW1wbGUuY29tL3Byb2ZpbGUuanBnIiwiYmlvIjoiSSBhbSBhIHNvZnR3YXJlIGRldmVsb3BlciIsInZlcmlmaWVkIjp0cnVlLCJpYXQiOjE2ODMwNTExODEsImV4cCI6MTY4MzY1NTk4MX0.4azmOrY4pwMRfv3I_LJ5HZzgv8X5CjCYbEViJ3deMrU"';

test("renders learn react link", () => {
  localStorage.setItem("token", mockToken);
  console.log({ localStorage });
  render(<App />);
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
  localStorage.removeItem("token");
});

test("uses token to log in on load", async () => {
  localStorage.setItem("token", mockToken);
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/john_doe!/i)).toBeInTheDocument();
  });
  localStorage.removeItem("token");
});

test("cannot get to authorized links without token", async () => {
  localStorage.setItem("token", mockToken);
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  //Expect user to be logged in.
  await waitFor(() => {
    expect(screen.getByText(/john_doe/i)).toBeInTheDocument();
  });
  const nameText = screen.queryByText(/john_doe/i);

  //Log user out.
  const logoutButton = screen.getByText(/Log Out/i);
  await act(async () => {
    logoutButton.click();
  });

  await waitFor(() => {
    expect(nameText).not.toBeInTheDocument();
  });
  localStorage.removeItem("token");
});
