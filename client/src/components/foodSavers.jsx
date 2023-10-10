import React, { Component, useRef, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import MenuNav from "./menuNav";

export default function FoodSavers() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/loggedin";
    navigate(path);
  };

  return (
    <>
      <MenuNav></MenuNav>
      <br />
      <SimpleGrid
        columns={2}
        spacing={10}
        minChildWidth="400px"
        spacingY="20px"
      >
        <Box maxW="32rem" fontFamily="Georgia">
          <Heading mb={4}>Ételmetők</Heading>
          <Text fontSize="m">
            A környzettudatosság és körforgásos gazdasági szemlélet jegyében
          </Text>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>E-mail cím</FormLabel>
            <Input
              value={email}
              onChange={handleChangeEmail}
              variant="filled"
              placeholder="E-mail cím"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Jelszó</FormLabel>
            <InputGroup>
              <Input
                value={password}
                onChange={handleChangePassword}
                variant="filled"
                type={show ? "text" : "password"}
                placeholder="Jelszó"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Elrejt" : "Mutat"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="blue"
            variant="outline"
            margin="20px"
            onClick={routeChange}
          >
            Bejelentkezés
          </Button>
        </Box>
      </SimpleGrid>
    </>
  );
}