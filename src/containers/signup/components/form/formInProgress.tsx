import { Text, Heading, Divider } from "@chakra-ui/react";
import UserForm, { FormFields } from "./userForm";

interface Props {
  initialUsername: string;
  initialPassword: string;
  onSubmit: (data: FormFields) => void;
  children?: React.ReactNode;
}

const FormInProgress: React.FC<Props> = ({
  initialPassword,
  initialUsername,
  onSubmit,
  children,
}) => (
  <>
    <Heading as="h1">Sign up</Heading>
    <Text>Create an account to start using the financial organizer</Text>
    <Divider />
    {children}
    <UserForm
      onSubmit={onSubmit}
      initialPassword={initialPassword}
      initialUsername={initialUsername}
    />
  </>
);

export default FormInProgress;
