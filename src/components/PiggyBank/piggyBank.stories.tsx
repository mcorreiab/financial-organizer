import { Text, Box } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import PiggyBankComponent from "./piggyBank";

export default {
  title: "Financial Organizer/Auth/Components/Piggy Bank",
  component: PiggyBankComponent,
} as ComponentMeta<typeof PiggyBankComponent>;

export const PiggyBank: ComponentStory<typeof PiggyBankComponent> = () => (
  <PiggyBankComponent>
    <Box bg="green.500" padding="2rem">
      <Text color="whiteAlpha.900">This is where the child component go</Text>
    </Box>
  </PiggyBankComponent>
);
