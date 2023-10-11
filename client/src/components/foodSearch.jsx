import React, { Component, useState } from "react";
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

export default function FoodSearch() {
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
                <Checkbox value="1">Allergen1</Checkbox>
                <Checkbox value="2">Allergn2</Checkbox>
                <Checkbox value="3">Allergen3</Checkbox>
              </Stack>
            </CheckboxGroup>
          </HStack>
        </Box>
        <Box px={7}>
          <Flex justifyContent={"space-between"}>
            <HStack>
              <Text>Ízlésvilág</Text>
              <Select placeholder="Select option" width="250px">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </HStack>
            <Box>
              <Button rightIcon={<SearchIcon />}>Keresés </Button>
            </Box>
          </Flex>
        </Box>
        <br /> <Divider/> <br />
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
