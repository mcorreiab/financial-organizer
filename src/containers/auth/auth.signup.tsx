import { Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import Auth from "./auth";

const SignIn: React.FC = () => (
  <Auth
    url="/api/signup"
    title="Sign up"
    description="Create an account to start using the financial organizer"
  >
    <Heading as="h1" textAlign="center">
      You successfuly created an account!
    </Heading>
    <Button colorScheme="green" as={Link} href="/signin">
      Go to Sign in
    </Button>
  </Auth>
);

export default SignIn;
