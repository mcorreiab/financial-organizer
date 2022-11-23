import { useRouter } from "next/router";
import Auth from "./auth";

const SignIn: React.FC = () => {
  const router = useRouter();
  return (
    <Auth
      url="/api/signin"
      title="Sign in"
      description="Sign in to access your finances"
      onSuccessCallback={() => router.push("/")}
    />
  );
};

export default SignIn;
