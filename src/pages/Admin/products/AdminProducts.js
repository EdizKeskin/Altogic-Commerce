import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { format } from "date-fns";
import MaterialReactTable from "material-react-table";
import { useMemo } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import altogic from "../../../api/altogic";
import { formatPrice } from "../../../api/storage";
import CustomSpinner from "../../../components/Spinner";
import { useProduct } from "../../../context/productContext";

function AdminProducts() {
  const { products, setProducts } = useProduct();
  const intl = useIntl();

  const deleteProduct = async (id) => {
    await altogic.db.model("products").object(id).delete();
    setProducts(products.filter((product) => product._id !== id));
  };

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

  const columns = useMemo(
    () => [
      {
        accessorKey: "title", //access nested data with dot notation
        header: intl.formatMessage({ id: "product_title" }),
      },
      {
        accessorKey: "price",
        header: intl.formatMessage({ id: "price" }),
        render: (price) => <p>{formatPrice(price)}</p>,
      },
      {
        accessorKey: "stock",
        header: intl.formatMessage({ id: "stock" }),
      },
      {
        accessorKey: "createdAt",
        header: intl.formatMessage({ id: "created_at" }),
        Cell: ({ row }) => (
          <p>{format(new Date(row.original.createdAt), "dd/MM/yyyy HH:mm")}</p>
        ),
      },
      {
        accessorKey: "action",
        header: "Action",
        Cell: ({ row }) => (
          <>
            <Link to={`/admin/products/${row.original._id}`}>
              <Button
                color="black"
                backgroundColor={"#81E6D9"}
                padding={"0.25rem"}
                borderRadius={"0.375rem"}
                marginRight={"5px"}
              >
                <Icon
                  as={FaExternalLinkAlt}
                  h={"1.25rem"}
                  w={"1.25rem"}
                  alignSelf={"center"}
                />
              </Button>
            </Link>

            <Button
              color={"black"}
              backgroundColor={"#F56565"}
              padding={"0.25rem"}
              borderRadius={"0.375rem"}
              variant="link"
              onClick={() => {
                Swal.fire({
                  title: intl.formatMessage({ id: "are_you_sure" }),
                  text: intl.formatMessage({ id: "delete_product_text" }),
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteProduct(row.original._id);
                    Swal.fire(
                      intl.formatMessage({ id: "deleted" }),
                      intl.formatMessage({ id: "product_deleted" }),
                      "success"
                    );
                  }
                });
              }}
            >
              <Icon
                as={BsFillTrashFill}
                h={"1.25rem"}
                w={"1.25rem"}
                alignSelf={"center"}
              />
            </Button>
          </>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products]
  );

  if (products === null) {
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
              <Link to={`/admin/products`}>
                <Button variant={"link"} textTransform={"capitalize"}>
                  <FormattedMessage id="products" />
                </Button>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box
          display={"flex"}
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          gap={3}
        >
          <Text fontSize="lg" color={"white"}>
            <FormattedMessage id="total_products" />: {products.length}
          </Text>
          <Link to="/admin/products/newproduct">
            <Button colorScheme={"teal"} variant={"outline"}>
              <FormattedMessage id="add_product" />
            </Button>
          </Link>
        </Box>
      </Box>
      <ThemeProvider theme={tableTheme}>
        {products != null && products.length > 0 && (
          <MaterialReactTable data={products} columns={columns} />
        )}
      </ThemeProvider>
    </div>
  );
}

export default AdminProducts;
