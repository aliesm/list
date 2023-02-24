import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders list of vehicles", () => {
  render(<App />);
  const vehicleNames = screen.getAllByRole("listitem").map((li) => li.textContent);
  expect(vehicleNames).toEqual([]);
});

test("clicking a vehicle displays its name in popup", () => {
  render(<App />);
  const vehicleName = "Car";
  fireEvent.click(screen.getByText(vehicleName));
  const popupContent = screen.getByText(vehicleName);
  expect(popupContent).toBeInTheDocument();
});