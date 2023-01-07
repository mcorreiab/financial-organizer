import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FocusEvent, useRef } from "react";
import SideBar from "./sideBar";

type Props = {
  onSubmit: (name: string, value: number) => void;
  logoutAction: () => void;
};

const InsertExpense: React.FC<Props> = ({ onSubmit, logoutAction }) => {
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <Box display={{ base: "block", lg: "flex" }}>
      <nav>
        <SideBar logoutAction={logoutAction} />
      </nav>
      <Box as="main" flexGrow={{ lg: 1 }}>
        <Center minH="100vh" bgColor="gray.100">
          <Container ml={5} mr={5}>
            <Center marginBottom={8}>
              <Heading as="h1">Insert Expense</Heading>
            </Center>
            <Formik
              initialValues={{
                name: "",
                value: 0,
                repeat: false,
                variable: false,
              }}
              validationSchema={Yup.object({
                name: Yup.string().trim().required("Name is invalid"),
                value: Yup.number()
                  .min(1, "Value must be at least 1")
                  .required("Value is invalid"),
              })}
              onSubmit={({ name, value }) => onSubmit(name, value)}
            >
              {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                  <VStack align="left" spacing={4}>
                    <FormControl
                      isInvalid={!!formik.errors.name && formik.touched.name}
                    >
                      <FormLabel>
                        Name
                        <Field
                          as={Input}
                          name="name"
                          placeholder="Expense name"
                          onFocus={handleFocus}
                          value={formik.values.name}
                          bgColor="white"
                        />
                      </FormLabel>
                      <ErrorMessage name="name" component={FormErrorMessage} />
                    </FormControl>
                    <FormControl
                      isInvalid={!!formik.errors.value && formik.touched.value}
                    >
                      <FormLabel>
                        Value
                        <Field
                          as={Input}
                          name="value"
                          placeholder="Value"
                          onFocus={handleFocus}
                          value={formik.values.value}
                          bgColor="white"
                        />
                      </FormLabel>
                      <ErrorMessage name="value" component={FormErrorMessage} />
                    </FormControl>
                    <Field as={Switch} name="repeat">
                      Repeat monthly
                    </Field>
                    <Field as={Switch} name="variable">
                      Varies monthly
                    </Field>
                  </VStack>
                  <HStack marginTop={8}>
                    <Button type="button" variant="ghost" flexGrow={1}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      flexGrow={1}
                      isDisabled={!formik.isValid || !formik.dirty}
                      colorScheme="green"
                    >
                      Save
                    </Button>
                  </HStack>
                </Form>
              )}
            </Formik>
          </Container>
        </Center>
      </Box>
    </Box>
  );
};

export default InsertExpense;
