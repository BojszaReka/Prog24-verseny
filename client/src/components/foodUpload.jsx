import React, { Component } from "react";
import Simple from "./navBar";
import { Box, Text } from "@chakra-ui/react";
import BtnFoodUpload from "./modFoodUpload";

export default function FoodUpload() {
  return (
    <>
      <Simple />
      <Box p={4}>
        <BtnFoodUpload></BtnFoodUpload>
      </Box>
    </>
  );
}
