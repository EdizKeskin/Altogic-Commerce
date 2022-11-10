import { useMemo } from "react";
import { Box, Grid } from "@chakra-ui/react";
import Header from "../components/header";

import axios from "axios";
import { useQuery } from "react-query";
import CustomSpinner from "../components/spinner";
import ProductCard from "../components/newcard";

function Home() {
  const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;
  const MEMBER_QUERY = useMemo(() => {
    return `
  {
    cards {
      price
      images
      id
      tag
      title
      link
      details
      desc
      shipDetails
    }
  }
`;
  }, []);

  const { data, isLoading, error } = useQuery("launches", () => {
    return axios({
      url: endpoint,
      method: "POST",
      data: {
        query: MEMBER_QUERY,
      },
    }).then((response) => response.data.data);
  });

  if (isLoading) return <CustomSpinner />;
  if (error) return <pre>{error.message}</pre>;
  console.log(data);


  return (
    <Box minh="100vh">
      <div data-aos="fade-up">
        <Header />
      </div>
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
        mt={"16"}
      >
        {data.cards.map((user, index) => (
          <div key={index} data-aos="zoom-in-up">
            <ProductCard item={user}/>
          </div>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
