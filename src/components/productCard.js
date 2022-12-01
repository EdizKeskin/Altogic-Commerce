import {
  Flex,
  Box,
  Badge,
  Icon,
  Tooltip,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useBasket } from "../context/basketContext";
import { BsFillBasketFill } from "react-icons/bs";

function ProductCard({ item }) {
  const { addToBasket, items,notification, setNotification } = useBasket();
  const toast = useToast();

  const findBasketItem = items.find(
    (basket_item) => basket_item.id === item.id
  );

  return (
    <Flex p={15}>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w="sm"
        mx="auto"
      >
        <Box
          bg="gray.300"
          h={64}
          w="full"
          rounded="lg"
          shadow="md"
          bgSize="cover"
          bgPos="center"
          backgroundImage={item.images[0]}
        ></Box>

        <Box
          w={"full"}
          bg="white"
          _dark={{
            background: ["rgba(26, 32, 44, 0.38)", "rgba(26, 32, 44, 0.38)"],
            borderRadius: ["16px", "16px"],
            boxShadow: [
              "0 4px 30px rgba(0, 0, 0, 0.1)",
              "0 4px 30px rgba(0, 0, 0, 0.1)",
            ],
            backdropFilter: ["blur(7.5px)", "blur(7.5px)"],
            WebkitBackdropFilter: ["blur(7.5px)", "blur(7.5px)"],
          }}
          mt={-10}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
        >
          <Text
            as={"h3"}
            py={2}
            textAlign="center"
            fontWeight="bold"
            textTransform="uppercase"
            color="gray.800"
            _dark={{
              color: "white",
            }}
            letterSpacing={1}
          >
            {item.title}
          </Text>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            py={2}
            px={3}
            bg="gray.200"
            _dark={{
              bg: "gray.700",
            }}
          >
            <Flex flexDirection="column">
              <Text
                fontWeight="bold"
                as="span"
                color="gray.800"
                _dark={{
                  color: "gray.200",
                }}
              >
                {item.price} ₺
              </Text>
              <Flex flexDirection={"row"} ml="-0.8">
                {item.categories.map((category, index) => (
                  <Link key={index} to={`/categories/${category}`}>
                    <Badge
                      colorScheme="teal"
                      mt={3}
                      width={"fit-content"}
                      px={"1"}
                      py={"0.5"}
                      borderRadius={"md"}
                      variant="solid"
                      mx="1"
                    >
                      {category}
                    </Badge>
                  </Link>
                ))}
              </Flex>
            </Flex>
            <Flex alignItems={"center"}>
              <Link to={`/${item.link}`}>
                <Tooltip
                  label="Product Page"
                  hasArrow
                  bg="gray.300"
                  color="black"
                  borderRadius={"md"}
                >
                  <Button
                    bg="gray.800"
                    fontSize="xs"
                    fontWeight="bold"
                    color="white"
                    px={2}
                    py={1}
                    rounded="lg"
                    mr={2}
                    _hover={{
                      bg: "gray.700",
                      _dark: {
                        bg: "gray.600",
                      },
                    }}
                    _focus={{
                      bg: "gray.700",
                      _dark: {
                        bg: "gray.600",
                      },
                      outline: "none",
                    }}
                  >
                    <Icon
                      as={FiShoppingCart}
                      h={5}
                      w={5}
                      alignSelf={"center"}
                    />
                  </Button>
                </Tooltip>
              </Link>
              <Tooltip
                label={findBasketItem ? "Remove from Basket" : "Add to Basket"}
                hasArrow
                bg="gray.300"
                color="black"
                borderRadius={"md"}
              >
                <Button
                  colorScheme={findBasketItem ? "red" : "green"}
                  fontSize="xs"
                  fontWeight="bold"
                  px={2}
                  py={1}
                  rounded="lg"
                  onClick={() => {
                    toast({
                      title: findBasketItem
                        ? "Removed from Basket"
                        : "Added to Basket",
                      status: findBasketItem ? "error" : "success",
                      duration: 2000,
                      isClosable: true,
                      position: "bottom-right",
                    });
                    findBasketItem && setNotification(notification - 1);
                    addToBasket(item, findBasketItem)}}
                >
                  {findBasketItem ? (
                    <Icon
                      as={IoMdRemoveCircleOutline}
                      h={5}
                      w={5}
                      alignSelf={"center"}
                    />
                  ) : (
                    <Icon
                      as={BsFillBasketFill}
                      h={5}
                      w={5}
                      alignSelf={"center"}
                    />
                  )}
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ProductCard;
