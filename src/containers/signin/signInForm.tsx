import { Heading, Button, Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { CreateUser } from "@/model/user";
import AuthForm, {
  FormFields,
  basePasswordSchema,
} from "@/components/authForm/authForm";
import { useState } from "react";

export type States = "loading" | "filling" | "success" | "error";

const Form: React.FunctionComponent = () => {
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

    const response = await fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    switch (response.status) {
      case 201:
        setState("success");
        break;
      default:
        setState("error");
        break;
    }
  };

  const AuthSignIn = ({ children }: { children?: React.ReactNode }) => (
    <AuthForm
      initialPassword={password}
      initialUsername={username}
      onSubmit={submitUser}
      title="Sign in"
      description="Sign in to access your finances"
      buttonTitle="Sign in"
      passwordSchema={basePasswordSchema}
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
      return <AuthSignIn />;
    case "success":
      return (
        <>
          <Heading as="h1">You successfuly created an account!</Heading>
          <Button colorScheme="green">Go to Sign in</Button>
        </>
      );
    case "error":
      return (
        <AuthSignIn>
          <Alert status="error">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        </AuthSignIn>
      );
  }
};

export default Form;
