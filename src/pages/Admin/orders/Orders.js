import { useEffect, useState } from "react";
import {
  Text,
  Box,
  Button,
  useToast,
  Flex,
  AlertDescription,
  AlertIcon,
  Alert,
  Badge,
  MenuItem,
  MenuList,
  MenuButton,
  Menu,
  Stack,
  Container,
  Divider,
  useColorModeValue,
  useDisclosure,
  Collapse,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import CustomSpinner from "../../../components/Spinner";
import altogic from "../../../api/altogic";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../api/storage";
import { format } from "date-fns";
import { MdOutlineCancel, MdOutlineDoneAll } from "react-icons/md";
import { BsBagCheck } from "react-icons/bs";
import { TbTruckLoading } from "react-icons/tb";
import { AiOutlineCaretDown, AiOutlineHistory } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const Column = ({ title, data, badge, setOrderStatus, id }) => {
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
        <Menu>
          <MenuButton
            as={Button}
            textTransform={"capitalize"}
            rightIcon={<AiOutlineCaretDown />}
            variant={"ghost"}
          >
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
                  (data === "completed" && (
                    <FormattedMessage id="completed" />
                  )) ||
                  (data === "canceled" && <FormattedMessage id="canceled" />)}
                {(data === "pending" && (
                  <AiOutlineHistory size={20} style={{ strokeWidth: "25px" }} />
                )) ||
                  (data === "shipped" && <TbTruckLoading size={20} />) ||
                  (data === "completed" && <BsBagCheck size={20} />) ||
                  (data === "canceled" && <MdOutlineCancel size={20} />)}
              </Flex>
            </Badge>
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() =>
                setOrderStatus({
                  id: id,
                  status: "pending",
                })
              }
            >
              <Badge
                bg={"yellow.400"}
                color={"gray.800"}
                fontSize="sm"
                p="3px 10px"
                borderRadius="8px"
              >
                <Flex alignItems={"center"} gap={1}>
                  <FormattedMessage id="pending" />
                  <AiOutlineHistory size={20} style={{ strokeWidth: "25px" }} />
                </Flex>
              </Badge>
            </MenuItem>
            <MenuItem
              onClick={() =>
                setOrderStatus({
                  id: id,
                  status: "shipped",
                })
              }
            >
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
            <MenuItem
              onClick={() =>
                setOrderStatus({
                  id: id,
                  status: "completed",
                })
              }
            >
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
            <MenuItem
              onClick={() =>
                setOrderStatus({
                  id: id,
                  status: "canceled",
                })
              }
            >
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
      ) : (
        <Text color={"gray.300"}>{data}</Text>
      )}
    </Box>
  );
};

function Orders() {
  const [orders, setOrders] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();
  const intl = useIntl();

  useEffect(() => {
    const getProducts = async () => {
      const result = await altogic.db
        .model("order")
        .sort("createdAt", "desc")
        .get();

      if (!result.errors) {
        setOrders(result.data);
      }
    };
    getProducts();
  }, []);

  const setOrderStatus = async (id) => {
    const result = await altogic.endpoint.put(`/order/${id.id}`, {
      status: id.status,
    });

    if (!result.errors) {
      toast({
        title: intl.formatMessage({ id: "order_status_updated" }),
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      if (orders) {
        setOrders(
          orders.map((order) => {
            if (order._id === id.id) {
              order.status = id.status;
            }
            return order;
          })
        );
      }
    } else {
      toast({
        title: intl.formatMessage({ id: "order_status_update_failed" }),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (orders === null) {
    return <CustomSpinner />;
  }
  const filteredOrders = orders?.filter((order) => {
    if (filterStatus === "all") {
      return order;
    } else {
      return order.status === filterStatus;
    }
  });

  const filteredOrdersBySearch = filteredOrders?.filter((order) => {
    if (searchText === "") {
      return order;
    } else {
      return (
        order._id.toLowerCase().includes(searchText.toLowerCase()) ||
        order.name.toLowerCase().includes(searchText.toLowerCase()) ||
        order.email.toLowerCase().includes(searchText.toLowerCase()) ||
        order.userId.toLowerCase().includes(searchText.toLowerCase()) ||
        order.status.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  });
  console.log(filteredOrdersBySearch);

  return (
    <>
      <Container maxW={"7xl"} mt={10}>
        <Stack
          bg={"gray.800"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 12 }}
          borderRadius={"md"}
        >
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
              <InputGroup w={"fit-content"}>
                <InputLeftElement>
                  <FaSearch />
                </InputLeftElement>
                <Input
                  variant="filled"
                  placeholder={intl.formatMessage({ id: "search_order" })}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  bg={"gray.700"}
                  _hover={{ bg: "gray.700" }}
                  _focus={{ bg: "gray.700" }}
                  mr={4}
                />
              </InputGroup>
              <Menu>
                <MenuButton
                  as={Button}
                  textTransform={"capitalize"}
                  rightIcon={<AiOutlineCaretDown />}
                  bgColor={"gray.700"}
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
              filteredOrdersBySearch.map((order) => {
                return (
                  <Box key={order._id} w={"full"} p={10}>
                    <Flex
                      alignItems={"flex-start"}
                      flexWrap={"wrap"}
                      gap={2}
                      justifyContent={{
                        base: "flex-start",
                        md: "space-around",
                      }}
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
                        id={order._id}
                        setOrderStatus={setOrderStatus}
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
                      <Flex
                        gap={1}
                        justifyContent={"center"}
                        alignItems={"center"}
                        flexDirection={"column"}
                      >
                        <Link to={`/orders/${order._id}`}>
                          <Button>
                            <FormattedMessage id="view_order" />
                          </Button>
                        </Link>
                        <Button onClick={onToggle}>
                          <FormattedMessage id="address" />
                        </Button>
                      </Flex>
                    </Flex>
                    <Collapse in={isOpen} animateOpacity>
                      <Box
                        p="40px"
                        color="white"
                        bg="gray.700"
                        mt="4"
                        rounded="md"
                        shadow="md"
                      >
                        <Text>
                          <FormattedMessage id="country" />: {order.country}
                        </Text>
                        <Text>
                          <FormattedMessage id="city" />: {order.city}
                        </Text>
                        <Text>
                          <FormattedMessage id="address" />: {order.address}
                        </Text>
                      </Box>
                    </Collapse>
                  </Box>
                );
              })
            )}
          </Flex>
        </Stack>
      </Container>
    </>
  );
}

export default Orders;
