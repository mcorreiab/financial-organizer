import {
  Heading,
  Alert,
  AlertIcon,
  Container,
  Spinner,
  Box,
  Text,
  Divider,
} from "@chakra-ui/react";
import Auth, { FormFields } from "./auth";
import PiggyBank from "./piggyBank";

interface Props {
  initialUsername?: string;
  initialPassword?: string;
  onSubmit: (data: FormFields) => void;
  title: string;
  description: string;
  buttonTitle: string;
  errorMessage?: string;
  state: States;
  children: React.ReactNode;
}

export type States = "loading" | "filling" | "success" | "error";
export type { FormFields };

const Form: React.FC<Props> = ({
  initialUsername = "",
  initialPassword = "",
  description,
  onSubmit,
  title,
  errorMessage,
  state,
  children,
}) => {
  const FormBeingFilled = ({ children }: { children?: React.ReactNode }) => (
    <Box display="flex" alignItems="center" flexDirection="column" gap="1.5rem">
      <Heading as="h1">{title}</Heading>
      <Text>{description}</Text>
      <Divider />
      {children}
      <Auth
        onSubmit={onSubmit}
        initialPassword={initialPassword}
        initialUsername={initialUsername}
        buttonTitle={title}
      />
    </Box>
  );

  switch (state) {
    case "loading":
      return (
        <PiggyBank>
          <Spinner
            thickness="5px"
            size="xl"
            color="green"
            emptyColor="black"
            speed="0.65s"
          />
        </PiggyBank>
      );
    case "filling":
      return (
        <PiggyBank>
          <FormBeingFilled />
        </PiggyBank>
      );
    case "success":
      return (
        <PiggyBank>
          <Container centerContent gap="16px">
            {children}
          </Container>
        </PiggyBank>
      );
    case "error":
      return (
        <PiggyBank>
          <FormBeingFilled>
            <Alert status="error">
              <AlertIcon />
              {errorMessage}
            </Alert>
          </FormBeingFilled>
        </PiggyBank>
      );
  }
};

export default Form;
