import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Auth from "./auth";

const buttonName = "button";

test("user should successfuly do auth action", async () => {
  render(
    <Auth
      description="description"
      title={buttonName}
      url="http://url.com"
      actionRedirect={null}
    >
      You successfuly created an account!
    </Auth>
  );

  await fillTheFormAndSubmitUserData(201);

  await waitFor(() => {
    expect(
      screen.getByText("You successfuly created an account!")
    ).toBeVisible();
  });
});

test("Show an error message when username is empty", async () => {
  render(
    <Auth
      description="description"
      title={buttonName}
      url="http://url.com"
      actionRedirect={null}
    />
  );
  await typeUsername(" ");

  await clickOnSubmitButton();

  expect(screen.getByText("Username is required")).toBeInTheDocument();
});

test("Show an error message when password is empty", async () => {
  render(
    <Auth
      description="description"
      title={buttonName}
      url="http://url.com"
      actionRedirect={null}
    />
  );
  typePassword(" ");

  await clickOnSubmitButton();

  expect(screen.getByText("Password is required")).toBeInTheDocument();
});

test("Show an error message when password is lower than minimum", async () => {
  render(
    <Auth
      description="description"
      title={buttonName}
      url="http://url.com"
      actionRedirect={null}
    />
  );
  await typePassword("1234567");

  await clickOnSubmitButton();

  expect(screen.getByText("Password is too short")).toBeInTheDocument();
});

test("Show an error message when a generic submit error occurs", async () => {
  render(
    <Auth
      description="description"
      title={buttonName}
      url="http://url.com"
      actionRedirect={null}
    />
  );

  await fillTheFormAndSubmitUserData(500);

  await waitFor(() => {
    expect(
      screen.getByText("There was an error processing your request")
    ).toBeVisible();
  });
});

test("should show an error when receives an auth error", async () => {
  render(
    <Auth
      description="description"
      title={buttonName}
      url="http://url.com"
      actionRedirect={null}
    />
  );

  await fillTheFormAndSubmitUserData(403, "auth_error");

  await waitFor(() => {
    expect(screen.getByText("Invalid username or password")).toBeVisible();
  });
});

test("Show an error message when user already exists", async () => {
  render(
    <Auth
      description="description"
      title={buttonName}
      url="http://url.com"
      actionRedirect={null}
    />
  );

  await fillTheFormAndSubmitUserData(409, "user_exists");

  await waitFor(() => {
    expect(screen.getByText("User already exists")).toBeVisible();
  });
});

async function fillTheFormAndSubmitUserData(
  status: number,
  errorCode: string | null = null
) {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;
  const json = () => Promise.resolve(JSON.stringify({ error_code: errorCode }));
  mockFetch.mockResolvedValue({ status, json });

  await typeUsername("username");

  await typePassword("password");

  await clickOnSubmitButton();
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

async function clickOnSubmitButton() {
  const submitButton = await screen.findByRole("button", { name: buttonName });
  await userEvent.click(submitButton);
}
