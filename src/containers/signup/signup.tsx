import { Box, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";
import styled from "styled-components";
import SignUpForm from "./components/form/signUpForm";

const Main = styled.main`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUp: React.FunctionComponent = () => (
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
        <SignUpForm url="/api/signup" />
      </GridItem>
    </Grid>
  </Main>
);

export default SignUp;
