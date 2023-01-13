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

  Text,
  Image,
} from "@chakra-ui/react";
import Form1svg from "../../images/join.svg";
import Form3svg from "../../images/shop.svg";

import altogic from "../../api/altogic";

import { useToast } from "@chakra-ui/react";

import { useBasket } from "../../context/basketContext";
import { useFormik } from "formik";
import validationSchema from "./validations";

export default function Multistep({ onClose, price, products }) {
  //Form1
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  //form2
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setFirstName(values.name);
      setLastName(values.lastName);
      setEmail(values.email);
      setAddress(values.address);
      setCity(values.city);
      setState(values.state);
    },
  });

  const toast = useToast();
  const { setItems, setNotification } = useBasket();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const createOrder = async () => {
    const result = await altogic.db
      .model("order")
      .object()
      .create({
        email: email,
        name: firstName,
        lastName: lastName,
        address: address,
        city: city,
        state: state,
        userId: altogic.auth.getUser()._id,
        products: products.map((product) => {
          return product;
        }),
      });

    if (!result.errors) {
      toast({
        title: "Başarılı!",
        description: "Siparişiniz alındı.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Hata!",
        description: "Siparişiniz alınamadı.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setEmail("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setState("");
    setItems([]);
  };

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
                    <Input
                      name="name"
                      autoFocus
                      color={"white"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      isInvalid={formik.touched.name && formik.errors.name}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="last-name" fontWeight={"normal"}>
                      Last name
                    </FormLabel>
                    <Input
                      name="lastName"
                      color={"white"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      isInvalid={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </FormControl>
                </Flex>
                <FormControl mt="2%">
                  <FormLabel htmlFor="email" fontWeight={"normal"} mt={"10"}>
                    Email address
                  </FormLabel>
                  <Input
                    name="email"
                    color={"white"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    isInvalid={formik.touched.email && formik.errors.email}
                  />
                </FormControl>
              </div>
              <Image src={Form1svg} display={{ base: "none", md: "block" }} />
            </SimpleGrid>
          </>
        ) : step === 2 ? (
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
                name="address"
                color={"white"}
                autoFocus
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                isInvalid={formik.touched.address && formik.errors.address}
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
                name="city"
                color={"white"}
                autoFocus
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                isInvalid={formik.touched.city && formik.errors.city}
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
                name="state"
                color={"white"}
                autoFocus
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
                isInvalid={formik.touched.state && formik.errors.state}
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
        ) : (
          <>
            <Heading w="100%" textAlign={"center"} fontWeight="normal">
              Ödeme Bilgileri (out of service in this page)
            </Heading>
            <SimpleGrid columns={{ base: "1", md: "2" }} spacing={10}>
              <Flex
                alignItems="center"
                justifyContent="center"
                flexDirection={"column"}
              >
                <Image src={Form3svg} display={{ base: "none", md: "block" }} />
              </Flex>
            </SimpleGrid>
          </>
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
                isDisabled={step === 3 || (step === 2 && !formik.isValid)}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                  if (step === 1) {
                    formik.handleSubmit();
                  }
                  if (step === 2) {
                    formik.handleSubmit();
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
                    {Array.isArray(products) === false ? (
                      <Text
                        as={"span"}
                        fontSize={"sm"}
                        fontWeight={"normal"}
                        color={"gray.400"}
                        mr={"10px"}
                      >
                        {products.title}
                      </Text>
                    ) : (
                      products.map((item) => (
                        <Text
                          key={item._id}
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
                      createOrder();
                      !products ? console.log("test") : setItems([]);
                      onClose();
                      setNotification(0);
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
