import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { ProtectedRoute } from "../../helpers/ProtectedRoute";
import { MemoryRouter } from "react-router-dom";
import { mockToken } from "../../__mocks__/mockData";

test("renders learn react link", () => {
  localStorage.setItem("token", mockToken);
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
