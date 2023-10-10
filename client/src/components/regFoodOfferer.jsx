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
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function BtnFoodOffererReg() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="Amennyiben mások számára van ételed" fontSize="md">
        <Button
          onClick={onOpen}
          colorScheme="blue"
          variant="outline"
          width="50%"
        >
          Ételfelajánló
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
          <ModalHeader>Regisztrálás ételfelajánlóként</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel>E-mail cím</FormLabel>
              <Input variant="filled" placeholder="E-mail cím" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Jelszó</FormLabel>
              <Input variant="filled" placeholder="Jelszó" />
            </FormControl>
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
