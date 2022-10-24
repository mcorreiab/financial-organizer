import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InsertExpense from "./insertExpense";

test("Value should be a positive number", async () => {
  render(<InsertExpense />);

  const valueInput = await screen.findByPlaceholderText("Value");
  await userEvent.clear(valueInput);
  await userEvent.type(valueInput, "0");

  const expenseInput = await screen.findByPlaceholderText("Expense name");
  await userEvent.click(expenseInput);

  expect(screen.getByText("Value must be at least 1")).toBeInTheDocument();
});
