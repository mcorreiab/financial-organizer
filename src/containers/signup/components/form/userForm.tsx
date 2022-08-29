import * as Yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import { Button } from "@chakra-ui/react";
import FormLabel from "./formLabel";

export interface FormFields {
  username: string;
  password: string;
}

interface Props {
  initialUsername: string;
  initialPassword: string;
  onSubmit: (data: FormFields) => void;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().trim().required("Username is required"),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password is too short"),
});

const Form = styled.form`
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
  flex-direction: column;
`;

const UserForm: React.FunctionComponent<Props> = ({
  onSubmit,
  initialPassword,
  initialUsername,
}) => {
  const formik = useFormik<FormFields>({
    initialValues: {
      username: initialUsername,
      password: initialPassword,
    },
    validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormLabel
        title="Username"
        placeholder="Insert your username"
        name="username"
        touched={formik.touched.username}
        value={formik.values.username}
        error={formik.errors.username}
        onChange={formik.handleChange}
      />
      <FormLabel
        title="Password"
        placeholder="Insert your password"
        name="password"
        touched={formik.touched.password}
        value={formik.values.password}
        error={formik.errors.password}
        onChange={formik.handleChange}
      />
      <Button type="submit" colorScheme="green">
        Sign Up
      </Button>
    </Form>
  );
};

export default UserForm;
