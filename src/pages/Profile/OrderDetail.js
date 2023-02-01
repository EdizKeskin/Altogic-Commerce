import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatPrice, getOrderById } from "../../api/storage";
import CustomSpinner from "../../components/Spinner";

const Column = ({ title, data }) => {
  const textColor = useColorModeValue("gray.800", "white");
  return (
    <Box mr={4} display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Text
        color={textColor}
        fontSize={"lg"}
        fontWeight={700}
        mb={2}
        textTransform={"uppercase"}
      >
        {title}
      </Text>
      <Divider mb={4} />

      <Text color={"gray.300"}>{data}</Text>
    </Box>
  );
};

function OrderDetail({ products }) {
  const { order_id } = useParams();
  const [order, setOrder] = useState(null);
  const bg2 = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const getProduct = async () => {
      const result = await getOrderById(order_id);
      setOrder(result.data);
    };
    getProduct();
  }, [order_id]);
  if (products === null) return <CustomSpinner />;

  return (
    <Container maxW={"7xl"} mt={5}>
      <Stack
        bg={"gray.800"}
        spacing={{ base: 8, md: 10 }}
        py={3}
        direction={{ base: "column", md: "row" }}
        borderRadius={"md"}
      >
        <Flex flexDirection={"column"}>
          <Link to="/orders">
            <Button variant="link" color={"gray.300"} mb={4} pl={5}>
              Back to Orders
            </Button>
          </Link>

          <Text
            fontSize={"2xl"}
            fontWeight={700}
            textTransform={"uppercase"}
            pl={10}
            mb={3}
          >
            Order Detail
          </Text>
          <Divider mb={3} w={"full"} />
          {order === null ? (
            <CustomSpinner />
          ) : (
            <Box px={10} w={"100%"}>
              <Box display={"flex"}>
                <Box mr={5}>
                  <Box display={"flex"} alignItems={"center"}>
                    <Text fontSize={"lg"} fontWeight={"bold"} mb={2} mr={2}>
                      Order ID:
                    </Text>
                    <Text fontSize={"md"} color={"gray.300"} mb={2}>
                      #{order.orderNumber?.toString().padStart(6, 0)}
                    </Text>
                  </Box>

                  <Box display={"flex"} alignItems={"center"}>
                    <Text fontSize={"lg"} fontWeight={"bold"} mb={2} mr={2}>
                      Order Date:{" "}
                    </Text>
                    <Text fontSize={"md"} color={"gray.300"} mb={2}>
                      {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <Text fontSize={"lg"} fontWeight={"bold"} mb={2} mr={2}>
                      Order Status:
                    </Text>
                    <Badge
                      bg={
                        (order.status === "pending" && "yellow.400") ||
                        (order.status === "shipped" && "teal.400") ||
                        (order.status === "completed" && "green.400") ||
                        (order.status === "canceled" && "red.400")
                      }
                      color={"gray.800"}
                      fontSize="sm"
                      p="3px 10px"
                      borderRadius="8px"
                    >
                      {order.status}
                    </Badge>
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <Text fontSize={"lg"} fontWeight={"bold"} mb={2} mr={2}>
                      Order Total:
                    </Text>
                    <Text fontSize={"md"} color={"gray.300"} mb={2}>
                      {formatPrice(
                        order.products.reduce((acc, item) => {
                          return acc + item.price * item.quantity;
                        }, 0)
                      )}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Divider mb={3} />
              <Text fontSize={"lg"} fontWeight={"bold"} mb={2} mr={2}>
                Products:
              </Text>
              <Box>
                {order.products.map((item, i, row) => {
                  return (
                    <React.Fragment key={item._id}>
                      <Flex
                        direction={{
                          base: "row",
                          md: "column",
                        }}
                        bg={bg2}
                        py={3}
                        mb={3}
                        rounded={"md"}
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
                          <Link to={`/product/${item.productId}`}>
                            <Image
                              src={item.images[0]}
                              objectFit="cover"
                              boxSize="90px"
                              loading={"lazy"}
                            />
                          </Link>
                          
                          <Column title={"title"} data={item.title} />

                          <Column title={"quantity"} data={item.quantity} />

                          <Column
                            title={"price"}
                            data={formatPrice(item.price)}
                          />
                        </SimpleGrid>
                      </Flex>

                      {i + 1 !== row.length && <Divider mt={2} />}
                    </React.Fragment>
                  );
                })}
              </Box>
            </Box>
          )}
        </Flex>
      </Stack>
    </Container>
  );
}

export default OrderDetail;
