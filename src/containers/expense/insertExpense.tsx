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
  Switch,
  VStack,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@chakra-ui/react";
import { FocusEvent } from "react";

const InsertExpense: React.FC = () => {
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <main>
      <Container>
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
          onSubmit={() => {}}
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
                  Insert
                </Button>
              </HStack>
            </Form>
          )}
        </Formik>
      </Container>
    </main>
  );
};

export default InsertExpense;
