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
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BtnCharityReg() {
  const navigate = useNavigate();

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

  const sendRegistration = () => {
    const data = {
      email: email,
      name: name,
      locality: city,
      phone: phonenumber,
      zipcode: parseInt(zipcode),
      address: address,
      latitude: latitude,
      longitude: longitude,
      password: password,
      roleId: 1,
    };
    axios
      .post(`http://localhost:8080/charity/create`, data)
      .then(function (response) {
        navigate('/')
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const sendRequest = async () => {
    await axios
      .post(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          address.split(" ")[2]
        }%20${address.split(" ")[0]}%20${
          address.split(" ")[1]
        }%20${city}%20ON&key=AIzaSyC3KGXEiZLRsUKSyIYho8duz62jjY2LZOs`
      )
      .then(function (response) {
        setLongitude(response.data.results[0].geometry.location.lat);
        setLatitude(response.data.results[0].geometry.location.lng);
        sendRegistration();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
              <Input
                value={email}
                onChange={handleChangeEmail}
                variant="filled"
                placeholder="E-mail cím"
              />
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
            <br />
            <FormControl>
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
            <br />
            <FormControl>
              <FormLabel color="gray">Név</FormLabel>
              <Input
                value={name}
                onChange={handleChangeName}
                variant="filled"
                placeholder="Charity neve"
              />
            </FormControl>
            <br />
            <Divider />
            <br />
            <FormControl>
              <FormLabel color="gray">Irányítószám</FormLabel>
              <NumberInput variant="filled">
                <NumberInputField
                  value={zipcode}
                  onChange={handleChangeZipcode}
                  placeholder="0000"
                />
              </NumberInput>
            </FormControl>

            <br />
            <FormControl>
              <FormLabel color="gray">Város</FormLabel>
              <Input
                value={city}
                onChange={handleChangeCity}
                variant="filled"
                placeholder="Város neve"
              />
            </FormControl>
            <br />
            
            <FormControl>
              <FormLabel color="gray">Cím</FormLabel>
              <Input
                value={address}
                onChange={handleChangeAddress}
                variant="filled"
                placeholder="Charity címe"
              />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel color="gray">
                Szélesség / Hosszúság / Térkép:{" "}
              </FormLabel>
              <Skeleton height="40px" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Mégse
            </Button>
            <Button variant="ghost" onClick={sendRequest}>Regisztrálás</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
