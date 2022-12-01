import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";
import InsertExpense from "./insertExpenseForm";

export default {
  title: "Financial Organizer/Insertion/Expense",
  component: InsertExpense,
} as ComponentMeta<typeof InsertExpense>;

const Template: ComponentStory<typeof InsertExpense> = (args) => (
  <InsertExpense {...args} />
);

export const EmptyForm = Template.bind({});

export const InputErrors = Template.bind({});
InputErrors.play = async () => {
  const nameInput = await screen.findByPlaceholderText("Expense name");
  await userEvent.click(nameInput);

  const valueInput = await screen.findByPlaceholderText("Value");
  await userEvent.click(valueInput);

  const cancelButton = await screen.findByRole("button", { name: "Cancel" });
  await userEvent.click(cancelButton);
};

export const FilledForm = Template.bind({});
FilledForm.play = async () => {
  const nameInput = await screen.findByPlaceholderText("Expense name");
  await userEvent.type(nameInput, "Example expense");

  const valueInput = await screen.findByPlaceholderText("Value");
  await userEvent.type(valueInput, "5");

  const repeatToggle = await screen.findByText("Repeat monthly");
  await userEvent.click(repeatToggle);

  const variationToggle = await screen.findByText("Varies monthly");
  await userEvent.click(variationToggle);
};
