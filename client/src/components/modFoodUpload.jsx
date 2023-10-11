import React, { Component, useContext, useEffect } from "react";
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
  Stack,
  SimpleGrid,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import AuthContext from "./AuthContext";
import moment from 'moment';

export default function BtnFoodUpload() {
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState("1");
  const [getKitchens, SetGetKitchens] = React.useState();

  const [name, setName] = React.useState("");
  const handleChangeName = (event) => setName(event.target.value);

  const [foodtype, setFoodtype] = React.useState("");
  const handleChangeFoodtype = (event) => setFoodtype(event.target.value);


  const [allergens, setAllergens] = React.useState([]);
  const handleChangeAllergens = (event) => {

    const newAllergane = [...allergens];
    const index = newAllergane.indexOf(event.target.value);
    if (index === -1) {
      newAllergane.push(event.target.value);
    } else {
      newAllergane.splice(index, 1);
    }
    setAllergens(newAllergane);
  }

  const [expiracy, setExpiracy] = React.useState("");
  const handleChangeExpiracy = (event) => setExpiracy(event.target.value);

  //kieg!
  const [eatenat, setEatenat] = React.useState(false);
  const handleChangeEatenat = (event) => {
    setEatenat(event.target.value == 1)
  };

  const [kitchentype, setKitchentype] = React.useState("");
  const handleChangeKitchentype = (event) => setKitchentype(event.target.value);

  const btnClick = () => {
    if (!name || !foodtype || !allergens || !expiracy || !kitchentype) {
      alert("Mindent töltsön ki!");
      return;
    }

    let allerg = allergens.map((a) => {
      return { name: a }
    });

    console.log(allerg);

    axios.post(`${import.meta.env.VITE_APP_API_URL}/food/create`, {
      name: name,
      type: foodtype,
      expiration_date: moment(expiracy, moment.ISO_8601),
      istakeway: eatenat,
      isavailable: true,
      food_offererId: user.id,
      kitchenId: 1,
      allergens: allerg
    });

    return;
  }
  const kitchens = () => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}/kitchen/get`).then(e => {
      SetGetKitchens(e.data)
    })
  }

  useEffect(() => {
    kitchens()
  })

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" variant="outline" width="50%">
        Étel feltöltése
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Új étel feltöltése</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <SimpleGrid columns={1} spacingX="40px" spacingY="20px">
              <Box>
                <FormControl>
                  <FormLabel color="gray">Név</FormLabel>
                  <Input
                    value={name}
                    onChange={handleChangeName}
                    variant="outline"
                    placeholder="Az étel neve"
                  />
                </FormControl>
                <br />
                <FormControl >
                  <FormLabel color="gray">Étel típusa</FormLabel>
                  <Select
                    value={foodtype}
                    onChange={handleChangeFoodtype}
                    id="foodType"
                    placeholder="Étel típusa"
                  >
                    <option value="Melegítendő">Melegítendő</option>
                    <option value="Hideg">Hideg</option>
                    <option value="Rövid">Rövid lejáratú tejtermék</option>
                    <option value="Pékárú">Pékárú</option>
                  </Select>
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <FormControl>
                  <FormLabel color="gray">Allergének</FormLabel>
                  <Stack spacing={5} direction="column" >
                    <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="mogyoró">Mogyoró</Checkbox>
                    <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="hal">Hal</Checkbox>
                    <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="laktóz">Laktóz</Checkbox>
                    <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="glutén">Glutén</Checkbox>
                    <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="szója">Szója</Checkbox>
                    <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="tojás">Tojás</Checkbox>
                    <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="cukorbetegség 1">Cukorbetegség 1</Checkbox>
                    <Checkbox onChange={handleChangeAllergens} colorScheme="blue" valsue="cukorbetegség 2">Cukorbetegség 2</Checkbox>
                  </Stack>
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <FormControl>
                  <FormLabel color="gray">Lejárati idő</FormLabel>
                  <Input
                    value={expiracy}
                    onChange={handleChangeExpiracy}
                    id="exprirationDate"
                    placeholder="Lejárati idő"
                    size="md"
                    type="datetime-local"
                  />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <FormControl>
                  <FormLabel color="gray">Fogyasztható</FormLabel>
                  <RadioGroup onChange={setValue} value={value} id="place">
                    <Stack direction="row">
                      <Radio onChange={handleChangeEatenat} value="0">Helyben</Radio>
                      <Radio onChange={handleChangeEatenat} value="1">Elvitelre</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <FormControl>
                  <FormLabel color="gray">Konyha jellege</FormLabel>
                  <Select
                    value={kitchentype}
                    onChange={handleChangeKitchentype}
                    id="kitchenType"
                    placeholder="Konyha jellege"
                  >
                    {
                      getKitchens && getKitchens.map(e => {
                        return (<option key={e.id} value={e.id}>{e.name}</option>)
                      })
                    }
                  </Select>
                </FormControl>
              </Box>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Mégse
            </Button>
            <Button variant="ghost" onClick={btnClick}>Mentés</Button>
          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  );
}
