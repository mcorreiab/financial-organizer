import { render, screen } from "@testing-library/react";
import List, { Expense } from "./list";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

test("should open new expense form when click on button", async () => {
  const expenses: Expense[] = [
    {
      id: "1",
      name: "first expense",
      value: 35,
    },
    {
      id: "2",
      name: "second expense",
      value: 14,
    },
  ];
  render(<List expenses={expenses} />);

  // const mockRouter = {
  //   push: jest.fn(),
  // };
  // (useRouter as jest.Mock).mockReturnValue(mockRouter);
  // const mockedRouter = nextRouter.useRouter as jest.Mocked<
  //   () => nextRouter.NextRouter
  // >;

  const button = await screen.findByRole("button", {
    name: "Create a new expense",
  });
  await userEvent.click(button);

  expect(mockRouter.push).toHaveBeenCalledWith("/newExpense");
});
