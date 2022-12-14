import { useEffect, useState, useMemo } from "react";
import altogic from "../../api/altogic";
import CustomSpinner from "../../components/spinner";
import { Box, Text } from "@chakra-ui/react";
import MaterialReactTable from "material-react-table";
import { createTheme, Divider, ThemeProvider, useTheme } from "@mui/material";

export const Example = () => {
  const [orders, setOrders] = useState(null);

  const userId = altogic.auth.getUser()._id;
  useEffect(() => {
    const userOrders = async () => {
      const result = await altogic.db.model("order").get();
      setOrders(result.data.filter((order) => order.userId === userId));
    };
    userOrders();
  }, [userId]);

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "fullName",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
    ],
    []
    //end
  );
  const globalTheme = useTheme();
  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark", //let's use the same dark/light mode as the global theme
          primary: globalTheme.palette.secondary, //swap in the secondary color as the primary for the table
          info: {
            main: "rgb(255,122,0)", //add in a custom color for the toolbar alert background stuff
          },
          background: {
            default:
              globalTheme.palette.mode === "light"
                ? "#1A202C" //random light yellow color for the background in light mode
                : "#1A202C", //pure black table in dark mode for fun
          },
          color: {
            default:
              globalTheme.palette.mode === "light"
                ? "#FFFFFF" //random light yellow color for the background in light mode
                : "#1A202C", //pure black table in dark mode for fun
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

  if (orders === null) return <CustomSpinner />;

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        columns={columns}
        data={orders}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={false}
        enableSorting={false}
        enableBottomToolbar={false}
        enableTopToolbar={false}
        muiTableBodyRowProps={{ hover: false }}
        renderDetailPanel={({ row }) => {
          console.log(row.original);
          return (
            <Box>
              <Text fontSize={"18px"}>
                <b>Order Details:</b>
              </Text>
              <br />
              <Text>Order ID: {row.original._id}</Text>
              <Text>Order Date: {row.original.createdAt}</Text>
              <br />
              <Text fontSize={"18px"}>
                <b>Products:</b>
              </Text>
              {row.original.products.map((product) => {
                return (
                  <Box key={product._id}>
                    <Text mt={"10px"}>Product Name: {product.title}</Text>
                    <Text mb={"10px"}>Product Price: {product.price}</Text>
                    <Divider />
                  </Box>
                );
              })}
            </Box>
          );
        }}
      />
    </ThemeProvider>
  );
};

export default Example;
