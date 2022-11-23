import AuthForm, { FormFields } from "./components/authForm/authForm";
import { useState } from "react";
import { CreateUser } from "@/model/user";

interface Props {
  url: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  onSuccessCallback?: () => void;
}

interface ErrorDetail {
  errorCode: string;
}

export type States = "loading" | "filling" | "success" | "error";

const Auth: React.FC<Props> = ({
  url,
  description,
  title,
  children,
  onSuccessCallback: successCallback,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<States>("filling");
  const [errorDetail, setErrorDetail] = useState<ErrorDetail | null>(null);

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
        successCallback && successCallback();
        break;
      default:
        setState("error");
        setErrorDetail(await response.json());
        break;
    }
  };

  let errorMessage: string;

  switch (errorDetail?.errorCode) {
    case "auth_error":
      errorMessage = "Invalid username or password";
      break;
    case "user_exists":
      errorMessage = "User already exists";
      break;
    default:
      errorMessage = "There was an error processing your request";
  }

  return (
    <main>
      <AuthForm
        buttonTitle={title}
        description={description}
        onSubmit={submitUser}
        state={state}
        title={title}
        errorMessage={errorMessage}
        initialPassword={password}
        initialUsername={username}
      >
        {children}
      </AuthForm>
    </main>
  );
};

export default Auth;
