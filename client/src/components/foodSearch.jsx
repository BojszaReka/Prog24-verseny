import React, { Component, useContext, useEffect, useState } from "react";
import Simple from "./navBar";
import {
  SimpleGrid,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Text,
  HStack,
  CheckboxGroup,
  Checkbox,
  Stack,
  Select,
  Flex,
  Divider
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import AuthContext from "./AuthContext";

export default function FoodSearch() {
  const { user } = useContext(AuthContext);
  const [getKitchens, SetGetKitchens] = React.useState();
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
  const [distance, SetDistance] = React.useState(25);
  const handleChangeDistance = (event) => { SetDistance(event); }
  8
  const [kitchentype, setKitchentype] = React.useState("");
  const handleChangeKitchentype = (event) => setKitchentype(event.target.value);


  const kitchens = () => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}/kitchen/get`).then(e => {
      SetGetKitchens(e.data)
    })
  }

  const searchBtn = () => {

    axios.get(`${import.meta.env.VITE_APP_API_URL}/food/search?distance=${distance}&allergene=${allergens}&kitchentype=${kitchentype}&istakeway=false`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
    ).then((e) => {
      console.log(e)
    })
  }

  useEffect(() => {
    kitchens()
  })


  const Foods = [
    {
      name: "Név1",
      type: "hideg",
      expiration_date: "2023.10.10",
      istakeaway: false,
      isavailable: true,
      allergens: "nincs",
      kitchen: "ázsiai",
      distance: 10,
    },
  ];

  const [sliderValue, setSliderValue] = useState(50);

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <>
      <Simple></Simple>
      <br />

      <SimpleGrid px={10} spacingY="30px" >
        <Divider></Divider>
        <br />
        <Box px={30} >
          <HStack spacing={8}>
            <Text>Maximum távolság</Text>
            <Text>0</Text>{" "}
            <Slider
              width={"50%"}
              aria-label="slider-ex-1"
              defaultValue={30}
              max={150}
              onChange={handleChangeDistance}
            >
              <SliderMark value={25} {...labelStyles}>
                25
              </SliderMark>
              <SliderMark value={50} {...labelStyles}>
                50
              </SliderMark>
              <SliderMark value={75} {...labelStyles}>
                75
              </SliderMark>
              <SliderMark value={100} {...labelStyles}>
                100
              </SliderMark>
              <SliderMark value={125} {...labelStyles}>
                125
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>{" "}
            <Text>150</Text>
          </HStack>
          <br />
        </Box>
        <Box px={7}>
          <HStack spacing={8}>
            <Text>Allergének: </Text>
            <CheckboxGroup colorScheme="blue" defaultValue={["1", "3"]}>
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="mogyoró">Mogyoró</Checkbox>
                <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="hal">Hal</Checkbox>
                <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="laktóz">Laktóz</Checkbox>
                <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="glutén">Glutén</Checkbox>
                <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="szója">Szója</Checkbox>
                <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="tojás">Tojás</Checkbox>
                <Checkbox onChange={handleChangeAllergens} colorScheme="blue" value="cukorbetegség 1">Cukorbetegség 1</Checkbox>
                <Checkbox onChange={handleChangeAllergens} colorScheme="blue" valsue="cukorbetegség 2">Cukorbetegség 2</Checkbox>
              </Stack>
            </CheckboxGroup>
          </HStack>
        </Box>
        <Box px={7}>
          <Flex justifyContent={"space-between"}>
            <HStack>
              <Text>Ízlésvilág</Text>
              <Select onChange={handleChangeKitchentype} placeholder="Válaszz ízvilágot" width="250px">
                {
                  getKitchens && getKitchens.map(e => {
                    return (<option key={e.id} value={e.id}>{e.name}</option>)
                  })
                }
              </Select>
            </HStack>
            <Box>
              <Button onClick={searchBtn} rightIcon={<SearchIcon />}>Keresés </Button>
            </Box>
          </Flex>
        </Box>
        <br /> <Divider /> <br />
        <Box px={25}>
          <TableContainer>
            <Table>
              <Thead>
                <Tr bgcolor="#215aa3">
                  <Th color={"white"}>Név</Th>
                  <Th color={"white"}>Étel típúsa</Th>
                  <Th color={"white"}>Konyha típusa</Th>
                  <Th color={"white"}>Allergének</Th>
                  <Th color={"white"}>Fogyasztás helye</Th>
                  <Th color={"white"}>Szavatosság</Th>
                  <Th color={"white"}>Távolság</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {Foods.map((food) => (
                  <Tr bgcolor={food.isavailable ? "#99bff0" : "white"}>
                    <Th>{food.name}</Th>
                    <Th>{food.type}</Th>
                    <Th>{food.kitchen}</Th>
                    <Th>{food.allergens}</Th>
                    <Th>
                      {food.istakeaway ? "Elvitelre" : "Helyben fogyasztható"}
                    </Th>
                    <Th>{food.expiration_date}</Th>
                    <Th>{food.distance} km</Th>
                    <Th>
                      <Button size={"sm"} bgcolor="white" color="#215aa3">
                        Megtekint
                      </Button>
                    </Th>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box></Box>
      </SimpleGrid>
    </>
  );
}
