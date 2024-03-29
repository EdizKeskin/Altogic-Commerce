import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Grid,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import CustomSpinner from "../../components/Spinner";
import { usePreferences } from "../../context/preferencesContext";
import { useProduct } from "../../context/productContext";

function Categories() {
  const { category } = useParams();
  const { animations } = usePreferences();
  const { products } = useProduct();

  if (products === null) return <CustomSpinner />;

  const filteredProducts = products.filter((card) => {
    return card.categories.includes(category);
  });

  return (
    <Box minh="100vh">
      <div data-aos={animations === true ? "fade-up" : "none"}>
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
                <Button variant={"link"}>
                  <FormattedMessage id="home_btn" />
                </Button>
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
        {filteredProducts.map((user, index) => (
          <div
            key={index}
            data-aos={animations === true ? "zoom-in-up" : "none"}
          >
            <ProductCard item={user} />
          </div>
        ))}
      </Grid>
    </Box>
  );
}

export default Categories;
