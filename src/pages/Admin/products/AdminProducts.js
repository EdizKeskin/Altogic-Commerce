import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Stack,
  Text,
  useColorModeValue,
  Divider,
  Image,
  IconButton,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  ButtonGroup,
  useToast,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import altogic from "../../../api/altogic";
import { formatPrice } from "../../../api/storage";
import CustomSpinner from "../../../components/Spinner";
import { useProduct } from "../../../context/productContext";

const Column = ({ title, data, image }) => {
  const textColor = useColorModeValue("gray.800", "white");
  return (
    <Box
      mr={4}
      display={"flex"}
      flexDirection={"column"}
      alignItems={{ base: "flex-start", md: "center" }}
    >
      <Text
        color={textColor}
        fontSize={"lg"}
        fontWeight={700}
        mb={2}
        textAlign={"center"}
        textTransform={"uppercase"}
      >
        {title}
      </Text>
      <Divider mb={4} />

      {image ? (
        <Image src={data} objectFit="cover" boxSize="90px" loading={"lazy"} />
      ) : (
        <Text color={"gray.300"} textAlign={"center"}>
          {data}
        </Text>
      )}
    </Box>
  );
};

function AdminProducts() {
  const { products, setProducts } = useProduct();
  const [searchText, setSearchText] = useState("");
  const intl = useIntl();
  const toast = useToast();

  const deleteProduct = async (id) => {
    await altogic.db.model("products").object(id).delete();
    setProducts(products.filter((product) => product._id !== id));
  };

  if (products === null) {
    return <CustomSpinner />;
  }

  const filteredProducts = products.filter((product) => {
    if (searchText === "") {
      return product;
    } else
      return (
        product.title.toLowerCase().includes(searchText.toLowerCase()) ||
        product.desc.toLowerCase().includes(searchText.toLowerCase())
      );
  });

  return (
    <Container maxW={"7xl"} mt={10}>
      <Stack
        bg={"gray.800"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 12 }}
        direction={{ base: "column", md: "row" }}
        borderRadius={"md"}
        mb={5}
      >
        <Flex flexDirection={"column"}>
          <Text
            fontSize={"2xl"}
            fontWeight={700}
            mb={2}
            textTransform={"uppercase"}
            pl={10}
          >
            <FormattedMessage id="products" />
          </Text>
          <Flex justifyContent={"flex-end"} mr={4}>
            <InputGroup w={"fit-content"}>
              <InputLeftElement>
                <FaSearch />
              </InputLeftElement>
              <Input
                variant="filled"
                placeholder={intl.formatMessage({ id: "search_product" })}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                bg={"gray.700"}
                _hover={{ bg: "gray.700" }}
                _focus={{ bg: "gray.700" }}
                mr={4}
              />
            </InputGroup>
            <Link to="/admin/products/new">
              <Button
                colorScheme={"blue"}
                bg={"blue.400"}
                _hover={{ bg: "blue.500" }}
                _focus={{ bg: "blue.500" }}
              >
                <FormattedMessage id="add_product" />
              </Button>
            </Link>
          </Flex>
          {products === null && filteredProducts === undefined ? (
            <CustomSpinner />
          ) : (
            filteredProducts.map((product) => {
              return (
                <Box key={product._id} w={"full"} p={10}>
                  <Flex
                    alignItems={"flex-start"}
                    gap={2}
                    justifyContent={{
                      base: "center",
                      md: "space-around",
                    }}
                  >
                    <Grid
                      flex={1}
                      templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(6, 1fr)",
                      }}
                      gap={{ base: 4, md: 2 }}
                    >
                      <Image
                        src={product.images[0]}
                        objectFit="cover"
                        loading={"lazy"}
                      />
                      <Column
                        title={intl.formatMessage({ id: "product_title" })}
                        data={product.title}
                      />
                      <Column
                        title={intl.formatMessage({ id: "price" })}
                        data={formatPrice(product.price)}
                      />
                      <Column
                        title={intl.formatMessage({ id: "stock" })}
                        data={formatPrice(product.stock)}
                      />
                      <Column
                        title={intl.formatMessage({ id: "created_at_short" })}
                        data={format(
                          new Date(product.createdAt),
                          "dd/MM/yyyy HH:mm"
                        )}
                      />
                      <Flex
                        gap={1}
                        justifyContent={"center"}
                        alignItems={"center"}
                        mt={{ base: 4, md: 0 }}
                      >
                        <Link to={`/admin/products/${product._id}`}>
                          <IconButton icon={<AiOutlineEdit size={20} />} />
                        </Link>

                        <Popover>
                          {({ onClose }) => (
                            <>
                              <PopoverTrigger>
                                <IconButton icon={<BsTrash size={20} />} />
                              </PopoverTrigger>
                              <Portal>
                                <PopoverContent>
                                  <PopoverArrow />
                                  <PopoverHeader>
                                    <FormattedMessage id="are_you_sure" />
                                  </PopoverHeader>
                                  <PopoverCloseButton />
                                  <PopoverBody>
                                    <Text mb={5}>
                                      <FormattedMessage id="delete_product_text" />
                                    </Text>
                                    <ButtonGroup mb={2}>
                                      <Button
                                        colorScheme="red"
                                        mr={2}
                                        onClick={() => {
                                          deleteProduct(product._id);
                                          onClose();
                                          toast({
                                            title: intl.formatMessage({
                                              id: "product_deleted",
                                            }),
                                            status: "success",
                                            duration: 9000,
                                            isClosable: true,
                                          });
                                        }}
                                      >
                                        Delete
                                      </Button>
                                      <Button
                                        variant={"outline"}
                                        onClick={onClose}
                                      >
                                        Cancel
                                      </Button>
                                    </ButtonGroup>
                                  </PopoverBody>
                                </PopoverContent>
                              </Portal>
                            </>
                          )}
                        </Popover>
                      </Flex>
                    </Grid>
                  </Flex>
                </Box>
              );
            })
          )}
        </Flex>
      </Stack>
    </Container>
  );
}

export default AdminProducts;
