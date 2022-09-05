import PiggyBank from "@/components/PiggyBank/piggyBank";
import SignUpForm from "./signUpForm";

const SignUp: React.FunctionComponent = () => (
  <main>
    <PiggyBank>
      <SignUpForm url="/api/signup" />
    </PiggyBank>
  </main>
);

export default SignUp;
