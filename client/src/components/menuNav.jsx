"use client";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  MenuGroup,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function MenuNav() {
  const UserName = "Felhasználó neve";
  const UserType = "Ételfelajánló";
  const { isOpen, onOpen, onClose } = useDisclosure();

  let navigate = useNavigate();
  const routeChangeFoodsavers = () => {
    let path = "/foodsavers";
    navigate(path);
  };

  const routeChangeAbout = () => {
    let path = "/aboutus";
    navigate(path);
  };

  const routeChangeJoin = () => {
    let path = "/join";
    navigate(path);
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Text fontSize="2xl" as="b" fontFamily="Georgia">
                <Button onClick={routeChangeFoodsavers}>Ételmentők</Button>
              </Text>
            </Box>
            <HStack
              as={"nav"}
              spacing={5}
              display={{ base: "none", md: "flex" }}
            >
              <Button onClick={routeChangeAbout}>
                <NavLink>Rólunk</NavLink>
              </Button>
              <Button onClick={routeChangeJoin}>
                <NavLink>Csatlakozz</NavLink>
              </Button>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}></Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Button onClick={routeChangeAbout}>
                <NavLink>Rólunk</NavLink>
              </Button>
              <Button onClick={routeChangeJoin}>
                <NavLink>Csatlakozz</NavLink>
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
