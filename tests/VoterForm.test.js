import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";  // ✅ Import MemoryRouter
import VoterForm from "../VoterForm";

describe("VoterForm Component", () => {
  const mockSetVoters = jest.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <VoterForm voters={[]} setVoters={mockSetVoters} />
      </MemoryRouter>
    );
  });

  test("renders all input fields", () => {
    expect(screen.getByLabelText(/Voter Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Family Head/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Wife Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Aadhaar Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  });

  test("user can type in input fields", () => {
    const nameInput = screen.getByLabelText(/Voter Name/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");

    const ageInput = screen.getByLabelText(/Age/i);
    fireEvent.change(ageInput, { target: { value: "30" } });
    expect(ageInput.value).toBe("30");
  });

  test("submit button calls setVoters", () => {
    const nameInput = screen.getByLabelText(/Voter Name/i);
    fireEvent.change(nameInput, { target: { value: "Alice" } });

    const ageInput = screen.getByLabelText(/Age/i);
    fireEvent.change(ageInput, { target: { value: "25" } });

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);

    expect(mockSetVoters).toHaveBeenCalled();
  });
});
