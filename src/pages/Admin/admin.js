import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      alignContent={"center"}
      flexDirection={"column"}
    >
      <Text fontSize="2xl" color={"white"} mt={10} mb={5}>
        Admin
      </Text>
      <ButtonGroup>
        <Link to="/admin/orders">
          <Button colorScheme={"teal"}>Orders</Button>
        </Link>
        <Link to="/admin/products">
          <Button colorScheme={"teal"}>Products</Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
}

export default Admin;
