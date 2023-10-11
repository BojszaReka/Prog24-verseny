import React, { Component } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  SimpleGrid,
  Box,
  Center,
} from "@chakra-ui/react";
import Simple from "./navBar";

export default function FoodUploaded() {
  const Foods = [
    {
      name: "Név1",
      type: "hideg",
      expiration_date: "2023.10.10",
      istakeaway: false,
      isavailable: true,
      allergens: "nincs",
      kitchen: "ázsiai",
    },
    {
      name: "Név2",
      type: "meleg",
      expiration_date: "2023.10.10",
      istakeaway: true,
      isavailable: false,
      allergens: "nincs",
      kitchen: "magyar",
    },
  ];

  return (
    <>
      <Simple></Simple>
      <br />
      <SimpleGrid>
      <Box px={25}>
        <TableContainer >
          <Table>
            <Thead>
              <Tr bgcolor="#215aa3" >
                <Th color={"white"}>Név</Th>
                <Th color={"white"}>Étel típúsa</Th>
                <Th color={"white"}>Konyha típusa</Th>
                <Th color={"white"}>Allergének</Th>
                <Th color={"white"}>Fogyasztás helye</Th>
                <Th color={"white"}>Szavatosság</Th>
                <Th color={"white"}>Elérhető</Th>
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
                  <Th>{food.isavailable ? "Elérhető" : "Nem elérhető"}</Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      </SimpleGrid>
    </>
  );
}
