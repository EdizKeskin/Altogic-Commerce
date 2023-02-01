import { useEffect, useState } from "react";
import altogic from "../../api/altogic";
import CustomSpinner from "../../components/Spinner";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Stack,
  Text,
  useColorModeValue,
  Divider,
  Badge,
} from "@chakra-ui/react";

import ProfileNav from "../../components/ProfileNav";
import { formatPrice } from "../../api/storage";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Column = ({ title, data, badge }) => {
  const textColor = useColorModeValue("gray.800", "white");
  return (
    <Box
      mr={4}
      display={"flex"}
      flexDirection={"column"}
      alignItems={{ base: "flex-start", md: "center" }}
    >
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
      {badge ? (
        <Badge
          bg={
            (data === "pending" && "yellow.400") ||
            (data === "shipped" && "teal.400") ||
            (data === "completed" && "green.400") ||
            (data === "canceled" && "red.400")
          }
          color={"gray.800"}
          fontSize="sm"
          p="3px 10px"
          borderRadius="8px"
        >
          {data}
        </Badge>
      ) : (
        <Text color={"gray.300"}>{data}</Text>
      )}
    </Box>
  );
};

export const Orders = () => {
  const [orders, setOrders] = useState(null);
  const userId = altogic.auth.getUser()._id;
  useEffect(() => {
    const userOrders = async () => {
      const result = await altogic.db
        .model("order")
        .sort("createdAt", "desc")
        .get();
      setOrders(result.data.filter((order) => order.userId === userId));
    };
    userOrders();
  }, [userId]);

  return (
    <>
      <Container maxW={"7xl"} mt={10}>
        <Stack
          bg={"gray.800"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 12 }}
          direction={{ base: "column", md: "row" }}
          borderRadius={"md"}
        >
          <ProfileNav />
          <Flex flexDirection={"column"}>
            <Text
              fontSize={"2xl"}
              fontWeight={700}
              mb={2}
              textTransform={"uppercase"}
              pl={10}
            >
              Orders
            </Text>
            {orders === null ? (
              <CustomSpinner />
            ) : (
              orders.map((order) => {
                return (
                  <Box key={order._id} w={"full"} p={10}>
                    <Flex alignItems={"center"}>
                      <Grid
                        flex={1}
                        templateColumns={{
                          sm: "repeat(2, 1fr)",
                          md: "repeat(4, 1fr)",
                        }}
                        gap="2"
                        mr={10}
                      >
                        <Column
                          title="Order Id"
                          data={`#${order.orderNumber
                            ?.toString()
                            .padStart(6, "0")}`}
                        />
                        <Column
                          title="Order Date"
                          data={format(
                            new Date(order.createdAt),
                            "dd/MM/yyyy HH:mm"
                          )}
                        />
                        <Column title="Status" data={order.status} badge />
                        <Column
                          title="Total"
                          data={formatPrice(
                            order.products.reduce((acc, product) => {
                              return (
                                acc + product.discountedPrice * product.quantity
                              );
                            }, 0)
                          )}
                        />
                      </Grid>
                      <Flex
                        gap={1}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Link to={`/orders/${order._id}`}>
                          <Button>View Order</Button>
                        </Link>
                      </Flex>
                    </Flex>
                  </Box>
                );
              })
            )}
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default Orders;
