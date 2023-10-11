import React, { Component, useContext, useEffect } from "react";
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
import axios from "axios";
import AuthContext from "./AuthContext";
import moment from "moment";

export default function FoodUploaded() {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = React.useState([]);


  const getFoods = () => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}/food/get`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }).then(e => {
      console.log(e);
      setFoods(e.data);
    })
  }

  useEffect(() => {
    getFoods();
  }, [])

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
                {foods.map((food) => (
                  <Tr key={food.id} bgcolor={food.isavailable ? "#99bff0" : "white"}>
                    <Th>{food.name}</Th>
                    <Th>{food.type}</Th>
                    <Th>{food.kitchen}</Th>
                    <Th>{food.allergens && food.allergens.map(f => { return f.name + " " })}</Th>
                    <Th>
                      {food.istakeaway ? "Elvitelre" : "Helyben fogyasztható"}
                    </Th>
                    <Th>{moment(food.expiration_date).format('YYYY-MM-DD')}</Th>
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
