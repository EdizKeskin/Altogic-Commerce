import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <div>
      <h1>Admin</h1>
      <Link to="/admin/orders">
        <Button colorScheme={"teal"}>Orders</Button>
      </Link>
      <Link to="/admin/products">
        <Button colorScheme={"teal"}>Products</Button>
      </Link>
    </div>
  );
}

export default Admin;
