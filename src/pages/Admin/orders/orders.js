import { useEffect, useMemo, useState } from "react";
import { Text, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CustomSpinner from "../../../components/spinner";
import altogic from "../../../api/altogic";
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";

function Orders() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      const result = await altogic.db.model("order").get();

      if (!result.errors) {
        setOrders(result.data);
      }
    };
    getProducts();
  }, [orders]);
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
        accessorKey: "email", //access nested data with dot notation
        header: "Title",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        render: (createdAt) => <p>{readableCreatedAt(createdAt)}</p>,
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
        <Text fontSize="2xl" color={"white"}>
        Orders
        </Text>
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
            renderRowActions={(record) => (
              <>
                <Link to={`/admin/orders/${record._id}`}>
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

export default Orders;
