import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import altogic from "../../../api/altogic";
import { formatPrice } from "../../../api/storage";
import CustomSpinner from "../../../components/Spinner";

function AdminProducts() {
  const [products, setProducts] = useState(null);

  const deleteProduct = async (id) => {
    const result = await altogic.db.model("products").object(id).delete();
    setProducts(products.filter((product) => product._id !== id));
    console.log(result);
  };

  useEffect(() => {
    const getProducts = async () => {
      const result = await altogic.db.model("products").get();

      if (!result.errors) {
        setProducts(result.data);
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

  const readableCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "title", //access nested data with dot notation
        header: "Title",
      },
      {
        accessorKey: "price",
        header: "Price",
        render: (price) => <p>{formatPrice(price)}</p>,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        render: (createdAt) => <p>{readableCreatedAt(createdAt)}</p>,
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
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteProduct(row.original._id);
                    Swal.fire(
                      "Deleted!",
                      "Your file has been deleted.",
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
        <Text fontSize="2xl" color={"white"}>
          Products
        </Text>
        <Box display={"flex"} alignItems="center">
          <Link to="/admin/products/newproduct">
            <Button colorScheme={"teal"} size="md" mr={2}>
              Add Product
            </Button>
          </Link>
          <Text fontSize="lg" color={"white"}>
            Total products: {products.length}
          </Text>
        </Box>
      </Box>
      <ThemeProvider theme={tableTheme}>
        {products != null && products.length > 0 && (
          <MaterialReactTable
            data={products}
            columns={columns}
            renderRowActions={(record) => (
              <>
                <Link to={`/admin/products/${record._id}`}>
                  <Button variant="link" color="white" fontSize="sm" mr="1">
                    Edit
                  </Button>
                </Link>
              </>
            )}
          />
        )}
      </ThemeProvider>
    </div>
  );
}

export default AdminProducts;
