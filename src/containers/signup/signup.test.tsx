import { CreateUser } from "@/model/user";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "./signup";

test("send user data when form is filled", async () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;
  render(<Signup />);

  const usernameInput = await screen.findByPlaceholderText(
    "Insert your username"
  );

  const username = "username";
  userEvent.type(usernameInput, username);

  const passwordInput = await screen.findByPlaceholderText(
    "Insert your password"
  );

  const password = "password";
  userEvent.type(passwordInput, password);

  const submitButton = await screen.findByText("Sign up");
  userEvent.click(submitButton);

  waitFor(() => {
    const payload: CreateUser = { username, password };
    expect(mockFetch).toHaveBeenCalledWith("/api/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  });
});
