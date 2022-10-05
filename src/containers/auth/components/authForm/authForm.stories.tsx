import { ComponentMeta, ComponentStory } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";
import { rest } from "msw";
import AuthForm from "./authForm";

const url = "/url";
const title = "Title";

export default {
  title: "Financial Organizer/Auth/Auth Form",
  component: AuthForm,
  args: {
    onSubmit: () => {},
    title,
    description: "Short description",
    state: "filling",
  },
} as ComponentMeta<typeof AuthForm>;

const Template: ComponentStory<typeof AuthForm> = (args) => (
  <AuthForm {...args} />
);

export const EmptyForm = Template.bind({});
export const FilledForm = Template.bind({});
FilledForm.args = {
  initialUsername: "username",
  initialPassword: "password",
};

export const FormWithInputErrors = Template.bind({});
FormWithInputErrors.play = async () => {
  const submitButton = await screen.findByRole("button", { name: title });
  await userEvent.click(submitButton);
};

export const FormWithSuccessMessage = Template.bind({});

FormWithSuccessMessage.args = {
  state: "success",
};

export const FormInLoadingState = Template.bind({});
FormInLoadingState.args = {
  state: "loading",
};

export const FormWithSubmitError = Template.bind({});
FormWithSubmitError.args = {
  ...FilledForm.args,
  errorMessage: "Error message",
  state: "error",
};
