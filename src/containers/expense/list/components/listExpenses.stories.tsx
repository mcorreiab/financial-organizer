import { ComponentStory, ComponentMeta } from "@storybook/react";
import ListExpense from "./listExpenses";

export default {
  title: "Financial Organizer/Expense/List",
  component: ListExpense,
} as ComponentMeta<typeof ListExpense>;

const Template: ComponentStory<typeof ListExpense> = (args) => (
  <ListExpense {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  expenses: [
    {
      id: "1",
      name: "First Expense",
      value: 50,
    },
    {
      id: "2",
      name: "Second Expense",
      value: -10,
    },
    {
      id: "3",
      name: "Third Expense",
      value: 1000,
    },
    {
      id: "4",
      name: "Fourth Expense",
      value: 50,
    },
  ],
};
