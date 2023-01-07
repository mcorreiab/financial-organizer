import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import InsertExpense from "./create";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;

test("Value should be a positive number", async () => {
  render(<InsertExpense />);

  const valueInput = await screen.findByPlaceholderText("Value");
  await userEvent.clear(valueInput);
  await userEvent.type(valueInput, "0");

  const expenseInput = await screen.findByPlaceholderText("Expense name");
  await userEvent.click(expenseInput);

  expect(screen.getByText("Value must be at least 1")).toBeInTheDocument();
});

test("should fill the form and submit with success", async () => {
  const fetch = jest.fn();
  global.fetch = fetch;

  render(<InsertExpense />);

  const expenseInput = await screen.findByPlaceholderText("Expense name");
  await userEvent.type(expenseInput, "Name to save");

  const valueInput = await screen.findByPlaceholderText("Value");
  await userEvent.type(valueInput, "55");

  const saveButton = await screen.findByRole("button", { name: "Save" });
  await userEvent.click(saveButton);

  expect(fetch).toHaveBeenCalled();
});

test("should logout with success", async () => {
  const mockedFetch = jest.fn();
  global.fetch = mockedFetch;

  const replace = jest.fn();

  mockUseRouter.mockImplementation(() => ({
    replace,
  }));

  render(<InsertExpense />);
  const logout = await screen.findByRole("button", { name: "Log out" });
  await userEvent.click(logout);

  expect(mockedFetch).toHaveBeenCalled();
  expect(replace).toHaveBeenCalled();
});
