import { ComponentStory } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";
import { rest } from "msw";
import SignUp from "./signup";

export default {
  component: SignUp,
};

const Template: ComponentStory<typeof SignUp> = (args) => <SignUp {...args} />;

export const EmptyForm = Template.bind({});

export const FormWithInputErrors = Template.bind({});
FormWithInputErrors.play = async () => {
  await insertUserAndPasswordAndSignup(" ", " ");
};

export const FormWithSuccessMessage = Template.bind({});
FormWithSuccessMessage.parameters = {
  msw: [
    rest.post("/api/signup", (_req, res, ctx) => {
      return res(ctx.status(201));
    }),
  ],
};
FormWithSuccessMessage.play = async () => {
  await insertUserAndPasswordAndSignup("username", "password");
};

export const FormInLoadingState = Template.bind({});
FormInLoadingState.parameters = {
  msw: [
    rest.post("/api/signup", (_req, res, ctx) => {
      return res(ctx.delay("infinite"));
    }),
  ],
};
FormInLoadingState.play = async () => {
  await insertUserAndPasswordAndSignup("username", "password");
};

export const FormWithSubmitError = Template.bind({});
FormWithSubmitError.parameters = {
  msw: [
    rest.post("/api/signup", (_req, res, ctx) => {
      return res(ctx.status(500));
    }),
  ],
};
FormWithSubmitError.play = async () => {
  await insertUserAndPasswordAndSignup("username", "password");
};

async function insertUserAndPasswordAndSignup(
  username: string,
  password: string
) {
  const userInput = await screen.findByPlaceholderText("Insert your username");
  await userEvent.type(userInput, username);

  const passwordInput = await screen.findByPlaceholderText(
    "Insert your password"
  );
  await userEvent.type(passwordInput, password);

  const signupButton = await screen.findByText("Sign Up");
  await userEvent.click(signupButton);
}
