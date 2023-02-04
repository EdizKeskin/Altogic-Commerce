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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";
import { BsFillBasketFill } from "react-icons/bs";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomSpinner from "../../components/Spinner";
import { motion } from "framer-motion";
import Checkout from "../../components/Checkout";
import Coursel from "../../components/Coursel";
import { useBasket } from "../../context/basketContext";
import { formatPrice } from "../../api/storage";
import { usePreferences } from "../../context/preferencesContext";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import altogic from "../../api/altogic";
import { TiTick } from "react-icons/ti";
import { useAuth } from "../../context/authContext";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useProduct } from "../../context/productContext";

function Product() {
  const { products } = useProduct();
  const {
    addToBasket,
    items,
    quantity,
    setQuantity,
    notification,
    setNotification,
  } = useBasket();
  const { animations, lang } = usePreferences();
  const { isAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [averageRating, setAverageRating] = useState();
  const [isSending, setIsSending] = useState(false);
  const [currentCustomerRating, setCurrentCustomerRating] = useState();
  const toast = useToast();
  const navigate = useNavigate();

  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const product = products.reduce((acc, item) => {
    if (item._id === id) {
      return item;
    }
    return acc;
  }, null);

  console.log(product);

  useEffect(() => {
    if (product !== null) {
      const averageRating =
        product.rating === undefined ||
        product.rating.length === 0 ||
        product.rating === null
          ? 0
          : product.rating.reduce((a, b) => a + b.rate, 0) /
            product.rating.length;

      setAverageRating(averageRating);
      setCurrentCustomerRating(
        product.rating !== undefined &&
          isAuth === true &&
          product.rating.find(
            (item) => item.customerId === altogic.auth.getUser()._id
          )
      );
    }
  }, [product, isSending, isAuth]);

  const textColor = useColorModeValue("black", "white");
  const titleColor = useColorModeValue("yellow.500", "yellow.300");
  const btnBg = useColorModeValue("gray.900", "gray.50");
  const btnColor = useColorModeValue("white", "gray.900");
  const adddedToBasketMessage =
    lang === "tr-TR" ? "Sepete Eklendi" : "Added to Basket";
  const removedFromBasketMessage =
    lang === "tr-TR" ? "Sepetten Çıkarıldı" : "Removed from Basket";

  if (product === null) return <CustomSpinner />;

  const right = product.details.slice(0, 3);
  const left = product.details.slice(3, 6);

  const photos = product.images.map((url) => ({ image: url }));

  const findBasketItem = items.find(
    (basket_item) => basket_item.id === product._id
  );

  const arrayProduct = [product];
  arrayProduct[0].quantity = quantity;

  const lastPrice = product.discountedPrice * quantity;

  const handleRating = async (newRating) => {
    if (isSending === true || currentCustomerRating !== undefined) {
      await altogic.db
        .model("products.rating")
        .object(currentCustomerRating._id)
        .update({ rate: newRating });
    } else {
      await altogic.db.model("products.rating").object().append(
        {
          rate: newRating,
          customerId: altogic.auth.getUser()._id,
        },
        product._id
      );
    }

    setIsSending(true);
  };

  const handleRoute = () => {
    navigate("/signin");
  };

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 20 }}
      >
        <Box data-aos={animations === true ? "fade-down" : "none"}>
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
              <Link to={`/categories/${product.categories[0]}`}>
                <Button variant={"link"} textTransform={"capitalize"}>
                  {product.categories[0]}
                </Button>
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
          data-aos={animations === true ? "fade-up" : "none"}
          backdropFilter={"blur(4px)"}
          mt={{ base: 10, md: 0 }}
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
            <Box display={"flex"} alignItems={"center"}>
              {product.discount !== 0 && product.discount && (
                <Text
                  color={"gray.400"}
                  fontSize={"xl"}
                  textDecoration={"line-through"}
                  mr={"3"}
                >
                  {formatPrice(product.price)}
                </Text>
              )}
              <Text color={"gray.400"} fontSize={"2xl"} fontWeight={"bold"}>
                {product.discountedPrice
                  ? formatPrice(product.discountedPrice)
                  : formatPrice(product.price)}{" "}
              </Text>
            </Box>
          </Box>
          <Box>
            {averageRating === undefined ? (
              <CustomSpinner />
            ) : (
              <>
                <ReactStars
                  onChange={handleRating}
                  count={5}
                  value={
                    product.rating === undefined
                      ? 0
                      : product.rating.reduce((a, b) => a + (b.rate || 0), 0) /
                        product.rating.length
                  }
                  size={24}
                  edit={false}
                  isHalf={true}
                  filledIcon={<FaStar />}
                  halfIcon={<FaStarHalfAlt />}
                  emptyIcon={<FaRegStar />}
                />
                <Text fontSize={"lg"} color={"gray.400"} fontWeight={"300"}>
                  {product.rating === undefined ? "0" : product.rating.length}{" "}
                  reviews
                </Text>
              </>
            )}
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
                    <FormattedMessage id="features" />
                  </Tab>
                  <Tab>
                    <FormattedMessage id="ship_details" />
                  </Tab>
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
                        Free Shipping
                        <br />
                        Shipping fee is paid by the seller
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
          <Box display={"flex"} alignItems={"center"}>
            <Text fontSize={"lg"} mr={4}>
              Quantity:
            </Text>
            <NumberInput
              defaultValue={1}
              min={1}
              max={product.stock < 5 ? product.stock : 5}
              onChange={(value) => setQuantity(value)}
              disabled={product.stock < 1 ? true : false}
              w={"min-content"}
            >
              <NumberInputField mr={5} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Text fontSize={"lg"} mr={2}>
              product.stock:
            </Text>
            <Text fontSize={"lg"} color={"gray.400"} fontWeight={"300"}>
              {product.stock < 1 ? "Out of product.stock" : product.stock}
            </Text>
          </Box>
          {product.stock > 0 && isAuth === true && (
            <Box display={"flex"} alignItems={"center"} gap={3}>
              <Text fontSize={"lg"} mt={1}>
                Rating:
              </Text>
              <ReactStars
                filledIcon={<FaStar />}
                halfIcon={<FaStarHalfAlt />}
                emptyIcon={<FaRegStar />}
                count={5}
                value={
                  product.rating === undefined
                    ? 0
                    : product.rating.find(
                        (item) => item.customerId === altogic.auth.getUser()._id
                      ) === undefined
                    ? 0
                    : product.rating.find(
                        (item) => item.customerId === altogic.auth.getUser()._id
                      ).rate
                }
                onChange={handleRating}
                size={24}
              />
              {isSending === true && <TiTick color="#3cdd78" size={25} />}
            </Box>
          )}
          <motion.div whileTap={{ scale: 0.8 }}>
            <Button
              onClick={isAuth === true ? onOpen : handleRoute}
              w={"full"}
              size={"lg"}
              py={"7"}
              bg={btnBg}
              color={btnColor}
              textTransform={"uppercase"}
              disabled={product.stock < quantity ? true : false}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              mb={{ base: "6", md: "0" }}
              isLoading={loading}
            >
              {product.stock < 1 ? (
                "Out of product.stock"
              ) : (
                <FormattedMessage id="buy" />
              )}
            </Button>
          </motion.div>
          <Button
            colorScheme={findBasketItem ? "red" : "teal"}
            disabled={product.stock < quantity ? true : false}
            onClick={() => {
              toast({
                title: findBasketItem
                  ? removedFromBasketMessage
                  : adddedToBasketMessage,
                status: findBasketItem ? "error" : "success",
                duration: 2000,
                isClosable: true,
                position: "bottom-right",
              });
              findBasketItem && setNotification(notification - 1);
              addToBasket(product, findBasketItem);
            }}
            isLoading={loading}
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
            {product.stock < 1 ? (
              "Out of product.stock"
            ) : findBasketItem ? (
              <FormattedMessage id="remove_from_basket" />
            ) : (
              <FormattedMessage id="add_to_basket" />
            )}
          </Button>
          <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter="blur(10px) hue-rotate(20deg)" />
            <ModalContent w={"90%"}>
              <ModalCloseButton />
              <ModalBody>
                <Checkout
                  onClose={onClose}
                  price={lastPrice}
                  products={arrayProduct}
                  setLoading={setLoading}
                  loading={loading}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>
              <FormattedMessage id="ship_time" />
            </Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export default Product;
