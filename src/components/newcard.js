import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Button,
  Center,
  Text,
  Stack,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

function ProductCard({ item }) {
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
          backgroundImage={item.image}
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
                {item.price.toFixed(2)} ₺
              </Text>
              <Flex flexDirection={"row"} ml="-0.8">
                {item.tag.map((tag, index) => (
                  <Badge
                    key={index}
                    colorScheme="teal"
                    mt={3}
                    width={"fit-content"}
                    px={"1"}
                    py={"0.5"}
                    borderRadius={"md"}
                    variant="solid"
                    mx="1"
                  >
                    {tag}
                  </Badge>
                ))}
              </Flex>
            </Flex>
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
                  <Icon as={FiShoppingCart} h={5} w={5} alignSelf={"center"} />
                </Button>
              </Tooltip>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ProductCard;
