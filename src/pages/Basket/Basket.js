import {
  Alert,
  AlertIcon,
  Box,
  Text,
  Grid,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useBasket } from "../../context/basketContext";
import BasketSidebar from "../../components/BasketSidebar";
import BasketTable from "../../components/BasketTable";
import CustomSpinner from "../../components/Spinner";
import { usePreferences } from "../../context/preferencesContext";
import { useProduct } from "../../context/productContext";
import { FormattedMessage } from "react-intl";

function Basket() {
  const { items } = useBasket();
  const { animations } = usePreferences();
  const { products } = useProduct();

  const textColor = useColorModeValue("black", "white");
  if (products === null) return <CustomSpinner />;

  const basketProducts = products.filter((item) => {
    return items.find((basketItem) => basketItem.id === item._id);
  });
  basketProducts.forEach((item) => {
    const basketItem = items.find((basketItem) => basketItem.id === item._id);
    item.quantity = basketItem.quantity;
  });

  const totalPrice = basketProducts.reduce((acc, obj) => {
    return obj.discountedPrice
      ? acc + obj.discountedPrice * obj.quantity
      : acc + obj.price * obj.quantity;
  }, 0);

  return (
    <Box minh="100vh">
      {items.length < 1 && (
        <>
          <Box
            justifyContent="center"
            alignItems={"center"}
            display="flex"
            py={10}
            mt={{ base: 10, sm: 0 }}
            flexDirection="column"
          >
            <Alert
              status="warning"
              color="white"
              bgColor="red.600"
              borderRadius="lg"
              w={"fit-content"}
            >
              <AlertIcon color="red.900" />
              <FormattedMessage id="basket_empty" />
            </Alert>
          </Box>
        </>
      )}
      {items.length > 0 && (
        <>
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Text
              as={"h1"}
              fontSize={"4xl"}
              fontWeight={"extrabold"}
              letterSpacing={"10px"}
              color={textColor}
              mt={10}
              data-aos={animations === true ? "zoom-in-up" : "none"}
            >
              <FormattedMessage id="basket_title" />
            </Text>
          </Flex>
          <Grid
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
            gap={6}
          >
            <div data-aos={animations === true ? "zoom-in-up" : "none"}>
              <BasketTable products={basketProducts} />
            </div>
            <div data-aos={animations === true ? "zoom-in-up" : "none"}>
              <BasketSidebar items={basketProducts} totalPrice={totalPrice} />
            </div>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default Basket;
