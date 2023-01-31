import React from "react";
import {
  Flex,
  Stack,
  SimpleGrid,
  Text,
  ButtonGroup,
  useColorModeValue,
  IconButton,
  Image,
  useToast,
  Box,
} from "@chakra-ui/react";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { useBasket } from "../context/basketContext";
import { Link } from "react-router-dom";
import { formatPrice } from "../api/storage";

function BasketTable({ products }) {
  const { removeFromBasket, setNotification, notification } = useBasket();

  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("white", "gray.800");
  return (
    <Flex>
      <Stack
        direction={{
          base: "column",
        }}
        bg={{
          md: bg,
        }}
        shadow="lg"
        mx={3}
        w="full"
        mt={10}
        rounded={"md"}
        border={{ base: "none", md: "1px solid" }}
      >
        {products.map((item) => {
          return (
            <Flex
              key={item._id}
              direction={{
                base: "row",
                md: "column",
              }}
              bg={bg2}
              py={3}
              rounded={"md"}
              border={{ base: "1px solid", md: "none" }}
            >
              <SimpleGrid
                spacingY={3}
                columns={{
                  base: 1,
                  md: 4,
                }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
                alignItems={"center"}
                justifyItems={"center"}
                textAlign={"center"}
              >
                <Link to={`/product/${item._id}`}>
                  <Image
                    src={item.images[0]}
                    objectFit="cover"
                    boxSize="90px"
                    loading={"lazy"}
                  />
                </Link>
                <Text as={"span"} fontSize={"xl"} fontWeight={"extrabold"}>
                  {item.title}
                </Text>
                <Box>
                  {item.discount !== 0 && item.discount && (
                    <Text
                      as="span"
                      color="gray.400"
                      fontWeight="hairline"
                      mr={2}
                      textDecoration={"line-through"}
                    >
                      {formatPrice(item.price)}
                    </Text>
                  )}
                  <Text as="span" fontSize={"xl"} fontWeight={"bold"}>
                    {formatPrice(item.discountedPrice)
                      ? formatPrice(item.discountedPrice)
                      : formatPrice(item.price)}{" "}
                    {item.quantity > 1 &&
                      `x ${item.quantity} = ${formatPrice(
                        item.discountedPrice
                          ? item.discountedPrice * item.quantity
                          : item.price * item.quantity
                      )}`}
                  </Text>
                </Box>
                <Flex
                  justify={{
                    md: "end",
                  }}
                >
                  <ButtonGroup variant="solid" size="sm">
                    <Link to={`/product/${item._id}`}>
                      <IconButton
                        colorScheme="blue"
                        icon={<BsBoxArrowUpRight />}
                        aria-label="Up"
                      />
                    </Link>
                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      icon={<BsFillTrashFill />}
                      aria-label="Delete"
                      onClick={() => {
                        toast({
                          title: "Ürün sepetten silindi.",
                          status: "error",
                          duration: 2000,
                          isClosable: true,
                          position: "bottom-right",
                        });
                        setNotification(notification - 1);
                        removeFromBasket(item._id);
                      }}
                    />
                  </ButtonGroup>
                </Flex>
              </SimpleGrid>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
}

export default BasketTable;
