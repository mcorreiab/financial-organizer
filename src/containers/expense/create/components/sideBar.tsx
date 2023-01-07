import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import Link from "next/link";

type Props = {
  logoutAction: () => void;
};

const SideBar: React.FC<Props> = ({ logoutAction }) => {
  const Title: React.FC<{ marginBottom?: number }> = ({ marginBottom }) => (
    <Text fontWeight={600} marginBottom={marginBottom}>
      Financial Organizer
    </Text>
  );

  const Links: React.FC = () => (
    <>
      <Link href="/">Home</Link>
      <Button variant="link" onClick={logoutAction}>
        Log out
      </Button>
    </>
  );

  const MobileSideBar: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const menuButtonRef = useRef(null);

    return (
      <>
        <Box
          alignItems="center"
          bgColor="white"
          paddingY={3}
          paddingRight={3}
          display={{ base: "flex", lg: "none" }}
        >
          <Button
            mr={3}
            bgColor="white"
            aria-label="Open menu"
            ref={menuButtonRef}
            onClick={onOpen}
          >
            <HamburgerIcon />
          </Button>
          <Title />
        </Box>
        <Drawer isOpen={isOpen} onClose={onClose} size="xs" placement="left">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>Financial Organizer</DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody display="flex">
              <VStack flexBasis="fit-content">
                <Links />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  };

  const DesktopSideBar: React.FC = () => (
    <Box
      minHeight="100vh"
      display={{ base: "none", lg: "flex" }}
      padding={3}
      flexDirection="column"
      alignItems="flex-start"
      gap={1}
    >
      <Title marginBottom={4} />
      <Links />
    </Box>
  );

  return (
    <>
      <MobileSideBar />
      <DesktopSideBar />
    </>
  );
};

export default SideBar;
