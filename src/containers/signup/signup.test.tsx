import { CreateUser } from "@/model/user";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "./signup";

test("should successfuly save a user", async () => {
  render(<Signup />);

  await fillTheFormAndSubmitUserData(201);

  await waitFor(() => {
    expect(
      screen.getByText("You successfuly created an account!")
    ).toBeVisible();
    expect(screen.getByText("Go to Sign in")).toBeVisible();
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

test("Show an error message when a generic submit error occurs", async () => {
  render(<Signup />);

  await fillTheFormAndSubmitUserData(500);

  await waitFor(() => {
    expect(
      screen.getByText("There was an error processing your request")
    ).toBeVisible();
  });
});

test("Show an error message when a generic submit error occurs", async () => {
  render(<Signup />);

  await fillTheFormAndSubmitUserData(409);

  await waitFor(() => {
    expect(screen.getByText("User already exists")).toBeVisible();
  });
});

async function fillTheFormAndSubmitUserData(status: number) {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;
  mockFetch.mockResolvedValue({ status });

  await typeUsername("username");

  await typePassword("password");

  await clickOnSignUpButton();
}

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
