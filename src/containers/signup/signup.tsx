import { Text, Heading, Divider, Box, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";
import styled from "styled-components";
import { CreateUser } from "@/model/user";
import UserForm, { FormFields } from "./components/UserForm/userForm";

const Main = styled.main`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const submitUser = ({ username, password }: FormFields) => {
  const payload: CreateUser = {
    username,
    password,
  };

  fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

const SignUp: React.FunctionComponent = () => {
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
          <UserForm onSubmit={submitUser} />
        </GridItem>
      </Grid>
    </Main>
  );
};

export default SignUp;
