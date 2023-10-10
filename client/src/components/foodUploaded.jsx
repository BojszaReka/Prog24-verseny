import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Box } from "@chakra-ui/react";
import Simple from "./navBar";

const FoodCard = (props) => {
    const { Name, Type, isavailable } = props;
  
    return (
        <Card width="300px" variant={isavailable ? "filled" : "outline"}>
        <CardHeader>{Type} : {Name} </CardHeader>
        <CardBody>Allergének: </CardBody>
        <CardFooter>Lejárat : {isavailable ? "Elérhető" : "Nem elérhető"}</CardFooter>
      </Card>
    );
  };

export default function FoodUploaded() {


  return (
    <>
      <Simple></Simple>
      <br />
        <SimpleGrid minChildWidth='300px' spacing='25px'>
            <Box><FoodCard Name="ASD" Type="olasz" isavailable={true} ></FoodCard></Box>
            <Box><FoodCard Name="uristen" Type="kínai" isavailable={false}></FoodCard></Box>
            <Box><FoodCard Name="uristen" Type="maxikói" isavailable={true}></FoodCard></Box>
            <Box><FoodCard Name="uristen" Type="magyaros" isavailable={false}></FoodCard></Box>
        </SimpleGrid>
    </>
  );
}
