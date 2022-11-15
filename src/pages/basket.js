import { useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Image,
  Button,
  Text,
  Grid,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Center,
  IconButton,
  useColorModeValue,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useBasket } from "../context/basketContext";
//ICONS
import { IoIosReturnLeft, IoMdRemoveCircleOutline } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";
import BasketHeader from "../components/basketHeader";
import BasketTable from "../components/basketTable";

function Basket() {
  const { items, removeFromBasket, emptyBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnColor = useColorModeValue("white.50", "gray.600");

  return (
    <Box minh="100vh">
      <Box position={"absolute"} top={"5"} left={"5"} mt="3">
        <Link to="/">
          <IconButton icon={<IoIosReturnLeft />} bgColor={btnColor} />
        </Link>
      </Box>
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
          <BasketHeader />
          <Grid
            templateColumns={{
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
            gap={6}
          >
            <div data-aos="zoom-in-up">
              <BasketTable />
              {/* <BasketCard item={product} basket={removeFromBasket} /> */}
            </div>
            <div data-aos="zoom-in-up">asdasdasd</div>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default Basket;
