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
} from "@chakra-ui/react";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { useBasket } from "../context/basketContext";
import { Link } from "react-router-dom";

function BasketTable() {
  const { items, removeFromBasket, setNotification, notification } = useBasket();
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
      >
        {items.map((item) => {
          return (
            <Flex
              key={item.id}
              direction={{
                base: "row",
                md: "column",
              }}
              bg={bg2}
              py={3}
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
              >
                <Link to={`/${item.link}`}>
                  <Image
                    src={item.images[0]}
                    objectFit="cover"
                    boxSize="90px"
                  />
                </Link>
                <Text as={"span"} fontSize={"2xl"} fontWeight={"extrabold"}>
                  {item.title}
                </Text>
                <Text as="span" fontSize={"xl"} fontWeight={"bold"}>
                  {item.price} ₺
                </Text>
                <Flex
                  justify={{
                    md: "end",
                  }}
                >
                  <ButtonGroup variant="solid" size="sm">
                    <Link to={`/${item.link}`}>
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
                        removeFromBasket(item.id);
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
