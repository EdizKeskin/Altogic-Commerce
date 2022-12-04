import {
  Text,
  Button,
  useColorModeValue,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { TiTickOutline } from "react-icons/ti";
import Form3svg from "../images/shop.svg";
import Multistep from "./multistep/multiStep";

function BasketSidebar({ items, totalPrice }) {
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <Flex
      py={10}
      zIndex={"99"}
      mx={10}
      justifyContent="space-between"
      alignItems="center"
      flexDirection={"column"}
    >
      <Image src={Form3svg} display={{ base: "none", md: "block" }} />
      <Flex
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          color={useColorModeValue("black", "white")}
        >
          {totalPrice} ₺
        </Text>
        <Button
          colorScheme="green"
          mt={10}
          ml="5"
          rightIcon={<TiTickOutline size="20px" />}
          onClick={onOpen}
        >
          Complete the order
        </Button>
      </Flex>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(20deg)" />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Multistep
              onClose={onClose}
              price={totalPrice}
              names={items}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default BasketSidebar;
