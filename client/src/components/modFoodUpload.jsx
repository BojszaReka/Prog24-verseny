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

export default function BtnFoodUpload() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState("1");

  value = { email };
  onChange = { handleChangeEmail };

  const [foodtype, setFoodtype] = React.useState("");
  const handleChangeFoodtype = (event) => setFoodtype(event.target.value);

  //kieg!
  const [allergens, setAllergens] = React.useState("");
  const handleChangeAllergens = (event) => setAllergens(event.target.value);

  const [expiracy, setExpiracy] = React.useState("");
  const handleChangeExpiracy = (event) => setExpiracy(event.target.value);

  //kieg!
  const [eatenat, setEatenat] = React.useState("");
  const handleChangeEatenat = (event) => setEatenat(event.target.value);

  const [kitchentype, setKitchentype] = React.useState("");
  const handleChangeKitchentype = (event) => setKitchentype(event.target.value);

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
                  <FormLabel color="gray">Étel típusa</FormLabel>
                  <Select
                    value={foodtype}
                    onChange={handleChangeFoodtype}
                    id="foodType"
                    placeholder="Étel típusa"
                  >
                    <option value="1">Melegítendő</option>
                    <option value="2">Hideg</option>
                    <option value="3">Rövid lejáratú tejtermék</option>
                    <option value="4">Pékárú</option>
                  </Select>
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <FormControl>
                  <FormLabel color="gray">Allergének</FormLabel>
                  <Stack spacing={5} direction="row">
                    <Checkbox colorScheme="blue">Allergén1</Checkbox>
                    <Checkbox colorScheme="blue">Allergén2</Checkbox>
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
                      <Radio value="1">Helyben</Radio>
                      <Radio value="2">Elvitelre</Radio>
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
                    <option value="option1">Magyar</option>
                    <option value="option2">Olasz</option>
                    <option value="option3">Ázsiai</option>
                    <option value="option4">Mexikói</option>
                  </Select>
                </FormControl>
              </Box>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Mégse
            </Button>
            <Button variant="ghost">Mentés</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
