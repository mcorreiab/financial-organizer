import { ComponentStory } from "@storybook/react";
import Signin from "./signin";

export default {
  title: "Financial Organizer/Auth/Sign in",
  component: Signin,
};

export const EmptyForm: ComponentStory<typeof Signin> = () => <Signin />;
