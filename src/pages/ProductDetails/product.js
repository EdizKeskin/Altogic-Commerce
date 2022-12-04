import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  useColorModeValue,
  ListItem,
  Accordion,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  Breadcrumb,
  BreadcrumbItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";
import { BsFillBasketFill } from "react-icons/bs";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import CustomSpinner from "../../components/spinner";
import { motion } from "framer-motion";
import Multistep from "../../components/multistep/multiStep";
import Coursel from "../../components/coursel";
//import basketContext from "../context/basketContext";
import { useBasket } from "../../context/basketContext";

function Product({products}) {
  const { addToBasket, items } = useBasket();

  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = useColorModeValue("black", "white");
  const titleColor = useColorModeValue("yellow.500", "yellow.300");
  const btnBg = useColorModeValue("gray.900", "gray.50");
  const btnColor = useColorModeValue("white", "gray.900");

  if (products === null ) return <CustomSpinner />;


  const product = products.find((item) => item.link === id);
  const right = product.details.slice(0, 3);
  const left = product.details.slice(3, 6);

  const photos = product.images.map((url) => ({ image: url }));

  const findBasketItem = items.find(
    (basket_item) => basket_item._id === product._id
  );

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 20 }}
      >
        {/* // ? Sorun çıkarsa Box yerine Flex kullan ve Breadcrumb'ı kaldır */}
        <Box data-aos="fade-down">
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
              <Link to={`/categories/${product.categories[0]}`}>
                <Button variant={"link"} textTransform={"capitalize"}>{product.categories[0]}</Button>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <Button variant={"link"}>{product.title}</Button>
            </BreadcrumbItem>
          </Breadcrumb>

          {photos.length > 1 ? (
            <Coursel images={photos} />
          ) : (
            <Image
              rounded={"md"}
              alt={"user image"}
              src={product.images[0]}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          )}
        </Box>
        <Stack
          spacing={{ base: 6, md: 10 }}
          data-aos="fade-up"
          backdropFilter={"blur(4px)"}
        >
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              color={textColor}
            >
              {product.title}
            </Heading>
            <Text color={"gray.400"} fontSize={"2xl"}>
              {product.price} ₺
            </Text>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={"gray.600"} />}
          >
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={titleColor}
                fontWeight={"500"}
                mb={"4"}
              ></Text>
              <Text fontSize={"lg"} color={"gray.400"} fontWeight={"300"}>
                {product.desc}
              </Text>
            </Box>
          </Stack>
          <Stack>
            <Accordion allowToggle>
              <Tabs>
                <TabList>
                  <Tab>
                    <FormattedMessage id="title" />
                  </Tab>
                  <Tab>Kargo Detayları</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                      <List spacing={2} color={textColor}>
                        {product.details.lenght > 3
                          ? product.details.map((item, index) => (
                              <ListItem key={index}>{item}</ListItem>
                            ))
                          : right.map((item, index) => (
                              <ListItem key={index}>{item}</ListItem>
                            ))}
                      </List>

                      <List spacing={2} color={textColor}>
                        {product.details.lenght > 3
                          ? product.details.map((item, index) => (
                              <ListItem key={index}>{item}</ListItem>
                            ))
                          : left.map((item, index) => (
                              <ListItem key={index}>{item}</ListItem>
                            ))}
                      </List>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    {!product.shipDetails ? (
                      <Text
                        fontSize={"lg"}
                        color={"gray.400"}
                        fontWeight={"300"}
                      >
                        Ücretsiz kargo.
                        <br />
                        Kargo ücreti satıcı tarafından ödenir.
                      </Text>
                    ) : (
                      <Text
                        fontSize={"lg"}
                        color={"gray.400"}
                        fontWeight={"300"}
                      >
                        {product.shipDetails}
                      </Text>
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Accordion>
          </Stack>
          <motion.div whileTap={{ scale: 0.8 }}>
            <Button
              onClick={onOpen}
              w={"full"}
              size={"lg"}
              py={"7"}
              bg={btnBg}
              color={btnColor}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              mb={{ base: "6", md: "0" }}
            >
              <FormattedMessage id="buy" />
            </Button>
            {/* sepete ekle */}
          </motion.div>
          <Button
            colorScheme={findBasketItem ? "red" : "teal"}
            onClick={() => addToBasket(product, findBasketItem)}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            rightIcon={
              findBasketItem ? (
                <IoMdRemoveCircleOutline />
              ) : (
                <BsFillBasketFill />
              )
            }
          >
            {findBasketItem ? "Remove from basket" : "Add to basket"}
          </Button>
          //Buy modal
          <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter="blur(10px) hue-rotate(20deg)" />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <Multistep
                  onClose={onClose}
                  price={product.price}
                  name={product.title}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export default Product;
