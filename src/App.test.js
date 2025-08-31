// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// ✅ Mock Webcam to avoid async state warnings
jest.mock("react-webcam", () => () => <div data-testid="webcam" />);

describe("App Routing", () => {
  test("renders Navbar on initial load", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Check if the logo exists
    expect(screen.getByText(/VoterApp/i)).toBeInTheDocument();
  });

  test("renders RegisterVoter page when navigating", () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <App />
      </MemoryRouter>
    );

    // Match the actual page heading
    expect(
      screen.getByRole("heading", { name: /Register New Voter/i })
    ).toBeInTheDocument();
  });

  test("renders All Voters page when navigating", () => {
    render(
      <MemoryRouter initialEntries={["/voters"]}>
        <App />
      </MemoryRouter>
    );

    // Match only the page heading, ignoring navbar links
    expect(
      screen.getByRole("heading", { name: /All Voters/i })
    ).toBeInTheDocument();
  });
});
