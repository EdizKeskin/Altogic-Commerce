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
import { Link, useNavigate } from "react-router-dom";
import { useBasket } from "../context/basketContext";
import { BsFillBasketFill } from "react-icons/bs";
import { usePreferences } from "../context/preferencesContext";
import { formatPrice } from "../api/storage";

function ProductCard({ item }) {
  const { addToBasket, items, notification, setNotification } = useBasket();
  const { lang } = usePreferences();
  const toast = useToast();
  const Navigate = useNavigate();

  const addToBasketMessage = lang === "tr-TR" ? "Sepete Ekle" : "Add to Basket";
  const removeFromBasketMessage =
    lang === "tr-TR" ? "Sepete Çıkar" : "removeFromBaske";
  const productPageMessage = lang === "tr-TR" ? "Ürün Sayfası" : "Product Page";
  const adddedToBasketMessage =
    lang === "tr-TR" ? "Sepete Eklendi" : "Added to Basket";
  const removedFromBasketMessage =
    lang === "tr-TR" ? "Sepetten Çıkarıldı" : "Removed from Basket";

  const findBasketItem = items.find(
    (basket_item) => basket_item.id === item._id
  );

  return (
    <Flex p={15}>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w={{ base: "100%", sm: "sm" }}
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
          onClick={() => {
            Navigate(`/product/${item._id}`);
          }}
          _hover={{
            cursor: item.stock === 0 ? "not-allowed" : "pointer",
          }}
          loading="lazy"
          backgroundImage={item.images[0]}
        >
          {item.discount !== 0 && item.discount && item.stock !== 0 && (
            <Flex justifyContent="flex-end">
              <Badge
                backgroundColor="red.500"
                borderRadius="md"
                px="2"
                py="1"
                fontSize="sm"
                fontWeight="bold"
                ml="2"
              >
                {item.discount + "%"}
              </Badge>
            </Flex>
          )}
          {item.stock === 0 && (
            <Flex
              justifyContent="center"
              alignItems="center"
              w="full"
              h="full"
              bg="rgba(0,0,0,0.5)"
              rounded="lg"
              backdropFilter={"blur(7px)"}
            >
              <Text
                color="white"
                fontWeight="bold"
                fontSize="xl"
                textTransform="uppercase"
              >
                {lang === "tr-TR" ? "Stokta Yok" : "Out of Stock"}
              </Text>
            </Flex>
          )}
        </Box>
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
                <Text
                  fontWeight="bold"
                  as="span"
                  color="gray.800"
                  _dark={{
                    color: "gray.200",
                  }}
                >
                  {formatPrice(item.discountedPrice)
                    ? formatPrice(item.discountedPrice)
                    : formatPrice(item.price)}
                </Text>
              </Box>
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
              <Link to={`/product/${item._id}`}>
                <Tooltip
                  label={productPageMessage}
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
                label={
                  item.stock === 0
                    ? "Out of Stock"
                    : findBasketItem
                    ? removeFromBasketMessage
                    : addToBasketMessage
                }
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
                  disabled={item.stock === 0}
                  onClick={() => {
                    toast({
                      title: findBasketItem
                        ? removedFromBasketMessage
                        : adddedToBasketMessage,
                      status: findBasketItem ? "error" : "success",
                      duration: 2000,
                      isClosable: true,
                      position: "bottom-right",
                    });
                    findBasketItem && setNotification(notification - 1);
                    addToBasket(item, findBasketItem);
                  }}
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
