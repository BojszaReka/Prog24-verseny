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
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Role } from "../misc/Role.enum";

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

export default function Simple() {
  const { user, logout } = useContext(AuthContext);

  const UserName = user.name;
  const UserType = "Ételfelajánló";
  const { isOpen, onOpen, onClose } = useDisclosure();

  let navigate = useNavigate();
  const routeChangeUpload = () => {
    let path = "/loggedin/upload";
    navigate(path);
  };

  const routeChangeUploaded = () => {
    let path = "/loggedin/uploaded";
    navigate(path);
  };

  const routeChangeSearch = () => {
    let path = "/loggedin/search";
    navigate(path);
  };

  const routeChangeSpec = () => {
    let path = "/loggedin/spec";
    navigate(path);
  };

  const routeChangeSettings = () => {
    let path = "/loggedin/settings";
    navigate(path);
  };

  const routeChangeSignout = () => {
    logout();
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
                Ételmentők
              </Text>
            </Box>
            <HStack
              as={"nav"}
              spacing={5}
              display={{ base: "none", md: "flex" }}
            >
              {
                user.roleId == Role.FOOD_OFFERER &&
                <Button Button onClick={routeChangeUpload}>
                  <NavLink>Étel feltöltése</NavLink>
                </Button>
              }
              <Button onClick={routeChangeUploaded}>
                <NavLink>Feltöltött ételek</NavLink>
              </Button>
              <Button onClick={routeChangeSearch}>
                <NavLink>Ételek keresése</NavLink>
              </Button>
              <Button onClick={routeChangeSpec}>
                <NavLink>Szükségek specifikálása</NavLink>
              </Button>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar name={UserName} size={"sm"} colorScheme="blue" />
              </MenuButton>
              <MenuList>
                <MenuGroup title={UserName}>
                  <MenuItem onClick={routeChangeSettings}>Beállítások</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={routeChangeSignout}>
                    Kijelentkezés
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Button onClick={routeChangeUpload}>
                <NavLink>Étel feltöltése</NavLink>
              </Button>
              <Button onClick={routeChangeUploaded}>
                <NavLink>Feltöltött ételek</NavLink>
              </Button>
              <Button onClick={routeChangeSearch}>
                <NavLink>Ételek keresése</NavLink>
              </Button>
              <Button onClick={routeChangeSpec}>
                <NavLink>Szükségek specifikálása</NavLink>
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box >
    </>
  );
}
