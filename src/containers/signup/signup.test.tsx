import { CreateUser } from "@/model/user";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "./signup";

test("send user data when form is filled", async () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;
  render(<Signup />);

  const username = "username";

  await typeUsername(username);

  const password = "password";

  await typePassword(password);

  await clickOnSignUpButton();

  const payload: CreateUser = { username, password };
  expect(mockFetch).toHaveBeenCalledWith("/api/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
});

test("Show an error message when username is empty", async () => {
  render(<Signup />);
  await typeUsername(" ");

  await clickOnSignUpButton();

  expect(screen.getByText("Username is required")).toBeInTheDocument();
});

test("Show an error message when password is empty", async () => {
  render(<Signup />);
  typePassword(" ");

  await clickOnSignUpButton();

  expect(screen.getByText("Password is required")).toBeInTheDocument();
});

test("Show an error message when password is lower than minimum", async () => {
  render(<Signup />);
  await typePassword("1234567");

  await clickOnSignUpButton();

  expect(screen.getByText("Password is too short")).toBeInTheDocument();
});

async function typeUsername(username: string) {
  const usernameInput = await screen.findByPlaceholderText(
    "Insert your username"
  );

  await userEvent.type(usernameInput, username);
}

async function typePassword(password: string) {
  const passwordInput = await screen.findByPlaceholderText(
    "Insert your password"
  );
  await userEvent.type(passwordInput, password);
}

async function clickOnSignUpButton() {
  const submitButton = await screen.findByText("Sign Up");
  await userEvent.click(submitButton);
}
