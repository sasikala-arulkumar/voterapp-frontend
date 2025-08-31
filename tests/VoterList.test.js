import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";  // ✅ Import MemoryRouter
import VoterList from "../VoterList";

describe("VoterList Component", () => {
  const mockVoters = [
    { _id: "1", voterName: "Alice" },
    { _id: "2", voterName: "Bob" },
  ];
  const mockDelete = jest.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <VoterList voters={mockVoters} deleteVoter={mockDelete} />
      </MemoryRouter>
    );
  });

  test("renders all voters in table", () => {
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  test("delete button calls callback", () => {
    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  test("edit button exists for each voter", () => {
    const editButtons = screen.getAllByText("Edit");
    expect(editButtons.length).toBe(mockVoters.length);
  });
});
