import { ComponentStory } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";
import SignUp from "./signup";

export default {
  component: SignUp,
};

const Template: ComponentStory<typeof SignUp> = (args) => <SignUp {...args} />;

export const EmptyForm = Template.bind({});

export const FormWithInputErrors = Template.bind({});
FormWithInputErrors.play = async () => {
  const userInput = await screen.findByPlaceholderText("Insert your username");
  await userEvent.type(userInput, "");

  const passwordInput = await screen.findByPlaceholderText(
    "Insert your password"
  );
  await userEvent.type(passwordInput, "");

  const signupButton = await screen.findByText("Sign Up");
  await userEvent.click(signupButton);
};
