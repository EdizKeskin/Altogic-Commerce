import { useEffect, useMemo, useState } from "react";
import {
  Text,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CustomSpinner from "../../../components/Spinner";
import altogic from "../../../api/altogic";
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider, useTheme, Divider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatPrice } from "../../../api/storage";
import { AiOutlineRight } from "react-icons/ai";
import { format } from "date-fns";

function Orders() {
  const [orders, setOrders] = useState(null);
  const toast = useToast();

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
  const globalTheme = useTheme();
  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: globalTheme.palette.mode, //let's use the same dark/light mode as the global theme
          primary: globalTheme.palette.secondary, //swap in the secondary color as the primary for the table
          info: {
            main: "rgb(255,122,0)", //add in a custom color for the toolbar alert background stuff
          },
          background: {
            default:
              globalTheme.palette.mode === "light"
                ? "rgb(254,255,244)" //random light yellow color for the background in light mode
                : "#000", //pure black table in dark mode for fun
          },
        },
        typography: {
          button: {
            textTransform: "none", //customize typography styles for all buttons in table by default
            fontSize: "1.2rem",
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                margin: "20px",
              },
            },
          },

          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: "1.1rem", //override to make tooltip font size larger
              },
            },
          },
          MuiSwitch: {
            styleOverrides: {
              thumb: {
                color: "pink", //change the color of the switch thumb in the columns show/hide menu to pink
              },
            },
          },
        },
      }),
    [globalTheme]
  );

  const setOrderStatus = async (id) => {
    const result = await altogic.endpoint.put(`/order/${id.id}`, {
      status: id.status,
    });

    if (!result.errors) {
      toast({
        title: "Order status updated",
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
        title: "Error updating order status",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "email", //access nested data with dot notation
        header: "Title",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        Cell: ({ row }) => (
          <p>{format(new Date(row.original.createdAt), "dd/MM/yyyy HH:mm")}</p>
        ),
      },
      {
        accessorKey: "action",
        header: "Action",
        Cell: ({ row }) => (
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Status</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={row.original.status}
              label="Status"
            >
              <MenuItem
                value={"pending"}
                onClick={() =>
                  setOrderStatus({
                    id: row.original._id,
                    status: "pending",
                  })
                }
                disabled={row.original.status === "pending"}
              >
                Pending
              </MenuItem>
              <MenuItem
                value={"shipped"}
                onClick={() =>
                  setOrderStatus({
                    id: row.original._id,
                    status: "shipped",
                  })
                }
                disabled={row.original.status === "shipped"}
              >
                Shipped
              </MenuItem>
              <MenuItem
                value={"completed"}
                onClick={() =>
                  setOrderStatus({
                    id: row.original._id,
                    status: "completed",
                  })
                }
                disabled={row.original.status === "completed"}
              >
                Completed
              </MenuItem>
              <MenuItem
                value={"canceled"}
                onClick={() =>
                  setOrderStatus({
                    id: row.original._id,
                    status: "canceled",
                  })
                }
                disabled={row.original.status === "canceled"}
              >
                Canceled
              </MenuItem>
            </Select>
          </FormControl>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (orders === null) {
    return <CustomSpinner />;
  }

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        mx={"20px"}
        mt={"20px"}
      >
        <Box
          justifyContent="center"
          alignItems={"flex-start"}
          display="flex"
          flexDirection="column"
        >
          <Breadcrumb
            mt={{ base: 3, md: 0 }}
            spacing="4px"
            mb={4}
            separator={<AiOutlineRight color="gray.500" />}
          >
            <BreadcrumbItem>
              <Link to="/admin">
                <Button variant={"link"}>Admin</Button>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to={`/admin/orders`}>
                <Button variant={"link"} textTransform={"capitalize"}>
                  Orders
                </Button>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box display={"flex"} alignItems="center">
          <Text fontSize="lg" color={"white"}>
            Total orders: {orders.length}
          </Text>
        </Box>
      </Box>
      <ThemeProvider theme={tableTheme}>
        {orders != null && orders.length > 0 && (
          <MaterialReactTable
            data={orders}
            columns={columns}
            renderDetailPanel={({ row }) => {
              return (
                <Box>
                  <Text fontSize={"18px"}>
                    <b>Order Details:</b>
                  </Text>
                  <br />
                  <Text>
                    <b>Order ID:</b> {row.original._id}
                  </Text>
                  <Text>
                    <b>Order Number:</b> {row.original.orderNumber}
                  </Text>
                  <Text>
                    <b>Address:</b> {row.original.address}
                  </Text>
                  <Text>
                    <b>Country:</b> {row.original.country}
                  </Text>
                  <Text>
                    <b>City:</b> {row.original.city}
                  </Text>
                  <Text>
                    <b>Order Date:</b>{" "}
                    {format(
                      new Date(row.original.createdAt),
                      "dd/MM/yyyy HH:mm"
                    )}
                  </Text>
                  <br />
                  <Text fontSize={"18px"}>
                    <b>Products:</b>
                  </Text>
                  {row.original.products.map((product) => {
                    return (
                      <Box key={product._id}>
                        <Text mt={"10px"}>
                          <b>Product Name:</b> {product.title}
                        </Text>
                        <Text>
                          <b>Quantity</b> {product.quantity}
                        </Text>
                        <Text mb={"10px"}>
                          <b>Product Price:</b> {formatPrice(product.price)}{" "}
                          {product.quantity > 1
                            ? `x${product.quantity} = ${formatPrice(
                                product.discountedPrice * product.quantity
                              )}`
                            : ""}
                        </Text>
                        <Divider />
                      </Box>
                    );
                  })}
                  <Text fontSize={"18px"}>
                    <b>Total Price:</b>{" "}
                    {formatPrice(
                      row.original.products.reduce(
                        (acc, product) =>
                          acc + product.price * product.quantity,
                        0
                      )
                    )}
                  </Text>
                </Box>
              );
            }}
          />
        )}
      </ThemeProvider>
    </div>
  );
}

export default Orders;
