import { NextPage } from "next";
import Auth from "@/containers/auth/auth";

const Signin: NextPage = () => (
  <Auth
    url="/api/signin"
    title="Sign in"
    description="Sign in to access your finances"
  />
);

export default Signin;
