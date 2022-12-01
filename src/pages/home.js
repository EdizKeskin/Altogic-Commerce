import { useMemo } from "react";
import { Box, Grid } from "@chakra-ui/react";
import Header from "../components/header";

import axios from "axios";
import { useQuery } from "react-query";
import CustomSpinner from "../components/spinner";
import ProductCard from "../components/productCard";
import Footer from "../components/footer";

function Home() {
  const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;
  const PRODUCT_QUERY = useMemo(() => {
    return `
  {
    cards {
      price
      images
      id
      title
      link
      details
      desc
      shipDetails
      categories
    }
  }
`;
  }, []);

  const { data, isLoading, error } = useQuery("launches", async () => {
    const response = await axios({
      url: endpoint,
      method: "POST",
      data: {
        query: PRODUCT_QUERY,
      },
    });
    return response.data.data;
  });

  if (isLoading) return <CustomSpinner />;
  if (error) return <pre>{error.message}</pre>;

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
        {data.cards.map((user, index) => (
          <div key={index} data-aos="zoom-in-up">
            <ProductCard item={user} />
          </div>
        ))}
      </Grid>
      <Footer />
    </Box>
  );
}

export default Home;
