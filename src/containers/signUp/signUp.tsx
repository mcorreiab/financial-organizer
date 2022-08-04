import {
  Input,
  Button,
  Text,
  Heading,
  Divider,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const Label = styled.label`
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
  flex-direction: column;
`;

const Main = styled.main`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUp: React.FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Main>
      <Grid
        maxWidth={{ base: 500, xl: 1200 }}
        rowGap="1.5rem"
        templateColumns={{ xl: "500px 700px" }}
        alignItems="center"
        justifyContent="space-around"
      >
        <GridItem
          display="flex"
          justifyContent={{ base: "center", xl: "stretch" }}
          colStart={{ xl: 2 }}
          placeSelf={{ xl: "stretch" }}
        >
          <Box flexGrow={1}>
            <Image
              src="/piggy-bank.jpg"
              height={200}
              width={200}
              alt=""
              layout="responsive"
              priority={true}
            />
          </Box>
        </GridItem>
        <GridItem
          colStart={{ xl: 1 }}
          rowStart={{ xl: 1 }}
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap="1.5rem"
        >
          <Heading as="h1">Sign up</Heading>
          <Text>Create an account to start using the financial organizer</Text>
          <Divider />
          <Form>
            <Label>
              Username*
              <Input
                placeholder="Insert your username"
                value={username}
                onChange={changeUsername}
              />
            </Label>
            <Label>
              Password*
              <Input
                placeholder="Insert your password"
                type="password"
                value={password}
                onChange={changePassword}
              />
            </Label>
            <Button colorScheme="green">Sign Up</Button>
          </Form>
        </GridItem>
      </Grid>
    </Main>
  );
};

export default SignUp;
