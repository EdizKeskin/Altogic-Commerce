import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Grid,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useMemo } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/productCard";
import CustomSpinner from "../components/spinner";

function Categories() {
  const { category } = useParams();


  const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;
  const PRODUCT_QUERY = useMemo(() => {
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

  const products = data.cards.filter((item) => item.tag[0] === category);

  console.log(products);

  return (
    <Box minh="100vh">
      <div data-aos="fade-up">
        <Box
          justifyContent="center"
          alignItems={"flex-start"}
          display="flex"
          py={10}
          px={10}
          flexDirection="column"
        >
          <Breadcrumb
            mt={{ base: 3, md: 0 }}
            spacing="4px"
            mb={4}
            separator={<AiOutlineRight color="gray.500" />}
          >
            <BreadcrumbItem>
              <Link to="/">
                <Button variant={"link"}>Home</Button>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to={`/categories/${category}`}>
                <Button variant={"link"} textTransform={"capitalize"}>
                  {category}
                </Button>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
      </div>
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
        mt={"5"}
      >
        {products.map((user, index) => (
          <div key={index} data-aos="zoom-in-up">
            <ProductCard item={user} />
          </div>
        ))}
      </Grid>
    </Box>
  );
}

export default Categories;
