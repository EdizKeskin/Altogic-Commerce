import { forwardRef, useEffect, useState } from "react";
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
  Grid,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  TableCaption,
  Breadcrumb,
  BreadcrumbItem,
} from "@chakra-ui/react";
import CustomSpinner from "../../../components/Spinner";
import altogic from "../../../api/altogic";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import { formatPrice } from "../../../api/storage";
import { format } from "date-fns";
import { MdOutlineCancel, MdOutlineDoneAll } from "react-icons/md";
import { BsBagCheck } from "react-icons/bs";
import { TbTruckLoading } from "react-icons/tb";
import { AiOutlineCaretDown, AiOutlineHistory } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import Pagination from "@choc-ui/paginator";
import { useAuth } from "../../../context/authContext";

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

const OrderRow = ({ order, setOrderStatus }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { owner } = useAuth()
  const intl = useIntl();
  return (
    <Box key={order._id} w={"full"} p={10}>
      <Flex
        alignItems={"flex-start"}
        gap={2}
        justifyContent={{
          base: "center",
          md: "space-around",
        }}
      >
        <Grid
          flex={1}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(5, 1fr)",
          }}
          gap="2"
        >
          <Column
            title={intl.formatMessage({ id: "order_number" })}
            data={`#${order.orderNumber?.toString().padStart(6, "0")}`}
          />
          <Column
            title={intl.formatMessage({ id: "order_date" })}
            data={format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
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
                return acc + product.discountedPrice * product.quantity;
              }, 0)
            )}
          />
          <Flex
            gap={1}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Button onClick={onToggle}>
              <FormattedMessage id="expand" />
            </Button>
          </Flex>
        </Grid>
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
          <Box mb={4}>
            <Text>
              <b>
                <FormattedMessage id="order_id" />:
              </b>{" "}
              {order._id}
            </Text>
            <Text>
              <b>
                <FormattedMessage id="order_number" />:
              </b>{" "}
              {order.orderNumber}
            </Text>
            <Text>
              <b>
                <FormattedMessage id="order_date" />:
              </b>{" "}
              {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
            </Text>
          </Box>
          <Divider />
          <Box my={4}>
            <Text>
              <b>
                {" "}
                <FormattedMessage id="country" />:
              </b>{" "}
              {order.country}
            </Text>
            <Text>
              <b>
                <FormattedMessage id="city" />:
              </b>{" "}
              {order.city}
            </Text>
            <Text>
              <b>
                <FormattedMessage id="address" />:
              </b>{" "}
              {owner === true ? order.address : <FormattedMessage id="hidden_for_privacy" />}
            </Text>
          </Box>
          <Divider />
          <Box my={4}>
            <Text>
              <b>E-Mail:</b> {owner === true ? order.email : <FormattedMessage id="hidden_for_privacy" />}
            </Text>
            <Text>
              <b>
                <FormattedMessage id="name" />:
              </b>{" "}
              {order.name}
            </Text>
            <Text>
              <b>
                {" "}
                <FormattedMessage id="customer_note" />:
              </b>{" "}
              {order.note ? order.note : <FormattedMessage id="no_note" />}
            </Text>
          </Box>
          <Divider />
          <Box my={4} display={{ base: "none", md: "block" }}>
            <Text>
              <b>
                <FormattedMessage id="products" />:
              </b>
            </Text>
            <Table variant="simple">
              <TableCaption fontSize={"lg"}>
                <FormattedMessage id="total_price" /> :{" "}
                {formatPrice(
                  order.products.reduce((acc, product) => {
                    return acc + product.discountedPrice * product.quantity;
                  }, 0)
                )}
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>
                    <FormattedMessage id="product" />
                  </Th>
                  <Th>
                    <FormattedMessage id="product_title" />
                  </Th>
                  <Th>
                    <FormattedMessage id="quantity" />
                  </Th>
                  <Th>
                    <FormattedMessage id="price" />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {order.products.map((product) => {
                  return (
                    <Tr key={product._id}>
                      <Td>
                        <Link to={`/products/${product._id}`}>
                          <Image
                            src={product.images[0]}
                            objectFit="cover"
                            boxSize="90px"
                            loading={"lazy"}
                          />
                        </Link>
                      </Td>
                      <Td>
                        <Link to={`/products/${product._id}`}>
                          {product.title}
                        </Link>
                      </Td>
                      <Td>{product.quantity}</Td>
                      <Td>{formatPrice(product.discountedPrice)}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
          <Box my={4} display={{ base: "block", md: "none" }}>
            <Text>
              <b>
                <FormattedMessage id="products" />:
              </b>
            </Text>
            <Flex gap={8} flexWrap={"wrap"}>
              {order.products.map((product) => {
                return (
                  <Box key={product._id} my={2}>
                    <Link to={`/products/${product._id}`}>
                      <Image
                        src={product.images[0]}
                        objectFit="cover"
                        boxSize="90px"
                        loading={"lazy"}
                      />
                    </Link>
                    <Link to={`/products/${product._id}`}>{product.title}</Link>
                    <Text>
                      <FormattedMessage id="quantity" />: {product.quantity}
                    </Text>
                    <Text>
                      <FormattedMessage id="price" />:{" "}
                      {formatPrice(product.discountedPrice)}
                    </Text>
                  </Box>
                );
              })}
            </Flex>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

function Orders() {
  const [orders, setOrders] = useState(null);
  const { state } = useLocation();
  const [filterStatus, setFilterStatus] = useState(state ? state : "all");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const intl = useIntl();

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      const { data, errors } = await altogic.endpoint.get(
        `/order?size=${pageSize}&page=${page}&sort=createdAt:desc`
      );

      if (!errors) {
        setOrders(data.result);
        setCurrent(data.countInfo.currentPage);
        setTotalOrders(data.countInfo.count);
        setLoading(false);
      }
    };
    getProducts();
  }, [page, pageSize]);

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

  const Prev = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Prev
    </Button>
  ));
  const Next = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Next
    </Button>
  ));

  const itemRender = (_, type) => {
    if (type === "prev") {
      return Prev;
    }
    if (type === "next") {
      return Next;
    }
  };

  return (
    <>
      <Container maxW={"7xl"} mt={10} mb={5}>
        <Breadcrumb mt={{ base: 3, md: 0 }} spacing="6px" p="3">
          <BreadcrumbItem>
            <Link to="/admin">
              <Button variant={"link"} textTransform={"capitalize"}>
                Admin
              </Button>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={"/admin/products"}>
              <Button variant={"link"} textTransform={"capitalize"}>
                <FormattedMessage id="orders" />
              </Button>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Stack
          bg={"gray.800"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 12 }}
          borderRadius={"md"}
        >
          {loading ? (
            <CustomSpinner />
          ) : (
            <>
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
                <Flex justifyContent={"flex-end"} mx={4}>
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
                    <MenuList zIndex={"popover"}>
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
                <Flex m={6} zIndex={"docked"}>
                  <Pagination
                    current={current}
                    onChange={(page) => {
                      setPage(page);
                    }}
                    pageSize={pageSize}
                    total={totalOrders}
                    itemRender={itemRender}
                    paginationProps={{
                      display: "flex",
                      pos: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                    colorScheme="teal"
                    showSizeChanger
                    onShowSizeChange={(currentPage, pagesize) => {
                      setPageSize(pagesize);
                    }}
                  />
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
                ) : filteredOrdersBySearch?.length === 0 ? (
                  <Alert
                    status="error"
                    borderRadius={"md"}
                    my={10}
                    justifyContent={"center"}
                  >
                    <AlertIcon />
                    <AlertDescription>
                      <FormattedMessage id="no_orders_by_search" />
                    </AlertDescription>
                  </Alert>
                ) : (
                  filteredOrdersBySearch.map((order) => {
                    return (
                      <OrderRow
                        order={order}
                        key={order._id}
                        setOrderStatus={setOrderStatus}
                      />
                    );
                  })
                )}
              </Flex>
              <Flex pb={5} zIndex={"docked"}>
                <Pagination
                  current={current}
                  onChange={(page) => {
                    setPage(page);
                  }}
                  pageSize={pageSize}
                  total={totalOrders}
                  itemRender={itemRender}
                  paginationProps={{
                    display: "flex",
                    pos: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  colorScheme="teal"
                  showSizeChanger
                  pageSizeOptions={[10, 20, 30, 50]}
                  onShowSizeChange={(currentPage, pagesize) => {
                    setPageSize(pagesize);
                  }}
                />
              </Flex>
            </>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default Orders;
