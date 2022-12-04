import { Heading, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { Text, Link } from "@chakra-ui/react";
import Auth from "./auth";

const SignIn: React.FC = () => {
  const goToSignIn = (
    <Text>
      {"Already have an account? "}
      <Link as={NextLink} href="/signin" color="green">
        Sign in
      </Link>
    </Text>
  );

  return (
    <Auth
      url="/api/signup"
      title="Sign up"
      description="Create an account to start using the financial organizer"
      actionRedirect={goToSignIn}
    >
      <Heading as="h1" textAlign="center">
        You successfuly created an account!
      </Heading>
      <Button colorScheme="green" as={Link} href="/signin">
        Go to Sign in
      </Button>
    </Auth>
  );
};

export default SignIn;
