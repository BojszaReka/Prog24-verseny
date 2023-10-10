import React, { Component } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Tooltip,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  InputLeftAddon,
  Divider,
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";

export default function BtnCharityReg() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Tooltip label="Segélyszervezetek számára" fontSize="md">
        <Button
          onClick={onOpen}
          colorScheme="blue"
          variant="outline"
          width="50%"
        >
          Charity
        </Button>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Regisztrálás Charity-ként</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel color="gray">E-mail cím</FormLabel>
              <Input variant="filled" placeholder="E-mail cím" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="gray">Jelszó</FormLabel>
              <InputGroup>
                <Input
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
            <br />
            <FormControl>
              <FormLabel color="gray">Telefonszám</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+36" />
                <Input type="tel" variant="filled" placeholder="Telefonszám" />
                <InputRightElement pointerEvents="none">
                  <PhoneIcon color="grey" />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel color="gray">Név</FormLabel>
              <Input variant="filled" placeholder="Charity neve" />
            </FormControl>

            <Divider />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Mégse
            </Button>
            <Button variant="ghost">Regisztrálás</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
