import { useContext, useEffect, useMemo, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";
import Header from "../components/header";

import axios from "axios";
import { useQuery } from "react-query";
import CustomSpinner from "../components/spinner";
import ProductCard from "../components/productCard";
import Footer from "../components/footer";
import { AuthenticationContext } from "../context/authContext";

function Home({ products }) {
  const context = useContext(AuthenticationContext);
  const { isAuth } = context;
  console.log(isAuth);
  if (products === null) return <CustomSpinner />;

  return (
    <Box minh="100vh">
      <div data-aos="fade-up">
        <Header />
      </div>
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={6}
        mt={"16"}
      >
        {products.map((data, index) => (
          <div key={index} data-aos="zoom-in-up">
            <ProductCard item={data} />
          </div>
        ))}
      </Grid>
      <Footer />
    </Box>
  );
}

export default Home;
