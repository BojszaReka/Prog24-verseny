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
  NumberInput,
  NumberInputField,
  Skeleton,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";

export default function BtnFoodSaverReg() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = React.useState("");
  const handleChangeEmail = (event) => setEmail(event.target.value);

  const [password, setPassword] = React.useState("");
  const handleChangePassword = (event) => setPassword(event.target.value);

  const [phonenumber, setPhonenumber] = React.useState("");
  const handleChangePhonenumber = (event) => setPhonenumber(event.target.value);

  const [name, setName] = React.useState("");
  const handleChangeName = (event) => setName(event.target.value);

  const [birthyear, setBirthyear] = React.useState("");
  const handleChangeBirthyear = (event) => setBirthyear(event.target.value);

  //kieg!
  const [allergens, setAllergens] = React.useState("");
  const handleChangeAllergens = (event) => setAllergens(event.target.value);

  const [zipcode, setZipcode] = React.useState("");
  const handleChangeZipcode = (event) => setZipcode(event.target.value);

  const [city, setCity] = React.useState("");
  const handleChangeCity = (event) => setCity(event.target.value);

  const [longitude, setLongitude] = React.useState("");
  const handleChangeLongitude = (event) => setLongitude(event.target.value);

  const [latitude, setLatitude] = React.useState("");
  const handleChangeLatitude = (event) => setLatitude(event.target.value);

  const [address, setAddress] = React.useState("");
  const handleChangeAddress = (event) => setAddress(event.target.value);

  return (
    <>
      <Tooltip label="Ételre van szükséged" fontSize="md">
        <Button
          onClick={onOpen}
          colorScheme="blue"
          variant="outline"
          width="50%"
        >
          Ételmentő
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
          <ModalHeader>Regisztrálás ételmentőként</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel color="gray">Név</FormLabel>
              <Input
                value={name}
                onChange={handleChangeName}
                variant="filled"
                placeholder="Ételmentő neve"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="gray">Születési év</FormLabel>
              <NumberInput variant="filled">
                <NumberInputField
                  value={birthyear}
                  onChange={handleChangeBirthyear}
                  placeholder="2000"
                />
              </NumberInput>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="gray">Allergének</FormLabel>
              <Stack spacing={5} direction="row">
                <Checkbox colorScheme="blue" color="#4f5254">
                  Allergén1
                </Checkbox>
                <Checkbox colorScheme="blue" color="#4f5254">
                  Allergén2
                </Checkbox>
              </Stack>
            </FormControl>

            <Divider mt={4} />

            <FormControl mt={4}>
              <FormLabel color="gray">E-mail cím</FormLabel>
              <Input
                value={email}
                onChange={handleChangeEmail}
                variant="filled"
                placeholder="E-mail cím"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="gray">Telefonszám</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+36" />
                <Input
                  value={phonenumber}
                  onChange={handleChangePhonenumber}
                  type="tel"
                  variant="filled"
                  placeholder="Telefonszám"
                />
                <InputRightElement pointerEvents="none">
                  <PhoneIcon color="grey" />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="gray">Jelszó</FormLabel>
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

            <Divider mt={4} />

            <FormControl mt={4}>
              <FormLabel color="gray">Irányítószám</FormLabel>
              <NumberInput variant="filled">
                <NumberInputField
                  value={zipcode}
                  onChange={handleChangeZipcode}
                  placeholder="0000"
                />
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="gray">Város</FormLabel>
              <Input
                value={city}
                onChange={handleChangeCity}
                variant="filled"
                placeholder="Város neve"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="gray">Cím</FormLabel>
              <Input
                value={address}
                onChange={handleChangeAddress}
                variant="filled"
                placeholder="Ételmentő címe"
              />
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
