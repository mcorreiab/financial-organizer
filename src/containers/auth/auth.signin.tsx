import { useRouter } from "next/router";
import NextLink from "next/link";
import { Text, Link } from "@chakra-ui/react";
import Auth from "./auth";

const SignIn: React.FC = () => {
  const router = useRouter();

  const goToSignUp = (
    <Text>
      {"Don't have an account? "}
      <Link as={NextLink} href="/signup" color="green">
        Sign up
      </Link>
    </Text>
  );

  return (
    <Auth
      url="/api/signin"
      title="Sign in"
      description="Sign in to access your finances"
      onSuccessCallback={() => router.push("/")}
      actionRedirect={goToSignUp}
    />
  );
};

export default SignIn;
