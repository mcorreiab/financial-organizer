import { Input, Text, InputGroup, FormLabel } from "@chakra-ui/react";
import { Field } from "formik";

interface Props {
  title: string;
  placeholder: string;
  name: string;
  touched: boolean | undefined;
  value: string;
  error: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  children?: React.ReactNode;
}

const Label: React.FunctionComponent<Props> = ({
  title,
  placeholder,
  name,
  touched,
  value,
  onChange,
  error,
  type = "text",
  children,
}) => (
  <FormLabel>
    {title}
    <InputGroup>
      <Field
        as={Input}
        placeholder={placeholder}
        name={name}
        isInvalid={touched && error != undefined}
        value={value}
        onChange={onChange}
        type={type}
      />
      {children}
    </InputGroup>
    {touched && error ? (
      <div>
        <Text color="red">{error}</Text>
      </div>
    ) : null}
  </FormLabel>
);

export default Label;
