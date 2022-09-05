import PiggyBank from "@/components/PiggyBank/piggyBank";
import AuthSigninForm from "./signInForm";

const Signin: React.FC = () => {
  return (
    <main>
      <PiggyBank>
        <AuthSigninForm />
      </PiggyBank>
    </main>
  );
};

export default Signin;
