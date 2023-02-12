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
  Alert,
  AlertIcon,
  AlertDescription,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import ProfileNav from "../../components/ProfileNav";
import { formatPrice } from "../../api/storage";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { AiOutlineCaretDown, AiOutlineHistory } from "react-icons/ai";
import { TbTruckLoading } from "react-icons/tb";
import { BsBagCheck } from "react-icons/bs";
import { MdOutlineCancel, MdOutlineDoneAll } from "react-icons/md";
import { FormattedMessage, useIntl } from "react-intl";

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
          <Flex alignItems={"center"} gap={1}>
            {(data === "pending" && <FormattedMessage id="pending" />) ||
              (data === "shipped" && <FormattedMessage id="shipped" />) ||
              (data === "completed" && <FormattedMessage id="completed" />) ||
              (data === "canceled" && <FormattedMessage id="canceled" />)}
            {(data === "pending" && (
              <AiOutlineHistory size={20} style={{ strokeWidth: "25px" }} />
            )) ||
              (data === "shipped" && <TbTruckLoading size={20} />) ||
              (data === "completed" && <BsBagCheck size={20} />) ||
              (data === "canceled" && <MdOutlineCancel size={20} />)}
          </Flex>
        </Badge>
      ) : (
        <Text color={"gray.300"}>{data}</Text>
      )}
    </Box>
  );
};

export const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const userId = altogic.auth.getUser()._id;
  const intl = useIntl();

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

  const filteredOrders = orders?.filter((order) => {
    if (filterStatus === "all") {
      return order;
    } else {
      return order.status === filterStatus;
    }
  });
  console.log(filteredOrders);

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
              <FormattedMessage id="orders" />
            </Text>
            <Flex justifyContent={"flex-end"} mr={4}>
              <Menu>
                <MenuButton
                  as={Button}
                  textTransform={"capitalize"}
                  rightIcon={<AiOutlineCaretDown />}
                >
                  <Badge
                    bg={
                      (filterStatus === "all" && "blue.400") ||
                      (filterStatus === "pending" && "yellow.400") ||
                      (filterStatus === "shipped" && "teal.400") ||
                      (filterStatus === "completed" && "green.400") ||
                      (filterStatus === "canceled" && "red.400")
                    }
                    color={"gray.800"}
                    fontSize="sm"
                    p="3px 10px"
                    borderRadius="8px"
                  >
                    <Flex alignItems={"center"} gap={1}>
                      {(filterStatus === "pending" && (
                        <FormattedMessage id="pending" />
                      )) ||
                        (filterStatus === "all" && (
                          <FormattedMessage id="all" />
                        )) ||
                        (filterStatus === "shipped" && (
                          <FormattedMessage id="shipped" />
                        )) ||
                        (filterStatus === "completed" && (
                          <FormattedMessage id="completed" />
                        )) ||
                        (filterStatus === "canceled" && (
                          <FormattedMessage id="canceled" />
                        ))}
                      {(filterStatus === "pending" && (
                        <AiOutlineHistory
                          size={20}
                          style={{ strokeWidth: "25px" }}
                        />
                      )) ||
                        (filterStatus === "shipped" && (
                          <TbTruckLoading size={20} />
                        )) ||
                        (filterStatus === "completed" && (
                          <BsBagCheck size={20} />
                        )) ||
                        (filterStatus === "canceled" && (
                          <MdOutlineCancel size={20} />
                        ))}
                    </Flex>
                  </Badge>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setFilterStatus("all")}>
                    <Badge
                      bg={"blue.400"}
                      color={"gray.800"}
                      fontSize="sm"
                      p="3px 10px"
                      borderRadius="8px"
                    >
                      <Flex alignItems={"center"} gap={1}>
                        <FormattedMessage id="all" />
                        <MdOutlineDoneAll size={20} />
                      </Flex>
                    </Badge>
                  </MenuItem>
                  <MenuItem onClick={() => setFilterStatus("pending")}>
                    <Badge
                      bg={"yellow.400"}
                      color={"gray.800"}
                      fontSize="sm"
                      p="3px 10px"
                      borderRadius="8px"
                    >
                      <Flex alignItems={"center"} gap={1}>
                        <FormattedMessage id="pending" />
                        <AiOutlineHistory
                          size={20}
                          style={{ strokeWidth: "25px" }}
                        />
                      </Flex>
                    </Badge>
                  </MenuItem>
                  <MenuItem onClick={() => setFilterStatus("shipped")}>
                    <Badge
                      bg={"teal.400"}
                      color={"gray.800"}
                      fontSize="sm"
                      p="3px 10px"
                      borderRadius="8px"
                    >
                      <Flex alignItems={"center"} gap={1}>
                        <FormattedMessage id="shipped" />
                        <TbTruckLoading size={20} />
                      </Flex>
                    </Badge>
                  </MenuItem>
                  <MenuItem onClick={() => setFilterStatus("completed")}>
                    <Badge
                      bg={"green.400"}
                      color={"gray.800"}
                      fontSize="sm"
                      p="3px 10px"
                      borderRadius="8px"
                    >
                      <Flex alignItems={"center"} gap={1}>
                        <FormattedMessage id="completed" />
                        <BsBagCheck size={20} />
                      </Flex>
                    </Badge>
                  </MenuItem>
                  <MenuItem onClick={() => setFilterStatus("canceled")}>
                    <Badge
                      bg={"red.400"}
                      color={"gray.800"}
                      fontSize="sm"
                      p="3px 10px"
                      borderRadius="8px"
                    >
                      <Flex alignItems={"center"} gap={1}>
                        <FormattedMessage id="canceled" />
                        <MdOutlineCancel size={20} />
                      </Flex>
                    </Badge>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            {orders?.length === 0 && (
              <Alert status="error" borderRadius={"md"}>
                <AlertIcon />
                <AlertDescription>
                  <FormattedMessage id="no_orders" />
                </AlertDescription>
              </Alert>
            )}
            {orders === null || filteredOrders === undefined ? (
              <CustomSpinner />
            ) : (
              filteredOrders.map((order) => {
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
                          title={intl.formatMessage({ id: "order_number" })}
                          data={`#${order.orderNumber
                            ?.toString()
                            .padStart(6, "0")}`}
                        />
                        <Column
                          title={intl.formatMessage({ id: "order_date" })}
                          data={format(
                            new Date(order.createdAt),
                            "dd/MM/yyyy HH:mm"
                          )}
                        />
                        <Column
                          title={intl.formatMessage({ id: "order_status" })}
                          data={order.status}
                          badge
                        />
                        <Column
                          title={intl.formatMessage({ id: "total_price" })}
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
                          <Button>
                            <FormattedMessage id="view_order" />
                          </Button>
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
