import {
  Heading,
  Button,
  Alert,
  AlertIcon,
  Spinner,
  Container,
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
            <Heading as="h1" textAlign="center">
              You successfuly created an account!
            </Heading>
            <Button colorScheme="green">Go to Sign in</Button>
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
