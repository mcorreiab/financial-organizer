import { Text, Heading, Divider, Box } from "@chakra-ui/react";
import { RequiredStringSchema } from "yup/lib/string";
import { AnyObject } from "yup/lib/types";
import UserForm, { FormFields, basePasswordSchema } from "./userForm";

interface Props {
  initialUsername?: string;
  initialPassword?: string;
  onSubmit: (data: FormFields) => void;
  children?: React.ReactNode;
  title: string;
  description: string;
  buttonTitle: string;
  passwordSchema?: RequiredStringSchema<string | undefined, AnyObject>;
}

export type { FormFields };
export { basePasswordSchema };

const AuthForm: React.FC<Props> = ({
  title,
  description,
  children,
  onSubmit,
  initialPassword = "",
  initialUsername = "",
  buttonTitle,
  passwordSchema = basePasswordSchema,
}) => (
  <Box display="flex" alignItems="center" flexDirection="column" gap="1.5rem">
    <Heading as="h1">{title}</Heading>
    <Text>{description}</Text>
    <Divider />
    {children}
    <UserForm
      onSubmit={onSubmit}
      initialPassword={initialPassword}
      initialUsername={initialUsername}
      buttonTitle={buttonTitle}
      passwordSchema={passwordSchema}
    />
  </Box>
);

export default AuthForm;
