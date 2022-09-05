import { ComponentMeta, ComponentStory } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";
import AuthForm from "./authForm";

export default {
  title: "Financial Organizer/Auth/Components/Auth Form",
  component: AuthForm,
} as ComponentMeta<typeof AuthForm>;

const Template: ComponentStory<typeof AuthForm> = (args) => (
  <AuthForm
    title="Page title"
    buttonTitle="Button title"
    description="Description"
    initialPassword={args.initialPassword}
    initialUsername={args.initialUsername}
    onSubmit={() => {}}
  />
);

export const EmptyForm = Template.bind({});
EmptyForm.args = {
  initialPassword: "",
  initialUsername: "",
};

export const FormInputError = Template.bind({});
FormInputError.play = async () => {
  const usernameInput = await screen.findByPlaceholderText(
    "Insert your username"
  );
  await userEvent.type(usernameInput, " ");

  const passwordInput = await screen.findByPlaceholderText(
    "Insert your password"
  );
  await userEvent.type(passwordInput, " ");

  const button = await screen.findByText("Button title");
  await userEvent.click(button);
};
