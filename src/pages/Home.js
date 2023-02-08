import {
  Box,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  InputLeftElement,
  InputGroup,
  Avatar,
  Text,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import Header from "../components/Header";
import CustomSpinner from "../components/Spinner";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import React, { useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { usePreferences } from "../context/preferencesContext";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useProduct } from "../context/productContext";
import { useIntl } from "react-intl";

function Home() {
  const intl = useIntl();
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const { animations } = usePreferences();
  const { products, loading } = useProduct();

  if (products === null || loading === true) return <CustomSpinner />;

  const decreasingByPrice = intl.formatMessage({ id: "decreasing_by_price" });
  const increasingByPrice = intl.formatMessage({ id: "increasing_by_price" });
  const newestProducts = intl.formatMessage({ id: "newest_products" });

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredProducts = products.filter((data) => {
    return (
      data.title.toLowerCase().includes(searchText.toLowerCase()) ||
      data.categories.some((category) =>
        category
          .toLowerCase()
          .includes(searchText.toLowerCase(searchText.toLowerCase()))
      )
    );
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sort === "price") {
      if (sortType === "desc") {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    } else {
      if (sortType === "desc") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    }
  });

  return (
    <Box minh="100vh">
      <div data-aos={animations === true ? "fade-up" : "none"}>
        <Header />
      </div>

      <Box display={"flex"} justifyContent={"flex-end"} px={15}>
        <Box
          mr={3}
          data-aos={animations === true ? "zoom-in-up" : "none"}
          zIndex={"3"}
        >
          <AutoComplete rollNavigation>
            <InputGroup w={"fit-content"}>
              <InputLeftElement>
                <FaSearch />
              </InputLeftElement>
              <AutoCompleteInput
                variant="filled"
                placeholder={intl.formatMessage({ id: "search" })}
                value={searchText}
                onChange={handleChange}
                bg={"gray.700"}
                _hover={{ bg: "gray.700" }}
                _focus={{ bg: "gray.700" }}
              />
            </InputGroup>
            <AutoCompleteList>
              {products.map((product, oid) => (
                <Link key={`option-${oid}`} to={`/product/${product._id}`}>
                  <AutoCompleteItem
                    value={product.title}
                    label={product.categories[0]}
                    textTransform="capitalize"
                    align="center"
                  >
                    <Avatar
                      size="sm"
                      name={product.title}
                      src={product.images[0]}
                    />
                    <Text ml="4">{product.title}</Text>
                  </AutoCompleteItem>
                </Link>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        </Box>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<AiOutlineCaretDown />}
            bg={"gray.700"}
            data-aos={animations === true ? "zoom-in-up" : "none"}
          >
            {sort === "price" && sortType === "desc" && decreasingByPrice}
            {sort === "price" && sortType === "asc" && increasingByPrice}
            {sort === "createdAt" && sortType === "desc" && newestProducts}
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                setSort("price");
                setSortType("desc");
              }}
            >
              {decreasingByPrice}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSort("price");
                setSortType("asc");
              }}
            >
              {increasingByPrice}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSort("createdAt");
                setSortType("desc");
              }}
            >
              {newestProducts}
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={6}
        mt={"4"}
      >
        {sortedProducts.map((data, i) => (
          <div key={i} data-aos={animations === true ? "zoom-in-up" : "none"}>
            <ProductCard item={data} />
          </div>
        ))}
      </Grid>
      <Footer />
    </Box>
  );
}

export default Home;
