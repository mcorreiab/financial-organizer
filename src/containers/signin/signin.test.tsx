import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signin from "./signin";

test("should successfuly login", async () => {
  render(<Signin />);

  await typeUserPasswordAndSubmit(201);
});

test("should show an error when receives an error code", async () => {
  render(<Signin />);

  await typeUserPasswordAndSubmit(500);

  await waitFor(() => {
    expect(
      screen.getByText("There was an error processing your request")
    ).toBeVisible();
  });
});

async function typeUserPasswordAndSubmit(status: number) {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;
  mockFetch.mockResolvedValue({ status });

  const usernameInput = await screen.findByPlaceholderText(
    "Insert your username"
  );
  await userEvent.type(usernameInput, "username");

  const passwordInput = await screen.findByPlaceholderText(
    "Insert your password"
  );
  await userEvent.type(passwordInput, "password");

  const signInButton = await screen.findByRole("button", { name: "Sign in" });
  await userEvent.click(signInButton);

  expect(mockFetch).toBeCalled();
}
