import React, { useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputGroup,
  Textarea,
  Text,
  Image,
} from "@chakra-ui/react";
import Form1svg from "../images/join.svg";
import Form3svg from "../images/shop.svg";

import { useToast } from "@chakra-ui/react";

import { useBasket } from "../context/basketContext";

const Form1 = () => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Buy Now
      </Heading>
      <SimpleGrid columns={{ base: "1", md: "2" }} spacing={10}>
        <div>
          <Flex>
            <FormControl mr="5%">
              <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                First name
              </FormLabel>
              <Input id="first-name" placeholder="First name" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="last-name" fontWeight={"normal"}>
                Last name
              </FormLabel>
              <Input id="last-name" placeholder="First name" />
            </FormControl>
          </Flex>
          <FormControl mt="2%">
            <FormLabel htmlFor="email" fontWeight={"normal"} mt={"10"}>
              Email address
            </FormLabel>
            <Input id="email" type="email" />
          </FormControl>
        </div>
        <Image src={Form1svg} display={{ base: "none", md: "block" }} />
      </SimpleGrid>
    </>
  );
};

const Form2 = () => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Address
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          Country / Region
        </FormLabel>
        <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        >
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </Select>
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="street_address"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Street address
        </FormLabel>
        <Input
          type="text"
          name="street_address"
          id="street_address"
          autoComplete="street-address"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          City
        </FormLabel>
        <Input
          type="text"
          name="city"
          id="city"
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="state"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          State / Province
        </FormLabel>
        <Input
          type="text"
          name="state"
          id="state"
          autoComplete="state"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="postal_code"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          ZIP / Postal
        </FormLabel>
        <Input
          type="text"
          name="postal_code"
          id="postal_code"
          autoComplete="postal-code"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
    </>
  );
};

const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Ödeme Bilgileri
      </Heading>
      <SimpleGrid columns={{ base: "1", md: "2" }} spacing={10}>
        <SimpleGrid columns={1} spacing={6}>
          <FormControl as={GridItem} colSpan={[3, 1]}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}
            >
              Kart numarası
            </FormLabel>
            <InputGroup size="sm">
              <Input
                type="number"
                maxLength="16"
                minLength="16"
                placeholder="Card Number"
                focusBorderColor="brand.400"
                rounded="md"
              />
            </InputGroup>
          </FormControl>

          <FormControl mr="5%">
            <FormLabel fontWeight={"normal"}>Kart Üzerindeki İsim</FormLabel>
            <Input id="first-name" placeholder="Kart Üzerindeki İsim" />
          </FormControl>
          <Flex flexDirection={"row"}>
            <FormControl mr="2">
              <FormLabel fontWeight={"normal"}>MM/YY</FormLabel>
              <Input placeholder="MM/YY" w={"90px"} maxLength="4" />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight={"normal"}>Güvenlik kodu</FormLabel>
              <Input
                id="last-name"
                placeholder="CVV2"
                w={"90px"}
                maxLength="4"
              />
            </FormControl>
          </Flex>

          <FormControl mt={"-4"}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}
            >
              Satıcıya not
            </FormLabel>
            <Textarea
              placeholder="Lorem, ipsum dolor sit amet consectetur adipisicing."
              rows={3}
              shadow="sm"
              focusBorderColor="brand.400"
              fontSize={{
                sm: "sm",
              }}
            />
          </FormControl>
        </SimpleGrid>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection={"column"}
        >
          <Image src={Form3svg} display={{ base: "none", md: "block" }} />
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default function Multistep({ onClose, price, name, names }) {
  const toast = useToast();
  const { setItems } = useBasket();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  return (
    <>
      <Box rounded="lg" maxWidth={800} p={6} m="10px auto" as="form">
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
          colorScheme="teal"
          borderRadius={"md"}
        ></Progress>
        {step === 1 ? (
          <Form1 />
        ) : step === 2 ? (
          <Form2 />
        ) : (
          <Form3 price={price} />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between" alignItems={"flex-end"}>
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                  if (step === 1) {
                    onClose();
                  }
                }}
                colorScheme={step === 1 ? "red" : "gray"}
                variant="solid"
                w="7rem"
                mr="5%"
              >
                {step === 1 ? "İptal" : "Geri"}
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Flex flexDirection={"column"}>
                <Flex alignItems={"center"} mb={4}>
                  <Flex flexDirection={"column"}>
                    {!names ? (
                      <Text
                        as={"span"}
                        fontSize={"sm"}
                        fontWeight={"normal"}
                        color={"gray.400"}
                        mr={"10px"}
                      >
                        {name}
                      </Text>
                    ) : (
                      names.map((item) => (
                        <Text
                          key={item.id}
                          as={"span"}
                          fontSize={"sm"}
                          fontWeight={"normal"}
                          color={"gray.400"}
                          mr={"10px"}
                        >
                          {item.title}
                        </Text>
                      ))
                    )}
                  </Flex>
                  <Text
                    as="h2"
                    fontSize={"3xl"}
                    fontWeight={"bold"}
                    textAlign={"right"}
                  >
                    {price} ₺
                  </Text>
                </Flex>
                <Flex alignItems={"flex-end"} justifyContent={"flex-end"}>
                  <Button
                    w="7rem"
                    colorScheme="green"
                    variant="solid"
                    onClick={() => {
                      !names ? console.log("ok") : setItems([]);
                      onClose();
                      toast({
                        title: "Başarılı!",
                        description: "Siparişiniz alındı.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  >
                    Sipariş ver
                  </Button>
                </Flex>
              </Flex>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
