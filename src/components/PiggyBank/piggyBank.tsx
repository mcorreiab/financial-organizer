import { Grid, GridItem, Container } from "@chakra-ui/react";
import Image from "next/future/image";

interface Props {
  children?: React.ReactNode;
}

const PiggyBank: React.FC<Props> = ({ children }) => (
  <Container
    margin="0 auto"
    display="flex"
    flexDirection="column"
    alignItems="center"
    maxWidth={{ base: 500, xl: 1200 }}
  >
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
        <Image
          src="/piggy-bank.jpg"
          height={200}
          width={200}
          alt=""
          style={{ width: "100%", height: "auto" }}
          priority={true}
          sizes="100vw"
        />
      </GridItem>
      <GridItem colStart={{ xl: 1 }} rowStart={{ xl: 1 }}>
        {children}
      </GridItem>
    </Grid>
  </Container>
);

export default PiggyBank;
