import { Box, Grid } from "@chakra-ui/react";
import Header from "../components/header";

import CustomSpinner from "../components/spinner";
import ProductCard from "../components/productCard";
import Footer from "../components/footer";
import React, {  } from "react";

function Home({ products }) {
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
