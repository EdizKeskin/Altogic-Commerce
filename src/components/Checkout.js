import React from "react";
import {
  Box,
  Button,
  Heading,
  Flex,
  Text,
  Image,
  Divider,
} from "@chakra-ui/react";
import Form3svg from "../assets/shop.svg";
import altogic from "../api/altogic";
import { useToast } from "@chakra-ui/react";
import { useBasket } from "../context/basketContext";
import { formatPrice } from "../api/storage";
import { Link } from "react-router-dom";
import CustomSpinner from "./Spinner";

export default function Checkout({
  onClose,
  price,
  products,
  loading,
  setLoading,
  stock,
  setStock,
}) {
  const toast = useToast();
  const { setItems, setNotification } = useBasket();
  console.log(products[0].stock);

  const createOrder = async (quantity) => {
    console.log(quantity);
    if (products.map((product) => stock < product.quantity).includes(true)) {
      toast({
        title: "Some of the products are out of stock.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      return;
    }
    setLoading(true);
    const userInfos = altogic.auth.getUser();
    if (
      !userInfos ||
      products.map((product) => stock < product.quantity).includes(true)
    ) {
      toast({
        title: "Error!",
        description: "Some of the products are out of stock.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      onClose();
      return;
    }
    const result = await altogic.db
      .model("order")
      .object()
      .create({
        email: userInfos.email,
        name: userInfos.name,
        address: userInfos.address.address,
        city: userInfos.address.city,
        country: userInfos.address.country,
        userId: userInfos._id,
        products: products.map((product) => {
          return {
            ...product,
            quantity: product.quantity,
            productId: product._id,
          };
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
      products.map(async (product) => {
        await altogic.db
          .model("products")
          .object(product._id)
          .update({
            stock: product.stock - product.quantity,
          });
        setStock(product.stock - product.quantity);
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
    setItems([]);
    setLoading(false);
    onClose();
  };

  return (
    <>
      {loading === true ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          rounded="lg"
          p={6}
          m="10px auto"
          height={"200px"}
        >
          <Text fontSize="xl" fontWeight="bold" textAlign={"center"}>
            Your order is being processing...
          </Text>
          <CustomSpinner />
        </Box>
      ) : (
        <Box rounded="lg" maxWidth={800} p={6} m="10px auto" as="form">
          <Heading w="100%" textAlign={"center"} fontWeight="normal">
            Ödeme Bilgileri (out of service in this page)
          </Heading>

          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection={"column"}
            mb={10}
          >
            <Image
              src={Form3svg}
              display={{ base: "block", md: "block" }}
              loading={"lazy"}
              boxSize={"50%"}
            />
          </Flex>

          <Flex flexDirection={"column"} alignItems={"center"}>
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
                      <div key={item._id}>
                        <Text
                          as={"span"}
                          fontSize={"sm"}
                          fontWeight={"normal"}
                          color={"gray.400"}
                          mr={"10px"}
                        >
                          {item.title} <br />x {item.quantity}
                        </Text>
                        <Divider />
                      </div>
                    ))
                  )}
                </Flex>
                <Text
                  as="h2"
                  fontSize={"3xl"}
                  fontWeight={"bold"}
                  textAlign={"right"}
                >
                  {formatPrice(price)}
                </Text>
              </Flex>
            </Flex>
            <Flex alignItems={"flex-end"} justifyContent={"flex-end"}>
              <Flex flexDirection={"column"} alignItems={"center"}>
                {altogic.auth.getUser().address === undefined ? (
                  <Link to={"/address"}>
                    <Text color={"red.300"} fontWeight={"hairline"} as={"u"}>
                      Please add your address from your profile before complete
                      your order.
                    </Text>
                  </Link>
                ) : (
                  <Text color={"green.300"} fontWeight={"hairline"}>
                    Your address is {altogic.auth.getUser().address.address}
                  </Text>
                )}
                <Link to={"/address"}></Link>
                <Button
                  w="7rem"
                  mt={2}
                  colorScheme="green"
                  variant="solid"
                  disabled={
                    altogic.auth.getUser().address === undefined ||
                    products
                      .map((product) => stock < product.quantity)
                      .includes(true)
                  }
                  onClick={() => {
                    createOrder();
                    !products ? console.log("test") : setItems([]);
                    setNotification(0);
                  }}
                >
                  Order
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
}
