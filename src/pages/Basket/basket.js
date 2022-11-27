import {
  Alert,
  AlertIcon,
  Box,
  Text,
  Grid,
  IconButton,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useBasket } from "../../context/basketContext";
//ICONS
import { IoIosReturnLeft } from "react-icons/io";
import BasketSidebar from "../../components/basketSidebar";
import BasketTable from "../../components/basketTable";

function Basket() {
  const { items } = useBasket();
  const textColor = useColorModeValue("black", "white");
  const btnColor = useColorModeValue("white.50", "gray.600");

  const totalPrice = items.reduce((acc, obj) => acc + obj.price, 0);

  return (
    <Box minh="100vh">
      <Flex align="center" justifyContent="center" data-aos="fade-up">
      <Box position={"absolute"} top={"5"} left={"5"} mt="3">
        <Link to="/">
          <IconButton icon={<IoIosReturnLeft />} bgColor={btnColor} />
        </Link>
      </Box>
      </Flex>
      {items.length < 1 && (
        <>
          <Box
            justifyContent="center"
            alignItems={"center"}
            display="flex"
            py={10}
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
              You have not any items in your basket.
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
              zIndex={"99"}
              mt={10}
              data-aos="zoom-in-up"
            >
              Basket  
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
            <div data-aos="zoom-in-up">
              <BasketTable />
            </div>
            <div data-aos="zoom-in-up">
              <BasketSidebar items={items} totalPrice={totalPrice} />
            </div>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default Basket;
