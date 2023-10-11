import * as React from "react";
import {
  Stack,
  Button,
  SimpleGrid,
  Box,
  Text,
  Heading,
  Tooltip,
  Image,
} from "@chakra-ui/react";
import MenuNav from "./menuNav";

export default function AboutUs() {
  return (
    <>
      <MenuNav></MenuNav>
      <br />
      <SimpleGrid
        columns={2}
        spacing={10}
        minChildWidth="400px"
        spacingY="20px"
        px={30}
      >
        <Box maxW="32rem" fontFamily="Georgia">
          <Image
            src="https://www.jotform.com/blog/wp-content/uploads/2020/05/How-to-start-a-food-delivery-business.png"
            alt=""
          />
        </Box>
        <Box maxW="32rem" fontFamily="Georgia" mb={20}>
          <Heading mb={4}>Az ételmentők feladata</Heading>
          <Text fontSize="m">Az ételmentők küldetése, hogy egy platformon összehozza a vállalkozásokat és éttermeket azokkal, akiknek szükségük van ételre. Célunk az élelmiszerpazarlás csökkentése
          , miközben támogatjuk a segélyszervezeteket és a rászorulókat. Csatlakozz hozzánk és légy részese a változásnak!</Text>
        </Box>
      </SimpleGrid>
    </>
  );
}
