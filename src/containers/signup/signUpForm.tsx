import { Heading, Button, Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { CreateUser } from "@/model/user";
import AuthForm, {
  FormFields,
  basePasswordSchema,
} from "@/components/authForm/authForm";
import { useState } from "react";

export type States = "loading" | "filling" | "success" | "duplicated" | "error";

interface Props {
  url: string;
}

const Form: React.FunctionComponent<Props> = ({ url }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<States>("filling");

  const submitUser = async ({ username, password }: FormFields) => {
    const payload: CreateUser = {
      username,
      password,
    };

    setUsername(username);
    setPassword(password);
    setState("loading");

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    switch (response.status) {
      case 201:
        setState("success");
        break;
      case 409:
        setState("duplicated");
        break;
      default:
        setState("error");
        break;
    }
  };

  const AuthSignupForm = ({ children }: { children?: React.ReactNode }) => (
    <AuthForm
      initialPassword={password}
      initialUsername={username}
      onSubmit={submitUser}
      title="Sign up"
      description="Create an account to start using the financial organizer"
      buttonTitle="Sign Up"
      passwordSchema={basePasswordSchema.min(8, "Password is too short")}
    >
      {children}
    </AuthForm>
  );

  switch (state) {
    case "loading":
      return (
        <Spinner
          thickness="5px"
          size="xl"
          color="green"
          emptyColor="black"
          speed="0.65s"
        />
      );
    case "filling":
      return <AuthSignupForm />;
    case "success":
      return (
        <>
          <Heading as="h1">You successfuly created an account!</Heading>
          <Button colorScheme="green">Go to Sign in</Button>
        </>
      );
    case "duplicated":
      return (
        <AuthSignupForm>
          <Alert status="error">
            <AlertIcon />
            User already exists
          </Alert>
        </AuthSignupForm>
      );
    case "error":
      return (
        <AuthSignupForm>
          <Alert status="error">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        </AuthSignupForm>
      );
  }
};

export default Form;
