import { NextPage } from "next";
import Auth from "@/containers/auth/auth";

const Login: NextPage = () => (
  <Auth
    url="/api/signup"
    title="Sign up"
    description="Create an account to start using the financial organizer"
  />
);

export default Login;
