import { Input, Text, InputGroup, InputRightElement } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import styled from "styled-components";

interface Props {
  title: string;
  placeholder: string;
  name: string;
  touched: boolean | undefined;
  value: string;
  error: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Label = styled.label`
  font-weight: 500;
`;

const FormLabel: React.FunctionComponent<Props> = ({
  title,
  placeholder,
  name,
  touched,
  value,
  onChange,
  error,
}) => (
  <Label>
    {title}
    <InputGroup>
      <Input
        placeholder={placeholder}
        name={name}
        isInvalid={touched && error != undefined}
        value={value}
        onChange={onChange}
      />
      {touched && error ? (
        <InputRightElement>
          <WarningIcon color="red.500" />
        </InputRightElement>
      ) : null}
    </InputGroup>
    {touched && error ? (
      <div>
        <Text color="red">{error}</Text>
      </div>
    ) : null}
  </Label>
);

export default FormLabel;
