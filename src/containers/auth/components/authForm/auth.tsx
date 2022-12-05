import * as Yup from "yup";
import { Formik } from "formik";
import styled from "styled-components";
import { Button, InputRightElement, useBoolean } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import FormLabel from "./formLabel";

export interface FormFields {
  username: string;
  password: string;
}

interface Props {
  initialUsername: string;
  initialPassword: string;
  buttonTitle: string;
  onSubmit: (data: FormFields) => void;
}

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
  buttonTitle,
}) => {
  const [showPassword, setshowPassword] = useBoolean(false);
  const validationSchema = Yup.object().shape({
    username: Yup.string().trim().required("Username is required"),
    password: Yup.string()
      .trim()
      .required("Password is required")
      .min(8, "Password is too short"),
  });

  return (
    <Formik
      initialValues={{
        username: initialUsername,
        password: initialPassword,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ handleSubmit, touched, values, errors, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <FormLabel
            title="Username"
            placeholder="Insert your username"
            name="username"
            touched={touched.username}
            value={values.username}
            error={errors.username}
            onChange={handleChange}
          />
          <FormLabel
            title="Password"
            placeholder="Insert your password"
            name="password"
            touched={touched.password}
            value={values.password}
            error={errors.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
          >
            <InputRightElement width="4rem">
              <Button
                size="sm"
                onClick={setshowPassword.toggle}
                variant="ghost"
                title="Toggle password visibility"
              >
                {showPassword ? (
                  <ViewOffIcon boxSize={4} />
                ) : (
                  <ViewIcon boxSize={4} />
                )}
              </Button>
            </InputRightElement>
          </FormLabel>
          <Button type="submit" colorScheme="green">
            {buttonTitle}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
